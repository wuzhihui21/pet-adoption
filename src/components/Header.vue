<template>
  <el-header height="150px">
    <div class="avatarAndLogin">
      <div style="margin-left: 60px;margin-top: -10px;" v-if="user == null ">
        <el-avatar
          class="pic"
          :src="'http://localhost:3000/images/' + avatarUrl"
        ></el-avatar>
        <router-link :to="'/login'">请先登录</router-link>
      </div>
      <div style="margin-left: 60px;margin-top: -10px;" v-else-if=" user.uimgUrl == null">
        <el-avatar
          class="pic"
          :src="'http://localhost:3000/images/' + avatarUrl"
        ></el-avatar>
        欢迎你，{{ user.uaccount }}
      </div>
      <div style="margin-left: 60px;margin-top: -10px;" v-else>
        <el-avatar
          class="pic1"
          :src="'http://localhost:3000/images/' + user.uimgUrl"
        ></el-avatar>
        欢迎你，{{ user.uaccount }}
      </div>
    </div>
    <div class="daohang">
      <el-row>
        <el-col :span="5">
          <div class="one">
            <router-link :to="'/home'">首页</router-link>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="one">
            <router-link :to="'/adoption'">领养</router-link>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <img class="pic3" src="../assets/images/LOGO.png" alt="logo" />
          </div>
        </el-col>
        <el-col :span="5">
          <div class="one">
            <router-link :to="'/message'">消息</router-link>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="one">
            <router-link :to="'/mine'">我的</router-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 搜索功能 -->
    <!-- <div class="search-bar" style="position: absolute; right: 10px; top: 10px;">
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchQuery"
        clearable
        class="input-with-select"
        @keyup.enter="handleSearch"
      >
        <el-button style="background-color:rgb(173, 216, 230)"
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
    </div> -->

  </el-header>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      avatarUrl: "defaultAvatar.png",
      searchQuery: "",
    };
  },
  computed: {
    //映射user模块的state中的user对象
    ...mapState("user", ["user"]),
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}
.avatarAndLogin {
  position: relative;
  top: 5px;
  right: 600px;
  margin: 0 auto;
  width: 300px;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
}
.daohang {
  position: relative;
  top: 20px;
}
a {
  /*所有route-link样式 */
  text-decoration: none;
}
.pic {
  position: relative;
  top: 20px;
  left: -10px;
  width: 50px;
  height: 50px;
}
.pic1 {
  position: relative;
  top: 20px;
  left: -10px;
  width: 50px;
  height: 50px;
}
.el-header {
  background-image: url("../assets/images/back1.jpg");
}
.pic3 {
  position: relative;
  width: 185px;
  height: 185px;
  margin-top: -90px;
  margin-left: 10px;
  /* position:absolute; 
  top:-85px; 
  left:50%; 
  transform:translateX(-50%);
  width: 185px;
  height: 185px; */
}
.one {
  font-size: 20px;
}
</style>