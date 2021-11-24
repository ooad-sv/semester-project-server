const { env } = process;

const config = {
  db: {
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
  },
  auth: {
    jwtSecretKey: env.JWT_SECRET_KEY,
  },
  mailer: {
    email: env.MAILER_EMAIL,
    password: env.MAILER_PASSWORD,
  },
};

module.exports = config;
