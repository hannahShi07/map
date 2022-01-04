<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="880px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <el-form :model="formData" :rules="rules" ref="refForm" label-width="90px" v-loading='loading'>

      <div class="divider-h1">考试信息</div>
      <el-form-item label="考试名称" prop="examName">
        <el-input v-model="formData.examName" ref="examName" placeholder="请输入" maxlength="200"/>
      </el-form-item>
      <el-row>
        <el-col :span="11">
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker class="wp-100" v-model="formData.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsDisabled('start', 'endTime')" placeholder="请选择"/>
          </el-form-item>
        </el-col>
        <el-col :span="11" :push="2">
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker class="wp-100" v-model="formData.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptionsDisabled('end', 'beginTime')" placeholder="请选择"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="考试用时" prop="isRestrict">
        <el-col :span="9">
            <el-radio-group v-model="formData.isRestrict">
              <el-radio :label="0">无时间限制</el-radio>
              <el-radio :label="1">有时间限制</el-radio>
            </el-radio-group>
        </el-col>
        <el-col :span="15" v-if="formData.isRestrict" style="position:relative">
          <el-form-item label-width="1px" prop="examTime">
            <el-input v-model.number="formData.examTime" placeholder="请输入" @input="changeNum"></el-input>
            <span class="min">分钟</span>
          </el-form-item>

        </el-col>
      </el-form-item>

      <div class="divider-h1">考试对象</div>
      <el-form-item label="考试范围" prop="examScope">
        <el-radio-group v-model="formData.examScope">
          <el-radio :label="0">指定组织</el-radio>
          <el-radio :label="1">指定人员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="指定组织" prop="orgIds" v-if="formData.examScope==0">
        <div>
          <el-button size="medium" icon="el-icon-plus" @click="chooseOrg">添加组织</el-button>
          已选 <span style="color: #f00;">{{checkedOrgs.length}}</span> 个组织
        </div>
        <div class="form-org-list" v-for="(item,index) in checkedOrgs" :key="index">
          {{item.name}}
          <span class="close el-icon-close" @click="deleteOrg(index)"/>
        </div>
      </el-form-item>
      <el-form-item label="指定人员" prop="memberIds" v-else>
        <div>
          <el-button size="medium" icon="el-icon-plus" @click="choosePerson">添加人员</el-button>
          已选 <span style="color: #f00;">{{orgs.length}}</span> 个组织 共<span>{{personList.length}}</span>人
        </div>
        <div class="form-org-list">
        </div>
      </el-form-item>
      <el-form-item label="通知方式" prop="noticeWay">
        <el-radio-group v-model="formData.noticeWay">
          <el-radio label="1249948079289794560" :disabled='allFlag'>全部</el-radio>
          <el-radio label="1249947972045635584" :disabled='xcxFlag'>小程序消息</el-radio>
          <el-radio label="1249948018816319488" :disabled='dxFlag'>短信消息</el-radio>
        </el-radio-group>
        <span class="tips" >请确认通过何种方式通知考试人员</span>
      </el-form-item>
      <div class="divider-h1">试卷设置</div>
      <el-form-item label="试卷状态" prop="paperStatus" label-width="110px">
        <el-button v-if="!paperStatus" size="medium" icon="el-icon-plus" @click="addPaper">添加试卷</el-button>
        <span v-else>
          <span style="color: #CCCCCC; font-size: 14px;margin-right: 30px;">已添加</span>
          <span style="color: #53A0FF; cursor: pointer;" @click="preview">
            <i class="iconfont icon-xiangqing"/>
            预览试卷
            <el-divider direction="vertical"/>
          </span>
          <span style="color: #ED3C3C; cursor: pointer;" @click="addPaper">
            编辑试卷
          </span>
        </span>
      </el-form-item>
      <el-form-item label="是否线上考试" prop="isOnline" label-width="110px">
        <el-col :span="5">
          <el-radio-group v-model="formData.isOnline">
            <el-radio :label="0" >是</el-radio>
            <el-radio :label="1" >否</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="19" v-if="formData.isOnline==1">
          <el-form-item label="考试地点" prop="address">
            <el-input v-model='formData.address'></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <div class="divider-h1">考试状态</div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="考试状态">
            <div>
               <span class="ht">{{examStatus.data}}</span>
              <el-tooltip class="item" effect="dark" content="您需选择【发布考试】后，该考试才能生效；如暂不发布考试，可选择【保存信息】保存已填写信息" placement="right" v-if='examStatus.key=="2309718804909785262"'>
                <i class="iconfont icon-wenhao"></i>
              </el-tooltip>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12" >
        <!-- <el-col :span="12" v-if="!nofabu"> -->
          <el-form-item label="考试结果" >
            <span style="color:rgb(204, 204, 204); cursor: pointer;">
              <i class="iconfont icon-xiangqing"/>
              查看考试结果
              <!-- <el-divider direction="vertical"/> -->
            </span>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div slot="footer" style="text-align: center" v-if="nofabu">
      <el-button @click="saveBtn('2309718804909785262','save')" :loading="saveLoading">保存信息</el-button>
      <el-button type="primary" @click="saveBtn('2309718804909785265','fabu')" :loading="fabuLoading">发布考试</el-button>
    </div>
    <div slot="footer" style="text-align: center" v-else>
      <el-button @click="saveBtn('2309718804909785262','save','again')" :loading="saveLoading">取消发布</el-button>
      <el-button type="primary" @click="saveBtn('2309718804909785265','fubu','again')" :loading="fabuLoading">重新发布</el-button>
    </div>
    <choose-org ref="chooseOrg" :isParty='true' :getChild='false' :checkParent='true' :title="title" @refresh='setCheckedOrg'></choose-org>
    <choose-org-person ref='chooseOrgPerson' @refresh="selectPerson"></choose-org-person>
    <paper-add ref="choosePaper" @refresh='setQuesId'></paper-add>
    <preview-paper ref='refPreview'></preview-paper>
  </el-dialog>
</template>

<script>
  import ChooseOrg from '@/components/individual/choose-org'
  import ChooseOrgPerson from '@/components/individual/choose-org-person'
  import PaperAdd from './paper-add'
  import PreviewPaper from './previewPaper'
  import commonReq from '@/api/public/commonReq'
  import { setEducationData} from '@/api/backstage/education/data'
  import { addExam,getExamDetail ,updateExam} from '@/api/backstage/education/exam'
  export default {
    components:{
      ChooseOrg,
      ChooseOrgPerson,
      PaperAdd,
      PreviewPaper
    },

    data () {
      var checkOrd = (rule, value, callback) => {
        if (this.formData.orgIds == '') {
          callback(new Error('请选择组织'));
        } else {
          callback();
        }
      }
      var checkPerson = (rule, value, callback) => {
        if (this.formData.memberIds == '') {
          callback(new Error('请选择人员'));
        } else {
          callback();
        }
      }
      var checkPaper = (rule, value, callback) => {
        if (this.formData.paperStatus == '') {
          callback(new Error('请添加试卷'));
        } else {
          callback();
        }
      }
      return {
        // false编辑  true添加
        addStatus: true,
        examStatus:{key: "2309718804909785262", data: "未发布"},
        title: '新增考试',
        startTimeRange:'00:00:00 - 23:59:59',
        endTimeRange:'00:00:00 - 23:59:59',
        visible: false,
        fabuLoading: false,
        saveLoading:false,
        limits:[
          {
            name:'无时间限制',
            value:false
          },{
            name:'有时间限制',
            value:true
          }
        ],
        formData:{

        },
        checkedOrgs:[],//已选中的组织
        rules: {
          examName: [{required: true, message: '请输入考试名称', trigger: 'blur'}],
          address: [{required: true, message: '请输入考试地点', trigger: 'blur'}],
          beginTime: [{required: true, message: '请选择开始时间', trigger: 'blur'}],
          endTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}],
          examScope: [{required: true, message: '请选择范围', trigger: 'change'}],
          isRestrict: [{required: true, message: '请选择', trigger: 'change'}],
          noticeWay: [{required: true, message: '请选择', trigger: 'change'}],
          isOnline: [{required: true, message: '请选择', trigger: 'change'}],
          examTime:[{required: true, message: '请输入考试时长', trigger: 'blur'}],
          orgIds: [{required: true, validator:checkOrd}],
          memberIds: [{required: true, validator:checkPerson}],
          paperStatus: [{required: true, validator:checkPaper}],
        },
        nofabu:true,
        // 学习范围
        studyList: [],
        // 消息类型
        messageList: [],
        title:'考试组织选择',
        orgs:[],
        personList:[],
        personIds:[],
        examStu:'', //考试状态
        paperStatus:0, //试卷状态
        examInfo:{},
        loading:false,
        checkedQues:[],//选中的题目
        quesList:[],
        allFlag:false,
        xcxFlag:false,//通知方式：小程序是否禁选
        dxFlag:false,//通知方式：短信是否禁选
      }
    },
    created () {
      this.getCondition()

    },
    watch:{
      'formData.beginTime':{
	      deep:true,
	      handler(newValue, oldValue) {
          if(newValue){
            let nowDate = this.$options.filters['sendTimeDate'](new Date().getTime());
            let dt = nowDate.split(" ");
            let st = '';
            if(newValue.split(" ")[0] == dt[0]){
              // 是今天,选择 的时间开始为此刻的时分秒
              st = dt[1];
            }else{
              // 明天及以后从0时开始
              st = '00:00:00';
            }
            if(this.formData.endTime){ //如果有结束时间
              if(this.formData.endTime.split(" ")[0]== newValue.split(" ")[0]){ //如果结束时间和开始时间是同一天
                if(newValue.split(" ")[0] == dt[0]){ //如果是今天，限制为当前时间到结束时间
                  this.startTimeRange =  st + ' - ' + this.formData.endTime.split(" ")[1];
                } else {  //不是今天，限制为0点到结束时间
                  this.startTimeRange =  "00:00:00 - " + this.formData.endTime.split(" ")[1];
                }

              }
            } else { //不是同一天，限制为0点到24点
              this.startTimeRange =  st + ' - 23:59:59';
            }
            //例如：如果今天此刻时间为10:41:40 则选择时间范围为： 10:41:40 - 23:59:59
            //否则为：00:00:00- 23:59:59
          }
        }
      },
      'formData.endTime':{
	      deep:true,
	      handler(newValue, oldValue) {
          if(newValue){
            let nowDate = null
            if(this.formData.beginTime){
              nowDate = this.$options.filters['sendTimeDate'](new Date(this.formData.beginTime).getTime());
            } else {
              nowDate = this.$options.filters['sendTimeDate'](new Date().getTime());
            }

            let dt = nowDate.split(" ");
            let st = '';
            if(newValue.split(" ")[0] == dt[0]){
              // 是今天,选择 的时间开始为此刻的时分秒
              st = dt[1];
            }else{
              // 明天及以后从0时开始
              st = '00:00:00';
            }
            this.endTimeRange =  st + ' - 23:59:59';
          }
        }
      }
    },
    methods: {
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['learning_scope', 'message']}).then(res => {
          this.studyList = res.learning_scope
          this.messageList = res.message
        })
      },
      change(val){
        // console.log(val,this.formData.isRestrict)
      },
      changeNum(val){
        this.formData.examTime= val.replace(/[^\d]/g,'')
      },
      show (add, row) {
        this.addStatus = add
        this.title = add ? '新增考试' : '编辑考试'
        this.visible = true
        this.checkedOrgs = []
        this.orgs = []
        this.personList = []
        this.personIds = []
        this.checkedOrgs = []
        this.checkedQues = []
        this.quesList = []
        if (add) {
          this.paperStatus = 0;
          this.nofabu = true
          this.formData = {
            id: '',
            examName: '',
            beginTime: '',
            endTime: '',
            isRestrict:0,//考试用时限制
            examTime:'',
            examScope:0,
            noticeWay:this.messageList[0].id,
            involvedorgIds:'',//指定人员组织id字符串
            orgIds:'',//指定组织id字符串
            memberIds:'',//指定人员id字符串
            // noticeWay:'',
            isOnline:0,
            address:'',
            orgIds: [],
            paperStatus:0,
            questIds:''
          }
          this.xcxFlag = false
          this.dxFlag = false
          this.allFlag =false
        } else {
          // console.log(row)
          if(row.examStatus.key == "2309718804909785262"){
            this.nofabu = true
          } else {
            this.nofabu = false
          }
          this.loading = true
          getExamDetail({id: row.id}).then(res => {
            // console.log(res)
            let {exam,memberOrgList,orgList,djMembers,questCntList,questList} = res
            this.paperStatus = parseInt(exam.paperStatus);
            this.formData = {
              id: exam.id,
              examName: exam.examName,
              beginTime: exam.beginTime,
              endTime: exam.endTime,
              isRestrict:parseInt(exam.isRestrict),
              examTime:exam.examTime,
              examScope:parseInt(exam.examScope),
              noticeWay:exam.noticeWay,
              involvedorgIds:exam.involvedOrgIds,//指定人员组织id字符串
              orgIds:exam.orgIds,//指定组织id字符串
              memberIds:exam.memberIds,//指定人员id字符串
              // noticeWay:'',
              isOnline:parseInt(exam.isOnline),
              address:exam.address,
              paperStatus:parseInt(exam.paperStatus),
              questIds:exam.questIds,
              questScores:exam.questScores
            }
            this.xcxFlag = true
            this.dxFlag = true
            this.quesList = questList
            this.examStatus = exam.examStatus
            this.checkedOrgs = orgList
            this.personList = djMembers
            this.personIds = exam.memberIds.split(',')
            // console.log(this.personIds)

            this.examInfo = exam
            this.checkedQues = questCntList
            this.orgs = memberOrgList.map(item=>item.orgId)
            // this.
          }).finally(()=>{
            this.loading = false
          })
        }

        this.$nextTick(() => {
          this.$refs['refForm'].clearValidate()
        })
      },
      saveBtn (type,types,again) {
        this.$refs['refForm'].validate((valid) => {
          if (valid) {
            if(types =='save'){
              this.saveLoading = true
              this.fabuLoading = false
            } else {
              this.fabuLoading = true
              this.saveLoading = false
            }

            let para = {
              examName:this.formData.examName,
              beginTime:this.formData.beginTime,
              endTime:this.formData.endTime,
              address:this.formData.address,
              examScope:this.formData.examScope,
              examStatus: {
                key: type
              },
              examTime:this.formData.examTime,
              involvedOrgIds:this.formData.involvedorgIds,
              orgIds:this.formData.orgIds,
              isOnline:this.formData.isOnline,
              isRestrict:this.formData.isRestrict,
              memberIds:this.formData.memberIds,
              noticeWay:this.formData.noticeWay,
              paperStatus:this.paperStatus,
              questIds:this.formData.questIds,
              questScores:this.formData.questScores
            }
            if (this.addStatus) {
              addExam(para).then(res => {
                // console.log(res)
                if(res.data && !res.data.isSuccess){

                } else {
                  this.$message(this.successTip())
                  this.$emit('refresh')
                  this.visible = false
                }

              }).finally(() => {
                this.fabuLoading = false
                this.saveLoading = false
              })
            } else {
              if(again){
                let tips =''
                if(types=='save'){
                  tips = '是否取消发布此次考试？'
                } else {
                  tips = '是否重新发布此次考试？'
                }
                this.$confirm(tips, '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                }).then(() => {
                  para.id = this.formData.id
                  updateExam(para).then(res => {
                    if(res.data && !res.data.isSuccess){

                    } else {
                      this.$message(this.successTip())
                      this.$emit('refresh')
                      this.visible = false
                    }

                  }).finally(() => {
                    this.fabuLoading = false
                    this.saveLoading = false
                  })
                }).catch(() => {
                  this.fabuLoading = false
                  this.saveLoading = false
                })
              } else {
                  para.id = this.formData.id
                  updateExam(para).then(res => {
                    if(res.data && !res.data.isSuccess){

                    } else {
                      this.$message(this.successTip())
                      this.$emit('refresh')
                      this.visible = false
                    }

                  }).finally(() => {
                    this.fabuLoading = false
                    this.saveLoading = false
                  })
              }


            }
          } else {
            setTimeout(()=>{
                  const isError= document.getElementsByClassName('is-error')
                  isError.length && isError[0].querySelector('input').focus()
                },100)
            return false
          }
        })
      },
      chooseOrg(){
        this.$refs.chooseOrg.show(this.checkedOrgs);
      },
      choosePerson(){
        // console.log(this.orgs)
        this.$refs['chooseOrgPerson'].show(this.orgs,this.personList,this.personIds)
      },
      //选择的人员
      selectPerson(valOrg,val,ids){
        // console.log(valOrg,val,ids)
        this.orgs = valOrg;
        this.personList = val
        this.personIds = ids
        this.formData.memberIds = ids.join(',')
        this.formData.involvedorgIds = ''
        this.formData.orgIds = ''
        valOrg.forEach(item=>{
          this.formData.involvedorgIds += (item.key + ',')

        })
        if(ids.length){
          this.$refs['refForm'].clearValidate('memberIds')
        }
      },
      preview(){
        this.$refs['refForm'].validateField(['examName','beginTime','endTime'],(err)=>{
          if(!err && this.formData.beginTime && this.formData.endTime){
            let obj ={
              beginTime:this.formData.beginTime,
              endTime:this.formData.endTime,
              examName:this.formData.examName,
              questIds:this.formData.questIds,
              questScores:this.formData.questScores
            }
            this.$refs['refPreview'].show(obj)
          } else {
            this.$refs['examName'].focus()
          }
        })

      },
      chooseOrgPerson(){
        this.$refs.chooseOrgPerson.show(this.orgs,this.personList,this.personIds)
      },
      addPaper(){
        let obj ={
          beginTime:this.formData.beginTime,
          endTime:this.formData.endTime,
          examName:this.formData.examName,
        }
        // console.log(this.checkedQues,this.quesList)
        // if(this.addStatus){
        //   this.checkedQues=[]
        //   this.quesList = []
        //   this.examInfo.questIds = ''
        // }
        this.$refs.choosePaper.show(obj,this.checkedQues,this.quesList,this.examInfo.questIds)
        // console.log(this.checkedQues,this.quesList)

      },
      setQuesId(quesId,questScores,checkedQues,quesList){
        // console.log('从paperadd开始传入')
        // console.log(quesId,questScores,checkedQues,quesList)
        // console.log('传入结束')
        this.quesList = quesList
        this.checkedQues = checkedQues
        this.checkedQues.forEach(item=>{
          if(item.ids){
            item['typeCnt'] = item.ids.length
          } else {
            item['typeCnt'] = 0
          }
        })
        this.formData.questIds= quesId
        this.formData.questScores = questScores
        if(quesId){
          this.paperStatus = 1
          this.formData.paperStatus = 1
          this.$refs['refForm'].clearValidate('paperStatus')
        } else {
          this.paperStatus = 0
          this.formData.paperStatus = 0
        }
        // console.log(quesId,questScores)
      },
      setCheckedOrg(data){
        // console.log('触发setCheckedOrg')
        this.checkedOrgs = JSON.parse(data)

        this.formData.involvedorgIds = ''
        this.formData.orgIds = ''
        this.checkedOrgs.forEach(item=>{
          this.formData.involvedorgIds += (item.id + ',')
          this.formData.orgIds += (item.id + ',')
        })
        if(this.formData.orgIds){
          this.$refs['refForm'].clearValidate('orgIds')
        }
      },
      deleteOrg(index){
        this.checkedOrgs.splice(index,1)
        this.formData.involvedorgIds = ''
        this.formData.orgIds = ''
        this.checkedOrgs.forEach(item=>{
          this.formData.involvedorgIds += (item.id + ',')
          this.formData.orgIds += (item.id + ',')
        })
        // console.log(this.checkedOrgs)
      },

      pickerOptionsDisabled (type, name) {
        if(type == 'start'){
          return {
            disabledDate: (time) => {
              if (this.formData[name]) {
                  return (time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(this.formData[name]).getTime())
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
                let y = new Date(this.formData[name]);
                let times = "00:00:00"
                let newXz = '' //新的时间限制
                if(this.formData[name]){
                  if(this.formData[name].split(" ")[1]!='00:00:00'){
                    shengyu = y.getTime()-x.getTime()
                  }
                }
                if (this.formData[name]) {
                  //return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(this.formData[name]).getTime() - shengyu)
                  let nowD = this.$options.filters['sendTimeDate'](new Date().getTime()) //获取当前时间
                  if(this.formData[name].split(" ")[0] != nowD.split(" ")[0]){ //不是同一天
                    //开始时间是否是0点0分0秒
                    newXz = this.formData[name].split(" ")[0] +" "+ times //时间不做限制
                    return (time.getTime() < Date.now() - 8.64e7 || time.getTime() < (new Date(newXz).getTime()))
                  } else { //是同一天，要限制选择的时分秒
                    return (time.getTime() < Date.now() - 8.64e7|| time.getTime() < (new Date(this.formData[name]).getTime() - shengyu))
                  }
                } else {
                  return time.getTime() < Date.now() - 8.64e7
                }
            },
            selectableRange:this.endTimeRange
          }
        }

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

<style lang="scss" scoped>
  .divider-h1 {
    margin-bottom: 20px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    border-bottom: 1px solid #F3F3F3;
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
  .tips{
    font-size:12px;
    color:#CCCCCC;
    display: block;
    line-height: 20px;
  }
  .min{
    position: absolute;
    right: 0px;
    display: inline-block;
    width: 50px;
    text-align: right;
    padding-right: 10px;
  }
.ht{
  color:#FC7121;
}
</style>
