<div align="center">
    <img href="https://projecterror.dev" width="150" src="https://i.tasoagc.dev/c1pD" alt="Material-UI logo" />
</div>
<h1 align="center">NPWD Crypto</h1>

<div align="center">
External NPWD app for buying, selling and trading crypto currency.
</div>

<div align="center">

[![license](https://img.shields.io/github/license/npwd-community/npwd_crypto?style=for-the-badge)](https://github.com/mojito-fivem/npwd-dispatch/master/LICENSE)
![GitHub all releases](https://img.shields.io/github/downloads/npwd-community/npwd_crypto/total?style=for-the-badge)
</div>

## Screenshots
![Portfolio Page](https://i.imgur.com/2VF9Lw7.png)
![History Page](https://i.imgur.com/eSSIkAH.png)
![Transaction Page](https://i.imgur.com/VjUrZbH.png)

## Setup and Configuration

Framework is automatically detected for ESX and QBCore

### Installation
- Download the [latest from the release](https://github.com/npwd-community/npwd_crypto/releases/latest) or build from source.

* Download the npwd_crypto.zip from releases. DO NOT CHANGE THE RESOURCE NAME.
* Unzip and add the resource to your server resources folder
* Ensure npwd_crytpo BEFORE npwd
* Add the app to NPWD config.json in the apps section `"apps": ["npwd_crypto"]`

**ESX ONLY**
- Use Latest ESX legacy as of commit [c00ff2365820c6edb4146e0c357fc3ea5247b304](https://github.com/esx-framework/esx-legacy/commit/c00ff2365820c6edb4146e0c357fc3ea5247b304)
- Add crypto as to Config.Accounts in esx_extended/config.lua:
```lua
Config.Accounts = {
	bank = {
		label = _U('account_bank'),
		round = true
	},
	black_money = {
		label = _U('account_black_money'),
		round = true
	},
	money = {
		label = _U('account_money'),
		round = true
	},
	crypto = {
	    label = "Crypto Currency",
	    round = false
	}
}
```

### Config

```js
{
  "maxHistory": 10,  // Maximum number of data points to store in history
  "logging": {
    "enabled": false, // Enables discord webhook logging of crypto price updates
    "webhook": "" // Discord webhook link
  },
  "tick": {
    "min": 15, // Minimum value the crypto can take
    "max": 250, // Maximum value
    "upDownRatio": 0.6, // [1.0-0.0] chance for crypto to go up
    "maxDeviation": 10, // Maximum amount the price can go up or down
    "interval": 15, // Time in minutes for each price change
    "crashChance": 0.05 // Chance% for price to reset to minimum
  }
}
```

## Development

If you wish to make changes or build yourself you can clone the repository with `git clone https://github.com/npwd-community/npwd_crypto.git` then install the dependencies with `yarn build` or `npm i`.

You can either build the project with `yarn build` or alternatively, you can use `yarn watch` to put webpack in watch mode so that it will automatically rebuild after any changes you make.
