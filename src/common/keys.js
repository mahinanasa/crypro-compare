/* eslint-disable linebreak-style */

// require('dotenv').config();

let fileName = '.env';
fileName = `${fileName}.${process.argv[process.argv.length - 1]}`;
require('dotenv').config({ path: fileName });

const envVars = process.env;
 
const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoDbUrl: envVars.MONGO_URL,
  cryptoCompareApiKey: envVars.CRYPTO_COMPARE_APIKEY,
  cryptoCompareWssUrl: envVars.CRYPTO_COMPARE_URL,
  coinsTypeArray:[
    "2~Coinbase~BTC~USD",
    "2~Coinbase~BTC~GBP",
    "2~Coinbase~ETH~USD",
    "2~Coinbase~ETH~GBP",
    // "2~Coinbase~BSC~USD",
    // "2~CCCAGG~BSC~GBP",
     "5~CCCAGG~BSC~USD",
    "5~CCCAGG~BSC~GBP",
    "24~Coinbase~BTC~USD~H",
    "24~Coinbase~ETH~USD~H",
    "24~Coinbase~BSC~USD~H",
    "24~Coinbase~BTC~GBP~H",
    "24~Coinbase~ETH~GBP~H",
    "24~CCCAGG~BSC~GBP~H",
  ]
};
module.exports = config;
