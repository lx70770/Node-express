const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const connectRedis = require("connect-redis");
const favicon = require("serve-favicon");
const { redisClient } = require("./db/redis");

// 注册Routers
const indexRouter = require("./routes/index");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

const app = express();
const RedisStore = connectRedis(session);

// 处理icon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// 处理日志
const ENV = process.env.NODE_ENV;
if (ENV === "production") {
  // 开发环境
  app.use(logger("dev"));
} else {
  // 线上环境
  const logFileName = path.resolve(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a"
  });
  app.use(
    logger("combined", {
      stream: writeStream
    })
  );
}

// 解析post数据
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// 解析cookie
app.use(cookieParser());

// session存储到redis配置
const sessionStore = new RedisStore({
  client: redisClient
});
app.use(
  session({
    secret: "WJkksjd_154sd5a#",
    cookie: {
      // path: '/', // 默认配置
      // httpOnly: true, // 默认配置
      maxAge: 10000
    },
    store: sessionStore
  })
);

// 静态文件
// app.use(express.static(path.join(__dirname, 'public')))

app.use("/", indexRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "您访问的路由不存在"));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  // res.status(200)
  res.json({
    message: err.message,
    code: 0
  });
});

module.exports = app;
