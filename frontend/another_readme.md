# Comprehensive Codebase Analysis

## 1. Project Overview

**Name:** Job Tracker (branded internally as "JobStack")

**Description:** A full-stack web application for managing and tracking job application statuses. It allows users to track applications across multiple companies, monitor interview progress, maintain centralized notes, and analyze job search statistics.

**Version:** 0.0.1-SNAPSHOT

**Status:** Active development (last commit: May 27, 2026)

**Repository:** Single main branch, one remote (origin/main)

---

## 2. Full Directory Tree (top 3 levels, excluding .git, node_modules, target, dist)

```
job-tracker/
├── README.md
├── package-lock.json
├── .gitignore
├── .vscode/
│   └── settings.json
├── .idea/                              (IDE config)
├── backend/
│   ├── pom.xml                         (Maven build config)
│   ├── mvnw / mvnw.cmd                 (Maven wrapper)
│   ├── README.md
│   ├── .gitignore
│   ├── .gitattributes
│   ├── .mvn/wrapper/
│   └── src/
│       ├── main/
│       │   ├── java/com/example/jobTracker/
│       │   │   ├── JobTrackerApplication.java
│       │   │   ├── Controller/
│       │   │   │   ├── AuthController.java
│       │   │   │   ├── jobTrackerController.java         (stub - empty)
│       │   │   │   └── UserDashboardController.java
│       │   │   ├── Service/
│       │   │   │   ├── AuthService.java
│       │   │   │   ├── AIapiService.java
│       │   │   │   └── userControl/
│       │   │   │       └── DashboardService.java
│       │   │   ├── Repository/
│       │   │   │   ├── UserRepo.java
│       │   │   │   └── JobStatusRepo.java
│       │   │   ├── Entity/
│       │   │   │   ├── User.java
│       │   │   │   ├── JobStatus.java
│       │   │   │   └── subClasses/
│       │   │   │       └── Status.java                   (enum)
│       │   │   ├── dto/
│       │   │   │   ├── AiReqDto.java
│       │   │   │   ├── AiResDTO.java
│       │   │   │   ├── Auth/
│       │   │   │   │   ├── LoginRequestDTO.java
│       │   │   │   │   ├── LoginResponseDTO.java
│       │   │   │   │   ├── SignupRequestDTO.java
│       │   │   │   │   └── SignupResponseDTO.java
│       │   │   │   ├── JobList/
│       │   │   │   │   ├── PostJobReqDTO.java
│       │   │   │   │   ├── PostJobResponseDTO.java
│       │   │   │   │   ├── JobStatusResponseDto.java
│       │   │   │   │   ├── DelJobReqDTO.java
│       │   │   │   │   ├── DelJobResDTO.java
│       │   │   │   │   ├── UserJobsDTO.java              (empty stub)
│       │   │   │   │   └── UserDetailsResponseDTO.java   (empty stub)
│       │   │   │   ├── User/
│       │   │   │   │   ├── RequestDTO.java
│       │   │   │   │   ├── UserRequestDTO.java
│       │   │   │   │   ├── UserResponseDTO.java
│       │   │   │   │   └── GetJobsDTO.java
│       │   │   │   └── AIdtos/
│       │   │   │       ├── ChatReqDTO.java
│       │   │   │       ├── ChatResDTO.java
│       │   │   │       ├── Choice.java
│       │   │   │       ├── ContextReqDTO.java
│       │   │   │       ├── ContextResDTO.java
│       │   │   │       └── Message.java
│       │   │   └── Security/
│       │   │       ├── SecurityConfig.java
│       │   │       ├── JwtAuthFilter.java
│       │   │       ├── CustomUserDetailsService.java
│       │   │       └── AuthUtil.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/java/com/example/jobTracker/
│           └── ServiceTest/
│               └── AIapiServiceTest.java
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env
│   ├── ".env sample"
│   ├── README.md
│   ├── Revision.md
│   ├── .gitignore
│   ├── .sixth/skills/                  (unknown/dotfile)
│   └── src/
│       ├── main.jsx                    (router + entry)
│       ├── App.jsx                     (root - renders Landing)
│       ├── App.css                     (global styles, daisyui plugin)
│       ├── index.css                   (@import "tailwindcss")
│       ├── assets/
│       │   └── react.svg
│       ├── context/
│       │   └── UserContext.jsx          (just createContext, no provider)
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Auth/
│       │   │   ├── AuthLayout.jsx
│       │   │   ├── Login.jsx
│       │   │   └── Signup.jsx
│       │   └── Dashboard/
│       │       ├── DashboardLayout.jsx
│       │       ├── Applications.jsx
│       │       └── Profile.jsx
│       └── components/
│           ├── landing/
│           │   ├── Navbar.jsx
│           │   └── Hero.jsx
│           ├── dashboard/
│           │   ├── Sidebar.jsx
│           │   ├── Table.jsx
│           │   ├── AddwithAI.jsx
│           │   └── AddwithAI/
│           │       ├── RawInputForm.jsx
│           │       └── ReviewParsedJobs.jsx
│           └── ui/
│               ├── Error.jsx
│               ├── Gradient.jsx
│               ├── Iphone.jsx
│               └── LandingGlobe.jsx
```

---

## 3. Tech Stack Details

### Backend

| Technology       | Version     | Purpose                      |
|------------------|-------------|------------------------------|
| Java             | 21          | Programming language         |
| Spring Boot      | 4.0.1       | Web framework                |
| Spring Data JPA  | (included)  | ORM / database access        |
| Spring Security  | (included)  | Authentication & authorization|
| Spring WebFlux   | (included)  | WebClient for AI API calls   |
| PostgreSQL       | (runtime)   | Relational database          |
| JWT (jjwt)       | 0.12.6      | Token-based auth             |
| ModelMapper      | 3.2.4       | DTO-entity mapping           |
| Lombok           | (optional)  | Boilerplate reduction        |
| Maven            | (wrapper)   | Build tool                   |

### Frontend

| Technology            | Version   | Purpose                      |
|-----------------------|-----------|------------------------------|
| React                 | 19.2.0    | UI library                   |
| Vite                  | 7.2.4     | Build tool / dev server      |
| Tailwind CSS          | 4.1.18    | Utility-first CSS            |
| DaisyUI               | 5.5.18    | UI component library         |
| FlyonUI               | 2.4.1     | Additional UI components     |
| React Router          | 7.13.0    | Client-side routing          |
| React Icons           | 5.6.0     | Icon library                 |
| Motion (Framer Motion)| 12.38.0   | Animation library            |
| ogl                   | 1.0.11    | WebGL library                |
| @use-gesture/react    | 10.3.1    | Gesture handling             |
| @fontsource/roboto    | 5.2.9     | Roboto font                  |
| ESLint                | (via Vite)| Code linting                 |

### DevOps & Infrastructure

- No Docker (no Dockerfile or docker-compose anywhere)
- No CI/CD (no `.github/` workflows, no YAML files)
- No Docker Compose
- No Kubernetes/Helm
- No Terraform/Ansible

---

## 4. Current Features and API Endpoints

### Backend API Endpoints (actual implementation)

| Method | Path                          | Auth | Controller             | Description               |
|--------|-------------------------------|------|------------------------|---------------------------|
| POST   | `/auth/login`                 | No   | AuthController         | Login, returns JWT + userId |
| POST   | `/auth/signup`                | No   | AuthController         | Register new user         |
| GET    | `/jobs/users/getdetails`      | JWT  | UserDashboardController| Get user profile info     |
| GET    | `/jobs/users/getjobs`         | JWT  | UserDashboardController| Get user's job list       |
| POST   | `/jobs/users/addjob`          | JWT  | UserDashboardController| Add a single job          |
| DELETE | `/jobs/users/{jobId}`         | JWT  | UserDashboardController| Delete a job              |
| POST   | `/jobs/users/ai/organizeandadd`| JWT | UserDashboardController| AI parse via OpenRouter   |
| POST   | `/jobs/users/ai/addGroq`      | JWT  | UserDashboardController| AI parse via Groq         |

**Note:** The `jobTrackerController` is a completely empty stub (no endpoints). The `UserDashboardController` is mapped to `/jobs` but serves as the main job CRUD controller.

### Frontend Routes

| Path                          | Component          | Description                      |
|-------------------------------|--------------------|----------------------------------|
| `/`                           | `App -> Landing`   | Landing page with hero, features, globe |
| `/auth/login`                 | `AuthLayout -> Login` | Login form                    |
| `/auth/signup`                | `AuthLayout -> Signup` | Signup form                  |
| `/user/dashboard/applications`| `DashboardLayout -> Applications` | Job applications table + stats |
| `/user/dashboard/profile`     | `DashboardLayout -> Profile` | User profile edit form      |

### Notable Features

- JWT Authentication with login/signup via Spring Security
- Job CRUD (Create, Read, Delete -- no Update endpoint implemented on backend)
- AI-Powered Job Parsing using OpenRouter (DeepSeek model) and Groq (Llama model) to parse unstructured text
- Bulk AI Add Modal (frontend step 1: paste raw text, step 2: review/edit parsed jobs, submit)
- Dashboard with stats cards (total apps, interviews, offers)
- Responsive Landing Page with gradient animation, interactive 3D globe with company logos
- User Profile page with edit/logout
- Dark-theme Dashboard UI with sidebar navigation

---

## 5. Test Coverage

- **1 test file** exists: `backend/src/test/java/com/example/jobTracker/ServiceTest/AIapiServiceTest.java`
- This is a single integration test that calls `AIapiService.getOpenRouterResponse()` with CSV-like test data
- Uses `@SpringBootTest`, `@MockitoExtension`, and `@Autowired`
- No frontend tests (no Jest, Vitest, React Testing Library, or any test runner configured)
- No ESLint config file found (the `package.json` has `"lint": "eslint ."` but no `.eslintrc` or `eslint.config.js` exists)
- The `.gitignore` explicitly ignores the generated test file `JobTrackerApplicationTests.java`

---

## 6. CI/CD, Deployment, Database, Docker

- **CI/CD:** None. No `.github/workflows`, no `.gitlab-ci.yml`, no Jenkinsfile.
- **Docker:** None. No Dockerfile, no `docker-compose.yml` anywhere.
- **Database:** PostgreSQL is required. Uses `ddl-auto=create` (drops and recreates schema on every startup -- dangerous for production). Credentials are hardcoded in `application.properties` (not using env vars for secrets).
- **Deployment:** README suggests manual deploy: `mvn clean package -DskipTests` for backend JAR, `npm run build` for frontend static files. Mentions Netlify/Vercel for frontend.
- No `data.sql` for seed data (the README mentions one but it does not exist).

---

## 7. State Management

- React Context API is initialized in `frontend/src/context/UserContext.jsx` but is never used — it only creates a context with `createContext()` and exports it; no Provider wraps the app, and no component imports it.
- No global state management library (no Redux, Zustand, Jotai)
- Local state via `useState` in individual components
- JWT token stored in `localStorage` under key `"token"`
- No auth persistence — page refresh on the dashboard will lose state (though the token remains in `localStorage`, the components don't rehydrate from it)

---

## 8. UI/UX Completeness

### Landing Page
- Very polished, modern design with gradient backgrounds, animations, blur effects
- Desktop-first -- mobile responsiveness not fully verified but uses responsive classes
- Content is mostly static/hardcoded (stats like "1,200+ applications", logos, etc.)
- Features section, solutions section, trust section

### Auth Pages
- Clean dark-themed auth forms
- Login page has error handling (shows error messages, auto-clears after 3s)
- Signup page has basic success/error feedback
- No input validation beyond HTML `required` attributes
- No password strength indicator
- No "forgot password" flow

### Dashboard
- Dark-themed layout with sidebar navigation
- Applications page: shows 3 stat cards (hardcoded values), a table that loads jobs from API, an "Add with AI" button
- Table: shows job data with status color badges, delete button per row
- Profile page: shows user info form (username, email, phone) with edit/save/cancel and logout
- No loading states beyond the AI modal spinner
- No empty state design beyond the table message "No job applications found"
- No error boundaries or toasts

### AI Add Modal
- Two-step wizard: paste raw text -> review parsed jobs
- Editable fields per job, remove button
- Submit all button
- Good UX with loading indicators

---

## 9. Error Handling Patterns

### Backend
- Minimal error handling:
  - `AuthService.login()` throws `RuntimeException("Invalid username or password")` (generic, no proper 401)
  - `AuthService.signup()` throws `IllegalArgumentException` if username taken (no consistent exception handling)
  - `DashboardService.getUser()` throws `UsernameNotFoundException` if token user not found
  - AI API calls wrap exceptions and attempt Groq fallback
- No global exception handler (`@ControllerAdvice` / `@ExceptionHandler`)
- No custom error response DTO — errors bubble up as 500 with stack traces
- No input validation annotations (`@Valid`, `@NotBlank`, etc.)

### Frontend
- Login: shows inline error messages with auto-dismiss (3s)
- Signup: logs errors to console but no user-facing error display
- Table: catches errors silently, just logs to console
- AI modal: uses `alert()` for errors (not ideal UX)
- No React error boundary component

---

## 10. Gaps, Incomplete Items, and Bare-Bones Areas

### Critical Missing Features
1. **Update job endpoint** -- the README documents `PUT /jobs/{jobId}` and the frontend Table has a "Comments" column, but there is no backend endpoint to update/edit a job
2. **Update profile endpoint** -- the root README documents `PUT /user/profile`, but there is no such endpoint in any controller
3. **Auth persistence** -- no auth context provider, no route guards, no token verification on page load
4. **No logout on backend** -- JWT invalidation not implemented

### Stub/Empty Files
- `jobTrackerController.java` -- completely empty (no methods)
- `UserJobsDTO.java` -- empty class
- `UserDetailsResponseDTO.java` -- empty class
- `UserContext.jsx` -- only creates context, not wired up

### Security Concerns
- Hardcoded credentials in `application.properties` (DB password, JWT secret, API keys) -- not using env vars or `@Value` for these
- `jwt.secret.key` is a weak random string, not a proper base64-encoded key
- `ddl-auto=create` -- drops all data on restart
- Login request uses `username` as the principal identifier but the `email` field is also collected (inconsistency)
- No HTTPS, no rate limiting, no CSRF protection (`csrf` is disabled)
- CORS allows `http://localhost:5173` hardcoded

### Missing DevOps
- No Docker configuration
- No CI/CD pipeline
- No `.env.example` for backend
- No `docker-compose.yml` for PostgreSQL + app
- No health check endpoint

### Testing Gaps
- Only 1 test file for AI service
- No service-layer tests for AuthService or DashboardService
- No controller tests
- No repository tests
- No frontend tests whatsoever
- ESLint configured in `package.json` but no config file exists

### Frontend Gaps
- `UserContext.jsx` is created but never used (the Provider is not wrapped, and no component consumes it)
- No loading/skeleton states on dashboard pages
- Dashboard stats are hardcoded ("24", "5", "2") -- never fetched from an API
- Profile page has hardcoded default values and a "phone" field that doesn't exist in the backend entity
- The `ReviewParsedJobs` component references `job.comments` but the `JobStatusResponseDto` does not have a `comments` field
- No mobile-responsive sidebar (no hamburger menu)

### Documentation Inconsistencies
- README references paths like `/auth/login` but actual implementation uses `/jobs/users/getjobs` etc.
- README says context path is `/api`, but the actual `application.properties` has no `server.servlet.context-path` set
- Frontend README references material-ui (MUI) but it is NOT in `package.json`
- Frontend README references files/folders that don't exist (`auth/Auth.jsx`, `auth/AuthLogin.jsx`, `reactbits/`)
- Landing page uses "JobStack" branding while README says "Job Tracker"

---

## 11. Git Log — Recent Activity (last 20 commits)

```
43f445f 2026-05-27 Dev Sharma         (landing page redesign)
5f35080 2026-05-19 dev47929           (AI feature work)
b583727 2026-05-18 dev47929           Update .gitignore
1c13f66 2026-05-18 dev47929           Created .env
eaf9567 2026-05-18 dev47929           Working backend apis
9075fb6 2026-05-17 dev47929           
ad4849f 2026-05-16 Dev Sharma         
7e7a54f 2026-05-15 Dev Sharma         
4f33e82 2026-05-15 Dev Sharma         Update AIapiService.java
65a8502 2026-05-09 Dev Sharma         
27fa0c9 2026-05-04 Dev Sharma         updated gitignore
24dfdb7 2026-05-04 Dev Sharma         Stop tracking application.properties
c595a48 2026-05-04 Dev Sharma         ai-backend
4baa670 2026-04-30 Dev Sharma         Add AI bulk-add UI & dashboard routing
6a291a0 2026-04-30 dev47929           Merge branch 'main'
d45f999 2026-04-30 dev47929           
a5cbb1a 2026-04-30 Dev Sharma         
9a57759 2026-04-29 dev47929           working
21e2ffa 2026-04-27 dev47929           Upgrade lightningcss and add Profile route
2f86419 2026-04-23 Dev Sharma         added readmes
```

**Pattern:** The project has seen active development since mid-April 2026, with the most recent commits focused on the landing page redesign and AI integration. Many commits have minimal messages ("c", "comm", "ll", "").

---

## 12. Summary Statistics

| Metric                             | Value                     |
|------------------------------------|---------------------------|
| Backend Java source                | ~1,130 lines across 39 files |
| Frontend JSX source                | ~2,594 lines across 24 files |
| CSS                                | ~1,408 lines (2 CSS files) |
| Total project size                 | ~5,100 lines of handwritten code (excluding generated/build/third-party) |
| Backend endpoints implemented      | 8 (plus 2 stubs)          |
| Frontend routes                    | 5                         |
| Tests                              | 1                         |
| Docker/CI/CD files                 | 0                         |

---

## 13. Final Assessment

This is a functional but early-stage full-stack application with a polished landing page, working authentication, basic job CRUD (minus update), and an innovative AI-powered job parsing feature. The architecture follows standard Spring Boot layered patterns and React component structure.

However, it has significant gaps: no test coverage to speak of, no CI/CD, no Docker, no global error handling, inconsistent state management (Context created but unused), several empty stub files, hardcoded secrets in properties, and documentation that doesn't match reality.

The project appears to be a solo developer effort with active but inconsistent commit history. It would benefit from adding update endpoints, proper state management, error boundaries, a global exception handler, Docker setup, and significantly more test coverage before production readiness.
