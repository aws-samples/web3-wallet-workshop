---
title: Get Token List by API
weight: 51
---

We are now looking into AMB Query ListTokenBalances API again to get token holdings. API supports ERC-20, ERC-721, ERC-1155 tokens. 

1. Move to [Lambda Console](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/) and select Function whose names starts with **"Web3WalletBackendStack"**. We will now see step4. 

2. Find the step4_list_token_balances function in the Lambda code.

![](/contents/static/04-token-list/00-token-list-query-api/lambda_step4.png)


3. Step1 function does not have tokens list, only Ethereum or Bitcoin themselves. But by using Step4 function, Tokens list (ERC-20, ERC-721, ERC-1155) can be uncovered. We use **list_token_balances** API to get values.

What's interesting about this API is that it does some pagination that would normally have to be implemented at the service level. The maxResults value allows you to specify how many values you want to get, and the values are accompanied with a nextToken value (which we'll look at later), which allows you to move on to the next values. In this session, we will set default maxResults as 10. 

```python

DEFAULT_MAX_RESULTS = 10
    ...
    arguments = {
        'tokenFilter': {'network': network},
        'ownerFilter': {"address": address},
        'maxResults': int(query_params["maxResults"]) if _has_maxResult(query_params) else DEFAULT_MAX_RESULTS,
    }

```

NextToken parameter is optional. 

```python

def _has_nextToken(query_params):
    return query_params is not None and "nextToken" in query_params and query_params['nextToken'] is not None and query_params['nextToken'] != ''
    ....
    if _has_nextToken(query_params):
        arguments["nextToken"] = query_params["nextToken"]

```

4. Go to [API Gateway](https://us-east-1.console.aws.amazon.com/apigateway/home?region=us-east-1#/apis) and click APIs named **Wallet**. From the SideMenu Bar, click **Resources**. Select **step4** and **GET** method. Click **Test** Button. 

![](/contents/static/04-token-list/00-token-list-query-api/api_gateway_test.png)


5. Put `0x188B264AA1456B869C3a92eeeD32117EbB835f47` value to **Path** parameter. And click **Test** button.

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_eth.png)

![](/contents/static/02-token-balance/00-token-balance-query-api/step_1_test_result_first.png)

6. The result now includes tokens, but it's a lot so it's hard to see it all at once. In this case, maxResults parameter will be helpful. Put **maxResults=3** value to **Query Strings** parameter.

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_with_max.png)

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_result_max.png)

7. In the result, you can see **nextToken** value. Copy this value and add parameter to Query Strings. The Query Strings will be like this - **maxResults=3&nextToken=YourNextTokenValue**. Then you can see next values.

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_with_result_next.png)

![](/contents/static/02-token-balance/00-token-balance-query-api/step1_test_next.png)


----
Next: [Tokens List on Web3 Wallet](../01-token-list-query-wallet/index.en.md)
