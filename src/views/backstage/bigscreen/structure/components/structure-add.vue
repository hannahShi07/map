<template>
  <div class="structure-add">
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
            <el-form-item label="是否龙头企业" prop="isLeading">
              <el-select
                v-model="formData.isLeading"
                placeholder="请选择"
                :editable="false"
                clearable>
                <el-option
                  v-for="item in leadList"
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
            <el-form-item label="企业名称" prop="companyName">
              <el-input
                placeholder="请输入"
                v-model="formData.companyName"
                maxlength="50"
                clearable
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产品" prop="product">
              <el-input
                placeholder="请输入"
                v-model="formData.product"
                maxlength="10"
                clearable
                show-word-limit/>
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
import { gatStructureSave, gatStructureEdit, gatStructureInfo } from "@/api/backstage/sysset/bigscreen/structure/structure.js"
export default {
  name: "StructureAdd",
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
        // 企业名称
        companyName: '',
        // 产品
        product: '',
        // 是否为龙头企业
        isLeading: "",
      },
      // 是否为龙头企业集合
      leadList: [
        {
          id: '1',
          name: '是'
        },
        {
          id: '0',
          name: '否'
        }

      ],
      // 产业链类型集合
      industryCategoryList:[],
      node:{
        industryType: {
          required: true,
          message: "请选择产业链类型",
          trigger: "blur"
        },
        isLeading: {
          required: true,
            message: "请选择是否龙头企业",
            trigger: "blur"
        },
        companyName:{
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        },
        product:{
          required: true,
          message: "请输入产品",
          trigger: "blur"
        },
      },
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
        this.industryCategoryList=response.INDUSTRY_TYPE
      })
    },
    // 页面打开时首先执行的方法
    show(t,row){
      this.loading = true;
      this.formData={
        id:"",
        industryType: '',
        companyName: '',
        product: '',
        isLeading: "",
      }
      if(t==1){
        this.title="新增";
        this.partyUid()
      }else{
        this.title="编辑"
        this.formData.id = row.id;
        this.getDetail(row.id);
      }
      this.visible=true;
    },
    // 页面关闭
    close(){
      this.formData={
        id:"",
        industryType: '',
        companyName: '',
        product: '',
        isLeading: "",
      }
      this.visible=false;
    },
    // 保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          this.saveFun()
        }
      })
    },
    // 新增 / 保存接口
    saveFun(){
      let params = {
        id:this.formData.id,
        industryType:this.formData.industryType,
        companyName:this.formData.companyName,
        product:this.formData.product,
        isLeading:this.formData.isLeading,
      }
      if(this.title=="新增"){
        gatStructureSave(params).then(response => {
          if(response){
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }
        })
      }else{
        gatStructureEdit(params).then(response => {
          if(response){
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }
        })
      }
    },
    //新增时获取UID
    partyUid(){
      commonReq.getNewUid({}).then(response =>{
        const res = response
        this.formData.id = res;
      })
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      gatStructureInfo(params).then(response => {
        this.formData = response
      })
    },
  }
}
</script>

<style scoped>
  .colony-add >>> .el-select {
    width: 100%;
  }
  .structure-add .dialog-footer {
    text-align:center
  }

  .structure-add  .el-select {
    width: 100%;
  }

  .structure-add >>> .el-form-item__content {
    margin-left: 130px!important;
  }
  .structure-add >>> .el-form-item__label {
    width: 130px!important;
  }
</style>
