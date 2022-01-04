<template>
  <div class="site-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="站点名称" prop="name">
              <span>{{isEmpty(formData,'name')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点面积m²" prop="area">
              <span>{{isEmpty(formData,'area')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建立日期" prop="buildDate">
              <span>{{isEmpty(formData,'buildDate')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="站点地址" prop="address">
              <span @click="goLink(formData.address)" style="cursor:pointer;">{{isEmpty(formData,'address')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点管理员" prop="manager">
              <span>{{isEmpty(formData,'manager')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="phone">
              <span>{{isEmpty(formData,'phone')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="教育设备" prop="equipment">
              <span>{{isEmpty(formData,'equipment')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {getSiteInfo} from "@/api/front/education/website/website.js"
export default {
  name: "SiteInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"详情",//标题
      formData:{
        "address": "",//地址
        "area": 0,//	面积
        "buildDate": "",//	建立日期
        "equipment": "",//	教育设备
        "managerName":"",//站点管理员
        "managerId": "",//站点管理员id
        "name": ""//站点名称
      },
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    //取消
    close(){
      this.formData = {
        "address": "",//地址
        "area": 0,//	面积
        "buildDate": "",//	建立日期
        "equipment": "",//	教育设备
        "managerName":"",//站点管理员
        "managerId": "",//站点管理员id
        "name": ""//站点名称
      }
      this.visible = false;
    },
    //展示
    show(id){
      this.visible = true;
      this.getInfo(id)
    },
    getInfo(id){
      let params = {
        id:id
      }
      getSiteInfo(params).then(response => {
        this.formData = response
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    goLink(link){
      let p = window.location.protocol;
      let a = document.createElement("a");
      if(link.indexOf("http://")!=-1||link.indexOf("https://")!=-1){
        a.setAttribute("href", link);
      }else{
        a.setAttribute("href", `${p}//`+link);
      }
      a.setAttribute("target", "_blank");
      a.click();
      document.getElementsByTagName("body")[0].appendChild(a);
    }
  }
}
</script>

<style scoped>
  .site-info >>> .el-dialog{
    width: 740px;
  }
  .site-info >>> .el-select{
    width: 100%;
  }
  .site-info >>> .el-form-item{
    margin: 0;
    padding: 11px 0;
  }
  .site-info >>> .el-form-item{
    border-bottom: 1px solid #EEEEEE;
  }
  .site-info >>> .el-form-item__label{
    text-align: left;
  }
  .site-info >>> .el-dialog__body{
    padding-top:0;
  }
  .site-info >>> .el-form-item__content{
    color:#333333;
    font-weight: 600;
  }
</style>
