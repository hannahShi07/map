<template>
  <el-dialog
  :title="title"
  :visible.sync="visible"
  width = '400px'
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
    <div class="warning-content">
      <span class="el-icon-warning"></span>
      <div v-if="isShow" class="warning-txt">
        该成员已{{this.state.data}}，将移出至历史人员库，移出后该成员将不在属于本组织，且将无法登录，您确认要移出吗？
      </div>
      <div v-else class="warning-txt">
        移出后该成员将不在属于本组织，且将无法登录，您确认要移出吗？
      </div>
    </div>
    <el-form class="mt" label-width="80px">
      <el-col :span="24">
        <el-form-item class="is-required" label="移出理由" prop="reason">
          <el-input
            v-model="reason"
            type="textarea"
            maxlength="500"
            show-word-limit
            :autosize='{ minRows: 6, maxRows: 6}'
            resize="none"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" class="tac">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save()">确定</el-button>
      </el-col>
    </el-form>
  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import {getMoveHistory} from "@/api/backstage/party/basic/float/float.js"
  export default{
    props:{
    },
    data(){
      return{
        // 模态
        visible: false,
        title:'移至历史人员库',
        node: {},// 必填项判断
        isShow:true,
        reason:'',//理由
        memberId:'',//党员id
        handle:{//操作类型，移入、移出
          data:'',
          key:''
        },
        state:'',

      }
    },
    watch:{

    },
    methods:{
      //打开
      show (type,id,state) {
        this.visible = true;
        this.memberId=id;
        if(type==1){
          this.isShow=false;
          this.handle={
            data:'移出',
            key:'1258605078227451904'
          };
        }else{
          this.state=state;
          this.isShow=true;
          this.handle={
            data:'移入',
            key:'1258604854977232896'
          };

        }
      },
      save(){
        if(this.reason=='' || this.reason==undefined || this.reason==null || this.reason=='null'){
          this.$message.warning("请输入移出理由")
          return
        }
        let params={
          handle:this.handle,
          memberId:this.memberId,
          reason: this.reason

        }
        getMoveHistory(params).then(response => {
          const res = response;
          this.$message.success("移出成功")
          this.visible = false;
          this.$emit('refresh')
        }).finally(() => {
          //console.log("finally");
        });
      }

    }
  }

</script>

<style scoped>
</style>
