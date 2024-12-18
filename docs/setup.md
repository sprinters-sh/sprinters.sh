---
layout: docs
title: "Setup"
next: docs/label.md
---

All it takes to set up Sprinters are **3 easy steps** usually completed in **under 5 minutes**:

{% include h2.html id="github" text="1. Install the Sprinters GitHub App" %}

The very first step is to install the {% include external-link.html text="Sprinters GitHub App"
        href="https://github.com/apps/sprinters-sh" %} on your personal or organization account.

After you first {% include external-link.html text="log in to Sprinters" href="https://console.sprinters.sh" %}, you
will be redirected to the GitHub App installation prompt.

Select the GitHub personal or organization account where you want to install it and confirm the installation by
clicking _Install_. The installation now proceeds and after a few seconds GitHub redirects you back to Sprinters.

Congratulations! The Sprinters GitHub App is now fully installed and activated.

<a class="btn btn-secondary" data-bs-toggle="collapse" href="#github-setup" aria-expanded="false" aria-controls="github-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="github-setup">
    <img src="/assets/setup/github.png" alt="Sprinters GitHub App setup" class="screenshot">
</div>

{% include h2.html id="aws" text="2. Setup your AWS account" %}

To set up your AWS account, you'll need to create an **IAM policy** and a **cross-account IAM role**.

{% include h3.html id="aws-policy" text="Create the IAM policy" %}

To set the permissions Sprinters will have, you'll need an IAM policy.

{% include external-link.html text="Create the IAM policy in the AWS Console" class="btn btn-sm btn-primary"
        href="https://us-east-1.console.aws.amazon.com/iam/home#/policies/create" %}

<p class="mb-1">To do so, paste this <span class="fw-bold text-warning">JSON policy document</span> in the policy editor:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <button type="button" class="btn-copy" title="Copy to clipboard"><i class="bi bi-copy"></i></button>
    <pre class="mb-0 p-2 fs-7">{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "sprinters",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances",
                "ec2:CreateTags",
                "ec2:DescribeInstances",
                "ec2:ModifyVolume",
                "ec2:TerminateInstances",
                "ec2:DescribeSpotPriceHistory"
            ],
            "Resource": ["*"]
        }
    ]
}</pre>
</div>

Assign it the `sprinters-policy` name and create it. Your IAM policy is now fully set up.

<a class="btn btn-secondary" data-bs-toggle="collapse" href="#aws-policy-setup" aria-expanded="false" aria-controls="aws-policy-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="aws-policy-setup">
    <img src="/assets/setup/aws-policy.png" alt="AWS IAM Policy setup" class="screenshot">
</div>

{% include h3.html id="aws-role" text="Create the cross-account IAM role" %}

To establish trust between Sprinters and your AWS account, you'll need a cross-account IAM role.

{% include external-link.html text="Create the cross-account IAM role in the AWS Console" class="btn btn-sm btn-primary" href="https://us-east-1.console.aws.amazon.com/iam/home#/roles/create" %}

<p class="mb-1">Your role will need a <span class="fw-bold text-warning">custom trust policy</span> that references your GitHub Account.
    <strong>Adjust the one below</strong> and paste it in the trust policy editor:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <button type="button" class="btn-copy" title="Copy to clipboard"><i class="bi bi-copy"></i></button>
    <pre class="mb-0 p-2 fs-7">{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "381491863103"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<span class="fw-bold fst-italic text-warning">your-github-account-name</span>"
                }
            }
        }
    ]
}</pre>
</div>

Assign the role the `sprinters-role` name and ensure it uses the `sprinters-policy` permission policy. Your cross-account IAM role is now fully set up.

<a class="btn btn-secondary" data-bs-toggle="collapse" href="#aws-role-setup" aria-expanded="false" aria-controls="aws-role-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="aws-role-setup">
    <img src="/assets/setup/aws-role.png" alt="AWS IAM Role setup" class="screenshot">
</div>

{% include h2.html id="job" text="3. Migrate your GitHub Actions jobs to Sprinters" %}

With Sprinters fully set up, let's tell GitHub to run your workflow jobs on AWS instead of GitHub hosted runners.

<p class="mb-1">To do so, locate the <code>runs-on:</code> directive in your workflow yml:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: ubuntu-latest</pre>
</div>

<p class="mb-1">Lookup your 12-digit AWS account number and adjust it to:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">your-12-digit-aws-account-number</span>:ubuntu-latest</pre>
</div>

Congratulations! Your GitHub Actions job is fully set up and will execute on AWS from now on.

<a class="btn btn-secondary" data-bs-toggle="collapse" href="#job-setup" aria-expanded="false" aria-controls="job-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="job-setup">
    <img src="/assets/setup/job.png" alt="GitHub Actions job setup" class="screenshot">
</div>

{% include h2.html id="test" text="4. Run a test job" %}

The easiest way to validate your setup, is to run a test job.

{% include external-link.html text="Fork the `sprinters-sh/sprinters-test` repository on GitHub" class="btn btn-sm btn-primary" href="https://github.com/sprinters-sh/sprinters-test/fork" %}

On your forked repo:
1. Edit the `.github/workflows/test.yml` workflow definition and replace `your-12-digit-aws-account-number` with your own AWS account number.
2. Go to the _Actions_ tab and enable workflows.
3. Run the `sprinters-test` workflow and inspect the workflow run logs.

You should now see:

```
Success! This job is running on a fresh EC2 instance in your AWS account using Sprinters!
```

Congratulations! You now have a fully operational Sprinters setup.

<a class="btn btn-secondary" data-bs-toggle="collapse" href="#test-job" aria-expanded="false" aria-controls="test-job">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="test-job">
    <img src="/assets/setup/test.png" alt="Test job run" class="screenshot">
</div>
