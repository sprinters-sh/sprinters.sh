---
layout: docs
title: "Troubleshooting"
---

Learn how to solve the most common issues you may encounter during setup or on GitHub workflow summaries:

- [The run was canceled by @sprinters-sh[bot].](#canceled-bot)
- [The self-hosted runner: i-0123456789abcdef0 lost communication with the server.](#lost-communication)

{% include h2.html id="canceled-bot" text="The run was canceled by @sprinters-sh[bot]." %}

There was a problem launching an instance in your AWS account. GitHub unfortunately doesn't permit external tools to post
additional details in the workflow summary.

In the [Sprinters Console](https://console.sprinters.sh), the workflow run will show the exact cause of the error and how to fix it.

{% include h2.html id="lost-communication" text="The self-hosted runner: i-0123456789abcdef0 lost communication with the server." %}

When using spot instances, AWS will sometimes reclaim them when EC2 is short on capacity. This message indicates that
this runner instance was terminated because of this and that eventually GitHub Actions took notice it was no longer available.

In the [Sprinters Console](https://console.sprinters.sh), the workflow run will show the exact cause of the error and how to fix it.

Note that AWS **does not charge you** for {% include external-link.html text="spot instance interrupted in the first hour" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/billing-for-interrupted-spot-instances.html" %}.
