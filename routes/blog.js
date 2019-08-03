const express = require("express");
const { SuccessModal, ErrorModal } = require("../model/resModel");
const { loginCheck } = require("../middleware/loginCheck");

const router = express.Router();
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require("../controller/blog");

router.get("/list", (req, res) => {
  const author = req.query.author || "";
  const keyword = req.query.keyword || "";
  getList(author, keyword).then(listData => {
    res.json(new SuccessModal(listData));
  });
});

router.get("/detail", (req, res) => {
  return getDetail(req.query.id).then(data => {
    res.json(new SuccessModal(data));
  });
});

router.post("/new", loginCheck, (req, res) => {
  req.body.author = req.session.username;
  return newBlog(req.body).then(data => {
    res.json(new SuccessModal(data));
  });
});

router.post("/update", loginCheck, (req, res) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then(value => {
    if (value) {
      res.json(new SuccessModal());
    } else {
      res.json(new ErrorModal("更新blog失败"));
    }
  });
});

router.post("/del", loginCheck, (req, res) => {
  return deleteBlog(req.query.id, req.session.username).then(value => {
    if (value) {
      res.json(new SuccessModal());
    } else {
      res.json(new ErrorModal("删除blog失败"));
    }
  });
});

module.exports = router;
