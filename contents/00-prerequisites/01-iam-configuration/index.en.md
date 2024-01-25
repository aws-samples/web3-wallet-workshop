---
title: IAM Configuration
weight: 12
---


## Create IAM Access Key

- Move to IAM user and click the Create User button
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/11-iamuser_menu.png)

- Input proper user name and click next
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/12-input-user.png)

- Select Attach policies directly, and check AdministratorAceess policy. and click Next button.
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/13-setpermission-touser.png)

- Review user data and click Create user buttion.
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/14-review-create-user.png)

- Click the new user name to go through the detail.
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/15-select-user.png)


- Select security credentials tab and click Create access key button
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/16-create-accesskey.png)


- Select proper option(e.g cli) and click.
- You have to memo access key and secret key or download .csv file before click Done button. This window is the last chance to get your secret key.
![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/17-accesskey-down.png)

- After get Access and Secret key, Click Done button.

These access key and secret key will use to host mobile walet app by amplify.



## Create IAM Role for Cloud9

- Create IAM Role for cloud9

- Move to `Identity and Access Management (IAM)` from search bar

- Move to Access management > `Roles`  Click the "Create role" Button

- Select trusted entity: `AWS service` > `EC2`

![Select trusted entity](/contents/static/00-prerequisites/01-iam-configuration/01-entity.png)

- Search policy `AdministratorAccess` and attach it by clicking select box

![Attach policy](/contents/static/00-prerequisites/01-iam-configuration/02-attach-c9-instanceprofile.png)

- Role name: `AMB-Cloud9-Role`


### Modify IAM Role of Cloud9 instance

- Move to `EC2`

- Select cloud9's ec2 instance: `Instances` > `Instances`

![Modify IAM role](/contents/static/00-prerequisites/01-iam-configuration/07-modify-iam-role.png)

- Select `AMB-Cloud9-Role`

![Select c9 role](/contents/static/00-prerequisites/01-iam-configuration/08-select-role.png)

- Update IAM role

### Remove temporal credentials from Cloud9 environment

- Move to Cloud9 terminal

- Select Preferences on right upper conner.

![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/09-preferences.png)

- AWS Settings > Turn off `AWS managed temporary credentials`

![Select Preferences](/contents/static/00-prerequisites/01-iam-configuration/10-turn-off.png)


----

Note : It would be better to stop and start cloud9 ec2 instance for applying the cloud9 role well.


### (Optional) IAM policy for accessing AMB Query

You can also create a policy that permits to use AMB query in terminal of clound9.
- Policies > Create policy > JSON
- Copy below policy to Policy Editor
```
{
    "Version": "2012-10-17", 
    "Statement": [ 
        {
            "Sid" : "AMBQueryAccessPolicy", 
            "Effect": "Allow", 
            "Action": [ 
                "managedblockchain-query:*" 
            ], 
            "Resource": "*"
        }
    ]
}
```


----
Move to Next: [Set up Web3 Wallet](../../01-setup-web3-wallet/index.en.md)