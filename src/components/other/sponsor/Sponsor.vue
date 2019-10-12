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
            <el-button type="primary" icon="el-icon-plus" @click="add()">新增</el-button>
        </el-col>
      </el-row>
    </div>
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
          <el-table-column prop="id" label="赞助商ID" width="100"></el-table-column>
          <el-table-column prop="sponsorName" label="赞助商名称"></el-table-column>
          <el-table-column prop="type" label="赞助商类型"></el-table-column>
          <el-table-column prop="address" label="地点" width="240"></el-table-column>
           <el-table-column prop="creatTime" label="创建时间" :formatter="getTime" width="180"></el-table-column>
          <el-table-column label="启用禁用" width="120">
            <template slot-scope="scope">
              <el-switch
                class="status"
                slot="reference"
                v-model="scope.row.isStatus"
                disabled
                @click.native="handleStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <!--<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>-->
            </template>
          </el-table-column>
      </el-table> 
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
</template>

<script>
import {sponsor} from "../../../api/index";
export default {
  name: "sponsor",
  data() {
    return {
      tableData: [],
      cur_page: 1,
      cur_rows: 10,
      cur_total: 1,
      cur_page_size: 0,
      cur_page_count: 0,
      cur_page_clic: false,
      multipleSelection: [],
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
      sponsor(this.cur_page, this.cur_rows).then(res => {
        this.tableData = res.data.data.list;
      })
    },

    /**时间解析*/
    add0(m){
       return m<10?'0'+m:m
    },
    getTime(row, column) {
           var time = new Date(row.creatTime);
           var y = time.getFullYear();
           var m = time.getMonth()+1;
           var d = time.getDate();
           var h = time.getHours();
           var mm = time.getMinutes();
           var s = time.getSeconds();
           return y +'-'+ m +'-'+ d +' '+this.add0(h)+ ':'+ this.add0(mm)+':' + this.add0(s);
},
    // addSponsor: function() {
    //   this.$data.addDrawer = true;
    //   console.log(this.addDrawer);
    // },
     /**新增*/
    add() {
      this.$router.push({
        path: "/addsponsor",
        query: {
          name: "新增赞助商",
        }
      });
    },

     /**批量删除*/
    handleDelAll() {
      var length = this.multipleSelection.length;
      if (length == 0) {
        this.$message.error("请选择一条数据");
        return;
      }
    }, 
      handleSelectionChange(e) {
      this.multipleSelection = e;
    }
  }
};
</script>