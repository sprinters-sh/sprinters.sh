---
layout: docs
title: "Benchmarks"
---

Here are some benchmarks that compare the performance and cost of GitHub-hosted runners and Sprinters-powered AWS runners.

All benchmarks are run with identical specs:
- `4` vCPUs
- `16` Gib RAM
- `14` Gib temp

EC2 instances are `m7i-flex.xlarge` launched in the `us-east-1` region.

EBS volumes are `gp3` with `3000` IOPS and `150` MiB/s throughput.

Spot savings are calculated based on the historical average for this instance type in this region.

{% include h2.html id="spring-boot" text="Spring Boot" %}

{% include external-link.html text="Benchmark Workflow" href="https://github.com/sprinters-sh/sprinters/actions/workflows/benchmark-spring-boot.yml" %}{: .fs-8 }

{% include h3.html text="Performance" %}

{% include external-link.html text="Benchmark Results" href="https://github.com/sprinters-sh/sprinters/actions/workflows/benchmark-spring-boot.yml" %}{: .fs-8 }

![Spring Boot performance](/assets/benchmarks/spring-boot-results.png){: .screenshot }

{% include h3.html text="Cost" %}

<div class="px-3 pt-3 border border-1 border-secondary rounded">
<table class="table">
    <tr>
        <th></th>
        <th class="text-center">GitHub-hosted runner</th>
        <th class="text-center text-warning">Sprinters (EC2)</th>
        <th class="text-center text-warning">Sprinters (EC2 spot)</th>
    </tr>
    <tr>
        <th>{% include external-link.html text="GitHub" href="https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions" %}</th>
        <td class="text-center">$0.09600</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <th>{% include external-link.html text="EC2" href="https://aws.amazon.com/ec2/pricing/on-demand/" %}</th>
        <td></td>
        <td class="text-center">$0.01596</td>
        <td class="text-center">$0.00606</td>
    </tr>
    <tr>
        <th>{% include external-link.html text="EBS" href="https://aws.amazon.com/ebs/pricing/" %}</th>
        <td></td>
        <td class="text-center">$0.00027</td>
        <td class="text-center">$0.00027</td>
    </tr>
    <tr>
        <th class="border-bottom-0"></th>
        <td class="border-bottom-0 pt-3 text-center">
            <div class="d-inline-block bg-info" style="width: 50px;height: 96px"></div><br>
            <span class="fw-bold">$0.09600</span>
        </td>
        <td class="border-bottom-0 pt-3 text-center">
            <div class="d-inline-block bg-info" style="height: 96px"><div class="bg-body" style="width: 50px;height: 80px"></div></div><br>
            <span class="fw-bold">$0.01623</span><br>
            <span class="text-success fw-bold">Saved 85%</span><br>
            <span class="text-secondary">6x cheaper</span>
        </td>
        <td class="border-bottom-0 pt-3 text-center">
            <div class="d-inline-block bg-info" style="height: 96px"><div class="bg-body" style="width: 50px;height: 90px"></div></div><br>
            <span class="fw-bold">$0.00633</span><br>
            <span class="text-success fw-bold">Saved 93%</span><br>
            <span class="text-secondary">15x cheaper</span>
        </td>
    </tr>
</table>
</div>
