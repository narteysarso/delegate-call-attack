// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract HelperDelegateCallAttackResistant {
    ///@dev delegate call attack is eliminated by prevent the target contract
    /// from modifying state.
    /// Rather it returns its value

    function setNum(uint _num) public returns (uint) {
       return _num;
    }
}