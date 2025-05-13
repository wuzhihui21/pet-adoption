<template>
    <div>
      <Header/>
      <h3 style="margin-left:440px">个人信息</h3>
      <el-row class="personal">
        <el-col>
          <div class="grid-content" style="font-size: 20px;">
            <div v-if="user == null || this.Data.uimgUrl == null">
              <el-avatar
                :size="100"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              ></el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="100"
                :src="'http://localhost:3000/images/' + this.Data.uimgUrl"
              ></el-avatar>
            </div>
            <div v-if="user == null || this.Data.uname == null">
              昵称：<span>xxxx</span>
            </div>
            <div v-else class="name">
              昵称：<span>{{ this.Data.uname }}</span>
            </div><br>
            <div v-if="user == null || this.Data.ugender == null">
              性别：<span>xxx</span>
            </div>
            <div v-else class="gender">
              性别：<span>{{ this.Data.ugender }}</span>
            </div><br>
            <div v-if="user == null || this.Data.uage == null">
              年龄：<span>xxx</span>
            </div>
            <div v-else class="age">
              年龄：<span>{{ this.Data.uage }}</span>
            </div><br>
            <div v-if="user == null || this.Data.uphone == null">
              电话号码：<span>xxx</span>
            </div>
            <div v-else class="phone">
              电话号码：<span>{{ this.Data.uphone }}</span>
            </div><br>
          </div>
        </el-col>
      </el-row>
    </div>
  </template>
  <script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState("user", ["user"]),
    },
    data() {
      return {
        me: "",
        personalInfo: this.Data,
      };
    },
    props: {
      Data: {
        type: Object,
        default: "",
      },
    },
    methods: {},
    watch: {
      Data() {
        // console.log(this.Data);
      },
    },
  };
  </script>
  <style>
  .personal {
    margin-left:20px ;
  }
  .grid-content {
    margin: 20px;
    margin-right:220px ;
  }
  .name {
    border: 2px solid #fcebeb;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  .gender {
    border: 2px solid #fcebeb;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  .age {
    border: 2px solid #fcebeb;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  .phone {
    border: 2px solid #fcebeb;
    padding: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  </style>