const { env } = process;

const config = {
  db: {
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  },
  auth: {
    jwtSecretKey: env.JWT_SECRET_KEY,
  },
};

module.exports = config;
