<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表单
        </el-breadcrumb-item>
        <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        <div class="sm-layout-side-horizontal sm-width-50-per">
          <el-input placeholder="请输入内容" class="sm-width-40-per"></el-input>

          <el-select  v-model="typeId" class="sm-width-40-per" placeholder="赞助商类型">
            <el-option v-for="sponsorObj in sponsorList" :key="sponsorObj.typeName" :label="sponsorObj.typeName" :value="sponsorObj.id"></el-option>
          </el-select>
        </div>
      </div>
      <mavon-editor
        v-model="content"
        ref="md"
        @imgAdd="$imgAdd"
        @change="change"
        style="min-height: 600px"
      />
      <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { allsponsorType } from "../../../api/index";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdown",
  data: function() {
    return {
      content: "",
      html: "",
      configs: {},
      sponsorList: [],
      typeId: ""
    };
  },
  components: {
    mavonEditor
  },
  mounted() {
    console.log("---------------------------")
    this.getSponsorType();
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: "/common/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(url => {
        this.$refs.md.$img2Url(pos, url);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    submit() {
      console.log(this.content);
      console.log(this.html);
      this.$message.success("提交成功！");
    },
    getSponsorType() {
      // this.sponsorList = allsponsorType();
      var that = this;
      allsponsorType().then((res)=>{
        
        const dataObj = res.data;
        console.log(dataObj);
        console.log(dataObj.code);
        if (dataObj.code == 0) {
          that.sponsorList = dataObj.data;
          console.log(that.sponsorList)
        } else {
          //失败
        }
      }).catch((res) => {
        //失败
      })
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>