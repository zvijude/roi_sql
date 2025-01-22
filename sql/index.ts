import knex from 'knex'

export const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
})
