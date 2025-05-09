---
layout: docs
title: "Tips"
---

Learn useful tips for common scenarios:

- [Alias/hide the AWS account ID in the label](#aws-account-id)
- [Run jobs from multiple GitHub accounts onto the same AWS account](#shared-aws-account)

{% include h2.html id="aws-account-id" text="Alias/hide the AWS account ID in the label" %}

AWS {% include external-link.html text="doesn't consider the account ID the be a secret" href="https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html" %}:

> While account IDs, like any identifying information, should be used and shared carefully, they are not considered secret, sensitive, or confidential information.
{: .border-start .border-2 .ps-2 .text-secondary .fst-italic}

However, when dealing with multiple AWS accounts, it can be useful to give each account ID an alias.
This can be accomplished by {% include external-link.html text="defining GitHub Actions variables" href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#defining-configuration-variables-for-multiple-workflows" %} which
can subsequently {% include external-link.html text="be used in your workflows" href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#using-the-vars-context-to-access-configuration-variable-values" %}.

Assuming you defined repository variables as follows:

<div class="table-responsive">
    <table class="table table-bordered">
        <thead>
        <tr class="table-active">
            <th>Variable</th>
            <th>Value</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>AWS_ACCOUNT_ID_DEV</code></td>
            <td><code>111122223333</code></td>
        </tr>
        <tr>
            <td><code>AWS_ACCOUNT_ID_PROD</code></td>
            <td><code>444455556666</code></td>
        </tr>
        </tbody>
    </table>
</div>

You can now reference them in your [runs-on: label](/docs/label) like this:

{% raw %}
```yaml
runs-on: sprinters:aws/${{ vars.AWS_ACCOUNT_ID_DEV }}:ubuntu-latest:m7i.xlarge
```

```yaml
runs-on: sprinters:aws/${{ vars.AWS_ACCOUNT_ID_PROD }}:ubuntu-latest:m7i.8xlarge
```
{% endraw %}

And they will be substituted at runtime for their actual values:

```yaml
runs-on: sprinters:aws/111122223333:ubuntu-latest:m7i.xlarge
```

```yaml
runs-on: sprinters:aws/444455556666:ubuntu-latest:m7i.8xlarge
```

Making it much easier to ensure each job runs on the intended AWS account.

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
