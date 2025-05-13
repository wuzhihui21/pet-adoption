<template>
    <div style="background-image: url('../../assets/images/back3.png');">
        <el-row>
            <el-col style="width: 600px;height: 500px;">
                <span style="font-size: 30px;margin-right: 250px">宠物图片</span>
                <div class="grid-content bg-purple">
                    <el-image style="width: 380px; height: 420px;" :src="'http://localhost:3000/images/' + pet.pimgUrl"
                        fit="cover"></el-image>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
            </el-col>
            <el-col style="width:300px; height: 500px; text-align: left; ">
                <div style="position: relative; transform: translateY(18%); font-size: 30px;" class="give">
                    <span style="font-size: 25px;" class="list">编号：</span><span style="font-size: 25px;">
                        {{ this.pet.pid }} </span><br>
                    <span style="font-size: 25px;" class="list">名称：</span><span style="font-size: 25px;">
                        {{ this.pet.pname }}</span><br>
                    <span style="font-size: 25px;" class="list">年龄：</span><span style="font-size: 25px;">
                        {{ this.pet.page }}</span><br>
                    <span style="font-size: 25px;" class="list">性别：</span><span style="font-size: 25px;">
                        {{ this.pet.pgender }}</span><br>
                    <span style="font-size: 25px;" class="list">特点：</span><span style="font-size: 25px;">
                        {{ this.pet.pfeatuer }}</span><br>
                    <span style="font-size: 25px;" class="list">健康状况：</span><span style="font-size: 25px;">
                        {{ this.pet.phealthCondition }}</span><br>
                    <span style="font-size: 25px;" class="list">领养状态：</span><span style="font-size: 25px;">
                        {{ this.pet.pstate }}</span><br>
                    <span style="font-size: 25px;" class="list">送养主人编号：</span><span style="font-size: 25px;">
                        {{ this.pet.sendaccount }}</span><br>
                    <span style="font-size: 25px;" class="list">送养原因：</span><span style="font-size: 25px;">
                        {{ this.pet.preason }}</span><br>
                </div>
            </el-col>
            <el-col style="width: 300px; height: 500px">
                <div style="position: relative; transform: translateY(70%); text-align: left; ">

                </div>

            </el-col>
        </el-row>
        <div>
            <!-- 当宠物状态是未领养时才显示有领养申请,宠物领养中或已领养完成的不显示领养申请管理表 -->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="领养申请管理" name="first">
                    <div v-if="this.pet.pstate == '未被领养'">
                        <div v-show="isShow">
                            <el-empty description="还没有人发送领养申请"></el-empty>
                        </div>
                        <div v-show="isShow2">
                            <div v-for="item in applicationMessage" :key="item.aid" :offset="1">
                                <el-card shadow="hover" style="text-align: left;">
                                    <b>申请人：</b><span>{{ item.uname }}</span> &nbsp;
                                    <b>申请原因：</b><span>{{ item.ucase }}</span> &nbsp;
                                    <br>
                                    <b>住址：</b><span>{{ item.uaddress }}</span> &nbsp;
                                    <b>居住环境：</b><span>{{ item.ulivingenvironment }}</span> &nbsp;
                                    <div style=" text-align: right;">
                                        <el-button type="success" @click="agreeApplication(item.pid, item.aid, item.uid)"
                                            round>申请同意</el-button>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="this.pet.pstate == '领养中'">
                        <el-button type="success" icon="el-icon-check" circle class="OverAplication"></el-button>
                        <h5>申请以允以通过，请协商与领养方决定进行宠物交互</h5>
                    </div>
                    <div v-else>
                        <el-button type="success" icon="el-icon-check" circle class="OverAplication"></el-button>
                        <h5>宠物已被领养</h5>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>

export default {
    components: {

    },
    data() {
        return {
            pet: null,
            activeName: "first",
            applicationMessage: null,
            isShow: true,
            isShow2: true
        }
    },
    created() {
        this.details();
    },
    mounted() {
        this.adoptionMessage();
    },
    methods: {
        details() {
            // console.log("22222222222");
            // console.log(localStorage.getItem('petDetail'));
            let data = JSON.parse(localStorage.getItem('petDetail'))
            // console.log(data);
            //  console.log(JSON.parse(pet));
            this.pet = data.pets[0]
            // console.log(this.pet);
        },
        adoptionMessage() {
            // console.log("111111111");
            this.axios({
                url: `/api/users/getadoptionMessage?pid=${this.pet.pid}`,
                method: "GET",
            }).then((res) => {
                this.applicationMessage = res.data.data
                if (this.applicationMessage.length == 0) {
                    this.isShow = true,
                        this.isShow2 = false
                } else {
                    this.isShow = false,
                        this.isShow2 = true
                }
                // console.log(this.applicationMessage);
            })
        },
        agreeApplication(pid, aid, uid) {
            // console.log(pid, aid);
            this.axios({
                url: `/api/users/agreeApplication?pid=${pid}&aid=${aid}&uid=${uid}`,
                method: "GET"
            }).then((res) => {
                if (res.data.code == 200) {
                    this.$router.go(-1);
                }
            })
        }
    },

}
</script>

<style>
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 10px;
    height: 600px;
    width: 1200px;
    margin: auto;
}

body>.el-container {
    margin-bottom: 40px;
}

.give {
    border: solid 1px #000000;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
    width: 650px;
    height: 400px;
    margin-top: -10px;
    margin-left: 50px;
    background-color: rgb(251, 244, 235);
}
</style>