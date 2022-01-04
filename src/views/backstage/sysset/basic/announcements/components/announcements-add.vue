<template>
  <div>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1130px'
    @close="cancel()"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="120px" v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="标题" prop="title" ref="title">
          <el-input v-model="messages.title" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="内容" prop="content" ref="content">
          <el-input
            v-model="messages.content"
            type="textarea"
            maxlength="200"
            show-word-limit :rows="5"
            resize="none"
            placeholder="请输入"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item  class="is-required" label="通知范围" prop="types" ref="types">
          <el-radio-group v-model="types" @change="changeValue">
            <el-radio :label="item.id" v-for="item in noticeList" :key="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="is-required" label="通知组织" prop="orgIds" ref="orgIds" v-if="types=='1310749524188200960'">
          <div>
            <el-button size="medium" icon="el-icon-plus" @click="chooseOrg">添加组织</el-button>
            已选 <span style="color: #f00;">{{checkedOrgs.length}}</span> 个组织
          </div>
          <div class="form-org-list" v-for="(item,index) in checkedOrgs" :key="index">
            {{item.name}}
            <span class="close el-icon-close" @click="deleteOrg(index)"/>
          </div>
        </el-form-item>
        <el-form-item class="is-required" label="通知党员" prop="memberIds" ref="memberIds"  v-else>
          <div >
            <el-button size="medium" icon="el-icon-plus" @click="choosePerson">添加人员</el-button>
            已选 <span style="color: #f00;">{{orgs.length}}</span> 个组织 共<span>{{personList.length}}</span>人
          </div>
          <div class="form-org-list"/>

          <!--展示添加人员-->
          <div class="show-person">
          <el-collapse >
            <el-collapse-item :name="index" v-for="(item,index) in orgs">
              <template slot="title">
                <div class="title-hidden">{{item.data}}</div>
              </template>

              <ul class="name-ul">
                <li v-for="(ite,inde) in personList" v-if="ite.orgId.key === item.key">
                  <span>{{ite.name}}</span>
                  <img src="@/assets/page/icon-close.png" @click="delet(ite,(index+1))">
                </li>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </div>

        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="通知方式" :rules="[
          { required: true}
        ]">
          <el-checkbox-group v-model="checkboxList" v-if="types == '1310749524188200960'">
            <el-checkbox
              v-for="item in messageList"
              :label="item.id"
              :key="item.id"
              @change="handleRoleCheckedChange(item,$event)"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="checkboxList" v-else>
            <el-checkbox
              v-for="item in messageList"
              v-if="item.id != '2369909473046454278'"
              :label="item.id"
              :key="item.id"
              @change="handleRoleCheckedChange(item,$event)"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
          <span class="tips" >请确认通过何种方式通知对应人员</span>
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center"  v-show="!loading">
      <el-button size="medium" @click="saveBtn(0)">保存</el-button>
      <el-button size="medium" type="primary" @click="save">发布通知</el-button>
    </div>
    <choose-org ref="chooseOrg" :title="title" :checkParent="true" :getChild="false" @refresh='setCheckedOrg'></choose-org>
    <choose-org-person ref='chooseOrgPerson' @refresh="selectPerson"></choose-org-person>
  </el-dialog>
  <!--发布并通知弹窗-->
  <el-dialog
    class="bc-heard"
    title="发布公告"
    :visible.sync="announcementVisible"
    width = '400px'
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="announcementVisible"
  >
    <div class="warningContent" >
      <img src="../../../../../../assets/page/icon-warning.png">
      <span>您确认立即发布公告，并通知相关人员？</span>
    </div>
    <div slot="footer" class="text-right">
      <el-button size="medium" @click="announcementVisible = false">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn(1)">确定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getAnnouncementsAdd,getAnnouncementsEdit,getAnnouncementsDetail} from "@/api/backstage/sysset/basic/announcements/announcements.js"
    import ChooseOrg from '@/components/individual/choose-org'
    import ChooseOrgPerson from '@/components/individual/choose-org-person'
    export default {
        name: "announcements-add",
        components:{ ChooseOrg,ChooseOrgPerson },
        data () {
            var checkPerson = (rule, value, callback) => {
                if (this.messages.memberIds == '') {
                    callback(new Error('请选择人员'))
                } else {
                    callback()
                }
            }
            var checkOrd = (rule, value, callback) => {
                if (this.messages.orgIds == '') {
                    callback(new Error('请选择组织'))
                } else {
                    callback()
                }
            }
            return {
              loading: true,// 加载遮罩
                visible: false,
                announcementVisible:false,
                title:'',
                checkboxList:[],//通知方式
                types:"1310749524188200960",
                messages:{
                  id:'',
                  title:'',//标题
                  content:'',//内容
                  types:"1310749524188200960",  //通知范围
                  noticeWayIds:[],//通知方式
                  involvedorgIds:[],//指定人员组织id字符串
                  orgIds: [],
                  memberIds:'',//指定人员id字符串
                },
                checkedOrgs:[],//已选中的组织
                orgs:[],
                personList:[], //选中党员
                personIds:[],
                // 消息类型
                messageList: [],
                // 通知类型
                noticeList: [],
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
                    'types':[{
                        required: true,
                        message: '请选择通知范围',
                        trigger: 'change'
                    }],
                    'orgIds':[{required: true, validator:checkOrd}],
                    memberIds: [{required: true, validator:checkPerson}],
                },
                isEdit:'',//判断是新增还是编辑
                isNotice:'',//判断是否选择了通知方式
            }
        },
        mounted(){
            this.getCondition()
        },
        methods: {
          // 滚动到固定地方
          scrollView(object) {
            for (const i in object) {
              let dom = this.$refs[i]
              // 这里是针对遍历的情况（多个输入框），取值为数组
              if (Object.prototype.toString.call(dom) !== '[object Object]') {
                dom = dom[0]
              }
              // 第一种方法（包含动画效果）
              dom.$el.scrollIntoView({ // 滚动到指定节点
                // 值有start,center,end，nearest，当前显示在视图区域中间
                block: 'center',
                // 值有auto、instant,smooth，缓动动画（当前是慢速的）
                behavior: 'smooth'
              })
              break // 因为我们只需要检测一项,所以就可以跳出循环了
            }
          },
          // 单选按钮变更
          changeValue(val){
            this.types = val
            this.messages.types = val
          },
          //删除
          delet(val,inde){
            let perNum = 0
            for(let i = 0;i < this.personList.length; i++){
              if(val.id === this.personList[i].id){ // 对象里的唯一标识id
                this.personList.splice(i,1)
              }
              if(this.personList[i]){
                if(this.personList[i].orgId.key === val.orgId.key){
                  perNum ++
                }
              }
            }
            this.personIds.forEach((item,index)=>{
              if(val.id ===item){ // 对象里的唯一标识id
                this.personIds.splice(index,1)
              }
            })

            if(perNum === 0){
              this.orgs.forEach((item,index)=>{
                if(val.orgId.key === item.key){ // 对象里的唯一标识id
                  this.orgs.splice(index,1)
                }
              })
            }
          },
          //字典表数据
          getCondition () {
              commonReq.getHistoryDict({types: ['notice_type','dj_notice_type']}).then(res => {
                this.messageList = res.dj_notice_type
                this.noticeList  = res.notice_type

                if(this.isEdit === 1){
                  if(this.messageList!='' && this.messageList!=undefined && this.messageList!=null && this.messageList!='null' && this.messageList.length>0){
                    this.checkboxList = []
                    for(let i=0;i<this.messageList.length;i++){
                      this.checkboxList.push(this.messageList[i].id)

                    }
                  }
                }

              })
          },
          //选择通知方式
          handleRoleCheckedChange(value,val){
            if(val){//选中
              if(value.name === '全部'){
                this.checkboxList = []
                for(let i=0;i<this.messageList.length;i++){
                  this.checkboxList.push(this.messageList[i].id)

                }
              }else{
                if(this.checkboxList.length === 3){
                  this.checkboxList.push('2369909473046454280')
                }
              }
            }else{//取消选中
              if(value.name === '全部'){
                this.checkboxList = []
              }else{
                let index = this.checkboxList.indexOf(value.id)
                if(index != -1){
                  this.checkboxList.splice(index,1)
                }

                // 移出全部
                let index1 = this.checkboxList.indexOf('2369909473046454280')
                if(index1 != -1){
                  this.checkboxList.splice(index1,1)
                }
              }
            }
          },
          //选择组织
          chooseOrg(){
              this.$refs.chooseOrg.show(this.checkedOrgs)
          },
          //删除组织
          deleteOrg(index){
              this.checkedOrgs.splice(index,1)
              this.messages.involvedorgIds = []
              this.messages.orgIds = []
              this.checkedOrgs.forEach(item=>{
                this.messages.involvedorgIds.push(item.id)
                this.messages.orgIds.push(item.id)
              })
              if(this.messages.orgIds){
                this.$refs['ruleForm'].clearValidate('orgIds')
              }
          },
          //选择的组织
          setCheckedOrg(data){
              this.checkedOrgs = JSON.parse(data)
              this.messages.involvedorgIds = []
              this.messages.orgIds = []
              this.checkedOrgs.forEach(item=>{
                  this.messages.involvedorgIds.push(item.id)
                  this.messages.orgIds.push(item.id)
              })
              if(this.messages.orgIds){
                  this.$refs['ruleForm'].clearValidate('orgIds')
              }
          },
          //打开选择党员
          choosePerson(){
              this.$refs['chooseOrgPerson'].show(this.orgs,this.personList,this.personIds)
          },
          chooseOrgPerson(){
              this.$refs.chooseOrgPerson.show(this.orgs,this.personList,this.personIds)
          },
          //选择的人员
          selectPerson(valOrg,val,ids){
              this.orgs = valOrg
              this.personList = val
              this.personIds = ids
              this.messages.memberIds = ids.join(',')
              this.messages.involvedorgIds = []
              this.messages.orgIds = []
              valOrg.forEach(item=>{
                  this.messages.involvedorgIds.push(item.key)
              })
          },
          //打开页面
          show (t,row) {
            this.loading = true
              this.visible = true
              this.getCondition()
              if(t==1){//新增
                this.loading = false
                this.isEdit=1
                this.title='新增'
                this.messages.orgIds = []
                this.messages.memberIds = ''
              }else if(t==4){//编辑
                this.isEdit=2
                this.title='编辑'
                this.getDetail(row.id)
              }

          },
          //获取编辑详情
          getDetail(id){
            let params={
                id:id
            }
            getAnnouncementsDetail(params).then(response => {
              const res = response
              this.messages=res
              if(res.orgList){
                this.checkedOrgs = res.orgList
                let arry = []
                res.orgList.forEach(item=>{
                  arry.push(item.id)
                })
                this.messages.orgIds = arry
              }

              this.messages.noticeWayIds = []

              this.checkboxList=[]
              if(res.noticeWayList){
                if(res.noticeWayList.length === 1 && res.noticeWayList[0].id === '1249948079289794560'){
                  this.messageList.forEach(item =>{
                    this.checkboxList.push(item.id)
                  })
                }else{
                  res.noticeWayList.forEach(item=>{
                    this.checkboxList.push(item.id)
                  })
                }
              }


              if(res.orgMemberList){
                this.orgs = []
                this.personList = []
                res.orgMemberList.forEach(item=>{
                  item.memberList.forEach(ite=>{
                    this.personList.push(ite)
                    this.personIds.push(ite.id)
                  })
                  if(item.memberList){
                    this.orgs.push(item.memberList[0].orgId)
                  }else{
                    this.orgs = []
                    this.personList = []
                  }
                })
              }else{
                this.orgs = []
                this.personList = []
              }

              this.messages.types = res.type.key
              this.types = res.type.key
              this.messages.id = res.id
            })
              .finally(() => {
                this.loading = false
              })
          },
          //取消
          cancel() {
              this.visible = false
              this.checkboxList = []//通知方式
              this.messages = {
                id:'',
                title:'',//标题
                content:'',//内容
                types:"1310749524188200960",  //通知范围
                noticeWayIds:[],//通知方式
                involvedorgIds:[],//指定人员组织id字符串
                orgIds: [],
                memberIds:'',//指定人员id字符串
              }
              this.checkedOrgs = []//已选中的组织
              this.orgs = []
              this.personList = [] //选中党员
              this.personIds = []
              this.messageList = []
              this.noticeList =  []

              this.$refs['ruleForm'].resetFields() //清除附件
          },
          //发布并通知
          save(){
            this.$refs['ruleForm'].validate((valid ,object)=> { // 表单验证
              if (!valid) {
                this.scrollView(object)
                return // 表单必填项判断
              }
              this.announcementVisible = true
            })
          },
          //保存
          saveBtn (num) {
            //选择消息传值
            this.messages.noticeWayIds = []
            if(this.checkboxList!='' && this.checkboxList!=undefined && this.checkboxList!=null && this.checkboxList!='null' && this.checkboxList.length>0){
              if(this.checkboxList.indexOf('1249948018816319488')>-1 && this.checkboxList.indexOf('1249947972045635584')>-1 && this.checkboxList.indexOf('2360998635675967489')>-1){
                this.messages.noticeWayIds.push('1249948079289794560')
              }else{
                this.messages.noticeWayIds = this.checkboxList
              }
            }

            let params ={
              id : this.messages.id,
              "content":this.messages.content,
              "isDelete": 0,
              "isRelease": 0,
              "memberIds": this.personIds,
              "noticeOrg": {
                  "data": "",
                  "key": 0
              },
              "noticeType": "",
              "noticeWayIds":  this.messages.noticeWayIds,
              "orgIds": this.messages.orgIds,
              "state": {
                  "data": "",
                  "key": '1310765959610368000'
              },
              "title": this.messages.title,
              "type": {
                "data": "",
                "key": this.types
              }
            }

            if(num === 0){ // 保存
              params.state.key = '1310765921983266816'
            }else if(num === 1){ // 发布
              params.state.key = '1310765959610368000'
            }

            if(!(this.checkboxList && this.checkboxList.length)){
              this.$message.error('请选择通知方式！')
              return false
            }

            this.$refs['ruleForm'].validate((valid,object) => { // 表单验证
              if (!valid) {
                this.scrollView(object)
                return // 表单必填项判断
              }
              if(this.isEdit==1){//新增保存
                getAnnouncementsAdd(params).then(response => {
                  const res = response
                  this.$message(this.successTip())
                  this.cancel()
                  this.$emit('refresh')
                  this.announcementVisible = false
                })
              }else if(this.isEdit==2){//编辑保存
                let arry = []
                this.checkedOrgs.forEach(item=>{
                  arry.push(item.id)
                })
                params.orgIds = arry
                getAnnouncementsEdit(params).then(response => {
                  const res = response
                  this.$message(this.successTip())
                  this.cancel()
                  this.$emit('refresh')
                  this.announcementVisible = false
                })
              }
            })
          }
      }
    }
</script>

<style scoped lang="scss">
  .tips{
    font-size:12px;
    color:#CCCCCC;
    display: block;
    line-height: 20px;
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

  .show-person {
    padding-left: 0px;
  }
</style>
