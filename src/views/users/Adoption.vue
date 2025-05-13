<template>
    <div>
        <el-container direction="vertical">
            <Header />
            <el-main class="adopt">
                <component @data-send="receiveData" style="width: 1000px;" :is="currentComponent" :petData="pets"></component>
            </el-main>
            <Footer />
        </el-container>
    </div>
</template>
<script>
import Header from '../../components/Header.vue';
import Footer from '../../components/Footer.vue';
import RequestAdoption from '../../components/adoptcomponents/RequestAdoption.vue'
import PetDelivery from '@/components/adoptcomponents/PetDelivery.vue';
import PetHistory from '../../components/adoptcomponents/PetHistory.vue';
import { mapState } from 'vuex';
export default({
    components:{
        Header,
        Footer,
        RequestAdoption,
        PetDelivery,
        PetHistory
    },
    data(){
        return{
            currentComponent:'petHistory',
            pets:null,
            
        }
    },
    mounted(){
        this.fetchData();
    },
    computed:{
        ...mapState("user",["user"])
    },
    methods:{
        receiveData(obj){
            // console.log("1111",obj);
            this.currentComponent=obj.current,
            this.pets=obj.pid
            // console.log(this.currentComponent,this.pets);
        },
        fetchData(){
            if(this.user==null){
                alert("请先登录");
                this.$router.push("/login")
            }else{
               this.currentComponent='petHistory'
            }
        }
    }
})
</script>
<style>
.adoptionCard{
    width: 800px;
    height: 300px;
    text-align: left;
    margin: auto;
}
.image{
    display: inline-block;
    margin: 5px;
}
.information{
    width: 200px;
    display: inline-block;
    position: relative;
    bottom: 75px;
    left: 15px;
   
}
.stateAdoption{
    display: inline-block;
    position: relative;
    bottom: 125px;
}
.adopt{
    position: relative;
    background-image: url("../../assets/images/back3.png");
    background-size: cover;
    background-repeat: no-repeat;
    
    background-position: center;
    height: 100%;
    width: 100%;
}
</style>