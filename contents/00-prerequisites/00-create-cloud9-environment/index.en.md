---
title: Create Cloud9 Environment
weight: 11
---

Several steps in this workshop will need to be performed from a Linux command
prompt. An especially convenient way of doing this is to use [AWS
Cloud9](https://aws.amazon.com/cloud9/), a cloud-based integrated development
environment (IDE). Cloud9 allows you to edit source files and execute commands
from an easy-to-use web interface. It comes preconfigured with many of the tools
needed for software development, and because it runs in the AWS Cloud, it can be
an especially easy way to access other cloud services. One other handy feature
is that your Cloud9 instances automatically stop running after a configurable
period of inactivity, which helps reduce costs.

Navigate to the AWS Cloud9 service in your Management Console, then select
**Create environment**. Choose any name you want, such as *web3 wallet workshop*,
then select **Next**. For instance type, select **Other instance type** and
choose **t3.medium** and **Amazon Linux 2**, but leave all other settings at
their default, then select **Next step**, then **Create environment**.

![Setting up a Cloud9 environment](/contents/static/00-prerequisites/00-create-cloud9-environment/cloud9-options.png)

The Cloud9 environment will take a minute or two to start up. You will want to
close the welcome window and expand the terminal, leaving you with a file tree
on the left sidebar and a terminal view taking up most of the rest of the space,
like so:

![Running your Cloud9 environment](/contents/static/00-prerequisites/00-create-cloud9-environment/cloud9-running.png)

After arranging your environment windows, you'll want to install and update some
utilities in your environment by pasting the following commands into the
terminal:

```bash
sudo yum install -y jq
```

Download All workshop source code from Github
```bash
git clone https://github.com/amzstudio/web3-wallet-workshop.git
```

And we are resizing the volume size of the cloud9 environment.
```bash
sudo sh resize.sh 100
```


----
Move to Next: [Configure IAM](../01-iam-configuration/index.en.md)