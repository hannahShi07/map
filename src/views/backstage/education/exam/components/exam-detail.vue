<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px" v-loading='loading' >

      <div class="divider-h1">考试信息</div>
      <el-form-item label="考试名称" prop="examName">
        <span>{{formData.exam.examName}}</span>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" prop="beginTime">
            <span>{{formData.exam.beginTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="beginTime">
            <span>{{formData.exam.endTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="时间限制" prop="isRestrict">
        <span>{{formData.exam.isRestrict=='1'? (formData.exam.examTime + '分钟'):'无'}}</span>
      </el-form-item>

      <div class="divider-h1">考试对象</div>
      <el-form-item label="考试组织" v-if="orgFlag" prop="examScope">
        <span v-for='(item,index) in examObject' :key="index">{{item.name}}<i v-if="index+1 != examObject.length">、</i></span>
      </el-form-item>
      <el-form-item label="考试人员" v-else prop="examScope">
        <span v-for='(item,index) in examObject' :key="index">{{item.name}}<i v-if="index+1 != examObject.length">、</i></span>
      </el-form-item>

      <div class="divider-h1">试卷设置</div>
      <el-form-item label="试卷状态" prop="paperStatus" label-width="110px">
        <span style="color: #CCCCCC; font-size: 14px;margin-right: 30px;">{{formData.exam.paperStatus == '1'?"已添加":"未添加"}}</span>
        <span style="color: #53A0FF; cursor: pointer;" @click="preview">
            <i class="iconfont icon-xiangqing"/>
            预览试卷
        </span>
      </el-form-item>
      <el-form-item label="考试地点" prop="isOnline" label-width="110px">
        <span>{{formData.exam.address?formData.exam.address:'无'}}</span>
      </el-form-item>

      <div class="divider-h1">考试状态</div>
      <el-row>
        <el-col :span="16">
          <el-form-item label="考试结果" v-if="!isEdit" class="noBorder">
            <span style="color: #53A0FF; cursor: pointer;display:inline-block;" v-if="formData.exam.examStatus.key=='2309718804909785273'" @click="showResult(formData.exam.examStatus.key)">
              <i class="iconfont icon-xiangqing"/>
              查看考试结果
              <!-- <el-divider  direction="vertical"/> -->
            </span>
            <span style="color: rgb(204, 204, 204); cursor: pointer;display:inline-block;" v-else>
              <i class="iconfont icon-xiangqing"/>
              查看考试结果
              <!-- <el-divider  direction="vertical"/> -->
            </span>
          </el-form-item>
          <el-form-item label="考试结果" v-else class="noBorder" prop='file'>
            <span style="color: #53A0FF; cursor: pointer;position: absolute;" v-if="formData.exam.isUpload=='1'" @click="showResult(formData.exam.examStatus.key)">
              <i class="iconfont icon-xiangqing"/>
              查看考试结果
              <!-- <el-divider  direction="vertical"/> -->
            </span>
            <!-- <el-button size="medium" icon="el-icon-plus" @click="uploadResult">上传结果</el-button> -->
            <el-upload :headers='headers' :class="{Lfet:formData.exam.isUpload=='1'}" class="upload-demo" ref="upload" :action="action" :on-remove="handleRemove" :data='postData' :on-success='success' :on-change='fileChange' :file-list="fileList" :auto-upload="false" :multiple='false'>
              <el-button slot="trigger" size="small" ><i class="el-icon-plus pr-5"/>上传结果</el-button>
            </el-upload>
            <span class="loadSpan" @click="downLoad" :class="{hasLfet:formData.exam.isUpload=='1'}"><img src="@/assets/page/icon-load.png" alt="">点击下载excel文件模板</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="考试状态" class="noBorder">
            <!-- <div v-if="addStatus"> </div>-->
               <span class="ht" :class="{endStatus:formData.exam.examStatus.key=='2309718804909785273'}">{{formData.exam.examStatus.data}}</span>
              <el-tooltip class="item" effect="dark" v-if="formData.exam.examStatus.key=='2309718804909785262'" content="您需选择【发布考试】后，该考试才能生效；如暂不发布考试，可选择【保存信息】保存已填写信息" placement="top">
                <i class="iconfont icon-wenhao"></i>
              </el-tooltip>

            <!-- <div v-else>
               <span style="">{{formData.exam.examStatus.value}}</span>
            </div> -->
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>

    <div slot="footer" style="text-align: center" v-if="!isEdit">
      <el-button type="primary" @click="close">知道了</el-button>
    </div>
    <div slot="footer" style="text-align: center" v-else>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">保存</el-button>
    </div>
    <exam-result ref="refResult" :id='formData.exam.id'></exam-result>
    <preview-paper ref="refPreview"></preview-paper>
    <warnning-import-page ref="refWarn" @refresh="isAgain"></warnning-import-page>
  </el-dialog>
</template>

<script>
  import db from "@/utils/localstorage"
  import commonReq from '@/api/public/commonReq'
  import WarnningImportPage from '@/components/warnning-import-page/index'
  import { addExam,getExamDetail } from '@/api/backstage/education/exam'
  import ExamResult from './exam-result'
  import PreviewPaper from './previewPaper.vue'
  var fileList = []
  export default {
    components:{
      ExamResult,
      PreviewPaper,
      WarnningImportPage
    },

    data () {

      var checkFile= (rule, value, callback) =>{
        if(fileList.length){
          callback()
        } else {
          callback(new Error('请选择要导入的考试结果'))
        }
      }
      return {
        // false编辑  true添加
        addStatus: true,
        title: '详情',
        visible: false,
        loading: false,
        examObject:[],
        orgFlag:true,
        formData:{
          exam:{
            examStatus:{}
          },
          file:''
        },
        file:'',
        isEdit:false,
        saveLoading:false,
        templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/ksjgdr.xlsx`,
        templateName:'考试结果导入模版.xlsx',
        action:`${process.env.VUE_APP_BASE_API}/partycloud/learnExam/importExamResult`,
        postData:{
          headRows:1,
          titleRows:2,
          examId:''
        },
        fileList:[],
        rules:{
          file:[{required:true,validator:checkFile}]
        }
      }
    },
    created() {
    },
    methods: {

      show (id,flag) {
        this.isEdit = flag
        this.loading = true
        this.visible = true
        getExamDetail({id:id}).then(res => {

            this.formData = res
            this.postData.examId = res.exam.id;

            if(res.djMembers.length){
              this.examObject = res.djMembers
               this.orgFlag = false
            } else {
              this.examObject =res.orgList
              this.orgFlag = true
            }
            // this.
        }).finally(()=>{
          this.loading=false
        })
      },
      handleRemove(file, fileList){
        fileList = filelist
      },
      saveBtn(){
        this.$refs['refForm'].validate((valid=>{
          if(valid){
            this.$refs['upload'].submit()
          }
        }))

      },
      success(res){
        console.log(res)
        if(res.data.errorFileUrl){
          // this.$message.error('保存失败')
          this.$refs['upload'].clearFiles()
          this.$refs['refWarn'].show(res.data.errorFileUrl,res.data.errorNum,res.data.successNum)
        } else {
          // this.$message.success('保存成功')
          this.$message(this.successTip())
          this.close()
        }
      },
      preview(){
        let obj = {
          beginTime:this.formData.exam.beginTime,
          endTime:this.formData.exam.endTime,
          examName:this.formData.exam.examName,
          questIds:this.formData.exam.questIds,
          questScores:this.formData.exam.questScores
        }
        this.$refs.refPreview.show(obj)
      },
      showResult(state){
        if(state == '2309718804909785262' || state == '2309718804909785265'){
          this.$message({
            type:'warning',
            message:'考试还未开始，无法查看考试结果'
          })
        } else {
          let type = 'org'
          if(this.formData.orgList.length){
            type = 'org'
          } else {
            type = 'person'
          }
          // console.log(type)
          this.$refs['refResult'].show(this.formData.exam.id,type,this.formData.exam.examName,this.formData.exam.orgId['data'])
        }
      },
      close () {
        this.visible = false
      },
      isAgain(val){

      },
      downLoad(){
        commonReq.downloadFile(this.templateUrl,this.templateName)
      },
      fileChange(file,filelist){
        // console.log(filelist)
        fileList = filelist
      }
    },
    filters:{
    },
    computed: {
      headers() {
        return {
          token: 'Bearer ' + db.get("TOKEN", ""),
          tenant: db.get("TENANT", "") || "",
          Authorization: `Basic ${Base64.encode(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)}`,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .divider-h1 {
    margin-top: 10px;
    padding-left:20px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    border-bottom: 1px solid #F3F3F3;
  }
  .divider-h1:first-child{
    margin-top: 0px;
  }
  .form-org-list {
    position: relative;
    margin-top: 10px;
    padding: 0 30px 0 12px;
    background: #F2F2F2;
    border-radius: 4px;
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .close {
      padding: 3px;
      position: absolute;
      right: 14px;
      top: 10px;
      line-height: 1;
      background: #fff;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .tips{
    font-size:12px;
    color:#CCCCCC;
    display: block;
    line-height: 20px;
  }
  .min{
    position: absolute;
    right: 0px;
    display: inline-block;
    width: 50px;
    text-align: right;
    padding-right: 10px;
  }
.ht{
  color:#FC7121;
}
.endStatus{
  color:#999;
}
.loadSpan{
  left: 112px;
}
.hasLfet{
  left: 215px;
}
/deep/ .el-dialog__body{
  padding:0;
  .el-form-item__label{
    color:#555;
  }
  .el-form-item{
    margin:0;
    border-bottom: 1px solid #f3f3f3;
  }
  .noBorder{
    border-bottom:0;
    padding: 20px 0;
  }
  .upload-demo{
    display: inline-block;
    margin-left:10px;
  }
  .Lfet{
    margin-left:113px;
  }
}

</style>
