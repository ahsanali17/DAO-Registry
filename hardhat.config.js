require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat");
require("hardhat-deploy-ethers");
require("@nomiclabs/hardhat-web3");
require('@openzeppelin/hardhat-upgrades');
require("web3");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.8.15",
  networks: {
    hardhat: {
      chainId: 4
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || 'http://localhost:8545',
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [`0x${process.env.GOERLI_URL}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};

// Extending Hardhat to include web3.js
extendEnvironment((hre) => {
  const Web3 = require("web3");
  hre.Web3 = Web3;

  // hre.network.provider is an EIP1193-compatible provider.
  hre.web3 = new Web3(hre.network.provider);
});