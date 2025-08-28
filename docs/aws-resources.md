---
layout: docs
title: "AWS Resources"
---

It is common for runners to need to access resources in your AWS account such as S3 buckets, RDS databases or EC2 instances.

Both GitHub-hosted runners and Sprinters let use you {% include external-link.html text="GitHub Actions secrets" href="https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions" %} or
{% include external-link.html text="OpenID Connect" href="https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services" %} to
access the resources in your AWS account.

However, Sprinters also lets you use {% include external-link.html text="IAM instance profiles" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile" %} as a simpler highly-secure alternative.

{% include h2.html id="hosted" text="Using GitHub-hosted runners" %}

Using GitHub-hosted runners, requires making your **AWS resources internet-accessible** for your runner to be able to access them:

![GitHub-hosted runners](/assets/aws-resources/aws-resources-hosted-runners.png)

Additionally, AWS will **charge you for egress traffic** from your resources back to your runner.

{% include h2.html id="sprinters" text="Using Sprinters" %}

With Sprinters, **all traffic stays within AWS**:

![Sprinters](/assets/aws-resources/aws-resources-sprinters.png)

If your runner is in the same region as your resources, there will be **no data transfer charge** and you will benefit
from the **lowest latency** and **highest transfer rates**.

{% include h2.html id="instance-profile" text="Using IAM instance profiles (Sprinters-only)" %}

In addition to {% include external-link.html text="GitHub Actions secrets" href="https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions" %} and
{% include external-link.html text="OpenID Connect" href="https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services" %},
Sprinters also gives you a third option not available to GitHub-hosted runners to access the resources in your AWS account: {% include external-link.html text="IAM instance profiles" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile" %}.

IAM instance profiles are an easy and secure way to give your runner's EC2 instance **short-lived temporary credentials**
that can be used to access the resources in your AWS account.

All you need to do is create a role with the required permissions in the AWS console and pass its
instance profile name to sprinters:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">profile=my-instance-profile</span></pre>
</div>

And all software on your runner that uses an AWS SDK will automatically pick up these credentials to securely connect
to your resources.

If your runner is in the same region as your resources, there will be **no data transfer charge** and
you will benefit from the **lowest latency** and **highest transfer rates**.
