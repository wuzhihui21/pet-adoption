<template>
    <div style="height: 470px;">
        <div v-show="isNotice" >
                <el-card  style="text-align: left; width: 500px;margin-left: 450px;">
                    <h4>领养须知</h4>
                    <span>1.领养申请人为本账户拥有者</span><br>
                    <span>2.领养申请由宠物送养方决定是否通过申请</span><br>
                    <span>3.领养申请提交请认真考虑，一旦提交领养方将无权决定撤回</span><br>
                    <el-button type="text" @click="notice" class="button">我已知晓，确认领养</el-button>
                </el-card>
            </div>
        <div v-show="isShow">
            <div>
                <el-steps style="width: 1400px;" :active="1">
                    <el-step title="领养申请" icon="el-icon-edit"></el-step>
                    <el-step title="宠物传送" icon="el-icon-truck"></el-step>
                    <el-step title="领养完成" icon="el-icon-check"></el-step>
                </el-steps>
            </div>
            <el-form style="margin-left: 400px;" :rules="rules" ref="form" :model="form" label-width="80px">
                <h4 style="margin-left: 190px">申请人信息</h4>
                <el-form-item label="联系电话" prop="uphone">
                    <el-input v-model="form.uphone"></el-input>
                </el-form-item>
                <el-form-item label="住址" prop="uaddress">
                    <el-input v-model="form.uaddress"></el-input>
                </el-form-item>
                <el-form-item label="居住环境" prop="ulivingenvironment">
                    <el-input v-model="form.ulivingenvironment"></el-input>
                </el-form-item>
                <el-form-item label="领养原因" prop="ucase">
                    <el-input type="textarea" v-model="form.ucase"></el-input>
                </el-form-item>
                <h4 style="margin-left: 190px">宠物信息</h4> <!-- 宠物信息可以由平台自动传送 -->
                <el-form-item label="宠物姓名" prop="pname">
                    <el-input v-model="form.pname" value=""></el-input>
                </el-form-item>
                <el-form-item label="宠物编号" prop="pid">
                    <el-input v-model="form.pid" value=""></el-input>
                </el-form-item>
                <el-form-item label="宠物品种" prop="pvariety">
                    <el-input v-model="form.pvariety" value=""></el-input>
                </el-form-item>
                <el-form-item label="宠物年龄" prop="page">
                    <el-input v-model="form.page" value=""></el-input>
                </el-form-item>
                <el-form-item label="宠物性别" prop="pgender">
                    <el-radio-group v-model="form.pgender" value="">
                        <el-radio label="公"></el-radio>
                        <el-radio label="母"></el-radio>
                        <el-radio label="雌雄同体"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-right: 20px;" type="primary" @click="onSubmit">提交申请</el-button>
                    <el-button @click="back">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-left: 360px;" v-show="isOk">
            <el-button type="success" icon="el-icon-check" circle class="OverAplication"></el-button>
            <h5>申请已提交，请耐心等待申请通过吧</h5>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isNotice:true,
            isShow:false,
            isOk:false,
            form: {
                uphone:"",
                uaddress:"",
                ulivingenvironment:"",
                ucase:"",
                pname:"",
                pid:"",
                pvariety:"",
                page:"",
                pgender:""
            },
            rules: {
                uphone:[
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                ],
                uaddress:[
                { required: true, message: '请输入地址', trigger: 'blur' }
                ],
                ulivingenvironment:[
                { required: true, message: '请输入居住环境', trigger: 'blur' }
                ],
                ucase:[
                { required: true, message: '请输入领养原因', trigger: 'blur' }
                ],
                pname:[
                { required: true, message: '请输入宠物名称', trigger: 'blur' }
                ],
                pid:[
                { required: true, message: '请输入宠物id', trigger: 'blur' }
                ],
                pvariety:[
                { required: true, message: '请输入宠物种类', trigger: 'blur' }
                ],
                page:[
                { required: true, message: '请输入宠物年龄', trigger: 'blur' }
                ],
                pgender:[
                { required: true, message: '请输选择宠物性别', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        notice(){
            this.isNotice=false,
            this.isShow=true
        },
        //提交表单
        onSubmit() {
            if(this.form==null){
                alert("表单信息没有输入")
            }else{
                this.axios({
                url:"/api/users/submitAdoption",
                method:"POST",
                data:this.form
            }).then((res)=>{
                if(res.data.code==200){
                    this.isShow=false
                    this.isOk=true
                }else{
                    alert(res.data.msg)
                }
            })
            }
        },
        back(){
            const obj={
                current:'PetHistory',
                pid:0
            };
            this.$emit("data-send",obj);
        }
    },
    // created(){
    //     const petData=this.$route.query.data;
    //     // console.log(petData);
    // }
}
</script>
<style>
.OverAplication{
    width: 200px;
    height: 200px;
    font-size: 150px;
}
</style>