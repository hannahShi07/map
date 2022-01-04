<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    title="极速匹配"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="1112px"
    @close="close"
  >
    <el-form ref="ruleForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
      <div class="wise-title">
      <div class="wise-tabbar">基本信息</div>
        <el-divider></el-divider>
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="企业名称" prop="theme">-->
<!--            <el-input v-model="formData.theme" placeholder="请输入" clearable maxlength="200"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="统一代码" prop="theme">-->
<!--            <el-input v-model="formData.theme" placeholder="请输入" clearable maxlength="200"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="注册资金" prop="theme">-->
<!--            <el-input v-model="formData.theme" placeholder="请输入" clearable maxlength="200"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="注册地址" prop="theme">-->
<!--            <el-select-->
<!--              v-model="formData.theme"-->
<!--              value-key="id"-->
<!--              collapse-tags-->
<!--              placeholder="请选择"-->
<!--              style="width:100%;"-->
<!--              clearable>-->
<!--              <el-option-->
<!--                v-for="(item,index) in nameList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
      <el-row>
        <el-col :span="12">
          <el-form-item label="产业领域" prop="industryField">
            <el-select
              v-model="formData.industryField"
              value-key="id"
              collapse-tags
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                v-for="(item,index) in dicts.sized_firm"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业规模" prop="companyScale">
            <el-select
              v-model="formData.companyScale"
              value-key="id"
              collapse-tags
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                v-for="(item,index) in dicts.industry_scale"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
<!--      <el-row>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="所属行业" prop="theme">-->
<!--            <el-select-->
<!--              v-model="formData.theme"-->
<!--              value-key="id"-->
<!--              collapse-tags-->
<!--              placeholder="请选择"-->
<!--              style="width:100%;"-->
<!--              clearable>-->
<!--              <el-option-->
<!--                v-for="(item,index) in nameList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="高新技术企业" prop="theme">-->
<!--            <el-select-->
<!--              v-model="formData.theme"-->
<!--              value-key="id"-->
<!--              collapse-tags-->
<!--              placeholder="请选择"-->
<!--              style="width:100%;"-->
<!--              clearable>-->
<!--              <el-option-->
<!--                v-for="(item,index) in nameList"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
      <div class="wise-title">
      <div class="wise-tabbar">人员信息</div>
        <el-divider></el-divider>
      <el-row v-for="item in itemList">
        <el-col :span="12"  v-for="(info,key) in item">
          <el-form-item :label=info.name class="title1">
            <el-input v-model="formData[info.prop]" placeholder="请输入" maxlength="5" @blur="formData[info.prop] = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
      <div class="wise-title">
        <div class="wise-tabbar">财务信息</div>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" >
            <el-form-item label="营业收入" prop="operatingIncome">
              <el-input v-model="formData.operatingIncome" placeholder="请输入" maxlength="5" clearable @blur="formData.operatingIncome = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="上年度纳税" prop="lastYearTax">
              <el-input v-model="formData.lastYearTax" placeholder="请输入" maxlength="5" clearable @blur="formData.lastYearTax = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备原值" prop="originalValueEquipment">
              <el-input v-model="formData.originalValueEquipment" placeholder="请输入" maxlength="5" clearable @blur="formData.originalValueEquipment = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年总资产" prop="propertyOld">
              <label slot="label" class="label-txt">{{this.nowYear-2}}年总资产</label>
              <el-input v-model="formData.propertyOld" placeholder="请输入" maxlength="5" clearable @blur="formData.propertyOld = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年总负债" prop="liabilitiesOld">
              <label slot="label" class="label-txt">{{this.nowYear-2}}年总负债</label>
              <el-input v-model="formData.liabilitiesOld" placeholder="请输入" maxlength="5" clearable @blur="formData.liabilitiesOld = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年总资产" prop="propertyLast">
              <label slot="label" class="label-txt">{{this.nowYear-1}}年总资产</label>
              <el-input v-model="formData.propertyLast" placeholder="请输入" maxlength="5" clearable @blur="formData.propertyLast = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年总负债" prop="liabilitiesLast">
              <label slot="label" class="label-txt">{{this.nowYear-1}}年总负债</label>
              <el-input v-model="formData.liabilitiesLast" placeholder="请输入" maxlength="5" clearable @blur="formData.liabilitiesLast = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="年总资产" prop="propertyNow">
              <label slot="label" class="label-txt">{{this.nowYear}}年总资产</label>
              <el-input v-model="formData.propertyNow" placeholder="请输入" maxlength="5" clearable @blur="formData.propertyNow = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年总负债" prop="liabilitiesNow">
              <label slot="label" class="label-txt">{{this.nowYear}}年总负债</label>
              <el-input v-model="formData.liabilitiesNow" placeholder="请输入" maxlength="5" clearable @blur="formData.liabilitiesNow = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="close">取消</el-button>
      <el-button size="medium" type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {preciseMatchingadd,preciseMatchingedit,preciseMatchingdetail} from "@/api/backstage/consulting/policyservice/wisepolicy/wisepolicy.js"
  export default {
    name: 'wise-prematch',
    data(){
      return{
        visible:false,
        loading:false,
        // nameList:[],//注册地址
        dicts: {//字典
          sized_firm:{},//企业规模
          industry_scale:{}//产业领域
        },
        formData:{
          id:'',//id
          companyScale:'',//企业规模
          industryField:'',//产业领域
          lastYearTax:'',//税收、纳税
          liabilitiesLast:'',//去年的负债
          liabilitiesNow:'',//今年的负债
          liabilitiesOld:'',//前年的负债
          propertyLast:'',//去年的资产
          propertyNow:'',//今年的资产
          propertyOld:'',//前年的资产
          operatingIncome:'',//营业收入、营业总收入
          originalValueEquipment:''//设备原值、设备总原值
        },
        defaultDate:'',//当前时间
        nowYear:'',
        //遍历数组对象
        itemList:[
          [{name:'企业总人数',prop:'numTotalEmployee'}, {name:'博士人数',prop:'numDoctors'}],
          [{name:'硕士人数',prop:'numMasters'}, {name:'本科人数',prop:'numBachelors'}],
          [{name:'专科人数',prop:'numColleges'}],
        ],
        node:{

        }
      }
    },
    created(){
      this.defaultDate = this.getNowTime();
      this.nowYear = this.formatNowTime(this.defaultDate)
      this.getDict();
      this.preciseMatchingdetail();
    },
    methods:{
      //调用字典接口
      getDict(){
        let params = {
          types:['sized_firm','industry_scale']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.sized_firm = res.sized_firm;
          this.dicts.industry_scale = res.industry_scale;
        })
      },
      //获取精准匹配详情
      preciseMatchingdetail(){
        let params = {

        }
        this.loading=true
        preciseMatchingdetail(params).then(response => {
          const res = response;
          this.formData = res
        }).finally(() => {
          this.loading = false;
        });
      },
      //保存
      submit(){
        preciseMatchingedit(this.formData).then(response => {
          const res = response;
          this.$message(this.successTip())
          this.$emit('refresh')
          this.close()
        }).finally(() => {

        });
      },

      show (t) {
        this.visible = true;
      },
      // 关闭
      close(){
        this.visible = false
      },
      //处理默认选中当前日期
      getNowTime() {
        var now = new Date();
        var year = now.getFullYear(); //得到年份
        var month = now.getMonth(); //得到月份
        var date = now.getDate(); //得到日期
        month = month + 1;
        month = month.toString().padStart(2, "0");
        date = date.toString().padStart(2, "0");
        this.defaultDate = `${year}-${month}-${date}`;
        return this.defaultDate;
      },
      //时间转化年
      formatNowTime(date) {
        var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        m = m > 9 ? m : '0' + m;
        return y;
      },
    }
  }
</script>

<style scoped>
  .text-center {
    text-align: center;
  }
  /*/deep/ .el-button:not(.is-circle):not(.is-round), .el-input__inner{*/
  /* background-color: #ED3C3C;*/
  /*}*/
  .title1 /deep/ .base-label-box__label{
    /*width:100px!important;*/
    /*margin: 20px;*/
  }
  .label-txt {
    font-size: 14px;
    color: #888;
    font-family: "Microsoft YaHei";
    font-weight: 400;
  }
  .wise-title /deep/ .el-form-item__label {
    width: 120px !important;
  }
  .wise-title /deep/.el-form-item__content {
    margin-left:120px !important;
  }
  .wise-tabbar{
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #666666;
  }
</style>
