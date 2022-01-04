<template>
  <el-dialog :visible.sync="visible" append-to-body title="接转详情" @close="cancel"
             :close-on-click-modal="false" :close-on-press-escape="false" width="740px">
    <div class="history-detail" v-cloak v-loading="loading">
    <base-card-box header="党员信息">
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              姓名
            </div>
            <div class="card-box-content">
             {{isEmpty(list.djMemberPubVO,'name')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              性别
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'sex.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'phone')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              身份证号
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'idCode')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              入党时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'joinDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              转正时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'positiveDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12" v-if="!isShow">
          <div class="card-box">
            <div class="card-box-title">
              人员类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'type.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              人员类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              党费缴纳年月
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'duesPayEnddate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="24" v-if="!isShow">
          <div class="card-box">
            <div class="card-box-title">
              党费缴纳年月
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'duesPayEnddate')}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <base-card-box header="接转信息">
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              转接类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              调转状态
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'transferState.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="card-box">
        <div class="card-box-title">
          原组织
        </div>
        <div class="card-box-content">
          <div v-if="typeId === '1303258822889963520'">
            {{isEmpty(list.memberTransfer,'orgIdWrite')}}
          </div>
          <div v-else>
            {{isEmpty(list.memberTransfer,'orgId.data')}}
          </div>
        </div>
      </div>
      <div class="card-box">
        <div class="card-box-title">
          接收组织
        </div>
        <div class="card-box-content">
          {{isEmpty(list.memberTransfer,'acceptOrg.data')}}
        </div>
      </div>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              申请接转时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'createTime')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              审核接转时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'auditDate')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="card-box">
        <div class="card-box-title">
          转接原因
        </div>
        <div class="card-box-content">
          {{isEmpty(list.memberTransfer,'transferCause')}}
        </div>
      </div>
      <div class="card-box">
        <div class="card-box-title">
          介绍信
        </div>
        <div class="card-box-content">
          <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-file" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName)">
            <img src="@/assets/page/file-icon1.png">
            <span>{{item.submittedFileName}}</span>
            <img src="@/assets/page/file-icon2.png">
          </div>
          <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
        </div>
      </div>
      <div class="card-box">
        <div class="card-box-title">
          审核备注
        </div>
        <div class="card-box-content">
          {{isEmpty(list.memberTransfer,'auditResult')}}
        </div>
      </div>
    </base-card-box>
    </div>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="cancel()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getOrgHistorydetail,getAttachment} from "@/api/backstage/party/basic/org/org.js"
  export default {
    data () {
      return {
        loading:true,//加载遮罩条件
        visible: false,
        id:'',
        list:'',
        isShow:'',
        bizTypes:'',
        fileList:[],//附件
        typeId: ''
      }
    },
    methods: {
      show (row) {
        this.visible=true;
        this.id=row.id;
        this.getDetail();
        if(row.type.data=='园区内接转' || row.type.data=='转出园区外'){
          this.bizTypes='orglc'
        }else if(row.type.data=='园区外转入'){
          this.bizTypes='orglr'
        }
        this.getFile();
      },
      //接转详情
      getDetail(){
        let params = {
          id:this.id,
        }
        getOrgHistorydetail(params).then(response => {
          const res = response;
          this.list=res
          if(this.list.djMemberPubVO.type.data=='正式党员'){
            this.isShow=true;
          }else if(this.list.djMemberPubVO.type.data=='预备党员'){
            this.isShow=false;
          }
          if(this.list.memberTransfer.duesPayEnddate!='' && this.list.memberTransfer.duesPayEnddate!=undefined && this.list.memberTransfer.duesPayEnddate!=null && this.list.memberTransfer.duesPayEnddate!='null'){
            this.list.memberTransfer.duesPayEnddate=this.list.memberTransfer.duesPayEnddate.substring(0,7)
          }
          if(this.list.memberTransfer.type && this.list.memberTransfer.type.key){
              this.typeId = this.list.memberTransfer.type.key;
          }
        }).finally(() => {
          this.loading = false;

        });
      },
      //附件
      getFile(){
        let params={
          bizIds: this.id,
          bizTypes: this.bizTypes
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res[0]!='' && res[0]!=undefined && res[0]!=null && res[0]!='null'){
            this.fileList = res[0].list;
          }

        }).finally(() => {

        });
      },
      cancel(){
        this.visible = false;
        this.list='';
        this.fileList=[];//附件
      },
      //下载附件
      download(url,name){
        commonReq.downloadFile(url,name)

      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog__body {
    padding: 15px 0;
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
      /*flex: 1;*/
      padding: 16px 10px 16px 0;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:flex;
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
</style>
