<template>
  <div class="add-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px" v-loading="loading">
        <el-row>
          <el-col :span="24">
            <el-form-item label="返还组织" prop="orgName">
              <el-input placeholder="请选择" v-model="formData.orgName" maxlength="100" clearable readonly @click.native="getTree" @change="getTotal" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="返还年份" prop="returnTime">
              <el-date-picker
                v-model="formData.returnTime"
                align="right"
                type="year"
                placeholder="请选择"
                :editable="false"
                clearable
                :picker-options="pickerOptions"
                @change="getTotal"
                value-format="yyyy">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="缴纳总额">
              <el-input v-model="money" placeholder="" disabled maxlength="100">
                <i slot="suffix">元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="返还金额" prop="returnMoney">
              <el-input v-model="formData.returnMoney" placeholder="请输入返还金额" oninput="value=value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>9){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3);}" maxlength="100" clearable>
                <i slot="suffix">元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
      <return-tree ref="orgTree" @refresh="getOrg"/>
    </el-dialog>
  </div>
</template>

<script>
import {addReturn,returnInfo,returnEdit,getYearDuesTotal} from "@/api/backstage/party/dues/return/return.js"
import ReturnTree from './return-tree'
export default {
  name: "ReturnAdd",
  components: {
    ReturnTree
  },
  data() {
    return {
      visible:false,
      title:"",//标题
      formData:{
        orgName:"",
        orgId:"",
        returnTime:"",//返还年份
        returnMoney:""//返还金额
      },
      money:0,//缴纳金额
      loading:false,
      options: [],//组织
      tableData:[],
      node:{
        orgName:{
          required: true,
          message: "请选择返还组织",
          trigger: "blur"
        },
        returnTime:{
          required: true,
          message: "请选择返还年份",
          trigger: "blur"
        },
        returnMoney:{
          required: true,
          message: "请输入返还金额",
          trigger: "blur"
        }
      },
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    //取消
    close(){
      this.formData={
        orgName:"",
        orgId:"",
        returnTime:"",//返还年份
        returnMoney:""//返还金额
      }
      this.money = 0;
      this.tableData = []
      this.visible = false;
    },
    //保存
    save(){
      this.$refs['refForm'].validate(valid => { // 表单验证
        if (!valid) {
          return ;// 表单必填项判断
        }else{
          if(Number(this.formData.returnMoney) < Number(this.money)){
            let params = this.formData;
            if(this.title == "新增"){
              addReturn(params).then(response => {
                if(response == true){
                  this.$emit('refresh')
                  this.$message(this.successTip())
                  this.close();
                  this.visible = false;
                }
              }).finally(() => {

              });
            }else if(this.title == "编辑"){
              returnEdit(params).then(response => {
                if(response == true){
                  this.$emit('refresh')
                  this.$message(this.successTip())
                  this.close();
                  this.visible = false;
                }
              }).finally(() => {

              });
            }
          }else{
            this.$message("返还金额不能大于等于缴纳总额")
          }
        }
      })
    },
    // 展示组织树
    getTree(){
      this.$refs['orgTree'].show(this.tableData)
    },
    //党小组人员
    getOrg(list){
      this.tableData = list;
      this.formData.orgName = list[0].name;
      this.formData.orgId = list[0].id;
      this.$refs['refForm'].clearValidate(['orgName']);
    },
    //展示
    show(t,row){
      switch(t){
        case 1:
          this.title="新增";
          this.formData={
            orgName:"",
            orgId:"",
            returnTime:"",//返还年份
            returnMoney:""//返还金额
          };
          break;
        case 6:
          this.title="编辑";
          this.loading=true;
          this.getInfo(row.id);
          break;
      }
      this.visible=true;
    },
    getInfo(id){
      let params = {
        id:id
      }
      returnInfo(params).then(response => {
        this.formData=response;
        this.formData.orgName=response.orgName;
        this.loading=false;
        this.tableData=[{id:response.orgId}]
        this.getTotal();
      }).finally(() => {
        this.loading=false;
      });
    },
    getTotal(){
      if(!this.returnTime && !this.orgId){
        let params = {
          collectionDate:this.formData.returnTime,
          orgId:this.formData.orgId
        }
        getYearDuesTotal(params).then(response => {
          this.money = response.totalAmount
        }).finally(() => {
          
        });
      }
    }
  }
}
</script>

<style scoped>
  .add-content >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .add-content >>> .el-dialog{
    width: 560px;
  }
  .add-content >>> .el-form-item__content{
    width: 400px;
  }
  .add-content >>> .el-input__inner{
    width: 400px;
  }
</style>
