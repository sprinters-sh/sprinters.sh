---
layout: docs
title: "Pinning"
---

In high-concurrency scenarios, a runner can sometimes be "stolen" by a job other than the one that launched it,
potentially leading to jobs no longer having a runner available or runners timing out before executing a job.

To ensure a runner is only assigned to the job that launched it, you can pin it to that job by adding a **job pinning discriminator** to the label.

This discriminator is unique and shared by both the job and its runner and ensures they are always matched together.
The easiest way to do this would have been to use the job's unique ID, but unfortunately, GitHub doesn't let you access that from within the workflow yml.
We can however achieve the same result by combining various job attributes, depending on whether the job is a _regular job_ or a _matrix job_.

{% include h3.html id="regular" text="Regular Jobs" %}

The following attributes uniquely identify a regular job:

| Attribute | Description |
+-|-+
| `github.run_id` | The unique ID of the current workflow run. |
| `github.run_attempt` | The attempt number of the current workflow run. |
| _job_name_ | The name of the current job. |
{: .table }

For a regular job named _test-job_, the _job pinning discriminator_ would then be:

```
{% raw %}${{ github.run_id }}-${{ github.run_attempt }}-test-job{% endraw %}
```

{% include h3.html id="matrix" text="Matrix Jobs" %}

The following attributes uniquely identify a matrix job:

| Attribute | Description |
+-|-+
| `github.run_id` | The unique ID of the current workflow run. |
| `github.run_attempt` | The attempt number of the current workflow run. |
| _job_name_ | The name of the current job. |
| `strategy.job-index` | The position of the job within the matrix. |
{: .table }

For a matrix job named _test-matrix-job_, the _job pinning discriminator_ would then be:

```
{% raw %}${{ github.run_id }}-${{ github.run_attempt }}-test-matrix-job-${{ strategy.job-index }}{% endraw %}
```

{% include h2.html id="label" text="Label" %}

To activate job pinning, simply add the _job pinning discriminator_ to the job's labels.

You can either add it as an additional label:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">
runs-on:
  - sprinters:aws:ubuntu-latest
  - <span class="fw-bold fst-italic text-warning">{% raw %}${{ github.run_id }}-${{ github.run_attempt }}-test-matrix-job-${{ strategy.job-index }}{% endraw %}</span></pre>
</div>

or inline:

<div class="alert alert-info font-monospace p-0 mb-3 position-relative" role="alert">
    <pre class="mb-0 p-2 fs-7">runs-on: sprinters<span class="fw-bold fst-italic text-warning">{% raw %}/${{ github.run_id }}-${{ github.run_attempt }}-test-job{% endraw %}</span>:aws:ubuntu-latest</pre>
</div>

GitHub will then replace all variables before passing the labels to Sprinters.
