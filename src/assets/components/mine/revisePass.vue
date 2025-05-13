<template>
  <div>
    <Header/>
    <h3 style="margin-left:440px">修改密码</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item style="width:400px;margin-left:300px" label="原密码" prop="upassword">
              <el-input type="password" v-model="ruleForm.upassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:400px;margin-left:300px" label="新密码" prop="newpass">
              <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="width:400px;margin-left:300px" label="确认新密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="margin-right:270px">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
        ruleForm: {
            upassword: "",
            newpass: '',
            checkPass: '',
        },
      rules: {
        upassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请输入确认新密码', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  console.log(1111111);
          this.axios({
            url:"/api/users/recisepass",
            method:"POST",
            data:{
              oldpass:this.ruleForm.oldpass,
              newpass:this.ruleForm.newpass}
          }).then((res)=>{
            if(res.data.code==200){
              alert(res.data.msg+"请重新登录");
              this.$router.push("/login")
            }else{
              alert(res.data.msg)
            }
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