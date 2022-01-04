<!--全市社会组织党建工作示范点-->
<template>
  <div class="declare-detail" v-cloak v-loading="loading">
    <div class="title-bar clearfix"  v-if="baseList.checkState && baseList.checkState.data">
      <div class="logotxt fl">
        <div v-if="baseList.checkState.data == '通过'" class="logo-button"></div><span v-if="baseList.checkState.data == '通过'" class="logo-text">{{baseList.checkState.data}}</span>
        <div v-if="baseList.checkState.data == '不通过'" class="logo-nobutton"></div><span v-if="baseList.checkState.data == '不通过'" class="logo-notext">{{baseList.checkState.data}}</span>
        <div v-if="baseList.checkState.data == '待审核'" class="logo-staybutton"></div><span v-if="baseList.checkState.data == '待审核'" class="logo-staytext">{{baseList.checkState.data}}</span>
        <span>{{isEmpty(baseList,'orgId.data')}} {{isEmpty(baseList,'declareAwards.data')}}候选对象申请表</span>
      </div>
      <div class="fr" v-if="baseList.checkState.data == '待审核'">
        <el-button class="js-button" disabled="disabled">编辑</el-button>
      </div>
      <div class="fr" v-if="baseList.checkState.data == '通过'">
        <el-button class="js-button" @click="toExport">导出</el-button>
        <el-button class="js-button" @click="addNewProject">报审新项目</el-button>
      </div>
      <div class="fr" v-if="baseList.checkState.data == '不通过'">
        <el-button class="js-button" @click="toEdit(baseList)">编辑</el-button>
        <el-button class="js-button" @click="addNewProject">报审新项目</el-button>
      </div>
      <div  class="clearfloat"v-if="baseList.checkState.data == '不通过'"><span>整改意见</span>
        <span style="width: 94%;float: right">{{baseList.checkOpinion}}</span>
      </div>
    </div>
    <base-card-box header="党组织所在社会组织基本情况"  imgSquare>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              社会组织名称
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'enterpriseName')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              地址
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'enterpriseAddress')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              法人代表姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'legalPerson')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              政治面貌
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'politicsStatus')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织书记姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'secretary')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              职工人数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'empAmount')}}名
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <base-card-box header="党建工作基本情况"  imgSquare>
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织成立时间
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'orgCreateTime')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              所属党组织
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'orgId.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党员数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'memberNum')}}名
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织设置
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'orgSet.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              是否建立工会
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'isCreateUnions')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              是否建立团组织
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'isCreateTeam')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织活动场所面积
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'activityArea')}}平米
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title card_multiple" style="width: 210px">
              哪年被命名为市级“双比双争”先进社会组织党组织
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'awardedYear')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box1">
            <div class="card-box-title card_multiple">
              开展党建工作的先进事迹
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'advancedDeed')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box1">
            <div class="card-box-title card_multiple">
              党组织和党员、所在企业获得表彰
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'recognition')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              申报人
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'declarant')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'contact')}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>
<!--    <div class="content">-->
<!--      <base-card-box header="" :margin="{top: true}" style="width: 100%">-->
<!--        <div class="content-title">-->
<!--          注：1、要严格按照标准推荐候选对象,并分别形成主要事迹材料,连同此表一并上报省委非公工委办公室-->
<!--          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--          2、此表有关信息请市、县(市、区)委组织部、非公经济和社会组织工委与工商(市场监管)、人社、税务、工会、共青团等部门进行核对。-->
<!--        </div>-->
<!--      </base-card-box>-->
<!--    </div>-->
<!--    <div class="text-center bg-fff mt-20 pt-20 pb-20">-->
<!--      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>-->
<!--    </div>-->
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import '@/styles/priority.scss' // 争先创优审核样式 css
    import {getRecordNonExport} from "@/api/backstage/party/priority/record/record.js"
    import {getNonRecordDetail} from "@/api/backstage/party/priority/awards/awards.js"
    import VDistpicker from 'v-distpicker'
    export default {
        components: {VDistpicker},
        name: 'socialOrgDetail',
        props: {
            params: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                loading:true,//加载遮罩条件
                placeholders: {//地址
                    province: '安徽省',
                    city: '合肥市',
                    area:'蜀山区' ,
                },
                declareAwardData:{
                    companyId:{ //企业名称
                        data:'',
                        key:''
                    },
                    companyAddress:'',//地址
                    legalPerson:'', //法人代表姓名
                    politicsStatus:'',//政治面貌
                    secretary:'',//党组织书记姓名
                    pluralistic:'',//兼职任务
                    empAmount:'',//职工人数
                    totalAssets:'', //资产总额
                    preYearRevenue:'',//上一年度营收总额(万元)
                    preYearRatepay:'',//上一年度纳税总额
                    orgCreateTime:'',//党组织成立时间
                    orgId:{  //所属党组织
                        data:'',
                        key:''
                    },
                    memberNum:'',//党员数
                    orgSet:{  //党组织设置
                        data:'',
                        key:''
                    },
                    isCreateParty:'',//是否建立工会
                    isCreateTeam:'',//是否建立团组织
                    activityArea:'',//党组织活动场所面积
                    workExpenditure:'',//党组织工作经费
                    developMemberNum:'',//发展党员数
                    partyActivelyNum:'', //培养入党积极分子数
                    mainDeed:'',//开展党建工作的先进事迹
                    recognition:'',//党组织和党员、所在企业获得表彰情况
                    declarant:'',//申报人
                    contact:'',//联系方式
                },
                baseList:[],//基本信息
                node: { // 必填项判断
                },
                results:{//审核结果
                    data:'通过',
                    key:''
                },
            }
        },
        created(){
            this.getDetail();
        },
        methods: {
            //返回列表页
            goBtn () {
                this.$emit('handleSwitch', {name: 'Index'})
            },
            //获取详情信息
            getDetail(){
                let params = {
                    id:this.params.id
                }
                getNonRecordDetail(params).then(respone => {
                    const res = respone
                    this.baseList = res
                }).finally(() =>{
                    this.loading = false;
                })
            },
            //提交新项目
            addNewProject(){
                this.$emit('handleSwitch', {name: 'Index',type:"1"})
            },
            //编辑
            toEdit(row){
                this.$emit('handleSwitch', {name: 'socialOrgAdd', params: row})
                // this.visible = true
            },
            //导出
            toExport(){
                let params = {
                    id:this.params.id
                }
                getRecordNonExport(params);
            },
        }
    }
</script>

<style lang="scss" scoped>
  .declare-detail {
    background: #eee;
    top: 0px;
  }
  .content {
    margin-bottom: 20px;
  }
  .content-title {
    margin: 20px 20px 0 20px ;
    color: #555555;
    font-size: 17px;
    line-height: 27px; ;
  }
  .el-form /deep/{
    background: #fff;
  }
  /*.logo-top{*/
    /*padding:14px 20px;*/
    /*margin-bottom:20px;*/
    /*background: #fff;*/
  /*}*/
  /*.logo-button {*/
  /*  width: 65px;*/
  /*  height: 24px;*/
  /*  background: #FC5921;*/
  /*  opacity: 0.1;*/
  /*  border-radius: 194px;*/
  /*  position: relative;*/
  /*}*/
  /*.logo-text{*/
  /*  font-size: 14px;*/
  /*  font-family: Microsoft YaHei;*/
  /*  font-weight: 400;*/
  /*  line-height: 19px;*/
  /*  color: #FC5921;*/
  /*  position: absolute;*/
  /*  left: 33px;*/
  /*}*/

  .logotxt{
    display:flex;
    align-items:center;
    line-height:36px;
    font-size: 16px;
    color: #7D7D7D;
  }
  .logotxt sapn{
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: #666666;
  }
  .line{
    width:100%;
    height:12px;
    background:#eee;
  }
  .card-row {
    /*height: 50px;*/
    height: auto;
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
      margin-left: 20px;
      font-weight: bold;
      font-size: 14px;
    }
  }
  /deep/.el-form-item__content {
    line-height: 36px!important;
    position: relative;
    font-size: 14px;
  }
  /deep/.distpicker-address-wrapper select {
    /* padding: .5rem .75rem; */
    padding: 0;
    height: 36px!important;
    width: 152px!important;
    padding: -108px 0 0 0;
    font-size: 1rem;
    line-height: 36px!important;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
  .card_line {
    line-height: 20px;
  }
  .card_multiple{
    line-height: 20px;
  }
</style>
