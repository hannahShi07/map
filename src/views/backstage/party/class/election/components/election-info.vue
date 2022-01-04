<template>
  <div class="election-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak
      v-loading="loading">
      <el-form ref="refForm" :model="formData" class="information">
        <div class="title">换届信息</div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="组织名称" prop="orgName">
              <div>{{isEmpty(formData,'orgId.data')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="本届任期" prop="term">
              <div>{{isEmpty(formData,'term.data')}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="换届日期" prop="transitionDate">
              <div>{{isEmpty(formData,'transitionDate')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="届满日期" prop="endDate">
              <div>{{isEmpty(formData,'endDate')}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选举方式" prop="electionWay">
              <div>{{isEmpty(formData,'electionWay.data')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="title">换届信息</div>
      <!-- 表格 -->
      <div class="buttom">
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          header-row-class-name="page-table-header"
          ref="returnTable"
          :data="records"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党内职务" min-width="100px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'position.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属组织" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="任职日期" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'officeDate')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {electionInfo} from "@/api/backstage/party/class/election/election.js"
  import commonReq from "@/api/public/commonReq";
  export default {
    name: "ElectionInfo",
    components: {

    },
    data() {
      return {
        visible:false,
        title:"详情",
        pageNum:1,
        pageSize:10,
        total:0,
        loading:false,
        formData:{
          id:'',
          orgId:{
            data:"",
            key:""
          },
          term:{// 本届任期
            data:"",
            key:""
          },
          transitionDate:"",// 换届日期
          endDate:"",// 届满日期
          electionWay:{// 选举方式
            data:"",
            key:""
          },
          leadershipIds:[]//班子成员ID
        },
        records:[{}]
      }
    },
    mounted() {

    },
    computed: {

    },
    watch: {

    },
    methods: {
      //关闭弹窗
      close(){
        this.records=[{}];
        this.formData = {
          id:0,
          orgId:{
            data:"",
            key:""
          },
          term:{
            data:"",
            key:""
          },
          transitionDate:"",
          endDate:"",
          electionWay:{
            data:"",
            key:""
          },
          leadershipIds:[]//班子成员ID
        }
        this.visible = false;
      },
      // 展示
      show(type,row){
        this.getInfo(row)
        this.visible = true;
      },
      // 获取编辑信息
      getInfo(row){
        let params={
          id:row.id
        }
        electionInfo(params).then(response => {
          this.formData=response;
          this.formData.leadershipIds=[];
          this.records=response.leadershipList;
          this.loading=false;
        }).finally(() => {
          this.loading=false;
        });

      }
    }
  }
</script>

<style scoped>
  .election-info >>> .el-dialog{
    width: 887px;
  }
  .election-info >>> .el-input{
    width: 300px;
  }
  .election-info >>> .el-dialog__body{
    padding:15px 0px;
  }
  .information{
    padding-bottom: 10px;
  }
  .fl{
    padding: 20px 0;
  }
  .election-info >>> .el-form-item__label{
    width: 80px;
  }
  .election-info >>> .el-row{
    padding:0 20px;
  }
  .election-info >>>.el-form-item{
    margin: 0;
    padding:11px 0;
    border-top: 1px solid #EEE;
  }
  .title{
    height: 70px;
    line-height: 45px;
    color: #666666;
    font-size: 16px;
    padding: 0 20px;
    padding-top: 10px;
    padding-left: 30px;
    font-weight: bold;
    border-bottom: 1px solid #EEE;
    border-top: 10px solid #f3f3f3;
  }
  .information .title{
    padding-top: 0px;
    height: 45px;
    line-height: 35px;
    border-bottom: none;
    border-top: none;
  }
  .buttom{
    margin-top: 20px;
    padding: 0 20px;
  }
</style>
