<template>
  <div>
    <el-form ref="form"
             :model="form"
             label-width="80px">
      <el-form-item label="赞助商">
        <el-select v-model="value"
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请输入关键词"
                   :remote-method="remoteSearch"
                   :loading="loading">

          <el-option v-for="sponsorObj in sponsorList"
                     :key="sponsorObj.id"
                     :label="sponsorObj.sponsorName"
                     :value="sponsorObj.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动性质"
                    class="">
        <el-radio-group v-model="form.conditionType"
                        class=""
                        @change="changeRadio">
          <el-radio label="1">时间限制</el-radio>
          <el-radio label="2">人数限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="chaNum == 1"
                    label="">
        <!-- <el-input placeholder="开奖时间"
                v-model="input"
                class="sm-width-30-per"> -->
        <!-- </el-input> -->
        <el-date-picker v-model="form.condition"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        @change="changeTime">
        </el-date-picker>
        <el-input placeholder="请输入内容"
                  v-model="form.conditionalDescription"
                  class="sm-width-30-per">
        </el-input>
      </el-form-item>
      <el-form-item v-if="chaNum == 2"
                    label="">
        <el-input-number placeholder="参与人数"
                         v-model="form.condition"
                         @change="numberChange"
                         :min="1"
                         :max="1000000000"
                         class="sm-width-30-per">
        </el-input-number>
        <el-input placeholder="请输入内容"
                  v-model="form.conditionalDescription"
                  class="sm-width-30-per">
        </el-input>
      </el-form-item>
      <el-form-item label="参与条件">
        <el-input v-model="form.addCondition"
                  class="sm-width-30-per"
                  placeholder="参与条件"></el-input>
      </el-form-item>
      <el-form-item label="赞助要求">
        <el-input type="textarea"
                  :rows="2"
                  class="sm-width-40-per"
                  placeholder="请输入内容"
                  v-model="form.sponsorClaim">
        </el-input>
      </el-form-item>
      <el-form-item label="添加奖品">
        <div style="width:100%;height: 256px;"
             class=" sm-layout-left-center">
          <div @click="addPrize"
               :class="borderStyle"
               style="width:200px;height:200px;border-radius:5px;"
               class=" sm-layout-center-horizontal">
            <i class="el-icon-plus"></i></div>
        </div>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea"
                  v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加奖品模态框 -->
    <el-dialog title="添加奖品"
               :visible.sync="prizwFormVisible">
      <el-form :model="prizeForm">
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-plus"
                     circle
                     @click="chosePrizw"></el-button>
        </el-form-item>
        <el-form-item>
          <!-- <div class="debug ms-layout-wrap-vertical"
               style="widht:256px;height:206px;"> -->
          <img src=""
               style="width:380px;height:230px;" />

          <!-- </div> -->
        </el-form-item>
        <el-form-item label="活动名称"
                      :label-width="formLabelWidth">
          <el-input v-model="prizeForm.prizeName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量"
                      :label-width="formLabelWidth">
          <el-input v-model="prizeForm.prizeCount"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="获取条件"
                      :label-width="formLabelWidth">
          <el-input v-model="prizeForm.ranking"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="prizwFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="prizwFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择奖品模态框 -->
    <el-dialog title="选择奖品"
               :visible.sync="chosePrizwVisible">
      <div style="width:760px; height:560px;"
           class="">
        <div class=" sm-width-100-per sm-height-10-per sm-layout-center-horizontal">

          <el-autocomplete v-model="prizeDiscription"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </div>
        <div class="sm-width-100-per"
             style="margin: 0 auto;">
          <div class="item"
               v-for="item in PrizeObj.selectPrizeList"
               :key="item.id">
            <img :src="item.iconUrl" />
            <div class="sm-width-100-per sm-layout-center-horizontal "
                 style="height:26px;">{{item.prizeDescription}}</div>
          </div>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="chosePrizwVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="chosePrizwVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
.gray_border {
  border: 1px dashed #c0c0c0;
}
.blue_border {
  border: 1px dashed #409eff;
}
.content {
  width: 1000px;
  margin: 0 2px;
}
.item {
  width: 23%;
  float: left;
}
.item img {
  width: 100%;
}
</style>
<script>
import { querySponsor, queryByPrizeDescription } from "../../../api/index";
export default {
  data () {
    return {
      sponsorList: [],
      form: {
        sponsorName: '',
        sponsorid: '',
        location: '',
        address: '',
        conditionType: false,
        condition: '',
        conditionalDescription: null,
        sponsorClaim: '',
        state: 1,
        adv: '',
        addCondition: ''
      },
      value: '',
      loading: false,
      chaNum: 1,
      borderStyle: 'gray_border',
      prizwFormVisible: false,
      formLabelWidth: '120px',
      chosePrizwVisible: false,
      prizeForm: {
        prizeName: null,
        prizeUrl: null,
        prizeCount: 0,
        ranking: null,
      },
      chosePrize: {

      },
      prizeDiscription: '',//查询需要的model
      PrizeObj: {
        pageNum: 1,
        pageSize: 15,
        selectPrizeList: [],
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  methods: {
    onSubmit () {
      console.log(this.value);
    },
    remoteSearch (query) {
      if (query == '') {
        return
      }
      this.loading = true;
      let that = this;
      querySponsor(query).then((res) => {
        that.loading = false;
        let resData = res.data;
        if (resData.code == 0) {
          that.sponsorList = resData.data;
        }
      }).catch((res) => {
        that.loading = false;
        this.$message.error("搜索失败！");
      })
    },
    changeTime (res) {
      console.log(res)
      this.form.conditionalDescription = res;
    },
    numberChange (res) {
      this.form.conditionalDescription = res;
    },
    changeRadio (res) {

      this.form.conditionalDescription = null;
      this.form.condition = null;
      this.chaNum = res;
    },
    addPrize (res) {
      this.borderStyle = "blue_border";
      let that = this;
      setTimeout(function () {
        that.borderStyle = "gray_border";
      }, 200)
      this.prizwFormVisible = true;
    },
    chosePrizw () {
      this.chosePrizwVisible = true;
      let that = this;
      // if (typeof (typeId) == "undefined
      queryByPrizeDescription(that.PrizeObj.pageNum, that.PrizeObj.pageSize, '').then(res => {
        var resPonData = res.data;
        if (resPonData.code == 0) {
          var pageObj = resPonData.data;
          that.PrizeObj.selectPrizeList = pageObj.list;
        } else {
          //查询失败
        }
      }).catch(res => {

      })
    },
    querySearchAsync (queryString, cb) {
      let that = this;
      // if (!queryString) {
      //   return;
      // }
      queryByPrizeDescription(that.PrizeObj.pageNum, that.PrizeObj.pageSize, queryString).then(res => {
        var resPonData = res.data;
        if (resPonData.code == 0) {
          var pageObj = resPonData.data;
          that.PrizeObj.selectPrizeList = pageObj.list;
        } else {
          //查询失败
        }
      }).catch(res => {

      })
      console.log(queryString)
      console.log(cb)
    },
    handleSelect (item) {
      console.log(item);
    }
  }
}
</script>