<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px">

      <div class="divider-h1">学习信息</div>
      <el-form-item label="学习主题" prop="themeName">
        <el-input v-model="formData.themeName" placeholder="请输入" maxlength="200"/>
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker class="wp-100" v-model="formData.startDate" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptionsDisabled('start', 'endDate')" placeholder="请选择"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker class="wp-100" v-model="formData.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptionsDisabled('end', 'startDate')" placeholder="请选择"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="主题图片" prop="images">
        <base-file-upload
          folio
          :fileListExist.sync="formData.images"
          listType="picture-card"
          accept=".jpg,.jpeg,.png"
          :autoUpload="false"
          :acceptSize="20"
          :otherData="{bizId, bizType: 'bizType', isSingle: false}"
          @associationCallback="associationCallback"
          ref="refCover"/>
      </el-form-item>

      <div class="divider-h1">学习对象</div>
      <el-form-item label="学习范围" prop="learnType">
        <el-radio-group v-model="formData.learnType">
          <el-radio :label="item.id" v-for="item in studyList" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学习组织" prop="orgStr" v-if="formData.learnType !== '2279477819906843021'">
        <div>
          <el-button size="medium" icon="el-icon-plus" @click="editBtn(3)">添加组织</el-button>
          已选 <span style="color: #f00;">{{formData.orgStr.length}}</span> 个组织
        </div>
        <div class="form-org-list" v-for="(item,index) in formData.orgStr" :key="index">
          {{item.name}}
          <span class="close el-icon-close" @click="orgDeleteChange(index)"/>
        </div>
      </el-form-item>
      <el-form-item label="通知方式" prop="msgSendType">
        <el-radio-group v-model="formData.msgSendType">
          <el-radio :label="item.id" v-for="item in messageList" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
        <div style="color: #CCCCCC;font-size: 12px;line-height: 1;">请确认通过何种方式通知学习人员</div>
      </el-form-item>

      <div class="divider-h1">学习资料设置</div>
      <el-form-item label="学习资料" prop="fileStr">
        <el-button @click="editBtn(1)" v-if="!formData.fileStr.length" size="medium" icon="el-icon-plus">
          添加资料
        </el-button>
        <template v-else>
          <span style="color: #CCCCCC; font-size: 14px;margin-right: 30px;">已添加</span>
          <span style="color: #53A0FF; cursor: pointer;" @click="editBtn(2)">
            <i class="iconfont icon-xiangqing"/>
            预览学习资料
            <el-divider direction="vertical"/>
          </span>
          <span @click="editBtn(1)" style="color: #ED3C3C; cursor: pointer;">
          编辑学习资料
        </span>
        </template>
      </el-form-item>

      <template v-if="!addStatus">
        <div class="divider-h1">学习状态</div>
        <el-row>
          <el-col :span="11">
            <el-form-item label="学习状态">
              <span style="color: #FC8F21;font-size: 14px;">{{formData.learnStatus}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="学习结果">
              <span style="color: #53A0FF; cursor: pointer;" @click="editBtn(4)" v-if="formData.learnStatus=='已结束'">
                <i class="iconfont icon-xiangqing"/>
                查看学习结果
              </span>
              <span style="color:rgb(204, 204, 204); cursor: pointer;" v-else>
                <i class="iconfont icon-xiangqing"/>
                查看学习结果
              </span>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>

    <!-- 组织选择 -->
    <choose-org ref="refOrg" checkParent :getChild="false" @refresh="orgSelectEvent" title="学习组织选择" :isParty="true"/>

    <!-- 学习资料选择 -->
    <data-select-dialog ref="refDataSelect" @event="dataSelectEvent"/>

    <!-- 预览学习 -->
    <data-preview-dialog ref="refDataPreview"/>

    <!-- 学习结果 -->
    <special-study-dialog ref="refStudy"/>

    <div slot="footer" style="text-align: center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">{{addStatus ? '保存并发布' : '修改'}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import SpecialStudyDialog from './special-study-dialog'
  import ChooseOrg from '@/components/individual/choose-org'
  import DataSelectDialog from './data-select-dialog'
  import DataPreviewDialog from './data-preview-dialog'
  import commonReq from '@/api/public/commonReq'
  import {
    addEducationSpecial,
    setEducationSpecial,
    getEducationSpecialDetail
  } from '@/api/backstage/education/special'

  export default {
    components: {DataSelectDialog, DataPreviewDialog, ChooseOrg, SpecialStudyDialog},
    data () {
      return {
        // false编辑  true添加
        addStatus: true,
        title: '新增学习',
        visible: false,
        saveLoading: false,

        bizId: '',

        formData: {
          id: '',
          themeName: '',
          startDate: '',
          endDate: '',
          images: '',
          learnType: '',
          msgSendType: '',
          fileStr: [],
          orgStr: []
        },
        rules: {
          themeName: [{required: true, message: '请输入', trigger: 'blur'}],
          startDate: [{required: true, message: '请选择', trigger: 'change'}],
          endDate: [{required: true, message: '请选择', trigger: 'change'}],
          images: [{required: true, message: '请选择', trigger: 'change'}],
          learnType: [{required: true, message: '请选择', trigger: 'change'}],
          msgSendType: [{required: true, message: '请选择', trigger: 'change'}],
          fileStr: [{required: true, message: '请选择', trigger: 'change'}],
          orgStr: [{required: true, message: '请选择', trigger: 'change'}]
        },

        // 学习范围
        studyList: [],
        // 消息类型
        messageList: [],

        startTimeRange: '00:00:00 - 23:59:59',
        endTimeRange: '00:00:00 - 23:59:59',
      }
    },
    watch: {
      'formData.startDate': {
        deep: true,
        handler (newValue, oldValue) {
          if (newValue) {
            let nowDate = this.sendTimeDate(new Date().getTime());
            let dt = nowDate.split(" ");
            let st = '';
            if (newValue.split(" ")[0] == dt[0]) {
              // 是今天,选择 的时间开始为此刻的时分秒
              st = dt[1];
            } else {
              // 明天及以后从0时开始
              st = '00:00:00';
            }
            if (this.formData.endDate) { //如果有结束时间
              if (this.formData.endDate.split(" ")[0] == newValue.split(" ")[0]) { //如果结束时间和开始时间是同一天
                if (newValue.split(" ")[0] == dt[0]) { //如果是今天，限制为当前时间到结束时间
                  this.startTimeRange = st + ' - ' + this.formData.endDate.split(" ")[1];
                } else {  //不是今天，限制为0点到结束时间
                  this.startTimeRange = "00:00:00 - " + this.formData.endDate.split(" ")[1];
                }

              }
            } else { //不是同一天，限制为0点到24点
              this.startTimeRange = st + ' - 23:59:59';
            }
            //例如：如果今天此刻时间为10:41:40 则选择时间范围为： 10:41:40 - 23:59:59
            //否则为：00:00:00- 23:59:59
          }
        }
      },
      'formData.endDate': {
        deep: true,
        handler (newValue, oldValue) {
          if (newValue) {
            let nowDate = null
            if (this.formData.startDate) {
              nowDate = this.sendTimeDate(new Date(this.formData.startDate).getTime());
            } else {
              nowDate = this.sendTimeDate(new Date().getTime());
            }

            let dt = nowDate.split(" ");
            let st = '';
            if (newValue.split(" ")[0] == dt[0]) {
              // 是今天,选择 的时间开始为此刻的时分秒
              st = dt[1];
            } else {
              // 明天及以后从0时开始
              st = '00:00:00';
            }
            this.endTimeRange = st + ' - 23:59:59';
          }
        }
      }
    },
    created () {
      this.getCondition()
    },
    methods: {
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['learning_scope', 'message']}).then(res => {
          this.studyList = res.learning_scope
          this.messageList = res.message
        })
      },
      // 获取文件id
      getFileIdFn () {
        commonReq.getNewUid().then(res => {
          this.bizId = res
          this.formData.id = res
        })
      },
      show (add, row) {
        this.addStatus = add
        this.title = add ? '新增学习' : '编辑学习'
        this.visible = true
        if (add) {
          this.formData = {
            id: '',
            themeName: '',
            startDate: '',
            endDate: '',
            images: '',
            learnType: this.studyList[0].id,
            msgSendType: this.messageList[0].id,
            fileStr: [],
            orgStr: []
          }
          this.getFileIdFn()
        } else {
          this.bizId = row.id

          // 待学习2279477819906843175 学习中2279477819906843178 已结束2279477819906843181
          getEducationSpecialDetail({id: row.id}).then(res => {
            let {learnStatus} = res.djLearnTheme
            this.formData = {
              id: row.id,
              themeName: res.djLearnTheme.themeName,
              startDate: res.djLearnTheme.startDate,
              endDate: res.djLearnTheme.endDate,
              images: '',
              learnStatus: learnStatus === '2279477819906843175' ? '待学习' : learnStatus === '2279477819906843178' ? '学习中' : '已结束',
              learnType: res.djLearnTheme.learnType,
              msgSendType: res.djLearnTheme.msgSendType,
              fileStr: res.needFileList.map(item => ({
                ...item,
                fileId: item.id,
                requiredRead: item.requiredRead === '2279477819906843189'
              })),
              orgStr: res.needDjOrgList.map(item => ({name: item.orgName, id: item.orgId}))
            }

            this.$nextTick(() => {
              this.$refs['refCover'].init()
            })
          })
        }

        this.$nextTick(() => {
          this.$refs['refForm'].clearValidate()
        })
      },
      associationCallback (fileStatus) {
        if (fileStatus) {
          this.saveLoading = true
          if (this.addStatus) {
            // fileStr属性必读2279477819906843189  已读2279477819906843192
            addEducationSpecial({
              id: this.formData.id,
              startDate: this.formData.startDate,
              endDate: this.formData.endDate,
              images: this.formData.images,
              themeName: this.formData.themeName,
              msgSendType: this.formData.msgSendType,
              learnType: this.formData.learnType,
              fileStr: this.formData.fileStr.map(item => `${item.fileId}~${item.requiredRead ? '2279477819906843189' : '2279477819906843192'}`).join(','),
              orgStr: this.formData.orgStr.map(item => item.id).join(','),
            }).then(res => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.visible = false
            }).finally(() => {
              this.saveLoading = false
            })
          } else {
            setEducationSpecial({
              id: this.formData.id,
              startDate: this.formData.startDate,
              endDate: this.formData.endDate,
              images: this.formData.images,
              themeName: this.formData.themeName,
              msgSendType: this.formData.msgSendType,
              learnType: this.formData.learnType,
              fileStr: this.formData.fileStr.map(item => `${item.fileId}~${item.requiredRead ? '2279477819906843189' : '2279477819906843192'}`).join(','),
              orgStr: this.formData.orgStr.map(item => item.id).join(','),
            }).then(res => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.visible = false
            }).finally(() => {
              this.saveLoading = false
            })
          }
        } else {
          this.$message.warning('请再试一次!')
        }
      },
      saveBtn () {
        this.$refs['refForm'].validate((valid) => {
          if (valid) {
            this.$refs['refCover'].submitFile()

            // if (this.addStatus) {
            //   // fileStr属性必读2279477819906843189  已读2279477819906843192
            //   addEducationSpecial({
            //     id: this.formData.id,
            //     startDate: this.formData.startDate,
            //     endDate: this.formData.endDate,
            //     images: this.formData.images,
            //     themeName: this.formData.themeName,
            //     msgSendType: this.formData.msgSendType,
            //     learnType: this.formData.learnType,
            //     fileStr: this.formData.fileStr.map(item => `${item.fileId}~${item.requiredRead ? '2279477819906843189' : '2279477819906843192'}`).join(','),
            //     orgStr: this.formData.orgStr.map(item => item.id).join(','),
            //   }).then(res => {
            //     this.$message(this.successTip())
            //     this.$emit('refresh')
            //     this.visible = false
            //   }).finally(() => {
            //     this.saveLoading = false
            //   })
            // } else {
            //   setEducationSpecial({
            //     id: this.formData.id,
            //     startDate: this.formData.startDate,
            //     endDate: this.formData.endDate,
            //     images: this.formData.images,
            //     themeName: this.formData.themeName,
            //     msgSendType: this.formData.msgSendType,
            //     learnType: this.formData.learnType,
            //     fileStr: this.formData.fileStr.map(item => `${item.fileId}~${item.requiredRead ? '2279477819906843189' : '2279477819906843192'}`).join(','),
            //     orgStr: this.formData.orgStr.map(item => item.id).join(','),
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
      editBtn (t) {
        switch (t) {
          // 添加资料
          case 1:
            this.$refs['refDataSelect'].show(this.formData.fileStr)
            break

          // 预览
          case 2:
            this.$refs['refDataPreview'].show(this.formData)
            break

          // 添加组织
          case 3:
            this.$refs['refOrg'].show(Array.from(this.formData.orgStr))
            break

          // 查看学习结果
          case 4:
            this.$refs['refStudy'].show(this.formData)
            break
        }
      },
      // 选择学习资料回调
      dataSelectEvent (data) {
        this.formData.fileStr = data
      },
      // 选择组织回调
      orgSelectEvent (data) {
        this.formData.orgStr = JSON.parse(data)
      },
      // 删除组织
      orgDeleteChange (index) {
        this.formData.orgStr.splice(index, 1)
      },
      // 时间限制配置 type: start表示开始使用  end表示结束使用    name: 为限制的日期(与type反向)
      pickerOptionsDisabled (type, name) {
        if (type == 'start') {
          return {
            disabledDate: (time) => {
              if (this.formData[name]) {
                return (time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(this.formData[name]).getTime())
              } else {
                return time.getTime() < Date.now() - 8.64e7
              }
            },
            selectableRange: this.startTimeRange
          }
        } else {
          return {
            disabledDate: (time) => {
              let shengyu = 0
              let x = new Date();
              x.setHours(0, 0, 0, 0);
              let y = new Date(this.formData[name]);
              let times = "00:00:00"
              let newXz = '' //新的时间限制
              if (this.formData[name]) {
                if (this.formData[name].split(" ")[1] != '00:00:00') {
                  shengyu = y.getTime() - x.getTime()
                }
              }
              if (this.formData[name]) {
                //return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(this.formData[name]).getTime() - shengyu)
                let nowD = this.sendTimeDate(new Date().getTime()) //获取当前时间
                if (this.formData[name].split(" ")[0] != nowD.split(" ")[0]) { //不是同一天
                  //开始时间是否是0点0分0秒
                  newXz = this.formData[name].split(" ")[0] + " " + times //时间不做限制
                  return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < (new Date(newXz).getTime()))
                } else { //是同一天，要限制选择的时分秒
                  return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < (new Date(this.formData[name]).getTime() - shengyu))
                }
              } else {
                return time.getTime() < Date.now() - 8.64e7
              }
            },
            selectableRange: this.endTimeRange
          }
        }
        // return {
        //   disabledDate: (time) => {
        //     if (type === 'start') {
        //       if (this.formData[name]) {
        //         return (time.getTime() > new Date(this.formData[name]).getTime()) || (time.getTime() < Date.now() - 8.64e7)
        //       } else {
        //         return time.getTime() < Date.now() - 8.64e7
        //       }
        //     } else {
        //       if (this.formData[name]) {
        //         return (time.getTime() < new Date(this.formData[name]).getTime()) || (time.getTime() < Date.now() - 8.64e7)
        //       } else {
        //         return time.getTime() < Date.now() - 8.64e7
        //       }
        //     }
        //   }
        // }
      },
      sendTimeDate (date) {
        if (!!date) {
          var nowDate =
            new Date(date).getFullYear() +
            '-' +
            (new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1) +
            '-' +
            (new Date(date).getDate(date) < 10 ? '0' + new Date(date).getDate(date) : new Date(date).getDate(date));
          var nowTime =
            (new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours()) +
            ':' +
            (new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()) +
            ':' +
            (new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getSeconds());
          return nowDate + ' ' + nowTime;
        } else {
          return ''
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .divider-h1 {
    margin-bottom: 20px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    border-bottom: 1px solid #F3F3F3;
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
</style>
