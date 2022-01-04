<template>
  <div class="history-detail">
    <div class="logo-top bc clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/development/icon-person.png">
        <span>党员详情</span>
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

        <!--<base-card-box header="入党信息" :margin="{top: true}">-->
          <!--<el-row class="card-row">-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--所属党组织-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'orgId.data')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--入党时所在党支部-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'branch')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--人员类型-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'type.data')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <!--<el-row class="card-row">-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--入党介绍人-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'reference')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--申请入党时间-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'applyJoinDate')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--确定为入党积极分子日期-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'confirmActivistDate')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <!--<el-row class="card-row">-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--确定为发展对象日期-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'confirmDevelopDate')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--入党日期-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'joinDate')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--转正日期-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'positiveDate')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->

          <!--<el-row class="card-row">-->
            <!--<el-col :span="24">-->
              <!--<div class="card-box">-->
                <!--<div class="card-box-title">-->
                  <!--党龄-->
                <!--</div>-->
                <!--<div class="card-box-content">-->
                  <!--{{isEmpty(baseList,'partyAge')}}-->
                <!--</div>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</base-card-box>-->



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
  </div>
</template>

<script>
  import HistoryDetailTabFlow from '@/views/backstage/party/basic/history/components/history-detail-tab-flow'
  import {getHistoryDetail,getHistoryDetailFile} from "@/api/front/party/development/documentary/documentary.js";
  import commonReq  from "@/api/public/commonReq.js"

  export default {
    name: 'dev-detail',
    components:{
      HistoryDetailTabFlow
    },
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
        // 加载遮罩条件
        loading:true,
        // tab切换
        activeName: '1',
        // 图片
        imgUrl: '',
        // 基本信息
        baseList:[],
        // 党员id
        id:"",
        // 发展流程相关附件
        detailFile: [],
      }
    },
    activated(){
      this.geBaseDetail();
      this.getBaseFile();
    },
    created () {
      this.geBaseDetail();
      this.getBaseFile();
    },
    methods: {
      // 发展流程接口-相关附件
      getBaseFile(){
        let id = this.params.id
        let params = {
          model:{
            id:id
          }

        }

        getHistoryDetailFile(params).then(respone => {
          const res = respone
          this.detailFile = res.records;
          console.log("res:",res)
        })
      },
      // 下载附件
      download(flag,fileName,loadurl){
        if(flag === '1'){
          window.open('http://112.30.98.118:9088/onlinePreview?url='+`${Base64.encode(loadurl)}`)
        }else if(flag === '2'){
          commonReq.downloadFile(loadurl,fileName)
        }
      },
      // 获取头像
      getFile(id){
        let params={
          bizIds: id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
              this.imgUrl = res[0].list[0].url
            }else {
              this.imgUrl =  require('@/assets/head/user-head.png')
            }
          }else {
            this.imgUrl =  require('@/assets/head/user-head.png')
          }
        })
      },
      // 基本信息接口
      geBaseDetail(){
        this.id = this.params.id
        let params = {
          id:this.id
        }

        if(this.type != "dev"){
          params.id = this.params.memberId
          params.floatId = this.id
        }
        this.loading = true;

        this.getFile(this.id)

        // 党员详情
        getHistoryDetail(params).then(respone => {
          const res = respone
          this.baseList = res

        }).finally(() =>{
          this.loading = false;
        })
      },
      // 返回
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

