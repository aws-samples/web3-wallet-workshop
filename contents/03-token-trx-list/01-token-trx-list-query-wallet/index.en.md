---
title: Transactions List on Web3 Wallet
weight: 42
---

In this step, we can go though the detail of the wallet function. The transaction list function is the hole transaction list of the specific wallet address (Bitcoin, Ethereum). These transactions include not only crypto transactions but also token transactions. (Token transactions are only for ethereum address)
We can also use the next transaction list api like next token list.

And then we can go though the detail information of the specific transaction that we want to see. 
We can see the satoshi's transactions for bitcoin. And see the vitalik's transactions for ethereum.

### 1. Satoshi's transaction list and detail

First, We choose the satoshi and then we can see the satoshi's bitcoin balance.
We can click this balance bar and can go through the transaction list of satoshi's address.

![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/satoshi_balances.png)

We can check the recent transaction list of satoshi's address. 
To see the next transaction list we can click the Next button.


![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/satoshi_trx_list1.png)

And we can see the next transaction list. To see previous transaction list we can also click the Previous button.

![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/satoshi_trx_list2.png)

To see the transaction detail, we can click the transaction bar and can see the transaction detail of specific transaction. 
In Bitcoin case, we can see the BITCOIN_VIN , BITCOIN_VOUT events.
We would like to explain by using in below capture picture.

- BITCOIN_VIN event is the deposit event of address 1MTKuR4CHJEZ1qSvoHyE8MDrVs4f1HQP5L.

- BITCOIN_VOUT events are the withdrawal event of address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa

* BITCOIN_VOUT = 0.00001 + 0.01644084 = 0.01645084

* Transaction Fee = 0.00004164

* BITCOIN_VIN 0.01649248  = BITCOIN_VOUT  + Transaction Fee


![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/satoshi_trx_detail.png)

### 2. Vitalik's transaction list and detail

We also want to see the transaction list of vitalik's address. We choose vitalik on initial page, and Click the
Ethereum balance bar like satoshi. And we can see the recent transaction list of the vitalik.
To see the next transaction list we can click the Next button.

![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/vitalik_trx_list1.png)

And we can see the next transaction list. To see previous transaction list we can also click the Previous button.

![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/vitalik_trx_list2.png)

To see the transaction detail, we can click the transaction bar and can see the transaction detail of specific transaction. 

In ethereum case, we can see the many events which include the CA(Contract Address) and From/To address and Event.
There are various event type (ETH,ERC20,ERC721,ERC1151)

Note : there are two types of ethereum address.
EOA(Externally Owned Accounts) : Address using wallet.
CA(Contract Address) : Smart Contract Address we usally use as identifier of each token.

![Main front window](/contents/static/03-token-trx-list/01-token-trx-list-query-wallet/vitalik_trx_detail.png)

Peccy has both bitcoin and ethereum address. You can see the transaction lists and transaction detail of peccy as follow same step. 

----
Next: [Query Tokens List](../../04-token-list/index.en.md)
