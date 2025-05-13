<template>
    <div>
      <el-container direction="vertical">
        <Header />
        <el-container>
          <el-aside width="200px" style="background-color: rgb(255, 248, 249)">
            <el-menu class="el-menu-vertical-demo" @select="handleSelect">
              <el-menu-item-group>
                <el-menu-item index="0">
                  <span slot="title" style="color: black; font-size: 20px"
                    >个人信息</span
                  >
                </el-menu-item>
                <el-menu-item index="1">
                  <span slot="title">完善个人信息</span>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span
                  slot="title"
                  style="color: black; font-size: 20px; margin-right: 20px"
                  >设置</span
                >
  
                <el-menu-item index="2">
                  <span slot="title">修改密码</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <span slot="title">退出登录</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-aside>
          <div class="back">
            <component :is="currentComponent" :Data="data"></component>
          </div>
        </el-container>
        <Footer />
      </el-container>
    </div>
  </template>
  <script>
  import Header from "../../components/Header.vue";
  import Footer from "../../components/Footer.vue";
  import personalInfo from "../../components/mine/personalInfo.vue";
  import improveInfo from "../../components/mine/improveInfo.vue";
  import revisePass from "../../components/mine/revisePass.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      Header,
      Footer,
      personalInfo,
      improveInfo,
  
      revisePass,
    },
    data() {
      return {
        currentComponent: "personalInfo",
        data: {},
      };
    },
    mounted() {
      this.fetchData();
    },
    computed: {
      ...mapState("user", ["user"]),
    },
    methods: {
      //映射user模块的mutations中的saveUser方法
      ...mapMutations("user", ["deleteUser"]),
      handleSelect(key, keyPath) {
        if (keyPath[0] == 1) {
          this.currentComponent = "improveInfo";
        } else if (keyPath[0] == 2) {
          this.currentComponent = "revisePass";
        } else if (keyPath[0] == 3) {
          this.deleteUser();
        } else {
          this.fetchData();
          this.currentComponent = "personalInfo";
        }
      },
      fetchData() {
        // console.log("111111");
        if (this.user == null) {
          alert("请先登录");
          this.$router.push("/login");
        } else {
        //   console.log("22222222");
          this.axios({
            url: "/api/users/personal",
            method: "GET",
          }).then((res) => {
            // console.log(res.data.data);
            if (res.data.code == 200) {
              this.data = res.data.data;
            }
          });
        }
      },
    },
  };
  </script>
  <style>
  .el-menu-vertical-demo {
    height: 530px;
    background-color: rgb(250, 219, 224)
  }
  .back {
    background-image: url("../../assets/images/back3.png");
    /* background-color: aqua; */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: 530px;
    width: 100%;
  }
  </style>