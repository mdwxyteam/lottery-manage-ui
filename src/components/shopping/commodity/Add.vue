<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div>
      <div class="crumbs">
        <el-row>
          <el-col :span="22">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-calendar">商品管理</i>
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="container">
        <div class="headerTitle">商品信息</div>
        <div>
          <el-form-item label="商品名称" prop="goodsName" placeholder="请输入商品名称">
            <el-input v-model="ruleForm.goodsName" type="text" class="sm-width-25-per" style></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input-number v-model="ruleForm.price" :min="1" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="实际售价">
            <el-input-number v-model="ruleForm.actualPrice" :min="1" :max="99999999"></el-input-number>
          </el-form-item>
          <el-form-item label="讨论群组" prop="goodsGroup" placeholder="请输入商品讨论群组">
            <el-input v-model="ruleForm.goodsGroup" type="text" class="sm-width-25-per" style></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="imgUrl">
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
    </div>
  </el-form>
</template>

<script>
import { addGoods } from "../../../api/index";
import { file } from "../../../api/index";
export default {
  name: "addCommodity",
  data() {
    return {
      file: file,
      iconFile: "",
      imgUrl: "",
      ruleForm: {
        goodsName: "",
        goodsImg: "",
        price: "",
        actualPrice: "",
        goodsGroup: ""
      },
      rules: {
        goodsName: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    /**图片 */
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.iconFile == "") {
            this.$message.error("请上传图片");
            return false;
          }
          let ruleFormData = {
            goodsName: this.ruleForm.goodsName,
            goodsImg: this.iconFile,
            price: this.ruleForm.price
          };
          addGoods(ruleFormData).then(resoponse => {
            if ((resoponse.status = 200)) {
              if (resoponse.data.code == -1) {
                this.$message.error(resoponse.data.msg);
              }
              this.$message.success("添加成功");
              this.ruleForm = {
                goodsName: "",
                price: 1
              };
              this.imgUrl = "";
            } else {
              this.$message.error("操作失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
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