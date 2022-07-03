import React from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../util/constants';


export const FormContext = React.createContext();

// const { ethereum } = window;

const createMinimalProxyContract = () => {

  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner(0);
  console.log(contractAddress,contractABI, signer);
  const minimalProxyContract = new ethers.Contract(contractAddress,contractABI,signer);
  
  return minimalProxyContract;
};

export const createNewToken = async ({tokenName,tokenSymbol,userAddress}) => {
 const ProxyContract = createMinimalProxyContract();
 const newToken = await ProxyContract.createNewToken(userAddress,tokenName,tokenSymbol);
 console.log(newToken);
 
 return newToken;
}

export const createNewTimeLock = async ({userAddress, delay}) => {
 const ProxyContract = createMinimalProxyContract();
 const newTimeLock = await ProxyContract.createNewTimeLock(userAddress,delay);
 console.log(newTimeLock);
 return newTimeLock;
}

export const createNewDao = async ({timelockAddress,tokenAddress,guardian}) => {
 const ProxyContract = createMinimalProxyContract();
 const newDao = await ProxyContract.createNewDao(timelockAddress,tokenAddress,guardian);
 console.log(newDao);
 return newDao;
}