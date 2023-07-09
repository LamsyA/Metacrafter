const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DegenToken", function () {
  let DegenToken;
  let token;
  let owner;
  let addr1;
  let addr2;

  const SUPER_PACK = 1000;
  const NORMAL_PACK = 100;

  beforeEach(async function () {
    DegenToken = await ethers.getContractFactory("DegenToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    token = await DegenToken.deploy();
    await token.deployed();
  });

  it("should have correct name, symbol, and decimals", async function () {
    expect(await token.name()).to.equal("DegenToken");
    expect(await token.symbol()).to.equal("DGN");
    expect(await token.decimals()).to.equal(18);
  });

  it("should mint tokens to the owner", async function () {
    const initialBalance = await token.balanceOf(owner.address);
    expect(initialBalance).to.equal(0);

    await token.mint(owner.address, 1000);

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(1000);
  });

  it("should transfer tokens between accounts", async function () {
    await token.mint(owner.address, 1000);

    await token.transfer(addr1.address, 500);

    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(500);

    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(500);
  });

  it("should allow redemption of tokens for super pack", async function () {
    await token.mint(owner.address, SUPER_PACK);

    const initialRedeemedItem = await token.redeemedItems(owner.address);
    expect(initialRedeemedItem).to.equal("");

    await token.redeem(SUPER_PACK);

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(0);

    const redeemedItem = await token.redeemedItems(owner.address);
    expect(redeemedItem).to.equal("SUPER_DEG");
  });

  it("should allow redemption of tokens for normal pack", async function () {
    await token.mint(owner.address, NORMAL_PACK);

    const initialRedeemedItem = await token.redeemedItems(owner.address);
    expect(initialRedeemedItem).to.equal("");

    await token.redeem(NORMAL_PACK);

    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(0);

    const redeemedItem = await token.redeemedItems(owner.address);
    expect(redeemedItem).to.equal("NORMAL_DEG");
  });
});
