//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

//IMPORT THE HARDHAT CONSOLE
import "hardhat/console.sol";

contract MyTest{
    uint256 public unlockedTime;
    address payable public owner;

    event Withdrawal(uint256 amount, uint256 when);

    constructor(uint256 _unlockedTime) payable{
        require(block.timestamp < _unlockedTime, "Unlocked time invalid");

        unlockedTime = _unlockedTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        require(block.timestamp >= unlockedTime, "Wait till the deadline is finished");
        require(msg.sender == owner, "You're not an owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}