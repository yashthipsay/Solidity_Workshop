//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//IMPORT THE HARDHAT CONSOLE
import "hardhat/console.sol";

contract ContractA{
    ContractB immutable public conB; //Creating a cross contract call
    //any changes done in contract B will change the state of contract A
    //contract B has context of contract A
    uint256 public val;

    constructor(address _conB) {
        conB = ContractB(_conB);

    }

    function callStuff1(bool _fail) external {
        val = conB.stuff1(_fail);

    }
    uint256 public val2;
}

contract ContractB {
    uint256 bVal;
    address public addr;
    mapping(address => uint256) public balances;

    function stuff1(bool _fail) external returns(uint256) {
        require(!_fail, "Failed");
        bVal = 2;
        return 3;
    }
}