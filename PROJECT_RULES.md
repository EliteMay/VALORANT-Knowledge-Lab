# PROJECT RULES

## 目的

このRepositoryでは、VALORANTの知識を「それっぽい攻略情報」ではなく、**Evidenceを辿れる学習コンテンツ**として管理する。

## 1. Source Priority

### A — Primary / Highest Priority

- Riot Games / VALORANT / VCT公式
- プロ選手本人の動画・配信・記事・発言
- プロチームのCoach / Analyst / IGL本人の解説
- Peer-reviewed Paper
- Systematic Review / Meta-analysis

### B — Strong Secondary

- 名前付きのプロ / Coach / Analystへの直接Interview
- 一次発言を全文Context付きで扱う信頼できるesports媒体

### C — Supplementary

- 専門Coaching Site
- Analysis Site
- 教育目的の高品質Guide

### D — Discovery / Weak-context

- Reddit
- Forum
- 一般SNS投稿
- 出典不明のまとめ

DはFailure case、疑問、検索Keyword、Practice ideaの発見には使えるが、Core Claimの唯一の根拠にしない。

## 2. Independence Rule

複数Sourceを数える前にOriginal Evidenceを確認する。

例:

```text
nAts本人の発言
├─ Interview記事A
├─ まとめ記事B
└─ SNS切り抜きC
```

これは原則として「3つの独立Evidence」ではなく、同じOriginal Claimを再利用したものとして扱う。

## 3. Claim Rule

各重要Claimは可能な限り以下のどれかを付ける。

- Confirmed
- Supported
- Context-dependent
- Disputed
- Weak evidence
- Not verified

Evidenceが足りない場合は「不明」を正常Outcomeとして許可する。

## 4. Evidence Type Label

本文またはResearch recordで次を区別する。

- Official / Mechanic
- Expert Practice / Analysis
- Academic General Principle
- Coaching Heuristic
- Community Observation
- Site Synthesis

## 5. VALORANT固有Evidenceと一般FPS Evidence

CS / CS2 / 他FPSの論文や研究は、そのままVALORANT固有Mechanicの証明に使わない。

利用例:

- Calloutが分散した情報を共有しCoordinationに使われる
- Expert teamでは事実・Action中心のCommunicationが多い
- Team cognition / coordination / reviewが重要

これらは一般原理の補強として使い、Agent ability、Map timing、VALORANT固有Meta等はVALORANT側Sourceで確認する。

## 6. Time / Patch Sensitivity

Sourceごとに最低限以下を意識する。

- Published / recorded date
- Game version / Patchが分かる場合
- 当時のAgent / Map / Meta依存性
- 現在も適用できる原理か

古いSourceでも安定した原理には使えるが、Current Agent仕様やMetaの証拠にはCurrent Sourceを優先する。

## 7. Exact Number Rule

以下のような数字は特に注意する。

- 距離
- 秒数
- Round clock
- 成功率
- Win rate
- Reaction time

Official mechanic、実測、Methodのある研究等がなければ「目安」「Drill上の基準」と表示する。

## 8. Writing Rule

避ける:

- 「絶対に〜」
- 「必ず〜」
- 「これが正解」
- Sourceが示していない因果
- 1人のプロのPreferenceをゲーム全体のRuleへ拡張

優先する:

- 「〜の条件では」
- 「nAtsは〜と説明している」
- 「複数Sourceで共通するのは〜」
- 「この点はMap / Agent / Team planで変わる」
- 「この部分はサイト側のSynthesis」

## 9. Conflict Handling

Sourceが食い違ったら次を確認する。

1. Source date / Patch
2. Map
3. Agent / Role
4. Attack / Defense
5. Composition
6. Team / Solo Queue
7. Rank / Skill level
8. Set play / Default / Mid-round
9. Main goalの違い

統合できなければ両方を条件付きで残す。

## 10. Concept Page Quality Gate

最低限:

- Definition
- Purpose
- Trigger
- Cues
- Action
- Mistakes
- Conditions / Exceptions
- Practice
- Sources

「定義 + Tips 3つ」だけでは完成にしない。

## 11. Research Record

Research fileでは次を追跡できるようにする。

- Research Question
- Source
- Source type / tier
- Relevant claim
- Limitation
- Applicability
- Cross-check
- Site interpretation

## 12. AI Boundary

AIは以下を担当できる。

- Source探索
- Source比較
- 重複Original Evidenceの検出
- Claim整理
- 条件差の抽出
- 学習しやすい構造への編集

AIは以下をしてはいけない。

- 出典のない戦術を「プロが使う」と捏造
- 論文の対象がCS:GOなのにVALORANTで実証済みと表現
- SourceにないExact Numberを作る
- 推測をFactに変える
