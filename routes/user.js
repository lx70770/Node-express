const express = require("express");
const { login } = require("../controller/user");
const { SuccessModal, ErrorModal } = require("../model/resModel");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const result = login(username, password);
  return result.then(data => {
    if (data.username) {
      // 设置session
      req.session.username = data.username;
      req.session.realname = data.realname;
      res.json(new SuccessModal());
      return;
    }
    res.json(new ErrorModal("登录失败"));
  });
});

module.exports = router;
