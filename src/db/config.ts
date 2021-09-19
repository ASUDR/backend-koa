export const config: {
  dialect: string,
  host: string,
  port: number,
  database: string,
  username: string,
  password: string
} = {
  dialect: 'postgres',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!
};

export const connectionString: string = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
