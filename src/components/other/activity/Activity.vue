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
        <el-col :span="2">
          <router-link :to="{path:'/addActiv',query: {name: '新增活动'}}">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
          </router-link>
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
        <el-table-column prop="sponsor" label="赞助商名称" width="120"></el-table-column>
        <el-table-column prop="address" label="活动地点"></el-table-column>
        <el-table-column prop="createTime" label="活动时间" :formatter="FormatTime"></el-table-column>
        <el-table-column prop="sponsorClaim" label="活动要求"></el-table-column>
        <el-table-column prop="publishStatus" label="活动状态" :formatter="status"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: "activityTable",
  data() {
    return{
      tableData: [],
      cur_page: 1,
      cur_rows: 10,
    }
  },
   created() {
    this.getData();
  },

    methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    }
  },
  // 获取数据
    getData() {
    }
}
</script>