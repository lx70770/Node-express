const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ code: 0, message: "index页面" });
});

module.exports = router;
