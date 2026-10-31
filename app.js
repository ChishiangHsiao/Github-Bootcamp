const STORAGE_KEY = "todo-list-items";
const THEME_STORAGE_KEY = "todo-list-theme";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const count = document.querySelector("#todo-count");
const storageError = document.querySelector("#storage-error");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

let todos = loadTodos();
let activeFilter = "all";

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (!savedTodos) {
      return [];
    }

    const parsedTodos = JSON.parse(savedTodos);
    if (!Array.isArray(parsedTodos)) {
      throw new TypeError("待辦資料格式不正確。");
    }

    return parsedTodos.filter(
      (todo) =>
        todo &&
        typeof todo.id === "string" &&
        typeof todo.text === "string" &&
        typeof todo.completed === "boolean",
    );
  } catch (error) {
    showStorageError("無法讀取已儲存的待辦事項，請檢查瀏覽器的本機儲存設定。");
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    storageError.hidden = true;
    storageError.textContent = "";
  } catch (error) {
    showStorageError("無法儲存待辦事項，請檢查瀏覽器的本機儲存空間或設定。");
  }
}

function showStorageError(message) {
  storageError.textContent = message;
  storageError.hidden = false;
}

function getCurrentTheme() {
  return document.documentElement.dataset.theme;
}

function updateThemeButton() {
  const isDark = getCurrentTheme() === "dark";
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "切換為淺色模式" : "切換為深色模式",
  );
}

function loadThemePreference() {
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.dataset.theme = savedTheme;
    } else {
      document.documentElement.dataset.theme = systemTheme.matches ? "dark" : "light";
      document.documentElement.dataset.themeSystem = "true";
    }
  } catch (error) {
    document.documentElement.dataset.theme = systemTheme.matches ? "dark" : "light";
    document.documentElement.dataset.themeSystem = "true";
    showStorageError("無法讀取主題設定，將依照作業系統的外觀顯示。");
  }

  updateThemeButton();
}

themeToggle.addEventListener("click", () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  delete document.documentElement.dataset.themeSystem;
  updateThemeButton();

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    storageError.hidden = true;
    storageError.textContent = "";
  } catch (error) {
    showStorageError("無法儲存主題設定，重新載入後將依照作業系統的外觀顯示。");
  }
});

systemTheme.addEventListener("change", () => {
  if (document.documentElement.dataset.themeSystem === "true") {
    document.documentElement.dataset.theme = systemTheme.matches ? "dark" : "light";
    updateThemeButton();
  }
});

function renderTodos() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === "active") {
      return !todo.completed;
    }
    if (activeFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  for (const todo of visibleTodos) {
    const item = document.createElement("li");
    item.className = "todo-item";
    if (todo.completed) {
      item.classList.add("is-completed");
    }

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為已完成`);
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    list.append(item);
  }

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;
  count.textContent = `未完成:${remainingCount} 項`;
  clearCompletedButton.disabled = completedCount === 0;
  emptyMessage.hidden = visibleTodos.length > 0;
  if (visibleTodos.length > 0) {
    emptyMessage.textContent = "";
  } else if (activeFilter === "active") {
    emptyMessage.textContent = "目前沒有未完成的待辦事項。";
  } else if (activeFilter === "completed") {
    emptyMessage.textContent =
      "目前沒有已完成的待辦事項。若剛取消勾選，該項目仍保留在清單中，可切換至「全部」或「未完成」查看。";
  } else {
    emptyMessage.textContent = "還沒有任何待辦事項，新增一個吧!";
  }
}

clearCompletedButton.addEventListener("click", () => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  if (completedCount === 0) {
    return;
  }

  const confirmed = window.confirm(`確定要清除 ${completedCount} 項已完成的待辦事項嗎？`);
  if (!confirmed) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    for (const filterButton of filterButtons) {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    }

    renderTodos();
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

loadThemePreference();
renderTodos();
