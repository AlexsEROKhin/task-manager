const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

let tasks = [];

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
    list.innerHTML = "";
    for(let i = 0; i < tasks.length; i++){
        const task = tasks[i];

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
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(function(t){
        return t.id !== taskId;
        });
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
