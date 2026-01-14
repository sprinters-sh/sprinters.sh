---
layout: docs
title: "runs-on: label"
---

GitHub uses the `runs-on:` label in your workflow yml to determine which runner to use for a job.

Migrating from GitHub-hosted runners to Sprinters-powered runners on AWS is easy.

All you need to do, is locate the <code>runs-on:</code> label in your workflow yml:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: ubuntu-latest</pre>
</div>

And adjust it to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning">sprinters:aws:</span>ubuntu-latest</pre>
</div>

Now, whenever this job is started, Sprinters will automatically launch a runner for it on your AWS account as
a `t3.large` (x64, 2 vCPUs, 8 GiB RAM) EC2 instance with `14` GiB of temp disk space and `4` GiB of swap
in the default VPC of the `us-east-1` region using the `ubuntu-latest` [image](/docs/image).

This default most closely matches GitHub-hosted runners, at a fraction of the price.

{% include h2.html id="customization" text="Customization" %}

You can adjust the [image](#image), the [AWS account](#account), the [AWS region/az/subnet](#placement),
the [EC2 instance type](#instance-type), whether to use [spot instances](#spot),
the [security group](#security-group),
the performance of the [root volume](#root), the type, size and performance of the [temp storage](#temp) and
whether to use [runner lifecycle events](#events)
by adding or changing various parts to the label. All parts are separated by a colon (`:`) and may appear in any order.

For example:
{: .mb-1 }

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: <span class="fw-bold fst-italic text-warning-emphasis">sprinters:aws:<span class="text-warning">eu-central-1:ubuntu-22.04:m7i.24xlarge:temp=gp3/64</span></span></pre>
</div>

This instructs Sprinters to launch a runner in the `eu-central-1` region using the `ubuntu-22.04` image on a `m7i.24xlarge` instance with a `gp3` temp volume with `64` GiB of storage.

{% include h2.html id="parts" text="Parts" %}

You can customize the label with the following parts:

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
| `ubuntu-22.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h5.html text="Ubuntu 22.04" %}
| Image | Description |
+-|-|-+
| `ubuntu-22.04-arm`{: .text-nowrap } | Identical to the one available for GitHub-hosted runners |
| `ubuntu-22.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting image containing only Git, Git LFS, the GitHub CLI and Docker |
{: .table }

{% include h4.html text="Example" %}
To set the image to `ubuntu-24.04-minimal`, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="fw-bold fst-italic text-warning">ubuntu-24.04-minimal</span></pre>
</div>

---

{% include h3.html id="placement" text="AWS Region / Availability Zone / Subnet" %}
You can specify where the runner instance is launched by appending a [region](/docs/aws-regions), _availability zone_ and _subnet id_ to the label.

At least one of _region_ and _availability zone_ must be specified. _subnet id_ is optional.
All parts are separated by a `/`.

{% include h4.html text="Format" %}
_aws-region_/_aws-availability-zone_/_aws-subnet-id_

{% include h4.html text="Default" %}
`us-east-1` (random subnet of a random availability zone of the default VPC of `us-east-1`)

{% include h4.html text="Supported Regions" %}
You can choose from a large range of [supported AWS regions](/docs/aws-regions) around the globe.

{% include h4.html text="Notes" %}

- If you specify both a _region_ and an _availability zone_, you must ensure the _availability zone_ resides in that _region_.
- If you don't specify a _region_, Sprinters will automatically select the matching _region_ for the _availability zone_.
- If you specify both a _region_ and a _subnet id_, you must ensure the _subnet_ resides in that _region_.
- If you specify both an _availability zone_ and a _subnet id_, you must ensure the _subnet_ resides in that _availability zone_.

{% include h4.html text="Examples" %}
To launch the runner using the `ubuntu-24.04-minimal` image in the `ca-central-1` region, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-24.04-minimal:<span class="fw-bold fst-italic text-warning">ca-central-1</span></pre>
</div>

To use the `eu-central-1c` availability zone, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">eu-central-1c</span></pre>
</div>

To use the `subnet-0123456789abcdef0` subnet in the `us-east-1` region, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="fw-bold fst-italic text-warning">us-east-1/subnet-0123456789abcdef0</span>:ubuntu-latest</pre>
</div>

---

{% include h3.html id="account" text="AWS Account" %}
When using [multiple AWS accounts](/docs/aws-accounts#multiple), you can specify the desired account ID in the label.

{% include h4.html text="Format" %}
_aws-account-id_

{% include h4.html text="Default" %}
The id of your [default AWS account](/docs/aws-accounts#default).

{% include h4.html text="Example" %}
To launch the runner in your `123456789012` AWS account, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws<span class="fw-bold fst-italic text-warning">/123456789012</span>:ubuntu-latest</pre>
</div>

---

{% include h3.html id="instance-type" text="EC2 Instance Type" %}
You can set the type of [instance](/docs/instances) on which launch the runner by appending it to the label.

{% include h4.html text="Format" %}
_aws-instance-type_

{% include h4.html text="Default" %}
`t3.large` for x64 images, `t4g.large` for arm64 images.

{% include h4.html text="Supported Instance Types" %}
Sprinters supports **515 different EC2 instance types**, across all modern generations of the `m`, `c`, `r` and `t` families,
using either **x64** (Intel and AMD) or **arm64** (AWS Graviton) processors, with or without ephemeral storage.

Pick the one that best suits your needs from the [complete list of supported instance types](/docs/instances#types).

{% include h4.html text="Example" %}
To set the instance type to `m7i.8xlarge`, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">m7i.8xlarge</span></pre>
</div>

---

{% include h3.html id="spot" text="Spot Instances" %}
To save significant amounts of money at a slight risk of being interrupted, the instance can be launched as a [spot instance](/docs/spot).

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

If neither a _subnet id_ nor an _availability zone_ was specified, Sprinters will automatically select the _availability zone_
with the cheapest spot price at the time of launch.

{% include h4.html text="Example" %}
To force the use of much cheaper spot instances, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">spot=true</span></pre>
</div>

---

{% include h3.html id="security-group" text="Security Group" %}
You can specify a custom security group for the runner instance.
This is particularly useful for [accessing resources in private subnets](/docs/aws-resources#private-subnets).

{% include h4.html text="Format" %}
_security-group-id_

{% include h4.html text="Default" %}
The VPC's default security group.

{% include h4.html text="Note" %}
While the runner doesn't require open ports, 
it is highly recommended to allow **unrestricted egress** for the runner to work as expected. 

{% include h4.html text="Example" %}
To use a custom security group `sg-01234567890abcdef`, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">sg-01234567890abcdef</span></pre>
</div>

---

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
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">root=gp3/4000/1000</span></pre>
</div>

To increase the root volume to the maximum number of IOPS for its size and the maximum throughput for these IOPS, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">root=gp3/max/max</span></pre>
</div>

---

{% include h3.html id="temp" text="Temp Storage" %}
You can adjust the type, size and performance of the [temp storage](/docs/temp) by modifying the label.

{% include h4.html text="Formats" %}
- temp=_size_
- temp=_type_
- temp=_type/size_
- temp=_type/size/iops/throughput_

{% include h4.html text="Types" %}

`auto`, `zram`, `ephemeral` or `gp3`

`auto` dynamically selects the storage type as follows:
- if the instance has 3x (or more) RAM than the storage size (default: `10` GiB), `zram` is used
- otherwise, if the instance has ephemeral storage, `ephemeral` is used
- otherwise, `gp3` with `3000` IOPS and `150` MiB/s throughput is used

More info on which one to choose in the [temp storage](/docs/temp) docs.

{% include h4.html text="Size" %}

| Type | Default Size (in GiB) | Min Size (in GiB) | Max Size (in GiB) |
+-|-|-|-+
| `auto` | See selected storage type | See selected storage type | See selected storage type |
| `zram` | `10` | `1` | 2x to 3x the size of the instance RAM (depending on how compressible the temp data is) |
| `ephemeral` | Instance's ephemeral storage size | Instance's ephemeral storage size | Instance's ephemeral storage size |
| `gp3` | `10` | `1` | `65536` |
{: .table }

{% include h4.html text="IOPS (gp3 only)" %}

Between `3000` and `80000` IOPS are supported, depending on the size of the volume.
Use `max` for the maximum number of IOPS for the current volume size.

{% include h4.html text="Throughput (gp3 only)" %}

Between `125` and `2000` MiB/s are supported, depending on the number of IOPS of the volume.
Use `max` for the maximum throughput for the current number of IOPS.

{% include h4.html text="Default" %}
`auto` (automatically select the best type of storage for the default `10` GiB of temp)

All these are equivalent:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest</pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=auto</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=10</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=auto/10</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=gp3/10/3000/150</span></pre>
</div>

For a `m6id.large` instance (with built-in ephemeral storage), these would be equivalent instead:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6id.large:<span class="fw-bold fst-italic text-warning">temp=auto</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6id.large:<span class="fw-bold fst-italic text-warning">temp=ephemeral</span></pre>
</div>

And for a `m6i.2xlarge` instance (with `32` GiB of RAM), these would be equivalent:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6i.2xlarge:<span class="fw-bold fst-italic text-warning">temp=auto</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6i.2xlarge:<span class="fw-bold fst-italic text-warning">temp=10</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6i.2xlarge:<span class="fw-bold fst-italic text-warning">temp=auto/10</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m6i.2xlarge:<span class="fw-bold fst-italic text-warning">temp=zram/10</span></pre>
</div>


{% include h4.html text="Examples" %}
To set the temp size to `64` GiB and auto-select the storage type, change the label to any of these:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-1 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=64</span></pre>
</div>
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=auto/64</span></pre>
</div>

To set the temp size to `64` GiB on a `gp3` volume and max out the throughput, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=gp3/64/3000/max</span></pre>
</div>

To move temp storage to an `8` GiB zstd-compressed RAM disk, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">temp=zram/8</span></pre>
</div>

To use the instance's first ephemeral instance store volume (must have at least one!) as temp storage, change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-24.04-arm:m8gd.medium:<span class="fw-bold fst-italic text-warning">temp=ephemeral</span></pre>
</div>

---

{% include h3.html id="events" text="Runner Lifecycle Events" %}
In order to react more quickly to instances becoming unhealthy, runners {% include external-link.html text="publish lifecycle events"
        href="https://github.com/sprinters-sh/sprinters-images/blob/main/images/common/publish-event.sh" %} to Sprinters.

{% include h4.html text="Format" %}
events=_`true|false`_

{% include h4.html text="Default" %}
`true`

{% include h4.html text="Example" %}
To disable the instance lifecycle events publishing (at the cost of longer timeouts when an instance becomes unhealthy or is terminated as part of a spot capacity reclaim), change the label to:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="fw-bold fst-italic text-warning">events=false</span></pre>
</div>
