# CONTENT SCHEMA

## 目的

Concept本文と根拠Sourceを分離し、**どの説明がどのEvidenceに支えられているか**を機械的にも人間にも追跡できるようにする。

## Canonical Data

- `data/sources.json` — Source metadataの正本
- `data/concepts/*.json` — Conceptごとの学習Content

Search indexや一覧用Dataは将来このCanonical Dataから生成する。

## Concept

主要Field:

- `id` — stable ID
- `titleJa` / `titleEn`
- `aliases`
- `category`
- `status`
- `updated`
- `definition`
- `goal`
- `claims`
- `practice`
- `deepDive` — Trigger / Action / Conditions / Example等の詳しい判断Content
- `relatedConceptIds`

## Claim

各Claimは文章だけでなくEvidence情報を持つ。

```json
{
  "id": "lurk-pattern-read",
  "text": "相手の配置や過去Roundの傾向を読んでTimingを作る。",
  "evidenceType": "Pro Practice",
  "strength": "Supported",
  "sourceIds": ["nats-lurk-youtube-2021", "nats-one-lurk-2023"],
  "siteSynthesis": false,
  "notes": []
}
```

## strength

- `Confirmed` — Official mechanic等で直接確認
- `Supported` — Relevant evidenceが明確
- `Context-dependent` — 条件によって変化
- `Weak` — Evidence不足 /補助的
- `Unverified` — 未確認

## evidenceType

- `Official / Mechanic`
- `Expert Practice / Analysis`
- `Academic General Principle`
- `Coaching Heuristic`
- `Community Observation`
- `Site Synthesis`

## Site Synthesis

複数Sourceからサイト側で判断モデルや学習用表現を組み立てた場合は必ず `siteSynthesis: true` にする。

Sourceがその文章を直接述べたように見せない。

## Source Record

最低限:

- `id`
- `title`
- `url`
- `publisherOrAuthor`
- `published`
- `sourceTier`
- `sourceType`
- `gameScope`
- `notes`

## Date / Patch

Current MetaやAgent mechanicへ依存するClaimではPatch / date applicabilityを追加する。

安定したTeamwork原理や歴史的Pro explanationも利用できるが、Current mechanicの証明にはしない。


## Deep Dive

短い定義やClaimだけでは、実戦判断に必要な条件差が落ちるため、Current Conceptは原則として `deepDive` を持つ。

```json
{
  "deepDive": [
    {
      "id": "trigger",
      "title": "いつ使うか",
      "summary": "この判断が必要になる状況。",
      "items": ["具体的な条件1", "具体的な条件2"],
      "sourceIds": ["source-id"],
      "siteSynthesis": true
    }
  ]
}
```

Current 15 Conceptでは原則として次を含める。

- Trigger — いつ使う / いつ判断するか
- Action — 具体的にどう動くか
- Conditions / Exceptions — 条件で何が変わるか
- Example — 実戦やVODでどう見えるか

Deep DiveもEvidence traceabilityの対象とし、`sourceIds` を持つ。
複数Evidenceを学習用に整理した文章は `siteSynthesis: true` にする。

短くするためにResearch上の条件・例外・判断手順を削除しない。


## Learning Domain Metadata

`data/domains.json` はConcept本文とは別に、User-facingな学習導線を管理する。

主要Field:

- `id` / `title` / `description`
- `startConceptId` — Domainで最初に案内するConcept
- `learningOrderIds` — 迷った時のRecommended Path。唯一の正解や強制順序ではない
- `conceptIds` — Domainから到達可能なConcept
- `sections` — テーマ別Browse用の小分類

Conceptの前提関係を各Concept JSONへ重複保存せず、Domainごとの案内順は `data/domains.json` をCanonical Dataとする。
