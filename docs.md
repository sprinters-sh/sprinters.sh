---
layout: default
title: "Docs"
---

## Introduction
{: .mt-5 }
Sprinters runs your GitHub Actions jobs directly on your AWS account. You pick the instance type 
and disk size required for each job. Then, whenever a workflow is triggered, Sprinters will launch a fresh new ephemeral
instance directly within your VPC.

### AWS
{: .mt-5 }
Sprinters launches runners on your AWS account in AWS region, availability zone and subnet of your choice.

First, you will need to create

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
