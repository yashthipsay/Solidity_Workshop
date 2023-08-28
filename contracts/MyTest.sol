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

    function callStuff2(bool _fail) external {
        // In this function, based on the stuff1 value, a revert message or a sunccess message is sent
        // in the funcParams variable, the sucess value is encoded i.e. bytecode level interaction happens
        // then the function is called and and success or variable is recorded and a success or revert message is sent according to that
        bool success;
        bytes memory returnValueEncoded;
        bytes memory funcParams = abi.encodeWithSelector(conB.stuff1.selector, _fail);
        (success, returnValueEncoded) = address(conB).call(funcParams);

        if(success){
            // value is returned according to the return type of stuff1
            val = abi.decode(returnValueEncoded, (uint256));
        }
        else {
            // Assume a revert(and not a user defined function)
            assembly {
                // Remove the function seector
                returnValueEncoded := add(returnValueEncoded, 0x04)

            }
            string memory revertReason = abi.decode(returnValueEncoded, (string));
            revert(revertReason);
        }
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