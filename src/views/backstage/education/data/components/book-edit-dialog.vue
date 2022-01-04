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
      <el-form-item label="书籍名称" prop="fileTitle">
        <el-input v-model="formData.fileTitle" placeholder="请输入" maxlength="200"/>
      </el-form-item>

      <el-form-item>
        <el-radio-group v-model="formData.requiredRead" style="line-height: 20px;">
          <el-radio label="2279477819906843192">普通</el-radio>
          <el-radio label="2279477819906843189">必读</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="版号" prop="publicationNum">
        <el-input v-model="formData.publicationNum" placeholder="请输入" maxlength="200"/>
      </el-form-item>

      <el-form-item label="书籍简介" prop="description">
        <el-input type="textarea" v-model="formData.description" maxlength="500" show-word-limit :rows="4"
                  resize="none" placeholder="请输入"/>
      </el-form-item>

      <el-row>
        <el-col :span="11">
          <el-form-item label="作者" prop="author">
            <el-input v-model="formData.author" placeholder="请输入" maxlength="100"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="出版社" prop="publisher">
            <el-input v-model="formData.publisher" placeholder="请输入" maxlength="100"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="出版日期" prop="resourceType">
            <el-date-picker v-model="formData.publicationDate" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="资源类型" prop="materialsSource">
            <el-select v-model="formData.resourceType" class="wp-100" placeholder="请选择">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="书籍来源" prop="materialsSource">
        <el-input v-model="formData.materialsSource" placeholder="请输入"/>
      </el-form-item>

      <el-form-item label="封面图片" prop="cover">
        <base-file-upload
          folio
          :fileListExist.sync="formData.cover"
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
          :coverStyle="{width: '120px', height: '166px', lineHeight: '166px'}"
          :autoUpload="false"
          :acceptSize="20"
          @associationCallback="associationCallback('picStatus', $event)"
          :otherData="{bizId, bizType: 'djLearningFileImage', isSingle: false}"
          ref="refCover"/>
      </el-form-item>

      <el-form-item label="上传附件" prop="file">
        <base-file-upload
          folio
          :fileListExist.sync="formData.file"
          listType="text"
          accept=".pdf"
          :autoUpload="false"
          :acceptSize="100"
          @associationCallback="associationCallback('fileStatus', $event)"
          :otherData="{bizId, bizType: 'media', isSingle: false}"
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
          fileType: '1295281197470973952',
          fileTitle: '',
          requiredRead: '2279477819906843192',
          publicationNum: '',
          description: '',
          author: '',
          publisher: '',
          publicationDate: '',
          resourceType: '',
          materialsSource: '',
          // 封面图片是否传了 有值就传了
          cover: '',
          // 上传附件是否传了 有值就传了
          file: ''
        },
        rules: {
          fileTitle: [{required: true, message: '请输入', trigger: 'blur'}],
          publicationNum: [{required: true, message: '请输入', trigger: 'blur'}],
          description: [{required: true, message: '请输入', trigger: 'blur'}],
          cover: [{required: true, message: '请选择', trigger: 'change'}],
          file: [{required: true, message: '请选择', trigger: 'blur'}]
        },

        // 资源类型
        typeList: [],
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
      // 获取文件id
      getFileIdFn () {
        commonReq.getNewUid({}).then(res => {
          this.bizId = res
          this.formData.id = res
        })
      },
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['resource_type']}).then(res => {
          this.typeList = res.resource_type
        })
      },
      show (add, row) {
        this.addStatus = add
        this.title = add ? '新增' : '编辑'
        this.visible = true
        if (add) {
          this.formData = {
            id: '',
            fileType: '1295281197470973952',
            requiredRead: '2279477819906843192',
            fileTitle: '',
            publicationNum: '',
            description: '',
            author: '',
            publisher: '',
            publicationDate: '',
            resourceType: '',
            materialsSource: '',
            cover: '',
            file: ''
          }
          this.getFileIdFn()
          this.picStatus = false
          this.fileStatus = false
        } else {
          getEducationDataMsg({id: row.fileId}).then(res => {
            this.bizId = row.fileId
            this.formData = {
              id: row.fileId,
              fileType: '1295281197470973952',
              requiredRead: res.requiredRead,
              fileTitle: res.fileTitle,
              publicationNum: res.publicationNum,
              description: res.description,
              author: res.author,
              publisher: res.publisher,
              publicationDate: res.publicationDate,
              resourceType: res.resourceType,
              materialsSource: res.materialsSource,
              cover: '',
              file: ''
            }
            this.picStatus = true
            this.fileStatus = true

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
          if (this.picStatus && this.fileStatus && !this.saveLoading) {
            this.saveLoading = true
            if (this.addStatus) {
              addEducationData(this.formData).then(res => {
                this.$message(this.successTip())
                this.$emit('refresh')
                this.visible = false
              }).finally(() => {
                this.saveLoading = false
              })
            } else {
              setEducationData(this.formData).then(res => {
                this.$message(this.successTip())
                this.$emit('refresh')
                this.visible = false
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
            this.$refs['refFile'].submitFile()
            this.$refs['refCover'].submitFile()
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
      }
    }
  }
</script>

<style scoped>

</style>
