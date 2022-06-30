// require('dotenv').config();
// const Web3 = require("web3");
// const web3 = new Web3(process.env.RINKEBY_URL||"http://localhost:8545");
// var Contract = require('web3-eth-contract');

// async function minimalProxyCaller() {
//  const walletAddr = "0x06122e6170114667780765E0Fc91f5A7F81142C4";
//  const proxyFactoryAddress = "0xc48C32E52C80076ac628187bAc8D9D49392F050A";
//  const proxyFactoryABI = "../artifacts/contracts/Proxies/ProxyFactory.sol/proxyFactoryv2.json";
 
//  Contract.setProvider(process.env.RINKEBY_URL);
//  Contract = new web3.eth.Contract(proxyFactoryABI,proxyFactoryAddress,{from:walletAddr});
//  Contract.methods.createNewToken(walletAddr,"dogCoin","DOG").send()
//   .on(NewClone, ()=>{console.log('Success!')
//  });
 
// }

// minimalProxyCaller()
//  .then(() => process.exit(0))
//  .catch((error) => {
//    console.error(error);
//    process.exit(1);
//  });