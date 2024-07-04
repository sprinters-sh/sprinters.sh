---
layout: default
title: "Docs"
---

# Introduction
Sprinters runs your GitHub Actions jobs directly on your AWS account. All you need to do is change the `runs-on:` label in your
workflow yaml from `ubuntu-latest` to a Sprinters label (see examples). After that, whenever a run of your workflow is
triggered Sprinters will automatically launch a new ephemeral instance matching your requested specifications directly
within your VPC and instruct GitHub Actions to run your job on it. The job will integrate with GitHub Actions just like
any regular GitHub hosted job. Once it terminates, the AWS instance and all the data on its volumes are automatically
destroyed. You pay only for what you use and it only costs a fraction of what GitHub would have charged you for their
hosted runners.

## Prerequisites

To get started you must first log in to the [Sprinters Console](https://console.sprinters.sh/login) with your GitHub
account. You will then get a choice of which personal account or GitHub organization you first want to install the
[sprinters.sh GitHub app](https://github.com/apps/sprinters-sh) onto (you can add others later).

After installing the app (and accepting the [terms of service](https://sprinters.sh/terms) and [privacy policy](https://sprinters.sh/privacy)),
all that is left to do is connecting your AWS account. You will need to create an IAM user with the following minimal
policy that will allow Sprinters to launch, enumerate and terminate EC2 instances on your behalf:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "sprinters",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:RunInstances",
                "ec2:TerminateInstances",
                "ec2:CreateTags"
            ],
            "Resource": ["*"]
        }
    ]
}
```

Once the IAM user has been created, all that is left to do is enter its *Access Key ID* and *Secret Access Key* in the
Sprinters Console to complete the initial setup.

## Sprinters Label

The final step to activate Sprinters for a particular repository is to replace the existing `runs-on: ubuntu-latest` 
label in your workflow yaml file with a new Sprinters label:

```yaml
runs-on: sprinters:aws
```

This tells Sprinters to run your job in AWS's `us-east-1` region (in the default VPC) on a `t3.2xlarge` instance using
the `minimal` image with `14` GiB of temp disk space and `4` GiB of swap.

This specification can be customized by adding various parts to the label. All parts are separated by a `/`.

### AWS Region
You can set the AWS region where to launch the runner by appending it to the label.

**Format:** _aws-region_\
**Default:** `us-east-1`

#### Example
To set the region to `eu-central-1`, change the label to:

```yaml
runs-on: sprinters:aws/eu-central-1
```

#### Supported Regions
{: .mt-4 }
- `eu-central-1`
- `us-east-1`

More regions will be added soon. To request support for a specific region, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

### AWS Subnet ID
Within an AWS region, you can set the AWS region where to launch the runner by appending it to the label.

**Format:** _aws-subnet-id_\
**Default:** _random subnet of the default VPC of the selected region_

#### Example
To set the subnet to `subnet-0123456789abcdef0`, change the label to:

```yaml
runs-on: sprinters:aws/eu-central-1/subnet-0123456789abcdef0
```

### AWS Instance Type
You can set the AWS EC2 instance type on which launch the runner by appending it to the label.

**Format:** _aws-instance-type_\
**Default:** `t3.2xlarge`

#### Example
To set the instance type to `m7i.8xlarge`, change the label to:

```yaml
runs-on: sprinters:aws/m7i.8xlarge
```

#### Supported Instance Families
{: .mt-4 }
- `m7i`
- `t3`
- `t3a`
- `t4g`

More instance families will be added soon. To request support for a specific instance family, file an issue in the [issue tracker](https://github.com/sprinters-sh/sprinters/issues).

### Image
You can set the image for the runner by appending it to the label.

**Format:** image=_image-name_\
**Default:** `minimal` for the CPU architecture of the selected AWS instance type.

#### Example
To set the image to `ubuntu-22.04`, change the label to:

```yaml
runs-on: sprinters:aws/image=ubuntu-22.04
```

#### Supported Image Types

| Type | Arch | Description |
+-|-|-+
| `minimal` | `x64` and `arm64` | Minimal, fast-booting image containing only Git and Docker |
| `ubuntu-24.04` | `x64` | Ubuntu 24.04 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04` | `x64` | Ubuntu 22.04 image identical to the one available for GitHub hosted runners |
{: .table }

### Temp Disk Space
You can set the temp disk space available for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** temp=_size-in-gib_\
**Default:** `14`

#### Example
To set the temp disk space to `512` GiB, change the label to:

```yaml
runs-on: sprinters:aws/temp=512
```

### Swap
You can set the swap size for the runner from `1` GiB to `16384` GiB by appending it to the label.

**Format:** swap=_size-in-gib_\
**Default:** `4`

#### Example
To set the swap size to `64` GiB, change the label to:

```yaml
runs-on: sprinters:aws/swap=64
```
