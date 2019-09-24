<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <div>
      <div class="crumbs">
        <el-row>
          <el-col :span="22">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>
                <i class="el-icon-lx-calendar">赞助商类型管理</i>
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
        <div class="headerTitle">类型信息</div>
        <div class="div-el-form">
          <el-form-item label="类型名称" prop="typeName" placeholder="请输入类型名称">
            <el-input v-model="ruleForm.typeName"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { addType } from "../../../api/index";
export default {
  name: "add",
  data() {
    return {
      ruleForm: {
        typeName: ""
      },
      rules: {
        typeName: [
          { required: true, message: "请输入类型名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addType(this.ruleForm.typeName).then(resoponse => {
            if (resoponse.status = 200) {
                 this.$message.success("添加成功");
            }
          });
        }
      });
    }
  }
};
</script>