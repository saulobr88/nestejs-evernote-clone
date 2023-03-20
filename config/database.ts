import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const DB_CONNECTION = 'postgres';

export const dataSourceOptions: DataSourceOptions = {
  type: DB_CONNECTION,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  //entities: [__dirname + '/**/*.entity{.js,.ts}'],
  entities: ['dist/**/*.entity.js'],
  //migrations: [__dirname + '/database/migrations/*{.js,.ts}'],
  migrations: ['dist/database/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
