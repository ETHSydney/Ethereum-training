#Contract Design Patterns

This contract implements a simple joint account, allowing special members of the contract to spend contract funds. It also implements a token with standard functions. 

The purpose of this contract is to demonstrate;

###Events

-- See http://solidity.readthedocs.io/en/latest/contracts.html?highlight=events#events

###Access control

- See function modifier on line 50 of Access.sol and http://solidity.readthedocs.io/en/latest/contracts.html?highlight=events#function-modifiers

###Commenting

- See https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format

###Data structures for membership of the contract

- A common pattern is to restrict access to certain functions based on some sort of membership to the contract.

###Testing using the Truffle Framework

- See test folder
