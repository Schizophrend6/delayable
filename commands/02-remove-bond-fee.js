const { ethers } = require('ethers')
const { constants, fs } = require('./utils')
const { contracts: { mainnet } } = constants
const day = 86400

const addOrUpdatePair = () => {
  const previous = {
    name: 'NEP-BUSD Bond V2',
    pancakePair: mainnet.nepbusdPair,
    maxStake: '1250000000000000000000000',
    minBond: '25000000000000000000',
    entryFee: '25000',
    exitFee: '0',
    lockingPeriod: '7776000'
  }

  const contract = new ethers.utils.Interface([`function addOrUpdatePair(
    address token,
    address pancakePair,
    string memory name,
    uint256 maxStake,
    uint256 minBond,
    uint256 entryFee,
    uint256 exitFee,
    uint256 lockingPeriod,
    uint256 amount
  ) external override onlyOwner`])

  const newEntryFee = '0'
  const amountToDepositNow = '0'

  const data = contract.encodeFunctionData('addOrUpdatePair', [
    mainnet.busd,
    previous.pancakePair,
    previous.name,
    previous.maxStake,
    previous.minBond,
    newEntryFee,
    previous.exitFee,
    previous.lockingPeriod,
    amountToDepositNow
  ])

  return data
}

const payload = {
  target: mainnet.bondPool,
  value: 0,
  data: addOrUpdatePair(),
  predecessor: '0x',
  salt: '0x05c773cec2c9b8699be4b0c2f8c9603c19e482ea84f30ccce2859a3488b24032',
  delay: day
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
