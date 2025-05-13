var express = require('express');
var router = express.Router();
const multer=require("multer");
var userCtl=require("../controls/user");
var petCtl=require("../controls/pet");
var adoptionCtl=require("../controls/adoption")

//配置multer的存储选项
let storage=multer.diskStorage({
  destination:(req,file,callback)=>{
      callback(null,"public/images");
  },
  filename:(req,file,callback)=>{
      callback(null,Date.now()+file.originalname);
  }
});

let upload=multer({
  storage:storage
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', userCtl.login);
router.post("/regist",userCtl.regist);

router.get("/give",petCtl.petgivehistory)
router.get("/adoption",adoptionCtl.getAdoptionHistory)
router.post("/addimags",upload.array("file"),(req,res)=>{
  console.log(req.files);
  console.log(req.body);
  res.send({code:200,msg:"上传成功",data:req.files});
});
router.post("/addgive",petCtl.addGive);
router.get("/personal",userCtl.personal)
router.post("/improveavatar",upload.single("picurl"),userCtl.userAvatar
);
router.post("/improveInfo",userCtl.userInfo);
router.post("/recisepass",userCtl.revisePass);
router.post("/submitAdoption",adoptionCtl.submitAdoption);
router.get("/msg",userCtl.showMsgUser);
router.get("/getadoptionMessage",adoptionCtl.giveAdoptionMessage);
router.get("/agreeApplication",adoptionCtl.agreeAdoption);
router.get("/displayedpet",petCtl.petdetail);
router.get("/overadoption",petCtl.adoptionOver);
router.get("/messageDetail",userCtl.showMsg);
router.post("/addmessage",userCtl.addMsg)
module.exports = router;
