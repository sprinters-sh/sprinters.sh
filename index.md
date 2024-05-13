---
layout: default
title: "Run your GitHub Actions jobs faster on your own AWS account at a fraction of the cost"
---

<div class="col-md-8 mx-auto text-center">
    <img src="/assets/logo/sprinters.svg" width="200" height="200" alt="Sprinters" class="d-none d-sm-block mx-auto mt-5 mb-3">
    <h1 class="mb-3 fw-semibold fs-0">Run your GitHub Actions jobs faster on your own AWS account at a fraction of the cost with Sprinters</h1>
    <p class="lead mb-4">
        Secure, ephemeral, high-performance runners within the privacy of your own VPC.
        Launch in the region and subnet of your choice, right-size your instances, 
        and directly access all required services without having to expose them over the public internet.
    </p>
    <div class="d-flex flex-column align-items-md-stretch justify-content-md-center gap-3 mb-4">
        <div class="d-inline-block v-align-middle fs-5">
            <code class="text-info"><span class="text-warning">runs-on:</span> sprinters:aws/us-east-1/m7i-flex.4xlarge</code>
        </div>
        <a href="https://console.sprinters.sh" class="btn btn-lg btn-primary d-flex align-items-center justify-content-center fw-semibold">Get started</a>
    </div>
    <p class="text-secondary mb-0">
        <i class="bi-ubuntu"></i> Ubuntu <span class="px-1">&middot;</span> <i class="bi-cpu"></i> x64 <span class="px-1">&middot;</span> <i class="bi-cpu"></i> arm64
    </p>
</div>

<div class="col-md-8 mx-auto text-center mt-5">
    <h2 class="pt-7 fw-semibold">Right-sized runners for the job.</h2>
    <h4 class="mb-3 text-secondary">From tiny to humongous, and everything in between.</h4>
    <div class="row">
        {% include feature.html icon="motherboard" title="All Instance Sizes" text="Need lots of CPU? Plenty of RAM? Or very little? Select the right instance type from a wide array of choices." %}
        {% include feature.html icon="nvme" title="Larger Disks" text="Freely adjust the runner disk space from a few GB to multiple TB." %}
        {% include feature.html icon="cpu" title="x64 and arm64" text="Pick the best CPU architecture for the job. Intel, AMD and ARM instances are fully supported." %}
    </div>
</div>

<div class="col-md-8 mx-auto text-center mt-5">
    <h2 class="pt-7 fw-semibold">100% Clean and Secure Runners. Every time.</h2>
    <h4 class="mb-3 text-secondary">Defense in depth at every layer.</h4>
    <div class="row">
        {% include feature.html icon="plus-square-dotted" title="Ephemeral VMs" text="Each runner is launched using a new ephemeral EC2 instance, ensuring a 100% clean environment for every build." %}
        {% include feature.html icon="file-earmark-lock" title="Read-only Root" text="Immutable runner root filesystem, guaranteeing integrity. Writes are automatically redirected to temporary volumes reformatted on every boot." %}
        {% include feature.html icon="shield-check" title="Inside your VPC" text="Runners are launched directed within the privacy your VPC. Services your jobs rely on no longer need to be exposed over the public internet." %}
    </div>
</div>

<p class="text-center pt-7">
    <a href="https://console.sprinters.sh" class="btn btn-lg btn-primary fw-semibold">Get started with Sprinters</a>
</p>
