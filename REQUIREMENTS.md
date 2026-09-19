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

### Initial Learning Topics

1. ラーク
2. アンカー
3. カバー / トレード
4. スペーシング
5. クロスファイア
6. ダブルスイング / Double Peek
7. 定石外の相手への対応
8. 撃ち合いの構造
9. ピーク / 角度分離
10. 移動・停止・射撃

初回6テーマを基盤とし、プラチナ〜ダイヤ帯で実戦上重要な「定石外対応」と「撃ち合い」の4テーマを追加した10ConceptをCurrent Siteとして閲覧可能にする。

### Initial Web Surface

- Static HTML / CSS / JavaScriptで動作する
- Homeで大枠の学習分野を選び、その分野に属するConcept一覧から記事へ進める
- Concept詳細では選択中の大枠に属するConceptをSearchできる
- ConceptごとにDefinition / Goal / Claims / Cues / Mistakes / Practice / Evidence / Related Conceptsを表示する
- ClaimのEvidence strength / typeを表示する
- Evidence metadataは本文より弱いVisual priorityとし、必要時に展開できるProgressive Disclosureを使う
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

- 相手の癖・ラウンド傾向の読み方
- 武器 × 距離 × アーマー
- オフアングル / リピーク / 位置変更
- Default / Map Control
- ローテーション判断
- Anti-lurk
- Retake / Hold
- 人数有利・人数不利
- Peek選択
- Utility follow-up
- 情報からActionへの変換
- Call / Communication
- Mid-round decision
- VOD Review

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
→ その分野のConcept一覧
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
3. エイム・メカニクス
4. ポジショニング・角度
5. 情報・判断
6. 武器・距離
7. 連携

1つのConceptは複数Domainへ所属できる。ピーク / 角度分離のように複数の学習目的へ関係する知識を無理に1分類へ固定しない。

Learning Domainの所属関係は `data/domains.json` をCanonical Dataとし、各Concept JSONへ重複保存しない。

既存の information-map-control / team-coordination / defense / peek-duel 等はContent管理・記事内文脈用の細分類として維持できるが、Primary Home Navigationにはしない。

撃ち合いを構成する主要軸として、Current Homeでは「ミクロ / マクロ / エイム・メカニクス / ポジショニング・角度 / 情報・判断 / 武器・距離 / 連携」を扱う。

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

- 10ConceptをCanonical JSONから表示できる
- Home → Learning Domain → Conceptの主要導線が動く
- 全Current Conceptが少なくとも1つのLearning Domainから到達できる
- Domain内Search / Related Concept navigationが動く
- ClaimとSourceを画面上で追跡できる
- Missing / loading / error stateを持つ
- Keyboard focusと主要Responsive Layoutが定義されている
- ライト / ナイトモードの切替、OS初期設定、明示選択の保持が実装されている
- Static validationでConcept file / Source ID参照が壊れていない
- 最終状態をBrowser / Screenshotで確認する。確認できない場合はUnverifiedとして明示する

## 16. Open Items

Blocking Decision: None.

Visual Directionは [docs/DESIGN_DIRECTION.md](docs/DESIGN_DIRECTION.md) をCurrent Design Contractとする。
