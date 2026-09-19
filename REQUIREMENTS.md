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

初期段階では個人学習で使いやすいことを優先しつつ、GitHub Pages等で一般公開可能なPublic Contentとして設計する。

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

初回3テーマを完成させた後、隣接Conceptへ拡張する。

## 5. Later Content Candidates

- スペーシング
- クロスファイア
- ダブルスイング / Refrag
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
- `Pro Practice` — プロ本人・チーム関係者の実践・説明
- `Academic General Principle` — VALORANT以外を含む研究から言える一般原理
- `Coaching Heuristic` — 実践用の目安
- `Site Synthesis` — 複数Evidenceを整理してサイト側でまとめた内容

「5m」「1秒」などのExact Numberは、公式仕様または十分な計測根拠がない限り普遍的Ruleとして扱わない。

## 9. Primary User Flow

### 学びたいConceptが決まっている

Search / Concept Index
→ Concept Page
→ Trigger / Cues / Action
→ Mistakes / Exceptions
→ Practice
→ Related Concept

### 何を学ぶべきか分からない

Situation / CategoryからBrowse
→ 関連Conceptを比較
→ Concept Page
→ Practice / VOD Review

Searchは壊れた分類の代替ではなく、Browseと併用する。

## 10. Initial Information Architecture

暫定Top-level:

- 情報・Map Control
- 味方との合わせ
- 守り・Anchor / Retake
- Peek・Duel選択
- Mid-round判断
- Communication
- 振り返り・練習

Glossaryは補助導線として利用できるが、サイト全体を用語辞典構造にはしない。

## 11. Data / Storage

初期はStatic Siteを基本とし、Concept ContentとSource metadataはHTMLへ大量直書きせずStructured Dataとして分離する。

Canonical Contentから検索Index等を再生成可能にし、Derived Indexを第二Source of Truthにしない。

初期MVPでAccount / Cloud DB / Authは導入しない。

## 12. Non-breakable Contracts

- 根拠を確認していない内容を確認済みFactとして書かない
- AIの独自考察をプロ本人や論文のClaimとして見せない
- Source date / contextを無視して古いMetaやAgent仕様をCurrent Factとして扱わない
- Community opinionだけで重要な戦術Ruleを確定しない
- Exact NumberのHeuristicを普遍的なゲーム仕様として断定しない
- Contradictionや例外を都合よく削除しない

## 13. Non-goals for Initial MVP

- 全AgentのLineup集
- Patch note全文Archive
- Tracker / Match history機能
- Login / Cloud sync
- AI Coachによる自動判定
- 見た目を先に完成させること

## 14. Completion Conditions for Research Foundation

- Source採用基準がRepositoryに存在する
- Initial IAとConcept Page Contractが存在する
- ラーク / アンカー / カバー・トレードのEvidence Mapが存在する
- 各Core Claimが「どのSourceから来たか」を追跡できる
- Source間の一致 / 条件差 / 未確定を記録できる
- 実装担当が独自判断で内容を捏造せずContent化できる

## 15. Open Items

Blocking Decision: None.

UI / Visual Directionは、Content structureが固まった後にCurrent Researchを行って決める。
