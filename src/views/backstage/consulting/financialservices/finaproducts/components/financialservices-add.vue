<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1131px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel()"
    v-if="visible">
    <el-form ref="ruleForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title" ref="title">
            <el-input placeholder="请输入1~15字的产品标题" v-model="formData.title" maxlength="15" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="金融机构" prop="institution">
            <el-select
              v-model="formData.institution"
              value-key="id"
              filterable
              placeholder="请选择金融机构"
              style="width:100%;"
              clearable>
              <el-option
                v-for="(item,index) in dicts.financing_institution"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item  class="is-required" label="发布日期" prop="issueTime" ref="issueTime">
            <el-date-picker
              v-model="formData.issueTime"
              type="date"
              @change="selectTime"
              :picker-options="pickerOptions"
              placeholder="请选择对外公示时间"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="失效时间" >
            <el-date-picker
              v-model="formData.loseTime"
              type="date"
              placeholder="请选择失效时间"
              @change="selectTime1"
              :picker-options="pickerOptions1"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否置顶" >
            <el-radio-group v-model="formData.isUp">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="简介" prop="brief" ref="brief">
            <el-input
              placeholder="请简单介绍您的产品吧~"
              v-model="formData.brief"
              type="textarea"
              :autosize='{ minRows: 5, maxRows:5}'
              resize="none"
              maxlength="500"
              show-word-limit/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="file rel" label="产品图片" prop="fileListExist"  ref="fileListExist">
            <base-file-upload
              :folio='true'
              list-type="picture-card"
              :acceptSize="20"
              :otherData="otherData"
              :fileListExist.sync="formData.fileListExist"
              @associationCallback="associationCallbackPic"
              ref="picRef"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="正文" prop="manyBody" ref="manyBody">
            <base-tinymce-editor v-model="formData.manyBody" placeholder="20000个字符以内"></base-tinymce-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传附件" class="rel" prop="fileListExist1" ref="fileListExist1">
            <base-file-upload
              :limit='9'
              list-type="text"
              :acceptSize="20"
              :accept='accept1'
              :otherData="otherData1"
              :fileListExist.sync="formData.fileListExist1"
              @associationCallback="associationCallbackFile"
              ref="fileRef"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel()">取消</el-button>
      <el-button size="medium" type="primary" @click="save()">发布</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {financialAdd,financialEdit,financialDetail} from "@/api/backstage/consulting/financial/financial.js"
  export default {
    name: 'financialservices-add',
    data(){
      return{
        visible: false,
        title: '',//标题
        loading:false,//加载遮罩
        isEdit:1,//新增：1，编辑：2
        pickerOptions: {},
        pickerOptions1: {},
        formData:{// 新增数据
          id:'',
          title:'',// 标题
          manyBody:'',// 正文
          institution:'',// 金融机构
          loseTime:'',// 失效日期
          issueTime:'',// 发布日期
          isUp: 0,// 是否置顶 ： 1：是；0：否
          brief:'',// 简介
          fileListExist:'',// 图片是否上传
          fileListExist1:'',// 附件是否上传
        },
        dicts:{
          financing_institution:[]
        },
        node:{
          'title':{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          'issueTime':{
            required: true,
              message: "请选择",
              trigger: "blur"
          },
          'manyBody':{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          'brief':{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          'fileListExist':[{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }],
          'fileListExist1':[{
            required: true,
            message: '请上传附件',
            trigger: 'blur'
          }]
        },

        otherData:{// 图片参数
          id: '',
          bizId: "",
          bizType: "financialservices",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',

        otherData1:{// 附件参数
          id: '',
          bizId: "",
          bizType: "financialservicesFile",
          isSingle: false
        },
        accept1:'.doc,.docx,.pdf,.xlsx,.txt',
        isStart:0,// 点击发布按钮之前
      }
    },
    mounted(){
      this.getFinancialType()
    },
    watch:{
      'formData.manyBody':{
        handler(newval){
          this.$nextTick(function(){
            if(this.$refs.ruleForm){
              if(newval || this.isStart === 0){
                this.$refs.ruleForm.clearValidate('manyBody');//清除附件验证
              }else{
                this.$refs.ruleForm.validateField("manyBody");//添加附件验证
              }
            }
          })
        },
        deep:true
      },
      'formData.fileListExist':{
        handler(newval){
          this.$nextTick(function(){
            if(this.$refs.ruleForm){
              if(newval){
                this.$refs.ruleForm.clearValidate('fileListExist');//清除附件验证
              }
            }
          })
        },
        deep:true
      },
      'formData.fileListExist1':{
        handler(newval){
          this.$nextTick(function(){
            if(this.$refs.ruleForm){
              if(newval){
                this.$refs.ruleForm.clearValidate('fileListExist1');//清除附件验证
              }
            }
          })
        },
        deep:true
      }
    },
    methods:{
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
      //失效时间限制
      selectTime(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          this.pickerOptions1={
            disabledDate(time) {
              let date=new Date(val).getTime()-3600 * 1000 * 24;
              return time.getTime() < date
            }
          }
        }
      },
      //发布日期限制
      selectTime1(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          this.pickerOptions={
            disabledDate(time) {
              let date=new Date(val).getTime();
              return time.getTime() > date
            }
          }
        }
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res
          this.otherData.bizId = res
          this.otherData1.bizId = res
        })
      },
      // t:  1-新增
      show (t, row) {
        this.visible = true
        this.isStart = 0

        this.formData = {// 新增数据
          id:'',
          title:'',// 标题
          manyBody:'',// 正文
          institution:'',// 金融机构
          loseTime:'',// 失效日期
          issueTime:'',// 发布日期
          isUp:0,// 是否置顶
          brief:'',// 简介
          fileListExist:'',// 图片是否上传
          fileListExist1:'',// 附件是否上传
        }

        if(t == 1){
          this.isEdit = 1
          this.title = '新建产品'
          this.partyUid()
        }else if(t == 2){
          this.isEdit =2
          this.title = '编辑'
          this.loading =true
          this.otherData.bizId = row.id
          this.otherData1.bizId = row.id
          this.getFinancialDetail(row.id)
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.picRef.init()
            this.$refs.fileRef.init()
          })
          this.loading = false
        }
      },
      //取消
      cancel(){
        // this.$refs['ruleForm'].resetFields();
        this.visible = false
      },

      // 获取 金融机构 字典表数据
      getFinancialType(){
        let params = {
          types: ['financing_institution']
        }
        commonReq.getHistoryDict(params).then(response => {
          const res = response
          this.dicts.financing_institution = res.financing_institution
        })
      },

      // 发布
      save(){
        this.isStart = 1

        // 表单验证
        this.$refs['ruleForm'].validate((valid,object) => {
          if (!valid) {
            // setTimeout(()=>{
            //   const isError= document.getElementsByClassName('is-error')
            //   isError.length && isError[0].querySelector('input').focus()
            // },100)
            this.scrollView(object)
            return // 表单必填项判断
          }
          this.$refs.picRef.submitFile()
        })
      },

      // 图片上传回调
      associationCallbackPic(val){
        if(val){
          this.$refs.fileRef.submitFile();
        }else {
          this.$message({
            showClose: true,
            message: '图片上传失败，请再试一次 !!!',
            type: 'error'
          })
        }
      },

      // 附件上传回调
      associationCallbackFile(val){

        if(val){
          this.saveOrEdit()
        }else {
          this.$message({
            showClose: true,
            message: '附件上传失败，请再试一次 !!!',
            type: 'error'
          })
        }
      },

      // 新增或编辑
      saveOrEdit(){
        if(this.isEdit==1){//新增
          financialAdd(this.formData).then(response => {
            this.$message(this.successTip());
            this.cancel()
            this.$emit('refresh')
          })
        }else if(this.isEdit==2){//编辑
          financialEdit(this.formData).then(response => {
            this.$message(this.successTip());
            this.cancel()
            this.$emit('refresh')
          })
        }
      },

      // 获取详情数据
      getFinancialDetail(id){
        let parmas = {
          id: id
        }
        financialDetail(parmas).then(response => {
          const  res = response
          if(!res.isUp){
            res.isUp = 0
          }
          this.formData.id = res.id
          this.formData.title = res.title// 标题
          this.formData.manyBody = res.manyBody// 正文
          this.formData.institution = res.institution.key// 金融机构
          this.formData.loseTime = res.loseTime// 失效日期
          this.formData.issueTime = res.issueTime// 发布日期
          this.formData.isUp = res.isUp// 是否置顶
          this.formData.brief = res.brief// 简介
        })
      }
    }
  }
</script>

<style scoped>
  .text-center{
    text-align:center;
  }
</style>
