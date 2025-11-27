const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all");
const tbody = document.getElementById("todo-body");

let todos = [];
let currentFilter = "all";

/* filter fuction */
function applyFilter(list) {
  if (currentFilter === "pending") return list.filter(t => !t.done);
  if (currentFilter === "completed") return list.filter(t => t.done);
  return list;
}

/* table */
function renderTable() {
  tbody.innerHTML = "";

  const filtered = applyFilter(todos);

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty">No task found</td>
      </tr>
    `;
    return;
  }

  filtered.forEach((todo, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date || "-"}</td>
      <td>${todo.done ? "Completed" : "Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})" class="action-btn">
          ${todo.done ? "Undo" : "Done"}
        </button>
        <button onclick="deleteTask(${index})" class="action-btn delete">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* add taks */
function addTask() {
  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (!text) {
    alert("Please enter a task.");
    return;
  }

  todos.push({ text, date, done: false });

  todoInput.value = "";
  dateInput.value = "";

  renderTable();
}

/* delete taks */
function deleteTask(index) {
  todos.splice(index, 1);
  renderTable();
}

/* toggle status*/
function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTable();
}

/* delete all  */
deleteAllBtn.onclick = () => {
  todos = [];
  renderTable();
};

/* add tombol */
addBtn.onclick = addTask;

/* enter key */
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

/* DROPDOWN FILTER */
const filterToggle = document.getElementById("filter-toggle");
const filterMenu = document.getElementById("filter-menu");

filterToggle.onclick = (e) => {
  e.stopPropagation();
  filterMenu.classList.toggle("hidden");
};

document.querySelectorAll(".filter-option").forEach(option => {
  option.addEventListener("click", () => {

    currentFilter = option.dataset.filter;

    filterToggle.textContent =
      "FILTER: " +
      (currentFilter === "all"
        ? "All Tasks ▼"
        : currentFilter === "pending"
        ? "Pending ▼"
        : "Completed ▼");

    filterMenu.classList.add("hidden");

    renderTable();
  });
});

/* close filter */
document.addEventListener("click", (e) => {
  if (!e.target.closest(".filter-dropdown")) {
    filterMenu.classList.add("hidden");
  }
});

renderTable();
