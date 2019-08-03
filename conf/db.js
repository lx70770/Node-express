const env = process.env.NODE_ENV;

const MYSQL_CONF = {};
const REDIS_CONF = {};

if (env === "dev") {
  // MySQL配置
  MYSQL_CONF.host = "localhost";
  MYSQL_CONF.user = "root";
  MYSQL_CONF.password = "password";
  MYSQL_CONF.port = "3306";
  MYSQL_CONF.database = "myblog";

  // Redis配置
  REDIS_CONF.port = 6379;
  REDIS_CONF.host = "127.0.0.1";
}

if (env === "production") {
  // MySQL配置
  MYSQL_CONF.host = "localhost";
  MYSQL_CONF.user = "root";
  MYSQL_CONF.password = "password";
  MYSQL_CONF.port = "3306";
  MYSQL_CONF.database = "myblog";

  // Redis配置
  REDIS_CONF.port = 6379;
  REDIS_CONF.host = "127.0.0.1";
}

module.exports = { MYSQL_CONF, REDIS_CONF };
