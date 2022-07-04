import { ethers } from 'ethers';
import { tokenABI, tokenContractAddress } from './constants';

const { ethereum } = window;

// Creation of smart contract instance 
 const createTokenContract = () => {
  // We get the provider from metamask
  let provider = new ethers.providers.Web3Provider(ethereum);
  // The signer is retrieved using the provider
  let signer = provider.getSigner(0);
  // We can use the our deployed minimalProxy address & abi plus the signer to create a new instance of our smart contract
  const tokenContract = new ethers.Contract(tokenContractAddress,tokenABI,signer);
  return tokenContract;
 };

// Global contract variable
const tokenContract = createTokenContract();

// =====================================================================
// Smart Contract Methods
// =====================================================================

 export const changeNameAndSymbol = async ({newName,newSymbol}) => {
  const changeNameAndSymbol = await tokenContract.changeNameAndSymbol(newName,newSymbol);
  return changeNameAndSymbol
 }

 //account, The address of the account holding the funds
 //spender, The address of the account spending the funds 
 export const allowance = async ({account,spender}) => { 
  const allowance = await tokenContract.allowance(account,spender);
  return allowance;
 }

 //spender, The address of the account which may transfer tokens
 //rawAmount, The number of tokens that are approved (2^256-1 means infinite)
 export const approve = async (spender,rawAmount) => { 
  const approve = await tokenContract.approve(spender,rawAmount);
  approved();
  return approve;
 }

 export const balanceOf = async (account) => { 
  const balanceOf = await tokenContract.balanceOf(account);
  return balanceOf;
 }

 // Transfer tokens from msg.sender to destination address
 export const transfer = async (destinationAddress,rawAmount) => {
  const transfer = await tokenContract.transfer(destinationAddress,rawAmount);
  transferred();
  return transfer;
 }

 // src, The address of the source account
 // dst, The address of the destination account
 // rawAmount, The number of tokens to transfer
 export const transferFrom = async (src,dst,rawAmount) => {
  const transferFrom = await tokenContract.transferFrom(src,dst,rawAmount);
  transferred();
  return transferFrom;
 }

 //delegatee, The address to delegate votes to, so from msg.sender to delegate
 export const delegate = async (delegatee) => {
  const delegated = await tokenContract.delegate(delegatee);
  delegateChanged();
  delegateVotesChanged();
  return delegated;
 }

 //delegatee, The address to delegate votes to
 //nonce, The contract state required to match the signature
 //expiry, The time at which to expire the signature
 //v, The recovery byte of the signature
 //r, Half of the ECDSA signature pair
 //s, Half of the ECDSA signature pair
 export const delegateByMultiSig = async (delegatee,nonce,expiry,v,r,s) {
  const delegatedByMultiSig = await tokenContract.delegateByMultiSig(delegatee,nonce,expiry,v,r,s);
  delegateChanged();
  delegateVotesChanged(); 
  return delegatedByMultiSig;
 }

 // Will get the current votes balance for account and return number of votes on account
 //account, The address of the account to be checked
 export const getCurrentVotes = async (account) => {
  const getCurrentVotes = await tokenContract.getCurrentVotes(account);
  return getCurrentVotes;
 }

 export const getPriorVotes = async (account,blockNumber) => {
  const getPriorVotes = await tokenContract.getPriorVotes(account,blockNumber);
  return getPriorVotes;
 }

// =====================================================================
// Event Listeners
// =====================================================================

 function approved() { 
  tokenContract.on("Approval",(owner,spender,amount) => {
   let info = {
    owner,
    spender,
    amount
   };
   console.log(JSON.stringify(info,null,4));
  })
 }

 function transferred() {
  tokenContract.on("Transfer",(from,to,amount) => {
   let info = {
    from,
    to,
    amount
   };
   console.log(JSON.stringify(info,null,4));
  })
 }

 function delegateVotesChanged() {
  tokenContract.on("DelegateVotesChanged",(delegate,previousBalance,newBalance) => {
   let info = {
    delegate,
    previousBalance,
    newBalance
   }
   console.log(JSON.stringify(info,null,4));
  })
 }
 
 function delegateChanged() {
  tokenContract.on("DelegateChanged",(delegator,fromDelegate,toDelegate) => {
   let info = {
    delegator,
    from: fromDelegate,
    to: toDelegate,
   }
   console.log(JSON.stringify(info,null,4));
  })
 }
 