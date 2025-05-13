const db=require("../dbutil/dbutil");
const sql=require("../dbutil/sql");

module.exports={
     // 首页渲染
     homedisplayed:(req,res)=>{
        // console.log(222);
        db.query(sql.pets.displayed,[],(err,results)=>{
         if(err){
             res.send({
                 code:500,
                 msg:"服务器内部错误"
             })
         }else{
            //  console.log(results);
                 res.send({
                     code:200,
                     msg:"查询成功",
                     data:{
                         pets:results
                     }
                 })
             
         }
        })
 
     },
    //  宠物详情页面渲染
     petdetail:(req,res)=>{
        // console.log("111111");
        // console.log(req.query);
        let {pid}=req.query;
        db.query(sql.pets.detial,[pid],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                if(results.length>0){
                    res.send({
                        code:200,
                        msg:"查询成功",
                        data:{
                            pets:results
                        }
                    })
                }else{
                    res.send({
                        code:201,
                        msg:"未查询到结果",
                    })
                }
            }
        })
     },
    //宠物送养历史
    petgivehistory:(req,res)=>{
        let {uid}=req.data
        db.query(sql.pets.givehistory,[uid],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                console.log(results);
                    res.send({
                        code:200,
                        msg:"查询成功",
                        data:{
                            pets:results
                        }
                    })
                
            }
        })
    },
    //查询宠物品种并以对象数组的形式返回
    petvariety:(req,res)=>{
        let result=[];
        let types={};
        let item={}
        db.query(sql.variety.selectVariety,[],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                // console.log(results[0].petbreeds);
                // console.log("8888888");
                for(let i=0;i<=results.length-1;i++){
                    if(!types[results[i].petcategory]){
                        types[results[i].petcategory]={label:results[i].petcategory,value:results[i].petcategory, children:[]};
                        result.push(types[results[i].petcategory]);
                    }
                    item={label: results[i].petbreeds,value: results[i].petbreeds}
                    // console.log(item);
                    types[results[i].petcategory].children.push(item)
                    // console.log("9999999");
                }
                // console.log(results);
                // console.log("77777777");
                // console.log(result);
                res.send({
                    code:200,
                    msg:"查询成功",
                    data:{
                        variety:result
                    }
                })
            }
        })
       
    },
    //存入送养数据
    addGive:(req,res)=>{
        // console.log(req.body);
        let imgurl=req.body.imgurl ;
        // console.log(imgurl);
        let pname=req.body.pet.pname;
        let pvariety=req.body.pet.variety
        let page=req.body.pet.age;
        let pgender=req.body.pet.gender;
        let pfeature=req.body.pet.feature;
        let pcase=req.body.pet.case
        let phealth=req.body.pet.health;
        let send=req.data.uid;
        let pstate="未被领养"
        db.query(sql.pets.addgiveInfo,[pname,pvariety,page,pgender,pfeature,pstate,send,imgurl,pcase,phealth],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误",
                })
            }else{
                res.send({
                    code:200,
                    msg:"送养宠物添加完成"
                })
            }
        })
    },
    //领养完成
    adoptionOver:(req,res)=>{
        let {pid}=req.query;
        // console.log(pid);
        db.query(sql.pets.adoptionOver,[pid],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                if(results.affectedRows>0){
                    res.send({
                        code:200,
                        msg:"领养完成"
                    })
                }
            }
        })
    }
    
}