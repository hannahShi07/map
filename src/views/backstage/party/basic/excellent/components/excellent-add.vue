<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">

      <el-form ref="ruleForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
        <el-row>
          <el-col :span="24">
            <el-form-item label="党组织名称" prop="parentId.data">
              <el-input placeholder="请选择" v-model="formData.parentId.data" maxlength="100"  readonly @click.native="getTree" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属公司" prop="category.key">
              <el-input v-model="formData.category.key"  maxlength="100" placeholder="请输入" class="wp-100" clearable />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="年份" prop="approvalDate">
              <el-date-picker
                v-model="formData.approvalDate"
                value-format="yyyy"
                type="year"
                placeholder="选择日期"
                clearable
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="党组织排名" prop="rank">
              <el-input v-model="formData.rank"  placeholder="请输入" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" @blur="salaryChange" class="wp-100" clearable/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="简介" prop="introduction">
              <el-input
                placeholder="请输入"
                v-model="formData.introduction"
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
            <el-form-item label="上传图片" class="rel">
              <base-file-upload
                :folio='true'
                list-type="picture-card"
                :acceptSize="20"
                :accept='accept'
                :otherData="otherData"
                :isSpecify="true"
                :widthSize="widthSize"
                :heightSize="heightSize"
                :action="action"
                ref="fileRef"
                @upFileList="upFileList"
                @associationCallback="associationCallback"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
    <!--上级党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>


  </div>
</template>

<script>
  import commonReq from "@/api/public/commonReq";
  import {getExcellentDetail,getExcellentEdit,getExcellentAdd,searchCompany} from "@/api/backstage/party/basic/excellent/excellent.js"


  export default {
    components: {},
    data () {
      return {
        visible: false,
        title: '',//标题
        loading:false,//加载遮罩
        isEdit:1,//新增：1，编辑：2
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        formData:{//新增数据
          id:'',
          // 新增图片
          photo:'',
          introduction:"",//简介
          approvalDate:"",//年份
          category:{//所属公司
            data: "",
            key: null
          },
          parentId:{//上级党组织
            data: "",
            key: null
          },
          rank:'',
        },
        node:{
          'parentId.data':{
            required: true,
            message: "请选择党组织名称",
            trigger: "blur"
          },
          "category.key":{
            required: true,
            message: "请输入所属公司",
            trigger: "blur"
          },
          approvalDate:{
            required: true,
            message: "请选择日期",
            trigger: "blur"
          },
          rank:{
            required: true,
            message: "请输入党组织排名",
            trigger: "blur"
          },
          introduction:{
            required: true,
            message: "请输入简介",
            trigger: "blur"
          },
        },

        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "excellent",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',
        fileUrl:'', //上传附件的路径
        // 图片宽度限制
        widthSize: 540,
        // 图片高度限制
        heightSize: 353,
      }
    },
    methods: {
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })
      },
      salaryChange(e){
        this.formData.rank = e.target.value
      },
      //编辑数据回显
      getDetail(id){
        let params = {
          id:id
        }
        getExcellentDetail(params).then(respone => {
          const res = respone
          this.formData.parentId.data = res.orgName
          this.formData.parentId.key = res.orgId
          this.formData.category.key = res.companyName
          this.formData.approvalDate = res.year + ''
          this.formData.rank = res.rank
          this.formData.introduction = res.introduction
        }).finally(() =>{
          this.loading = false;
        })
      },

      //选择的上级党组织回调
      getParentId(val){
        this.formData.category.key = ""
        this.formData.category.data = ""
        if(val != ""){
          this.formData.parentId.data = val.data
          this.formData.parentId.key = val.key
          this.$refs['ruleForm'].clearValidate(['parentId.data']);
          searchCompany(val.key).then(respone => {
            const res = respone
            if(res){
              this.formData.category.key = res.name
            }

          }).finally(() =>{
            this.loading = false;
          })
        }
      },
      //打开上级党组织弹窗
      getTree(){
        let params={
          org: this.formData.parentId.data,
          orgId: this.formData.parentId.key
        }
        this.$refs['orgTree'].show(2,params)
      },

      // t:  1-新增
      show (t, row) {
        this.visible = true
        if(t === 1){
          this.isEdit = 1
          this.title = '新增'
          this.partyUid()
          this.formData.introduction=''
          this.formData.approvalDate=''
          this.formData.category={
            data:'',
            key:''
          }
          this.formData.parentId={
            data:'',
            key:''
          }
          this.formData.rank=''
          this.formData.photo = ''
        }else if(t === 2){
          this.isEdit = 2
          this.title = '编辑'
          this.loading =true
          this.otherData.bizId = row.id
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.fileRef.init()
          })
          this.getDetail(row.id)
        }
      },
      //保存确定
      save(){
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          this.$refs.fileRef.submitFile()
        })
      },
      //返回数据
      upFileList(val){
        if(val && val.code==0 && val.data){
          if(val.data.bizType=='excellent'){
            this.formData.photo=val.data.id
          }
        }
      },
      // 成功回调
      associationCallback(val){
        if(val){
          let params = {
            id:this.otherData.bizId,
            companyName:this.formData.category.key,
            introduction:this.formData.introduction,
            orgId:this.formData.parentId.key,
            rank:this.formData.rank,
            year:parseInt(this.formData.approvalDate),
            photo:this.formData.photo
          }
          if(this.isEdit==1){
            getExcellentAdd(params).then(response => {
              const res = response
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close()
            })
          }else if(this.isEdit==2){
            getExcellentEdit(params).then(response => {
              const res = response
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close()
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
      //取消
      close(){
        this.$refs['ruleForm'].resetFields();

        this.visible = false
      },
    }
  }
</script>

<style scoped>
  .form-big-label {
    padding-left: 10px;
    line-height: 20px;
  }
  .el-select-dropdown__item.selected{
    color: black;
  }
  .wp-100 /deep/ .el-form-item__label{
    line-height: 20px;
  }
  .btn{
    margin-bottom: 12px;
  }


  element.style {
    display: inline-block;
    height: 35px;
  }

  .distpicker-address-wrapper {
    color: #9caebf;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  user agent stylesheet
  div {
    display: block;
  }
  /deep/.el-form-item__content {
    line-height: 36px!important;
    position: relative;
    font-size: 14px;
  }
  /deep/.distpicker-address-wrapper select {
    /* padding: .5rem .75rem; */
    padding: 0;
    height: 36px!important;
    width: 152px!important;
    padding: -108px 0 0 0;
    font-size: 1rem;
    line-height: 36px!important;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
</style>
