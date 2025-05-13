<template>
  <div class="regist">
    <el-card shadow="always" class="box-card">
      <div class="tip">
        <h1>宠物领养系统</h1>
      </div>
      <div>
        <h2>注册</h2>
      </div>
      <div class="form">
        <el-form label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="手机号码:" prop="account">
            <el-input v-model="ruleForm.uaccount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="upassword">
            <el-input type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <span>已注册账号，选择</span><router-link :to="'/login'">登录</router-link>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.upassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uaccount: '',
        upassword: '',
        checkPass: ''
      },
      rules: {
        uaccount: [
          { required: true, message: "请输入手机号码", trigger: 'blur' },
          { min: 11, max: 11, message: "手机号码格式不正确", trigger: "blur" }
        ],
        upassword: [
          { required: true, message: "请输入密码", trigger: 'blur' },
          { min: 6, max: 12, message: "长度在6-12个字符", trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios({
            url: "/api/users/regist",
            method: "POST",
            data: this.ruleForm
          }).then((res) => {
            if (res.data.code == 200) {
              alert(res.data.msg);
              //跳转到登录页面
              this.$router.push("/login")
            } else {
              alert(res.data.msg);
            }
          }).catch((err) => {
            alert(err.message);
          })

        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>
.box-card {
  width: 400px;
  margin: 0 auto;
  margin-top: 160px;
  background-color: rgba(255, 255, 255, 0);
}

.regist {
  height: 100%;
  width: 100%;
  background-image: url(../assets/images/back.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
}

.tip {
  color: rgba(255, 215, 93, 0.795);
}
</style>