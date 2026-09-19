# Design Direction — VALORANT Knowledge Lab

Date: 2026-09-19

## Target Type

- Primary Task: VALORANTの戦術Conceptを探し、定義 → 判断材料 → 失敗 → 練習 → 根拠の順に読む
- Content Model: Structured knowledge / reference + evidence
- Audience: 基礎ルールを理解済みで、知識面を伸ばしたいVALORANTプレイヤー
- Usage Frequency: Ranked前後やVOD Review時に繰り返し使う
- Density: Medium
- Primary Device: Desktop優先、Mobileでも閲覧可能
- Visual Material: Text中心。将来Map / Diagram / Clipを追加可能
- Tone: Tactical / analytical / serious

## Representative References

### VALORANT Official

https://playvalorant.com/ja-jp/

Borrow:
- 強い赤Accent
- Dark / warm-neutral contrast
- 角度を感じる切り替えや直線的なBrand feel

Do not copy:
- 巨大Hero
- Promotion中心のPage composition
- 公式Logo / Artwork依存

### Mobalytics VALORANT

https://mobalytics.gg/valorant/welcome

Borrow:
- 「学ぶ対象」から直接入る構造
- Map / Agent / Lessonなど、Task別に情報へ到達しやすい設計

Do not copy:
- Companion App的なFeature promotion
- Account / Tracker前提のUI

### VLR.gg

https://www.vlr.gg/

Borrow:
- Competitive player向けの高い情報密度
- Navigationを派手にせずContentを主役にする考え方

Do not copy:
- Forum / Match feedの高密度そのもの
- 初見Userには難しい情報圧縮

## Fit for This Project

このProjectはMarketing siteではなく、繰り返し読むKnowledge Reference。

そのためFirst ViewをHeroに使わず、Concept selectionと本文に使う。

## Design Direction Contract

- Design Concept: Tactical Field Manual
- Layout Type: Desktopはleft navigation + reading pane、Mobileはstacked navigation + article
- Navigation Type: Search + category filter + concept list
- Content Density: Medium。VLRより緩く、一般Blogより高密度
- Typography: 本文可読性優先。見出しのみ太く直線的にする
- Color Rule: dark navy / warm off-whiteを基盤、VALORANTを想起させるred accentは重要箇所だけ。Night modeでは本文面をdeep navyへ反転し、pure blackは使わず階層をborder / surface差で維持する
- Component Rule: 全情報をCard化しない。Section / dividerを基本とし、EvidenceやPracticeなど独立性の高い情報だけPanel化
- Decorative Effect Policy: 強いshadow / glass / glowは使わない。斜めAccent、細いline、selected stateでIdentityを作る
- Signature: ClaimごとにEvidence strengthとSourceをその場で追跡できる「Evidence Rail」

## Language Contract

- User-facing UIと本文は日本語を基本にし、英語を知らなくても意味が通ることを優先する
- 英語はVALORANTの定着用語、英語表記の補助、選手・媒体名、外部Sourceの原題など必要な場所だけ残し、本文中で使う場合は日本語だけでも理解できる表現にする
- Evidence strength / type / status / source type / game scopeなど内部Schemaの英語値は、画面では日本語へ変換する
- 日本語だけ読んでも操作・状態・根拠の意味が理解できることを優先する

## Theme Contract

- Header / Sidebarのdark tactical shellはLight / Nightで共通に保つ
- Light modeは既存のwarm off-white reading surfaceを維持する
- Night modeは本文・Evidence・Card相当Surfaceをdeep navy系へ変え、red accentの意味を変えない
- Theme未選択時はOSの `prefers-color-scheme` を初期値として使う
- UserがLight / Nightを明示切替した後はBrowser localStorageで保持する
- Theme切替でContent、Navigation、Evidence hierarchy、Layoutを変えない
- Browser form controls / scrollbar等のUA surfaceにも現在Themeを伝えるため `color-scheme` を合わせる

## Structure Decision

Main flow:

Search / Category
→ Concept
→ Definition / Goal
→ Key Claims
→ Cues / Mistakes
→ Practice
→ Evidence / Sources
→ Related Concepts

## Accessibility / Responsive

- Keyboard focusを明示する
- 赤だけで状態差を表さない
- Body textのcontrastを確保する
- MobileではNavigationを本文上に移動し、Concept listを横スクロールにしない
- Motionは最小限。prefers-reduced-motionを尊重する
