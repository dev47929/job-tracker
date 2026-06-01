# Job Tracker API

**Base URL:** `http://localhost:8080`

**Auth:** JWT Bearer token (except `/auth/**`). Include header: `Authorization: Bearer <token>`

---

## Auth

### POST /auth/signup

| Field      | Type   | Required |
|------------|--------|----------|
| username   | string | yes      |
| email      | string | yes      |
| password   | string | yes      |
| firstName  | string | no       |
| lastName   | string | no       |

```js
// Request
const res = await fetch("http://localhost:8080/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "john",
    email: "john@mail.com",
    password: "secret",
    firstName: "John",
    lastName: "Doe"
  })
});
const data = await res.json();
// data → { username: "john", email: "john@mail.com" }
```

---

### POST /auth/login

| Field    | Type   | Required |
|----------|--------|----------|
| username | string | yes      |
| password | string | yes      |

```js
const res = await fetch("http://localhost:8080/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "john", password: "secret" })
});
const data = await res.json();
// data → { jwt: "eyJhbGciOiJIUzI1NiJ9...", userId: 1 }
// Also sets cookie: token=<jwt>; Path=/; Max-Age=86400; SameSite=Strict
```

---

## Jobs (Auth Required)

All endpoints below need `Authorization: Bearer <token>` header.

### GET /jobs/users/getdetails

Fetch authenticated user's profile.

```js
const res = await fetch("http://localhost:8080/jobs/users/getdetails", {
  headers: { "Authorization": "Bearer <token>" }
});
const data = await res.json();
// data → { username: "john", firstName: "John", lastName: "Doe", email: "john@mail.com" }
```

---

### GET /jobs/users/getjobs

Get all job applications.

```js
const res = await fetch("http://localhost:8080/jobs/users/getjobs", {
  headers: { "Authorization": "Bearer <token>" }
});
const data = await res.json();
// data → [
//   { jobId: 1, company: "Google", status: "APPLIED", appliedOn: "2026-05-01", role: "SDE" },
//   { jobId: 2, company: "Meta",   status: "INTERVIEW_SCHEDULED", appliedOn: "2026-04-20", role: "Backend" }
// ]
```

---

### POST /jobs/users/addjob

| Field     | Type   | Required |
|-----------|--------|----------|
| company   | string | yes      |
| status    | string | yes      |
| appliedOn | string | yes      |
| role      | string | yes      |

```js
const res = await fetch("http://localhost:8080/jobs/users/addjob", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer <token>" },
  body: JSON.stringify({
    company: "Google",
    status: "APPLIED",
    appliedOn: "2026-05-01",
    role: "SDE"
  })
});
const data = await res.json();
// data → { company: "Google", status: "APPLIED", appliedOn: "2026-05-01", role: "SDE" }
```

---

### PATCH /jobs

| Field     | Type   | Required |
|-----------|--------|----------|
| jobID     | number | yes      |
| company   | string | no       |
| status    | string | no       |
| appliedOn | string | no       |
| role      | string | no       |

Only non-null fields are updated.

```js
const res = await fetch("http://localhost:8080/jobs", {
  method: "PATCH",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer <token>" },
  body: JSON.stringify({ jobID: 1, status: "INTERVIEW_SCHEDULED" })
});
const data = await res.text();
// data → "SUCCESS"
```

---

### DELETE /jobs/users/{jobId}

```js
const res = await fetch("http://localhost:8080/jobs/users/1", {
  method: "DELETE",
  headers: { "Authorization": "Bearer <token>" }
});
const data = await res.json();
// data → { status: true }
```

---

## AI (Auth Required)

Parse natural language into structured job entries. **Does not save to DB.**

### POST /jobs/users/ai/organizeandadd

| Field  | Type   | Required |
|--------|--------|----------|
| prompt | string | yes      |

Uses OpenRouter (DeepSeek).

```js
const res = await fetch("http://localhost:8080/jobs/users/ai/organizeandadd", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer <token>" },
  body: JSON.stringify({
    prompt: "I applied to Google for SDE role on May 1st and Meta for Backend on April 20"
  })
});
const data = await res.json();
// data → [
//   { jobId: null, company: "Google", status: "APPLIED", appliedOn: "2026-05-01", role: "SDE" },
//   { jobId: null, company: "Meta",   status: "APPLIED", appliedOn: "2026-04-20", role: "Backend" }
// ]
```

---

### POST /jobs/users/ai/addGroq

| Field  | Type   | Required |
|--------|--------|----------|
| prompt | string | yes      |

Uses Groq (Llama 3.3 70B).

```js
const res = await fetch("http://localhost:8080/jobs/users/ai/addGroq", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Authorization": "Bearer <token>" },
  body: JSON.stringify({
    prompt: "I applied to Google for SDE role on May 1st"
  })
});
const data = await res.json();
// data → [ { jobId: null, company: "Google", status: "APPLIED", appliedOn: "2026-05-01", role: "SDE" } ]
```

---

### POST /users/ai/matchjobs

Compare a resume (PDF) against a job description.

| Field    | Type   | Location | Required |
|----------|--------|----------|----------|
| file     | file   | form-data | yes      |
| content  | string | JSON body | yes      |

Uses Groq (Llama 3.1 8B).

```js
const formData = new FormData();
formData.append("file", resumePdfBlob);
const res = await fetch("http://localhost:8080/users/ai/matchjobs", {
  method: "POST",
  headers: { "Authorization": "Bearer <token>" },
  body: formData,
  // JSON body with content field is also required
});
// For the JSON body, use a Blob approach:
const blob = new Blob([JSON.stringify({ content: "Job description text..." })], { type: "application/json" });
formData.append("message", blob);
const data = await res.json();
// data → {
//   matchPercentage: 72,
//   summary: "The candidate has strong experience in backend development...",
//   strengths: ["Strong Java skills", "Experience with Spring Boot"],
//   missingSkills: ["Kubernetes", "Docker"],
//   missingRequirements: ["5+ years experience"],
//   relevantSkills: ["Java", "Spring Boot", "REST APIs"],
//   relevantProjects: ["E-commerce platform", "Payment gateway"],
//   recommendations: ["Learn Kubernetes", "Gain experience with microservices"]
// }
```

---

## Status Values

| Value              |
|--------------------|
| APPLIED            |
| INTERVIEW_SCHEDULED|
| REJECTED           |
| WAITING            |
| GHOSTED            |
