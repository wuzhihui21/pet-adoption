<template>
  <div class="o">
    <el-row>
      <!-- 添加返回按钮 -->
      <el-button @click="goBack" class="back-button" icon="el-icon-arrow-left" plain >返回</el-button>
      <el-col class="w" style="width: 600px; height: 750px">
        <span style="font-size: 28px; position: absolute; top: 70px; left: 50px;color:navajowhite">宠物图片</span>
        <div class="grid-content bg-purple">
          <el-image style=" width: 380px; height: 420px; margin-top: 120px; margin-left: 220px; border-radius: 20px; "
            :src="'http://localhost:3000/images/' + pet.pimgUrl" fit="cover"></el-image>
        </div>
      </el-col>

      <el-col :span="12" style="width: 300px; height: 500px; text-align: left;line-height: 40px;">
        <div style=" position: relative; transform: translateY(18%); font-size: 30px;" class="background">
          <!-- <div style="position: relative; transform: translateY(18%); font-size: 30px;"> -->
            <span style="font-size: 25px;" class="list">编号：</span><span style="font-size: 25px;"> {{ this.pet.pid }} </span><br>
            <span style="font-size: 25px;" class="list">名称：</span><span style="font-size: 25px;"> {{ this.pet.pname }}</span><br>
            <span style="font-size: 25px;" class="list">年龄：</span><span style="font-size: 25px;"> {{ this.pet.page }}</span><br>
            <span style="font-size: 25px;" class="list">性别：</span><span style="font-size: 25px;"> {{ this.pet.pgender }}</span><br>
            <span style="font-size: 25px;" class="list">特点：</span><span style="font-size: 25px;"> {{ this.pet.pfeatuer }}</span><br>
            <span style="font-size: 25px;" class="list">健康状况：</span><span style="font-size: 25px;"> {{ this.pet.phealthCondition }}</span><br>
            <span style="font-size: 25px;" class="list">领养状态：</span><span style="font-size: 25px;"> {{ this.pet.pstate }}</span><br>
            <span style="font-size: 25px;" class="list">送养主人编号：</span><span style="font-size: 25px;"> {{ this.pet.sendaccount }}</span><br>
            <span style="font-size: 25px;" class="list">送养原因：</span><span style="font-size: 25px;"> {{ this.pet.preason }}</span><br>
          </div>
        <!-- </div> -->
      </el-col>
      <el-col style="width: 300px; height: 500px">
        <div style="position: relative; transform: translateY(70%); text-align: left; ">
          <el-button @click="adoptionBtn" type="success"
          style="position:absolute; width:200px; height:50px; font-size:25px; margin:20px; margin-top:620px; margin-left:-570px; " plain>领养按钮</el-button><br>
          <el-button @click="messageBtn" type="primary"
          style="position:absolute; width:200px; height:50px; font-size:25px; margin:20px;  margin-top: 600px;margin-left: -30px; " plain>联系主人</el-button>
        </div>

      </el-col>
    </el-row>

  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  components: {

  },
  computed: {
    ...mapState("user", ["user"])
  },
  data() {
    return {
      img: "hsq.jpg",
      pet: null
    }
  },
  created() {
    this.details()
  },
  methods: {
    ...mapState({
      user: 'user'
    }),
    details() {
      // console.log("22222222222");
      // console.log(localStorage.getItem('petDetail'));
      let data = JSON.parse(localStorage.getItem('petDetail'))
      // console.log(data);
      //  console.log(JSON.parse(pet));
      this.pet = data.pets[0]
      // console.log(this.pet);
    },
    adoptionBtn() {
      //携带该宠物信息跳转领养申请页面
      if (this.user == null) {
        alert("未登录，请先登录")
      } else {
        const data = JSON.stringify(this.pet)
        this.$router.push({
          path: '/adoption',

        })
      }

    },
    messageBtn() {
      // console.log(this.user);
      if (this.user == null) {
        alert("未登录，请先登录")
      } else if (this.user.uid == this.pet.sendaccount) {
        alert("这个宠物送养是您发送，没有其它联系人")
      } else {
        this.$router.push(`/message?contact=${this.pet.sendaccount}`)
      }
    },
    goBack() {
    
    this.$router.push("/home"); // 跳转到首页的路由路径
  },
  },
  

}
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 10px;
  height: 600px;
  width: 1200px;
  margin: auto;
}

body>.el-container {
  margin-bottom: 40px;
}

.o {
  background-image: url("../../assets/images/back3.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 720px;
}

.background {
  border: solid 1px #000000;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  width: 650px;
  height: 400px;
  margin-top: 100px;
  margin-left: 50px;
  background-color: rgb(251, 244, 235);
}

.b-list {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 20px;
  font-family: Arial, sans-serif;
  line-height: 40px;
}

.w {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 25px;
}

.el-row {}

.list {
  margin-right: 10px;
}

.back-button {
  position: absolute;
  left: 60px;
}
</style>