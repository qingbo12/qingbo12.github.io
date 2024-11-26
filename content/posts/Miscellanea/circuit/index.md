---
title: "Circuit Base"
date: 2024-11-07T15:09:00+08:00

author:
  name: Jinpeng Ma
menu:
  sidebar:
    name: Circuit Base
    identifier: Miscellanea-circuit
    parent: Miscellanea
    weight: 10

hero: images/image-miscellanea.jpg
---

## Basic circuit

**Charge** It is defined in terms of the ampere by counting the total charge that passes through an arbitrary cross section of a wire during an interval of one second. In the SI system, the fundamental unit of charge is the coulomb (C).

**Current** We define the current at a specific point and flowing in a specified direction as the instantaneous rate at which net positive charge is moving past that point in the specified direction. Current
is symbolized by I or i, and so

$$i = \frac{dq}{dt}$$

The unit of current is the ampere (A).

**Voltage** In a static electric field, it corresponds to the work needed per unit of charge to move a positive test charge from the first point to the second point. Voltage is symbolized by U or u, and so

$$u = \frac{dW}{dq}$$

In the International System of Units (SI), the derived unit for voltage is the volt (V).

**Power** Power is defined as the rate at which work is done or energy is expended. The absorbed power must be proportional both to the number of coulombs transferred per second (current) and to the energy needed to transfer one coulomb through the element (voltage). Thus,

$$p = vi$$

The fundamental unit of power is the watt (W), defined as 1 J/s.

**Energy** Recalling that power is the rate of work, energy (w) is defined as

$$w(t) = \int_{t_0}^t p dt = \int_{t_0}^t vi dt$$

The SI unit of energy is the joule (J).

Noting that energy is the product of power and time (1 joule = 1 watt × 1 second), it is also convenient to define energy in terms of watt hours (Wh).

$$1 Wh = 3600J$$

Battery capacity (energy stored) can also be defined in terms of Wh.
Since the voltage on a battery is constant, it becomes convenient to separate out the battery voltage and simply refer to the total charge storage on the battery (Q). Thus,

$$w = \int vidt = V \int idt = VQ$$

The total charge Q is given in units of amp hours (Ah)

$$ 1 Ah = 3600 C$$

<br/>

**Capacitance**

<div>
    <center><img src="images/capacitorvi.png" alt="capacitorvi" /></center>
    <center><strong>Figure 1:</strong> Electrical symbol and current–voltage conventions for a capacitor.</center>
</div>

<br>

$$i = C \frac{dv}{dt}$$

Suppose $ v > 0 $.

If we charge the capacitor, then $ v $ is increasing. So $\frac{dv}{dt} > 0$, $ i \gt 0 $, current is from high voltage to low voltage.

If the capacitor is release charges, then $ v $ is decreasing. So $ i \lt 0 $, current is from low voltage to high voltage.

**Inductor**

<div>
    <center><img src="images/inductorvi.png" alt="resistorvi" /></center>
    <center><strong>Figure 2:</strong> Electrical symbol and current–voltage conventions for an inductor.</center>
</div>

<br>

$$v = L \frac{di}{dt}$$

Suppose $ i > 0 $.

If we charge the inductor, then $ i $ is increasing. So $\frac{di}{dt} > 0$, $ v > 0 $, charges move from high voltage to low voltage, the indcutor is absorb energy.

If the capacitor is release charges, then $ i $ is decreasing. So $ v < 0 $, charges move from low voltage to high voltage, the inductor is release energy.

## English-Chinese glossary

***resistor*** 电阻（电路元件）

***resistance*** 电阻

***capacitor*** 电容（电路元件）

***capacitance*** 电容

***inductor*** 电感（电路元件）

***inductance*** 电感

$$\omega_0 = \frac{1}{\sqrt{LC}}$$

***resonant frequency*** 谐振频率 $\omega_0$

$$v(t) = V_m sin(\omega t + \theta)$$

***sinusoids*** 正弦波

***amplitude*** 幅度 $V_m$

***argument*** 幅角 $\omega t + \theta$

***radian frequency/angular frequency*** 角频率 $\omega$

***phase angle*** 相角 $\theta$

$$I_m \angle \phi = I_m cos (\omega t + \phi)$$

***phasor*** 相量 $I_m \angle \phi$

$$\mathbf{Z} = R + jX$$

$$\mathbf{Z_R} = R, \mathbf{Z_L} = j \omega L, \mathbf{Z_C} = \frac{1}{j \omega C}$$

***impedance*** 阻抗 $\mathbf{Z}$

***reactance*** 电抗 X (in $\mathbf{Z} = R + jX$)

$$\mathbf{Y} = G + jB = \frac{1}{\mathbf{Z}} = \frac{1}{R + jX}$$

***admittance*** 导纳 $\mathbf{Y}$

***conductance*** 电导 G

***susceptance*** 电纳 B