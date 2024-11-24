# qingbo12.github.io

This is my Hugo static site, built using the Toha theme, which is a fork of [hugo-toha](https://github.com/hugo-toha/hugo-toha.github.io).

### Issues

**1. Built-in Shortcode leads to Hugo timeout.**

Because of the networks, I can't send requests to Twitter, YouTube, etc. So I delete the contents about Twitter and YouTube. They are in content\posts\category\sub-category\rich-content\index.md, content\posts\category\sub-category\rich-content\index.bn.md, 
hugo.yaml shareButtons:, 
data\en\sections\about.yaml socialLinks:.

**2. Only readme when deploying to github pages.**

Need to set your deployment branch to gh-pages.

![deployBranchSetting](/images/others/deployBranchSetting.png)
