---
layout: docs
title: "Getting Started"
next: docs/label.md
---

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
