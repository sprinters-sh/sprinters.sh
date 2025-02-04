---
layout: docs
title: "AWS Account Manual Setup"
back: docs/setup/index.md
---

To set up your account without CloudFormation you need to create both the IAM policy and the cross-account IAM role.

{% include h2.html id="aws-policy" text="Create the IAM policy" %}

To set the [permissions Sprinters will have](/docs/security#aws-permissions), you'll need an IAM policy.

{% include external-link.html text="Create the IAM policy in the AWS Console" class="btn btn-sm btn-primary"
        href="https://us-east-1.console.aws.amazon.com/iam/home#/policies/create" %}

<p class="mb-1">To do so, paste this <span class="fw-bold text-warning">JSON policy document</span> in the policy editor:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <button type="button" class="btn-copy" title="Copy to clipboard"><i class="bi bi-copy"></i></button>
    <pre class="mb-0 p-2 fs-8">{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Regular",
            "Effect": "Allow",
            "Action": [ "ec2:RunInstances", "ec2:DescribeInstances", "ec2:DescribeSpotPriceHistory" ],
            "Resource": "*"
        },
        {
            "Sid": "RestrictCreateTagsToRunInstances",
            "Effect": "Allow",
            "Action": [ "ec2:CreateTags" ],
            "Resource": "*",
            "Condition": { "StringEquals": { "ec2:CreateAction": "RunInstances" } }
        },
        {
            "Sid": "RestrictToSprintersResources",
            "Effect": "Allow",
            "Action": [ "ec2:CreateTags", "ec2:ModifyVolume", "ec2:TerminateInstances" ],
            "Resource": "*",
            "Condition": { "StringEquals": { "aws:ResourceTag/sprinters:sprinters": "true" } }
        }
    ]
}</pre>
</div>

Assign it the `sprinters-policy` name and create it. Your IAM policy is now fully set up.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#aws-policy-setup" aria-expanded="false" aria-controls="aws-policy-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="aws-policy-setup">
    <img src="/assets/setup/aws-policy.png" alt="AWS IAM Policy setup" class="screenshot">
</div>

{% include h2.html id="aws-role" text="Create the cross-account IAM role" %}

To establish trust between Sprinters and your AWS account, you'll need a cross-account IAM role.

{% include external-link.html text="Create the cross-account IAM role in the AWS Console" class="btn btn-sm btn-primary" href="https://us-east-1.console.aws.amazon.com/iam/home#/roles/create" %}

<p class="mb-1">Your role will need a <span class="fw-bold text-warning">custom trust policy</span> that references your GitHub Account.
    <strong>Adjust the one below</strong> and paste it in the trust policy editor:</p>
<div class="alert alert-info font-monospace p-0 mb-2 position-relative" role="alert">
    <button type="button" class="btn-copy" title="Copy to clipboard"><i class="bi bi-copy"></i></button>
    <pre class="mb-0 p-2 fs-8">{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": { "AWS": "381491863103" },
            "Action": "sts:AssumeRole",
            "Condition": { "StringEquals": { "sts:ExternalId": "<span class="fw-bold fst-italic text-warning">your-github-account-name</span>" } }
        }
    ]
}</pre>
</div>

Assign the role the `sprinters-role` name and ensure it uses the `sprinters-policy` permission policy. Your cross-account IAM role is now fully set up.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#aws-role-setup" aria-expanded="false" aria-controls="aws-role-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="aws-role-setup">
    <img src="/assets/setup/aws-role.png" alt="AWS IAM Role setup" class="screenshot">
</div>
