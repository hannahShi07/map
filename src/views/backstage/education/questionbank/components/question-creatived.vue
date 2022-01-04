<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '400px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    v-if="visible"
  >
    <div class="creativedBox">
      <img src="../../../../../assets/page/icon-success.png">
      <span class="creativedspan">
          题库创建成功，您可以选择<i>导入题目</i>或<i>新增题目</i>等方式完善题库
      </span>
    </div>
    <div slot="footer" class="text-right">
      <el-button size="medium" type="primary" @click="addquestion">新增题目</el-button>
      <el-button size="medium" type="primary" @click="exportquestion">导入题目</el-button>
    </div>
    <!--导入题目-->
    <base-org-import ref="refImport" @refresh="refresh" :otherData="otherData" :title="exporttitle" :action="action" :templateUrl='templateUrl' :templateName="templateName" :isHaveOrg="isHaveOrg" :fixed="fixed" :labelName="labelName" :examin="examin"/>

    <!--新增题目-->
    <question-add ref="refQuestion" @refresh="refresh"/>
  </el-dialog>

</template>

<script>
  import QuestionAdd from "./question-add"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getProjectAdd,getProjectEdit,getProjectDetail} from "@/api/backstage/party/regionalparty/buildpairs/buildpairs.js"

  export default {
    name: "question-creatived",
    components:{QuestionAdd},
    data () {
      return {
        visible: false,
        title:'创建成功',
        datalist:'',//题库数据
        exporttitle:'导入题目',//导入题目弹窗标题
        action:`${process.env.VUE_APP_BASE_API}/partycloud/djLearnRepo/importQuestExcel`,//导入地址
        templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/tk.xlsx`,//导入模版下载地址
        templateName:'题目导入模板.xlsx',//模板下载的文件名
        isHaveOrg:true,//导入弹窗是否展示上级党组织
        fixed:true,//导入弹窗输入框是否能编辑
        labelName:'上传题库',//导入弹窗是党务工作模块还是题库模块
        examin:true,//导入弹窗是否是题库模块
        otherData:{//导入额外参数
          repoId:'',
          headRows:'1',
          titleRows:'1'
        }

      }
    },
    mounted(){

    },
    methods: {
      //打开页面
      show (t,row) {
        this.visible = true;
        this.datalist=row;
      },
      //取消
      cancel() {
        this.visible = false;
      },
      //新增题库
      addquestion(){
        // this.visible = false;
        this.$refs['refQuestion'].show(1,this.datalist)
      },

      //导入题库
      exportquestion(){
        // this.visible = false;
        this.$refs['refImport'].show(1,this.datalist);
      },

      //回调方法
      refresh(){
        this.visible = false;
        this.$emit('refresh');
      }

    },
  }
</script>

<style scoped>
  .bc-heard /deep/ .el-dialog__header {
    background: #fff;
    padding: 20px 20px
  }
  .creativedBox{
    display:flex;
    justify-content: flex-start;
    align-items:center;
  }
  .creativedBox img{
    width:46px;
    height:46px;

  }
  .creativedBox span{
    display:block;
    padding-left:15px;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    color: #555555;
  }
  .creativedBox span i{
    font-style: normal;
    color:#3D9EFF;
  }

</style>
