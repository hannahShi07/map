<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1082px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="党员姓名" prop="memberId">
            <el-input v-model="formData.memberName" readonly placeholder="请输入" @click.native="memberClick"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label-width="0px" prop="type">
            <el-radio-group v-model="formData.type" @change="formData.prizePunishType = ''">
              <el-radio :label="item.id" v-for="(item,index) in typeList">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="所属组织">
            <el-input v-model="formData.orgData.data" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item label="身份证号码">
            <el-input v-model="formData.idCode" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item :label="`${typeText}日期`" prop="approvalDate">
            <el-date-picker v-model="formData.approvalDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择"
                            @change.once="nameChange('date')"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="1">
          <el-form-item :label="`${typeText}类型`" prop="prizePunishType">
            <el-select v-if="formData.type === '2297065814069248059'" v-model="formData.prizePunishType" class="wp-100"
                       placeholder="请选择" @change="nameChange('awardTypeList')">
              <el-option v-for="item in awardTypeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
            <el-select v-else v-model="formData.prizePunishType" class="wp-100"
                       placeholder="请选择" @change="nameChange('punishmentTypeList')">
              <el-option v-for="item in punishmentTypeList" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item :label="`${typeText}名称`" prop="name">
            <el-input v-model.trim="formData.name" placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="23">
          <el-form-item :label="`${typeText}说明`">
            <el-input type="textarea" v-model.trim="formData.instructions" maxlength="500" show-word-limit :rows="5"
                      resize="none" placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="23">
          <el-form-item label="批准机关" prop="approvaOffice">
            <el-input v-model.trim="formData.approvaOffice" placeholder="请输入"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="23">
          <el-form-item label="上传附件">
            <base-file-upload
              folio
              list-type="text"
              accept=".doc,.docx,.pdf,.xlsx,.txt"
              :autoUpload="false"
              :otherData="otherData"
              @associationCallback="associationCallback"
              ref="refFile"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="23">
          <el-form-item label="上传图片" class="rel" >
            <base-file-upload
              :folio='true'
              list-type="picture-card"
              :acceptSize="20"
              :accept="accept1"
              :otherData="otherData1"
              :isSpecify="true"
              :widthSize="widthSize"
              :heightSize="heightSize"
              ref="fileRef"
              @upFileList="upFileList"
              @associationCallback="associationCallback1"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <!-- 选择人员 -->
    <award-person-dialog ref="refPerson" @refresh="personChange"/>

    <div slot="footer" style="text-align: center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import AwardPersonDialog from '../components/award-person-dialog'
  import commonReq from '@/api/public/commonReq'
  import {addAwardParty, getAwardPartyMsg, setAwardParty} from '@/api/backstage/party/award/org'

  export default {
    components: {AwardPersonDialog},
    data () {
      return {
        // false编辑  true添加
        addStatus: true,
        title: '新增奖惩',
        visible: false,
        saveLoading: false,

        formData: {
          id: '',
          // 新增图片
          photo:'',
          // 党员
          memberName: '',
          memberId: '',
          // 个人奖励 || 个人惩处
          type: '',
          // 所属组织
          orgData: {},
          // 身份证号码
          idCode: '',
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
        otherData: {
          bizId: '',
          bizType: 'partyType',
          isSingle: false
        },
        otherData1: {
          bizId: '',
          bizType: 'partyTypeimg',
          isSingle: false
        },
        accept1:".png,.jpg,.jpeg",
        rules: {
          memberId: [{required: true, message: '请选择', trigger: 'change'}],
          type: [{required: true, message: '请选择', trigger: 'change'}],
          approvalDate: [{required: true, message: '请选择', trigger: 'change'}],
          prizePunishType: [{required: true, message: '请选择', trigger: 'change'}],
          name: [{required: true, message: '请输入', trigger: 'blur'}],
          approvaOffice: [{required: true, message: '请输入', trigger: 'blur'}]
        },

        // 类型奖励惩处
        typeList: [
          {name: '个人奖励', id: '2297065814069248059'},
          {name: '个人惩处', id: '2297065814069248062'}
        ],
        // 奖励类型
        awardTypeList: [],
        // 惩处类型
        punishmentTypeList: [],
        // 奖励|惩处类型一次使用, .once不要用
        awardTypeOnce: true,
        punishmentTypeOnce: true,
        // 图片宽度限制
        widthSize: 278,
        // 图片高度限制
        heightSize: 366
      }
    },
    created () {
      this.getCondition()
    },
    computed: {
      typeText () {
        return this.formData.type === '2297065814069248059' ? '奖励' : '惩处'
      }
    },
    methods: {
      // 获取文件id
      getFileIdFn () {
        commonReq.getNewUid({}).then(res => {
          this.otherData.bizId = res
          this.otherData1.bizId = res
          this.formData.id = res
        })
      },
      // 字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['recognition_type', 'member_disposal_type']}).then(res => {
          this.awardTypeList = res.recognition_type
          this.punishmentTypeList = res.member_disposal_type
        })
      },
      show (add, row) {
        this.addStatus = add
        this.title = add ? '新增奖惩' : '编辑奖惩'
        this.visible = true
        if (add) {
          this.formData.memberName = ''
          this.formData.memberId = ''
          this.formData.orgData = {}
          this.formData.idCode = ''
          this.formData.approvalDate = ''
          this.formData.prizePunishType = ''
          this.formData.name = ''
          this.formData.instructions = ''
          this.formData.approvaOffice = ''
          this.formData.type = this.typeList[0].id
          this.formData.photo = ''
          this.getFileIdFn()

          this.awardTypeOnce = true
          this.punishmentTypeOnce = true
        } else {
          this.otherData.bizId = row.id
          this.otherData1.bizId = row.id
          this.formData.id = row.id
          this.formData.memberName = row.memberName
          this.formData.memberId = row.member.key
          this.formData.orgData = {data: row.orgName, key: row.orgId}
          this.formData.idCode = row.member.data.idCode
          this.formData.approvalDate = row.approvalDate
          this.formData.prizePunishType = row.prizePunishType.key
          this.formData.name = row.name
          this.formData.instructions = row.instructions
          this.formData.approvaOffice = row.approvaOffice
          this.formData.type = row.type.key

          this.$nextTick(() => {
            this.$refs['refFile'].init()
            this.$refs['fileRef'].init()
          })
        }

        this.$nextTick(() => {
          this.$refs['refForm'].clearValidate()
        })
      },
      personChange (row) {
        this.formData.memberName = row.name
        this.formData.memberId = row.id
        this.formData.idCode = row.idCode
        this.formData.orgData = row.orgId
      },
      memberClick () {
        let params={
          org: this.formData.orgData.data,
          orgId: this.formData.orgData.key,
          radioId: this.formData.memberId
        }
        this.$refs['refPerson'].show(params)
      },
      //返回数据
      upFileList(val){
        if(val && val.code==0 && val.data){
          if(val.data.bizType=='partyTypeimg'){
            this.formData.photo=val.data.id
          }
        }
      },
      //成功回调
      associationCallback(val){
        if(val){
          this.$refs['fileRef'].submitFile();
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      associationCallback1 (fileStatus) {
        if (fileStatus) {
          if (this.addStatus) {
            addAwardParty({
              approvaOffice: this.formData.approvaOffice,
              approvalDate: this.formData.approvalDate,
              id: this.formData.id,
              instructions: this.formData.instructions,
              memberId: {
                key: this.formData.memberId
              },
              name: this.formData.name,
              prizePunishType: {
                key: this.formData.prizePunishType
              },
              type: {
                key: this.formData.type
              },
              photo:this.formData.photo
            }).then(res => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.visible = false
            }).finally(() => {
              this.saveLoading = false
            })
          } else {
            setAwardParty({
              approvaOffice: this.formData.approvaOffice,
              approvalDate: this.formData.approvalDate,
              id: this.formData.id,
              instructions: this.formData.instructions,
              memberId: {
                key: this.formData.memberId
              },
              name: this.formData.name,
              prizePunishType: {
                key: this.formData.prizePunishType
              },
              type: {
                key: this.formData.type
              },
              photo:this.formData.photo
            }).then(res => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.visible = false
            }).finally(() => {
              this.saveLoading = false
            })
          }
        } else {
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      saveBtn () {
        this.$refs['refForm'].validate((valid) => {
          if (valid) {
            this.$refs['refFile'].submitFile()
            this.saveLoading = true
            // if (this.addStatus) {
            //   addAwardParty({
            //     approvaOffice: this.formData.approvaOffice,
            //     approvalDate: this.formData.approvalDate,
            //     id: this.formData.id,
            //     instructions: this.formData.instructions,
            //     memberId: {
            //       key: this.formData.memberId
            //     },
            //     name: this.formData.name,
            //     prizePunishType: {
            //       key: this.formData.prizePunishType
            //     },
            //     type: {
            //       key: this.formData.type
            //     }
            //   }).then(res => {
            //     this.$message(this.successTip())
            //     this.$emit('refresh')
            //     this.visible = false
            //   }).finally(() => {
            //     this.saveLoading = false
            //   })
            // } else {
            //   setAwardParty({
            //     approvaOffice: this.formData.approvaOffice,
            //     approvalDate: this.formData.approvalDate,
            //     id: this.formData.id,
            //     instructions: this.formData.instructions,
            //     memberId: {
            //       key: this.formData.memberId
            //     },
            //     name: this.formData.name,
            //     prizePunishType: {
            //       key: this.formData.prizePunishType
            //     },
            //     type: {
            //       key: this.formData.type
            //     }
            //   }).then(res => {
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
      nameChange (type) {
        if (this.addStatus) {
          let date = ''
          if (type === 'date' && this.formData.approvalDate) {
            date = this.formData.approvalDate.split('-')[0]
          }
          switch (type) {
            case 'date':
              this.formData.name = date + this.formData.name
              break

            case 'awardTypeList':
              if (this.awardTypeOnce && this.punishmentTypeOnce) {
                this.formData.name = this.formData.name + (this.awardTypeList.find(item => item.id === this.formData.prizePunishType).name || '')
              }
              this.awardTypeOnce = false
              break

            case 'punishmentTypeList':
              if (this.awardTypeOnce && this.punishmentTypeOnce) {
                this.formData.name = this.formData.name + (this.punishmentTypeList.find(item => item.id === this.formData.prizePunishType).name || '')
              }
              this.punishmentTypeOnce = false
              break
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
