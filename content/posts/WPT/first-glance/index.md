---
title: "First glance"
date: 2024-10-31T17:44:00+08:00

author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: First glance
    identifier: WPT-firstGlance
    parent: WPT
    weight: 10
---

# Scheduling Layer
### PTE Optimization
#### Requirement-Driven Magnetic Beamforming for MIMO Wireless Power Transfer Optimization

**Motivation:** In MIMO MRC-WPT system, we need to consider the scenario
 when different RXs have different requirements of power.
<br/>

**Problem formulation:** weighted sum-power maximization 
$WSPMax = max_{\{i_n^{tx}\}} \sum_q w_q |i^{rx}_q|^2 r^{rx}_q $

Subject to:
<br/>

$$ \sum_n \left|i_n^{tx}\right|^2 r_n^{tx} + \sum_q \left|i_q^{rx}\right|^2 r_q^{rx} \leq P_{\text{max}}, \\ $$

$$ \left|i_n^{tx}\right|^2 \leq A_n^{tx}, \quad \forall 1 \leq n \leq N, \\ $$

$$ \left|i_q^{rx}\right|^2 \leq A_q^{tx}, \quad \forall 1 \leq q \leq Q, \\ $$

$$ \left|v_n^{tx}\right|^2 \leq V_n^{tx}, \quad \forall 1 \leq n \leq N. $$

<br/>

#### Joint Power Routing and Current Scheduling in Multi-Relay Magnetic MIMO WPT System

**Motivation:** Relay's ability to increase charging distance in 
practical systems is studied. A three-coil wireless power transfer 
system is more energy efficient than a two coil counterpart is feasible. 
But **the relay On/Off based power routing algorithm can be optimized**
**for system performance while considering the MIMO scenario.**
<br/>

**Contribution:** 

1. They propose an RX-independent algorithm, i.e., without any RX 
cooperation. RX cooperation, i.e., RX feedback communication is 
time/energy-consuming since it is achieved by using side-channels, 
e.g., Bluetooth.

2. They propose an efficient searching algorithm other than enumerating 
all the possible relay On-Off states.
<br/>

### PDL Optimization
#### IMP: Impedance Matching Enhanced Power-Delivered-to-Load Optimization for Magnetic MIMO Wireless Power Transfer System

**Motivation:** **The power delivered to load(PDL) maximization related**
**issues and the two impedance mismatching phenomena need to be further** 
**explored.** The first one is the PTE-PDL contradiction phenomenon. 
When RXs are closely coupled with TXs, the PTE is very high but the 
achieved PDL is quite limited. The second one is the isolated RX-pair 
phenomenon. When two RXs are closely coupled, the RX pair forms an 
"isolated island" where the energy can not reach, i.e., their PTE 
and PDL are both limited.
<br/>

**Contribution:**

1. First work to maximize the PDL in practical MIMO MRC-WPT systems 
with bounded TX voltages, together with addressing the impedance 
mismatching phenomena.
Research about maximize the PDL in practical MIMO MRC-WPT systems is
existing. Maximize the PDL and addressing the impedance mismatching 
phenomena in SISO systems is existing.

2. In order to address the two observed phenomena, their basic idea is to handle the first one by tuning TX-RX coupling 
through special designed adjustable TX coils. To deal with the second 
one, they use RX grouping mechanism to select not coupled RX pairs to 
charge. Then, they conduct time scheduling among the chosen RX groups, 
i.e., each RX group is assigned a unique time slice for charging.
<br/>

**Thoughts:** Already have many optimization methods. Ether optimize 
with a new variable or use more efficient algorithm.

<br/>

### EMR safety optimization
#### Shield: Safety Ensured High-efficient Scheduling for Magnetic MIMO Wireless Power Transfer System

**Motivation:** **Ensure electromagnetic radiation (EMR) safety is important:** Exposure to high EMR has its potential
risks including tissue impairment, brain tumor and mental diseases.
**Not be investigated before:** EMR safety related problems have not been thoroughly investigated. While MagMIMO and 
MultiSpot systems are likely to contravene EMR safety standards. 

**Contribution:** They propose the first scheme for safety ensured charging 
in MIMO MRC-WPT systems.

<br/>

#### Safety Guaranteed Power-Delivered-to-Load Maximization for Magnetic Wireless Power Transfer

**Motivation:** **Current method is not very good:** Shield has two 
deficiencies. On one hand, it is not a one-size-fits-all scheme, i.e., 
the derived EMR model can only be suitable for the special circular 
type of resonator coils. On the other hand, Shield focus on PTE 
maximization which is less meaningful than PDL maximization.

**Contribution:** They use a unified model to describe the EMR distribution of all
the different coils.

<br/>

# Communication Layer
#### Parallel Feedback Communications for Magnetic MIMO Wireless Power Transfer System

**Motivation:** **Communications is important:** The RX feedback 
communication and power transfer channel estimation schemes enables 
the systems for charging in demand, magnetic beamforming for better 
power transfer efficiency, and so on.
**Current communication scheme is not efficient.**
However, most of the existing researches focus on the optimization 
algorithm for TX currents/voltages adjustment, and adopt simple 
feedback communication and channel estimation schemes. The existing 
schemes including omitting the communication and channel estimation 
stages, simply assuming the existence of communication links and 
pre-known channel conditions, or some naive method.

**Contribution:**

1. Cluster phenomenon:  two TXs' current values are clearly clustered 
into four kinds, which are exactly correspondence to the four combined 
open-short states of the two RXs.

2. They propose a collision-aware parallel communication scheme to 
identify the open-short state of all the RXs.

<br/>

#### Camel: Context-Aware Magnetic MIMO Wireless Power Transfer with In-band Communication

**Motivation:** There are three different receiver (RX) information 
collection methods. The RX-independent method does not consider the 
RX information collection at all. The out-band based methods use 
additional out-band devices, along with extra energy consumption 
and spectrum occupation. For the in-band communication methods, some 
are not used in MIMO scenario. **Hua et al.'s method need to collect** 
**enough combined states before decoding.**

**Contribution:** investigate the signals' feature from the view of 
mutual inductance.
<br/>

#### Roland: Robust In-band Parallel Communication for Magnetic MIMO Wireless Power Transfer System

**Motivation:** **Camel has a premise of ignoring RX-RX coupling** when 
performing RX-level channel decomposition which may not work well under 
the scenarios where closely coupled RXs exist. 
RX-RX coupling can exist as relay phenomenon.

# Application Layer
#### FreAuth: Novel Frequency Feature-Based Device Authentication for Magnetic Wireless Charging

**Motivation:** **Device Authentication is important:** Threats like freeloading, illegal device attacks need to 
be mitigated. Therefore, it is essential to identify and authenticate 
legitimate devices in magnetic WPT systems to prevent illegal access 
and ensure smooth usage.
**Current methods are not good:** Uploading its identity is vulnerable 
to forgery as electromagnetic signals are exposed, and the 
communication protocol is unencrypted. Hardware fingerprint-based 
device authentication can be divided to two categories. Extracting device-specific characteristics from
electromagnetic signals lacks permanence; Using temporal features such 
as oscillator difference caused clock skew is unstable and requires a 
long authentication process.

**Contribution:**

1. They observed that each RX has its own frequency-related features.
2. The proposed method is completely RX-independent, i.e., without 
requiring communication or cooperation from the receiver.