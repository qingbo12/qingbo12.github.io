---
title: "Building issues"
date: 2024-11-24T17:36:00+08:00
description: Building issues to Sample Post
menu:
  sidebar:
    name: Building issues
    identifier: Building issues
    weight: 10
---

### Issues

**1. Built-in Shortcode leads to Hugo timeout.**

Because of the networks, I can't send requests to Twitter, YouTube, etc. So I delete the contents about Twitter and YouTube. They are in content\posts\category\sub-category\rich-content\index.md, content\posts\category\sub-category\rich-content\index.bn.md, 
hugo.yaml shareButtons:, 
data\en\sections\about.yaml socialLinks:.

**2. Only readme when deploying to github pages.**

Need to set your deployment branch to gh-pages.

![deployBranchSetting](deployBranchSetting.png)