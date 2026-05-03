# Todo App — Server

Backend for the Todo application, built with Node.js, Express, and Sequelize ORM.

## Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Validation**: Joi
- **Auth**: JWT & bcrypt

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update .env with your database credentials and JWT_SECRET_KEY
   ```

### Development

Run the development server with hot-reload and path alias support:

```bash
npm run dev
```

### Build and Lint

- **Build**: `npm run build` (compiles TypeScript and resolves aliases)
- **Lint**: `npm run lint`

## Architecture

- `src/modules/`: Feature-based modules (Controller/Service/Repository).
- `src/database/`: Sequelize models and association definitions.
- `src/routes/`: Centralized routing, prefixed with `/api`.
- `src/middleware/`: Global middlewares (auth, error handling, logging).

## Database Management

This project uses `sequelize.sync()` for schema management. There is no separate migration CLI. 
To sync changes during development, you can use `await database.sync({ alter: true })` in `src/server.ts`.
