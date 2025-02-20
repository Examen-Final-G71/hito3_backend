const dotenv = require('dotenv');
dotenv.config();

const envs = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
};

module.exports = {  PORT,  USER_DB,  HOST_DB,  DATABASE,  PASSWORD_DB } = envs;
