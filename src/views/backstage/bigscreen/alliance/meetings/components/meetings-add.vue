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
            <el-form-item label="类型" prop="meetingType.key">
              <el-select v-model="formData.meetingType.key" placeholder="请选择" :editable="false" clearable
                         style="width:100%">
                <el-option
                  v-for="item in meeting_type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联盟党建联席会内容" prop="content"  class="card_multiple">
              <el-input v-model="formData.content" :autosize="{minRows: 5, maxRows: 5}" resize="none"
                        type="textarea" placeholder="请输入" maxlength="200" show-word-limit
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传多张图片" prop="fileListExist"  class="card_multiple">
              <base-file-upload
                :limit='3'
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
  import {getMeetingsDetail,getMeetingsAdd,getMeetingsEdit} from "@/api/backstage/sysset/bigscreen/alliance/meetings/meetings.js"
  export default {
    name: "Add",
    components: {},
    data() {
      return {
        visible:false,
        loading:false,
        title:"",
        formData:{
          meetingType:{
            key:'',
            data:''
          },
          content:'',
          id:"",
          // 是否已上传附件
          fileListExist:'',
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "meetings",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg',
        isEdit:1,//新增：1，编辑：2
        meeting_type:[],//行业分类
        node:{
          content:{
            required: true,
            message: "请输入联盟党建联席会内容",
            trigger: "blur"
          },
          'meetingType.key':{
            required: true,
            message: "请选择类型",
            trigger: "change"
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
          types:['meeting_type']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.meeting_type = response.meeting_type;
        })
      },
      show(t,row){
        this.loading = true;
        this.formData = {
          meetingType:{
            key:'',
              data:''
          },
          content:'',
            id:"",
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
          meetingType:{
            key:'',
              data:''
          },
          content:'',
            id:"",
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
      associationCallback(val){
        let params = {
          id: this.formData.id,
          meetingType: this.formData.meetingType,
          content: this.formData.content,
        }
        if(val){
          if(this.title=="新增"){
            getMeetingsAdd(params).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }).finally(() => {

            });
          }else{
            getMeetingsEdit(params).then(response => {
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
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })
      },
      //获取详情
      getDetail(id){
        let params={
          id:id
        }
        getMeetingsDetail(params).then(response => {
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
  .card_multiple /deep/.el-form-item__label{
    line-height: 20px;
  }
</style>
