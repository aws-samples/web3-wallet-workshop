---
title: Tokens List on Web3 Wallet
weight: 52
---

We can check the token list of specific ethereum address by using AMB query. 
We cannot see the token list of bitcoin address. Because Bitcoin network doesn't support smartcontract feature which can make various tokens.

Actually, we can see the various and experimental tokens from Vitalik's ethereum address. With Peccy's address, we can see the typical type of tokens feature rather then Vitalik's address.

### 1. Vitalik's Token list 

Choose Vitalik again, go to the balance window. 

![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/vitalik_balances.png)

And click the Asset bar, go to the transaction list window.
Actually, We alrady saw this window at before stage. But difference of this stage is we are going to click the tokens button.

![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/vitalik_trx_list.png)

Click the Tokens button. And go to the token window . The tokens are belonging to Vitalik's address. 

![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/vitalik_token_list1.png)

We can see the various token lists including ether. Typically we call ether is crypto, not token. We usually called the tokens is made by ERC-20,721,1155 standard on ethereum network. But AMB api can call the ether from same api call. So All digital assets are here. :-) 

Click the Next button. Then we can see the next token list. Click the Previous button is vice versa. The picture in below is the next token list.

 ![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/vitalik_token_list2.png)

* Note : Only ERC-721, 1155 could have a tokenID attribute.

### 2. Peccy's Token list 

Peccy has both bitcoin and ethereum address. It means we can see the peccy's token list. So we should go the balance of peccy window.

 ![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/peccy_balances.png)

Click the Ethereum bar and go to the transaction list of the ethereum address.

 ![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/peccy_trx_list.png)

Click the Tokens button above the ethereum balance bar. After click , we can see the token list that Peccy has.

 ![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/peccy_token_list1.png)

 As we can see. NFT token has the tokenID and amount is 1. This is the typical ERC-721 format. And we also can see the ERC-20 tokens.
 Click the next button, We can see the next token list. 

  ![Main front window](/contents/static/04-token-list/01-token-list-query-wallet/peccy_token_list2.png)



Next: [(Optional) Use Query Editor from Console](../../05-optional-query-console/index.en.md)
