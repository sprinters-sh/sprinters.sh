---
layout: docs
title: "Introduction"
next: docs/label.md
---

<img src="/assets/logo/sprinters.svg" width="128px" alt="Sprinters Logo">

**Sprinters** runs your GitHub Actions jobs faster on your own AWS account at a fraction of the cost.

All you need to do is change the `runs-on:` label in your
workflow yaml from `ubuntu-latest` to a Sprinters label (see examples). After that, whenever a run of your workflow is
triggered Sprinters will automatically launch a new ephemeral instance matching your requested specifications directly
within your VPC and instruct GitHub Actions to run your job on it. The job will integrate with GitHub Actions just like
any regular GitHub hosted job. Once it terminates, the AWS instance and all the data on its volumes are automatically
destroyed. You pay only for what you use and it only costs a fraction of what GitHub would have charged you for their
hosted runners.

{% include h2.html text="Prerequisites" %}

To get started you must first log in to the [Sprinters Console](https://console.sprinters.sh/login) with your GitHub
account. You will then get a choice of which personal account or GitHub organization you first want to install the
[sprinters.sh GitHub app](https://github.com/apps/sprinters-sh) onto (you can add others later).

After installing the app (and accepting the [terms of service](https://sprinters.sh/terms) and [privacy policy](https://sprinters.sh/privacy)),
all that is left to do is connecting your AWS account. You will need to create an IAM user with the following minimal
policy that will allow Sprinters to launch, enumerate and terminate EC2 instances on your behalf:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "sprinters",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:RunInstances",
                "ec2:TerminateInstances",
                "ec2:CreateTags"
            ],
            "Resource": ["*"]
        }
    ]
}
```

Once the IAM user has been created, all that is left to do is enter its *Access Key ID* and *Secret Access Key* in the
Sprinters Console to complete the initial setup.
