<template>
  <div class="dues-record">
    <div class="record-content">
      <!-- 按钮区 -->
      <div class="dues-information">
        <el-form ref="form" :model="duesForm" label-width="80px">
          <el-row>
            <el-col :span="24">
              <div class="title">缴费信息</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="缴费人">
                <div>{{isEmpty(duesForm,'memberName')}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系方式">
                <div>{{isEmpty(duesForm,'phone')}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号">
                <div>{{isEmpty(duesForm,'idCard')}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="缴费状态">
                <div>{{isEmpty(duesForm,'state') | duesState}}</div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收费组织">
                <div>{{isEmpty(duesForm,'orgName')}}</div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="record">
        <el-row>
          <el-col :span="24">
            <div class="title">缴费记录</div>
            <base-page-button title="导出" imgType="export" @click="editBtn(3)" />
          </el-col>
        </el-row>
        <div class="mr-20 ml-20 mt-20">
          <el-table
            class="table"
            tooltip-effect="dark"
            style="width:100%;margin: 0 auto"
            ref="duesTable"
            :data="duesTable"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column label="收费组织" min-width="240px" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'org.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="党费性质" min-width="80px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'moneyType.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="缴费月份" min-width="160px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'payMonth')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交日期" min-width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'createTime')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="月实缴金额" min-width="100px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'amount')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="审核状态" width="100" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(duesTable[scope.$index],'auditState.data')}}</span>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button @click="back()">返 回</el-button>
    </div>
  </div>
</template>

<script>
import {duesRecord,getHistoryExportRec} from "@/api/backstage/party/partymember/dues/dues.js"
export default {
  name: "duesRecord",
  components: {},
  props:{
    params:{
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      memberId:"",
      total:1,
      pageNum:1,
      pageSize:10,
      duesForm:{},
      duesTable:[]
    }
  },
  mounted(){
    this.duesForm = this.params.params
    this.memberId = this.params.params.memberId
    this.pageChange()
  },
  methods: {
    // 列表请求
    pageChange () {
      let params = {
        current: this.pageNum,
        model: {
          memberId:this.memberId
        },
        size: this.pageSize
      }
      this.loading = true;
      duesRecord(params).then(response => {
        this.duesTable = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          this.$refs['refAdd'].show(t)
          break

        case 2://导入
          // this.$refs['refImport'].show(t, row)
          break

        case 3://导出
          this.exportExc()
          break
      }
    },
    exportExc(){
      let params = {
        memberId:this.memberId
      }
      getHistoryExportRec(params);
    },
    back(){
      this.$emit('handleSwitch', {name: 'Index'});
    }
  },
  filters:{
    duesState(val){
      switch(val){
        case 1:
          return " 未缴";
          break;
        case 2:
          return "欠费";
          break;
        case 3:
          return "正常";
          break;
      }
    }
  }
}
</script>

<style scoped>
.dues-record{
  background-color: #eee;
  height: calc(100vh - 152px);
}
.record-content{
  height: calc(100vh - 207px);
  overflow: auto;
}
.dues-information{
  width: 100%;
  height: 159px;
  background-color: #fff;
  border-radius: 4px;
}
.dues-information >>> .el-row{
  height: 51px;
  border-bottom: 1px solid #eee;
  padding: 5px 20px;
}
.dues-information >>> .el-form-item__label{
  text-align: left;
}
.dues-information >>> .el-row:nth-of-type(3){
  border-bottom: none;
}
.title{
  width: calc(100% - 100px);
  line-height: 40px;
  float: left;
  color: #666;
  font-weight: bold;
  font-size: 16px;
}
.page-search-box{
  padding: 0;
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
.record{
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 20px;
}
.record >>> .el-row{
  height: 51px;
  border-bottom: 1px solid #eee;
  padding: 5px 20px;
}
.record >>> .page-btn{
  width: 80px;
  min-width: unset;
}
.dialog-footer{
  width: 100%;
  background-color: white;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  z-index: 2;
}
.dialog-footer >>> .el-button{
  height: 34px;
}
</style>
