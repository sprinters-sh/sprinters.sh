---
layout: docs
title: "Temp Storage"
---

By default, every Sprinters-powered runner comes with `10` GiB of temp storage (just like GitHub-hosted runners).

The type, the size and the performance of this temp storage are all fully configurable via the [runs-on: label](/docs/label#temp)
in your workflow yml.

There are 3 types of temp storage available: [gp3](#gp3), [zram](#zram) and [ephemeral](#ephemeral):

<div class="table-responsive">
    <table class="table table-sm">
        <thead>
        <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Availability</th>
            <th>Size</th>
            <th>Performance</th>
            <th>EBS costs</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>gp3</code></td>
            <td>gp3 EBS volume</td>
            <td>all instance types</td>
            <td><code>1</code> to <code>65536</code> GiB<br>(configurable, default: <code>10</code> GiB)</td>
            <td><code>3000</code> to <code>80000</code> IOPS<br>(configurable, default: <code>3000</code> IOPS)<br><br><code>150</code> to <code>2000</code> MiB/s throughput<br>(configurable, default: <code>150</code> MiB/s)</td>
            <td>size, IOPS above <code>3000</code> and throughput above <code>150</code> MiB/s</td>
        </tr>
        <tr>
            <td><code>zram</code></td>
            <td>zstd-compressed RAM disk</td>
            <td>all instance types</td>
            <td><code>1</code> GiB to 2x or 3x RAM size<br>(default: <code>10</code> GiB)</td>
            <td>several million IOPS</td>
            <td class="fst-italic">None</td>
        </tr>
        <tr>
            <td><code>ephemeral</code></td>
            <td>instance store NVMe volume</td>
            <td>instances with <a href="/docs/instances#ephemeral">ephemeral NVMe storage</a> only</td>
            <td><code>55</code> to <code>1770</code> GiB<br>(depending on instance type)</td>
            <td><code>16771</code> to <code>3,219,996</code> IOPS<br>(depending on instance type)</td>
            <td class="fst-italic">None</td>
        </tr>
        </tbody>
    </table>
</div>

By default, the storage type is auto-selected based on the following criteria, in this order:
- If RAM is at least 3x larger than the desired temp space, [zram](#zram) is used.
- If not and the [instance type](/docs/instances#ephemeral) has ephemeral NVMe storage, [ephemeral](#ephemeral) is used.
- Otherwise, [gp3](#gp3) is used.

You can set the size of the auto-selected temp storage via the [label](/docs/label#temp):
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:m7i.large:<span class="text-warning">temp=64</span></pre>
</div>

This will auto-select the optimal storage for the specified instance type using the formula above for `64` GiB of temp storage.
For the `m7i.large` instance in this example, this will result in a `64` GiB `gp3` EBS volume with `3000` IOPS and `150` MiB/s throughput.

The auto-selection can be overridden by explicitly specifying one of the available storage types below.

{% include h2.html id="zram" new="true" text="zram" %}

When all the temp storage fits in RAM, you can forego EBS entirely and use an ultra-fast zstd-compressed RAM disk instead:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=zram/16</span></pre>
</div>

This gives you the highest possible I/O performance _and_ completely eliminates your EBS costs!

RAM is **not pre-allocated** and an empty zram temp disk does not use any memory.
The size in the label merely serves as an upper bound for the size of the uncompressed data.
Data you add to the zram disk is first **zstd-compressed**, and will, depending on how compressible it is, only consume
about half or a third of its size in RAM. And when the runner terminates, the entire zram disk is automatically discarded.

A runner with `16` GiB RAM with compressible temp data can therefore easily accommodate a `16` GiB (or larger!) zram disk.
But remember that the RAM the zram disk occupies isn't available to other processes. So, keep a close eye on usage
and consider moving to a larger or [memory-optimzed instance](/docs/instances) if needed.

{% include h2.html id="gp3" text="gp3" %}

When using `gp3` EBS volumes, by default a `10` GiB `gp3` EBS volume with `3000` IOPS and `150` MiB/s throughput is attached to your instance as temp storage.

The volume is reformatted on every boot and destroyed after the job completes.

{% include h3.html id="gp3-size" text="Size" %}

Unlike GitHub-hosted runners, **Sprinters-powered runners are not restricted by a fixed amount of temp space**. If your job
needs more temp space, you do not need to resort to brittle hacks like deleting the preinstalled software using
actions like _jlumbroso/free-disk-space_.

Instead, you can freely pick the exact amount of temp space you need, between `1` and `65536` GiB by specifying it in the [label](/docs/label#temp):
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
You can freely scale it from `3000` to `80000` IOPS and `150` to `2000` MiB/s throughput.

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

{% include h2.html id="ephemeral" new="true" text="ephemeral" %}

Instances that have [ephemeral NVMe storage](/docs/instances#ephemeral) can make use of their much faster internal store volumes instead:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:c6id.8xlarge:<span class="text-warning">temp=ephemeral</span></pre>
</div>

The first `ephemeral` volume of the instance is then fully used for temp storage.

In this case, with a `c6id.large` instance,
this gives you `1900` GB of ephemeral storage with `536,666` IOPS _and_ zero EBS costs!
