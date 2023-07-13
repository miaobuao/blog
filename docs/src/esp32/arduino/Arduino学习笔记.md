---
title: 'Arduino学习笔记'
date: 2023-06-02 01:38:25
tags: [esp32, arduino]
---

# Arduino学习笔记

## pinMode(pin, mode)

**mode**^[http://www.taichi-maker.com/homepage/reference-index/arduino-code-reference/pinmode/]: 

INPUT sets the GPIO as input without pullup or pulldown (high impedance).^[https://espressif-docs.readthedocs-hosted.com/projects/arduino-esp32/en/latest/api/gpio.html]

OUTPUT sets the GPIO as output/read mode.

INPUT_PULLDOWN sets the GPIO as input with the internal pulldown.

INPUT_PULLUP sets the GPIO as input with the internal pullup.

+ output

当引脚设置为输出（OUTPUT）模式时，引脚为低阻抗状态。这意味着Arduino可以向其它电路元器件提供电流。也就是说，Arduino引脚在输出（OUTPUT）模式下可以点亮LED或者驱动电机。（如果被驱动的电机需要超过40mA的电流，Arduino将需要三极管或其它辅助元件来驱动他们。）


+ input

当引脚设置为输入（INPUT）模式时，引脚为高阻抗状态（100兆欧）。此时该引脚可用于读取传感器信号或开关信号。

::: warning
当Arduino引脚设置为输入（INPUT）模式或者输入上拉（INPUT_PULLUP）模式，请勿将该引脚与负压或者高于5V的电压相连，否则可能会损坏Arduino控制器。
:::

+ input_pullup

Arduino 微控制器自带内部上拉电阻。如果你需要使用该内部上拉电阻，可以通过pinMode()将引脚设置为输入上拉（INPUT_PULLUP）模式。

::: warning
当Arduino引脚设置为输入（INPUT）模式或者输入上拉（INPUT_PULLUP）模式，请勿将该引脚与负压或者高于5V的电压相连，否则可能会损坏Arduino控制器。
::: 

