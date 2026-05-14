const { config } = require('dotenv')
config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DIALECT,
  PORT,
} = process.env

module.exports = {
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: DATABASE_PORT,
  host: DATABASE_HOST,
  dialect: 'postgres',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorageTableName: 'sequelize_seeds',
}
