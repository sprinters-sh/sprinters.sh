---
layout: docs
title: "Sprinters Label"
---
The final step to activate Sprinters for a particular repository is to replace the existing `runs-on: ubuntu-latest` 
label in your workflow yaml file with a new Sprinters label:

```yaml
runs-on: sprinters:aws/ubuntu-latest
```

This tells Sprinters to run your job in AWS's `us-east-1` region (in the default VPC) on a `t3.2xlarge` instance using
the `ubuntu-latest` image with `14` GiB of temp disk space and `4` GiB of swap.

This specification can be customized by adding various parts to the label. All parts are separated by a `/`.

{% include h2.html text="Image" %}
You can set the image for the runner by appending it to the label.

**Format:** _image-name_\
**Default:** `ubuntu-latest`

{% include h3.html text="Supported Image Types" %}
| Type | Arch | Description |
+-|-|-+
| `ubuntu-latest` <br> `ubuntu-24.04` | `x64` | Ubuntu 24.04 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04` | `x64` | Ubuntu 22.04 image identical to the one available for GitHub hosted runners |
| `minimal` | `x64` and `arm64` | Minimal, fast-booting image containing only Git and Docker |
{: .table }

{% include h3.html text="Example" %}
To set the image to `ubuntu-22.04`, change the label to:

```yaml
runs-on: sprinters:aws/ubuntu-22.04
```

{% include h2.html text="AWS Region" %}
You can set the AWS region where to launch the runner by appending it to the label.

**Format:** _aws-region_\
**Default:** `us-east-1`

{% include h3.html text="Supported Regions" %}
- `eu-central-1`
- `us-east-1`

More regions will be added soon. To request support for a specific region, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h3.html text="Example" %}
To set the region to `eu-central-1`, change the label to:

```yaml
runs-on: sprinters:aws/eu-central-1
```

{% include h2.html text="AWS Subnet ID" %}
Within an AWS region, you can set the AWS region where to launch the runner by appending it to the label.

**Format:** _aws-subnet-id_\
**Default:** _random subnet of the default VPC of the selected region_

{% include h3.html text="Example" %}
To set the subnet to `subnet-0123456789abcdef0`, change the label to:

```yaml
runs-on: sprinters:aws/eu-central-1/subnet-0123456789abcdef0
```

{% include h2.html text="AWS Instance Type" %}
You can set the AWS EC2 instance type on which launch the runner by appending it to the label.

**Format:** _aws-instance-type_\
**Default:** `t3.2xlarge`

{% include h3.html text="Supported Instance Families" %}
- `m7i`
- `t3`
- `t3a`
- `t4g`

More instance families will be added soon. To request support for a specific instance family, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h3.html text="Example" %}
To set the instance type to `m7i.8xlarge`, change the label to:

```yaml
runs-on: sprinters:aws/m7i.8xlarge
```

{% include h2.html text="Temp Disk Space" %}
You can set the temp disk space available for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** temp=_size-in-gib_\
**Default:** `14`

{% include h3.html text="Example" %}
To set the temp disk space to `512` GiB, change the label to:

```yaml
runs-on: sprinters:aws/temp=512
```

{% include h2.html text="Swap" %}
You can set the swap size for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** swap=_size-in-gib_\
**Default:** `4`

{% include h3.html text="Example" %}
To set the swap size to `64` GiB, change the label to:

```yaml
runs-on: sprinters:aws/swap=64
```
