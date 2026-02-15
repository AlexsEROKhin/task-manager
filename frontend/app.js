const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");


let tasks = [];
let limit = 5;
let offset = 0;

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
    clampOffset();

    list.innerHTML = "";
    const pageItems = tasks.slice(offset, offset + limit);
    for(let i = 0; i < pageItems.length; i++){
        const task = pageItems[i];

        const li = document.createElement("li")

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
        const currentPage = Math.floor(offset / limit) + 1;
        const totalPages = Math.max(1, Math.ceil(tasks.length / limit));
        pageInfo.textContent = "Page " + currentPage + " / " + totalPages;
    }
}
function clampOffset() {
  const maxOffset = Math.max(0, Math.floor((tasks.length - 1) / limit) * limit);

  if (offset > maxOffset) {
    offset = maxOffset;
  }
}


function deleteTask(taskId) {
    tasks = tasks.filter(function(t){
        return t.id !== taskId;
        });
    clampOffset();
    renderTasks();
}

function toggleStatus(taskId) {
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id === taskId){
            if(tasks[i].status === "todo"){
                tasks[i].status = "in progress";
            } else if(tasks[i].status === "in progress"){
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
  if (offset + limit < tasks.length) {
    offset = offset + limit;
    renderTasks();
  }
});

