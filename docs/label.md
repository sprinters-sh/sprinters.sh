---
layout: docs
title: "runs-on: label"
---
The label you assign to your `runs-on:` directive in your GitHub Actions workflow yml lets you directly control where
your jobs run, on what instance type they run, what image they use and how much temp storage they get.

For Sprinters at the bare minimum it looks like this:

```yaml
runs-on: sprinters:aws/ubuntu-latest
```

The label in the example above tells Sprinters to run your job on AWS using the `ubuntu-latest` image. This image is
identical to the one provided by GitHub.

A number of defaults will also be applied automatically to most closely matches the capacity of GitHub hosted runners:

- The instance will be a `t3.2xlarge` (x64 with 2 vCPUs).
- It will have `14` GiB of temp disk space and `4` GiB of swap.

The instance placement will be as follows:
- It will be launched in the `us-east-1` region in your account's default VPC.
- Sprinters will automatically pick the availability zone that currently has the lowest spot price.
- Sprinters will attempt to launch the instance as spot and automatically fall back to on-demand if AWS has insufficient spot capacity available.

{% include h2.html id="customization" text="Customization" %}

This specification can be customized by adding various parts to the label. The order doesn't matter. All parts are separated by a `/`.

Here is a more complex example:

```yaml
runs-on: sprinters:aws/ubuntu-22.04/eu-central-1/m7i.24xlarge/temp=64
```

This will launch a runner using the `ubuntu-22.04` image in the `eu-central-1` region on a `m7i.24xlarge` instance with `64` GiB of temp space.

The following label parts can be added or modified to customize the placement and capacity of the instance:

- [Image](#image)
- [AWS Region](#region)
- [AWS Availability Zone](#availability-zone)
- [AWS VPC / Subnet ID](#subnet)
- [AWS Instance Type](#instance-type)
- [AWS Spot Instances](#spot)
- [Temp Disk Space](#temp)
- [Swap Disk Space](#swap)

---
{: .mt-5 }

{% include h3.html id="image" text="Image" %}
You can set the image for the runner by replacing the one in the label.

**Format:** _image-name_\
**Default:** `ubuntu-latest`

{% include h4.html text="Supported Image Types" %}
| Type | Arch | Description |
+-|-|-+
| `ubuntu-latest`{: .text-nowrap } <br> `ubuntu-24.04`{: .text-nowrap } | x64 | Ubuntu 24.04 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04`{: .text-nowrap } | x64 | Ubuntu 22.04 image identical to the one available for GitHub hosted runners |
| `minimal` | x64 and arm64 | Minimal, fast-booting image containing only Git and Docker |
{: .table }

{% include h4.html text="Example" %}
To set the image to `minimal`, change the label to:

```yaml
runs-on: sprinters:aws/minimal
```

---
{: .mt-5 }

{% include h3.html id="region" text="AWS Region" %}
You can set the AWS region where to launch the runner by appending it to the label.

**Format:** _aws-region_\
**Default:** `us-east-1`

{% include h4.html text="Supported Regions" %}
- `eu-central-1`
- `us-east-1`

More regions will be added soon. To request support for a specific region, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Notes" %}

- If you specify both a _region_ and an _availability zone_, you must ensure the _availability zone_ resides in that _region_.
- If you specify both a _region_ and a _subnet id_, you must ensure the _subnet_ resides in that _region_.

{% include h4.html text="Example" %}
To set the region to `eu-central-1` and run using the `minimal` image, change the label to:

```yaml
runs-on: sprinters:aws/minimal/eu-central-1
```

---
{: .mt-5 }

{% include h3.html id="availability-zone" text="AWS Availability Zone" %}
Within an AWS region, you can pick the availability of your choice where to launch the runner by appending the availability zone to the label.

**Format:** _aws-availability-zone_\
**Default:** _availability zone of the selected region that currently has the lowest spot price for the selected instance type_

{% include h4.html text="Notes" %}

- If you don't specify a _region_, Sprinters will automatically select the matching _region_ for the _availability zone_.
- If you specify both an _availability zone_ and a _region_, you must ensure the _availability zone_ resides in that _region_.
- If you specify both an _availability zone_ and a _subnet id_, you must ensure the _subnet_ resides in that _availability zone_.

{% include h4.html text="Example" %}
To use the `eu-central-1c` availability zone, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/eu-central-1c
```

---
{: .mt-5 }

{% include h3.html id="subnet" text="AWS VPC / Subnet ID" %}
Within an AWS region, you can pick the subnet in the VPC of your choice where to launch the runner by appending the subnet ID to the label.

**Format:** _aws-subnet-id_\
**Default:** _default subnet of the default VPC in the selected availability zone of the selected region_

{% include h4.html text="Notes" %}

- If you specify both a _subnet id_ and a _region_, you must ensure the _subnet_ resides in that _region_.
- If you specify both a _subnet id_ and an _availability zone_, you must ensure the _subnet_ resides in that _availability zone_.

{% include h4.html text="Example" %}
To use the `subnet-0123456789abcdef0` subnet, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/subnet-0123456789abcdef0
```

---
{: .mt-5 }

{% include h3.html id="instance-type" text="AWS Instance Type" %}
You can set the AWS EC2 instance type on which launch the runner by appending it to the label.

**Format:** _aws-instance-type_\
**Default:** `t3.2xlarge`

{% include h4.html text="Supported Instance Types" %}

| Family | Arch | Sizes |
+-|-|-+
| m7i | x64 | `m7i.large` , `m7i.xlarge` , `m7i.2xlarge` , `m7i.4xlarge` , `m7i.8xlarge` , `m7i.12xlarge` , `m7i.16xlarge` , `m7i.24xlarge` , `m7i.48xlarge` |
| t3 | x64 | `t3.nano` , `t3.micro` , `t3.small` , `t3.medium` , `t3.large` , `t3.xlarge` , `t3.2xlarge` |
| t3a | x64 | `t3a.nano` , `t3a.micro` , `t3a.small` , `t3a.medium` , `t3a.large` , `t3a.xlarge` , `t3a.2xlarge` |
| t4g | arm64 | `t4g.nano` , `t4g.micro` , `t4g.small` , `t4g.medium` , `t4g.large` , `t4g.xlarge` , `t4g.2xlarge` |
{: .table }

More instance families will be added soon. To request support for a specific instance family, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h4.html text="Example" %}
To set the instance type to `m7i.8xlarge`, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/m7i.8xlarge
```

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
To use a much cheaper spot instance, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/spot=true
```

---
{: .mt-5 }

{% include h3.html id="temp" text="Temp Disk Space" %}
You can set the temp disk space available for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** temp=_size-in-gib_\
**Default:** `14`

{% include h4.html text="Example" %}
To set the temp disk space to `512` GiB, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/temp=512
```

---
{: .mt-5 }

{% include h3.html id="swap" text="Swap Disk Space" %}
You can set the swap size for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** swap=_size-in-gib_\
**Default:** `4`

{% include h4.html text="Example" %}
To set the swap size to `64` GiB, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-latest/swap=64
```
