const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");


// console.log(time);
// console.log(loadFixture);
// console.log(anyValue);

describe("MyTest", function () {
  async function runEveryTime() {
    const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1000000000;

    const lockedAmount = ONE_GWEI;
    const unlockedTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

    // console.log(ONE_YEAR_IN_SECONDS, ONE_GWEI);
    // console.log(unlockedTime);

    const [owner, otherAccounts] = await ethers.getSigners();
    // console.log(owner);
    // console.log(otherAccounts);

    const MyTest = await ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockedTime, { value: lockedAmount });

    return { myTest, unlockedTime, lockedAmount, owner, otherAccounts };
  }

  describe("Deployment", function () {
    it("Should check unlocked time", async function () {
      //The loadFixture method is used to re run a function
      const { myTest, unlockedTime } = await loadFixture(runEveryTime);

      console.log(unlockedTime);
      console.log(myTest);

      expect(await myTest.unlockedTime()).to.equal(unlockedTime);
    });
    it("Should set the right owner", async function () {
      const { myTest, owner } = await loadFixture(runEveryTime);

      expect(await myTest.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to MyTest", async function () {
      const { myTest, lockedAmount } = await loadFixture(runEveryTime);

      expect(await ethers.provider.getBalance(myTest.target)).to.equal(
        lockedAmount
      );
    });

    // CONDITION CHECK
    it("Should fail if the unlocked is not in the future", async function () {
      const latestTime = await time.latest();
      // console.log(latestTime/60/60/60/24);
      const MyTest = await ethers.getContractFactory("MyTest");
      await expect(MyTest.deploy(latestTime, { value: 1 })).to.be.revertedWith(
        "Unlocked time invalid"
      );
    });

    runEveryTime();
  });
});
