---
title: Launch Web3 Wallet
weight: 23
---

To prevent CORS between API gateway and wallet app, We would modify the return header of the lambda function. And then, the web3 wallet window which is optimized mobile would launch on the main-front window.
Eventually, the preparation of using AMB query api through the app is finished.

* move to lambda menu, and search keyword 'web3' and click to go through the detail 

![Input web3 wallet url](/contents/static/01-setup-web3-wallet/03-launch-web3-wallet/web3-lambda-name.png)

* find returning header code. and modify the value of "Access-Control-Allow-Origin" to your cloudfront addresss that you already published at previous step.

![Input web3 wallet url](/contents/static/01-setup-web3-wallet/03-launch-web3-wallet/web3-lambda-header.png)


* Open the main-front window through the preview function of cloud9. And input the cloudfront address on inputbox.

![Input web3 wallet url](/contents/static/01-setup-web3-wallet/03-launch-web3-wallet/preview-mainfront.png)

Press click button for launching mobile web3 wallet window

![mobile web3 wallet window](/contents/static/01-setup-web3-wallet/03-launch-web3-wallet/mobile-web3-wallet.png)

Now, You are ready to use AMB query api by using the wallet app.



----
Next: [Deposited Balance](../../02-token-balance/index.en.md)