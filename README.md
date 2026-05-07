# R Exchange – Decentralized Crypto Exchange Platform
## Overview
R Exchange is a frontend-based decentralized exchange (DEX) project built using HTML, CSS, JavaScript, Ethers.js, and MetaMask integration. The platform allows users to connect their crypto wallet, deposit and withdraw ETH using smart contracts, view live cryptocurrency market data, and simulate token swaps.
This project demonstrates the integration of Web3 technologies with a modern responsive frontend interface.


# Features
## Authentication System
* User Signup and Login
* LocalStorage-based authentication
* Basic email and password validation

## Wallet Integration
* MetaMask wallet connection
* Wallet address display
* ETH balance fetching

## Smart Contract Interaction
* Deposit ETH
* Withdraw ETH
* Fetch blockchain balance
* Smart contract integration using Ethers.js

## Market Dashboard
* Live cryptocurrency market data
* Solana market price
* 24-hour trading volume
* Market capitalization

## Token Swap Simulation
* Simulated token exchange
* Dynamic calculation of output amount

## Responsive UI
* Modern Web3 glassmorphism design
* Mobile responsive layout
* Dark theme interface

# Technologies Used

## Frontend
* HTML5
* CSS3
* JavaScript

## Blockchain & Web3
* Ethers.js
* MetaMask
* Solidity Smart Contract
  
## APIs
* CoinGecko API
  
# Project Structure

```bash
R-Exchange/
│
├── index.html          # Login & Signup Page
├── dashboard.html      # Main Dashboard
├── style.css           # Styling File
├── script.js           # Main Logic & Blockchain Integration
└── README.md           # Documentation
```

---

# Smart Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RExchange {

    mapping(address => uint) public balances;

    function deposit() public payable {
        require(msg.value > 0, "Send ETH");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
}
```

---
# Installation & Setup
## Step 1: Clone Repository

```bash
git clone https://github.com/Shubhi31254/Money-exchange-using-blockchain.git
```

---
## Step 2: Open Project Folder
```bash
cd r-exchange
```

---
## Step 3: Install MetaMask
Install MetaMask browser extension.

## Step 4: Run Project
Open `index.html` in browser.

# How It Works

## Step 1 – User Authentication
Users can create an account and login using email and password.

## Step 2 – Connect Wallet
Users connect MetaMask wallet using Ethers.js.

## Step 3 – Smart Contract Interaction
Frontend connects with deployed Ethereum smart contract.

## Step 4 – Deposit & Withdraw ETH
Users can perform ETH transactions directly from MetaMask.

## Step 5 – Market Data
CoinGecko API fetches live crypto market information.

# API Used
## CoinGecko API
Used for:
* Live Price
* Trading Volume
* Market Capitalization

Example:

```javascript
fetch("https://api.coingecko.com/api/v3/coins/solana")
```

## Login Page
* Secure Login UI
* Signup Option
* Web3 Theme

## Dashboard
* Trading Chart
* Portfolio Section
* Wallet Information
* Swap Panel

# Future Improvements
* Real token swapping using liquidity pools
* Backend authentication using Node.js
* Multi-chain blockchain support
* Real-time WebSocket updates
* Advanced smart contract security
* NFT integration
  
# Limitations
* Authentication is frontend-based only
* Swap functionality is simulated
* No backend database
* Limited smart contract security

# Learning Outcomes
This project helped in understanding:
* Blockchain basics
* Smart contracts
* Web3 integration
* Wallet authentication
* API integration
* Frontend development
* Decentralized applications (DApps)

# Author
Shubhi Saxena


This project is for educational and academic purposes.
