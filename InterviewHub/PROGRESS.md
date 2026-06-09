# 📈 Project Progress Tracker

This document tracks the tasks completed, ongoing work, and upcoming goals for the **InterviewHub** project to maintain a clear history of development.

## 📝 Changelog & Activity

### [2026-06-08]
- **Initialized Project Documentation:**
  - Analyzed `PROJECT_RULES.md` to understand the tech stack, layered architecture rules, and conventions.
  - Created the project `README.md` to summarize the project's purpose, features, tech stack, and structure.
  - Initialized a `PROGRESS.md` file to maintain a continuous log of AI and developer activities.
- **Implemented Foundation & Role Feature:**
  - Established standardized `ApiResponse` and Global Exception Handling.
  - Set up temporary `SecurityConfig` to bypass auth for testing.
  - Implemented the full CRUD API for the `Role` entity (Controller, Service, Repository, DTOs).
- **Implemented User CRUD Feature & Pagination:**
  - Added a generic `PaginationDTO` for returning paginated responses.
  - Set up `BCryptPasswordEncoder` in `SecurityConfig`.
  - Implemented `User` entity with a `@ManyToOne` relationship to `Role`.
  - Built the `User` CRUD APIs, including paginated `getAllUsers`.

## ⏳ Upcoming Tasks (To-Do)

- [x] Set up global exception handling and standardized `ApiResponse`.
- [x] Implement the `Role` CRUD feature and base Security config.
- [x] Build the `auth` module user foundation (User entity, CRUD, pagination).
- [ ] Build the `auth` module endpoints (registration, login, JWT issuance).
- [ ] Set up the remaining database schema and entities based on `DATABASE.md` (Categories, Questions).
- [ ] Implement Topic / Category Management.
- [ ] Implement Question Management (CRUD, markdown support).

---
*Note: This file will be updated as new features are implemented, bugs are fixed, or project configurations are modified.*
