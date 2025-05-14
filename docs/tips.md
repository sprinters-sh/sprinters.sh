---
layout: docs
title: "Tips"
---

Learn useful tips for common scenarios:

- [Run jobs from multiple GitHub accounts onto the same AWS account](#shared-aws-account)

{% include h2.html id="shared-aws-account" text="Run jobs from multiple GitHub accounts onto the same AWS account" %}

To the run jobs from multiple GitHub accounts onto the same AWS account, simply adjust the [IAM role trust policy](https://github.com/sprinters-sh/sprinters/blob/main/setup/aws/sprinters-setup.yml#L26)
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
