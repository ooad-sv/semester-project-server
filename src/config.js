const env = process.env;

const config = {
  db: {
    connectionString: env.DATABASE_URL,
    ssl: true
  },
};

module.exports = config;