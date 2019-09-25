<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> lottery
        </el-breadcrumb-item>
        <el-breadcrumb-item>新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-divider content-position="left">赞助商</el-divider>
          <div class="width-250-height-156-px sm-layout-left-center">
            <div class="sm-layout-top-center" style="height:100%;width:40%">
              <div class="ms-layout-wrap-vertical" style="width: 100%;height:20%">
                <el-button
                  @click="addSponsor"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  round
                >添加赞助商</el-button>
              </div>
            </div>
            <div class="ms-layout-wrap-vertical" style="height:100%;width:40%">
              <el-card class="margin-left-20" shadow="hover">
                <div class="width-80-height-100-px ms-layout-wrap-vertical"></div>
              </el-card>
            </div>
          </div>

          <el-divider content-position="left">奖品设置</el-divider>

          <div class="sm-layout-top-center-with-wrap" style="width:650px">
            <div class="sm-width-80-per">
              <el-carousel :interval="5000" arrow="always" class type="card" height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </div>

            <div class="sm-width-80-per sm-layout-left-center">
              <div class="sm-layout-top-center">
                <el-tag type="info">一等奖 纸包鱼 * 3</el-tag>
                <el-button
                  class="sm-margin-top-1rem"
                  @click="addSponsor"
                  type="primary"
                  icon="el-icon-circle-plus-outline"
                  round
                >添加奖品</el-button>
              </div>
            </div>
          </div>

          <el-divider content-position="left">开奖条件</el-divider>
          <div class="sm-layout-left-center" style="height:56px;">
            <div class="sm-layout-right-center" style="height:100%;">
              <el-button
                class="sm-margin-left-2rem"
                @click="addSponsor"
                type="primary"
                icon="el-icon-circle-plus-outline"
                round
              >添加开奖条件</el-button>
              <el-tag class="sm-margin-left-1rem" type="info">2019-08-07 14:22:15 自动开奖</el-tag>
            </div>
          </div>

          <el-divider content-position="left">参与要求</el-divider>
          <el-divider content-position="left">地址</el-divider>
          <el-divider content-position="left">赞助商简介</el-divider>
          <el-form-item label="文本框">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style>
.width-80-height-100-px {
  width: 80px;
  height: 100px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script>
export default {
  name: "baseform",
  data: function() {
    return {
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区"
                },
                {
                  value: "haizhu",
                  label: "海珠区"
                }
              ]
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇"
                },
                {
                  value: "humen",
                  label: "虎门镇"
                }
              ]
            }
          ]
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区"
                }
              ]
            }
          ]
        }
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: []
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message.success("提交成功！");
    }
  }
   // for (var i = 0; i < tabDataList.length; i++) {
              //   var dataObj = that.tableData[i];
              //   if (id == dataObj.id) {
              //     //tabDataList 移除 这个dataObj对象，然后tabDataList 赋值给tableData
              //     tabDataList.splice(i, 1);//这个删除方法有问题，去网上找一个

              //     console.log(tabDataList)
              //     break;
              //   }
              // }
              // that.tableData = tabDataList;
};
</script>