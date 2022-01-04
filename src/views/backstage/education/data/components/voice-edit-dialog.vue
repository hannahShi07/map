<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="887px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="资源分类" prop="resourceType">
            <el-select v-model="formData.resourceType" class="wp-100" placeholder="请选择">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="新增类型" prop="addType">
            <el-select v-model="formData.addType" class="wp-100" placeholder="请选择" @change="addTypeChange">
              <el-option v-for="item in addTypeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="名称" prop="fileTitle">
        <el-input v-model="formData.fileTitle" placeholder="请输入" maxlength="200"/>
      </el-form-item>

      <el-form-item label="来源">
        <el-input v-model="formData.materialsSource" placeholder="请输入" maxlength="200"/>
      </el-form-item>

      <el-form-item label="简介">
        <el-input type="textarea" v-model="formData.description" maxlength="500" show-word-limit :rows="4"
                  resize="none" placeholder="请输入"/>
      </el-form-item>

      <el-form-item label="封面图片" prop="cover">
        <base-file-upload
          folio
          :fileListExist.sync="formData.cover"
          :videoImageId.sync="formData.videoImageId"
          listType="picture-card"
          :coverStyle="{width: '213px', height: '120px', lineHeight: '120px'}"
          accept=".jpg,.jpeg,.png"
          :autoUpload="false"
          :acceptSize="20"
          @associationCallback="associationCallback('picStatus', $event)"
          :otherData="{bizId, bizType: 'djLearningFileImage', isSingle: false}"
          ref="refCover"/>
      </el-form-item>

      <el-form-item label="上传附件" prop="file">
        <base-file-upload
          folio
          addVideoImageId
          :videoImageId.sync="formData.videoImageId"
          :fileListExist.sync="formData.file"
          listType="text"
          :actionUrl="action()"
          @associationCallback="associationCallback('fileStatus', $event)"
          :accept="formData.addType === '2297065814069249126' ? '.mp4,.webm,.ogg' : '.mp3,.wav,.flc'"
          :autoUpload="false"
          :acceptSize="formData.addType === '2297065814069249126' ? 2048 : 100"
          :otherData="{bizId, bizType: 'media', isSingle: true}"
          ref="refFile"/>
      </el-form-item>
    </el-form>

    <div slot="footer" style="text-align: center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import commonReq from '@/api/public/commonReq'
  import {addEducationData, setEducationData, getEducationDataMsg} from '@/api/backstage/education/data'

  export default {
    data () {
      return {
        // false编辑  true添加
        addStatus: true,
        title: '新增',
        visible: false,
        saveLoading: false,

        formData: {
          id: '',
          fileType: '1295281048032116736',
          fileTitle: '',
          description: '',
          materialsSource: '',
          resourceType: '',
          addType: '',
          // 封面图片是否传了 有值就传了
          cover: '',
          // 上传附件是否传了 有值就传了
          file: '',
          videoImageId: ''
        },
        rules: {
          fileTitle: [{required: true, message: '请输入', trigger: 'blur'}],
          description: [{required: true, message: '请输入', trigger: 'blur'}],
          addType: [{required: true, message: '请选择', trigger: 'change'}],
          resourceType: [{required: true, message: '请选择', trigger: 'change'}],
          // cover: [{required: true, message: '请选择', trigger: 'change'}],
          file: [{required: true, message: '请选择', trigger: 'blur'}]
        },

        // 资源类型
        typeList: [],
        addTypeList: [],
        // 文件id
        bizId: '',

        // 图片 文件上传状态
        picStatus: false,
        fileStatus: false,
      }
    },
    created () {
      this.getCondition()
    },
    methods: {
      action () {
        return `${process.env.VUE_APP_BASE_API}/file/attachment/uploadVideo`
      },
      // 获取文件id
      getFileIdFn () {
        commonReq.getNewUid({}).then(res => {
          this.bizId = res
          this.formData.id = res
        })
      },
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['resource_type', 'video_type']}).then(res => {
          this.typeList = res.resource_type
          this.addTypeList = res.video_type
        })
      },
      show (add, row) {
        this.addStatus = add
        this.title = add ? '新增' : '编辑'
        this.visible = true
        if (add) {
          this.formData = {
            id: '',
            fileType: '1295281048032116736',
            fileTitle: '',
            description: '',
            materialsSource: '',
            resourceType: '',
            addType: '2297065814069249126',
            cover: '',
            file: '',
            videoImageId: ''
          }
          this.getFileIdFn()
        } else {
          getEducationDataMsg({id: row.fileId}).then(res => {
            this.bizId = row.fileId
            this.formData = {
              id: row.fileId,
              fileType: '1295281048032116736',
              fileTitle: res.fileTitle,
              description: res.description,
              resourceType: res.resourceType,
              materialsSource: res.materialsSource,
              addType: res.addType,
              cover: '',
              file: '',
              videoImageId: ''
            }

            this.$nextTick(() => {
              this.$refs['refCover'].init()
              this.$refs['refFile'].init()
            })
          })
        }

        this.$nextTick(() => {
          this.$refs['refForm'].clearValidate()
        })
      },
      associationCallback (type, fileStatus) {
        this[type] = fileStatus
        if (fileStatus) {
          if (this.fileStatus && !this.saveLoading) {
            this.saveLoading = true
            if (this.addStatus) {
              addEducationData(this.formData).then(res => {
                if(res){
                  this.$message(this.successTip())
                  this.$emit('refresh')
                  this.visible = false
                }else{
                  this.$refs.refCover.clear()
                  this.$refs['refCover'].submitFile()
                }
              }).finally(() => {
                this.saveLoading = false
              })
            } else {
              setEducationData(this.formData).then(res => {
                if(res){
                  this.$message(this.successTip())
                  this.$emit('refresh')
                  this.visible = false
                }else{
                  this.$refs.refCover.clear()
                  this.$refs['refCover'].submitFile()
                }

              }).finally(() => {
                this.saveLoading = false
              })
            }
          }
        } else {
          this.$message.warning('请再试一次!')
        }
      },
      saveBtn () {
        this.$refs['refForm'].validate((valid) => {
          if (valid) {
            // if (this.formData.cover) {
            //   this.$refs['refCover'].submitFile()
            // }
            this.$refs['refFile'].submitFile()
            // if (this.addStatus) {
            //   addEducationData(this.formData).then(res => {
            //     this.$message(this.successTip())
            //     this.$emit('refresh')
            //     this.visible = false
            //   }).finally(() => {
            //     this.saveLoading = false
            //   })
            // } else {
            //   setEducationData(this.formData).then(res => {
            //     this.$message(this.successTip())
            //     this.$emit('refresh')
            //     this.visible = false
            //   }).finally(() => {
            //     this.saveLoading = false
            //   })
            // }
          } else {
            this.$nextTick(() => {
              const isError = document.getElementsByClassName('is-error')
              isError[0].querySelector('input').focus()
            })
            return false
          }
        })
      },
      addTypeChange () {
        if (!this.formData.file) {
          return
        }

        this.$confirm('切换新增类型,需要重新选择文件？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$refs['refFile'].clear()
        }).catch(() => {
          this.formData.addType === '2297065814069249126' ? this.formData.addType = '2297065814069250336' : this.formData.addType = '2297065814069249126'
        })
      }
    }
  }
</script>

<style scoped>

</style>
