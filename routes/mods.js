const router = require("express").Router();
const modsCtrl = require("../controllers/mods");

router.use(modsCtrl.requireAuth);

router.get("/", modsCtrl.index);
router.get("/new", modsCtrl.newForm);
router.post("/", modsCtrl.create);

router.get("/:id", modsCtrl.show);
router.get("/:id/edit", modsCtrl.editForm);
router.put("/:id", modsCtrl.update);
router.delete("/:id", modsCtrl.destroy);

module.exports = router;
