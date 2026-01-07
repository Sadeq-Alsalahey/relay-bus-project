# 🚍 Relay‑Bus Platform

A **production‑grade microservices platform** for smart transportation, built with **API Gateway architecture**, **JWT authentication**, **RBAC**, **TypeScript**, **Prisma**, and **Docker Compose**.

This README is designed so **any developer can understand, run, and extend the project just by reading this file**.

---

##  High‑Level Architecture

```
Browser (Web / Admin UI)
        │
        │ HTTP / HTTPS
        ▼
Frontend (Next.js) – Port 3001
        │
        │ /v1/*  (rewrites)
        ▼
API Gateway (Fastify) – Port 4000
        │
        │ Internal HTTP
        ▼
Microservices Layer
   ├─ users-service  (4001)
   ├─ trips-service  (future)
   └─ fleet-service  (future)
        │
        │ Prisma ORM
        ▼
PostgreSQL Database – Port 5432
```

### Why this architecture?

* ✅ Single secure entry point (Gateway)
* ✅ No duplicated auth logic
* ✅ Clear separation of concerns
* ✅ Easy scaling & onboarding

---

##  Tech Stack

### Backend

* **Node.js + TypeScript**
* **Fastify** (API Gateway)
* **Express** (microservices)
* **JWT** authentication
* **RBAC** (ADMIN / USER)
* **Prisma ORM**
* **PostgreSQL**

### Frontend

* **Next.js (App Router)**
* Secure cookie‑based auth

### DevOps

* **Docker & Docker Compose**
* Environment‑based configuration

---

##  Project Structure

```
Relay‑Bus/
│
├─ apps/
│  ├─ gateway/            # API Gateway (Fastify)
│  └─ docs/               # Frontend (Next.js)
│
├─ services/
│  └─ users-service/      # Users microservice
│
├─ docker-compose.yml
├─ .env                   # Docker environment variables
└─ README.md
```

---

##  Authentication & Authorization

### Authentication

* JWT is **issued and verified only by the API Gateway**
* Access token → `Authorization: Bearer <token>`
* Refresh token → HttpOnly cookie

### Authorization (RBAC)

Roles:

* `ADMIN`
* `USER`

RBAC is enforced **in the Gateway before requests reach services**.

Example:

```
/v1/users/*  → ADMIN only
```

---

##  API Routing (Gateway)

| Route         | Target Service | Description        |
| ------------- | -------------- | ------------------ |
| `/v1/auth/*`  | users-service  | Login / Logout     |
| `/v1/users/*` | users-service  | Users CRUD (ADMIN) |

The gateway:

* Verifies JWT
* Checks role permissions
* Forwards requests internally

---

## 👤 users-service

Responsible for:

* User persistence
* Business logic
* Database access (Prisma)

### User Model (Prisma)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Endpoints

| Method | Endpoint     | Access        |
| ------ | ------------ | ------------- |
| GET    | `/users`     | ADMIN         |
| GET    | `/users/me`  | Authenticated |
| GET    | `/users/:id` | ADMIN         |
| PATCH  | `/users/:id` | ADMIN         |

All requests **must come from the Gateway**.

---

## 🧠 Gateway Context Propagation

The gateway injects trusted headers:

```
x-user-id
x-user-role
```

`users-service` validates these using `requireGatewayContext` middleware.

---

##  Running with Docker (Recommended)

### 1 Requirements

* Docker Desktop
* WSL2 (Windows)

### 2 Environment File

 `.env` (root)

```env
POSTGRES_DB=relaybus
POSTGRES_USER=relay_user
POSTGRES_PASSWORD=Realy123

DATABASE_URL=postgresql://relay_user:Realy123@db:5432/relaybus
JWT_SECRET=relaybus_super_secret_key_123
```

### 3 Start the System

```bash
docker compose up --build
```

Services:

* Gateway → [http://localhost:4000](http://localhost:4000)
* Database → localhost:5432

---

## 🧪 Test Login

```bash
POST http://localhost:4000/v1/auth/login
```

Success response:

```json
{
  "accessToken": "..."
}
```

---

##  How to Add a New Microservice

1. Create service folder under `services/`
2. Add Dockerfile
3. Implement business logic
4. Register route in Gateway proxy
5. Apply RBAC if needed

No auth duplication required ✅

---

## 🛡 Security Principles

* Auth centralized in Gateway
* Services are never exposed directly
* Role checks before routing
* Type‑safe context propagation

---

## 🛣 Roadmap

* [ ] trips-service
* [ ] fleet-service
* [ ] Swagger / OpenAPI
* [ ] Redis rate limiting
* [ ] CI/CD (GitHub Actions)
* [ ] Kubernetes deployment

---

## ⭐ Final Notes

This project demonstrates:

* Clean microservices architecture
* Real‑world API Gateway pattern
* Production‑ready security design

If you understand this README — you can **maintain and extend the system confidently**.

---

**By:** Eng. Sadeq Al‑Salahey
