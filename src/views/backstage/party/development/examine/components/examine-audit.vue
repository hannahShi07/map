<template>
  <el-dialog
    v-if="modalData.visible"
    :visible.sync="modalData.visible"
    append-to-body
    title="审核"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="740px">

    <el-form ref="refForm":rules="formRules" :model="formData" v-loading="loading">
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
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                工作岗位
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'jobs.data')}}
              </div>
            </div>
          </el-col>
        </el-row>

      </el-form-item>
      <el-form-item label="是否通过" class="left-cla" prop="auditStatus">
        <el-radio-group v-model="formData.auditStatus">
          <el-radio  :label="status[0].key">是</el-radio>
          <el-radio :label="status[1].key">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="驳回原因" prop="reason" class="left-cla" v-if="formData.auditStatus === status[1].key">
        <el-input
          class="textarea-cla"
          type="textarea"
          v-model="formData.reason"
          maxlength="500"
          placeholder="请输入内容"
          show-word-limit
          :autosize='{ minRows: 13, maxRows:7}'
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
  import  {getDevelopSqioDetail,getDevelopSqioAudit} from "@/api/backstage/party/development/documentary/documentary.js"

  export default {
    name:'ExamineAudit',
    data () {
      return {
        loading:true,
        modalData: {//弹窗的显示与关闭
          visible: false,
        },
        formData: {
          id:'',
          name:"",
          idcard:"",
          jobs:{
            key:"",
            data:""
          },
          education:{
            key:"",
            data:""
          },
          phone:"",
          auditStatus:'',// 审核状态
          reason: '',//移出人员历史库的理由
        },
        formRules: {//必填项
          auditStatus:[{
            required: true,
            message: '请选择',
          }],
          reason: [{
            required: true,
            message: '请输入',

          }],
        },
        status:[
          {
            key:"1303517902271414272",//通的id
            data:"是"
          },
          {
            key:"1303517844142555136",//驳回
            data:"否"
          }
        ],
        orgName:"中共安徽理士电源技术有限公司行政设备党支部",
      }
    },
    methods: {
      show (row) {//打开弹窗
        this.loading = true
        this.modalData = {
          visible: true
        }

        this.formData = {
          id:'',
          name:"",
          idcard:"",
          jobs:{
            key:"",
            data:""
          },
          education:{
            key:"",
            data:""
          },
          phone:"",
          auditStatus:'',// 审核状态
          reason: '',//移出人员历史库的理由
        },

     this.getDetail(row.id)
      },
      getDetail(id){// 获取详情
        let params = {
          id:id
        }
        getDevelopSqioDetail(params).then(response => {
            const res = response
            this.formData.id = res.id
            this.formData.name = res.name
            this.formData.idcard = res.idcard
            this.formData.jobs = {
              key:res.jobs.key,
              data:res.jobs.data
            }
          this.formData.education = {
            key:res.education.key,
            data:res.education.data
          },
          this.formData.phone = res.phone
        }).finally(() => {
          this.loading = false
        })
      },
      save () {//保存
        this.$refs['refForm'].validate(valid => {
          if (valid) {
            let params = {
              "auditStatus": {// 审核状态
                "key": this.formData.auditStatus
              },
              "rejectReason": this.formData.reason,// 驳回原因
              "sqioId": this.formData.id// 入党申请id
            }
            this.loading = true
            getDevelopSqioAudit(params).then(res => {
              this.$message(this.successTip())
              this.modalData.visible = false
              this.$emit('refresh')
            }).finally(() => {
              this.loading = false
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
          id:'',
          name:"",
          idcard:"",
          jobs:{
            key:"",
            data:""
          },
          education:{
            key:"",
            data:""
          },
          phone:"",
          auditStatus:'',
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
    height: 100%;
    min-height: 21vh;
  }
  .el-form-item {
    margin-bottom:0;
  }
  .left-cla {
    margin-left: 20px;
    /*margin-top: 12px;*/
  }
  .textarea-cla {
    resize: none;
    /*width: 65vh;*/
    width: 86%;
    /*height: 31vh!important;*/
    min-height: 220px!important;
    margin-right: 0;
    padding-right: 0;
    /*margin-left: 9vh;*/
  /*margin-top: -29px;*/
}

/deep/.el-textarea .el-input__count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 6px;
  right: 4px;
  background-color: transparent;
}

/deep/.el-form-item__error {
  color: #ff4949;
  font-size: 12px;
  line-height: 0.5;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 85px;
}

/deep/.el-form-item__content {
  padding-bottom: 10px;
}
</style>
