<template>
  <div class="history-detail">
    <el-tabs v-model="activeName" v-loading="loading" style="margin-bottom: 80px">
      <el-tab-pane label="基本信息" name="1" v-cloak>
        <base-card-box header="个人基本信息" isImg :imgUrl="imgUrl">
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  姓名
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'name')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  手机号码
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'phone')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  民族
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'nation.data')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  身份证号码
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'idCode')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  性别
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'sex.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  出生日期
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'birthday')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  籍贯
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'natives')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  婚姻状况
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'marriageCondition.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  贫困户
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'isPoor.data')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  退役军人
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'isVeteran.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  农民工
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'isFarmerWork.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  台湾籍
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,"nativesTaiwan.data")}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  状态
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,"state.data")}}
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="card-box">
                <div class="card-box-title">
                  发展党员性质
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,"developNature.data")}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  家庭地址
                </div>
                <div class="card-box-content">
<!--                  {{isEmpty(baseList,'homeDetailAddress')}}-->
                  {{homeads}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <base-card-box header="学历信息" :margin="{top: true}">
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  学历
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'education.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  毕业院校
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'graduateSchool')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  学位
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'degree.data')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  专业
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'major')}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <base-card-box header="入党信息" :margin="{top: true}" v-if="isNotDev">
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  所属党组织
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'orgId.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  入党时所在党支部
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'branch')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  人员类型
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'type.data')}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  入党介绍人
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'reference')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  申请入党时间
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'applyJoinDate')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title card_line">
                  确定为入党积极分子日期
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'confirmActivistDate')}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="card-row">
          <el-col :span="8">
            <div class="card-box">
              <div class="card-box-title">
                确定为发展对象日期
              </div>
              <div class="card-box-content">
                {{isEmpty(baseList,'confirmDevelopDate')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="card-box">
              <div class="card-box-title">
                入党日期
              </div>
              <div class="card-box-content">
                {{isEmpty(baseList,'joinDate')}}
              </div>
            </div>
          </el-col>
          <el-col :span="8" v-if="isShow">
            <div class="card-box">
              <div class="card-box-title">
                转正日期
              </div>
              <div class="card-box-content">
                {{isEmpty(baseList,'positiveDate')}}
              </div>
            </div>
          </el-col>
        </el-row>
          <el-row class="card-row" v-if="isShow">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  党龄
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'partyAge')}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <base-card-box header="单位信息" :margin="{top: true}">
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  工作单位
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'company')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  从事专业技术职务
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'duty')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  企业类型
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'entType.data')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  工作岗位
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'jobs.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="card-box">
                <div class="card-box-title">
                  单位地址
                </div>
                <div class="card-box-content">
<!--                  {{isEmpty(baseList,'unitAddress')}}-->
                  {{unitads}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <base-card-box header="奖励信息" :margin="{top: true}" :headerBottomBorder="false" v-if="isNotDev">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberPrizeList" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
              <el-table-column type="index" label="序号" width="80" align="center"/>
              <el-table-column label="党员姓名" width="160" prop="memberName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'memberName')}}
                </template>
              </el-table-column>

              <el-table-column label="所属组织" prop="orgName" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'orgName')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励名称" width="200" prop="name" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'name')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励类型" width="200" prop="prizePunishType.data" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'prizePunishType.data')}}
                </template>
              </el-table-column>
              <el-table-column label="批准机关" width="200" prop="approvaOffice" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'approvaOffice')}}
                </template>
              </el-table-column>
              <el-table-column label="批准日期" width="200" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPrizeList[scope.$index],'approvalDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box>

        <base-card-box header="惩处信息" :margin="{top: true}" :headerBottomBorder="false" v-if="isNotDev">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberPunishList" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
              <el-table-column type="index" label="序号" width="80" align="center"/>
              <el-table-column label="党员姓名" width="160" prop="memberName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'memberName')}}
                </template>
              </el-table-column>

              <el-table-column label="所属组织" prop="orgName" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'orgName')}}
                </template>
              </el-table-column>

              <el-table-column label="惩处名称" width="200" prop="name" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'name')}}
                </template>
              </el-table-column>

              <el-table-column label="惩处类型" width="200" prop="prizePunishType.data" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'prizePunishType.data')}}
                </template>
              </el-table-column>
              <el-table-column label="批准机关" width="200" prop="approvaOffice" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'approvaOffice')}}
                </template>
              </el-table-column>
              <el-table-column label="批准日期" width="200" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'approvalDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box>

        <base-card-box header="历史库记录" :margin="{top: true}" :headerBottomBorder="false" v-if="isNotDev">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberHistoryList" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
              <el-table-column type="index" label="序号" width="80" align="center"/>
              <el-table-column label="操作" width="300" prop="handle.data" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'handle.data')}}
                </template>
              </el-table-column>

              <el-table-column label="操作时间" width="200" prop="updateTime" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'updateTime')}}
                </template>
              </el-table-column>

              <el-table-column label="操作组织"  prop="handleOrg.data" align="left" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'handleOrg.data')}}
                </template>
              </el-table-column>

              <el-table-column label="原因" width="380" prop="reason" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'reason')}}
                </template>
              </el-table-column>

            </el-table>
          </div>
        </base-card-box>
      </el-tab-pane>
      <el-tab-pane label="发展流程" name="2">
        <history-detail-tab-flow :params="params" :id="id"/>

        <base-card-box header="相关附件" :margin="{top: true}">
          <div style="margin: 0 20px;" v-cloak>
            <el-table class="filetable" :data="detailFile" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
              <el-table-column label="附件名称" prop="fileName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(detailFile[scope.$index],'fileName')}}
                </template>
              </el-table-column>

              <el-table-column label="大小" width="160" prop="fileSize" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(detailFile[scope.$index],'fileSize')}}
                </template>
              </el-table-column>

              <el-table-column label="上传日期" width="300" prop="createTime" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(detailFile[scope.$index],'createTime')}}
                </template>
              </el-table-column>

              <el-table-column label="操作" width="200" align="center">
                <template slot-scope="{row}">
                  <base-table-a  :row="row" @click="download('1',row.fileName,row.url)">预览</base-table-a>
                  <base-table-a type="down" :row="row" @click="download('2',row.fileName,row.url)">下载</base-table-a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box>
      </el-tab-pane>
    </el-tabs>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div>
  </div>
</template>

<script>
  import HistoryDetailTabFlow from './history-detail-tab-flow'
  import {getHistoryDetail,getHistoryDetailFile} from "@/api/backstage/party/basic/history/history.js";
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: 'HistoryDetail',
    components: {HistoryDetailTabFlow},
    props: {
      params: {
        type: Object,
        default: {}
      },
      type: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        loading:true,//加载遮罩条件
        activeName: '1',//tab切换
        imgUrl: '',//图片
        baseList:[],//基本信息
        detailFile: [],//发展流程相关附件
        isShow:'',
        id:"",//党员id
        isNotDev:true,
        homeads:'',//家庭地址
        unitads:'',//单位地址
      }
    },
    activated(){
      this.imgUrl = ''
      this.geBaseDetail();
      this.getBaseFile();
    },
    mounted () {
      this.geBaseDetail();
      this.getBaseFile();
    },
    methods: {
      //基本信息接口
      geBaseDetail(){
        let id = this.params.id//历史人员库和党员管理
        this.id = this.params.id
        let params = {
          id:id
        }
        // if(this.type == 'float'){
        //   this.id = this.params.memberId
        //   params.id = this.params.memberId // 流动党员id
        //   params.floatId = this.params.id  // 流动id
        // }

        if(this.type == 'dev'){
          this.isNotDev = false
        }

        this.loading = true;

        this.getFile(id)
        //历史人员库详情
        getHistoryDetail(params).then(respone => {
          const res = respone
          this.baseList = res
          //介绍人
          if(this.baseList.reference!='' && this.baseList.reference!=undefined && this.baseList.reference!=null && this.baseList.reference!='null'){
            let indexlv=this.baseList.reference.indexOf(',');
            if(indexlv==0){
              this.baseList.reference=this.baseList.reference.substring(indexlv+1,this.baseList.reference.length)
            }else if(indexlv==(this.baseList.reference.length-1)){
              this.baseList.reference=this.baseList.reference.substring(0,this.baseList.reference.length-1)
            }
          }

          if(this.baseList.type.data=='正式党员'){
            this.isShow=true;

          }else if(this.baseList.type.data=='预备党员'){
            this.isShow=false;
          }


          //地址拼接homeDetailAddress
          if(this.baseList.homeAddress!='' && this.baseList.homeAddress!=undefined && this.baseList.homeAddress!=null && this.baseList.homeAddress!='null'
            && this.baseList.homeDetailAddress!='' && this.baseList.homeDetailAddress!=undefined && this.baseList.homeDetailAddress!=null && this.baseList.homeDetailAddress!='null'
          ){
            this.homeads=this.baseList.homeAddress+'-'+this.baseList.homeDetailAddress
          }else if(
            (this.baseList.homeAddress=='' || this.baseList.homeAddress==undefined || this.baseList.homeAddress==null || this.baseList.homeAddress=='null')
            && this.baseList.homeDetailAddress!='' && this.baseList.homeDetailAddress!=undefined && this.baseList.homeDetailAddress!=null && this.baseList.homeDetailAddress!='null'
          ){
            this.homeads=this.baseList.homeDetailAddress;
          }else if(
            this.baseList.homeAddress!='' && this.baseList.homeAddress!=undefined && this.baseList.homeAddress!=null && this.baseList.homeAddress!='null'
            && (this.baseList.homeDetailAddress=='' || this.baseList.homeDetailAddress==undefined || this.baseList.homeDetailAddress==null || this.baseList.homeDetailAddress=='null')
          ){
            this.homeads=this.baseList.homeAddress;
          }else{
            this.homeads='--'
          }

          if(this.baseList.unitAddress!='' && this.baseList.unitAddress!=undefined && this.baseList.unitAddress!=null && this.baseList.unitAddress!='null'
            && this.baseList.unitDetailAddress!='' && this.baseList.unitDetailAddress!=undefined && this.baseList.unitDetailAddress!=null && this.baseList.unitDetailAddress!='null'
          ){
            this.unitads=this.baseList.unitAddress+'-'+this.baseList.unitDetailAddress
          }else if(
            (this.baseList.unitAddress=='' || this.baseList.unitAddress==undefined || this.baseList.unitAddress==null || this.baseList.unitAddress=='null')
            && this.baseList.unitDetailAddress!='' && this.baseList.unitDetailAddress!=undefined && this.baseList.unitDetailAddress!=null && this.baseList.unitDetailAddress!='null'
          ){
            this.unitads=this.baseList.unitDetailAddress;
          }else if(
            this.baseList.unitAddress!='' && this.baseList.unitAddress!=undefined && this.baseList.unitAddress!=null && this.baseList.unitAddress!='null'
            && (this.baseList.unitDetailAddress=='' || this.baseList.unitDetailAddress==undefined || this.baseList.unitDetailAddress==null || this.baseList.unitDetailAddress=='null')
          ){
            this.unitads=this.baseList.unitAddress;
          }else{
            this.unitads='--'
          }


        }).finally(() =>{
            this.loading = false;
        })
      },
      //获取头像
      getFile(id){
        let params={
          bizIds: id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
              this.imgUrl = res[0].list[0].url
            }else{
              this.imgUrl = require('@/assets/head/user-head.png')
            }
          }else{
            this.imgUrl = require('@/assets/head/user-head.png')
          }
        })
      },
      //发展流程接口-相关附件
      getBaseFile(){
        let id = this.params.id//历史人员库和党员管理
        if(this.type == 'float'){
          id = this.params.memberId// 流动党员id
        }
        let params = {
          model:{
            id:id
          }

        }

        getHistoryDetailFile(params).then(respone => {
          const res = respone
          this.detailFile = res.records;
        })
      },
      //下载附件
      download(flag,fileName,loadurl){
        if(flag === '1'){
          window.open('http://112.30.98.118:9088/onlinePreview?url='+`${Base64.encode(loadurl)}`)
        }else if(flag === '2'){
          commonReq.downloadFile(loadurl,fileName)
        }
      },
      //返回
      goBtn () {
        this.$emit('handleSwitch', {name: 'Index'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history-detail {
    background: #eee;
  }

  .card-row {
    line-height: 50px;
  }

  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 150px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding-left: 20px;
    }

    .card-box-content {
      flex: 1;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .card_line {
    line-height: 25px;
  }
  .filetable /deep/ tr td:last-of-type{
    cursor:pointer;
  }

  .fexid-clas {
    text-align: center;
    z-index: 6;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 1;
    margin-left: -20px;
  }
</style>
