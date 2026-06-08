# InterviewHub - Java Interview Prep System

Welcome to **InterviewHub**, a platform designed to help users manage, study, and track their progress on Java and Spring Boot interview questions. 

## 🚀 Features

- **Topic & Category Management**: Organize learning materials by category (e.g., Core Java, Collections, Concurrency, Spring Boot, Microservices).
- **Question Management**: Full CRUD support for interview questions.
- **Markdown Support**: Render questions and code snippets beautifully using Markdown formatting.
- **Secure Authentication**: Built with Spring Security and OAuth2 Resource Server for stateless JWT authentication.
- **RESTful API**: A clean, scalable backend architecture following best practices.

## 🛠️ Tech Stack

**Backend**
- **Language**: Java 21
- **Framework**: Spring Boot 3.x / Spring Framework 7
- **Security**: Spring Security 6 + oauth2-resource-server (Nimbus JOSE JWT)
- **Database**: Spring Data JPA + MySQL
- **Build Tool**: Maven
- **Validation**: Jakarta Bean Validation
- **Testing**: JUnit 5, Mockito, MockMvc
- **API Documentation**: SpringDoc OpenAPI (Swagger)

**Frontend** (Planned/Separate)
- React, Vite
- Ant Design
- Axios

## 📂 Project Structure

This project enforces a clean layered architecture, ensuring separation of concerns:

- `config/`: Application configuration (Security, JWT, CORS, OpenAPI).
- `security/`: Custom user details service and security utilities.
- `exception/`: Global exception handling and custom exceptions.
- `dto/`: Shared Data Transfer Objects.
- `feature/`: Domain-driven packages (e.g., `auth`, `user`). Each feature contains its own Controller, Service, Repository, Entity, and feature-specific DTOs.
- `util/`: Stateless utility classes.

## 🔧 Getting Started

### Prerequisites
- JDK 21
- Maven
- MySQL

### Running Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd InterviewHub
   ```
3. Configure the database connection in `src/main/resources/application.properties`.
4. Build the project using Maven:
   ```bash
   ./mvnw clean install
   ```
5. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

## 📖 Development Rules & Guidelines

For detailed information on coding conventions, architecture rules, and best practices, please refer to our internal guide: [PROJECT_RULES.md](docs/PROJECT_RULES.md).
