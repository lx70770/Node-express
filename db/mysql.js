const mysql = require("mysql");
const { MYSQL_CONF } = require("../conf/db");

// 转义函数
const { escape } = mysql;

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    // con.query(sql, (err, result) => {
    //   if (err) {
    //     reject(err);
    //     return;
    //   }
    //   resolve(result);
    // });
    resolve({ code: 0, message: "1111111" });
  });
}

module.exports = { exec, escape };
