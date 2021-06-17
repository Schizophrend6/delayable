const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const day = 86400
const mintKeys = [1, 2, 3, 4, 5, 6, 7, 8] // enum MintKey { INVALID, SEED, COMMUNITY, LP_REWARDS, PROTOCOL_INCENTIVE, TOKEN_SALE_OR_DISTRIBUTION, ECOSYSTEM_FUND, LONG_TERM_PROTOCOL_INCENTIVE, FOUNDING_TEAM_LEGAL }

const addMinter = (ids, minter) => {
  const ret = []
  const contract = new ethers.utils.Interface(['function addMinter(uint8 key, address account)'])

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]

    const data = contract.encodeFunctionData('addMinter', [id.toString(), minter])
    ret.push(data)
  }

  return ret
}

const payload = {
  targets: Array(8).fill(constants.contracts.mainnet.nep),
  values: Array(8).fill(0),
  datas: JSON.stringify(addMinter(mintKeys, constants.contracts.mainnet.delayable)).replace(/"/g, ''),
  predecessor: '0x',
  salt: '0x5cdf84d62f4b98b4f8f674cb724fde2063aa45311753262755063a12fd73d0b0',
  delay: day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
