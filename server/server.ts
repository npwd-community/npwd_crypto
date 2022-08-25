import axios from 'axios'
import {oxmysql} from '@overextended/oxmysql'
import {ServerUtils} from "@project-error/pe-utils";
import {fwWrapper, getIdentifier} from "./framework";
import {CONFIG} from './config';

const Utils = new ServerUtils()

class CryptoController {
  history: number[]
  maxHistory: number
  currentValue: number

  constructor(max = 10) {
    this.history = JSON.parse(GetResourceKvpString('npwd_crypto_history')) ?? []
    this.currentValue = GetResourceKvpFloat('npwd_crypto_value') || CONFIG.tick.min
    this.maxHistory = max
  }

  async updateValue(value: number) {
    if (this.history.length === this.maxHistory)
      this.history.splice(0)

    this.history.push(value)
    this.currentValue = value

    console.log(`[npwd_crypto]: Crypto is now valued at $${value}`)

    await this.log()
    this.save()
  }

  save() {
    SetResourceKvp('npwd_crypto_history', JSON.stringify(this.history))
    SetResourceKvpFloat('npwd_crypto_value', this.currentValue)
  }

  async log() {
    if (!CONFIG.logging.enabled) return

    const data = {
      title: "NPWD Crypto Log",
      color: 255,
      footer: {
        text: new Date().getTime()
      },
      description: `Crypto is now worth ${this.currentValue}`,
      author: {
        name: "NPWD"
      }
    }

    await axios.post(CONFIG.logging.webhook, {
      embeds: [data]
    }, {
      headers: {
        ['Content-Type']: 'application/json'
      }
    })
  }

  async tick() {
    let current = this.currentValue;
    let {min, max, upDownRatio, maxDeviation, crashChance} = CONFIG.tick

    const rand = Math.random()
    const amount = Math.floor(Math.random() * maxDeviation + 1)

    // If price crashes, reset to minimum value
    if (rand <= crashChance) {
      return await this.updateValue(min)
    }

    // price increases if random is below our ratio
    // otherwise price will decrease
    if (rand <= upDownRatio) {
      current += amount
      if (current > max)
        current = max
    } else {
      current -= amount
      if (current < min)
        current = min
    }

    await this.updateValue(current)
  }
}

const controller = new CryptoController(CONFIG.maxHistory)

class Transaction {
  constructor(
    public type: string,
    public amount: number,
    public identifier: string,
    public sentTo?: string
  ) {
  }

  save() {
    oxmysql.insert("INSERT INTO npwd_crypto_transactions (identifier, type, amount, worth, sentTo) VALUES (?, ?, ?, ?, ?)", [
      this.identifier,
      this.type,
      this.amount,
      this.amount * controller.currentValue,
      this.sentTo
    ])
  }
}


Utils.onNetPromise<{ amount: number }>('npwd_crypto:buyCrypto', (req, res) => {
  const amount = req.data.amount
  const src = req.source

  const playerBank = fwWrapper.getBank(src)
  if (playerBank <= amount) {
    return res({
      status: "error",
      data: {
        reason: "Insufficient Bank Balance"
      }
    })
  }

  const coins = amount / controller.currentValue
  fwWrapper.takeBank(src, amount)
  fwWrapper.giveCryptos(src, coins)

  res({
    status: "ok",
    data: {
      newBal: fwWrapper.getCryptos(src)
    }
  })

  new Transaction('buy', coins, getIdentifier(src)).save()
})

Utils.onNetPromise<{ amount: number }>('npwd_crypto:sellCrypto', (req, res) => {
  const amount = req.data.amount
  const src = req.source

  const playerCryptos = fwWrapper.getCryptos(src)
  if (playerCryptos <= amount) {
    return res({
      status: "error",
      data: {
        reason: "Insufficient Crypto Portfolio"
      }
    })
  }

  const worth = amount * controller.currentValue
  fwWrapper.takeCryptos(src, amount)
  fwWrapper.giveBank(src, worth)

  res({
    status: "ok",
    data: {
      newBal: fwWrapper.getCryptos(src)
    }
  })

  new Transaction('sell', amount, getIdentifier(src)).save()
})

Utils.onNetPromise<{ amount: number, target: number }>('npwd_crypto:tradeCrypto', (req, res) => {
  const {amount, target} = req.data
  const src = req.source

  if (GetPlayerPing(target.toString()) <= 0) {
    return res({
      status: "error",
      data: {
        reason: "Target Offline"
      }
    })
  }

  const playerCryptos = fwWrapper.getCryptos(src)
  if (playerCryptos <= amount) {
    return res({
      status: "error",
      data: {
        reason: "Insufficient Crypto Portfolio"
      }
    })
  }

  fwWrapper.takeCryptos(src, amount)
  fwWrapper.giveCryptos(target, amount)

  res({
    status: "ok",
    data: {
      newBal: fwWrapper.getCryptos(src)
    }
  })

  new Transaction('trade', amount, getIdentifier(src), getIdentifier(target)).save()
})

Utils.onNetPromise('npwd_crypto:fetchCryptoData', (req, res) => {
  res({
    status: "ok",
    data: {
      history: controller.history,
      value: controller.currentValue,
      balance: fwWrapper.getCryptos(req.source)
    }
  })
})

Utils.onNetPromise('npwd_crypto:fetchTransactionData', async (req, res) => {
  const src = req.source
  const identifier = getIdentifier(src)

  const rawData: RawTransaction[] = await oxmysql.query(
    'SELECT * FROM npwd_crypto_transactions WHERE identifier = :identifier OR sentTo = :identifier ORDER BY UNIX_TIMESTAMP(createdAt) DESC',
    {
      identifier
    }
  )
  const transactions: DbTransaction[] = rawData?.map((data) => ({
    type: data.type,
    amount: data.amount,
    value: data.worth,
    isReceiving: data.sentTo ? data.sentTo === identifier : null
  })) || []

  res({
    status: "ok",
    data: transactions
  })
})

setInterval(async () => {
  await controller.tick()
}, CONFIG.tick.interval * 1000 * 60)

// When server starts just yeet old records to stop db being full up
oxmysql.ready(() => {
  oxmysql.query('DELETE FROM npwd_crypto_transactions WHERE DATEDIFF(NOW(), createdAt) > 60')
})

RegisterCommand("manualsetcrypto", async (source: number, args: string[]) => {
  if (source !== 0) return; // Rcon command

  const [valueRaw] = args;
  const value = parseInt(valueRaw)

  if (!isNaN(value)) {
    return console.log("[npwd_crypto]: Invalid crypto price")
  }

  await controller.updateValue(value)
}, true)

on("onResourceStop", (resourceName: string) => {
  if (resourceName === GetCurrentResourceName()) {
    controller.save()
  }
})