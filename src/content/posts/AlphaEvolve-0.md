---
title: "[WIP] From OpenEvolve to AlphaEvolve, Part 1: Full Codebase Evolution"
published: 2025-08-26
toc: true
abbrlink: alpha-evolve-0
description: placeholder
tags: [AlphaEvolve, code agent, LLM, evolutionary algorithms]
---

[AlphaEvolve](https://deepmind.google/discover/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/) 已经发布三个月。在此之前，AlphaEvolve 已经伴随 Gemini 2.0 演进到 Gemini 2.5，在 Google 内部使用了一年，其中也许最大的贡献是回收了 Google 全球计算资源的 0.5%，通过优化 Borg 的一个计算调度优先级的启发式函数。对于 AlphaEvolve 的相关工作、架构、实验和带来的机会，我以后或许会补一篇 Part 0 来讨论，现在我们专注于复现。

到目前为止，开源社区最主流的复现工作是 [OpenEvolve](https://github.com/codelion/openevolve)。OpenEvolve 基本上按照 AlphaEvolve 白皮书宣称的架构和算法选型完成了开发，标志性的成果是在 Circle Packing 问题上复现了 AlphaEvolve 找到的新 SOTA 解。

OpenEvolve 的作者 Asankhaya Sharma 出色而且刻苦的工作一度让我放弃复现 AlphaEvolve。有这么一趟高速列车可以搭乘，何必自己重新造轮子。至于一些令人尴尬的实现细节（比如 OpenEvolve 最早使用 $\mathcal{O}(N^2)$ 的字符级别编辑距离来计算两个文件的相似度，这使得 100 行以上的程序的进化就慢得令人绝望）倒是小问题，自己维护一个分支就行。

然而，最近一个月，OpenEvolve 的开发工作趋于停滞，产能集中在更多示例和漂亮的 README。README 里一度宣称「began as a faithful implementation of AlphaEvolve and has evolved far beyond it」。稍等一下，OpenEvolve 还有一个我最期待、也是最根本的功能没有完成吧？那就是整代码库进化。

谈及这点，其实 AlphaEvolve 也有点左右脑互搏。AlphaEvolve 的博客里明确地写道「AlphaEvolve is an agent that can go beyond single function discovery to evolve entire **codebases** and develop much more complex algorithms」，尽管论文里的和 [FunSearch](https://deepmind.google/discover/blog/funsearch-making-new-discoveries-in-mathematical-sciences-using-large-language-models/) 对比的表格又说「evolves entire code **file**」。考虑到「evolves entire code file」本质上和「evolves single function」没什么差别，我推测 AlphaEvolve 的论文可能是在不同时期写就，或者纯属笔误。无论如何，以 Google 的实力，就算 AlphaEvolve 一开始没有整代码库进化的能力，在 Gemini 2.5 出来后又演进了这么久，现在也该有了。

整代码库进化是一个巨大的范式转变，只有支持这个功能才能区分于 FunSearch，并极大提升实用性。正好，最近几个月的思考沉淀出了一些灵感，我 fork 了一个[分支](https://github.com/NeapolitanIcecream/openevolve/tree/Sol)，着手实现这个功能。
