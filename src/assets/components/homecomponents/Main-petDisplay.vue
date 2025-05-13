<!-- 宠物展示 -->
<template>
  <div class="demo1">
    <div class="demo2">
      <!-- 轮播图 -->
      <el-carousel trigger="click" height="450px" style="left:10px;margin-top:50px;">
        <el-carousel-item v-for="item in lunbo" :key="item">
          <el-image  :src="item"  object-fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="demo3">
      <!-- 宠物列表 -->
      <h3>宠物展示</h3>
      <el-row style="margin-left:30px">
        <!-- 遍历petData，显示宠物信息 -->
        <el-col :span="6" v-for="item in petData" :key="item.pid" :offset="1" :style="{ padding: '5px' }">
          <!-- <router-link :to="'/details?pid='+item.pid" style="text-decoration: none;"> -->
            <!-- <router-link :to="'/details?pid='+item.pid" style="text-decoration: none;"> -->
              <div @click="godetail(item.pid)">
              <el-card :body-style="{ padding: '0px' }" >
              <!-- <el-image :src="require('@/assets/images/'+item.pimgUrl)" object-fit="fill" class="image"></el-image> -->
              <el-image style="width: 280px; height: 250px;" :src="'http://localhost:3000/images/'+item.pimgUrl" fit="cover"></el-image>
              <div style="padding: 14px;text-align:start;line-height: normal;">
                <span style="font-size: 20px;">{{ item.pname }}</span> <span>{{ item.pvariety }} </span><span>{{item.pgender  }}</span><br>
                <span>{{ item.pfeatuer }} </span> <br><span>{{item.page}}</span>
                <div class="bottom clearfix">
                </div>
              </div>
            </el-card>
          </div>
          <!-- </router-link> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

export default({
  props:{
    petData:{
      type:Array,
      default:''
    }
  },
  data(){
    return{
     pets:this.petData,
     lunbo:[
        require("@/assets/images/Banner1.jpg"),
        require("@/assets/images/Banner3.jpg"),
        require("@/assets/images/Banner4.jpg"),
        require("@/assets/images/Banner5.jpg"),
     ]
    }
  },
    components:{
    },
    methods:{
      godetail(index){
        // console.log("111111111");
      
        this.axios({
          url:`/api/details?pid=${index}`,
          method:"GET"
        }).then((res)=>{
          // console.log(res.data);
          if(res.data.code==200){
            localStorage.setItem('petDetail', JSON.stringify(res.data.data))
            this.$router.push("/details")
          }
        })
      }
    },
    watch:{
      petData(){
        // console.log(this.petData);
        // console.log(this.pets);
      }
    },
    // created(){
    //   console.log(this.petData);
    // }
})
</script>
<style>
.el-carousel__item {
    color:aliceblue;
    background-color: #475669;
    font-size: 14px;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .demo2{
    width: 800px;
    position: relative;
    left: 150px;
    margin: 5px;
  }
  .demo3{
    margin:0 auto;
    text-align: center;
  }
  .image{
    width: 250px;
    height: 300px;
  }
</style>