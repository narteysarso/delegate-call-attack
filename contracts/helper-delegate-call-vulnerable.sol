// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

contract HelperDelegateCallVulnerable {
    uint num;

    function setNum(uint _num) public {
        num = _num;
    }
}