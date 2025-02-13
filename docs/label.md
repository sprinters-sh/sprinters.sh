---
layout: docs
title: "runs-on: label"
next: docs/security.md
---

<p class="mb-1">To tell GitHub to run your workflow jobs using Sprinters on AWS instead of GitHub hosted runners,
    locate the <code>runs-on:</code> directive in your workflow yml:</p>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: ubuntu-latest</pre>
</div>

<p class="mb-1">Lookup your <strong>12-digit AWS account ID</strong> and adjust it to:</p>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">your-12-digit-aws-account-id</span>:ubuntu-latest</pre>
</div>

Congratulations! Your GitHub Actions job is fully set up and will execute with Sprinters on AWS going forward.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#job-setup" aria-expanded="false" aria-controls="job-setup">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="job-setup">
    <img src="/assets/label/aws-account-id.png" alt="AWS account ID lookup" class="screenshot">
</div>

{% include h2.html id="label" text="Label" %}

The label lets you directly control where your jobs run, on what instance type they run, what image they use and how much temp storage they get.

For Sprinters at the bare minimum it looks like this:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning">sprinters:aws/123456789012:ubuntu-latest</span></pre>
</div>

The label in the example above tells Sprinters to connect to AWS account `123456789012` (using the default `sprinters-role` role)
and launch a runner instance using the `ubuntu-latest` image, which is identical to the one provided by GitHub.

A number of defaults will also be applied automatically to most closely matches the capacity of GitHub hosted runners:

- The instance will be a `t3.large` (x64 with 2 vCPUs).
- It will have `14` GiB of temp disk space and `4` GiB of swap.

The instance placement will be as follows:
- It will be launched in the `us-east-1` region in your account's default VPC.
- Sprinters will automatically pick the availability zone that currently has the lowest spot price.
- Sprinters will attempt to launch the instance as spot and automatically fall back to on-demand if AWS has insufficient spot capacity available.

{% include h2.html id="customization" text="Customization" %}

This specification can be customized by adding various parts to the label. The order doesn't matter. All parts are separated by a colon (`:`).

Here is a more complex example:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning">sprinters:aws/111122223333/my-custom-role-name:ubuntu-22.04:eu-central-1/subnet-0123456789abcdef0:m7i.24xlarge:temp=64</span></pre>
</div>

Sprinters will connect to the `111122223333` AWS account using the cross-account role named `my-custom-role-name` and
launch a runner using the `ubuntu-22.04` image in the `eu-central-1` region
within the `subnet-0123456789abcdef0` subnet on a `m7i.24xlarge` instance with `64` GiB of temp space.

{% include h2.html id="parts" text="Parts" %}

The following label parts can be added or modified to customize the image, placement and capacity of the runner instance:

- [AWS Account (Account ID / IAM Role Name)](#account)
- [Image](#image)
- [AWS Placement (Region / VPC / Availability Zone / Subnet)](#placement)
- [AWS Instance Type](#instance-type)
- [AWS Spot Instances](#spot)
- [Temp Disk Space](#temp)
- [Swap Disk Space](#swap)

---
{: .mt-5 }

{% include h3.html id="account" text="AWS Account (Account ID / IAM Role Name)" %}
You must include the AWS account ID where the runner instance is launched in the label.

Optionally you can also customize the name of IAM Role that Sprinters uses to connect to your AWS account by appending it to the label.

**Format:** `aws`/_aws-account-id_/_iam-role-name_\
**Default:** `aws`/_aws-account-id_/`sprinters-role`

{% include h4.html text="Examples" %}
To use the `112233445566` AWS account ID and the default `sprinters-role` role name, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">112233445566</span>:ubuntu-latest</pre>
</div>

To use the `112233445566` AWS account ID and `my-custom-role-name` as the role name, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/<span class="fw-bold fst-italic text-warning">112233445566/my-custom-role-name</span>:ubuntu-latest</pre>
</div>

---
{: .mt-5 }

{% include h3.html id="image" text="Image" %}
You can set the image for the runner by replacing the one in the label.

**Format:** _image-name_\
**Default:** `ubuntu-latest`

{% include h4.html text="Supported <strong>x64</strong> Image Types" %}
| Type | Description |
+-|-|-+
| `ubuntu-latest`{: .text-nowrap } <br> `ubuntu-24.04`{: .text-nowrap } | Ubuntu 24.04 x64 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04`{: .text-nowrap } | Ubuntu 22.04 x64 image identical to the one available for GitHub hosted runners |
| `minimal` | Minimal, fast-booting image containing only Git and Docker |
{: .table }

{% include h4.html text="Supported <strong>arm64</strong> Image Types" %}
| Type | Description |
+-|-|-+
| `ubuntu-24.04-arm`{: .text-nowrap } | Ubuntu 24.04 arm64 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04-arm`{: .text-nowrap } | Ubuntu 22.04 arm64 image identical to the one available for GitHub hosted runners |
| `minimal` | Minimal, fast-booting image containing only Git and Docker |
{: .table }

{% include h4.html text="Example" %}
To set the image to `minimal`, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:<span class="fw-bold fst-italic text-warning">minimal</span></pre>
</div>

---
{: .mt-5 }

{% include h3.html id="placement" text="AWS Placement (Region / VPC / Availability Zone / Subnet)" %}
You can specify where the runner instance is launched by appending a placement config to the label.

This placement config specifies the _region_, _availability zone_ and _subnet id_ of the instance.
At least one of _region_ and _availability zone_ must be specified. _subnet id_ is optional.
All parts are separated by a `/`.

**Format:** _aws-region_/_aws-availability-zone_/_aws-subnet-id_\
**Default:** `us-east-1` (random subnet of a random availability zone of the default VPC of `us-east-1`)

{% include h4.html text="Supported Regions" %}
- `ap-northeast-1`
- `eu-central-1`
- `eu-west-1`
- `us-east-1`
- `us-west-2`

More regions will be added soon. To request support for a specific region, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Notes" %}

- If you specify both a _region_ and an _availability zone_, you must ensure the _availability zone_ resides in that _region_.
- If you don't specify a _region_, Sprinters will automatically select the matching _region_ for the _availability zone_.
- If you specify both a _region_ and a _subnet id_, you must ensure the _subnet_ resides in that _region_.
- If you specify both an _availability zone_ and a _subnet id_, you must ensure the _subnet_ resides in that _availability zone_.

{% include h4.html text="Examples" %}
To set the region to `eu-central-1` and run using the `minimal` image, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:minimal:<span class="fw-bold fst-italic text-warning">eu-central-1</span></pre>
</div>

To use the `eu-central-1c` availability zone, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:ubuntu-latest:<span class="fw-bold fst-italic text-warning">eu-central-1c</span></pre>
</div>

To use the `subnet-0123456789abcdef0` subnet in the `us-east-1` region, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:<span class="fw-bold fst-italic text-warning">us-east-1/subnet-0123456789abcdef0</span>:ubuntu-latest</pre>
</div>

---
{: .mt-5 }

{% include h3.html id="instance-type" text="AWS Instance Type" %}
You can set the AWS EC2 instance type on which launch the runner by appending it to the label.

**Format:** _aws-instance-type_\
**Default:** `t3.large`

{% include h4.html text="Supported <strong>x64</strong> Instance Types" %}

| Family | Sizes |
+-|-|-+
| c7i | `c7i.large` , `c7i.xlarge` , `c7i.2xlarge` , `c7i.4xlarge` , `c7i.8xlarge` , `c7i.12xlarge` , `c7i.16xlarge` , `c7i.24xlarge` , `c7i.48xlarge` |
| c7i-flex | `c7i-flex.large` , `c7i-flex.xlarge` , `c7i-flex.2xlarge` , `c7i-flex.4xlarge` , `c7i-flex.8xlarge` , `c7i-flex.12xlarge` , `c7i-flex.16xlarge` |
| m7i | `m7i.large` , `m7i.xlarge` , `m7i.2xlarge` , `m7i.4xlarge` , `m7i.8xlarge` , `m7i.12xlarge` , `m7i.16xlarge` , `m7i.24xlarge` , `m7i.48xlarge` |
| m7i-flex | `m7i-flex.large` , `m7i-flex.xlarge` , `m7i-flex.2xlarge` , `m7i-flex.4xlarge` , `m7i-flex.8xlarge` , `m7i-flex.12xlarge` , `m7i-flex.16xlarge` |
| r7i | `r7i.large` , `r7i.xlarge` , `r7i.2xlarge` , `r7i.4xlarge` , `r7i.8xlarge` , `r7i.12xlarge` , `r7i.16xlarge` , `r7i.24xlarge` , `r7i.48xlarge` |
| t3 | `t3.nano` , `t3.micro` , `t3.small` , `t3.medium` , `t3.large` , `t3.xlarge` , `t3.2xlarge` |
| t3a | `t3a.nano` , `t3a.micro` , `t3a.small` , `t3a.medium` , `t3a.large` , `t3a.xlarge` , `t3a.2xlarge` |
{: .table #instance-types }

{% include h4.html text="Supported <strong>arm64</strong> Instance Types" %}

| Family | Sizes |
+-|-|-+
| m6g | `m6g.medium` , `m6g.large` , `m6g.xlarge` , `m6g.2xlarge` , `m6g.4xlarge` , `m6g.8xlarge` , `m6g.12xlarge` , `m6g.16xlarge` |
| m7g | `m7g.medium` , `m7g.large` , `m7g.xlarge` , `m7g.2xlarge` , `m7g.4xlarge` , `m7g.8xlarge` , `m7g.12xlarge` , `m7g.16xlarge` |
| m8g | `m8g.medium` , `m8g.large` , `m8g.xlarge` , `m8g.2xlarge` , `m8g.4xlarge` , `m8g.8xlarge` , `m8g.12xlarge` , `m8g.16xlarge` , `m8g.24xlarge` , `m8g.48xlarge` |
| t4g | `t4g.nano` , `t4g.micro` , `t4g.small` , `t4g.medium` , `t4g.large` , `t4g.xlarge` , `t4g.2xlarge` |
{: .table #instance-types }

More instance families will be added soon. To request support for a specific instance family, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Example" %}
To set the instance type to `m7i.8xlarge`, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:ubuntu-latest:<span class="fw-bold fst-italic text-warning">m7i.8xlarge</span></pre>
</div>

---
{: .mt-5 }

{% include h3.html id="spot" text="AWS Spot Instances" %}
To save significant amounts of money at a slight risk of being interrupted, the instance can be launched as a spot instance.

**Format:** spot=_auto|true|false_\
**Default:** `auto`

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
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:ubuntu-latest:<span class="fw-bold fst-italic text-warning">spot=true</span></pre>
</div>

---
{: .mt-5 }

{% include h3.html id="temp" text="Temp Disk Space" %}
You can set the temp disk space available for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** temp=_size-in-gib_\
**Default:** `14`

{% include h4.html text="Example" %}
To set the temp disk space to `512` GiB, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=512</span></pre>
</div>

---
{: .mt-5 }

{% include h3.html id="swap" text="Swap Disk Space" %}
You can set the swap size for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** swap=_size-in-gib_\
**Default:** `4`

{% include h4.html text="Example" %}
To set the swap size to `64` GiB, change the label to:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws/123456789012:ubuntu-latest:<span class="fw-bold fst-italic text-warning">swap=64</span></pre>
</div>
