<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 其它管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>奖品管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2">
          <router-link :to="{path:'/addPrize',query: {name: '新增奖品'}}">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="sm-layout-left-center-wrap  ">
        <el-card
          v-for="(prize , index) in tableData"
          :key="index"
          shadow="hover"
          style="width:300px;"
          class="sm-margin-left-2rem sm-margin-top-1rem"
        >
          <img :src="prize.iconUrl" class="image" />
          <div class="prize-div">
            <div class="desciption" style="height:50px">奖品描述：{{prize.prizeDescription}}</div>
            <div class="bottom clearfix">
              <div class="count">奖品数量：{{prize.prizeCount}}</div>
              <el-button type="text" class="button" @click="edit(item)">修改</el-button>
              <el-button type="text" class="button" @click="del(item)">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="pagination sm-margin-top-1rem">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="cur_rows"
          :total="cur_total"
          :page-count="cur_page_count"
          :current-page="cur_page"
          @current-change="currentChange"
          @prev-click="prevPage"
          @next-click="nextPage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { prize } from "../../../api/index";
export default {
  data() {
    return {
      tableData: [],
      cur_page: 1,
      cur_rows: 10,
      cur_total: 1,
      cur_page_size: 0,
      cur_page_count: 0,
      cur_page_clic: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    /**分页导航 */
    currentChange(e) {
      if (this.cur_page_clic) {
        this.cur_page_clic = false;
        return;
      }
      this.cur_page = e;
      this.getData();
    },
    prevPage: function(e) {
      this.cur_page -= 1;
      this.getData();
      this.cur_page_clic = true;
    },
    nextPage: function(e) {
      this.cur_page += 1;
      this.getData();
      this.cur_page_clic = true;
    },
    currentChange: function(e) {
      if (this.cur_page_clic) {
        this.cur_page_clic = false;
        return;
      }
      this.cur_page = e;
      this.getData();
    },

    /**获取数据 */
    getData() {
      prize(this.cur_page, this.cur_rows).then(res => {
        console.log(res.data.data.list);
        this.tableData = res.data.data.list;
        this.cur_total = res.data.data.total;
        this.cur_page_size = res.data.data.list.length;
      });
    },

    /**编辑 */
    edit(i) {
      this.$router.push({
        path: "/editPrize",
        query: {
          name: "编辑",
          title: i.title,
          count: i.count,
          imgUrl: i.imgUrl
        }
      });
    },
    /**删除*/
    del(i) {
      this.$confirm("删除该奖品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.prize-div {
  padding: 10px;
  /* width: 100%; */
}
.desciption {
  font-size: 14px;
}
.count {
  font-size: 10px;
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
