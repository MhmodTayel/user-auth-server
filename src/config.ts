export interface AppConfig {
  MONGO_URI: string;
  NODE_ENV: NODE_ENV;
  JWT_SECRET: String;
  TOKEN_SALT: number;
}

export default (): AppConfig => ({
  MONGO_URI: process.env.DATABASE_URL ?? 'mongodb://localhost:27017',
  NODE_ENV: (process.env.NODE_ENV as NODE_ENV) ?? 'development',
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_SALT: +process.env.TOKEN_SALT ?? 3,
});

export type NODE_ENV = 'development' | 'production';
