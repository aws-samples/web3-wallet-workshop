from aws_cdk import (
    # Duration,
    Stack,
    Duration,
    aws_lambda as _lambda,
    aws_apigateway as api_gw,
    aws_iam as iam,
     Aws, CfnOutput
)

from constructs import Construct
from cdk_lambda_layer_builder.constructs import BuildPyLayerAsset

class Web3WalletBackendStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        boto3_layer_asset = BuildPyLayerAsset.from_pypi(self, 'Boto3LayerAsset',
                                                       pypi_requirements=['boto3==1.28.15'],
                                                       py_runtime=_lambda.Runtime.PYTHON_3_9)
        
        boto3_layer = _lambda.LayerVersion(
            self,
            id='Boto3Layer',
            code=_lambda.Code.from_bucket(boto3_layer_asset.asset_bucket, boto3_layer_asset.asset_key),
            compatible_runtimes=[_lambda.Runtime.PYTHON_3_9],
            description ='Boto3 python modules'
        )


        wallet_lambda = _lambda.Function(
            scope=self,
            id="walletDockerLambda",
            runtime = _lambda.Runtime.PYTHON_3_9,
            code = _lambda.Code.from_asset('lambda/wallet'),
            layers=[boto3_layer],
            handler='wallet.handler',
        )

        amb_query_policy = iam.PolicyStatement(effect=iam.Effect.ALLOW, resources =["*"], actions=["*"])
        wallet_lambda.add_to_role_policy(amb_query_policy)


        wallet_api = api_gw.LambdaRestApi(self, 'Wallet',
                                                 handler=wallet_lambda,
                                                 default_cors_preflight_options={
                                                    "allow_origins": api_gw.Cors.ALL_ORIGINS,
                                                    "allow_methods": api_gw.Cors.ALL_METHODS,
                                                    "allow_credentials":True,
                                                    "allow_headers": ["Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Credentials"],
                                                    "status_code":200
                                                     
                                                 },
                                                 endpoint_configuration=api_gw.EndpointConfiguration(
                                                        types=[api_gw.EndpointType.REGIONAL]
                                                    ),
                                                 proxy=False,
                                                 endpoint_export_name='WalletApiEndpoint')
                                                 

        wallet = wallet_api.root.add_resource("wallet")
        
        # GET /wallet/step1/{address}?nextToken={nextToken}&maxResults={maxResults}
        step1_get_token_balance = wallet.add_resource("step1").add_resource("{address}").add_method("GET",method_responses=[api_gw.MethodResponse(status_code='200',response_models={'application/json': api_gw.Model.EMPTY_MODEL})],request_parameters={"method.request.querystring.nextToken": False,"method.request.querystring.maxResults": False})

       # GET /wallet/step2/{network}/{address}?nextToken={nextToken}&maxResults={maxResults}
        step2_list_transactions = wallet.add_resource("step2").add_resource("{network}").add_resource("{address}").add_method("GET",method_responses=[api_gw.MethodResponse(status_code='200',response_models={'application/json': api_gw.Model.EMPTY_MODEL})],request_parameters={"method.request.querystring.nextToken": False,"method.request.querystring.maxResults": False})
        
        # GET /wallet/step3/{network}/{trxId}?nextToken={nextToken}&maxResults={maxResults}
        step3_get_transaction_detail = wallet.add_resource("step3").add_resource("{network}").add_resource("{trxId}").add_method("GET",method_responses=[api_gw.MethodResponse(status_code='200',response_models={'application/json': api_gw.Model.EMPTY_MODEL})],request_parameters={"method.request.querystring.nextToken": False,"method.request.querystring.maxResults": False})

        # GET /wallet/step4/{address}?nextToken={nextToken}&maxResults={maxResults}
        step4_list_token_balances = wallet.add_resource("step4").add_resource("{address}").add_method("GET",method_responses=[api_gw.MethodResponse(status_code='200',response_models={'application/json': api_gw.Model.EMPTY_MODEL})],request_parameters={"method.request.querystring.nextToken": False,"method.request.querystring.maxResults": False})

        CfnOutput(self, "WalletApiEndpoint", value=wallet_api.url)
