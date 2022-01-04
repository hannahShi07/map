<template>
  <div class="publicity-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <ul class="publicity-title">
        <li>
          <div class="title-left">标题</div>
          <div class="title-right">{{publicityTitle}}</div>
        </li>
        <li>
          <div class="title-left">公示时间</div>
          <div class="title-right">{{noticeDate}}年{{noticeQuarter}}</div>
        </li>
        <li>
          <div class="title-left">上传组织</div>
          <div class="title-right">{{orgName}}</div>
        </li>
      </ul>
      <div class="publicity-content">
        <el-table class="base-table" border :data="tableData"   header-row-class-name="page-table-header" v-loading="loading">
          <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span style="cursor:pointer">{{isEmpty(tableData[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="党费" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'dues')}}</span>
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
    import {getPublicityDetail} from "@/api/front/party/dues/publicity/publicity.js"
    export default {
        name: "ReturnAdd",
        components: {

        },
        data() {
          return {
            visible:false,
            loading:true,
            title:"详情",//标题
            publicityTitle:"",
            noticeDate:"",//公示时间
            noticeQuarter:"",//公示季度
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
                orgName: "XXX组织",//组织名称
                stateFou: {//第四季度是否交清
                  data: "已缴",
                  key: 0
                },
                stateOne: {//第一季度是否交清
                  data: "已缴",
                  key: 0
                },
                stateSec: {//第二季度是否交清
                  data: "已缴",
                  key: 0
                },
                stateTh: {//第三季度是否交清
                  data: "已缴",
                  key: 0
                },
                totalAmount: 0//缴纳总额
              }
            ],
            options: [],//组织
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
          //保存
          save(){
            this.visible = false;
          },
          //展示
          show(data){
            this.getInfo(data.id)
            this.visible=true;
            this.publicityTitle = data.title;
            this.noticeDate = data.createTime;
            this.orgName = data.orgId.data;
          },
          getInfo(id){
            let params={
              id:id
            }
            getPublicityDetail(params).then(response => {
              this.noticeDate = response.noticeDate;
              this.noticeQuarter = response.noticeQuarter.data;
              this.tableData = response.list;
              this.loading=false;
            }).finally(() => {
              this.loading=false;
            });
          }
        }
    }
</script>

<style scoped>
  .publicity-info >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .publicity-info >>> .el-dialog{
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
  }
  .title img{
    height: 16px;
    width: 16px;
    margin:12px;
    float: left;
  }
  .publicity-info >>> .cell{
    width: 100%;
    font-weight: 400;
  }
  .publicity-info >>> .el-dialog__body{
    padding: 0;
  }
  .publicity-title{
    width: 100%;
    display: inline-block;
    list-style: none;
    padding:0;
    margin:0;
  }
  .publicity-title li{
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #EEEEEE;
  }
  .title-left{
    float: left;
    width: 76px;
    height: 50px;
    line-height: 50px;
  }
  .title-right{
    float: left;
    width: calc(100% - 76px);
    height: 50px;
    line-height: 50px;
  }
  .publicity-content{
    padding:20px;
  }
</style>
