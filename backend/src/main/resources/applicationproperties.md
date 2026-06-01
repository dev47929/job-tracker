# ===================================================================
# Job Tracker - Sample Application Configuration
# ===================================================================

# Server
server.port=8080

# PostgreSQL Datasource
spring.datasource.url=jdbc:postgresql://localhost:5432/jobtracker
spring.datasource.username=
spring.datasource.password=

# JPA / Hibernate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=create
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT
jwt.secret.key=kvsev;k

# AI API Keys (set via environment variables in production)
openrouter.api.key=
groq.api.key=
API_KEY=

# Logging
logging.level.com.example.jobTracker=DEBUG
logging.level.org.springframework.security=INFO
logging.level.org.hibernate.SQL=WARN
logging.pattern.console=%clr(%d{yyyy-MM-dd HH:mm:ss}){faint} %clr(%5p) %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n

# ANSI console output
spring.output.ansi.enabled=always
