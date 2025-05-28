---
layout: docs
title: "Instances"
---

Every Sprinters-powered job is launched as an EC2 instance in your own AWS account.
Each instance is of a specific **type** and can either be launched as **on-demand** (default) or **spot**.

{% include h2.html id="type" text="Type"  %}

An instance type is the combination of an instance family and a size.
The instance family determines the CPU architecture and the ratio between vCPUs and GiBs of RAM.
The size then acts as a multiplier.

GitHub-hosted runners always come in a 1:4 ratio (ex.: 2 vCPUs and 8 GiBs of RAM).

With Sprinters-powered runners, you can freely choose between:
- 1:2 (`c` instances: compute-optimized)
- 1:4 (`m` instances: general-purpose)
- 1:8 (`r` instances: memory-optimized).

_General purpose_ instances are a great place to start as they provide a good balance for most workloads.

You can optimize costs by running jobs requiring more memory, but not more vCPUs on smaller size _memory-optimized_ instances.

And jobs requiring more vCPUs but not more memory, can be run at reduced cost on larger size _compute-optimized_ instances.

{% include h3.html text="Usage"  %}

If not explicitly specified, a job will use a `t3.large` instance.

To use a different instance type, simply [append it to the label](/docs/label#instance-type):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">r7a.16xlarge</span></pre>
</div>

This job will now use an `r7a.16xlarge` instance.

{% include h2.html id="on-demand" text="On-demand"  %}

On-demand instances are a great default choice as they provide significant savings over GitHub-hosted runners
without any risk of interruption.

{% include h2.html id="spot" text="Spot"  %}

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
