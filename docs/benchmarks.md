---
layout: docs
title: "Benchmarks"
---

Here are some benchmarks that compare the performance and cost of GitHub-hosted runners and Sprinters-powered AWS runners:

<div class="table-responsive fs-7">
<table class="table">
<tr>
    <th></th>
    <th>Provider</th>
    <th>vCPUs</th>
    <th>RAM (GiB)</th>
    <th>Temp (GiB)</th>
</tr>
<tr>
    <th>github-4vcpu</th>
    <td>GitHub</td>
    <td><code>4</code></td>
    <td><code>16</code></td>
    <td><code>14</code></td>
</tr>
<tr>
    <th class="text-warning-emphasis">sprinters-mxl</th>
    <td>AWS <code>m7i-flex.xlarge</code></td>
    <td><code>4</code></td>
    <td><code>16</code></td>
    <td><code>14</code></td>
</tr>
<tr>
    <th class="text-warning-emphasis">sprinters-c4xl</th>
    <td>AWS <code>c7i-flex.4xlarge</code></td>
    <td><code>16</code></td>
    <td><code>32</code></td>
    <td><code>14</code></td>
</tr>
</table>
</div>

EC2 instances launched in the `us-east-1` region.

EBS volumes are `gp3` with `3000` IOPS and `150` MiB/s throughput.

Spot savings are calculated based on the historical average for this instance type in this region.

{% include benchmark.html
    org="spring-projects" repo="spring-boot" org-user-id="317776"
    github-duration="304" github-cost="0.09600"
    sprinters-mxl-duration="269" sprinters-mxl-cost-ec2="0.01596" sprinters-mxl-cost-ebs="0.00027" sprinters-mxl-spot-discount-percentage="62"
    sprinters-c4xl-duration="144" sprinters-c4xl-cost-ec2="0.03392" sprinters-c4xl-cost-ebs="0.00016" sprinters-c4xl-spot-discount-percentage="65"
%}

{% include benchmark.html
    org="torvalds" repo="linux" org-user-id="1024025"
    github-duration="611" github-cost="0.17600"
    sprinters-mxl-duration="539" sprinters-mxl-cost-ec2="0.02873" sprinters-mxl-cost-ebs="0.00049" sprinters-mxl-spot-discount-percentage="62"
    sprinters-c4xl-duration="192" sprinters-c4xl-cost-ec2="0.04522" sprinters-c4xl-cost-ebs="0.00022" sprinters-c4xl-spot-discount-percentage="65"
%}
