---
layout: docs
title: "Spot"
---

**Spot instances are up to 90% cheaper than on-demand instances**. However, AWS can interrupt them at any time to
reclaim capacity for on-demand instances. An instance is notified of its upcoming interruption two minutes before it occurs.

Therefore, **any job taking 2 minutes or less** can never be interrupted by AWS and **can always be safely run on spot instances**.

Longer jobs should only be run on spot instances if it is acceptable for them to fail at any time due to instance interruption.
This can be partially mitigated, while still maintaining most of the savings, by splitting the longer jobs into
interruptible parts on spot instances and non-interruptible parts on on-demand instances.

Note that {% include external-link.html text="AWS doesn't charge you for spot instances interrupted less than 1 hour after launch" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-for-interrupted-spot-instances.html" %}.

{% include h3.html text="Prerequisite" %}

In order to use spot instances, your AWS account must have the `AWSServiceRoleForEC2Spot` IAM service-linked role.

When you launch your first spot instance using the AWS Console automatically, it will automatically be created for you.

Alternatively, you can {% include external-link.html text="create it manually" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/service-linked-roles-spot-instance-requests.html" %} using the AWS CLI or the {% include external-link.html text="IAM console" href=" https://console.aws.amazon.com/iam/" %}.

{% include h3.html text="Usage"  %}

By default, a job uses an on-demand instance.

You can force it to use spot instances instead by appending `spot=true` [to the label](/docs/label#spot).

A middle ground is using `spot=auto` to attempt to launch as spot and automatically fall back to on-demand if no spot capacity is available:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">spot=auto</span></pre>
</div>
