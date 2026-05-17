const { Router } = require("express");
const {
  renderUserList,
  renderCreateUser,
  createUser,
  searchUsers,
} = require("../controllers/userController");
const validateUser = require("../validators/userValidator");

const userRouter = Router();

userRouter.get("/users", renderUserList);
userRouter.get("/users/new", renderCreateUser);
userRouter.post("/users", validateUser, createUser);
userRouter.get("/search", searchUsers);

module.exports = userRouter;
