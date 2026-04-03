const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const statusFilterEl = document.getElementById("statusFilter");
const sortByEl = document.getElementById("sortBy");
const sortOrderEl = document.getElementById("sortOrder");
const searchInputEl = document.getElementById("searchInput");

const API_URL = "http://localhost:8000/tasks";

let tasks = [];
let totalCount = 0;
let limit = 5;
let offset = 0;
let statusFilter = "";
let searchQuery = "";
let sortBy = "title";
let sortOrder = "asc";


form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const taskTitle = input.value;
    const newTask = {
        title: taskTitle,
        status: "todo"
    };
    await fetch(API_URL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

    loadTasks();
    input.value = "";
});

  function renderTasks() {
  list.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {    const task = tasks[i];

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.title + " (" + task.status + ")";

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    toggleBtn.addEventListener("click", function () {
      toggleStatus(task.id);
    });

    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  }

  updatePageInfo(totalCount);
}


async function deleteTask(taskId) {
  await fetch(`${API_URL}/${taskId}`, {
  method: "DELETE",
});

  loadTasks();
}



async function toggleStatus(taskId) {
  // найдём текущую задачу в tasks
  const task = tasks.find(function (t) {
    return t.id === taskId;
  });

  if (!task) return;

  let newStatus = "todo";
  if (task.status === "todo") newStatus = "in_progress";
  else if (task.status === "in_progress") newStatus = "done";

  await fetch(`${API_URL}/${taskId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: newStatus }),
});

  loadTasks();
}

prevBtn.addEventListener("click", function () {
  offset = Math.max(0, offset - limit);
  loadTasks();
});

nextBtn.addEventListener("click", function () {
  if (offset + limit < totalCount) {
    offset = offset + limit;
    loadTasks();
  }
});

statusFilterEl.addEventListener("change", function () {
  statusFilter = statusFilterEl.value;
  offset = 0;
  loadTasks();
});

sortByEl.addEventListener("change", function () {
  sortBy = sortByEl.value;
  offset = 0;
  loadTasks();
});

sortOrderEl.addEventListener("change", function () {
  sortOrder = sortOrderEl.value;
  offset = 0;
  loadTasks();
});

searchInputEl.addEventListener("input", function () {
  searchQuery = searchInputEl.value.toLowerCase();
  offset = 0;
  loadTasks();
});



function updatePageInfo(totalCount) {
  const currentPage = totalCount === 0 ? 0 : Math.floor(offset / limit) + 1;
  const totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / limit);

  pageInfo.textContent = "Page " + currentPage + " / " + totalPages;

  prevBtn.disabled = offset === 0;
  nextBtn.disabled = offset + limit >= totalCount;
}
async function loadTasks() {
  const params = new URLSearchParams();

  params.set("limit", limit);
  params.set("offset", offset);

  if (statusFilter) {
    params.set("status", statusFilter);
  }

  if (searchQuery) {
    params.set("search", searchQuery);
  }

  if (sortBy) {
    params.set("sort_by", sortBy);
  }

  if (sortOrder) {
    params.set("sort_order", sortOrder);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const data = await response.json();

  tasks = data.items;
  totalCount = data.total;

  renderTasks();
}
loadTasks();



