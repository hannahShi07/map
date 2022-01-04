<template>
  <div class="history-detail">
    <!-- <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="基本信息" name="1" v-cloak> -->
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
        <base-card-box header="基本信息" isImg :imgUrl="imgUrl" v-cloak>
          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  上级党组织
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'parentId.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  组织名称
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'name')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  组织类别
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'category.data')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  组织编码
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'orgNum')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  组织类型
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'type.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  联系电话
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'phone')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  组织分类
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'classification.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  批准建立党组织日期
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'approvalDate')}}
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="card-box">
                <div class="card-box-title">
                  批准建立党组织文号
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'approNum')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  组织地址
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'address')}}
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  组织简介
                </div>
                <div class="card-box-content">
                  {{isEmpty(baseList,'brief')}}
                </div>
              </div>
            </el-col>
          </el-row>
        </base-card-box>

        <base-card-box header="组织奖惩信息" :margin="{top: true}" :headerBottomBorder="false" v-cloak>
          <div style="margin: 0 20px;">
            <el-table :data="baseList.orgPrizePunishList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="奖励名称" width="300" prop="nameId" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.orgPrizePunishList[scope.$index],'name')}}
                </template>
              </el-table-column>
              <el-table-column label="奖励类型" min-width="160" prop="instructions" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.orgPrizePunishList[scope.$index],'type.data')}}
                </template>
              </el-table-column>
              <el-table-column label="批准机关" min-width="160" prop="approvaOffice" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.orgPrizePunishList[scope.$index],'approvaOffice')}}
                </template>
              </el-table-column>
              <el-table-column label="批准日期" min-width="160" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.orgPrizePunishList[scope.$index],'approvalDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box>

        <base-card-box header="班子成员信息" :margin="{top: true}" :headerBottomBorder="false" v-cloak>
          <div style="margin: 0 20px;">
            <el-table :data="baseList.leadershipList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="姓名" width="120" prop="name" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.leadershipList[scope.$index],'memberId.data')}}
                </template>
              </el-table-column>

              <el-table-column label="党内职务" min-width="160" prop="orgName" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.leadershipList[scope.$index],'position.data')}}
                </template>
              </el-table-column>

              <el-table-column label="所属组织" min-width="160" prop="nameId" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.leadershipList[scope.$index],'orgId.data')}}
                </template>
              </el-table-column>

              <el-table-column label="任职日期" width="160" prop="approvalDate" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.leadershipList[scope.$index],'officeDate')}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </base-card-box>

        <base-card-box header="换届选举信息" :margin="{top: true}" :headerBottomBorder="false" v-cloak>
          <div style="margin: 0 20px;">
            <el-table :data="baseList.elctionList" header-row-class-name="page-table-header">
              <el-table-column type="index" label="序号" width="60" align="center"/>
              <el-table-column label="换届日期" min-width="160" prop="b" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.elctionList[scope.$index],'transitionDate')}}
                </template>
              </el-table-column>

              <el-table-column label="届满日期"  min-width="160" prop="c" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.elctionList[scope.$index],'endDate')}}
                </template>
              </el-table-column>

              <el-table-column label="本届任期" min-width="160"  prop="mc" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.elctionList[scope.$index],'term.data')}}
                </template>
              </el-table-column>
              <el-table-column label="选举方式" min-width="160" prop="mc" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{isEmpty(baseList.elctionList[scope.$index],'electionWay.data')}}
                </template>
              </el-table-column>

            </el-table>
          </div>
        </base-card-box>
  </div>
</template>

<script>
  import {getPartydetail} from "@/api/front/party/basic/party/party.js";
  export default {
    name: 'partyDetail',
    components: {},
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loading:true,//加载遮罩条件
        activeName: '1',//tab切换
        imgUrl: require('@/assets/head/party_img.png'),//图片
        baseList:[],//基本信息
        detailFile: [],//发展流程相关附件
      }
    },
    created () {
      this.geBaseDetail();
    },
    methods: {
      //基本信息接口
      geBaseDetail(){
        let params = {
          id:this.params.id//党组织框架
        }
        this.loading = true;
        //党组织框架详情
          getPartydetail(params).then(respone => {
          const res = respone
          this.baseList = res
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
/*.logo-top{*/
  /*padding:14px 20px;*/
  /*padding-bottom:0;*/
/*}*/
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
  .el-table tr {
    font-weight: bold;
  }
</style>
