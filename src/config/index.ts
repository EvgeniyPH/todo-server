import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DIALECT,
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
} = process.env

interface Config {
  port: number
  nodeEnv: string
  dbName: string
  dbUser: string
  dbPassword: string
  dbHost: string
  dbPort: number
  dbDialect: string
  jwtSecretKey: string
}

const config: Config = {
  port: Number(PORT) || 3001,
  nodeEnv: NODE_ENV || 'development',
  dbName: DATABASE_NAME as string,
  dbUser: DATABASE_USER as string,
  dbPassword: DATABASE_PASSWORD as string,
  dbHost: DATABASE_HOST as string,
  dbPort: Number(DATABASE_PORT) || 5432,
  dbDialect: DATABASE_DIALECT as string,
  jwtSecretKey: JWT_SECRET_KEY as string,
}

export default config
