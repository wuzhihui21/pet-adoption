<template>
    <div>
        <h1 style="margin-left:60px">后台管理</h1>
        <el-container>
            <el-aside width="200px" style="height:600px;background-color: #f0f0f0">
                <el-menu class="" @select="handleSelect">
                    <el-menu-item-group style="background-color: #f0f0f0">
                        <el-menu-item class="bordered-title1" style="background-color: #f0f0f0;" index="1">
                            <span slot="title" class="bordered-title" style="color: black; font-size: 20px;">用户管理</span>
                        </el-menu-item>
                        <el-menu-item style="background-color: #f0f0f0;" index="2">
                            <span slot="title" style="color: black; font-size: 20px;">宠物管理</span>
                        </el-menu-item>
                        <el-menu-item style="background-color: #f0f0f0;" index="3">
                            <span slot="title" style="color: black; font-size: 20px;">宠物领养管理</span>
                        </el-menu-item>
                        <el-menu-item style="background-color: #f0f0f0;" index="4">
                            <span slot="title" style="color: black; font-size: 20px;">宠物种类管理</span>
                        </el-menu-item>
                        <!-- <el-menu-item style="background-color: #f0f0f0;" index="5">
                    <span slot="title" style="color: black; font-size: 20px;">设置</span>
                 </el-menu-item> -->
                        <el-menu-item style="background-color: #f0f0f0;">
                            <el-button style="margin-top:300px;" type="primary" @click="withdraw"
                                plain>退出管理登录</el-button>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </el-aside>
            <Main>
                <component :is="currentComponent" :Data="data"></component>
            </Main>
        </el-container>
        <el-footer style="background-color: #f0f0f0;text-align: center;
    line-height: 60px;">联系我们 123@qq.com</el-footer>
    </div>
</template>
<script>
// 导入Vue组件
// import Footer from '../../components/Footer.vue';
import userManage from '../../components/admincomponents/userManage.vue';
import petManage from '../../components/admincomponents/petManage.vue';
import petAdoptionManage from '../../components/admincomponents/petAdoptionManage.vue';
import petVarietyManage from '../../components/admincomponents/petVarietyManage.vue'
import settings from '../../components/admincomponents/settings.vue'
// 导入Vuex的状态管理和组件
import {mapState,mapMutations} from 'vuex';
export default{
     // 组件定义
    components: {
        // Footer,
        userManage,
        petManage,
        petAdoptionManage,
        petVarietyManage,
        settings
    },
    data(){
        return{
            // 定义当前显示的组件
            currentComponent:"userManage",
            // 传递给子组件的数据
            data:{}
        }
    },
    methods: {
        //映射user模块的mutations中的deleteUser方法
        ...mapMutations("user",["deleteUser"]),
        // 处理菜单选择事件，根据选择更新currentComponent
      handleSelect(key, keyPath) {
        //...根据keyPath选择不同的组件...
        if(keyPath[0]==1){
            this.currentComponent="userManage"
        }else if(keyPath[0]==2){
            this.currentComponent="petManage"
        }else if(keyPath[0]==3){
            this.currentComponent="petAdoptionManage"
        }else if(keyPath[0]==4){
            this.currentComponent="petVarietyManage"
        }else if(keyPath[0]==5){
            this.currentComponent="settings"
        }
      },
      // 退出登录方法，调用deleteUser并跳转到登录页面
        withdraw(){
            this.deleteUser();
            this.$router.push("/login")
        }
   
    }
}
</script>
<style>
.bordered-title {
  color: black;
  font-size: 20px;
}

</style>