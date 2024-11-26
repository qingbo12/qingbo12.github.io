---
title: "Matrix Base"
date: 2024-11-20T16:02:00+08:00

author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: Matrix Base
    identifier: WPT-matrix
    parent: WPT
    weight: 10
---

## Determinant of Matrix Product

### Theorem

Let $ A, B $ be a square matrices of order n.

Let $ det(A) $ be the determinant of $ A $.

Let $ AB $ be the matrix product of $ A $ and $ B $.

Then:

$ det(AB) = det(A)det(B) $

### Proof

The proof I provide is based on [Determinant of Matrix Product](https://proofwiki.org/wiki/Determinant_of_Matrix_Product)

Consider two cases:

1. $ A $ is singular.

2. $ A $ is nonsingular.

**proof of case1**

Assume $ A $ is singular.

Then:

$$ det(A) = 0 $$

**Also if A is singular then so is AB.**

Indeed, if $ AB $ has an inverse $ C $, then:

$$ ABC = E $$

whereby $ BC $ is a right inverse of $ A $.

It follows by Left or Right Inverse of Matrix is Inverse that in that case $ BC $ is the inverse of $ A $. This contradicts the assumption.

It follows that:

$$ det(AB)=0 $$

Thus:

$$ 0 = 0 \times det(B) $$

that is:

$$ det(AB) = 0 = det(A)det(B) $$

**proof of case2**

Assume $ A $ is nonsingular.

Then $ A $ is a product of elementary row matrices,  $E $.

Let $ A=E_kE_{k−1}⋯E_1 $.

So:

$$ det(AB) = det(E_kE_{k−1}⋯E_1B) $$

It remains to be shown that for any square matrix $ D $ of order n:

$$ det(ED) = det(E) det(D) $$

$ det(ED) = -|D| = det(E) det(D) $ for swap 2 rows

$ det(ED) = k|D| = det(E) det(D) $ for apply k to 1 row

$ det(ED) = |D| = det(E) det(D) $ for row(i) + k x row(j)

Then:

$ det(AB) = det(E_kE_{k−1}⋯E_1B) $

$ det(AB) = det(E_k) det(E_{k−1}⋯E_1(B)) $

$ det(AB) = αdet(B) $

and:

$ det(A) = det(E_kE_{k−1}⋯E_1I) $

$ = det(E_kE_{k−1}⋯E_1(I)) $

$ = αdet(I) $

Therefore:

$ det(AB)=det(A)det(B) $


## Real Symmetric Matrix

### Theorem: all real eigenvalues

If $ A $ is a (real) $ n \times n $ symmetric matrix, then $ A $ has n real eigenvalues (counted bytheir multiplicities). For each eigenvalue, we can find a real eigenvector associated with it.

### Proof

The proof I provide is based on [Orthogonally Diagonalizable Matrices](https://www.math.wustl.edu/~freiwald/309orthogdiag.pdf)

![proofofrealEigenvalues](images/realEigenvalues.png)

### Theorem: orthogonally diagonalizable

A real symmetric matrix must be orthogonally diagonalizable.

### Proof 

The proof I provide is based on [Orthogonally Diagonalizable Matrices](https://www.math.wustl.edu/~freiwald/309orthogdiag.pdf)

This is a proof by induction, and it uses some simple facts about partitioned matrices and change of coordinates.

This is obviously true for every $ 1 \times 1 $ matrix $ A $ if $ A = [a] $, then 
$ E_1^{-1} (a) E_1 = (a) $

Assume now that every $ (n - 1) \times (n - 1) $ real symmetric matrix is orthogonally diagonalizable.

Consider an $ n \times n $ real symmetric matrix $ A $ where $ n \gt 1 $. By the preceding theorem, we can find a real eigenvalue $ \lambda $ of $ A $, together with a real eigenvector $ v_1 $. By normalizing, we can assume 
$ v_1 $ is a unit eigenvector. Add vectors to extend 
$ (v_1) $ to a basis for 
$ R^n $ and then use the Gram Schmidt process to get an orthonormal basis for 
$ R^n $: 
$ (v_1, v_2, ..., v_n) $. 

Let

$ T_1 = (v_1, v_2, ..., v_n) $.

$ T_1 $ is orthogonal.

Now look that

$$ T_1^{-1} A T_1 = T_1^{-1} (A v_1, A v_2, ..., A v_n) $$

$$ T_1^{-1} A T_1 = (T_1^{-1} \lambda_1 v_1, T_1^{-1} A v_2, ..., T_1^{-1} A v_n) $$

Because $ T_1^{-1} T_1 = E $, we have

$$ T_1^{-1} (v_1, v_2, ..., v_n) = (\epsilon_1, \epsilon_2, ..., \epsilon_n) $$

Thus, $ T_1^{-1} v_1 = \epsilon_1 $, So column 1 of
$ T_1^{-1} A T_1 $ is 
$ \lambda_1 \epsilon_1 $. Suppose now that

$$
T_1^{-1} A T_1 = 
\begin{pmatrix}
   \lambda_1 & \alpha \\\\
   \mathbf{0} & \beta
\end{pmatrix}
$$

$ T_1^{-1} A T_1 $ is symmetric, because

$$
(T_1^{-1} A T_1)^{\top} = (T_1^{\top} A T_1)^{\top} = 
T_1^{\top} A^{\top} T_1^{\top \top} = T_1^{\top} A T_1 = 
T_1^{-1} A T_1
$$

So $ \alpha = \mathbf{0} $, and 
$ \beta $ is a real symmetric matrix. By the induction hypothesis, $ \beta $ is diagonalizable. Thus, 
we has $ T_2 $ such that

$$
T_2^{-1} \beta T_2 = diag\\{\lambda_2, \lambda_3, ..., \lambda_n\\}
$$

Let 

$$
T = T_1 
\begin{pmatrix}
   1 & \mathbf{0} \\\\
   \mathbf{0} & T_2
\end{pmatrix}
$$

$$
T^{-1} A T = 
\begin{pmatrix}
   1 & \mathbf{0} \\\\
   \mathbf{0} & T_2
\end{pmatrix}^{-1}
T_1^{-1} A T_1 
\begin{pmatrix}
   1 & \mathbf{0} \\\\
   \mathbf{0} & T_2
\end{pmatrix}
$$

$$
T^{-1} A T = 
\begin{pmatrix}
   1 & \mathbf{0} \\\\
   \mathbf{0} & T_2^{-1}
\end{pmatrix}
\begin{pmatrix}
   \lambda_1 & \mathbf{0} \\\\
   \mathbf{0} & \beta
\end{pmatrix}
\begin{pmatrix}
   1 & \mathbf{0} \\\\
   \mathbf{0} & T_2
\end{pmatrix}
$$

$$
T^{-1} A T = 
\begin{pmatrix}
   \lambda_1 & \mathbf{0} \\\\
   \mathbf{0} & T_2^{-1} \beta T_2
\end{pmatrix}
$$

$$
T^{-1} A T = diag\\{\lambda_1, \lambda_2, ..., \lambda_n\\}
$$

Therefore, a real symmetric matrix must be orthogonally diagonalizable.

### Theorem: r-fold root, $ A - \lambda E $ has a rank of $ n - r $ 

If $ A $ is a real symmetric matrix of order n. $ \lambda $ is an r-fold root of its characteristic polynomial

Then the matrix $ A - \lambda E $ has a rank of $ n - r $. This implies that there are exactly $ r $ linearly independent eigenvectors associated with the eigenvalue $ \lambda $.

### Proof


The proof I provide is based on [Yiwen's Zhihu Answer](https://www.zhihu.com/question/462622563/answer/1918454726)

Suppose that $ A's $ r -fold root is $ \lambda_k $.

Because $ A $ is real symmetric matrix, so we have orthogonal matrix $ P $ such that:

$$
P^{-1} A P = 
\begin{pmatrix}
   \lambda_1 & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & \lambda_2 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & \blue{\lambda_{k}} & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & 0 & 0 & 0 & 0 & \blue{\lambda_{k}} & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & 0 & 0 & 0 & 0 & 0 & \blue{\lambda_{k}} & \cdots & 0 & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & \blue{\lambda_{k}} & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & \lambda_n
\end{pmatrix}
$$

We don't care whether $ \lambda_i $ is 0 or not.

For matrix $ A - \lambda_k E $, we have:

$$
P^{-1} (A - \lambda_k E) P = P^{-1} A P - \lambda_k P^{-1} E P = 
$$

$$
\varLambda - \lambda_k E = 
\begin{pmatrix}
   \lambda_1 - \blue{\lambda_{k}} & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & \lambda_2 - \blue{\lambda_{k}} & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & \blue{0} & 0 & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & 0 & 0 & 0 & 0 & \blue{0} & 0 & \cdots & 0 & \cdots & 0 \\\\
   0 & 0 & 0 & 0 & 0 & 0 & \blue{0} & \cdots & 0 & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & \blue{0} & \cdots & 0 \\\\
   \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \cdots & \vdots & \vdots & \vdots \\\\
   0 & 0 & 0 & 0 & 0 & 0 & 0 & \cdots & 0 & \cdots & \lambda_n - \blue{\lambda_{k}}
\end{pmatrix}
$$

$\because \lambda_i \neq \lambda_k \Rightarrow \lambda_i - \lambda_k \neq 0, (i \neq k) $

$ \therefore rank(A - \lambda_k E) = rank(\varLambda - \lambda_k E) = n - r $

## Vector spaces associated with a matrix or linear transformation

$ A \in M_{m,n}(\mathbf{F}) $ as a linear transformation $ x \rightarrow Ax $ from $ F^n $ to $ F^m $.
The domain of this linear transformation is $ F^n $; its range is 
$ range A = \\{y \in F^m : y =Ax \\} $ for some $ x \in F^n $; 
its null space is $ nullspace A = {x \in F^n : Ax = 0} $. The range of
$ A $ is a subspace of $ F^m $, and the null space of $ A $ is a 
subspace of $ F^n $. The dimension of $ nullspace A $ is denoted by 
$ nullity A $; the dimension of $ range A $ is denoted by $ rank A $.

### The dimension of $ range A $ is denoted by $ rank A $

The proof I provide is based on [rank-of-matrix-equals-dimension-of-range](https://math.stackexchange.com/a/3540031)

Suppose that we are given that the $ A \in M_{m, n}(\mathbf{F}) $ 
has column-rank (and therefore coincident row-rank) $ r $. 
That is, the maximal set of linearly independent columns of $ A $ 
contains $ r $ vectors. It follows that the span of the columns of $ A $, 
henceforth the column space of $ A $, is an r-dimensional subspace 
of $ R^m $.

Each column of $ A $ is a vector with $ m $ entries, 
so the columns live in $ F^m $. If $ n \gt m $, These columns 
must be dependent, so their dimension $ r \leq m $. Hence, the column space of $ A $ is a subspace of 
$ F^m $.

Let $ a_1, \cdots, a_n $ denote the columns of $ A $. Consider an 
arbitrary element $ y $ inside the column space of $ A $. By definition, 
this mean that there exist coefficients $ x_1, \cdots, x_n $ such that

$$
y = a_1 x_1 + a_2 x_2 + \cdots + a_n x_n
$$

Note that we can rewrite the above sum as a product. In particular, 
we have

$$
y = 
\begin{pmatrix}
   a_1 & a_2 & \cdots & a_n
\end{pmatrix}

\begin{pmatrix}
   x_1 \\\\ x_2 \\\\ \vdots \\\\ x_n
\end{pmatrix}

= A x
$$

where $ x = (x_1, x_2, \cdots, x_n)^{\top} \in R^n $. So, any element 
$ y $ from the column space of $ A $ is also an element of 
the range of $ A $. 

So the dimension of $ range A $ is denoted by $ rank A $.

### Theorem: rank-nullity theorem

For $ A \in M_{m, n}(\mathbf{F}) $, we have:

$$
rank(A) + nullity(A) = n
$$

### Proof

The proof I provide is based on [The Rank-Nullity Theorem](https://www.math.purdue.edu/files/academic/courses/2010spring/MA26200/4-9.pdf).

If $ rank(A) = n $, then by the Invertible Matrix Theorem, the only solution to $ Ax = 0 $ is the trivial solution $ x = 0 $. Hence, in this case, $ nullspace(A) = {0} $, so $ nullity(A) = 0 $ and Equation holds.

Now suppose $ rank(A) = r \lt n $. In this case, there are $ n − r > 0 $ free variables in the solution to $ Ax = 0 $. Let $ t_{1}, t_{2},...,t_{n−r} $ denote these free variables (chosen as those variables not attached to a leading one in any row-echelon form of $ A $), and let $ x_1, x_2,..., x_{n−r} $ denote the solutions obtained by sequentially setting each free variable to 1 and the remaining free variables to zero. Note that $ \\{ x_1, x_2,..., x_{n−r} \\} $ is linearly independent. Moreover, every solution to $ Ax = 0 $ is a linear combination of $ x_1, x_2,..., x_{n−r} $:

$$
x = t_1x_1 + t_2x_2 +···+ t_{n−r}x_{n−r},
$$

which shows that $ \\{ x_1, x_2,..., x_{n−r} \\} $ spans $nullspace(A) $. Thus, $ \\{ x_1, x_2,..., x_{n−r} \\} $ is a basis for nullspace(A), so $ nullity(A) = n − r $ and Equation holds. 