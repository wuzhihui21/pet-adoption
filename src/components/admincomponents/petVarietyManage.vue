<template>
    <div>
        <div style="margin-left:420px;">
          <h4 style="margin-right: 70px;">添加宠物品种</h4>
          <el-form style="margin-left:-50px;" ref="form" :model="form" label-width="80px">
                <el-form-item style="margin-right:20px" label="品种">
                <el-input style="width:300px" type="text" v-model="form.petbreeds"></el-input>
                </el-form-item>
                <el-form-item style="margin-right:20px" label="种类">
                <el-input style="width:300px" type="text" v-model="form.petcategory"></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button style="margin-right:100px" type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="varietyData" style="width: 100%;margin-left:250px" max-height="500">
            <el-table-column fixed prop="vid" label="品种编号" width="150"></el-table-column>
            <el-table-column prop="petcategory" label="种类" width="120"></el-table-column>
            <el-table-column prop="petbreeds" label="品种名称" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="deleteRow(scope.row.vid)" type="text" size="small">
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
       varietyData:[],
       form:{
        petbreeds:"",
        petcategory:""
       }
      }
    },
    mounted(){
      this.fectedData()
    },
    methods:{
      //渲染宠物种类列表
      fectedData(){
        this.axios({
          url:"/api/admin/varietyManageShow",
          method:"GET"
        }).then((res)=>{
          if(res.data.code==200){
            // console.log("111111111");
            // console.log(res.data.data);
            this.varietyData=res.data.data;
            // console.log(this.varietyData);
          }
        })
      },
      //删除操作
      deleteRow(index){
        // console.log("22222");
        // console.log(index);
        this.axios({
          url:`/api/admin/deleteVariety?vid=${index}`,
          method:"GET"
        }).then((res)=>{
            alert(res.data.msg)
            this.fectedData()
        }).catch((err)=>{
          console.log(err);
        })
      },
      //添加宠物种类操作
      onSubmit(){
        this.axios({
          url:"/api/admin/addVariety",
          method:"POST",
          data:this.form
        }).then((res)=>{
          alert(res.data.msg)
          this.fectedData()
        })
      }
    }
  }
</script>
