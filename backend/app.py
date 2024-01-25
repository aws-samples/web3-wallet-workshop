#!/usr/bin/env python3
import os

import aws_cdk as cdk

from stacks.web3_wallet_backend_stack import Web3WalletBackendStack


app = cdk.App()
Web3WalletBackendStack(app, "Web3WalletBackendStack")

app.synth()
