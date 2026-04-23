# Job Tracker

A full-stack web application for managing and tracking job application statuses. Monitor your job search progress with an intuitive dashboard, secure authentication, and comprehensive job tracking features.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Architecture](#project-architecture)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

Job Tracker is a comprehensive job application management system designed to help job seekers keep track of their applications, interview statuses, and overall job search progress. The application provides a modern, responsive interface with secure authentication and real-time job status updates.

**Use Cases:**

- Track job applications across multiple companies
- Monitor interview progress and timeline
- Maintain centralized job search notes and details
- Analyze job search statistics and patterns
- Manage multiple job opportunities simultaneously

## ✨ Features

### Core Features

- ✅ **User Authentication** - Secure signup/login with JWT tokens
- ✅ **Job Application Tracking** - Create, read, update, and delete job records
- ✅ **Status Management** - Track application states (Applied, Interview, Offer, Rejected)
- ✅ **User Dashboard** - Personalized dashboard with statistics and quick actions
- ✅ **Responsive Design** - Mobile-friendly interface for on-the-go tracking
- ✅ **Real-time Updates** - Instant application status changes
- ✅ **Secure Data** - Password encryption and JWT token-based authentication

### Advanced Features

- 📊 Application statistics and analytics
- 🔔 Status tracking timeline
- 📱 Mobile-optimized UI
- 🎨 Modern, intuitive interface
- ⚡ Fast and responsive performance

## 🛠 Technology Stack

### Backend

- **Java 21** - Programming language
- **Spring Boot 4.0.1** - Web framework
- **Spring Data JPA** - Database ORM
- **Spring Security** - Authentication & authorization
- **JWT (io.jsonwebtoken)** - Token-based authentication
- **PostgreSQL** - Relational database
- **Maven** - Build tool

### Frontend

- **React 19** - UI library
- **Vite 7.2.4** - Build tool & dev server
- **Tailwind CSS 4.1.18** - Styling framework
- **Material-UI (MUI)** - Component library
- **React Router 7.13.0** - Client-side routing
- **React Icons 5.6.0** - Icon library
- **DaisyUI 5.5.18** - UI component library

### DevOps & Tools

- **Git** - Version control
- **Node.js 16+** - JavaScript runtime
- **npm/yarn** - Package managers
- **ESLint** - Code quality
- **Maven Wrapper** - Build automation

## 📁 Project Structure

```
job-tracker/
├── backend/                          # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/jobTracker/
│   │   │   │       ├── Controller/          # REST endpoints
│   │   │   │       ├── Service/             # Business logic
│   │   │   │       ├── Repository/          # Data access
│   │   │   │       ├── Entity/              # JPA entities
│   │   │   │       ├── dto/                 # Data transfer objects
│   │   │   │       └── Security/            # Security config
│   │   │   └── resources/
│   │   │       └── application.properties   # Config file
│   │   └── test/                           # Unit tests
│   ├── pom.xml                             # Maven config
│   ├── mvnw & mvnw.cmd                    # Maven wrapper
│   └── README.md                           # Backend documentation
│
├── frontend/                          # React Vite application
│   ├── src/
│   │   ├── main.jsx                        # Entry point
│   │   ├── App.jsx                         # Root component
│   │   ├── auth/                           # Auth pages
│   │   ├── components/
│   │   │   ├── public/                     # Public pages
│   │   │   ├── private/                    # Protected components
│   │   │   └── User'/Dashboard/            # Dashboard views
│   │   ├── assets/                         # Images, icons
│   │   └── reactbits/                      # Reusable utilities
│   ├── index.html                          # HTML entry
│   ├── package.json                        # Dependencies
│   ├── vite.config.js                      # Vite config
│   └── README.md                           # Frontend documentation
│
├── .git/                             # Version control
├── .github/                          # GitHub workflows
├── .vscode/                          # VS Code settings
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 16+** and npm/yarn
- **Java 21+** and Maven
- **PostgreSQL 12+**
- **Git**

### 5-Minute Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd job-tracker
   ```

2. **Setup Backend:**

   ```bash
   cd backend
   # Create PostgreSQL database
   createdb job_tracker

   # Update application.properties with your DB credentials
   # Then run:
   mvn spring-boot:run
   ```

3. **Setup Frontend:**

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080/api

## 📦 Installation

### Backend Installation

See [backend/README.md](backend/README.md) for detailed instructions.

**Quick Install:**

```bash
cd backend
# Configure PostgreSQL in src/main/resources/application.properties
mvn clean install
mvn spring-boot:run
```

### Frontend Installation

See [frontend/README.md](frontend/README.md) for detailed instructions.

**Quick Install:**

```bash
cd frontend
npm install
npm run dev
```

## ▶️ Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Production Build

**Backend:**

```bash
cd backend
mvn clean package -DskipTests
java -jar target/jobTracker-0.0.1-SNAPSHOT.jar
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api
```

### Authentication Endpoints

**User Signup**

```
POST /auth/signup
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**User Login**

```
POST /auth/login
{
  "email": "string",
  "password": "string"
}
Response:
{
  "token": "jwt_token",
  "username": "string"
}
```

### Job Endpoints

**Get All Jobs**

```
GET /jobs
Authorization: Bearer <token>
```

**Create Job**

```
POST /jobs
Authorization: Bearer <token>
{
  "company": "string",
  "position": "string",
  "status": "applied|interview|offer|rejected",
  "dateApplied": "2026-04-23"
}
```

**Update Job**

```
PUT /jobs/{jobId}
Authorization: Bearer <token>
{
  "status": "string"
}
```

**Delete Job**

```
DELETE /jobs/{jobId}
Authorization: Bearer <token>
```

### User Endpoints

**Get Dashboard**

```
GET /user/dashboard
Authorization: Bearer <token>
```

**Update Profile**

```
PUT /user/profile
Authorization: Bearer <token>
{
  "username": "string",
  "email": "string"
}
```

## 🏗 Project Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Auth Pages  │  │ Job Dashboard│  │   Landing    │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         └──────────────────┴──────────────────┘              │
└─────────────────────────────────────────────────────────────┘
                           │ HTTP/JSON
                           ↓
┌─────────────────────────────────────────────────────────────┐
│          Backend API (Spring Boot + JWT Auth)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Auth         │  │ Job          │  │ User         │       │
│  │ Controller   │  │ Controller   │  │ Controller   │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         └──────────────────┴──────────────────┘              │
│         ┌────────────────────────────────────┐               │
│         │    Service Layer (Business Logic)   │               │
│         └────────────────┬───────────────────┘               │
│         ┌────────────────▼───────────────────┐               │
│         │    Repository Layer (JPA)          │               │
│         └────────────────┬───────────────────┘               │
└─────────────────────────────────────────────────────────────┘
                           │ SQL
                           ↓
┌─────────────────────────────────────────────────────────────┐
│             PostgreSQL Database                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ users table  │  │ jobs table   │  │ audit logs   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Access** → Frontend loads at http://localhost:5173
2. **Authentication** → User logs in, receives JWT token
3. **Job Management** → Frontend stores token, sends requests with auth header
4. **API Processing** → Backend validates JWT, processes request
5. **Database** → Spring Data JPA manages data persistence
6. **Response** → Backend returns JSON response to frontend
7. **UI Update** → React updates component state and renders

## 💻 Development

### Code Organization

**Backend:**

- Controllers handle HTTP requests
- Services contain business logic
- Repositories manage database queries
- DTOs structure data for API responses

**Frontend:**

- Components are organized by feature
- React hooks manage component state
- Context API handles global state
- Tailwind/MUI provide styling

### Development Workflow

1. **Create Feature Branch:**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes:**
   - Backend: Update controllers/services
   - Frontend: Update components
   - Run tests and linting

3. **Commit Changes:**

   ```bash
   git commit -am "Description of changes"
   ```

4. **Push and Create PR:**
   ```bash
   git push origin feature/your-feature
   ```

### Running Tests

**Backend:**

```bash
cd backend
mvn test
```

**Frontend:**

```bash
cd frontend
npm run lint
```

### Code Quality

**Backend:**

- Follow Java naming conventions
- Use meaningful variable names
- Write unit tests for services
- Document complex logic

**Frontend:**

- Use ESLint for code quality: `npm run lint`
- Follow React best practices
- Use descriptive component names
- Comment complex logic

## 🌐 Deployment

### Backend Deployment

1. **Build JAR:**

   ```bash
   mvn clean package -DskipTests
   ```

2. **Deploy to Server:**
   - Copy JAR to server
   - Set environment variables
   - Run: `java -jar jobTracker-0.0.1-SNAPSHOT.jar`

### Frontend Deployment

**Option 1: Netlify**

```bash
npm run build
netlify deploy --prod --dir=dist
```

**Option 2: Vercel**

```bash
npm run build
vercel --prod
```

**Option 3: Traditional Hosting**

- Build: `npm run build`
- Copy `dist/` to web server
- Configure server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Guidelines:**

- Write clean, documented code
- Follow existing code style
- Include tests for new features
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

- Check PostgreSQL is running
- Verify database credentials in `application.properties`
- Ensure port 8080 is available

**Frontend won't connect to backend:**

- Verify backend is running on port 8080
- Check `VITE_API_URL` in `.env` file
- Check CORS configuration in backend

**Database connection errors:**

- Create database: `createdb job_tracker`
- Check PostgreSQL credentials
- Verify database URL format

**Port conflicts:**

- Backend: Change `server.port` in `application.properties`
- Frontend: Use `npm run dev -- --port 3000`

For detailed troubleshooting, see individual README files:

- [Backend Troubleshooting](backend/README.md#troubleshooting)
- [Frontend Troubleshooting](frontend/README.md#troubleshooting)

## 📄 License

This project is provided as-is for educational and professional use.

## 📞 Support

For questions and issues:

1. **Check Documentation:**
   - [Backend README](backend/README.md)
   - [Frontend README](frontend/README.md)

2. **Review Code:**
   - Check similar implementations
   - Review git history for patterns

3. **Debug:**
   - Check browser console for frontend errors
   - Check server logs for backend errors
   - Use network tab to inspect API calls

4. **Contact:**
   - Create an issue in the repository
   - Contact the development team

## 📝 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Project Status:** Active Development  
**Last Updated:** April 2026  
**Version:** 0.0.1-SNAPSHOT

## 🎉 Getting Started

Ready to track your job search? Follow the [Quick Start](#quick-start) guide above to get up and running in minutes!

**Questions?** Check the individual README files in the [backend](backend/README.md) and [frontend](frontend/README.md) folders for detailed documentation.
