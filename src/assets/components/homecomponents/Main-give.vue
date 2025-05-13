<!-- 送养 -->
<template>
    <div>
        <!-- 添加送养 -->
        <div class="giveAdd">
            <h3>添加送养</h3>
            <el-button style="margin-right:180px" class="btnAdd" type="info" icon="el-icon-circle-plus-outline" circle plain @click="add"></el-button>
        </div>
        <!-- 送养列表 -->
        <div class="giveList">
            <h3>送养列表</h3>
            <!-- 没有添加送养宠物显示为空 -->
            <div class="null" v-if="this.pets.length==0">
                <el-empty description="还没有添加过送养宠物哦!!!"></el-empty>
            </div>
            <!-- 有送养宠物显示送养列表 -->
            <div class="have" v-else>
            <el-row>
                <!-- 遍历list，显示商品的图片，名称和价格 -->
                <el-col :span="6" v-for="item in pets" :key="item.pid" :offset="1" :style="{ padding: '5px' }">
                    <!-- <router-link :to="'/detail?pid='+item.pid" style="text-decoration: none;"> -->
                        <div @click="godetail(item.pid)">
                        <el-card :body-style="{ padding: '0px' }" style="width: 250px;">
                            <el-image style="width: 280px; height: 250px;" :src="'http://localhost:3000/images/'+item.pimgUrl" fit="cover"></el-image>
                            <div style="padding: 14px;text-align:start;line-height: normal;">
                                <span>{{ item.pname }}</span> <span>{{ item.pvariety }} </span><span>{{ item.pgender }}</span><br>
                                 <span>{{ item.pstate }}</span>
                            </div>
                        </el-card>
                        </div>
                    <!-- </router-link> -->
                </el-col>
            </el-row>
            </div>
        </div>
        
    </div>
</template>
<script>
export default({
    data(){
        return{
            pets:this.petData
        }
    },
    props:{
      petData:{
        type:Array,
        default:''
     }
    },
    mounted(){
        this.fetchData();
    },
    methods:{
        add(){
            this.$router.push("/addpet")
        },
        fetchData(){
            // console.log("fffffff");
            // console.log(this.pets);
        },
        godetail(pid){
        // console.log("111111111");
        // console.log(pid);
        this.axios({
          url:`/api/details?pid=${pid}`,
          method:"GET",
        }).then((res)=>{
        //   console.log(res.data);
          if(res.data.code==200){
            localStorage.setItem('petDetail', JSON.stringify(res.data.data))
            this.$router.push(`/givedetail?pid=${pid}`)
          }
        })
      }
    }
})
</script>
<style>
h3{
    text-align:left;
    margin: 20px;
    position: relative;
    left: 45px;
}
.btnAdd{
    font-size: 75px;
    width: 100px;
    height: 100px;
}
</style>