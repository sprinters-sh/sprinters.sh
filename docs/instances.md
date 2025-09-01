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
Sprinters supports over 300 different EC2 instance types, across all modern generations of these families,
using either **x64** (Intel and AMD) or **arm64** (AWS Graviton) processors.

These instances support between 1 and 384 vCPUs and 0.5 and 3072 GiB of RAM.

{% include h3.html text="x64 (Intel)" %}
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
| <nobr>m8i <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `m8i.large` , `m8i.xlarge` , `m8i.2xlarge` , `m8i.4xlarge` , `m8i.8xlarge` , `m8i.12xlarge` , `m8i.16xlarge` , `m8i.24xlarge` , `m8i.32xlarge` , `m8i.48xlarge` , `m8i.96xlarge` |
| <nobr>m8i-flex <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `m8i-flex.large` , `m8i-flex.xlarge` , `m8i-flex.2xlarge` , `m8i-flex.4xlarge` , `m8i-flex.8xlarge` , `m8i-flex.12xlarge` , `m8i-flex.16xlarge` |
| r5 | `r5.large` , `r5.xlarge` , `r5.2xlarge` , `r5.4xlarge` , `r5.8xlarge` , `r5.12xlarge` , `r5.16xlarge` , `r5.24xlarge` |
| r6i | `r6i.large` , `r6i.xlarge` , `r6i.2xlarge` , `r6i.4xlarge` , `r6i.8xlarge` , `r6i.12xlarge` , `r6i.16xlarge` , `r6i.24xlarge` , `r6i.32xlarge` |
| r7i | `r7i.large` , `r7i.xlarge` , `r7i.2xlarge` , `r7i.4xlarge` , `r7i.8xlarge` , `r7i.12xlarge` , `r7i.16xlarge` , `r7i.24xlarge` , `r7i.48xlarge` |
| <nobr>r8i <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `r8i.large` , `r8i.xlarge` , `r8i.2xlarge` , `r8i.4xlarge` , `r8i.8xlarge` , `r8i.12xlarge` , `r8i.16xlarge` , `r8i.24xlarge` , `r8i.32xlarge` , `r8i.48xlarge` , `r8i.96xlarge` |
| <nobr>r8i-flex <span class="badge badge-super rounded-pill text-bg-primary">New</span></nobr> | `r8i-flex.large` , `r8i-flex.xlarge` , `r8i-flex.2xlarge` , `r8i-flex.4xlarge` , `r8i-flex.8xlarge` , `r8i-flex.12xlarge` , `r8i-flex.16xlarge` |
| t3 | `t3.nano` , `t3.micro` , `t3.small` , `t3.medium` , `t3.large` , `t3.xlarge` , `t3.2xlarge` |
{: .table #instance-types }

{% include h3.html text="x64 (AMD)" %}
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

{% include h3.html text="arm64" %}

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


{% include h2.html text="Usage"  %}

By default a job using an x64 [image](/docs/images) will run on a `t3.large` instance and a job using an arm64 image will run on a `t4g.large` instance.

To use a different instance type, simply [append it to the label](/docs/label#instance-type):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">r7a.16xlarge</span></pre>
</div>

This job will now use an `r7a.16xlarge` instance.
