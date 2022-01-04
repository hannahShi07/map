<template>
  <div class="collection-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <div class="title"><img src="../../../../../../assets/page/icon-warning.png" />{{orgName}}</div>
      <el-table class="base-table" border :data="tableData"   header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor:pointer">{{isEmpty(tableData[scope.$index],'memberName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第一季度" width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateOne.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="第二季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateSec.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="第三季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateTh.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="第四季度" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'stateFou.data')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty" :size="740"/>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import {getCollectionDetail} from "@/api/front/party/dues/collection/collection.js"
  export default {
    name: "ReturnAdd",
    components: {

    },
    data() {
      return {
        visible:false,
        loading:false,
        title:"收缴明细",//标题
        orgName:"",
        tableData:[
          {
            collectionDate: "",//缴纳时间
            memberName: "",//	党员名称
            org: {//	组织
              data: "",
              key: 0
            },
            orgCode: 0,//	组织编码
            orgId: 0,//组织id
            orgName: "",//组织名称
            stateFou: {//第四季度是否交清
              data: "",
              key: 0
            },
            stateOne: {//第一季度是否交清
              data: "",
              key: 0
            },
            stateSec: {//第二季度是否交清
              data: "",
              key: 0
            },
            stateTh: {//第三季度是否交清
              data: "",
              key: 0
            },
            totalAmount: 0//缴纳总额
          }
        ],
        options: [],//组织
        node:{
          orgName:{
            required: true,
            message: "请选择返还组织",
            trigger: "blur"
          },
          category:{
            required: true,
            message: "请选择返还年份",
            trigger: "blur"
          },
          memberCnt:{
            required: true,
            message: "请输入返还金额",
            trigger: "blur"
          },
        }
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      //取消
      close(){
        this.visible = false;
      },
      //展示
      show(id,orgName,noticeDate){
        this.visible=true;
        this.orgName=orgName;
        this.getInfo(id,noticeDate);
      },
      getInfo(id,noticeDate){
        let params={
          orgId:id,
          collectionDate:noticeDate
        }
        getCollectionDetail(params).then(response => {
          this.tableData = response;
          this.loading=false;
        }).finally(() => {
          this.loading=false;
        });
      }
    }
  }
</script>

<style scoped>
  .collection-info >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .collection-info >>> .el-dialog{
    width: 740px;
  }
  .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #3D9EFF;
    background-color: rgba(61, 158, 255, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .title img{
    height: 16px;
    width: 16px;
    margin:12px;
    float: left;
  }
  .collection-info >>> .cell{
    width: 100%;
    font-weight: 400;
  }
</style>
