import { ethers } from 'hardhat';

const ProxyFactoryArtifact = require("../utils/ProxyFactory.json");
const proxyFactoryAddress = '0xc48C32E52C80076ac628187bAc8D9D49392F050A';

export const minimalProxyContractInstance = () => {
 let provider = new ethers.providers.Web3Provider(window.ethereum);
 let signer = provider.getSigner(0);
 return new ethers.Contract(
  proxyFactoryAddress,
  ProxyFactoryArtifact.abi,
  signer
 )
};


export const createNewToken = (tokenName,tokenSymbol,userAddress) => {
 minimalProxyContractInstance.methods.createNewToken(tokenName,tokenSymbol,userAddress).call();
}

