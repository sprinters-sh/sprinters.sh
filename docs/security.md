---
layout: docs
title: "Security"
---

Security is Job Zero. Sprinters' approach can be summarized as a combination of the **principle of least privilege**, **data austerity** and **defense in depth**.

Let's dive deeper into the two main parts of the system: the Sprinters **platform** and the Sprinters **runner instances** on your AWS account.

<img src="/assets/overview.svg" alt="How Sprinters Works Diagram">

{% include h2.html id="platform" text="Platform" %}

The Sprinters platform runs on Sprinters' own infrastructure and handles events sent by GitHub and launches runner instances in your AWS account.

To be able to operate, Sprinters needs to access to your GitHub account and your AWS account.

Sprinters also needs to store
- the credentials to your AWS account in order to be able to launch runner instances
- the history of the jobs you ran with Sprinters in order to display them in the Sprinters Console

{% include h3.html id="github" text="GitHub" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:

{% include github-permissions.html %}

Sprinters has:
- **no access to the contents of your repositories**
- **no access to your secrets**
- **no access to your environment variables**

Communications between Sprinters and GitHub are fully encrypted with TLS 1.3.

{% include h3.html id="aws" text="AWS" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:

{% include aws-permissions.html %}

Sprinters has:
- **no login access to your EC2 instances**
- **no access to the contents of your EBS volumes**
- **no access to your EBS snapshots**

Communications between Sprinters and AWS are fully encrypted with TLS 1.3.

{% include h3.html id="data" text="Data" %}

All data stored by Sprinters is encrypted at rest.
On top of that AWS login credentials stored by Sprinters are fully encrypted with AES-256 GCM.
Each GitHub organization or personal account has a distinct encryption key. All keys are themselves also encrypted.

Communications between Sprinters and your browser are fully encrypted with TLS 1.3 or 1.2.

{% include h2.html id="runner" text="Runner Instances" %}

Runner instances run within your AWS account. They have a hardened kernel and are based on GitHub's official runner images.

The instances have no open ports. Additionally, the security group associated with them also specifically blocks all ports.

The volume where the software is installed is read-only.
All runner write activity (including, if configured in your workflow yml, the checkout of your repository contents)
is redirected to an ephemeral encrypted volume which is wiped on every boot and destroyed when the instance terminates.

Swap space is also allocated on another ephemeral encrypted volume which is also wiped on every boot and destroyed when the instance terminates.

**The runner software doesn't communicate with Sprinters.** It only opens an outbound HTTPS connection to GitHub in order to receive job steps and send execution logs.
