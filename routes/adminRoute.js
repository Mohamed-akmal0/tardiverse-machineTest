const router = require("express").Router();
const {
  Login,
  signup,
  editUser,
  deleteUser,
  getUsers,
} = require("../controller/adminController");

router.post("/register", signup);
router.post("/login", Login);
router.get("/getUser", getUsers);
router.patch("/deleteUser/:id", deleteUser);
router.patch("/editUser/:id", editUser);
module.exports = router;
