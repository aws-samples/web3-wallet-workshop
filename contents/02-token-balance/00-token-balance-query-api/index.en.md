---
title: Get Deposited Balance by API
weight: 200
---


Now, let's start to develop Web3 Wallet using AMB Query. AMB Query has a GetTokenBalance API that get balance of Bitcoin and Ethereum native coin and tokens an individual owns. API supports ERC-20,ERC-721,ERC-1155 tokens. We'll use this API to get balance of Vitalik, the creator of Ethereum, and Satoshi, the creator of Bitcoin, as well as create an API to get the balance of an individual and test API.


1. Go to [Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/) and find the Function whose names starts with **"Web3WalletBackendStack"**.Click the function.

![](/contents/static/02-token-balance/00-token-balance-query-api/find_function.png)

2. In the code, you can find **# start #** word. In this workshop, we will make our wallet by uncommenting the parts commented below one by one. 

![](/contents/static/02-token-balance/00-token-balance-query-api/all_services.png)

3. First, uncomment step1 and remove the pass command. When you're done, it should look like the image below.

![](/contents/static/02-token-balance/00-token-balance-query-api/token_list_api_uncomment.png)

4. Deploy Lambda function.

![](/contents/static/02-token-balance/00-token-balance-query-api/lambda_deploy.png)


5. Before Testing the Lambda, Let's see how to build for token_balance service. First, let's find and look through the step1_get_token_balance function. With this function, we can get Ethereum/Bitcoin balance (but not for Ethereum tokens)

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_function.png)


If you look at the function, it takes multiple addresses as parameters and separates them by the character '&' so that it can handle more than one address. 

```python
address_list = path_params["address"].split("&")
```

Then _get_token_identifier_by_address function determines whether the address is an Ethereum or Bitcoin address and sets the appropriate value. 
(For Ethereum, put eth in the tokenIdentifier parameter and btc for Bitcoin. If you do not use this tokenIdentifer parameter, you can get other Ethereum tokens.) When you're actually developing a service, you should not use _is_ethereum_address function when you're checking the address. You should have logic to check the length with a regular expression, and logic to check if the address is in the [Bitcoin](https://bitcoin.design/guide/glossary/address/) or [Ethereum address](https://info.etherscan.com/what-is-an-ethereum-address/) format. Since this is a workshop, we've left out a lot of that.

```python
def _is_ethereum_address(address):
    return True if address.startswith('0x') else False

def _get_token_identifier_by_address(address):
    return TOKEN_IDENTIFIER_MAINNET.get('eth') if _is_ethereum_address(address) else TOKEN_IDENTIFIER_MAINNET.get('btc')
    ...
    tokenIdentifier = _get_token_identifier_by_address(address),
```

The service works differently for single and multiple addresses: for single addresses, it uses AMB Query's `get_token_balance` API,

```python
    balance = query.get_token_balance(
        tokenIdentifier = _get_token_identifier_by_address(address),
        ownerIdentifier = {"address": address},
    )
```

and for multiple addresses, it uses `batch_get_token_balance` API. The parameter value allows you to send more than one address at the same time. 

```python
            req.append(
                {
                    'tokenIdentifier': _get_token_identifier_by_address(address),
                    'ownerIdentifier': {
                        'address': address
                    }
                }
            )
                    
        response = query.batch_get_token_balance(getTokenBalanceInputs=req)
```

 6. Now we go to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis) and click APIs named **Wallet**. 

![](/contents/static/02-token-balance/00-token-balance-query-api/wallet_api.png)

 7. From the SideMenu Bar, click **Resources**. Then 4 APIs will be appeared. Select **step1** and **GET** method. Click **Test** Button. 

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_test.png)

 8. Initially, we'll test with Satoshi's address just for fun. He's the creator of Bitcoin and many people are sending him Bitcoins, and we'll see how much he has. Put **satoshi** value to **Path** parameter. You can see the result below. 

![](/contents/static/02-token-balance/00-token-balance-query-api/step0_test_satoshi.png)

![](/contents/static/02-token-balance/00-token-balance-query-api/step0_test_satoshi_result.png)

 9. If you do the same thing with Vitalik, you can put **vitalik** value. 

![](/contents/static/02-token-balance/00-token-balance-query-api/step0_test_vitalik.png)

 10. Now we are testing with a person's Bitcoin and Ethereum addresses. We will use addresses below

```
Ethereum address : 0x188B264AA1456B869C3a92eeeD32117EbB835f47
Bitcoin address : 1MZX6ExdDzWefGbD6Dc4bShdBRoNA3ijLF
```

 11. We have already looked through the step1 function. If we have more than one address, we use '&' character as a seperator to get all the values from different Network. (This is one of the methods you can use.) So now we put 
 **`0x188B264AA1456B869C3a92eeeD32117EbB835f47&1MZX6ExdDzWefGbD6Dc4bShdBRoNA3ijLF`** value to **Path** parameter. 

![](/contents/static/02-token-balance/00-token-balance-query-api/step0_test_two_addresses.png)

 12. Can you see the difference in the result? The result has two balances - Bitcoin and Ethereum. 

![](/contents/static/02-token-balance/00-token-balance-query-api/step0_test_multi_result.png)


----
Next: [Deposited Balance on Web3 Wallet](../01-token-balance-query-wallet/index.en.md)