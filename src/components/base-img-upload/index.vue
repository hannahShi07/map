<template>
  <div>
    <el-upload
      :class="folio ? 'avatar-uploader' : ''"
      @keydown.native.delete.capture.stop.prevent
      :ref="uploadRef"
      :action="action"
      :data="otherData"
      :headers="headers"
      :limit="limit"
      :folio="folio"
      :multiple="multiple"
      :accept="accept"
      :list-type = 'listType'
      :auto-upload="autoUpload"
      :file-list="fileList"
      :show-file-list="true"
      :before-upload="beforeUpload"
      :on-success="successFile"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-error="handleError"
      :on-change="handleChange"
      :on-preview="pictureCardPreview"
    >

      <span v-if="(listType != 'picture-card')">
        <el-button><i class="el-icon-plus pr-5"/>选择附件</el-button>
        <span class="upload-tip" style="line-height:20px ">格式要求：{{accept}}要求：{{acceptSize}}M以内</span>
      </span>
      <span v-else>
        <div class="img-content" v-if="folio">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"/>
        <i class="iconfont iconfont icon-shanchu delet"  @click.stop="clear" v-if="imageUrl"/>
        <i class="iconfont icon-xiazai down"  @click.stop="download" v-if="imageUrl && fileList[0].response"/>
        </div>
        <i slot="default" class="el-icon-plus" v-else/>
      </span>

    </el-upload>
    <div class="txt" v-if="listType == 'picture-card'">格式要求：{{accept}}要求：{{acceptSize}}M以内</div>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>

</template>

<script>
  import db from "@/utils/localstorage"
  import {Base64} from 'js-base64'
  import commonApi from "@/api/Common.js"
  import { copy } from '@/utils/utils'
  import commonReq  from "@/api/public/commonReq.js"

  export default {
    name: "BaseFileUpload",
    props: {
      // ref的值
      uploadRef:{
        type:String,
        default: "uploadfile"
      },

      // 上传地址
      action:{
        type: String,
        default: `${process.env.VUE_APP_BASE_API}/file/attachment/upload`
      },

      // 其他参数
      otherData:{
        type: Object,
        default: function() {
          return {
            id: '',
            bizId: "",
            bizType: "",
            isSingle: false
          }
        }
      },

      // 最大上传个数
      limit:{
        type: Number,
        default: 9
      },

      // 是否允许多附件上传
      multiple:{
        type: Boolean,
        default: true
      },

      // 接收文件的类型 doc、docx、pdf、xlsx、txt
      accept:{
        type: String,
        default: ".jpg,.jpeg,.png"
      },

      // 文件列表的类型:text/picture/picture-card
      listType:{
        type: String,
        default: "picture-card"
      },

      // 是否在选取文件后立即进行上传
      autoUpload:{
        type: Boolean,
        default: false
      },

      // 允许上传的文件大小 单位：MB
      acceptSize: {
        type: Number,
        default: 20
      },

      // 空值代表无上传文件   有任何值就代表有文件了（值内容不限定，跟随change事件改变，存在为： exist，不存在为：''）
      fileListExist:{},

      // 是否为一张图片上传
      folio:{
        type: Boolean,
        default: false
      },
    },
    data(){
      return{
        // 预览图片
        dialogVisible:false,

        // 图片预览地址
        dialogImageUrl: '',

        // 附件列表
        fileList:[],

        // 删除附件列表
        removeFileAry: [],

        // 新增附件列表
        addFileAry: [],

        // 一张图片时的显示地址
        imageUrl:'',
      }
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
    watch: {
      fileList (nVal) {
        this.$emit('update:fileListExist', nVal.length ? 'exist' : '')
      }
    },
    methods: {
      // 下载
      download(){
        this.pictureCardPreview(this.fileList[0])
      },

      // 删除
      clear(){
        console.log("删除")
        this.fileList = []
        this.imageUrl = ''
        this.handleRemove(fileList[0])
      },

      // 附件初始化
      init() {
        this.getAttachmentByArr(this.otherData.bizId, this.otherData.bizType)
      },

      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload(file) {
        const isLtSize = file.size / 1024 / 1024 < this.acceptSize
        if (!isLtSize) {
          if(this.listType === "picture-card" || this.listType === "picture") {
            this.$message.error('上传图片大小不能超过 ' + this.acceptSize + 'MB!')
          }else {
            this.$message.error('上传附件大小不能超过 ' + this.acceptSize + 'MB!')
          }
        }
        return isLtSize
      },

      // 文件上传成功时的钩子
      successFile(response, file, fileList){
        this.fileList = fileList
        this.$emit('update:fileListExist', fileList.length ? 'exist' : '')

        const res = file
        if(res.response.code=='0'){
          this.imageUrl=file.response.data.url;
          this.$message.success('上传成功')
        }else{
          this.imageUrl=''
          this.$message.error(res.response.msg)
        }
        // this.$emit('upFileList',response)
      },

      // 文件超出个数限制时的钩子
      handleExceed(files, fileList){
        if(folio) {
          if (this.listType === "picture-card" || this.listType === "picture") {
            this.$message.warning("仅可上传" + this.limit + "张图片")
          } else {
            this.$message.warning("仅可上传" + this.limit + "个附件")
          }
        }else{
          return true
        }
      },

      // 附件上传失败
      handleError(err, file, fileList) {
        this.$message.error("附件上传失败，请重试")
      },

      // 文件变更
      handleChange(file, fileList) {
        console.log("file;",file)
        if(this.folio){
          this.fileList = []
          this.fileList.push(file)
          this.imageUrl=file.url;
        }

      },

      // 移除之前
      beforeRemove(file) {
        return this.$confirm("确定移除" + file.name, "删除确认")
      },

      // 文件列表移除文件时的钩子
      handleRemove(file) {
        if (file.response && file.response.data && file.response.data.bizId) {
          this.removeFileAry.push(file.response.data.bizId)
        } else {
          this.addFileAry.forEach((item, index) => {
            if (item.name === file.name) {
              this.addFileAry.splice(index, 1)
              return true
            }
          })
        }
        this.fileList.forEach((item, index) => {
          if (item.name === file.name) {
            this.fileList.splice(index, 1)
            return true
          }
        })
      },

      // 点击文件列表中已上传的文件时的钩子
      pictureCardPreview(file){
        if(file.response){
          let params = {
            filename: file.response.data.submittedFileName,//文件名
            url: file.response.data.url//文件地址
          }
          console.log(" if下载",params)
          commonReq.downloadFile(params)
        }else{
          let params = {
            filename: file.name,//文件名
            url: file.url//文件地址
          }
          console.log(" else下载",params)
          commonReq.downloadFile(params)
        }
      },

      // 查询附件
      async getAttachmentByArr(bizIds, bizTypes) {
        const res = await commonApi.getAttachment({
          bizIds: bizIds,
          bizTypes: bizTypes
        })
        if (res.status === 200) {
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              let data = res.data.data[0].list
              data.map(item => {
                item.name = item.submittedFileName
              })
              this.fileList = data
            }
          }
        }
      },

      // 服务器删除附件
      async deleteAttachment() {
        const res = await commonApi.deleteAttachment({
          ids: this.removeFileAry
        })
        if (res.status === 200) {
          if (res.data.code !== 0) {
            this.$message(res.data.msg)
          } else {
            this.removeFileAry = []
          }
        }
      },

      // 附件上传服务器触发方法
      submitFile(bizId = this.otherData.bizId, bizType = this.otherData.bizType) {
        if(this.removeFileAry.length){
          this.deleteAttachment()
        }
        if (bizId) {
          this.otherData.bizId = bizId
          this.isUpload = true
        }
        this.otherData.bizType = bizType
        this.$refs[this.uploadRef].submit()
        this.addFileAry = []

      },
    }
  }
</script>

<style scoped>
  /deep/.el-upload-list___item.is-success.focusing .el-icon-close-tip{
    display: none !important;
  }

  .avatar-uploader /deep/ .el-upload-list{
    display:none;
  }

  .img-content {
    display: inline-block;
    position: relative;
  }

  .icon-shanchu:before {
    content: "\E625";
    position: absolute;
    top: -50px;
    right: 7px;
    height: 28px;
    width: 28px;
  }
  .down:hover {
    color: #ef0505;
  }

  .icon-xiazai:before {
    content: "\E632";
    position: absolute;
    top: -50px;
    right: 8px;
    height: 28px;
    width: 28px;
  }
  .delet:hover {
    color: #ef0505;
  }
  .down{
    width: 45px;
    height: 45px;
    left: 55px;
    top: 0;
    opacity: 0.5;
    position: absolute;
    display: none;
    color: #9c9696;
  }

  .delet{
    width: 45px;
    height: 45px;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 100px;
    display: none;
    z-index: 2;
    color: #9c9696;
  }
  .img-content:hover .delet {
    display: inline-block;
  }
  .img-content:hover .down {
    display: inline-block;
  }
</style>
