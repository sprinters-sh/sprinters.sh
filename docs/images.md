---
layout: docs
title: "Images"
---

Every runner instance is launched from an image. Sprinters provides a set of pre-built images for you to use.

These images are split across three dimensions:
- **OS**: Ubuntu 24.04 or Ubuntu 22.04
- **Arch**: x64 or arm64
- **Variant**: full, slim or minimal

{% include h3.html text="Ubuntu 24.04" %}
{% include h4.html text="x64" %}
<div class="table-responsive">
    <table class="table">
        <thead>
        <tr>
            <th>Image</th>
            <th>Variant</th>
            <th class="text-end">Size</th>
            <th class="text-end">Boot time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>ubuntu-24.04</code></td>
            <td>Full</td>
            <td class="text-end text-nowrap">12 GiB</td>
            <td class="text-end">25-55s</td>
        </tr>
        <tr>
            <td><code>ubuntu-24.04-slim</code></td>
            <td>Slim</td>
            <td class="text-end text-nowrap">7 GiB</td>
            <td class="text-end">20-40s</td>
        </tr>
        <tr>
            <td><code>ubuntu-24.04-minimal</code></td>
            <td>Minimal</td>
            <td class="text-end text-nowrap">1 GiB</td>
            <td class="text-end">10-18s</td>
        </tr>
        </tbody>
    </table>
</div>

{% include h4.html text="arm64" %}
<div class="table-responsive">
    <table class="table">
        <thead>
        <tr>
            <th>Image</th>
            <th>Variant</th>
            <th class="text-end">Size</th>
            <th class="text-end">Boot time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>ubuntu-24.04-arm</code></td>
            <td>Full</td>
            <td class="text-end text-nowrap">7 GiB</td>
            <td class="text-end">20-40s</td>
        </tr>
        <tr>
            <td><code>ubuntu-24.04-arm-slim</code></td>
            <td>Slim</td>
            <td class="text-end text-nowrap">5 GiB</td>
            <td class="text-end">18-35s</td>
        </tr>
        <tr>
            <td><code>ubuntu-24.04-arm-minimal</code></td>
            <td>Minimal</td>
            <td class="text-end text-nowrap">1 GiB</td>
            <td class="text-end">10-18s</td>
        </tr>
        </tbody>
    </table>
</div>

{% include h3.html text="Ubuntu 22.04" %}
{% include h4.html text="x64" %}
<div class="table-responsive">
    <table class="table">
        <thead>
        <tr>
            <th>Image</th>
            <th>Variant</th>
            <th class="text-end">Size</th>
            <th class="text-end">Boot time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>ubuntu-22.04</code></td>
            <td>Full</td>
            <td class="text-end text-nowrap">13 GiB</td>
            <td class="text-end">25-55s</td>
        </tr>
        <tr>
            <td><code>ubuntu-22.04-slim</code></td>
            <td>Slim</td>
            <td class="text-end text-nowrap">8 GiB</td>
            <td class="text-end">21-41s</td>
        </tr>
        <tr>
            <td><code>ubuntu-22.04-minimal</code></td>
            <td>Minimal</td>
            <td class="text-end text-nowrap">1 GiB</td>
            <td class="text-end">10-18s</td>
        </tr>
        </tbody>
    </table>
</div>

{% include h4.html text="arm64" %}
<div class="table-responsive">
    <table class="table">
        <thead>
        <tr>
            <th>Image</th>
            <th>Variant</th>
            <th class="text-end">Size</th>
            <th class="text-end">Boot time</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>ubuntu-22.04-arm</code></td>
            <td>Full</td>
            <td class="text-end text-nowrap">7 GiB</td>
            <td class="text-end">20-40s</td>
        </tr>
        <tr>
            <td><code>ubuntu-22.04-arm-slim</code></td>
            <td>Slim</td>
            <td class="text-end text-nowrap">6 GiB</td>
            <td class="text-end">19-38s</td>
        </tr>
        <tr>
            <td><code>ubuntu-22.04-arm-minimal</code></td>
            <td>Minimal</td>
            <td class="text-end text-nowrap">1 GiB</td>
            <td class="text-end">10-18s</td>
        </tr>
        </tbody>
    </table>
</div>

{% include h2.html text="Variants" %}

There are three variants of each image:
- **Full**: Full images are 100% identical to the equivalent images on GitHub-hosted runners.
- **Slim**: Slim images are identical to full images, but without Android, CodeQL, Haskell and Julia.
- **Minimal**: Minimal images only contain Git, Git LFS, the GitHub CLI and Docker.

{% include h3.html text="Choosing a variant" %}

**On AWS, the smaller the image, the faster the instance boots and the lower the EBS costs are.**

All Sprinters images are fully optimized for this by using a _read-only zstd-compressed root volume_.

You can, however, take things further by using `-slim` or `-minimal` variants.

{% include h4.html text="Slim images" %}

If you aren't using Android, CodeQL, Haskell or Julia, you should use `-slim` images without hesitation.
They are otherwise identical to full images, boot slightly faster and have much lower EBS costs.

{% include h4.html text="Minimal images" %}

If you set up your own environment by downloading the tools you use directly, installing `apt` packages or
using setup actions like `actions/setup-xyz`, you are ready to take things to their natural conclusion and go for our `-minimal` images.

They are less than 1 GiB in size, boot very fast and have very low EBS costs. We highly recommend you give them a try.
