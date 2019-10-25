<template>
  <div class="">
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
          <div v-for="item in form.prizeList"
               :key="item.id"
               style="margin-left: 30px;width:152px;height:200px;box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);"
               class="ms-layout-wrap-vertical">
            <img :src="item.iconUrl"
                 style="width:100%;height:92px" />
            <el-tag type="success">{{item.prizeDescription}}</el-tag>
            <el-tag type="success">X {{item.prizeCount}}</el-tag>
            <el-tag type="success">{{item.ranking}}</el-tag>
            <el-button style="position:relative;left:76px;bottom: -12px;box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);"
                       type="danger"
                       icon="el-icon-delete"
                       circle
                       @click="deletePrize(item.id)"></el-button>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="活动形式">
        <mavon-editor v-model="makdown.content"
                      ref="md"
                      @imgAdd="$imgAdd"
                      @change="change"
                      style="min-height: 600px" />
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
          <img :src="prizeForm.prizeUrl"
               style="width:380px;height:230px;" />

          <!-- </div> -->
        </el-form-item>
        <el-form-item label="奖品名称"
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
                   @click="cheosePrizeOk">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择奖品模态框 -->
    <el-dialog title="选择奖品"
               :visible.sync="chosePrizwVisible">
      <div style="width:960px; height:560px;"
           class="">
        <div class=" sm-width-100-per sm-height-10-per sm-layout-center-horizontal">

          <el-autocomplete v-model="prizeDiscription"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入内容"
                           @select="handleSelect"></el-autocomplete>
        </div>
        <div @scroll="onScroll"
             class="sm-width-100-per sm-overflow-y sm-scrollbar-black"
             style="margin: 0 auto;height:520px;">
          <div class="item"
               style="width:190px;margin-right:50px;margin-bottom:10px;"
               v-for="item in PrizeObj.selectPrizeList"
               :key="item.id"
               @click="choseItemPrize(item.id)">
            <img :src="item.iconUrl"
                 style="width:190px;height:115px" />
            <div class="sm-width-100-per sm-layout-center-horizontal "
                 style="height:26px;">{{item.prizeDescription}}</div>
          </div>
          <el-alert title="已经到底部"
                    type="info"
                    style="width:910px"
                    center
                    :closable="false"
                    v-if="chosePrize.endData"
                    show-icon>
          </el-alert>
        </div>
      </div>
      <!-- <div slot="footer"
           class="dialog-footer debug">
        <el-button @click="chosePrizwVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="chosePrizwVisible = false">确 定</el-button>
      </div> -->
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
/* .content {
  width: 1000px;
  margin: 0 2px;
} */
.item {
  /* width: 23%; */
  float: left;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.item:hover {
  float: left;
  box-shadow: none;
  cursor: pointer;
}
.item img {
  width: 100%;
}
</style>
<script>
import { fileUploadURL, addActivity } from "../../../api/index";
import { querySponsor, queryByPrizeDescription } from "../../../api/index";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
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
        prizeList: [],
        state: 1,
        adv: '',
        addCondition: '',
        markdownAdv: ''
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
        loading: false,
        endData: false,
        choseObj: null
      },
      prizeDiscription: '',//查询需要的model
      PrizeObj: {
        pageNum: 1,
        pageSize: 20,
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
      makdown: {
        html: null,
        content: ''
      },
    }
  },
  components: {
    mavonEditor,
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      this.$axios({
        url: fileUploadURL,
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        if (-1 == res.data.code) {
          this.$message.error("上传图片失败！");
        }
        let url = res.data.data;
        this.$refs.md.$img2Url(pos, url);
      });
    },
    change (value, render) {
      // render 为 markdown 解析后的结果
      this.makdown.html = render;
    },
    onSubmit () {
      let that = this;
      let sponsorObj;
      that.sponsorList.some(item => {
        if (item.id == that.value) {
          sponsorObj = item;
          return;
        }
      })
      that.form.sponsorid = sponsorObj.id;
      if (!that.makdown.html || !that.form.sponsorid || !that.makdown.content || !sponsorObj.sponsorName) {
        return;
      }
      debugger
      that.form.adv = that.makdown.html;
      that.form.markdownAdv = that.makdown.content;
      that.form.sponsorName = sponsorObj.sponsorName;
      that.form.location = sponsorObj.location;
      that.form.address = sponsorObj.address;
      if (that.form.conditionType) {
        that.form.conditionType = 1;
      } else {
        that.form.conditionType = 2;
      }

      addActivity(that.form).then(res => {
        let data = res.data;
        if (data.code == -1) {
          //失败
          this.$message.error("新增活动失败！");
        } else if (data.code == 0) {
          that.form.sponsorid = null;
          that.value = null;
          that.makdown.html = null;
          that.makdown.content = null;
          that.form.sponsorName = null;
          that.form.markdownAdv = null;
          that.form = null;
          that.value = null;
          this.$message.success("新增活动成功！");
        }
      }).catch(res => {
        this.$message.error("新增活动失败！");
      })
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
      queryByPrizeDescription(that.PrizeObj.pageNum, that.PrizeObj.pageSize, '').then(res => {
        var resPonData = res.data;
        if (resPonData.code == 0) {
          var pageObj = resPonData.data;
          if (pageObj.pages == that.PrizeObj.pageNum) {
            that.chosePrize.endData = true;
          }
          that.PrizeObj.selectPrizeList = pageObj.list;
        } else {
          //查询失败
        }
      }).catch(res => {

      })
    },
    deletePrize (id) {
      let that = this;
      that.form.prizeList.forEach(item => {
        if (item.id == id) {
          var i = that.form.prizeList.indexOf(item);
          that.form.prizeList.splice(i, 1);
        }
      })
    },
    cheosePrizeOk () {
      let that = this;
      if (!that.prizeForm.ranking || !that.prizeForm.prizeCount || !that.prizeForm.prizeUrl || !that.prizeForm.prizeName) {
        return;
      }
      that.prizwFormVisible = false;
      var paobj = {
        prizeDescription: that.prizeForm.prizeName,
        iconUrl: that.prizeForm.prizeUrl,
        prizeCount: that.prizeForm.prizeCount,
        ranking: that.prizeForm.ranking,
        id: that.prizeForm.id
      }
      if (that.form.prizeList) {
        if (that.form.prizeList.some(item => {
          return (item.id == that.prizeForm.id)
        })) {
          return;
        }
      }
      that.form.prizeList.push(paobj);
    },
    querySearchAsync (queryString, cb) {
      let that = this;
      if (that.chosePrize.loading) {
        return;
      }
      that.chosePrize.endData = false;
      that.PrizeObj.pageNum = 1;
      queryByPrizeDescription(that.PrizeObj.pageNum, that.PrizeObj.pageSize, queryString).then(res => {
        var resPonData = res.data;
        if (resPonData.code == 0) {
          var pageObj = resPonData.data;
          if (pageObj.pages == that.PrizeObj.pageNum) {
            that.chosePrize.endData = true;
          }
          that.PrizeObj.selectPrizeList = pageObj.list;
        } else {
          //查询失败
        }
      }).catch(res => {

      })
    },
    handleSelect (item) {
      console.log(item)
    },
    choseItemPrize (id) {
      let that = this;
      that.PrizeObj.selectPrizeList.forEach(itemObj => {
        if (id == itemObj.id) {
          that.prizeForm.id = itemObj.id;
          that.prizeForm.prizeName = itemObj.prizeDescription;
          that.prizeForm.prizeUrl = itemObj.iconUrl;
        }
      })
      that.chosePrizwVisible = false
    },
    onScroll (res) {
      let that = this;

      if (that.chosePrize.loading || that.chosePrize.endData) {
        return;
      }
      if (res.target.scrollTop % 250 === 0) {
        var ic = res.target.scrollTop / 250;
        if (that.PrizeObj.pageNum > ic) {
          return;
        }
        //加载
        that.PrizeObj.pageNum = that.PrizeObj.pageNum + 1;
        queryByPrizeDescription(that.PrizeObj.pageNum, that.PrizeObj.pageSize, that.prizeDiscription).then(res => {
          var resPonData = res.data;
          if (resPonData.code == 0) {
            var pageObj = resPonData.data;
            if (pageObj.list.length < that.PrizeObj.pageSize) {
              //最后 没有数据可以查询
              that.chosePrize.endData = true;
            }
            if (pageObj.pages == that.PrizeObj.pageNum) {
              that.chosePrize.endData = true;
            }
            pageObj.list.forEach((item) => {
              that.PrizeObj.selectPrizeList.push(item)
            })
            // that.PrizeObj.selectPrizeList = pageObj.list;

          } else {
            //查询失败
          }
          that.chosePrize.loading = false;
        }).catch(res => {
          that.chosePrize.loading = false;
        })
      }
    }
  }
}
</script>