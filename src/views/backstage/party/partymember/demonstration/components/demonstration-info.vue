<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1030px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="history-detail" v-cloak v-loading="loading">
    <base-card-box header="">
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              党员姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'memberId.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              岗位名称
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'name')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              岗位标牌
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'sign')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              职位
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'position')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              企业名称
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'companyName')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              示范岗时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'stDate')}}~{{isEmpty(list,'enDate')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              工作内容
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'jobContent')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              图片
            </div>
            <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0">
              <div class="card-img" v-for="(item,index) in fileListimg">
                <img :src="item.url">
              </div>
            </div>
            <div class="card-box-content" style="flex:1"  v-if="!(fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0)">
              --
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="cancel">知道了</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {infoDemonstration} from "@/api/backstage/party/partymember/demonstration/demonstration.js"
  export default {
    name: "activedcommunity-detail",
    data () {
      return {
        loading:false,//加载遮罩条件
        visible: false,
        title: '详情',
        list:'',
        fileList:[],//附件
        fileListimg:[],//图片
      }
    },
    mounted(){

    },
    methods: {
      show(t,row) {
        this.visible = true;
        this.getDetail(row.id);
        this.getFile(row.id)
      },
      //获取详情
      getDetail(id){
        let params={
          id:id
        }
        infoDemonstration(params).then(response => {
          this.list = response
        })
      },
      //获取附件
      getFile(id){
        let params={
          bizIds: id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0){
            for(let i=0;i<res.length;i++){
              if(res[i].list.length > 0){
                this.fileListimg = res[i].list;
              }
            }
          }else{
            this.fileListimg =[];
          }
        })
      },

      //取消
      cancel() {
        this.visible = false;
        this.list='';
        this.fileList=[];//附件
        this.fileListimg=[];//图片
      },
    },
  }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;

  }
  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 120px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding: 16px 0 16px 20px;
    }

    .card-box-content {
      // flex: 1;
      width: calc(100% - 120px);
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
      color:#333;
      padding-right:20px;
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
  .card-filebox{
    display:block;
  }

  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:inline-flex;
    flex-flow:wrap;
    align-items:center;
  }
  .card-file{
    width:auto;
    margin-bottom:8px;
  }
  .card-file img:first-of-type{
    width:12px;
    height:16px;
  }
  .card-file img:last-of-type{
    width:17px;
    height:17px;
  }
  .card-file span{
    padding-left:10px;
    padding-right:30px;
    font-size:14px;
    color:#999;
  }
  .card-img{
    width:100%;
    margin-bottom:10px;
  }
  .card-img img{
    width:100%
  }
</style>
