<!--工作动态新增或编辑页-->
<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1000px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px">
      <el-form-item class="is-required" label="需完成时间" prop="taskBeginTime">
        <el-row type="flex" justify="space-between">
        <el-col :span="12">
          <el-date-picker
            v-model="messages.taskBeginTime"
            type="date"
            placeholder="请选择"
            :picker-options="pickerOptionsDisabled('start', 'taskEndTime')"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-col>
        <div class="time-line"></div>
          <el-col :span="12">
            <el-date-picker
              v-model="messages.taskEndTime"
              type="date"
              placeholder="请选择"
              :picker-options="pickerOptionsDisabled('end', 'taskBeginTime')"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-form-item>
      <el-col :span="24">
        <el-form-item  class="is-required" label="任务名称" prop="taskName">
          <el-input v-model="messages.taskName" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="通知组织" prop="orgIds">
          <div>
            <el-button size="medium" icon="el-icon-plus" @click="chooseOrg">添加组织</el-button>
            已选 <span style="color: #f00;">{{orgaination.length}}</span> 个组织
          </div>
          <div class="form-org-list" v-for="(item,index) in orgaination" :key="index">
            {{item.name}}
            <span class="close el-icon-close" @click="del(index,item)"/>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="任务要求" prop="taskDemands">
<!--          <vue-editor v-model="messages.taskDemands" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <el-input type="textarea" v-model="messages.taskDemands" maxlength="500" placeholder="请输入" show-word-limit :autosize="{
                    minRows: 5, maxRows: 5}"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上传附件" >
          <base-file-upload
            :limit='1'
            list-type="text"
            :acceptSize="20"
            :accept='accept'
            :autoUpload="true"
            :otherData="otherData"
            :action="action"
            ref="fileRef"
            @associationCallback="associationCallback"
          />
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">提交</el-button>
    </div>
    <!--所属党组织弹窗-->
    <choose-org ref="chooseOrg" :title="title" :checkParent="true" :getChild="false" @refresh='setCheckedOrg' :isParty="true"></choose-org>
  </el-dialog>
</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import ChooseOrg from '@/components/individual/choose-org'
    import commonReq  from "@/api/public/commonReq.js"
    import {getTaskmanagementAdd,getTaskmanagementEdit,getTaskmanagementDetail} from "@/api/backstage/party/informationPush/taskManagement/taskManagement.js"

    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
        name: "taskmanagement-add",
        components:{ VueEditor ,ChooseOrg},
        data () {
            var checkOrd = (rule, value, callback) => {
                if (this.messages.orgIds == '') {
                    callback(new Error('请选择组织'));
                } else {
                    callback();
                }
            }
            return {
                customToolbar: [//富文本编辑器
                    ['bold', 'italic', 'underline'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'header': '2'}], [{'align': 'center'}, {'align': 'justify'}, {'align': 'right'}],
                    [{'color': []}],[{'background': []}], ['image'], ['clean'],
                ],
                // content: '',
                // 自己的
                visible: false,
                loading:false,
                title:'',
                orgaination:[], //选择组织
                checkedOrgs:[],//已选中的组织
                messages:{
                    id:'',
                    taskBeginTime:'',//开始时间
                    taskEndTime:'',//结束时间
                    taskName:'',//任务名称
                    taskDemands:'', //任务要求
                    file:[],//附件
                    choseOrgId:'', //选择组织的id
                    orgIds: '',
                },
                node: { // 必填项判断
                    'taskBeginTime':[{
                        required: true,
                        message: '请选择需完成时间',
                        trigger: 'change'
                    }],
                    'taskName':[{
                        required: true,
                        message: '请输入任务名称',
                        trigger: 'blur'
                    }],
                    'taskDemands':[{
                        required: true,
                        message: '请输入任务要求',
                        trigger: 'blur'
                    }],
                    'orgIds':[{required: true, validator:checkOrd}],
                },
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "taskmangementAdd",
                    isSingle: false
                },
                accept:'.doc,.docx,.pdf,.xlsx,.zip',
                isEdit:'',//判断是新增还是编辑
                defaultDate:'',//当前时间
            }
        },
        mounted(){
        },
        methods: {
            // 成功回调
            associationCallback(val){
                if(val){
                    let params = {
                        id:this.otherData.bizId,//数据id
                        taskBeginTime:this.messages.taskBeginTime,//开始时间
                        taskEndTime:this.messages.taskEndTime,//结束时间
                        taskName:this.messages.taskName,//任务名称
                        taskDemands:this.messages.taskDemands, //任务要求
                        choseOrgId:this.messages.choseOrgId, //选择组织的id
                    }
                    if(this.isEdit==1){//新增保存
                        getTaskmanagementAdd(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        })

                    }else if(this.isEdit==2){//编辑保存
                        getTaskmanagementEdit(params).then(response => {
                            const res = response;
                            this.$message.success("保存成功")
                            this.cancel()
                            this.$emit('refresh')
                        }).finally(() => {
                        });
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '请再试一次 !!!',
                        type: 'error'
                    });
                }
            },
            //判断点击的时间大于等于当天
            //时间控件选择
            pickerOptionsDisabled (type, name) {
                if(type == 'start'){
                    return {
                        disabledDate: (time) => {
                            if (this.messages[name]) {
                                return (time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(this.messages[name]).getTime())
                            } else {
                                return time.getTime() < Date.now() - 8.64e7
                            }
                        },
                        selectableRange:this.startTimeRange
                    }
                } else {
                    return {
                        disabledDate: (time) => {
                            let shengyu = 0
                            let x=new Date();
                            x.setHours(0,0,0,0);
                            let y = new Date(this.messages[name]);
                            let times = "00:00:00"
                            let newXz = '' //新的时间限制
                            if(this.messages[name]){
                                if(this.messages[name].split(" ")[1]!='00:00:00'){
                                    shengyu = y.getTime()-x.getTime()
                                }
                            }
                            if (this.messages[name]) {
                                //return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(this.messages[name]).getTime() - shengyu)
                                let nowD = this.$options.filters['sendTimeDate'](new Date().getTime()) //获取当前时间
                                if(this.messages[name].split(" ")[0] != nowD.split(" ")[0]){ //不是同一天
                                    //开始时间是否是0点0分0秒
                                    newXz = this.messages[name].split(" ")[0] +" "+ times //时间不做限制
                                    return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < (new Date(newXz).getTime()))
                                } else { //是同一天，要限制选择的时分秒
                                    return (time.getTime() < Date.now() - 8.64e7|| time.getTime() < (new Date(this.messages[name]).getTime() - shengyu))
                                }
                            } else {
                                return time.getTime() < Date.now() - 8.64e7
                            }
                        },
                        selectableRange:this.endTimeRange
                    }
                }

            },

            //新增时获取UID
            partyUid(){
                commonReq.getNewUid({}).then(response =>{
                    const res = response
                    this.messages.id = res;
                    this.otherData.bizId = res;
                })
            },
            //处理默认选中当前日期
            getNowTime() {
                var now = new Date();
                var year = now.getFullYear(); //得到年份
                var month = now.getMonth(); //得到月份
                var date = now.getDate(); //得到日期
                month = month + 1;
                month = month.toString().padStart(2, "0");
                date = date.toString().padStart(2, "0");
                var defaultDate = `${year}-${month}-${date}`;
                return defaultDate;
            },
            //时间转化年月日
            formatDateTime(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m > 9 ? m : '0' + m;
                d = d > 9 ? d : '0' + d;
                return y + '-' + m + '-' + d;
            },
            //打开页面
            show (t,row) {
                this.visible = true;
                if(t==1){//新增
                    this.title = '新增'
                    this.isEdit=1;
                    this.messages.orgIds = ''
                    this.partyUid();
                    this.orgaination= []
                }else if(t==4){//编辑
                    this.title = '编辑'
                    this.isEdit=2;
                    this.getDetail(row.id);
                    this.otherData.bizId = row.id// 编辑时，附件自动回显
                    this.$nextTick(function(){// 编辑时，附件自动回显
                        this.$refs.fileRef.init()
                    })
                }
            },
            //选择的上级党组织回调
            setCheckedOrg(data){
                this.orgaination = JSON.parse(data)
                this.messages.choseOrgId = ''
                this.messages.orgIds = ''
                this.orgaination.forEach(item=>{
                    this.messages.choseOrgId += (item.id + ',')
                    this.messages.orgIds += (item.id + ',')
                })
                if(this.messages.orgIds){
                    this.$refs['ruleForm'].clearValidate('orgIds')
                }
            },
            //打开上级党组织弹窗
            chooseOrg() {
                this.$refs.chooseOrg.show(this.orgaination);
            },
            //删除组织
            del(data,currData){
                // this.orgaination.splice(this.orgaination.indexOf(data),1)
                this.messages.choseOrgId = ''
                this.messages.orgIds = ''
                // this.orgaination.forEach(item=>{
                //     this.messages.choseOrgId += (item.id + ',')
                //     this.messages.orgIds += (item.id + ',')
                // })
                let len = -1
                this.orgaination.forEach((item,index)=>{
                  if(item.id === currData.id){
                    len = index
                  }else{
                    this.messages.choseOrgId += (item.id + ',')
                    this.messages.orgIds += (item.id + ',')
                  }
                })
              if(len != -1){
                this.orgaination.splice(len,1)
              }
            },
            //获取编辑详情
            getDetail(id){
                let params={
                    id:id
                }
                getTaskmanagementDetail(params).then(response => {
                    const res = response;
                    this.messages=res;
                    this.orgaination= res.orgList
                    this.otherData.bizId = res.id;
                    this.messages.choseOrgId = ''
                    this.messages.orgIds = ''
                   res.orgList.forEach(item=>{
                        this.messages.choseOrgId += (item.id + ',')
                        this.messages.orgIds += (item.id + ',')
                    })
                }).finally(() => {
                });
            },

            //取消
            cancel() {
                this.$refs['ruleForm'].resetFields();//清除附件
                this.orgaination = []
                this.visible = false;
                this.messages={
                    id:'',//数据id
                    taskBeginTime:'',//开始时间
                    taskEndTime:'',//结束时间
                    taskName:'',//任务名称
                    taskDemands:'', //任务要求
                    file:[],//附件
                    choseOrgId:'', //选择组织的id
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
                    this.$refs.fileRef.submitFile()
                })
            }

        },
        filters: {
            sendTimeDate: function (date) {
                if (!!date) {
                    var nowDate =
                        new Date(date).getFullYear() +
                        '-' +
                        (new Date(date).getMonth() + 1 < 10 ? '0' + (new Date(date).getMonth() + 1) : new Date(date).getMonth() + 1) +
                        '-' +
                        (new Date(date).getDate(date) < 10 ? '0' + new Date(date).getDate(date) : new Date(date).getDate(date));
                    var nowTime =
                        (new Date(date).getHours() < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours()) +
                        ':' +
                        (new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()) +
                        ':' +
                        (new Date(date).getSeconds() < 10 ? '0' + new Date(date).getSeconds() : new Date(date).getSeconds());
                    return nowDate + ' ' + nowTime;
                } else {
                    return ''
                }
            },
        }
    }
</script>

<style scoped>
  .time-line {
    width: 10px;
    height: 2px;
    background: #BBBBBB;
    opacity: 1;
    border-radius: 4px;
    margin-top: 18px;
  }
  /deep/ .el-col-12{
    width: 47%;
  }
  .form-org-list {
    height: 26px;
    line-height: 26px;
    background: #F2F2F2;
    border-radius: 4px;
    color: #666666;
    margin-top: 10px;
    margin-bottom:10px;
    padding-left: 10px;
    font-size: 14px;
  }
  .el-icon-close {
    float: right;
    position: absolute;
    right: 5px;
    padding-top: 5px;
  }
</style>
