<template>
  <div class="add-content" v-loading="loading">
    <el-form ref="ruleForm" :model="formData" :rules="node" label-width="120px">
      <div class="base-information">
        <h4>个人基本信息</h4>
        <div class="base-content">
          <div class="base-content-per">
            <div class="base-left">
              <el-col :span="12">
                <el-form-item class="is-required" label="姓名" prop="name" ref="name">
                  <el-input v-model="formData.name" placeholder="请输入" maxlength="100"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true" ref="phone" @blurInput="onInputBlurphone"/>
              </el-col>
              <el-col :span="12">
                <el-form-item  class="is-required" label="身份证号码" prop="idCode" ref="idCode">
                  <el-input  v-model="formData.idCode"  placeholder="请输入" maxlength="18"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="nation.key" ref="nation.key">
                  <el-select
                    v-model="formData.nation.key"
                    value-key="id"
                    filterable
                    placeholder="请选择"
                    style="width:100%;"
                    clearable>
                    <el-option
                      v-for="(item, index) in dicts.NATION"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="出生日期" prop="birthday" ref="birthday">
                  <el-date-picker
                    v-model="formData.birthday"
                    type="date"
                    disabled
                    placeholder="性别与出生日期输入身份证后自动显示"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="select-list1">
                <el-form-item label="籍贯" prop="province" ref="province">
                  <v-distpicker :province="placeholdersjg.province" :city="placeholdersjg.city" :area="placeholdersjg.area" style="display:flex;justify-content:space-between"   @province="onChangeProvincejg" @city="onChangeCityjg" @area="onChangeAreajg"></v-distpicker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况" prop="marriageCondition.key"  ref="marriageCondition">
                  <el-select
                    v-model="formData.marriageCondition.key"
                    value-key="id"
                    filterable
                    placeholder="请选择"
                    style="width:100%;"
                    clearable>
                    <el-option
                      v-for="(item, index) in dicts.IS_MARRY"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="is-required" label="状态" prop="state.key" ref="state.key">
                  <el-select
                    v-model="formData.state.key"
                    value-key="id"
                    filterable
                    placeholder="请选择"
                    style="width:100%;"
                    clearable>
                    <el-option
                      v-for="(item, index) in dicts.LDLX"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
            <div class="base-right">
              <el-col :span="24" class="person">
                <el-form-item label="" prop="">
                  <div class='person-img'>
                    <div class="img-content">
                      <img class="iconperson" v-if="imageUrl==''" src="@/assets/page/icon-person.png">
                      <img class="personimg"  v-else :src="imageUrl">
                    </div>
                    <el-upload
                      ref="commitment"
                      :action="action"
                      :data="otherData"
                      :headers="headers"
                      :auto-upload="true"
                      :before-upload="beforeUpload"
                      :on-success="successFile"
                      :on-error="handleError"
                      :on-change="handleChange"
                      accept=".jpg,.jpeg,.png,.gif"
                    >
                      <el-button size="small" type="primary">上传图片</el-button>
                    </el-upload>
                  </div>
                  <span class="warning"><i>注：</i>请上传两寸照片比例的证件照</span>
                </el-form-item>
              </el-col>
            </div>
          </div>
          <div class="base-bottom">
            <el-col :span="8">
              <el-form-item label="性别" prop="sex.data">
                <el-radio-group  v-model="formData.sex.data">
                  <el-radio disabled label="男"></el-radio>
                  <el-radio disabled label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="贫困户" prop="isPoor.data">
                <el-radio-group v-model="formData.isPoor.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="marl-20">
              <el-form-item label="农民工" prop="isFarmerWork.data">
                <el-radio-group v-model="formData.isFarmerWork.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="退役军人" prop="isVeteran.data">
                <el-radio-group v-model="formData.isVeteran.data">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label="台湾籍" prop="nativesTaiwan.data">
                <el-radio-group v-model="formData.nativesTaiwan.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="7"  class="marl-20">
              <el-form-item label="发展党员性质" prop="developNature.key">
                <el-radio-group v-model="formData.developNature.key">
                  <el-radio  label="2272058126461460531">内部发展</el-radio>
                  <el-radio  label="2272058126461460534">外部转入</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="24" class="select-list">
              <el-form-item label="家庭地址" prop="province">
                <v-distpicker  :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display: flex;"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                <el-input v-model="formData.homeDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
                <img class="map-img" src="@/assets/page/icon-map.png"  @click="toMap('honme')">
              </el-form-item>
            </el-col>

          </div>
        </div>
      </div>

      <div class="base-information">
        <h4>学历信息</h4>
        <div class="base-content">
          <el-col :span="8">
            <el-form-item class="is-required" label="学历" prop="djEducationSaveDTO.education.key" ref="djEducationSaveDTO.education.key">
              <el-select
                v-model="formData.djEducationSaveDTO.education.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                  v-for="(item, index) in dicts.EDUCATION"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业院校" prop="djEducationSaveDTO.graduateSchool">
              <el-input v-model="formData.djEducationSaveDTO.graduateSchool" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="学位" prop="djEducationSaveDTO.degree.key">
              <el-select
                v-model="formData.djEducationSaveDTO.degree.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                  v-for="(item, index) in dicts.XW"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="专业" prop="djEducationSaveDTO.major">
              <el-input v-model="formData.djEducationSaveDTO.major" placeholder="请输入" maxlength="100"  clearable></el-input>
            </el-form-item>
          </el-col>
        </div>
      </div>

      <div class="base-information">
        <h4>单位信息</h4>
        <div class="base-content">
          <el-col :span="8">
            <el-form-item class="is-required" label="工作单位" prop="djUnitSaveDTO.company" ref="djUnitSaveDTO.company">
              <el-input placeholder="请输入工作单位" v-model="formData.djUnitSaveDTO.company" maxlength="100" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class='select-list text'>
            <el-form-item label="从事专业技术职务" prop="djUnitSaveDTO.duty">
              <el-input v-model="formData.djUnitSaveDTO.duty" placeholder="请输入" maxlength="100"  clearable></el-input>
                <img class="map-img" src="@/assets/page/icon-wh.png" @click="handle">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业类型" prop="djUnitSaveDTO.entType.key">
              <el-select
                v-model="formData.djUnitSaveDTO.entType.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                  v-for="(item, index) in dicts.WORK_UNIT"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工作岗位" prop="djUnitSaveDTO.jobs.key">
              <el-select
                v-model="formData.djUnitSaveDTO.jobs.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                  v-for="(item, index) in dicts.WORK_POST"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="select-list">
            <el-form-item label="单位地址" prop="province">
              <v-distpicker  :province="placeholdersdw.province" :city="placeholdersdw.city" :area="placeholdersdw.area" style="display:flex;justify-content:space-between"  @province="onChangeProvincedw" @city="onChangeCitydw" @area="onChangeAreadw"></v-distpicker>
              <el-input v-model="formData.djUnitSaveDTO.unitDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
              <img class="map-img" src="@/assets/page/icon-map.png" @click="toMap('work')">
            </el-form-item>
          </el-col>
        </div>
      </div>

      <el-col :span="24" class="tac">
        <el-button v-if="type" @click="open()">移至历史人员库</el-button>
        <el-button class="js-button" @click="close">取消</el-button>
        <el-button type="primary" @click="nextFun">下一步</el-button>
      </el-col>

    </el-form>

    <!--移至历史人员库弹窗-->
    <move-historical-library ref="refHistory" @refresh="close"/>

    <!-- 地图弹出框-->
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"/>

  </div>
</template>

<script>
  import db from "@/utils/localstorage"
  import {Base64} from 'js-base64'
  import commonReq  from "@/api/public/commonReq.js"
  import {checkIdCodeBool} from "@/utils/my-validate";
  import VDistpicker from 'v-distpicker'
  import {getDevelopAdd,getDevelopUpdate } from "@/api/backstage/party/development/documentary/documentary.js"
  import {getHistoryDetail} from "@/api/backstage/party/basic/history/history.js";
  import MoveHistoricalLibrary from '../../../basic/manage/components/move-historical-library'//移至历史人员库弹窗
  import BMap from '@/components/BMap/BMap'

  export default {
    name: "DocumentaryAdd",
    components: {
      VDistpicker,
      MoveHistoricalLibrary,
      BMap
    },
    props:{
      params: {
        type: Object,
        default: {}
      },
      type: {
        type: String
      }
    },
    data(){
      return{
        loading:true,
        formData:{//表单数据
          id:"",
          name:"",//姓名
          phone:"",//联系方式
          nation:{//民族
            key:"",
            data:""
          },
          idCode:"",//身份证号码
          birthday:"",//出生日期
          natives:"",//籍贯
          marriageCondition:{//婚姻状况
            key:'',
            data:'',
          },
          state:{//状态
            key:'',
            data:''
          },
          sex: {//性别
            key:'',
            data:''
          },
          isFarmerWork:{//是否农民工(字典表)
            data:'否',
            key:'1249242903696375808'
          },
          isPoor:{//贫困户
            data:'否',
            key:'1249242903696375808'
          },
          isVeteran:{//是否退役军人
            data:'否',
            key:'1249242903696375808'
          },
          nativesTaiwan:{//台湾籍
            data:'否',
            key:'1249242903696375808'
          },
          developNature:{// 发展性质
            data:'内部发展',
            key:'2272058126461460531'
          },
          homeAddress:"",//家庭住址
          homeDetailAddress:"",//家庭详细地址
          addressCoordinates:'',// 家庭坐标
          djEducationSaveDTO:{//学历信息
            education:{//学历
              key:'',
              data:''
            },
            graduateSchool:"",//毕业院校
            degree:{//学位
              data:'',
              key:''
            },
            major:'',//专业
          },
          djUnitSaveDTO:{//单位信息
            addressCoordinates:'',// 单位坐标
            company:"",//工作单位
            duty:"",//从事专业技术职务
            entType:{//企业类型
              key:'',
              data:''
            },
            jobs:{//工作岗位
              key:'',
              data:''
            },
            unitAddress:"",//单位地址：省-市-区
            unitDetailAddress:"",//单位地址（详细）
          }
        },
        placeholders: {//家庭地址
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        },
        placeholdersjg: {//籍贯
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        },
        placeholdersdw: {//单位地址
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        },
        dicts: {//字典
          NATION: {},//民族
          IS_MARRY:{},//婚姻状态
          LDLX: {},//状态
          XW:{},//学位
          EDUCATION:{},//学历
          WORK_POST:{},//工作岗位
          SEX:{},//性别
          WORK_UNIT:{},//企业
          ty_is:{},

        },
        node: { // 必填项判断
          'name':[{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          'state.key':[{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
          'developNature.key':[{
            required: true,
            message: '请选择发展性质',
            trigger: 'change'
          }],
          'djEducationSaveDTO.education.key':[{
            required: true,
            message: '请选择学历',
            trigger: 'change'
          }],
          'djUnitSaveDTO.company':[{
            required: true,
            message: '请填写工作单位',
            trigger: 'blur'
          }],
          'idCode':[{
            required: true,
            validator: this.checkIdCode,
            trigger: 'blur'
          }]
        },
        otherData:{
          bizId: '',
          bizType: "develop",
          isSingle: false
        },
        personType:0,//党员类型
        orgId:{//接收组织
          key:'',
          data:'',
        },
        stepStatus:{//流程id
          key:"",
          data:''
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
        imageUrl:'',//头像图片地址
        mapVisible: false, // 是否打开地图
        isMapType: 'honme',//home: 点击的是家庭地址；work: 点击的是单位地址

        phoneOnly:true ,// 手机号码是否唯一,true: 唯一；false: 不唯一
        isClickSave:false, // 是否点击了保存按钮
      }
    },
    computed: {
      headers() {
        return {
          token: 'Bearer ' + db.get("TOKEN", ""),
          tenant: db.get("TENANT", "") || "",
          Authorization: `Basic ${Base64.encode(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)}`,
          ContentType: `multipart/form-data`
        };
      }
    },
    activated(){

      this.$nextTick(function(){
        this.$refs['ruleForm'].resetFields()
      })

      this.placeholders = {//家庭地址
        province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
      }
      this.formData.homeDetailAddress = ''

      this.placeholdersjg = {//籍贯
        province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
      }

      this.placeholdersdw = {//单位地址
        province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
      }
      this.formData.djUnitSaveDTO.unitDetailAddress = ''

      this.imageUrl = ''
      this.getCommDict()
      if(this.type != undefined){
        this.getDetail()
      }else{
        this.loading = false
        this.partyUid()
      }
    },
    mounted(){
      this.getCommDict()
      if(this.type != undefined){
        this.getDetail()
      }else{
        this.loading = false
        this.partyUid()
      }
    },
    methods:{
      //手机号验证 唯一性
      onInputBlurphone(){
        this.phoneOnly = false
        if(this.formData.phone){
          let params = {
            memberId:this.formData.id,
            memberInfo:this.formData.phone
          }
          commonReq.getVerification(params).then(response =>{
            const res = response;
            if(res){
              this.formData.phone = ''
              this.$message.warning("该手机号已存在，请重新填写")
            }else{
              this.phoneOnly = true
              if(this.isClickSave){
                this.nextFun()
              }
            }
          })
        }
      },

      // 滚动到固定地方
      scrollView(object) {
        for (const i in object) {
          let dom = this.$refs[i]
          // 这里是针对遍历的情况（多个输入框），取值为数组
          if (Object.prototype.toString.call(dom) !== '[object Object]') {
            dom = dom[0]
          }
          // 第一种方法（包含动画效果）
          dom.$el.scrollIntoView({ // 滚动到指定节点
            // 值有start,center,end，nearest，当前显示在视图区域中间
            block: 'center',
            // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            behavior: 'smooth'
          })
          break // 因为我们只需要检测一项,所以就可以跳出循环了
        }
      },

      // 关闭地图事件
      mapClose(data) {
        this.mapVisible = false
        if(data){
          if(this.isMapType === 'honme'){
            this.formData.homeDetailAddress = data.address
            this.formData.addressCoordinates = data.coordinates

            this.placeholders = {
              province: data.province,
              city: data.city,
              area: data.district ,
            }
          }else if(this.isMapType === 'work'){
            this.formData.djUnitSaveDTO.unitDetailAddress = data.address
            this.formData.addressCoordinates = data.coordinates

            this.placeholdersdw = {
              province: data.province,
              city: data.city,
              area: data.district ,
            }
          }

        }
      },

      // 打开地图
      toMap(type){
        this.isMapType = type
        this.mapVisible = true
      },

      // 打开移至历史人员库弹框
      open(){
        let type='';
        if(this.formData.state.key!='1248614282589896704' && this.formData.state.key!='1248614438517342208'){
          type=1;
        }else{
          type=2;
        }
        for(var i=0;i<this.dicts.LDLX.length;i++){
          if(this.formData.state.key==this.dicts.LDLX[i].id){
            this.formData.state.data=this.dicts.LDLX[i].name
          }
        }
        this.$refs['refHistory'].show(type,this.formData.id,this.formData)
      },

      // 从事专业技术职务规则查看
      handle() {
          window.open(`${process.env.VUE_APP_IP_URL_PORT}/file/template/party/member/position.pdf`)
      },

      // 文件上传成功时的钩子
      successFile(response, file, fileList){
        const res = file
        if(res.response.code=='0'){
          this.imageUrl=file.response.data.url;
          this.$message.success('上传成功')
        }else{
          this.imageUrl=''
          this.$message.error(res.response.msg)
        }
        this.$refs.commitment.clearFiles();
      },

      // 覆盖上传
      handleChange(files, fileList){
        this.$refs['ruleForm'].clearValidate(['fileList']);
      },

      //  附件上传失败
      handleError(err, file, fileList) {
        this.$message.error("附件上传失败，请重试");
      },

      // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
      beforeUpload(file) {
        const isLtSize = file.size / 1024 / 1024 < 20;
        if (!isLtSize) {
          this.$message.error('上传附件大小不能超过 20MB!');
        }
        return isLtSize;
      },

      // 获取头像
      getFile(id){
        let params={
          bizIds: id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list[0].url){
              this.imageUrl = res[0].list[0].url
            }
          }
        }).finally(() =>{
          this.loading = false
        })
      },

      //获取详情
      getDetail(){
        let params = {
          id:this.type
        }
        getHistoryDetail(params).then(respone => {
          const res = respone
          this.otherData.bizId = res.id
          this.getFile(res.id)

          this.stepStatus = res.type
          if(res.type.data == "入党申请人"){
            this.personType = 1
          }else if(res.type.data == "积极分子"){
            this.personType = 2
          }else if(res.type.data == "发展对象"){
            this.personType = 3
          }else if(res.type.data == "预备党员"){
            this.personType = 4
          }else if(res.type.data == "正式党员"){
            this.personType = 5
          }else{
            this.personType = 0
          }

          this.orgId = {
            key:res.orgId.key,
            data:res.orgId.data
          }

          this.formData = {//表单数据
            id:res.id,
            name:res.name,//姓名
            phone:res.phone,//联系方式
            nation:{//民族
              key:res.nation.key,
              data:res.nation.data
            },
            idCode:res.idCode,//身份证号码
            birthday:res.birthday,//出生日期
            natives:res.natives,//籍贯
            marriageCondition:{//婚姻状况
              key:res.marriageCondition.key,
              data:res.marriageCondition.data,
            },
            state:{//状态
              key:res.state.key,
              data:res.state.data
            },
            sex: {//性别
              key:res.sex.key,
              data:res.sex.data
            },
            isPoor:{//贫困户
              key:res.isPoor.key,
              data:res.isPoor.data
            },
            isFarmerWork:{//农民工
              key:res.isFarmerWork.key,
              data:res.isFarmerWork.data
            },
            isVeteran:{//是否退役军人
              data:res.isVeteran.data,
              key:res.isVeteran.key
            },
            nativesTaiwan:{//台湾籍
              key:res.nativesTaiwan.key,
              data:res.nativesTaiwan.data
            },
            developNature:{// 发展性质
              key:res.developNature.key,
              data:res.developNature.data
            },
            homeAddress:res.homeAddress,//家庭住址
            homeDetailAddress:res.homeDetailAddress,//家庭详细地址
            djEducationSaveDTO:{//学历信息
              education:{//学历
                key:res.education.key,
                data:res.education.data
              },
              graduateSchool:res.graduateSchool,//毕业院校
              degree:{//学位
                data:res.degree.data,
                key:res.degree.key
              },
              major:res.major,//专业
            },
            djUnitSaveDTO:{//单位信息
              addressCoordinates:res.djUnitSaveDTO,// 单位地址坐标
              company:res.company,//工作单位
              duty:res.duty,//从事专业技术职务
              entType:{//企业类型
                key:res.entType.key,
                data:res.entType.data
              },
              jobs:{//工作岗位
                key:res.jobs.key,
                data:res.jobs.data
              },
              unitAddress:res.unitAddress,//单位地址：省-市-区
              unitDetailAddress:res.unitDetailAddress,//单位地址（详细）
            }
          }

          //家庭地址
          if(this.formData.homeAddress!='' && this.formData.homeAddress!=undefined && this.formData.homeAddress!=null && this.formData.homeAddress!='null'){
            let values =  this.formData.homeAddress.split('-')
            this.placeholders = {
              province :values[0],
              city:values[1],
              area:values[2],
            }
          }

          //籍贯
          if(this.formData.natives!='' && this.formData.natives!=undefined && this.formData.natives!=null && this.formData.natives!='null'){
            let valuesjg =  this.formData.natives.split('-')
            this.placeholdersjg = {
              province: valuesjg[0],
              city: valuesjg[1],
              area: valuesjg[2],
            }
          }

          //单位地址
          if(this.formData.djUnitSaveDTO.unitAddress!='' && this.formData.djUnitSaveDTO.unitAddress!=undefined && this.formData.djUnitSaveDTO.unitAddress!=null && this.formData.djUnitSaveDTO.unitAddress!='null') {
            let valuesdw = this.formData.djUnitSaveDTO.unitAddress.split('-')
            this.placeholdersdw = {
              province: valuesdw[0],
              city: valuesdw[1],
              area: valuesdw[2],
            }
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
      /**
       * @deprecated 身份证号码校验
       * @method checkIdCode
       * @param {string} value 身份证号码
       */
      checkIdCode(rule,value,callback){
        if (!value) {
          return callback(new Error('请输入身份证号码'));
        }else if(!checkIdCodeBool(value)){
          this.formData.birthday = '';
          this.formData.sex.data = '';
          return callback(new Error('请输入正确的身份证号码'));
        }else{
          this.showBirthdayAndSexByIdCode(value);
          callback();
        }
        callback();
      },
      /**
       * @deprecated 根据身份证自动回显生日与性别
       * @method showBirthdayAndSexByIdCode
       * @param {string} idCode 身份证号码
       */
      showBirthdayAndSexByIdCode(idCode){
        this.formData.birthday = idCode.substring(6, 10) + "-" + idCode.substring(10, 12) + "-" + idCode.substring(12, 14);
        this.formData.sex.data = parseInt(idCode.substr(16, 1)) % 2 === 1?'男':'女';
      },
      // 家庭地址-省
      onChangeProvince(province){
        this.placeholders.province =  province.value;
      },
      // 家庭地址-市
      onChangeCity(city){
        this.placeholders.city =  city.value
      },
      // 家庭地址-区
      onChangeArea(area){
        this.placeholders.area =  area.value
      },
      //籍贯-省
      onChangeProvincejg(province){
        this.placeholdersjg.province =  province.value;
      },
      // 籍贯-市
      onChangeCityjg(city){
        this.placeholdersjg.city =  city.value
      },
      // 籍贯-区
      onChangeAreajg(area){
        this.placeholdersjg.area =  area.value
      },

      // 单位地址-省
      onChangeProvincedw(province){
        this.placeholdersdw.province =  province.value
      },
      // 单位地址-市
      onChangeCitydw(city){
        this.placeholdersdw.city =  city.value
      },
      // 单位地址-区
      onChangeAreadw(area){
        this.placeholdersdw.area =  area.value
      },
      // 调用字典接口
      getCommDict(){
        let params = {
          types:['NATION','IS_MARRY','XW','EDUCATION','WORK_POST','SEX','WORK_UNIT',"MENBER_MTYP","ty_is"]
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.NATION = res.NATION;
          this.dicts.IS_MARRY = res.IS_MARRY;
          this.dicts.XW = res.XW;
          this.dicts.EDUCATION = res.EDUCATION;
          this.dicts.WORK_POST = res.WORK_POST;
          this.dicts.SEX=res.SEX
          this.dicts.WORK_UNIT=res.WORK_UNIT
          this.dicts.ty_is = res.ty_is
        })

        let para = {
          type:'memberSearchState'
        }

        if(this.type != undefined){
          para.type = 'memberAddState'
        }else{
          para.type = 'memberSearchState'
        }

        commonReq.getCustomDict(para).then(response =>{
          const res = response;
          this.dicts.LDLX = res;
        })

      },

      // 取消
      close(){
        this.$refs['ruleForm'].resetFields()
        this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})

      },

      // 下一步
      nextFun(){
        this.$refs['ruleForm'].validate((valid ,object)=> {
          if (!valid) {
            this.scrollView(object)
            return // 表单必填项判断
          }

          if(!this.phoneOnly){
            this.isClickSave = true
            return
          }

          this.loading = true
          //单选框
          for(let i=0;i<this.dicts.SEX.length;i++){
            if(this.formData.sex.data==this.dicts.SEX[i].name){
              this.formData.sex.key=this.dicts.SEX[i].id;
            }
          }
          for(var i=0;i<this.dicts.ty_is.length;i++){
            if(this.formData.nativesTaiwan.data==this.dicts.ty_is[i].name){
              this.formData.nativesTaiwan.key=this.dicts.ty_is[i].id;
            }
            if(this.formData.isFarmerWork.data==this.dicts.ty_is[i].name){
              this.formData.isFarmerWork.key=this.dicts.ty_is[i].id;
            }
            if(this.formData.isPoor.data==this.dicts.ty_is[i].name){
              this.formData.isPoor.key=this.dicts.ty_is[i].id;
            }

            if(this.formData.isVeteran.data==this.dicts.ty_is[i].name){
              this.formData.isVeteran.key=this.dicts.ty_is[i].id;
            }
          }

          this.formData.homeAddress='';
          this.formData.homeAddress=this.placeholders.province   + '-' + this.placeholders.city + "-" +this.placeholders.area
          this.formData.natives='';
          this.formData.natives=this.placeholdersjg.province   + '-' + this.placeholdersjg.city + "-" +this.placeholdersjg.area
          this.formData.djUnitSaveDTO.unitAddress='';
          this.formData.djUnitSaveDTO.unitAddress=this.placeholdersdw.province   + '-' + this.placeholdersdw.city + "-" +this.placeholdersdw.area

          if(this.type != undefined){
            if(this.formData.state.key!='1248614282589896704' && this.formData.state.key!='1248614438517342208'){
              this.edit()
            }else{
              this.loading = false
              for(var i=0;i<this.dicts.LDLX.length;i++){
                if(this.formData.state.key==this.dicts.LDLX[i].id){
                  this.formData.state.data=this.dicts.LDLX[i].name
                }
              }
              this.$refs['refHistory'].show(4,this.formData.id,this.formData)
            }
          }else{
            this.save()
          }
        })
      },

      // 保存
      save(){
        getDevelopAdd(this.formData).then(response =>{
          const  res = response
          this.$emit('handleSwitch', {name: 'JoinParty',params:res})
        }).finally(() =>{
          this.loading = false
        })
      },

      // 编辑
      edit(){
        getDevelopUpdate(this.formData).then(response =>{
          const  res = response//orgId 当前组织
          if(res.orgId == null){
            res.orgId = this.orgId
          }
          if(res.type == null){
            res.type = this.stepStatus
          }
          this.$emit('handleSwitch', {name: 'JoinParty',params:res,type:this.personType})
        }).finally(() =>{
          this.loading = false
        })
      }
    }
  }
</script>

<style scoped>
  .add-content{
    width:100%;
    border-radius:4px;
  }

  /deep/ .el-form-item__content {
    line-height: 36px;
  }
  .marl-20 /deep/ .el-form-item{
    margin-left:20px;
  }
  .select-list1 /deep/ .distpicker-address-wrapper label{
    width:130px;
    height:36px;
    line-height:36px;
  }
  .select-list1 /deep/ .distpicker-address-wrapper label select{
    width:100%;
    padding: 0;
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
  .select-list1 /deep/ .distpicker-address-wrapper select{
    height:36px;
    line-height:36px;
  }
  .select-list /deep/ .distpicker-address-wrapper select{
    height:36px;
    line-height:36px;
  }
  /*.img-content img{*/
    /*width:100%;*/
  /*}*/
  .text /deep/ .el-form-item__label{
    line-height:20px;
  }
  /*头像上传样式*/
  /*.person /deep/ .el-form-item__content{*/
    /*display:flex;*/
    /*flex-flow:wrap;*/
    /*flex-direction: column;*/
    /*text-align: center;*/
  /*//justify-content:flex-start;*/
  /*//align-items:flex-end;*/
  /*}*/
  .person /deep/ .el-form-item__content{
    display:flex;
    flex-flow: nowrap;
    justify-content:flex-start;
    align-items:flex-end;
    margin-left:92px!important;
  }
  .person-img{
    margin: 0;
    display:inline-block;
    width:142px;
    background: #F9F9F9;
    border: 1px solid #CCCCCC;
    overflow:hidden;
    border-radius:4px;
  //margin-right:10px;
  }
  .img-content{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 142px;
    height: 156px;
    overflow:hidden;
    border:none;
  }
  .person-img /deep/ .el-button--primary{
    padding: 10px 15px;
    width:142px;
    background:#D6EBFF;
    border-color:#D6EBFF;
    color:#3399FF;
    font-size:18px;
    margin-right:0;
  }
  .person-img /deep/ .el-upload-list{
    display:none;
  }

  .warning{
    padding-left:14px;
    line-height: 1.2;
    width: calc(100% - 142px);
    text-align:left;
  }
  .img-content .personimg{
    width:100%;
  }
  .iconperson{
    width:62px;
    height:62px;
  }
</style>
