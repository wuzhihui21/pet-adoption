var express = require('express');
var router = express.Router();
var adminCtl=require('../controls/admin')

router.post("/login",adminCtl.login);
router.get("/userManageShow",adminCtl.showUserManage);
router.get("/deleteuser",adminCtl.deleteUser);
router.get("/petManageShow",adminCtl.showPetManage);
router.get("/deletepet",adminCtl.deletePet);
router.get("/varietyManageShow",adminCtl.showVarietyManage);
router.get("/deleteVariety",adminCtl.deleteVariety);
router.post("/addVariety",adminCtl.addVariety)
router.get("/adoptionManageShow",adminCtl.showAdoptionManage)
router.get("/deleteAdoption",adminCtl.deleteAdoption)
module.exports = router;