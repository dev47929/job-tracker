# Job Tracker Backend

A Spring Boot REST API application for tracking job application statuses. Built with Java 21, Spring Boot 4.0.1, and PostgreSQL.

## Overview

The Job Tracker backend is a RESTful API that provides authentication, user management, and job application tracking functionality. It features JWT-based security, role-based access control, and a clean architecture with Controllers, Services, Repositories, and DTOs.

## Technology Stack

- **Java 21** - Programming language
- **Spring Boot 4.0.1** - Framework
- **Spring Data JPA** - ORM and database access
- **Spring Security** - Authentication and authorization
- **JWT (io.jsonwebtoken)** - Token-based authentication
- **PostgreSQL** - Database
- **Maven** - Build tool

## Prerequisites

Before running the application, ensure you have:

- **Java 21** or higher installed
- **Maven 3.6+** installed
- **PostgreSQL 12+** running and accessible
- **Git** (for version control)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd job-tracker/backend
```

### 2. Configure Database

Create a PostgreSQL database for the application:

```sql
CREATE DATABASE job_tracker;
CREATE USER job_tracker_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE job_tracker TO job_tracker_user;
```

### 3. Environment Configuration

Update `src/main/resources/application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/job_tracker
spring.datasource.username=job_tracker_user
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Secret (change this in production!)
jwt.secret=your_super_secret_jwt_key_minimum_256_bits_long
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.servlet.context-path=/api
```

### 4. Build the Application

```bash
mvn clean package
```

### 5. Run the Application

**Using Maven:**

```bash
mvn spring-boot:run
```

**Using JAR file:**

```bash
java -jar target/jobTracker-0.0.1-SNAPSHOT.jar
```

The server will start on `http://localhost:8080/api`

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/example/jobTracker/
│   │   │   ├── JobTrackerApplication.java          # Main entry point
│   │   │   ├── Controller/                          # REST endpoints
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── jobTrackerController.java
│   │   │   │   └── UserDashboardController.java
│   │   │   ├── Service/                             # Business logic
│   │   │   │   ├── AuthService.java
│   │   │   │   └── userControl/
│   │   │   ├── Repository/                          # Data access layer
│   │   │   │   ├── JobStatusRepo.java
│   │   │   │   └── UserRepo.java
│   │   │   ├── Entity/                              # JPA entities
│   │   │   │   ├── User.java
│   │   │   │   ├── JobStatus.java
│   │   │   │   └── subClasses/
│   │   │   ├── dto/                                 # Data Transfer Objects
│   │   │   │   ├── Auth/
│   │   │   │   ├── JobList/
│   │   │   │   └── User/
│   │   │   └── Security/                            # Security configuration
│   │   │       ├── SecurityConfig.java
│   │   │       ├── JwtAuthFilter.java
│   │   │       ├── CustomUserDetailsService.java
│   │   │       └── AuthUtil.java
│   │   └── resources/
│   │       ├── application.properties               # Configuration
│   │       └── data.sql                             # Sample data
│   └── test/
│       └── java/...                                 # Unit tests
├── pom.xml                                          # Maven configuration
├── mvnw & mvnw.cmd                                  # Maven wrapper
└── HELP.md                                          # Spring Boot help
```

## API Endpoints

### Authentication Endpoints

**Signup**

```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Login**

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "token": "jwt_token_here",
  "username": "john_doe"
}
```

### Job Tracking Endpoints

**Get All Jobs**

```
GET /api/jobs
Authorization: Bearer <jwt_token>
```

**Create Job**

```
POST /api/jobs
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "company": "TechCorp",
  "position": "Senior Developer",
  "status": "applied",
  "dateApplied": "2026-04-23"
}
```

**Update Job Status**

```
PUT /api/jobs/{jobId}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "status": "interview"
}
```

**Delete Job**

```
DELETE /api/jobs/{jobId}
Authorization: Bearer <jwt_token>
```

### User Endpoints

**Get User Dashboard**

```
GET /api/user/dashboard
Authorization: Bearer <jwt_token>
```

**Update User Profile**

```
PUT /api/user/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "username": "new_username",
  "email": "new@example.com"
}
```

## Key Features

- **User Authentication** - Secure login/signup with JWT tokens
- **Password Security** - Encrypted password storage
- **Role-Based Access Control** - Different permissions for different user roles
- **Job Tracking** - Create, read, update, and delete job applications
- **Status Management** - Track application status (Applied, Interviewing, Offered, Rejected)
- **User Dashboard** - Personalized dashboard with job statistics
- **CORS Support** - Enable cross-origin requests for frontend integration

## Development

### Running Tests

```bash
mvn test
```

### Building for Production

```bash
mvn clean package -DskipTests
```

This generates a production-ready JAR file in the `target/` directory.

### Code Style & Formatting

The project follows standard Java conventions. Use your IDE's formatting tools to maintain consistency.

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `psql --version`
- Check database credentials in `application.properties`
- Ensure database exists and user has proper permissions

### Port Already in Use

- Change the port in `application.properties`: `server.port=8081`

### JWT Token Expired

- Adjust JWT expiration in `application.properties`: `jwt.expiration=<milliseconds>`

### CORS Errors

- Check `SecurityConfig.java` for CORS configuration
- Ensure frontend URL is whitelisted

## Environment Variables

For production, consider using environment variables:

```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://db-host:5432/job_tracker
export SPRING_DATASOURCE_USERNAME=db_user
export SPRING_DATASOURCE_PASSWORD=db_password
export JWT_SECRET=your_secret_key
export JWT_EXPIRATION=86400000
```

## Performance Optimization

- Implement database indexing on frequently queried columns
- Use pagination for large job lists
- Cache user data appropriately
- Monitor database query performance

## Security Considerations

- ⚠️ Change JWT secret before production deployment
- Use HTTPS in production
- Implement rate limiting
- Validate all user inputs
- Use environment variables for sensitive data
- Keep dependencies updated

## Related Documentation

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [Spring Data JPA Documentation](https://spring.io/projects/spring-data-jpa)
- [JWT (io.jsonwebtoken) Documentation](https://github.com/jwtk/jjwt)

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a Pull Request

## License

This project is provided as-is for educational and professional use.

## Support

For issues and questions:

1. Check existing documentation
2. Review the troubleshooting section
3. Contact the development team

---

**Last Updated:** April 2026
