---
title: "Algorithms"
date: 2025-03-06T19:08:00+08:00
description: Notes of algorithms
author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: "Algorithms"
    identifier: Miscellanea-algorithms
    parent: Miscellanea
    weight: 10

hero: images/image-miscellanea.jpg
---

### A-Star Path Planning Algorithm

**应用场景**

很多NPC或者机器人（AI）需要**自动寻路**的功能来达到与玩家交互的功能。例如吃鸡游戏中，机器人在城镇中跑毒就需要自动寻路，不然可能就被墙卡死了。[A-Star（A*）寻路算法原理与实现](https://zhuanlan.zhihu.com/p/385733813)

**算法简介**

A* 算法是一种很常用的路径查找和图形遍历算法，最初发表于 1968 年，由 Stanford 研究院的 Peter Hart, Nils Nilsson 以及 Bertram Raphael 发表。它可以被认为是 Dijkstra 算法的扩展。

由于借助启发函数的引导，A* 算法通常拥有更好的性能。[路径规划之 A* 算法](https://paul.pub/a-star-algorithm/)

**发展历程**

1. 广度优先搜索：从起点开始，首先遍历起点周围邻近的点，然后再遍历已经遍历过的点邻近的点，逐步的向外扩散，直到找到终点。

    这种算法就像洪水（Flood fill）一样向外扩张。

2. Dijkstra算法：在Dijkstra算法中，需要计算每一个节点距离起点的总移动代价。同时，还需要一个优先队列结构。对于所有待遍历的节点，放入优先队列中会按照代价进行排序。
    
    在算法运行的过程中，每次都从优先队列中选出代价最小的作为下一个遍历的节点。直到到达终点为止。

3. 最佳优先搜索：在一些情况下，如果我们可以预先计算出每个节点到终点的距离，则我们可以利用这个信息更快的到达终点。

    其原理也很简单。与Dijkstra算法类似，我们也使用一个优先队列，但此时以每个节点到达终点的距离作为优先级，每次始终选取到终点移动代价最小（离终点最近）的节点作为下一个遍历的节点。

**A*算法**

A*算法实际上是综合上面这些算法的特点于一身的。

A*算法通过下面这个函数来计算每个节点的优先级。

$$
f(n) = g(n) + h(n)
$$

其中：
* $ f(n) $ 是节点 $ n $ 的综合优先级。当我们选择下一个要遍历的节点时，我们总会选取综合优先级最高（值最小）的节点。
* $ g(n) $ 是节点 $ n $ 距离起点的代价。
* $ h(n) $ 是节点 $ n $ 距离终点的预计代价，这也就是 A* 算法的启发函数。

A* 算法在运算过程中，每次从优先队列中选取 $ f(n) $ 值最小（优先级最高）的节点作为下一个待遍历的节点。

另外，A* 算法使用两个集合来表示待遍历的节点，与已经遍历过的节点，这通常称之为 *open_set* 和 *close_set*。

完整的 A* 算法描述如下：

```
* 初始化open_set和close_set；
* 将起点加入open_set中，并设置优先级为0（优先级最高）；
* 如果open_set不为空，则从open_set中选取优先级最高的节点n：
    * 如果节点n为终点，则：
        * 从终点开始逐步追踪parent节点，一直达到起点；
        * 返回找到的结果路径，算法结束；
    * 如果节点n不是终点，则：
        * 将节点n从open_set中删除，并加入close_set中；
        * 遍历节点n所有的邻近节点：
            * 如果邻近节点m在close_set中，则：
                * 跳过，选取下一个邻近节点
            * 如果邻近节点m也不在open_set中，则：
                * 设置节点m的parent为节点n
                * 计算节点m的优先级
                * 将节点m加入open_set中
```

<br>

**关于距离**

**欧几里得距离**

指两个节点之间的直线距离

计算方法:

```matlab
function heuristic(node) =
    dx = abs(node.x - goal.x)
    dy = abs(node.y - goal.y)
    return D * sqrt(dx * dx + dy * dy)
```

欧几里得距离有两个弊端：

1. 计算过程中伴随着平方与开根号运算，并且需要使用浮点数，性能差。

2. $ h(n) $ 的值永远小于或等于格子 $ n $ 到终点的最短实际距离。

**曼哈顿距离**

简单来说就是只准水平或垂直移动的最短距离，示意图如下：

<div>
    <center><img src="images/Manhattan-Distance.jpg" alt="ManhattanDistance" /></center>
    <center><strong>Figure 1:</strong> Manhattan Distance.</center>
</div>

计算方法：

```matlab
function heuristic(node) =
    dx = abs(node.x - goal.x)
    dy = abs(node.y - goal.y)
    return D * (dx + dy)
```

1. 相比欧几里得距离，只需要计算加减法，并且连浮点数都不需要。

2. 由于我们的格子可以对角线移动，因此不考虑障碍物的话，或者障碍物在两个格子形成的包围盒内，曼哈顿距离肯定大于或等于格子 $ n $ 到终点的最短实际距离。

**对角线+直线距离**

如果可以对角线移动，那么我们就可以根据水平方向的差值与竖直方向的差值中较小的那个值，计算出对角线，然后再平移。示意图如下：

<div>
    <center><img src="images/Diagonal-Distance.jpg" alt="DiagonalDistance" /></center>
    <center><strong>Figure 2:</strong> Diagonal Distance.</center>
</div>

计算方法：

```matlab
function heuristic(node) =
    dx = abs(node.x - goal.x)
    dy = abs(node.y - goal.y)
    return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
```

1. $ h(n) $ 的值小于或等于格子 $ n $ 到终点的最短实际距离。不考虑障碍物的情况下，肯定等于格子 $ n $ 到终点的最短实际距离。

2. 由于计算对角线同样需要开根号以及浮点数。为了加快计算，我们可以假设两个格子间的距离为 10，然后直接认为对角线距离为 14（不是 $ \sqrt{200} $ 了），这样就可以避免浮点数和根号运算了。

**启发函数**

启发函数会影响 A* 算法的行为。[路径规划之 A* 算法](https://paul.pub/a-star-algorithm/)

1. 如果 $ h(n) $ 始终小于等于节点 $ n $ 到终点的代价，则 A* 算法保证一定能够找到最短路径。但是当 $ h(n) $ 的值越小，算法将遍历越多的节点，也就导致算法越慢。

2. 如果 $ h(n) $ 的值比节点 $ n $ 到终点的代价要大，则 A* 算法不能保证找到最短路径，不过此时会很快。

3. 如果 $ h(n) $ 完全等于节点 $ n $ 到终点的代价，则 A* 算法将找到最佳路径，并且速度很快。可惜的是，并非所有场景下都能做到这一点。因为在没有达到终点之前，我们很难确切算出距离终点还有多远。

4. 在极端情况下，当启发函数 $ h(n) $ 始终为 $ 0 $，则将由 $ g(n) $ 决定节点的优先级，此时算法就退化成了 Dijkstra 算法。

5. 若 $ h(n) $ 远远大于 $ g(n) $，那么 $ f(n) $ 的值就主要取决于 $ h(n) $，A* 算法就演变成了 BFS 算法。

第 1、2 点解释：[A-Star（A*）寻路算法原理与实现](https://zhuanlan.zhihu.com/p/385733813)

来看一个例子：

<div>
    <center><img src="images/example.jpg" alt="example" /></center>
    <center><strong>Figure 3:</strong> 启发式函数对算法速度和结果的影响. </center>
</div>

<br>

若使用曼哈顿距离，$ f(1) = g(1) + h(1) = 14 + 190 = 204 $，$ f(2) = g(2) + h(2) = 74 + 90 = 184 $，就是说我宁可考虑格子 2 也不会去考虑格子 1。

但是使用对角线距离，$ f(1) = g(1) + h(1) = 14 + 136 = 150 $，$ f(2) = g(2) + h(2) = 74 + 78 = 152 $，那就变得格子 1 要优先考虑。

两种 $ h(n) $ 得到的路径如下：

<div style="display: flex; justify-content: space-between;">
    <img src="images/example-Manhattan.jpg" alt="example-Manhattan" style="width: 45%"/>
    <img src="images/example-Diagonal.jpg" alt="example-Diagonal" style="width: 45%"/>
</div>
<div style="text-align: center;">
    <strong>Figure 4:</strong> 左：曼哈顿距离的结果，右：对角线距离的结果
</div>

<br>

可以看到对角线距离考虑的节点更多，但是路径更短、结果更好。

**题外话**

计算 $ g(n) $ 有两种方法 [路径规划之 A* 算法](https://paul.pub/a-star-algorithm/)

1. 直接用对角线距离计算与起点间的距离
2. 父节点与起点的距离加上当前节点与父节点的距离

前一种方法需要每次都计算，后一种方法需要存储父节点信息。一个耗费计算时间，一个耗费存储空间，根据实际情况来选择。

<br>

当我们地图被某些障碍物分割，只留了一两个可通过的小口时，可以将寻路过程拆解开来，例如下图：[A-Star（A*）寻路算法原理与实现](https://zhuanlan.zhihu.com/p/385733813)

<div>
    <center><img src="images/middle-one.png" alt="middle-one" /></center>
    <center><strong>Figure 5:</strong> 地图中间有一个可通过的小口. </center>
</div>

可以将起点到终点的寻路过程拆分为起点到A点，A点到终点的两段寻路过程，来减少不必要的计算。

<br>

当你有相当多的寻路者和一块很大的地图时，寻路占用了大量的 CPU 时间。[A星算法详解(个人认为最详细,最通俗易懂的一个版本)](https://blog.csdn.net/hitwhylz/article/details/23089415)

* 使用小地图或者更少的寻路者。

* 千万不要同时给多个寻路者寻路。取而代之的是把它们放入队列中，分散到几个游戏周期中。如果你的游戏以每秒 40 周期的速度运行，没人能察觉到。但是如果同时有大量的寻路者在寻路的话，他们会马上就发现游戏慢下来了。

* 考虑在地图中使用更大的方格。这减少了寻路时需要搜索的方格数量。如果你是有雄心的话，你可以设计多套寻路方案，根据路径的长度而使用在不同场合。这也是专业人士的做法，对长路径使用大方格，当你接近目标时使用小方格。