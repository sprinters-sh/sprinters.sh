---
layout: docs
title: "Introduction"
next: docs/setup.md
---

<img src="/assets/logo/sprinters.svg" width="128px" alt="Sprinters Logo">

**Sprinters** runs your GitHub Actions jobs faster on your own AWS account at a fraction of the cost.

{% include h2.html text="How does Sprinters work?" %}

**Sprinters** is a {% include external-link.html text="GitHub App" href="https://github.com/apps/sprinters-sh" %} that
you add to your GitHub user or organization account.

After you [establish trust](/docs/setup#aws) between Sprinters and your AWS account,
**Sprinters** will be able to launch GitHub Actions Runner instances there on your behalf.

You can tell it to do so by editing your GitHub Actions workflow yaml file in a repository in your
GitHub account and changing a job definition's `runs-on:` directive from

```yaml
runs: ubuntu-latest
```

to

```yaml
runs: sprinters:aws/123456789012:ubuntu-latest
```

(where `123456789012` is your AWS account ID)

**Sprinters** will then be ready to kick into action.

The entire flow looks like this:

<img src="/assets/overview.svg" alt="How Sprinters Works Diagram">

When a run of that GitHub Actions workflow job is triggered, it won't be run on expensive GitHub-hosted runners anymore.
Instead, GitHub Actions notifies **Sprinters**, which immediately launches an instance in your AWS account.
This instance is fully ephemeral and automatically starts up 
a fresh {% include external-link.html text="GitHub Self-Hosted Runner" href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners" %} which
registers itself with GitHub Actions.

GitHub Actions then executes your job on your brand-new AWS instance. The job execution logs will appear in GitHub Actions
as usual, but each vCPU minute will only cost you a fraction of what GitHub would have charged you. Once the job
completes, the instance terminates, all its associated volumes are discarded, and you stop paying for it.

And that's it!
