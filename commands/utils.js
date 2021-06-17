const { ethers } = require('ethers')
const fs = require('fs').promises

const constants = {
  contracts: {
    mainnet: {
      masterChef: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      wbnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      nep: '0xcE3805A443eBb27B2A4058eC9d94dC4f9C000633',
      cake: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      usdt: '0x55d398326f99059ff775485246999027b3197955',
      busd: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      pancakeRouter: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      nepbusdPair: '0xF567D20EBC4E27551b1A31B077542701754f1A36',
      nepusdtPair: null,
      nepwbnbPair: null,
      ntransferutilv1: '0xD6c3aEc51e0c72Ac3CE73BB3888621C6D68c58Ac',
      discovery: '0x03bB7fe5bD882d1F6A56a9c603C70895FC9cde38',
      bondPool: '0x73ddFb83d2236898a48cBC7536b560358DF101ec',
      farm: '0x373B104927eb32B6c67a13Ba78b73409c5C2F1f0',
      pool: '0xDBA51280085b85C766A2B22F9ed2B75ec12a5290',
      delayable: '0x9833Efa0b740Eb3e27b202E1aE211095a1d3Abe6'
    }
  }
}

const filesystem = {
  saveToDisk: async (path, contents) => {
    await fs.writeFile(path, JSON.stringify(contents, null, 2))
  }
}

const crypto = {
  genSalt: ethers.utils.hexlify(ethers.utils.randomBytes(32))
}

module.exports = { constants, fs: filesystem, crypto }
