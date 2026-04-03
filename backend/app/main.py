from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
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
def get_tasks(
    limit: int = Query(5, ge=1, le=100),
    offset: int = Query(0, ge=0),
    status: str | None = Query(None),
    search: str | None = Query(None),
    sort_by: str = Query("title"),
    sort_order: str = Query("asc"),
):
    # 1) working list
    result = list(tasks)

    # 2) filter by status
    if status:
        result = [t for t in result if t.get("status") == status]

    # 3) search by title (case-insensitive)
    if search:
        s = search.strip().lower()
        result = [t for t in result if s in str(t.get("title", "")).lower()]

    # 4) sorting
    allowed_sort = {"title", "status", "id"}
    if sort_by not in allowed_sort:
        raise HTTPException(status_code=400, detail="Invalid sort_by")

    if sort_order not in {"asc", "desc"}:
        raise HTTPException(status_code=400, detail="Invalid sort_order")

    reverse = (sort_order == "desc")
    result.sort(key=lambda t: str(t.get(sort_by, "")).lower(), reverse=reverse)

    # 5) pagination
    total = len(result)
    items = result[offset: offset + limit]

    return {
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
    }


@app.post("/tasks")
def create_task(task: dict):
    new_task = {
        "id": len(tasks) + 1,
        "title": task.get("title"),
        "status": task.get("status", "todo")
    }

    tasks.append(new_task)
    return new_task


