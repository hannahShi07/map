<template>
  <div class="colony-info">
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
              <el-form-item label="产业链类型" prop="">
                {{isEmpty(formData.industryTypeName)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="产值(亿元)" prop="">
                {{isEmpty(formData.outputValue)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="产值同期增长(%)" prop="">
                {{isEmpty(formData.growthRate)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="重点项目(个)" prop="">
                {{isEmpty(formData.projectNum)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="总投资(亿元)" prop="nvestment">
                {{isEmpty(formData.investment)}}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  上传图片
                </div>
                <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="isEmptys(fileListimg)">
                  <div class="card-img" v-for="(item,index) in fileListimg">
                    <img :src="item.url">
                  </div>
                </div>
                <div class="card-box-content" style="flex:1"  v-if="!isEmptys(fileListimg)">
                  --
                </div>
              </div>
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
import { gatColonyInfo } from "@/api/backstage/sysset/bigscreen/colony/colony.js"
export default {
  name: "ColonyInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      // 页面标题
      title:"详情",
      // 页面数据
      formData:{},
      // 图片
      fileListimg:[],
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
      this.getFile(row.id)
    },
    // 获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatColonyInfo(params).then(response => {
        this.formData = response
      })
    },
    // 获取附件
    getFile(id){
      let params={
        bizIds: id,
      }
      commonReq.getAttachment(params).then(response => {
        const res = response;
        if(res.length > 0){
          for(let i=0;i<res.length;i++){
            if(res[i].list.length > 0){
              this.fileListimg = res[i].list;
            }
          }
        }else{
          this.fileListimg =[];
        }
      })
    },
  //  判空方法
    isEmptys(value) {
      if(value != undefined && value){
        if((typeof value) === 'object'){
          if(value.length > 0){
            return true
          }else{
            return false
          }
        }else{
          return false
        }
        return true
      }else {
        return false
      }
    }
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
  .colony-info  .dialog-footer {
    text-align:center
  }

  .colony-info >>> .el-form-item__content {
    margin-left: 130px!important;
  }
  .colony-info >>> .el-form-item__label {
    width: 130px!important;
  }
</style>
