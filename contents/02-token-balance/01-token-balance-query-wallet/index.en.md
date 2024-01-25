---
title: Deposited Balance on Web3 Wallet
weight: 31
---

The purpose of this phase is to see how AMB query can operate in the wallet App.
We already deploy the API have been made by the lambda function using AMB Query APIs.
Using these developed APIs, We can see the operations of AMB Query.

First Step is getting token lists from the user's address.
We can set up the env file that includes the wallet addresses and API addresses and server. We already set up the api address at previous step.


We have three fixed users. (wallet address is fixed)

* Satoshi : Creator of Bitcoin, who has a transaction at genesis block.
* Vitalik : Creator of Ethereum, he has various tokens including ERC-20, 721
* Peccy : Virtual user who has bitcoin and ethereum including tokens both.

 
Now, you can start first step as choosing the user.

### 1. Choose the Satoshi. and Check the balance.

You choose the Satoshi who is the creator of Bitcoin.

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/user_list.png)

Click the Satoshi bar and window transit to the balance window.

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/satoshi_balances.png)

Satoshi had mined a first block of bitcoin, the genesis block. And rewarded 50 BTC.
plus many follower of bitcoin sent tiny bitcoins to the sotoshi's bitcoin address for fun or donation. 

In the early period of bitcoin, reward of the mining is 50 BTC but this reward has halved every four years. Current reward is 6.25. And next halves is at april or may in 2024.



### 2. Choose the Vitalik. and Check the balance.

Click back button twice and you choose the Vitalik who is the creator of Ethereum.
Click the Vitalik bar and window transit to the balance window.

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/vitalik_balances.png)

Many people may be suprised when you see the vitalik's balance. It is somewhat small amount rather than we imagined. 

Remember. Vitalik's ethereum address is not only one.


### 3. Choose the Peccy. and Check the balance.

Click back button twice and You choose the Peccy who has the bitcoin address and ethereum address.
Click the Peccy bar and window transit to the balance window.

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/peccy_balances.png)

You can see the Peccy's bitcoin address balance at bitcoin exploer. 

url : https://bitaps.com/1MZX6ExdDzWefGbD6Dc4bShdBRoNA3ijLF

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/peccy_bitcoin_explore.png)

And ethereum address balance also can see at etherscan.

url : https://etherscan.io/address/0x188B264AA1456B869C3a92eeeD32117EbB835f47 

![Main front window](/contents/static/02-token-balance/01-token-balance-query-wallet/peccy_etherscan.png)

----
Next: [Query Token Transaction List](../../03-token-trx-list/index.en.md)