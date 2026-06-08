# Java Interview Prep System - Database Design

## 1. Project Overview

- System support users to learn and review Java, Spring Boot, SQL interviews
- Manage questions: CRUD questions
- Category questions: Category questions
- Save answers in Markdown format
- Mark questions as learned
- Track question difficulty 
- Manage users and roles

---

# 2. Database Schema Overview

Database include tables

```
users
roles
categories
questions
user_question:
```

Relationships between tables:

```
users N
  |
  | 
  |
roles 1


categories 1
    |
    | 
    |
questions N



users N
 |
 |
 |
 |
 question N  (this relationship help user can mark the question they have learned)


```

---

# 3. Table: users

Store user information

```sql
users
```

| Column | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| username | VARCHAR(50) | Username |
| email | VARCHAR(100) | Email |
| password | VARCHAR(255) | Password |
|role_id| BIGINT | FK roles |
| created_at | TIMESTAMP | Created date |

Example:

```json
{
  "id": 1,
  "username": "thanh",
  "email": "test@gmail.com",
  "role":{
    "id":1,
    "name":"ADMIN"
  }
}
```

---

# 4. Table: roles

Store roles information

```sql
roles
```

| Column | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(50) | Role name |

Example:

```json
{
  "id": 1,
  "name": "ADMIN"
}
```

Role feilds

```
ADMIN
USER
```

---


## Table: user_question

Store user-question relationship information

| Column | Type | Description |
|---|---|---|
| user_id | BIGINT | FK user |
| question_id | BIGINT | FK question |
| status | ENUM('LEARNING','REVIEW','MASTERED') | status of question |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Updated date |

Example:

```json
{
  "user_id": 1,
  "question_id": 1,
  "status":"LEARNING"
}
``` 

---

# 5. Table: categories

Store categories information

```sql
categories
```

| Column | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| name | VARCHAR(100) | Category name |
| description | TEXT | Description |

Example:

```json
{
  "id":1,
  "name":"Java Core",
  "description":"Các kiến thức Java cơ bản"
}
```

Category:

```
Java Core
Spring Boot
Database
Hibernate
Microservices
....
```

---

# 6. Table: questions

Store questions information

```sql
questions
```

| Column | Type | Description |
|---|---|---|
| id | BIGINT | Primary key |
| title | VARCHAR(255) | Question title |
| content | TEXT | Question content |
| answer_markdown | LONGTEXT | Answer markdown |
| difficulty | VARCHAR(20) | Difficulty level |
| category_id | BIGINT | FK category |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Ngày sửa |

---

## Example question

```json
{
 "title":"HashMap hoạt động như thế nào?",
 "content":"Giải thích cơ chế HashMap trong Java",
 "difficulty":"MEDIUM",
 "answerMarkdown":
 "# HashMap

 HashMap lưu dữ liệu dạng key-value.

 ## Cơ chế

 - Hash function
 - Bucket
 - Collision handling

 ```java
 Map<String,Integer> map = new HashMap<>();
 ```
 "
}
```

---

# 8. Difficulty Level

Values

```
EASY
MEDIUM
HARD
```

---

