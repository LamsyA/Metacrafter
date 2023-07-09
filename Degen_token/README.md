# DegenToken

DegenToken is an ERC20-compliant token contract that allows users to mint, transfer, redeem, and burn tokens. It extends the functionality of the OpenZeppelin ERC20 implementation.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contract Details](#contract-details)
  - [Modifiers](#modifiers)
  - [Functions](#functions)
- [License](#license)

## Prerequisites

- Solidity version 0.8.0 or higher
- OpenZeppelin Contracts version [3.0.0, 4.0.0)

## Installation

To use the DegenToken contract, you need to import the required dependencies:

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

## Usage

1. Deploy the DegenToken contract on the Ethereum network using Solidity version 0.8.0 or higher.

2. Mint tokens by calling the `mint` function, which can only be called by the contract owner:

   ```solidity
   function mint(address account, uint256 amount) external onlyOwner
   ```

3. Transfer tokens between addresses using the `transfer` function:

   ```solidity
   function transfer(address recipient, uint256 amount) public override returns (bool)
   ```

   Note: The transferred amount must be greater than zero.

4. Redeem tokens for in-game items using the `redeem` function:

   ```solidity
   function redeem(uint256 amount) external
   ```

   The function deducts the specified amount of tokens from the sender's balance and provides in-game items based on the redemption amount.

   - If the amount is greater than or equal to 1000 (`SUPER_PACK`), a super pack is redeemed. The count of redeemed super packs is incremented for the sender.

   - If the amount is greater than or equal to 100 (`NORMAL_PACK`), a normal pack is redeemed. The count of redeemed normal packs is incremented for the sender.

   Note: The redeemed amount must be greater than zero, and the sender must have a sufficient token balance.

5. Burn tokens by calling the `burn` function:

   ```solidity
   function burn(uint256 amount) external
   ```

   The function reduces the sender's token balance by the specified amount. The amount burned must be greater than zero, and the sender must have a sufficient token balance.

6. Check the token balance of an address by calling the `balance` function:

   ```solidity
   function balance() external view returns (uint256)
   ```

   The function returns the token balance of the caller.

## Contract Details

### Modifiers

- `onlyOwner`: Restricts the execution of a function to only the contract owner.

### Functions

- `constructor()`: Initializes the DegenToken contract. It sets the contract owner to the address that deployed the contract.

- `mint(address account, uint256 amount) external onlyOwner`: Mints the specified amount of tokens and assigns them to the provided account. Only the contract owner can call this function.

- `transfer(address recipient, uint256 amount) public override returns (bool)`: Transfers the specified amount of tokens from the sender's address to the recipient's address. The transferred amount must be greater than zero.

- `redeem(uint256 amount) external`: Redeems tokens for in-game items based on the specified amount. The function deducts the tokens from the sender's balance and provides the appropriate in-game items. The redeemed amount must be greater than zero, and the sender must have a sufficient token balance.

- `burn(uint256 amount) external`: Burns the specified amount of tokens from the sender's address. The burned amount must be greater than zero, and the sender must have a sufficient token balance.

- `balance() external view returns (uint256)`: Retrieves the token balance of the caller.

## License

This contract is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.