<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 拼购管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
      <el-row>
        <el-autocomplete v-model="value" placeholder="请输入内容" :fetch-suggestions="remoteSearch"></el-autocomplete>

        <el-button
          style="margin-left: 15px;"
          type="primary"
          icon="el-icon-search"
          @click="conditionLimit(1)"
        >时间限制</el-button>
        <el-button type="primary" icon="el-icon-search" @click="conditionLimit(2)">人数限制</el-button>

        <router-link style="margin-left:15px;" :to="{path:'/addCommodity',query: {name: '新增商品'}}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-row>
    </div>

    <!-- 商品列表 -->
    <div class="sm-layout-left-center-wrap" style>
      <el-card
        :body-style="{ padding: '0px' }"
        style="width: 230px;height:300px"
        shadow="hover"
        class="sm-margin-right-1rem sm-margin-bottom-1rem"
      >
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 10px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix sm-layout-left-center-wrap" style="align-items:flex-start">
            <span class="time" style="color: red">￥5999</span>
            <span class="time margin-left-20" style>已售出：3600份</span>
            <el-button
              style="position:relative;left:15px;top: -62px;box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="deletePrize(item.id)"
            ></el-button>
          </div>
        </div>
      </el-card>
    </div>

    <div class="pagination sm-margin-top-1rem">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageResponse.pageSize"
        :total="pageResponse.total"
        :page-count="pageResponse.pages"
        :current-page="pageResponse.pageNum"
        @current-change="currentChange"
        @prev-click="prevPage"
        @next-click="nextPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { pageActivity, delActivity, querySponsor } from "../../../api/index";
export default {
  name: "commodity",
  data() {
    return {
      currentDate: new Date(),
      tableData: [],
      sponsorList: [],
      curPageClic: false,
      value: "",
      loading: false,
      pageRequestObj: {
        pageNum: 1,
        pageSize: 15,
        conditionType: 1,
        sponsorName: ""
      },
      pageResponse: {
        total: 0,
        pages: 0,
        pageSize: 0,
        pageNum: 1
      }
    };
  },
  created() {
    this.getData();
  },

  methods: {
    /**新增*/
    add() {
      alert("oadd");
      this.$router.push({
        path: "/addCommodity",
        query: {
          name: "新增商品"
        }
      });
    },
    handleEdit(row) {
      console.log(row);
      this.$router.push({
        path: "/EditActivity",
        query: {
          name: "编辑活动",
          id: row.id,
          sponsorid: row.sponsorid,
          sponsorName: row.sponsorName,
          location: row.location,
          address: row.address,
          conditionType: row.conditionType,
          condition: row.condition,
          conditionalDescription: row.conditionalDescription,
          sponsorClaim: row.sponsorClaim,
          adv: row.adv,
          addCondition: row.addCondition,
          markdownAdv: row.markdownAdv
        }
      });
    },
    /**条件搜索 */
    conditionLimit(conditionType) {
      this.pageRequestObj.conditionType = conditionType;
      this.getData();
    },
    // 分页导航
    currentChange(val) {
      if (this.curPageClick) {
        this.curPageClick = false;
        return;
      }
      this.pageRequestObj.pageNum = val;
      this.getData();
    },
    prevPage: function(e) {
      this.pageRequestObj.pageNum -= 1;
      this.getData();
      this.curPageClick = true;
    },
    nextPage: function(e) {
      this.pageRequestObj.pageNum += 1;
      this.getData();
      this.curPageClick = true;
    },
    // 获取数据
    getData() {
      let that = this;
      pageActivity(this.pageRequestObj)
        .then(res => {
          let resData = res.data;
          that.pageResponse.total = resData.data.total;
          that.pageResponse.pages = resData.data.pages;
          that.pageResponse.pageSize = resData.data.pageSize;
          that.pageResponse.pageNum = resData.data.pageNum;
          if (resData.code == 0) {
            resData.data.list.some(item => {
              if (item.delState == 1) {
                item.delState = true;
              } else {
                item.delState = false;
              }
              if (item.state == 1) {
                item.state = "进行中…";
              } else {
                item.state = "已结束…";
              }
            });
            that.tableData = resData.data.list;
          }
        })
        .catch(res => {
          this.$message.error("查询数据失败");
        });
    },
    remoteSearch(query) {
      console.log(query);
      this.loading = true;
      let that = this;
      this.pageRequestObj.pageNum = 1;
      this.pageRequestObj.pageSize = 15;
      this.pageRequestObj.sponsorName = query;
      this.getData();
    },
    handleStatus(row) {
      if (!row) {
        return;
      }
      var state;
      if (row.delState) {
        state = 1;
      } else {
        state = 0;
      }
      delActivity(row.id, state)
        .then(res => {
          let resData = res.data;
          if (resData.code == 0) {
          } else {
          }
        })
        .catch(res => {});
    }
  }
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>