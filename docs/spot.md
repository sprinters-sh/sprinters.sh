---
layout: docs
title: "Spot"
---

EC2 [instances](/docs/instances) can be launched as _on-demand_ or _spot_.

**On-demand instances** are a great default choice as they are about 4x cheaper than GitHub-hosted runners without any restrictions.

But you can save between 65% and 90% more by switching to **spot instances**.

There is only one catch: AWS can interrupt them at any time with 2 minutes notice.
This in turn means that, **any job taking 2 minutes or less** can never be interrupted by AWS and **can always be safely run on spot instances**.

Longer jobs should only be run on spot instances if it is acceptable for them to fail due to instance interruption.
This can be mitigated, while still maintaining most of the savings, by splitting the longer jobs into
interruptible parts on spot instances and non-interruptible parts on on-demand instances.

You could, for example, run compile and test tasks on spot instances and deploy the application using on-demand instances.

Note that {% include external-link.html text="AWS doesn't charge you for spot instances interrupted less than 1 hour after launch" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-for-interrupted-spot-instances.html" %},
making most interrupted jobs free.

{% include h2.html text="Prerequisite" %}

In order to use spot instances, your AWS account must have the `AWSServiceRoleForEC2Spot` IAM service-linked role.
If you have previously launched a spot instance using the AWS Console, this role will have automatically been created for you.

If not, you can easily {% include external-link.html text="create it manually" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/service-linked-roles-spot-instance-requests.html" %} using the AWS CLI or the {% include external-link.html text="IAM console" href=" https://console.aws.amazon.com/iam/" %}.

{% include h2.html text="Usage"  %}

By default, jobs uses on-demand instances (`spot=false`).

Add `spot=auto` to the [runs-on: label](/docs/label#spot) to attempt to launch as spot and automatically fall back
to on-demand if no spot capacity is available (recommended):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">spot=auto</span></pre>
</div>

Alternatively, you can force also force the use spot instances (with no fallback) by appending `spot=true`:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">spot=true</span></pre>
</div>
