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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px" v-cloak v-loading="loading">
      <el-col :span="12">
        <el-form-item class="is-required" label="组织名称" prop="orgName">
          <el-input v-model="messages.orgName" maxlength="100" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="开始时间" prop="startTime">
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
        <el-form-item class="is-required" label="活动主题" prop="theme">
          <el-input v-model="messages.theme" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="活动地点" prop="address">
          <el-input v-model="messages.address" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="活动内容" prop="content">
<!--          <vue-editor v-model="messages.content" placeholder="20000个字符以内" :editorToolbar="customToolbar"></vue-editor>-->
          <base-tinymce-editor  v-model="messages.content" />
        </el-form-item>
      </el-col>
      <el-col :span="24" class="joinOrg" :class="(personList=='' || personList==undefined || personList=='null' || personList==null || personList.length<=0)? 'active':''">
        <el-form-item class="is-required" label="参会对象" prop="participantsIds">
          <el-button class="js-button" @click="addPerson()">+ 选择人员</el-button>
          <!--          <span class="jointxt">参会组织<i class="color-red">{{orgs.length}}</i>个</span>-->
          <span class="jointxt">参会人数<i class="color-red">{{personList.length}}</i>个</span>
        </el-form-item>
      </el-col>
      <!--展示添加人员-->
      <div class="show-person" v-if="personList!='' && personList!=undefined && personList!=null && personList!='null' && personList.length>0">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="orgs.data">
            <ul class="name-ul">
              <li v-for="(ite,index) in personList">
                <span>{{ite.name}}</span>
                <img src="@/assets/page/icon-close.png" @click="delet(ite,(index+1))">
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>



      <el-col :span="24">
        <el-form-item class="file" label="上传附件" prop="">
          <base-file-upload
            :limit='9'
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
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>

    <!--添加人员-->
    <choose-other-person ref="refAddperson" @refresh="selectPerson"/>
  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss'
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getProjectAdd,getProjectEdit,getProjectDetail} from "@/api/backstage/party/regionalparty/jointactivities/jointactivities.js"
  // import { VueEditor } from "vue2-editor";//引入富文本
  import ChooseOtherPerson from "@/components/individual/choose-other-person/index";

  export default {
    name: "jointactivities-add",
    components:{ChooseOtherPerson },
    data () {
      return {
        loading:false,
        // 自己的
        visible: false,
        title:'新增',
        activeNames: ['1'],//添加人员展示
        messages:{
          id:'',
          orgId:'',//组织id
          orgName:'',//组织名称
          constructionType:'',//类型
          address:'',//活动地点
          content:'',//活动内容
          participantsIds:'',//参与人员id(用逗号隔开，不能用逗号开头和结尾)
          participantsNum:'',//参与人数
          startTime:'',//开始时间

        },
        node: { // 必填项判断
          'theme':[{
            required: true,
            message: '请输入活动主题',
            trigger: 'blur'
          }],
          'startTime':[{
            required: true,
            message: '请选择开始时间',
            trigger: 'change'
          }],
          'address':[{
            required: true,
            message: '请输入活动地点',
            trigger: 'blur'
          }],
          // 'participantsIds':[{
          //   required: true,
          //   message: '请选择参与人员',
          //   trigger: 'change'
          // }]

        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "jointactivities",
          isSingle: false
        },
        accept:'.doc,.docx,.pdf,.xls,.xlsx,.zip',
        isEdit:'',//判断是新增还是编辑
        buildType:{//共建类型
          data:'党建联席活动',
          key:'2256847413879211853'
        },
        orgs:{//参与人员组织
          data:'',
          key:''
        },
        personList:[],//参与人员列表
      }

    },
    methods: {
      // 重置数据
      resetData(){
        this.$nextTick(function(){
          this.orgs={
            data:'',
            key:''
          }
          this.personList=[];
          this.messages={
            id:'',
            orgId:'',//组织id
            orgName:'',//组织id
            constructionType:'',//类型
            address:'',//活动地点
            content:'',//活动内容
            participantsIds:'',//参与人员id(用逗号隔开，不能用逗号开头和结尾)
            participantsNum:'',//参与人数
            startTime:'',//开始时间
          }
          this.$refs['ruleForm'].resetFields();//清除附件
        })
      },

      //获取当前组织
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.messages.orgId=res.data.orgId;
          this.messages.orgName=res.data.orgName;

        }).finally(() => {

        });
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.messages.id = res;
          this.otherData.bizId = res;
        })

      },
      //打开添加人员
      addPerson(){
        this.orgs={
          data:this.messages.orgName,
          key:this.messages.orgId
        }
        this.$refs['refAddperson'].show(this.messages.id,this.orgs,this.personList)
      },
      //展示添加人员
      handleChange(val) {

      },
      //选择的人员
      selectPerson(list){

        if(list!='' && list!=undefined && list!=null && list!='null' && list.length>0){
          this.personList=list;
        }else{
          this.orgs={
            data:'',
            key:''
          };
          this.personList=[];
        }
      },
      //删除
      delet(val,index){
        if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null'){
          this.personList.forEach((item,index)=>{
            if(val.id ===item.id){ // 对象里的唯一标识id
              this.personList.splice(index,1);
            }
          })
        }
      },

      //打开页面
      show (t,row) {
        this.visible = true;
        if(t==1){//新增
          this.resetData()
          this.isEdit=1;
          this.title='新增';
          this.partyUid();
          this.getUser();
        }else if(t==7){//编辑
          this.loading=true;
          this.isEdit=2;
          this.title='编辑';
          this.getDetail(row.id);
          this.otherData.bizId = row.id// 编辑时，附件自动回显
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.fileRef.init()
          })
        }

      },
      //获取编辑详情
      getDetail(id){
        let params={
          id:id
        }
        getProjectDetail(params).then(response => {

          const res = response;
          this.messages=res;
          this.orgs={
            data:res.orgName,
            key:res.orgId
          }
          this.personList=[];
          let names=[];
          if(res.participants!='' && res.participants!=undefined && res.participants!=null && res.participants!='null'){
            names=res.participants.split(',');
          }
          if(res.participantsIds!='' && res.participantsIds!=undefined && res.participantsIds!=null && res.participantsIds!='null'){
            let ids=res.participantsIds.split(',');

            for(let i=0;i<ids.length;i++){
              this.personList.push({
                name:names[i],
                id:ids[i]
              })

            }
          }

        }).finally(() => {
          this.loading=false;

        });
      },

      //取消
      cancel() {
        // this.$refs['ruleForm'].resetFields();//清除附件
        this.visible = false;
        // this.orgs={
        //   data:'',
        //   key:''
        // }
        // this.personList=[];
        // this.messages={
        //   id:'',
        //   orgId:'',//组织id
        //   orgName:'',//组织id
        //   constructionType:'',//类型
        //   address:'',//活动地点
        //   content:'',//活动内容
        //   participantsIds:'',//参与人员id(用逗号隔开，不能用逗号开头和结尾)
        //   participantsNum:'',//参与人数
        //   startTime:'',//开始时间
        // }
        this.resetData()
      },

      // 成功回调
      associationCallback(val){
        if(val){
          if(this.isEdit==1){//新增保存
            getProjectAdd(this.messages).then(response => {

              const res = response;
              this.$message(this.successTip())
              this.cancel()
              this.$emit('refresh',1)
            }).finally(() => {

            });

          }else if(this.isEdit==2){//编辑保存
            getProjectEdit(this.messages).then(response => {

              const res = response;
              this.$message(this.successTip())
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

      //保存
      saveBtn () {
        this.messages.constructionType=this.buildType.key;

        //处理参会对象
        this.messages.participantsIds=[];
        if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null' && this.personList.length>0){
          this.messages.participantsNum=this.personList.length;
          for(let i=0;i<this.personList.length;i++){
            this.messages.participantsIds.push(this.personList[i].id)
          }
          this.messages.participantsIds=this.messages.participantsIds.join(',')
        }else{
          this.messages.participantsIds='';
          this.messages.participantsNum=''
        }

        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          if(this.messages.participantsIds=='' || this.messages.participantsIds==undefined || this.messages.participantsIds==null || this.messages.participantsIds=='null'){
            this.$message.warning("请选择参会对象")
            return
          }

          //处理开始时间
          if(this.messages.startTime!='' && this.messages.startTime!=undefined && this.messages.startTime!=null && this.messages.startTime!='null'){
            if(this.messages.startTime.length==16){
              this.messages.startTime=this.messages.startTime+':00'
            }else if(this.messages.startTime.length>19){
              this.messages.startTime=this.messages.startTime.substring(0,19)
            }

          }else{
            this.messages.startTime=''
          }


          this.$refs.fileRef.submitFile()

        })
      }

    },
  }
</script>

<style scoped>
  .joinOrg /deep/ .el-form-item__content{
    display:flex;
    align-items:flex-end;
  }
  .joinOrg /deep/ .el-form-item {
    margin-bottom: 0px;
  }
  .active{
    margin-bottom:22px;
  }
  .jointxt{
    padding-left:32px;
    font-size: 14px;
    font-weight: bold;
    color: #666666;
  }
  .jointxt i{
    font-style:normal;
    padding:0 3px;
  }
  /*展示添加人员*/
  .show-person{
    width:100%!important;
    padding-left:120px;
    padding-bottom:10px;
  }

  .show-person /deep/ .el-collapse-item__header{
    width:100%!important;
    border-bottom:none;
    font-size:14px;
    color:#666;
    font-weight:600;
    position:relative;
    padding-left:20px;
  }
  .show-person /deep/ .el-collapse-item__wrap{
    border-bottom:none;
  }
  .show-person /deep/ .el-collapse {
    border-top:none;
    border-bottom:none;
  }
  .show-person /deep/ .el-collapse-item__content{
    padding-bottom:0px;
  }
  .show-person /deep/ .el-icon-arrow-right:before {
    content: "";
  }
  .show-person /deep/ .el-collapse-item__header:before {
    content: "";
    width:0;
    height:0;
    border-bottom: 8px solid #333333;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    display: inline-block;
    position:absolute;
    top:20px;
    left:0;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
  }
  .show-person /deep/ .el-collapse-item__header.is-active:before{
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  .name-ul{
    list-style: none;    /*清除列表默认样式*/
    padding: 0;      /*清除padding*/
    margin: 0;
    display:flex;
    flex-flow:wrap;
    justify-content:flex-start;
    align-items: center;
    padding-left:20px;
  }
  .name-ul li{
    padding:4px 12px;
    background:#F2F2F2;
    border-radius:4px;
    font-size: 14px;
    font-weight: 600;
    color: #666666;
    display:flex;
    justify-content:space-between;
    align-items: center;
    margin-right:14px;
    margin-bottom:12px;
  }
  .name-ul li span{
    display:block;
  }
  .name-ul li img{
    display:block;
    width:18px;
    height:18px;
    overflow:hidden;
    margin-left:10px;
  }

</style>
