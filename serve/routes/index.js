var express = require('express');
var router = express.Router();
var petCtl=require("../controls/pet");

/* GET home page. */
router.get('/',petCtl.homedisplayed);
router.get("/home",petCtl.homedisplayed)
router.get("/variety",petCtl.petvariety)
router.get("/details",petCtl.petdetail)
router.get("/search",)
module.exports = router;
