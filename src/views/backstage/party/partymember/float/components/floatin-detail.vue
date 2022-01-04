<template>
  <div class="history-detail" v-cloak v-loading="loading">
    <base-card-box header="个人基本信息" isImg :imgUrl="imgUrl">
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.name')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.phone')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              民族
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.nation.data')}}
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
              {{isEmpty(baseList,'member.idCode')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              性别
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.sex.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              出生日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.birthday')}}
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
              {{isEmpty(baseList,'member.natives')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              婚姻状况
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.marriageCondition.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              贫困户
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.isPoor.data')}}
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
              {{isEmpty(baseList,'member.isVeteran.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              农民工
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.isFarmerWork.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              台湾籍
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"member.nativesTaiwan.data")}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              状态
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"member.state.data")}}
            </div>
          </div>
        </el-col>
<!--        <el-col :span="16">-->
<!--          <div class="card-box">-->
<!--            <div class="card-box-title">-->
<!--              发展党员性质-->
<!--            </div>-->
<!--            <div class="card-box-content">-->
<!--              {{isEmpty(baseList,"member.developNature.data")}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              家庭地址
            </div>
            <div class="card-box-content">
<!--              {{isEmpty(baseList,'member.homeDetailAddress')}}-->
              {{homeads}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              流动类型
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"type.data")}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党支部联系人
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"branchPerson")}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"contact")}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              流出组织
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"orgRelationAddress")}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              流入日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"flowDate")}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              流动党员证编号
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"flowMemberNum")}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              流回日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"returnflowDate")}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              原因
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,"flowReasons.data")}}
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
              {{isEmpty(baseList,'member.education.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              毕业院校
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.graduateSchool')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              学位
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.degree.data')}}
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
              {{isEmpty(baseList,'member.major')}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <base-card-box header="入党信息" :margin="{top: true}">
      <el-row class="card-row">
<!--        <el-col :span="8">-->
<!--          <div class="card-box">-->
<!--            <div class="card-box-title">-->
<!--              所属党组织-->
<!--            </div>-->
<!--            <div class="card-box-content">-->
<!--              {{isEmpty(baseList,'orgId.data')}}-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              人员类型
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              入党时所在党支部
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.branch')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              入党介绍人
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.reference')}}
            </div>
          </div>
        </el-col>

      </el-row>
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              申请入党时间
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.applyJoinDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title card_line">
              确定为入党积极分子日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.confirmActivistDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              确定为发展对象日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.confirmDevelopDate')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24" v-if="!isShow">
          <div class="card-box">
            <div class="card-box-title">
              入党日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.joinDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              入党日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.joinDate')}}
            </div>
          </div>
        </el-col>

        <el-col :span="8" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              转正日期
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.positiveDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              党龄
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.partyAge')}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <base-card-box header="单位信息" :margin="{top: true}" style="margin-bottom: 80px">
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              工作单位
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.company')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              从事专业技术职务
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.duty')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              企业类型
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'member.entType.data')}}
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
              {{isEmpty(baseList,'member.jobs.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              单位地址
            </div>
            <div class="card-box-content">
<!--              {{isEmpty(baseList,'member.unitAddress')}}-->
              {{unitads}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div>

  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import db from "@/utils/localstorage"
  import {getFloatDetail} from "@/api/backstage/party/basic/float/float.js"

  export default {
    name: "floatin-detail",
    components: {},
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        loading:true,//加载遮罩条件
        activeName: '1',//tab切换
        imgUrl: '',//图片
        baseList:[],//基本信息
        id:"",//党员id
        isShow:'',
        homeads:'',//家庭地址
        unitads:'',//单位地址
      }
    },
    activated(){
      this.geBaseDetail();
    },
    mounted () {
      this.geBaseDetail();
    },
    methods: {
      //基本信息接口
      geBaseDetail() {
        let id = this.params.id//历史人员库和党员管理
        let params = {
          id:this.params.id
        }

        // this.getFile(id)
        //流入党员详情
        getFloatDetail(params).then(respone => {
          const res = respone
          this.getFile(res.member.id);
          this.baseList = res
          //介绍人
          if (this.baseList.member.reference != '' && this.baseList.member.reference != undefined && this.baseList.member.reference != null && this.baseList.member.reference != 'null') {
            let indexlv = this.baseList.member.reference.indexOf(',');
            if (indexlv == 0) {
              this.baseList.member.reference = this.baseList.member.reference.substring(indexlv + 1, this.baseList.member.reference.length)
            } else if (indexlv == (this.baseList.member.reference.length - 1)) {
              this.baseList.member.reference = this.baseList.member.reference.substring(0, this.baseList.member.reference.length - 1)
            }
          }

          if (this.baseList.member.type.data == '正式党员') {
            this.isShow = true;

          } else if (this.baseList.member.type.data == '预备党员') {
            this.isShow = false;
          }

          //地址拼接
          if(this.baseList.member.homeAddress!='' && this.baseList.member.homeAddress!=undefined && this.baseList.member.homeAddress!=null && this.baseList.member.homeAddress!='null'
            && this.baseList.member.homeDetailAddress!='' && this.baseList.member.homeDetailAddress!=undefined && this.baseList.member.homeDetailAddress!=null && this.baseList.member.homeDetailAddress!='null'
            ){
             this.homeads=this.baseList.member.homeAddress+'-'+this.baseList.member.homeDetailAddress
          }else if(
            (this.baseList.member.homeAddress=='' || this.baseList.member.homeAddress==undefined || this.baseList.member.homeAddress==null || this.baseList.member.homeAddress=='null')
            && this.baseList.member.homeDetailAddress!='' && this.baseList.member.homeDetailAddress!=undefined && this.baseList.member.homeDetailAddress!=null && this.baseList.member.homeDetailAddress!='null'
          ){
            this.homeads=this.baseList.member.homeDetailAddress;
          }else if(
            this.baseList.member.homeAddress!='' && this.baseList.member.homeAddress!=undefined && this.baseList.member.homeAddress!=null && this.baseList.member.homeAddress!='null'
            && (this.baseList.member.homeDetailAddress=='' || this.baseList.member.homeDetailAddress==undefined || this.baseList.member.homeDetailAddress==null || this.baseList.member.homeDetailAddress=='null')
          ){
            this.homeads=this.baseList.member.homeAddress;
          }else{
            this.homeads='--'
          }

          if(this.baseList.member.unitAddress!='' && this.baseList.member.unitAddress!=undefined && this.baseList.member.unitAddress!=null && this.baseList.member.unitAddress!='null'
            && this.baseList.member.unitDetailAddress!='' && this.baseList.member.unitDetailAddress!=undefined && this.baseList.member.unitDetailAddress!=null && this.baseList.member.unitDetailAddress!='null'
          ){
            this.unitads=this.baseList.member.unitAddress+'-'+this.baseList.member.unitDetailAddress
          }else if(
            (this.baseList.member.unitAddress=='' || this.baseList.member.unitAddress==undefined || this.baseList.member.unitAddress==null || this.baseList.member.unitAddress=='null')
            && this.baseList.member.unitDetailAddress!='' && this.baseList.member.unitDetailAddress!=undefined && this.baseList.member.unitDetailAddress!=null && this.baseList.member.unitDetailAddress!='null'
          ){
            this.unitads=this.baseList.member.unitDetailAddress;
          }else if(
            this.baseList.member.unitAddress!='' && this.baseList.member.unitAddress!=undefined && this.baseList.member.unitAddress!=null && this.baseList.member.unitAddress!='null'
            && (this.baseList.member.unitDetailAddress=='' || this.baseList.member.unitDetailAddress==undefined || this.baseList.member.unitDetailAddress==null || this.baseList.member.unitDetailAddress=='null')
          ){
            this.unitads=this.baseList.member.unitAddress;
          }else{
            this.unitads='--'
          }


        }).finally(() => {
          this.loading = false;
        })
      },
      //获取头像
      getFile(id) {
        let params = {
          bizIds: id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if (res.length > 0 && res[0].list.length > 0) {
            if (res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != "") {
              this.imgUrl = res[0].list[0].url
            } else {
              this.imgUrl = require('@/assets/head/user-head.png')
            }
          } else {
            this.imgUrl = require('@/assets/head/user-head.png')
          }
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

  .card_line {
    line-height: 25px;
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
