import { config } from "dotenv";
config();

function getValue(key: string, defaultValue?: string) {
  const value = process.env[key] || defaultValue;

  if (value) {
    return value;
  } else {
    throw new Error("There is no variable in Process");
  }
}

export const configData = {
  server: {
    port: getValue("SERVER_PORT", "3000"),
    env: getValue("NODE_ENV"),
  },
  jwt: {
    accessSecret: getValue("JWT_ACCESS_SECRET_KEY"),
    accessExpiresin: getValue("JWT_ACCESS_EXPIRESIN"),
    refreshSecret: getValue("JWT_REFRESH_SECRET_KEY"),
    refreshExpiresin: getValue("JWT_REFRESH_EXPIRESIN"),
  },
  redis: {
    url: getValue("REDIS_URL"),
  },
  db: {
    host: getValue("DB_HOST"),
    port: getValue("DB_PORT", "3306"),
    user: getValue("DB_USERNAME"),
    pw: getValue("DB_PASSWORD"),
    database: getValue("DB_DATABASE"),
  },
};
