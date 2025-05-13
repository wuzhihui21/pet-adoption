/**
 * 当前项目的配置文件，定义数据库的相关参数
 */
module.exports={
    db:{
       host:"localhost",
       port:3306,
       user:"root",
       password:"root",
       database:"pet-adoption",
       multipleStatements:true,
       connectionLimit: 1000
    }
}