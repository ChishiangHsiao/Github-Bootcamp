![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)
![Agent Mode](https://img.shields.io/badge/Agent_Mode-已實作-1E2761?style=flat-square)
![MCP](https://img.shields.io/badge/MCP-已整合-1E2761?style=flat-square)
![Agentic Workflow](https://img.shields.io/badge/Agentic_Workflow-已建立-1E2761?style=flat-square)

# 待辦清單 Web App

這是在 **GitHub Copilot 實戰工作坊**完成的待辦清單 Web App。專案以純前端技術實作，提供待辦事項管理、篩選與深色模式，並將資料保存在瀏覽器中，方便離線使用。

## 線上展示

`https://chishianghsiao.github.io/Github-Bootcamp/`

> 將上方佔位網址替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，並阻止空白內容送出。
- 勾選或取消勾選待辦；完成項目會顯示刪除線並淡化。
- 刪除個別待辦事項。
- 顯示所有待辦中未完成的項目數量，不受目前篩選條件影響。
- 依「全部」、「未完成」或「已完成」篩選待辦，並在篩選結果為空時顯示提示。
- 切換淺色與深色模式；手動選擇會保存，未手動選擇時則跟隨作業系統外觀。
- 將待辦資料與主題偏好保存於 `localStorage`，重新整理後仍可保留。
- 使用置中卡片式介面，並支援手機螢幕。

## 技術

- 使用 HTML、CSS 與原生 JavaScript 建置。
- 不使用前端框架或外部套件，不依賴 CDN。
- 待辦資料與主題偏好使用瀏覽器 `localStorage` 保存。
- CSS 顏色以自訂屬性管理，支援淺色與深色主題。
- 專案可直接以瀏覽器開啟，不需建置流程或網路連線。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依需求逐步建立與修改應用程式，並透過瀏覽器操作驗證主要功能。
- 連接 Microsoft Learn MCP，查詢深色模式與色彩對比相關文件；使用 GitHub MCP 讀取本專案的 issue。
- 在 `.github/copilot-instructions.md` 記錄專案技術限制、程式風格與協作規則。
- 在 `.github/prompts/fix-issue.prompt.md` 定義可重複使用的 issue 處理流程，包含讀取 issue、先提出計畫並等待確認、修改、驗證、提交推送與建立 PR。

## 我學到什麼

- 清楚描述功能與限制，有助於讓 AI 依照預期範圍處理任務。
- 使用 Agent Mode 時，仍要檢視變更並實際驗證互動與資料保存行為。
- MCP 可以把官方文件與 GitHub issue 等外部脈絡帶入開發流程。
- 將專案規範與重複任務流程寫成檔案，能讓協作方式更明確、容易重複使用。
- 使用 `localStorage` 可以在不加入後端服務的情況下，保存這個小型應用程式的資料與偏好設定。
