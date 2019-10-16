<template>
  <div>
    <div class="crumbs">
      <el-row>
        <el-col :span="22">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-lx-calendar"></i> 其它管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>赞助商管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="2">
          <el-button type="primary"
                     icon="el-icon-plus"
                     @click="add()">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-button type="danger"
                       icon="el-icon-delete"
                       class="handle-del mr10"
                       @click="handleDelAll">批量删除</el-button>
          </el-col>
          <el-col :span="3"
                  :offset="3">
            <el-select v-model="typeId"
                       placeholder="请选择赞助商类型">
              <el-option v-for="sponsorObj in sponsorList"
                         :key="sponsorObj.typeName"
                         :label="sponsorObj.typeName"
                         :value="sponsorObj.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="status"
                       placeholder="请选择启用禁用">
              <el-option v-for="item in statusOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>

            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="select_word"
                      placeholder="筛选关键词"
                      class="handle-input mr10"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="search">搜索</el-button>
            <el-button type="info"
                       icon="el-icon-refresh"
                       @click="resert">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tableData"
                border
                class="table"
                ref="multipleTable"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection"
                         width="55"
                         align="center"></el-table-column>
        <el-table-column prop="id"
                         label="赞助商ID"
                         width="100"></el-table-column>
        <el-table-column prop="sponsorName"
                         label="赞助商名称"></el-table-column>
        <el-table-column prop="type"
                         label="赞助商类型"></el-table-column>
        <el-table-column prop="address"
                         label="地点"
                         width="240"></el-table-column>
        <el-table-column prop="creatTime"
                         label="创建时间"
                         :formatter="getTime"
                         width="180"></el-table-column>
        <!-- <el-table-column prop="detalis" v-show="false"></el-table-column> -->
        <el-table-column label="启用禁用"
                         width="120">
          <template slot-scope="scope">
            <el-switch class="status"
                       slot="reference"
                       v-model="scope.row.status"
                       disabled
                       @click.native="handleStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       icon="el-icon-edit"
                       @click="edit(scope.row)">编辑</el-button>
            <el-button type="text"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination sm-margin-top-1rem">
      <el-pagination background
                     layout="prev, pager, next"
                     :page-size="cur_rows"
                     :total="cur_total"
                     :page-count="cur_page_count"
                     :current-page="cur_page"
                     @current-change="currentChange"
                     @prev-click="prevPage"
                     @next-click="nextPage"></el-pagination>
    </div>
  </div>
</template>

<script>
import { sponsor, allsponsorType, statusSponsor } from "../../../api/index";
export default {
  name: "sponsor",
  data () {
    return {
      tableData: [],
      cur_page: 1,
      cur_rows: 10,
      cur_total: 1,
      cur_page_size: 0,
      cur_page_count: 0,
      cur_page_clic: false,
      is_search: false,
      multipleSelection: [],
      sponsorList: [],
      typeId: "",
      select_word: "",
      status: "1",
      statusOption: [
        {
          value: "0",
          label: "禁用"
        },
        {
          value: "1",
          label: "启用"
        },
      ]
    };
  },
  created () {
    this.getData();
    this.getSponsorType();
  },
  methods: {
    /**分页导航 */
    currentChange (e) {
      if (this.cur_page_clic) {
        this.cur_page_clic = false;
        return;
      }
      this.cur_page = e;
      this.getData(this.typeId, this.select_word, this.status);
    },
    prevPage: function (e) {
      this.cur_page -= 1;
      this.getData(this.typeId, this.select_word, this.status);
      this.cur_page_clic = true;
    },
    nextPage: function (e) {
      this.cur_page += 1;
      this.getData(this.typeId, this.select_word, this.status);
      this.cur_page_clic = true;
    },

    /**获取数据 */
    getData (typeId, select_word, status) {
      if (!typeId) { }
      if (typeof (typeId) == "undefined") {
        typeId = "";
      }
      if (typeof (select_word) == "undefined") {
        select_word = "";
      }
      if (typeof (status) == "undefined") {
        status = 1;
      }
      sponsor(this.cur_page, this.cur_rows, typeId, select_word, status).then(res => {
        this.tableData = res.data.data.list;
        this.cur_total = res.data.data.total;
        this.cur_page_size = res.data.data.list.length;
        for (var i = 0; i < this.tableData.length; i++) {
          console.log(this.tableData[i].status);
          switch (this.tableData[i].status) {
            case 0:
              this.tableData[i].status = false;
              break;
            case 1:
              this.tableData[i].status = true;
              break;
            default:
          }
        }
      });
    },

    /**获取赞助商类型 */
    getSponsorType () {
      allsponsorType().then((res) => {
        const dataObj = res.data;
        if (dataObj.code == 0) {
          this.sponsorList = dataObj.data;
        }
      })
    },
    /**时间解析*/
    add0 (m) {
      return m < 10 ? "0" + m : m;
    },
    getTime (row, column) {
      var time = new Date(row.creatTime);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
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
        this.add0(s)
      );
    },
    /**查询*/
    search () {
      this.getData(this.typeId, this.select_word, this.status);
      this.is_search = true;
    },
    /**重置*/
    resert () {
      this.typeId = "";
      this.select_word = "";
      this.status = "1";
      this.getData();
    },

    /**状态*/
    handleStatus (row) {
      if (row.status == true) {
        this.$confirm("禁用该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            statusSponsor(row.id, row.status).then(resoponse => {
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

      } else if (row.status == false) {
        this.$confirm("启用该类型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            statusSponsor(row.id, row.status).then(resoponse => {
              if (resoponse.status == 200) {
                this.$message({
                  type: "success",
                  message: "启用成功!"
                });
                this.getData();
              }
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

    /**新增*/
    add () {
      this.$router.push({
        path: "/addsponsor",
        query: {
          name: "新增赞助商"
        }
      });
    },

    /**编辑*/
    edit (row) {
      this.$router.push({
        path: "/editsponsor",
        query: {
          name: "编辑赞助商",
          id: row.id,
          typeName: row.type,
          typeId: row.typeId,
          sponsorName: row.sponsorName,
          address: row.address,
          markDown: row.markDown,
          detalis: row.detalis,
          location: row.location
        }
      });
    },

    /**批量删除*/
    handleDelAll () {
      var length = this.multipleSelection.length;
      if (length == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
    },
    handleSelectionChange (e) {
      this.multipleSelection = e;
    }
  }
};
</script>