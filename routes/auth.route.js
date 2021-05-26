const express = require('express');
const router = express.Router();

const controller = require("../controllers/auth.controller")

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/login", controller.loginPage);
router.get("/signup", controller.signupPage);
router.get("/logout", controller.logout);
module.exports = router;