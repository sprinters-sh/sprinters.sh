---
layout: docs
title: "Images"
---

Every runner instance is launched from an image. Sprinters provides a set of pre-built images for you to use.

These images are split across three dimensions: **OS**, **Arch** and **Variant**.

{% include h2.html text="OS" %}

You have the choice between **Ubuntu 24.04** and **Ubuntu 22.04**.

Both are LTS releases, but unless you have a specific need
to use Ubuntu 22.04, you should prefer Ubuntu 24.04 as the versions of the packages in its apt
repositories are newer and Canonical will support it farther into the future.

{% include h2.html text="Arch" %}

You have the choice between **x64** and **arm64**.

x64 has broader compatibility at this point, but if your workload permits it, switching to arm64 `-arm` images can enable you to use instances with a better price/performance ratio.

{% include h2.html text="Variants" %}

**On AWS, the smaller the image, the faster the instance boots and the lower the EBS costs are.**

All Sprinters images are fully optimized for this by using a _read-only zstd-compressed root volume_.

You can, however, trade installed software for performance by using one of the three variants Sprinters provides for each image: **Full**, **Slim** and **Minimal**.

{% include h3.html text="Full" %}

Full images are 100% identical to the equivalent images on GitHub-hosted runners.

{% include h3.html text="Slim" %}

Slim images are identical to full images, but without Android, CodeQL, Haskell and Julia.

If you aren't using these tools, you should use `-slim` images without hesitation.
They are otherwise identical to full images, boot slightly faster and have much lower EBS costs.

{% include h3.html text="Minimal" %}

Minimal images only contain Git, Git LFS, the GitHub CLI and Docker.

If you set up your own environment by downloading the tools you use directly, installing `apt` packages or
using setup actions like <code>actions/setup-<em>xyz</em></code>, you are ready to take things to their natural conclusion and go for our `-minimal` images.

They are less than 1 GiB in size, boot very fast and have very low EBS costs. We highly recommend you give them a try.

{% include h2.html text="Details" %}

In every [supported AWS region](/docs/label#placement), Sprinters offers the following images:

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
            <td><code>ubuntu-24.04</code><br><code>ubuntu-latest</code></td>
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

{% include h2.html text="Updates" %}

All images are updated as soon as GitHub updates its images for GitHub-hosted runners. This usually happens every week or two.

{% include h2.html text="Usage" %}

If not explicitly specified, a job will use the `ubuntu-latest` image, which is an alias for the `ubuntu-24.04` image (Ubuntu 24.04 x64 full variant).

To use a different image, simply [append its name to the label](/docs/label#image):

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters:aws:<span class="text-warning fw-bold">ubuntu-24.04-minimal</span></pre>
</div>

This job will now use the `ubuntu-24.04-minimal` image.
