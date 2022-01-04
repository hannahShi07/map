<template>
  <div class="instructor-record">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="returnTable"
          :data="tableData"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导企业" min-width="120px" align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'enterpriseName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="组织名称" min-width="120px"  align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="指导方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'manner.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导时间" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'guidanceTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="editBtn(row)">详情</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
    <record-info ref="refInfo" />
  </div>
</template>

<script>
import {recordList} from "@/api/backstage/consulting/enterprise/instructor/instructor.js"
import RecordInfo from './record-info'
export default {
  name: "InstructorRecord",
  components: {
    RecordInfo
  },
  data() {
    return {
      visible:false,
      title:"指导记录",//标题
      total:0,
      pageNum:1,
      pageSize:10,
      options:[
        {
          label:"是",
          value:0
        },
        {
          label:"否",
          value:1
        }
      ],
      tableData:[],
      node:{},
      imageUrl:'',
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    close(){
      this.tableData = [],
      this.visible=false;
    },
    show(t,row){
      this.visible=true;
      this.pageChange(row.id)
    },
    editBtn (row) {
      this.$refs['refInfo'].show(row)
    },
    pageChange(id){
      let params = {
        current: this.pageNum,
        model: {
          guidanceId:id
        },
        size: this.pageSize,

      }
      this.loading = true;
      recordList(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {

      });
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 902px;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information-left,.information-right{
    float: left;
    width: 50%;
    height: 212px;
  }
  .information-bottom{
    float: left;
    width: 100%;
  }
  .information-left >>> .el-form-item__content{
    line-height: 34px;
  }
  .information-left >>> .el-form-item__label{
    line-height: 34px;
  }
  .information{
    padding:20px;
    padding-left: 0;
  }
  .warning{
    display: inline-block;
  }
  .person-img{
    margin-left: 53px;
  }
</style>
