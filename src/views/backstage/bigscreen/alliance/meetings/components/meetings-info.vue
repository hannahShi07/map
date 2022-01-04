<template>
  <div class="demeanor-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <div class="information">
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                类型
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'meetingType.data')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                联盟党建联席会内容
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'content')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
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
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getMeetingsDetail} from "@/api/backstage/sysset/bigscreen/alliance/meetings/meetings.js"
  export default {
    name: "Info",
    data() {
      return {
        visible:false,
        title:"详情",//标题
        formData:{
          meetingType:{key:'',data:''}
        },
        fileListimg:[],//图片
      }
    },
    methods: {
      close(){
        this.$emit('refresh')
        this.visible=false;
      },
      show(row){
        this.visible=true;
        this.getDetail(row.id);
        this.getFile(row.id)
      },
      //获取详情
      getDetail(id){
        let params={
          id:id
        }
        getMeetingsDetail(params).then(response => {
          this.formData = response
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
    }
  }
</script>

<style scoped>
  .demeanor-add >>> .el-dialog{
    width: 902px;
  }
  .demeanor-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .demeanor-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information >>> .el-form-item__label{
    text-align: left;
  }
  .information >>> .el-form-item{
    height: 50px;
    padding: 5px 0;
    margin:0;
    border-bottom: 1px solid #EEEEEE;
  }
  .photo{
    position: absolute;
    right: 20px;
    top: 68px;
    background-color: #fff;
    padding-left: 20px;
    height: 133px;
    width: 115px;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .company-list{
    height: 26px;
    border-radius: 4px;
    background-color: #F2F2F2;
    line-height: 26px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .img-content{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100%;
    overflow:hidden;
    border:none;
  }
  .img-content .personimg{
    width:100%;
  }
  .information >>> .el-form-item{
    height: auto;
  }
  .information >>> .el-form-item__content{
    padding-top: 10px;
    padding-bottom: 5px;
    line-height: 20px;
    font-weight: bold;
  }
  .information .information-content >>> .el-form-item__content{
    font-weight: 400;
  }
  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;
  }
  .card-box-title {
    width: 100px;
    text-align: left;
    font-size: 14px;
    color: #555555;
    padding: 16px 0;
  }

  .card-box-content {
    width: calc(100% - 120px);
    padding: 16px 16px 16px 20px;
    font-weight: bold;
    font-size: 14px;
    color:#333;
    padding-right:20px;
  }
  .card-box-title{
    color: #888;
  }
</style>
