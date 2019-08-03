const { ErrorModal } = require("../model/resModel");

// 登录检查
const loginCheck = (req, res, next) => {
  console.log(req.session);
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModal("未登录"));
};

module.exports = { loginCheck };
