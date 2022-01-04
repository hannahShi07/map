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
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              会议名称
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'meetingName')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              会议类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'meetingType.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              在线会议
            </div>
            <div class="card-box-content">
              {{(isEmpty(list,'meetingWay') === '1') ? '是' : '否'}}
            </div>
          </div>
        </el-col>
<!--        <el-col :span="12">-->
<!--          <div class="card-box">-->
<!--            <div class="card-box-title">-->
<!--              审核通知-->
<!--            </div>-->
<!--            <div class="card-box-content">-->
<!--              {{isEmpty(list,'result')}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              开始时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'beginTime')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              结束时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'endTime')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              会议地点
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'place')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              参会对象
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'participantsId')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              列席人员
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'lxParticipants')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              主持人
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'compere')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              记录人
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'recorder')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row" v-if="isShow">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              授课人
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'lecturer')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              备注
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'remarks')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              附件
            </div>
            <div class="card-box-content card-box-content1">
              <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-filebox" v-for="(item,index) in fileList"  @click="download(item.submittedFileName,item.url)">
                <div class="card-file">
                  <img src="@/assets/page/file-icon1.png">
                  <span>{{item.submittedFileName}}</span>
                  <img src="@/assets/page/file-icon2.png">
                </div>
              </div>
              <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              会议议题
            </div>
            <div class="card-box-contentys" v-html="list.agenda" v-if="list.agenda!='' && list.agenda!=undefined && list.agenda!=null && list.agenda!='null'">
              <!--              {{isEmpty(list,'meetingContent')}}-->
            </div>
            <div class="card-box-content" v-else>
              --
            </div>
          </div>
        </el-col>
      </el-row>


      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              会议纪要
            </div>
            <div class="card-box-contentys" v-html="list.meetingRecord" v-if="list.meetingRecord!='' && list.meetingRecord!=undefined && list.meetingRecord!=null && list.meetingRecord!='null'">
<!--              {{isEmpty(list,'meetingRecord')}}-->
            </div>
            <div class="card-box-content" v-else>
              --
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>
    </div>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="cancel()">知道了</el-button>
    </div>

  </el-dialog>

</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getMeetingDetail} from "@/api/backstage/party/orglife/meeting/meeting.js"
  export default {
    name: "meeting-detail",
    data () {
      return {
        loading:true,
        // 自己的
        visible: false,
        title: '三会一课详情',
        list:'',
        fileList:[],//附件
        isShow:false,
      }
    },
    mounted(){

    },
    methods: {
      show(t, row) {
        this.visible = true;
        this.getDetail(row.id);
        this.getFile(row.id)
      },
      //获取详情
      getDetail(id){
        let params={
          meetingId:id
        }
        getMeetingDetail(params).then(response => {
          const res = response;
          this.list=res;
          if(this.list.meetingType.data=='党课'){
            this.isShow=true;
          }else{
            this.isShow=false;
          }
          // if(this.list.result=='1'){
          //   this.list.result='驳回';
          // }else if(this.list.result=='2'){
          //   this.list.result='通过 ';
          // }else if(this.list.result=='3'){
          //   this.list.result='未审核';
          // }
          if(this.list.beginTime!='' && this.list.beginTime!=undefined && this.list.beginTime!=null && this.list.beginTime!='null'){
            this.list.beginTime=this.list.beginTime.substring(0,16)
          }
          if(this.list.endTime!='' && this.list.endTime!=undefined && this.list.endTime!=null && this.list.endTime!='null'){
            this.list.endTime=this.list.endTime.substring(0,16)
          }

        }).finally(() => {
          this.loading = false;
        });
      },
      //获取附件
      getFile(id){
        let params={
          bizIds: id
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0 && res[0].list.length>0){
            if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
              this.fileList = res[0].list
            }

          }
        })
      },
      //下载附件
      download(fileName,loadurl){
        commonReq.downloadFile(loadurl,fileName)
      },
      //取消
      cancel() {
        this.visible = false;
        this.list='';
        this.fileList=[];//附件
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
    }
    .card-box-contentys {
      width: calc(100% - 120px);
      padding: 16px 0;
      padding-right: 20px;
      overflow: hidden;

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

