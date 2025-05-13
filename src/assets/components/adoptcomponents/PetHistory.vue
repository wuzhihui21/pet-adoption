<template>
    <div style="height: 480px">
        <!-- 添加领养 -->
        <div>
            <el-button style="margin-left: 410px;" type="primary" icon="el-icon-circle-plus-outline" plain @click="addAdoption">领养</el-button>
        </div>
        <!-- 后端数据库搜索该用户的领养信息,有则显示宠物列表信息，没有则显示空 -->
        <!-- “空”显示 -->
        <div v-if="this.pets==null">
            <el-empty description="还未领养过"></el-empty>
        </div>
        <!-- 列表显示 -->
        <div v-else>
            <!-- 遍历petData，显示宠物信息 -->
            <el-tabs style="margin-left: 380px;width: 700px;margin-top: 30px;" type="border-card">
                <el-tab-pane label="申请中">
                    <div v-if="this.pets[0] == 0">
                       <el-empty description="没有申请信息"></el-empty>
                    </div>
                    <div v-else>
                     <el-row :span="6" v-for="item in pets[0]" :key="item.pid" :offset="1" :style="{ padding: '5px' }">
                        <div >
                            <el-card shadow="hover" class="adoptionCard">
                                <el-image style="width: 280px; height: 250px;"
                                    :src="'http://localhost:3000/images/' + item.pimgUrl" fit="cover"></el-image>
                                <div class="information">
                                    <h4>宠物信息</h4>
                                    姓名：<span>{{ item.pname }}</span><br>
                                    编号：<span>{{ item.pid }}</span><br>
                                    年龄：<span>{{ item.page }}</span><br>
                                    性别：<span>{{ item.pgender }}</span>
                                </div>
                                <div class="stateAdoption">
                                    <!--领养状态为： 领养中或领养完成 -->
                                    <el-tag>{{ item.pstate }}</el-tag>
                                </div>
                            </el-card>
                        </div>
                     </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="领养中">
                    <div v-if="this.pets[1]== 0">
                       <el-empty description="没有领养中的信息"></el-empty>
                    </div>
                    <div v-else>
                    <el-row :span="6" v-for="item in pets[1]" :key="item.pid" :offset="1" :style="{ padding: '5px' }">
                        <div @click="godetail(item.pid)">
                            <el-card shadow="hover" class="adoptionCard">
                                <el-image style="width: 280px; height: 250px;"
                                    :src="'http://localhost:3000/images/' + item.pimgUrl" fit="cover"></el-image>
                                <div class="information">
                                    <h4>宠物信息</h4>
                                    姓名：<span>{{ item.pname }}</span><br>
                                    编号：<span>{{ item.pid }}</span><br>
                                    年龄：<span>{{ item.page }}</span><br>
                                    性别：<span>{{ item.pgender }}</span>
                                </div>
                                <div class="stateAdoption">
                                    <!--领养状态为： 领养中或领养完成 -->
                                    <el-tag>{{ item.pstate }}</el-tag>
                                </div>
                            </el-card>
                        </div>
                    </el-row>
                   </div>
                </el-tab-pane>
                <el-tab-pane label="领养完成">
                    <div v-if="this.pets[2] == 0">
                       <el-empty description="没有已领养的宠物信息"></el-empty>
                    </div>
                    <div v-else>
                    <el-row :span="6" v-for="item in pets[2]" :key="item.pid" :offset="1" :style="{ padding: '5px' }">
                        <div >
                            <el-card shadow="hover" class="adoptionCard">
                                <el-image style="width: 280px; height: 250px;"
                                    :src="'http://localhost:3000/images/' + item.pimgUrl" fit="cover"></el-image>
                                <div class="information">
                                    <h4>宠物信息</h4>
                                    姓名：<span>{{ item.pname }}</span><br>
                                    编号：<span>{{ item.pid }}</span><br>
                                    年龄：<span>{{ item.page }}</span><br>
                                    性别：<span>{{ item.pgender }}</span>
                                </div>
                                <div class="stateAdoption">
                                    <!--领养状态为： 领养中或领养完成 -->
                                    <el-tag>{{ item.pstate }}</el-tag>
                                </div>
                            </el-card>
                        </div>


                    </el-row>
                    </div>
                </el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>
<script>
export default{
   
    data(){
        return{
            pets:null
        }
    },
   
  mounted(){
    this.fetchData()
  },
    methods:{
        fetchData(){
            this.axios({
                    url:"/api/users/adoption",
                    method:"GET",
                }).then((res)=>{
                    if(res.data.code==200){
                        this.pets=res.data.data.adpets  
                        // console.log(res.data.data.adpets);
                        // console.log("888888");
                        // console.log(this.pets);
                    }
                }).catch((res)=>{
                    alert(res.data.msg)
                })
        },
        addAdoption(){
            let obj={
                pid:0,
                current:'RequestAdoption'
            }
           
            this.$emit("data-send",obj)
        },
        godetail(pid){
            let obj={
                pid:pid,
                current:"PetDelivery"
            }
            // console.log(obj);
            this.$emit("data-send",obj)
        }
    },
}
</script>