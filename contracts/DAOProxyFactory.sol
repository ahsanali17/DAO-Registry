// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAOProxyFactory is Ownable {
 
 // Variables Below:
 
 // Address of the deployed base contract that will be copied
 address public implmentationContract;
 
 // Array that will hold the addresses of all the copies created
 address[] public allClones;
 
 // Event that will be emitted once a new contract copy is instantiated
 event NewClone(address _clone);
 
 // constructor 
 constructor(address _implementation) {
  implmentationContract = _implementation;
 }
 
 //Function that create a new instance of a DAO from frontend
 function createNewDao(
  uint _totalAmount,
  string memory _nameOfCoinm,
  string memory _coinSymbol,
  address[] memory _members
  ) payable external returns(address instance) {
   // Clone the base contract and store it's address into local variable instance
   instance = Clones.clone(implmentationContract);
   // Return true, if calling the constructor/initialize function from the instance contract address 
   (bool, success, ) = instance.call{value:msg.value}(abi.encodeWithSignature("initialize(uint,string,string,address)", _totalAmount, _nameOfCoin, _coinSymbol, _members));
   allClones.push(instance);
   emit NewClone(instance);
   return instance;
 }
}