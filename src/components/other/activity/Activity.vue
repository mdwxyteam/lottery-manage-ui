<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 其它管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
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

        <router-link style="margin-left:15px;" :to="{path:'/addActiv',query: {name: '新增活动'}}">
          <el-button type="primary" icon="el-icon-plus">新增</el-button>
        </router-link>
      </el-row>
    </div>

    <el-table :data="tableData" border class="table" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="sponsorName" label="赞助商名称" width="120"></el-table-column>
      <el-table-column prop="address" label="活动地点"></el-table-column>
      <el-table-column prop="conditionalDescription" label="活动时间"></el-table-column>
      <el-table-column prop="sponsorClaim" label="活动要求"></el-table-column>
      <el-table-column prop="state" label="活动进度"></el-table-column>
      <el-table-column label="启用禁用" width="120">
        <template slot-scope="scope">
          <el-switch
            class="status"
            slot="reference"
            v-model="scope.row.delState"
            @click.native="handleStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            style="margin-left: 15px;"
            type="text"
            icon="el-icon-view"
            @click="handleEdit(scope.$index, scope.row)"
          >详情</el-button>
          <!-- <el-button type="text"
                     icon="el-icon-delete"
                     class="red"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
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
  name: "activityTable",
  data() {
    return {
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
    handleEdit(row) {
      console.log(row);
      this.$router.push({
        path: "/EditActivity",
        query: row
        // query: {
        //   name: "编辑活动",
        //   id: row.id,
        //   sponsorid: row.sponsorid,
        //   sponsorName: row.sponsorName,
        //   location: row.location,
        //   address: row.address,
        //   conditionType: row.conditionType,
        //   condition: row.condition,
        //   conditionalDescription: row.conditionalDescription,
        //   sponsorClaim: row.sponsorClaim,
        //   adv: row.adv,
        //   addCondition: row.addCondition,
        //   markdownAdv: row.markdownAdv
        // }
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