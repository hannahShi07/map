<template>
    <el-dialog
      class="bc-heard"
      :title="title"
      :visible.sync="visible"
      width = '520px'
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      append-to-body
      @close='close'
    >
      <el-form :model="formData" :rules="node" ref="ruleForm" label-width="100px">
        <el-form-item class="is-required" :label="labelName" prop="parentId.data" v-if="isHaveOrg && !fixed">
          <!--<el-tooltip class="item" :content="formData.parentId.data" placement="top-start" :disabled="formData.parentId.data === ''" style="cursor:pointer!important;">-->
            <!--<el-input placeholder="请选择" v-model="formData.parentId.data" maxlength="100"  show-word-limit readonly @click.native="getTree" />-->
          <!--</el-tooltip>-->

          <text-tooltip
            :content="formData.parentId.data ? formData.parentId.data : '请选择'"
            class="wid190 bg-fff"
            :class="formData.parentId.data ? '': 'word-cl'"
            refName="name"
            @click.native="getTree"
          />
        </el-form-item>
        <el-form-item :label="labelName" v-if="isHaveOrg && fixed">
<!--          <el-input v-model="name" maxlength="100"  show-word-limit readonly disabled/>-->
          <text-tooltip
            :content="name"
            class="wid190"
            refName="name"
          >
          </text-tooltip>
        </el-form-item>
        <el-form-item class="file is-required" label="选择文件" prop="fileList">
          <el-upload
            v-model="formData.fileList"
            ref="commitment"
            :action="action"
            :data="otherDa"
            :headers="headers"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-success="successFile"
            :on-error="handleError"
            :on-change="handleChange"
            :on-remove="delet"
            :isHaveOrg="isHaveOrg"
            :fixed="fixed"
            :examin="examin"
            :accept="accept"
            :file-list="formData.fileList">
            <el-button size="middle" class="iconfont icon-plus">+ 选择附件</el-button>
          </el-upload>
          <span class="loadSpan" @click="downLoad"><img src="@/assets/page/icon-load.png" alt="">点击下载excel文件模板</span>
        </el-form-item>
        <el-col :span="24" class="tac">
          <el-button  @click="close">取消</el-button>
          <el-button type="primary" @click="determine()">确定</el-button>
        </el-col>

      </el-form>
      <!--导入成功/失败弹窗-->
      <warnning-import-page ref="refWarn" @refresh="isAgain"></warnning-import-page>

      <!--上级党组织弹窗-->
      <base-org-tree ref="orgTree" @refresh="getParentId"/>
    </el-dialog>

</template>

<script>
  //  内容公告样式 css
  import '@/styles/party-common.scss'
  // 提示框
  import commonReq  from "@/api/public/commonReq.js"
  import WarnningImportPage from '../warnning-import-page/index'
  import { getPartyImport } from "@/api/backstage/party/basic/party/party.js"
  import db from "@/utils/localstorage"
  import {Base64} from 'js-base64'

  export default{
    name:'BaseOrgImport',
    components:{
      WarnningImportPage
    },
    props:{
      // 标题
      title:{
        type:String,
        default:'导入'
      },
      // 导入地址
      action:{
        type:String,
        required: true,
        default: ''
      },
      // 导入模板地址
      templateUrl:{
        type:String,
        required: true,
        default:''
      },
      //下载模板文件名称
      templateName:{
        type:String,
        required: true,
        default:''
      },
      // 额外参数
      otherData:{
        type:Object,
        default(){
          return {
            parentOrgName:'',
            headRows:'1',
            titleRows:'1'
          }

        }
      },
      // 是否展示上级党组织、题库名称
      isHaveOrg:{
        type:Boolean,
        default:true
      },
      // 上级党组织、题库名称是否可选
      fixed:{
        type:Boolean,
        default:false
      },

      //是党务工作模块还是题库模块
      labelName:{
        type:String,
        default:'上级党组织'
      },

      // 是否是题库模块
      examin:{
        type:Boolean,
        default:false
      },

      // 接收文件的类型 doc、docx、pdf、xlsx、txt
      accept: {
        type: String,
        default: ".doc,.xls,.xlsx,.pdf"
      },
    },
    data(){
      return{
        // 模态
        visible: false,
        formData:{
          // 上级党组织（必填）
          parentId:{
            data: "",
            key: null
          },
          // 附件
          fileList:[],
        },
        otherDa:this.otherData,
        // 必填验证
        node:{
          'parentId.data':{
            required: true,
            message: '请选择上级党组织',
            trigger: 'blur'
          },
          fileList:{
            required: true,
            message: '请上传附件',
            trigger: "blur"
          }
        },

        // 附件
        file:null,

        // 点击了再次上传时为false
        again:true,
        // 当前党组织名称
        name: '',
        //题库id
        repoId:'',
      }
    },
    watch:{

    },
    computed: {
      headers() {
        return {
          token: 'Bearer ' + db.get("TOKEN", ""),
          tenant: db.get("TENANT", "") || "",
          Authorization: `Basic ${Base64.encode(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)}`,
          ContentType: `multipart/form-data`
        };
      }
    },
    methods:{
      // 删除附件
      delet(){
        this.formData.fileList = [];
      },
      // 覆盖上传
      handleChange(files, fileList){
        this.again =true
        this.formData.fileList = []
        this.formData.fileList.push(files);
        this.$refs['ruleForm'].clearValidate(['fileList']);
      },
      // 附件上传失败
      handleError(err, file, fileList) {
        this.$message.error("附件上传失败，请重试");
      },
      // 文件上传成功时的钩子
      successFile(response, file, fileList){
        const res = response
        if(!res.isSuccess){
            this.$message(res.msg)
            return false;
        }

        this.$refs.commitment.clearFiles();
        if(res.data.errorNum > 0){
          this.$refs['refWarn'].show(res.data.errorFileUrl,res.data.errorNum,res.data.successNum,this.templateName)
        }else{
          this.$message(this.successTip())
          this.$emit('refresh')
          this.close()
        }

      },
      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload(file) {
        // const isLtSize = file.size / 1024 / 1024 < this.acceptSize;
        // if (!isLtSize) {
        //   this.$message.error('上传附件大小不能超过 20MB!');
        // }
        // return isLtSize;
        let extName = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        console.log(this.accept.indexOf(extName))
        if (this.accept.indexOf(extName) === -1) {
          this.$message({
            message: '请上传规定的文件格式',
            type: 'error'
          })
          this.isLtSize = false
          return false
        }else{
          return true
        }
      },
      // 打开上级党组织弹窗
      getTree(){
        this.$refs['orgTree'].show()
      },
      // 选择的上级党组织回调
      getParentId(val){
        if(val != ""){
          this.formData.parentId.data = val.data
          this.formData.parentId.key = val.key

          if(this.isHaveOrg){
            if(this.examin){
              this.otherDa = {
                repoId:this.repoId,
                headRows:'1',
                titleRows:'1'
              }
            }else{
              this.otherDa = {
                parentOrgName:"",
                headRows:'1',
                titleRows:'1'
              }
              this.otherDa.parentOrgName = this.formData.parentId.data
            }
          }

          this.$refs['ruleForm'].clearValidate(['parentId.data']);
        }
      },
      // 导入
      show (t, row) {

       if(this.fixed){
         if(this.examin){
           this.name = row.title;
           this.repoId=row.id;
           this.otherData.repoId=row.id;
         }else{
           this.name = db.get("USER").djOrg.name
         }
       }
        this.visible = true
      },
      // 确定
      determine(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if(!this.again){
              this.$message({
                showClose: true,
                message: '请更换为您修改后的文件！',
                type: 'error'
              })
              return false;
            }
            // if(this.isHaveOrg){
            //   if(this.examin){
            //     this.otherDa = {
            //       repoId:this.repoId,
            //       headRows:'1',
            //       titleRows:'1'
            //     }
            //   }else{
            //     this.otherDa = {
            //       parentOrgName:"",
            //       headRows:'1',
            //       titleRows:'1'
            //     }
            //     this.otherDa.parentOrgName = this.formData.parentId.data
            //   }
            // }

            this.$refs['commitment'].submit();
          }
        })
      },
      // 取消
      close(){
        this.visible = false;
        this.$refs['ruleForm'].resetFields();
      },
      // 下载模版
      downLoad(){
        commonReq.downloadFile(this.templateUrl,this.templateName)
      },
      // 失败重新上传条件
      isAgain(val){
        if(val){
          this.close()
        }else{
          this.again = val
        }

      }
    }
  }
</script>

<style scoped>
  .bg-fff{
    cousor:pointer !important;
    background-color: #ffffff !important;
    border: 1px solid #efefef !important;
    cursor: pointer !important;
  }
  /deep/ .over-flow {
    font-size: 14px !important;
  }

  .word-cl {
    color: #b9b7b7 !important;
  }
</style>
