export interface AppConfig {
  MONGO_URI: string;
  NODE_ENV: NODE_ENV;
  JWT_SECRET: String;
}

export default (): AppConfig => ({
  MONGO_URI: process.env.DATABASE_URL ?? 'mongodb://localhost:27017',
  NODE_ENV: (process.env.NODE_ENV as NODE_ENV) ?? 'development',
  JWT_SECRET: process.env.JWT_SECRET,
});

export type NODE_ENV = 'development' | 'production';
