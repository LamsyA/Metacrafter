// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DegenToken is ERC20 {
    address private owner;

    uint256 constant SUPER_PACK = 1000;
    uint256 constant NORMAL_PACK = 100;
    mapping(address => string) public redeemedItems;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() ERC20("DegenToken", "DGN") {
        owner = msg.sender;
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount > 0, "Amount must be greater than zero.");
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function redeem(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance.");

        // Deduct tokens and provide in-game items
        if (amount >= SUPER_PACK) {
            // Redeem super pack

            redeemedItems[msg.sender] = "SUPER_DEG"; // Increment the count of redeemed super packs
        } else if (amount >= NORMAL_PACK) {
            // Redeem normal pack
            redeemedItems[msg.sender] = "NORMAL_DEG"; // Increment the count of redeemed normal packs
        } else {
            revert("Invalid redemption amount.");
        }

        _burn(msg.sender, amount);
    }

    function burn(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero.");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance.");

        _burn(msg.sender, amount);
    }

    function balance() external view returns (uint256) {
        return balanceOf(msg.sender);
    }
}
