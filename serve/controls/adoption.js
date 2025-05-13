
const db=require("../dbutil/dbutil");
const sql=require("../dbutil/sql");
const Time=require("./time");

module.exports={
    //获取用户领养历史
    getAdoptionHistory:(req,res)=>{
        let {uid}=req.data;
        db.query(sql.pets.adoptionHistory,[uid,uid,uid],(err,results)=>{
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
                            adpets:results
                        }
                    })
                }
                console.log(results);    
            }
        })
    },
    //提交申请表,并向宠物送养主人发送送养信息
    submitAdoption: (req, res) => {
        let {uid}=req.data
        let {uaddress, ulivingenvironment, ucase, pid } = req.body;
        // console.log(req.body.uid);
        const time = Time.alltime();
        //提交申请申请
        db.query(sql.adoptions.addApplication, [uid, uaddress, ulivingenvironment, ucase, pid, '申请中',time], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "服务器内部错误"
                })
            } else {
                // console.log("申请表提交成功");
                // console.log(results);
               
                // 获取宠物送养主人id
                let accept = "";
                db.query(sql.pets.petSendUser, [pid], (err, results) => {
                    if (err) {
                        res.send({
                            code: 500,
                            msg: "宠物送养主人未获取到"
                        })
                    } else {
                        // console.log("送养主人查询成功");
                        // console.log(results);
                        this.accept = results[0].sendAccount;
                        // console.log(this.accept);
                        //向宠物送养主人发送送养信息
                        const time = Time.alltime();
                        // console.log("time", time);
                        // 消息内容 
                        const mcontant = `有意领养您发布的编号为${pid}送养宠物，期望申请能够通过`;
                        // console.log(mcontant);
                        // console.log(uid);
                        db.query(sql.messages.addmessage, [mcontant, uid, this.accept, time], (err, results) => {
                            if (err) {
                                res.send({
                                    code: 500,
                                    msg: "申请消息未发送成功"
                                })
                            } else {
                                // console.log(results);
                                // console.log("申请消息发送成功");
                                res.send({
                                    code: 200,
                                    msg: "申请提交成功",
                                })
                            }
                        })
                    }
                })
                
                
            }
        });

    },
    //送养详情渲染领养申请信息
    giveAdoptionMessage:(req,res)=>{
        //获取宠物id
        let {pid}=req.query
        console.log(pid);
        //读取该宠物的领养申请信息和申请人姓名
        db.query(sql.adoptions.applicationSelect,[pid],(err,results)=>{
            if(err){
                res.send({
                    code:200,
                    msg:"服务器内部错误"
                })
            }else{
                // console.log(results);
                if(results==null){
                    res.send({
                        code:201,
                        msg:"查询结果为0"
                    })
                }else{
                    res.send({
                        code:200,
                        msg:"查询成功",
                        data:results
                    })
                }
               
            }
        })
    },
    //领养申请同意
    agreeAdoption:(req,res)=>{
        let {pid,aid,uid}=req.query;
        let currentUid=req.data.uid
        console.log(currentUid);
        console.log(pid,aid,uid);
        db.query(sql.adoptions.agreeAdoption,[aid,uid,pid],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                console.log(results);
                if(results[0].affectedRows>0){
                    // console.log("通过申请");
                    const time = Time.alltime();
                    const mcontant = `你申请的编号为${pid}的宠物已通过申请`;
                    // console.log(time,mcontant);
                    // console.log(currentUid,uid);
                    db.query(sql.messages.addmessage, [mcontant, currentUid, uid, time], (err, results) => {
                        if (err) {
                            res.send({
                                code: 500,
                                msg: "申请消息未发送成功"
                            })
                        } else {
                            // console.log(results);
                            if(results.affectedRows>0){
                                // console.log("发送信息");
                            res.send({
                                code:200,
                                msg:"申请已通过"
                            })
                        }
                        }
                    })
                    

                }
                
            }
        })
    },
    
}