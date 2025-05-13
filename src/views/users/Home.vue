<template>
    <div class="home">
      <el-container direction="vertical">
        <Header />
        <el-container>
          <el-aside width="200px" height="1000px">
            <el-menu class="el-menu-vertical-demo" @select="handleSelect">
              <el-menu-item index="1">
                <span slot="title">宠物展示</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">送养</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <Main class="m">
            <component :is="currentComponent" :petData="pets"></component>
          </Main>
        </el-container>
        <Footer />
      </el-container>
    </div>
  </template>
  <script>
  import Header from "../../components/Header.vue";
  import MainPetDisplay from "../../components/homecomponents/Main-petDisplay.vue";
  import MainGive from "../../components/homecomponents/Main-give.vue";
  import Footer from "../../components/Footer.vue";
  import { mapState } from "vuex";
  export default {
    data() {
      return {
        currentComponent: "MainPetDisplay",
        pets: [],
        // givePets:[]
        childPets: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    computed: {
      ...mapState("user", ["user"]),
    },
    components: {
      Header,
      MainPetDisplay,
      MainGive,
      Footer,
    },
    methods: {
      fetchData() {
        // console.log(111);
        this.axios({
          url: "/api",
          method: "GET",
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.pets = res.data.data.pets;
            //   console.log("chongwu" + this.pets);
            //   console.log(this.pets);
            } else {
            //   console.log(res.data.msg);
              alert(res.data.msg);
            }
          })
          .catch((err) => {
            // console.log("7");
            alert(err.message);
          });
      },
      handleSelect(keyPath) {
        // console.log(keyPath[0]);
        if (keyPath[0] == 1) {
          this.fetchData();
          this.currentComponent = "MainPetDisplay";
        //   console.log(this.pets);
        } else if (keyPath[0] == 2) {
        //   console.log(this.user);
          if (this.user == null) {
            alert("请先登录");
            this.$router.push("/login");
          } else {
            // console.log("rrrrrrrr");
            // console.log(this.user.uid);
            this.axios({
              url: "/api/users/give",
              method: "GET",
            }).then((res) => {
              if (res.data.code == 200) {
                this.pets = res.data.data.pets;
                // console.log(this.pets);
                this.currentComponent = "MainGive";
              } else {
                // console.log(res.data.msg);
                alert(res.data.msg);
              }
            });
          }
  
          //    this.currentComponent='MainGive'
        }
      },
      //获取宠物图片
      getPetsImages() {
        this.axios({
          url: "/api/home",
          method: "GET",
        })
          .then((res) => {
            this.childPets = res.data.data;
          })
          .catch();
      },
    },
  };
  </script>
  <style scoped>
  .el-aside {
    background-color: rgb(247, 220, 224);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .m {
    background-image: url("../../assets/images/back3.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
  }
  .el-menu-vertical-demo {
    background-color:rgb(250, 219, 224);
  }
  </style>