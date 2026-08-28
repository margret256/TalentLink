# TalentLink Backend

This folder contains the FastAPI backend for the TalentLink frontend.

## Setup

```powershell
cd D:\talentlink\TalentLink\backend
py -3.13 -m venv .venv
. .\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Create `backend/.env` from `.env.example` and set `DATABASE_URL` to your Neon connection string.
Also set `JWT_SECRET` to a long random value before deployment.
On startup, SQLAlchemy creates the tables and seeds the initial demo records only when the database is empty.

The seeded demo login is `gull@example.com` with password `demo123`.

The main tables are `users`, `jobs`, `applications`, `saved_jobs`, and `app_data`.

## API docs

After starting the server:
- http://localhost:8000/docs
- http://localhost:8000/api/health
