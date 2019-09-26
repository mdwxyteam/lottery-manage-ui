<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i>其它管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>赞助商类型</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2">
          <router-link :to="{path:'/addsponsortype',query: {name: '新增赞助商类型'}}">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <div class="container">
        <div class="handle-box">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-button
                type="danger"
                icon="el-icon-delete"
                class="handle-del mr10"
                @click="handleDelAll"
              >批量删除</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="id" label="类型ID" width="100"></el-table-column>
          <el-table-column prop="typeName" label="类型名称"></el-table-column>
          <el-table-column label="启用禁用" width="120">
            <template slot-scope="scope">
              <el-switch
                class="status"
                slot="reference"
                v-model="scope.row.isStatus"
                 disabled="true"
                @click.native="handleStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="sm-layout-bottom-center sm-width-100-per"
          style="height:76px;justify-content: flex-end;"
        >
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
  </div>
</template>

<script>
import { sponsorType } from "../../../api/index";
import { statusType } from "../../../api/index";
export default {
  name: "sponsorTypeTable",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      cur_rows: 10,
      cur_total: 1,
      cur_page_size: 0,
      cur_page_count: 0,
      cur_page_clic: false,
      multipleSelection: []
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
      sponsorType(this.cur_page, this.cur_rows).then(res => {
        this.tableData = res.data.data.list;
        this.cur_total = res.data.data.total;
        this.cur_page_size = res.data.data.list.length;
        for (var i = 0; i < this.tableData.length; i++) {
          switch (this.tableData[i].isStatus) {
            case 0:
              this.tableData[i].isStatus = false;
              break;
            case 1:
              this.tableData[i].isStatus = true;
              break;
            default:
          }
        }
      });
    },

    /**编辑 */
    handleEdit(row) {
      this.$router.push({
        path: "/editsponsortype",
        query: {
          name: "编辑赞助商类型",
          id: row.id,
          typeName: row.typeName
        }
      });
    },

    /**状态启用 */
    handleStatus(row) {
      if (row.isStatus == true) {
        this.$confirm("禁用该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            statusType(row.id, row.isStatus).then(resoponse => {
              if (resoponse.status == 200) {
                this.$message({
                  type: "success",
                  message: "禁用成功!"
                });
                this.getData();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消禁用"
            });
          });
      } else if (row.isStatus == false) {
        this.$confirm("启用该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            statusType(row.id, row.isStatus).then(resoponse => {
              if (resoponse.status == 200) {
                this.$message({
                  type: "success",
                  message: "启用成功!"
                });
              }
              this.getData();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用"
            });
          });
      }
    },

    /**单个删除 */
    handleDelete(row) {
      this.$confirm("删除该类型, 是否继续?", "提示", {
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
          row.isStatus = false;
        });
    },

    /**批量删除*/
    handleDelAll() {
      var length = this.multipleSelection.length;
      if (length == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
      var ids = new Array();
      for (var i = 0; i < length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      this.$confirm("删除这" + length + "个类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          del(ids).then(resoponse => {
            if (resoponse.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(e) {
      this.multipleSelection = e;
    }
  }
};
</script>