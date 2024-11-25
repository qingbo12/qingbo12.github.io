---
title: "DINO Read"
date: 2024-09-06T09:57:00+08:00

author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: DINO Read
    identifier: GCD-DINO
    parent: GCD
    weight: 10
---

## Questions

1) What's the function of centering $ C $ and sharpening parameter $ \tau_t $ ?

## Extended Learning
1. Multi-crop training. 

    Caron, Mathilde, et al. "Unsupervised learning of visual features by contrasting cluster assignments." Advances in neural information processing systems 33 (2020): 9912-9924.

2. Use a noise contrastive estimator (NCE) to compare instances instead of classifying them. 

    Wu, Zhirong, et al. "Unsupervised feature learning via non-parametric instance discrimination." Proceedings of the IEEE conference on computer vision and pattern recognition. 2018.

3. Mean Teacher self-distillation. 

    Tarvainen, Antti, and Harri Valpola. "Mean teachers are better role models: Weight-averaged consistency targets improve semi-supervised deep learning results." Advances in neural information processing systems 30 (2017).

4. knowledge distillation. 

    Buciluǎ, Cristian, Rich Caruana, and Alexandru Niculescu-Mizil. "Model compression." Proceedings of the 12th ACM SIGKDD international conference on Knowledge discovery and data mining. 2006. 

5. Extra learnable token in ViT. 

    Dosovitskiy, Alexey. "An image is worth 16x16 words: Transformers for image recognition at scale." arXiv preprint arXiv:2010.11929 (2020).

    Devlin, Jacob. "Bert: Pre-training of deep bidirectional transformers for language understanding." arXiv preprint arXiv:1810.04805 (2018).

6. Attention mechanism. 

    Bahdanau, Dzmitry. "Neural machine translation by jointly learning to align and translate." arXiv preprint arXiv:1409.0473 (2014).