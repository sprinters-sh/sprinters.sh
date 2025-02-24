---
layout: docs
title: "Setup"
next: docs/label.md
---

Setting up Sprinters usually takes around **2 minutes**. All you need is a GitHub account and an AWS account.

{% include h2.html id="github" text="1. GitHub" %}

Start by logging in to Sprinters with your GitHub account:

<a href="https://console.sprinters.sh/login" target="_blank" class="btn btn-primary"><i class='bi bi-github me-2'></i>Log in with GitHub</a>

Select your GitHub personal account or organization Sprinters should be installed on and
click _Install_. After a few seconds you will be redirected to Sprinters to set up your AWS account.

<img src="/assets/setup/github.png" alt="Sprinters GitHub App setup" class="screenshot">

Sprinters strictly follows the **principle of least-privilege** and
only requests for the [strict minimum set of permissions](/docs/security#github-permissions) required to listen
to GitHub Actions job events and create runners.

{% include h2.html id="aws" text="2. AWS" %}

To launch runner instances on your AWS account, Sprinters needs a **cross-account IAM role** backed by an **IAM policy**.
Setting this up only takes 4 clicks with the {% include external-link.html text="Sprinters CloudFormation stack"
        href="https://github.com/sprinters-sh/sprinters/blob/main/setup/aws/sprinters-setup.yml" %}.

Acknowledge the creation of IAM resources
and click _Create stack_. After CloudFormation completes, copy your AWS account ID to complete the setup:

<img src="/assets/setup/aws.png" alt="Sprinters AWS CloudFormation setup" class="screenshot">

Sprinters strictly follows the **principle of least-privilege** and the IAM role
only grants the [strict minimum set of permissions](/docs/security#aws-permissions) required to launch runner instances.

{% include h2.html text="3. Done" %}

Congratulations! Sprinters is now fully set up!
