<template>
  <div class="history-detail">
    <el-form ref="refForm" label-width="103px" :model="list"  v-loading="loading">
      <el-tabs v-model="formData.stepStatus.key" :before-leave="beforeLeave" @tab-click="tabClick">
        <el-tab-pane :label="item.value" :key="index" :name="item.id" v-for="(item,index) in list.titleList" v-cloak :disabled="isAble < item.code">
          <base-card-box>
            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box">
                  <el-form-item
                    label="确认时间"
                    :prop="'titleList.' + index + '.confirmDate'"
                    :ref="'titleList.' + index + '.confirmDate'"
                    :rules="{
                        required: true,
                        message: '请选择确认时间',
                        trigger: 'blur'
                      }">
                    <el-date-picker
                      type="date"
                      v-model="item.confirmDate"
                      placeholder="请选择"
                      value-format="yyyy-MM-dd"
                      @change="changeTime"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box">
                  <el-form-item label="接收组织">
                    <input v-model="formData.orgId.data" disabled />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box">
                  <el-form-item label="备注" >
                    <!--<el-input type="textarea" v-model="formData.remark" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 5, maxRows: 5}" @change="changeRemark"/>-->
                    <el-input type="textarea" v-model="item.remark" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 5, maxRows: 5}" @change="changeRemark"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box" style="width: 95%">
                  <el-form-item label="附件" prop='transferCause'>
                    <base-file-upload
                      :limit='1'
                      list-type="text"
                      :acceptSize="100"
                      :autoUpload="false"
                      :otherData="item.otherData"
                      :action="action"
                      :accept="accept"
                      ref="fileRef"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="card-row">
              <el-col :span="24">
                <div style="text-align:center">
                  <el-button class="btn"  @click="preFun">上一步</el-button>
                  <el-button class="btn" type="primary" @click="saveBtn()">保 存</el-button>
                </div>
              </el-col>
            </el-row>
          </base-card-box>

          <first v-if="item.code === 0"/>
          <second v-if="item.code === 1"/>
          <third v-if="item.code === 2"/>
          <fourth v-if="item.code === 3"/>
          <fifth v-if="item.code === 4"/>

        </el-tab-pane>
      </el-tabs>
    </el-form>

  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import  { getDevelopAddStep,getDevelopDetailStep,getDevelopUpdateStep  } from "@/api/backstage/party/development/documentary/documentary.js"
  import First from './first'
  import Second from './second'
  import Third from "./third";
  import Fourth from './fourth'
  import Fifth from './fifth'

  var tabIndex = 0
  export default {
    name: "join-party",
    components:{
      Third,
      First,
      Second,
      Fourth,
      Fifth
    },
    data(){
      return{
        loading:true,
        // otherData:{
        //   id:"",
        //   bizId: '',
        //   bizType: "joinParty",
        //   isSingle: false
        // },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,
        accept:".png,.jpg,.jpeg,.pdf,.doc,.docx",
        list:{
          titleList:[
            {value:'确定为入党申请人',id:"1248616414873387008",code:0,confirmDate:'',remark:'',mainId:'',otherData:{id:'',bizId:"",bizType:'',isSingle:false}},
            {value:'确定为入党积极分子',id:"1248616537112182784",code:1,confirmDate:'',remark:'',mainId:'',otherData:{id:'',bizId:"",bizType:'',isSingle:false}},
            {value:'确定为党员发展对象',id:"1248616612773232640",code:2,confirmDate:'',remark:'',mainId:'',otherData:{id:'',bizId:"",bizType:'',isSingle:false}},
            {value:'确定为预备党员',id:"1248616691630342144",code:3,confirmDate:'',remark:'',mainId:'',otherData:{id:'',bizId:"",bizType:'',isSingle:false}},
            {value:'预备党员转正',id:"1248616761813630976",code:4,confirmDate:'',remark:'',mainId:'',otherData:{id:'',bizId:"",bizType:'',isSingle:false}},
          ]
        },
        formData:{
          id:'',
          confirmDate:"",// 确认时间
          memberId:"",// 党员id
          orgId:{// 接收组织
            key:"",
            data:""
          },
          remark:'',// 备注
          stepStatus:{// 流程id
            key:""
          }
        },
        // node:{
        //   "confirmDate":[{
        //     required: true,
        //     message: '请选择确认时间',
        //     trigger: 'blur'
        //   }]
        //
        // },
        orgName:'组织名称',//组织名称
        isAble:0,
        timeChange:false,//事件改变
        remarkChange:false,//备注改变
        isSave:false,//是否新增
      }
    },
    props:{
      params: {
        type: Object,
        default: {}
      },
      type: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.formData.memberId = this.params.id
      this.formData.orgId.key = this.params.orgId.key
      this.formData.orgId.data = this.params.orgId.data

      if(this.type != undefined ){
        this.loading = true
        this.isAble = this.type

        // 非群众
        if(this.params.type.key != "1249237315268640768"){
          if(this.type != 0){
            tabIndex = this.type - 1;
          }else{
            tabIndex = this.type
          }

          this.formData.stepStatus.key = this.params.type.key
          this.getDetail(this.params.id,this.params.type.key)
        }else{
          this.formData.stepStatus.key = "1248616414873387008"
          this.partyUid()
        }

      }else{
        if(this.params.id != undefined){
          this.isAble = 0
          tabIndex = 0
          this.formData.stepStatus.key = "1248616414873387008"
          this.partyUid()
        }
      }
    },
    methods:{
      // pickerOptions1(index) {
      //   var _this=this;
      //   return {
      //     disabledDate(time) {
      //       if(index && index === 0){
      //         return time.getTime() > Date.now()
      //       }else if(index && index > 0){
      //         var date = new Date(_this.list.titleList[index-1].confirmDate);
      //         var time1 = date.getTime();//得到时间戳
      //         return time.getTime() <= Date.now() && time.getTime() > time1;
      //       }
      //
      //     }
      //   }
      // },

      // 滚动到固定地方
      scrollView(object,ref) {
          let dom = this.$refs[ref]
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
      },

      // 新增时获取UID
      partyUid(){
        if(this.type < 5 && ((this.type -1) !== tabIndex)){
          commonReq.getNewUid({}).then(response =>{
            const res = response
            this.list.titleList[tabIndex].mainId = res
            this.list.titleList[tabIndex].otherData.bizId = res
            this.list.titleList[tabIndex].otherData.bizType =res
            this.isSave = true
          })
        }
      },

      // 备注改变事件
      changeRemark(val){
        this.remarkChange = true
      },
      // 事件改变事件
      changeTime(val){
        this.timeChange = true
      },
      // 切换事件
      beforeLeave(activeName, oldActiveName) {
          if(this.remarkChange ||  this.timeChange){
            // this.saveBtn()
            // return false
          }

          this.changeData(activeName)
      },
      // 记录当前页面数据是否有变动的事件
      changeData(activeName){
        // if(this.isSave){
        //   this.isSave = false
        // }

        this.isSave = !this.isSave

        let index = 0
        if(tabIndex < 4){
          index = tabIndex + 1
        }else{
          index = tabIndex
        }
        if(this.list.titleList[index].confirmDate == ''){
          this.getDetail(this.formData.memberId,activeName)
        }
      },
      // tab点击事件
      tabClick(tab,event){
        tabIndex = Number(tab.index)
        if(this.list.titleList[tabIndex].confirmDate == ''){
          this.isSave = true
          this.getDetail(this.formData.memberId,this.formData.stepStatus.key)
        }
      },
      //是否保存该页面数据
      revoke(id){
        this.$confirm('是否保存当前页面修改的数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      // 上一步骤
      preFun(){
        if(this.params.id != undefined){
          if(this.formData.stepStatus.key === "1248616414873387008"){
            this.$emit('handleSwitch', {name: 'DocumentaryAdd',params:this.params,type:this.params.id})
          }else{
            this.preSet()
          }
        }else{
          this.preSet()
        }

      },
      // 保存
      save(){
        getDevelopAddStep(this.formData).then(response => {
          const res = response
          this.$refs.fileRef[tabIndex].submitFile(
            this.list.titleList[tabIndex].otherData.id,
            this.list.titleList[tabIndex].otherData.bizId,
            this.list.titleList[tabIndex].otherData.bizType
          )
          this.isSave = false
          this.nextSet()
          this.remarkChange = false
          this.timeChange = false
          this.$message(this.successTip())
        }).finally(() => {
          this.loading = false
        })
      },
      // 编辑
      edit(){
        let params = {
          id:this.list.titleList[tabIndex].mainId,
          memberId:this.formData.memberId,
          confirmDate:this.list.titleList[tabIndex].confirmDate,//确认时间
          remark:this.list.titleList[tabIndex].remark,//备注
          stepStatus:{
            key:this.formData.stepStatus.key
          }
        }
        getDevelopUpdateStep(params).then(response => {
          const res = response
          this.$refs.fileRef[tabIndex].submitFile(
            this.list.titleList[tabIndex].otherData.id,
            this.list.titleList[tabIndex].otherData.bizId,
            this.list.titleList[tabIndex].otherData.bizType
          )
          this.remarkChange = false
          this.timeChange = false
          if((this.isAble - tabIndex  == 1) || (tabIndex < 4 && this.list.titleList[tabIndex+1].confirmDate == '')){
            this.nextSet()
          }

          this.$message(this.successTip())
        }).finally(() => {
          this.loading = false
        })
      },
      // 详情
      getDetail(memberId,stepStatus){
        let params = {
          memberId:memberId,
          stepStatus:stepStatus
        }
        getDevelopDetailStep(params).then(response =>{
          const  res = response
          if(res != null){
            this.list.titleList[tabIndex].mainId = res.id
            this.list.titleList[tabIndex].otherData.bizId = res.id
            this.list.titleList[tabIndex].otherData.bizType =res.id

            this.$refs.fileRef[tabIndex].init()
            this.list.titleList[tabIndex].confirmDate = res.confirmDate
            this.list.titleList[tabIndex].remark = res.remark
            this.formData.orgId.key = res.orgId.key
            this.formData.orgId.data = res.orgId.data

          }else{
            if(this.isAble == 0){
              this.formData.memberId = this.params.id
              this.formData.orgId.key = this.params.orgId.key
              this.isAble = 0
              this.formData.stepStatus.key = "1248616414873387008"
            }
            this.partyUid()
          }

        }).finally(() => {
          this.loading = false
        })
      },
      // 保存
      saveBtn(){
        this.$refs['refForm'].validate((valid,object) => {
          if(!this.list.titleList[tabIndex].confirmDate){
            let ref = 'titleList.' + tabIndex + '.confirmDate'
            this.scrollView(object,ref)
            return
          }
          this.loading = true

          this.formData.id = this.list.titleList[tabIndex].mainId
          this.formData.confirmDate = this.list.titleList[tabIndex].confirmDate
          this.formData.remark = this.list.titleList[tabIndex].remark


          if(this.type != undefined && !this.isSave){
            this.edit()
          }else{
            this.save()
          }
        })
      },
      // 上一步
      preSet(){
        this.$refs['refForm'].clearValidate()
        if(tabIndex > 0){
          tabIndex--
          this.formData.stepStatus.key = this.list.titleList[tabIndex].id
        }
        if(this.list.titleList[tabIndex].confirmDate == ''){
          this.getDetail(this.formData.memberId,this.formData.stepStatus.key)
        }
      },
      // 自动下一步
      nextSet(){
        this.$refs['refForm'].clearValidate()

        if(tabIndex === 4){
          return
        }
        if(this.list.titleList[tabIndex+1].confirmDate === ""){
          this.isAble++
          tabIndex++
          this.formData.stepStatus.key = this.list.titleList[tabIndex].id
        }else{
          if(!this.isSave){
            this.getDetail(this.formData.memberId,this.list.titleList[tabIndex].id)
          }
        }

        if(this.isAble < 4){
          this.partyUid()
        }


      }
    }
  }
</script>

<style scoped>
  .history-detail{
    background-color: #efefef!important;
  }

  .el-date-editor.el-input {
    width: 400px;
  }

  button, input, optgroup, select, textarea {
    font-family: sans-serif;
    font-size: 100%;
    line-height: 30px;
    width: 95%;
  }
  .el-textarea {
    position: relative;
    display: inline-block;
    width: 95%;
    vertical-align: bottom;
    font-size: 14px;
  }
  .btn {
    display: inline-block;
    width: 76px;
    height: 34px;
    padding: 0px;
    line-height: 34px;
  }

</style>
