---
layout: docs
title: "AWS Account"
next: docs/setup/job.md
---

The next step is to connect your AWS account to Sprinters.

For this you'll need the credentials of an AWS user that has enough permissions for Sprinters to launch, list and terminate EC2 instances.

You can achieve this by
1. Creating an IAM policy with the required permissions
2. Creating an IAM user with that policy attached
3. Creating credentials for that IAM user
4. Connecting your AWS account to Sprinters using those credentials

{% include h2.html text="Permissions" %}

Sprinters strictly adheres to the principle of _least-privilege_ and only requests this absolute minimum set of
permissions to be able to operate:

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
        <td>Determine the price paid when using spot instances to calculate savings</td>
    </tr>
</tbody>
</table>
</div>

Sprinters has **no login access to your EC2 instances**, **no access to the contents of your EBS volumes** and **no access to your EBS snapshots**.

{% include h2.html text="Create the IAM policy" %}

This IAM policy sets the permissions your IAM user will have.

{% include external-link.html text="Create the required policy in the AWS Console" class="btn btn-sm btn-primary"
href="https://us-east-1.console.aws.amazon.com/iam/home#/policies/create" %}

To do so, paste this policy document:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "sprinters",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances",
                "ec2:CreateTags",
                "ec2:DescribeInstances",
                "ec2:ModifyVolume",
                "ec2:TerminateInstances",
                "ec2:DescribeSpotPriceHistory"
            ],
            "Resource": ["*"]
        }
    ]
}
```

in the JSON policy editor:

![AWS Console JSON policy editor](/assets/setup/aws/policy-json.png){: .screenshot}

Assign it the `sprinters-policy` name and create it:

![AWS Console policy name](/assets/setup/aws/policy-name.png){: .screenshot}

Your IAM policy is now fully set up.

{% include h2.html text="Create the IAM user" %}

Now you'll need an IAM user which will have that policy attached.

{% include external-link.html text="Create the required user in the AWS Console" class="btn btn-sm btn-primary" href="https://us-east-1.console.aws.amazon.com/iam/home#/users/create" %}

Give your user the `sprinters-user` name:

![AWS Console user name](/assets/setup/aws/user-name.png){: .screenshot}

Then attach your newly created `sprinters-policy`:

![AWS Console user policy](/assets/setup/aws/user-policy.png){: .screenshot}

And finalize the user's creation:

![AWS Console user creation](/assets/setup/aws/user-create.png){: .screenshot}

Your IAM user is now fully set up.

{% include h2.html text="Create the credentials" %}

Your IAM user now needs credentials.

{% include external-link.html text="Create the required credentials in the AWS Console" class="btn btn-sm btn-primary" href="https://us-east-1.console.aws.amazon.com/iam/home#/users/details/sprinters-user/create-access-key" %}

Select `Other`:

![AWS Console access key type](/assets/setup/aws/accesskey-other.png){: .screenshot}

And confirm the creation:

![AWS Console access key creation](/assets/setup/aws/accesskey-create.png){: .screenshot}

{% include h2.html text="Connect your AWS account" %}

Finally copy both the _access key_ and the _secret access key_ from the AWS Console:

![AWS Console access key copy](/assets/setup/aws/accesskey-copy.png){: .screenshot}

And paste them into Sprinters:

![Sprinters access key paste](/assets/setup/aws/accesskey-paste.png){: .screenshot}

{% include h2.html text="Success" %}

Congratulations! Your AWS account is now successfully connected to Sprinters:

![AWS account connected](/assets/setup/aws/credentials-success.png){: .screenshot}

All that's left to do is run your first workflow job using Sprinters.
