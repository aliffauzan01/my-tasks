  import 'dotenv/config';
 
export default {
  dialect: 'postgresql',
  schema: './db/schema.js',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
};