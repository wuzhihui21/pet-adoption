<template>
    <div class="message">
        <el-container direction="vertical">
            <Header />
            <el-main>
                <el-row :gutter="10">
                    <el-col :md="6" :lg="3" :xl="2">
                        <div class="grid-content bg-purple">
                            <div>
                                <div v-if="currentUser.uimgUrl==null">
                                    <el-avatar src="http://localhost:3000/images/defaultAvatar.png"></el-avatar>
                                </div>
                                <div v-else>
                                    <el-avatar :src="'http://localhost:3000/images/' + currentUser.uimgUrl"></el-avatar>
                                </div>
                                <h4>{{ currentUser.uname }}</h4>
                                <el-button icon="el-icon-chat-dot-round"></el-button>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="9" :lg="9" :xl="11">
                        <div class="grid-content bg-purple-light" v-for="item in messageUser" :key="item.index">
                            <div @click="getContant(item)">
                                <el-card class="card" shadow="hover">
                                    <el-avatar class="avatar"
                                        src="http://localhost:3000/images/defaultAvatar.png"></el-avatar>
                                    <div class="msg">
                                        <h5 style="display: inline-block; margin: 0;">用户编号：{{ item }}</h5><br>
                                    </div>
                                   
                                </el-card>
                            </div>
                        </div>
                    </el-col>
                    <el-col :md="9" :lg="9" :xl="11">
                        <div class="grid-content bg-purple">

                            <div class="chat-container">
                                <div class="chat-messages" ref="chatMessages">
                                    <div  v-for="(message, index) in messages" :key="index">
                                        <div class="message sender">
                                            <div v-if="message.msendAcount==user1" class="message-content">{{ message.mcontant }}</div>
                                        </div>
                                       <div class="message receiver">
                                        <div v-if="message.msendAcount==user2" class="message-content receiver">{{ message.mcontant }}</div>
                                       </div>
                                       
                                    </div>
                                </div>
                                <div class="input-container">
                                    <input type="text" v-model="newMessage" @keyup.enter="sendMessage"
                                        placeholder="输入消息...">
                                    <button @click="sendMessage">发送</button>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                
            </el-main>
            <Footer />
        </el-container>
    </div>
</template>
<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import {mapState} from 'vuex'
export default ({
    components: {
        Header,
        Footer
    },
    data() {
        return {
            messages:null,
            newMessage: '',
            avatarImg: "defaultAvatar.png",
            messageUser: null,
            user1:"",
            user2:"",
            currentUser:null
        };
    },
    computed:{
        ...mapState("user",["user"])
    },
    mounted() {
        this.fetchData()
    },
    // created(){
    //     const contactid=this.$route.query.contact
    //     // console.log(contactid);
    // },
    methods: {
        //联系人请求
        fetchData() {
            this.axios({
                url: "/api/users/msg",
                method: "GET"
            }).then((res) => {
                if (res.data.code = 200) {
                    // console.log("ok");
                    this.messageUser = res.data.data;
                    // console.log(this.messageUser);
                } else {
                    alert(res.data.msg)
                }
            })
            this.axios({
                url:"/api/users/personal",
                method:"GET"
            }).then((res)=>{
                if(res.data.code==200){
                    this.currentUser= res.data.data
                }
            })
        },
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                // console.log(this.newMessage.trim());
                this.axios({
                    url:"/api/users/addmessage",
                    method:"POST",
                    data:{
                        mcontant:this.newMessage.trim(),
                        msendAcount:this.user1,
                        macceptAcount2:this.user2
                    }
                }).then((res)=>{
                    if(res.data.code==200){
                        this.getContant(this.user2)
                    }
                })
                this.newMessage = '';
            }
        },
        //聊天记录请求
        getContant(item){
            this.axios({
                url:`/api/users/messageDetail?user=${item}`,
                method:"GET"
            }).then((res)=>{
                if(res.data.code==200){
                    this.messages=res.data.data.messages;
                    this.user1=res.data.data.user1;
                    this.user2=res.data.data.user2
                    // console.log(this.messages,this.user1,this.user2);
                }
            })
        }
    }
})
</script>
<style scoped>
.message {
    text-align: center;
    margin: 0 auto;
}

.card {
    text-align: left;
    padding: 0;
    margin: 0 auto;
    width: 300px;
    height: 90px;
}

.avatar {
    padding: 0px;
    width: 60px;
    height: 60px;
    margin: 0;
    display: inline-block;
}

.msg {
    display: inline-block;
    margin: 15px;
}

.time {
    display: inline-block;
    position: relative;
    bottom: 50px;
    left: 500px;
}

/* 聊天框样式 */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

.chat-container {
    width: 600px;
    height: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
   
}

.chat-messages {
    height: 500px;
    overflow-y: scroll;
    padding: 10px;
    background-color: #f2f2f2;
    background-image: url("../../assets/images/back3.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.message {
    margin-bottom: 10px;
   
}

.message.sender {
    text-align: right;
}

.message.receiver {
    text-align: left;
}

.message-content {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
}
/* message-content1{
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #ffffff;
    color: #040404;
} */

.message-content.receiver {
    background-color: #ccc;
    color: #000;
}

.input-container {
    padding: 10px;
    border-top: 1px solid #ccc;
}

.input-container input[type="text"] {
    width: 80%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
}

.input-container button {
    padding: 8px 15px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>