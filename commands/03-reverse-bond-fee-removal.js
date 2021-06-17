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
    entryFee: '0',
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

  const newEntryFee = '25000'
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
  salt: '0xe488fb1059c68efc947b9d6ac86205d3dbb93edbd34b5ce30cd96e8f6c7a998e',
  delay: day * 3
}

console.clear()
fs.saveToDisk(`${__filename.replace('commands', 'payloads')}on`, payload)
console.log(payload)
