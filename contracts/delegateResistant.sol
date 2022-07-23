// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DelegateResistant {
    address public helper;
    address public owner;
    uint public num;

    constructor(address _helper) {
        helper = _helper;
        owner = msg.sender;
    }

    function setNum(uint _num) public {
        (bool success, bytes memory value) = helper.delegatecall(
            abi.encodeWithSignature("setNum(uint256)", _num)
        );
        require(success, "delegate call successfull");
        num = bytesToUint(value);
    }

    ///@dev convert bytes to uint
    function bytesToUint(bytes memory b) internal pure returns (uint256) {
        uint256 number;
        for (uint i = 0; i < b.length; i++) {
            number =
                number +
                uint(uint8(b[i])) *
                (2**(8 * (b.length - (i + 1))));
        }
        return number;
    }
}
