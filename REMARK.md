### 项目对应路劲地址：src

```
公共组件：components
      导入失败：tips -> import -> err
      导入成功：tips -> import -> suc
      添加人员：personnel -> personnel-add

后台相关页面：backstage
  党务工作：party
    基本信息：basic
      组织关系转接：org
        组织关系转接详情：
          转入组织 - 通过 - 接转详情：components -> enter-particulars  -> index 弹窗
          转出组织 - 发起转接：components -> out-initiate  -> index弹窗
          组织关系转入转出展示文本框（园区内所有的组织都展示）：components -> org-text -> index 弹窗
          
          转入组织 - 通过：enter -> enter-adopt -> index  页面
          转入组织：enter -> enter-detail -> index 页面
          转出园区外：out -> out-park -> index
          转出组织：out -> out-org -> index
          
        组织关系转接：
          新增转接 - 园区外转入：components -> enter-add -> index 弹窗
          新增转接 - 园区内接转、调出园区外：components -> out-add  -> index弹窗
          
        首页：index
        
    历史人员库：history
      历史人员库 - 移回原组织：history-reduction -> index
      首页：index
      
    流动党员：float
      新增：float-add -> index
      编辑：float-edit -> index
      详情：float-detail -> index
      流动党员：index
      
    党员管理：manage
      移至历史人员库：components -> manage-join -> index
      新增：manage-add -> index
      编辑：manage-edit -> index
      详情：manage-detail -> index
      首页：index
      
    党组织架构：party
      批量迁移党员：components -> party-emigration -> index
      导入党组织：components -> party-import -> index
      新建党组织：components -> party-add -> index
      党组织编辑：components -> party-edit -> index
      
      党组织详情：party-detail -> index
      党组织详情 - 详细党组织详情 - 详细：party-detailed -> index
      首页：index
```



<template>
  <div class="history-detail">
    <el-form ref="refForm" label-width="103px" :model="formData" :rules="node" v-loading="loading">
      <el-tabs v-model="formData.stepStatus.key" :before-leave="beforeLeave" @tab-click="tabClick">
        <el-tab-pane :label="item.value" :key="index" :name="item.id" v-for="(item,index) in titleList" v-cloak :disabled="isAble < item.code">
          <base-card-box>
            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box">
                  <el-form-item label="确认时间" prop='confirmDate'>
                    <el-date-picker
                      type="date"
                      v-model="formData.confirmDate"
                      placeholder="请选择"
                      value-format="yyyy-MM-dd"
                      @change="changeTime"
                      :picker-options="pickerOptions1(item.code)" />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row class="card-row">
              <el-col :span="24">
                <div class="card-box">
                  <el-form-item label="接收组织">
                    <input v-model="orgName" disabled />
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
                      :otherData="otherData"
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
                  <el-button class="btn" type="primary" @click="saveBtn(index)">保 存</el-button>
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
        otherData:{
          id:"",
          bizId: '',
          bizType: "joinParty",
          isSingle: false
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,
        accept:".png,.jpg,.jpeg,.pdf,.doc,.docx",
        titleList:[
          {value:'确定为入党申请人',id:"1248616414873387008",code:0,confirmDate:'',remark:'',mainId:''},
          {value:'确定为入党积极分子',id:"1248616537112182784",code:1,confirmDate:'',remark:'',mainId:''},
          {value:'确定为党员发展对象',id:"1248616612773232640",code:2,confirmDate:'',remark:'',mainId:''},
          {value:'确定为预备党员',id:"1248616691630342144",code:3,confirmDate:'',remark:'',mainId:''},
          {value:'预备党员转正',id:"1248616761813630976",code:4,confirmDate:'',remark:'',mainId:''},
        ],
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
            key:"1248616414873387008"
          }
        },
        node:{
          "confirmDate":[{
            required: true,
            message: '请选择确认时间',
            trigger: 'blur'
          }]

        },
        orgName:'组织名称',//组织名称
        isAble:0,
        timeChange:false,//事件改变
        remarkChange:false,//备注改变
        isSave:false,//是否新增
        // pickerOptions1:{
        //   disabledDate(time) {
        //           let flag = false
        //           if(index === 0){
        //             flag = time.getTime() <  Date.now()
        //           }else if(index > 0){
        //             if(_this.titleList[index-1].confirmDate){
        //               flag =( time.getTime() < Date.now() )&& (time.getTime() > new Date(_this.titleList[index-1].confirmDate).getTime())
        //             }else{
        //               flag = time.getTime() >  Date.now()
        //             }
        //           }
        //           return flag
        //         },
        // }
        // pickerOptions1(index) {//
        //   let _this = this
        //   return {
        //     disabledDate(time) {
        //       let flag = false
        //       if(index === tabIndex){
        //         if(tabIndex === 0){
        //           flag = time.getTime() >  Date.now()
        //         }else if(tabIndex > 0){
        //           if(_this.titleList[tabIndex-1].confirmDate){
        //             flag =( time.getTime() > Date.now() )&& (time.getTime() < new Date(_this.titleList[tabIndex-1].confirmDate))
        //           }else{
        //             flag = time.getTime() >  Date.now()
        //           }
        //         }
        //       }
        //       return flag
        //     },
        //   };
        // },
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
      if(this.type != undefined ){
        tabIndex = this.type;
        this.loading = true
        this.isAble = this.type
        this.formData.memberId = this.params.id
        if(this.params.type.key != "12492373152686407680"){
          this.formData.stepStatus.key = this.params.type.key
        }else{
          this.formData.stepStatus.key = "1248616414873387008"
        }
        this.getDetail(this.params.id,this.params.type.key,(this.type - 1))
      }else{
        if(this.params.id != undefined){
          this.formData.memberId = this.params.id
          this.formData.orgId.key = this.params.orgId.key
          this.isAble = 0
          this.formData.stepStatus.key = "1248616414873387008"
          this.partyUid(0)
        }
      }
    },
    methods:{
      pickerOptions1(index) {
        var _this=this;
        return {
          disabledDate(time) {
            if(index && index === 0){
              return time.getTime() > Date.now()
            }else if(index && index > 0){
              var date = new Date(_this.titleList[index-1].confirmDate);
              var time1 = date.getTime();//得到时间戳
              return time.getTime() <= Date.now() && time.getTime() > time1;
            }

          }
        }
      },
      // 新增时获取UID
      partyUid(index){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res
          this.otherData.bizId = res
          this.otherData.bizType =res
          if(index && index > 0){
            this.titleList[index].mainId = res
          }

          this.formData.confirmDate = ""
          this.formData.remark = ""
          this.isSave = true
        })
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
            this.saveBtn()
            return false
          }

          this.changeData(activeName)
      },
      changeData(activeName){
        if(this.isSave){
          this.isSave = false
        }
        if(activeName === "1248616414873387008"){
          if(this.titleList[0].confirmDate == ''){
            this.getDetail(this.formData.memberId,activeName,0)
          }else{
            this.otherData.bizId = this.titleList[0].mainId
            this.otherData.bizType =this.titleList[0].mainId
            this.formData.confirmDate = this.titleList[0].confirmDate// 确认时间
            this.formData.remark = this.titleList[0].confirmDate// 备注
          }
        }else if(activeName === "1248616537112182784"){
          if(this.titleList[1].confirmDate == ''){
            this.getDetail(this.formData.memberId,activeName,1)
          }else{
            this.otherData.bizId = this.titleList[1].mainId
            this.otherData.bizType =this.titleList[1].mainId
            this.formData.confirmDate = this.titleList[1].confirmDate// 确认时间
            this.formData.remark = this.titleList[1].confirmDate// 备注
          }
        }else if(activeName === "1248616612773232640"){
          if(this.titleList[2].confirmDate == ''){
            this.getDetail(this.formData.memberId,activeName,2)
          }else{
            this.otherData.bizId = this.titleList[2].mainId
            this.otherData.bizType =this.titleList[2].mainId
            this.formData.confirmDate = this.titleList[2].confirmDate// 确认时间
            this.formData.remark = this.titleList[2].confirmDate// 备注
          }
        }else if(activeName === "1248616691630342144"){
          if(this.titleList[3].confirmDate == ''){
            this.getDetail(this.formData.memberId,activeName,3)
          }else{
            this.otherData.bizId = this.titleList[3].mainId
            this.otherData.bizType =this.titleList[3].mainId
            this.formData.confirmDate = this.titleList[3].confirmDate// 确认时间
            this.formData.remark = this.titleList[3].confirmDate// 备注
          }
        }else if(activeName === "1248616761813630976"){
          if(this.titleList[4].confirmDate == ''){
            this.getDetail(this.formData.memberId,activeName,4)
          }else{
            this.otherData.bizId = this.titleList[4].mainId
            this.otherData.bizType =this.titleList[4].mainId
            this.formData.confirmDate = this.titleList[4].confirmDate//确认时间
            this.formData.remark = this.titleList[4].confirmDate//备注
          }
        }
      },
      tabClick(tab,event){
        tabIndex = Number(tab.index)
        console.log(tab,event)
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
      preFun(){// 上一步骤
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
      save(index){//保存
        getDevelopAddStep(this.formData).then(response => {
          const res = response
          this.$refs.fileRef[index].submitFile(this.otherData.bizId,this.otherData.bizType)
          this.isSave = false
          this.nextSet(index)
          this.remarkChange = false
          this.timeChange = false
          this.$message(this.successTip())
        }).finally(() => {
          this.loading = false
        })
      },
      edit(index){//编辑
        let params = {
          id:this.formData.memberId,
          memberId:this.formData.memberId,
          confirmDate:this.formData.confirmDate,//确认时间
          remark:this.formData.remark,//备注
          stepStatus:{
            key:this.formData.stepStatus.key
          }
        }
        getDevelopUpdateStep(params).then(response => {
          const res = response
          this.$refs.fileRef[index].submitFile(this.otherData.bizId,this.otherData.bizType)
          this.remarkChange = false
          this.timeChange = false
          if((this.isAble - index == 1) || (index < 4 && this.titleList[index+1].confirmDate == '')){
            this.nextSet(index + 1)
          }

          this.$message(this.successTip())
        }).finally(() => {
          this.loading = false
        })
      },
      getDetail(memberId,stepStatus,index){//详情
        let params = {
          memberId:memberId,
          stepStatus:stepStatus
        }
        getDevelopDetailStep(params).then(response =>{
          const  res = response
          if(res != null){
            this.otherData.bizId = response.id
            this.otherData.bizType =response.id
            if(index != undefined){
              this.$refs.fileRef[index].init()
              this.titleList[index].mainId = response.id
              this.titleList[index].confirmDate = res.confirmDate
              this.titleList[index].remark = res.remark
            }
            this.formData.id = response.id
            this.formData.confirmDate = res.confirmDate
            this.formData.orgId.key = res.orgId.key
            this.formData.orgId.data = res.orgId.data
            this.formData.remark = res.remark

          }else{
            if(this.isAble == 0){
              this.formData.memberId = this.params.id
              this.formData.orgId.key = this.params.orgId.key
              this.isAble = 0
              this.formData.stepStatus.key = "1248616414873387008"
            }else{
              this.formData.confirmDate = ""
              this.formData.remark = ""
            }
            this.partyUid(index)
          }

        }).finally(() => {
          this.loading = false
        })
      },
      saveBtn(index){//保存
        this.$refs['refForm'].validate(value => {
          if(!value){
            this.$message.warning("您有必填项未填")
            return
          }
            this.loading = true
          if(index != undefined){
            this.titleList[index].confirmDate = this.formData.confirmDate
            this.titleList[index].remark = this.formData.remark
          }

          if(this.type != undefined && !this.isSave){
            this.edit(index)
          }else{
            this.save(index)
          }
        })
      },
      preSet(){//上一步
        if(this.formData.stepStatus.key === "1248616761813630976"){
          this.formData.stepStatus.key = "1248616691630342144"
        }else if(this.formData.stepStatus.key === "1248616691630342144"){
          this.formData.stepStatus.key = "1248616612773232640"
        }else if(this.formData.stepStatus.key === "1248616612773232640"){
          this.formData.stepStatus.key = "1248616537112182784"
        }else if(this.formData.stepStatus.key === "1248616537112182784"){
          this.formData.stepStatus.key = "1248616414873387008"
        }
        this.changeData(this.formData.stepStatus.key)
      },
      nextSet(index){//自动下一步

        if(this.formData.stepStatus.key === "1248616414873387008"){
          this.formData.stepStatus.key = "1248616537112182784"
          if(this.titleList[1].confirmDate == ''){
            this.isAble++
          }else {
            if(!this.isSave){
              this.getDetail(this.formData.memberId,this.formData.stepStatus.key,index)
            }
          }
        }else if(this.formData.stepStatus.key === "1248616537112182784"){
          this.formData.stepStatus.key = "1248616612773232640"
          if(this.titleList[2].confirmDate == ''){
            this.isAble++
          }else {
            if(!this.isSave){
              this.getDetail(this.formData.memberId,this.formData.stepStatus.key,index)
            }
          }

        }else if(this.formData.stepStatus.key === "1248616612773232640"){
          this.formData.stepStatus.key = "1248616691630342144"
          if(this.titleList[3].confirmDate == ''){
            this.isAble++
          }

        }else if(this.formData.stepStatus.key === "1248616691630342144"){
          this.formData.stepStatus.key = "1248616761813630976"
          if(this.titleList[4].confirmDate == ''){
            this.isAble++
          }else {
            if(!this.isSave){
              this.getDetail(this.formData.memberId,this.formData.stepStatus.key,index)
            }
          }
        }

        if(this.isAble < 4){
          this.partyUid(index)
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


