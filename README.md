# VALORANT Knowledge Lab

VALORANTを「エイムだけ」ではなく、**判断・情報・連携・ポジショニングなどの知識面から強くなるための学習サイト**です。

## このRepositoryの目的

- ラーク、アンカー、カバー、トレード、スペーシングなどのミクロ知識を体系化する
- プロ選手・プロコーチ・公式情報・査読論文など、根拠を確認できる情報を優先する
- 同じ主張を可能な限り複数の独立した情報源で照合する
- ChatGPT独自の断定を避け、Sourceが示している範囲とサイト側の整理を分ける
- 「意味を知っている」だけでなく、試合中に判断して使える状態を目指す

## Source of Truth

- 現在の要件: [REQUIREMENTS.md](REQUIREMENTS.md)
- 調査・執筆ルール: [PROJECT_RULES.md](PROJECT_RULES.md)
- コンテンツ構造: [docs/CONTENT_MAP.md](docs/CONTENT_MAP.md)
- Content Schema: [docs/CONTENT_SCHEMA.md](docs/CONTENT_SCHEMA.md)
- Visual Direction: [docs/DESIGN_DIRECTION.md](docs/DESIGN_DIRECTION.md)
- 初回Research: [research/micro-fundamentals-01.md](research/micro-fundamentals-01.md)
- Web制作共通ルール: [EliteMay/web-project-guide](https://github.com/EliteMay/web-project-guide)

## 現在の段階

現在は **Static Site MVP Implementation** です。

サイトでは次の15Conceptを閲覧できます。

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

Homeは「ミクロ / マクロ / エイム練習」の3択を維持し、Domain内で「まずここから」→おすすめ学習順→テーマ別Browseへ進みます。

Contentの正本は `data/concepts/*.json` と `data/sources.json` です。HTMLへ戦術本文を複製せず、`app.js` がJSONを読み込んで画面を生成します。

## Web構成

- `index.html` — Site shell
- `styles.css` — Visual / Responsive
- `app.js` — Domain learning path / Search / Concept rendering / Evidence / Next-step navigation
- `data/concept-index.json` — Canonical Concept Dataから作るDerived manifest
- `tests/validate-site.mjs` — Concept / Source参照とSite shellのStatic validation

## ローカル確認

JSONを `fetch()` するため、`file://` 直開きではなくHTTP経由で確認します。

```powershell
python -m http.server 8000
```

その後、`http://localhost:8000/` を開きます。

## Project Profiles

`STATIC + DATA + LEARNING + PUBLIC-CONTENT`

## 採用Guide

- Current `EliteMay/web-project-guide` のREADME / START_HERE / required Owner DocsをCurrent Revisionから確認して適用する
- Version番号だけでなくCurrent Repositoryを優先する
