
<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '900px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" ref="ruleForm" :rules="node" label-width="110px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="我的培训心得" prop="experience">
          <el-input  type="textarea" v-model="messages.experience" placeholder="请输入" maxlength="500" show-word-limit :autosize="{ minRows: 11, maxRows: 11}"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainAdd,getTraindetail} from "@/api/front/personnel/educationtrain/trainexperience/trainexperience.js"



  export default {
    name: "experience-add",
    components:{},
    data () {
      return {
        loading:false,
        // 自己的
        visible: false,
        title:'心得上传',
        messages:{
          trainId:'',//id
          experience:'',//培训心得
        },
        node: { // 必填项判断
          'experience': [{
            required: true,
            message: '请输入我的培训心得',
            trigger: 'blur'
          }],
        },
        isEdit:'',//判断是新增还是编辑
      }
    },
    mounted(){

    },
    watch:{

    },
    methods: {
      //打开页面
      show (t,row) {
        this.visible = true;
        if(t==4){//新增
          this.isEdit=1;
          this.title='心得上传';
          this.messages={
            trainId:row.id,//id
            experience:'',//培训心得
          }
        }else if(t==5){//编辑
          this.loading=true;
          this.isEdit=2;
          this.title='编辑心得'
          this.getDetail(row.id);
        }

      },
      //获取编辑详情
      getDetail(id){
        let params={
          trainId:id
        }
        getTraindetail(params).then(response => {
          const res = response;
          this.messages={
            trainId:res.trainId,//id
            experience:res.experience,//培训心得
          }

        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.visible = false;
        this.messages={
          trainId:'',//id
          experience:'',//培训心得
        }
      },

      //保存
      saveBtn () {
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            return // 表单必填项判断
          }
          getTrainAdd(this.messages).then(response => {
            const res = response;
            this.$message(this.successTip());
            this.cancel()
            this.$emit('refresh')
          })
        })


      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 15px 40px;
  }
</style>
