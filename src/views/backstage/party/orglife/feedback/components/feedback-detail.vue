<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1000px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <base-card-box header="反馈内容">
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              反馈内容
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'content')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              反馈人姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'userName')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'contact')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              提交时间
            </div>
            <div class="card-box-content" style="flex:1" v-html="isEmpty(viewData,'createTime')">
            </div>
          </div>
        </el-col>
      </el-row>

    </base-card-box>
    <div class="line"></div>
    <base-card-box header="处理情况">
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              处理操作
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'processingType.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              回复内容
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'replyContent')}}
            </div>
          </div>
        </el-col>
      </el-row>

    </base-card-box>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="visible = false">知道了</el-button>
    </div>

  </el-dialog>

</template>

<script>
    import {getFeedbackDetail} from "@/api/backstage/sysset/basic/feedback/feedback.js"
    export default {
      name: "feedback-detail",
      data () {
        return {
          visible: false,
          title: '信息详情',
          viewData: {},
        }
      },
      mounted(){

      },
      methods: {
        show(row) {
          this.visible = true;
          this.getDetail(row.id)
        },
        // 获取详情
        getDetail(id){
            let params = {
               id:id
            }
            this.loading = true;
            getFeedbackDetail(params).then(response => {
                const res = response;
                this.viewData=res;

            }).finally(() => {
                this.loading = false;
            });
        },
        // 取消
        cancel() {
          this.visible = false;
        },
      },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;

  }
  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 120px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding: 16px 0 16px 20px;
    }

    .card-box-content {
      // flex: 1;
      width: calc(100% - 120px);
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
      color:#333;
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
.line{
  height: 10px;
  background: #EEEEEE;
}
</style>
