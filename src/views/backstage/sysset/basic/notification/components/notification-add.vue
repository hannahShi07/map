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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="100px">
      <el-col :span="24">
        <el-form-item class="is-required" label="标题" prop="title">
          <el-input v-model="messages.title" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="内容" prop="content">
<!--          <vue-editor v-model="messages.content" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.content" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
          <el-form-item class="is-required" label="通知组织" prop="orgIds">
            <div>
              <el-button size="medium" icon="el-icon-plus" @click="chooseOrg">添加组织</el-button>
              已选 <span style="color: #f00;">{{checkedOrgs.length}}</span> 个组织
            </div>
            <div class="form-org-list" v-for="(item,index) in checkedOrgs" :key="index">
              {{item.name}}
              <span class="close el-icon-close" @click="deleteOrg(index)"/>
            </div>
          </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="saveBtn(0)">保存</el-button>
      <el-button size="medium" type="primary" @click="saveBtn(1)">发布通知</el-button>
    </div>
    <choose-org ref="chooseOrg" :title="title" :checkParent="true" :getChild="false" @refresh='setCheckedOrg'></choose-org>
  </el-dialog>

</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getNoticeAdd,getNoticeEdit,getNoticeDetail} from "@/api/backstage/sysset/basic/notification/notification.js"
    // import { VueEditor } from "vue2-editor";//引入富文本
    import ChooseOrg from '@/components/individual/choose-org'
    export default {
        name: "notification-add",
        components:{ ChooseOrg },
        data () {
            var checkOrd = (rule, value, callback) => {
                if (this.messages.orgIds == '') {
                    callback(new Error('请选择组织'));
                } else {
                    callback();
                }
            }
            return {
                visible: false,
                title:'',
                messages:{
                    id:'',
                    title:'',//标题
                    content:'',//内容
                    // orgIds:'',//指定组织id字符串
                    orgIds: [],
                },
                checkedOrgs:[],//已选中的组织
                node: { // 必填项判断
                    'title':[{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    'content':[{
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }],
                    'orgIds':[{required: true, validator:checkOrd}],
                },
                isEdit:'',//判断是新增还是编辑
            }
        },
        mounted(){
        },
        watch:{
            'messages.content':{
                handler(newval){
                    if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
                        if(this.$refs.ruleForm){
                            this.$refs.ruleForm.clearValidate('content');//清除附件验证
                        }
                    }else{
                        if(this.$refs.ruleForm){
                            this.$refs.ruleForm.validateField("content");//添加附件验证
                        }
                    }
                },
                deep:true
            },
          'messages.orgIds': {
            handler(newval){
              if(newval){
                if(this.$refs.ruleForm){
                  this.$refs.ruleForm.clearValidate('orgIds');//清除附件验证
                }
              }else{
                if(this.$refs.ruleForm){
                  this.messages.orgIds = []
                  this.$refs.ruleForm.validateField("orgIds");//添加附件验证
                }
              }
            },
            deep:true
          }
        },
        methods: {
            //选择组织
            chooseOrg(){
                this.$refs.chooseOrg.show(this.checkedOrgs);
            },
            //删除组织
            deleteOrg(index){
              this.checkedOrgs.splice(index,1)
              this.messages.orgIds = []
              this.checkedOrgs.forEach(item=>{
                this.messages.orgIds.push(item.id)
              })
            },
            //选择的组织
            setCheckedOrg(data){
                this.checkedOrgs = JSON.parse(data)
                this.messages.orgIds = []
                this.checkedOrgs.forEach(item=>{
                    this.messages.orgIds.push(item.id)
                })
            },
            //打开页面
            show (t,row) {
                this.visible = true;
                if(t==1){//新增
                    this.isEdit=1;
                    this.title='新增';
                    this.messages.content = ''
                }else if(t==4){//编辑
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
                getNoticeDetail(params).then(response => {
                    const res = response;
                    this.messages=res;
                    this.messages.id = res.id
                    this.checkedOrgs =res.orgList
                    this.messages.orgIds = []
                    res.orgList.forEach(item=>{
                        this.messages.orgIds.push(item.id)
                    })
                })
            },
            //取消
            cancel() {
                this.$refs['ruleForm'].resetFields();//清除附件
                this.visible = false;
                this.messages={
                    id:'',//数据id
                    title:'',//标题
                    content:'',//发布内容
                };
                this.checkedOrgs =[];
            },
            //保存
            saveBtn (val) {
                this.$refs['ruleForm'].validate(valid => { // 表单验证
                    if (!valid) {
                        setTimeout(()=>{
                            const isError= document.getElementsByClassName('is-error')
                            isError.length && isError[0].querySelector('input').focus()
                        },100)
                        return // 表单必填项判断
                    }
                    let params={
                        id : this.messages.id,
                        "content": this.messages.content,
                        "isDelete": 0,
                        "isRelease": 0,
                        "memberIds": [],
                        "noticeOrg": {
                            "data": "",
                            "key": 0
                        },
                        "noticeType": "",
                        "noticeWayIds": ['2369909473046454278'],
                        "orgIds":this.messages.orgIds,
                        "state": {
                            "data": "",
                            "key": '1310765959610368000'
                        },
                        "title": this.messages.title,
                        "type": {
                            "data": "",
                            "key": '1310749524188200960'
                        }
                    }

                    if(val === 0){
                      params.state.key = '1310765921983266816'
                    }else{
                      params.state.key = '1310765959610368000'
                    }

                    if(this.isEdit==1){//新增保存
                        getNoticeAdd(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })
                    }else if(this.isEdit==2){//编辑保存
                        getNoticeEdit(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })
                    }
                })
            }

        },
    }
</script>

<style scoped lang="scss">
  /deep/ .el-dialog__body{
    padding: 15px 30px 15px 20px;
  }
  .form-org-list {
    position: relative;
    margin-top: 10px;
    padding: 0 30px 0 12px;
    background: #F2F2F2;
    border-radius: 4px;
    font-size: 14px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .close {
      padding: 3px;
      position: absolute;
      right: 14px;
      top: 10px;
      line-height: 1;
      background: #fff;
      color: #000;
      font-weight: bold;
      cursor: pointer;
    }
  }
</style>
