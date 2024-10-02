---
layout: docs
title: "GitHub App"
next: docs/setup/aws.md
---

The very first step is to install the {% include external-link.html text="Sprinters GitHub App"
href="https://github.com/apps/sprinters-sh/installations/select_target" %} on
your personal or organization account.

{% include h2.html text="Installation" %}

After you first {% include external-link.html text="log in to Sprinters" href="https://console.sprinters.sh" %}, you
will
be redirected to the installation prompt:

![Sprinters GitHub App installation](/assets/setup/github/install.png){: .screenshot}

After selecting the GitHub personal or organization account where you want to install it, confirm the installation by
clicking _Install_:

![Sprinters GitHub App permissions](/assets/setup/github/permissions.png){: .screenshot}

{% include h3.html id="permissions" text="Permissions" %}

As you will no doubt have noticed, Sprinters needs a few important {% include external-link.html text="permissions"
href="https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps" %} in order to work.
Sprinters strictly
adheres to the principle of _least-privilege_ and only requests the absolute minimum set of permissions required to
operate:

<div class="table-responsive">
<table class="table table-bordered">
<thead>
    <tr class="table-active">
        <th>Functionality</th>
        <th>Scope</th>
        <th>Permission</th>
        <th>Usage</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>Metadata</td>
        <td>repository</td>
        <td>read</td>
        <td>Mandatory permission for all GitHub Apps</td>
    </tr>
    <tr>
        <td rowspan="2">Actions</td>
        <td>repository</td>
        <td>read</td>
        <td>Get details about workflow jobs and workflow runs to check whether Sprinters should launch a runner</td>
    </tr>
    <tr>
        <td>repository</td>
        <td>write</td>
        <td>Cancel a workflow run in case there was an issue with a runner</td>
    </tr>
    <tr>
        <td>Administration</td>
        <td>repository</td>
        <td>write</td>
        <td>Create a registration token for a new runner to ensure it can interact with GitHub Actions</td>
    </tr>
    <tr>
        <td>Email Addresses</td>
        <td>user</td>
        <td>read</td>
        <td>Notify you in case an issue with a runner needs your attention</td>
    </tr>
</tbody>
</table>
</div>

{% include h2.html text="Success" %}

The installation now proceeds and after a few seconds GitHub redirects you back to Sprinters:

![Sprinters GitHub App installed](/assets/setup/github/welcome.png){: .screenshot}

Congratulations! The Sprinters GitHub App is now fully installed and activated.
