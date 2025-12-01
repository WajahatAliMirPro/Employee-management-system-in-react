# Employee Management System - Backend

## Description
RESTful API for Employee Management System built with Node.js, Express, and MongoDB.

## Tech Stack
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Installation

```bash
npm install
```

## Environment Variables
Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ems_db
JWT_SECRET=your_super_secret_key_change_this_in_production
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Employees (Protected Routes)
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Project Structure
```
EMSbackend/
├── controllers/
│   ├── authController.js
│   └── employeeController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Employee.js
├── routes/
│   ├── authRoutes.js
│   └── employeeRoutes.js
├── .env
├── package.json
└── server.js
```

## Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `nodemon` - Development auto-reload (dev dependency)
