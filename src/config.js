const env = process.env;

const config = {
  db: {
    connectionString: env.DATABASE_URL,
  },
};

module.exports = config;