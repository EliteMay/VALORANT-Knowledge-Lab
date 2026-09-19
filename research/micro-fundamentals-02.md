# Research 02 — Spacing / Crossfire / Double Swing

Research date: 2026-09-19

## Research Question

味方と一緒にFightするとき、Spacing・Crossfire・Double Swingは何が違い、何を見て使い分けるべきか。

## Current Evidence Summary

### High-level VALORANT evidence

#### Lothar — DRX vs NS

Source: `lothar-drx-ns-analysis`

VCT analyst LotharはDRXのFundamentalsとして次を並べて評価している。

- Great spacing
- Well-timed double peeks
- Efficient crossfire setups

さらにNSについて、Engagement後のSpacing不足を改善点として挙げている。

**Interpretation:** Spacing / Double Peek / Crossfireは別々の用語だが、Teamfightを孤立した1v1にしないための連結したFundamentalとして扱える。

#### Lothar — G2 vs EDG

Source: `lothar-g2-edg-analysis`

- G2のbetter spacing & tradingを、EDGのMistakeをPunishできた理由の一つとして評価。
- EDGはno trades / spacing問題を指摘されている。
- G2のpatienceとwell-structured crossfiresを成功要因として挙げている。

#### thwifo — XSET Interview

Source: `thwifo-vlr-xset-2021`

thwifoは当時のXSETについて、複雑なStrat以前にTrading / Communication / Spacingが良かったためSolidだったと振り返っている。

**Cross-check:** Spacing / Tradingを「高度なSet playの後に学ぶ小技」ではなく、Teamplayの基礎として扱う根拠になる。

---

# 1. Spacing

## Working Definition

味方と同じFightへ参加できるだけ近く、かつ同じSpray / Utility / Movement collisionでまとめてPunishされにくい位置関係を作ること。

これはSite Synthesis。普遍的な距離数値ではなく、**Fightへの接続性**で定義する。

## Strongly Supported Principles

### A. 離れすぎるとTradeが切れる

Sources:

- `lothar-g2-edg-analysis`
- `lothar-drx-ns-analysis`
- `thwifo-vlr-xset-2021`
- `kaizens-trade-spacing-2026`

VCT-level analysisではPoor spacingが孤立やNo tradeと結び付けられ、Good spacingがPunish / coordinated peekと結び付けられている。

### B. 近ければ近いほど良いわけではない

Source:

- `kaizens-trade-spacing-2026`

Coaching evidenceでは、同じSpray / Utilityで2人ともPunishされるほど重なる状態を失敗として扱う。

### C. 正しいSpacingはGeometryで変わる

Source:

- `kaizens-trade-spacing-2026`

Corner、Choke、Wide lane、Line of sightによって「同じThreatへすぐ参加できる距離」は変わる。

## Do Not Turn Into a Universal Rule

- 必ず5m
- 必ず1秒
- 常に前の人の真後ろ
- Minimap上で近ければTrade可能

## Practical Check — Site Synthesis

```text
味方が今Contactしたら
↓
自分は同じThreatをWeapon-readyで見られる？
├─ No → 遠すぎる / LOSが切れている / 別Role
└─ Yes
   ↓
同じEnemy actionで2人ともまとめてPunishされる？
├─ Yes → 重なりすぎ
└─ No → Connected spacing候補
```

---

# 2. Crossfire

## Working Definition

2人以上が同じZone / 進行経路を**異なるAngle**からCoverし、相手が一方へAim / Moveしたときに別AngleからPunishできるSetup。

### Evidence

- `lothar-drx-ns-analysis`: DRXのefficient crossfire setupsをFundamentalとして評価。
- `lothar-g2-edg-analysis`: G2のwell-structured crossfiresを成功要因として評価。

## Important Distinction

Crossfireは「2人とも同じ場所を見る」だけではない。

主眼は:

- Enemyに複数Angleを同時に解かせる
- 片方へのContactをもう片方のTriggerにする
- 2人が同じLineに重なって一発で処理されない
- 相手が1v1を順番に取れる形を避ける

## Failure Modes

- 2人のAngleがほぼ同じで、Enemyから1本のLineとして処理できる
- 片方が早くPeekしてCrossfireを解除し、孤立Fightにする
- 一方がContactしても他方から見えない
- Utilityで両方まとめて無効化される

## Exact Angle Warning

「必ず90° / 180°」などの固定角度Ruleは採用しない。

Map geometry、Cover、Utility、Enemy entry pathにより成立条件が変わる。

---

# 3. Double Swing / Double Peek

## Definition

Source: `redbull-valorant-terms-double-swing`

2人が同時にCoverから出てKillまたはTradeを狙うPlay。

## VCT Evidence

Source: `lothar-drx-ns-analysis`

DRXの「well-timed double peeks」がGood fundamentalsの一部として評価されている。

## Why It Is Different From Trade

### Trade

1人目が先にContactし、2人目が相手のReset前にPunishできる状態を作る。

### Double Swing

2人がほぼ同じTimingでFightを開始し、Opponentに複数Target / Angleへの即時対応を要求する。

## Timing

Riot公式Netcode解説 `riot-peeking-netcode` は、Competitive gunfightでは小さなTiming差が結果へ大きく影響し得ることを示している。

ただし、これは「Double Swingは○ms差が正解」という研究ではない。

したがって現段階では:

- `well-timed` は採用できる
- 固定ms / 固定countdownは採用しない
- Geometry / Movement speed / LOS / UtilityでTimingは変わる

## Failure Modes

- 片方だけ先に出て、結局2回の1v1になる
- 2人が同じLineへ重なり、Spray transfer / collateralを受ける
- Flash / Stun等のSupportとSwing timingがズレる
- 2人が別Threatを見て、同じFightになっていない

---

# 4. Relationship Model

```text
Spacing
= 一緒にFightへ接続できるPosition関係
        ↓
   ┌────┴─────┐
   ↓          ↓
Trade       Double Swing
順番に      ほぼ同時に
Punish      Fight開始
   ↓          ↓
   └────┬─────┘
        ↓
Crossfire
異なるAngleから
同じZoneを挟むSetup
```

これは学習用のSite Synthesis。

CrossfireはTradeやDouble Swingと排他的ではなく、CrossfireからContact後にSwingしてTradeする場合もある。

---

# 5. What Is Still Weak / Unknown

## Needs stronger primary pro evidence

- Double Swingの最適なTimingの決め方
- Attack entry時とDefense人数有利時でのDouble Swingの使い分け
- Operatorに対するDouble SwingでUtilityを必須とする条件
- Crossfireを解除して主动的にSwingするTrigger
- Map geometryごとのSpacing protocol

これらは次回、Pro / Coach / Analystの直接解説やVOD-based analysisを優先して補強する。

## Research Decision

現時点でSite本文へ入れてよいのは:

- Spacing / Tradingはpro-level fundamentals
- Good spacingはTrade / coordinated peekへ接続する
- Crossfireは異なるAngleで同じZoneを守るSetup
- Double Swingは2人が同TimingでFightを開始するPlay
- Exact meter / seconds / millisecondsは普遍Ruleにしない

まだ入れない:

- 「理想距離5m」
- 「1秒以内なら必ずTrade」
- 「Double Swingは○ms差」
- 「Crossfireは必ず90°」
