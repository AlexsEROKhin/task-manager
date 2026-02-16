# Task Manager

A full-stack task management application built with Vanilla JavaScript and FastAPI.

## 🛠 Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript, Fetch API  
**Backend:** Python 3.10+, FastAPI, Uvicorn, Pydantic

## ✨ Features

- CRUD operations (create, read, update status, delete)
- Filter by status
- Sort by title and status
- Pagination (limit/offset)
- Search by title

## 🚀 Quick Start

### Backend
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Server: http://127.0.0.1:8000  
API Docs: http://127.0.0.1:8000/docs

### Frontend

Open frontend/index.html in your browser or use Live Server.

## 📁 Project Structure
```
task-manager/
├── frontend/          # HTML, CSS, JavaScript
└── backend/           # FastAPI application
    └── app/
        └── main.py    # Main API file
```

## 🔌 API Endpoints

- GET /health — health check
- GET /tasks — get all tasks
- POST /tasks — create task
- PATCH /tasks/{id} — update task
- DELETE /tasks/{id} — delete task

## 📌 Notes

- In-memory storage (data resets on server restart)
- CORS enabled for local development
- Interactive Swagger documentation included

## 📈 Future Improvements

- Database integration (SQLite/PostgreSQL)
- Docker support
- Unit testing
- Deployment configuration