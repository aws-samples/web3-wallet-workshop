---
title: 5. (Optional) AMB Query on the AWS console
weight: 60
---

Until now, we are making a request with API. AMB Query supports requesting data on the AWS Console as well. Let's move on `Managed Blockchain` > `Query editor`.

As we traced Satoshi's transactions during workshop, we continue to look it up with Query Editor from Console. Satoshi's address is `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`.

- Select `BITCOIN_MAINNET` as Blockchain network
- Select `GetTokenBalance` as Query type
- Insert `GetTokenBalance` to Blockchain address
- Run query

You can find current Satoshi's Balace.

![Satoshi balance](/contents/static/05-optional-query-console/01-satoshi-balance.png)

With Satoshi's address, you can find list of transactions, if you select `ListTransactions`. Then, you will get the oldest transaction which hash value is `4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b`. The first transaction from Genesis block.

![Satoshi tx](/contents/static/05-optional-query-console/02-satoshi-first-tx.png)

Please take a look for Ethereum, too. Vitalik's address is known as  `0xab5801a7d398351b8be11c439e05c5b3259aec9b`.

----
Next: [(Optional) Use AMB Access](../06-optional-amb-access/index.en.md)