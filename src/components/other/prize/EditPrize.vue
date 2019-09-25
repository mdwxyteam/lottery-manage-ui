<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div>
      <div class="crumbs">
        <el-row>
          <el-col :span="22">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-calendar">奖品管理</i>
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
        <div class="headerTitle">奖品信息</div>
        <div>
          <el-form-item label="奖品描述" prop="prizeDescription" placeholder="请输入奖品描述">
            <el-input v-model="ruleForm.prizeDescription" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="奖品数量">
            <el-input-number v-model="ruleForm.prizeCount" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="奖品图片">
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
import { editPrize } from "../../../api/index";
import { file } from "../../../api/index";
export default {
  name: "editor",
  data() {
    return {
      prizeId: this.$route.query.id,
      imgUrl: this.$route.query.imgUrl,
      file: file,
      iconFile: this.$route.query.imgUrl,
      ruleForm: {
        prizeDescription: this.$route.query.desciption,
        prizeCount: this.$route.query.count
      },
      rules: {
        prizeDescription: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
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
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(this.iconFile == ""){
                this.$message.error("请上传图片");
                return false;
            }
          editPrize(
            this.prizeId,
            this.ruleForm.prizeDescription,
            this.iconFile,
            this.ruleForm.prizeCount
          ).then(resoponse => {
            if ((resoponse.status = 200)) {
              this.$message.success("更新成功");
              this.ruleForm = {
                prizeDescription: this.ruleForm.prizeDescription,
                prizeCount: this.ruleForm.prizeCount
              };
               this.imgUrl = this.iconFile;
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