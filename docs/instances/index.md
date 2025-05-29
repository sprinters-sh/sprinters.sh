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
- 1:4 (`t` instances: burstable general-purpose)
- 1:4 (`m` instances: general-purpose)
- 1:8 (`r` instances: memory-optimized).

_General purpose_ instances are a great place to start as they provide a good balance for most workloads.

You can optimize costs by running jobs requiring more memory, but not more vCPUs on smaller size _memory-optimized_ instances.

And jobs requiring more vCPUs but not more memory, can be run at reduced cost on larger size _compute-optimized_ instances.

{% include h3.html text="Usage"  %}

If not explicitly specified, a job using an x64 image will run on a `t3.large` instance and a job using an arm64 image will run on a `t4g.large` instance.

To use a different instance type, simply [append it to the label](/docs/label#instance-type):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">r7a.16xlarge</span></pre>
</div>

This job will now use an `r7a.16xlarge` instance.
