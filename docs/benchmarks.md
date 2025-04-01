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

{% include benchmark.html
    org="spring-projects" repo="spring-boot" org-user-id="317776" avatar="https://avatars.githubusercontent.com/u/317776?s=200&v=4"
    perf-github="310" perf-sprinters="289"
    price-github="0.09600"
    price-sprinters-ec2="0.01596" price-sprinters-ebs="0.00027" spot-discount-percentage="62"
%}
