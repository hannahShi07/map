<template>
  <div class="year-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="创建组织">
              <el-input v-model="orgName" maxlength="200" disabled/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="推荐播放时间" prop="playDate">
              <el-date-picker
                v-model="formData.playDate"
                type="date"
                placeholder="选择推荐播放时间"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="播放内容" prop="content">
              <el-input v-model="formData.content" type="textarea" resize="none" maxlength="500" :autosize="{minRows: 10, maxRows: 10}" show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {yearSave,getYearInfo,yearEdit} from "@/api/backstage/education/year/year.js"
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "WeekAdd",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"新增",//标题
      orgId:"",//组织id
      orgName:"",//组织名称
      formData:{
        "content": "",//播放内容
        "playDate": "",//	推荐播放时间
      },
      options:[],
      node:{
        playDate:{
          required: true,
          message: "请选择推荐播放时间",
          trigger: "blur"
        },
        content:{
          required: true,
          message: "请输入播放内容",
          trigger: "blur"
        },
      }
    }
  },
  mounted() {
    this.getUser()
  },
  computed: {

  },
  methods: {
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        this.orgId=response.data.orgId;
        this.orgName=response.data.orgName;
      })
    },
    //取消
    close(){
      this.formData = {
        "content": "",//播放内容
        "link": "",//	链接地址
        "playDate": "",//	推荐播放时间
      }
      this.visible = false;
    },
    // 保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          let params = this.formData;
          this.loading = true;
          if(this.title == "新增"){
            yearSave(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {
              this.loading = false;
            });
          }else{
            yearEdit(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {
              this.loading = false;
            });
          }
        }
      })
    },
    //展示
    show(t,row){
      if(t == 1){
        this.title = "新增"
      }else{
        this.title = "编辑"
        this.getInfo(row.id)
      }
      this.visible=true;
    },
    getInfo(id){
      let params = {
        id:id
      }
      getYearInfo(params).then(response => {
        this.formData = response
        this.formData.id = id
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>
  .year-add >>> .el-dialog{
    width: 573px;
  }
  .year-add >>> .el-select{
    width: 100%;
  }
  .year-add >>> .el-form-item__label{
    width: 110px !important;
  }
  .year-add >>> .el-form-item__content{
    margin-left: 110px !important;
  }
</style>
