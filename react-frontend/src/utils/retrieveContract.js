import { ethers } from "hardhat";
const ProxyFactoryArtifact = require("./ProxyFactory.json");
const proxyFactoryAddress = '0xc48C32E52C80076ac628187bAc8D9D49392F050A';

export async function retrieveContract(tokenName,tokenSymbol,userAddress) {
 let provider = new ethers.providers.Web3Provider(window.ethereum);
 let signer = provider.getSigner(0);
 
 
 
 const minimalProxyContract = new ethers.Contract(proxyFactoryAddress,ProxyFactoryArtifact,provider | signer);
 
 await minimalProxyContract.createNewToken(tokenName, tokenSymbol, userAddress)
 
 
}