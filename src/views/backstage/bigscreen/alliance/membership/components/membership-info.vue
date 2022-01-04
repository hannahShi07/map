<template>
  <div class="demeanor-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
        <div class="information">
          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  产业分类
                </div>
                <div class="card-box-content">
                  {{isEmpty(formData,'industryType.data')}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                产业名称
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'industryName')}}
              </div>
            </div>
          </el-col>
        </el-row>
          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  联系人
                </div>
                <div class="card-box-content">
                  {{isEmpty(formData,'contacts')}}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row class="card-row">
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  联系方式
                </div>
                <div class="card-box-content">
                  {{isEmpty(formData,'contactWay')}}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getMembershipDetail} from "@/api/backstage/sysset/bigscreen/alliance/membership/membership.js"
export default {
  name: "Info",
  data() {
    return {
      visible:false,
      title:"详情",//标题
      formData:{
        industryType:{key:'',data:''}
      },
    }
  },
  mounted() {

  },
  methods: {
    close(){
      this.$emit('refresh')
      this.visible=false;
    },
    show(row){
      this.visible=true;
      this.getDetail(row.id);
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      getMembershipDetail(params).then(response => {
        this.formData = response
      })
    },
  }
}
</script>

<style scoped>
  .demeanor-add >>> .el-dialog{
    width: 902px;
  }
  .demeanor-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .demeanor-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
  }
  .information >>> .el-form-item__label{
    text-align: left;
  }
  .information >>> .el-form-item{
    height: 50px;
    padding: 5px 0;
    margin:0;
    border-bottom: 1px solid #EEEEEE;
  }
  .photo{
    position: absolute;
    right: 20px;
    top: 68px;
    background-color: #fff;
    padding-left: 20px;
    height: 133px;
    width: 115px;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .company-list{
    height: 26px;
    border-radius: 4px;
    background-color: #F2F2F2;
    line-height: 26px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .img-content{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100%;
    overflow:hidden;
    border:none;
  }
  .img-content .personimg{
    width:100%;
  }
  .information >>> .el-form-item{
    height: auto;
  }
  .information >>> .el-form-item__content{
    padding-top: 10px;
    padding-bottom: 5px;
    line-height: 20px;
    font-weight: bold;
  }
  .information .information-content >>> .el-form-item__content{
    font-weight: 400;
  }
  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;
  }
  .card-box-title {
    width: 100px;
    text-align: left;
    font-size: 14px;
    color: #555555;
    padding: 16px 0;
  }

  .card-box-content {
    width: calc(100% - 120px);
    padding: 16px 0;
    font-weight: bold;
    font-size: 14px;
    color:#333;
    padding-right:20px;
  }
  .card-box-title{
    color: #888;
  }
</style>
