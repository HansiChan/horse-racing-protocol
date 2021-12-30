// hardhat.config.js
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'hardhat-spdx-license-identifier';
import 'hardhat-watcher';
import '@openzeppelin/hardhat-upgrades';

import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/types';
import { removeConsoleLog } from 'hardhat-preprocessor';

dotenv.config({ path: '../../.env' });

const accounts = {
  mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test junk'
};

export default {
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true
    // only: [],
    // except: []
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: 'USD',
    enabled: process.env.REPORT_GAS === 'true',
    excludeContracts: ['contracts/mocks/', 'contracts/libraries/']
  },
  mocha: {
    timeout: 20000
  },
  networks: {
    'avax-mainnet': {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      accounts: accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
      tags: ['avax-mainnet']
    },
    'avax-testnet': {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: accounts,
      chainId: 43113,
      live: true,
      saveDeployments: true,
      tags: ['avax-testnet']
    }
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    sources: 'contracts',
    tests: 'test'
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (bre) => bre.network.name !== 'hardhat' && bre.network.name !== 'localhost'
    )
  },
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
          metadata: {
            bytecodeHash: 'none'
          }
        }
      }
    ]
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true
  }
} as HardhatUserConfig;