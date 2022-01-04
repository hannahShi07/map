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
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="110px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="党组织名称" prop="org.data">
          <el-input v-model="messages.org.data" placeholder="请选择" readonly @click.native="getTree"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="党员姓名" prop="memberId">
          <el-select
            v-model="messages.memberId"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:100%;"
            @change="selectChange"
            clearable>
            <el-option
              v-for="(item,index) in nameList"
              :key="item.memberId"
              :label="item.name"
              :value="item.memberId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <base-telephone v-model="messages.phone" :phone="'phone'" :isImport="true"/>
<!--        <el-form-item class="is-required" label="联系方式" prop="phone">-->
<!--          <el-input v-model="messages.phone" placeholder="请输入" clearable maxlength="13"></el-input>-->
<!--        </el-form-item>-->
      </el-col>
      <el-col :span="12">
        <el-form-item label="工作单位" prop="workUnit">
          <el-input v-model="messages.workUnit" placeholder="请输入" clearable maxlength="100"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="职务" prop="job">
          <el-input v-model="messages.job" placeholder="请输入" clearable maxlength="100"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="居住在蜀山区" prop="isInShushan">
          <el-select
            v-model="messages.isInShushan"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:100%;"
            clearable>
            <el-option
              v-for="(item,index) in isCommunity"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
<!--      <el-col :span="12">-->
<!--        <el-form-item class="is-required" label="居住小区名称" prop="livingCommunity">-->
<!--          <el-input v-model="messages.livingCommunity" placeholder="请输入" clearable></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
      <el-col :span="12">
        <el-form-item class="is-required" label="报到地点" prop="reportSite">
          <el-select
            v-model="messages.reportSite"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:100%;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.REPORT_SITE"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="报到日期" prop="reportDate">
          <el-date-picker
            v-model="messages.reportDate"
            type="date"
            placeholder="请选择"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="file rel" label="回执上传" prop="">
          <base-file-upload
            :limit='1'
            list-type="picture-card"
            :acceptSize="20"
            :autoUpload="true"
            :otherData="otherData"
            :action="action"
            ref="fileRef"
            @associationCallback="associationCallback"/>
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
    <!--上级党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>
  </el-dialog>


</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getCommunityAdd,getCommunityEdit,getCommunityDetail,getCommunityperson,getPersoninfo} from "@/api/backstage/party/orglife/partycommunity/partycommunity.js"
  export default {
    name: "partycommunity-add",
    data () {
      return {
        loading:false,
        // 自己的
        visible: false,
        title:'新增',
        nameList:[],//党员姓名
        isCommunity:[//是否在蜀山区下拉框
          {
            id:1,
            label:'是'
          },{
            id:0,
            label:'否'
          }
        ],
        messages:{
          org:{//党组织
            data:'',
            key:'',
            code:''
          },
          workUnit:'',//工作单位
          phone:'',//联系方式
          id:'',
          memberId:'',//党员id
          isInShushan:'',//是否在蜀山区内
          job:'',//职务
          // livingCommunity:'',//是否居住在蜀山区内
          reportDate:'',//报到日期
          reportSite:'',//报到地点
          reportSiteName:'',//报到地点名称

        },
        node: { // 必填项判断
          'org.data':[{
            required: true,
            message: '请选择党组织',
            trigger: 'change'
          }],
          'memberId':[{
            required: true,
            message: '请选择党员姓名',
            trigger: 'change'
          }],
          'phone':[{
            required: true,
            pattern:/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
            message: '请输入正确的联系方式',
            trigger: 'blur'
          }],
          'isInShushan':[{
            required: true,
            message: '请选择是否居住在蜀山区',
            trigger: 'change'
          }],
          // 'livingCommunity':[{
          //   required: true,
          //   message: '请输入居住小区名称',
          //   trigger: 'blur'
          // }],
          'reportSite':[{
            required: true,
            message: '请选择报到地点',
            trigger: 'change'
          }],
          'reportDate':[{
            required: true,
            message: '请选择报到时间',
            trigger: 'change'
          }],


        },
        dicts: {//字典
          REPORT_SITE:{},//报到地点
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "partycommunity",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',
        isEdit:'',//判断是新增还是编辑
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
        })

      },
      //打开页面
      show (t,row) {
        this.visible = true;
        this.getDict();
        if(t==1){//新增
          this.isEdit=1;
          this.title='新增';
          this.partyUid();
        }else if(t==8){//编辑
          this.loading=true;
          this.isEdit=2;
          this.title='编辑';
          this.getDetail(row.id);
          this.otherData.bizId = row.id;
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.fileRef.init()
          })
          // this.getOrgnamelist();

        }
      },
      //获取详情
      getDetail(id) {
        let params = {
          id: id
        }
        getCommunityDetail(params).then(response => {
          // console.log('编辑：'+JSON.stringify(response))
          const res = response;
          this.messages = {
            org: {//党组织
              data: res.orgName,
              key: res.orgId,
            },
            workUnit: res.workUnit,//工作单位
            phone: res.phone,//联系方式
            id: res.id,
            memberId: res.memberId,//党员id
            isInShushan: res.isInShushan,//是否在蜀山区内
            job: res.job,//职务
            // livingCommunity:res.livingCommunity,//是否居住在蜀山区内
            reportDate: res.reportDate,//报到日期
            reportSite: res.reportSite,//报到地点
            reportSiteName: res.reportSiteName,
          }
          this.getOrgname();
        }).finally(() =>{
          this.loading = false;
        })
      },
      //打开上级党组织弹窗
      getTree(){
        this.$refs['orgTree'].show()
      },
      //选择的上级党组织回调
      getParentId(val){
        console.log('ssss: '+JSON.stringify(val))
        this.messages.org.data = "";
        this.messages.org.key="";
        this.messages.org.code="";
        if(val != ""){
          this.messages.org.data = val.data;
          this.messages.org.key=val.key;
          this.messages.org.code=val.code;
          // this.$refs['refForm'].clearValidate(['orgName']);
          // this.getCategory(val)
          this.getOrgnamelist();
        }
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['REPORT_SITE']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.REPORT_SITE = res.REPORT_SITE;

        })
      },
      //获取党员姓名,回显联系方式、工作单位和职务
      getOrgnamelist(){
        let params={}
        if(this.isEdit==1){
          params = {
            action:1,
            orgCode:this.messages.org.code,
            // id:this.messages.org.key,
          }

        }else if(this.isEdit==2){
          params = {
            action:2,
            orgCode:this.messages.org.code,
            // id:this.messages.org.key,
            memberId:this.messages.memberId
          }
        }

        getCommunityperson(params).then(response => {
          const res = response;
          this.nameList=res;
          if(this.nameList!='' && this.nameList!=undefined && this.nameList!=null && this.nameList!='null' && this.nameList.length>0){
            for(let i=0;i<this.nameList.length;i++){
              if(this.messages.memberId == this.nameList[i].memberId){
                this.messages.memberId=this.nameList[i].memberId;
                this.messages.phone=this.nameList[i].phone;
                this.messages.workUnit=this.nameList[i].company;
                this.messages.job=this.nameList[i].job;
                return
              }else{
                this.messages.memberId='';
                this.messages.phone='';
                this.messages.workUnit='';
                this.messages.job='';
              }
            }
          }else{
            this.messages.memberId='';
            this.messages.phone='';
            this.messages.workUnit='';
            this.messages.job='';
          }
        })

      },
      //编辑时获取党员姓名，不显示工作单位、联系方式和职务
      getOrgname(){
        let paramsdata={
          action:2,
          id:this.messages.org.key,
          memberId:this.messages.memberId
        }
        getCommunityperson(paramsdata).then(response => {
          const data = response;
          this.nameList = data;

        })
      },
      //选择党员姓名，获取联系方式和工作单位
      selectChange(value) {
        for (let i = 0; i < this.nameList.length; i++) {
          if (value == this.nameList[i].memberId) {
            this.messages.phone = this.nameList[i].phone;
            this.messages.workUnit = this.nameList[i].company;
            this.messages.job=this.nameList[i].job;

          }
        }
      },

      //取消
      cancel() {
        // this.$refs['ruleForm'].resetFields();//清除附件
        this.visible = false;
        this.messages={
          action:'',
          org:{//党组织
            data:'',
              key:''
          },
          workUnit:'',//工作单位
          phone:'',//联系方式
          id:'',
          memberId:'',//党员id
          isInShushan:'',//是否在蜀山区内
          job:'',//职务
          // livingCommunity:'',//是否居住在蜀山区内
          reportDate:'',//报到日期
          reportSite:'',//报到地点
          reportSiteName:'',
        }
      },

      // 成功回调
      associationCallback(val){
        if(val){
          if(this.isEdit==1){//新增
            getCommunityAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })
          }else if(this.isEdit==2){//编辑
            getCommunityEdit(this.messages).then(response => {
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
          if(this.dicts.REPORT_SITE!='' && this.dicts.REPORT_SITE!=undefined && this.dicts.REPORT_SITE!=null && this.dicts.REPORT_SITE!='null' && this.dicts.REPORT_SITE.length>0){
            for(let i=0;i<this.dicts.REPORT_SITE.length;i++){
              if(this.messages.reportSite==this.dicts.REPORT_SITE[i].id){
                this.messages.reportSiteName=this.dicts.REPORT_SITE[i].name
              }
            }
          }

          //删除参数
          delete this.messages.org;

          this.$refs.fileRef.submitFile()

          // if(this.isEdit==1){//新增保存
          //   getCommunityAdd(this.messages).then(response => {
          //     const res = response;
          //     this.$message.success("保存成功")
          //     this.cancel()
          //     this.$emit('refresh')
          //   })
          //
          // }else if(this.isEdit==2){//编辑保存
          //   getCommunityEdit(this.messages).then(response => {
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
    padding: 15px 40px 15px 30px;
  }
</style>

