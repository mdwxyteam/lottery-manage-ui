<template>
  <el-form ref="form"
           :model="form"
           label-width="80px">
    <el-form-item label="赞助商">
      <el-select v-model="value"
                 filterable
                 remote
                 reserve-keyword
                 placeholder="请输入关键词"
                 :remote-method="remoteSearch"
                 :loading="loading">

        <el-option v-for="sponsorObj in sponsorList"
                   :key="sponsorObj.id"
                   :label="sponsorObj.sponsorName"
                   :value="sponsorObj.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="活动性质">
      <el-radio-group v-model="form.conditionType">
        <el-radio label="1">时间限制</el-radio>
        <el-radio label="2">人数限制</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea"
                v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
</style>
<script>
import { querySponsor } from "../../../api/index";
export default {
  data () {
    return {
      sponsorList: [],
      form: {
        sponsorName: '',
        sponsorid: '',
        location: '',
        address: '',
        conditionType: false,
        condition: '',
        sponsorClaim: '',
        state: '',
        adv: ''

      },
      value: '',
      loading: false,
    }
  },
  methods: {
    onSubmit () {
      console.log(this.value);
    },
    remoteSearch (query) {
      if (query == '') {
        return
      }
      this.loading = true;
      let that = this;
      querySponsor(query).then((res) => {
        that.loading = false;
        let resData = res.data;
        if (resData.code == 0) {
          that.sponsorList = resData.data;
        }
      }).catch((res) => {
        that.loading = false;
        this.$message.error("搜索失败！");
      })
    }
  }
}
</script>