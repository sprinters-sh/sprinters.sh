---
layout: docs
title: "AWS Resources"
---

It is common for runners to need to access resources in your AWS account such as S3 buckets, RDS databases or other EC2 instances.

Unlike with GitHub-hosted runners, with Sprinters **all traffic stays within AWS** and your AWS resources don't need to be internet-accessible.
Additionally, if your runner is in the same region as your resources, there will be **no data transfer charge** and 
you will benefit from the **lowest latency** and **highest transfer rates**.

{% include h2.html id="credentials" text="IAM credentials" %}

For your runners to be able to access AWS resources, they must have access to valid AWS credentials.
You can provide these in two different ways: [GitHub Actions secrets](#secrets) or [OpenID Connect](#oidc).

{% include h4.html id="secrets" text="GitHub Actions secrets" %}

You can provide AWS credentials to your runners using {% include external-link.html text="GitHub Actions secrets" href="https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions" %}.
For this you would typically store your IAM user's credentials as secrets called `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.
In your workflow YAML file you would then map these secrets onto a job's or a step's environment variables to use them:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
<pre class="mb-0 p-2 fs-7">
env:
  AWS_ACCESS_KEY_ID: <span class="fw-bold fst-italic text-warning">{% raw %}${{ secrets.AWS_ACCESS_KEY_ID }}{% endraw %}</span>
  AWS_SECRET_ACCESS_KEY: <span class="fw-bold fst-italic text-warning">{% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }}{% endraw %}</span>
</pre>
</div>

{% include h4.html id="oidc" text="OpenID Connect" %}

To avoid storing long-term credentials as secrets, you also have the option to use
{% include external-link.html text="OpenID Connect" href="https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services" %} to
authenticate with AWS directly in your workflow and automatically set up short-lived credentials to access the resources in your AWS account.

{% include h2.html id="private-subnets" text="Resources in private subnets" %}

Within the same VPC, your Sprinters-powered runners can access resources in private subnets. 

For this to work, you must create a **custom security group for your runner**. 
This security group must allow unrestricted egress
to the internet for the runner to work as expected. The runner doesn't have any open ports, so ingress can be fully blocked off.

Now, for each resource in your private subnets that you want to access from your runners, add this new security group 
as an allowed traffic source to the resource's security group.

Finally, configure your Sprinters label to ensure that the runner is launched in a [public subnet of the same VPC](/docs/label#placement) as the resources in your private subnets
and associated with the custom [security group](/docs/label#security-group) you created.

Your runners will now be able to access resources in your private subnets.

{% include h4.html text="Example 1: default VPC" %}
For a custom security group with ID `sg-01234567890abcdef`, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">sg-01234567890abcdef</span></pre>
</div>

{% include h4.html text="Example 2: non-default VPC" %}
For a non-default VPC in the `eu-central-1` region with a public subnet with ID `subnet-01122334455667788` and a custom security group with ID `sg-01234567890abcdef`, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">eu-central-1/subnet-01122334455667788</span>:<span class="fw-bold fst-italic text-warning">sg-01234567890abcdef</span></pre>
</div>
