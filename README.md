# Task Manager

A full-stack task management application built with Vanilla JavaScript and FastAPI.

## 🛠 Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript, Fetch API  
**Backend:** Python 3.10+, FastAPI, Uvicorn, Pydantic  
**Other:** Docker, Docker Compose, Pytest

## ✨ Features

- Full CRUD operations
- Server-side pagination (`limit`, `offset`)
- Filtering by status
- Search by title
- Sorting by title and status
- Frontend–backend integration via REST API
- Dockerized backend
- Docker Compose support
- Basic API tests with pytest

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

🐳 Run with Docker

docker compose up --build

Frontend: http://localhost:3000
Backend API: http://127.0.0.1:8000
Swagger Docs: http://127.0.0.1:8000/docs

### ✅ Testing

Run tests with:

python -m pytest backend/test_main.py -v

🏗 Architecture

The frontend communicates with the backend through a REST API.

- Frontend handles UI rendering and user interactions
- Backend handles task storage, filtering, sorting, search, and pagination
- Data is currently stored in memory
- Open frontend/index.html in your browser or use Live Server.

## 📁 Project Structure
```
task-manager/
├── frontend/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── Dockerfile
├── backend/
│   ├── app/
│   │   └── main.py
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── requirements.txt
│   └── test_main.py
├── docker-compose.yml
└── README.md
```

## 🔌 API Endpoints

- GET /health — health check
- GET /tasks — get tasks with pagination, filtering, sorting, and search
- POST /tasks — create task
- PATCH /tasks/{id} — update task
- DELETE /tasks/{id} — delete task

## 📌 Notes

- Tasks are currently stored in memory (data resets when backend restarts)
- Frontend communicates with backend via REST API
- Docker and Docker Compose are configured for local development
- Interactive Swagger documentation is included

## 📈 Future Improvements

- Database integration (SQLite/PostgreSQL)
- Persistent storage instead of in-memory list
- Environment configuration via .env
- Deployment to cloud
- Authentication and user accounts
- Improved test coverage