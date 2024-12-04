---
layout: docs
title: "Security"
next: docs/troubleshooting.md
---

Security is Job Zero for Sprinters. Sprinters' approach can be summarized as a combination of the **principle of least privilege**, **data austerity** and **defense in depth**.

Let's dive deeper into the two main parts of the system: the Sprinters **platform** and the Sprinters **runner instances** on your AWS account.

![How Sprinters Works Diagram](/assets/overview.svg)

{% include h2.html id="platform" text="Platform" %}

The Sprinters platform runs on Sprinters' own infrastructure and handles events sent by GitHub and launches runner instances in your AWS account.

To be able to operate, Sprinters needs to access to your GitHub account and your AWS account.

Sprinters also needs to store
- the credentials to your AWS account in order to be able to launch runner instances
- the history of the jobs you ran with Sprinters in order to display them in the Sprinters Console

{% include h3.html id="data" text="Data" %}

All data stored by Sprinters is **encrypted at rest**. All data transferred by Sprinters is **encrypted while in motion**.

Communication between Sprinters and your browser is fully encrypted with TLS 1.3 or 1.2.

{% include h3.html id="github" text="GitHub" %}
{% include h4.html id="github-permissions" text="Permissions" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:

{% include github-permissions.html %}

Sprinters has:
- **no access to the contents of your repositories**
- **no access to your secrets**
- **no access to your environment variables**

{% include h4.html id="github-data" text="Data in motion" %}
Communication between Sprinters and GitHub is fully encrypted with TLS 1.3.

{% include h3.html id="aws" text="AWS" %}
{% include h4.html id="aws-permissions" text="Permissions" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:

{% include aws-permissions.html %}

Sprinters has:
- **no login access to your EC2 instances**
- **no access to the contents of your EBS volumes**
- **no access to your EBS snapshots**

{% include h4.html id="aws-credentials" text="Credentials" %}

To be able to operate, Sprinters needs to access to your AWS account.

{% include h5.html text="Secure cross-account IAM roles" %}

By default, Sprinters will use
{% include external-link.html text="secure cross-account IAM roles" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html" %} to
obtain temporary short-lived credentials to access your AWS account.

This is made possible through a trust policy that grants permission to Sprinters' AWS account to assume an
IAM role in your AWS accounts with the [permissions defined above](#aws-permissions). To prevent the
{% include external-link.html text="confused deputy problem" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html" %},
this trust policy is secured with an external id.

{% include h5.html text="Access keys" %}
Alternatively, Sprinters also gives you the possibility to store an access key to access your AWS account.
This access key is fully encrypted with AES-256 GCM. Each account has a distinct encryption key. All keys are themselves also encrypted.

{% include h4.html id="aws-data" text="Data in motion" %}
Communication between Sprinters and AWS is fully encrypted with TLS 1.3.

{% include h2.html id="runner" text="Runner Instances" %}

Runner instances run on your AWS account within the privacy of your VPC.
Services your jobs rely on no longer need to be exposed over the public internet.

To ensure a 100% clean environment for every job, each runner is launched using a new ephemeral EC2 instance and a security group that prohibits ingress.

The image is
{% include external-link.html text="based on GitHub's official runner image" href="https://github.com/sprinters-sh/sprinters-images" %}.

The instance doesn't listen on any ports. **The runner software doesn't communicate with Sprinters.**
It only opens an outbound HTTPS connection to GitHub in order to receive job steps and send back execution logs.

![Runner Instance Diagram](/assets/runner.svg)

The boot volume, where the software is installed, is read-only, guaranteeing integrity.

Writes are automatically redirected to an ephemeral encrypted temp volume which is reformatted on every boot and destroyed when the instance terminates.

Swap space is also allocated on another ephemeral encrypted volume which is also wiped on every boot and destroyed when the instance terminates.

**Sprinters has no access to the contents of these volumes.**
