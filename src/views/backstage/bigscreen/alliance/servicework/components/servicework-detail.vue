<template>
  <el-dialog
    :title="title"
    width="900px"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    v-if="visible">
    <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
      <div class="information">
        <el-row>
          <el-col :span="24">
            <el-form-item label="单位" prop="">
              {{isEmpty(formData.orgName)}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务职能" prop="">
              {{isEmpty(formData.serviceFunction)}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="服务类型" prop="">
              {{isEmpty(formData,'type.data')}}
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="close">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {getpageDetail} from "@/api/backstage/sysset/bigscreen/alliance/servicework/servicework.js"
export default {
  name: "servicework-deatil",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"详情",//标题
      node:{},
      formData:{}
    }
  },
  mounted() {

  },
  computed: {

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
      getpageDetail(params).then(response => {
        this.formData = response
      })
    },

  }
}
</script>

<style scoped>
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

