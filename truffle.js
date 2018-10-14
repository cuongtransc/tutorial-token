const logger = require('log4js').getLogger()
logger.level = process.env.LOG_LEVEL || 'info'

const HDWalletProvider = require("truffle-hdwallet-provider")

// Default config for MNEMONIC & INFURA_ACCESS_TOKEN
const MNEMONIC = process.env.MNEMONIC || ''
const INFURA_ACCESS_TOKEN = process.env.INFURA_ACCESS_TOKEN || ''

logger.debug(`MNEMONIC: ${MNEMONIC}`)
logger.debug(`INFURA_ACCESS_TOKEN: ${INFURA_ACCESS_TOKEN}`)

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    truffle: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        if (!MNEMONIC || !INFURA_ACCESS_TOKEN) {
          logger.error("Don't have config for MNEMONIC & INFURA_ACCESS_TOKEN")
          process.exit(1)
        }

        return new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_ACCESS_TOKEN}`)
      },
      network_id: 3
    },
    rinkeby: {
      provider: function() {
        if (!MNEMONIC || !INFURA_ACCESS_TOKEN) {
          logger.error("Don't have config for MNEMONIC & INFURA_ACCESS_TOKEN")
          process.exit(1)
        }

        return new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA_ACCESS_TOKEN}`)
      },
      network_id: 4,
    },
    // testnet: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: 4, // Rinkeby
    //   from: "0xb6ee01b4422edbd4d6aec9375048b177c3bbb3c3",
    //   gas: 4700036,
    //   gasPrice: 20000000000, // 20 gwei
    //   // gasPrice: 0x01      // <-- Use this low gas price
    // },
  }
}
