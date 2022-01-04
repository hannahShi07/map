<template>
  <div class="add-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-model="formData"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="党员姓名" prop="memberName">
              <el-input v-model="formData.memberName" readonly show-overflow-tooltip @click.native="getTree" placeholder="请选择" maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织名称">
              <el-input v-model="orgName" disabled show-overflow-tooltip disabled maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-input v-model="sex" disabled show-overflow-tooltip maxlength="100" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号">
              <el-input v-model="idcard" disabled show-overflow-tooltip maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="党费性质" class="old-members import">
              <el-radio label="1258229285877972992" v-model="formData.moneyType">普通党费</el-radio>
              <el-radio label="1258229393948409856" v-model="formData.moneyType">特殊党费</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费月份" show-word-limit class="import">
              <div class="month">
                <el-form-item label="" class="month-left" show-word-limit prop="startPayDate">
                  <el-date-picker
                    type="month"
                    v-model="startMonth"
                    :picker-options="startOptions"
                    :disabled="stChange&&formData.moneyType==='1258229285877972992'"
                    @change="changeStart"
                    placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
                <div class="month-content">—</div>
                <el-form-item label="" class="month-right" show-word-limit prop="endPayDate">
                  <el-date-picker
                    type="month"
                    v-model="endMonth"
                    :picker-options="endOptions"
                    @change="changeEnd"
                    placeholder="选择月">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="" class="old-members" prop="payType">
              <el-radio label="2412585934552428956" v-model="formData.payType">每月相同</el-radio>
              <el-radio label="2412585934552429428" v-model="formData.payType">每月不同</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴费总额" class="old-members" prop="amount">
              <el-input v-model="formData.amount" placeholder="" :disabled="formData.payType=='2412585934552429428'" maxlength="100" oninput="if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="formData.payType == '2412585934552429428'" v-for="(item,value) in duesMonth" :key="value">
          <el-col :span="12" v-for="(mon,index) in item" :key="index">
            <el-form-item :label="mon">
              <el-input @change="amountChange" v-model="formData.dueRecordList[value*2+index].money" placeholder="" maxlength="100" oninput="if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件" class="rel">
              <base-file-upload
                list-type="picture-card"
                :acceptSize="20"
                :accept="accept"
                :otherData="otherData"
                :limit="9"
                ref="fileRef"
              @associationCallback="associationCallback"/>
          </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="简介">
              <el-input v-model="formData.remark" type="textarea" show-overflow-tooltip show-word-limit resize="none" :autosize='{ minRows: 4, maxRows: 4 }' maxlength="500" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </div>
    </el-dialog>
    <dues-tree ref="orgTree" @refresh="getOrg"/>
  </div>
</template>

<script>
  import DuesTree from './dues-tree'
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {duesSave,searchMonth} from "@/api/backstage/party/partymember/dues/dues.js"
  export default {
    name: "duesAdd",
    components: {DuesTree},
    data() {
      return {
        visible:false,
        loading:true,
        title:"",//标题
        otherData:{
          bizId:"",
          bizType:"duesImages"
        },
        accept:".png,.jpg,.jpeg,.pdf",
        duesType:"0",//党费性质
        duesMode:"0",//收费方式
        startMonth:"",
        endMonth:"",
        stChange:false,
        startOptions:{},
        endOptions:{},
        duesMonth:[],
        memberName:"",
        orgName:"",
        orgCode:"",
        sex:"",
        idcard:"",
        formData:{
          "amount": 0,//	缴纳金额
          "commitId":0,// 提交标识，用来标记哪些数据是一起报审的
          "dueRecordList": [//	每月不同：月份和党费集合
            {
              "money": 0,//	缴费金额
              "payMonth": ""//	缴费月份
            }
          ],
          "endPayDate": "",//	结束缴纳时间
          "fileId": "",//	附件id(多个用,拼接)
          "memberName":"",
          "memberId": 0,//	党员id
          "moneyType": "1258229285877972992",//	党费性质
          "orgName":"",
          "orgId": 0,//	所属组织
          "payMonth": "",//	缴费月份
          "payType": "2412585934552428956",//	缴费类型
          "remark": "",//	备注
          "startPayDate": ""//	开始缴纳时间
        },
        tableData:[],
        node:{
          memberName:{
            required: true,
            message: "请选择党员",
            trigger: "change"
          },
          amount:{
            required: true,
            message: "请输入缴纳金额",
            trigger: "blur"
          },
          moneyType:{
            required: true,
            message: "请选择党费性质",
            trigger: "blur"
          },
          startPayDate:{
            required: true,
            message: "请选择开始缴纳时间",
            trigger: ["blur","change"]
          },
          endPayDate:{
            required: true,
            message: "请选择结束缴纳时间",
            trigger: ["blur","change"]
          },
        },
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      //取消
      close(){
        this.duesType="0"//党费性质
        this.duesMode="0"//收费方式
        this.startMonth=""
        this.endMonth=""
        this.startOptions={}
        this.endOptions={}
        this.duesMonth=[]
        this.memberName=""
        this.orgName=""
        this.orgCode=""
        this.sex=""
        this.idcard=""
        this.stChange=false
        this.formData={
          "id":"",
          "amount": 0,//	缴纳金额
          "commitId":0,
          "dueRecordList": [//	每月不同：月份和党费集合
            {
              "money": 0,//	缴费金额
              "payMonth": ""//	缴费月份
            }
          ],
          "endPayDate": "",//	结束缴纳时间
          "fileId": "",//	附件id(多个用,拼接)
          "memberName":"",
          "memberId": 0,//	党员id
          "moneyType": "1258229285877972992",//	党费性质
          "orgName":"",
          "orgId": 0,//	所属组织
          "payMonth": "",//	缴费月份
          "payType": "2412585934552428956",//	缴费类型
          "remark": "",//	备注
          "startPayDate": ""//	开始缴纳时间
        }
        this.tableData=[];
        this.otherData={
          bizId:"",
          bizType:"duesImages"
        }
        this.visible = false;
      },
      //展示
      show(t,row){
        this.title="新增";
        this.visible=true;
        this.changeStart();
        this.changeEnd();
        this.getUser();
        this.partyUid();
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.commitId = res;
          this.otherData.bizId = res;
        })
      },
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.orgCode=response.data.orgCode;
          this.formData.orgId=response.data.orgId;
        })
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
      associationCallback(){
        let params;
        if(this.formData.payType == "2412585934552428956"){
          // 每月相同
          params = {
            amount:this.formData.amount,
            commitId:this.formData.commitId,
            endPayDate:this.formData.endPayDate,
            id:this.formData.id,
            memberId:this.formData.memberId,
            moneyType:this.formData.moneyType,
            orgId:this.formData.orgId,
            payType:this.formData.payType,
            startPayDate:this.formData.startPayDate,
          };
        }else{
          // 每月不同
          params = {
            amount:this.formData.amount,
            commitId:this.formData.commitId,
            dueRecordList:this.formData.dueRecordList,
            endPayDate:this.formData.endPayDate,
            id:this.formData.id,
            memberId:this.formData.memberId,
            moneyType:this.formData.moneyType,
            orgId:this.formData.orgId,
            payType:this.formData.payType,
            startPayDate:this.formData.startPayDate,
          };
        }
        duesSave(params).then(response => {
          this.$emit('refresh')
          this.$message(this.successTip())
          this.close();
        }).finally(() => {

        });
      },
      // 动态改变每月不同的总缴费金额
      amountChange(){
        this.formData.amount = 0;
        for(let i=0;i<this.formData.dueRecordList.length;i++){
          this.formData.amount = Number(this.formData.dueRecordList[i].money) + Number(this.formData.amount)
        }
      },
      // 设置缴费结束日期限制
      changeStart(){
        let appointmentStart = this.startMonth
        this.endOptions={
          disabledDate(time) {
            if(appointmentStart){
              if(appointmentStart.getMonth() == 0){
                if (new Date(appointmentStart).getTime() > time.getTime() || new Date((appointmentStart.getFullYear())+"-"+(appointmentStart.getMonth()+12)+"-"+appointmentStart.getDate()).getTime() < time.getTime() || new Date().getTime() < time.getTime()) {
                  return true
                }
              }else{
                if (new Date(appointmentStart).getTime() > time.getTime() || new Date((appointmentStart.getFullYear()+1)+"-"+(appointmentStart.getMonth())+"-"+appointmentStart.getDate()).getTime() < time.getTime() || new Date().getTime() < time.getTime()) {
                  return true
                }
              }
              return false
            }else{
              if(new Date().getTime() < time.getTime()){
                return true
              }else{
                return false
              }
            }
          }
        }
      },
      // 设置缴费开始日期限制
      changeEnd(){
        let appointmentEnd = this.endMonth
        this.startOptions={
          disabledDate(time) {
            if(appointmentEnd){
              if(appointmentEnd.getMonth()==11){
                if (new Date(appointmentEnd).getTime() < time.getTime() || new Date((appointmentEnd.getFullYear())+"-"+(appointmentEnd.getMonth()-10)+"-"+appointmentEnd.getDate()).getTime() > time.getTime() || new Date().getTime() <= time.getTime()) {
                  return true
                }
              }else{
                if (new Date(appointmentEnd).getTime() < time.getTime() || new Date((appointmentEnd.getFullYear()-1)+"-"+(appointmentEnd.getMonth()+2)+"-"+appointmentEnd.getDate()).getTime() > time.getTime() || new Date().getTime() <= time.getTime()) {
                  return true
                }
              }
              return false
            }else{
              if(new Date().getTime() < time.getTime()){
                return true
              }else{
                return false
              }
            }
          }
        }
      },
      // 展示组织树
      getTree(){
        this.$refs['orgTree'].show(this.tableData,this.orgCode)
      },
      //党小组人员
      getOrg(list){
        this.orgName = list[0].orgId.data;
        this.tableData = list;
        this.formData.memberId = list[0].id;
        this.formData.memberName = list[0].name;
        this.idcard = list[0].idCode;
        this.sex = list[0].sex.data;
        let params={
          memberId:list[0].id
        }
        searchMonth(params).then(response => {
          if(response&&response.payMonth){
            let startPayDate = response.payMonth.split("-")[0]+"-"+(Number(response.payMonth.split("-")[1])+1>9?Number(response.payMonth.split("-")[1])+1:"0"+(Number(response.payMonth.split("-")[1])+1))+"-01 00:00:00"
            this.formData.startPayDate = response.payMonth
            this.startMonth = new Date(startPayDate)
            this.formData.endPayDate = "";
            this.endMonth = "";
            this.changeStart();
            this.stChange = true;
          }else{
            this.formData.startPayDate = "";
            this.startMonth = "";
            this.formData.endPayDate = "";
            this.endMonth = "";
            this.changeStart();
            this.stChange = false;
          }
        }).finally(() => {

        });
      },
      //月份过滤
      changeMonthName(val){
        switch(val){
          case 0:
          case 12:
            return "一月"
            break;
          case 1:
          case 13:
            return "二月"
            break;
          case 2:
          case 14:
            return "三月"
            break;
          case 3:
          case 15:
            return "四月"
            break;
          case 4:
          case 16:
            return "五月"
            break;
          case 5:
          case 17:
            return "六月"
            break;
          case 6:
          case 18:
            return "七月"
            break;
          case 7:
          case 19:
            return "八月"
            break;
          case 8:
          case 20:
            return "九月"
            break;
          case 9:
          case 21:
            return "十月"
            break;
          case 10:
          case 22:
            return "十一月"
            break;
          case 11:
          case 23:
            return "十二月"
            break;
        }
      }
    },
    watch:{
      startMonth(val){
        if(val){
          this.formData.startPayDate = this.startMonth.getFullYear() + "-" + (this.startMonth.getMonth()>8?this.startMonth.getMonth()+1:"0"+(this.startMonth.getMonth()+1)) + "-01";
          if(this.endMonth&&val){
            // 声明变量判断结束月份与开始月份差
            let num;
            // 判断结束日期年份是否大于开始日期年份
            if(this.endMonth.getFullYear()-val.getFullYear()>0){
              num = this.endMonth.getMonth()+13-val.getMonth()
            }else{
              num = this.endMonth.getMonth()+1-val.getMonth()
            }
            let than = this;
            than.duesMonth=[];
            than.formData.dueRecordList=[];
            // 月份两两一组方便渲染
            for(let i=0;i<Math.ceil(num/2);i++){
              // 月份差为奇数
              if(i==Math.ceil(num/2)-1&&num%2>0){
                let month = val.getMonth()+2*i;
                than.duesMonth.push([than.changeMonthName(month)])
                than.formData.dueRecordList.push({
                  "money": 0,//	缴费金额
                  "payMonth": val.getMonth()+2*i>11 ? (val.getFullYear()+1+"-"+(val.getMonth()+2*i-12+1>9 ? val.getMonth()+2*i-12+1 : "0"+(val.getMonth()+2*i-12+1))+"-01") : (val.getFullYear()+"-"+(val.getMonth()+2*i+1>9 ? val.getMonth()+2*i+1 : "0"+(val.getMonth()+2*i+1))+"-01")//	缴费月份
                })
              }else{// 月份差为偶数
                let mon = []
                for(let j=0;j<2;j++){
                  if(j==0){
                    let month = val.getMonth()+2*i;
                    mon.push(than.changeMonthName(month))
                    than.formData.dueRecordList.push({
                      "money": 0,//	缴费金额
                      "payMonth": val.getMonth()+2*i>11 ? (val.getFullYear()+1+"-"+(val.getMonth()+2*i-12+1>9 ? val.getMonth()+2*i-12+1 : "0"+(val.getMonth()+2*i-12+1))+"-01") : (val.getFullYear()+"-"+(val.getMonth()+2*i+1>9 ? val.getMonth()+2*i+1 : "0"+(val.getMonth()+2*i+1))+"-01")//	缴费月份
                    })
                  }else{
                    let month = val.getMonth()+2*i+1;
                    mon.push(than.changeMonthName(month))
                    than.formData.dueRecordList.push({
                      "money": 0,//	缴费金额
                      "payMonth": val.getMonth()+2*i+1>11 ? (val.getFullYear()+1+"-"+(val.getMonth()+2*i-12+2>9 ? val.getMonth()+2*i-12+2 : "0"+(val.getMonth()+2*i-12+2))+"-01") : (val.getFullYear()+"-"+(val.getMonth()+2*i+2>9 ? val.getMonth()+2*i+2 : "0"+(val.getMonth()+2*i+2))+"-01")//	缴费月份
                    })
                  }
                }
                than.duesMonth.push(mon)
              }
            }
          }
        }
      },
      endMonth(val){
        if(val){
          this.formData.endPayDate = this.endMonth.getFullYear() + "-" + (this.endMonth.getMonth()>8?this.endMonth.getMonth()+1:"0"+(this.endMonth.getMonth()+1)) + "-01";
          if(this.startMonth&&val){
            // 声明变量判断结束月份与开始月份差
            let num;
            // 判断结束日期年份是否大于开始日期年份
            if(val.getFullYear()-this.startMonth.getFullYear()>0){
              num = val.getMonth()+13-this.startMonth.getMonth()
            }else{
              num = val.getMonth()+1-this.startMonth.getMonth()
            }
            let than = this;
            than.duesMonth=[];
            than.formData.dueRecordList=[];
            // 月份两两一组方便渲染
            for(let i=0;i<Math.ceil(num/2);i++){
              // 月份差为奇数
              if(i==Math.ceil(num/2)-1&&num%2>0){
                let month = than.startMonth.getMonth()+2*i;
                than.duesMonth.push([than.changeMonthName(month)])
                than.formData.dueRecordList.push({
                  "money": 0,//	缴费金额
                  "payMonth": than.startMonth.getMonth()+2*i>11 ? (than.startMonth.getFullYear()+1+"-"+(than.startMonth.getMonth()+2*i-12+1>9 ? than.startMonth.getMonth()+2*i-12+1 : "0"+(than.startMonth.getMonth()+2*i-12+1))+"-01") : (than.startMonth.getFullYear()+"-"+(than.startMonth.getMonth()+2*i+1>9 ? than.startMonth.getMonth()+2*i+1 : "0"+(than.startMonth.getMonth()+2*i+1))+"-01")//	缴费月份
                })
              }else{// 月份差为偶数
                let mon = []
                for(let j=0;j<2;j++){
                  if(j==0){
                    let month = than.startMonth.getMonth()+2*i;
                    mon.push(than.changeMonthName(month))
                    than.formData.dueRecordList.push({
                      "money": 0,//	缴费金额
                      "payMonth": than.startMonth.getMonth()+2*i>11 ? (than.startMonth.getFullYear()+1+"-"+(than.startMonth.getMonth()+2*i-12+1>9 ? than.startMonth.getMonth()+2*i-12+1 : "0"+(than.startMonth.getMonth()+2*i-12+1))+"-01") : (than.startMonth.getFullYear()+"-"+(than.startMonth.getMonth()+2*i+1>9 ? than.startMonth.getMonth()+2*i+1 : "0"+(than.startMonth.getMonth()+2*i+1))+"-01")//	缴费月份
                    })
                  }else{
                    let month = than.startMonth.getMonth()+2*i+1;
                    mon.push(than.changeMonthName(month))
                    than.formData.dueRecordList.push({
                      "money": 0,//	缴费金额
                      "payMonth": than.startMonth.getMonth()+2*i+1>11 ? (than.startMonth.getFullYear()+1+"-"+(than.startMonth.getMonth()+2*i-12+2>9 ? than.startMonth.getMonth()+2*i-12+2 : "0"+(than.startMonth.getMonth()+2*i-12+2))+"-01") : (than.startMonth.getFullYear()+"-"+(than.startMonth.getMonth()+2*i+2>9 ? than.startMonth.getMonth()+2*i+2 : "0"+(than.startMonth.getMonth()+2*i+2))+"-01")//	缴费月份
                    })
                  }
                }
                than.duesMonth.push(mon)
              }
            }
          }
        }
      },
      "formData.payType"(val){
        if(val == "2412585934552429428"){
          this.formData.amount = 0;
          for(let i=0;i<this.formData.dueRecordList.length;i++){
            this.formData.amount = Number(this.formData.dueRecordList[i].money) + Number(this.formData.amount)
          }
        }else{
          this.formData.amount = 0;
        }
      }
    }
  }
</script>

<style scoped>
  .add-content >>> .el-dialog{
    width: 1070px;
  }
  .month >>> .el-date-editor--month{
    width: 190px;
  }
  .month-left{
    float: left;
  }
  .month-content{
    float: left;
    width: calc(100% - 380px);
    text-align: center;
  }
  .month-right{
    float: right;
  }
  .rel >>> .txt{
    color: #CCCCCC;
  }
  .import >>> .el-form-item__label::before{
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
</style>
