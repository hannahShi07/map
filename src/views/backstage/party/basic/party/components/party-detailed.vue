<template>
  <div class="party-detail" v-cloak v-loading="loading">
    <base-card-box header="基本信息" isImg :imgUrl="imgUrl" imgSquare>
      <el-row class="card-row">
        <el-col :span="16">
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
              组织类别
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'category.data')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              党组织名称
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'name')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织编码
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'orgNum')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党组织类型
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
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
            <el-tooltip class="item" effect="dark" :content="isEmpty(baseList,'approNum')" placement="top-start">
              <div class="card-box-content overContent">
                {{isEmpty(baseList,'approNum')}}
              </div>
            </el-tooltip>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              统一代码
            </div>
            <div class="card-box-content">
              {{isEmpty(baseList,'unifyCode')}}
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
              {{isEmpty(baseList,'ssqId')}}-{{isEmpty(baseList,'address')}}
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

    <base-card-box header="组织奖惩信息" :margin="{top: true}">
      <div style="margin: 20px 20px 0 20px;">
        <el-table :data="baseList.orgPrizePunishList" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="60" align="center"/>
          <el-table-column label="奖惩名称" prop="a" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.orgPrizePunishList[scope.$index],'name')}}
            </template>
          </el-table-column>

          <el-table-column label="奖惩类型" prop="b" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.orgPrizePunishList[scope.$index],'prizePunishType.data')}}
            </template>
          </el-table-column>

          <el-table-column label="批准机关" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.orgPrizePunishList[scope.$index],'approvaOffice')}}
            </template>
          </el-table-column>

          <el-table-column label="批准日期" width="200" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.orgPrizePunishList[scope.$index],'approvalDate')}}
            </template>
          </el-table-column>

        </el-table>
      </div>
    </base-card-box>

    <base-card-box header="班子成员信息" :margin="{top: true}" >
      <div style="margin: 20px 20px 0 20px;">
        <el-table :data="baseList.leadershipList" header-row-class-name="page-table-header"  :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="60" align="center"/>
          <el-table-column label="姓名" width="200" prop="a" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.leadershipList[scope.$index],'memberId.data')}}
            </template>
          </el-table-column>

          <el-table-column label="党内职务" width="300" prop="b" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ isEmpty(baseList.leadershipList[scope.$index],'position.data')}}
            </template>
          </el-table-column>

          <el-table-column label="所属组织" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.leadershipList[scope.$index],'orgId.data')}}
            </template>
          </el-table-column>

          <el-table-column label="任职日期" width="200" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.leadershipList[scope.$index],'officeDate')}}
            </template>
          </el-table-column>

        </el-table>
      </div>
    </base-card-box>

    <base-card-box header="换届选举信息" :margin="{top: true}" style="margin-bottom: 80px">
      <div style="margin: 20px 20px 0 20px; ">
        <el-table :data="baseList.elctionList" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="60" align="center"/>
          <el-table-column label="换届日期" prop="a" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.elctionList[scope.$index],'transitionDate')}}
            </template>
          </el-table-column>

          <el-table-column label="届满日期" prop="b" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ isEmpty(baseList.elctionList[scope.$index],'endDate')}}
            </template>
          </el-table-column>

          <el-table-column label="本届任期" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.elctionList[scope.$index],'term.data')}}
            </template>
          </el-table-column>

          <el-table-column label="选举方式" prop="c" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              {{isEmpty(baseList.elctionList[scope.$index],'electionWay.data')}}
            </template>
          </el-table-column>

        </el-table>
      </div>
    </base-card-box>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div>
  </div>
</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import {getPartydetail} from "@/api/backstage/party/basic/party/party.js"
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: 'PartyDetailed',
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loading:true,//加载遮罩条件
        imgUrl: "",
        tableData1: [{a: '1', b: '2', c: '3'}],
        tableData2: [{a: '1', b: '2', c: '3'}],
        tableData3: [{a: '1', b: '2', c: '3'}],
        baseList:[],//基本信息
      }
    },
    activated(){
      this.getDetail()
    },
    created(){
      this.getDetail()
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

        this.getFile()

        getPartydetail(params).then(respone => {
          const res = respone
          this.baseList = res
        }).finally(() =>{
          this.loading = false
        })
      },
      //获取头像
      getFile(){
        let params={
          bizIds: this.params.id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
              this.imgUrl = res[0].list[0].url
            }else{
              this.imgUrl = require('@/assets/temp/temp-head.png')
            }
          }else{
            this.imgUrl = require('@/assets/temp/temp-head.png')
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .party-detail {
    background: #eee;
  }

  .card-row {
    /*height: 50px;*/
    height: 100%;
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
    .overContent {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
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
