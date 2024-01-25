---
title: 6. (Optional) AMB Access for calling JSON-RPC
weight: 70
---

# (Optional) AMB Access for calling JSON-RPC

## AMB Access Bitcoin

With Amazon Managed Blockchain (AMB) Access Bitcoin, you can access a pool of Bitcoin Mainnet and Testnet networks through Regional endpoints, through which you can write transactions, read data from the ledger, and invoke JSON-RPC requests available on the Bitcoin Core node client. Just access to the service endpoint, such as 
 - mainnet.bitcoin.managedblockchain.Region.amazonaws.com 
 - testnet.bitcoin.managedblockchain.Region.amazonaws.com .

### IAM Policy
AMB Access also requires IAM policy to use. Below one is an exmple of policy.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid" : "AMBBitcoinAccessPolicy", 
            "Effect": "Allow",
            "Action": [
                "managedblockchain:InvokeRpcBitcoin*"
            ],
            "Resource": "*"
        }
    ]
}
```
Then, attach it to the role.
As we do as usual, keep in minde to minimize the range of action for security.


### Install awscurl

When making calls to the Bitcoin JSON-RPCs on Amazon Managed Blockchain, you can do so over an HTTPS connection authenticated using the Signature Version 4 signing process. `awscurl` helps authenticating sigV4. 

```bash
pip install awscurl
```

### Call JSON-RPC by awscurl

If you want to get the latest block from Bitcoin, you call the method, `getblockheader` like below by JSON-RPC format.

```bash
awscurl -X POST -d '{ "jsonrpc": "1.0", "id": "getblockheader-curltest", "method": "getblockheader", "params": 
["000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"] }' --service managedblockchain https://mainnet.bitcoin.managedblockchain.us-east-1.amazonaws.com  --region us-east-1 -k                                                                                            

{
    "result":{
        "hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "confirmations":803839,
        "height":0,
        "version":1,
        "versionHex":"00000001",
        "merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "time":1231006505,
        "mediantime":1231006505,
        "nonce":2083236893,
        "bits":"1d00ffff",
        "difficulty":1,
        "chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
        "nTx":1,
        "nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048"
    
    },
    "error":null,
    "id":"getblockheader-curltest"
}
```

Or, you can get a specipic block by its blockhash, with the method, `getblock`.

```bash
awscurl -X POST -d '{ "jsonrpc": "1.0", "id": "getblock-curltest", "method": "getblock", "params": ["000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"] }' --service managedblockchain https://mainnet.bitcoin.managedblockchain.us-east-1.amazonaws.com  --region us-east-1 -k


{
    "result":{
        "hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
        "confirmations":803839,
        "height":0,
        "version":1,
        "versionHex":
        "00000001",
        "merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
        "time":1231006505,
        "mediantime":1231006505,
        "nonce":2083236893,
        "bits":"1d00ffff",
        "difficulty":1,
        "chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
        "nTx":1,
        "nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
        "strippedsize":285,
        "size":285,
        "weight":1140,
        "tx":["4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"]
    },
    "error":null,
    "id":"getblock-curltest"
}
```

If you want to know what kinds of methods AMB Access Bitcoin support, please refer to the doc, https://docs.aws.amazon.com/managed-blockchain/latest/ambbtc-dg/bitcoin-api.html.

----

Finished!

**H**old **O**n for **D**ear **L**ife