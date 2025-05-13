<template>
  <div>
    <el-table :data="petData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%;">
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <el-image :src="'http://localhost:3000/images/'+scope.row.pimgUrl" min-width="70" height="70"></el-image>
        </template>
      </el-table-column>
      <el-table-column fixed prop="pid" label="宠物编号" width="100"></el-table-column>
      <el-table-column prop="pname" label="名称" width="80"></el-table-column>
      <el-table-column prop="pvariety" label="种类" width="100"></el-table-column>
      <el-table-column prop="pfeatuer" label="特点" width="120"></el-table-column>
      <el-table-column prop="pgender" label="性别" width="50"></el-table-column>
      <el-table-column prop="page" label="年龄" width="120"></el-table-column>
      <el-table-column prop="pstate" label="状态" width="120"></el-table-column>
      <el-table-column prop="sendaccount" label="送养人编号" width="50"></el-table-column>
      <el-table-column prop="accpetaccount" label="领养人编号" width="50"></el-table-column>
      <el-table-column prop="phealthCondition" label="健康状况" width="120"></el-table-column>
      <el-table-column prop="preason" label="送养原因" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.pid)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="currentPage" :page-size="pageSize" :pager-count="11" layout="prev, pager, next" :total="petData.length">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },
    data() {
      return {
       petData:[],
       currentPage: 1,
        pageSize: 3,
      }
    },
    mounted(){
      this.fectedData()
    },
    methods:{
      //渲染宠物列表
      fectedData(){
        this.axios({
          url:"/api/admin/petManageShow",
          method:"GET"
        }).then((res)=>{
          if(res.data.code==200){
            // console.log("111111111");
            // console.log(res.data.data);
            this.petData=res.data.data;
            console.log(this.petData);
          }
        })
      },
      //删除操作
      deleteRow(index){
        // console.log("22222");
        // console.log(index);
        this.axios({
          url:`/api/admin/deletepet?pid=${index}`,
          method:"GET"
        }).then((res)=>{
            alert(res.data.msg)
            this.fectedData()
        }).catch((err)=>{
          console.log(err);
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    }
  }
</script>
