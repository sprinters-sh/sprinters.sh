---
layout: docs
title: "Setup"
next: docs/test.md
---

All it takes to set up Sprinters are these 2 easy steps usually completed in **under 3 minutes**:

{% include h2.html id="github" text="1. Integrate Sprinters with your GitHub account" %}

To set up your Sprinters, you'll need to integrate it with your GitHub account.

This enables Sprinters to connect to respond to GitHub Actions job events and launch runner instances on your behalf.
This integration strictly follows the principle of least-privilege and
only asks for the [absolute minimal set of permissions required for Sprinters to operate](/docs/security#github-permissions).

{% include external-link.html text="<i class='bi bi-github me-2'></i>Log in to Sprinters with your GitHub account" class="btn btn-sm btn-primary"
        href="https://console.sprinters.sh/login" %}

Select the GitHub personal account or organization you want Sprinters to integrate with and confirm
the {% include external-link.html text="Sprinters GitHub App" href="https://github.com/apps/sprinters-sh" %} installation by
clicking _Install_. The installation now proceeds and after a few seconds GitHub redirects you back to Sprinters.

Congratulations! The Sprinters and GitHub are now fully integrated.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#github-setup" aria-expanded="false" aria-controls="github-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="github-setup">
    <img src="/assets/setup/github.png" alt="Sprinters GitHub App setup" class="screenshot">
</div>

{% include h2.html id="aws" text="2. Setup your AWS account" %}

To set up your AWS account, you'll need to create a **cross-account IAM role** backed by an **IAM policy**.

This enables Sprinters to connect to your AWS account and launch runner instances on your behalf.
Both the role and the policy strictly follow the principle of least-privilege and
only include the [absolute minimal set of permissions required for Sprinters to operate](/docs/security#aws-permissions).

{% include h3.html id="cloudformation" text="CloudFormation Setup (recommended)" %}

To set everything up, simply create the {% include external-link.html text="Sprinters CloudFormation stack"
        href="https://github.com/sprinters-sh/sprinters/blob/main/setup/aws/sprinters-setup.yml" %}:

{% include external-link.html text="<i class='bi bi-amazon me-2'></i>Create with CloudFormation in the AWS Console" class="btn btn-sm btn-primary"
        href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://s3.us-east-1.amazonaws.com/sprinters/sprinters-setup.yml&stackName=Sprinters" %}

Fill in your **GitHub account name**, acknowledge the required capabilities and click on _Create Stack_.

The IAM cross-account role and its underlying policy will be fully set up within seconds.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#aws-setup" aria-expanded="false" aria-controls="aws-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="aws-setup">
    <img src="/assets/setup/aws-setup.png" alt="AWS setup" class="screenshot">
</div>

{% include h3.html id="cloudformation" text="Manual Setup" %}

If you are unable to or prefer not to use CloudFormation, you can also follow our step-by-step guide to [manually set up your AWS account](/docs/setup/aws/manual-setup).

{% include h2.html text="Done!" %}

Congratulations! Sprinters is now fully set up!
