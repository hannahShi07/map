<template>
  <div class="colony-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <el-form ref="refForm" :model="formData" label-width="100px" :rules="node">
        <el-row>
          <el-col :span="24">
            <el-form-item label="产业链类型" prop="industryType">
              <el-select
                v-model="formData.industryType"
                placeholder="请选择"
                :editable="false"
                clearable>
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
        <el-row>
          <el-col :span="24">
            <el-form-item label="产值(亿元)" prop="outputValue">
              <el-input
                placeholder="请输入"
                v-model="formData.outputValue"
                type="number"
                step="0.01"
                clearable
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产值同期增长(%)" prop="growthRate">
              <el-input
                placeholder="请输入"
                v-model="formData.growthRate"
                type="number"
                step="0.01"
                clearable
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="重点项目(个)" prop="projectNum">
              <el-input
                placeholder="请输入"
                v-model="formData.projectNum"
                type="number"
                maxlength="100"
                clearable
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="总投资(亿元)" prop="investment">
              <el-input
                placeholder="请输入"
                v-model="formData.investment"
                type="number"
                maxlength="50"
                clearable
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传图片" class="rel" prop="fileListExist">
              <base-file-upload
                :folio='false'
                list-type="picture-card"
                :acceptSize="20"
                :accept="accept"
                :fileListExist.sync="formData.fileListExist"
                :otherData="otherData"
                ref="fileRef"
                :limit="3"
                :describe="describe"
                @associationCallback="associationCallback"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {gatColonySave,gatColonyEdit,gatColonyInfo} from "@/api/backstage/sysset/bigscreen/colony/colony.js"
export default {
  name: "ColonyAdd",
  components: {},
  data() {
    return {
      visible:false,
      loading:false,
      // 标题
      title:"",
      // 页面数据
      formData:{
        // 该条数据id
        id:"",
        // 产业链类型
        industryType: '',
        // 产值
        outputValue: null,
        // 产值同期增长
        growthRate: null,
        // 重点项目数
        projectNum: null,
        // 项目总投资
        investment: null,
        // 图片地址 集合
        linkUrl:[],
        // 是否已上传附件
        fileListExist:'',
      },
      // 产业链类型集合
      industryCategoryList:[],
      node:{
        industryType:{
          required: true,
          message: "请选择产业链类型",
          trigger: "blur"
        },
        outputValue:[
          {
            required: true,
            message: "请输入产值，必须精确到两位小数",
            trigger: "blur"
          },
          {
            pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
            message: '请输入合法值'
          },
          {
            pattern: /^(9999999|((?!9999999)[0-9][0-9]{0,6})(\.[0-9]{1,2})?)$/,
            message: "产值必须精确到两位小数，勿超过 9999999"
          },
          {
            pattern: /^(\-)*(\d+)\.(\d\d).*$/,
            message: "必须精确到2位小数"
          }

        ],
        growthRate: [
          {
            required: true,
            message: "请输入产值同期增长(%)，必须精确到两位小数",
            trigger: "blur"
          },
          {
            pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
            message: '请输入合法值'
          },
          {
            pattern: /^(\-)*(\d+)\.(\d\d).*$/,
            message: "必须精确到2位小数"
          }
        ],
        projectNum: [
          {
            required: true,
            message: "请输入重点项目个数",
            trigger: "blur"
          },
          {
            pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
            message: '请输入合法值'
          },
          {
            pattern: /^([0-9]{1,4}|9999)$/,
            message: '请输入0 - 9999之间的整数'
          }
        ],
        investment:[
          {
            required: true,
            message: "请输入产值，必须精确到两位小数",
            trigger: "blur"
          },
          {
            pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
            message: '请输入合法值'
          },
          {
            pattern: /^(9999999|((?!9999999)[0-9][0-9]{0,6})(\.[0-9]{1,2})?)$/,
            message: "产值必须精确到两位小数，勿超过 9999999"
          },
          {
            pattern: /^(\-)*(\d+)\.(\d\d).*$/,
            message: "必须精确到2位小数"
          }
        ],
        fileListExist:{
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        },

      },
      // 附件参数
      otherData:{
        bizId:"",
        bizType:"industryImages"
      },
      // 附件上传类型
      accept:".png,.jpg,.jpeg",
      // 附件提示
      describe: '格式要求：.png,.jpg,.jpeg 要求：20MB以内  仅限3张',
    }
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

  mounted() {
    this.getTerm()
  },
  methods: {
    // 获取字典表数据
    getTerm(){
      let params = {
        types:['INDUSTRY_TYPE']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.industryCategoryList=response.INDUSTRY_TYPE;
      })
    },
    // 页面打开时首先执行的方法
    show(t,row){
      this.loading = true;
      this.formData={
        id:"",
        industryType: '',
        outputValue: null,
        growthRate: null,
        projectNum: null,
        investment: null,
        linkUrl:"",
      }
      if(t==1){
        this.title="新增";
        this.partyUid()
      }else{
        this.title="编辑"
        this.formData.id = row.id;
        this.otherData.bizId = row.id;
        this.getDetail(row.id);
      }
      this.visible=true;
    },
    // 页面关闭
    close(){
      this.formData={
        id:"",
        industryType: '',
        outputValue: null,
        growthRate: null,
        projectNum: null,
        investment: null,
        linkUrl:"",
      }
      this.otherData={
        bizId:"",
        bizType:"industryImages"
      }
      this.visible=false;
    },
    // 保存
    save(){
      // 表单验证
      this.$refs['refForm'].validate(valid => {
        // 表单必填项判断
        if (!valid) {
          return ;
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
    // 附件回调函数
    associationCallback(val){
      let params = {
        id:this.formData.id,
        outputValue:this.formData.outputValue,
        growthRate:this.formData.growthRate,
        projectNum:this.formData.projectNum,
        investment:this.formData.investment,
        linkUrl:this.formData.linkUrl,
        industryType:this.formData.industryType,
      };
      if(val){
        if(this.title=="新增"){
          gatColonySave(params).then(response => {
            if(response){
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }
          })
        }else{
          gatColonyEdit(params).then(response => {
            if(response){
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close();
            }
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
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatColonyInfo(params).then(response => {
        this.formData = response
        this.$refs.fileRef.init()
      })
    },
  }
}
</script>

<style scoped>
  .colony-add >>> .el-select {
    width: 100%;
  }
  .colony-add >>> .el-form-item__content {
    margin-left: 130px!important;
  }
  .colony-add >>> .el-form-item__label {
    width: 130px!important;
  }
</style>
