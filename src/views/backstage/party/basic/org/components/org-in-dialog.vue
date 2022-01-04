<template>
  <el-dialog :visible.sync="visible" append-to-body title="发起转接"  @close="cancel"
             :close-on-click-modal="false" :close-on-press-escape="false" width="888px" v-if="visible">
    <el-form :rules="node" ref="refForm" :model="formData" label-width="140px" v-cloak v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="转接类型">
            <el-input v-model="formData.type.data" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" label="接收组织"  prop='acceptOrg.data'>
            <el-input v-model="formData.acceptOrg.data" placeholder="请选择" @click.native="getTree" class="wp-100"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="当前组织">
            <el-input v-model="currentOrg.data" disabled/>
          </el-form-item>
        </el-col> -->
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="转接人员" prop='djMemberSaveDTO.name'>
            <el-input placeholder="请输入" v-model="formData.djMemberSaveDTO.name" :disabled="disableName" maxlength="100"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <base-telephone v-model="formData.djMemberSaveDTO.phone" :phone="'djMemberSaveDTO.phone'" :isImport="true" @blurInput="onInputBlurphone"/>
<!--          <el-form-item  class="is-required" label="联系方式" prop='djMemberSaveDTO.phone'>-->
<!--            <el-input v-model="formData.djMemberSaveDTO.phone" @blur="onInputBlurphone" placeholder="请输入" maxlength="13"/>-->
<!--          </el-form-item>-->
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="身份证号码" prop='djMemberSaveDTO.idCode' :rules="{required: true,validator: checkIdCode,trigger: 'blur'}">
            <el-input v-model="formData.djMemberSaveDTO.idCode" @blur="onInputBluridCode" placeholder="请输入" maxlength="100"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop='djMemberSaveDTO.sex.data'>
            <el-input v-model="formData.djMemberSaveDTO.sex.data" disabled/>
            <!-- <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.sex.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.SEX"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期" prop='djMemberSaveDTO.birthday'>
            <el-input v-model="formData.djMemberSaveDTO.birthday" disabled/>
            <!-- <el-date-picker v-model="formData.djMemberSaveDTO.birthday" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="台湾籍" prop='djMemberSaveDTO.nativesTaiwan.key'>
            <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.nativesTaiwan.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.ty_is"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="学历" prop='djMemberSaveDTO.djEducationSaveDTO.education.key'>
            <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.djEducationSaveDTO.education.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.EDUCATION"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" label="民族" prop='djMemberSaveDTO.nation.key'>
<!--            <el-input v-model="formData.djMemberSaveDTO.nation.data" disabled/>-->
            <el-select
              class="wp-100"
              v-model="formData.djMemberSaveDTO.nation.key"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width:100%;"
              clearable>
              <el-option
                  v-for="(item,index) in dicts.NATION"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="单位性质" prop='djMemberSaveDTO.djUnitSaveDTO.entType.key'>
            <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.djUnitSaveDTO.entType.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.WORK_UNIT"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="is-required" label="工作岗位" prop='djMemberSaveDTO.djUnitSaveDTO.jobs.key'>
            <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.djUnitSaveDTO.jobs.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.WORK_POST"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12" class="select-list1">
          <el-form-item label="籍贯" prop="djMemberSaveDTO.natives">
            <v-distpicker :province="placeholdersjg.province" :city="placeholdersjg.city" :area="placeholdersjg.area" style="display:flex;justify-content:space-between"  @province="onChangeProvincejg" @city="onChangeCityjg" @area="onChangeAreajg"></v-distpicker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="党费缴纳至" prop='duesPayEnddate'>
            <el-date-picker v-model="timeMonth" type="month" placeholder="请选择" value-format="yyyy-MM"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item class="is-required" label="原组织" prop='orgIdWrite'>
            <el-input v-model="formData.orgIdWrite" maxlength="200"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="党员类型" prop='djMemberSaveDTO.joinPartySaveDTO.type.key'>
            <el-select
                class="wp-100"
                v-model="formData.djMemberSaveDTO.joinPartySaveDTO.type.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                @change="selectType"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.MENBER_MTYP"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请入党时间" prop='djMemberSaveDTO.joinPartySaveDTO.applyJoinDate' :rules="{required: false,validator: checkApplyJoinDate,trigger: 'blur'}">
            <el-date-picker v-model="formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate" :picker-options="pickerOptions" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="列为积极分子时间"  prop='djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate' :rules="{required: false,validator: checkConfirmActivistDate,trigger: 'blur'}">
            <el-date-picker v-model="formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate" :picker-options="pickerOptions" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="列为发展对象时间" prop='djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate' :rules="{required: false,validator: checkConfirmDevelopDate,trigger: 'blur'}">
            <el-date-picker v-model="formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate" :picker-options="pickerOptions" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="转为预备党员时间"  prop='djMemberSaveDTO.joinPartySaveDTO.joinDate' :rules="{required: true,validator: checkJoinDate,trigger: 'blur'}">
            <el-date-picker v-model="formData.djMemberSaveDTO.joinPartySaveDTO.joinDate" :picker-options="pickerOptions" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="isShow">
          <el-form-item class="is-required" label="转为正式党员时间"  prop='djMemberSaveDTO.joinPartySaveDTO.positiveDate' :rules="{required: true,validator:checkPositiveDate,trigger: 'blur'}">
            <el-date-picker v-model="formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate" :picker-options="pickerOptions" type="date" placeholder="请选择" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </el-col>
<!--        <el-col :span="12" v-if="!isShow">-->
<!--          <el-form-item class="is-required" label="原组织" prop='orgIdWrite'>-->
<!--            <el-input v-model="formData.orgIdWrite" maxlength="100"/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
      </el-row>

<!--      <el-row v-if="isShow">-->
<!--        <el-col :span="12">-->
<!--          <el-form-item class="is-required" label="原组织" prop='orgIdWrite'>-->
<!--            <el-input v-model="formData.orgIdWrite" maxlength="100"/>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <el-form-item label="转接原因" prop='transferCause'>
        <el-input type="textarea" v-model="formData.transferCause" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 11, maxRows: 11}"/>
      </el-form-item>

      <el-form-item class="file" label="上传介绍信" prop="fileList">
        <base-file-upload
          :limit='9'
          list-type="text"
          :acceptSize="20"
          :accept='accept'
          :autoUpload="true"
          :otherData="otherData"
          :action="action"
          ref="fileRef"
          @associationCallback="associationCallback"/>
        <!-- <span class="upload-tip">格式要求：doc、docx、pdf、xlsx、txt要求：20M以内</span> -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
    <!--接收组织弹窗-->
<!--    <tree-dialog ref="refTree" @refresh="getOrg"/>-->
    <base-org-tree ref="refTree" @refresh="getOrg" :labelName="labelName"/>
  </el-dialog>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import VDistpicker from 'v-distpicker'
  import commonReq  from "@/api/public/commonReq.js"
  import {checkIdCodeBool} from "@/utils/my-validate";
  import {getOrgAdd,getUserinformation,getidCode} from "@/api/backstage/party/basic/org/org.js"
  export default {
    components: {
      VDistpicker

    },
    data () {
      return {
        loading:true,//加载遮罩
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        // 自己的
        visible: false,
        placeholdersjg: {//籍贯
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        },
        currentOrg:{//当前组织
          data:'',
          key:''
        },
        timeMonth:'',//缴纳年费至年月，截取年月
        formData: {
          isAdd:'1',//新增：1;重新发起：2
          id:'',
          acceptOrg: {//接收组织(园区内/转入园区内接收必填，转出园区外不用传)
            data: '',
            key: ''
          },
          acceptOrgWrite:'',//接收组织(转出园区外必填，其他不用传)
          djMemberSaveDTO:{//党员信息
            addressCoordinates:'',//家庭地址坐标
            birthday:'',//出生日期
            developNature: {//发展性质
              data: '',
              key: ''
            },
            djEducationSaveDTO: {//
              degree: {
                data: '',
                key: ''
              },
              education: {
                data: '',
                key: ''
              },
              graduateSchool: '',
              major: '',
              memberId: '',
            },
            djUnitSaveDTO: {
              addressCoordinates: '',
              company: '',
              duty: '',
              entType: {
                data: '',
                key: ''
              },
              jobs: {
                data: '',
                key: ''
              },
              memberId: '',
              unitAddress: '',
              unitDetailAddress: '',
            },
            homeAddress: '',
            homeDetailAddress: '',
            idCode: '',
            isDelete: '',
            isFarmerWork: {
              data: '',
              key: ''
            },
            isPoor: {
              data: '',
              key: ''
            },
            isVeteran: {
              data: '',
              key: ''
            },
            joinPartySaveDTO: {
              applyJoinDate: '',
              branch: '',
              confirmActivistDate: '',
              confirmDevelopDate: '',
              joinDate: '',
              memberId: '',
              orgId: '',
              partyAge: '',
              positiveDate: '',
              reference: '',
              type: {
                data: '',
                key: ''
              }
            },
            marriageCondition: {
              data: '',
              key: ''
            },
            name: '',
            nation: {
              data: '',
              key: ''
            },
            natives: '',
            nativesTaiwan: {
              data: '',
              key: ''
            },
            orgId: {
              data: '',
              key: ''
            },
            phone: '',
            sex: {
              data: '',
              key: ''
            },
            state: {
              data: '',
              key: ''
            },
            type: {
              data: '',
              key: ''
            }
          },
          duesPayEnddate: '',
          introletterUrl: '',
          memberId: {
            data:{},
            key:''
          },
          orgId: {
            data: '',
            key: ''
          },
          orgIdWrite: '',
          transferCause: '',
          transferState: {
            data: '',
            key: ''
          },
          type: {//转接类型
            data: '园区外转入',
            key: '1303258822889963520'
          },
        },

        dicts: {//字典
          NATION: {},//民族
          IS_MARRY:{},//婚姻状态
          LDLX: {},//状态
          XW:{},//学位
          EDUCATION:{},//学历
          WORK_POST:{},//工作岗位
          FLOW_REASON:{},//原因
          ent_type:{},//企业类型
          MENBER_MTYP:{},//人员类型
          ty_is:{},//是否
          SEX:{},//性别
          WORK_UNIT:{},//单位性质

        },
        disableName:false,
        isPhone:false,//验证手机号标识
        isCode:false,//验证身份证标识
        isShow:false,//判断转正日期是否出现
        node: { // 必填项判断
          'acceptOrg.data':[{
            required: true,
            message: '请选择接收组织',
            trigger: 'change'
          }],
          'djMemberSaveDTO.name':[{
            required: true,
            message: '请输入转接人员',
            trigger: 'blur'
          }],
          'djMemberSaveDTO.phone':[{
            required: true,
            pattern:/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
            message: '请输入正确的电话号码或座机号码',
            trigger: 'blur'
          }],
          // 'djMemberSaveDTO.idCode':[{
          //   required: true,
          //   message: '请输入身份证号码',
          //   trigger: 'blur'
          // }],
          // 'djMemberSaveDTO.sex.key':[{
          //   required: true,
          //   message: '请选择性别',
          //   trigger: 'change'
          // }],
          'djMemberSaveDTO.djEducationSaveDTO.education.key':[{
            required: true,
            message: '请选择学历',
            trigger: 'change'
          }],
          'djMemberSaveDTO.nation.key':[{
            required: true,
            message: '请选择民族',
            trigger: 'change'
          }],
          'djMemberSaveDTO.djUnitSaveDTO.entType.key':[{
            required: true,
            message: '请选择单位性质',
            trigger: 'change'
          }],
          'djMemberSaveDTO.djUnitSaveDTO.jobs.key':[{
            required: true,
            message: '请选择工作岗位',
            trigger: 'change'
          }],
          'djMemberSaveDTO.joinPartySaveDTO.type.key':[{
            required: true,
            message: '请选择党员类型',
            trigger: 'change'
          }],
          // 'djMemberSaveDTO.joinPartySaveDTO.joinDate':[{
          //   required: true,
          //   message: '请选择转为预备党员时间',
          //   trigger: 'change'
          // }],
          // 'djMemberSaveDTO.joinPartySaveDTO.positiveDate':[{
          //   required: true,
          //   message: '请选择转为正式党员时间',
          //   trigger: 'change'
          // }],
          'orgIdWrite':[{
            required: true,
            message: '请输入原组织',
            trigger: 'blur'
          }]
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "orglr",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg,.pdf',
        labelName:'组织关系转接',
      }
    },
    mounted(){
      this.getDict();
      this.getUser();

    },
    methods: {
      /**
       * @deprecated 日期格式化
       * @method dateFormat
       * @param {string} fmt 格式
       * @param {string} date 日期
       */
      dateFormat(fmt, date){
        let ret;
        const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
        };
        for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
        };
        return fmt;
      },
      /**
       * @deprecated 计算两个日期之间的天数
       * @param {string} dateString1  开始日期 yyyy-MM-dd
       * @param {string} dateString2  结束日期 yyyy-MM-dd
       * @returns {number} 如果日期相同 返回一天 开始日期大于结束日期，返回0
       */
      getDaysBetween(dateString1,dateString2){
        let  startDate = Date.parse(dateString1);
        let  endDate = Date.parse(dateString2);
        if (startDate>endDate){
          return 0;
        }
        if (startDate==endDate){
          return 1;
        }
        let days=(endDate - startDate)/(1*24*60*60*1000);
        return  days;
      },
      /**
       *
       * @deprecated 日期比对
       * @method checkDateGreaterThanByNowDate
       * @param {string} t 日期
       */
      checkDateGreaterThanByNowDate(t,e){
        // this.dateFormat('YYYY-mm-dd',new Date())
        if(t > e )return true;
        return false
      },
      /**
       * @deprecated 确定为入党积极分子日期校验
       * @method checkConfirmActivistDate
       * @param {string} value 日期
       */
      checkConfirmActivistDate(rule,value,callback){
        let j = this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
        if(!value){
          callback();
        }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
          return callback(new Error('列为积极分子时间需大于申请入党时间'));
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
        }else{
          callback();
        }
        callback();
      },
      /**
       * @deprecated 申请入党日期校验
       * @method checkApplyJoinDate
       * @param {string} value 日期
       */
      checkApplyJoinDate(rule,value,callback){
        if(!value){
          callback();
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
        }else{
          callback();
        }
        callback();
      },
      /**
       * @deprecated 确定为发展对象日期校验
       * @method checkConfirmDevelopDate
       * @param {string} value 日期
       */
      checkConfirmDevelopDate(rule,value,callback){
        let f = this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
        let j = this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;
        if(!value){
          callback();
        }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
          return callback(new Error('列为发展对象时间需大于申请入党时间'));
        }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
          return callback(new Error('列为发展对象时间需大于列为积极分子时间'));
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
        } else {
          callback();
        }
        callback();
      },
      /**
       * @deprecated 转正日期校验
       * @method checkPositiveDate
       * @param {string} value 日期
       */
      checkPositiveDate(rule,value,callback){
        let f = this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
        let m = this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
        let j = this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
        let h = this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
        // let p = this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate;//转正日期

        if(!value){
          return callback(new Error('请选择转为正式党员时间'));
        }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
          return callback(new Error('转为正式党员时间需大于申请入党时间'));
        }else if(m && !this.checkDateGreaterThanByNowDate(value,m)){
          return callback(new Error('转为正式党员时间需大于列为积极分子时间'));
        }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
          return callback(new Error('转为正式党员时间需大于列为发展对象时间'));
        }else if(h && this.getDaysBetween(h,value)<365){
          this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate = '';
          return callback(new Error('转为正式党员时间和转为预备党员时间需大于一年'));
        }else{
          callback();
        }
        callback();
      },
      /**
       * @deprecated 入党日期校验
       * @method checkJoinDate
       * @param {string} value 日期
       */
      checkJoinDate(rule,value,callback){
        let f = this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
        let m = this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
        let j = this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
        // let h = this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
        // let p = this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate;//转正日期

        if(!value){
          return callback(new Error('请选择转为预备党员时间'));
        }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
          return callback(new Error('转为预备党员时间需大于申请入党时间'));
        }else if(m && !this.checkDateGreaterThanByNowDate(value,m)){
          return callback(new Error('转为预备党员时间需大于列为积极分子时间'));
        }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
          return callback(new Error('转为预备党员时间需大于列为发展对象时间'));
        }else if(this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
          this.$refs.refForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
        }else {
          callback();
        }
        callback();
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
          this.formData.djMemberSaveDTO.birthday = '';
          this.formData.djMemberSaveDTO.sex = '';
          return callback(new Error('请输入正确的身份证号码'));
        }else{
          // this.onInputBluridCode();
          callback();
        }
        callback();
      },


      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })

      },
      //籍贯-省
      onChangeProvincejg(province){
        this.placeholdersjg.province =  province.value;
        // this.$refs['refForm'].clearValidate(['address']);
      },
      //籍贯-市
      onChangeCityjg(city){
        this.placeholdersjg.city =  city.value
        // this.$refs['refForm'].clearValidate(['address']);
      },
      //籍贯-区
      onChangeAreajg(area){
        this.placeholdersjg.area =  area.value
        // this.$refs['refForm'].clearValidate(['address']);
      },

      //获取当前组织
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        getUserinformation(params).then(response => {
          const res = response;
          this.currentOrg.data=res.data.orgName;
          this.currentOrg.key=res.data.orgId;

        }).finally(() => {

        });
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['PERSON_STATUS','NATION','IS_MARRY','XW','EDUCATION','WORK_POST','FLOW_REASON','ent_type','MENBER_MTYP','ty_is','SEX','WORK_UNIT']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.LDLX = res.PERSON_STATUS;
          this.dicts.NATION = res.NATION;
          this.dicts.IS_MARRY = res.IS_MARRY;
          this.dicts.XW = res.XW;
          this.dicts.EDUCATION = res.EDUCATION;
          this.dicts.WORK_POST = res.WORK_POST;
          this.dicts.FLOW_REASON = res.FLOW_REASON;
          this.dicts.ent_type = res.ent_type;
          this.dicts.MENBER_MTYP=res.MENBER_MTYP;
          for(var i=0;i<this.dicts.MENBER_MTYP.length;i++){
            if('1249237315268640768'==this.dicts.MENBER_MTYP[i].id){
              this.dicts.MENBER_MTYP.splice(i,1)
            }
            if('1248616414873387008'==this.dicts.MENBER_MTYP[i].id){
              this.dicts.MENBER_MTYP.splice(i,1)
            }
            if('1248616537112182784'==this.dicts.MENBER_MTYP[i].id){
              this.dicts.MENBER_MTYP.splice(i,1)
            }
            if('1248616612773232640'==this.dicts.MENBER_MTYP[i].id){
              this.dicts.MENBER_MTYP.splice(i,1)
            }

          }

          this.dicts.ty_is=res.ty_is;
          this.dicts.SEX=res.SEX;
          this.dicts.WORK_UNIT=res.WORK_UNIT

        })
      },
      //判断转正日期是否出现
      selectType(value){
        if(value=='1248616761813630976'){
          this.isShow=true;
        }else{
          this.isShow=false;
          this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate='';
        }
      },
      show (t,row) {
        this.visible = true;
        this.getDict();
        this.getUser();
        if(t==4){
          this.loading=false;
          this.partyUid();
          this.formData.isAdd='1';
        }
        if(t==8){
          this.formData.isAdd='2';
          this.disableName=true;
          this.otherData.bizId = row.memberTransfer.id
          this.formData.id=row.memberTransfer.id;
          this.formData.type=row.memberTransfer.type;
          this.formData.orgId=row.memberTransfer.orgId
          this.formData.orgIdWrite=row.memberTransfer.orgIdWrite
          this.formData.acceptOrg=row.memberTransfer.acceptOrg
          this.formData.acceptOrgWrite=row.memberTransfer.acceptOrgWrite
          this.formData.duesPayEnddate=row.memberTransfer.duesPayEnddate
          this.formData.introletterUrl=row.memberTransfer.introletterUrl
          this.formData.memberId=row.memberTransfer.memberId
          this.formData.transferCause=row.memberTransfer.transferCause
          this.formData.transferState=row.memberTransfer.transferState
          this.formData.djMemberSaveDTO.id=row.djMemberPubVO.id
          this.formData.djMemberSaveDTO.birthday=row.djMemberPubVO.birthday
          this.formData.djMemberSaveDTO.name=row.djMemberPubVO.name
          this.formData.djMemberSaveDTO.djEducationSaveDTO.education=row.djMemberPubVO.education
          this.formData.djMemberSaveDTO.idCode=row.djMemberPubVO.idCode
          this.formData.djMemberSaveDTO.isDelete=row.memberTransfer.isDelete
          this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate=row.djMemberPubVO.applyJoinDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate=row.djMemberPubVO.joinDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate=row.djMemberPubVO.positiveDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate=row.djMemberPubVO.confirmActivistDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate=row.djMemberPubVO.confirmDevelopDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.type=row.djMemberPubVO.type
          this.formData.djMemberSaveDTO.joinPartySaveDTO.memberId=row.djMemberPubVO.id
          this.formData.djMemberSaveDTO.djUnitSaveDTO.entType=row.djMemberPubVO.entType;
          this.formData.djMemberSaveDTO.djUnitSaveDTO.jobs=row.djMemberPubVO.jobs;
          this.formData.djMemberSaveDTO.nation=row.djMemberPubVO.nation
          this.formData.djMemberSaveDTO.phone=row.djMemberPubVO.phone
          this.formData.djMemberSaveDTO.sex=row.djMemberPubVO.sex
          this.formData.djMemberSaveDTO.natives=row.djMemberPubVO.natives
          this.formData.djMemberSaveDTO.type=row.djMemberPubVO.type
          this.formData.djMemberSaveDTO.nativesTaiwan=row.djMemberPubVO.nativesTaiwan
          this.formData.djMemberSaveDTO.duesPayEnddate=row.memberTransfer.duesPayEnddate
          if(this.formData.djMemberSaveDTO.joinPartySaveDTO.type.key=='1248616761813630976'){
            this.isShow=true;
          }else{
            this.isShow=false;
            this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate='';
          }

          //党费缴纳至年月，截取年月
          this.timeMonth='';
          if(this.formData.djMemberSaveDTO.duesPayEnddate!='' && this.formData.djMemberSaveDTO.duesPayEnddate!=undefined && this.formData.djMemberSaveDTO.duesPayEnddate!=null && this.formData.djMemberSaveDTO.duesPayEnddate!='null'){
            this.timeMonth=this.formData.djMemberSaveDTO.duesPayEnddate.slice(0,7)
          }

          //籍贯
          let valuesjg =  this.formData.djMemberSaveDTO.natives.split('-')
          this.placeholdersjg = {
            province :valuesjg[0],
            city:valuesjg[1],
            area:valuesjg[2] ,
          }
            this.$nextTick(function(){
              this.$refs.fileRef.init()
            })
          this.loading=false;

        }
      },
      //接收党组织
      getTree(){
        let params={
          org:this.formData.acceptOrg.data,
          orgId:this.formData.acceptOrg.key
        }
        this.$refs['refTree'].show(2,params)

      },
      //返回党组织的值
      getOrg(row){
        this.formData.acceptOrg=row
      },
      //身份证号和手机号失去焦点时，验证唯一性
      onInputBlurphone(){
        if(this.formData.djMemberSaveDTO.phone!='' && this.formData.djMemberSaveDTO.phone!=undefined && this.formData.djMemberSaveDTO.phone!=null && this.formData.djMemberSaveDTO.phone!='null'){
          let txt=/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
          if(!txt.test(this.formData.djMemberSaveDTO.phone)){
            // this.$message.warning("请输入正确的电话号码或座机号码")
            this.isPhone=false;
            return
          }
          let params = {
            memberId:this.formData.memberId.key,
            opt:'phone',
            value:this.formData.djMemberSaveDTO.phone
          }
          getidCode(params).then(response =>{
            const res = response;
            if(res.code=='1'){
              // this.$message.warning("该手机号码已存在，请重新填写")
              this.isPhone=true//验证手机号标识
            }else{
              this.isPhone=false;
            }
          }).finally(() => {

          });
        }
      },
      onInputBluridCode(){
        if(this.formData.djMemberSaveDTO.idCode!='' && this.formData.djMemberSaveDTO.idCode!=undefined && this.formData.djMemberSaveDTO.idCode!=null && this.formData.djMemberSaveDTO.idCode!='null'){
          let data = {
            memberId:this.formData.memberId.key,
            opt:'idcode',
            value:this.formData.djMemberSaveDTO.idCode
          }

          getidCode(data).then(response =>{
            const res = response;
            if(res.code=='0'){
              if(res.sex!='' && res.sex!=undefined && res.sex!=null && res.sex!='null'){
                this.formData.djMemberSaveDTO.sex=res.sex;
              }else{
                this.formData.djMemberSaveDTO.sex={
                  data:'',
                  key:''
                }
              }
              // if(res.nation!='' && res.nation!=undefined && res.nation!=null && res.nation!='null'){
              //   this.formData.djMemberSaveDTO.nation=res.nation;
              // }else{
              //   this.formData.djMemberSaveDTO.nation={
              //     data:'',
              //     key:''
              //   }
              // }
              this.formData.djMemberSaveDTO.birthday=res.birthDay;
              this.isCode=false//验证身份证标识


            }
            // else if(res.code=='2'){
            //   this.$message.warning("该身份证号格式错误，请重新填写")
            //   this.isCode=false//验证身份证标识
            //
            // }
            else if(res.code=='3'){
              // this.$message.warning("该身份证号已存在，请重新填写")
              this.isCode=true//验证身份证标识
            }else{
              this.isCode=false//验证身份证标识
            }
          }).finally(() => {

          });
        }
      },
      //取消
      cancel(){
        this.visible = false;
        this.$refs['refForm'].resetFields();
        this.placeholdersjg={//籍贯
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        };


        this.timeMonth='';
        this.formData.djMemberSaveDTO.name='';
        this.formData.djMemberSaveDTO.phone='';
        this.formData.djMemberSaveDTO.idCode='';
        // this.formData.djMemberSaveDTO.sex.key='';
        // this.formData.djMemberSaveDTO.sex.data='';
        this.formData.djMemberSaveDTO.sex={
          data:'',
          key:''
        }
        this.formData.djMemberSaveDTO.birthday='';
        // this.formData.djMemberSaveDTO.nativesTaiwan.key='';
        // this.formData.djMemberSaveDTO.nativesTaiwan.data='';
        this.formData.djMemberSaveDTO.nativesTaiwan={
          data:'',
          key:''
        }
        // this.formData.djMemberSaveDTO.djEducationSaveDTO.education.key='';
        // this.formData.djMemberSaveDTO.djEducationSaveDTO.education.data='';
        this.formData.djMemberSaveDTO.djEducationSaveDTO.education={
          data:'',
          key:''
        }
        // this.formData.djMemberSaveDTO.nation.key='';
        // this.formData.djMemberSaveDTO.nation.data='';
        this.formData.djMemberSaveDTO.nation={
          data:'',
          key:''
        }
        // this.formData.djMemberSaveDTO.djUnitSaveDTO.entType.key='';
        // this.formData.djMemberSaveDTO.djUnitSaveDTO.entType.data='';
        this.formData.djMemberSaveDTO.djUnitSaveDTO.entType={
          data:'',
          key:''
        }
        // this.formData.djMemberSaveDTO.djUnitSaveDTO.jobs.key='';
        // this.formData.djMemberSaveDTO.djUnitSaveDTO.jobs.data='';
        this.formData.djMemberSaveDTO.djUnitSaveDTO.jobs={
          data:'',
          key:''
        }
        this.formData.djMemberSaveDTO.natives='';
        this.formData.duesPayEnddate='';
        this.formData.djMemberSaveDTO.duesPayEnddate='';
        // this.formData.djMemberSaveDTO.joinPartySaveDTO.type.key='';
        // this.formData.djMemberSaveDTO.joinPartySaveDTO.type.data='';
        this.formData.djMemberSaveDTO.joinPartySaveDTO.type={
          data:'',
          key:''
        }
        this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate='';
        this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate='';
        this.formData.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate='';
        this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate='';
        this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate='';
        // this.formData.acceptOrg.data='';
        // this.formData.acceptOrg.key='';
        this.formData.acceptOrg={
          data:'',
          key:''
        }
        this.formData.transferCause='';
        this.formData.orgIdWrite='';
        this.$refs['refForm'].resetFields();
        // this.$emit('refresh')

      },
      // 成功回调
      associationCallback(val){
        if(val){
          getOrgAdd(this.formData).then(response => {
            const res = response;
            this.$message(this.successTip());
            this.cancel();
            this.$emit('refresh',1)

          }).finally(() => {

          });
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      saveBtn () {
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          // if(this.formData.acceptOrg.data=='' || this.formData.acceptOrg.data==undefined || this.formData.acceptOrg.data==null || this.formData.acceptOrg.data=='null'){
          //   this.$message.warning("请选择接收组织")
          //   return
          // }
          if(this.isPhone==true){
            this.$message.warning("该手机号已存在，请重新填写");
            return
          }
          if(this.isCode==true){
            this.$message.warning("该身份证号已存在，请重新填写");
            return
          }
          this.formData.djMemberSaveDTO.natives='';
          this.formData.djMemberSaveDTO.natives=this.placeholdersjg.province   + '-' + this.placeholdersjg.city + "-" +this.placeholdersjg.area


          this.formData.djMemberSaveDTO.duesPayEnddate='';
          this.formData.duesPayEnddate='';
          if(this.timeMonth!='' && this.timeMonth!=undefined && this.timeMonth!=null && this.timeMonth!='null'){
            this.timeMonth=this.timeMonth+'-'+'01';
          }else{
            this.timeMonth='';
          }
          this.formData.djMemberSaveDTO.duesPayEnddate=this.timeMonth
          this.formData.duesPayEnddate=this.timeMonth;


          this.$refs.fileRef.submitFile();
          // getOrgAdd(this.formData).then(response => {
          //   const res = response;
          //   this.$message.success("保存成功")
          //   this.cancel();
          //   this.$emit('refresh')
          //
          // }).finally(() => {

          // });
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  .select-list1 /deep/ .distpicker-address-wrapper label{
    width:130px;
  }
  .select-list1 /deep/ .distpicker-address-wrapper label select{
    width:100%;
  }

  .el-date-editor.el-input{
    width:100%;
  }
  .upload-tip {
    color: #cccccc;
    font-size: 14px;
    vertical-align: text-top;
  }

  .dialog-inner /deep/ .el-dialog__body {
    padding: 15px 34px;
  }

</style>
