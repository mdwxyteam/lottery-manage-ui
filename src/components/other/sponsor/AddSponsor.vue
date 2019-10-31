<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div>
      <div class="crumbs">
        <el-row>
          <el-col :span="22">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-calendar"></i> 赞助商管理
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="20">
        <el-col :span="16">
          <div class="container">
            <div class="headerTitle">类型信息</div>
            <div class="div-el-form">
              <el-form-item label="赞助商名称" prop="sponsorName">
                <el-input v-model="ruleForm.sponsorName" placeholder="请输入赞助商名称"></el-input>
              </el-form-item>

              <el-form-item label="赞助商描述">
                <mavon-editor
                  v-model="content"
                  ref="md"
                  @imgAdd="$imgAdd"
                  @change="change"
                  style="min-height: 600px"
                />
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="container">
            <div class="headerTitle">类型属性</div>
            <div class="div-el-form">
              <el-form-item label="赞助商类型" prop="typeId">
                <el-select v-model="ruleForm.typeId" placeholder="请选择赞助商类型">
                  <el-option
                    v-for="sponsorObj in sponsorList"
                    :key="sponsorObj.id"
                    :label="sponsorObj.typeName"
                    :value="sponsorObj.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="负责人" prop="principal">
                <el-input v-model="ruleForm.principal" placeholder="请输入赞助商负责人"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="contact">
                <el-input v-model.number="ruleForm.contact" placeholder="请输入赞助商联系方式"></el-input>
              </el-form-item>
              <el-form-item label="赞助商地点" prop="address">
                <el-button @click="dialogMapVisible = true" icon="el-icon-position">商户位置</el-button>
                <el-dialog title="商户位置" :visible.sync="dialogMapVisible">
                  <el-button id="rightbutton" type="primary" @click="okLocation">确认</el-button>
                  <mdamap ref="myamap" style="width: 100%"></mdamap>
                </el-dialog>
              </el-form-item>
              <el-tag style>
                {{poiResult?poiResult.item.district: "未知区域"}} {{poiResult?poiResult.item.address: "未知地址"}} {{poiResult?poiResult.item.name: "未知地点"}} {{poiResult?
                poiResult.item.location.lat: "0.00"}},{{poiResult?poiResult.item.location.lng: "0.00"}}
              </el-tag>
            </div>
          </div>
        </el-col>

        <el-col :span="8" style="margin-top:30px;">
          <div class="container">
            <div class="headerTitle">类型封面</div>
            <div class="div-el-form" style="margin-left:-70px;">
              <el-form-item prop="imgUrl">
                <el-upload
                  class="avatar-uploader"
                  :action="file"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
<script>
import { allsponsorType, addSponsor, fileUploadURL } from "../../../api/index";
import { mavonEditor } from "mavon-editor";
import { file } from "../../../api/index";
import mdamap from "../../amap/amap";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdown",
  data() {
    var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入赞助商联系方式"));
      }
      if (!TEL_REGEXP.test(value)) {
        return callback(new Error("请输入正确手机号"));
      } else {
        callback();
      }
    };
    return {
      content: "",
      html: null,
      file: file,
      iconFile: "",
      imgUrl: "",
      configs: {},
      sponsorList: [],
      dialogMapVisible: false,
      poiResult: null,
      ruleForm: {
        sponsorName: "",
        typeId: "",
        principal: "",
        contact: ""
      },
      rules: {
        sponsorName: [
          { required: true, message: "请输入赞助商名称", trigger: "blur" }
        ],
        typeId: [
          { required: true, message: "请选择赞助商类型", trigger: "change" }
        ],
        principal: [
          { required: true, message: "请输入赞助商负责人", trigger: "blur" }
        ],
        contact: [{ required: true, validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  components: {
    mavonEditor,
    mdamap
  },
  mounted() {
    this.getSponsorType();
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: fileUploadURL,
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        if (-1 == res.data.code) {
          this.$message.error("上传图片失败！");
        }
        let url = res.data.data;
        this.$refs.md.$img2Url(pos, url);
      });
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render;
    },
    /**封面图 */
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.iconFile = file.response.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      debugger;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let sponsorObj = null;
          for (var i = 0; i < this.sponsorList.length; i++) {
            let spobj = this.sponsorList[i];
            if (spobj.id == this.ruleForm.typeId) {
              sponsorObj = spobj;
              break;
            }
          }
          if (!this.poiResult || !this.html || !this.content) {
              this.$message.error("请选择地址");
            return false;
          }
          let locationObj =
            this.poiResult.item.location.lat +
            "," +
            this.poiResult.item.location.lng;
          let addressObj =
            this.poiResult.item.district +
            " " +
            this.poiResult.item.address +
            " " +
            this.poiResult.item.name;

          if (this.iconFile == "") {
            this.$message.error("请上传图片");
            return false;
          }
          addSponsor(
            this.ruleForm.typeId,
            sponsorObj.typeName,
            this.ruleForm.sponsorName,
            this.ruleForm.principal,
            this.ruleForm.contact,
            locationObj,
            addressObj,
            this.html,
            this.content,
            this.iconFile
          )
            .then(res => {
              this.$message.success("添加成功！");
              this.poiResult = null;
              this.ruleForm.sponsorName = "";
              this.ruleForm.principal = "";
              this.ruleForm.contact = "";
              this.html = null;
              this.content = "";
              this.imgUrl="";
            })
            .catch(res => {
              this.$message.error("添加失败！");
            });
        }
      });
    },
    getSponsorType() {
      var that = this;
      allsponsorType()
        .then(res => {
          const dataObj = res.data;
          if (dataObj.code == 0) {
            that.sponsorList = dataObj.data;
          } else {
            this.$message.error("获取赞助商类型数据失败！");
          }
        })
        .catch(res => {
          this.$message.error("获取赞助商类型数据失败！");
        });
    },
    okLocation() {
      this.poiResult = this.$refs.myamap.getLocation();
      this.dialogMapVisible = false;
    }
  }
};
</script>
<style scoped>
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
.editor-btn {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 360px;
  height: 180px;
  display: block;
}
</style>
