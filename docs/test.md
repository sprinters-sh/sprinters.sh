---
layout: docs
title: "Test"
next: docs/label.md
---

The easiest way to validate your setup, is to run a test job.

{% include external-link.html text="Generate a new GitHub repository from the `sprinters-sh/sprinters-test` template" class="btn btn-sm btn-primary" href="https://github.com/new?template_name=sprinters-test&template_owner=sprinters-sh" %}

On your new repo:
1. Edit the `.github/workflows/test.yml` workflow definition and replace `your-12-digit-aws-account-id` with your own AWS account ID.
2. Run the `sprinters-test` workflow and inspect the workflow run logs.

You should now see:

```
Success! This job is running on a fresh EC2 instance in your AWS account using Sprinters!
```

Congratulations! You now have a fully operational Sprinters setup.

<a class="btn btn-secondary btn-sm" data-bs-toggle="collapse" href="#test-job" aria-expanded="false" aria-controls="test-job">
    <i class="bi bi-image me-1"></i>
    See it in action
</a>
<div class="collapse" id="test-job">
    <img src="/assets/test/test.png" alt="Test job run" class="screenshot">
</div>
