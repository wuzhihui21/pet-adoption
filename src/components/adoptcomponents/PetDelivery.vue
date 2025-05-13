<template>
    <div>
    <div v-show="isDelivery">
        <div>
            <el-steps style="width: 1435px;" :active="2">
                <el-step title="领养申请" icon="el-icon-edit"></el-step>
                <el-step title="宠物传送" icon="el-icon-truck"></el-step>
                <el-step title="领养完成" icon="el-icon-check"></el-step>
            </el-steps>
        </div>
        <div>
            <h2 style="margin-left: 440px;">宠物信息</h2>
            <el-card style="margin-left: 300px;"  class="adoptionCard">
                <el-image style="width: 280px; height: 250px;" :src="'http://localhost:3000/images/' + this.pet.pimgUrl"
                    fit="cover"></el-image>
                <div class="information">
                    <h4>宠物信息</h4>
                    姓名：<span>{{ this.pet.pname }}</span><br>
                    编号：<span>{{ this.pet.pid }}</span><br>
                    年龄：<span>{{ this.pet.page }}</span><br>
                    性别：<span>{{ this.pet.pgender }}</span>
                </div>
            </el-card>
        </div>
        <div>
            <h2 style="margin-left: 450px;">选择传送方式</h2>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item style="margin-left: 500px;" label="传送方式">
                    <el-radio-group v-model="form.delivery">
                        <el-radio label="平台传送"></el-radio>
                        <el-radio label="双方线下传送"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left: 380px;" type="primary" @click="onSubmit">提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="isShow">
            <div>
                <el-empty description="还没有收揽宠物"></el-empty>
            </div>
        </div>
    </div>
    <div v-show="isOver">
        <div>
            <el-steps :active="3">
                <el-step title="领养申请" icon="el-icon-edit"></el-step>
                <el-step title="宠物传送" icon="el-icon-truck"></el-step>
                <el-step title="领养完成" icon="el-icon-check"></el-step>
            </el-steps>
            <el-button type="success" icon="el-icon-check" circle class="OverAdoption"></el-button>
            <h5>领养完成！！！</h5>
        </div>
    </div>
</div>
</template>
<script>


export default{
    data(){
        return{
            form:{
                delivery:"",
            },
            isShow:false,
            pet:null,
            pid:this.petData,
            isDelivery:true,
            isOver:false
        }
    },
    props:{
    petData:{
      type:Number,
      default:''
    },
},
    mounted(){
        this.displayedPet()
    },

    methods:{
        displayedPet(){
            // console.log(this.petData);
           
            this.axios({
                url:`/api/users/displayedpet?pid=${this.petData}`,
                method:"GET"
            }).then((res)=>{
                if(res.data.code==200){
                    // console.log("55555555");
                    // console.log(res.data.data.pets);
                    this.pet=res.data.data.pets[0]
                    console.log(this.pet);
                }
            })
            
        },
        onSubmit(){
            if(this.form.delivery=="平台传送"){
                this.isShow=true
            }else if(this.form.delivery=="双方线下传送"){
                alert("线下传送，平台领养过程已完成");
                this.axios({
                    url:`/api/users/overadoption?pid=${this.petData}`,
                    method:"GET"
                }).then((res)=>{
                    if(res.data.code==200){
                        this.isDelivery=false,
                        this.isOver=true
                    }
                   
                })
            }
            
        }
    }
}

</script>
<style>
.OverAdoption{
    width: 200px;
    height: 200px;
    font-size: 150px;
}
</style>