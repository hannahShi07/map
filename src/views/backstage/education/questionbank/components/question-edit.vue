<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '520px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="80px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item label="发布组织" prop="orgId.data">
          <el-input v-model="messages.orgId.data" readonly disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="题库名称" prop="title">
          <el-input v-model="messages.title" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24" v-if="isShow">
        <el-form-item class="is-required" label="题库状态" prop="status">
          <el-radio-group v-model="messages.status">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="text-center1">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>

    <!--确定创建-->
    <question-creatived ref="refCreatived" @refresh="refresh"/>

  </el-dialog>
</template>

<script>
  import QuestionCreatived from "./question-creatived"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getQuestonlistAdd,getQuestonlistEdit} from "@/api/backstage/education/questionbank/questionbank.js"

  export default {
    name: "question-edit",
    components:{QuestionCreatived},
    data () {
      return {
        loading:true,
        visible: false,
        title:'创建题库',
        isShow:false,
        messages:{
          id:'',//题库id
          orgId:{
            data:'',
            key:''
          },//发布组织
          title:'',//题库名称
          status:'1',//0:启用，1：停用
        },
        node: { // 必填项判断
          'title': [{
            required: true,
            message: '请输入题库名称',
            trigger: 'blur'
          }],
          'status': [{
            required: true,
            message: '请选择题库状态',
            trigger: 'change'
          }],
        },
        isEdit:'',//1:新增，2：编辑
      }
    },
    methods: {
      //获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.messages.orgId={
            data:res.data.orgName,
            key:res.data.orgId
          }

        })
      },
      //打开页面
      show(t, row) {
        this.visible = true;
        if(t==1){//新增
          this.loading=false;
          this.title="创建题库";
          this.getUser();
          this.isShow=false;
          this.isEdit=1;
        }else if(t==9){//编辑
          this.isEdit=2;
          if(row.orgId=='null' || row.orgId=='' || row.orgId==undefined || row.orgId==null){
            row.orgId={
              data:'',
              key:''
            }
          }

          this.title="编辑题库";
          this.isShow=true;
          this.messages={
            id:row.id,
            orgId:row.orgId,//发布组织
            title:row.title,//题库名称
            status:row.status,//0:启用，1：停用
          }
          this.loading=false;

        }
      },
      //取消
      cancel() {
        this.visible = false;
        this.messages={
          id:'',
          orgId:{//发布组织
            data:'',
            key:'',
          },
          title:'',//题库名称
          status:'',//0:启用，1：停用
        }
      },
      //单项选择
      handleRoleCheckedChange(val){

      },
      //确定
      saveBtn(){
        if(this.isEdit==1){
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              // this.$message.warning("您有必填项未填")
              return // 表单必填项判断
            }
            let params={
              title:this.messages.title,
              orgId:this.messages.orgId
            }
            getQuestonlistAdd(params).then(response => {
              const res = response;
              if(res.code=='0'){
                // this.cancel()
                this.$message(this.successTip());
                this.$refs['refCreatived'].show(1,res.data);
                this.$emit('refresh',1);
              }else{
                this.$message.error(res.msg)
              }
            }).finally(() => {

            });
          })

        }else if(this.isEdit==2){
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              // this.$message.warning("您有必填项未填")
              return // 表单必填项判断
            }
            getQuestonlistEdit(this.messages).then(response => {
              this.$message(this.successTip())
              const res = response;
              this.cancel()
              this.$emit('refresh');
            }).finally(() => {

            });
          })
        }

      },

      //返回调用方法
      refresh(){
        this.visible = false;
      }
    },
  }
</script>

<style scoped lang="scss">
  .text-center1{
    text-align:center;
  }

</style>
