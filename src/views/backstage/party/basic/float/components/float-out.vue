<template>
  <el-dialog
  class="bc-heard"
  :title="title"
  :visible.sync="visible"
  width = '900px'
  @close="cancelFun"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
    <el-form :model="djMemberFlowSaveDTO" :rules="node" ref="ruleForm" label-width="120px"  v-cloak v-loading="loading">
      <el-col :span="12">
      	<el-form-item label="流动类型" prop="type.data">
      		<el-input v-model="djMemberFlowSaveDTO.type.data" disabled></el-input>
      	</el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item v-if="isEdit==2" label="党员姓名" prop="memberId.data">
          <el-input v-model="djMemberFlowSaveDTO.memberId.data" disabled></el-input>
        </el-form-item>
      	<el-form-item v-if="isEdit==1" class="is-required" label="党员姓名" prop="memberId.key">
          <el-select
              v-model="djMemberFlowSaveDTO.memberId.key"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width:100%;"
              @change="selectChange"
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
      <el-col :span="24">
      	<el-form-item label="所属组织" prop="orgId.data">
          <el-input v-model="djMemberFlowSaveDTO.orgId.data" disabled></el-input>
          <!-- <el-select
              v-model="djMemberFlowSaveDTO.orgId.key"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                  v-for="item in orgList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
          </el-select> -->
      	</el-form-item>
      </el-col>

      <el-col :span="12">
      	<el-form-item label="身份证号" prop="idCode">
      		<el-input placeholder="请输入" v-model="djMemberFlowSaveDTO.idCode" disabled></el-input>
      	</el-form-item>
      </el-col>
      <el-col :span="12">
      	<el-form-item class="is-required" label="流出日期" prop="flowDate">
      		<el-date-picker
            v-model="djMemberFlowSaveDTO.flowDate"
            type="date"
            placeholder="请选择"
            :picker-options="pickerOptionslc"
            @change="selectlc"
            value-format="yyyy-MM-dd">
          </el-date-picker>
      	</el-form-item>
      </el-col>
      <el-col :span="12">
      	<el-form-item label="流回日期" prop="returnflowDate">
      		<el-date-picker
            v-model="djMemberFlowSaveDTO.returnflowDate"
            type="date"
            placeholder="请选择"
            @change="selectlh"
            :picker-options="pickerOptionslh"
            value-format="yyyy-MM-dd">
          </el-date-picker>
      	</el-form-item>
      </el-col>
      <el-col :span="12">
      	<el-form-item class="is-required" label="原因" prop="flowReasons.key">
          <el-select
              v-model="djMemberFlowSaveDTO.flowReasons.key"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                  v-for="(item,index) in dicts.FLOW_REASON"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
              </el-option>
          </el-select>
      	</el-form-item>
      </el-col>

      <el-col :span="24">
      	<el-form-item label="备注" prop="remark">
          <el-input
            v-model="djMemberFlowSaveDTO.remark"
            type="textarea"
            maxlength="500"
            show-word-limit
            :autosize='{ minRows: 11, maxRows:11}'
            resize="none"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-col>
<!--      <el-col :span="24" class="tac">-->
<!--        <el-button @click="cancelFun">取消</el-button>-->
<!--        <el-button type="primary" @click="save()">确定</el-button>-->
<!--      </el-col>-->
    </el-form>
    <div slot="footer" class="text-center">
      <el-button @click="cancelFun">取消</el-button>
      <el-button type="primary" @click="save()">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getUserinformation,getOrgName,getSelectFlowOutMemberList,getFloatAdd,getFloatDetail,getFloatEdit} from "@/api/backstage/party/basic/float/float.js"
  export default{
    data(){
      return{
        loading:false,//加载遮罩
        // 模态
        visible: false,
        title:'新增流出',
        djMemberFlowSaveDTO: {//党员流动
            branchPerson:'',
            contact:'',
            flowMemberNum:'',//流动党员证编号
            orgRelationAddress:'',//流出地点(流入)
            member:'',
            type:{//流动类型-流出
              data:'流出',
              key:'1264044521172238336'
            },
            memberId:{//流动党员id
              data:'',
              key:''
            },
            orgId:{//所属组织(流出)
              data:'',
              key:''
            },
            idCode:'',//身份证号
            flowDate:this.getNowTime(),//流入/流出日期（默认显示当前日期）
            returnflowDate:'',//流回日期
            flowReasons:{//流动原因
              data:'',
              key:''
            },
            remark:'',//备注
        },
        nameList:[],//党员姓名下拉框
        isEdit:1,//新增：1，编辑：2
        isCode:false,//验证身份证标识
        dicts: {//字典
          FLOW_REASON:{},//原因
        },
        node: {// 必填项判断
          'memberId.key':[{
            required: true,
            message: '请选择党员姓名',
            trigger: 'change'
          }],
          'flowDate':[{
            required: true,
            message: '请选择流出日期',
            trigger: 'change'
          }],
          'flowReasons.key':[{
            required: true,
            message: '请选择原因',
            trigger: 'change'
          }],
        },
        pickerOptionslh: {//流回日期限制

        },
        pickerOptionslc: {//流出日期限制

        },

      }
    },
    watch:{

    },
    mounted(){
      this.getDict();
      this.getUser();
      // this.getOrgnamelist();
      //限制流回时间
      if(this.djMemberFlowSaveDTO.flowDate!='' && this.djMemberFlowSaveDTO.flowDate!=undefined && this.djMemberFlowSaveDTO.flowDate!=null && this.djMemberFlowSaveDTO.flowDate!='null') {
        let preDate = new Date(this.djMemberFlowSaveDTO.flowDate).getTime();
        this.pickerOptionslh={//时间限制
          disabledDate(time) {
            return time.getTime() < preDate
          },
        }

      }

    },
    methods:{
      //流回日期和流入日期限制
      selectlc(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate = new Date(val).getTime();
          this.pickerOptionslh={//时间限制
            disabledDate(time) {
              return time.getTime() < preDate
            },
          }

        }

      },
      selectlh(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate =  new Date(val).getTime()-24*60*60*1000;
          this.pickerOptionslc={//时间限制
            disabledDate(time) {
              return time.getTime() > preDate
            },
          }
        }
      },
      //取消
      cancelFun(){
        this.visible = false;
        this.$emit('refresh');
        this.djMemberFlowSaveDTO.memberId={
          data:'',
          key:''
        };
        this.djMemberFlowSaveDTO.idCode='';
        this.djMemberFlowSaveDTO.returnflowDate='';
        this.djMemberFlowSaveDTO.flowReasons={
          data:'',
          key:''
        };
        this.djMemberFlowSaveDTO.remark='';
        this.djMemberFlowSaveDTO.flowDate=this.getNowTime()
        this.$refs['ruleForm'].resetFields()
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['FLOW_REASON',]
        }
        commonReq.getHistoryDict(params).then(response =>{
          //console.log('字典表： '+JSON.stringify(response))
          const res = response;
          this.dicts.FLOW_REASON = res.FLOW_REASON;

        })
      },
      //打开新增流出
      show(t,row) {
        this.visible = true;
        this.isEdit=1;
        this.title="新增流出"
        this.getDict();
        this.getUser();
        // this.getOrgnamelist();

        //编辑页面数据
        if(row!='' && row!=undefined && row!=null && row!='null'){
          this.title="编辑流出";
          this.loading = true;
          this.isEdit=2;
          let params={
            id:row.id
          }
          getFloatDetail(params).then(response => {
            const res = response;
            this.djMemberFlowSaveDTO.id=row.id;
            this.djMemberFlowSaveDTO.memberId.key=res.memberId.key;
            this.djMemberFlowSaveDTO.memberId.data=res.memberId.data.name;
            this.djMemberFlowSaveDTO.orgId=res.orgId;
            this.djMemberFlowSaveDTO.flowDate=res.flowDate;
            this.djMemberFlowSaveDTO.returnflowDate=res.returnflowDate;
            this.djMemberFlowSaveDTO.flowReasons=res.flowReasons;
            this.djMemberFlowSaveDTO.remark=res.remark;
            this.djMemberFlowSaveDTO.orgRelationAddress=res.orgRelationAddress;
            this.djMemberFlowSaveDTO.flowMemberNum=res.flowMemberNum;
            this.djMemberFlowSaveDTO.branchPerson=res.branchPerson;
            this.djMemberFlowSaveDTO.contact=res.contact;
            this.djMemberFlowSaveDTO.member=res.member;

            if(res.memberId.data!='' && res.memberId.data!=undefined && res.memberId.data!=null && res.memberId.data!='null'){
              this.djMemberFlowSaveDTO.idCode=res.memberId.data.idCode;
            }else{
              this.djMemberFlowSaveDTO.idCode=''
            }

            //限制流出、流出时间
            if(this.djMemberFlowSaveDTO.flowDate!='' && this.djMemberFlowSaveDTO.flowDate!=undefined && this.djMemberFlowSaveDTO.flowDate!=null && this.djMemberFlowSaveDTO.flowDate!='null') {
              let preDate = new Date(this.djMemberFlowSaveDTO.flowDate).getTime();
              this.pickerOptionslh={//时间限制
                disabledDate(time) {
                  return time.getTime() < preDate
                },
              }

            }
            if(this.djMemberFlowSaveDTO.returnflowDate!='' && this.djMemberFlowSaveDTO.returnflowDate!=undefined && this.djMemberFlowSaveDTO.returnflowDate!=null && this.djMemberFlowSaveDTO.returnflowDate!='null') {
              let preDate = new Date(this.djMemberFlowSaveDTO.flowDate).getTime();
              this.pickerOptionslc={//时间限制
                disabledDate(time) {
                  return time.getTime() > preDate
                },
              }

            }

          }).finally(() => {
            //console.log("finally");
            this.loading = false;
          });

        }

      },
      //获取所属组织
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        getUserinformation(params).then(response => {
          //console.log('用户信息： '+JSON.stringify(response))
          const res = response;
          this.djMemberFlowSaveDTO.orgId.data=res.data.orgName;
          this.djMemberFlowSaveDTO.orgId.key=res.data.orgId;
          this.getOrgnamelist()

        }).finally(() => {
          //console.log("finally");
        });
      },
      //获取党员姓名
      getOrgnamelist(){
        let params = {
          orgId:{
            key:this.djMemberFlowSaveDTO.orgId.key
          }
        }
        getSelectFlowOutMemberList(params).then(response => {
          // console.log('党员姓名： '+JSON.stringify(response))
          const res = response;
          this.nameList=res;
        }).finally(() => {
          //console.log("finally");
        });

      },
      //获取身份证号
      selectChange(value){
        for(var i=0;i<this.nameList.length;i++){
          if(value==this.nameList[i].id){
            this.djMemberFlowSaveDTO.memberId.data=this.nameList[i].name;
            this.djMemberFlowSaveDTO.idCode=this.nameList[i].idCode;
          }
        }
        // if(this.djMemberFlowSaveDTO.idCode!='' && this.djMemberFlowSaveDTO.idCode!=undefined && this.djMemberFlowSaveDTO.idCode!=null && this.djMemberFlowSaveDTO.idCode!='null'){
        //   let data = {
        //     memberId: value,
        //     memberInfo:this.djMemberFlowSaveDTO.idCode
        //   }
        //   commonReq.getVerification(data).then(response =>{
        //     const res = response;
        //     if(res==true){
        //       this.$message.warning("该身份证号已存在，请重选择")
        //       this.isCode=true;
        //     }
        //   }).finally(() => {
        //
        //   });
        // }

      },
      save(){
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          if(this.isCode==true){
            this.$message.warning("该身份证号已存在，请重新选择");
            return
          }
            //console.log('流出参数：' +JSON.stringify(this.djMemberFlowSaveDTO))
            if(this.isEdit==1){
              getFloatAdd(this.djMemberFlowSaveDTO).then(response => {
                //console.log('保存数据： '+JSON.stringify(response))
                // this.$message.success("保存成功")
                this.$message(this.successTip())
                this.cancelFun();
                this.$emit('refresh',1)
              }).finally(() => {
                //console.log("finally");
              });
            }else if(this.isEdit==2){
              // this.djMemberFlowSaveDTO.djMemberUpdateDTO=this.djMemberFlowSaveDTO.djMemberSaveDTO;
              // this.djMemberFlowSaveDTO.djMemberSaveDTO='';
              //console.log('参数： '+JSON.stringify(this.djMemberFlowSaveDTO))
              getFloatEdit(this.djMemberFlowSaveDTO).then(response => {
                //console.log('编辑保存数据： '+JSON.stringify(response))
                // this.$message.success("保存成功")
                this.$message(this.successTip())
                this.cancelFun();
                this.$emit('refresh',1)
              }).finally(() => {
                //console.log("finally");
              });
            }
        })
      },
      //处理默认选中当前日期
      getNowTime() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        //var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
        month = month + 1;
        month = month.toString().padStart(2, "0");
        date = date.toString().padStart(2, "0");
        var defaultDate = `${year}-${month}-${date}`;
        //console.log(defaultDate)
        return defaultDate;
        this.$set(this.info, "stockDate", defaultDate);
      },

    }
  }

</script>

<style scoped>

</style>
