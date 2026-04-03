from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_task():
    response = client.post("/tasks", json={
        "title": "Test task",
        "status": "todo"
    })

    assert response.status_code == 200

    data = response.json()
    assert "id" in data
    assert data["title"] == "Test task"
    assert data["status"] == "todo"


def test_get_tasks():
    response = client.get("/tasks")

    assert response.status_code == 200

    data = response.json()
    assert "items" in data
    assert "total" in data