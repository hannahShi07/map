<template>
  <div class="add-content" v-cloak v-loading="loading">
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px">
      <div class="base-information">
        <h4>新增活动</h4>
        <div class="base-content">
          <el-col :span="24">
            <el-form-item class="is-required" label="活动名称" prop="name">
              <el-input v-model="messages.name" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item class="is-required" label="开始时间" prop="beginTime">
              <el-date-picker
                v-model="messages.beginTime"
                type="datetime"
                placeholder="请选择"
                @change="selectTime"
                :picker-options="pickerOptionsstart"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="结束时间" prop="endTime">
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
            <el-form-item class="is-required" label="活动地点" prop="place">
              <el-input v-model="messages.place" placeholder="请输入" maxlength="200"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="活动类型" prop="type">
              <el-input v-model="messages.type" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </el-col>
<!--          <el-col :span="24" class="joinOrg" :class="(orgs=='' || orgs==undefined || orgs=='null' || orgs==null || orgs.length<=0)? 'active':''">-->
<!--            <el-form-item class="is-required" label="参会对象" prop="participantsId">-->
<!--              <el-button class="js-button" @click="addPerson()">+ 添加人员</el-button>-->
<!--              <span class="jointxt">参会组织<i class="color-red">{{orgs.length}}</i>个</span>-->
<!--              <span class="jointxt">参会人数<i class="color-red">{{personList.length}}</i>个</span>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <!--展示添加人员-->
<!--          <div class="show-person">-->
<!--            <el-collapse v-model="activeNames" @change="handleChange">-->
<!--              <el-collapse-item :title="item.data" :name="index" v-for="(item,index) in orgs">-->
<!--                <ul class="name-ul">-->
<!--                  <li v-for="(ite,inde) in personList" v-if="ite.orgId.key === item.key || ite.orgId === item.key">-->
<!--                    <span>{{ite.name}}</span>-->
<!--                    <img src="@/assets/page/icon-close.png" @click="delet(ite,(index+1))">-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </el-collapse-item>-->
<!--            </el-collapse>-->
<!--          </div>-->

<!--          <el-col :span="24">-->
<!--            <el-form-item label="列席人员" prop="">-->
<!--              <el-input v-model="messages.lxParticipants" placeholder="请输入" maxlength="1000"  clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item class="is-required" label="主持人" prop="compere">-->
<!--              <el-input v-model="messages.compere" placeholder="请输入" maxlength="100"  clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item class="is-required" label="记录人" prop="recorder">-->
<!--              <el-input v-model="messages.recorder" placeholder="请输入" maxlength="100"  clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item class="is-required" label="指导人员" prop="adviser">-->
<!--              <el-input v-model="messages.adviser" placeholder="请输入" maxlength="100"  clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="24">
            <el-form-item class="is-required" label="活动主题" prop="theme">
<!--              <vue-editor v-model="messages.agenda" placeholder="20000个字符以内" :editorToolbar="customToolbar" @blur="onInputBlur"></vue-editor>-->
              <base-tinymce-editor  v-model="messages.theme" />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="warn-el">
            <el-form-item label="通知方式" prop="">
              <el-checkbox-group v-model="checkboxList">
                <el-checkbox v-for="(items,index) in checklist" :label="items.id" :key="items.id" @change="handleRoleCheckedChange(items,$event)">
                  {{items.name}}
                </el-checkbox>
<!--                <el-checkbox  label="3">全部</el-checkbox>-->
<!--                <el-checkbox  label="1">小程序</el-checkbox>-->
<!--                <el-checkbox  label="2">短信</el-checkbox>-->
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
            <el-form-item label="备注" prop="remake">
              <el-input v-model="messages.remake" type="textarea" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 7, maxRows: 7}"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="tac">
            <el-button class="js-button" @click="goBtn()">取消</el-button>
            <el-button type="primary" @click="save()">发布并通知</el-button>
<!--            <el-button type="primary" v-if="isHide" @click="save()">保存</el-button>-->
<!--            <el-button type="primary" @click="notice()">发布并通知</el-button>-->
          </el-col>


        </div>
      </div>
    </el-form>
    <!--发布并通知弹窗-->
<!--    <el-dialog-->
<!--      class="bc-heard"-->
<!--      title="发布会议"-->
<!--      :visible.sync="visible"-->
<!--      width = '400px'-->
<!--      @close="cancel"-->
<!--      :append-to-body="true"-->
<!--      :close-on-click-modal="false"-->
<!--      :close-on-press-escape="false"-->
<!--    >-->
<!--      <div class="warningContent" v-if="isNotice==1">-->
<!--        <img src="../../../../../../assets/page/icon-warning.png">-->
<!--        <span>您确认立即发布会议，并通知相关参与人员？</span>-->
<!--      </div>-->
<!--      <div class="warningContent" v-if="isNotice==2">-->
<!--        <img src="../../../../../../assets/page/icon-warning.png">-->
<!--        <span>未选择通知方式，是否保存？</span>-->
<!--      </div>-->
<!--      <div slot="footer" class="text-right" v-if="isNotice==1">-->
<!--        <el-button size="medium" @click="cancel">取消</el-button>-->
<!--        <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>-->
<!--      </div>-->
<!--      <div slot="footer" class="text-right" v-if="isNotice==2">-->
<!--        <el-button size="medium" @click="cancel">否</el-button>-->
<!--        <el-button size="medium" type="primary" @click="save()">是</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
    <!--添加人员-->
<!--    <add-person ref="refAddperson" @refresh="selectPerson"></add-person>-->
  </div>

</template>

<script>
    import '@/styles/party-common.scss'
    // import { VueEditor } from "vue2-editor";//引入富文本
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    // import AddPerson from './add-person'//添加人员
    import {getMeetingAdd,getMeetingEdit,getMeetingDetail} from "@/api/backstage/party/orglife/activityissue/activityissue.js"
    export default {
      name: "activityissue-add",
      components: {
        // AddPerson

      },
      props: {
        params: {
          type: Object,
          default: {}
        }
      },
      data() {
        return {
          loading:false,//加载遮罩
          // selfMeetingtype:{
          //   data:'谈心谈话',
          //   key:'1294085594795737088'
          // },
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
            name:'',//活动名称
            type:'',//活动类型
            beginTime:'',//开始时间
            endTime:'',//结束时间
            isDelete:0,//是否删除
            place:'',//活动地点
            // message:'',//通知方式
            theme:'',//活动主题
            status:{//活动状态
              data:'',
              key:''
            },
            message:{//通知方式
              data:'',
              key:''
            },
            // isPublish:{//是否发布
            //   data:'',
            //   key:''
            // },
            remake:'',//备注

          },
          node:{
            'name':[{
              required: true,
              message: '请输入活动名称',
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
            'endTime':[{
              required: true,
              message: '请选择结束时间',
              trigger: 'change'
            }],
            'place':[{
              required: true,
              message: '请输入活动地点',
              trigger: 'blur'
            }],
            'type':[{
              required: true,
              message: '请输入活动类型',
              trigger: 'blur'
            }],
            // 'participantsId':[{
            //   required: true,
            //   message: '请选择参会对象',
            //   trigger: 'blur'
            // }],
            // 'compere':[{
            //   required: true,
            //   message: '请输入主持人',
            //   trigger: 'blur'
            // }],
            // 'lecturer':[{
            //   required: true,
            //   message: '请输入授课人',
            //   trigger: 'blur'
            // }],
            // 'recorder':[{
            //   required: true,
            //   message: '请输入记录人',
            //   trigger: 'blur'
            // }],
            // 'adviser':[{
            //   required: true,
            //   message: '请输入指导人员',
            //   trigger: 'blur'
            // }],
            'theme':[{
              required: true,
              message: '请输入活动主题',
              trigger: 'blur'
            }],


          },
          list:[],
          // action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
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
        // this.messages.meetingType=this.selfMeetingtype;
        this.getDict();
        // this.getType();
        // this.partyUid();
        this.isEdit=1;
        //编辑页面
        if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
          // this.isShow=true;
          this.loading =true;
          this.isEdit=2;
          this.getEdit();
          // this.otherData.bizId = this.params.id;
          // this.$nextTick(function(){// 编辑时，附件自动回显
          //   this.$refs.fileRef.init()
          // })
        }


      },
      watch:{
        'messages.theme':{
          handler(newval){
            if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
              this.$refs.ruleForm.clearValidate('theme');//清除附件验证
            }else{
              this.$refs.ruleForm.validateField("theme");//添加附件验证

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
            this.checklist=res.message;

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
        // addPerson(){
        //
        //   this.$refs['refAddperson'].show(this.orgs,this.personList,this.personIds,this.name)
        //
        // },
        //展示添加人员
        // handleChange(val) {
        // },
        //选择的人员
        // selectPerson(valOrg,val,ids,name){
        //   this.orgs = valOrg;
        //   this.personList = val
        //   this.personIds = ids
        //   this.name=name
        //   this.messages.participantsId=[];
        //   this.personList.forEach((item,index)=>{
        //     this.messages.participantsId.push(item.id)
        //   })
        //   // this.messages.participantsId=this.messages.participantsId.join(',')
        //
        // },
        //删除
        // delet(val,inde){
        //   this.messages.participantsId=[];
        //
        //   if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null' && this.personList.length>0){
        //     this.personList.forEach((item,index)=>{
        //       if(val.id ===item.id){ // 对象里的唯一标识id
        //         this.personList.splice(index,1);
        //       }
        //     })
        //
        //
        //     this.personList.forEach((item,index)=>{
        //       this.messages.participantsId.push(item.id);
        //     })
        //
        //   }
        //
        //
        //
        //
        //   this.personIds.forEach((item,index)=>{
        //     if(val.id ===item){ // 对象里的唯一标识id
        //       // if(this.personList!='' && this.personList!=undefined && this.personList!=null && this.personList!='null' && this.personList.length>0){
        //       //   this.personList.forEach((item,index)=>{
        //       //     this.messages.participantsId.push(item.id)
        //       //   })
        //       // }
        //       this.personIds.splice(index,1);
        //     }
        //   })
        //
        // },
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
            id:this.params.id
          }
          getMeetingDetail(params).then(response => {
            const res = response;
            this.messages={
              id:res.id,//数据id
              name:res.name,//活动名称
              type:res.type,//活动类型
              beginTime:res.beginTime,//开始时间
              endTime:res.endTime,//结束时间
              place:res.place,//活动地点
              status:res.status,
              isDelete:res.isDelete,//是否删除
              theme:res.theme,//活动主题
              message:res.message,//通知方式
              remake:res.remake //备注

            }

            if(this.messages.beginTime!='' && this.messages.beginTime!=undefined && this.messages.beginTime!=null && this.messages.beginTime!='null'){
              this.messages.beginTime=this.messages.beginTime.substring(0,16)
            }
            if(this.messages.endTime!='' && this.messages.endTime!=undefined && this.messages.endTime!=null && this.messages.endTime!='null'){
              this.messages.endTime=this.messages.endTime.substring(0,16)
            }



            if(this.messages.message.key=='1249948079289794560'){
              this.checkboxList=[];
              for(let i=0;i<this.checklist.length;i++){
                this.checkboxList.push(this.checklist[i].id)
              }
            }else{
              this.checkboxList=[];
              this.checkboxList.push(this.messages.message.key)
              //this.checkboxList.push(this.messages.message)
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
            name:'',//活动名称
            type:'',//活动类型
            beginTime:'',//开始时间
            endTime:'',//结束时间
            place:'',//活动地点
            status:{
              data:'',
              key:''
            },
            theme:'',//活动议题
            message:{
              data:'',
              key:''
            },
            remake:'',//备注

          }
        },
        //保存
        save(){
          // this.messages.meetingType=this.selfMeetingtype;
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              setTimeout(()=>{
                const isError= document.getElementsByClassName('is-error')
                isError.length && isError[0].querySelector('input').focus()
              },100)
              return // 表单必填项判断
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
            if(this.messages.status!='' && this.messages.status!=undefined && this.messages.status!=null && this.messages.status!='null'){
              this.messages.status = this.messages.status.key
            }

            if(this.checkboxList!='' && this.checkboxList!=undefined && this.checkboxList!=null && this.checkboxList!='null' && this.checkboxList.length>0){
              if(this.checkboxList.indexOf('1249948079289794560')>-1){
                this.messages.message='1249948079289794560'
                // this.messages.message={
                //   data:'全部',
                //   key:'1249948079289794560'
                // }
              }else if(this.checkboxList.indexOf('1249948018816319488')>-1 && this.checkboxList.indexOf('1249947972045635584')>-1){
                // this.messages.message={
                //   data:'全部',
                //   key:'1249948079289794560'
                // }
                this.messages.message='1249948079289794560'
              }else{
                for(let i=0;i<this.checklist.length;i++){
                  if(this.checkboxList==this.checklist[i].id){
                    // this.messages.message={
                    //   data:this.checklist[i].name,
                    //   key:this.checklist[i].id
                    // }
                    this.messages.message=this.checklist[i].id
                  }
                }

              }
            }else{
              // this.messages.message={
              //   data:'',
              //   key:''
              // }
              this.messages.message=""
            }

            // this.messages.isPublish={
            //   data:'不发布',
            //   key:'1258927579876818944'
            //
            // }

            /*参与人员id*/
            // if(Array.isArray(this.messages.participantsId)){
            //   if(this.messages.participantsId && this.messages.participantsId.length>0){
            //     this.messages.participantsId=this.messages.participantsId.join(',');
            //   }
            // }


            if(this.isEdit==1){//新增
              delete this.messages.id
              getMeetingAdd(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip())
                this.$emit('handleSwitch', {name: 'Index'})
                // this.cancel()
              }).finally(() => {
                // this.cancel()
              });

            }else if(this.isEdit==2){
              getMeetingEdit(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip())
                this.$emit('handleSwitch', {name: 'Index'})
                // this.cancel()
              }).finally(() => {
                // this.cancel()
              });

            }
          })

        },
        //发布并通知
        // notice(){
        //   this.$refs['ruleForm'].validate(valid => { // 表单验证
        //     if (!valid) {
        //       setTimeout(()=>{
        //         const isError= document.getElementsByClassName('is-error')
        //         isError.length && isError[0].querySelector('input').focus()
        //       },100)
        //       return // 表单必填项判断
        //     }
        //     if(this.messages.participantsId=='' || this.messages.participantsId==undefined || this.messages.participantsId==null || this.messages.participantsId=='null'){
        //       this.$message.warning("请选择参与人员")
        //       return
        //     }
        //     // if(this.checkboxList=='' || this.checkboxList==undefined || this.checkboxList==null || this.checkboxList=='null' || this.checkboxList.length<=0){
        //     //   this.$message.warning("请选择通知方式")
        //     //   return
        //     // }
        //
        //
        //     if(this.messages.beginTime!='' && this.messages.beginTime!=undefined && this.messages.beginTime!=null && this.messages.beginTime!='null'){
        //       if(this.messages.beginTime.length==16){
        //         this.messages.beginTime=this.messages.beginTime+':00'
        //       }else if(this.messages.beginTime.length>19){
        //         this.messages.beginTime=this.messages.beginTime.substring(0,19)
        //       }
        //
        //     }else{
        //       this.messages.beginTime=''
        //     }
        //
        //
        //     if(this.messages.endTime!='' && this.messages.endTime!=undefined && this.messages.endTime!=null && this.messages.endTime!='null'){
        //       if(this.messages.endTime.length==16){
        //         this.messages.endTime=this.messages.endTime+':00'
        //       }else if(this.messages.endTime.length>19){
        //         this.messages.endTime=this.messages.endTime.substring(0,19)
        //       }
        //
        //     }else{
        //       this.messages.endTime=''
        //     }
        //
        //     if(this.checkboxList!='' && this.checkboxList!=undefined && this.checkboxList!=null && this.checkboxList!='null' && this.checkboxList.length>0) {
        //       this.isNotice=1;
        //       if (this.checkboxList.indexOf('1249948079289794560') > -1) {
        //         this.messages.message = {
        //           data: '全部',
        //           key: '1249948079289794560'
        //         }
        //       } else if (this.checkboxList.indexOf('1249948018816319488') > -1 && this.checkboxList.indexOf('1249947972045635584') > -1) {
        //         this.messages.message = {
        //           data: '全部',
        //           key: '1249948079289794560'
        //         }
        //       } else {
        //         for (let i = 0; i < this.checklist.length; i++) {
        //           if (this.checkboxList == this.checklist[i].id) {
        //             this.messages.message = {
        //               data: this.checklist[i].name,
        //               key: this.checklist[i].id
        //             }
        //           }
        //         }
        //
        //       }
        //     }else{
        //       this.isNotice=2;
        //       this.messages.message = {
        //         data: '',
        //         key: ''
        //       }
        //     }
        //     this.visible=true
        //
        //   })
        //
        // },
        //提示取消
        // cancel(){
        //   this.visible=false
        // },
        //提示确定
        // saveBtn(){
        //   this.messages.isPublish={
        //     data:'发布',
        //     key:'1258927504257712128'
        //
        //   }
        //
        //   /*参与人员id*/
        //   if(Array.isArray(this.messages.participantsId)){
        //     if(this.messages.participantsId && this.messages.participantsId.length>0){
        //       this.messages.participantsId=this.messages.participantsId.join(',');
        //     }
        //   }
        //
        //   if(this.isEdit==1){
        //
        //     getMeetingAdd(this.messages).then(response => {
        //       const res = response;
        //       this.$message(this.successTip())
        //       this.cancel();
        //       this.$emit('handleSwitch', {name: 'Index'})
        //     }).finally(() => {
        //       this.cancel()
        //     });
        //
        //   }else if(this.isEdit==2){
        //     getMeetingEdit(this.messages).then(response => {
        //       const res = response;
        //       this.$message(this.successTip())
        //       this.cancel();
        //       this.$emit('handleSwitch', {name: 'Index'})
        //     }).finally(() => {
        //       this.cancel()
        //     });
        //
        //   }
        //
        // }


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
