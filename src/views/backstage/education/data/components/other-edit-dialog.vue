<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1131px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    v-if="visible"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px">
      <el-form-item label="材料标题" prop="fileTitle">
        <el-input v-model="formData.fileTitle" placeholder="请输入" maxlength="200"/>
      </el-form-item>

      <el-form-item label="材料内容" prop="articleText" class="rel">
        <base-tinymce-editor v-model="formData.articleText"/>
      </el-form-item>

      <el-row>
        <el-col :span="11">
          <el-form-item label="资源类型" prop="resourceType">
            <el-select v-model="formData.resourceType" class="wp-100" placeholder="请选择">
              <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="材料来源" prop="materialsSource">
            <el-input v-model="formData.materialsSource" placeholder="请输入" maxlength="100"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer" style="text-align: center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import commonReq from '@/api/public/commonReq'
  import {addEducationData, setEducationData, getEducationDataMsg} from '@/api/backstage/education/data'

  export default {
    components: {VueEditor},
    data () {
      return {
        // false编辑  true添加
        addStatus: true,
        title: '新增',
        visible: false,
        saveLoading: false,

        formData: {
          id: '',
          fileType: '1295281394175442944',
          // 标题
          fileTitle: '',
          // 材料内容
          articleText: '',
          // 资源类型
          resourceType: '',
          // 材料来源
          materialsSource: '',
        },
        rules: {
          fileTitle: [{required: true, message: '请输入', trigger: 'blur'}],
          articleText: [{required: true, message: '请输入', trigger: 'change'}],
          resourceType: [{required: true, message: '请选择', trigger: 'change'}],
          materialsSource: [{required: true, message: '请输入', trigger: 'blur'}]
        },

        // 资源类型
        typeList: [],
        // 富文本配置项
        customToolbar: [
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'header': '2'}], [{'align': 'center'}, {'align': 'justify'}, {'align': 'right'}],
          [{'color': []}], [{'background': []}], ['image'], ['clean'],
        ]
      }
    },
    created () {
      this.getCondition()
    },
    methods: {
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
            fileType: '1295281394175442944',
            fileTitle: '',
            articleText: '',
            resourceType: '',
            materialsSource: '',
          }
          console.log('ddd1111: '+JSON.stringify(this.formData.articleText))
        } else {
          console.log('ddd12222: '+JSON.stringify(this.formData.articleText))
          getEducationDataMsg({id: row.fileId}).then(res => {
            this.formData = {
              id: row.fileId,
              fileType: '1295281394175442944',
              fileTitle: res.fileTitle,
              articleText: res.articleText,
              resourceType: res.resourceType,
              materialsSource: res.materialsSource,
            }
          })
        }

        this.$nextTick(() => {
          this.$refs.refForm.clearValidate()
        })
      },
      saveBtn () {
        this.$refs['refForm'].validate((valid) => {
          if (valid) {
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
