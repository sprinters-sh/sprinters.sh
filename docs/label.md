---
layout: docs
title: "runs-on: label"
---

<p class="mb-1">To tell GitHub to run your workflow jobs using Sprinters on AWS instead of GitHub hosted runners,
    locate the <code>runs-on:</code> label in your workflow yml:</p>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: ubuntu-latest</pre>
</div>

<p class="mb-1">And adjust it to:</p>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning">sprinters:aws:</span>ubuntu-latest</pre>
</div>

This label tells Sprinters to connect to your AWS account
and launch a runner instance using the `ubuntu-latest` image, which is identical to the one provided by GitHub.

A number of defaults will also be applied automatically to most closely matches the capacity of GitHub hosted runners:

- The instance will be a `t3.large` (x64 with 2 vCPUs and 8 GiB RAM).
- It will have `14` GiB of temp disk space and `4` GiB of swap.

The instance placement will be as follows:
- It will be launched in the `us-east-1` region in your account's default VPC.
- Sprinters will automatically pick the availability zone that currently has the lowest spot price.
- Sprinters will attempt to launch the instance as spot and automatically fall back to on-demand if AWS has insufficient spot capacity available.

{% include h2.html id="customization" text="Customization" %}

You can fully customize this by adding various parts to the label. The order doesn't matter. All parts are separated by a colon (`:`).

Here is a more complex example:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning">sprinters:aws:eu-central-1:ubuntu-22.04:m7i.24xlarge:temp=64</span></pre>
</div>

Sprinters will launch a runner in the `eu-central-1` region using the `ubuntu-22.04` image on a `m7i.24xlarge` instance with `64` GiB of temp space.

The following label parts can be added or modified to customize the image, placement and capacity of the runner instance:

- [Image](#image)
- [AWS Region / Availability Zone / Subnet](#placement)
- [AWS Instance Type](#instance-type)
- [AWS Spot Instances](#spot)
- [AWS Instance Profile](#instance-profile)
- [Root Volume](#root)
- [Swap Volume](#swap)
- [Temp Volume](#temp)
- [Runner Lifecycle Events](#events)

---
{: .mb-7 }

{% include h3.html id="image" text="Image" %}
You can set the [image](/docs/images) for the runner by replacing the one in the label.

{% include h4.html text="Format" %}
_image-name_

{% include h4.html text="Default" %}
`ubuntu-latest`

{% include h4.html text="Supported <strong>x64</strong> Images" %}
{% include h5.html text="Ubuntu 24.04" %}
| Image | Description |
+-|-|-+
| `ubuntu-latest`{: .text-nowrap } <br> `ubuntu-24.04`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners |
| `ubuntu-24.04-slim`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-24.04-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h5.html text="Ubuntu 22.04" %}
| Image | Description |
+-|-|-+
| `ubuntu-22.04`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners |
| `ubuntu-22.04-slim`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-22.04-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h4.html text="Supported <strong>arm64</strong> Images" %}
{% include h5.html text="Ubuntu 24.04" %}
| Image | Description |
+-|-|-+
| `ubuntu-22.04-arm`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners |
| `ubuntu-22.04-arm-slim`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-22.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h5.html text="Ubuntu 22.04" %}
| Image | Description |
+-|-|-+
| `ubuntu-22.04-arm`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners |
| `ubuntu-22.04-arm-slim`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-22.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h4.html text="Example" %}
To set the image to `ubuntu-24.04-minimal`, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="fw-bold fst-italic text-warning">ubuntu-24.04-minimal</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="placement" text="AWS Region / Availability Zone / Subnet" %}
You can specify where the runner instance is launched by appending a _region_, _availability zone_ and _subnet id_ to the label.

At least one of _region_ and _availability zone_ must be specified. _subnet id_ is optional.
All parts are separated by a `/`.

{% include h4.html text="Format" %}
_aws-region_/_aws-availability-zone_/_aws-subnet-id_

{% include h4.html text="Default" %}
`us-east-1` (random subnet of a random availability zone of the default VPC of `us-east-1`)

{% include h4.html text="Supported Regions" %}
| Region | Location |
+-|-|-+
| `ap-northeast-1` | Tokyo |
| `eu-central-1` | Frankfurt |
| `eu-west-1` | Ireland |
| `eu-west-2` | London |
| `us-east-1` | N. Virginia |
| `us-west-2` | Oregon |
{: .table }

Need a different region? [Simply request it in the issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Notes" %}

- If you specify both a _region_ and an _availability zone_, you must ensure the _availability zone_ resides in that _region_.
- If you don't specify a _region_, Sprinters will automatically select the matching _region_ for the _availability zone_.
- If you specify both a _region_ and a _subnet id_, you must ensure the _subnet_ resides in that _region_.
- If you specify both an _availability zone_ and a _subnet id_, you must ensure the _subnet_ resides in that _availability zone_.

{% include h4.html text="Examples" %}
To launch the runner using the `ubuntu-24.04-minimal` image in the `eu-central-1` region, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-24.04-minimal:<span class="fw-bold fst-italic text-warning">eu-central-1</span></pre>
</div>

To use the `eu-central-1c` availability zone, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">eu-central-1c</span></pre>
</div>

To use the `subnet-0123456789abcdef0` subnet in the `us-east-1` region, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="fw-bold fst-italic text-warning">us-east-1/subnet-0123456789abcdef0</span>:ubuntu-latest</pre>
</div>

---
{: .mb-7 }


{% include h3.html id="instance-type" text="AWS Instance Type" %}
You can set the AWS EC2 instance type on which launch the runner by appending it to the label.

{% include h4.html text="Format" %}
_aws-instance-type_

{% include h4.html text="Default" %}
`t3.large`

{% include h4.html text="Supported <strong>x64</strong> Instance Types" %}

{% include h5.html text="Intel" %}
| Family | Sizes |
+-|-|-+
| c5 | `c5.large` , `c5.xlarge` , `c5.2xlarge` , `c5.4xlarge` , `c5.9xlarge` , `c5.12xlarge` , `c5.18xlarge` , `c5.24xlarge` |
| c6i | `c6i.large` , `c6i.xlarge` , `c6i.2xlarge` , `c6i.4xlarge` , `c6i.8xlarge` , `c6i.12xlarge` , `c6i.16xlarge` , `c6i.24xlarge` , `c6i.32xlarge` |
| c7i | `c7i.large` , `c7i.xlarge` , `c7i.2xlarge` , `c7i.4xlarge` , `c7i.8xlarge` , `c7i.12xlarge` , `c7i.16xlarge` , `c7i.24xlarge` , `c7i.48xlarge` |
| c7i-flex | `c7i-flex.large` , `c7i-flex.xlarge` , `c7i-flex.2xlarge` , `c7i-flex.4xlarge` , `c7i-flex.8xlarge` , `c7i-flex.12xlarge` , `c7i-flex.16xlarge` |
| m5 | `m5.large` , `m5.xlarge` , `m5.2xlarge` , `m5.4xlarge` , `m5.8xlarge` , `m5.12xlarge` , `m5.16xlarge` , `m5.24xlarge` |
| m6i | `m6i.large` , `m6i.xlarge` , `m6i.2xlarge` , `m6i.4xlarge` , `m6i.8xlarge` , `m6i.12xlarge` , `m6i.16xlarge` , `m6i.24xlarge` , `m6i.32xlarge` |
| m7i | `m7i.large` , `m7i.xlarge` , `m7i.2xlarge` , `m7i.4xlarge` , `m7i.8xlarge` , `m7i.12xlarge` , `m7i.16xlarge` , `m7i.24xlarge` , `m7i.48xlarge` |
| m7i-flex | `m7i-flex.large` , `m7i-flex.xlarge` , `m7i-flex.2xlarge` , `m7i-flex.4xlarge` , `m7i-flex.8xlarge` , `m7i-flex.12xlarge` , `m7i-flex.16xlarge` |
| r5 | `r5.large` , `r5.xlarge` , `r5.2xlarge` , `r5.4xlarge` , `r5.8xlarge` , `r5.12xlarge` , `r5.16xlarge` , `r5.24xlarge` |
| r6i | `r6i.large` , `r6i.xlarge` , `r6i.2xlarge` , `r6i.4xlarge` , `r6i.8xlarge` , `r6i.12xlarge` , `r6i.16xlarge` , `r6i.24xlarge` , `r6i.32xlarge` |
| r7i | `r7i.large` , `r7i.xlarge` , `r7i.2xlarge` , `r7i.4xlarge` , `r7i.8xlarge` , `r7i.12xlarge` , `r7i.16xlarge` , `r7i.24xlarge` , `r7i.48xlarge` |
| t3 | `t3.nano` , `t3.micro` , `t3.small` , `t3.medium` , `t3.large` , `t3.xlarge` , `t3.2xlarge` |
{: .table #instance-types }

{% include h5.html text="AMD" %}
| Family | Sizes |
+-|-|-+
| c5a | `c5a.large` , `c5a.xlarge` , `c5a.2xlarge` , `c5a.4xlarge` , `c5a.8xlarge` , `c5a.12xlarge` , `c5a.16xlarge` , `c5a.24xlarge` |
| c6a | `c6a.large` , `c6a.xlarge` , `c6a.2xlarge` , `c6a.4xlarge` , `c6a.8xlarge` , `c6a.12xlarge` , `c6a.16xlarge` , `c6a.24xlarge` , `c6a.32xlarge` , `c6a.48xlarge` |
| c7a | `c7a.medium` , `c7a.large` , `c7a.xlarge` , `c7a.2xlarge` , `c7a.4xlarge` , `c7a.8xlarge` , `c7a.12xlarge` , `c7a.16xlarge` , `c7a.24xlarge` , `c7a.32xlarge` , `c7a.48xlarge` |
| m5a | `m5a.large` , `m5a.xlarge` , `m5a.2xlarge` , `m5a.4xlarge` , `m5a.8xlarge` , `m5a.12xlarge` , `m5a.16xlarge` , `m5a.24xlarge` |
| m6a | `m6a.large` , `m6a.xlarge` , `m6a.2xlarge` , `m6a.4xlarge` , `m6a.8xlarge` , `m6a.12xlarge` , `m6a.16xlarge` , `m6a.24xlarge` , `m6a.32xlarge` , `m6a.48xlarge` |
| m7a | `m7a.medium` , `m7a.large` , `m7a.xlarge` , `m7a.2xlarge` , `m7a.4xlarge` , `m7a.8xlarge` , `m7a.12xlarge` , `m7a.16xlarge` , `m7a.24xlarge` , `m7a.32xlarge` , `m7a.48xlarge` |
| r5a | `r5a.large` , `r5a.xlarge` , `r5a.2xlarge` , `r5a.4xlarge` , `r5a.8xlarge` , `r5a.12xlarge` , `r5a.16xlarge` , `r5a.24xlarge` |
| r6a | `r6a.large` , `r6a.xlarge` , `r6a.2xlarge` , `r6a.4xlarge` , `r6a.8xlarge` , `r6a.12xlarge` , `r6a.16xlarge` , `r6a.24xlarge` , `r6a.32xlarge` , `r6a.48xlarge` |
| r7a | `r7a.medium` , `r7a.large` , `r7a.xlarge` , `r7a.2xlarge` , `r7a.4xlarge` , `r7a.8xlarge` , `r7a.12xlarge` , `r7a.16xlarge` , `r7a.24xlarge` , `r7a.32xlarge` , `r7a.48xlarge` |
| t3a | `t3a.nano` , `t3a.micro` , `t3a.small` , `t3a.medium` , `t3a.large` , `t3a.xlarge` , `t3a.2xlarge` |
{: .table #instance-types }

{% include h4.html text="Supported <strong>arm64</strong> Instance Types" %}

| Family | Sizes |
+-|-|-+
| c6g | `c6g.medium` , `c6g.large` , `c6g.xlarge` , `c6g.2xlarge` , `c6g.4xlarge` , `c6g.8xlarge` , `c6g.12xlarge` , `c6g.16xlarge` |
| c7g | `c7g.medium` , `c7g.large` , `c7g.xlarge` , `c7g.2xlarge` , `c7g.4xlarge` , `c7g.8xlarge` , `c7g.12xlarge` , `c7g.16xlarge` |
| c8g | `c8g.medium` , `c8g.large` , `c8g.xlarge` , `c8g.2xlarge` , `c8g.4xlarge` , `c8g.8xlarge` , `c8g.12xlarge` , `c8g.16xlarge` , `c8g.24xlarge` , `c8g.48xlarge` |
| m6g | `m6g.medium` , `m6g.large` , `m6g.xlarge` , `m6g.2xlarge` , `m6g.4xlarge` , `m6g.8xlarge` , `m6g.12xlarge` , `m6g.16xlarge` |
| m7g | `m7g.medium` , `m7g.large` , `m7g.xlarge` , `m7g.2xlarge` , `m7g.4xlarge` , `m7g.8xlarge` , `m7g.12xlarge` , `m7g.16xlarge` |
| m8g | `m8g.medium` , `m8g.large` , `m8g.xlarge` , `m8g.2xlarge` , `m8g.4xlarge` , `m8g.8xlarge` , `m8g.12xlarge` , `m8g.16xlarge` , `m8g.24xlarge` , `m8g.48xlarge` |
| r6g | `r6g.medium` , `r6g.large` , `r6g.xlarge` , `r6g.2xlarge` , `r6g.4xlarge` , `r6g.8xlarge` , `r6g.12xlarge` , `r6g.16xlarge` |
| r7g | `r7g.medium` , `r7g.large` , `r7g.xlarge` , `r7g.2xlarge` , `r7g.4xlarge` , `r7g.8xlarge` , `r7g.12xlarge` , `r7g.16xlarge` |
| r8g | `r8g.medium` , `r8g.large` , `r8g.xlarge` , `r8g.2xlarge` , `r8g.4xlarge` , `r8g.8xlarge` , `r8g.12xlarge` , `r8g.16xlarge` , `r8g.24xlarge` , `r8g.48xlarge` |
| t4g | `t4g.nano` , `t4g.micro` , `t4g.small` , `t4g.medium` , `t4g.large` , `t4g.xlarge` , `t4g.2xlarge` |
{: .table #instance-types }

Need a different instance family? [Simply request it in the issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Example" %}
To set the instance type to `m7i.8xlarge`, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">m7i.8xlarge</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="spot" text="AWS Spot Instances" %}
To save significant amounts of money at a slight risk of being interrupted, the instance can be launched as a spot instance.

{% include h4.html text="Format" %}
spot=_`auto|true|false`_

{% include h4.html text="Default" %}
`false`

{% include h4.html text="Supported Modes" %}

| Mode | Description |
+-|-+
| `auto`  | Attempt to launch the instance as spot. Automatically fall back to on-demand if AWS currently doesn't have enough spot capacity available. This guarantees that a job will be able to run and most of the time it will do so saving significant amounts of money using a spot instance. |
| `true`  | Force the instance to launch as spot. Fail if AWS currently doesn't have enough spot capacity available. |
| `false` | Always run as on-demand, foregoing the savings of spot for guaranteed execution. |
{: .table }

{% include h4.html text="Note" %}

If neither a _subnet id_ nor an _availability zone_ was specified, Sprinters will automatically select the _availability zone_ with the cheapest spot price.

{% include h4.html text="Example" %}
To force the use of much cheaper spot instances, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">spot=true</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="instance-profile" text="AWS Instance Profile" %}
To access resources in your AWS account without the need to store long-lived AWS credentials as GitHub Actions secrets,
you can {% include external-link.html text="associate an IAM instance profile" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html" %} with
your runner instance. The instance will then automatically have AWS credentials available with the permissions of
the IAM role linked to the instance profile.

{% include h4.html text="Format" %}
profile=_instance-profile-name_

{% include h4.html text="Default" %}
_none_

{% include h4.html text="Example" %}
To associate your instance with the `my-instance-profile` instance profile, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">profile=my-instance-profile</span></pre>
</div>

See also: [Accessing AWS Resources](/docs/aws-resources#instance-profile) for more info.

---
{: .mb-7 }


{% include h3.html id="root" text="Root Volume" %}
You can adjust the performance of the [root volume](/docs/volumes) by appending a performance specification to the label.

{% include h4.html text="Format" %}
root=_volume-type_/_iops_/_throughput_

{% include h4.html text="Default" %}
`gp3` volume with `3000` IOPS and `150` MiB/s throughput.

{% include h4.html text="Volume Type" %}

Only `gp3` volumes are supported for now.

{% include h4.html text="IOPS" %}

Between `3000` and `16000` IOPS are supported, depending on the size of the volume.
Use `max` for the maximum number of IOPS for the current volume size.

{% include h4.html text="Throughput" %}

Between `125` and `1000` MiB/s are supported, depending on the number of IOPS of the volume.
Use `max` for the maximum throughput for the current number of IOPS.

{% include h4.html text="Examples" %}
To increase the root volume to `4000` IOPS and `1000` MiB/s throughput, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">root=gp3/4000/1000</span></pre>
</div>

To increase the root volume to the maximum number of IOPS for its size and the maximum throughput for these IOPS, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">root=gp3/max/max</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="swap" text="Swap Volume" %}
You can adjust the size and performance of the [swap volume](/docs/volumes) by modifying the label.

{% include h4.html text="Formats" %}
- swap=_size-in-gib_
- swap=_size-in-gib_/_volume-type_/_iops_/_throughput_

{% include h4.html text="Default" %}
`4` GiB `gp3` volume with `3000` IOPS and `150` MiB/s throughput.

{% include h4.html text="Size" %}

Sizes from `1` GiB to `16384` GiB are supported.

{% include h4.html text="Volume Type" %}

Only `gp3` volumes are supported for now.

{% include h4.html text="IOPS" %}

Between `3000` and `16000` IOPS are supported, depending on the size of the volume.
Use `max` for the maximum number of IOPS for the current volume size.

{% include h4.html text="Throughput" %}

Between `125` and `1000` MiB/s are supported, depending on the number of IOPS of the volume.
Use `max` for the maximum throughput for the current number of IOPS.

{% include h4.html text="Examples" %}
To set the swap size to `64` GiB, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">swap=64</span></pre>
</div>

To set the swap size to `64` GiB and max out the volume performance, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">swap=64/gp3/max/max</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="temp" text="Temp Volume" %}
You can adjust the size and performance of the [temp volume](/docs/volumes) by modifying the label.

{% include h4.html text="Formats" %}
- temp=_size-in-gib_
- temp=_size-in-gib_/_volume-type_/_iops_/_throughput_

{% include h4.html text="Default" %}
`4` GiB `gp3` volume with `3000` IOPS and `150` MiB/s throughput.

{% include h4.html text="Size" %}

Sizes from `1` GiB to `16384` GiB are supported.

{% include h4.html text="Volume Type" %}

Only `gp3` volumes are supported for now.

{% include h4.html text="IOPS" %}

Between `3000` and `16000` IOPS are supported, depending on the size of the volume.
Use `max` for the maximum number of IOPS for the current volume size.

{% include h4.html text="Throughput" %}

Between `125` and `1000` MiB/s are supported, depending on the number of IOPS of the volume.
Use `max` for the maximum throughput for the current number of IOPS.

{% include h4.html text="Examples" %}
To set the temp size to `64` GiB, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=64</span></pre>
</div>

To set the temp size to `64` GiB and max out the volume throughput, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=64/gp3/3000/max</span></pre>
</div>

---
{: .mb-7 }


{% include h3.html id="events" text="Runner Lifecycle Events" %}
In order to react more quickly to instances becoming unhealthy, runners {% include external-link.html text="publish lifecycle events"
        href="https://github.com/sprinters-sh/sprinters-images/blob/main/publish-event.sh" %} to Sprinters.

{% include h4.html text="Format" %}
events=_`true|false`_

{% include h4.html text="Default" %}
`true`

{% include h4.html text="Example" %}
To disable the instance lifecycle events publishing (at the cost of longer timeouts when an instance becomes unhealthy or is terminated as part of a spot capacity reclaim), change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">events=false</span></pre>
</div>
