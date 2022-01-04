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
            <el-form-item label="产业分类" prop="industryType.key">
              <el-select v-model="formData.industryType.key" placeholder="请选择" :editable="false" clearable
                         style="width:100%">
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
            <el-form-item label="产业名称" prop="industryName">
              <el-input v-model="formData.industryName" placeholder="请输入" maxlength="50"  clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系人" prop="contacts">
              <el-input v-model="formData.contacts" placeholder="请输入" maxlength="50"  clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系方式" prop="contactWay">
              <el-input v-model="formData.contactWay" placeholder="请输入" maxlength="11"  clearable></el-input>
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
import {getMembershipDetail,getMembershipAdd,getMembershipEdit} from "@/api/backstage/sysset/bigscreen/alliance/membership/membership.js"
export default {
  name: "Add",
  components: {},
  data() {
    return {
      visible:false,
      loading:false,
      title:"",
      formData:{
        industryType:{
          key:'',
          data:''
        },
        industryName:"",
        contacts:"",
        contactWay:"",
      },
      isEdit:1,//新增：1，编辑：2
      industryCategoryList:[],//行业分类
      node:{
        industryName:{
          required: true,
          message: "请输入产业名称",
          trigger: "blur"
        },
        'industryType.key':{
          required: true,
          message: "请选择产业分类",
          trigger: "change"
        },
        contacts:{
          required: true,
          message: "请输入联系人",
          trigger: "blur"
        },
        contactWay:{
          required: true,
          pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/,
          message: '请输入正确的联系方式',
          trigger: 'blur'
        }
      },
    }
  },
  mounted() {
    this.getTerm()
  },
  methods: {
    getTerm(){
      let params = {
        types:['industry_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.industryCategoryList = response.industry_type;
      })
    },
    show(t,row){
      this.loading = true;
      this.formData={
        industryType:{
          key:'',
          data:''
        },
        industryName:"",
        contacts:"",
        contactWay:"",
      }
      if(t==1){
        this.title="新增";
        this.isEdit = 1
      }else{
        this.title="编辑"
        this.isEdit = 2
        this.getDetail(row.id);
      }
      this.visible=true;
    },
    close(){
      this.formData = {
          industryType:{
            key:'',
            data:''
          },
          industryName:"",
          contacts:"",
          contactWay:"",
          id:"",
      },
      this.visible=false;
    },
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          if(this.isEdit == 1){
            getMembershipAdd(this.formData).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close()
            })
          }else if(this.isEdit == 2){
            getMembershipEdit(this.formData).then(response => {
              this.$emit('refresh')
              this.$message(this.successTip())
              this.close()
            })
          }
        }
      })
    },
    //获取详情
    getDetail(id){
      let params={
        id:id
      }
      getMembershipDetail(params).then(response => {
        this.formData = response
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
