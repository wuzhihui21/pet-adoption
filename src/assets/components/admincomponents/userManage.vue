<template>
  <div>
    <el-table :data="userData" style="width: 100%;height:800px">
      <el-table-column fixed prop="uid" label="用户编号" width="100"></el-table-column>
      <el-table-column prop="uname" label="姓名" width="120"></el-table-column>
      <el-table-column prop="uaccount" label="账号" width="120"></el-table-column>
      <el-table-column prop="upassword" label="密码" width="120"></el-table-column>
      <el-table-column prop="ugender" label="性别" width="100"></el-table-column>
      <el-table-column prop="uage" label="年龄" width="120"></el-table-column>
      <el-table-column prop="uphone" label="手机号" width="120"></el-table-column>
      <el-table-column label="头像" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.uimgUrl==''">
            <el-image :src="'http://localhost:3000/images/'+defaultAvatar.png" width="15px" height="20px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div v-else>
            <el-image :src="'http://localhost:3000/images/'+scope.row.uimgUrl" width="15px" height="20px"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.row.uid)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
     userData:[]
    }
  },
  mounted(){
    this.fectedData()
  },
  methods:{
    fectedData(){
      this.axios({
        url:"/api/admin/userManageShow",
        method:"GET"
      }).then((res)=>{
        if(res.data.code==200){
          // console.log("111111111");
          // console.log(res.data.data);
          this.userData=res.data.data;
          // console.log(this.userData);
        }
      })
    },
    //删除操作
    deleteRow(index){
      // console.log("22222");
      // console.log(index);
      this.axios({
        url:`/api/admin/deleteuser?uid=${index}`,
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