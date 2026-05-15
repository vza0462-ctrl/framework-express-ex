const { Router } = require("express");

const indexRouter = Router();
indexRouter.get("/", (req, res) => {
  console.log("ae" + req.customProperty);
  res.send("index all");
});

module.exports = indexRouter;
