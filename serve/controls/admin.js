const db=require("../dbutil/dbutil");
const sql=require("../dbutil/sql");
const token=require("../util/token");

module.exports={
    //管理员登录
    login:(req,res)=>{
        // console.log("11111111");
        // console.log(req.body);
        // let {uaccount,upassword}=req.body;
        let account=req.body.uaccount
        let pass=req.body.upassword
        // console.log("22222222");
        // console.log(account);
        // console.log(pass);
        // console.log(uaccount);
        // console.log(upassword);
        db.query(sql.users.adminLogin,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                // console.log("555555");
                // console.log(results[0]);
                // console.log("66666");
                // console.log(results[0].uaccount);
                // console.log(results[0].upassword);
                if(results[0].uaccount==account && results[0].upassword==pass){
                  
                    // 3.登录成功表示认证通过，则签发token，并将token返回给客户端
                    token.setToken(results[0].uaccount,results[0].uid).then(
                        (t)=>{
                            // console.log("555555");
                            return res.send({
                                code:200,
                                msg:"登录成功",
                                data:{
                                    token:t,
                                    user:results[0]
                                }
                            })
                        }
                    )
                }else{
                    res.send({
                        code:201,
                        msg:"非管理员，登录失败"
                    })
                }
            }
        })
    },
    //渲染首页用户管理列表
    showUserManage:(req,res)=>{
        //1.读取用户列表
        db.query(sql.users.adminShowUser,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器操作失败"
                })
            }else{
                res.send({
                    code:200,
                    msg:"用户表查询成功",
                    data:results
                })
            }
        })
    },
    //用户管理列表删除用户操作
    deleteUser:(req,res)=>{
       let {uid}=req.query;
    //    console.log(uid);
       try{
       db.query(sql.users.deleteUser,[uid],(err,results)=>{
        if(err){
            res.send({
                code:500,
                msg:"删除失败"
            })
        }else{
            res.send({
                code:200,
                msg:"删除成功"
            })
        }
       })
      }catch{
        res.send({
            code:500,
            msg:"删除失败"
        })
      }
    },
    //渲染首页宠物管理列表
    showPetManage:(req,res)=>{
        db.query(sql.pets.adminPetShow,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器操作失败"
                })
            }else{
                res.send({
                    code:200,
                    msg:"宠物查询成功",
                    data:results
                })
            }
        })
    },
    //宠物管理列表删除用户操作
    deletePet:(req,res)=>{
        let {pid}=req.query;
        // console.log(pid);
        try{
        db.query(sql.pets.deletePet,[pid],(err,results)=>{
         if(err){
             res.send({
                 code:500,
                 msg:"删除失败"
             })
         }else{
             res.send({
                 code:200,
                 msg:"删除成功"
             })
         }
        })
       }catch{
         res.send({
             code:500,
             msg:"删除失败"
         })
       }
     },
     //渲染首页宠物种类管理列表
     showVarietyManage:(req,res)=>{
        db.query(sql.variety.adminVarietyShow,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器操作失败"
                })
            }else{
                res.send({
                    code:200,
                    msg:"宠物种类查询成功",
                    data:results
                })
            }
        })
    },
    //宠物种类管理列表删除用户操作
    deleteVariety:(req,res)=>{
        let {vid}=req.query;
        // console.log(vid);
        try{
        db.query(sql.variety.deletevariety,[vid],(err,results)=>{
         if(err){
             res.send({
                 code:500,
                 msg:"删除失败"
             })
         }else{
             res.send({
                 code:200,
                 msg:"删除成功"
             })
         }
        })
       }catch{
         res.send({
             code:500,
             msg:"删除失败"
         })
       }
     },
     //宠物种类管理的添加宠物种类
     addVariety:(req,res)=>{
        // console.log(req.body);
        let {petbreeds,petcategory}=req.body
        //检查输入的宠物品种是否已存在
        db.query(sql.variety.varietySelect,[petbreeds],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                if(results.length>0){
                    res.send({
                        code:201,
                        msg:"该品种已存在"
                    })
                }else{
                    db.query(sql.variety.varietyInsert,[petbreeds,petcategory],(err,results)=>{
                        if(err){
                            res.send({
                                code:500,
                                msg:"宠物种类插入失败"
                            })
                        }else{
                            res.send({
                                code:200,
                                msg:"宠物种类插入成功"
                            })
                        }
                    })
                }
            }
        })
        
     },
     //宠物领养管理列表渲染
     showAdoptionManage:(req,res)=>{
        db.query(sql.adoptions.applicationShow,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器操作失败"
                })
            }else{
                res.send({
                    code:200,
                    msg:"宠物领养信息查询成功",
                    data:results
                })
            }
        })
     },
     deleteAdoption:(req,res)=>{
        let {aid}=req.query;
        // console.log("111111111");
        // console.log(req.query);
        // console.log(aid);
        try{
        db.query(sql.adoptions.deleteApplication,[aid],(err,results)=>{
         if(err){
             res.send({
                 code:500,
                 msg:"删除失败"
             })
         }else{
             res.send({
                 code:200,
                 msg:"删除成功"
             })
         }
        })
       }catch{
         res.send({
             code:500,
             msg:"删除失败"
         })
       }
     },
}