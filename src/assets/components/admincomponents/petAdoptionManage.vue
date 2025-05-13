<template>
    <div>
        <el-table :data="adoptionData" style="width: 100% ;height:100%" >
            <el-table-column  label="图片" width="80">
                <template slot-scope="scope">
                    <el-image :src="'http://localhost:3000/images/'+scope.row.pimgUrl" min-width="70" height="70"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed prop="pid" label="宠物编号" width="80"></el-table-column>
            <el-table-column prop="pname" label="名称" width="80"></el-table-column>
            <el-table-column prop="pvariety" label="种类" width="100"></el-table-column>
            <el-table-column prop="pgender" label="性别" width="50"></el-table-column>
            <el-table-column prop="page" label="年龄" width="80"></el-table-column>
            <el-table-column prop="sendaccount" label="送养人编号" width="50"></el-table-column>
            <el-table-column prop="uid" label="领养人编号" width="50"></el-table-column>
            <el-table-column prop="uaddress" label="领养人住址" width="120"></el-table-column>
            <el-table-column prop="ulivingenvironment" label="领养人居住环境" width="120"></el-table-column>
            <el-table-column prop="ucase" label="领养原因" width="120"></el-table-column>
            <el-table-column prop="astate" label="领养状态" width="100"></el-table-column>
            <el-table-column prop="atime" label="申请时间" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.row.aid)" type="text" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  export default {
    data() {
      return {
       adoptionData:[]
      }
    },
    mounted(){
      this.fectedData()
    },
    methods:{
      //渲染宠物列表
      fectedData(){
        this.axios({
          url:"/api/admin/adoptionManageShow",
          method:"GET"
        }).then((res)=>{
          if(res.data.code==200){
            // console.log("111111111");
            // console.log(res.data.data);
            this.adoptionData=res.data.data;
            // console.log(this.adoptionData);
          }
        })
      },
      //删除操作
      deleteRow(index){
        // console.log("22222");
        // console.log(index);
        this.axios({
          url:`/api/admin/deleteAdoption?aid=${index}`,
          method:"GET"
        }).then((res)=>{
            alert(res.data.msg)
            this.fectedData()
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>
