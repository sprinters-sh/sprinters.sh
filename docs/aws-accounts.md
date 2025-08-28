---
layout: docs
title: "AWS Accounts"
---

Sprinters runs your GitHub Actions jobs on your AWS account.

{% include h2.html id="default" text="Default AWS Account" %}

When you first [set up Sprinters](/docs/setup), a default AWS account is associated with your Sprinters account.

This AWS account is automatically used when running Sprinters-powered jobs. Its account ID isn't required in the [runs-on: label](/docs/label#account):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest</pre>
</div>

To make things more explicit however, you do have the option to include it.

For an AWS account with the ID `123456789012` the label would then look like this:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws<span class="fw-bold fst-italic text-warning">/123456789012</span>:ubuntu-latest</pre>
</div>


{% include h2.html id="multiple" text="Multiple AWS Accounts (advanced)" new="true" %}

AWS accounts are regularly used to fence off different environments or projects within the same AWS organization.

In addition to your default account, you can set up any number of additional AWS accounts for use with Sprinters.

To do so, run the two-minute [Sprinters CloudFormation setup](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://s3.us-east-1.amazonaws.com/sprinters/sprinters-setup.yml&stackName=Sprinters)
on each AWS account you want to use. You can then specify the appropriate account ID for each job in the label.

For an AWS account with the ID `123456789012`, the label would then look like this:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws<span class="fw-bold fst-italic text-warning">/123456789012</span>:ubuntu-latest</pre>
</div>

And for another AWS account with the ID `987654321098`, the label would look like this instead:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws<span class="fw-bold fst-italic text-warning">/987654321098</span>:ubuntu-latest</pre>
</div>


{% include h2.html id="alias" text="Aliasing" %}

When you have more than one AWS account, it isn't always easy to remember the exact AWS account ID associated with each environment or project.

To increase readability, you can associate AWS account IDs with meaningful names using {% include external-link.html text="GitHub Actions variables" href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#defining-configuration-variables-for-multiple-workflows" %}.

Imagine you defined your variables as follows:
{: .mb-1 }
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

You can now {% include external-link.html text="use them in your workflows" href="https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#using-the-vars-context-to-access-configuration-variable-values" %} like this:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">{% raw %}${{ vars.AWS_ACCOUNT_ID_DEV }}{% endraw %}</span>:ubuntu-latest</pre>
</div>

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">{% raw %}${{ vars.AWS_ACCOUNT_ID_PROD }}{% endraw %}</span>:ubuntu-latest</pre>
</div>

As expected, they will be substituted at runtime for their actual values:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">111122223333</span>:ubuntu-latest</pre>
</div>

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">444455556666</span>:ubuntu-latest</pre>
</div>

Note that AWS {% include external-link.html text="doesn't consider the account ID the be a secret" href="https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html" %}:
{: .mb-1 }
> While account IDs, like any identifying information, should be used and shared carefully, they are not considered secret, sensitive, or confidential information.
{: .border-start .border-2 .ps-2 .text-secondary .fst-italic}

But if this is a concern to you, you can use this same technique to remove the explicit AWS account IDs from your labels.
