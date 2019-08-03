const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../utils/cryp");

// login
const login = (username, password) => {
  // escape转义 防止sql注入
  const escapedUsername = escape(username);
  const escapedPassword = escape(password);
  // 密码加密
  const cryptoPassword = genPassword(escapedPassword);
  const sql = `select username, realname from users where username=${escapedUsername} and password='${cryptoPassword}';`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
};

module.exports = { login };
