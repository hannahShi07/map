<template>
  <div class="sociology-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="12" class="information-left">
              <el-form-item label="指导员姓名" prop="">
                {{isEmpty(formData.guidanceName)}}
              </el-form-item>
            </el-col>
            <el-col :span="12" class="information-right">
              <el-form-item label="联系方式" prop="">
                {{isEmpty(formData.phone)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" class="information-left">
              <el-form-item label="指导方式" prop="">
                {{isEmpty(formData.manner.data)}}
              </el-form-item>
            </el-col>
            <el-col :span="12" class="information-right">
              <el-form-item label="指导时间" prop="">
                {{isEmpty(formData.guidanceTime) | processingDate}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="information-center">
              <el-form-item label="指导企业" prop="">
                {{isEmpty(formData.enterpriseName)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="company information-center">
              <el-form-item label="指导对象" prop="">
                <div class="enterprise">
                  <el-row>
                    <el-col :span="24">
                      <div class="enterprise-title">{{isEmpty(formData.enterpriseName)}}</div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="法定代表人：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.legalPerson)}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系方式：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.phone)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="组织机构代码：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.orgCode)}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="credit-code">
                      <el-form-item label="统一社会信用代码：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.creditCode)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="企业类型：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.type.data)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="注册地址：" prop="">
                        {{isEmpty(formData.djGuidanceEnterpeiseVo.registeredAddres)}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="information-center">
              <el-form-item label="指导内容" style="height:auto;font-weight:unset;" prop="">
                <div v-html="isEmpty(formData.content)"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="information-center">
              <el-form-item label="整改建议" style="height:auto;font-weight:unset;" prop="">
                <div v-html="isEmpty(formData.suggest)"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="company information-center" :span="24">
              <el-form-item label="附件" prop="">
                <div class="card-box-content card-box-content1">
                  <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-filebox" v-for="(item,index) in fileList" @click="download(item.submittedFileName,item.url)">
                    <div class="card-file">
                      <img src="@/assets/page/file-icon1.png">
                      <span>{{item.submittedFileName}}</span>
                      <img src="@/assets/page/file-icon2.png">
                    </div>
                  </div>
                  <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {recordInfo} from "@/api/backstage/consulting/enterprise/instructor/instructor.js"
import commonReq  from "@/api/public/commonReq.js"
export default {
  name: "RecordInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"指导记录详情",//标题
      options:[
        {
          label:"是",
          value:0
        },
        {
          label:"否",
          value:1
        }
      ],
      photo:"",
      formData:{
        content: "",
        createTime: "",
        createUser: '',
        djGuidanceEnterpeiseVo: {
          type:{}
        },
        enterpriseId: "",
        enterpriseName: '',
        guidanceId: '',
        guidanceName: '',
        guidanceTime: '',
        id: '',
        manner: {},
        num: '',
        phone: '',
        suggest: '',
        updateTime: '',
        updateUser: ''
      },
      node:{},
      imageUrl:'',
      fileList:[],//附件
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    close(){
      this.formData={
        content: "",
        createTime: "",
        createUser: '',
        djGuidanceEnterpeiseVo: {
          type:{}
        },
        enterpriseId: "",
        enterpriseName: '',
        guidanceId: '',
        guidanceName: '',
        guidanceTime: '',
        id: '',
        manner: {},
        num: '',
        phone: '',
        suggest: '',
        updateTime: '',
        updateUser: ''
      }
      this.visible=false;
    },
    show(row){
      this.visible=true;
      this.getInfo(row.id)
      this.getFile(row.id)
    },
    getInfo(id){
      let params = {
        id:id
      }
      this.loading = true;
      recordInfo(params).then(response => {
        this.formData = response;
        this.loading = false;
      }).finally(() => {

      });
    },
    //获取附件
    getFile(id){
      let params={
        bizIds: id,
      }
      commonReq.getAttachment(params).then(response => {
        const res = response;
        if(res.length > 0 && res[0].list.length > 0){
          if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
            this.fileList = res[0].list
          }
        }
      })
    },
    //下载附件
    download(fileName,loadurl){
      commonReq.downloadFile(loadurl,fileName)
    },
  },
  filters :{
    processingDate(val){
      let date=val.split(" ")[0]
      return date
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 740px;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 0!important;
    color: #333;
    font-weight: bold;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information >>> .el-form-item__label{
    text-align: left;
  }
  .information >>> .el-form-item{
    height: 50px;
    padding: 5px 0;
    margin:0;
    border-bottom: 1px solid #EEEEEE;
  }
  .enterprise{
    float: left;
    width: 100%;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    margin-top: 8px;
    padding:14px;
  }
  .enterprise-title{
    color: #333;
    font-weight: bold;
  }
  .sociology-add .enterprise >>> .el-form-item{
    border:none;
    color: #666;
    font-weight: 400;
  }
  .enterprise >>> .el-form-item__label{
    width: 140px !important;
    color: #333;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .enterprise >>> .el-form-item{
    height: 40px;
    padding: 0;
  }
  .company >>> .el-form-item__content{
    line-height: 30px;
  }
  .card-box-content {
    width: calc(100% - 120px);
    padding: 16px 0;
    font-weight: bold;
    font-size: 14px;
    color:#333;
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
  .information-left >>> .el-form-item{
    width: calc(100% + 20px);
    margin-left: -20px;
    padding-left: 20px;
  }
  .information-right >>> .el-form-item{
    width: calc(100% + 20px);
    margin-right: -20px;
    padding-right: 20px;
  }
  .information-center >>> .el-form-item{
    width: calc(100% + 40px);
    margin-left: -20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .enterprise>>>.el-form-item__label{
    width: 130px !important;
    padding: 0;
  }
  .credit-code>>>.el-form-item__content{
    margin-left: 130px !important;
    line-height: 20px;
    padding: 10px 0;
  }
</style>
