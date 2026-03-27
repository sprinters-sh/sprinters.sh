---
layout: docs
title: "Spot"
---

EC2 [instances](/docs/instances) can be launched as _on-demand_ or _spot_.

{% include h2.html text="On-demand instances" %}
By default, Sprinters launches your runners as *on-demand instances*. They are about 3-4x cheaper than GitHub-hosted runners without any restrictions.

You can optionally make this default explicit, by specifying `spot=false` in the the [runs-on: label](/docs/label#spot):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning fw-bold">spot=false</span></pre>
</div>

{% include h2.html text="Spot instances" %}
You can however save even more by switching to *spot instances*. They are are between 55% and 90% cheaper than on-demand instances.

There is only one catch: AWS can interrupt them at any time with 2 minutes notice.

{% include tip.html text="Any job taking 2 minutes or less can always be safely run on spot instances as it can never be interrupted by AWS." %}

You can configure a job to use spot instances by setting `spot=true`:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning fw-bold">spot=true</span></pre>
</div>

{% include h3.html text="Prerequisite" %}

In order to use spot instances, your AWS account must have the `AWSServiceRoleForEC2Spot` IAM service-linked role.
If you have previously launched a spot instance using the AWS Console, this role will have automatically been created for you.

If not, you can easily {% include external-link.html text="create it manually" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/service-linked-roles-spot-instance-requests.html" %} using the AWS CLI or the {% include external-link.html text="IAM console" href=" https://console.aws.amazon.com/iam/" %}.

{% include h3.html text="Designing for interruptions" %}

Jobs should only be run on spot instances if it is acceptable for them to fail due to instance interruption.

This can be accomplished, while still maintaining most of the savings, by splitting jobs into
interruptible parts on spot instances and non-interruptible parts on on-demand instances.

You could, for example, run compile and test tasks on spot instances and deploy the application using on-demand instances.

{% capture billing_link %}AWS {% include external-link.html text="doesn't charge you for spot instances interrupted less than 1 hour after launch" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-for-interrupted-spot-instances.html" %}, making most interrupted jobs free.{% endcapture %}
{% include tip.html text=billing_link %}

{% include h3.html text="Auto-selection"  %}

AWS sometimes doesn't have enough capacity available and will refuse to launch your instances as spot.
To avoid having your jobs fail because of this, Sprinters has a handy fallback mechanism, where it will
first try to launch your job using a spot instance. If this doesn't succeed, it will immediately retry
using an on-demand instance.

All you need to do to activate this, is set `spot=auto`:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning fw-bold">spot=auto</span></pre>
</div>

{% include h3.html text="Automatic rerun"  %}

When an instance is launched as spot, AWS will occasionally terminate it to reclaim capacity for on-demand ones.
This will cause your job to fail. To avoid having to manually restart it and hope it will run to completion the next time,
Sprinters offers a convenient possibility to automatically rerun it as on-demand after this occurs.

<img src="/assets/new/2026-03-27-spot-rerun.png" alt="Spot rerun" class="screenshot">

To enable this, simply set `spot=rerun`:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning fw-bold">spot=rerun</span></pre>
</div>

This is effectively the same functionality as `spot=auto`, but with automatic reruns.

{% include tip.html text="If your job can tolerate the occasional spot-related interruption, this is usually the best option." %}
