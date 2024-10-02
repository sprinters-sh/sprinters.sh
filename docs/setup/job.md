---
layout: docs
title: "Workflow Job"
next: docs/label.md
---

With Sprinters fully set up, the final thing left to do is to tell GitHub to run your workflow jobs using Sprinters
on AWS instead of GitHub hosted runners.

This is done by locating the `runs-on` directive in your workflow yml from

```yml
runs-on: ubuntu-latest
```

to

```yml
runs-on: sprinters:aws/ubuntu-latest
```

{% include h2.html text="See it in action" %}

The easiest way to see this in action (and validate your Sprinters setup) is as follows.

Begin by {% include external-link.html text="forking the `sprinters-sh/sprinters-test` repository" href="https://github.com/sprinters-sh/sprinters-test/fork" %}

![Fork test repository](/assets/setup/job/fork.png){: .screenshot}

In your fork, enable workflows under the Actions tab:

![Fork test repository](/assets/setup/job/enable-workflows.png){: .screenshot}

And run the `sprinters-test` workflow:

![Run workflow](/assets/setup/job/run.png){: .screenshot}

GitHub Actions notifies Sprinters which in turn launches a fresh EC2 instance with a new runner in your AWS account.

After a few seconds the workflow will appear on GitHub and once it has completed you will see the success message:

![Run workflow](/assets/setup/job/github-succeeded.png){: .screenshot}

Equally on the Sprinters side, you will also see the job with all the details the EC2 instance that ran it:

![Run workflow](/assets/setup/job/sprinters-succeeded.png){: .screenshot}

Congratulations! You have just run your first GitHub Actions workflow job on your own AWS account.

{% include h2.html text="Next steps" %}

Now it's your turn. Migrate your workflow jobs over to Sprinters. Customize where they run, on what instance type they run and
how much temp storage they get by tweaking the [Sprinters Label](/docs/label).
