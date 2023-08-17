// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimeStampInSeconds = Math.round(Date.now()/1000);
const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
const unlockedTime = currentTimeStampInSeconds + ONE_YEAR_IN_SECONDS;

const lockedAmount = hre.ethers.parseEther("1");

const MyTest = await hre.ethers.getContractFactory("MyTest");
const myTest = await MyTest.deploy(unlockedTime, {value: lockedAmount});
console.log(myTest);
await myTest.waitForDeployment();
console.log(`Contract is deployed to ${myTest.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
