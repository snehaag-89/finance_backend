# Finance Dashboard Backend

This is a robust and scalable backend system for a Finance Dashboard, built to manage financial records with strict role-based access control (RBAC). It supports user authentication, financial data management (CRUD operations), and summary-level analytics.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Atlas Cloud)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs

## Core Features
1. **User & Role Management:** * Supports `viewer`, `analyst`, and `admin` roles.
   * Secure password hashing and JWT-based authentication.
2. **Financial Records Management:** * Complete CRUD operations (Create, Read, Update, Delete) for income and expense records.
   * Includes filtering by `type` and `category`.
3. **Role-Based Access Control (RBAC):**
   * **Admin:** Full access (Create, Read, Update, Delete records).
   * **Analyst & Viewer:** Restricted access (Can only view records and dashboard analytics).
4. **Dashboard Analytics:** * Provides aggregated data including Total Income, Total Expense, Net Balance, Category-wise totals, and recent activity.
5. **Data Persistence:**
   * Utilizes **MongoDB** (a NoSQL Document Database) via Mongoose ODM for reliable and scalable data persistence.

## API Endpoints

### Authentication (`/api/auth`)
* `POST /register` - Register a new user
* `POST /login` - Authenticate user and get JWT token

### Financial Records (`/api/records`)
* `POST /add` - Create a new record (Admin only)
* `GET /fetchall` - Get all records (All authenticated users)
* `PUT /update/:id` - Update an existing record (Admin only)
* `DELETE /delete/:id` - Delete a record (Admin only)
* `GET /filter?type=...&category=...` - Filter records based on criteria

### Dashboard Analytics (`/api/dashboard`)
* `GET /summary` - Get aggregated financial analytics (All authenticated users)

## Setup and Installation

**1. Clone the repository**
```bash
git clone <your-repository-url>
cd finance-backend
