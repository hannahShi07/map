<template>
  <div class="demeanor-add">
    <el-dialog
      :title="title"
      width="900px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <el-form ref="refForm" :model="formData" label-width="100px" :rules="node">
        <el-row>
          <el-col :span="24">
            <el-form-item label="分类" prop="type.key">
              <el-select v-model="formData.type.key" placeholder="请选择" clearable style="width: 100%;">
                <el-option
                  v-for="item in industryCategoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type.key =='1076000427119649347'">
          <el-col :span="24">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formData.name" placeholder="请输入" maxlength="20"  clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type.key =='1076000427119649347'">
          <el-col :span="24">
            <el-form-item label="职位" prop="post.key">
              <el-select v-model="formData.post.key" placeholder="请选择"  clearable style="width: 100%">
                <el-option
                  v-for="item in postList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type.key =='1076000427119649348'">
          <el-col :span="24">
            <el-form-item label="机构名称" prop="orgName">
              <el-input v-model="formData.orgName" placeholder="请输入" maxlength="10"  clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="formData.type.key =='1076000427119649348'">
          <el-col :span="24">
            <el-form-item label="机构简介" prop="orgIntro">
              <el-input v-model="formData.orgIntro" :autosize="{minRows: 5, maxRows: 5}" resize="none"
                        type="textarea" placeholder="请输入" maxlength="200" show-word-limit  clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传照片" prop="fileListExist">
              <base-file-upload
                :limit='1'
                list-type="picture-card"
                :acceptSize="20"
                :accept='accept'
                :fileListExist.sync="formData.fileListExist"
                :autoUpload="true"
                :otherData="otherData"
                :action="action"
                ref="fileRef"
                @associationCallback="associationCallback"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getInstitutionalAdd,getInstitutionalEdit,getInstitutionalDetail} from "@/api/backstage/sysset/bigscreen/alliance/institutional/institutional.js"
  export default {
    name: "Add",
    components: {},
    data() {
      return {
        visible:false,
        loading:false,
        title:"",
        formData:{
          id:"",
          type:{
            key:'1076000427119649347',
            data:''
          },  //分类(字典值)
          post:{
            key:'',
            data:''
          }, //职务(字典值)
          name:"",  //姓名
          orgIntro:"",  //机构简介
          orgName:"",  //机构名称
          photoUrl:"",  //图片url
          // 是否已上传附件
          fileListExist:'',
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "institutional",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',
        industryCategory:'',
        industryCategoryList:[],//行业分类
        postList:[],//职务分类
        isEdit:1,//新增：1，编辑：2
        node:{
          'type.key':{
            required: true,
            message: "请选择分类",
            trigger: "change"
          },
          'post.key':{
            required: true,
            message: "请选择职位",
            trigger: "change"
          },
          name:{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          },
          orgIntro:{
            required: true,
            message: "请输入机构简介",
            trigger: "blur"
          },
          orgName:{
            required: true,
            message: "请输入机构名称",
            trigger: "blur"
          },
          fileListExist:{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          },
        },
      }
    },
    mounted() {
      this.getTerm()
    },
    watch:{
      'formData.fileListExist':{
        handler(newval){
          if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
            this.$refs.refForm.clearValidate('fileListExist');//清除附件验证
          }else{

          }
        },
        deep:true
      }
    },
    methods: {
      getTerm(){
        let params = {
          types:['council_type','council_post']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.industryCategoryList = response.council_type;
          this.postList = response.council_post;
        })
      },
      show(t,row){
        this.loading = true;
        this.formData={
          id:"",
          type:{
            key:'',
            data:''
          },  //分类(字典值)
          post:{
            key:'',
            data:''
          }, //职务(字典值)
          name:"",  //姓名
          orgIntro:"",  //机构简介
          orgName:"",  //机构名称
          photoUrl:"",  //图片url
        }
        if(t==1){
          this.title="新增";
          this.isEdit = 1
          this.partyUid()
        }else{
          this.title="编辑"
          this.isEdit = 2
          this.formData.id = row.id;
          this.otherData.bizId = row.id;
          this.getDetail(row.id);
        }
        this.visible=true;
      },
      close(){
        this.formData = {
          id:"",
          type:{
            key:'',
            data:''
          },  //分类(字典值)
          post:{
            key:'',
            data:''
          }, //职务(字典值)
          name:"",  //姓名
          orgIntro:"",  //机构简介
          orgName:"",  //机构名称
          photoUrl:"",  //图片url
        },
         this.otherData={
            id: '',
            bizId: "",
            bizType: "institutional",
            isSingle: false
        },
        this.visible=false;
      },
      save(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            this.$refs['fileRef'].submitFile(this.otherData.bizId,this.otherData.bizType);
          }
        })
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })
      },
      associationCallback(val){
        let params = {
          name: this.formData.name,
          type: this.formData.type,
          post: {key:this.formData.post.key},
          id: this.formData.id,
          orgIntro:this.formData.orgIntro,  //机构简介
          orgName:this.formData.orgName,  //机构名称
        }
        if(val){
          if(this.title=="新增"){
            getInstitutionalAdd(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            getInstitutionalEdit(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      //获取详情
      getDetail(id){
        let params={
          id:id
        }
        getInstitutionalDetail(params).then(response => {
          this.formData = response
          this.$refs.fileRef.init()
        })
      },
    }
  }
</script>

<style scoped>
  .rel >>> .txt{
    color: #CCCCCC;
  }
</style>
