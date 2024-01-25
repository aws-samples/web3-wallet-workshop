import boto3
from botocore.exceptions import ClientError
import json
import logging
from datetime import date, datetime

FIGURES = {
    'satoshi': {
        'address': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'network': 'BITCOIN_MAINNET',
        'tokenId': 'btc',
    },
    'vitalik': {
        'address': '0xab5801a7d398351b8be11c439e05c5b3259aec9b',
        'network': 'ETHEREUM_MAINNET',
        'tokenId': 'eth',
    }
}

TOKEN_IDENTIFIER_MAINNET = {
    'btc' : {
        'network': 'BITCOIN_MAINNET',
        'tokenId': 'btc',
    },
    'eth': {
        'network': 'ETHEREUM_MAINNET',
        'tokenId': 'eth',
    }
}

DEFAULT_MAX_RESULTS = 10

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


query = boto3.client("managedblockchain-query")

def _convert_figure_address(address):
    return FIGURES.get(address.lower()).get('address')

def _is_figure_address(address):
    return len(address) != 0 and (address.lower() == "satoshi" or address.lower() == "vitalik")

def _get_token_identifier_by_address(address):
    return TOKEN_IDENTIFIER_MAINNET.get('eth') if _is_ethereum_address(address) else TOKEN_IDENTIFIER_MAINNET.get('btc')

def _is_ethereum_address(address):
    return True if address.startswith('0x') else False

def handler(event, context):

    # Instantiate the ChainQuerySdk client
    logging.debug(event)
    logging.info(f'resource : {event["resource"]}')
    logging.info(f'httpMethod : {event["httpMethod"]}')
    logging.debug(f'path : {event["path"]}')
    logging.debug(f'path params : {event["pathParameters"]}')
    logging.debug(f'query params : {event["queryStringParameters"]}')
    logging.debug(f'body : {event["body"]}')

    path_params = event["pathParameters"]
    query_params = event["queryStringParameters"]
    functions = event["path"].split("/")[2]

    logging.debug(f'functions: {functions}')

    res = {
        'body': {}
    }
    
    # start # 
    
    if functions == "step1":
        #res = step1_get_token_balance(path_params, query_params)
        pass
    
    if functions == "step2":
        #res = step2_list_transactions(path_params, query_params)
        pass

    if functions == "step3":
        #res = step3_get_transaction_detail(path_params, query_params)
        pass
    
    if functions == "step4":
        #res = step4_list_token_balances(path_params, query_params)
        pass
        

    # end #

    logging.debug(res)

    return {
        "statusCode": res['statusCode'],
        "headers": {
            "x-custom-header" : "my custom header value",
            "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Credentials":"true",
            "Content-Type": "application/json"
        },
        "body": json.dumps(res['body'], default= json_serial)
    }


# step 1
def step1_get_token_balance(path_params, query_params):
    
    address_list = path_params["address"].split("&")
    
    res = {
        'body': {
            'tokenBalances': []
        }
    }

    if len(address_list) == 1:

        address = address_list[0]
        if _is_figure_address(address):
            address = _convert_figure_address(address)
        
        balance = query.get_token_balance(
            tokenIdentifier = _get_token_identifier_by_address(address),
            ownerIdentifier = {"address": address},
        )

        res['statusCode'] = balance['ResponseMetadata']['HTTPStatusCode']

        if res['statusCode'] == 200:
            res['body']['tokenBalances'].append({
                    'ownerIdentifier': balance['ownerIdentifier'],
                    'tokenIdentifier': balance['tokenIdentifier'],
                    'balance': balance['balance'],
                    'atBlockchainInstant': balance['atBlockchainInstant'],
                    'lastUpdatedTime': balance['lastUpdatedTime'],
                }
            )

    else :
        req = list()
        for i in range(len(address_list)):
            address = address_list[i]
            if _is_figure_address(address):
                address = _convert_figure_address(address)

            req.append(
                {
                    'tokenIdentifier': _get_token_identifier_by_address(address),
                    'ownerIdentifier': {
                        'address': address
                    }
                }
            )
                    
        response = query.batch_get_token_balance(getTokenBalanceInputs=req)

        res['statusCode'] = response['ResponseMetadata']['HTTPStatusCode']
        if res['statusCode'] == 200:
            res['body']['tokenBalances'] = response['tokenBalances']

    return res

# step 2
def step2_list_transactions(path_params, query_params):

    address = address = path_params["address"]
    if _is_figure_address(address):
        address = _convert_figure_address(address)

    arguments = {
        "network": path_params["network"],
        "address": address,
        "maxResults": int(query_params["maxResults"]) if _has_maxResult(query_params) else DEFAULT_MAX_RESULTS,
        "sort": {
            "sortBy": "TRANSACTION_TIMESTAMP",
            "sortOrder": "DESCENDING"
        }
    }

    if _has_nextToken(query_params):
        arguments["nextToken"] = query_params["nextToken"]

    transactions = query.list_transactions(**arguments)

    res = {
        'statusCode': transactions["ResponseMetadata"]["HTTPStatusCode"],
        'body': {
            'transactions': transactions["transactions"]
        }
    }

    if "nextToken" in transactions:
        res['body']['nextToken'] = transactions['nextToken']

    return res

# step 3
def step3_get_transaction_detail(path_params, query_params):
    trxId = path_params["trxId"]
    transaction = ""
    
    arguments = {
        'network': path_params["network"],
        'transactionHash': trxId
    }

    try: 
        transaction = query.get_transaction(**arguments)
        logger.debug(transaction)

        res = {
            'statusCode': transaction["ResponseMetadata"]["HTTPStatusCode"],
            'body': {}
        }
        if transaction["ResponseMetadata"]["HTTPStatusCode"] == 200:
            res['body']['transaction'] = transaction['transaction']

            transaction_event = query.list_transaction_events(**arguments)

            if transaction_event["ResponseMetadata"]["HTTPStatusCode"] == 200:
                res['body']['transaction']['events'] = transaction_event['events']
    except ClientError as err:
        status_code = 400
        logger.debug(err)
        if err.response["message"] == "The requested resource was not found.": # TODO
            status_code = 404

        return {
            'statusCode': status_code,
            'body': {}
        }
    
    return res

# step 4
def step4_list_token_balances(path_params, query_params):
    
    address = path_params["address"]
    if _is_figure_address(address):
        address = _convert_figure_address(address)

    network = 'ETHEREUM_MAINNET' if _is_ethereum_address(address) else 'BITCOIN_MAINNET'
    
    arguments = {
        'tokenFilter': {'network': network},
        'ownerFilter': {"address": address},
        'maxResults': int(query_params["maxResults"]) if _has_maxResult(query_params) else DEFAULT_MAX_RESULTS,
    }

    if _has_nextToken(query_params):
        arguments["nextToken"] = query_params["nextToken"]

    token_balances = query.list_token_balances(**arguments)
    
    res = {
        'statusCode': token_balances["ResponseMetadata"]["HTTPStatusCode"],
        'body': {
            'tokenBalances': token_balances["tokenBalances"]
        }
    }

    if "nextToken" in token_balances:
        res['body']['nextToken'] = token_balances['nextToken']
    
    return res
    



def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def _has_maxResult(query_params):
    return query_params is not None and "maxResults" in query_params and query_params['maxResults'] is not None and query_params['maxResults'] != ''

def _has_nextToken(query_params):
    return query_params is not None and "nextToken" in query_params and query_params['nextToken'] is not None and query_params['nextToken'] != ''

def _convert_figure_address(address):
    return FIGURES.get(address.lower()).get('address')

def _is_figure_address(address):
    return len(address) != 0 and (address.lower() == "satoshi" or address.lower() == "vitalik")

def _get_token_identifier_by_address(address):
    return TOKEN_IDENTIFIER_MAINNET.get('eth') if _is_ethereum_address(address) else TOKEN_IDENTIFIER_MAINNET.get('btc')

def _is_ethereum_address(address):
    return True if address.startswith('0x') else False
