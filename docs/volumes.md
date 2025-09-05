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
