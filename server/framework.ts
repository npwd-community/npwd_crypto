import {Server as ESXServer} from 'esx.js'
import {Server as QBServer} from 'qbcore.js'
import { CONFIG } from './config';

const exp = global.exports

export let ESX: ESXServer = null;
export let QBCore: QBServer = null;

let FRAMEWORK: 'qb' | 'esx'
if (GetResourceState('qb-core') === 'started') FRAMEWORK = 'qb';
if (GetResourceState('es_extended') === 'started') FRAMEWORK = 'esx';

switch (FRAMEWORK) {
  case 'esx':
    ESX = exp['es_extended'].getSharedObject();
    break;
  case 'qb':
    QBCore = exp['qb-core'].GetCoreObject();
    break;
  default:
    console.log("[npwd_crypto] ERROR: No framework detected")
    break;
}

const Round2DP = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

class FrameworkWrapper {
  constructor(public framework: string) {}

  giveCryptos(source: number, amount: number) {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      player.addAccountMoney('crypto', Round2DP(amount))
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      player.Functions.AddMoney('crypto', Round2DP(amount))
    }
  }

  giveBank(source: number, amount: number) {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      player.addAccountMoney('bank', amount)
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      player.Functions.AddMoney('bank', amount)
    }
  }

  takeCryptos(source: number, amount: number) {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      player.removeAccountMoney('crypto', Round2DP(amount))
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      player.Functions.RemoveMoney('crypto', Round2DP(amount))
    }
  }

  takeBank(source: number, amount: number) {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      player.removeAccountMoney('bank', amount)
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      player.Functions.RemoveMoney('bank', amount)
    }
  }

  getCryptos(source: number): number {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      return player.getAccount('crypto').money
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      return player.PlayerData.money['crypto']
    }
  }

  getBank(source: number): number {
    if (this.framework === "esx") {
      const player = ESX.GetPlayerFromId(source)
      return player.getAccount('bank').money
    } else if (this.framework === "qb") {
      const player = QBCore.Functions.GetPlayer(source)
      return player.PlayerData.money['bank']
    }
  }
}

export const fwWrapper = new FrameworkWrapper(FRAMEWORK)

export const getIdentifier = (source: number) => {
  if (FRAMEWORK === "esx") {
    return ESX.GetPlayerFromId(source).identifier
  } else if (FRAMEWORK === "qb") {
    return QBCore.Functions.GetPlayer(source).PlayerData.citizenid
  }
}