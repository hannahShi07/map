<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width = '400px'
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
    <div class="ts-content">
      <img src="../../../../../../assets/page/icon-success.png">
      <div v-if="isShow" class="ts-txt">
        您将报名在{{list.department}}部门{{list.trainStart}}开展的{{list.theme}}培训，请确认
      </div>
      <div v-else class="ts-txt">
        您将取消在{{list.department}}部门{{list.trainStart}}开展的{{list.theme}}培训，请确认
      </div>
    </div>
    <el-form class="mt-top" ref="ruleForm" label-width="">
      <el-col :span="24" class="tac">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary"  @click="save()">确定</el-button>
      </el-col>
    </el-form>
  </el-dialog>

</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainsignup,getTrainsigndown} from "@/api/front/personnel/educationtrain/trainregistration/trainregistration.js"

  export default{
    props:{
    },
    data(){
      return{
        // 模态
        visible: false,
        title:'报名',
        isShow:true,
        list:'',//数据
        isEdit:'',//报名还是取消报名
      }
    },
    watch:{

    },
    methods:{
      //取消
      cancel(){
        this.visible = false;
        this.list='';
      },
      //打开
      show (t,row) {
        this.visible = true;
        this.list=row;
        if(t==1){
          this.isShow=true;
          this.isEdit=1;
        }else if(t==2){
          this.isShow=false;
          this.isEdit=2;
        }
      },
      save(){
        if(this.isEdit==1){
          let params = {
            id:this.list.id
          }
          getTrainsignup(params).then(response => {
            const res = response;
            this.$message(this.successTip());
            this.$emit('refresh');
            this.cancel();

          }).finally(() => {

          });

        }else if(this.isEdit==2){
          let params = {
            id:this.list.id
          }
          getTrainsigndown(params).then(response => {
            const res = response;
            this.$message(this.successTip());
            this.$emit('refresh');
            this.cancel();

          }).finally(() => {

          });

        }

      },
    }
  }

</script>

<style scoped lang="scss">
  /deep/ .el-dialog__header{
    background:#fff;
  }
  .ts-content{
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .ts-content img{
    width:46px;
    height:46px;
    overflow:hidden;
  }
  .ts-txt{
    flex:1;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: #555555;
    padding-left:20px;
  }
  .tac{
    text-align:right;
  }
  .mt-top{
    margin-top:10px;
  }
</style>
