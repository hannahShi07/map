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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="85px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="活动主题" prop="theme">
          <el-input v-model="messages.theme" placeholder="请输入" clearable maxlength="200"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="参与人" prop="participantsIds">
          <el-select
            v-model="messages.participantsIds"
            value-key="id"
            multiple
            collapse-tags
            placeholder="请选择"
            style="width:100%;"
            clearable>
            <el-option
              v-for="(item,index) in nameList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="messages.startTime"
            type="datetime"
            placeholder="请选择"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="其他参与人" prop="otherParticipants">
          <el-input v-model="messages.otherParticipants" placeholder="请输入" clearable maxlength="1000"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="活动地点" prop="address">
          <el-input v-model="messages.address" placeholder="请输入" clearable maxlength="100"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="活动内容" prop="content">
          <el-input v-model="messages.content" type="textarea" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 11, maxRows: 11}"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item class="file rel" label="图片" prop="">
          <base-file-upload
            :limit='9'
            list-type="picture-card"
            :acceptSize="20"
            :autoUpload="true"
            :otherData="otherData"
            :action="action"
            ref="fileRef"
            @associationCallback="associationCallback"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="file" label="上传附件" prop="">
          <base-file-upload
            :limit='9'
            list-type="text"
            :acceptSize="20"
            :accept='accept1'
            :autoUpload="true"
            :otherData="otherData1"
            :action="action"
            ref="fileRef1"
            @associationCallback="associationCallback1"/>
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center1">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getActivedAdd,getActivedEdit,getActivedDetail,getPersoninfo} from "@/api/backstage/party/orglife/activedcommunity/activedcommunity.js"
  export default {
    name: "activedcommunity-add",
    data () {
      return {
        loading:false,//加载遮罩
        // 自己的
        visible: false,
        title:'新增',
        nameList:[],//党员姓名
        orgId:'',//组织id
        orgCode:'',//组织编码
        messages:{
          id:'',
          address:'',//地点
          content:'',//内容
          otherParticipants:'',//其他参与人
          participantsIds:[],//参与人id,用英文逗号拼接
          startTime:'',//开始时间，时间到秒
          theme:'',//主题
        },
        node: { // 必填项判断
          'theme':[{
            required: true,
            message: '请输入活动主题',
            trigger: 'blur'
          }],
          'participantsIds':[{
            required: true,
            message: '请选择参与人',
            trigger: 'change'
          }],
          'address':[{
            required: true,
            message: '请输入活动地点',
            trigger: 'blur'
          }],
          'content':[{
            required: true,
            message: '请输入活动内容',
            trigger: 'blur'
          }],


        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "partycommunityReceipt",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',
        otherData1:{
          id: '',
          bizId: "",
          bizType: "partycommunityFile",
          isSingle: false
        },
        accept1:'.pdf,.doc,.docx,.xls,.xlsx,.txt',
        isEdit:'',//判断是新增还是编辑

        // 图片 文件上传状态
        picStatus: false,
        fileStatus: false,
      }
    },
    mounted(){

    },
    methods: {
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.messages.id = res;
          this.otherData.bizId = res;
          this.otherData1.bizId = res;
        })

      },
      //获取当前组织
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.orgId=res.data.orgId;
          this.orgCode=res.data.orgCode;
          this.getOrgnamelist()

        })
      },
      getOrgnamelist(){
        let params = {
          orgCode:this.orgCode
          // orgCode:{
          //   key:this.orgCode
          // },
        }
        getPersoninfo(params).then(response => {
          const res = response;
          this.nameList=res;
        })

      },

      //打开页面
      show (t,row) {
        this.visible = true;
        this.getUser();
        if(t==1){//新增
          this.isEdit=1;
          this.title='新增';
          this.partyUid();
        }else if(t==5){//编辑
          this.loading =true;
          this.isEdit=2;
          this.title='编辑';
          this.getDetail(row.id);
          this.otherData.bizId = row.id;
          this.otherData1.bizId = row.id;
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.fileRef.init()
            this.$refs.fileRef1.init()
          })

        }
      },
      //获取详情
      getDetail(id) {
        let params = {
          id: id
        }
        getActivedDetail(params).then(response => {
          const res = response;

          this.messages={
            id:res.id,
            address:res.address,//地点
            content:res.content,//内容
            otherParticipants:res.otherParticipants,//其他参与人
            participantsIds:res.participantsIds,//参与人id,用英文逗号拼接
            startTime:res.startTime,//开始时间，时间到秒
            theme:res.theme,//主题
          }
          if(this.messages.participantsIds!='' && this.messages.participantsIds!=undefined && this.messages.participantsIds!=null && this.messages.participantsIds!='null'){
            this.messages.participantsIds=this.messages.participantsIds.split(',')
          }

        }).finally(() =>{
          this.loading = false;
        })
      },

      //取消
      cancel() {
        // this.$refs['ruleForm'].resetFields();//清除附件
        this.visible = false;
        this.messages={
          id:'',
          address:'',//地点
          content:'',//内容
          otherParticipants:'',//其他参与人
          participantsIds:[],//参与人id,用英文逗号拼接
          startTime:'',//开始时间，时间到秒
          theme:'',//主题
        }
      },
      //成功回调
      associationCallback(val){
        if(val){
          this.$refs.fileRef1.submitFile();
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      associationCallback1(val){
        if(val){
          if(this.isEdit==1){//新增
            getActivedAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })
          }else if(this.isEdit==2){//编辑
            getActivedEdit(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })
          }
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
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
          if(this.messages.participantsIds!='' && this.messages.participantsIds!=undefined && this.messages.participantsIds!=null && this.messages.participantsIds!='null' && this.messages.participantsIds.length>0){
            this.messages.participantsIds=this.messages.participantsIds.join(',')
          }else{
            this.messages.participantsIds='';
          }
          if(this.messages.startTime!='' && this.messages.startTime!=undefined && this.messages.startTime!=null && this.messages.startTime!='null'){
            if(this.messages.startTime.length==16){
              this.messages.startTime=this.messages.startTime+':00'
            }else if(this.messages.startTime.length>19){
              this.messages.startTime=this.messages.startTime.substring(0,19)
            }

          }else{
            this.messages.startTime='';
          }


          this.$refs.fileRef.submitFile();


          // if(this.isEdit==1){//新增保存
          //   getActivedAdd(this.messages).then(response => {
          //     const res = response;
          //     this.$message.success("保存成功")
          //     this.cancel()
          //     this.$emit('refresh')
          //   })
          //
          // }else if(this.isEdit==2){//编辑保存
          //   getActivedEdit(this.messages).then(response => {
          //     const res = response;
          //     this.$message.success("保存成功")
          //     this.cancel()
          //     this.$emit('refresh')
          //   })
          // }

        })
      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 15px 40px;
  }
  .text-center1{
    text-align:center;
  }
</style>

