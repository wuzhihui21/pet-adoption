/**
 * 定义项目中所有的sql语句
 */
module.exports={
    users:{//操作用户表
        login:"select * from users where uaccount=? and upassword=?;",
        registSelect:"select * from users where uaccount=?",
        registInsert:"insert into users(uid,uaccount,upassword) values (null,?,?)",
        personalInfoSelect:"select * from users where uid=?",
        avatarUpdate:"update users set uimgUrl=? where uid=?",
        InfoUpdate:"update users set uname=?,ugender=?,uage=?,uphone=? where uid=?",
        passwordUpdate:"update users set upassword=? where uid=?",
        userInfoSelect:"select uid,uaccount,uimgUrl from users where uid in(?)",
        //管理员模块操作用户表
        adminLogin:"select * from users where uaccount='admin'",
        adminShowUser:"select * from users",
        deleteUser:"delete from users where uid=?"

    },
    pets:{//操作宠物表
        displayed:"select * from pets where pstate='未被领养' ",
        detial:"select * from pets where pid=?",
        adoptionHistory:"select adoptions.*,pets.pname,pets.pvariety,pets.pgender,pets.page,pets.sendaccount FROM adoptions JOIN pets on adoptions.pid=pets.pid where uid=? and astate='申请中';select * from pets where acceptaccount=? and pstate='领养中';select * from pets where acceptaccount=? and pstate='已领养'",
        petSendUser:"select sendAccount from pets where pid=?",
        givehistory:"select * from pets where sendAccount=?",
        addgiveInfo:"insert into pets(pname,pvariety,page,pgender,pfeatuer,pstate,sendaccount,pimgUrl,preason,phealthCondition) values(?,?,?,?,?,?,?,?,?,?)",
        adoptionOver:"update pets set pstate='已领养' where pid=?",
               //管理员模块操作宠物表
        adminPetShow:"select * from pets",
        deletePet:"delete from pets where pid=?"
    },
    adoptions:{ //操作领养申请表
        addApplication:"insert into adoptions values(null,?,?,?,?,?,?,?)",
        applicationSelect:"select adoptions.*,users.uname from adoptions join users on adoptions.uid=users.uid where pid=?",
        agreeAdoption:"update adoptions set astate='申请通过' where aid=?;update pets set pstate='领养中',acceptaccount=? where pid=?",
        //管理员模块操作领养申请表
        //搜索申请信息及申请的宠物详情
        applicationShow:"select adoptions.*,pets.pimgUrl,pets.pname,pets.pvariety,pets.pgender,pets.page,pets.sendaccount FROM adoptions JOIN pets on adoptions.pid=pets.pid",
        deleteApplication:"delete from adoptions where aid=?",

    },
    messages:{ //操作消息表
        addmessage:"insert into messages values(null,?,?,?,?)",
        msgUserSelect:"select * from messages where msendAcount=? OR macceptAcount2=? ORDER BY mtime DESC",
        msgSelect:"select * from messages where msendAcount=? and macceptAcount2=? or msendAcount=? and macceptAcount2=? ORDER BY mtime  "
    },
    variety:{//操作宠物种类表
        selectVariety:"select * from variety",
        //管理员模块操作宠物种类表
        adminVarietyShow:"select * from variety",
        deletevariety:"delete from variety where vid=?",
        varietyInsert:"insert into variety values(null,?,?)",
        varietySelect:"select * from variety where petbreeds=?"
    }
    
}