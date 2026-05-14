# Todo App — Server

Backend for the Todo application, built with Node.js, Express, and Sequelize ORM.

## Tech Stack

- **Framework**: Express.js (v5)
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

3. Run migrations:
   ```bash
   npm run migration
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

- `src/modules/`: Feature-based modules (Controller/Service/Repository). Current modules: `auth`, `user`, `todo`, `tag`.
- `src/database/`: Sequelize models, migrations, and association definitions.
- `src/routes/`: Centralized routing, prefixed with `/api`.
- `src/middleware/`: Global middlewares (auth, error handling).
- `src/config/`: Configuration management using `dotenv`.
- `src/error/`: Custom error classes (e.g., `ApiErrors`).
- `src/utils/`: Utility functions.

## Database Management

This project uses Sequelize Migrations for schema management.

- **Generate Migration**: `npm run migration:generate -- some_name`
- **Run Migrations**: `npm run migration`

The database configuration is managed in `src/config/index.ts` and models are initialized in `src/database/index.ts`.
