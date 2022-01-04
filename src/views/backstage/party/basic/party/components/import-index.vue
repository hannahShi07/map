<template>
  <div>
    <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    width = '520px'
    >
      <el-form :model="formData" :rules="node" ref="ruleForm" label-width="100px">
        <el-form-item class="is-required" label="上级党组织" prop="parentId.data">
          <el-input placeholder="请选择" v-model="formData.parentId.data" maxlength="100"  show-word-limit readonly @click.native="getTree"/>
        </el-form-item>
        <el-form-item class="file is-required" label="选择文件" prop="">
          <el-upload
            ref="commitment"
            :action="action"
            :data="otherData"
            :headers="headers"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-success="successFile"
            :on-error="handleError"
            :on-change="handleChange"
            accept=".doc,.xls,.xlsx,.pdf"
            :file-list="fileList">
            <el-button size="middle" class="iconfont icon-plus">+ 选择附件</el-button>
          </el-upload>
          <span class="loadSpan" @click="downLoad"><img src="@/assets/page/icon-load.png" alt="">点击下载excel文件模板</span>
      </el-form-item>
      <el-col :span="24" class="tac">
        <el-button  @click="visible = false">取消</el-button>
        <el-button type="primary" @click="determine()">确定</el-button>
      </el-col>

      </el-form>
      <!--导入成功/失败弹窗-->
      <warnning-page ref="refWarn" @refresh=""></warnning-page>
    </el-dialog>
    <!--上级党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import WarnningPage from './warnning-page'//提示框
    import { getPartyImport } from "@/api/backstage/party/basic/party/party.js"
    import db from "@/utils/localstorage"
    import {Base64} from 'js-base64'

    export default{
      name:'index',
      components:{
        WarnningPage
      },
      props:{

      },
      data(){
        return{
          // 模态
          visible: false,
          title:'导入党组织',
          formData:{
            parentId:{//上级党组织（必填）
              data: "",
              key: null
            },
          },
          node:{//必填验证
            'parentId.data':{
              required: true,
              message: "请选择上级党组织",
              trigger: "blur"
            },
          },
          otherData:{//额外参数
            parentOrgName:"",
            headRows:'1',
            titleRows:'2'
          },
          action:`${process.env.VUE_APP_BASE_API}/partycloud/djOrg/importOrgExcel`,//导入地址
          messages:{},
          fileList:[],//附件
          file:null,//附件
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
        //覆盖上传
        handleChange(files, fileList){
          this.fileList = []
          this.fileList.push(files);
        },
        // 附件上传失败
        handleError(err, file, fileList) {
          this.$message.error("附件上传失败，请重试");
        },
        //文件上传成功时的钩子
        successFile(response, file, fileList){
          this.$refs.commitment.clearFiles();
          this.$refs['refWarn'].show()
        },
        //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
        beforeUpload(file) {
          // const isLtSize = file.size / 1024 / 1024 < this.acceptSize;
          // if (!isLtSize) {
          //   this.$message.error('上传附件大小不能超过 20MB!');
          // }
          // return isLtSize;
          return true
        },
        //打开上级党组织弹窗
        getTree(){
          this.$refs['orgTree'].show()
        },
        //选择的上级党组织回调
        getParentId(val){
          if(val != ""){
            this.formData.parentId.data = val.data
            this.formData.parentId.key = val.key
            this.$refs['ruleForm'].clearValidate(['parentId.data']);
          }
        },
        // t:  2-导入
        show (t, row) {
          // t===2
          this.visible = true
        },
        //确定
        determine(){
          // this.$refs['refWarn'].show()
          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
              this.otherData.parentOrgName = this.formData.parentId.data
              this.$refs['commitment'].submit();
            }
          })
        },
        //下载模版
        downLoad(){
          window.location.href='http://192.168.0.39:10000/file/6666/2020/08/a24e8e45-5d27-4dce-8213-a34d5fd3d77d.xlsx'
        },

      }
    }
</script>

<style scoped>

</style>
