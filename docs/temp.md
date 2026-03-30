---
layout: docs
title: "Temp Storage"
---

Every Sprinters-powered runner comes with temp storage. The size and type depends on the [instance's storage](/docs/instances#storage):


<div class="table-responsive">
    <table class="table table-sm">
        <thead>
        <tr>
            <th>Instance Storage</th>
            <th>Temp Storage</th>
            <th>Size</th>
            <th>Available Alternatives</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>EBS-only</td>
            <td>EBS <code>gp3</code> volume</td>
            <td><code>10</code> GiB</td>
            <td><code>zram</code></td>
        </tr>
        <tr>
            <td>Ephemeral NVMe</td>
            <td>First <code>ephemeral</code> NVMe volume</td>
            <td>Depends on instance type</td>
            <td><code>zram</code>, <code>gp3</code></td>
        </tr>
        </tbody>
    </table>
</div>

{% include h2.html id="type" text="Storage Type" %}

Sprinters offers 3 types of temp storage: `gp3` (EBS), `ephemeral` (local NVMe) and `zram` (zstd-compressed RAM disk).

<div class="table-responsive">
    <table class="table table-sm">
        <thead>
        <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Performance</th>
            <th>Max Size</th>
            <th>EBS Costs</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>gp3</code></td>
            <td>EBS volume</td>
            <td>+</td>
            <td>64 TiB</td>
            <td>Standard EBS fees</td>
        </tr>
        <tr>
            <td><code>ephemeral</code></td>
            <td>Internal NVMe storage</td>
            <td>++</td>
            <td>Depends on instance type</td>
            <td class="fst-italic">None</td>
        </tr>
        <tr>
            <td><code>zram</code></td>
            <td>RAM disk (compressed)</td>
            <td>+++</td>
            <td>Up to 3x RAM</td>
            <td class="fst-italic">None</td>
        </tr>
        </tbody>
    </table>
</div>

{% include h3.html id="gp3" text="gp3" %}

`gp3` volumes are compatible with all instance types, offer the largest sizes and have tunable performance.

{% include h4.html id="gp3-size" text="Size" %}

You can adjust the size of your `gp3` volume by specifying the desired number of GiB (from `1` to `65536`) in your job's [runs-on label](/docs/label#temp).

For example, a `64` GiB volume can be requested like this:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/64</span></pre>
</div>

{% include h4.html id="gp3-optimization" text="Cost Optimization" %}

EBS charges are based on the allocated size and provisioned performance. To help you right-size, Sprinters logs your actual temp disk utilization at the end of every job:

{: .mb-1 }
![Complete runner output](/assets/volumes/complete-runner.png){: .screenshot }

If your utilization is low, you can safely reduce the size in your label to save on costs.

{% include h4.html id="gp3-performance" text="Performance Tuning" %}

You can fine-tune your `gp3` performance and costs by specifying IOPS (between `3000` and `16000`) and throughput (between `125` and `1000` MiB/s).

For example, a `gp3` volume of `100` GiB with `4000` IOPS and 750 MiB/s throughput can be specified as follows:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/4000/750</span></pre>
</div>

Calculating the maximum supported IOPS and throughput is a little cumbersome as those limits depend on the volume size (for IOPS) and IOPS (for throughput).
To simplify this you can also use `max` to instruct Sprinters to automatically calculate those for you:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=gp3/100/max/max</span></pre>
</div>


{% include h3.html id="ephemeral" text="ephemeral" %}

Instances with `ephemeral` [NVMe storage](/docs/instances#storage) by default use their first local disk for high-performance, high-capacity temp space with zero EBS costs.

You can optionally specify this explicitly as follows:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:c6id.8xlarge:<span class="text-warning">temp=ephemeral</span></pre>
</div>

{% include h3.html id="zram" text="zram" %}

`zram` is a zstd-compressed RAM disk. It offers several million IOPS and eliminates all EBS costs.

As it is a RAM disk, all data you write to it uses some memory (albeit with an average 2x or 3x compression ratio).
This is a really solid choice for jobs on machines with sufficient memory requiring maximum performance.

To use a `zram` disk capable of storing up to `16` GiB of uncompressed data (actual ram usage with both 2x or 3x less), specify it in the label like this:
{: .mb-1 }
<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:ubuntu-latest:<span class="text-warning">temp=zram/16</span></pre>
</div>
