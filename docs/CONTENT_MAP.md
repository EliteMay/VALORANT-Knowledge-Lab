# CONTENT MAP

## Primary Goal

「試合中に、何を見て、どう判断し、味方とどう合わせるか」を学べる構造にする。

用語を並べることより、**大枠 → 学習順 → Concept → 実戦判断 → 次のConcept**へ自然につながることを優先する。

## Home Learning Domains

HomeのPrimary Choiceは次の3つだけにする。

1. ミクロ
2. マクロ
3. エイム練習

ポジショニング、情報・判断、連携、武器・距離などはPrimary Home Domainへ増やさず、各Domain内の小分類・横断Conceptとして扱う。

1つのConceptは複数Domainへ所属できる。

## Content Types

- **Concept** — 複数の試合・状況で再利用する基礎知識
- **Deep Dive** — Concept内部の細かい判断・技術
- **Scenario** — Entry / Retake / Post-plant等、複数Conceptを組み合わせる特定状況
- **Tag / Condition** — 攻守、人数差、Utility、Teamplay等の横断条件
- **Training / Review** — Deathmatch、Aim Trainer、VOD Review等の練習方法

ScenarioやTagをすべてPrimary Categoryへ昇格させず、Category Sprawlを防ぐ。

## Current 15 Concepts

### 共通土台

- 撃ち合いの構造

### ミクロ

おすすめ学習順:

1. 撃ち合いの構造
2. ポジショニング
3. ピーク / 角度分離
4. カバー / トレード
5. スペーシング
6. クロスファイア
7. ダブルスイング
8. アンカー

補助・横断:

- クロスヘア配置 / プリエイム
- 移動・停止・射撃
- コミュニケーション / コール

### マクロ

おすすめ学習順:

1. 情報 → 判断 → 実行
2. コミュニケーション / コール
3. マップコントロール
4. ラーク
5. 定石外の相手への対応

補助・横断:

- アンカー

### エイム練習

おすすめ学習順:

1. 撃ち合いの構造
2. クロスヘア配置 / プリエイム
3. ピーク / 角度分離
4. 移動・停止・射撃

## Core Dependencies

```text
撃ち合いの構造
├─ ポジショニング
│  ├─ ピーク / 角度分離
│  ├─ スペーシング
│  │  ├─ クロスファイア
│  │  └─ ダブルスイング
│  └─ アンカー
├─ クロスヘア配置 / プリエイム
│  └─ ピーク / 角度分離
└─ 移動・停止・射撃

情報 → 判断 → 実行
├─ コミュニケーション / コール
├─ マップコントロール
│  └─ ラーク
└─ 定石外の相手への対応
```

これは絶対的な唯一の学習順ではなく、Concept依存関係をサイト側で整理したRecommended Pathとする。

## Domain Page Contract

Domain Pageは次の順にする。

1. Domainの目的
2. まず読む1本
3. おすすめ学習順
4. テーマ別Concept一覧

「まず読む1本」をテーマ別一覧へ重複表示しない。

## Concept Page Contract

1. 一言定義
2. 何のために使うか
3. 重要ポイント
4. Trigger
5. Action
6. Conditions / Exceptions
7. Example
8. Cues / Mistakes
9. Practice / VOD Review
10. Evidence
11. Recommended Next
12. Related Concepts

Related Conceptには、まだ記事が存在しない内部IDをUser-facing UIへ表示しない。

## Recommended Next

選択中Domainの `learningOrderIds` から次のConceptを1つだけPrimaryに提示する。

それ以外の既存Conceptは「関連する知識」としてSecondaryに表示する。

## Findability

初期実装では以下を組み合わせる。

- 3つのPrimary Domain
- おすすめ学習順
- テーマ別Browse
- Domain内Keyword Search
- Recommended Next
- Related Concepts

Search対象はTitle / Alias / Definitionだけに限定せず、Goal / Subtype / Claim / Deep Dive / Cues / Mistakes / Practiceまで含める。

将来「困っていることから探す」をSecondary入口として追加できるが、Current 15Conceptの構造が安定するまではPrimary Homeを増やさない。

## Planned Scenarios / Training

Conceptと混同せず、将来別レイヤーで検討する。

- Entry
- Retake
- Post-plant
- 人数有利 / 不利
- Clutch
- Anti-lurk
- Deathmatch
- Range / Aim Trainer
- VOD Review
