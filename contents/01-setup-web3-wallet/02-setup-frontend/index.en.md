---
title: Setup Web3 Wallet's Frontend
weight: 22
---

This step is for setting up the front-end of two projects called main-front which is for creating the wallet window that we will usally be used and frontend which is the wallet that is optimized to mobile.  
Overall steps are in below : 

1. modifying the lambda header code to prevent CORS.
2. wallet launch by using main-front. 


Command lines follow by above procedures are in below.


* frontend (wallet) Dependency install

   ```shell
   cd ~/environment/web3-wallet-workshop/frontend
   npm install
   ```

* Mapping API Gateway address in .env file. We can check the API gateway address from API gateway menu.

   ```shell
   vi .env
   ```

   and then modify REACT_APP_API_ADDR variable that you get before stage and save.

   ![Main front window](/contents/static/01-setup-web3-wallet/02-setup-frontend/apigw-mapping.png)



* install amplify for hosting

   ```shell
   curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
   ```

* amplify init

   ```shell
   amplify init
   ```
   During initing, Input your Access key and Secret key.
   ![Main front window](/contents/static/01-setup-web3-wallet/02-setup-frontend/amplify-init.png)

* amplify hosting push

   ```shell
   amplify hosting push
   ```

   Choose Amazon CloudFront and S3

   ![Main front window](/contents/static/01-setup-web3-wallet/02-setup-frontend/amplify-hosting.png)


* amplify publish 

   ```shell
   amplify publish
   ```

   We can see the cloudfront address which is the web3 wallet url.
   Please memo this CF url. We will use at next step.


* main-front Dependency install and start

   ```shell
   cd ..
   cd main-front
   npm install
   npm run start
   ```

----
Next: [Launch Web3 Wallet](../03-launch-web3-wallet/index.en.md)