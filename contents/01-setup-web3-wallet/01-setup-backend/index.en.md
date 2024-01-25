---
title: Setup web3 wallet's backend
weight: 22
---


## Clone Web3 Wallet's source code from repository

In your cloud9 environment, please clone source code from repository.

```bash
git clone https://github.com/aws-samples/web3-wallet-workshop.git
```


## update libararies

```bash
cd ./web3-wallet-workshop/backend/
pip install -r requirements.txt
```

## cdk

Bootstrapping is the process of provisioning resources for the AWS CDK before you can deploy AWS CDK apps into an AWS environment.

```
cdk bootstrap
```

Synthesize an AWS CloudFormation template for the app, as follows.

```bash
cdk synth
```

To deploy the stack using AWS CloudFormation, issue:
```bash
cdk deploy
```

![cdk deploy](/contents/static/01-setup-web3-wallet/00-setup-cdk/01-cdk-deploy.png)

- Completed!

![cdk deploy](/contents/static/01-setup-web3-wallet/00-setup-cdk/02-cdk-output.png)


### Check output

After deploying cdk, you can find API Gateway's endpoint as results. If you missed, you also observe it from `CloudFormation` > `Exports` > `WalletApiEndpoint` at console.

![cdk exports](/contents/static/01-setup-web3-wallet/00-setup-cdk/03-cdk-exports.png)


----
Next: [Set up Frontend](../02-setup-frontend/index.en.md)