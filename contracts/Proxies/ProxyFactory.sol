// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProxyFactory is Ownable {
 
 // Variables Below:
 address public guardian;
 
 // Address of the deployed Token contract that will be copied
 address public implementationTokenContract;

 // Address of the deployed TimeLock contract that will be copied
 address public implementationTimeLockContract;

 // Address of the deployed GovernorAlpha contract that will be copied
 address public implementationGovernorContract;
 
 // Array that will be emitted once a new Token contract copy is instantiated
 address[] public allTokenClones;
 
 // Array that will be emitted once a new TimeLock contract copy is instantiated
 address[] public allTimeLockClones;
 
 // Array that will hold the addresses of all the Governor copies created
 address[] public allGovernorClones;
 
 // Event that will be emitted once a new contract copy is instantiated
 event NewClone(address _clone);
 
 // constructor 
 constructor(address _tokenImplementation, address _timeLockImplementation, address _Daoimplementation) {
  implementationTokenContract = _tokenImplementation;
  implementationTimeLockContract = _timeLockImplementation;
  implementationGovernorContract = _Daoimplementation;
 }
 
  //Function that creates a new instance of a Token
  function createNewToken(address userAddress) payable external returns(address instance) {
    // Clone the base contract and store it's address into local variable instance
   instance = Clones.clone(implementationTokenContract);
   // Return true, if calling the constructor/initialize function from the instance contract address 
   (bool success, ) = instance.call{value:msg.value}(abi.encodeWithSignature("initialize(address)", userAddress));

   require(success);
   allTokenClones.push(instance);
   emit NewClone(instance);
   return instance;
  }
  
  //Function that creates a new instance of a Token
  function createNewTimeLock(address userAddress) payable external returns(address instance) {
    // Clone the base contract and store it's address into local variable instance
   instance = Clones.clone(implementationTimeLockContract);
   // Return true, if calling the constructor/initialize function from the instance contract address 
   (bool success, ) = instance.call{value:msg.value}(abi.encodeWithSignature("initialize(address)", userAddress));

   require(success);
   allTimeLockClones.push(instance);
   emit NewClone(instance);
   return instance;
  }
  
  //Function that create a new instance of a DAO from frontend
  function createNewDao(address timelockAddress, address tokenAddress, address guardian) 
  payable external returns(address instance) {
      guardian = msg.sender;
    // Clone the base contract and store it's address into local variable instance
    instance = Clones.clone(implementationGovernorContract);
    // Return true, if calling the constructor/initialize function from the instance contract address 
    (bool success, ) = instance.call{value:msg.value}(abi.encodeWithSignature("initialize(address,address,address)", timelockAddress, tokenAddress, guardian));

    require(success);
    allGovernorClones.push(instance);   
    emit NewClone(instance);
    return instance;
  }
}