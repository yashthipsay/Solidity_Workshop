const {time, loadFixture,} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const {ethers} = require("hardhat");

console.log(time);
console.log(loadFixture);
console.log(anyValue);

describe("MyTest", function(){
  async function runEveryTime(){
    const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1000000000;

    const lockedAmount = ONE_GWEI;
    const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

    console.log(ONE_YEAR_IN_SECONDS, ONE_GWEI);
    console.log(unlockedTime);


    const [owner, otherAccounts] = await ethers.getSigners();
    console.log(owner);
    console.log(otherAccounts);

    const MyTest = await ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockedTime, {value: lockedAmount});
    

    return {myTest, unlockedTime, lockedAmount, owner, otherAccounts};
  }
 

  describe("Deployment", function () {
    it("")
  })
})