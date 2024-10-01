---
layout: docs
title: "Introduction"
next: docs/getting-started.md
---

<img src="/assets/logo/sprinters.svg" width="128px" alt="Sprinters Logo">

**Sprinters** runs your GitHub Actions jobs faster on your own AWS account at a fraction of the cost.

{% include h2.html text="How does Sprinters work?" %}

**Sprinters** is a {% include external-link.html text="GitHub App" href="https://docs.github.com/en/apps/using-github-apps/about-using-github-apps" %} that
you add to your GitHub user or organization account.

Once installed, you must {% include external-link.html text="log in to Sprinters" href="https://console.sprinters.sh" %} with your
GitHub account and provide credentials to your AWS account so that Sprinters will be able to launch instances there on your behalf.

Finally, all that's left to do is edit a GitHub Actions workflow yaml file in a repository in your GitHub account and 
change a job definition's `runs-on:` attribute from

```yaml
runs: ubuntu-latest
```

to

```yaml
runs: sprinters:aws/ubuntu-latest
```

Sprinters is now ready to kick into action.

The entire flow looks like this:

<img src="/assets/introduction.svg" width="378" alt="How Sprinters Works Diagram">

The next time a run of that workflow job is triggered, it won't be run by GitHub anymore. Instead, **(1)** GitHub Actions notifies
Sprinters, which immediately **(2)** launches an instance in your AWS account. 
This instance is fully ephemeral and automatically starts up 
a fresh {% include external-link.html text="GitHub Self-Hosted Runner" href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners" %} which
then **(3)** registers itself with GitHub Actions.

GitHub Actions then **(4)** executes your job on your brand-new AWS instance. The job execution logs will appear in GitHub Actions
as usual, but each vCPU minute will only cost you a fraction of what GitHub would have charged you. Once the job
completes, the instance terminates, all its associated volumes are discarded, and you stop paying for it.

And that's it! You're now ready to get started!
