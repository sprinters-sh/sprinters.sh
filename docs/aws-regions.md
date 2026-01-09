---
layout: docs
title: "AWS Regions"
---

You can choose from 9 different AWS regions across the globe where to launch your [instances](/docs/instances):

| Region | Location |
+-|-|-+
| `ap-northeast-1` | Tokyo |
| `ap-south-1` | Mumbai |
| `ca-central-1` | Canada |
| `eu-central-1` | Frankfurt |
| `eu-west-1` | Ireland |
| `eu-west-2` | London |
| `me-central-1` | UAE |
| `us-east-1` | N. Virginia |
| `us-west-2` | Oregon |
{: .table }

Need a different region? [Simply request it in the issue tracker](https://github.com/sprinters-sh/sprinters/issues).

{% include h2.html text="Pricing" %}

AWS charges vastly different amounts for EC2 instances in each region.

If your jobs can tolerate it, consider **switching to a more cost-effective region** as other regions can be **over to 2X cheaper** for the same instance type.

Here are the relative prices for the different instance types in each region.

{% include h3.html text="x64 (Intel)" %}
<nav>
    <div class="nav nav-tabs" role="tablist">
        <button class="nav-link" id="nav-price-c5-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c5" type="button" role="tab" aria-controls="nav-price-c5" aria-selected="false">c5</button>
        <button class="nav-link" id="nav-price-c5d-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c5d" type="button" role="tab" aria-controls="nav-price-c5d" aria-selected="false">c5d</button>
        <button class="nav-link" id="nav-price-c6i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c6i" type="button" role="tab" aria-controls="nav-price-c6i" aria-selected="false">c6i</button>
        <button class="nav-link" id="nav-price-c6id-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c6id" type="button" role="tab" aria-controls="nav-price-c6id" aria-selected="false">c6id</button>
        <button class="nav-link" id="nav-price-c7i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c7i" type="button" role="tab" aria-controls="nav-price-c7i" aria-selected="false">c7i</button>
        <button class="nav-link" id="nav-price-c7i-flex-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c7i-flex" type="button" role="tab" aria-controls="nav-price-c7i-flex" aria-selected="false">c7i-flex</button>
        <button class="nav-link" id="nav-price-c8i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c8i" type="button" role="tab" aria-controls="nav-price-c8i" aria-selected="false">c8i</button>
        <button class="nav-link" id="nav-price-c8i-flex-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c8i-flex" type="button" role="tab" aria-controls="nav-price-c8i-flex" aria-selected="false">c8i-flex</button>
        <button class="nav-link" id="nav-price-m5-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m5" type="button" role="tab" aria-controls="nav-price-m5" aria-selected="false">m5</button>
        <button class="nav-link" id="nav-price-m5d-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m5d" type="button" role="tab" aria-controls="nav-price-m5d" aria-selected="false">m5d</button>
        <button class="nav-link" id="nav-price-m6i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m6i" type="button" role="tab" aria-controls="nav-price-m6i" aria-selected="false">m6i</button>
        <button class="nav-link" id="nav-price-m6id-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m6id" type="button" role="tab" aria-controls="nav-price-m6id" aria-selected="false">m6id</button>
        <button class="nav-link" id="nav-price-m7i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m7i" type="button" role="tab" aria-controls="nav-price-m7i" aria-selected="false">m7i</button>
        <button class="nav-link" id="nav-price-m7i-flex-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m7i-flex" type="button" role="tab" aria-controls="nav-price-m7i-flex" aria-selected="false">m7i-flex</button>
        <button class="nav-link active" id="nav-price-m8i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m8i" type="button" role="tab" aria-controls="nav-price-m8i" aria-selected="true">m8i</button>
        <button class="nav-link" id="nav-price-m8i-flex-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m8i-flex" type="button" role="tab" aria-controls="nav-price-m8i-flex" aria-selected="false">m8i-flex</button>
        <button class="nav-link" id="nav-price-r5-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r5" type="button" role="tab" aria-controls="nav-price-r5" aria-selected="false">r5</button>
        <button class="nav-link" id="nav-price-r5d-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r5d" type="button" role="tab" aria-controls="nav-price-r5d" aria-selected="false">r5d</button>
        <button class="nav-link" id="nav-price-r6i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r6i" type="button" role="tab" aria-controls="nav-price-r6i" aria-selected="false">r6i</button>
        <button class="nav-link" id="nav-price-r6id-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r6id" type="button" role="tab" aria-controls="nav-price-r6id" aria-selected="false">r6id</button>
        <button class="nav-link" id="nav-price-r7i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r7i" type="button" role="tab" aria-controls="nav-price-r7i" aria-selected="false">r7i</button>
        <button class="nav-link" id="nav-price-r8i-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r8i" type="button" role="tab" aria-controls="nav-price-r8i" aria-selected="false">r8i</button>
        <button class="nav-link" id="nav-price-r8i-flex-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r8i-flex" type="button" role="tab" aria-controls="nav-price-r8i-flex" aria-selected="false">r8i-flex</button>
        <button class="nav-link" id="nav-price-t3-tab" data-bs-toggle="tab" data-bs-target="#nav-price-t3" type="button" role="tab" aria-controls="nav-price-t3" aria-selected="false">t3</button>
    </div>
</nav>
<div class="tab-content">
    {% include instance-price.html active="false" family="c5" ap-northeast-1="0.0535" ap-south-1="0.0425" ca-central-1="0.0465" eu-central-1="0.0485" eu-west-1="0.048" eu-west-2="0.0505" me-central-1="0.053" us-east-1="0.0425" us-west-2="0.0425" %}
    {% include instance-price.html active="false" family="c5d" ap-northeast-1="0.061" ap-south-1="0.0495" ca-central-1="0.053" eu-central-1="0.0555" eu-west-1="0.0545" eu-west-2="0.0575" me-central-1="0.06" us-east-1="0.048" us-west-2="0.048" %}
    {% include instance-price.html active="false" family="c6i" ap-northeast-1="0.0535" ap-south-1="0.0425" ca-central-1="0.0465" eu-central-1="0.0485" eu-west-1="0.0456" eu-west-2="0.0505" me-central-1="0" us-east-1="0.0425" us-west-2="0.0425" %}
    {% include instance-price.html active="false" family="c6id" ap-northeast-1="0.06405" ap-south-1="0" ca-central-1="0.05565" eu-central-1="0.058275" eu-west-1="0.057225" eu-west-2="0.060375" me-central-1="0" us-east-1="0.0504" us-west-2="0.0504" %}
    {% include instance-price.html active="false" family="c7i" ap-northeast-1="0.056175" ap-south-1="0.044625" ca-central-1="0.048825" eu-central-1="0.050925" eu-west-1="0.04788" eu-west-2="0.053025" me-central-1="0.053625" us-east-1="0.044625" us-west-2="0.044625" %}
    {% include instance-price.html active="false" family="c7i-flex" ap-northeast-1="0.053365" ap-south-1="0.042395" ca-central-1="0.046385" eu-central-1="0.04838" eu-west-1="0.045485" eu-west-2="0.050375" me-central-1="0.050945" us-east-1="0.042395" us-west-2="0.042395" %}
    {% include instance-price.html active="false" family="c8i" ap-northeast-1="0.058985" ap-south-1="0.046855" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.046855" us-west-2="0.046855" %}
    {% include instance-price.html active="false" family="c8i-flex" ap-northeast-1="0.056035" ap-south-1="0.04451" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.04451" us-west-2="0.04451" %}
    {% include instance-price.html active="false" family="m5" ap-northeast-1="0.062" ap-south-1="0.0505" ca-central-1="0.0535" eu-central-1="0.0575" eu-west-1="0.0535" eu-west-2="0.0555" me-central-1="0.059" us-east-1="0.048" us-west-2="0.048" %}
    {% include instance-price.html active="false" family="m5d" ap-northeast-1="0.073" ap-south-1="0.061" ca-central-1="0.063" eu-central-1="0.068" eu-west-1="0.063" eu-west-2="0.0655" me-central-1="0.0695" us-east-1="0.0565" us-west-2="0.0565" %}
    {% include instance-price.html active="false" family="m6i" ap-northeast-1="0.062" ap-south-1="0.0505" ca-central-1="0.0535" eu-central-1="0.0575" eu-west-1="0.0535" eu-west-2="0.0555" me-central-1="0.05885" us-east-1="0.048" us-west-2="0.048" %}
    {% include instance-price.html active="false" family="m6id" ap-northeast-1="0.07665" ap-south-1="0.06405" ca-central-1="0.06615" eu-central-1="0.0714" eu-west-1="0.06615" eu-west-2="0.068775" me-central-1="0" us-east-1="0.059325" us-west-2="0.059325" %}
    {% include instance-price.html active="false" family="m7i" ap-northeast-1="0.0651" ap-south-1="0.053025" ca-central-1="0.056175" eu-central-1="0.060375" eu-west-1="0.056175" eu-west-2="0.058275" me-central-1="0.061795" us-east-1="0.0504" us-west-2="0.0504" %}
    {% include instance-price.html active="false" family="m7i-flex" ap-northeast-1="0.061845" ap-south-1="0.050375" ca-central-1="0.053365" eu-central-1="0.057355" eu-west-1="0.053365" eu-west-2="0.05536" me-central-1="0" us-east-1="0.04788" us-west-2="0.04788" %}
    {% include instance-price.html active="true" family="m8i" ap-northeast-1="0.068355" ap-south-1="0.055675" ca-central-1="0.058985" eu-central-1="0.063395" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.05292" us-west-2="0.05292" %}
    {% include instance-price.html active="false" family="m8i-flex" ap-northeast-1="0" ap-south-1="0.052895" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.050275" us-west-2="0.050275" %}
    {% include instance-price.html active="false" family="r5" ap-northeast-1="0.076" ap-south-1="0.065" ca-central-1="0.069" eu-central-1="0.076" eu-west-1="0.0705" eu-west-2="0.074" me-central-1="0.0775" us-east-1="0.063" us-west-2="0.063" %}
    {% include instance-price.html active="false" family="r5d" ap-northeast-1="0.087" ap-south-1="0.0755" ca-central-1="0.079" eu-central-1="0.0865" eu-west-1="0.08" eu-west-2="0.0845" me-central-1="0.088" us-east-1="0.072" us-west-2="0.072" %}
    {% include instance-price.html active="false" family="r6i" ap-northeast-1="0.076" ap-south-1="0.065" ca-central-1="0.069" eu-central-1="0.076" eu-west-1="0.0705" eu-west-2="0.074" me-central-1="0.07755" us-east-1="0.063" us-west-2="0.063" %}
    {% include instance-price.html active="false" family="r6id" ap-northeast-1="0.09135" ap-south-1="0.0793" ca-central-1="0" eu-central-1="0.090825" eu-west-1="0.084" eu-west-2="0.088725" me-central-1="0" us-east-1="0.0756" us-west-2="0.0756" %}
    {% include instance-price.html active="false" family="r7i" ap-northeast-1="0.0798" ap-south-1="0.06825" ca-central-1="0.07245" eu-central-1="0.0798" eu-west-1="0.074025" eu-west-2="0.0777" me-central-1="0" us-east-1="0.06615" us-west-2="0.06615" %}
    {% include instance-price.html active="false" family="r8i" ap-northeast-1="0.08379" ap-south-1="0.071665" ca-central-1="0.076075" eu-central-1="0.08379" eu-west-1="0" eu-west-2="0.081585" me-central-1="0" us-east-1="0.06946" us-west-2="0.06946" %}
    {% include instance-price.html active="false" family="r8i-flex" ap-northeast-1="0.0796" ap-south-1="0.06808" ca-central-1="0.07227" eu-central-1="0.0796" eu-west-1="0" eu-west-2="0.077505" me-central-1="0" us-east-1="0.065985" us-west-2="0.065985" %}
    {% include instance-price.html active="false" family="t3" ap-northeast-1="0.0544" ap-south-1="0.0448" ca-central-1="0.0464" eu-central-1="0.048" eu-west-1="0.0456" eu-west-2="0.0472" me-central-1="0.05015" us-east-1="0.0416" us-west-2="0.0416" %}
</div>

{% include h3.html text="x64 (AMD)" %}
<nav>
    <div class="nav nav-tabs" role="tablist">
        <button class="nav-link" id="nav-price-c5a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c5a" type="button" role="tab" aria-controls="nav-price-c5a" aria-selected="false">c5a</button>
        <button class="nav-link" id="nav-price-c5ad-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c5ad" type="button" role="tab" aria-controls="nav-price-c5ad" aria-selected="false">c5ad</button>
        <button class="nav-link" id="nav-price-c6a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c6a" type="button" role="tab" aria-controls="nav-price-c6a" aria-selected="false">c6a</button>
        <button class="nav-link" id="nav-price-c7a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c7a" type="button" role="tab" aria-controls="nav-price-c7a" aria-selected="false">c7a</button>
        <button class="nav-link" id="nav-price-c8a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c8a" type="button" role="tab" aria-controls="nav-price-c8a" aria-selected="false">c8a</button>
        <button class="nav-link" id="nav-price-m5a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m5a" type="button" role="tab" aria-controls="nav-price-m5a" aria-selected="false">m5a</button>
        <button class="nav-link" id="nav-price-m5ad-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m5ad" type="button" role="tab" aria-controls="nav-price-m5ad" aria-selected="false">m5ad</button>
        <button class="nav-link" id="nav-price-m6a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m6a" type="button" role="tab" aria-controls="nav-price-m6a" aria-selected="false">m6a</button>
        <button class="nav-link" id="nav-price-m7a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m7a" type="button" role="tab" aria-controls="nav-price-m7a" aria-selected="false">m7a</button>
        <button class="nav-link active" id="nav-price-m8a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m8a" type="button" role="tab" aria-controls="nav-price-m8a" aria-selected="true">m8a</button>
        <button class="nav-link" id="nav-price-r5a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r5a" type="button" role="tab" aria-controls="nav-price-r5a" aria-selected="false">r5a</button>
        <button class="nav-link" id="nav-price-r5ad-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r5ad" type="button" role="tab" aria-controls="nav-price-r5ad" aria-selected="false">r5ad</button>
        <button class="nav-link" id="nav-price-r6a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r6a" type="button" role="tab" aria-controls="nav-price-r6a" aria-selected="false">r6a</button>
        <button class="nav-link" id="nav-price-r7a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r7a" type="button" role="tab" aria-controls="nav-price-r7a" aria-selected="false">r7a</button>
        <button class="nav-link" id="nav-price-r8a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r8a" type="button" role="tab" aria-controls="nav-price-r8a" aria-selected="false">r8a</button>
        <button class="nav-link" id="nav-price-t3a-tab" data-bs-toggle="tab" data-bs-target="#nav-price-t3a" type="button" role="tab" aria-controls="nav-price-t3a" aria-selected="false">t3a</button>
    </div>
</nav>
<div class="tab-content">
    {% include instance-price.html active="false" family="c5a" ap-northeast-1="0.048" ap-south-1="0.0235" ca-central-1="0.042" eu-central-1="0.0435" eu-west-1="0.043" eu-west-2="0.0455" me-central-1="0" us-east-1="0.0385" us-west-2="0.0385" %}
    {% include instance-price.html active="false" family="c5ad" ap-northeast-1="0" ap-south-1="0" ca-central-1="0" eu-central-1="0.05" eu-west-1="0.049" eu-west-2="0" me-central-1="0" us-east-1="0.043" us-west-2="0.043" %}
    {% include instance-price.html active="false" family="c6a" ap-northeast-1="0.04815" ap-south-1="0.023375" ca-central-1="0.04185" eu-central-1="0.04365" eu-west-1="0.04104" eu-west-2="0.04545" me-central-1="0" us-east-1="0.03825" us-west-2="0.03825" %}
    {% include instance-price.html active="false" family="c7a" ap-northeast-1="0.0646" ap-south-1="0" ca-central-1="0" eu-central-1="0.058565" eu-west-1="0.05506" eu-west-2="0.06098" me-central-1="0" us-east-1="0.05132" us-west-2="0.05132" %}
    {% include instance-price.html active="false" family="c8a" ap-northeast-1="0" ap-south-1="0" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.053885" us-west-2="0.053885" %}
    {% include instance-price.html active="false" family="m5a" ap-northeast-1="0.056" ap-south-1="0.028" ca-central-1="0.048" eu-central-1="0.052" eu-west-1="0.048" eu-west-2="0.05" me-central-1="0" us-east-1="0.043" us-west-2="0.043" %}
    {% include instance-price.html active="false" family="m5ad" ap-northeast-1="0.067" ap-south-1="0.0335" ca-central-1="0.0575" eu-central-1="0.0625" eu-west-1="0.0575" eu-west-2="0.06" me-central-1="0" us-east-1="0.0515" us-west-2="0.0515" %}
    {% include instance-price.html active="false" family="m6a" ap-northeast-1="0.0558" ap-south-1="0.027775" ca-central-1="0.04815" eu-central-1="0.05175" eu-west-1="0.04815" eu-west-2="0.04995" me-central-1="0" us-east-1="0.0432" us-west-2="0.0432" %}
    {% include instance-price.html active="false" family="m7a" ap-northeast-1="0.074865" ap-south-1="0" ca-central-1="0" eu-central-1="0.06943" eu-west-1="0.0646" eu-west-2="0.067015" me-central-1="0" us-east-1="0.05796" us-west-2="0.05796" %}
    {% include instance-price.html active="true" family="m8a" ap-northeast-1="0.07861" ap-south-1="0" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.06086" us-west-2="0.06086" %}
    {% include instance-price.html active="false" family="r5a" ap-northeast-1="0.0685" ap-south-1="0.036" ca-central-1="0.062" eu-central-1="0.0685" eu-west-1="0.0635" eu-west-2="0.0665" me-central-1="0" us-east-1="0.0565" us-west-2="0.0565" %}
    {% include instance-price.html active="false" family="r5ad" ap-northeast-1="0.0795" ap-south-1="0.0415" ca-central-1="0.072" eu-central-1="0.079" eu-west-1="0.073" eu-west-2="0.077" me-central-1="0" us-east-1="0.0655" us-west-2="0.0655" %}
    {% include instance-price.html active="false" family="r6a" ap-northeast-1="0.0684" ap-south-1="0.03575" ca-central-1="0.0621" eu-central-1="0.0684" eu-west-1="0.06345" eu-west-2="0" me-central-1="0" us-east-1="0.0567" us-west-2="0.0567" %}
    {% include instance-price.html active="false" family="r7a" ap-northeast-1="0.09177" ap-south-1="0" ca-central-1="0" eu-central-1="0.09177" eu-west-1="0.08513" eu-west-2="0" me-central-1="0" us-east-1="0.076075" us-west-2="0.076075" %}
    {% include instance-price.html active="false" family="r8a" ap-northeast-1="0" ap-south-1="0" ca-central-1="0" eu-central-1="0" eu-west-1="0" eu-west-2="0" me-central-1="0" us-east-1="0.07988" us-west-2="0.07988" %}
    {% include instance-price.html active="false" family="t3a" ap-northeast-1="0.04895" ap-south-1="0.02465" ca-central-1="0.04175" eu-central-1="0.0432" eu-west-1="0.0408" eu-west-2="0.0425" me-central-1="0" us-east-1="0.0376" us-west-2="0.0376" %}
</div>

{% include h3.html text="arm64" %}
<nav>
    <div class="nav nav-tabs" role="tablist">
        <button class="nav-link" id="nav-price-c6g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c6g" type="button" role="tab" aria-controls="nav-price-c6g" aria-selected="false">c6g</button>
        <button class="nav-link" id="nav-price-c6gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c6gd" type="button" role="tab" aria-controls="nav-price-c6gd" aria-selected="false">c6gd</button>
        <button class="nav-link" id="nav-price-c7g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c7g" type="button" role="tab" aria-controls="nav-price-c7g" aria-selected="false">c7g</button>
        <button class="nav-link" id="nav-price-c7gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c7gd" type="button" role="tab" aria-controls="nav-price-c7gd" aria-selected="false">c7gd</button>
        <button class="nav-link" id="nav-price-c8g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c8g" type="button" role="tab" aria-controls="nav-price-c8g" aria-selected="false">c8g</button>
        <button class="nav-link" id="nav-price-c8gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-c8gd" type="button" role="tab" aria-controls="nav-price-c8gd" aria-selected="false">c8gd</button>
        <button class="nav-link" id="nav-price-m6g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m6g" type="button" role="tab" aria-controls="nav-price-m6g" aria-selected="false">m6g</button>
        <button class="nav-link" id="nav-price-m6gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m6gd" type="button" role="tab" aria-controls="nav-price-m6gd" aria-selected="false">m6gd</button>
        <button class="nav-link" id="nav-price-m7g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m7g" type="button" role="tab" aria-controls="nav-price-m7g" aria-selected="false">m7g</button>
        <button class="nav-link" id="nav-price-m7gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m7gd" type="button" role="tab" aria-controls="nav-price-m7gd" aria-selected="false">m7gd</button>
        <button class="nav-link active" id="nav-price-m8g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m8g" type="button" role="tab" aria-controls="nav-price-m8g" aria-selected="true">m8g</button>
        <button class="nav-link" id="nav-price-m8gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-m8gd" type="button" role="tab" aria-controls="nav-price-m8gd" aria-selected="false">m8gd</button>
        <button class="nav-link" id="nav-price-r6g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r6g" type="button" role="tab" aria-controls="nav-price-r6g" aria-selected="false">r6g</button>
        <button class="nav-link" id="nav-price-r6gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r6gd" type="button" role="tab" aria-controls="nav-price-r6gd" aria-selected="false">r6gd</button>
        <button class="nav-link" id="nav-price-r7g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r7g" type="button" role="tab" aria-controls="nav-price-r7g" aria-selected="false">r7g</button>
        <button class="nav-link" id="nav-price-r7gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r7gd" type="button" role="tab" aria-controls="nav-price-r7gd" aria-selected="false">r7gd</button>
        <button class="nav-link" id="nav-price-r8g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r8g" type="button" role="tab" aria-controls="nav-price-r8g" aria-selected="false">r8g</button>
        <button class="nav-link" id="nav-price-r8gd-tab" data-bs-toggle="tab" data-bs-target="#nav-price-r8gd" type="button" role="tab" aria-controls="nav-price-r8gd" aria-selected="false">r8gd</button>
        <button class="nav-link" id="nav-price-t4g-tab" data-bs-toggle="tab" data-bs-target="#nav-price-t4g" type="button" role="tab" aria-controls="nav-price-t4g" aria-selected="false">t4g</button>
    </div>
</nav>
<div class="tab-content">
    {% include instance-price.html active="false" family="c6g" ap-northeast-1="0.0428" ap-south-1="0.0213" ca-central-1="0.0372" eu-central-1="0.0388" eu-west-1="0.0365" eu-west-2="0.0404" me-central-1="0.04015" us-east-1="0.034" us-west-2="0.034" %}
    {% include instance-price.html active="false" family="c6gd" ap-northeast-1="0.049" ap-south-1="0.0245" ca-central-1="0.0424" eu-central-1="0.0445" eu-west-1="0.0436" eu-west-2="0.046" me-central-1="0" us-east-1="0.0384" us-west-2="0.0384" %}
    {% include instance-price.html active="false" family="c7g" ap-northeast-1="0.0455" ap-south-1="0.02455" ca-central-1="0.03955" eu-central-1="0.04125" eu-west-1="0.03875" eu-west-2="0.04295" me-central-1="0" us-east-1="0.03625" us-west-2="0.03625" %}
    {% include instance-price.html active="false" family="c7gd" ap-northeast-1="0.05765" ap-south-1="0.0288" ca-central-1="0.0501" eu-central-1="0.05245" eu-west-1="0.0515" eu-west-2="0.05435" me-central-1="0" us-east-1="0.04535" us-west-2="0.04535" %}
    {% include instance-price.html active="false" family="c8g" ap-northeast-1="0.05003" ap-south-1="0.02699" ca-central-1="0.04348" eu-central-1="0.04535" eu-west-1="0.04264" eu-west-2="0.04722" me-central-1="0" us-east-1="0.03988" us-west-2="0.03988" %}
    {% include instance-price.html active="false" family="c8gd" ap-northeast-1="0.06226" ap-south-1="0" ca-central-1="0.05409" eu-central-1="0.05665" eu-west-1="0.05562" eu-west-2="0.05868" me-central-1="0" us-east-1="0.04899" us-west-2="0.04899" %}
    {% include instance-price.html active="false" family="m6g" ap-northeast-1="0.0495" ap-south-1="0.0253" ca-central-1="0.0428" eu-central-1="0.046" eu-west-1="0.043" eu-west-2="0.0444" me-central-1="0.0473" us-east-1="0.0385" us-west-2="0.0385" %}
    {% include instance-price.html active="false" family="m6gd" ap-northeast-1="0.0585" ap-south-1="0.0302" ca-central-1="0.0504" eu-central-1="0.0545" eu-west-1="0.0504" eu-west-2="0.0524" me-central-1="0.0554" us-east-1="0.0452" us-west-2="0.0452" %}
    {% include instance-price.html active="false" family="m7g" ap-northeast-1="0.0527" ap-south-1="0.02915" ca-central-1="0.0455" eu-central-1="0.0489" eu-west-1="0.0455" eu-west-2="0.0472" me-central-1="0.05" us-east-1="0.0408" us-west-2="0.0408" %}
    {% include instance-price.html active="false" family="m7gd" ap-northeast-1="0.069" ap-south-1="0.0355" ca-central-1="0" eu-central-1="0.06425" eu-west-1="0.05955" eu-west-2="0" me-central-1="0.0655" us-east-1="0.0534" us-west-2="0.0534" %}
    {% include instance-price.html active="true" family="m8g" ap-northeast-1="0.05797" ap-south-1="0.03208" ca-central-1="0.05003" eu-central-1="0.05377" eu-west-1="0.05002" eu-west-2="0.0519" me-central-1="0.05502" us-east-1="0.04488" us-west-2="0.04488" %}
    {% include instance-price.html active="false" family="m8gd" ap-northeast-1="0.0745" ap-south-1="0" ca-central-1="0.0643" eu-central-1="0.0694" eu-west-1="0" eu-west-2="0.06685" me-central-1="0" us-east-1="0.05766" us-west-2="0.05766" %}
    {% include instance-price.html active="false" family="r6g" ap-northeast-1="0.0608" ap-south-1="0.0325" ca-central-1="0.0552" eu-central-1="0.0608" eu-west-1="0.0564" eu-west-2="0.0592" me-central-1="0.06205" us-east-1="0.0504" us-west-2="0.0504" %}
    {% include instance-price.html active="false" family="r6gd" ap-northeast-1="0.0695" ap-south-1="0.03735" ca-central-1="0.0632" eu-central-1="0.069" eu-west-1="0.064" eu-west-2="0.0676" me-central-1="0" us-east-1="0.0576" us-west-2="0.0576" %}
    {% include instance-price.html active="false" family="r7g" ap-northeast-1="0.0646" ap-south-1="0.03755" ca-central-1="0.05865" eu-central-1="0.0646" eu-west-1="0.05995" eu-west-2="0.0629" me-central-1="0.0659" us-east-1="0.05355" us-west-2="0.05355" %}
    {% include instance-price.html active="false" family="r7gd" ap-northeast-1="0.0822" ap-south-1="0.044" ca-central-1="0" eu-central-1="0.08175" eu-west-1="0.0756" eu-west-2="0.07985" me-central-1="0.08315" us-east-1="0.06805" us-west-2="0.06805" %}
    {% include instance-price.html active="false" family="r8g" ap-northeast-1="0.07106" ap-south-1="0.04129" ca-central-1="0.06452" eu-central-1="0.07106" eu-west-1="0.06592" eu-west-2="0.06919" me-central-1="0" us-east-1="0.05891" us-west-2="0.05891" %}
    {% include instance-price.html active="false" family="r8gd" ap-northeast-1="0.08879" ap-south-1="0" ca-central-1="0.08062" eu-central-1="0.08828" eu-west-1="0.08165" eu-west-2="0.08624" me-central-1="0" us-east-1="0.07348" us-west-2="0.07348" %}
    {% include instance-price.html active="false" family="t4g" ap-northeast-1="0.0432" ap-south-1="0.0224" ca-central-1="0.0368" eu-central-1="0.0384" eu-west-1="0.0368" eu-west-2="0.0376" me-central-1="0.0408" us-east-1="0.0336" us-west-2="0.0336" %}
</div>
