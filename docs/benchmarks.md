---
layout: docs
title: "Benchmarks"
---

Here are some benchmarks that compare the performance and cost of GitHub-hosted runners and Sprinters-powered AWS runners.

By default, the following configurations are used:

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

Also note:
- EC2 instances launched in the `us-east-1` region.
- EBS volumes are `gp3` with `3000` IOPS and `150` MiB/s throughput.
- Spot savings are calculated based on the historical average for this instance type in this region.
- If a configuration differs from the ones above, the different setting will be shown in the benchmark.

{% include benchmark.html
        org="django" repo="django" org-user-id="27804"
        github-duration="388" github-cost="0.11200"
        sprinters-mxl-duration="313" sprinters-mxl-cost-ec2="0.01915" sprinters-mxl-cost-ebs="0.00033" sprinters-mxl-spot-discount-percentage="62"
        sprinters-c4xl-duration="165" sprinters-c4xl-cost-ec2="0.03392" sprinters-c4xl-cost-ebs="0.00016" sprinters-c4xl-spot-discount-percentage="65"
%}

{% include benchmark.html
        org="gohugoio" repo="hugo" org-user-id="29385237"
        github-duration="2636" github-cost="0.70400"
        sprinters-mxl-config="temp=gp3/32" sprinters-mxl-duration="2210" sprinters-mxl-cost-ec2="0.11810" sprinters-mxl-cost-ebs="0.00324" sprinters-mxl-spot-discount-percentage="62"
        sprinters-c4xl-config="temp=gp3/32" sprinters-c4xl-duration="1541" sprinters-c4xl-cost-ec2="0.29394" sprinters-c4xl-cost-ebs="0.00228" sprinters-c4xl-spot-discount-percentage="65"
%}

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
