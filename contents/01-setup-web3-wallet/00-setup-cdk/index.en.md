---
title: Setup cdk
weight: 21
---

## AWS Cloud Development Kit

The AWS Cloud Development Kit (CDK) is a framework for defining cloud infrastructure as code and provisioning it through AWS CloudFormation.


Create resources through the CDK.
API Gateway which will be called by web3 wallet application. 
Lambda function which is consisted of the Query API that is connected to the API gateway.

The toolkit is a command-line utility which allows you to work with AWS CDK apps and run AWS CDK commands. 

The AWS CDK uses Node.js (>= 10.13.0), so to install it visit the node.js [website](https://nodejs.org/en).


Run the following command to verify correct installation and print the version number of the AWS CDK.
```bash
cdk --version
```

If you want to know more about CDK, please visits https://docs.aws.amazon.com/cdk/v2/guide/home.html.


## Update Python 3.9

- If you want to use AMB Query from python, you have to update boto3 library.

- Update cloud9 to python 3.9

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
cat << 'EOT' >> ~/.bashrc
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
EOT
source ~/.bashrc
sudo yum -y update
sudo yum -y install bzip2-devel
sudo yum -y install xz-devel
pyenv install 3.9.13
pyenv global 3.9.13
export PATH="$HOME/.pyenv/shims:$PATH"
source ~/.bash_profile
```

- Check python version
```bash
python --version
```

### (Optional) Install boto3 v1.28.35

If you want to use boto3 for accessing AMB Query from cloud9, update to latest version.


```bash
pip install boto3==1.28.35
```

Now, you can use AMB Query from cloud9.

```python
import boto3

client = boto3.client('managedblockchain-query')
```


----
Move to Next: [Set up Backend](../01-setup-backend/index.en.md)