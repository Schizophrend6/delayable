const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const day = 86400
const MINTKEY_SEED = 1
const NEP_DEPLOYER = '0x0702e0D43e2B73f2C9425D8424077e4da55f0110'

const mintRemaining = () => {
  const contract = new ethers.utils.Interface(['function mintTokens(uint8 key, address account, uint256 amount) external'])
  return contract.encodeFunctionData('mintTokens', [MINTKEY_SEED.toString(), NEP_DEPLOYER, '2000000000000000000000000'])
}

const removeMinter = () => {
  const contract = new ethers.utils.Interface(['function removeMinter(uint8 key, address account)'])
  const datas = []

  datas.push(contract.encodeFunctionData('removeMinter', [1, NEP_DEPLOYER]))
  datas.push(contract.encodeFunctionData('removeMinter', [2, NEP_DEPLOYER]))
  datas.push(contract.encodeFunctionData('removeMinter', [3, NEP_DEPLOYER]))

  return datas
}

const values = [mintRemaining(), ...removeMinter()]

const payload = {
  targets: Array(4).fill(constants.contracts.mainnet.nep).join(',').replace(/"/g, ''),
  values: Array(4).fill(0).join(','),
  datas: JSON.stringify(values).replace(/"/g, '').replace('[', '').replace(']', ''),
  predecessor: '0x',
  salt: '0xe661f91023f64a6a0fed70729511b9db66318dba384f8d74576b2535f403d090',
  delay: day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
