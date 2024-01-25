---
title: 1. Setup Web3 Wallet
weight: 20
---


Setting up workshop. Overall procedure is in below

### 1. Setup CDK

Check the CDK version to verify the cdk installation. 
And Update the python3.9. This update could handle the AMB query by boto3 library.
Optionally, We can install boto3 on cloud9 and can handle directly if we want to use AMB query by python api.

### 2. Setup Back End

Clone all source code from the github repository.
Create resources(API gateway,Lambda) through the CDK.
API Gateway which will be called by web3 wallet application. 
Lambda function which is consisted of the Query API that is connected to the API gateway.

### 3. Setup Front End

Modify API gateway address in .env file.
And host to s3 and publish to cloudfront and get the web3 wallet url to use by Amplify.
Install the main frontend which is used to open the mobile web3 wallet window. 

### 4. Launch web3 wallet

Modify the Access-Control-Allow-Origin address of return header in the lambda function to web3 wallet address that has been hosted by amplify.
And open the web3 wallet window by using main frontend window. 


----
Move to Next: [Set up CDK](./00-setup-cdk/index.en.md)