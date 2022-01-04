<template>
  <div class="add-content" v-cloak v-loading="loading">
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px">
      <div class="base-information">
        <h4>会议信息</h4>
        <div class="base-content">
          <el-col :span="24">
            <el-form-item class="is-required" label="会议名称" prop="meetingName">
              <el-input v-model="messages.meetingName" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会议类型" prop="meetingType.data">
              <el-input v-model="messages.meetingType.data" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="开始时间" prop="beginTime">
              <el-date-picker
                v-model="messages.beginTime"
                type="datetime"
                placeholder="请选择"
                :picker-options="pickerOptionsstart"
                @change="selectTime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="messages.endTime"
                type="datetime"
                placeholder="请选择"
                @change="selectendTime"
                :picker-options="pickerOptionsend"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="is-required" label="会议地点" prop="place">
              <el-input v-model="messages.place" placeholder="请输入" maxlength="200"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="joinOrg" :class="(orgs=='' || orgs==undefined || orgs=='null' || orgs==null || orgs.length<=0)? 'active':''">
            <el-form-item class="is-required" label="参会对象" prop="participantsId">
              <el-button class="js-button" @click="addPerson()">+ 添加人员</el-button>
              <span class="jointxt">参会组织<i class="color-red">{{orgs.length}}</i>个</span>
              <span class="jointxt">参会人数<i class="color-red">{{personList.length}}</i>个</span>
            </el-form-item>
          </el-col>
          <!--展示添加人员-->
          <div class="show-person">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item :title="item.data" :name="index" v-for="(item,index) in orgs">
                <ul class="name-ul">
                  <li v-for="(ite,inde) in personList" v-if="ite.orgId.key === item.key || ite.orgId === item.key">
                    <span>{{ite.name}}</span>
                    <img src="@/assets/page/icon-close.png" @click="delet(ite,(index+1))">
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>

          <el-col :span="24">
            <el-form-item label="列席人员" prop="">
              <el-input v-model="messages.lxParticipants" placeholder="请输入" maxlength="1000"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="主持人" prop="compere">
              <el-input v-model="messages.compere" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="记录人" prop="recorder">
              <el-input v-model="messages.recorder" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="指导人员" prop="lecturer">
              <el-input v-model="messages.adviser" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="is-required" label="会议议题" prop="agenda">
              <base-tinymce-editor  v-model="messages.agenda" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="warn-el">
            <el-form-item label="通知方式" prop="">
              <el-checkbox-group v-model="checkboxList">
                <el-checkbox v-for="(items,index) in checklist" :label="items.id" :key="items.id" @change="handleRoleCheckedChange(items,$event)">
                  {{items.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <span class="warnTxt">请确认通过何种方式通知参会人员</span>
          </el-col>

<!--          <el-col :span="24">-->
<!--            <el-form-item class="file" label="上传附件" prop="">-->
<!--              <base-file-upload-->
<!--                :limit='9'-->
<!--                list-type="text"-->
<!--                :acceptSize="20"-->
<!--                :accept='accept'-->
<!--                :autoUpload="true"-->
<!--                :otherData="otherData"-->
<!--                :action="action"-->
<!--                ref="fileRef"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="messages.remarks" type="textarea" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 7, maxRows: 7}"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="tac">
            <el-button class="js-button" @click="goBtn()">取消</el-button>
            <el-button type="primary" v-if="isHide" @click="save()">保存</el-button>
            <el-button type="primary" @click="notice()">发布并通知</el-button>
          </el-col>


        </div>
      </div>
    </el-form>
    <!--发布并通知弹窗-->
    <el-dialog
      class="bc-heard"
      title="发布会议"
      :visible.sync="visible"
      width = '400px'
      @close="cancel"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="warningContent" v-if="isNotice==1">
        <img src="../../../../../../assets/page/icon-warning.png">
        <span>您确认立即发布会议，并通知相关参会人员？</span>
      </div>
      <div class="warningContent" v-if="isNotice==2">
        <img src="../../../../../../assets/page/icon-warning.png">
        <span>未选择通知方式，是否保存？</span>
      </div>
      <div slot="footer" class="text-right" v-if="isNotice==1">
        <el-button size="medium" @click="cancel">取消</el-button>
        <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
      </div>
      <div slot="footer" class="text-right" v-if="isNotice==2">
        <el-button size="medium" @click="cancel">否</el-button>
        <el-button size="medium" type="primary" @click="save()">是</el-button>
      </div>
    </el-dialog>
    <!--添加人员-->
    <add-person ref="refAddperson" @refresh="selectPerson"></add-person>
  </div>

</template>

<script>
    import '@/styles/party-common.scss'
    // import { VueEditor } from "vue2-editor";//引入富文本
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import AddPerson from './add-person'//添加人员
    import {getMeetingAdd,getMeetingEdit,getMeetingeditDetail,getMeetingType} from "@/api/backstage/party/orglife/partydaymeeting/partydaymeeting.js"
    export default {
      name: "meeting-add",
      components: {
        AddPerson


      },
      props: {
        params: {
          type: Object,
          default: {}
        }
      },
      data() {
        return {
          loading:false,
          selfMeetingtype:{
            data:'主题党日',
            key:'1294086064859774976'
          },

          visible:false,//发布提示弹窗
          checkboxList:[],//通知方式
          checklist:[],//通知方式数据
          activeNames: ['1'],
          dicts: {//字典
            life_type:{},//会议类型
          },
          personList:[],//选中的人员
          orgs:[],//所选人员所属组织
          personIds:[],//所选人员id
          name:'',//参与人员名单名称
          messages:{
            id:'',//数据id
            meetingName:'',//会议名称
            meetingType:{//会议类型
              data:'',
              key:''
            },
            beginTime:'',//开始时间
            endTime:'',//结束时间
            place:'',//会议地点
            participantsId:'',//参会人员id(多人用，分隔)
            lxParticipants:'',//列席人员
            compere:'',//主持人
            recorder:'',//记录人
            lecturer:'',//授课人
            adviser:'',//指导人员
            agenda:'',//会议议题
            // meetingRecord:'',//会议纪要
            message:{//通知方式
              data:'',
              key:''
            },
            isPublish:{//是否发布
              data:'',
              key:''
            },
            remarks:'',//备注

          },
          node:{
            'meetingName':[{
              required: true,
              message: '请输入会议名称',
              trigger: 'blur'
            }],
            // 'meetingType.key':[{
            //   required: true,
            //   message: '请选择会议类型',
            //   trigger: 'change'
            // }],
            'beginTime':[{
              required: true,
              message: '请选择开始时间',
              trigger: 'change'
            }],
            'place':[{
              required: true,
              message: '请输入会议地点',
              trigger: 'blur'
            }],
            // 'participantsId':[{
            //   required: true,
            //   message: '请选择参会对象',
            //   trigger: 'blur'
            // }],
            'compere':[{
              required: true,
              message: '请输入主持人',
              trigger: 'blur'
            }],
            // 'lecturer':[{
            //   required: true,
            //   message: '请输入授课人',
            //   trigger: 'blur'
            // }],
            'recorder':[{
              required: true,
              message: '请输入记录人',
              trigger: 'blur'
            }],
            'agenda':[{
              required: true,
              message: '请输入会议议题',
              trigger: 'blur'
            }],


          },
          list:[],
          // action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
          // otherData:{
          //   id: '',
          //   bizId: "",
          //   bizType: "meetingadd",
          //   isSingle: false
          // },
          // accept:'.pdf,.doc,.xls,.txt,.ppt',
          isEdit:'',//判断是新增还是编辑
          isHide:true,//判断保存按钮是否出现
          startTimestr0:'',//开始时间的日期
          startTimestr1:'',//开始时间的小时
          startTimestr2:'',//开始时间的分钟
          endTimestr0:'',//结束时间的日期
          endTimestr1:'',//结束时间的小时
          endTimestr2:'',//结束时间的分钟
          pickerOptionsstart: {//时间限制

          },
          pickerOptionsend: {//时间限制

          },
          isNotice:'',//判断是否选择了通知方式
        }
      },
      mounted(){
        this.messages.meetingType=this.selfMeetingtype;
        this.getDict();
        // this.getType();
        // this.partyUid();
        this.isEdit=1;
        //编辑页面
        if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
          // this.isShow=true;
          this.loading=true;
          this.isEdit=2;
          this.getEdit();
          // this.otherData.bizId = this.params.id;
          // this.$nextTick(function(){// 编辑时，附件自动回显
          //   this.$refs.fileRef.init()
          // })
        }


      },
      watch:{
        'messages.agenda':{
          handler(newval){
            if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
              this.$refs.ruleForm.clearValidate('agenda');//清除附件验证
            }else{
              this.$refs.ruleForm.validateField("agenda");//添加附件验证

            }
          },
          deep:true
        }
      },
      methods:{
        //调用字典接口
        getDict(){
          let params = {
            types:['life_type','message']
          }
          commonReq.getHistoryDict(params).then(response =>{
            const res = response;
            this.checklist=res.message

            if(this.checklist!='' && this.checklist!=undefined && this.checklist!=null && this.checklist!='null' && this.checklist.length>0){
              for(let i=0;i<this.checklist.length;i++){
                this.checkboxList.push(this.checklist[i].id)

              }
            }

          })
        },
        //获取会议类型
        // getType(){
        //   let params = {
        //
        //   }
        //   this.loading = true;
        //   getMeetingType(params).then(response => {
        //     const res = response;
        //     this.dicts.life_type = res;
        //
        //   })
        // },


        //新增时获取UID
        // partyUid(){
        //   commonReq.getNewUid({}).then(response =>{
        //     const res = response
        //     this.messages.id = res;
        //     // this.otherData.bizId = res;
        //   })
        //
        // },
        //限制结束时间
        selectTime(value){
          if(value!='' && value!=undefined && value!=null && value!='null'){
            this.startTimestr0=value.substring(0,10);
            this.startTimestr1=value.substring(11,13);
            this.startTimestr2=value.substring(14,16);
            this.startTimestr1=Number(this.startTimestr1)
            this.startTimestr2=Number(this.startTimestr2)
            let date1=new Date(this.startTimestr0).getTime();//时间戳
            let date2=new Date(this.endTimestr0).getTime();//时间戳

            if(date2==date1){
              if(this.endTimestr1<this.startTimestr1){
                this.$message.warning('开始时间要小于结束时间')
                this.messages.beginTime=''
              }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2==this.startTimestr2){
                this.$message.warning('开始时间要小于结束时间')
                this.messages.beginTime=''
              }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2<this.startTimestr2){
                this.$message.warning('开始时间要小于结束时间')
                this.messages.beginTime=''
              }
            }
            // let date=new Date(this.startTimestr0);
            let preDate=date1-3600 * 1000 * 24;
            if(this.startTimestr1==23 && this.startTimestr2==59){
              preDate=preDate + 3600 * 1000 * 24
              // this.startTimestr1='00';
              // this.startTimestr1='00';
            }

            this.pickerOptionsend={//时间限制
              disabledDate(time) {
                // let preDate = str1.getTime()+str2*60*60*1000+str3*60*1000; //前一天
                return time.getTime() < preDate
              },
              // selectableRange: str1+':'+str2+':00'+'-23:59:59'
            }
          }

        },
        selectendTime(value){
          if(value!='' && value!=undefined && value!=null && value!='null') {
            this.endTimestr0 = value.substring(0, 10);
            this.endTimestr1 = value.substring(11, 13);
            this.endTimestr2 = value.substring(14, 16);
            this.endTimestr1=Number(this.endTimestr1)
            this.endTimestr2=Number(this.endTimestr2)
            let date1=new Date(this.startTimestr0).getTime();
            let date2=new Date(this.endTimestr0).getTime();
            if(date2==date1){
              if(this.endTimestr1<this.startTimestr1){
                this.$message.warning('结束时间要大于开始时间')
                this.messages.endTime=''
              }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2==this.startTimestr2){
                this.$message.warning('结束时间要大于开始时间')
                this.messages.endTime=''
              }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2<this.startTimestr2){
                this.$message.warning('结束时间要大于开始时间')
                this.messages.endTime=''
              }
            }
            // let date=new Date(this.startTimestr0);
            let preDate=date2;
            if(this.endTimestr1==0 && this.endTimestr2==0){
              preDate=preDate - 3600 * 1000 * 24
              // this.endTimestr1='00';
              // this.endTimestr1='00';
            }
            this.pickerOptionsstart={//时间限制
              disabledDate(time) {
                // let preDate = str1.getTime()+str2*60*60*1000+str3*60*1000; //前一天
                return time.getTime() > preDate
              },
              // selectableRange: str1+':'+str2+':00'+'-23:59:59'
            }

          }
        },

        //打开添加人员
        addPerson(){

          this.$refs['refAddperson'].show(this.orgs,this.personList,this.personIds,this.name)

        },
        //展示添加人员
        handleChange(val) {
        },
        //选择的人员
        selectPerson(valOrg,val,ids,name){
          this.orgs = valOrg;
          this.personList = val
          this.personIds = ids
          this.name=name
          this.messages.participantsId=[];
          this.personList.forEach((item,index)=>{
            this.messages.participantsId.push(item.id)
          })
          // this.messages.participantsId=this.messages.participantsId.join(',')

        },
        //删除
        delet(val,inde){
          this.messages.participantsId=[];

          if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null' && this.personList.length>0){
            this.personList.forEach((item,index)=>{
              if(val.id ===item.id){ // 对象里的唯一标识id
                this.personList.splice(index,1);
              }
            })


            this.personList.forEach((item,index)=>{
              this.messages.participantsId.push(item.id);
            })

          }




          this.personIds.forEach((item,index)=>{
            if(val.id ===item){ // 对象里的唯一标识id
              // if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null' && this.personList.length>0){
              //   this.personList.forEach((item,index)=>{
              //     this.messages.participantsId.push(item.id)
              //   })
              // }
              this.personIds.splice(index,1);
            }
          })

        },
        //通知方式
        handleRoleCheckedChange(value,val){
          if(val){//选中
            if(value.id=='1249948079289794560'){
              this.checkboxList=[];
              for(let i=0;i<this.checklist.length;i++){
                this.checkboxList.push(this.checklist[i].id);
              }
            }else{
              if(this.checkboxList.indexOf('1249947972045635584')>-1 && this.checkboxList.indexOf('1249948018816319488')>-1){
                this.checkboxList=[];
                for(let i=0;i<this.checklist.length;i++){
                  this.checkboxList.push(this.checklist[i].id);
                }
              }
            }
          }else{//取消选中
            if(value.id!='1249948079289794560'){
              let indexl=this.checkboxList.indexOf('1249948079289794560');
              if(indexl>-1){
                this.checkboxList.splice(indexl,1)
              }
            }
            this.checkboxList.forEach((item ,index) =>{
              if(value.id ===item){ // 对象里的唯一标识id
                this.checkboxList.splice(index,1)
              }
            })
          }
        },
        //获取编辑数据
        getEdit(){
          this.checkboxList=[];
          let params={
            meetingId:this.params.id
          }
          getMeetingeditDetail(params).then(response => {
            const res = response;
            if(res.orgLife.isPublish.data=='发布'){
              this.isHide=false
            }else{
              this.isHide=true
            }
            this.messages={
              id:this.params.id,//数据id
              meetingName:res.orgLife.meetingName,//会议名称
              meetingType:this.selfMeetingtype,
              beginTime:res.orgLife.beginTime,//开始时间
              endTime:res.orgLife.endTime,//结束时间
              place:res.orgLife.place,//会议地点
              participantsId:res.orgLife.participantsId,//参会人员id(多人用，分隔)
              lxParticipants:res.orgLife.lxParticipants,//列席人员
              compere:res.orgLife.compere,//主持人
              recorder:res.orgLife.recorder,//记录人
              lecturer:res.orgLife.lecturer,//授课人
              adviser:res.orgLife.adviser,//指导人员
              agenda:res.orgLife.agenda,//会议议题
              // meetingRecord:res.meetingRecord,//会议纪要
              message:res.orgLife.message,
              remarks:res.orgLife.remarks,//备注

            }

            //参与人员orgs:[],//所选人员所属组织personIds:[],//所选人员id,personList//所选人员
            this.orgs=[];
            this.personList=[];
            this.personIds=[];
            if(res.orgNameAndMemberInfo!='' && res.orgNameAndMemberInfo!=undefined && res.orgNameAndMemberInfo!=null && res.orgNameAndMemberInfo!='null' && res.orgNameAndMemberInfo.length>0){
              for(let i=0;i<res.orgNameAndMemberInfo.length;i++){
                this.orgs.push({
                  data:res.orgNameAndMemberInfo[i].name,
                  key:res.orgNameAndMemberInfo[i].id
                })
                if(res.orgNameAndMemberInfo[i].list!='' && res.orgNameAndMemberInfo[i].list!=undefined && res.orgNameAndMemberInfo[i].list!=null && res.orgNameAndMemberInfo[i].list!='null' && res.orgNameAndMemberInfo[i].list.length>0){
                  for(let j=0;j<res.orgNameAndMemberInfo[i].list.length;j++){
                    this.personList.push({
                      id:res.orgNameAndMemberInfo[i].list[j].memberId,
                      name:res.orgNameAndMemberInfo[i].list[j].memberName,
                      orgId:res.orgNameAndMemberInfo[i].list[j].orgId,
                      orgName:res.orgNameAndMemberInfo[i].list[j].orgName,
                      phone:res.orgNameAndMemberInfo[i].list[j].phone
                    })
                    this.personIds.push(res.orgNameAndMemberInfo[i].list[j].memberId)
                  }
                }
              }
            }
            if(this.messages.beginTime!='' && this.messages.beginTime!=undefined && this.messages.beginTime!=null && this.messages.beginTime!='null'){
              this.messages.beginTime=this.messages.beginTime.substring(0,16)
            }
            if(this.messages.endTime!='' && this.messages.endTime!=undefined && this.messages.endTime!=null && this.messages.endTime!='null'){
              this.messages.endTime=this.messages.endTime.substring(0,16)
            }


            if(this.messages.message.data=='全部'){
              this.checkboxList=[];
              for(let i=0;i<this.checklist.length;i++){
                this.checkboxList.push(this.checklist[i].id)
              }
            }else{
              this.checkboxList=[];
              this.checkboxList.push(this.messages.message.key)
            }


          }).finally(() => {
            this.loading = false;
          });
        },
        //取消
        goBtn () {
          this.$emit('handleSwitch', {name: 'Index'})
          this.checkboxList=[];
          this.messages={
            id:'',//数据id
            meetingName:'',//会议名称
            meetingType:{
              data:'',
              key:''
            },
            beginTime:'',//开始时间
            endTime:'',//结束时间
            place:'',//会议地点
            participantsId:'',//参会人员id(多人用，分隔)
            lxParticipants:'',//列席人员
            compere:'',//主持人
            recorder:'',//记录人
            lecturer:'',//授课人
            adviser:'',//指导人员
            agenda:'',//会议议题
            // meetingRecord:'',//会议纪要
            message:{
              data:'',
              key:''
            },
            remarks:'',//备注

          }
        },
        //保存
        save(){
          this.messages.meetingType=this.selfMeetingtype;
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              setTimeout(()=>{
                const isError= document.getElementsByClassName('is-error')
                isError.length && isError[0].querySelector('input').focus()
              },100)
              return // 表单必填项判断
            }
            if(this.messages.participantsId=='' || this.messages.participantsId==undefined || this.messages.participantsId==null || this.messages.participantsId=='null'){
              this.$message.warning("请选择参与人员")
              return
            }
            if(this.messages.beginTime!='' && this.messages.beginTime!=undefined && this.messages.beginTime!=null && this.messages.beginTime!='null'){
              if(this.messages.beginTime.length==16){
                this.messages.beginTime=this.messages.beginTime+':00'
              }else if(this.messages.beginTime.length>19){
                this.messages.beginTime=this.messages.beginTime.substring(0,19)
              }

            }else{
              this.messages.beginTime=''
            }


            if(this.messages.endTime!='' && this.messages.endTime!=undefined && this.messages.endTime!=null && this.messages.endTime!='null'){
              if(this.messages.endTime.length==16){
                this.messages.endTime=this.messages.endTime+':00'
              }else if(this.messages.endTime.length>19){
                this.messages.endTime=this.messages.endTime.substring(0,19)
              }

            }else{
              this.messages.endTime=''
            }

            if(this.checkboxList!='' && this.checkboxList!=undefined && this.checkboxList!=null && this.checkboxList!='null' && this.checkboxList.length>0){
              if(this.checkboxList.indexOf('1249948079289794560')>-1){
                this.messages.message={
                  data:'全部',
                  key:'1249948079289794560'
                }
              }else if(this.checkboxList.indexOf('1249948018816319488')>-1 && this.checkboxList.indexOf('1249947972045635584')>-1){
                this.messages.message={
                  data:'全部',
                  key:'1249948079289794560'
                }
              }else{
                for(let i=0;i<this.checklist.length;i++){
                  if(this.checkboxList==this.checklist[i].id){
                    this.messages.message={
                      data:this.checklist[i].name,
                      key:this.checklist[i].id
                    }
                  }
                }

              }
            }else{
              this.messages.message={
                data:'',
                key:''
              }
            }


            this.messages.isPublish={
              data:'不发布',
              key:'1258927579876818944'

            }

            /*参与人员id*/
            if(Array.isArray(this.messages.participantsId)){
              if(this.messages.participantsId && this.messages.participantsId.length>0){
                this.messages.participantsId=this.messages.participantsId.join(',');
              }
            }

            if(this.isEdit==1){

              getMeetingAdd(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip())
                this.$emit('handleSwitch', {name: 'Index'})
                this.cancel()
              }).finally(() => {
                this.cancel()
              });

            }else if(this.isEdit==2){
              getMeetingEdit(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip())
                this.$emit('handleSwitch', {name: 'Index'})
                this.cancel()
              }).finally(() => {
                this.cancel()
              });

            }
          })

        },
        //发布并通知
        notice(){
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              setTimeout(()=>{
                const isError= document.getElementsByClassName('is-error')
                isError.length && isError[0].querySelector('input').focus()
              },100)
              return // 表单必填项判断
            }
            if(this.messages.participantsId=='' || this.messages.participantsId==undefined || this.messages.participantsId==null || this.messages.participantsId=='null'){
              this.$message.warning("请选择参与人员")
              return
            }
            if(this.messages.beginTime!='' && this.messages.beginTime!=undefined && this.messages.beginTime!=null && this.messages.beginTime!='null'){
              if(this.messages.beginTime.length==16){
                this.messages.beginTime=this.messages.beginTime+':00'
              }else if(this.messages.beginTime.length>19){
                this.messages.beginTime=this.messages.beginTime.substring(0,19)
              }

            }else{
              this.messages.beginTime=''
            }


            if(this.messages.endTime!='' && this.messages.endTime!=undefined && this.messages.endTime!=null && this.messages.endTime!='null'){
              if(this.messages.endTime.length==16){
                this.messages.endTime=this.messages.endTime+':00'
              }else if(this.messages.endTime.length>19){
                this.messages.endTime=this.messages.endTime.substring(0,19)
              }

            }else{
              this.messages.endTime=''
            }

            if(this.checkboxList!='' && this.checkboxList!=undefined && this.checkboxList!=null && this.checkboxList!='null' && this.checkboxList.length>0) {
              this.isNotice=1;
              if (this.checkboxList.indexOf('1249948079289794560') > -1) {
                this.messages.message = {
                  data: '全部',
                  key: '1249948079289794560'
                }
              } else if (this.checkboxList.indexOf('1249948018816319488') > -1 && this.checkboxList.indexOf('1249947972045635584') > -1) {
                this.messages.message = {
                  data: '全部',
                  key: '1249948079289794560'
                }
              } else {
                for (let i = 0; i < this.checklist.length; i++) {
                  if (this.checkboxList == this.checklist[i].id) {
                    this.messages.message = {
                      data: this.checklist[i].name,
                      key: this.checklist[i].id
                    }
                  }
                }

              }
            }else{
              this.isNotice=2;
              this.messages.message = {
                data: '',
                key: ''
              }
            }
            this.visible=true

          })

        },
        //提示取消
        cancel(){
          this.visible=false
        },
        //提示确定
        saveBtn(){
          this.messages.isPublish={
            data:'发布',
            key:'1258927504257712128'

          }

          /*参与人员id*/
          if(Array.isArray(this.messages.participantsId)){
            if(this.messages.participantsId && this.messages.participantsId.length>0){
              this.messages.participantsId=this.messages.participantsId.join(',');
            }
          }

          if(this.isEdit==1){

            getMeetingAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip())
              this.cancel();
              this.$emit('handleSwitch', {name: 'Index'})
            }).finally(() => {
              this.cancel()
            });

          }else if(this.isEdit==2){
            getMeetingEdit(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip())
              this.cancel();
              this.$emit('handleSwitch', {name: 'Index'})
            }).finally(() => {
              this.cancel()
            });

          }

        }


      }
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
  .warn-el{
    position:relative;
    margin-bottom:10px;
  }
  .warnTxt{
    position:absolute;
    bottom:0;
    left:120px;
    font-size: 12px;
    line-height: 18px;
    color: #CCCCCC;
    padding-bottom:10px;
  }
  .bc-heard /deep/ .el-dialog__header{
    background:#fff;
  }
  .warningContent{
    display:flex;
    justify-content: flex-start;
    align-items:center
  }
  .warningContent img{
    width:46px;
    height:46px;
    overflow:hidden;
  }
  .warningContent span{
    padding-left:10px;
    font-size: 16px;
    line-height:30px;
    color: #555555;
  }
  .text-right{
    text-align:right
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
