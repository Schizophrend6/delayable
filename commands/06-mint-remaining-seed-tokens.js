const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const day = 86400
const MINTKEY_SEED = 1
const NEP_DEPLOYER = '0x0702e0D43e2B73f2C9425D8424077e4da55f0110'

const mintRemaining = () => {
  const contract = new ethers.utils.Interface(['function mintTokens(uint8 key, address account, uint256 amount) external'])
  return contract.encodeFunctionData('mintTokens', [MINTKEY_SEED.toString(), NEP_DEPLOYER, '2000000000000000000000000'])
}

const values = mintRemaining()

const payload = {
  targets: constants.contracts.mainnet.nep.replace(/"/g, ''),
  values: 0,
  datas: values.replace(/"/g, '').replace('[', '').replace(']', ''),
  predecessor: '0x',
  salt: '0x013d0cf5670771b58bb46ceab9f839b5f0c999af55ca527c4a12b881bc6d0edc',
  delay: day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
