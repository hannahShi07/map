<template>
  <div class="declare-detail" v-cloak v-loading="loading">
    <div class="title-bar clearfix">
      <div class="logotxt fl">
        <div  class="logo-staybutton"></div><span class="logo-staytext">{{baseList.checkState.data}}</span>
        <span>{{isEmpty(baseList,'orgId.data')}} {{isEmpty(baseList,'declareAwards.data')}}候选对象申请表</span>
<!--        <div v-if="baseList.checkState.data == '不通过'"><span>整改意见</span>-->
<!--          <span>{{baseList.checkOpinion}}</span>-->
<!--        </div>-->
      </div>
    </div>
    <base-card-box header="党组织所在企业基本情况"  imgSquare>
      <el-row class="card-row" v-if="baseList.declareAwards.key=='2279092149023375372'">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              企业名称
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'enterpriseId.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row" v-if="baseList.declareAwards.key=='2279092149023375369'||baseList.declareAwards.key=='2279092149023375366'">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              社会组织名称
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'enterpriseId.data')}}
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
        <el-col :span="8" v-if="baseList.declareAwards.key=='2279092149023375372'">
          <div class="card-box">
            <div class="card-box-title">
              兼职任务
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'pluralistic')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              职工人数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'empAmount')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="baseList.declareAwards.key=='2279092149023375372'">
          <div class="card-box">
            <div class="card-box-title">
              资产总额
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'totalAssets')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row" v-if="baseList.declareAwards.key=='2279092149023375372'">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              {{this.nowYear-1}}年营收总额
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'preYearRevenue')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              {{this.nowYear-1}}年纳税总额
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'preYearRatepay')}}
            </div>
          </div>
        </el-col>
      </el-row>
    </base-card-box>

    <base-card-box header="党建工作基本情况" imgSquare>
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
              党员数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'memberNum')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
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
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              是否建立团组织
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
              党组织活动场所面积
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'activityArea')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="baseList.declareAwards.key=='2279092149023375369'">
            <div class="card-box">
              <div class="card-box-title card_line">
                哪年被命名为市级“双比双争”先进社会组织党组织
              </div>
              <div class="card-box-content">
                {{isEmpty(baseList,'awardedYear')}}
              </div>
            </div>
        </el-col>
        <el-col :span="8" v-if="baseList.declareAwards.key=='2279092149023375372'">
          <div class="card-box">
            <div class="card-box-title card_line">
              {{this.nowYear}}年党组织工作经费
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'workExpenditure')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row" v-if="baseList.declareAwards.key=='2279092149023375372'">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              {{this.nowYear}}年发展党员数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'developMemberNum')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title card_line">
              {{this.nowYear}}培养入党积极分子数
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'partyActivelyNum')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box1">
            <div class="card-box-title card_multiple">
              开展“双强六好”创建活动、抓党建工作的主要事迹
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
<!--        <div class="card-title">-->
<!--          <p>-->
<!--            注：1、要严格按照标准推荐候选对象,并分别形成主要事迹材料,连同此表一并上报省委非公工委办公室-->
<!--            </br>-->
<!--            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、此表有关信息请市、县(市、区)委组织部、非公经济和社会组织工委与工商(市场监管)、人社、税务、工会、共青团等部门进行核对。-->
<!--          </p>-->
<!--        </div>-->
<!--      </base-card-box>-->
<!--    </div>-->
    <div class="content">
      <base-card-box header="" :margin="{top: true}" style="width: 100%">
        <div class="card-title" style="font-size: 14px">
          审核结果&nbsp;&nbsp;&nbsp;&nbsp;
          <el-radio-group v-model="results.data">
            <el-radio label="通过" ></el-radio>
            <el-radio label="不通过" ></el-radio>
          </el-radio-group>
        </div>
        <div class="card-title" v-if="results.data == '不通过'">
          <el-form :model="fromDate" :rules="node" ref="refForm">
            <el-form-item class="is-required" label="整改意见" prop="opinions">
              <div class="card-box">
                <el-input
                  placeholder="请输入"
                  v-model="fromDate.opinions"
                  type="textarea"
                  :autosize='{ minRows: 5, maxRows:5}'
                  resize="none"
                  maxlength="500"
                  show-word-limit/>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </base-card-box>
    </div>
    <div class="tac el-col el-col-24">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">取消</el-button>
      <el-button @click="toSave" class="page-btn page-btn-hollow">确定</el-button>
    </div>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import '@/styles/priority.scss' // 争先创优审核样式 css
    import {getDeclareNonDetail,getDeclareNonSave,getDeclareExport} from "@/api/backstage/party/priority/declare/declare.js"
    export default {
        name: 'declareAdd',
        props: {
            params: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                loading:true,//加载遮罩条件
                tableData1: [{a: '1', b: '2', c: '3'}],
                tableData2: [{a: '1', b: '2', c: '3'}],
                tableData3: [{a: '1', b: '2', c: '3'}],
                // 审核结果
                results:{
                    data: "通过",
                    key: ""
                },
                baseList:{
                    // 审核结果
                    checkState:{
                        data: "通过",
                        key: ""
                    },
                    declareAwards:{
                        data: "",
                        key: ""
                    },
                    orgId:{
                        data: "",
                        key: ""
                    },
                },//基本信息

                fromDate:{opinions:''},//整改意见
                node: { // 必填项判断
                    opinions:{
                        required: true,
                        message: "请输入整改意见",
                        trigger: "blur"
                    },
                },
                defaultDate:'',//当前时间
                nowYear:'',
            }
        },
        created(){
            this.getDetail();
            this.defaultDate = this.getNowTime();
            this.nowYear = this.formatDateTime(this.defaultDate)
        },
        methods: {
            //返回列表页
            goBtn () {
                this.$emit('handleSwitch', {name: 'Index'})
            },
            //提交新项目
            addNewProject(){
                this.$emit('handleSwitch', {name: 'addDeclareproject'})
            },
            //编辑
            toEdit(row){
                this.$emit('handleSwitch', {name: 'DeclareAdd',params:row})
            },
            //导出
            toExport(){
                let params = {
                    id:this.params.id
                }
                getDeclareExport(params);
            },
            //处理默认选中当前日期
            getNowTime() {
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth(); //得到月份
                var date = now.getDate(); //得到日期
                month = month + 1;
                month = month.toString().padStart(2, "0");
                date = date.toString().padStart(2, "0");
                this.defaultDate = `${year}-${month}-${date}`;
                return this.defaultDate;
            },
            //时间转化年月日
            formatDateTime(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m > 9 ? m : '0' + m;
                return y;
            },
            //确定确定
            toSave(){
                if(this.results.data == '通过'){
                    this.$confirm('确认通过'+this.baseList.orgId.data+this.baseList. declareAwards.data +'候选对象申请表？', '确认通过', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = {
                            id:this.baseList.id,
                            checkState:{key:'2276584609676091424'}
                        }
                        getDeclareNonSave(params).then(response =>{
                            const  res = response
                            this.$emit('refresh')
                            this.$message(this.successTip())
                            this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                        })
                        // this.$message({
                        //     type: 'success',
                        //     message: '确定成功!'
                        // });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消确定'
                        });
                    });
                }else if(this.results.data == '不通过'){
                    this.$refs['refForm'].validate((valid) => {
                        if (!valid) {
                            // this.$message.warning("您有必填项未填")
                            return // 表单必填项判断
                        } else {
                            let params = {
                                checkOpinion: this.fromDate.opinions,
                                id: this.baseList.id,
                                checkState: {key: '2276584609676091431'}
                            }
                            getDeclareNonSave(params).then(response => {
                                const res = response
                                this.$emit('refresh')
                                this.$message(this.successTip())
                                this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                            })
                        }
                    })
                }
            },
            //获取详情信息
            getDetail(){
                let params = {
                    id:this.params.id
                }
                getDeclareNonDetail(params).then(respone => {
                    const res = respone
                    this.baseList = res
                    this.baseList.checkState.data = res.checkState.data
                }).finally(() =>{
                    this.loading = false;
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  /deep/.el-icon-warning:before{
    background: url("../../../../../../assets/page/to-sure.png") no-repeat;
  }
  .declare-detail {
    background: #eee;
    top: 0px;
  }

  .card-row {
    height: auto;
    line-height: 50px;
  }
  .tac {
    text-align: center;
    padding: 20px 0;
  }
  .content-title {
    margin: 20px 20px 0 20px ;
    color: #666666;
    font-size: 20px;
    font-weight: bold;
    line-height: 26px;
  }
  .card-title {
    margin: 20px 20px 0 20px ;
    color: #555555;
    font-size: 17px;
    line-height: 26px;
  }
  .content {
    /*margin-bottom: 20px;*/
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
    .card_line {
      line-height: 20px;
    }
    .card_multiple {
      line-height: 25px;
    }

    .card-box-content {
      flex: 1;
      margin-left: 20px;
      font-weight: bold;
      font-size: 14px;
    }
  }
</style>
