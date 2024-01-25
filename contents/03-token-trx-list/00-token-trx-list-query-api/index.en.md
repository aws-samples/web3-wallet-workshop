---
title: Get Transactions List by API
weight: 41
---

AMB Query has a ListTransactions API that lists all transactions with provided address. ListTransactions API returns transactionHash and transaction Timestamp. So if you want to get transaction fee or other values of transactions, use another API. (We will use this API later.)

1. Go to [Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/) and find the Function whose names starts with **"Web3WalletBackendStack"**.Click the function.

![](/contents/static/02-token-balance/00-token-balance-query-api/find_function.png)

2. In the code, you can find **# start #** word. 

![](/contents/static/02-token-balance/00-token-balance-query-api/all_services.png)

3. Now we uncomment step2 and step3 and remove the pass command. When you're done, it should look like the image below. Deploy Lambda.

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/uncomment_api.png)

4. Before Testing the Lambda, Let's see how to build for transaction List service. First, let's find and look through the **step2_list_transactions** function. With this function, we can get transactions List (but not for Balance)

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/step2_function.png)


5. Pagination function is also available and the required request parameters are the address and network type. Since this is a transaction, it also offers another feature: you can set the ascending and descending order based on time. This time, we are using Descending order. 

```python
    arguments = {
        "network": path_params["network"],
        "address": address,
        "maxResults": int(query_params["maxResults"]) if _has_maxResult(query_params) else DEFAULT_MAX_RESULTS,
        "sort": {
            "sortBy": "TRANSACTION_TIMESTAMP",
            "sortOrder": "DESCENDING"
        }
    }
```

6. As mentioned earlier, the ListTransactions API does not provide details of the transaction, including the transaction fee. If you only use ListTransactions API to make up services, you can see website like the picture below.

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/only_trx_hash.png)

However, you can use the GetTransaction API and ListTransactionEvents API to get more details about the transaction based on the transaction hash value in the response of GetTransaction API. Now we are making up those functions. Find out **step3_get_transaction_detail** function in Lambda code. 

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/step3_function.png)


7. With GetTransaction API, you can get basic information like **transaction fee** (For Ethereum Network, you can use **gasUsed** value) and **from** and **to** values, other values. We use transaction hash value derived from ListTransactions API.

```python
    arguments = {
        'network': path_params["network"],
        'transactionHash': trxId
    }
```

8. With the same arguments, we can call ListTransactionEvents API. ListTransactionEvents API can give us events Info that are related to certain transaction. The example is below.

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/etherscan-event-list.png)

This events are related to one NFT transaction. 

9. Now we go to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis) and click APIs named **Wallet**. 

![](/contents/static/02-token-list/00-token-list-query-api/wallet_api.png)

10. From the SideMenu Bar, click **Resources**. Then 4 APIs will be appeared. Select **step2** and **GET** method. Click **Test** Button. 

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/step2_api_gateway_test.png)

11. We will test with the same address that we tested eariler. Copy the address and put the copied value to **address** parameter. And also do the same to **network** parameter. 

```
address : 0x188B264AA1456B869C3a92eeeD32117EbB835f47
network : ETHEREUM_MAINNET
```

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/step2_test_parameter.png)


12. Now you can see transactions list. As you can see, data is sorted as descending order and there are transactionHash values those we need. **Copy one of the transactionHash values from the result**

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/step2_result.png)

```
transactionHash : 0x5751c0d018ea00864e2b9a9a2655cb409a786fcd4e1528ec1419ea3623a3ade9
```

13. Let's test step3 now. Select **step3** and **GET** method. Click **Test** Button.

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/api_gateway_test_step3.png)

14. Use the transactionHash value we got just few minutes ago. And put **ETHEREUM_MAINNET** value to **network** parameter. 

```
network : ETHEREUM_MAINNET
transactionHash : 0x5751c0d018ea00864e2b9a9a2655cb409a786fcd4e1528ec1419ea3623a3ade9
```

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/test_step3_param.png)

15. And you can see the result. 

![](/contents/static/03-token-trx-list/00-token-trx-list-query-api/result_events.png)




----
Next: [Transactions List on Web3 Wallet](../01-token-trx-list-query-wallet/index.en.md)

