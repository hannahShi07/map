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
        该成员已{{state.data}}，将移出至历史人员库，移出后该成员将不再属于本组织，且将无法登录，您确认要移出吗？
      </div>
      <div v-else class="warning-txt">
        移出后该成员将不再属于本组织，且将无法登录，您确认要移出吗？
      </div>
    </div>
    <el-form class="mt" :rules="node" ref="ruleForm" label-width="80px">
      <el-col :span="24">
        <el-form-item class="is-required" label="移出理由" prop="">
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
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary"  @click="save()">确定</el-button>
      </el-col>
    </el-form>
  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import {getMoveHistory,getManageAdd,getManageEdit} from "@/api/backstage/party/basic/manage/manage.js"
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
        handle:{//操作类型，移入：1258604854977232896、移出：1258605078227451904
          data:'移入',
          key:'1258604854977232896'
        },
        state:'',
        typeButton:1,//判断是移至历史人员库按钮：1，保存：2
        isEdit:'',//新增：1，编辑：2
        djMemberDTO: {},

      }
    },
    watch:{

    },
    methods:{
      //取消
      cancel(){
        this.visible = false;
        this.reason='';
      },
      //打开
      show (type,id,list,isEdit) {
        this.djMemberDTO = list;
        // console.log('id: '+JSON.stringify(id))
        this.visible = true;
        this.memberId=id;
        if(type==1){
          this.isShow=false;
          this.typeButton=1;
          this.isEdit=isEdit;
          // this.djMemberSaveDTO=this.list;
        }else if(type==2){
          this.state=list.state;
          this.isShow=true;
          this.typeButton=1;
          this.isEdit=isEdit;
          // this.djMemberSaveDTO=this.list;
        }else if(type==4){
          this.state=list.state;
          this.isShow=true;
          this.typeButton=2;
          this.isEdit=isEdit;
          // this.djMemberSaveDTO=this.list;
        }
        // console.log('this.state: '+JSON.stringify(this.state))
        // console.log('this.memberId: '+JSON.stringify(this.memberId))
        // console.log('this.isEdit: '+JSON.stringify(this.isEdit))
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

        // 直接移入历史库
        if(this.isEdit === '' || this.isEdit === undefined || this.isEdit === null || this.isEdit === 'null'){
            this.saveMoveHistory(params);

        // 新增/修改成死亡/失联 自动移入历史库
        }else{
            if(this.isEdit === 1){
                getManageAdd(this.djMemberDTO).then(response => {
                    const res = response;
                    if(res){
                        params.memberId = res.id;
                        this.saveMoveHistory(params);
                    }else{
                        this.$message.error("操作失败")
                    }
                })
            }else if(this.isEdit === 2){
                getManageEdit(this.djMemberDTO).then(response => {
                    const res = response;
                    if(res){
                        this.saveMoveHistory(params);
                    }else{
                        this.$message.error("操作失败")
                    }
                })
            }
        }
      },


      /**
       * 移至历史人员库
       * @Author: dfzhu
       * @Date: 2020/12/10
       */
      saveMoveHistory(params){
          getMoveHistory(params).then(response => {
              const res = response;
              if(res){
                  this.$message.success("操作成功")
                  this.visible = false;
                  this.reason='';
                  let val=true;
                  this.$emit('refresh',val)
              }else {
                  this.$message.error("操作失败")
              }
          }).finally(() => {
          });
      },

    }
  }

</script>

<style scoped>
</style>
