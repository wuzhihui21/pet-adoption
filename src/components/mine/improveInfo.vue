<template>
    <div>
        <el-form class="form" method="post" ref="form" :model="form" label-width="80px" margin-left="100px">
            <h4>完善个人信息</h4>
            <el-form-item label="头像" style="width:200px;margin-left:380px" >
                <el-upload class="upload-demo" :show-file-list="true" list-type="picture-card" :http-request="uploadFile" action :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-button style="margin-left: 10px" size="small" type="success">点击上传单个文件</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item style="width:400px;margin-left:300px"  label="姓名">
                <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item style="width:400px;margin-left:300px" label="年龄">
                <el-input type="number" min="18" max="80" v-model="form.uage"></el-input>
            </el-form-item>
            <el-form-item style="width:400px;margin-left:300px"  label="性别">
                <el-radio-group v-model="form.ugender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="width:400px;margin-left:300px"  label="联系电话">
                <el-input v-model="form.uphone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-right:250px" type="primary" @click="dataInfo">提交申请</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import Header from '../Header.vue'

export default{
  components: { Header },
    data() {
        return {
            form: {
                uname: "",
                uage: "",
                ugender: "",
                uphone: ""
            },
            imageUrl: "",
        }
    },
    methods: {
        dataInfo(){
            this.axios({
                url:"/api/users/improveInfo",
                method:"POST",
                data:this.form
            }).then((res)=>{
                if(res.data.code==200){
                    alert(res.data.msg)
                }else{
                    alert(res.data.msg)
                }
            })
        },
            handleAvatarSuccess(res, file) {
                // console.log("111111");
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            uploadFile(file) {
                // console.log("22222222");
                const formData = new FormData();
                formData.append("picurl", file.file);
                this.axios
                    .post("/api/users/improveavatar", formData)
                    .then((res) => {
                        if(res.data.code==200){
                            alert("头像插入成功")
                        }else{
                            alert(res.data.msg)
                        }
                        // console.log(res.data);
                    })
                    .catch((err) => {
                        alert(res.data.msg)
                        console.log(err);
                    });
            },
        },
       
}
</script>
<style>
h4{
    margin-right: 190px;
}
.upload-demo{
    margin-right: 80px;
}
form{
    text-align: center;
}

</style>