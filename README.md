# Java Silver SE17 演習アプリ

スマホで電車移動中に、Java Silver SE17 の高難度問題を1問ずつ解ける Web アプリです。
React + TypeScript + Vite 製。学習履歴はブラウザの localStorage に保存されます。

> このアプリは PC で起動し、同じ Wi-Fi のスマホからアクセスして使います。
> **まずは下の「1. 事前準備」から順番に進めてください。**

---

## 目次

1. [事前準備（何をインストールするか）](#1-事前準備何をインストールするか)
2. [初回セットアップ](#2-初回セットアップ)
3. [アプリの起動方法](#3-アプリの起動方法)
4. [PC ブラウザで使う方法](#4-pc-ブラウザで使う方法)
5. [スマホで使う方法](#5-スマホで使う方法)
6. [次回以降の使い方](#6-次回以降の使い方)
7. [問題を追加する方法](#7-問題を追加する方法)
8. [学習履歴の保存場所](#8-学習履歴の保存場所)
9. [よくあるエラーと対処法](#9-よくあるエラーと対処法)
10. [将来的に外出先でも使う方法](#10-将来的に外出先でも使う方法)

---

## 1. 事前準備（何をインストールするか）

このアプリを動かすには、次のうち **Node.js は必須** です。
（このPCには現在 Node.js が入っていないことを確認済みです。まずこれを入れてください。）

| ツール | 必須？ | 何のために使うか |
|--------|--------|------------------|
| **Node.js** | ✅ 必須 | アプリを動かすエンジン。`npm` も同梱される |
| **npm** | ✅ 必須 | 部品(React等)のインストールと起動コマンド。Node.js に同梱 |
| **VSCode** | 推奨 | コードを開く・編集する・ターミナルを使うエディタ |
| **Git** | 任意 | 今は不要。将来 Vercel に公開する時だけ使う（第10章） |

### Node.js のインストール手順（Windows）

1. ブラウザで公式サイトを開く → **https://nodejs.org/**
2. **「LTS」**（推奨版）と書かれた大きいボタンをクリックしてダウンロード
3. ダウンロードした `.msi` ファイルをダブルクリック
4. インストーラは基本 **「Next」を押し続けるだけ** でOK
   （"Add to PATH" のチェックは付けたまま。これでコマンドが使えるようになる）
5. **インストールが終わったら、開いている VSCode やターミナルを一度すべて閉じる**
   （PATH を反映させるため。重要）

### インストールできたか確認

VSCode を新しく開いてターミナル（後述）で次を実行：

```powershell
node -v
npm -v
```

`v20.xx.x` のようにバージョンが表示されればOK。
`認識されません` と出たら → [第9章](#9-よくあるエラーと対処法)へ。

### VSCode のインストール（推奨）

1. **https://code.visualstudio.com/** から「Download for Windows」
2. インストーラを実行（途中の「PATH への追加」「エクスプローラーのメニューに追加」にチェックを入れると便利）

---

## 2. 初回セットアップ

このフォルダ（`java-silver-quiz`）は**すでに全ファイルが用意済み**です。
あとは部品をインストールするだけです。

### 手順

1. **VSCode でフォルダを開く**
   - VSCode を起動 →（上メニュー）**ファイル → フォルダーを開く**
   - `java-silver-quiz` フォルダを選んで「フォルダーの選択」
   - 場所はどこでもOK（デスクトップ等）。ただしパスに日本語が含まれていても動きます

2. **ターミナルを開く**
   - VSCode の上メニュー **ターミナル → 新しいターミナル**
   - 画面下部に入力欄が出ます。ここにコマンドを打ちます

3. **部品をインストール**（初回だけ）
   ```powershell
   npm install
   ```
   - 意味：`package.json` に書かれた React や Vite などの部品を `node_modules` フォルダにダウンロードします
   - 数十秒〜数分かかります。`added xxx packages` と出れば成功

> 💡 `npm create vite@latest` は**実行不要**です。それはゼロから新規作成するコマンドで、このフォルダはすでに作成済みだからです。もし自分でゼロから作る場合の参考までに：
> `npm create vite@latest my-app -- --template react-ts` を実行し、フレームワークに **React**、バリアントに **TypeScript** を選びます。

---

## 3. アプリの起動方法

ターミナルで次を実行：

```powershell
npm run dev
```

- 意味：開発用サーバーを立ち上げます。コードを保存すると自動で画面が更新されます
- 起動すると、こんな表示が出ます：

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/   ← スマホ用（第5章で使う）
```

- **`Local` の URL** が PC で使う用、**`Network` の URL** がスマホで使う用です。
- 止めるときはターミナルで **Ctrl + C**。

---

## 4. PC ブラウザで使う方法

1. `npm run dev` した状態で、ブラウザを開く
2. アドレスバーに **`http://localhost:5173/`** と入力（上の `Local` の URL）
3. アプリが表示されます

操作の流れ：

- **トップ画面** … 「学習開始（全問）」「ランダム出題」「復習モード」「分野別」から選ぶ
- **問題画面** … コードを読み、A〜D を選んで「回答する」。タイマーが目標時間を超えると警告が出ます
- **解説画面** … 回答後に表示。理由・処理順序・他選択肢が違う理由・試験ポイント・覚える1行などが折りたたみで読めます。「あとで復習」にチェックも可能
- **結果画面** … 正答率・分野別正答率・間違えた問題一覧。「間違えた問題を復習」で弱点だけ再挑戦できます

---

## 5. スマホで使う方法

電車内ではなく、**自宅などで PC と同じ Wi-Fi につないで**使います
（外出先で使いたい場合は第10章のデプロイへ）。

### 手順

1. **PC とスマホを同じ Wi-Fi に接続**する（最重要）
2. PC で起動する。このプロジェクトは設定済みなので **`npm run dev` だけでOK**
   （`vite.config.ts` に `host: true` を設定済み。手動でやる場合は `npm run dev -- --host 0.0.0.0` でも可）
3. 起動時に表示される **`Network: http://192.168.x.x:5173/`** の URL を確認
4. **PC の IP アドレスを確認**する別の方法（Network 行が出ない時）：
   ```powershell
   ipconfig
   ```
   → `IPv4 アドレス` の `192.168.x.x` をメモ
5. **スマホのブラウザ**のアドレスバーに、その URL を入力：
   ```
   http://192.168.x.x:5173/
   ```
6. アプリが開けば成功。ホーム画面に追加するとアプリのように使えます

### 開けないときの原因チェック

- ❌ **PC とスマホが同じ Wi-Fi にいない**（スマホがモバイル回線になっていないか確認）
- ❌ **Windows ファイアウォール** がブロック → 初回起動時に出る許可ダイアログで「アクセスを許可する」を選ぶ。出なかった場合は「Windows セキュリティ → ファイアウォール → アプリの許可」で Node.js を許可
- ❌ **会社PC・公共Wi-Fi** は端末間通信が禁止されていることが多い（家の Wi-Fi で試す）
- ❌ **`host` 指定なしで起動**している（本プロジェクトは設定済みだが、`Local` しか出ない時は `npm run host` を試す）

---

## 6. 次回以降の使い方

2回目以降はインストール不要。**起動だけ**です。

1. VSCode で `java-silver-quiz` フォルダを開く
2. ターミナル（ターミナル → 新しいターミナル）を開く
3. 次を実行：
   ```powershell
   npm run dev
   ```
4. PC なら `http://localhost:5173/`、スマホなら `http://192.168.x.x:5173/` を開く

> `npm install` は部品が増えた時だけ。普段は `npm run dev` だけで十分です。

---

## 7. 問題を追加する方法

問題データは **`src/data/questions.ts`** に分離してあります。
ここに追記するだけで画面に反映されます（ChatGPT/Claude に作らせて貼り付けるのも簡単）。

### 手順

1. VSCode で `src/data/questions.ts` を開く
2. 既存の問題（`{ id: 1, ... }`）を1つコピーする
3. **`id` を重複しない番号に増やす**（例：11, 12, …）
4. `code`（Javaソース）、`choices`（A〜D）、`correctAnswer`、`explanation` を書き換える
5. `tags` に分野名を入れる（結果画面の分野別分析に使われる。問題画面には表示されない）
6. `targetTime` を設定（normal:90 / long:150 / complex:210〜240 秒の目安）
7. **保存（Ctrl + S）すると、`npm run dev` 中の画面が自動で更新**されます

### 貼り付け用テンプレート

```ts
  {
    id: 11,
    targetTime: 90,
    difficulty: "normal", // "normal" | "long" | "complex"
    tags: ["分野タグ1", "分野タグ2"],
    code: `public class Main {
    public static void main(String[] args) {
        // ここに問題のコード
    }
}`,
    choices: [
      { label: "A", text: "選択肢A" },
      { label: "B", text: "選択肢B" },
      { label: "C", text: "選択肢C" },
      { label: "D", text: "選択肢D" },
    ],
    correctAnswer: "A",
    explanation: {
      reason: "正解の理由",
      executionOrder: ["処理1", "処理2", "出力: xxx"],
      whyOthersAreWrong: {
        B: "Bが違う理由",
        C: "Cが違う理由",
        D: "Dが違う理由",
      },
      examPoint: "試験ポイント",
      quickJudgePoint: "本番での見切りポイント",
      oneLineMemory: "覚えるべき1行",
      similarTrap: "類似ひっかけ（任意・不要なら削除可）",
    },
  },
```

> ⚠️ コード内にバッククォート `` ` `` を使う場合はエスケープが必要です。基本は `code: \`...\`` のテンプレートリテラルで囲み、その中はそのまま Java を書けます。配列の最後の `}` の後にカンマ `,` を忘れずに。

### ChatGPT / Claude に問題を作らせるときのコツ

「上のテンプレート形式（TypeScript の Question オブジェクト）で、Java Silver SE17 範囲の問題を `id:12` から5問、本番より少し難しめで作って」と頼み、出力をそのまま配列に貼り付ければOKです。

---

## 8. 学習履歴の保存場所

- 学習履歴（正答数・正答率・間違えた問題・苦手タグ・連続正解数など）は
  **使っているブラウザの localStorage** に保存されます。
- キーは `java-silver-history-v1` と `java-silver-dark`（ダークモード設定）。
- **同じブラウザで開けば履歴は残り続けます。**
- 次の場合は履歴が消えます：
  - ブラウザの「サイトデータ／localStorage を削除」した
  - シークレット／プライベートモードで使った
  - PC とスマホは別ブラウザ扱いなので、履歴は共有されません（それぞれ独立）
- アプリ内のトップ画面右上 **「履歴リセット」** ボタンでも全消去できます。

---

## 9. よくあるエラーと対処法

| 症状 | 原因と対処 |
|------|-----------|
| `npm : 用語 npm が認識されません` | Node.js 未インストール、または PATH 未反映。Node.js を入れ直し、**VSCode/ターミナルを開き直す**（第1章） |
| `npm install` でエラー | ネット接続を確認。社内プロキシ環境なら設定が必要。`node_modules` を削除して再実行：`Remove-Item -Recurse -Force node_modules; npm install` |
| `npm run dev` が動かない | `npm install` を先に実行したか確認。`package.json` のあるフォルダにいるか確認 |
| 画面が真っ白 | ブラウザの開発者ツール（F12）→ Console のエラーを見る。多くは編集ミス。`questions.ts` のカンマ抜け・バッククォート閉じ忘れが定番 |
| TypeScript の型エラー（赤波線） | エラーメッセージの行を確認。`questions.ts` 追記時は `correctAnswer` が `"A"〜"D"`、`label` が正しいか確認。`npm run dev` 自体は型エラーでも動くことが多い |
| スマホからアクセスできない | 第5章の「開けないときの原因チェック」を順に確認（同じWi-Fi／ファイアウォール許可／家のWi-Fiで試す） |
| `Port 5173 is in use` | 既に起動中。前のターミナルで Ctrl+C で止めるか、別ポートで起動：`npm run dev -- --port 5174` |
| 履歴をリセットしたい | トップ画面右上の「履歴リセット」ボタン。または F12 → Application → Local Storage で該当キーを削除 |

---

## 10. 将来的に外出先でも使う方法

最初は **ローカル起動（PC + 同じWi-Fiのスマホ）で十分**です。
電車内など外出先で使いたくなったら、無料の Vercel に公開（デプロイ）できます。

### 大まかな流れ

1. **GitHub にアップロード**
   - https://github.com でアカウント作成 → 新規リポジトリ作成
   - PC にこのプロジェクトを Git で push（VSCode の「ソース管理」タブからでも可）
   ```powershell
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/ユーザー名/リポジトリ名.git
   git push -u origin main
   ```
2. **Vercel と連携**
   - https://vercel.com に GitHub アカウントでログイン
   - 「Add New → Project」で先ほどのリポジトリを選択
   - フレームワークは自動で **Vite** を検出。そのまま「Deploy」
3. **完成**
   - `https://あなたのアプリ.vercel.app` のような URL が発行される
   - スマホでこの URL を開けば、Wi-Fi 関係なく外出先でも使えます
   - ※ デプロイ先の履歴は「公開URLを開いたブラウザの localStorage」に保存されます

---

## 技術構成（参考）

```
java-silver-quiz/
├─ index.html              … エントリ HTML
├─ package.json            … 依存と npm スクリプト
├─ vite.config.ts          … Vite 設定（host:true でスマホ公開）
├─ tsconfig.json           … TypeScript 設定
└─ src/
   ├─ main.tsx             … React 起動点
   ├─ App.tsx              … 画面遷移(トップ/問題/結果)とロジック
   ├─ types.ts             … Question など型定義
   ├─ styles.css           … スマホ最適化スタイル(ダーク/ライト)
   ├─ data/
   │  └─ questions.ts      … ★問題データ（ここに追加していく）
   ├─ hooks/
   │  └─ useLocalStorage.ts… 履歴保存フック
   └─ components/
      ├─ TopScreen.tsx     … トップ画面
      ├─ QuizScreen.tsx    … 問題＋タイマー＋選択肢
      ├─ ExplanationView.tsx… 解説(折りたたみ)
      ├─ ResultScreen.tsx  … 結果＋分野別分析
      └─ CodeBlock.tsx     … 横スクロール等幅コード表示
```

収録問題（サンプル10問・本番より少し難しめ）：

1. `ArrayList.remove(int)` と `remove(Object)`
2. `List.of()` の変更不可（実行時例外）
3. `Arrays.asList()` の固定サイズ（set可/add不可）
4. instanceof パターンマッチング と `&&`
5. instanceof パターンマッチング と `||`（コンパイルエラー）
6. static メソッド隠蔽とフィールド非override
7. 初期化順序（static/インスタンス初期化/コンストラクタ）
8. switch式と `yield`
9. try-with-resources の close 順序（逆順）
10. Stream の遅延評価（終端操作なし）
