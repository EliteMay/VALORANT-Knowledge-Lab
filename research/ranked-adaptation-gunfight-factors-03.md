# Research 03 — 定石外の相手への対応 / 撃ち合いを構成する要素

Research date: 2026-09-19

## Research Questions

1. プラチナ〜ダイヤ帯など、相手が定石・期待通りに動かない試合で、何を基準に対応すべきか。
2. VALORANTの「撃ち合い」をエイムだけでなく分解すると、どの要素で構成されるか。
3. 今後どのConceptを優先して深掘りすべきか。

## Research Policy

- 「頭がおかしい動き」「ランダムな相手」のような評価語をKnowledge本文の分類には使わず、観測可能な行動として扱う。
- VALORANT固有の対応原則はプロ選手・プロコーチ・Riot公式を優先する。
- Platinum / Diamond固有の傾向は強い一次データが確認できないため、Coaching sourceはContext補助に限定する。
- FPS一般の論文は、視覚・運動・速度と精度などの一般原理だけに使う。
- Exact numberは公式仕様・十分な計測Evidenceなしに普遍Ruleへしない。

---

# Part A — 定石外・予想外の相手への対応

## 1. 問題の定義

ここで扱うのは次のような状況。

- 普通なら引く人数有利で前に出てくる
- 同じ場所を何度も前詰めする
- 情報が薄いのに即Rotateする
- 定番ではない位置に残り続ける
- 一度見せた動きと次Roundの動きが大きく違う
- こちらが「普通はこうする」と読んだ行動を相手がしない

重要なのは、相手の行動を「正しい / 間違い」で先に処理せず、**実際に何をしたか**をEvidenceとして扱うこと。

## 2. Core Evidence

### A1 — nAts: 相手の実際の傾向をRoundごとに追う

Sources:
- `nats-one-lurk-2023`
- `nats-one-cypher-2023`

nAtsは相手がどう守るか、どのAreaが空くか、過去Roundの位置・担当Areaを記憶し、その情報からPatternを見つけることを重視している。

### Project interpretation

「このランクなら普通こうする」より、
「**この試合のこの相手は実際に何を繰り返しているか**」
の方を優先して読む根拠になる。

---

### A2 — Paper Rex alecks: 相手対策より自分の基準を先に持つ

Source: `alecks-esportsdriven-2022`

alecksは、相手が構成や小さいDetailを変えると動きが大きく変わるため、完全な事前対策は難しいと説明している。

その上で:

- まず自分たちのGameへFocusする
- 相手のTendencyは拾う
- 予想外なら試合中に調整する
- 非常にPatientな相手には自分たちもTempoを落として対応した

### Project interpretation

**自分の基本形を持つこと**と**相手を観測して変えること**は両立する。

---

### A3 — NFX BlackWiz / TRY: 相手を見すぎると自分の勝ち筋まで壊れる

Source: `nfx-gamewith-own-game-2025`

BlackWizはREJECT対策を細かく行った時期について、相手が予想した作戦をしてこなかった場合に自分たちのPlayまで崩れたと説明している。

TRY coachも、相手を意識しすぎる傾向を減らし、自分たちが準備したStrategyを見せて相手側へ対応を要求する方向を勧めた。

### Project interpretation

「相手が変だから全部Counterしないと」と考えて、毎Round自分の基準を捨てるのも失敗になり得る。

---

### A4 — PRX vs ZETA: Top teamでも急なStyle変化は不意を突く

Source: `prx-zeta-unexpected-2025`

2025 VCT Pacificで、JingggはZETAが普段と異なる非常にAggressiveなPlayをして不意を突かれたと説明。alecksもPRXがそのAggressionへうまく対応できなかったと振り返った。

### Project interpretation

「予想外の相手に崩される」問題自体はLow / Mid rankだけの特殊現象ではない。
違いは、そこから**観測 → 共有 → 調整**をどれだけ速く行えるかにある。

---

### A5 — NRG bonkar: 適応しても自分のGameを失わない

Source: `bonkar-prx-press-2026`

PRXの変更されたCompositionに対して、bonkarはRound中もTeam全体で対応を話し合いながら、冷静さを保ち、自分たちのGameplayも維持したと説明している。

### Project interpretation

適応 = 毎回全部変える、ではない。

---

## 3. Rank-specific Context

Source: `upforge-plat-diamond-2026`

Platinum → Diamond向けCoaching articleではPlatinum lobbyについて:

- Over-peek
- Solo swing
- 取った人数有利を不要なFightで返す
- Utility / Timing / Round理解の不安定さ

等が挙げられている。

### Evidence boundary

これはCommercial coaching sourceであり、Platinum populationを測定した研究ではない。

したがってSiteでは:

- 「Platinumは必ずこう」
- 「Diamondから急に定石通りになる」

とは書かない。

User contextへ当てはめる補助Evidenceとしてのみ使う。

---

# 4. Current Synthesis — 「定石外対応」の判断モデル

以下は複数Sourceをまとめた **Site Synthesis**。

```text
① 自分の基本形を持つ
    ↓
② 相手が実際にした行動を見る
    ↓
③ 1回の奇行と、繰り返す傾向を分ける
    ↓
④ 繰り返す傾向だけに具体的な対策を置く
    ↓
⑤ 相手が変えたら、その対策を握り続けない
    ↓
⑥ 自分の基本形へ戻す
```

## 重要な考え方

### 「相手はこうするはず」ではなく「相手はさっき何をしたか」

nAts evidenceと一致。

### 1回だけの変なPlayへOverfitしない

NFX / alecks evidenceと整合。

### AggressionにはAggressionで毎回返さない

alecksはPatientな相手に対してPRX側のTempoを落とした例を説明している。

### 対策を置いたら目的を明確にする

例:

- 毎Round前詰め → 入口を2人でHoldしてTrade可能にする
- 即Rotateが続く → Fake / late pivot候補
- 同じOff-angle → 次Roundからその位置をClear候補に追加
- 毎回Re-peek → 最初のContact後にCrosshairを外さず再接敵を待つ候補

これらの具体例は **Site Synthesis** であり、プロ本人の固定Ruleではない。

## Do Not Turn Into a Universal Rule

- 変な相手には必ず待つ
- 2回やったら必ず3回目もやる
- Platinumは全員Over-peekする
- 相手が弱いほど定石を無視してよい
- 前詰めには必ず同じ場所で待つ

---

# Part B — 撃ち合いを構成する要素

## Working Model

「撃ち合い」をMouse aimだけで扱わず、少なくとも以下へ分解する。

```text
撃ち合う前
├─ 情報 / 相手の予測
├─ 角度 / 遮蔽物 / 距離
├─ クロスヘアの事前位置
├─ 武器 / Armor / Utility
└─ 味方との位置関係
        ↓
接敵
├─ Peek timing
├─ 視認 / Target acquisition
├─ Movement state
├─ Reaction / decision
└─ Mouse movement
        ↓
射撃
├─ First-shot accuracy
├─ Tap / Burst / Spray選択
├─ Speed–accuracy tradeoff
└─ Recoil / reset
        ↓
接敵後
├─ Re-peekするか
├─ Repositionするか
├─ Trade / Crossfireへ繋ぐか
└─ HP / Utility /人数差を再評価
```

これはResearch navigation用のSite Synthesis。

---

## B1. 情報・予測

Sources:
- `nats-one-lurk-2023`
- `royalg-dm-dotesports-2026`

nAtsはOpponent pattern / position情報を重視。
royalGのDeathmatch adviceでも、Soundから敵位置やPeekの仕方を読むことをMechanics trainingと分離せず扱っている。

### Research direction

Gunfightは「敵が画面に出てから」開始するのではなく、接敵前の情報で既に難易度が変わる。

---

## B2. Angle / Cover / Map Geometry

Sources:
- `riot-peeking-netcode`
- `riot-map-environments-2020`

Riot netcode articleは、HolderとPeekerでMap geometryが反応条件を変えることを説明している。
Map environment articleでも、Angles / Peeksを明瞭にし、Crosshair placementをGuideするようなEnvironment designを意識している。

### Safe claim

- Angle geometry
- Cover
- どこから相手が出られるか
- Crosshairをどこへ置いて待てるか

はGunfight前の主要Factor。

---

## B3. Peek timing / Reaction window / Network

Source: `riot-peeking-netcode`

RiotのControlled playtestでは、高Skill帯の均衡したGunfightで勝敗差が20–50ms程度になることがあった。

### Boundary

これは2020年のNetcode / development context。
現在の全Gunfightが20–50msで決まる、というRuleではない。

安全に使えるのは:

- 小さいTiming差が結果を変え得る
- Peeking / Holdingで見えるTimingが同一ではない
- GeometryとNetworkがReaction windowに関係する

という原理。

---

## B4. Movement state / Shooting accuracy

Source: `riot-patch-3-movement-accuracy-2021`

Riotは移動中射撃を弱め、「先を見越して正確な動きをした方がメリットを受ける」方向を明記している。

### Research direction

次回さらに:

- Stop timing
- Strafing
- Burst後の再移動
- Crouch
- Deadzoning / counter-strafe相当の実際のVALORANT挙動

をCurrent mechanicで再確認する。

---

## B5. Weapon × Distance × Armor

Source: `riot-data-phantom-vandal-2023`

Riot Insights Teamが400万超のUnrated / Competitive matchを全Rankから分析。

安全に言えること:

- Weaponの実戦結果はRangeで変わる
- Phantom / Vandalの特性差はRangeとArmor contextで変わる
- 「同じAimならGunfight条件は同じ」ではない

### Boundary

Phantom / Vandalの分析からShotgun / SMG / Operator全般を直接推論しない。

---

## B6. Crosshair placement / Target acquisition

Sources:
- `riot-map-environments-2020`
- `royalg-dm-dotesports-2026`

Riot map teamはCrosshair placementをGuideできるEnvironment cuesを意図的に設計している。
royalGはDeathmatch training要素としてPeeking / Crosshair placement / Movementを分けて練習するよう説明している。

### Research direction

今後:
- Head-height
- Pre-aim
- Angle transition
- Target switching
- Common vs uncommon angle clearing

を別Batchで深掘り。

---

## B7. Visual search / Eye movement

Source: `yang-eye-aiming-2025`

2025 peer-reviewed study:
- 63 participants
- experienced FPS = 28
- non-FPS = 35

Experienced FPS groupはAccuracyが単純に高いというより、より速いExecutionと効率的なEye movement patternを示した。
Target distanceとAppearance latencyもPerformanceへ影響した。

### Applicability

VALORANT固有Evidenceではない。
「エイム = Mouseだけ」ではなく、Visual detection / gaze efficiencyも構成要素という一般Evidenceに使う。

---

## B8. Mouse movement / Speed–Accuracy Tradeoff

Source: `donovan-kinematics-2022`

32 professional / semi-professional FPS playerをAim Lab taskで評価。
そのうちVALORANT specialistは4名。

主なRelevant point:

- Task demandに応じてMouse movement kinematicsが変わる
- SpeedとAccuracyにはTrade-offがある
- Skillful performanceは「常に最速」ではなく、Task demandに応じて速度と精度の比率を変えることと関係する

### Limitation

- Aim Lab task
- VALORANT ranked gunfightそのものではない
- AuthorsにStatespace Labs affiliationがある

---

## B9. Mental cueを普遍Ruleにしない

Source: `james-focus-aimlab-2023`

37 participantsを対象に、TargetへFocusするExternal focusと腕 / 手首へFocusするInternal focusを比較したが、Aiming performanceに有意なMain effectは見つからなかった。

### Why this matters

「敵だけ見ろ」
「腕を意識するな」
等を論文で証明済みの万能Ruleとして扱わない。

---

## B10. Team layer

Existing Research:
- Spacing
- Trade
- Crossfire
- Double Swing

Source batch:
- `lothar-drx-ns-analysis`
- `lothar-g2-edg-analysis`
- `thwifo-vlr-xset-2021`
- `boettcher-teamwork-2025`

個人のAimが同じでも:

- 味方との距離
- 同じThreatへ参加できるか
- 同時にPunishされないか
- 複数Angleを作れているか

でGunfightの形が変わる。

---

# Part C — 次に深掘りするResearch Queue

優先度は「Platinum〜Diamondで実戦への影響が大きく、現在SiteのEvidenceが薄い順」。

## Priority 1 — Peek selection / Angle isolation

調べる:
- Wide peek / short peek / jiggle / jump peek
- Angle isolation
- Wallからの距離
- 複数Angleを同時に晒す失敗
- Operator相手のPeek
- Utilityを先に使う条件

## Priority 2 — First bullet → Burst → Reset → Re-movement

調べる:
- 何発まで撃つかを固定Ruleにできるか
- Range別のTap / Burst / Spray
- 射撃後のAccuracy recovery
- Burst後に横移動する判断
- CrouchへCommitする条件

## Priority 3 — Off-angle / Re-peek / Reposition

調べる:
- 一度位置が割れた後に残る / 動く判断
- Re-peekのRisk
- Off-angleが機能する条件
- Numbers advantageで不要なFightを避ける判断

## Priority 4 — Weapon matchup

調べる:
- Rifle vs Operator
- Phantom vs Vandal
- SMG / ShotgunのRange設計
- Armor / HPによるFight selection
- Eco weaponで作るべき距離

## Priority 5 — Utility-assisted Gunfight

調べる:
- Flash swing
- Recon / reveal後
- Smoke edge
- Stun / slow
- Utility使用者とSwing側のTiming

## Priority 6 — 定石外対応の具体パターン

調べる:
- 毎Round前詰め
- 過剰Rotate
- Repeat peek
- Unusual off-angle
- Aggressive flank
- 人数有利で前に来る相手
- Utility無視のDry swing

各Patternについて:
- Trigger
- Cues
- Safe response
- Over-counterしない条件
- VOD review question
を作る。

---

# Current Research Decision

## Siteへ入れてよい

- 相手の「あるべき動き」ではなく、実際のRound behaviorをTrackする
- 自分の基本形を壊さず、観測したTendencyへだけ適応する
- 予想外のAggression / tempo changeはTop-level teamでも対応課題になる
- GunfightはAimだけでなく、情報・Geometry・Movement・Timing・Weapon / Range・Visual processing・Motor control・Team coordinationで構成される
- Weapon / distance、movement accuracy、peek timing等にはRiot公式Evidenceがある
- Visual search / speed–accuracyにはFPS一般のPeer-reviewed evidenceがある

## まだ断定しない

- Platinum / Diamondは必ずRandom
- Weird playerには必ずHoldが正解
- 同じ行動を2回したら3回目も確定
- Wide peekが常に強い / 弱い
- Crouch sprayは常に悪い
- Tap / Burstの普遍的な固定距離
- AimではExternal focusが必ず優れる



---

# Priority 1 初回深掘り — Peek / Angle Clearing

## P1-1. 強く言えること

### Crosshair placement / Jiggling / Movement / Angle takingは別々ではない

Source: `yay-fundamentals-youtube-2020`

yay本人のFundamentals教材は、Crosshair placement、Jiggling、Movement、Angle / Fightの取り方を同じ基礎セットとして扱っている。

### Map側もAngle / Peek / Crosshair placementを前提に作られている

Sources:
- `riot-map-environments-2020`
- `riot-peeking-netcode`

RiotはMapのAngles / Peeksを明瞭にし、Crosshair placementをGuideできるEnvironment designを行っている。
またNetcode articleでは、Holder / Peekerの見え方とMap geometryがReaction条件へ影響すると説明している。

### Moving fireは距離・武器によって成立度が違うが、意図したMovementを優先する方向

Sources:
- `riot-patch-3-movement-accuracy-2021`
- Riot Patch 9.10（Research cross-check）

Riotは複数PatchでMovement speedとAccuracyの関係を意図的に調整している。

## P1-2. まだ弱いこと

Current primary evidenceだけでは次をUniversal Ruleへしない。

- Wide peekは常にJiggleに勝つ
- Jiggleは必ずOperator相手に使う
- Wallから必ず○m離れる
- CrosshairをCornerから必ず○Head分離す
- Slice the pieを必ず一定幅で行う
- Shoulder peekとJiggle peekを厳密な固定動作として区別する

これらはCoaching guideでは頻出するが、Primary pro / Riot sourceでExact conditionをまだ十分Cross-checkできていない。

## P1-3. 現段階の安全な学習モデル

これは **Site Synthesis**。

```text
Peekする前
↓
何を得たい？
├─ 情報
├─ Shotを誘いたい
├─ Spaceを取りたい
└─ Kill / Tradeを取りたい
↓
敵位置は分かる？
├─ No → 一度に複数Angleを晒さないClearを優先
└─ Yes → Crosshair / Movement / Utility / TradeをそのThreatへ合わせる
↓
自分は止まって正確に撃てる？
↓
味方はTrade / Utilityで参加できる？
```

Peek名を先に選ぶのではなく、
**目的 → 情報量 → 晒すAngle数 → 射撃可能状態 → 味方Support**
の順で判断するモデルとして今後検証する。

## Next Evidence Needed

- Current pro / coachによるWide / Jiggle / Jump peekの直接解説
- Operator対策としてのPeek選択
- Wallからの距離とPerspective advantageのCurrent VALORANT verification
- Angle isolationのPro VOD example
- Peek後のStop / Shoot / Re-movementのCurrent mechanic


---

# Loop 3 — Movement / Shooting

## New Core Evidence

### royalG — Peeking purpose / isolation

Source: `royalg-peeking-youtube-2023`

Direct high-Radiant coach/player guide. The video structure explicitly covers:

- having a purpose before the peek;
- considering the enemy perspective;
- isolating fights;
- preparing to fight.

Project use:

- strengthens the current Peek / Angle Isolation concept;
- supports purpose-first peeking rather than treating a named peek type as universally correct.

Boundary:

- do not turn the video's heuristics into universal exact wall-distance or angle rules.

### Riot Patch 11.08 — Tap / Burst / Spray selection

Source: `riot-patch-11-08`

Riot states that tap-strafing had been generally the most viable rifle style on PC and that the goal was to make the choice among tapping, bursting and spraying a more meaningful situational optimization.

The patch specifically targeted rifle spray viability at close and mid range.

Project use:

- supports a dedicated Movement / Shooting concept;
- supports teaching shooting style as context-dependent rather than one universal pattern.

Boundary:

- recoil numbers are patch-specific;
- the cited rifle section is PC-specific;
- no universal fixed distance is adopted for tap / burst / spray.

## Loop 3 Decision

Promoted to current Site:

- `movement-shooting-cycle` — 移動・停止・射撃

Current safe claims:

- movement state affects accuracy;
- tap / burst / spray choice is situational;
- firing again before recovery can accumulate inaccuracy;
- spray value depends on range / weapon context;
- movement, first-bullet accuracy, peeking and crosshair placement can be practiced as separate components.

Still not safe as universal rules:

- fixed meter thresholds for tap / burst / spray;
- always strafe after exactly N bullets;
- always spray at close range;
- always tap at long range;
- a fixed counter-strafe timing requirement.
