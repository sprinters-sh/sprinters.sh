---
layout: docs
title: "Instances"
---

Every Sprinters-powered job is launched as an EC2 instance in your own AWS account.

Each instance is of a specific **instance type**, which is the combination of an instance family and a size.
The instance family determines the CPU architecture and the ratio between vCPUs and GiBs of RAM.
The size then acts as a multiplier.

GitHub-hosted runners always come with a 1:4 vCPU:RAM ratio (ex.: 2 vCPUs and 8 GiBs of RAM).

With Sprinters-powered runners, you can freely choose any of the following vCPU:RAM ratios:
- 1:2 (`c` instances: compute-optimized)
- 1:4 (`t` instances: burstable general-purpose)
- 1:4 (`m` instances: general-purpose)
- 1:8 (`r` instances: memory-optimized).

_General purpose_ instances are a great place to start as they provide a good balance for most workloads.

Jobs requiring more memory for the same number of vCPUs are most cost-effective on _memory-optimized_ instances.

And equally, jobs requiring more vCPUs for the same amount of memory are best run on _compute-optimized_ instances.

{% include h2.html id="types" text="Types" %}
Sprinters supports 505 different EC2 instance types, across all modern generations of these families,
using either **x64** (Intel and AMD) or **arm64** (AWS Graviton) processors.

These instances support between 1 and 384 vCPUs and 0.5 and 3072 GiB of RAM.

{% include h3.html id="intel" text="x64 (Intel)" %}
| Family | Sizes |
+-|-|-+
| c5 | `c5.large` , `c5.xlarge` , `c5.2xlarge` , `c5.4xlarge` , `c5.9xlarge` , `c5.12xlarge` , `c5.18xlarge` , `c5.24xlarge` |
| c5d | `c5d.large` , `c5d.xlarge` , `c5d.2xlarge` , `c5d.4xlarge` , `c5d.9xlarge` , `c5d.12xlarge` , `c5d.18xlarge` , `c5d.24xlarge` |
| c6i | `c6i.large` , `c6i.xlarge` , `c6i.2xlarge` , `c6i.4xlarge` , `c6i.8xlarge` , `c6i.12xlarge` , `c6i.16xlarge` , `c6i.24xlarge` , `c6i.32xlarge` |
| c6id | `c6id.large` , `c6id.xlarge` , `c6id.2xlarge` , `c6id.4xlarge` , `c6id.8xlarge` , `c6id.12xlarge` , `c6id.16xlarge` , `c6id.24xlarge` , `c6id.32xlarge` |
| c7i | `c7i.large` , `c7i.xlarge` , `c7i.2xlarge` , `c7i.4xlarge` , `c7i.8xlarge` , `c7i.12xlarge` , `c7i.16xlarge` , `c7i.24xlarge` , `c7i.48xlarge` |
| c7i-flex | `c7i-flex.large` , `c7i-flex.xlarge` , `c7i-flex.2xlarge` , `c7i-flex.4xlarge` , `c7i-flex.8xlarge` , `c7i-flex.12xlarge` , `c7i-flex.16xlarge` |
| <nobr>c8i <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `c8i.large` , `c8i.xlarge` , `c8i.2xlarge` , `c8i.4xlarge` , `c8i.8xlarge` , `c8i.12xlarge` , `c8i.16xlarge` , `c8i.24xlarge` , `c8i.32xlarge` , `c8i.48xlarge` , `c8i.96xlarge` |
| <nobr>c8i-flex <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `c8i-flex.large` , `c8i-flex.xlarge` , `c8i-flex.2xlarge` , `c8i-flex.4xlarge` , `c8i-flex.8xlarge` , `c8i-flex.12xlarge` , `c8i-flex.16xlarge` |
| m5 | `m5.large` , `m5.xlarge` , `m5.2xlarge` , `m5.4xlarge` , `m5.8xlarge` , `m5.12xlarge` , `m5.16xlarge` , `m5.24xlarge` |
| m5d | `m5d.large` , `m5d.xlarge` , `m5d.2xlarge` , `m5d.4xlarge` , `m5d.8xlarge` , `m5d.12xlarge` , `m5d.16xlarge` , `m5d.24xlarge` |
| m6i | `m6i.large` , `m6i.xlarge` , `m6i.2xlarge` , `m6i.4xlarge` , `m6i.8xlarge` , `m6i.12xlarge` , `m6i.16xlarge` , `m6i.24xlarge` , `m6i.32xlarge` |
| m6id | `m6id.large` , `m6id.xlarge` , `m6id.2xlarge` , `m6id.4xlarge` , `m6id.8xlarge` , `m6id.12xlarge` , `m6id.16xlarge` , `m6id.24xlarge` , `m6id.32xlarge` |
| m7i | `m7i.large` , `m7i.xlarge` , `m7i.2xlarge` , `m7i.4xlarge` , `m7i.8xlarge` , `m7i.12xlarge` , `m7i.16xlarge` , `m7i.24xlarge` , `m7i.48xlarge` |
| m7i-flex | `m7i-flex.large` , `m7i-flex.xlarge` , `m7i-flex.2xlarge` , `m7i-flex.4xlarge` , `m7i-flex.8xlarge` , `m7i-flex.12xlarge` , `m7i-flex.16xlarge` |
| m8i | `m8i.large` , `m8i.xlarge` , `m8i.2xlarge` , `m8i.4xlarge` , `m8i.8xlarge` , `m8i.12xlarge` , `m8i.16xlarge` , `m8i.24xlarge` , `m8i.32xlarge` , `m8i.48xlarge` , `m8i.96xlarge` |
| m8i-flex | `m8i-flex.large` , `m8i-flex.xlarge` , `m8i-flex.2xlarge` , `m8i-flex.4xlarge` , `m8i-flex.8xlarge` , `m8i-flex.12xlarge` , `m8i-flex.16xlarge` |
| r5 | `r5.large` , `r5.xlarge` , `r5.2xlarge` , `r5.4xlarge` , `r5.8xlarge` , `r5.12xlarge` , `r5.16xlarge` , `r5.24xlarge` |
| r5d | `r5d.large` , `r5d.xlarge` , `r5d.2xlarge` , `r5d.4xlarge` , `r5d.8xlarge` , `r5d.12xlarge` , `r5d.16xlarge` , `r5d.24xlarge` |
| r6i | `r6i.large` , `r6i.xlarge` , `r6i.2xlarge` , `r6i.4xlarge` , `r6i.8xlarge` , `r6i.12xlarge` , `r6i.16xlarge` , `r6i.24xlarge` , `r6i.32xlarge` |
| r6id | `r6id.large` , `r6id.xlarge` , `r6id.2xlarge` , `r6id.4xlarge` , `r6id.8xlarge` , `r6id.12xlarge` , `r6id.16xlarge` , `r6id.24xlarge` , `r6id.32xlarge` |
| r7i | `r7i.large` , `r7i.xlarge` , `r7i.2xlarge` , `r7i.4xlarge` , `r7i.8xlarge` , `r7i.12xlarge` , `r7i.16xlarge` , `r7i.24xlarge` , `r7i.48xlarge` |
| r8i | `r8i.large` , `r8i.xlarge` , `r8i.2xlarge` , `r8i.4xlarge` , `r8i.8xlarge` , `r8i.12xlarge` , `r8i.16xlarge` , `r8i.24xlarge` , `r8i.32xlarge` , `r8i.48xlarge` , `r8i.96xlarge` |
| r8i-flex | `r8i-flex.large` , `r8i-flex.xlarge` , `r8i-flex.2xlarge` , `r8i-flex.4xlarge` , `r8i-flex.8xlarge` , `r8i-flex.12xlarge` , `r8i-flex.16xlarge` |
| t3 | `t3.nano` , `t3.micro` , `t3.small` , `t3.medium` , `t3.large` , `t3.xlarge` , `t3.2xlarge` |
{: .table #instance-types }

{% include h3.html id="amd" text="x64 (AMD)" %}
| Family | Sizes |
+-|-|-+
| c5a | `c5a.large` , `c5a.xlarge` , `c5a.2xlarge` , `c5a.4xlarge` , `c5a.8xlarge` , `c5a.12xlarge` , `c5a.16xlarge` , `c5a.24xlarge` |
| c5ad | `c5ad.large` , `c5ad.xlarge` , `c5ad.2xlarge` , `c5ad.4xlarge` , `c5ad.8xlarge` , `c5ad.12xlarge` , `c5ad.16xlarge` , `c5ad.24xlarge` |
| c6a | `c6a.large` , `c6a.xlarge` , `c6a.2xlarge` , `c6a.4xlarge` , `c6a.8xlarge` , `c6a.12xlarge` , `c6a.16xlarge` , `c6a.24xlarge` , `c6a.32xlarge` , `c6a.48xlarge` |
| c7a | `c7a.medium` , `c7a.large` , `c7a.xlarge` , `c7a.2xlarge` , `c7a.4xlarge` , `c7a.8xlarge` , `c7a.12xlarge` , `c7a.16xlarge` , `c7a.24xlarge` , `c7a.32xlarge` , `c7a.48xlarge` |
| m5a | `m5a.large` , `m5a.xlarge` , `m5a.2xlarge` , `m5a.4xlarge` , `m5a.8xlarge` , `m5a.12xlarge` , `m5a.16xlarge` , `m5a.24xlarge` |
| m5ad | `m5ad.large` , `m5ad.xlarge` , `m5ad.2xlarge` , `m5ad.4xlarge` , `m5ad.8xlarge` , `m5ad.12xlarge` , `m5ad.16xlarge` , `m5ad.24xlarge` |
| m6a | `m6a.large` , `m6a.xlarge` , `m6a.2xlarge` , `m6a.4xlarge` , `m6a.8xlarge` , `m6a.12xlarge` , `m6a.16xlarge` , `m6a.24xlarge` , `m6a.32xlarge` , `m6a.48xlarge` |
| m7a | `m7a.medium` , `m7a.large` , `m7a.xlarge` , `m7a.2xlarge` , `m7a.4xlarge` , `m7a.8xlarge` , `m7a.12xlarge` , `m7a.16xlarge` , `m7a.24xlarge` , `m7a.32xlarge` , `m7a.48xlarge` |
| <nobr>m8a <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `m8a.medium` , `m8a.large` , `m8a.xlarge` , `m8a.2xlarge` , `m8a.4xlarge` , `m8a.8xlarge` , `m8a.12xlarge` , `m8a.16xlarge` , `m8a.24xlarge` , `m8a.48xlarge` |
| r5a | `r5a.large` , `r5a.xlarge` , `r5a.2xlarge` , `r5a.4xlarge` , `r5a.8xlarge` , `r5a.12xlarge` , `r5a.16xlarge` , `r5a.24xlarge` |
| r5ad | `r5ad.large` , `r5ad.xlarge` , `r5ad.2xlarge` , `r5ad.4xlarge` , `r5ad.8xlarge` , `r5ad.12xlarge` , `r5ad.16xlarge` , `r5ad.24xlarge` |
| r6a | `r6a.large` , `r6a.xlarge` , `r6a.2xlarge` , `r6a.4xlarge` , `r6a.8xlarge` , `r6a.12xlarge` , `r6a.16xlarge` , `r6a.24xlarge` , `r6a.32xlarge` , `r6a.48xlarge` |
| r7a | `r7a.medium` , `r7a.large` , `r7a.xlarge` , `r7a.2xlarge` , `r7a.4xlarge` , `r7a.8xlarge` , `r7a.12xlarge` , `r7a.16xlarge` , `r7a.24xlarge` , `r7a.32xlarge` , `r7a.48xlarge` |
| <nobr>r8a <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `r8a.medium` , `r8a.large` , `r8a.xlarge` , `r8a.2xlarge` , `r8a.4xlarge` , `r8a.8xlarge` , `r8a.12xlarge` , `r8a.16xlarge` , `r8a.24xlarge` , `r8a.48xlarge` |
| t3a | `t3a.nano` , `t3a.micro` , `t3a.small` , `t3a.medium` , `t3a.large` , `t3a.xlarge` , `t3a.2xlarge` |
{: .table #instance-types }

{% include h3.html id="arm64" text="arm64" %}

| Family | Sizes |
+-|-|-+
| c6g | `c6g.medium` , `c6g.large` , `c6g.xlarge` , `c6g.2xlarge` , `c6g.4xlarge` , `c6g.8xlarge` , `c6g.12xlarge` , `c6g.16xlarge` |
| c6gd | `c6gd.medium` , `c6gd.large` , `c6gd.xlarge` , `c6gd.2xlarge` , `c6gd.4xlarge` , `c6gd.8xlarge` , `c6gd.12xlarge` , `c6gd.16xlarge` |
| c7g | `c7g.medium` , `c7g.large` , `c7g.xlarge` , `c7g.2xlarge` , `c7g.4xlarge` , `c7g.8xlarge` , `c7g.12xlarge` , `c7g.16xlarge` |
| c7gd | `c7gd.medium` , `c7gd.large` , `c7gd.xlarge` , `c7gd.2xlarge` , `c7gd.4xlarge` , `c7gd.8xlarge` , `c7gd.12xlarge` , `c7gd.16xlarge` |
| c8g | `c8g.medium` , `c8g.large` , `c8g.xlarge` , `c8g.2xlarge` , `c8g.4xlarge` , `c8g.8xlarge` , `c8g.12xlarge` , `c8g.16xlarge` , `c8g.24xlarge` , `c8g.48xlarge` |
| c8gd | `c8gd.medium` , `c8gd.large` , `c8gd.xlarge` , `c8gd.2xlarge` , `c8gd.4xlarge` , `c8gd.8xlarge` , `c8gd.12xlarge` , `c8gd.16xlarge` , `c8gd.24xlarge` , `c8gd.48xlarge` |
| m6g | `m6g.medium` , `m6g.large` , `m6g.xlarge` , `m6g.2xlarge` , `m6g.4xlarge` , `m6g.8xlarge` , `m6g.12xlarge` , `m6g.16xlarge` |
| m6gd | `m6gd.medium` , `m6gd.large` , `m6gd.xlarge` , `m6gd.2xlarge` , `m6gd.4xlarge` , `m6gd.8xlarge` , `m6gd.12xlarge` , `m6gd.16xlarge` |
| m7g | `m7g.medium` , `m7g.large` , `m7g.xlarge` , `m7g.2xlarge` , `m7g.4xlarge` , `m7g.8xlarge` , `m7g.12xlarge` , `m7g.16xlarge` |
| m7gd | `m7gd.medium` , `m7gd.large` , `m7gd.xlarge` , `m7gd.2xlarge` , `m7gd.4xlarge` , `m7gd.8xlarge` , `m7gd.12xlarge` , `m7gd.16xlarge` |
| m8g | `m8g.medium` , `m8g.large` , `m8g.xlarge` , `m8g.2xlarge` , `m8g.4xlarge` , `m8g.8xlarge` , `m8g.12xlarge` , `m8g.16xlarge` , `m8g.24xlarge` , `m8g.48xlarge` |
| m8gd | `m8gd.medium` , `m8gd.large` , `m8gd.xlarge` , `m8gd.2xlarge` , `m8gd.4xlarge` , `m8gd.8xlarge` , `m8gd.12xlarge` , `m8gd.16xlarge` , `m8gd.24xlarge` , `m8gd.48xlarge` |
| r6g | `r6g.medium` , `r6g.large` , `r6g.xlarge` , `r6g.2xlarge` , `r6g.4xlarge` , `r6g.8xlarge` , `r6g.12xlarge` , `r6g.16xlarge` |
| r6gd | `r6gd.medium` , `r6gd.large` , `r6gd.xlarge` , `r6gd.2xlarge` , `r6gd.4xlarge` , `r6gd.8xlarge` , `r6gd.12xlarge` , `r6gd.16xlarge` |
| r7g | `r7g.medium` , `r7g.large` , `r7g.xlarge` , `r7g.2xlarge` , `r7g.4xlarge` , `r7g.8xlarge` , `r7g.12xlarge` , `r7g.16xlarge` |
| r7gd | `r7gd.medium` , `r7gd.large` , `r7gd.xlarge` , `r7gd.2xlarge` , `r7gd.4xlarge` , `r7gd.8xlarge` , `r7gd.12xlarge` , `r7gd.16xlarge` |
| r8g | `r8g.medium` , `r8g.large` , `r8g.xlarge` , `r8g.2xlarge` , `r8g.4xlarge` , `r8g.8xlarge` , `r8g.12xlarge` , `r8g.16xlarge` , `r8g.24xlarge` , `r8g.48xlarge` |
| r8gd | `r8gd.medium` , `r8gd.large` , `r8gd.xlarge` , `r8gd.2xlarge` , `r8gd.4xlarge` , `r8gd.8xlarge` , `r8gd.12xlarge` , `r8gd.16xlarge` , `r8gd.24xlarge` , `r8gd.48xlarge` |
| t4g | `t4g.nano` , `t4g.micro` , `t4g.small` , `t4g.medium` , `t4g.large` , `t4g.xlarge` , `t4g.2xlarge` |
{: .table #instance-types }


{% include h2.html id="storage" text="Storage" %}

All instances can use EBS volumes, but some also comes with their own much faster internal ephemeral NVMe storage.

{% include h3.html id="ebs" text="EBS-only" %}

Instances from these families only have access to EBS volumes:
`c5`, `c5a`, `c6a`, `c6i`, `c6g`, `c7a`, `c7g`, `c7i`, `c7i-flex`, `c8g`, `c8i`, `c8i-flex`,
`m5`, `m5a`, `m6a`, `m6g`, `m6i`, `m7a`, `m7g`, `m7i`, `m7i-flex`, `m8a`, `m8g`, `m8i`, `m8i-flex`,
`r5`, `r5a`, `r6a`, `r6g`, `r6i`, `r7a`, `r7g`, `r7i`, `r8a`, `r8g`, `r8i`, `r8i-flex`,
`t3`, `t3a` and `t4g`.

{% include h3.html id="ephemeral" text="Ephemeral NVMe" %}

Instances from these families, also have access to much faster internal ephemeral NVMe storage:
`c5d`, `c5ad`, `c6gd`, `c6id`, `c7gd`, `c8gd`,
`m5d`, `m5ad`, `m6gd`, `m6id`, `m7gd`, `m8gd`,
`r5d`, `r5ad`, `r6gd`, `r6id`, `r7gd`, and `r8gd`.

{% include h2.html text="Usage" %}

By default a job using an x64 [image](/docs/images) will run on a `t3.large` instance and a job using an arm64 image will run on a `t4g.large` instance.

To use a different instance type, simply [append it to the label](/docs/label#instance-type):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">r7a.16xlarge</span></pre>
</div>

This job will now use an `r7a.16xlarge` instance.
