---
title: A Survey on Lifelong Memory of Large Language Models
published: 2025-07-09
toc: true
abbrlink: lifelong-memory
description: placeholder
tags: [survey, lifelong-memory]
---

## 人类的记忆系统

理论基础主要来自 Atkinson–Shiffrin memory model 和 Baddeley's model of working memory。书写有所抉择。

![](./_images/lifelong-memory/1.svg)

### 短期记忆 (Short-Term Memory, STM)

#### 感官记忆 (Sensory Memory)

保存来自感官的原始信息的缓冲区。容量巨大，遗忘时间极其短暂（视觉几毫秒，听觉几秒钟）。不同感觉通道的信息由不同的感觉寄存器存储，例如**图像记忆** (Iconic Memory) 和**回声记忆** (Echoic Memory)。

这个阶段的信息处理不需要注意力。绝大部分信息会迅速衰退，只有被注意力选中的信息才会进入工作记忆的相应子系统，例如**语音回路** (Phonological Loop) 和**视空间模板** (Visuospatial Sketchpad)。

有时也被认为是一个独立的阶段，相应的，工作记忆被认为和 STM 等同。

#### 工作记忆 (Working Memory)

有意识地思考、处理和加工信息的区域。容量非常有限（经典研究 7±2，现代研究 4±1 chunks），遗忘时间短暂（15-30 秒）。

**复述** (Rehearsal，例如反复默念电话号码) 和**组块** (Chunking，例如将 `1-9-8-4-1-0-0-1` 8 个零散数字组织成 `1984-10-01` 3 个块表示的有意义的日期) 是维护工作记忆的主要策略。

除了前面提到的子系统外，工作记忆的核心组成部分还包括一个**中央执行系统** (Central Executive)，用于分配注意力、切换任务、抑制干扰和从 LTM 提取信息等高级认知功能。

**编码** (Encoding) 机制将工作记忆中的信息转化为可以在 LTM 存储的形式，直接影响信息在 LTM 中的存储强度和提取效率。**精细复述** (Elaborative Rehearsal) 将信息与已有的知识经验联系起来，进行有意义的组织和解释，能够显著提高信息进入 LTM 的概率和强度。**巩固** (Consolidation) 机制使得新编码的记忆痕迹随着时间的推移逐渐稳定和增强，其中**突触巩固** (Synaptic Consolidation) 发生在学习后的几个小时或几天内，主要涉及神经元之间突触连接强度的改变，而**系统巩固** (Systems Consolidation) 可能持续数周或数年，涉及记忆表征在大脑不同区域间的重组和再分配。

### 长期记忆 (Long-Term Memory, LTM)

容量理论上是无限的，遗忘时间理论上是永久的。但是可能**提取失败** (Retrieval Failure)。

> 提取失败有没有可能是灾难性遗忘？有可能。人类记忆也存在逆向干扰 (Retroactive Interference，新学习的信息干扰了对旧信息的提取，例如更换手机号一段时间后遗忘了旧手机号) 和前向干扰 (Proactive Interference，旧信息干扰了对新信息的学习和提取，例如习惯了旧的键盘布局，更换键盘后总是不自觉按错位置)。
>
> 然而，人类记忆系统演化出许多缓解此问题的机制：
> 1. 动态的网络结构：可以建立新的突触，而不是改变旧的权重；
> 2. 结构化和模块化存储：按时间和功能在不同区域存储信息；
> 3. **重放** (Replay)：和 2 相关，在一个缓慢的过程中令新信息在不破坏旧信息网络的情况下被学习，系统巩固的一种方式；
> 4. 稀疏性：不同记忆使用的神经元集群重叠度较低。
>
> 这使得灾难性遗忘在人类记忆系统上变得不显著。通常的测量方法是：观察是否有提示依赖性遗忘（给出提示可以回想起来）、舌尖现象 (Tip-of-the-tongue，能回忆起词语的特征，但是说不出来) 和再学习的节省（重新学习比第一次学习快得多）等，如果有这些现象就认为是提取失败而不是灾难性遗忘。我认为这不太靠谱，但也许 good enough。

LTM 是分层存储的。首先进入**海马体** (Hippocampus)，然后随系统巩固转移到**新皮层** (Neocortex)。前者是非永久性的存储区域，后者是独立的、永久性、分布式的存储区域。

#### 外显记忆 (Explicit Memory)

也叫**陈述性记忆** (Declarative Memory)，涉及对事实和事件的有意识回忆，可以用语言表达。可以进一步分为：

- **情景记忆** (Episodic Memory)：关于个人经历的记忆，有时间、地点和情节。例如“我上周日去公园散步了”。
- **语义记忆** (Semantic Memory)：关于世界的事实、概念和知识。例如“巴黎是法国的首都”。

#### 内隐记忆 (Implicit Memory)

也叫**非陈述性记忆** (Non-Declarative Memory)，涉及无意识的技能和习惯，难以用语言表达。

一种典型的形式是**程序性记忆** (Procedural Memory，或者肌肉记忆 Muscle Memory)。例如如何骑自行车。这种记忆由**小脑** (Cerebellum) 存储。

## LLM 的记忆系统

### 工作记忆

### 情景记忆

### 语义记忆

### 参数记忆

## 挑战

### 灾难性遗忘

### 长上下文

### 动态记忆

### 一致性/个性化

### 多模态

## 成果

### 系统

### 算法

### 基准

## 研究方向

## 参考资料

1. [Lifelong Learning of Large Language Model based Agents: A Roadmap](https://arxiv.org/abs/2501.07278v1)
2. [From Human Memory to AI Memory: A Survey on Memory Mechanisms in the Era of LLMs](https://arxiv.org/abs/2504.15965)
