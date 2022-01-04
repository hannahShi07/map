<template>
  <div>
    <!--:auto-upload="autoUpload"-->
    <!--:action="action"-->

    <el-upload
      @keydown.native.delete.capture.stop.prevent
      :class="folio && (listType === 'picture-card') ? 'avatar-uploader' : ''"
      :ref="uploadRef"
      :action="actionUrl"
      :data="otherData"
      :headers="headers"
      :limit="limit"
      :folio="folio"
      :multiple="multiple"
      :accept="accept"
      :list-type='listType'

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
      :on-progress="fileProgress"
    >

      <span v-if="(listType != 'picture-card')">
        <el-button><i class="el-icon-plus pr-5"/>选择附件</el-button>
        <span class="upload-tip" style="line-height:20px;color:#606266" v-if="showSize">{{describe ? describe : describes}}</span>
      </span>
      <span v-else>
        <div class="img-content" v-if="folio" :style="coverStyle">
         <img v-if="imageUrl" :src="imageUrl" class="avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"/>
          <span class="mask" v-if="imageUrl && fileList.length">
            <i class="iconfont icon-shanchu delet" @click.stop="clear" v-if="imageUrl"/>
            <i class="iconfont icon-xiazai down" @click.stop="download" v-if="fileList.length"/>
          </span>

        </div>
        <i slot="default" class="el-icon-plus" v-else :style="coverStyle"/>
      </span>

    </el-upload>
    <div class="txt" v-if="listType == 'picture-card'">{{describe ? describe : describes}}</div>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

  </div>

</template>

<script>
  import db from "@/utils/localstorage"
  import {Base64} from 'js-base64'
  import commonApi from "@/api/Common.js"
  import {copy} from '@/utils/utils'
  import commonReq from "@/api/public/commonReq.js"

  export default {
    name: "BaseFileUpload",
    props: {
      // ref的值
      uploadRef: {
        type: String,
        default: "uploadfile"
      },
      showSize: {
        type: Boolean,
        default: true
      },
      // 上传地址
      actionUrl: {
        type: String,
        default: `${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`
      },

      // 其他参数
      otherData: {
        type: Object,
        default: function () {
          return {
            id: '',
            bizId: "",
            bizType: "",
            isSingle: false
          }
        }
      },

      // 最大上传个数
      limit: {
        type: Number,
        default: null
      },

      // 是否允许多附件上传
      multiple: {
        type: Boolean,
        default: true
      },

      // 接收文件的类型 doc、docx、pdf、xlsx、txt
      accept: {
        type: String,
        default: ".jpg,.jpeg,.png"
      },

      // 文件列表的类型:text/picture/picture-card
      listType: {
        type: String,
        default: "picture-card"
      },

      // 是否在选取文件后立即进行上传
      // autoUpload:{
      //   type: Boolean,
      //   default: false
      // },

      // 允许上传的文件大小 单位：MB
      acceptSize: {
        type: Number,
        default: 20
      },

      // 空值代表无上传文件   有任何值就代表有文件了（值内容不限定，跟随change事件改变，存在为： exist，不存在为：''）
      fileListExist: {},

      // 是否为一张图片上传
      folio: {
        type: Boolean,
        default: false
      },

      // 上传视频截取图片是否加id
      addVideoImageId: {
        type: Boolean,
        default: false
      },

      // 上传视频截取图片是否加id
      videoImageId: {
        type: String,
        default: ''
      },

      // 图片尺寸  {width: '120px', height: '166px', lineHeight: '166px'}
      coverStyle: {
        type: Object,
        default: () => ({
          width: '108px', height: '108px', lineHeight: '108px'
        })
      },

      // 要求限制
      describe: {
        type: String,
        default: ''
      },

      // 图片是否有尺寸限制为：540px * 352px
      isSpecify: {
        type: Boolean,
        default: false
      },

      // 宽度限制
      widthSize:  {
        type: Number,
        default: 0
      },

      //  高度限制
      heightSize:   {
        type: Number,
        default: 0
      },
    },
    data () {
      return {
        // 预览图片
        dialogVisible: false,

        // 图片预览地址
        dialogImageUrl: '',

        // 附件列表
        fileList: [],

        // 删除附件列表
        removeFileAry: [],

        // 新增附件列表
        addFileAry: [],

        // 一张图片时的显示地址
        imageUrl: '',

        // 要求描述
        describes: '',

        // 是否超出所限制文件大小
        isLtSize: false,

        // 是否有附件在上传
        fileReady:false,

      //  是否符合尺寸要求
        isSpecifications: true

      }
    },
    computed: {
      headers () {
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
      },
      acceptSize: {
        handler (val) {
          let size = "20MB"
          if (val < 1024) {
            size = val + 'MB'
          } else {
            size = (val / 1024).toPrecision(2) + 'G'
          }
          if(this.isSpecify){
            this.describes = "格式要求：" + this.accept + " 比例：" + this.widthSize +  "px * " + this.heightSize + "px " +" 要求：" + size + "以内"
          }else {
            this.describes = "格式要求：" + this.accept + " 要求：" + size + "以内"
          }
        },
        immediate: true

      }
    },
    methods: {
      // 与业务关联
      relationFile () {
        let ids = []
        if (this.fileList && this.fileList.length > 0) {
          this.fileList.forEach(item => {
            if (item.id) {
              ids.push(item.id)
            } else if (item.response.data.id) {
              ids.push(item.response.data.id)
            }
          })
        } else {
          ids = []
        }

        // 视频增加id
        if (this.addVideoImageId) {
          this.videoImageId && ids.push(this.videoImageId)
          let params = {
            "bizId": this.otherData.bizId,
            "bizType": this.otherData.bizType,
            "ids": ids
          }

          commonReq.relationFileVideo(params).then(response => {
            this.$emit('associationCallback', true)
          }).catch(() => {
            if (ids.length && this.removeFileAry.length) {
              this.$emit('associationCallback', false)
            } else {
              this.$emit('associationCallback', true)
            }
          })
        } else {
          let params = {
            "bizId": this.otherData.bizId,
            "bizType": this.otherData.bizType,
            "ids": ids
          }
          commonReq.relationFile(params).then(response => {
            // 判断是不是门户设置 - 宣传片模块
            if(!ids.length && this.otherData.bizType === "promotionalVideo"){
              let params = {
                "bizId": this.otherData.bizId,
                "bizType": 'promotionalImage',
                "ids": []
              }

              // 删除附件第一帧图片
              commonReq.relationFile(params).then(response => {
                this.$emit('associationCallback', true)

              }).catch(() => {
                this.callBackCatch(ids)
              })

            }else{ // 其他不带第一帧图片的逻辑代码
              this.$emit('associationCallback', true)
            }

          }).catch(() => {
            this.callBackCatch(ids)
          })
        }
        //
        // let params = {
        //   "bizId": this.otherData.bizId,
        //   "bizType": this.otherData.bizType,
        //   "ids": ids
        // }
        //
        // commonReq.relationFile(params).then(response => {
        //   this.$emit('associationCallback', true)
        // }).catch(() => {
        //   if (ids.length && this.removeFileAry.length) {
        //     this.$emit('associationCallback', false)
        //   } else {
        //     this.$emit('associationCallback', true)
        //   }
        //
        // })
      },
      // catch中的逻辑
      callBackCatch(ids){
        if (ids.length && this.removeFileAry.length) {
            this.$emit('associationCallback', false)
          } else {
            this.$emit('associationCallback', true)
          }
      },

      // 下载
      download () {
        this.pictureCardPreview(this.fileList[0])
      },

      // 删除
      clear () {
        if (this.folio) {
          this.handleRemove(this.fileList[0])
          this.imageUrl = ''
          this.$emit('update:videoImageId', '')
        }
        this.fileList = []
      },

      // 附件初始化
      init () {
        this.fileList = []
        this.getAttachmentByArr(this.otherData.bizId, this.otherData.bizType)
      },

      // 判断图片尺寸是否符合要求
      async isSpecif(file){
        let _this = this
        if(this.isSpecify){
          let img = new Image()
          img.src = URL.createObjectURL(file)
          img.onload = () => {
            if (img.width / img.height != _this.widthSize / _this.heightSize) {
              _this.$message.error("图片宽高必须是：" + _this.widthSize + "px * " + _this.heightSize + "px")
              _this.fileList.forEach((item, index) => {
                if (item.name === file.name) {
                  _this.fileList.splice(index, 1)
                }
              })
              if (!_this.fileList.length) {
                _this.imageUrl = ''
              }

              _this.fileReady = false
              _this.isSpecifications = false
            } else {
              _this.isSpecifications = true
            }
          }
        }else {
          _this.isSpecifications = true
        }
      },

      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload (file) {
        // const isLtSize = file.size / 1024 / 1024 < this.acceptSize
        // this.isLtSize = file.size / 1024 / 1024 < this.acceptSize
        // if (!this. isLtSize) {
        //   if (this.listType === "picture-card" || this.listType === "picture") {
        //     this.$message.error('上传图片大小不能超过 ' + this.acceptSize + 'MB!')
        //   } else {
        //     this.$message.error('上传附件大小不能超过 ' + this.acceptSize + 'MB!')
        //   }
        // }
        // return this.isLtSize

        let _this = this
        _this.isSpecif(file)

        _this.isLtSize = true
        let i = file.type.indexOf('/')
        // let fileName = file.type.substring(i, file.type.length)
        // if(fileName !== 'pdf' && fileName !== 'msword' && fileName !== 'vnd.openxmlformats-officedocument.wordprocessingml.document' && fileName !== 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' && fileName !== 'x-zip-compressed') {
        let extName = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
        if (_this.accept.indexOf(extName) === -1) {
          _this.$message({
            message: '请上传规定的文件格式',
            type: 'error'
          })
          _this.isLtSize = false
          return false
        }
        if(file.size/1024/1024 >= _this.acceptSize) {

          if (_this.acceptSize < 1024) {
            _this.$message.error('上传附件大小不能超过 ' + _this.acceptSize + 'MB !')
          } else {
            let size = (_this.acceptSize / 1024).toPrecision(2) + 'G'
            _this.$message.error('上传附件大小不能超过 ' + size + ' !')
          }

          _this.isLtSize = false
          return false
        }

        setTimeout(() => {
          return _this.isSpecifications
        },50)
      },

      // 文件上传成功时的钩子
      successFile (response, file, fileList) {
        if (this.addVideoImageId && response.data) {
          !this.videoImageId && this.$emit('update:videoImageId', response.data.imagesId)
        } else {
          this.$emit('update:videoImageId', response.data.id)
        }

        if(this.folio && this.isSpecify ){
          if(this.isSpecifications){
            this.handleFile(fileList,response)
          }else {
            let array = fileList
            let res = null
            array.forEach((item, index) => {
              if (item.uid === file.uid) {
                array.splice(index, 1)
              }
            })
            this.handleFile(array,res)
          }
        }else {
          this.handleFile(fileList,response)
        }
      },

      // 文件处理
      handleFile(fileList,response){
        this.fileList = fileList
        this.$emit('update:fileListExist', fileList.length ? 'exist' : '')
        this.fileReady = false;
        if(response){
          this.$emit('upFileList',response)
        }
      },

      // 文件超出个数限制时的钩子
      handleExceed (files, fileList) {
        if (this.listType === "picture-card" || this.listType === "picture") {
          this.$message.warning("仅可上传" + this.limit + "张图片")
        } else {
          this.$message.warning("仅可上传" + this.limit + "个附件")
        }
      },

      // 附件上传失败
      handleError (err, file, fileList) {
        this.fileReady = false;
        this.$message.error("附件上传失败，请重试")
      },

      // 文件变更
      handleChange (file, fileList) {
        let _this = this
        if (_this.folio) {
          if(_this.isSpecify) {
            let img = new Image()
            img.src = URL.createObjectURL(file.raw)
            img.onload = function () {
              if(img.width/img.height === _this.widthSize/_this.heightSize){
                _this.isSpecifications = true
                _this.imgList(file)
              }else {
                _this.isSpecifications = false
              }
            }
          }else {
            _this.isSpecifications = true
            _this.imgList(file)
          }
        }
      },
      // 一张图片处理
      imgList(file){
        let _this = this
        // if (_this.fileList && _this.fileList[0]) {
        //   _this.handleRemove(_this.fileList[0])
        // }

        _this.fileList = []
        _this.fileList.push(file)
        _this.imageUrl = file.url;
      },

      // 移除之前
      beforeRemove (file) {
        if(this.isLtSize && this.isSpecifications){
          return this.$confirm("确定移除" + file.name, "删除确认")
        }
      },

      // 文件列表移除文件时的钩子
      handleRemove (file) {
        if (file.response && file.response.data && file.response.data.bizId) {
          this.removeFileAry.push(file.response.data.bizId)
        } else if (file.id) {
          this.removeFileAry.push(file.id)
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

        this.fileReady = false;
      },

      // 点击文件列表中已上传的文件时的钩子
      pictureCardPreview (file) {
        if (file.response) {
          if(this.listType == 'picture-card'){
            this.dialogImageUrl = file.response.data.url;
            this.dialogVisible = true;
          }else {
            commonReq.downloadFile(file.response.data.url, file.response.data.submittedFileName)
          }
        } else {
          if(this.listType == 'picture-card'){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          }else {
            commonReq.downloadFile(file.url, file.name)
          }
        }
      },

      // 文件上传时的钩子
      fileProgress(e){
        if(e.total === e.loaded){
          this.fileReady = false
        }else {
          this.fileReady = true
        }
      },

      // 查询附件
      async getAttachmentByArr (bizIds, bizTypes) {
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

              this.$emit('update:fileListExist', this.fileList.length ? 'exist' : '')

              if (this.folio && (this.listType === 'picture-card')) {
                this.imageUrl = data[0].url;
              }

              if (!this.addVideoImageId) {
                this.$emit('update:videoImageId', data[0].id)
              }
            }
          }
        }
      },

      // 服务器删除附件
      async deleteAttachment () {
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
      submitFile (bizId = this.otherData.bizId, bizType = this.otherData.bizType) {
        if(!this.fileReady){
          this.relationFile()
        }else{
          this.$message.error("附件正在上传中……")
        }

      },
    }
  }
</script>

<style scoped>
  /*/deep/.el-upload-list___item.is-success.focusing .el-icon-close-tip{*/
  /*display: none !important;*/
  /*}*/

  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 108px;
    height: 108px;
  }

  .avatar-uploader {
    caret-color: transparent;
  }

  .avatar-uploader /deep/ .el-upload-list {
    display: none;
  }

  /deep/ .el-upload--picture-card {
    position: relative;
    min-width: 108px;
    min-height: 108px;
    width: auto;
    height: auto;
    line-height: 1;
    position: relative;
  }

  .el-icon-plus {
    /*position: absolute;*/
    left: 50%;
    top: 50%;
    /*transform: translate(-50%, -50%);*/
  }

  .img-content {
    width: 108px;
    height: 108px;
    line-height: 108px;
    display: inline-block;
    /*position: relative;*/
  }

  .icon-shanchu:before {
    content: "\E625";
    position: absolute;
    top: -33px;
    right: 8px;
    height: 28px;
    width: 28px;
  }

  .down:hover {
    color: #ef0505;
  }

  .icon-xiazai:before {
    content: "\E632";
    position: absolute;
    top: -33px;
    right: 8px;
    height: 28px;
    width: 28px;
  }

  .delet:hover {
    color: #ef0505;
  }

  .down {
    width: 45px;
    height: 45px;
    left: 17px;
    top: 0;
    opacity: 0.5;
    position: absolute;
    display: none;
    color: #ffffff;
  }

  .delet {
    width: 45px;
    height: 45px;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 62px;
    display: none;
    z-index: 2;
    color: #ffffff;
  }

  .mask {
    width: 100%;
    height: 45px;
    z-index: 2;
    right: 0;
    top: 0;
    display: inline-block;
    position: absolute;

  }

  .img-content:hover .delet {
    display: inline-block;
    opacity: 1
  }

  .img-content:hover .down {
    display: inline-block;
    opacity: 1
  }

  .img-content:hover .mask {
    color: black;
    opacity: 0.5;
    background-color: black;
  }

  /*.img-content img{*/
  /*max-width: 100%;*/
  /*max-height: 100%;*/
  /*}*/
  .img-content img {
    height: 100%;
  }

  /deep/ .el-button:focus {
    border: 1px solid #ED3C3C;
    color: #ED3C3C;
    background: #fff;
  }

  /deep/ .el-button:hover {
    border: 1px solid #ED3C3C;
    color: #ED3C3C;
    background: #fdecec;
  }

  /deep/ .txt {
    color: black !important;
  }
</style>
