# 專案指引

## 技術限制

- 本專案為純前端專案，只使用 HTML、CSS 與原生 JavaScript。
- 禁止引入任何框架或套件；不要建立 `package.json`，也不要執行 `npm install`。
- 不得引用外部 CDN，專案必須能離線運作。
- 應用程式檔案結構固定為根目錄的 `index.html`、`styles.css` 與 `app.js`。

## 程式風格

- 程式碼註解一律使用繁體中文。
- 變數與函式使用英文 camelCase 命名。
- 使用 `const` 與 `let` 宣告變數，不使用 `var`。
- CSS 顏色一律使用 `:root` 中定義的 CSS 變數，不直接寫入色碼。
- 建立 DOM 內容時使用 `textContent` 或 `createElement`，不要使用 `innerHTML` 組合字串。

## 協作方式

- 開始修改前，先條列說明預計修改的檔案與變更內容，等待使用者確認後再開始。
- 一次只處理一件事，不進行使用者未要求的重構。
- 完成修改後，說明如何在瀏覽器中驗證變更。
