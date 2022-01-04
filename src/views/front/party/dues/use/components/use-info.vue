<template>
  <div class="use-info">
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
        <el-table-column label="类型" width="279px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="总金额" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'totalAmount')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty" :isSmall="true"/>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import {getUseInfo} from "@/api/front/party/dues/use/use.js"
  export default {
    name: "UseAdd",
    components: {

    },
    data() {
      return {
        visible:false,
        loading:false,
        title:"详情",//标题
        orgName:"",
        tableData:[
          {
            totalAmount:0,
            type: {
              data: "",
              key: 0
            },
          }
        ],
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      //取消
      close(){
        this.tableData=[
          {
            totalAmount:0,
            type: {
              data: "",
              key: 0
            },
          }
        ],
        this.visible = false;
      },
      //展示
      show(orgName,orgId,useDate){
        this.visible=true;
        this.orgName=orgName;
        this.getInfo(orgId,useDate);
      },
      getInfo(orgId,useDate){
        useDate = useDate+"-01-01";
        let params={
          orgId:orgId,
          useDate:useDate
        }
        getUseInfo(params).then(response => {
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
  .use-info >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .use-info >>> .el-dialog{
    width: 500px;
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
  .use-info >>> .cell{
    width: 100%;
    font-weight: 400;
  }
</style>
