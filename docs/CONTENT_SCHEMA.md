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
