const dotenv = require('dotenv');
dotenv.config();

const envs = {
  PORT: process.env.PORT || 3000,
  DB_PORT: process.env.PORT || 5432,
  DB_USER: process.env.USER_DB,
  DB_HOST: process.env.HOST_DB,
  DB_NAME: process.env.DATABASE,
  DB_PASSWORD: process.env.PASSWORD_DB,
};

module.exports = {  PORT,  USER_DB,  HOST_DB,  DATABASE,  PASSWORD_DB } = envs;
