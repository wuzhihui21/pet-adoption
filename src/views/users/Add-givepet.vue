<template>
  <div class="add">
    <h1 style="margin-top: -70px">添加送养</h1>
    <div class="content">
      <el-form class="form" method="post" ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="宠物照片">
          <el-upload action="/api/users/addimags" :auto-upload="false" ref="upload" name="files"
            :http-request="uploadFile" :on-change="changeFileLength" multiple>
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="upload">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="宠物名称" prop="pname">
          <el-input style="border: blue" v-model="form.pname"></el-input>
        </el-form-item>
        <el-form-item label="宠物品种" prop="variety">
          <el-cascader placeholder="请选择宠物品种" :options="options" filterable @change="handleCascader"
            :show-all-levels="false" v-model="selectedValue" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="宠物年龄" prop="age">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="宠物性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="公"></el-radio>
            <el-radio label="母"></el-radio>
            <el-radio label="雌雄同体"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="宠物特点" prop="feature">
          <el-input v-model="form.feature"></el-input>
        </el-form-item>
        <el-form-item label="宠物健康状况" prop="health">
          <el-input v-model="form.health"></el-input>
        </el-form-item>
        <el-form-item label="送养原因" prop="case">
          <el-input type="textarea" v-model="form.case"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        pname: '',
        variety: "",
        age: '',
        gender: '',
        feature: '',
        health: '',
        case: ''
      },
      rules: {
        pname: [
          { required: true, message: '请输入宠物名称', trigger: 'blur' },
        ],
        variety: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
        ],
        age: [
          { required: true, message: '请输入宠物', trigger: 'blur' },
        ],
        gender: [
          { required: true, message: '请选择宠物性别', trigger: 'change' },
        ],
        feature: [
          { required: true, message: '请输入宠物特点', trigger: 'blur' },
        ],
        health: [
          { required: true, message: '请输入宠物健康状况', trigger: 'blur' },
        ],
        case: [
          { required: true, message: '请输入送养原因', trigger: 'blur' },
        ]
      },
      options: [], //宠物品种
      selectedValue: [], //宠物品种选中的值
      // 上传文件的列表
      uploadFiles: [],
      // 上传文件的个数
      filesLength: 0,
      imgurl: ""

    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      // console.log("11111");
      this.axios({
        url: "/api/users/addgive",
        method: "POST",
        data: {
          imgurl: this.imgurl,
          pet: this.form,

        }
      }).then((res => {
        if (res.data.code == 200) {
          alert("宠物送养添加成功");
          this.$router.go(-1)
        }
      }))
    },
    fetchData() {
      this.axios({
        url: "/api/variety",
        method: "GET",
      }).then((res) => {
        if (res.data.code == 200) {
          this.options = res.data.data.variety
          // console.log(this.options);
        } else {
          alert(res.data.msg)
        }
      })
    },
    handleCascader() {
      // console.log(this.selectedValue);
      let item = this.selectedValue
      this.form.variety = item[1]
      // console.log(this.form.variety);
    },
    changeFileLength(file, fileList) {
      this.filesLength = fileList.length;
    },
    // 用户点击上传调用
    async upload() {
      // 触发上传 调用配置 :http-request="uploadFile"
      // 即触发 uploadFile函数
      await this.$refs.upload.submit();
      // 上传完成后执行的操作 ...
      this.$refs.upload.clearFiles();
    },
    uploadFile(param) {
      // 将文件加入需要上传的文件列表
      this.uploadFiles.push(param.file);
      // console.log(this.uploadFiles);
      // 当uploadFiles长度等于用户需要上传的文件数时进行上传
      if (this.uploadFiles.length == this.filesLength) {
        // 创建FormData上传
        let fd = new FormData();
        // 将全部文件添加至FormData中
        this.uploadFiles.forEach((file) => {
          fd.append("file", file);
        });

        // 配置请求头
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        // 上传文件
        this.axios
          .post("/api/users/addimags", fd, config)
          .then((res) => {
            /*上传成功处理*/
            // console.log(res.data);
            let imgs = res.data.data
            imgs.forEach(element => {
              this.imgurl = element.filename
            });
            // console.log("22222");
            // console.log(this.imgurl);
          })
          .catch((err) => {
            /*报错处理*/
          });
      }
    },
  }
}
</script>
<style scoped>
.form {
  width: 800px;
  text-align: center;
  margin: auto;
}
.content {
  margin-right: 100px;
}
.add {
  margin-top: 100px;
  background-image: url("../../assets/images/back3.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 810px;
  width: 100%;
}
.content {
  margin-top: 100px;
}
</style>
