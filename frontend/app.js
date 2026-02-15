const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const statusFilterEl = document.getElementById("statusFilter");


let tasks = [];
let limit = 5;
let offset = 0;
let statusFilter = "";

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const taskTitle = input.value;
    const newTask = {
        id: Date.now(),
        title: taskTitle,
        status: "todo"
    };
    tasks.push(newTask);
    renderTasks();
    input.value = "";
});

function renderTasks() {
  // 1) Сначала фильтруем весь массив tasks → получаем filteredTasks
  const filteredTasks = tasks.filter(function (t) {
    if (statusFilter === "") return true;       // если фильтр "All" — показываем всё
    return t.status === statusFilter;           // иначе — только совпадающий статус
  });

  // 2) Поджимаем offset, чтобы не попасть на "пустую страницу" после удаления
  clampOffset(filteredTasks.length);

  // 3) Очищаем список в HTML и готовим элементы для текущей страницы
  list.innerHTML = "";

  // 4) Берём только кусок массива для текущей страницы (пагинация)
  const pageItems = filteredTasks.slice(offset, offset + limit);

  // 5) Рисуем задачи из pageItems
  for (let i = 0; i < pageItems.length; i++) {
    const task = pageItems[i];

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

  // 6) Обновляем инфу о страницах и состояние кнопок (Prev/Next)
  updatePageInfo(filteredTasks.length);
}

function clampOffset(totalCount) {
  if (totalCount <= 0) {
    offset = 0;
    return;
  }

  const maxOffset = Math.max(0, Math.floor((totalCount - 1) / limit) * limit);
  if (offset > maxOffset) offset = maxOffset;
}


function deleteTask(taskId) {
  tasks = tasks.filter(function (t) {
    return t.id !== taskId;
  });

  renderTasks();
}


function toggleStatus(taskId) {
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId){
           if (tasks[i].status === "todo") {
                tasks[i].status = "in_progress";
            } else if (tasks[i].status === "in_progress") {
                tasks[i].status = "done";
            } else {
                tasks[i].status = "todo";
}

            break;
        }
    }
    renderTasks();
}
prevBtn.addEventListener("click", function () {
  offset = Math.max(0, offset - limit);
  renderTasks();
});

nextBtn.addEventListener("click", function () {
  offset = offset + limit;
  renderTasks();
});

statusFilterEl.addEventListener("change", function () {
  statusFilter = statusFilterEl.value;
  offset = 0;
  renderTasks();
});

function updatePageInfo(totalCount) {
  const currentPage = totalCount === 0 ? 0 : Math.floor(offset / limit) + 1;
  const totalPages = totalCount === 0 ? 0 : Math.ceil(totalCount / limit);
  pageInfo.textContent = "Page " + currentPage + " / " + totalPages;

  prevBtn.disabled = offset === 0;
  nextBtn.disabled = offset + limit >= totalCount;
}



