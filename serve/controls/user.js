/**
 * 用户控制层：封装用户的一些功能
 * 实现用户登录\
 * 1.获取登录表单上的用户数据
 * 2.执行数据库操作
 * 3.登录成功表示认证通过，则签发token，并将token返回给客户端
 * 4.登录失败表示认证失败，则给客户端返回错误信息
 */
/**
 * 实现用户注册
 * 1.获取注册表单上的数据信息
 * 2.执行数据库查询操作
 * 3.用户已存在，则返回错误信息
 * 4.用不存在，执行数据库插入信息
 * 5.数据插入成功，则返回注册成功信息
 */
const db = require("../dbutil/dbutil");
const sql = require("../dbutil/sql");
const token = require("../util/token");
const Time=require("./time")

module.exports = {
    // 登录
    login: (req, res) => {
        console.log(req.body);
        //1.获取登录表单上的用户数据
        let { uaccount, upassword } = req.body;
        console.log("55");
        //2.执行数据库操作
        db.query(sql.users.login, [uaccount, upassword], (err, results) => {
            console.log("555");
            if (err) {
                res.send({
                    code: 500,
                    msg: "服务器内部错误"
                })
            } else {
                console.log("5555");
                console.log(results);
                //判断登录是否成功
                if (results.length > 0) {
                    console.log("55555");
                    // 3.登录成功表示认证通过，则签发token，并将token返回给客户端
                    token.setToken(results[0].uaccount, results[0].uid).then(
                        (t) => {
                            console.log("555555");
                            return res.send({
                                code: 200,
                                msg: "登录成功",
                                data: {
                                    token: t,
                                    user: results[0]
                                }
                            })
                        }
                    )
                } else {
                    //4.登录失败表示认证失败，则给客户端返回错误信息
                    res.send({
                        code: 201,
                        msg: "登录失败",
                        data: {}
                    })
                }
            }
        })
    },
    // 注册
    regist: (req, res) => {
        //1.获取注册表单上的信息
        let { uaccount, upassword } = req.body;
        db.query(sql.users.registSelect, [uaccount], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "服务器内部错误"
                })
            } else {
                if (results.length > 0) {
                    res.send({
                        code: 201,
                        msg: "用户已存在,请重新注册"
                    })
                } else {
                    console.log(uaccount + "-" + upassword);
                    db.query(sql.users.registInsert, [uaccount, upassword], (err, results) => {
                        if (err) {
                            res.send({
                                code: 500,
                                msg: "服务器内部错误"
                            })
                        } else {
                            res.send({
                                code: 200,
                                msg: "注册成功"
                            })
                        }
                    })
                }
            }
        })

    },
    //查询个人信息
    personal: (req, res) => {
        console.log("11111111");
        console.log(req.data);
        let { uid } = req.data
        db.query(sql.users.personalInfoSelect, [uid], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "服务器内部错误"
                })
            } else {
                res.send({
                    code: 200,
                    msg: "信息查询成功",
                    data: results[0]
                })
            }
        })
    },
    //更新用户头像
    userAvatar: (req, res) => {
        let { filename } = req.file;
        let { uid } = req.data
        console.log(filename);
        db.query(sql.users.avatarUpdate, [filename, uid], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "头像更新错误"
                })
            } else {
                res.send({
                    code: 200,
                    msg: "头像更新成功"
                })
            }
        })
    },
    //更新用户信息
    userInfo: (req, res) => {
        let { uid } = req.data;
        console.log(req.body);
        let { uname, ugender, uage, uphone } = req.body;
        db.query(sql.users.InfoUpdate, [uname, ugender, uage, uphone, uid], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "用户信息更新失败"
                })
            } else {
                res.send({
                    code: 200,
                    msg: "用户信息更新成功"
                })
            }
        })
    },
    //修改用户密码
    revisePass: (req, res) => {
        console.log("2222222");
        let { uid, upassword } = req.data;
        let { oldpass, newpass } = req.body;
        if (oldpass == upassword) {
            db.query(sql.users.passwordUpdate, [newpass, uid], (err, results) => {
                if (err) {
                    res.send({
                        code: 500,
                        msg: "服务器错误",
                    })
                } else {
                    console.log("333333");
                    res.send({
                        code: 200,
                        msg: "修改密码成功"
                    })
                }
            })
        }
    },
    //渲染消息的用户联系列表页面
    showMsgUser: (req, res) => {
        //1.获取用户头像昵称
        //2.获取用户的联系人
        //1.查询有几个与用户有交流信息的其它用户
        let { uid } = req.data;
        db.query(sql.messages.msgUserSelect, [uid,uid], (err, results) => {
            if (err) {
                res.send({
                    code: 500,
                    msg: "服务器内部错误"
                })
            } else {
                // console.log(results);
                let usersInfo=[]
                if(results.length>0){
                    results.forEach(item => {
                        if(item.msendAcount!=uid && !usersInfo.includes(item.msendAcount)){
                            usersInfo.push(item.msendAcount);
                           
                        }else if(item.macceptAcount2!=uid && !usersInfo.includes(item.macceptAcount2)){
                            usersInfo.push(item.macceptAcount2)
                        }
                        // console.log(usersInfo);
                    });
                    //查找userInfo用户的信息
                res.send({
                    code: 200,
                    msg: "消息数据查找成功",
                    data:usersInfo
                })
                }else{
                    res.send({
                        code: 201,
                        msg: "没有消息联系用户",
                    })
                }
            }
        })
    },
    //聊天信息渲染
    showMsg:(req,res)=>{
        let {user}=req.query;
        let {uid}=req.data;
        console.log(user,uid);
        db.query(sql.messages.msgSelect,[user,uid,uid,user],(err,results)=>{
            if(err){
                res.send({
                    code:500,
                    msg:"服务器内部错误"
                })
            }else{
                // console.log(results);
                if(results.length>0){
                    res.send({
                        code:200,
                        msg:"用户消息记录查询成功",
                        data:{
                            messages:results,
                            user1:uid,
                            user2:user
                        }
                    })
                }else{
                    res.send({
                        code:201,
                        msg:"用户没有消息记录"
                    })
                }
            }
        })

    },
    //添加消息
    addMsg:(req,res)=>{
        let {mcontant,msendAcount,macceptAcount2}=req.body;
        let time=Time.alltime()
        db.query(sql.messages.addmessage,[mcontant,msendAcount,macceptAcount2,time],(err,results)=>{
            if (err) {
                res.send({
                    code: 500,
                    msg: "消息未发送成功"
                })
            } else {
                res.send({
                    code: 200,
                    msg: "消息发送成功",
                })
            }
        })
    }
}
