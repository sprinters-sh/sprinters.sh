---
layout: docs
title: "Security"
---

Security is Job Zero for Sprinters. Sprinters' approach can be summarized as a combination of the **principle of least privilege**, **data austerity** and **defense in depth**.

Let's dive deeper into the two main parts of the system: the Sprinters **platform** and the Sprinters **runner instances** on your AWS account.

![How Sprinters Works Diagram](/assets/overview.svg)

{% include h2.html id="platform" text="Platform" %}

The Sprinters platform runs on Sprinters' own infrastructure and handles events sent by GitHub and launches runner instances in your AWS account.

To be able to operate, Sprinters needs to [access to your GitHub account and your AWS account](/docs/setup).

{% include h3.html id="data" text="Data" %}

Sprinters strictly adheres to the principle of **data austerity** and only stores the absolute minimum amount of data necessary to operate.

This includes:
- the history of the jobs you ran with Sprinters in order to display them in the Sprinters Console
- the number of vCPU minutes you used for each job and how many are left in your account

All data stored by Sprinters is **encrypted at rest**. All data transferred by Sprinters is **encrypted in transit**.

Sprinters:
- **does not store any access credentials to your GitHub or AWS account**
- **does not store any credit card or other financial information**

{% include h3.html id="browser" text="Browser" %}

{% include h4.html id="browser-cookies" text="Javascript and cookies" %}

Sprinters **does not load any javascript from external sources** and **does not store any third party cookies**.

Sprinters only uses a single cookie to keep track of the user's session.

{% include h4.html id="browser-data" text="Data in motion" %}
Communication between Sprinters and your browser is fully encrypted with TLS 1.3 or 1.2.

{% include h3.html id="github" text="GitHub" %}
{% include h4.html id="github-permissions" text="Permissions" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:
<div class="table-responsive">
    <table class="table table-bordered">
        <thead>
        <tr class="table-active">
            <th>Permission</th>
            <th>Access</th>
            <th>Scope</th>
            <th>Usage</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>metadata</code></td>
            <td>read</td>
            <td>repository</td>
            <td>Mandatory permission for all GitHub Apps</td>
        </tr>
        <tr>
            <td rowspan="2"><code>actions</code></td>
            <td>read</td>
            <td>repository</td>
            <td>Get details about workflow jobs and workflow runs to check whether Sprinters should launch a runner</td>
        </tr>
        <tr>
            <td>write</td>
            <td>repository</td>
            <td>Cancel a workflow run in case there was an issue with a runner</td>
        </tr>
        <tr>
            <td><code>administration</code></td>
            <td>write</td>
            <td>repository</td>
            <td>Create a registration token for a new runner to ensure it can interact with GitHub Actions</td>
        </tr>
        <tr>
            <td><code class="text-nowrap">email addresses</code></td>
            <td>read</td>
            <td>user</td>
            <td>Notify you in case an issue with a runner needs your attention</td>
        </tr>
        </tbody>
    </table>
</div>

Sprinters has:
- **no access to the contents of your repositories**
- **no access to your secrets**
- **no access to your environment variables**

{% include h4.html id="github-data" text="Data in motion" %}
Communication between Sprinters and GitHub is fully encrypted with TLS 1.3.

{% include h3.html id="aws" text="AWS" %}

{% include h4.html id="aws-credentials" text="Cross-account IAM role" %}

The {% include external-link.html text="Sprinters CloudFormation stack" href="https://github.com/sprinters-sh/sprinters/blob/main/setup/aws/sprinters-setup.yml" %} creates
a {% include external-link.html text="cross-account IAM role" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_third-party.html" %}.
To prevent the {% include external-link.html text="confused deputy problem" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html" %},
this role's trust policy is secured with an external id matching your GitHub account name.

This role is used to obtain temporary short-lived credentials to access your AWS account using an inline IAM policy
with the permissions defined below.

{% include h4.html id="aws-permissions" text="Permissions" %}

Sprinters strictly adheres to the principle of **least-privilege** and only requests this absolute minimum set of permissions to be able to operate:
<div class="table-responsive">
    <table class="table table-bordered">
        <thead>
        <tr class="table-active">
            <th>Action</th>
            <th>Usage</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><code>ec2:RunInstances</code></td>
            <td>Launch ephemeral EC2 instances for your runners</td>
        </tr>
        <tr>
            <td><code>ec2:CreateTags</code></td>
            <td>Tag those EC2 instances as runners</td>
        </tr>
        <tr>
            <td><code>ec2:DescribeInstances</code></td>
            <td>List runner EC2 instances and check whether they are running</td>
        </tr>
        <tr>
            <td><code>ec2:ModifyVolume</code></td>
            <td>Optimize boot speed of runner EC2 instances</td>
        </tr>
        <tr>
            <td><code>ec2:TerminateInstances</code></td>
            <td>Clean up runner EC2 instances in case they fail to gracefully shut down</td>
        </tr>
        <tr>
            <td><code>ec2:DescribeSpotPriceHistory</code></td>
            <td>Automatically select cheapest availability zone for spot instances and calculate savings</td>
        </tr>
        <tr>
            <td><code>iam:PassRole</code></td>
            <td>Enable EC2 instances to use IAM instance profiles</td>
        </tr>
        </tbody>
    </table>
</div>

Sprinters has:
- **no login access to your EC2 instances**
- **no access to the contents of your EBS volumes**
- **no access to your EBS snapshots**

{% include h4.html id="aws-data" text="Data in motion" %}
Communication between Sprinters and AWS is fully encrypted with TLS 1.3.

{% include h2.html id="runner" text="Runner Instances" %}

Sprinters strictly adheres to the principle of **defense in depth** and secures your runner instances at every layer of the stack.

Runner instances run on your AWS account within the privacy of your VPC.
Services your jobs rely on no longer need to be exposed over the public internet.

To ensure a 100% clean environment for every job, each runner is launched using a new ephemeral EC2 instance and a security group that prohibits ingress.

![Runner Instance Diagram](/assets/runner.svg)

The image is
{% include external-link.html text="based on GitHub's official runner image" href="https://github.com/sprinters-sh/sprinters-images" %}.

{% include h4.html id="ingress" text="Network Ingress" %}
The runner doesn't listen on any ports.

{% include h4.html id="egress" text="Network Egress" %}
The runner only
- opens a long-lived outbound HTTPS connection to GitHub in order to receive job steps and send back execution logs.
- {% include external-link.html text="publishes lifecycle events" href="https://github.com/sprinters-sh/sprinters-images/blob/main/images/common/publish-event.sh" %} to
Sprinters to improve the handling of unexpected instance termination due spot capacity reclaim, underlying host issues, ...

Communication between the runner and both GitHub and Sprinters is fully encrypted with TLS 1.3.

The lifecycle event publishing can be disabled if desired by [adjusting the runs-on: label](/docs/label#events).

{% include h4.html id="volumes" text="Volumes" %}

The boot volume containing all installed software is read-only, guaranteeing integrity.

Writes are automatically redirected to an ephemeral encrypted temp volume which is reformatted on every boot and destroyed when the instance terminates.

Swap space is also allocated on another ephemeral encrypted volume which is also wiped on every boot and destroyed when the instance terminates.

**Sprinters has no access to the contents of these volumes.**
