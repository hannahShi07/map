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
    <base-card-box header="">
      <div class="detail-box">
        <div class="card-box-title">
          {{isEmpty(viewData,'title')}}
        </div>
        <span>发布时间：{{isEmpty(viewData,'releaseTime')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="detail-contant">
        <p>
          {{isEmpty(viewData,'content')}}
        </p>
      </div>
    </base-card-box>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button size="medium" type="primary" @click="cancel()">知道了</el-button>
    </div>

  </el-dialog>

</template>

<script>
    export default {
      name: "sitemsg-detail",
      data () {
        return {
          visible: false,
          title: '详情',
          viewData: {
            title: '',
            releaseTime: '',
            content: '',
          },
        }
      },
      mounted(){

      },
      methods: {
        show(row) {
          this.visible = true;
          this.viewData = row;
        },
        // 取消
        cancel() {
          eventBus.$emit('eventBusName')
          this.visible = false;
        },
      },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;

  }
  .detail-box{
    margin: 10px 20px;
  }
  .detail-box span {
    font-size: 16px;
    color: #999999;
  }
  .card-box-title{
    text-align: left;
    font-weight: bold;
    font-size: 22px;
    color: #333;
    padding: 16px 0 16px 0;
  }
  .detail-contant{
    margin: 20px;
    font-size: 20px;
    font-weight: 400;
    line-height: 46px;
    color: #555555;
  }
</style>
