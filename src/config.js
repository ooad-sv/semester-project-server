const env = process.env;

const config = {
  db: {
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  },
};

module.exports = config;