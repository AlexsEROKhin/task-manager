from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI()


tasks = []


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    before = len(tasks)
    tasks = [t for t in tasks if t.get("id") != task_id]

    if len(tasks) == before:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"deleted": task_id}


@app.patch("/tasks/{task_id}")
def update_task(task_id: int, payload: dict):
    for t in tasks:
        if t.get("id") == task_id:
            # обновляем только те поля, которые пришли
            t.update(payload)
            return t

    raise HTTPException(status_code=404, detail="Task not found")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def create_task(task: dict):
    tasks.append(task)
    return task


