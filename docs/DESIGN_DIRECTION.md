# Design Direction — VALORANT Knowledge Lab

Date: 2026-09-19

## Target Type

- Primary Task: Homeで伸ばしたい大枠を選び、その分野からVALORANTの戦術Conceptへ入り、判断材料 → 失敗 → 練習 → 根拠の順に読む
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


## Readability Reset — 2026-09-19

### User Feedback

Current site is difficult to use and difficult to read.

### KEEP / FIX / REMOVE

**KEEP**
- Home → Learning Domain → Concept の大枠
- Night mode
- Claim → Sourceの追跡可能性
- Domain内Search
- 日本語優先

**FIX**
- Article titleが大きすぎて本文開始まで遠い
- Sidebarが太く本文幅を圧迫する
- ClaimのEvidence metadataが常時表示され、本文と同じ強さに見える
- Home / Domainの選択要素が大きく、一覧性が低い
- Section間のVisual hierarchyが強すぎる

**REMOVE / REDUCE**
- Background grid
- 大きなDecorative signal
- 巨大なVOD装飾文字
- Evidence metadataの常時展開
- English subtitleの常時表示

### Representative Reference Findings

- Mobalytics VALORANT: 最初に学ぶ対象を選ばせ、全情報を一度に露出しない
- Skill Capped: Random guide一覧より「何を次に学ぶか」の順序を強くする
- Aimlabs Courses: Course → Lessonの階層で、学習単位を段階的に見せる

### Selected Direction

**Compact Documentation / Progressive Disclosure**

- Home: 7 Domainをcompactな選択単位として表示
- Domain: Conceptを短い説明付きListで比較
- Concept: Sidebar + readable main column
- Article内: 重要ポイント / 見る・失敗 / 練習 / 根拠へのshortcut
- Claim: 本文をPrimaryにしつつ、信頼度 / 根拠の種類 / 出典数は常時表示。個別Source対応だけ「対応する出典を見る」で展開
- Sources: Page末尾の出典一覧は常時表示し、Research depthを隠しすぎない
- 本文幅は約60〜70文字相当を上限候補とし、長文の横幅を広げすぎない
- 赤AccentはNavigation / Focus / Evidence affordanceへ限定する

## Design Direction Contract

- Design Concept: Tactical Field Manual
- Layout Type: Home / Domainはfull-width learning hub、Concept詳細はDesktopでleft navigation + reading pane、Mobileはstacked navigation + article
- Navigation Type: Home domain hub → domain concept list → concept detail。Concept詳細ではdomain-scoped Search + concept list
- Content Density: Medium。VLRより緩く、一般Blogより高密度
- Typography: 本文可読性優先。見出しのみ太く直線的にする
- Color Rule: dark navy / warm off-whiteを基盤、VALORANTを想起させるred accentは重要箇所だけ。Night modeでは本文面をdeep navyへ反転し、pure blackは使わず階層をborder / surface差で維持する
- Component Rule: 全情報をCard化しない。Section / dividerを基本とし、EvidenceやPracticeなど独立性の高い情報だけPanel化
- Decorative Effect Policy: 強いshadow / glass / glowは使わない。斜めAccent、細いline、selected stateでIdentityを作る
- Signature: Claim本文の直下でEvidence summaryを確認でき、必要時に対応Sourceまで展開できる「Evidence Summary + Disclosure」

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

Home
→ Learning Domain
→ Domain Concept List
→ Concept
→ Definition / Goal
→ Key Claims
→ Cues / Mistakes
→ Practice
→ Evidence / Sources
→ Related Concepts

Current Learning Domains:

- ミクロ
- マクロ
- エイム・メカニクス
- ポジショニング・角度
- 情報・判断
- 武器・距離
- 連携

HomeはMarketing Heroではなく、最初の学習判断を行うHubとして扱う。独立して選べる学習分野なのでDomainはCard表現を使うが、Domain内Conceptは比較しやすいListを基本にする。

## Accessibility / Responsive

- Keyboard focusを明示する
- 赤だけで状態差を表さない
- Body textのcontrastを確保する
- MobileではNavigationを本文上に移動し、Concept listを横スクロールにしない
- Motionは最小限。prefers-reduced-motionを尊重する
