---
layout: docs
title: "GitHub App"
next: docs/setup/aws.md
---

The very first step is to install the {% include external-link.html text="Sprinters GitHub App"
href="https://github.com/apps/sprinters-sh" %} on your personal or organization account.

{% include h2.html text="Installation" %}

After you first {% include external-link.html text="log in to Sprinters" href="https://console.sprinters.sh" %}, you
will
be redirected to the installation prompt:

![Sprinters GitHub App installation](/assets/setup/github/install.png){: .screenshot}

After selecting the GitHub personal or organization account where you want to install it, confirm the installation by
clicking _Install_:

![Sprinters GitHub App permissions](/assets/setup/github/permissions.png){: .screenshot}

{% include h3.html id="permissions" text="Permissions" %}

Sprinters strictly adheres to the principle of _least-privilege_ and only requests this absolute minimum set of permissions to be able to operate:

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

Sprinters has **no access to the contents of your repositories**, **no access to your secrets** and **no access to your environment variables**.

{% include h2.html text="Success" %}

The installation now proceeds and after a few seconds GitHub redirects you back to Sprinters:

![Sprinters GitHub App installed](/assets/setup/github/welcome.png){: .screenshot}

Congratulations! The Sprinters GitHub App is now fully installed and activated.

Now you can connect it with your AWS account.
