<template>
    <div>
        <el-button type="primary" @click="withdraw" plain>退出管理登录</el-button>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default{
    methods:{
         //映射user模块的mutations中的deleteUser方法
         ...mapMutations("user",["deleteUser"]),
        withdraw(){
            this.deleteUser();
            this.$router.push("/login")
        }
    }
}
</script>