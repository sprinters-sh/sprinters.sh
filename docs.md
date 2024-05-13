---
layout: default
title: "Docs"
---

## Introduction
{: .mt-5 }
Sprinters lets you run your GitHub Actions jobs directly on your AWS account. You can freely choose the instance type 
and disk size you require for each job. Whenever a workflow is triggered, Sprinters will launch a fresh new ephemeral
instance directly within your VPC. You can freely choose which AWS region, availability zone or subnet to use.

### AWS
{: .mt-5 }
Sprinters can launch your runners on your AWS account in any of these regions using any of these x64 and arm64 instance types.

#### Supported Regions
{: .mt-4 }
- `eu-central-1`
- `us-east-1`

#### Supported Instance Families 
{: .mt-4 }
- `m7i`
- `m7i-flex`
- `t3`
- `t3a`
- `t4g`
