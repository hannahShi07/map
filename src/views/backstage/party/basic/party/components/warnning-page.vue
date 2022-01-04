<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width = '400px'
  :append-to-body="true"
  >
    <el-form ref="ruleForm" label-width="">
      <div v-if='isShow' class="warn-txt">
        <span class="icon-span yellow el-icon-info"></span>
        <div class="txt">
          <h5>成功导入<i>100</i>条,错误<i>20</i>条</h5>
          <span class='txt-span'>20条错误记录，已为您自动下载未导入成功的信息表，修改后可重新上传</span>
        </div>
      </div>
      <div v-if='!isShow' class="warn-txt">
        <span class="icon-span green el-icon-success"></span>
        <div class="txt">
          <h5>成功导入120条，失败0条</h5>
        </div>
      </div>
      <el-col v-if='isShow' :span="24" class="tac tac1">
        <el-button>下载错误记录</el-button>
        <el-button type="primary">再次上传</el-button>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  export default{
    name:'warnning-page',
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
      }
    },
    watch:{

      },
      methods:{
        //打开弹窗
        show () {
          this.visible = true
        },

      }
    }
</script scoped>

<style>
</style>
