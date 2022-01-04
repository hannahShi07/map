<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="740px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-row class="box">
      <el-col :span="3">
        <span class="label">组织名称</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.orgName | tableEmptyText}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
<!--      <el-col :span="3">-->
<!--        <span class="label">书记名称</span>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <span class="value">{{formData.secretary | tableEmptyText}} &nbsp;</span>-->
<!--      </el-col>-->
      <el-col :span="3">
        <span class="label">{{typeText}}类型</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.prizePunishType | tableEmptyText}}</span>
      </el-col>
    </el-row>
<!--    <el-row class="box">-->
<!--      <el-col :span="3">-->
<!--        <span class="label">组织人数</span>-->
<!--      </el-col>-->
<!--      <el-col :span="21">-->
<!--        <span class="value">{{formData.memberNum | tableEmptyText}}</span>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-row class="box">
      <el-col :span="3">
        <span class="label">地址</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.orgAddress | tableEmptyText}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">批准机关</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.approvaOffice | tableEmptyText}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">{{typeText}}名称</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.name | tableEmptyText}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">{{typeText}}说明</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{formData.instructions | tableEmptyText}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">附件</span>
      </el-col>
      <el-col :span="21">
        <span class="value" v-if="!fileList.length">--</span>
        <div v-else class="file-item" v-for="(item,index) in fileList" :key="index">
          <div class="file-wrap" @click="download(item)">
            <img src="@/assets/page/file-icon1.png" alt="" style="margin-left: 10px;" width="12" height="16">
            <span>{{item.submittedFileName}}</span>
            <img src="@/assets/page/file-icon2.png" style="margin: 0 10px;" width="16" height="16">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="box">
      <el-col :span="3">
        <span class="label">图片</span>
      </el-col>
      <el-col :span="21">
        <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0">
          <div class="card-img" v-for="(item,index) in fileListimg">
            <img :src="item.url">
          </div>
        </div>
        <span class="value" v-if="fileListimg=='' || fileListimg==undefined || fileListimg==null || fileListimg=='null' || fileListimg.length<1">--</span>
      </el-col>
    </el-row>

    <div slot="footer" style="text-align: center">
      <el-button type="primary" @click="visible = false">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getAwardOrgMsg} from '@/api/backstage/party/award/org'
  import commonReq from '@/api/public/commonReq'

  export default {
    data () {
      return {
        title: '详情',
        visible: false,
        formData: {
          id: '',
          // 组织奖励 || 组织惩处
          type: '',
          // 组织名称
          orgName: '',
          // 书记名称
          secretary: '',
          // 组织人数
          memberNum: '',
          // 地址
          orgAddress: '',
          // 奖励日期
          approvalDate: '',
          // 奖励类型
          prizePunishType: '',
          // 奖励名称
          name: '',
          // 惩处说明
          instructions: '',
          // 批准机关
          approvaOffice: ''
        },
        fileList: [],
        fileListimg:[]//图片
      }
    },
    computed: {
      typeText () {
        return this.formData.type === '2297065814069248071' ? '奖励' : '惩处'
      }
    },
    methods: {
      show (row) {
        this.visible = true
        this.formData.id = row.id
        this.formData.type = row.type.key
        this.fileList = []

        getAwardOrgMsg({id: row.id}).then(res => {
          this.formData.orgName = res.orgId.data
          this.formData.secretary = res.secretary
          this.formData.memberNum = res.memberNum
          this.formData.orgAddress = res.orgAddress
          this.formData.approvalDate = res.approvalDate
          this.formData.prizePunishType = res.prizePunishType.data
          this.formData.name = res.name
          this.formData.instructions = res.instructions
          this.formData.approvaOffice = res.approvaOffice
        })

        commonReq.getAttachment({bizIds: this.formData.id}).then(response => {
          const res = response;
          if(res.length > 0){
            for(let i=0;i<res.length;i++){
              if(res[i].list.length > 0){

                if(res[i].bizType=='duseTypeimg'){//图片
                  this.fileListimg = res[i].list;
                }
                if(res[i].bizType=='duseType'){//附件
                  this.fileList = res[i].list;
                }

              }
            }

          }else{

            this.fileListimg =[];
            this.fileList=[];
          }
        })
      },
      download (data) {
        //window.open(url)
        let url = data.url
        commonReq.downloadFile(url,data.submittedFileName)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    padding: 16px 0;
    border-bottom: 1px solid #F3F3F3;
  }

  .label {
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .value {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  .file-item {
    line-height: 32px;
    margin-bottom: 10px;
    height: 32px;
    border-radius: 4px;

    .file-wrap {
      cursor: pointer;
      display: inline-block;
      background: #F9F9F9;

      img {
        vertical-align: middle;
      }

      span {
        font-size: 14px;
        color: #999999;
        margin-left: 10px;
      }
    }
  }
  .card-box-content {
    // flex: 1;
    //width: calc(100% - 120px);
    padding: 16px 0;
    font-weight: bold;
    font-size: 14px;
    color:#333;
    padding-right:20px;
  }
  .card-img{
    width:100%;
    margin-bottom:10px;
  }
  .card-img img{
    width:100%
  }
</style>
