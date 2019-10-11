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
        <div class="sm-layout-side-horizontal sm-width-100-per">
          <div class="sm-layout-side-horizontal sm-width-50-per">
            <el-input placeholder="请输入内容"
                      class="sm-width-40-per"></el-input>

            <el-select v-model="typeId"
                       class="sm-width-40-per"
                       placeholder="赞助商类型">
              <el-option v-for="sponsorObj in sponsorList"
                         :key="sponsorObj.typeName"
                         :label="sponsorObj.typeName"
                         :value="sponsorObj.id"></el-option>
            </el-select>

            <el-button @click="dialogMapVisible = true"
                       icon="el-icon-position">商户位置</el-button>

          </div>
          <div class="sm-layout-left-center sm-width-50-per">
            <el-tag style="">{{poiResult?poiResult.item.district: "未知区域"}} {{poiResult?poiResult.item.address: "未知地址"}} {{poiResult?poiResult.item.name: "未知地点"}} {{poiResult?poiResult.item.location.lat: "0.00"}},{{poiResult?poiResult.item.location.lng: "0.00"}}</el-tag>
          </div>

        </div>

        <el-dialog title="商户位置"
                   :visible.sync="dialogMapVisible">
          <el-button id="rightbutton"
                     type="primary"
                     @click="okLocation">确认</el-button>
          <mdamap ref="myamap"
                  style="width: 100%">
          </mdamap>
        </el-dialog>
      </div>
      <mavon-editor v-model="content"
                    ref="md"
                    @imgAdd="$imgAdd"
                    @change="change"
                    style="min-height: 600px" />
      <el-button class="editor-btn"
                 type="primary"
                 @click="submit">提交</el-button>
    </div>
  </div>
</template>
  <style>
#rightbutton {
  position: absolute;
  z-index: 9999;
  top: 50px;
  right: 80px;
  width: 120px;
}
.amap-demo {
  height: 300px;
}
</style>
<script>
import { allsponsorType } from "../../../api/index";
import { mavonEditor } from "mavon-editor";
import mdamap from "../../amap/amap";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdown",
  data: function () {
    return {
      content: "",
      html: "",
      configs: {},
      sponsorList: [],
      typeId: "",
      dialogMapVisible: false,
      poiResult: null
    };
  },
  components: {
    mavonEditor,
    mdamap
  },
  mounted () {
    console.log("---------------------------")
    this.getSponsorType();
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
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
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    submit () {
      console.log(this.content);
      console.log(this.html);
      this.$message.success("提交成功！");
    },
    getSponsorType () {
      // this.sponsorList = allsponsorType();
      var that = this;
      allsponsorType().then((res) => {

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
    },
    okLocation () {
      this.poiResult = this.$refs.myamap.getLocation();
      this.dialogMapVisible = false;
    }
  }
};
</script>
<style scoped>
.editor-btn {
  margin-top: 20px;
}
</style>
