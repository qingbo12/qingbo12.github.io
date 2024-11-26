---
title: "SimGCD Read"
date: 2024-09-02T09:57:00+08:00

author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: SimGCD Read
    identifier: GCD-SimGCD
    parent: GCD
    weight: 10

hero: cub-dataset-cover.jpg
---

## Research Task

**Generalized Category Discovery (GCD)** relaxes the assumption of traditional semi-supervised learning by assuming the unlabelled data can also contain different but related categories from the labelled data. The goal of GCD is to learn a model that is able to classify the already-seen categories in the labelled data, and more importantly, jointly discover the new categories in the unlabelled data and make correct classifications.

## Limitations of Previous Methods

Previous methods can be categorized into two distinct approaches:

1. parametric classifiers.

    However, parametric classifiers are prone to overfit to seen categories.
    This **motivates** authors to revisit the reason that makes previous parametric classifiers fail to recognise novel classes.

2. non-parametric classifier such as k-means clustering.

    Albeit obtaining promising results, the non-parametric classifiers suffer from heavy computation costs on large-scale datasets due to quadratic complexity of the clustering algorithm.
    Besides, unlike a learnable parametric classifier, the non-parametric method loses the ability to jointly optimise the separating hyperplane of all categories in a learnable manner, potentially being sub-optimal.

## Failures of Parametric Classification

| Comparing Item | UNO+ | GCD |
| :----------- | :------------: | :------------: |
| Representation | post projector | post backbone |
| Decoupled or joint representation learning | joint | decoupled |
| Prediction bias | more | less |

<br>

**Conclusion:**

1) Post backbone representation is better.

2) Joint representation learning is better.

3) Reliable pseudo label is count.

4) Prediction bias needs to be overcome.

## Method

1) Representation Learning:

    Supervised contrastive learning on labelled samples, and self-supervised contrastive learning on all samples.

2) Parametric Classification:

    Cross-entropy loss between the pseudo-labels of two views on all samples, and cross-entropy loss between the predictions and ground-truth labels on labelled samples.

    Mean-entropy maximisation regulariser for the unsupervised objective to overcome biased predictions.

## Extended Learning

1. Off-the-shelf method to estimate number of categories in $ Y_u $. 

   Vaze, Sagar, et al. "Generalized category discovery." Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 2022.

2. Deep Clustering. 

    Caron, Mathilde, et al. "Deep clustering for unsupervised learning of visual features." Proceedings of the European conference on computer vision (ECCV). 2018.

3. Prototypical classifier. 

    Snell, Jake, Kevin Swersky, and Richard Zemel. "Prototypical networks for few-shot learning." Advances in neural information processing systems 30 (2017).

4. Function of a projector in self-supervised learning. 

    Cui, Quan, et al. "Discriminability-transferability trade-off: An information-theoretic perspective." European Conference on Computer Vision. Cham: Springer Nature Switzerland, 2022.