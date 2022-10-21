export const config = () => ({
  APP_NAME: process.env.APP_NAME || 'NestJS App',
  HOST: process.env.HOST || 'localhost',
  PORT: parseInt(process.env.PORT) || 3000,
  DB_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT) || 27017,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'test',
  DB_AUTH_SOURCE: process.env.DB_AUTH_SOURCE || 'admin',
});

// export const env = config();

// export const mongoURI = `mongodb://${env.database.user}:${encodeURIComponent(
//   env.database.password,
// )}@${env.database.host}:${env.database.port}/${
//   env.database.dbname
// }?authSource=admin&directConnection=true`;
