# REQUIREMENTS

## 1. Product Core

VALORANTの試合で起きる状況を、知識と判断から理解・改善するための学習サイトにする。

単なる用語辞典ではなく、各Conceptについて次を理解できることをPrimary Outcomeとする。

- 何を意味するか
- 何の問題を解決する考え方か
- いつ使うか
- 何を見て判断するか
- 具体的にどう動くか
- 典型的な失敗
- 条件によって変わる点
- どう練習・振り返りするか
- その説明の根拠は何か

## 2. Primary User

VALORANTをプレイしていて、エイム以外のゲーム理解・ミクロ判断・連携を伸ばしたいプレイヤー。

初期段階では個人学習で使いやすいことを優先しつつ、GitHub Pages等で一般公開可能なPublic Contentとして設計する。初期の実戦想定としてプラチナ〜ダイヤ帯で起きる、定石外・予想外の行動にも対応できる判断知識を重視する。

## 3. Project Profiles

`STATIC + DATA + LEARNING + PUBLIC-CONTENT`

## 4. MVP Scope

### Research / Content Foundation

- Source hierarchyを定義する
- ClaimとSourceの対応を記録する
- 複数Sourceの一致・不一致・条件差を残す
- Patch / 時期依存情報と比較的安定した原理を区別する
- AI SynthesisをOriginal Evidenceと混同しない

### Current Learning Topics

1. 撃ち合いの構造
2. ポジショニング
3. クロスヘア配置 / プリエイム
4. ピーク / 角度分離
5. 移動・停止・射撃
6. カバー / トレード
7. スペーシング
8. クロスファイア
9. ダブルスイング
10. アンカー
11. 情報 → 判断 → 実行
12. コミュニケーション / コール
13. マップコントロール
14. ラーク
15. 定石外の相手への対応

Current Siteは15Conceptを閲覧可能にする。新規5Conceptは、既存10Conceptとの重複を避け、プロ教材・Riot公式・査読研究等を照合したResearch-backed Draftとして追加する。

### Initial Web Surface

- Static HTML / CSS / JavaScriptで動作する
- Homeで大枠の学習分野を選び、その分野の「まずここから」→おすすめ学習順→テーマ別Concept一覧から記事へ進める
- Concept詳細では選択中の大枠に属するConceptをSearchできる
- ConceptごとにDefinition / Goal / Claims / Deep Dive / Cues / Mistakes / Practice / Evidence / Recommended Next / Related Conceptsを表示する
- ClaimのEvidence strength / typeを表示する
- Claim本文に加えて、信頼度・根拠の種類・出典数は常時確認できる。個別の出典対応だけProgressive Disclosureで開閉する
- Concept記事には主要Sectionへのページ内Shortcutを置き、長い縦スクロールでも目的位置へ移動しやすくする
- 記事本文の可読性を優先し、巨大見出し・過度な装飾・高密度な常時表示でPrimary Contentを圧迫しない
- Source Tier / Source Type / Author / Date / Game Scopeを追跡できる
- Concept URLは `#concept-id` で直接共有できる
- DesktopをPrimaryにしつつMobileでも主要ContentとNavigationを失わない
- User-facing UIと本文は日本語を基本とし、英語を知らなくても意味が通る文章にする。英語はVALORANT用語・固有名詞・原文Source等で意味がある場合のみ補助的に残す
- ライト / ナイトモードを切り替えられる
- Themeを明示選択していない初回はOSのlight / dark設定を反映し、Userが切り替えた後は同じBrowserで選択を保持する
- Account / Auth / Backend / Cloud DBをMVPへ追加しない

## 5. Later Content Candidates

- 武器 × 距離 × アーマーの深掘り
- ローテーション判断
- Anti-lurk
- Retake / Post-plant
- 人数有利・人数不利
- Utility follow-up
- Mid-round decisionのScenario化
- Deathmatch / Range / Aim Trainerの練習レイヤー
- VOD Reviewの専用レイヤー

Default、オフアングル、リピーク、位置変更は、現時点ではそれぞれマップコントロール / ポジショニングのDeep Diveとして扱い、重複記事を増やさない。

この一覧は固定Navigationではなく、ResearchとContent増加に応じてTaxonomyを見直せる候補とする。

## 6. Content Contract

Concept Pageは原則として次を持つ。

1. 一言定義
2. 目的 / 解決する問題
3. Trigger — いつ使うか
4. Cues — 何を見るか
5. Action — どう動くか
6. Mistakes — 典型的な失敗
7. Conditions / Exceptions — 条件差
8. Pro / Match Example
9. Practice / VOD Review Question
10. Evidence / Sources
11. Related Concepts

定義だけ、または「こうすると強い」という結論だけでLesson完成扱いにしない。

Current Conceptは、上部の短い要約に加えて、Trigger / Action / Conditions・Exceptions / ExampleをDeep Diveとして持つ。読みやすさのために要約しても、Researchで確認できた判断条件・例外・実戦適用を削りすぎない。

## 7. Evidence Contract

重要Claimは可能な限り複数の独立Sourceで照合する。

優先順位:

- Primary: Riot / VCT公式、本人によるプロ選手・コーチ・IGLの解説、査読論文、Systematic Review
- Strong Secondary: 名前付きプロ・コーチへの直接Interview、信頼できるesports媒体の一次発言
- Supplementary: 専門Coaching / Analysis記事
- Discovery Only: Reddit / Forum / SNSの一般投稿

同じ人物の同じ発言を複数記事が紹介している場合、独立Evidenceとして水増ししない。

Source同士が食い違う場合は多数決で消さず、Map / Agent / Composition / Rank / Patch / Team System等の条件差を確認する。

## 8. Interpretation Contract

サイト本文では次を区別する。

- `Official / Mechanic` — Riot等で確認できる仕様
- `Expert Practice / Analysis` — プロ選手・Coach・IGL・VCT Analyst等の直接解説 / 実戦分析
- `Academic General Principle` — VALORANT以外を含む研究から言える一般原理
- `Coaching Heuristic` — 実践用の目安
- `Site Synthesis` — 複数Evidenceを整理してサイト側でまとめた内容

「5m」「1秒」などのExact Numberは、公式仕様または十分な計測根拠がない限り普遍的Ruleとして扱わない。

## 9. Primary User Flow

### 通常の入口

Home
→ 大枠の学習分野を選ぶ
→ まず読むConcept / おすすめ学習順 / テーマ別一覧
→ Concept Page
→ 判断材料 / 失敗 / 練習 / 根拠
→ Related Concept

### 共有URL / 学びたいConceptが決まっている

Concept Deep Link
→ Concept Page
→ 選択中の大枠に属するConcept一覧
→ Related Concept

Searchは壊れた分類の代替ではなく、選択中の大枠で目的のConceptへ早く到達する補助として使う。

## 10. Information Architecture

User-facing Top-level Learning Domains:

1. ミクロ
2. マクロ
3. エイム練習

Homeではこの3つだけをPrimary Choiceとして表示する。ポジショニング・角度 / 情報・判断 / 武器・距離 / 連携等は、各Primary Domain内の小分類として扱う。

1つのConceptは複数Domainへ所属できる。ピーク / 角度分離のように複数の学習目的へ関係する知識を無理に1分類へ固定しない。

Learning Domainの所属関係・最初に読むConcept・おすすめ学習順・Domain内の小分類は `data/domains.json` をCanonical Dataとし、各Concept JSONへ重複保存しない。

既存の information-map-control / team-coordination / defense / peek-duel 等はContent管理・記事内文脈用の細分類として維持できるが、Primary Home Navigationにはしない。

Current Homeでは「ミクロ / マクロ / エイム練習」の3択だけを出す。各Domain内では「まず読む1本」→おすすめ学習順→テーマ別Concept一覧を提示し、一本道を強制せず迷った時の順序を提供する。

アビリティ・セットアップも重要な将来Domain候補とする。ただしフラッシュ / スモーク / スタン / 索敵等の専用Conceptが十分に揃うまでは、空のPrimary Domainとして表示しない。

## 11. Data / Storage

初期はStatic Siteを基本とし、Concept ContentとSource metadataはHTMLへ大量直書きせずStructured Dataとして分離する。

Canonical Contentから検索Index等を再生成可能にし、Derived Indexを第二Source of Truthにしない。

Theme preferenceのみBrowserのlocalStorageへ保存してよい。Knowledge ContentのSource of Truthや学習DataをlocalStorageへ複製しない。

初期MVPでAccount / Cloud DB / Authは導入しない。

## 12. Non-breakable Contracts

- 根拠を確認していない内容を確認済みFactとして書かない
- AIの独自考察をプロ本人や論文のClaimとして見せない
- Source date / contextを無視して古いMetaやAgent仕様をCurrent Factとして扱わない
- Community opinionだけで重要な戦術Ruleを確定しない
- Exact NumberのHeuristicを普遍的なゲーム仕様として断定しない
- Contradictionや例外を都合よく削除しない
- Site表示用のHTML / JSへContent本文を複製し、Canonical JSONと二重管理しない

## 13. Non-goals for Initial MVP

- 全AgentのLineup集
- Patch note全文Archive
- Tracker / Match history機能
- Login / Cloud sync
- AI Coachによる自動判定
- 見た目だけをContent品質より優先すること

## 14. Completion Conditions for Research Foundation

- Source採用基準がRepositoryに存在する
- Initial IAとConcept Page Contractが存在する
- ラーク / アンカー / カバー・トレードのEvidence Mapが存在する
- 各Core Claimが「どのSourceから来たか」を追跡できる
- Source間の一致 / 条件差 / 未確定を記録できる
- 実装担当が独自判断で内容を捏造せずContent化できる

## 15. Completion Conditions for Static Site MVP

- 15ConceptをCanonical JSONから表示できる
- Current 15ConceptすべてにDeep Diveがあり、Trigger / Action / Conditions・Exceptions / Example相当の情報を確認できる
- Home → Learning Domain → Conceptの主要導線が動く
- 全Current Conceptが少なくとも1つのLearning Domainから到達できる
- Domain内Search / おすすめ学習順 / Recommended Next / Related Concept navigationが動く
- ClaimとSourceを画面上で追跡できる
- Missing / loading / error stateを持つ
- Loadingが一定時間を超えた場合は永久待機せずErrorへ遷移し、再試行手段と失敗理由を表示する
- Keyboard focusと主要Responsive Layoutが定義されている
- ライト / ナイトモードの切替、OS初期設定、明示選択の保持が実装されている
- Static validationでConcept file / Source ID参照が壊れていない
- 最終状態をBrowser / Screenshotで確認する。確認できない場合はUnverifiedとして明示する

## 16. Open Items

Blocking Decision: None.

Visual Directionは [docs/DESIGN_DIRECTION.md](docs/DESIGN_DIRECTION.md) をCurrent Design Contractとする。
