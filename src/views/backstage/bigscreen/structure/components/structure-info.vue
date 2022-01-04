<template>
  <div class="structure-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="24">
              <el-form-item label="产业链类型" prop="industryType">
                {{isEmpty(formData.industryType)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="企业名称" prop="companyName">
                {{isEmpty(formData.companyName)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="产品" prop="product">
                {{isEmpty(formData.product)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="是否龙头企业" prop="isLeading">
                {{isEmpty(formData.isLeading)}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import { gatStructureInfo } from "@/api/backstage/sysset/bigscreen/structure/structure.js"
export default {
  name: "StructureInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      // 标题
      title:"详情",
      // 页面数据
      formData:{},
    }
  },
  methods: {
    // 页面关闭
    close(){
      this.$emit('refresh')
      this.visible=false;
    },
    // 页面打开时首先执行的方法
    show(row){
      this.visible=true;
      this.getDetail(row.id);
    },
    // 获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatStructureInfo(params).then(response => {
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

  .structure-info .dialog-footer {
    text-align:center
  }
</style>
