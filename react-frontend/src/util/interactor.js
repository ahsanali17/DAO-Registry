// import { ethers } from 'hardhat';

// const ProxyFactoryArtifact = require("./ProxyFactory.json");
// const proxyFactoryAddress = '0xe18245a7C7f7ba06e3DC244B8cdC14AABcB16F8C';

// export const minimalProxyContractInstance = () => {
//  let provider = new ethers.providers.Web3Provider(window.ethereum);
//  let signer = provider.getSigner(0);
//  return new ethers.Contract(
//   proxyFactoryAddress,
//   ProxyFactoryArtifact,
//   signer
//  )
// };


// export const createNewToken = (tokenName,tokenSymbol,userAddress) => {
//  minimalProxyContractInstance.methods.createNewToken(tokenName,tokenSymbol,userAddress).call();
// }

