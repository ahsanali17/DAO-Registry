import React from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../util/constants';

const { ethereum } = window;

const createMinimalProxyContract = () => {
  // We get the provider from metamask
  let provider = new ethers.providers.Web3Provider(ethereum);
  // The signer is retrieved using the provider
  let signer = provider.getSigner(0);
  // We can use the our deployed minimalProxy address & abi plus the signer to create a new instance of our smart contract
  const minimalProxyContract = new ethers.Contract(contractAddress,contractABI,signer);
  return minimalProxyContract;
};

// We export this function so that it can be used by our form to insert the params which would then call the createNewToken method for us 
export const createNewToken = async ({tokenName,tokenSymbol,userAddress}) => {
 // We're essentially storing the new smart contract instance into a variable to let us use more methods.
 const ProxyContract = createMinimalProxyContract();
 // Using the stored contract we can access functions that are directly from the smart contract and when can use this to create a new token, the params here will be given to us from the frontend form 
 const newToken = await ProxyContract.createNewToken(userAddress,tokenName,tokenSymbol);
 // Here we have an event listener that will return the address of the cloned tokens address 
 newCloneListener();
 return newToken;
}

export const createNewTimeLock = async ({userAddress, delay}) => {
 const ProxyContract = createMinimalProxyContract();
 const newTimeLock = await ProxyContract.createNewTimeLock(userAddress,delay);
 newCloneListener();
 return newTimeLock;
}

export const createNewDao = async ({timelockAddress,tokenAddress,guardian}) => {
 const ProxyContract = createMinimalProxyContract();
 const newDao = await ProxyContract.createNewDao(timelockAddress,tokenAddress,guardian);
 newCloneListener();
 return newDao;
}

// Event Listener
function newCloneListener() {
 const ProxyContract = createMinimalProxyContract();
 // Let me listen in on the event NewClone, when it passes give me information, like new contract address + data, then console log that data.
 ProxyContract.once("NewClone",(instance, event) => {
  let info = {
    deployedAddress: instance,
    data: event
  };
  console.log(JSON.stringify(info,null,4));
 });
}