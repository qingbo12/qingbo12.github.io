---
title: "WSPMax Read"
date: 2024-12-13T17:21:00+08:00
description: Read the paper WSPMax
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: WSPMax Read
    identifier: WPT-WSPMax
    parent: WPT
    weight: 10

hero: images/WPTscenario.gif
---

## Requirement-Driven Magnetic Beamforming for MIMO Wireless Power Transfer Optimization

### Motivation

1. For the general MIMO setup, MultiSpot **doesn't consider peak current/voltage constraints**. Yang et al. studied the magnetic beamforming problem in an MIMO MRC-WPT system to find all the boundary points of the multi-user power region with the peak current and voltage constraints for each TX. They simplified the problem by **ignoring the mutual inductance among RXs**.
2. These researches **lack the ability to control the power distribution among receivers**, and could not be applied to the scenario when different RXs have different requirements of power which can be denoted as weight factors.

### Contribution

1. We **formulate the requirement-driven magnetic beamforming design in the MIMO MRC-WPT system as a weighted sum-power maximization problem**. We **consider the peak current/voltage constraints**, and provides a high efficient, provable optimal solution.

2. We discuss the WSPMax problem with limited power budget where the peak current/voltage constraints are ignorable. We introduce a close-form theoretical bound of the WSPMax problem, and demonstrate that the power transfer efficiency maximization problem can be solved through TX-only solution without any feedback from the RXs, despite the fact that the beamforming is impacted by the interactions between TXs and RXs.

### Methods

**Proof of** $ \phi_s = - \lambda_{Y,s} $

$ \phi_s = \frac{\vec{x_s^{\ast}} X_2 \vec{x_s}}{\vec{x_s^{\ast}} X_1 \vec{x_s}} $, 
$ \vec{Y} = - X_1^{-1} X_2 $,
$ \lambda_s \vec{x_s} = \vec{Y} \vec{x_s} $.

$$
\begin{aligned}
\phi_s &= \frac{\vec{x_s^{\ast}} X_2 \vec{x_s}}{\vec{x_ s^{\ast}} X_1 \vec{x_s}} \\\\
&= \frac{\lambda_s \vec{x_s^{\ast}} X_2 \vec{x_s}}{\vec{x_s^{\ast}} X_1 \lambda_s \vec{x_s}} \\\\
&= \frac{\lambda_s \vec{x_s^{\ast}} X_2 \vec{x_s}}{\vec{x_s^{\ast}} X_1 \vec{Y} \vec{x_s}} \\\\
&= \frac{\lambda_s \vec{x_s^{\ast}} X_2 \vec{x_s}}{\vec{x_s^{\ast}} X_1 (- X_1^{-1} X_2) \vec{x_s}} \\\\
&= -\lambda_s
\end{aligned}
$$

**Proof of** $ \lambda_{\ddot{Y}, s} = - \frac{\lambda_{\ddot{Z}, s}}{\lambda_{\ddot{Z}, s} + 1}$

$ \lambda_{\ddot{Y}, s} \vec{x_s} = \vec{\ddot{Y}} \vec{x_s} $, 
$ \vec{\ddot{Y}} = - (R_T + H^* R_R H)^{−1} (H^* R_R H) $,
$ \lambda_{\ddot{Z}, s} \vec{x_s} = \vec{\ddot{Z}} \vec{x_s} $.

$$
\begin{aligned}
\lambda_{\ddot{Y}, s} \vec{x_s} = \vec{\ddot{Y}} \vec{x_s} \\\\
&\Rightarrow \lambda_{\ddot{Y}, s} \vec{x_s} = - (R_T + H^* R_ RH)^{−1} (H^* R_R H) \vec{x_s} \\\\
&\Rightarrow \lambda_{\ddot{Y}, s} (R_T + H^* R_R H) \vec{x_s} = - (H^* R_R H) \vec{x_s} \\\\
&\Rightarrow \lambda_{\ddot{Y}, s} R_T^{-1} (R_T + H^* R_R H) \vec{x_s} = - R_T^{-1} (H^* R_R H) \vec{x_s} \\\\
&\Rightarrow \lambda_{\ddot{Y}, s} (I + \ddot{Z}) \vec{x_s} = - \ddot{Z} \vec{x_s} \\\\
&\Rightarrow (\lambda_{\ddot{Y}, s} + 1) \ddot{Z} \vec{x_s} = - \lambda_{\ddot{Y}, s} \vec{x_s} \\\\
&\Rightarrow \ddot{Z} \vec{x_s} = - \frac{\lambda_{\ddot{Y}, s}}{(\lambda_{\ddot{Y}, s} + 1)} \vec{x_s} \\\\
\end{aligned}
$$

Hence, $ \lambda_{\ddot{Y}, s} = - \frac{\lambda_{\ddot{Z}, s}}{\lambda_{\ddot{Z}, s} + 1}$.

### Reflections

1. **Introduction**
    When discussing studies involving multiple TXs and/or multiple RXs, 
    the authors **could explain the rationale behind using MIMO**, such as 
    the efficiency of beamforming, rather than simply listing the three 
    types. Providing this context enhances the reader's understanding of the advantages and practical implications of MIMO systems.

2. **Methods**
    In solving the WSPMax problem with peak current/voltage constraints, 
    the authors **assumed that a controller exists for communication with 
    all TXs/RXs**. This provides a foundation for 
    designing the communication system in the furture work.

3. **Experiments**
    The merit of this study lies in the fact that the authors 
    not only evaluated the performance of their algorithm 
    **but also verified its convergence properties**.

    However, for the **performance evaluation**, the authors set $ w_q = 1 $
    for each $ RX_q $ **in a context unrelated to specific requirements**. 
    This approach might have been adopted due to the challenges 
    associated with assigning different weights to different $ RX $ instances.
