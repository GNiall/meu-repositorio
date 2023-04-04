const express = require("express");
const {
  createUser,
  updateUser,
  listUser,
  listUsers,
} = require("./controllers/users");
const { registerAddress, listAddressUser } = require("./controllers/address");
const { login } = require("./controllers/login");
const verifyLogin = require("./middleware/verifyLogin");

const router = express();

router.post("/sign-up", createUser);
router.post("/sign-in", login);

router.get("/listUsers", listUsers);

router.use(verifyLogin);

router.put("/edit", updateUser);
router.get("/listUser/:id", listUser);

router.post("/registerAddress", registerAddress);
router.get("/listAddress", listAddressUser);

module.exports = router;
