const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-waffle");

async function main() {
  const DegenToken = await ethers.getContractFactory("DegenToken");
  const token = await DegenToken.deploy();
  await token.deployed();
  console.log("DegenToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
