<template>
  <el-dialog
    v-if="modalData.visible"
    :visible.sync="modalData.visible"
    append-to-body
    title="详情"
    @close="cancelFun"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="740px">

    <el-form ref="refForm" v-loading="loading">
      <el-form-item>
        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                姓名
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'name')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                身份证号码
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'idcard')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                联系方式
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'phone')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                学历
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'education.data')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                工作岗位
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'jobs.data')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                审核状态
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'auditStatus.data')}}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="formData.auditStatus.data != '通过'">
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                驳回原因
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'rejectReason')}}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="cancelFun">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import  {getDevelopSqioDetail } from "@/api/backstage/party/development/documentary/documentary.js"

  export default {
    name: "ExamineDetail",
    data () {
      return {
        loading:true,
        modalData: {//弹窗的显示与关闭
          visible: false,
        },
        formData: {},
      }
    },
    methods: {
      show (row) {//打开弹窗
        this.loading = true
        this.modalData = {
          visible: true
        }
        this.getDetail(row.id)
      },
      getDetail(id){// 获取详情
        let params = {
          id:id
        }
        getDevelopSqioDetail(params).then(response => {
          const res = response
          this.formData = res
        }).finally(() => {
          this.loading = false
        })
      },
      //取消
      cancelFun(){
        this.modalData.visible = false;
        this.formData = {}
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

  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 150px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding-left: 20px;
    }

    .card-box-content {
      flex: 1;
      font-weight: bold;
      font-size: 14px;
    }
  }
  /deep/.el-dialog .el-dialog__body {
    padding: 0!important;
  }
  .el-form-item {
    margin-bottom:0;
  }
</style>

