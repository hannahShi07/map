<template>
  <div class="history-detail">
    <div class="logo-top bc clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>党员信息</span>
      </div>
      <div class="fr">
        <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
      </div>
    </div>
    <div class="line"></div>
    <el-tabs v-model="activeName" v-loading="loading">
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
                  {{isEmpty(baseList,'homeDetailAddress')}}
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

        <base-card-box header="入党信息" :margin="{top: true}">
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
                  申请入党日期
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'applyJoinDate')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
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
            <el-col :span="8">
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

          <el-row class="card-row">
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
                  {{isEmpty(baseList,'unitAddress')}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <!-- <base-card-box header="奖励信息" :margin="{top: true}" :headerBottomBorder="false">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberRewardList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="党员姓名" width="120" prop="name" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'member.data.name')}}
                </template>
              </el-table-column>

              <el-table-column label="所属组织" width="160" prop="orgName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'member.data.orgName')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励名称" width="300" prop="nameId" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'nameId.data')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励类型" prop="instructions" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'instructions')}}
                </template>
              </el-table-column>
              <el-table-column label="批准机关" prop="approvaOffice" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'approvaOffice.data')}}
                </template>
              </el-table-column>
              <el-table-column label="批准日期" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberRewardList[scope.$index],'approvalDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box> -->

        <!-- <base-card-box header="惩处信息" :margin="{top: true}" :headerBottomBorder="false">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberPunishList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="党员姓名" width="120" prop="name" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'member.data.name')}}
                </template>
              </el-table-column>

              <el-table-column label="所属组织" width="160" prop="orgName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'member.data.orgName')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励名称" width="300" prop="nameId" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'nameId.data')}}
                </template>
              </el-table-column>

              <el-table-column label="奖励类型" prop="instructions" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'instructions')}}
                </template>
              </el-table-column>
              <el-table-column label="批准机关" prop="approvaOffice" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'approvaOffice.data')}}
                </template>
              </el-table-column>
              <el-table-column label="批准日期" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberPunishList[scope.$index],'approvalDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box> -->

        <!-- <base-card-box header="历史库记录" :margin="{top: true}" :headerBottomBorder="false">
          <div style="margin: 0 20px;">
            <el-table :data="baseList.memberHistoryList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="操作" width="120" prop="a" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'handle.data')}}
                </template>
              </el-table-column>

              <el-table-column label="操作时间" width="160" prop="b" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'updateTime')}}
                </template>
              </el-table-column>

              <el-table-column label="操作组织" width="300" prop="c" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'handleOrg.data')}}
                </template>
              </el-table-column>

              <el-table-column label="原因" prop="mc" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.memberHistoryList[scope.$index],'reason')}}
                </template>
              </el-table-column>

            </el-table>
          </div>
        </base-card-box> -->
      </el-tab-pane>
      <el-tab-pane label="发展流程" name="2">
        <history-detail-tab-flow :params="params" :type="type"/>
      </el-tab-pane>
    </el-tabs>

    <!-- <div class="text-center bg-fff mt-20 pt-20 pb-20">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div> -->
  </div>
</template>

<script>
  import HistoryDetailTabFlow from './history-detail-tab-flow'
  import {getHistoryDetail} from "@/api/front/party/basic/float/float.js";
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
        imgUrl: require('@/assets/head/user-head.png'),//图片
        baseList:[],//基本信息
        id:"",//党员id
      }
    },
    activated(){
      this.geBaseDetail();
    },
    created () {
      this.geBaseDetail();
    },
    methods: {
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
            }
          }
        })
      },
      //基本信息接口
      geBaseDetail(){
        this.id = this.params.id
        let params = {
          id:this.id
        }

        if(this.type != "dev"){
          params.id = this.params.memberId
          params.floatId = this.id
        }

        // let params = {
        //   // id:this.params.id//历史人员库和党员管理
        //   id:this.params.memberId,  // 流动党员id
        //   floatId : this.params.id  // 流动id
        // }
        this.loading = true;

        // this.getFile(this.params.id)
        this.getFile(this.id)

        //党员详情
        getHistoryDetail(params).then(respone => {
          const res = respone
          this.baseList = res
          if(this.baseList.photo!='' && this.baseList.photo!=undefined && this.baseList.photo!=null && this.baseList.photo!='null'){
            this.imgUrl=this.baseList.photo
          }

        }).finally(() =>{
            this.loading = false;
        })
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
    align-items:center;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 150px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding-left: 20px;
      line-height:24px;
    }

    .card-box-content {
      flex: 1;
      font-weight: bold;
      font-size: 14px;
    }
  }

.bc{
  background:#fff;
  padding-bottom:15px;
}
.logotxt{
  display:flex;
  align-items:center;
  line-height:36px;
  font-size: 16px;
  color: #7D7D7D;
}
.logotxt img{
  width:21px;
  height:17px;
  margin-right:8px;
}
.line{
  width:100%;
  height:20px;
  background:#eee;
}
</style>
