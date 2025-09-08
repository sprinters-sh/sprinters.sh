---
layout: docs
title: "Temp Storage"
---

By default, every Sprinters-powered runner has a `gp3` EBS temp volume with `14` GiB of storage (just like GitHub-hosted runners), `3000` IOPS and `150` MiB/s throughput.

The type, the size and the performance of this temp storage are all fully configurable via the [runs-on: label](/docs/label#temp)
in your workflow yml.

The first choice you need to make is the type of temp storage:
- Need lots of temp space? Stick to the default EBS [gp3](#gp3) volumes.
- Need a smaller amount of storage with maximum I/O performance and no EBS costs? Go for [zram](#zram) and don't look back!

{% include h2.html id="gp3" text="gp3 (largest size)" %}

By default a `14` GiB `gp3` EBS volume with `3000` IOPS and `150` MiB/s throughput is attached to your instance as temp storage.

The volume is reformatted on every boot and destroyed after the job completes.

{% include h3.html id="gp3-size" text="Size" %}

Unlike GitHub-hosted runners, **Sprinters-powered runners are not restricted by a fixed amount of temp space**. If your job
needs more temp space, you do not need to resort to brittle hacks like deleting the preinstalled software using
actions like _jlumbroso/free-disk-space_.

Instead, you can freely pick the exact amount of temp space you need, between `1` and `16384` GiB by specifying it in the [label](/docs/label#temp):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/256</span></pre>
</div>

{% include h4.html id="gp3-size-optimization" text="Optimization" %}

EBS charges you by the allocated GiB. This makes it financially sound to right-size. Unfortunately,
guessing the necessary capacity isn't always easy. To guide you, Sprinters shows the actual
temp usage at the end of every job run in the _Complete runner_ section of the job output:
{: .mb-1 }
![Complete runner output](/assets/volumes/complete-runner.png){: .screenshot }

If your temp volume was say `100` GiB and utilization was 38%,
you can safely slash your EBS costs in half by adjusting its size to `50` GiB for future runs with enough room to spare:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/50</span></pre>
</div>

{% include h3.html id="gp3-performance" text="Performance" %}

By default `gp3` volumes are provisioned with `3000` IOPS and `150` MiB/s throughput.

For I/O-intensive jobs, Sprinters gives you full control over the performance (and EBS costs!) of your temp volume.
You can freely scale it from `3000` to `16000` IOPS and `150` to `1000` MiB/s throughput.

To do so, specify the desired IOPS (`4000` in this example) and throughput (`750` MiB/s in this example) in the [label](/docs/label#temp):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/4000/750</span></pre>
</div>

The exact EBS performance upper limits depend on the size and IOPS of the `gp3` volume. The IOPS:GiB ratio is limited at 500:1
and throughput:IOPS ratio at 0.250:1. As this can be annoying to calculate, Sprinters lets you specify the convenience value `max`
for both IOPS and throughput to automatically calculate the maximum supported performance for the given volume size and IOPS.

To use the maximum supported number of IOPS for this size, you can therefore specify:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/max/750</span></pre>
</div>

Or the maximum supported throughput for these IOPS:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/4000/max</span></pre>
</div>

Or both:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/max/max</span></pre>
</div>

{% include h2.html id="zram" new="true" text="zram (highest performance)" %}

When the need for temp storage is low or when I/O performance is most critical, you can forego EBS entirely and use a
zstd-compressed RAM disk instead:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=zram/16</span></pre>
</div>

Being in RAM, this disk is automatically wiped on boot and discarded on shutdown.

It gives you the highest possible I/O performance _and_ completely eliminates your EBS costs!

RAM is not pre-allocated and an empty zram disk does not use any memory.
Data you add to it is first compressed with zstd. If it is highly compressible, it will only use half or a third of its original size.

A runner with `16` GiB RAM dealing with compressible temp data can therefore easily accommodate a `16` GiB zram disk, and possibly even a larger one!
But remember that the RAM it occupies isn't available to other processes. So, keep a close eye on usage
and consider moving to a larger or [memory-optimzed instance](/docs/instances) if needed.
