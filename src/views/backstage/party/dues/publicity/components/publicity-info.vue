<template>
  <div class="info-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form label-width="82px" v-loading="loading">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              <span class="content" v-if="!list.orgId.data&&!list.noticeDate">--</span>
              <span class="content" v-else>{{list.orgId.data}}关于{{list.noticeDate}}年党费公示</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="noticeDate">
            <el-form-item label="公示时间">
              <span class="content">{{list.noticeDate}}{{list.noticeQuarter.data}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="noticeDate">
            <el-form-item label="缴费总额">
              <span class="content">{{totalAmount}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传组织">
              <span class="content">{{list.orgId.data}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table
              class="table"
              tooltip-effect="dark"
              style="width:100%;margin: 0 auto"
              ref="publicityTable"
              :data="list.list">
              <el-table-column label="人员姓名" min-width="120px" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(list.list[scope.$index],'memberId.data')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="党费" min-width="200px"  align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(list.list[scope.$index],'dues')}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import {publicityInfo,searchCollection} from "@/api/backstage/party/dues/publicity/publicity.js"
  export default {
    name: "PublicityInfo",
    components: {

    },
    data() {
      return {
        visible:false,
        title:"详情",//标题
        loading:true,
        id:"",
        totalAmount:"",//收缴金额
        list:{
          "createTime": "",
          "id": 0,
          "list": [
            {
              "dues": 0,
              "memberId": {
                "data": "",
                "key": 0
              },
            }
          ],
          "noticeDate": "",
          "noticeQuarter": {
            "data": "",
            "key": 0
          },
          "orgId": {
            "data": "",
            "key": 0
          },
          "title": "",
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
      show(row){
        this.id = row.id;
        this.visible=true;
        this.loading=true;
        this.getInfo()
      },
      getInfo(){
        let params = {
          id:this.id
        }
        publicityInfo(params).then(response => {
          this.loading=false;
          this.list=response
          this.searchCollection();
        }).finally(() => {
          this.loading=false;
        });
      },
      searchCollection(){
        let params = {
          collectionDate:this.list.noticeDate,
          collectionQuarter:this.list.noticeQuarter.key,
          orgId:this.list.orgId.key
        }
        searchCollection(params).then(response => {
          if(response.flag == 0){
            this.totalAmount="未缴"
          }else{
            this.totalAmount=response.totalAmount;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .info-content >>> .el-dialog{
    width: 560px;
  }
  .info-content .noticeDate >>> .el-input{
    width: 207px;
  }
  .info-content >>> .el-form-item__content{
    line-height: 25px;
  }
  .content{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    background-color: white;
    color: #333333;
    font-weight: Bold;
  }
  .info-content >>>.el-form-item{
    margin:0;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }
  .info-content >>> .el-dialog__body{
    max-height: 65vh;
  }
  .info-content >>> .el-form-item__label{
    text-align: left;
    padding-left: 10px;
  }
</style>
