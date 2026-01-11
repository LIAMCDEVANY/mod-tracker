const router = require("express").Router();
const authCtrl = require("../controllers/auth");

router.get("/signup", authCtrl.renderSignup);
router.post("/signup", authCtrl.signup);

router.get("/login", authCtrl.renderLogin);
router.post("/login", authCtrl.login);

router.post("/logout", authCtrl.logout);

module.exports = router;