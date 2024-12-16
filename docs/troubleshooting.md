---
layout: docs
title: "Troubleshooting"
---

Learn how to solve the most common issues you may encounter during setup or on GitHub workflow summaries:

- [The run was canceled by @sprinters-sh[bot].](#canceled-bot)
- [The self-hosted runner: i-0123456789abcdef0 lost communication with the server.](#lost-communication)
- [I want to run jobs from multiple GitHub accounts onto the same AWS account.](#shared-aws-account)

{% include h2.html id="canceled-bot" text="The run was canceled by @sprinters-sh[bot]." %}

There was a problem launching an instance in your AWS account. GitHub unfortunately doesn't permit external tools to post
additional details in the workflow summary.

In the [Sprinters Console](https://console.sprinters.sh), the workflow run will show the exact cause of the error and how to fix it.

{% include h2.html id="lost-communication" text="The self-hosted runner: i-0123456789abcdef0 lost communication with the server." %}

When using spot instances, AWS will sometimes reclaim them when EC2 is short on capacity. This message indicates that
this runner instance was terminated because of this and that eventually GitHub Actions took notice it was no longer available.

In the [Sprinters Console](https://console.sprinters.sh), the workflow run will show the exact cause of the error and how to fix it.

{% include h2.html id="shared-aws-account" text="I want to run jobs from multiple GitHub accounts onto the same AWS account." %}

To the run jobs from multiple GitHub accounts onto the same AWS account, simply adjust the [IAM role trust policy](/docs/setup/#aws-role)
to include a list of GitHub accounts instead of a single one:

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
                    "sts:ExternalId": [
                        "<span class="fw-bold fst-italic text-warning">first-github-account-name</span>",
                        "<span class="fw-bold fst-italic text-warning">second-github-account-name</span>",
                        "<span class="fw-bold fst-italic text-warning">yet-another-github-account-name</span>"
                    ]
                }
            }
        }
    ]
}</pre>
</div>
