<template>
  <div class="demeanor-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题" prop="">
                {{isEmpty(formData.name)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item class="information-content" label="内容" prop="">
                <div v-html="isEmpty(formData.content)"></div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="card-box">
                <div class="card-box-title">
                  附件
                </div>
                <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0">
                  <div class="card-img" v-for="(item,index) in fileListimg">
                    <img :src="item.url">
                  </div>
                </div>
                <div class="card-box-content" style="flex:1"  v-if="!(fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0)">
                  --
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发布日期" prop="">
                {{isEmpty(formData.pubdate)}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {gatewayInfo} from "@/api/backstage/sysset/administration/gateway/gateway.js"
export default {
  name: "DemeanorInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"详情",//标题
      node:{},
      imageUrl:'',
      formData:{},
      interviewList:[],
      fileListimg:[],//图片
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    close(){
      this.visible=false;
    },
    show(row){
      this.visible=true;
      this.getDetail(row.id);
      this.getFile(row.id)
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatewayInfo(params).then(response => {
        this.formData = response
      })
    },
    //获取附件
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
          this.fileList=[];
        }
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
