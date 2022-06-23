// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProxyFactory is Ownable {
 
 // Variables Below:
 address public guardian;
 
 // Address of the deployed base contract that will be copied
 address public implementationContract;
 
 // Array that will hold the addresses of all the copies created
 address[] public allClones;
 
 // Event that will be emitted once a new contract copy is instantiated
 event NewClone(address _clone);
 
 // constructor 
 constructor(address _implementation) {
  implementationContract = _implementation;
 }
 
 //Function that create a new instance of a DAO from frontend
 function createNewDao(address timelockAddress, address tokenAddress, address guardian) 
 payable external returns(address instance) {
     guardian = msg.sender;
   // Clone the base contract and store it's address into local variable instance
   instance = Clones.clone(implementationContract);
   // Return true, if calling the constructor/initialize function from the instance contract address 
   (bool success, ) = instance.call{value:msg.value}(abi.encodeWithSignature("initialize(address,address,address)", timelockAddress, tokenAddress, guardian));
   allClones.push(instance);
   emit NewClone(instance);
   return instance;
 }
}