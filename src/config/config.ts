import { registerAs } from '@nestjs/config';

interface SecurityConfig {
  secret: string;
  expiresIn: string;
}

interface DatabaseConfig {
  url: string;
}

export interface AppConfig {
  port: number | string;
}

export interface Config {
  security: SecurityConfig;
  database: DatabaseConfig;
  app: AppConfig;
}

export default registerAs('', (): Config => {
  return {
    security: {
      secret: process.env.JWT_SECRET || "SUPER_SECRET_TOKEN",
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    database: {
      url: process.env.MONGO_URI || 'mongodb://localhost:27017/userAuth',
    },
    app: {
      port: process.env.PORT || 3000,
    },
  };
});