<template>
  <div id="test">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 测试
        </el-breadcrumb-item>
        <el-breadcrumb-item>测试赞助商详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container"
         v-html="html">

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
import { sponsorDetail } from "../../api/index";
export default {
  name: "test",
  data: function () {
    return {
      html: null
    };
  },

  mounted () {
    this.getHtml()
  },
  methods: {
    getHtml () {
      let that = this;
      sponsorDetail(10).then((res) => {
        this.$message.success("添加成功");
        alert("成功")
        console.log(res);
        let resdata = res.data.data;
        that.html = resdata.detalis;
        console.log(that.html)
      }).catch((res) => {

        alert("失败")
      })
    }
  }
};
</script>
