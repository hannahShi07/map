<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1130px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="80px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="信息标题" prop="title">
          <el-input v-model="messages.title" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布单位" prop="publishOrg">
          <el-input v-model="messages.publishOrg" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="发布日期" prop="publishDate">
          <el-date-picker
            v-model="messages.publishDate"
            type="date"
            placeholder="请选择"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="报名地址" prop="address">
          <el-input v-model="messages.address" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="内容" prop="content">
<!--          <vue-editor class="is-required" v-model="messages.content" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.content" />
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
  // import { VueEditor } from "vue2-editor";//引入富文本
  import {getRecruitDetail,getRecruitAdd,getRecruitEdit} from "@/api/backstage/personnel/talentrecruitment/recruitinfomanage/recruitinfomanage.js"



  export default {
    name: "recruit-add",
    components:{},
    data () {
      return {
        loading:false,
        // 自己的
        visible: false,
        title:'新增',
        messages:{
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          address:'',//报名地址
          content:'',//内容

        },
        node: { // 必填项判断
          'title':[{
            required: true,
            message: '请输入信息标题',
            trigger: 'blur'
          }],
          'publishOrg':[{
            required: true,
            message: '请输入发布单位',
            trigger: 'blur'
          }],
          'address':[{
            required: true,
            // pattern:/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/,
            message: '请输入报名地址',
            trigger: 'blur'
          },{
            pattern: /^((((https|http)(:\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
            message: '网址格式错误',
            trigger: 'blur'
          }],
          'publishDate':[{
            required: true,
            message: '请选择发布时间',
            trigger: 'change'
          }],

        },
        isEdit:'',//判断是新增还是编辑
      }
    },
    methods: {
      //新增获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          //console.log('信息： '+JSON.stringify(response))
          const res = response;
          this.messages.title=res.data.orgName+'招聘信息';
          this.messages.publishOrg=res.data.orgName;
        }).finally(() => {

        });
      },
      //打开页面
      show (t,row) {
        this.visible = true;
        this.messages={
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          address:'',//报名地址
          content:'',//内容
        }

        if(t==1){//新增
          this.isEdit=1;
          this.title='新增';
          this.getUser();
        }else if(t==4){//编辑
          this.loading=true,
          this.isEdit=2;
          this.title='编辑';
          this.getDetail(row.id);
        }

      },
      //获取编辑详情
      getDetail(id){
        let params={
          id:id
        }
        getRecruitDetail(params).then(response => {
          //console.log('编辑：'+JSON.stringify(response))
          const res = response;
          this.messages={
            id:id,
            title:res.title,//信息标题
            publishOrg:res.publishOrg,//发布单位
            publishDate:res.publishDate,//发布日期
            address:res.address,//报名地址
            content:res.content,//内容
          };

        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.visible = false;
        this.messages={
          id:'',
          title:'',//信息标题
          publishOrg:'',//发布单位
          publishDate:'',//发布日期
          address:'',//报名地址
          content:'',//内容
        }
      },

      //保存
      saveBtn () {
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }

          if(this.isEdit==1){//新增保存
            delete this.messages.id;
            getRecruitAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh',1)
            })

          }else if(this.isEdit==2){//编辑保存
            getRecruitEdit(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })
          }


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
