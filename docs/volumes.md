---
layout: docs
title: "Volumes"
---

Every runner instance has 3 volumes: **root**, **swap** and **temp**.

The **root** volume contains all the software of the runner image. It is compressed to reduce EBS costs and read-only to
guarantee consistency and make it tamper-proof.

The **swap** volume contains `4` GiB swap space and is recreated on every boot.

The **temp** volume contains the temp space (default: `14` GiB) for the runner which is reformatted on every boot.

You can see details about the size of these volumes in the _Set up runner_ section of the job output:

![Set up runner output](/assets/volumes/set-up-runner.png){: .screenshot }

{% include h2.html id="size-increase" text="Size Increase" %}

Unlike GitHub-hosted runners, **Sprinters-powered runners are not restricted by a fixed amount of temp space**. If your job
needs more temp space, you do not need to resort to brittle hacks like deleting the preinstalled software using
actions like _jlumbroso/free-disk-space_.

Instead, you can freely increase or decrease temp space by [appending your desired amount in GiB to the label](/docs/label#temp):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=<span class="fw-bold">4096</span></span></pre>
</div>

{% include h2.html id="size-optimization" text="Size Optimization" %}

It's often difficult to guess the exact size required for the temp volume. At the end of every job run,
the _Complete runner_ section of the output shows the usage of the temp volume:

![Complete runner output](/assets/volumes/complete-runner.png){: .screenshot }

If your temp volume was say `100` GiB and utilization was 38%,
you can safely slash your EBS cost in half by [adjusting its size](/docs/label#temp) to `50` GiB for future runs with enough room to spare:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=<span class="fw-bold">50</span></span></pre>
</div>

{% include h2.html id="performance" text="Performance Optimization" %}

By default all volumes are provisioned as `gp3` with `3000` IOPS and `150` MiB/s throughput.

For I/O-intensive jobs, you can trade cost for performance by cranking up these values and scale all the way up
to `16000` IOPS and `1000` MiB/s throughput. The exact performance upper limits depend on the size of the volume.
You can also use the convenience value `max` to automatically calculate the maximum number of IOPS or throughput MiB/s
for the specified volume size.

This can be [specified in the label](/docs/label#temp) for the root and temp volumes:
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">root=<span class="fw-bold">gp3/3000/750</span></span>:<span class="text-warning">temp=<span class="fw-bold">1024/gp3/max/350</span></span></pre>
</div>
