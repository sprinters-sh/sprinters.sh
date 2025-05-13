---
layout: docs
title: "Images"
---

Every runner instance is launched from an image. Sprinters provides a set of pre-built images for you to use.

{% include h4.html text="Default" %}
`ubuntu-latest`

{% include h4.html text="Supported <strong>x64</strong> Images" %}
| Image | Description |
+-|-|-+
| `ubuntu-latest`{: .text-nowrap } <br> `ubuntu-24.04`{: .text-nowrap } | Ubuntu 24.04 x64 image identical to the one available for GitHub hosted runners |
| `ubuntu-24.04-slim`{: .text-nowrap } | Ubuntu 24.04 x64 image identical to the one available for GitHub hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-24.04-minimal`{: .text-nowrap } | Minimal, fast-booting Ubuntu 24.04 x64 image containing only Git and Docker |
| `ubuntu-22.04`{: .text-nowrap } | Ubuntu 22.04 x64 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04-slim`{: .text-nowrap } | Ubuntu 22.04 x64 image identical to the one available for GitHub hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-22.04-minimal`{: .text-nowrap } | Minimal, fast-booting Ubuntu 22.04 x64 image containing only Git and Docker |
{: .table }

{% include h4.html text="Supported <strong>arm64</strong> Images" %}
| Image | Description |
+-|-|-+
| `ubuntu-24.04-arm`{: .text-nowrap } | Ubuntu 24.04 arm64 image identical to the one available for GitHub hosted runners |
| `ubuntu-24.04-arm-slim`{: .text-nowrap } | Ubuntu 24.04 arm64 image identical to the one available for GitHub hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-24.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting Ubuntu 24.04 arm64 image containing only Git and Docker |
| `ubuntu-22.04-arm`{: .text-nowrap } | Ubuntu 22.04 arm64 image identical to the one available for GitHub hosted runners |
| `ubuntu-22.04-arm-slim`{: .text-nowrap } | Ubuntu 22.04 arm64 image identical to the one available for GitHub hosted runners, minus Android, CodeQL, Haskell and Julia |
| `ubuntu-22.04-arm-minimal`{: .text-nowrap } | Minimal, fast-booting Ubuntu 22.04 arm64 image containing only Git and Docker |
{: .table }
