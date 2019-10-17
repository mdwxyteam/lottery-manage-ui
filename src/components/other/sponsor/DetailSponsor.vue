<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i>赞助商管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="top">
        <h2 class="sm-layout-center-horizontal">{{sponsorName}}</h2>
        <div class="ms-layout-center-wrap-horizontal">
            <h4 class="creatTime sm-width-25-per">创建时间：{{creatTime}}</h4>
            <h4 class="creatTime  sm-width-15-per">赞助商类型：{{typeName}}</h4>
            <h4 class="creatTime">地址：{{address}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import { sponsorDetail } from "../../../api/index";
export default {
  data() {
    return {
      id: this.$route.query.id,
      sponsorName: "",
      creatTime: "",
      typeName:"",
      address:""

    };
  },
  mounted() {
    this.detail(this.id);
  },
  methods: {
    detail(id) {
      sponsorDetail(id).then(res => {
        console.log(res.data.data);
        this.sponsorName = res.data.data.sponsorName;
        this.getTime(res.data.data.creatTime);
        this.typeName = res.data.data.type;
        this.address = res.data.data.address;
      });
    },

    /**时间解析*/
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    getTime(creatTime) {
      var time = new Date(creatTime);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      this.creatTime =
        y +
        "-" +
        m +
        "-" +
        d +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s);
    }
  }
};
</script>

<style scoped>
.top h4{
     padding:20px 0;
}
.creatTime{
    color: #686868;
}
</style>