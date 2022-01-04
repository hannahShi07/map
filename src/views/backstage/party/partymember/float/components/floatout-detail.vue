<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '740px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="history-detail" v-cloak v-loading="loading">
      <base-card-box header="">
        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                姓名
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'memberId.data.name')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                流动类型
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'type.data')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                所属组织
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'orgId.data')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                身份证号
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'memberId.data.idCode')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                流出日期
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'flowDate')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                流回日期
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'returnflowDate')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                原因
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'flowReasons.data')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                备注
              </div>
              <div class="card-box-content">
                {{isEmpty(list,'remark')}}
              </div>
            </div>
          </el-col>
        </el-row>

      </base-card-box>
    </div>
      <div slot="footer" class="text-center">
        <el-button size="medium" type="primary" @click="cancel()">知道了</el-button>
      </div>


  </el-dialog>

</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getFloatDetail} from "@/api/backstage/party/basic/float/float.js"
    export default {
      name: "floatout-detail",
      data () {
        return {
          loading:true,//加载遮罩条件
          // 自己的
          visible: false,
          title: '详情',
          list:'',
        }
      },
      mounted(){

      },
      methods: {
        show(t, row) {
          this.visible = true;
          this.getDetail(row.id);
        },
        //获取详情
        getDetail(id){
          let params={
            id:id
          }
          getFloatDetail(params).then(response => {
            const res = response;
            this.list=res;

          }).finally(() => {
            this.loading = false;
          })
        },

        //取消
        cancel() {
          this.visible = false;
          this.list='';
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
      flex: 1;
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

  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:flex;
    flex-flow:wrap;
    align-items:center;
  }
  .card-file{
    width:auto;
    margin-bottom:8px;
  }
  .card-file img:first-of-type{
    width:12px;
    height:16px;
  }
  .card-file img:last-of-type{
    width:17px;
    height:17px;
  }
  .card-file span{
    padding-left:10px;
    padding-right:30px;
    font-size:14px;
    color:#999;
  }



</style>
