<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width = '400px'
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    @close="close"
  >
    <el-form ref="ruleForm" label-width="">
      <div v-if='isShow' class="warn-txt">
        <span class="icon-span yellow el-icon-info"></span>
        <div class="txt">
          <h5>成功导入<i>{{successNum}}</i>条,错误<i>{{errorNum}}</i>条</h5>
          <span class='txt-span'>{{errorNum}}条错误记录，已为您自动下载未导入成功的信息表，修改后可重新上传</span>
        </div>
      </div>
      <div v-if='!isShow' class="warn-txt">
        <span class="icon-span green el-icon-success"></span>
        <div class="txt">
          <h5>成功导入{{successNum}}条，失败{{errorNum}}条</h5>
        </div>
      </div>
      <el-col v-if='isShow' :span="24" class="tac tac1">
        <el-button @click="downLoad">下载错误数据</el-button>
        <el-button type="primary" @click="close">再次上传</el-button>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import commonReq  from "@/api/public/commonReq.js"

  export default{
    name:'WarnningImportPage',
    components:{

    },
    props:{

    },
    data(){
      return{
        // 模态
        visible: false,
        title:'提示',
        isShow:true,
        // 错误下载地址
        errorUrl:"",
        // 错误个数
        errorNum:0,
        // 成功个数
        successNum:0,
        // 模板名称
        templateName:'',
      }
    },
    watch:{

    },
    methods:{
      //打开弹窗
      show (errorUrl,errorNum,successNum,templateName) {
        this.errorUrl = errorUrl
        this.errorNum = errorNum
        this.successNum = successNum
        var d = new Date()
        var dateCurr = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()

        if(templateName){
          templateName=templateName.replace("模板","")
          templateName = templateName.split('.')
          this.templateName = templateName[0] + '错误信息汇总' + dateCurr + '.' + templateName[1]
        }else{
          this.templateName =  '错误信息汇总' + dateCurr + '.xlsx'
        }
        this.visible = true
        if(errorNum == 0){
          this.isShow = false//成功
        }else{
          this.isShow = true//失败
          this.downLoad()
        }

      },
      //下载错误文件
      downLoad(){
        // window.location.href=this.errorUrl
        commonReq.downloadFile(this.errorUrl,this.templateName)
      },
      //关闭弹窗
      close(){
        this.visible = false;
        if(this.isShow){
          this.$emit('refresh',false)
        }else{
          this.$emit('refresh',true)
        }

      }
    }
  }
</script scoped>

<style>
</style>
