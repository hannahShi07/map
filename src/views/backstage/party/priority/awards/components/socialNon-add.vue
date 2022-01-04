<!--全市非公企业党建工作示范点-->
<template>
  <div class="declare-detail" v-cloak v-loading="loading">
    <div class="content">
      <base-card-box header="" :margin="{top: true}" style="width: 100%;margin-top: 5px">
        <div class="content-title">
          注：1、要严格按照标准推荐候选对象,并分别形成主要事迹材料,连同此表一并上报省委非公工委办公室
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          2、此表有关信息请市、县(市、区)委组织部、非公经济和社会组织工委与工商(市场监管)、人社、税务、工会、共青团等部门进行核对。
        </div>
      </base-card-box>
    </div>
    <el-form :model="declareAwardData" :rules="node" ref="refForm" label-width="120px">
      <div class="base-information">
        <h4>党组织所在企业基本情况</h4>
        <div class="base-content">
          <el-col :span="24">
            <el-form-item class="is-required" label="企业名称" prop="companyId.key">
              <el-select
                v-model="declareAwardData.companyId.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width: 100%"
                @change="companyChange"
                clearable>
                <el-option
                  v-for="(item, index) in companyNameList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" class="select-list">
            <el-form-item class="is-required" label="地址" prop="province">
              <v-distpicker  :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display: flex;"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
              <el-input v-model="declareAwardData.companyAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
              <img class="map-img" src="../../../../../../assets/page/icon-map.png"  @click="toMap()">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  class="is-required"  label="法人代表姓名" prop="legalPerson">
              <el-input v-model="declareAwardData.legalPerson"  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="政治面貌" prop="politicsStatus">
              <el-input v-model="declareAwardData.politicsStatus"  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="党组织书记姓名" prop="secretary">
              <el-input v-model="declareAwardData.secretary"  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  class="is-required" label="兼职任务" prop="pluralistic">
              <el-input v-model="declareAwardData.pluralistic"  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="职工人数" prop="empAmount">
              <el-input v-model.number="declareAwardData.empAmount"  placeholder="请输入"   clearable>
                <i slot="suffix">名</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="资产总额" prop="empAmount">
              <el-input v-model.number="declareAwardData.totalAssets"  placeholder="请输入"   clearable>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="2017年营收总额" prop="preYearRevenue">
              <label slot="label" class="label-txt">{{this.nowYear}}年营收总额</label>
              <el-input v-model.number="declareAwardData.preYearRevenue"  placeholder="请输入"   clearable>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="2017年纳税总额" prop="preYearRatepay">
              <label slot="label" class="label-txt">{{this.nowYear}}年纳税总额</label>
              <el-input v-model.number="declareAwardData.preYearRatepay"  placeholder="请输入"   clearable>
                <i slot="suffix">万元</i>
              </el-input>
            </el-form-item>
          </el-col>
        </div>
      </div>
      <div class="base-information">
        <h4>党建工作基本情况</h4>
        <div class="base-content">
          <el-col :span="8">
            <el-form-item class="is-required  card_multiple" label="党组织成立时间" prop="orgCreateTime">
              <el-date-picker
                v-model="declareAwardData.orgCreateTime"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="所属党组织" prop="orgId.data">
              <el-input v-model="declareAwardData.orgId.data" placeholder="请输入"   @click.native="getTree"
                        clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  class="is-required" label="党员数" prop="memberNum">
              <el-input v-model.number="declareAwardData.memberNum"  placeholder="请输入"   clearable>
                <i slot="suffix">名</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="党组织设置" prop="orgSet.key">
              <el-radio-group v-model="declareAwardData.orgSet.data" v-for="item in doubleSixWellAddList">
                <el-radio  :label="item.name" ></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="是否建立工会" prop="isCreateParty">
              <el-radio-group v-model="declareAwardData.isCreateParty">
                <el-radio  label="是"></el-radio>
                <el-radio  label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="是否建立团组织" prop="isCreateTeam">
              <el-radio-group v-model="declareAwardData.isCreateTeam">
                <el-radio  label="是"></el-radio>
                <el-radio  label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="党组织活动场所面积" prop="activityArea">
              <el-input v-model.number="declareAwardData.activityArea"  placeholder="请输入"   clearable>
                <i slot="suffix">平米</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required card_multiple" label="哪年被命名为市级 “双强六好”非公企 业党组织" prop="awardedYear">
              <el-date-picker
                v-model="declareAwardData.awardedYear"
                type="date"
                placeholder="请选择"
                value-format="yyyy-MM-dd">
              </el-date-picker>
<!--              <el-input v-model.number="declareAwardData.awardedYear"  placeholder="请输入"   clearable></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="is-required card_multiple" label="开展党建工作的先进事迹" prop="advancedDeed">
              <el-input v-model="declareAwardData.advancedDeed" type="textarea"
                        :autosize='{ minRows: 5, maxRows:5}'
                        resize="none"
                        maxlength="500"
                        show-word-limit placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item  class="is-required card_multiple" label="党组织和党员、所在企业获得表彰情况" prop="recognition" >
              <el-input v-model="declareAwardData.recognition" type="textarea"
                        :autosize='{ minRows: 5, maxRows:5}'
                        resize="none"
                        maxlength="500"
                        show-word-limit  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="is-required" label="申报人" prop="declarant">
              <el-input v-model="declareAwardData.declarant"  placeholder="请输入"   clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
<!--            <el-form-item class="is-required" label="联系方式" prop="contact">-->
<!--              <el-input v-model.number="declareAwardData.contact" maxlength="13"  placeholder="请输入"-->
<!--                        clearable></el-input>-->
<!--            </el-form-item>-->
            <base-telephone v-model="declareAwardData.contact" :phone="'contact'" :isImport="true"/>
          </el-col>
        </div>
      </div>

      <el-col :span="24" class="tac">
        <el-button class="js-button" @click="goBtn()">取消</el-button>
        <el-button type="primary" @click="save()">提交</el-button>
      </el-col>

    </el-form>
    <!--所属党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>
    <!-- 地图弹出框-->
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import {getNonRecordAdd,getsocialOrgName,getOrgSetDisc,getNonRecordDetail} from "@/api/backstage/party/priority/awards/awards.js"
    import VDistpicker from 'v-distpicker'
    import BMap from '@/components/BMap/BMap'
    export default {
        components: {VDistpicker,BMap},
        name: 'socialNonAdd',
        props: {
            params: {
                type: Object,
                default: {}
            },
            type:{
                type: String,
                default: ''
            }
        },
        data () {
            return {
                loading:true,//加载遮罩条件
                placeholders: {//地址
                    province: '安徽省',
                    city: '合肥市',
                    area:'蜀山区' ,
                },
                isSubmit:'是',
                doubleSixWellAddList:[],
                companyNameList:[],//企业名称
                declareAwardData:{
                    companyId:{ //社会组织名称
                        data:'',
                        key:''
                    },
                    companyAddress:'',//地址
                    addressCoordinates:'',//详细地址
                    legalPerson:'', //法人代表姓名
                    politicsStatus:'',//政治面貌
                    secretary:'',//党组织书记姓名
                    pluralistic:'',//兼职任务
                    empAmount:'',//职工人数
                    totalAssets:'', //资产总额
                    preYearRevenue:'',//上一年度营收总额(万元)
                    preYearRatepay:'',//上一年度纳税总额
                    awardedYear:'', //哪年被命名为市级 “双强六好”非公企 业党组织
                    orgCreateTime:'',//党组织成立时间
                    orgId:{  //所属党组织
                        data:'',
                        key:''
                    },
                    memberNum:'',//党员数
                    orgSet:{  //党组织设置
                        data:'',
                        key:''
                    },
                    isCreateParty:'',//是否建立工会
                    isCreateTeam:'',//是否建立团组织
                    activityArea:'',//党组织活动场所面积
                    workExpenditure:'',//党组织工作经费
                    developMemberNum:'',//发展党员数
                    partyActivelyNum:'', //培养入党积极分子数
                    advancedDeed:'',//开展党建工作的先进事迹
                    recognition:'',//党组织和党员、所在企业获得表彰情况
                    declarant:'',//申报人
                    contact:'',//联系方式
                },
                baseList:[],//基本信息
                node: { // 必填项判断
                    'companyId.key':{
                        required: true,
                        message: "请选择企业名称",
                        trigger: "change"
                    },
                    'companyAddress':{
                        required: true,
                        message: "请选择地址",
                        trigger: "blur"
                    },
                    'legalPerson':{
                        required: true,
                        message: "请输入法人代表姓名",
                        trigger: "blur"
                    },
                    'politicsStatus':{
                        required: true,
                        message: "请输入政治面貌",
                        trigger: "blur"
                    },
                    'secretary':{
                        required: true,
                        message: "请输入党组织书记姓名",
                        trigger: "blur"
                    },
                    'pluralistic':{
                        required: true,
                        message: "请输入兼职任务",
                        trigger: "blur"
                    },
                    'empAmount':{
                        required: true,
                        message: "请输入职工人数",
                        trigger: "blur"
                    },
                    'totalAssets':{
                        required: true,
                        message: "请输入资产总额",
                        trigger: "blur"
                    },
                    'preYearRevenue':{
                        required: true,
                        message: "请输入营收总额",
                        trigger: "blur"
                    },
                    'preYearRatepay':{
                        required: true,
                        message: "请输入纳税总额",
                        trigger: "blur"
                    },
                    'orgCreateTime':{
                        required: true,
                        message: "请输入党组织成立时间",
                        trigger: "blur"
                    },
                    'orgId.data':{
                        required: true,
                        message: "请选择所属党组织",
                        trigger: "blur"
                    },
                    'memberNum':{
                        required: true,
                        message: "请输入党员数",
                        trigger: "blur"
                    },
                    'orgSet.data':{
                        required: true,
                        message: "请选择党组织设置",
                        trigger: "blur"
                    },
                    'isCreateParty':{
                        required: true,
                        message: "请选择是否建立工会",
                        trigger: "blur"
                    },
                    'isCreateTeam':{
                        required: true,
                        message: "请选择是否建立团组织",
                        trigger: "blur"
                    },
                    'activityArea':{
                        required: true,
                        message: "请输入党组织活动场所面积",
                        trigger: "blur"
                    },
                    'awardedYear':{
                        required: true,
                        message: "请输入哪年被命名为市级 “双强六好”非公企 业党组织",
                        trigger: "blur"
                    },
                    'workExpenditure':{
                        required: true,
                        message: "请输入党组织工作经费",
                        trigger: "blur"
                    },
                    'developMemberNum':{
                        required: true,
                        message: "请输入发展党员数",
                        trigger: "blur"
                    },
                    'partyActivelyNum':{
                        required: true,
                        message: "请输入培养入党积极分子数",
                        trigger: "blur"
                    },
                    'advancedDeed':{
                        required: true,
                        message: "请输入开展党建工作的先进事迹",
                        trigger: "blur"
                    },
                    'recognition':{
                        required: true,
                        message: "请输入党组织和党员、所在企业获得表彰情况",
                        trigger: "blur"
                    },
                    'declarant':{
                        required: true,
                        message: "请输入申报人",
                        trigger: "blur"
                    },
                    'contact':{
                        required: true,
                        pattern: /^1\d{10}$|^([0-9]{3,4}-)?[0-9]{7,8}$/,
                        message: '请输入正确的联系方式',
                        trigger: 'blur'
                    },
                },
                results:{//审核结果
                    data:'通过',
                    key:''
                },
                defaultDate:'',//当前时间
                nowYear:'',
                mapVisible: false, // 是否打开地图
                typePrize:this.type
            }
        },
        created(){
            if(this.params.id){
                this.getDetail();
            }
            this.getDict();
            this.getSetDict();
            this.defaultDate = this.getNowTime();
            this.nowYear = this.formatNowTime(this.defaultDate);
            this.loading = false;
        },
        methods: {
            //获取详情信息
            getDetail(){
                let param = {
                    id:this.params.id
                }
                getNonRecordDetail(param).then(respone => {
                    const res = respone
                    this.typePrize = res.declareAwards.key
                    this.declareAwardData.companyId.key = res.enterpriseId.key,
                        this.placeholders.province = res.enterpriseAddress.split("-")[0],
                        this.placeholders.city = res.enterpriseAddress.split("-")[1],
                        this.placeholders.area = res.enterpriseAddress.split("-")[2],
                        this.declareAwardData.companyAddress = res.enterpriseAddress.split("-")[3],//地址
                        this.declareAwardData.legalPerson = res.legalPerson,//法人代表姓名
                        this.declareAwardData.politicsStatus = res.politicsStatus,//政治面貌
                        this.declareAwardData.secretary = res.secretary,//党组织书记姓名
                        this.declareAwardData.pluralistic = res.pluralistic,//兼职任务
                        this.declareAwardData.empAmount = res.empAmount,//职工人数
                        this.declareAwardData.totalAssets = res.totalAssets, //资产总额
                        this.declareAwardData.preYearRevenue = res.preYearRevenue,//上一年度营收总额(万元)
                        this.declareAwardData.preYearRatepay = res.preYearRatepay,//上一年度纳税总额
                        this.declareAwardData.orgCreateTime = res.orgCreateTime,//党组织成立时间
                        this.declareAwardData.orgId.key = res.orgId.key,  //所属党组织
                        this.declareAwardData.orgId.data = res.orgId.data,  //所属党组织
                        this.declareAwardData.memberNum = res.memberNum,//党员数
                        this.declareAwardData.orgSet.key = res.orgSet.key,  //党组织设置
                        this.declareAwardData.orgSet.data = res.orgSet.data,  //党组织设置
                        this.declareAwardData.isCreateParty = res.isCreateParty,//是否建立工会
                        this.declareAwardData.isCreateTeam = res.isCreateTeam,//是否建立团组织
                        this.declareAwardData.activityArea = res.activityArea,//党组织活动场所面积
                        this.declareAwardData.workExpenditure = res.workExpenditure,//党组织工作经费
                        this.declareAwardData.developMemberNum = res.developMemberNum,//发展党员数
                        this.declareAwardData.partyActivelyNum = res.partyActivelyNum, //培养入党积极分子数
                        this.declareAwardData.awardedYear = res.awardedYear, //哪年被命名为市级 “双强六好”非公企 业党组织
                        this.declareAwardData.advancedDeed = res.advancedDeed,//开展党建工作的先进事迹
                        this.declareAwardData.recognition = res.recognition,//党组织和党员、所在企业获得表彰情况
                        this.declareAwardData.declarant = res.declarant,//申报人
                        this.declareAwardData.contact = res.contact//联系方式
                }).finally(() =>{
                    this.loading = false;
                })
            },
            // 打开地图
            toMap(){
                this.mapVisible = true
            },
            // 关闭地图事件
            mapClose(data) {
                this.mapVisible = false
                if(data){
                    this.declareAwardData.companyAddress = data.address
                    this.declareAwardData.addressCoordinates = data.coordinates
                    this.placeholders = {
                        province: data.province,
                        city: data.city,
                        area: data.district ,
                    }
                }
            },
            //返回列表页
            goBtn(){
                this.$confirm('是否保存当前页面数据？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isSubmit = '否'
                    this.saveData()
                }).catch(() => {
                    this.$emit('handleSwitch', {name: 'Index'})
                });
            },
            //企业名称
            getDict(){
                let params = {
                    nature:1
                }
                getsocialOrgName(params).then(response =>{
                    const res = response;
                    this.companyNameList = res;
                })
            },
            //党组织设置
            getSetDict(){
                let params = {
                    type:'doubleSixWellAdd'
                }
                getOrgSetDisc(params).then(response =>{
                    const res = response;
                    this.doubleSixWellAddList = res;
                })
            },
            //获取企业或者社会组织名称之后的整个对象值
            companyChange(value){
                for(var i=0;i<this.companyNameList.length;i++){
                    if(value==this.companyNameList[i].id){
                        this.declareAwardData.legalPerson = this.companyNameList[i].legalPerson;
                        this.declareAwardData.secretary = this.companyNameList[i].secretary.data;
                        this.declareAwardData.memberNum = this.companyNameList[i].memberNum;
                        this.declareAwardData.orgSet.data = this.companyNameList[i].category.data;
                        this.declareAwardData.orgSet.key = this.companyNameList[i].category.key;
                        this.declareAwardData.approvalDate = this.companyNameList[i].approvalDate;
                        this.declareAwardData.orgId.data = this.companyNameList[i].orgId.data;
                        this.declareAwardData.orgId.key = this.companyNameList[i].orgId.key;
                        this.declareAwardData.isCreateTeam = this.companyNameList[i].isYouthLeague.data;
                        this.declareAwardData.isCreateParty = this.companyNameList[i].isUnion.data;
                        this.declareAwardData.workExpenditure = this.companyNameList[i].workingFunds;
                        this.declareAwardData.developMemberNum = this.companyNameList[i].devMemberNum;
                        this.declareAwardData.partyActivelyNum = this.companyNameList[i].activeMemberNum;
                    }
                }
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
            //时间转化年月日
            formatNowTime(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m > 9 ? m : '0' + m;
                return y;
            },
            //时间转化年月日
            formatDateTime(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m > 9 ? m : '0' + m;
                d = d > 9 ? d : '0' + d;
                return y+'-'+m+'-'+d;
            },
            //家庭地址-省
            onChangeProvince(province){
                this.placeholders.province =  province.value;
            },
            //家庭地址-市
            onChangeCity(city){
                this.placeholders.city =  city.value
            },
            //家庭地址-区
            onChangeArea(area){
                this.placeholders.area =  area.value
                // this.$refs['refForm'].clearValidate(['address']);
            },
            //选择的上级党组织回调
            getParentId(val){
                this.declareAwardData.orgId.key = ""
                this.declareAwardData.orgId.data = ""
                if(val != ""){
                    this.declareAwardData.orgId.data = val.data
                    this.declareAwardData.orgId.key = val.key
                    this.$refs['refForm'].clearValidate(['orgId.data']);
                }
            },
            //打开上级党组织弹窗
            getTree(){
                this.$refs['orgTree'].show()
            },
            //保存数据
            saveData(){
                if(this.declareAwardData.orgCreateTime === ''){
                    this.declareAwardData.orgCreateTime =""
                }
                let params = {
                    // id: this.params.id,
                    // doubleSixWellSaveDTO:{
                    declareAwards:{key:this.typePrize},
                    isSubmit:this.isSubmit,
                    enterpriseId:{key:this.declareAwardData.companyId.key},
                    enterpriseAddress:this.placeholders.province+'-'+ this.placeholders.city+'-'
                        +this.placeholders.area+'-'+ this.declareAwardData.companyAddress,//地址
                    legalPerson:this.declareAwardData.legalPerson,//法人代表姓名
                    politicsStatus:this.declareAwardData.politicsStatus,//政治面貌
                    secretary:this.declareAwardData.secretary,//党组织书记姓名
                    pluralistic:this.declareAwardData.pluralistic,//兼职任务
                    empAmount:this.declareAwardData.empAmount,//职工人数
                    totalAssets:this.declareAwardData.totalAssets, //资产总额
                    preYearRevenue:this.declareAwardData.preYearRevenue,//上一年度营收总额(万元)
                    preYearRatepay:this.declareAwardData.preYearRatepay,//上一年度纳税总额
                    orgCreateTime:this.declareAwardData.orgCreateTime,//党组织成立时间
                    orgId:{key:this.declareAwardData.orgId.key},  //所属党组织
                    memberNum:this.declareAwardData.memberNum,//党员数
                    orgSet:{key:this.declareAwardData.orgSet.key},  //党组织设置
                    isCreateUnions:this.declareAwardData.isCreateParty,//是否建立工会
                    isCreateTeam:this.declareAwardData.isCreateTeam,//是否建立团组织
                    activityArea:this.declareAwardData.activityArea,//党组织活动场所面积
                    awardedYear:this.declareAwardData.awardedYear,//哪年被命名为市级 “双强六好”非公企 业党组织
                    workExpenditure:this.declareAwardData.workExpenditure,//党组织工作经费
                    developMemberNum:this.declareAwardData.developMemberNum,//发展党员数
                    partyActivelyNum:this.declareAwardData.partyActivelyNum, //培养入党积极分子数
                    advancedDeed:this.declareAwardData.advancedDeed,//开展党建工作的先进事迹
                    recognition:this.declareAwardData.recognition,//党组织和党员、所在企业获得表彰情况
                    declarant:this.declareAwardData.declarant,//申报人
                    contact:this.declareAwardData.contact.toString(),//联系方式
                }
                getNonRecordAdd(params).then(response => {
                    const res = response
                    this.$message(this.successTip())
                    this.$emit('refresh')
                    this.$emit('handleSwitch', {name: 'socialNonDetail',params:res})  //详情
                })
            },
            //提交并下载
            save(){
                this.$refs['refForm'].validate((valid) => {
                    if (!valid) {
                        setTimeout(()=>{
                            const isError= document.getElementsByClassName('is-error')
                            isError.length && isError[0].querySelector('input').focus()
                        },100)
                        return // 表单必填项判断
                    } else {
                        let params = {
                            // id: this.params.id,
                            // doubleSixWellSaveDTO:{
                            declareAwards:{key:this.typePrize},
                            isSubmit:this.isSubmit,
                                enterpriseId:{key:this.declareAwardData.companyId.key},
                                enterpriseAddress:this.placeholders.province+'-'+ this.placeholders.city+'-'
                                    +this.placeholders.area+'-'+ this.declareAwardData.companyAddress,//地址
                                legalPerson:this.declareAwardData.legalPerson,//法人代表姓名
                                politicsStatus:this.declareAwardData.politicsStatus,//政治面貌
                                secretary:this.declareAwardData.secretary,//党组织书记姓名
                                pluralistic:this.declareAwardData.pluralistic,//兼职任务
                                empAmount:this.declareAwardData.empAmount,//职工人数
                                totalAssets:this.declareAwardData.totalAssets, //资产总额
                                preYearRevenue:this.declareAwardData.preYearRevenue,//上一年度营收总额(万元)
                                preYearRatepay:this.declareAwardData.preYearRatepay,//上一年度纳税总额
                                orgCreateTime:this.formatDateTime(this.declareAwardData.orgCreateTime),//党组织成立时间
                                orgId:{key:this.declareAwardData.orgId.key},  //所属党组织
                                memberNum:this.declareAwardData.memberNum,//党员数
                                orgSet:{key:this.declareAwardData.orgSet.key},  //党组织设置
                                isCreateUnions:this.declareAwardData.isCreateParty,//是否建立工会
                                isCreateTeam:this.declareAwardData.isCreateTeam,//是否建立团组织
                                activityArea:this.declareAwardData.activityArea,//党组织活动场所面积
                                awardedYear:this.declareAwardData.awardedYear,//哪年被命名为市级 “双强六好”非公企 业党组织
                                workExpenditure:this.declareAwardData.workExpenditure,//党组织工作经费
                                developMemberNum:this.declareAwardData.developMemberNum,//发展党员数
                                partyActivelyNum:this.declareAwardData.partyActivelyNum, //培养入党积极分子数
                                advancedDeed:this.declareAwardData.advancedDeed,//开展党建工作的先进事迹
                                recognition:this.declareAwardData.recognition,//党组织和党员、所在企业获得表彰情况
                                declarant:this.declareAwardData.declarant,//申报人
                                contact:this.declareAwardData.contact.toString(),//联系方式
                        }
                        getNonRecordAdd(params).then(response => {
                            const res = response
                            this.$message(this.successTip())
                            this.$emit('refresh')
                            this.$emit('handleSwitch', {name: 'socialNonDetail',params:res})  //详情
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
  .declare-detail {
    background: #eee;
    top: 0px;
  }
  .content {
    margin-bottom: 20px;
  }
  .input-unit {
    position: absolute;
    top: 2%;
    right: 1%;
    color: #555555;
    font-size: 14px;
    display: table-cell;
    white-space: nowrap;
    /*padding: 7px 10px;*/
  }
  .content-title {
    margin: 20px 20px 0 20px ;
    color: #3D9EFF;
    font-size: 17px;
    line-height: 27px; ;
  }
  .el-form /deep/{
    background: #fff;
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
  .card_line {
    line-height: 20px;
  }
  .card_multiple /deep/.el-form-item__label{
    line-height: 20px;
  }
  .select-list /deep/ .distpicker-address-wrapper label{
    width:130px;
    height:36px;
    line-height:36px;
  }
  .select-list /deep/ .distpicker-address-wrapper label select{
    width:100%;
    padding: 0;
  }
  .select-list /deep/ .el-form-item__content{
    display:flex;
    align-items:center;
  }
  .select-list /deep/ .distpicker-address-wrapper select{
    height:36px;
    line-height:36px;
  }
</style>
