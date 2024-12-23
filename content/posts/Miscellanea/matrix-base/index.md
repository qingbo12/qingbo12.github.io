---
title: "Matrix Base"
date: 2024-11-20T16:02:00+08:00
description: Notes of matrix learning
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: Matrix Base
    identifier: Miscellanea-matrix
    parent: Miscellanea
    weight: 10

hero: images/image-miscellanea.jpg
---

## Determinant

### Theorem: $ det(AB) = det(A)det(B) $

Let $ A, B $ be a square matrices of order n.

Let $ det(A) $ be the determinant of $ A $.

Let $ AB $ be the matrix product of $ A $ and $ B $.

Then:

$ det(AB) = det(A)det(B) $

**Proof**

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

**Proof**

The proof I provide is based on [Orthogonally Diagonalizable Matrices](https://www.math.wustl.edu/~freiwald/309orthogdiag.pdf)

![proofofrealEigenvalues](images/realEigenvalues.png)

### Theorem: orthogonally diagonalizable

A real symmetric matrix must be orthogonally diagonalizable.

**Proof** 

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

**Proof**


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

## Vector spaces

$ A \in M_{m,n}(\mathbf{F}) $ as a linear transformation $ x \rightarrow Ax $ from $ F^n $ to $ F^m $.
The domain of this linear transformation is $ F^n $; its range is 
$ range A = \\{y \in F^m : y =Ax \\} $ for some $ x \in F^n $; 
its null space is $ nullspace A = {x \in F^n : Ax = 0} $. The range of
$ A $ is a subspace of $ F^m $, and the null space of $ A $ is a 
subspace of $ F^n $. The dimension of $ nullspace A $ is denoted by 
$ nullity A $; the dimension of $ range A $ is denoted by $ rank A $.

> To avoid ambiguities,<br>
> The range of a linear transformation can be denoted as $ \operatorname{range} A $, $ \operatorname{im} A $.<br>
> The dimension of the range of a linear transformation can be denoted as $ \operatorname{rank} A $.<br>
> The null space of a linear transformation can be denoted as $ \operatorname{nullspace} A $, $ \operatorname{ker} A $.<br>
> The dimension of the null space of a linear transformation can be denoted as $ \operatorname{nullity} A $.

### The dimension of $ \operatorname{range} A $ is denoted by $ \operatorname{rank} A $

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

### Rank-nullity theorem

#### Matrices

For $ A \in M_{m, n}(\mathbf{F}) $, we have:

$$
rank(A) + nullity(A) = n
$$

**Proof**

The proof I provide is based on [The Rank-Nullity Theorem](https://www.math.purdue.edu/files/academic/courses/2010spring/MA26200/4-9.pdf).

If $ rank(A) = n $, then by the Invertible Matrix Theorem, the only solution to $ Ax = 0 $ is the trivial solution $ x = 0 $. Hence, in this case, $ nullspace(A) = {0} $, so $ nullity(A) = 0 $ and Equation holds.

Now suppose $ rank(A) = r \lt n $. In this case, there are $ n − r > 0 $ free variables in the solution to $ Ax = 0 $. Let $ t_{1}, t_{2},...,t_{n−r} $ denote these free variables (chosen as those variables not attached to a leading one in any row-echelon form of $ A $), and let $ x_1, x_2,..., x_{n−r} $ denote the solutions obtained by sequentially setting each free variable to 1 and the remaining free variables to zero. Note that $ \\{ x_1, x_2,..., x_{n−r} \\} $ is linearly independent. Moreover, every solution to $ Ax = 0 $ is a linear combination of $ x_1, x_2,..., x_{n−r} $:

$$
x = t_1x_1 + t_2x_2 +···+ t_{n−r}x_{n−r},
$$

which shows that $ \\{ x_1, x_2,..., x_{n−r} \\} $ spans $nullspace(A) $. Thus, $ \\{ x_1, x_2,..., x_{n−r} \\} $ is a basis for nullspace(A), so $ nullity(A) = n − r $ and Equation holds. 

#### Linear transformations

Let $ T:V \rightarrow W $ be a linear transformation between 
two vector spaces where $ T $ 's domain $ V $ is finite 
dimensional. Then 

$$
rank(T) + nullity(T) = dim V
$$

**Proof**

The proof I provide is based on [Rank–nullity theorem](https://en.wikipedia.org/wiki/Rank%E2%80%93nullity_theorem#First_proof).

Let $ V, W $ be vector spaces over some field $ F $, and $ T $ defined as in the statement of the theorem with $ \dim V = n $.

As $ \operatorname{Ker}T \subset V $ is a subspace, 
there exists a basis for it. Suppose 
$ \dim\operatorname{Ker}T = k $ and let 
$ \mathcal{K} := \\{v_1, \ldots, v_k\\} \subset 
\operatorname{Ker}(T) $ be such a basis.

We may now, by the Steinitz exchange lemma, extend 
$ \mathcal{K} $ with $ n-k $ linearly independent vectors 
$ w_1, \ldots, w_{n-k} $ to form a full basis of $ V $.

Let

$
\mathcal{S} := \\{w_1, \ldots, w_{n-k}\\} \subset 
V \setminus \operatorname{Ker}(T)
$

such that

$
\mathcal{B} := \mathcal{K} \cup \mathcal{S} = 
\\{v_1, \ldots, v_k, w_1, \ldots, w_{n-k}\\} \subset V
$

is a basis for $ V $.
From this, we know that

$$
\operatorname{Im} T = \operatorname{Span}T(\mathcal{B}) = 
\operatorname{Span}\\{T(v_1), \ldots, T(v_k), 
T(w_1), \ldots, T(w_{n-k})\\} = 
\operatorname{Span}\{T(w_1), \ldots, T(w_{n-k})\} = 
\operatorname{Span}T(\mathcal{S}). 
$$

We now claim that $ T(\mathcal{S}) $ is a basis for 
$ \operatorname{Im} T $. The above equality already 
states that $ T(\mathcal{S}) $ is a generating set 
for $ \operatorname{Im} T $; 
it remains to be shown that it is also linearly independent 
to conclude that it is a basis.

Suppose $ T(\mathcal{S}) $ is not linearly independent, 
and let

$ \sum_{j=1}^{n-k} \alpha _j T(w_j) = 0_W $

for some $ \alpha _j \in F $.

Thus, owing to the linearity of $ T $, it follows that

$$
T \left(\sum_{j=1}^{n-k} \alpha_j w_j \right) = 0_W 
\implies \left(\sum_{j=1}^{n-k} \alpha_j w_j \right) 
\in \operatorname{Ker} T = \operatorname{Span} \mathcal{K} 
\subset V.
$$

This is a contradiction to $ \mathcal{B} $ being a basis, 
unless all $ \alpha _j $ are equal to zero. 
This shows that $ T(\mathcal{S}) $ is linearly independent, 
and more specifically that it is a basis for 
$ \operatorname{Im}T $.

To summarize, we have $ \mathcal{K} $, a basis for 
$ \operatorname{Ker}T $, and $ T(\mathcal{S}) $, 
a basis for $ \operatorname{Im}T $.

Finally we may state that

$$
\operatorname{Rank}(T) + \operatorname{Nullity}(T) = 
\dim \operatorname{Im} T + \dim \operatorname{Ker}T = 
|T(\mathcal{S})| + |\mathcal{K}| = 
(n-k) + k = n = \dim V . 
$$

This concludes our proof.

#### Application: $ \dim C(AB) = \dim C(B) - \dim ( \operatorname{nullspace} (A) \cap C(B)) $

The application I provide is based on [$ \dim C(AB) = \dim C(B) - \dim ( \operatorname{nullspace} (A) \cap C(B)) $](https://math.stackexchange.com/a/1155035)

considering the map $ T: C(B) \rightarrow C(AB) $ given by 
$ T(y) = Ay $, for all $ y \in C(B) $.

the kernel of $ T $ is $ \operatorname{nullspace} (A) \cap C(B) $. 
Indeed, $ y \in \operatorname{Ker} (T) $ if and only if 
$ y \in C(B) $ and $ A y = 0 $, if and only if 
$ y \in \operatorname{nullspace} (A) \cap C(B) $.

Now use the rank-nullity theorem, we have

$$
\operatorname{Rank}(T) + \operatorname{Nullity}(T) = 
\dim C(AB) + \dim (\operatorname{nullspace} (A) \cap C(B)) = 
\dim C(B) = 
\dim V.
$$

$$
\dim C(AB) = \dim C(B) - \dim (\operatorname{nullspace} (A) \cap C(B))
$$

## Rank

### Sylvester inequality

If $ A \in M_{m,k} (F) $ and $ B \in M_{k,n} (F) $, then

$$
(rank A  + rank B) - k \leq rank (AB)
$$

**Proof**

The proof I provide is based on [Prove Sylvester rank inequality](https://math.stackexchange.com/a/269622).

If we prove that $ dim ker A + dim ker B \geq dim ker (AB) $. 
By using the rank-nullity theorem, we can then deduce 
that $ (rank A  + rank B) - k \leq rank (AB) $.

Firstly, we show that $ kerB \subseteq ker(AB) $.

Any $ x \in kerB $, we have:

$$ B x = 0 $$

Now, applying the matrix $ A $ to both sides of this equation:

$$ A B x = A 0 = 0 \Rightarrow x \in ker(AB) $$

Thus $ kerB \subseteq ker(AB) $. 

Then we show that $ dim ker A + dim ker B \geq dim ker (AB) $.

Let $ \beta = \\{\alpha_1,…,\alpha_r\\} $ be a basis for $ kerB $.
Because $ kerB \subseteq ker(AB) $, so we can extend $ \beta $ to 
a basis for $ ker(AB) $. Suppose $ \\{\alpha_1, \cdots, \alpha_r, 
\alpha_{r+1}, \cdots, \alpha_n \\} $ be basis for $ ker(AB) $. Since 
$ \alpha_{i + 1}, \cdots, \alpha_n \notin kerB $, we have that 
$ B \alpha_i \neq 0 $ for $ i \in \\{ r \lt i \lt n + 1 \\} $.

We show that $ \\{B \alpha_{r+1}, \cdots, B \alpha_n \\} $ is 
linear independent. If we can show that, then we would have $ dim ker A \geq n - r $. 
(Note: $ dim ker A \neq dim ker (AB) $, Because $ B \alpha_i = 0 $, for $ i \in \\{ 1 \leq i \leq r \\} $, 
if we add $ B \alpha_1 $ to $ \\{B \alpha_{r+1}, \cdots, B \alpha_n \\} $, 
we would have $ \\{ B \alpha_1, B \alpha_{r+1}, \cdots, B \alpha_n \\} $ is linear dependent. 
So we could only say $ dim ker A \geq n - r $.)

Assume that there exist scalars $ \lambda_1, \cdots, \lambda_n $, 
not all zero, such that $ \sum_{i = r + 1}^n \lambda_i B \alpha_i = 0 $. 
Since $ B $ is linear, we have $ B \sum_{i = r + 1}^n \lambda_i \alpha_i = 0 $, 
so that $ \sum_{i = r + 1}^n \lambda_i \alpha_i $ belongs to the kernel 
of $ B $. On other hand, we already know that $ \beta = \\{\alpha_1,…,\alpha_r\\} $ be a basis for $ kerB $. 
Next since the set $ \\{\alpha_1, \cdots, \alpha_r, \alpha_{r+1}, \cdots, 
\alpha_n \\} $ is an independent set, we infer that $ \lambda_i $ must be 
zero for all $ i = r + 1, \cdots, n $.

Now one can see that

$$
dim ker A + dim ker B \geq n - r + r = n \Rightarrow dim ker A + dim ker B \geq dim ker (AB)
$$

Using the rank-nullity theorem, we have

$$
k - rank A + n - rank B \geq n - rank (AB) \Rightarrow (rank A + rank B) - k \leq rank (AB)
$$

### Frobenius inequality

Let $ A \in M_{m \times k}(\bf F) $, 
$ B \in M_{k \times p}(\bf F) $ and $ C \in M_{p \times n}(\bf F) $, 
then $ \operatorname{rank}(AB) + \operatorname{rank}(BC) \leq 
\operatorname{rank}(B) + \operatorname{rank}(ABC) $

**Proof**

The proof I provide is based on [Frobenius rank inequality](https://math.stackexchange.com/a/1191064).

We can use the rank-nullity theorem to show that

$$
\tag{1}
\operatorname{rank}(AB) = \operatorname{rank}(B) - 
\dim (\operatorname{im}(B) \cap \operatorname{ker} (A))
$$

Since $ \operatorname{im}(BC) \subseteq \operatorname{im}(B) $,
we have

$$
\tag{2}
\operatorname{im}(BC) \cap \operatorname{ker}(A) \subseteq 
\operatorname{im}(B) \cap \operatorname{ker}(A)
$$

Now we want to write $ \operatorname{rank}(ABC) $ 
in such a way that $ \operatorname{im}(BC) \cap 
\operatorname{ker}(A) $ pops up, so we could make use of *(2)*. 
Analogously to *(1)*:

$$
\tag{3}
\operatorname{rank} (ABC) = \operatorname{rank} (BC) - 
\dim (\operatorname{im} (BC) \cap \operatorname{ker} (A))
$$

From *(1)* and *(3)*, we have

$$
\operatorname{rank}(AB) + \operatorname{rank}(BC) = 
\operatorname{rank}(B) + \operatorname{rank}(ABC) + 
\underbrace{
\dim (\operatorname{im} (BC) \cap \operatorname{ker} (A)) - 
\dim (\operatorname{im}(B) \cap \operatorname{ker} (A))
}_{\leq 0 \text{ due to (2)}}
$$

which implies the desired inequality.

### Left or right multiplication by a nonsingular matrix leaves rank unchanged

If $ A \in M_m(\bf F) $ and $ C \in M_n(\bf F) $ are 
nonsingular and $ B \in M_{m,n}(\bf F) $, then $ \operatorname{rank} AB =
\operatorname{rank} B = \operatorname{rank} BC = 
\operatorname{rank} ABC $; that is, 
left or right multiplication by a nonsingular matrix leaves 
rank unchanged.

**Proof**

Firstly, we show that $ \operatorname{rank} (B) = 
\operatorname{rank} (BC) $.

The proof is based on [How to prove that $ \operatorname{im}(B) = \operatorname{im}(BA)$?](https://math.stackexchange.com/a/3797397).

We know that $ C $ is a linear transformation from 
$ \bf F^n $ to $ \operatorname{im} (C) $. Since $ C $ is 
nonsingular, it follows that $ C $ is onto, 
implying $ \operatorname{im} (C) = \bf F^n $. 

Now consider the linear transformation $ BC $. 
This composition can be viewed in two stages:

1. The transformation $ x \rightarrow Cx $, where 
$ C: \bf F^n \rightarrow \bf F^n $.

2. The transformation $ Cx \rightarrow BCx $, where $ B: 
\bf F^n $ to $ \operatorname{im} (BC) $.

$ Cx $ spans all of $ \bf F^n $, which aligns with the domain 
of $ B $. Thus, the transformation $ Cx \rightarrow BCx $ 
behaves exactly as $ B $, mapping $ \bf F^n $ to 
$ \operatorname{im} (B) $.

Hence, $ \operatorname{im} (BC) = \operatorname{im} (B) $.

This concludes our proof.

Then we show that $ \operatorname{rank} (AB) = 
\operatorname{rank} (B) $.

We know that $ A $ is a linear transformation from $ \bf F^m $ 
to $ \operatorname{im} (A) $. Since $ A $ is nonsingular, 
it follows that $ A $ is onto, meaning 
$ \operatorname{im} (A) = \bf F^m $. Furthermore, because 
$ \dim(\operatorname{im}(A)) = \dim(\operatorname{domain}(A)) = m $, 
$ A $ is injective as well.

Now consider the linear transformation $ AB $. 
This composition can be viewed in two stages:

1. The transformation $ x \rightarrow Bx $, where $ B: \bf F^n 
\rightarrow \operatorname{im} (B) $. 

2. Then $ Bx \rightarrow ABx $, where $ A: 
\operatorname{im} (B) $ to $ \operatorname{im} (AB) $. 

Since A is injective, $ \dim (\operatorname{im} (AB)) = 
\dim (\operatorname{im} (B)) $. 

This concludes our proof.

### If $ A \in M_{m,n}(\bf C) $, then $ \operatorname{rank} A^* A = \operatorname{rank} A $

**Proof**

The proof I provide is based on [Prove $\operatorname{rank}A^TA=\operatorname{rank}A$](https://math.stackexchange.com/q/349966).

Let $ x \in \operatorname{nullspace} (A) $.

$$
A x = 0
$$
$$
\Rightarrow A^* A x = 0
$$
$$
\Rightarrow x \in \operatorname{nullspace} (A^* A)
$$

Hence, $ \operatorname{nullspace} (A) \subseteq \operatorname{nullspace} (A^* A) $.

Agian let $ x \in \operatorname{nullspace} (A^* A) $.

$$
A^* A x = 0
$$
$$
\Rightarrow x^* A^* A x = 0
$$
$$
\Rightarrow (A x)^* A x = 0
$$
$$
\Rightarrow A x = 0
$$
$$
\Rightarrow x \in \operatorname{nullspace} (A)
$$

Hence, $ \operatorname{nullspace} (A^* A) \subseteq \operatorname{nullspace} (A) $.

Therefore, 
$$
\operatorname{nullspace} (A) = \operatorname{nullspace} (A^* A) 
$$
$$
\dim (\operatorname{nullspace} (A)) = \dim (\operatorname{nullspace} (A^* A))
$$
$$
\dim (\operatorname{domain} (A)) - \operatorname{rank} (A) = \dim (\operatorname{domain} (A^* A)) - \operatorname{rank} (A^* A)
$$
$$
\operatorname{rank} (A) = \operatorname{rank} (A^* A)
$$

### CR Factorization

Let $ A \in M_{m,n}(\bf F) $, $ \operatorname{rank} (A) = r $. 
Suppose $ C $ contains the first $ r $ independent columns of $ A $. 
Suppose $ R $ contains the $ r $ nonzero rows of $ \operatorname{rref} (A) $. 
Then $ A = C R $.

Now suppose the matrix $ B $ contains the first $ r $ independent rows of $ A $. 
$ W $ is the $ r $ by $ r $ matrix where $ C $ meets $ B $. Then $ A = C W^{-1} B $.

The establishment I provided is based on [LU and CR Elimination](https://math.mit.edu/~gs/everyone/lucrweb.pdf).

**Establish $ A = C R $**

Here are the steps to establish $ A = C R $. We know that an invertible 
elimination matrix $ E $ (a product of simple steps) gives 
$ E A = R_0 = \operatorname{rref} (A) $. Then $ A = E^{-1} R_0 $. 
Drop the $ m - r $ zero rows of $ R_0 $ and the last $ m - r $ columns 
of $ E^{-1} $. This leaves $ A = C \begin{bmatrix} I & F \end{bmatrix} P $, 
where the identity matrix in $ R $ allows us to identify $ C $ in the 
columns of $ E^{-1} $.

**Establish $ A = C W^{-1} B $**

Suppose the $ r $ independent columns of $ A $ in the first $ r $ columns, 
and there are $ r $ independent rows of $ A $ in the first $ r $ rows.

Let $ A = \begin{bmatrix} W & H \\\\ J & K \end{bmatrix} $, 
$ C = \begin{bmatrix} W \\\\ J \end{bmatrix} $, 
$ B = \begin{bmatrix} W & H \end{bmatrix} $.

Combinations $ V $ of the rows of $ B $ must produce the dependent rows in 
$ \begin{bmatrix} J & K \end{bmatrix} $. 
Then $ \begin{bmatrix} J & K \end{bmatrix} = V B = \begin{bmatrix} V W & V H \end{bmatrix} $. 
And $ C = \begin{bmatrix} I \\\\ V \end{bmatrix} W $.

Combinations $ T $ of the columns of $ A $ must produce the dependent columns in 
$ \begin{bmatrix} H \\\\ K \end{bmatrix} $. 
Then $ \begin{bmatrix} H \\\\ K \end{bmatrix} = C T = \begin{bmatrix} W T \\\\ J T \end{bmatrix} $. 
And $ B = W \begin{bmatrix} I & T \end{bmatrix} $.

$$
A = 
\begin{bmatrix} W & H \\\\ J & K \end{bmatrix} = 
\begin{bmatrix} W & H \\\\ VW & VH \end{bmatrix} = 
\begin{bmatrix} W & WT \\\\ VW & VWT \end{bmatrix} = 
\begin{bmatrix} I \\\\ V \end{bmatrix} \begin{bmatrix} W \end{bmatrix} \begin{bmatrix} I & T \end{bmatrix} = 
C W^{-1} B
$$

### Wedderburn's rank-one reduction formula

Let $ A \in M_{m,n}(\bf F) $. If $ x \in \bf F^n $ and $ y \in \bf F^m $, and if 

$$
\omega = y^{\top} A x \neq 0.
$$

Then 

$$
\operatorname{rank} (A - \omega^{-1} A x y^{\top} A ) = 
\operatorname{rank} (A) - 1.
$$

In general, if $ X \in M_{n,k} (\bf F) $ and $ Y \in M_{m,k} (\bf F) $, 
and if 

$$ W = Y^{\top} A X $$

is nonsingular, then

$$
\operatorname{rank} (A - A X W^{-1} Y^{\top} A) = 
\operatorname{rank} A - k
$$

**Proof**

The proof I provide is based on [Generalized Wedderburn Rank Reduction](https://arxiv.org/pdf/2406.03992).

**Proof of rank-one reduction formula**

For any $ v $ in $ \operatorname{nullspace} (A) $,
$$
A v = 0 \Rightarrow (A - \omega^{-1} A x y^{\top} A) v = 0
$$

Hence, $ \operatorname{nullspace} (A) 
\subseteq \operatorname{nullspace} (A - \omega^{-1} A x y^{\top} A) $.

Since $ \omega = y^{\top} A x \neq 0 \Rightarrow A x \neq 0 \Rightarrow 
x \notin \operatorname{nullspace} (A) $, but 

$$ (A - \omega^{-1} A x y^{\top} A) x = (A - A) = 0 
\Rightarrow x \in \operatorname{nullspace} (A - \omega^{-1} A x y^{\top} A) .
$$

Hence, $ \operatorname{nullity} (A - \omega^{-1} A x y^{\top} A) - 1 \geq \operatorname{nullity} (A) $.
Also, $ \dim (\operatorname{domain} (A)) = \dim (\operatorname{domain} (A - \omega^{-1} A x y^{\top} A)) $.

Therefore

$$
\operatorname{rank} (A - \omega^{-1} A x y^{\top} A) \leq 
\operatorname{rank} (A) - 1.
$$

Assume now $ (A - \omega^{-1} A x y^{\top} A) u = 0 $. Let 
$ \lambda = \omega^{-1} y^{\top} A u $. then

$$ A (u - \lambda x) = 0 $$

hence $ u \in \operatorname{nullspace} (A) + \bf F x $. Therefore

$$
\operatorname{rank} (A - \omega^{-1} A x y^{\top} A) = 
\operatorname{rank} (A) - 1.
$$

Note that:

$ A x $: A vector in the column space of $ A $.

$ y^{\top} A $: A row vector in the row space of $ A $.

$ (Ax)(y^{\top} A) $: A rank-1 matrix since it's the outer product of 
a vector $ (A x) $ and a row vector $ (y^{\top} A) $.

Thus, the term $ A x y^{\top} A $ represents a modification to $ A $ 
in the direction of a rank-1 update.

**Proof of general formula**

The proof is similar. 

Since $ \operatorname{rank} (M) = k $, the $ k $ columns of $ X $ 
are linearly independent, and $ A X \in \bf F^{m \times k} $ is of rank 
$ k $, so no linear combination of columns of $ X $ is contained 
in the nullspace of $ A $. But we have

$$ ( A - A X M^{-1} Y^{\top} A ) X = 0 .$$

We know that $ \operatorname{nullspace} (A) \subseteq \operatorname{nullspace} 
(A - A X M^{-1} Y^{\top} A) $, so

$$
\operatorname{rank} (A - A X M^{-1} Y^{\top} A) = 
n - \dim(\operatorname{nullspace} (A - A X M^{-1} Y^{\top} A)) \leq
n - ((n - \operatorname{rank} (A)) + k) =
\operatorname{rank} (A) - k.
$$

Let $ U \in M_{n \times k} (\bf F) $ be any matrix such that

$$ 
\operatorname{rank} (A - A X M^{-1} Y^{\top} A) U = 0.
$$

Let $ \Lambda = M^{-1} Y^{\top} A U $, then

$$
A (U - X \Lambda) = 0,
$$

hence

$$
U \in \operatorname{nullspace} (A) + X \Lambda.
$$

This implies that 

$$ \operatorname{nullspace} (A - A X M^{-1} Y^{\top} A) 
\subseteq \operatorname{nullspace} (A) + \mathcal{C} (X) \cong 
\operatorname{nullspace} (A) \oplus \mathcal{C} (X) ,$$

and finally, 

$$ 
\operatorname{rank} (A - A X M^{-1} Y^{\top} A) = 
\operatorname{rank} (A) - k.
$$

## The Euclidean inner product

### Coordinates form of inner product and $ cos(\theta) $

The inner product $ <F, s> $ is proposed to descrip 
the work done by force $ F $ acting along a displacement $ s $.

$$ W = <F, s> = |F| \sdot |s| \sdot cos(\theta) $$

From this, the cosine of the angle $ \theta $ between $ F $ and $ s $ 
can be expressed as:

$$ cos(\theta) = \frac{<F, s>}{|F| \sdot |s|} $$

In coordinates, the inner product $ <F, s> $ is defined as:

$$ <F, s> = s^* F = s_x F_x + s_y F_y + s_z F_z $$

This decomposition shows that the work done in each direction 
corresponds to the component-wise product:
The work in the $ x $ direction is $ s_x F_x $, the work in the $ y $ 
direction is $ s_y F_y $, and the work in the $ z $ direction is $ s_z F_z $.

Thus, the coordinate form provides a clear and meaningful breakdown 
of the total work into contributions from each axis.

## Determinants again

### The Cauchy-Binet formula

Let $ A \in M_{m,n} (\bf F) $, $ B \in M_{n,m} (\bf F) $, and $ C = A B $.

Cauchy-Binet formula expresses determinant $ | C | $ in terms of 
the minors of $ A $ and $ B $:

$$
\tag{1}
\begin{vmatrix} c_{11} & \cdots & c_{1m} \\\\ \vdots & \ddots & \vdots \\\\ c_{m1} & \cdots & c_{mm} \end{vmatrix} = 
\sum_{1 \leq k_1 < k_2 < \cdots < k_m \leq n} 
\begin{vmatrix} a_{1 k_1} & \cdots & a_{1 k_m} \\\\ \vdots & \ddots & \vdots \\\\ a_{m k_1} & \cdots & a_{m k_m} \end{vmatrix}
\begin{vmatrix} b_{k_1 1} & \cdots & b_{k_1 m} \\\\ \vdots & \ddots & \vdots \\\\ b_{k_m 1} & \cdots & b_{k_m m} \end{vmatrix}
$$

or in a concise notation, 

$$
\tag{1'}
C \begin{pmatrix} 1 & 2 & \cdots & m \\\\ 1 & 2 & \cdots & m \end{pmatrix} = 
\sum_{1 \leq k_1 < k_2 < \cdots < k_m \leq n} 
A \begin{pmatrix} 1 & 2 & \cdots & m \\\\ k_1 & k_2 & \cdots & k_m \end{pmatrix}
B \begin{pmatrix} k_1 & k_2 & \cdots & k_m \\\\ 1 & 2 & \cdots & m \end{pmatrix}
$$

**Derivation**

The derivation I provide is based on Volume 1 of Gantmacher's classic 
[The Theory of Matrices](https://www.maths.ed.ac.uk/~v1ranick/papers/gantmacher1.pdf), 
in chapter 1 $ \S $ 2.

The determinant of $ C $ can be represented in the form

$$
\begin{vmatrix} c_{11} & \cdots & c_{1m} \\\\ \vdots & \ddots & \vdots \\\\ c_{m1} & \cdots & c_{mm} \end{vmatrix} = 
\begin{vmatrix}
\sum_{\alpha_1 = 1}^n a_{1 \alpha_1} b_{\alpha_1 1} & \cdots & \sum_{\alpha_m = 1}^n a_{1 \alpha_m} b_{\alpha_m m} \\\\
\vdots & \ddots & \vdots \\\\
\sum_{\alpha_1 = 1}^n a_{m \alpha_1} b_{\alpha_1 1} & \cdots & \sum_{\alpha_m = 1}^n a_{m \alpha_m} b_{\alpha_m m}
\end{vmatrix}
$$

Expanding the determinant, we consider the multilinear property of 
determinants: the determinant is linear in each row. 
Substituting each term into the determinant:

$$
= \sum_{\alpha_1, \alpha_2, \cdots, \alpha_m = 1}^n
\begin{vmatrix}
a_{1 \alpha_1} b_{\alpha_1 1} & \cdots & a_{1 \alpha_m} b_{\alpha_m m} \\\\
\vdots & \ddots & \vdots \\\\
a_{m \alpha_1} b_{\alpha_1 1} & \cdots & a_{m \alpha_m} b_{\alpha_m m}
\end{vmatrix}
$$

Now, by the property of determinants that "multiplying a column by 
a number multiplies the determinant by this number," we can factor out 
$ b_{\alpha_i i} $ from the $ i $ -th column of the determinant:

$$
= \sum_{\alpha_1, \alpha_2, \cdots, \alpha_m = 1}^n
\begin{vmatrix}
a_{1 \alpha_1}  & \cdots & a_{1 \alpha_m} \\\\
\vdots & \ddots & \vdots \\\\
a_{m \alpha_1} & \cdots & a_{m \alpha_m}
\end{vmatrix}
b_{\alpha_1 1} b_{\alpha_2 2} \cdots b_{\alpha_m m}
$$

$$
\tag{2}
= \sum_{\alpha_1, \alpha_2, \cdots, \alpha_m = 1}^n
A \begin{pmatrix} 1 & 2 & \cdots & m \\\\ \alpha_1 & \alpha_2 & \cdots & \alpha_m \end{pmatrix}
b_{\alpha_1 1} b_{\alpha_2 2} \cdots b_{\alpha_m m}
$$

If m > n, the matrices $ A $ and $ B $ do not have minors of order $ m $. In that case 
the right-hand sides of *(1)* and *(1')* are to be replaced by zero.

Now let $ m \leq n $. Then in the sum on the right-hand side of *(2)* 
all those summands will be zero in which at least two of the subscripts 
$ \alpha_1, \alpha_2, \cdots, \alpha_m $ are equal. 
(If two columns of $ A $ are equal, its determinant is zero.) 
All the remaining summands of *(2)* can be split into groups of 
$ m! $ terms each by combining into one group those summands that differ 
from each other only in the order of the subscripts 
$ \alpha_1, \alpha_2, \cdots, \alpha_m $. 
Now within one such group the sum of the corresponding terms is

$$
\sum \varepsilon (\alpha_1, \alpha_2, \cdots, \alpha_m) 
A \begin{pmatrix} 1 & 2 & \cdots & m \\\\ k_1 & k_2 & \cdots & k_m \end{pmatrix}
b_{\alpha_1 1} b_{\alpha_2 2} \cdots b_{\alpha_m m}
$$

$$
= A \begin{pmatrix} 1 & 2 & \cdots & m \\\\ k_1 & k_2 & \cdots & k_m \end{pmatrix} 
\sum \varepsilon (\alpha_1, \alpha_2, \cdots, \alpha_m) 
b_{\alpha_1 1} b_{\alpha_2 2} \cdots b_{\alpha_m m}
$$

By the Leibniz formula for determinants, the summation over all 
permutations can be expressed compactly. Thus, the expression becomes:

$$
= A \begin{pmatrix} 1 & 2 & \cdots & m \\\\ k_1 & k_2 & \cdots & k_m \end{pmatrix} 
B \begin{pmatrix} k_1 & k_2 & \cdots & k_m \\\\ 1 & 2 & \cdots & m \end{pmatrix}
$$

Here, $ k_1 < k_2 < \cdots < k_m $ is the normal order of the subscripts 
$ \alpha_1, \alpha_2, \cdots, \alpha_m $ and 
$ \varepsilon (\alpha_1, \alpha_2, \cdots, \alpha_m) = (-1)^N $ where 
$ N $ is the number of transpositions of the indices needed to put 
the permutation $ \alpha_1, \alpha_2, \cdots, \alpha_m $ into normal order.

Hence from *(2)* we obtain *(1')*. 

**Generalization**

Let $ A \in M_{m,k} (\bf F) $, $ B \in M_{k,n} (\bf F) $, and $ C = A B $. 
Furthermore, let $ 1 \leq r \leq min \\{m, k, n\\} $, and let 
$ \alpha \subseteq \\{1, \dots, m\\} $ and 
$ \beta \subseteq \\{1, \dots, n\\} $ be index sets, 
each of cardinality $ r $. An expression for the $ \alpha $, $ \beta $ 
minor of $ C $ is 

$$
\operatorname{det} C [\alpha, \beta] = \sum_\gamma
\operatorname{det} A [\alpha, \gamma] \operatorname{det} B [\gamma, \beta]
$$

in which the sum is taken over all index sets 
$ \gamma \subseteq \\{1, \dots, k\\} $ of cardinality $ r $.

**Derivation**

Given that

$$ C [\alpha, \beta] = A [\alpha, [k]] B [[k], \beta] $$

and applying the Cauchy-Binet formula, we arrive at the generalized form above.

### The Sylvester-Franke Theorem

If $ A \in M_n $ and $ 1 \leq k \leq n $, then 
$ \operatorname{det} C_k(A) = (\operatorname{det} A)^e $, 
where $ e = {\begin{pmatrix} n - 1 \\\\ k - 1\end{pmatrix}} $.

**Proof**

The proof I provide is based on Leonard Tornheim, 
[The Sylvester-Franke Theorem](https://www.jstor.org/stable/2306811), The American Mathematical Monthly.

There are three types $ E_1 $, $ E_2 $, $ E_3 $ of elementary 
transformations: $ E_1 $ is the multiplication of a row or column 
by a constant $ k $; $ E_2 $ is the interchange of two adjacent rows 
or columns; and $ E_3 $ is the addition of k times a row or column to 
another row or column. If $ B $ is transformed into $ C $ by $ E_i $, then 

$$
\tag{1}
\operatorname{det} C = \mu_i \operatorname{det} B,
$$

where $ \mu_1 = k $, $ \mu_2 = -1 $, and $ \mu_3 = +1 $.

The proof of the theorem will be based on the following lemma.

**LEMMA.** Let $ B $ be an arbitrary $ n \times n $ square matrix such that 

$$
\tag{2}
\operatorname{det} C_k(B) = (\operatorname{det} B)^e
$$

If $ B $ is transformed into $ C $ by an elementary transformation $ E $, 
then $ \operatorname{det} C_k(C) = (\operatorname{det} C)^e $.

**Proof of lemma**

We state first that 

$$
\tag{3}
\operatorname{det} C_k(C) = \mu_i^e \operatorname{det} C_k(B).
$$

We shall prove this in detail only for $ i = 2 $; 
the other two cases are easier. Suppose that the $ u $-th and ($ u + 1 $)-th 
rows of $ B $ have been interchanged to give a matrix $ C $. The minors 
of $ C $ which do not involve the $ u $-th or ($ u + 1 $)-th rows equal 
the corresponding minors of $ B $. If both $ u $ and $ u + 1 $ appear in 
$ \lambda (p) $, then $ C_{\lambda (p) \lambda (q)} = -B_{\lambda (p) \lambda (q)} $. 
The number of rows of $ C_k (C) $ having such minors is $ {\begin{pmatrix} n - 2 \\\\ k - 2 \end{pmatrix}} $. 
Next suppose $ u $ appears in $ \lambda (p) $ but $ u + 1 $ does not. 
Let $ \lambda (p') $ be obtained from $ \lambda (p) $ by replacing $ u $ by $ u + 1 $. 
Then $ C_{\lambda (p) \lambda (q)} = B_{\lambda (p') \lambda (q)} $ and 
$ B_{\lambda (p') \lambda (q)} = C_{\lambda (p) \lambda (q)} $ since 
the same elements are used and in the same arrangement, because 
the $ u $-th and ($ u + 1 $)-th rows are adjacent. Thus from this cause 
$ {\begin{pmatrix} n - 2 \\\\ k - 1 \end{pmatrix}} $ pairs of rows 
have been interchanged in going from $ C_k(B) $ to $ C_k(C) $. 
(There are $ 2 \times {\begin{pmatrix} n - 2 \\\\ k - 1 \end{pmatrix}} $ 
rows in $ C $ that need to be changed to match $ B $. However, these rows 
must be interchanged within $ C $, forming 
$ {\begin{pmatrix} n - 2 \\\\ k - 1 \end{pmatrix}} $ pairs.)
Thus the total number of changes in sign in going from 
$ \operatorname{det} C_k(B) $ to $ \operatorname{det} C_k(C) $ is 

$$ {\begin{pmatrix} n - 2 \\\\ k - 2 \end{pmatrix}} + {\begin{pmatrix} n - 2 \\\\ k - 1 \end{pmatrix}} = {\begin{pmatrix} n - 1 \\\\ k - 1 \end{pmatrix}} = e.$$

From *(3)*, *(1)*, and *(2)* it now follows that 

$$
\operatorname{det} C_k(C) = \mu_i^e \operatorname{det} C_k(B) = 
\mu_i^e (\operatorname{det} B)^e = (\mu_i \operatorname{det} B)^e = 
(\operatorname{det} C)^e,
$$

and the proof of the lemma is complete.

**Proof of Sylvester-Franke Theorem**

The proof of the Sylvester-Franke Theorem can now be given as follows. It 
is known that there exists an $ n \times n $ matrix

$$ D = \begin{pmatrix} I_r & 0 \\\\ 0 & 0  \end{pmatrix} $$

with $ 0 \leq r \leq n $.

$ D $ can be ransformed into the given $ n \times n $ matrix $ A $ by 
a finite sequence of elementary transformations $ E^{(1)} $, $ E^{(2)} $, 
$ \dots $,  $ E^{(v)} $.

If $ r = n $, $ \operatorname{det} D = 1 $ and if $ r < n $, 
$ \operatorname{det} D = 0 $. Also if $ r = n $, 
$ C_k (D) = I_{\begin{pmatrix} n \\\\ k \end{pmatrix}} $, and 
$ \operatorname{det} C_k (D) = 1 $; otherwise 
$ \operatorname{det} C_k (D) = 0 $. Hence the relation 
$ \operatorname{det} C_k (D) = (\operatorname{det} D)^e $ holds 
in both cases. Then by the lemma, $ \operatorname{det} C_k (E^{(1)} D) = 
\operatorname{det} C_k (D_1) = (\operatorname{det} D_1)^e $, 
$ \operatorname{det} C_k (E^{(2)} D_1) = \operatorname{det} C_k (D_2) = 
(\operatorname{det} D_2)^e $, and so on. If follows by induction 
that $ \operatorname{det} C_k (E^{(v)} D_{v - 1}) = \operatorname{det} C_k (A) = (\operatorname{det} A)^e $, 
and the proof is complete.

### Laplace expansion

Let $ n \in \mathbf{R} $. Let $ A = (a_{i,j})_{1 \leq i \leq n, 1 \leq j \leq n} 
$ be an $ n \times n $ matrix. 

**(a)** For every $ p \in \\{1, 2, \dots, n\\} $, we have 

$$
\operatorname{det} A = \sum_{q = 1}^n (-1)^{p + q} a_{p,q} 
\operatorname{det} (A_{\sim p, \sim q}).
$$

**(b)** For every $ q \in \\{1, 2, \dots, n\\} $, we have 

$$
\operatorname{det} A = \sum_{p = 1}^n (-1)^{p + q} a_{p,q}
\operatorname{det} (A_{\sim p, \sim q}).
$$

**Proof**

The proof I provide is based on 6.12. Laplace expansion, in [Notes on the combinatorial
fundamentals of algebra](https://www.cip.ifi.lmu.de/~grinberg/primes2015/sols.pdf), Darij Grinberg.

**Lemma 1**

For every $ n \in N $, let $ [n] $ denote the set $ \\{1, 2, \dots, n\\}$.
Let $ n \in \mathbf{R} $. For every $ p \in [n] $, we define a permutation 
$ g_p \in S_n $ by $ g_p = cyc_{p, p + 1, \dots, n} $ 
(where I am using the notations of Definition 5.37 in *Notes*).

**(a)** We have $ g_p(1), g_p(2), \dots, g_p(n - 1) = 
(1, 2, \dots, \hat{p}, \dots, n) $ for every $ p \in [n] $.

**(b)** We have $ (-1)^{g_p} = (-1)^{n-p} $ for every $ p \in [n] $.

**(c)** Let $ p \in [n] $. We define a map 

$$ g_p^{\prime}: [n - 1] \to [n] \setminus {p} $$

by 

$$ (g_p^{\prime} (i) = g_p (i) \quad \text{for every } i \in [n - 1]). $$

This map $ g_p^{\prime} $ is well-defined and bijective.

**(d)** Let $ p \in [n] $ and $ q \in [n] $. We define a map

$$ T: \\{\tau \in S_n | \tau(n) = n\\} \to \\{\tau \in S_n | \tau(p) = q\\} $$

by 

$$
(T(\sigma) = g_q \circ \sigma \circ g_p^{-1} \quad 
\text{for every } \sigma \in \\{\tau \in S_n | \tau(n) = n\\}). $$

Then, this map $ T $ is well-defined and bijective.

**Lemma 2**

Let $ n \in \mathbf{R} $. Let $ A = (a_{i,j})_{1 \leq i \leq n, 1 \leq j \leq n} $ 
be an $ n \times n $ matrix. Let $ p \in \\{1, 2, \dots, n\\} $ and 
$ q \in \\{1, 2, \dots, n\\} $. Then, 

$$
\sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} 
\prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} 
a_{i, \sigma(i)} = (-1)^{p + q} \operatorname{det} (A_{\sim p, \sim q}).
$$

**Proof of Lemma 2**

Let us use all notations introduced in *Lemma 1*.

Now, the definition of $ A_{\sim p, \sim q} $ yields

$$
\begin{aligned}
A_{\sim p, \sim q} &= \operatorname{sub} \substack{1, 2, \dots, \hat{q}, \dots, n \\\\ 1, 2, \dots, \hat{p}, \dots, n} A = 
\operatorname{sub} \substack{g_q(1), g_q(2), \dots, g_q(n - 1) \\\\ g_p(1), g_p(2), \dots, g_p(n - 1)} A \\\\ &= 
(a_{g_p(i), g_q(j)})_{1 \leq i \leq n - 1, 1 \leq j \leq n - 1}
\end{aligned}
$$

Now, let us recall the map $ T: \\{\tau \in S_n | \tau(n) = n\\} \to \\{\tau \in S_n | \tau(p) = q\\} $
defined in *Lemma 1 (d)*. *Lemma 1 (d)* says that this map $ T $ is 
well-defined and bijective. Every $ \sigma \in \\{\tau \in S_n | \tau(n) = n\\} $ satisfies

$$
\tag{1}
(-1)^{T(\sigma)} = (-1)^{p + q} \cdot (-1)^{\sigma}
$$

and 

$$
\tag{2}
\prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, (T(\sigma))(i)} = 
\prod_{i = 1}^{n - 1} a_{g_p(i), g_q(\sigma(i))}.
$$

**Proof of *result (1)***

Applying *Lemma 1 (b)* to $ q $ instead of $ p $, 
we obtain $ (-1)^{g_q} = (-1)^{n-q} = (-1)^{n+q} $ 
(since $ n - q \equiv n + q \mod 2 $). 

The definition of $ T(\sigma) $ yields $ T(\sigma) = g_q \circ \sigma \circ g_p^{-1} $. Thus, 

$$
T(\sigma) \circ g_p = g_q \circ \sigma \circ g_p^{-1} \circ g_p = g_q \circ \sigma, 
$$

so that 

$$
\begin{aligned}
(-1)^{T(\sigma) \circ g_p} &= (-1)^{g_q \circ \sigma} = (-1)^{g_q} \cdot (-1)^{\sigma} \\\\
&= (-1)^{n + q} \cdot (-1)^{\sigma}.
\end{aligned}
$$

Compared with

$$
\begin{aligned}
(-1)^{T(\sigma) \circ g_p} &= (-1)^{T(\sigma)} \cdot (-1)^{g_p} \\\\
&= (-1)^{T(\sigma)} \cdot (-1)^{n - p},
\end{aligned}
$$

this yields

$$
(-1)^{T(\sigma)} \cdot (-1)^{n - p} = (-1)^{n + q} \cdot (-1)^{\sigma}
$$

We can divide both sides of this equality by $ (-1)^{n-p} $ 
(since $ (-1)^{n-p} \in \\{1, -1\\} $ is clearly an invertible integer), 
and thus we obtain

$$
(-1)^{T(\sigma)}  = (-1)^{p + q} \cdot (-1)^{\sigma}.
$$

This proves *result (1)*.

**Proof of *result (2)***

Let $ \sigma \in \\{\tau \in S_n | \tau(n) = n\\} $. 
Let us recall the map $ g_p^{\prime}: [n-1] \to [n] \setminus {p} $
introduced in *Lemma 1 (c)*. *Lemma 1 (c)* says that this map $ g_p^{\prime} $ 
is well-defined and bijective. In other words, $ g_p^{\prime} $ is a bijection.
Let $ i \in [n-1] $. Then, $ g_p^{\prime} (i) = g_p(i) $ 
(by the definition of $ g_p^{\prime} $). Also, the definition of $ T $ yields
$ T(\sigma) = g_q \circ \sigma \circ g_p^{-1} $, so That

$$
T(\sigma) (g_p^{\prime} (i)) = (g_q \circ \sigma \circ g_p^{-1}) (g_p (i)) =
g_q (\sigma (g_p^{-1} (g_p (i)))) = g_q (\sigma(i)).
$$

From $ g_p^{\prime} (i) = g_p (i) $ and $ (T(\sigma)) (g_p^{\prime} (i)) = g_q (\sigma(i)) $, we obtain

$$
a_{g_p^{\prime} (i), (T(\sigma)) (g_p^{\prime} (i))} = 
a_{g_p (i), g_q (\sigma(i))}.
$$

Now, let us forget that we fixed $ i $. We thus have proven the above equation for every $ i \in [n-1] $. 
But now, we have

$$
\begin{aligned}
\prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, (T(\sigma))(i)} \\\\ &= 
\prod_{\substack{i \in [n]; \\\\ i \neq p}} a_{i, (T(\sigma))(i)} = 
\prod_{i \in [n] \setminus \\{p\\}} a_{i, (T(\sigma))(i)} = 
\prod_{i \in [n - 1]} a_{g_p^{\prime} (i), (T(\sigma)) (g_p^{\prime} (i))} \\\\
&\quad (\text{here, we have substituted } g_p^{\prime} (i) \text{for } i \text{, since } g_p^{\prime}: [n - 1] \to [n] \setminus \\{p\\} \text{ is a bijection}) \\\\
&= \prod_{i \in [n - 1]} a_{g_p(i), g_q(\sigma(i))}.
\end{aligned}
$$

This proves *result (2)*.

Now, 

$$
\begin{aligned}
\sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, \sigma(i)} \\\\
&= \sum_{\substack{\sigma \in \\{\tau \in S_n | \tau(p) = q\\}}} (-1)^{\sigma} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, \sigma(i)} \\\\ 
&= \sum_{\substack{\sigma \in \\{\tau \in S_n | \tau(n) = n\\}}} (-1)^{T(\sigma)} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, (T(\sigma))(i)} \\\\ 
&\quad (\text{here, we have substituted }T(\sigma) \text{for } \sigma \text{ in the sum, since the map } T: \\{\tau \in S_n | \tau(n) = n\\} \to \\{\tau \in S_n | \tau(p) = q\\} \text{ is a bijection}) \\\\
&= \sum_{\substack{\sigma \in S_n; \\\\ \sigma(n) = n}} (-1)^{p + q} \cdot (-1)^{\sigma} \prod_{i = 1}^{n - 1} a_{g_p(i), g_q(\sigma(i))} \\\\
&= (-1)^{p + q} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(n) = n}} (-1)^{\sigma} \prod_{i = 1}^{n - 1} a_{g_p(i), g_q(\sigma(i))} \\\\
&= (-1)^{p + q} \det \left(a_{g_p(i), g_q(j)}\right)^{1 \leq i \leq n - 1, 1 \leq j \leq n - 1} \\\\
&= (-1)^{p + q} \operatorname{det}(A_{\sim p, \sim q}).
\end{aligned}
$$

This proves *Lemma 2*.

Now, we can finally prove *Laplace expansion*

**Proof of Laplace expansion (a)**

Let $ p \in \\{1, 2, \dots, n\\} $.

$$
\begin{aligned}
\operatorname{det} A 
&= \sum_{\sigma \in S_n} (-1)^{\sigma} \prod_{i = 1}^{n} a_{i, \sigma(i)} \\\\
&= \sum_{q \in \\{1, 2, \dots, n\\}} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} \prod_{i = 1}^{n} a_{i, \sigma(i)} \\\\
&= \sum_{q \in \\{1, 2, \dots, n\\}} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} \prod_{i \in \\{1, 2, \dots, n\\}} a_{i, \sigma(i)} \\\\
&= \sum_{q \in \\{1, 2, \dots, n\\}} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} a_{p, \sigma(p)} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, \sigma(i)} \\\\
&= \sum_{q = 1}^{n} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} a_{p, q} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, \sigma(i)} \\\\
&= \sum_{q = 1}^{n} a_{p, q} \sum_{\substack{\sigma \in S_n; \\\\ \sigma(p) = q}} (-1)^{\sigma} \prod_{\substack{i \in \\{1, 2, \dots, n\\}; \\\\ i \neq p}} a_{i, \sigma(i)} \\\\
&= \sum_{q = 1}^{n} a_{p, q} (-1)^{p + q} \operatorname{det} (A_{\sim p, \sim q}) = \sum_{q = 1}^{n} (-1)^{p + q} a_{p, q} \operatorname{det} (A_{\sim p, \sim q})
\end{aligned}
$$

This proves *Laplace expansion (a)*.