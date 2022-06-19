//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "contracts/Governor.sol";

contract DAO is Governor{

    //members of the DAO
    address[] public members;
    //total supply of coins
    uint public totalAmount;

    string public nameOfCoin;
    string public coinSymbol;
    
    //should prob change this to initializer function when using with minimal proxy
    constructor(uint _totalAmount,string memory _nameOfCoin, string memory _coinSymbol, address[] memory _members)ERC20(_nameOfCoin,_coinSymbol){
        //initialize variables
        totalAmount = _totalAmount;
        nameOfCoin = _nameOfCoin;
        coinSymbol = _coinSymbol;
        members = _members;
        
        //make sure there is enough in the total supply for everyone to have one
        require(totalAmount>=members.length);
        //give one to every account in members
        for(uint i = 0; i < members.length; i++){
            _mint(members[i], 1 * (10**18));
        }
    }
}
