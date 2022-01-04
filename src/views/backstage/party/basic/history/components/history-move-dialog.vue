<template>
  <el-dialog v-if="modalData.visible" :visible.sync="modalData.visible" append-to-body
             title="移回原组织"
             :close-on-click-modal="false" :close-on-press-escape="false" width="400px">

    <el-alert type="error" :closable="false">
      <div class="history-alert">
        <div class="history-alert-left">
          <img width="23" height="23" src="@/assets/page/icon-err.png" alt="">
        </div>
        <div class="history-alert-rgiht">
          原组织名称：{{orgName}} 移出后请至“党员信息”查看或管理该成员
        </div>
      </div>
    </el-alert>

    <el-form ref="refForm" class="mt-20" :rules="formRules" :model="formData" label-width="90px">
      <el-form-item prop="reason">
        <template #label>
          <span style="color: #888888">移出理由</span>
        </template>
        <el-input
          type="textarea"
          v-model="formData.reason"
          maxlength="500"
          placeholder="请输入内容"
          show-word-limit
          :autosize='{ minRows: 7, maxRows:7}'
          resize="none"/>
      </el-form-item>
    </el-form>

    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancelFun">取消</el-button>
      <el-button size="medium" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getHistoryDetailRemove} from "@/api/backstage/party/basic/history/history.js";

  export default {
    data () {
      return {
        modalData: {//弹窗的显示与关闭
          visible: false,
        },
        formData: {
          memberId: '',//当前人员历史库的id
          reason: '',//移出人员历史库的理由
        },
        formRules: {//必填项
          reason: [{required: true, message: '请输入'}],
        },
        orgName:"中共安徽理士电源技术有限公司行政设备党支部",
      }
    },
    methods: {
      show (row) {//打开弹窗
        this.orgName = row.orgId.data
        this.formData.memberId = row.id
        this.formData.reason = ''
        this.modalData = {
          visible: true
        }
      },
      save () {//保存
        this.$refs['refForm'].validate(valid => {
          if (valid) {
            let params = {
              "handle": {
                "data": "",
                "key": "1258605078227451904"
              },
              "memberId": this.formData.memberId,
              "reason":this.formData.reason
            }
            getHistoryDetailRemove(params).then(res => {
              this.$message(this.successTip())
              this.formData = {
                memberId: '',
                  reason: '',
              }
              this.modalData.visible = false
              this.$emit('refresh')
            })
          } else {
            return false
          }
        })
      },
      //取消
      cancelFun(){
        this.modalData.visible = false;
        this.formData = {
          memberId: '',
          reason: '',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history-alert {
    display: flex;
    line-height: 25px;

    .history-alert-left {
      margin-right: 28px;
    }

    .history-alert-right {
      flex: 1;
      font-size: 14px;
      line-height: 25px;
      color: #ED3C3C;
    }
  }
</style>
