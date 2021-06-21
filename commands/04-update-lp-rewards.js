const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const { contracts: { mainnet } } = constants
const day = 86400

const addOrUpdateLiquidity = () => {
  const previous = {
    name: 'NEP-BUSD Cake LP Farm',
    maxStake: '200000000000000000000000',
    entryFee: '0',
    exitFee: '0',
    minStakingPeriodInBlocks: '86400'
  }

  const contract = new ethers.utils.Interface([`function addOrUpdateLiquidity(
    address token,
    string memory name,
    uint256 maxStake,
    uint256 nepUnitPerTokenUnitPerBlock,
    uint256 entryFee,
    uint256 exitFee,
    uint256 minStakingPeriodInBlocks,
    uint256 amount
  ) external`])

  const nepUnitPerTokenUnitPerBlock = '665905631660'
  const amountToDepositNow = '0'

  const data = contract.encodeFunctionData('addOrUpdateLiquidity', [
    mainnet.nepbusdPair,
    previous.name,
    previous.maxStake,
    nepUnitPerTokenUnitPerBlock,
    previous.entryFee,
    previous.exitFee,
    previous.minStakingPeriodInBlocks,
    amountToDepositNow
  ])

  return data
}

const payload = {
  target: mainnet.pool,
  value: 0,
  data: addOrUpdateLiquidity(),
  predecessor: '0x',
  salt: '0xde595ebd14c5a47585e2d146d8f6ad17ebcc497ac1130c9c9f1720d461d99988',
  delay: 1 * day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
