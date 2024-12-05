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

### Rank-nullity theorem

#### Matrices

For $ A \in M_{m, n}(\mathbf{F}) $, we have:

$$
rank(A) + nullity(A) = n
$$

#### Proof

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

#### Proof

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

#### Application $ \dim C(AB) = \dim C(B) - \dim ( \operatorname{nullspace} (A) \cap C(B)) $

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

### Proof

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

### Proof

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

### Proof

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

### Proof

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

### Establish $ A = C R $

Here are the steps to establish $ A = C R $. We know that an invertible 
elimination matrix $ E $ (a product of simple steps) gives 
$ E A = R_0 = \operatorname{rref} (A) $. Then $ A = E^{-1} R_0 $. 
Drop the $ m - r $ zero rows of $ R_0 $ and the last $ m - r $ columns 
of $ E^{-1} $. This leaves $ A = C \begin{bmatrix} I & F \end{bmatrix} P $, 
where the identity matrix in $ R $ allows us to identify $ C $ in the 
columns of $ E^{-1} $.

### Establish $ A = C W^{-1} B $

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

### Proof

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

### coordinates form of inner product and $ cos(\theta) $

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