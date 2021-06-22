const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const day = 86400
const blocksInDay = day / 3

const updateMinStakingPeriodInCakeFarm = () => {
  const contract = new ethers.utils.Interface(['function setMinStakingPeriodInBlocks(uint256 value) external'])
  return contract.encodeFunctionData('setMinStakingPeriodInBlocks', [blocksInDay.toString()])
}

const updateMinStakingPeriodInPool = (token) => {
  const contract = new ethers.utils.Interface(['function setMinStakingPeriodInBlocks(address token, uint256 value) external'])
  return contract.encodeFunctionData('setMinStakingPeriodInBlocks', [token, blocksInDay.toString()])
}

const getDatas = () => {
  const { contracts: { mainnet } } = constants
  const values = [[], []]

  values[0].push(mainnet.farm)
  values[1].push(updateMinStakingPeriodInCakeFarm())

  values[0].push(mainnet.pool)
  values[1].push(updateMinStakingPeriodInPool(mainnet.nepbusdPair))

  values[0].push(mainnet.pool)
  values[1].push(updateMinStakingPeriodInPool(mainnet.nep))

  values[0].push(mainnet.pool)
  values[1].push(updateMinStakingPeriodInPool(mainnet.wbnb))

  return values
}

const values = getDatas()

const payload = {
  targets: values[0],
  values: Array(4).fill(0),
  datas: JSON.stringify(values[1]).replace(/"/g, ''),
  predecessor: '0x',
  salt: '0xf8b8d17fe4817e9a02a8d090fc699dbde9a49fec227dd3e0cc357a33accf0fae',
  delay: day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
