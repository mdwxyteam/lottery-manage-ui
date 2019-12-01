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
        >售卖中</el-button>
        <el-button type="primary" icon="el-icon-search" @click="conditionLimit(2)">售卖结束</el-button>
        <el-button type="primary" icon="el-icon-search" @click="conditionLimit(3)">售卖准备中</el-button>
        <el-button type="primary" icon="el-icon-search" @click="conditionLimit(-1)">已删除</el-button>

        <router-link style="margin-left:15px;" :to="{path:'/addCommodity',query: {name: '新增商品'}}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-row>
    </div>

    <!-- 商品列表 -->
    <div class="sm-layout-left-center-wrap" style>
      <el-card
        :body-style="{ padding: '0px' }"
        style="width: 230px;height:240px"
        shadow="hover"
        class="sm-margin-right-1rem sm-margin-bottom-1rem"
        v-for="item in tableData"
        :key="item.id"
      >
        <img :src="item.goodsImg" class="image" />
        <div style="padding: 10px;">
          <span>{{item.goodsName}}</span>
          <div class="bottom clearfix sm-layout-left-center-wrap" style="align-items:flex-start">
            <span class="time" style="color: red">￥{{item.price}}</span>
            <span class="time margin-left-20" style>已售出：{{item.payNum}}份</span>
            <el-button
              v-if="item.status"
              style="position:relative;left:15px;top: -62px;box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(item.id)"
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
import {
  pageActivity,
  delActivity,
  querySponsor,
  pageGoods
} from "../../../api/index";
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
        state: 3,
        goodsName: ""
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
    handleEdit(id) {
      console.log(id);
      let dataItem = null;
      console.log(this.tableData);
      this.tableData.some((item, i) => {
        if (item.id == id) {
          dataItem = item;
          return true;
        }
      });
      console.log(dataItem);
      this.$router.push({
        path: "/editCommodity",
        query: dataItem
      });
    },
    /**条件搜索 */
    conditionLimit(state) {
      this.pageRequestObj.state = state;
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
      pageGoods(this.pageRequestObj)
        .then(res => {
          let resData = res.data;
          that.pageResponse.total = resData.data.total;
          that.pageResponse.pages = resData.data.pages;
          that.pageResponse.pageSize = resData.data.pageSize;
          that.pageResponse.pageNum = resData.data.pageNum;
          if (resData.code == 0) {
            resData.data.list.some(item => {
              //   if (item.delState == 1) {
              //     item.delState = true;
              //   } else {
              //     item.delState = false;
              //   }
              if (item.state == 1) {
                item.status = false;
              } else {
                item.status = true;
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
      this.pageRequestObj.goodsName = query;
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