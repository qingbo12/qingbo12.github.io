---
title: "Optimization Methods"
date: 2024-12-12T17:16:00+08:00
description: Notes of optimization methods
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: Optimization Methods"
    identifier: Miscellanea-optimization
    parent: Miscellanea
    weight: 10

hero: images/image-miscellanea.jpg
---

### Lagrangian relaxation

Lagrangian relaxation is a relaxation method which approximates a 
difficult problem of constrained optimization by a simpler problem.

The method penalizes violations of inequality constraints using a Lagrange 
multiplier, which imposes a cost on violations. These added costs are used 
instead of the strict inequality constraints in the optimization. In 
practice, this relaxed problem can often be solved more easily than the 
original problem.

**Mathematical description**

Suppose we are given a linear programming problem, with $ x \in R^n $ 
and $ A \in R^{m \times n} $, 
of the following form: 

$$
\begin{aligned}
\text{max} \quad & c^{\top} x \\\\
\text{s.t.} \quad & (1) A x \leq b
\end{aligned}
$$

We may introduce the constraint *(2)* into the objective:

$$
\begin{aligned}
\text{max} \quad & c^{\top} x + \lambda^{\top} (b - A x)
\end{aligned}
$$

If we let $ \lambda = (\lambda _{1},\ldots ,\lambda _{m_{2}}) $ be 
nonnegative weights, we get penalized if we violate the constraint *(1)*, 
and we are also rewarded if we satisfy the constraint strictly. The above 
system is called the Lagrangian relaxation of our original problem.

**The LR solution as a bound**

Of particular use is the property that for any fixed set of $ \vec{\lambda} \succeq \vec{0} $, values, the optimal result to the Lagrangian 
relaxation problem will be no smaller than the optimal result to the 
original problem. To see this, let $ \hat{x} $ be the optimal solution to 
the original problem, and let $ \bar{x} $ be the optimal solution to the 
Lagrangian relaxation. We can then see that 

$$
c^{\top} \hat{x} \leq c^{\top} \hat{x} + \vec{\lambda}^{\top} (b - A \hat
{x}) \leq c^{\top} \bar{x} + \vec{\lambda}^{\top} (b - A \bar{x})
$$

The first inequality is true because $ \hat {x} $ is feasible in the 
original problem and the second inequality is true because $ \bar {x} $ is 
the optimal solution to the Lagrangian relaxation.

**Iterating towards a solution of the original problem**

The above inequality tells us that if we minimize the maximum value we 
obtain from the relaxed problem, we obtain a tighter limit on the 
objective value of our original problem. Namely, if we find the minimum 
$ c^{\top} \bar{x} + \vec{\lambda}^{\top} (b - A \bar{x}) $, according to the above inequality, we have $ \hat{x} = \bar{x} $, and the optimal value for the original problem is found.
Thus we can address the original problem by instead exploring the 
partially dualized problem

$$
\text{min} \quad P(\lambda) \quad \text{s.t.} \quad \lambda \geq 0
$$

where we define $ P(\lambda) $ as 

$$
\begin{aligned}
\text{max} \quad & c^{\top} x + \lambda^{\top} (b - A x)
\end{aligned}
$$

A Lagrangian relaxation algorithm thus proceeds to explore the range of 
feasible $ \lambda $ values while seeking to minimize the result returned 
by the inner $ P $ problem. Each value returned by $ P $ is a candidate 
upper bound to the problem, the smallest of which is kept as the best 
upper bound.
If we additionally employ a **heuristic**, probably seeded by the 
$ \bar {x} $ 
values returned by $ P $, to find feasible solutions to the original 
problem, then we can iterate until the best upper bound and the cost of 
the best feasible solution converge to a desired tolerance.

**Gradient descent method**

0. Set $ k = 0 $ and choose $ \lambda_0 \in R^n $;
1. Compute $ P(\lambda_k) $ and a vector $ x_k \in X $ where it is achieved;
2. Calculate gradient $ g_k = A x_k − b $ of the function $ P $ at $ \lambda_k $;
3. If $ g_k = 0 $, then stop, the optimal solution is $ P(\lambda_k) $
4. Compute $ \lambda_{k+1} = \lambda_k +\theta^T_k g_k $ where $ \theta_k $ is the stepsize at this step.
5. Increment $ k $ and go to Step 2.
