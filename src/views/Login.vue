<template>
    <div class="main">
      <el-card shadow="always" class="box-card">
        <div class="tips">
            <h1>宠物领养系统</h1>
        </div>
        <div>
            <h2>登录选择</h2>
        </div>
        <div>
          <el-radio-group v-model="loginType">
            <el-radio label="user">用户</el-radio>
            <el-radio label="admin">管理员</el-radio>
          </el-radio-group>
        </div>
        <el-form  label-width="100px" :model="ruleForm" :rules="rules"
            ref="ruleForm" class="demo-ruleForm" method="POST">
            <el-form-item v-if="loginType === 'user'" label="账号" prop="uaccount" class="ua">
                <el-input class="in1" v-model="ruleForm.uaccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="loginType === 'user'" label="密码" prop="upassword" class="up">
                <el-input class="in2" type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="loginType === 'admin'" label="管理员账号" prop="adminAccount">
                <el-input class="in1" v-model="ruleForm.uaccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="loginType === 'admin'" label="管理员密码" prop="adminPassword">
                <el-input class="in2" type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
        </el-form>
        <div v-if="loginType === 'user'">
          <span>还没有账号，</span><router-link :to=" '/regist' ">注册账号</router-link>
        </div>
        
      </el-card>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data() {
      return {
        loginType: 'user',  // 初始化为用户登录
        ruleForm: {
          uaccount:'',
          upassword: '', 
        },
        rules: {
            uaccount:[
                {required:true, message:"请输入账号", trigger:'blur'}
            ],
            upassword: [
                {required:true, message:"请输入密码", trigger:'blur'},
            ],
            // adminAccount: [
            //     {required:true, message:"请输入管理员账号", trigger:'blur'}
            // ],
            // adminPassword: [
            //     {required:true, message:"请输入管理员密码", trigger:'blur'},
            // ]
        }
      };
    },
  methods: {
        //映射user模块的mutations中的saveUser方法
       ...mapMutations("user",["saveUser"]),
    submitForm(formName) {
      // console.log("信息1");
      // console.log(this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {

          // console.log(this.loginType);
          // console.log("信息2");
          // console.log(this.ruleForm);
          // 根据登录类型发送不同的请求
          let url = this.loginType === 'user'? '/api/users/login' : '/api/admin/login';
          this.axios({
            url: url,
            method: "POST",
            data: this.ruleForm
          }).then((res) => {
            // console.log("4");
            if (res.data.code == 200) {
              // console.log("5");
              if (this.loginType === 'user') {
                // console.log(res.data.data.user);
                // console.log(res.data.data.token);
                // 将登录的用户保存到vuex
                this.saveUser(res.data.data.user);
                // 将token保存到localstorage
                window.localStorage.setItem("token", res.data.data.token);
                // 跳转到用户首页
                this.$router.push("/")
              } else {
                alert(res.data.msg)
                // 将登录的用户保存到vuex
                this.saveUser(res.data.data.user);
                // 将token保存到localstorage
                window.localStorage.setItem("token", res.data.data.token);
                // 跳转到管理员首页
                this.$router.push("/adminHome")
              }
            } else {
              console.log("6");
              console.log(res.data.msg);
              alert(res.data.msg);
            }
          }).catch((err) => {
            // console.log("7");
            alert(err.message);
          })

        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  }
}

</script>
<style>
.box-card {
  width: 400px;
  margin: 0 auto;
  margin-top: 170px;
  background-color: rgba(255, 255, 255, 0.0);
}
.main {
  height: 100%;
  width: 100%;
  background-image: url(../assets/images/back.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
}
.btn{
  margin-right: 80px;
}
.ua{
   margin-left: -30px;
}
.up{
   margin-left: -30px;
}
.in1{
  width: 270px;
}
.in2{
  width: 270px;
}
.tips{
  color: rgba(255, 215, 93, 0.795);
}
</style>