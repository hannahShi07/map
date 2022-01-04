<template>
  <div class="add-content" v-cloak v-loading="loading">
    <el-form :model="djMemberSaveDTO" :rules="node" ref="ruleForm" label-width="120px">
      <div class="base-information">
        <h4>个人基本信息</h4>
        <div class="base-content">
          <div class="base-content-per">
            <div class="base-left">
              <el-col :span="12">
              	<el-form-item class="is-required" label="姓名" prop="name">
              		<el-input v-model="djMemberSaveDTO.name" placeholder="请输入" maxlength="100"  clearable></el-input>
              	</el-form-item>
              </el-col>
              <el-col :span="12">
                 <base-telephone v-model="djMemberSaveDTO.phone" :phone="'phone'" :isImport="true" @blurInput="onInputBlurphone"/>
<!--              	<el-form-item class="is-required" label="联系方式" prop="phone">-->
<!--              		<el-input v-model="djMemberSaveDTO.phone" @blur="onInputBlurphone" placeholder="请输入" maxlength="13" clearable></el-input>-->
<!--              	</el-form-item>-->
              </el-col>
              <el-col :span="12">
                <el-form-item  class="is-required" label="身份证号码" prop="idCode" :rules="{required: true,validator: checkIdCode,trigger: 'blur'}">
                  <el-input v-model="djMemberSaveDTO.idCode" @blur="onInputBluridCode" placeholder="请输入" maxlength="18"  clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
              	<el-form-item label="民族" prop="nation.key">
                  <el-select
                      v-model="djMemberSaveDTO.nation.key"
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
              	<el-form-item label="出生日期" prop="birthday">
              		<el-date-picker
                    v-model="djMemberSaveDTO.birthday"
                    type="date"
                    disabled
                    placeholder="性别与出生日期输入身份证后自动显示"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
              	</el-form-item>
              </el-col>
              <el-col :span="12" class="select-list1">
              	<el-form-item label="籍贯" prop="province">
                  <v-distpicker :province="placeholdersjg.province" :city="placeholdersjg.city" :area="placeholdersjg.area" style="display:flex;justify-content:space-between"  @province="onChangeProvincejg" @city="onChangeCityjg" @area="onChangeAreajg"></v-distpicker>
              	</el-form-item>
              </el-col>
              <el-col :span="12">
              	<el-form-item label="婚姻状况" prop="marriageCondition.key">
                  <el-select
                      v-model="djMemberSaveDTO.marriageCondition.key"
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
              	<el-form-item class="is-required" label="状态" prop="state.key">
                  <el-select
                      v-model="djMemberSaveDTO.state.key"
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
                      <img class="iconperson" v-if="imageUrl==''" src="../../../../../../assets/page/icon-person.png">
                      <img class="personimg" v-else :src="imageUrl">
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
                <el-radio-group v-model="djMemberSaveDTO.sex.data">
                  <el-radio disabled label="男"></el-radio>
                  <el-radio disabled label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="贫困户" prop="isPoor.data">
                <el-radio-group v-model="djMemberSaveDTO.isPoor.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="marl-20">
              <el-form-item label="农民工" prop="isFarmerWork.data">
                <el-radio-group v-model="djMemberSaveDTO.isFarmerWork.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退役军人" prop="isVeteran.data">
                <el-radio-group v-model="djMemberSaveDTO.isVeteran.data">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="台湾籍" prop="nativesTaiwan.data">
                <el-radio-group v-model="djMemberSaveDTO.nativesTaiwan.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="7" class="marl-20">
              <el-form-item label="发展党员性质" prop="developNature.key">
                <el-radio-group v-model="djMemberSaveDTO.developNature.key">
                  <el-radio  label="2272058126461460531">内部发展</el-radio>
                  <el-radio  label="2272058126461460534">外部转入</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>



            <el-col :span="24" class="select-list">
              <el-form-item label="家庭地址" prop="province">
                <v-distpicker  :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display: flex;"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                <el-input v-model="djMemberSaveDTO.homeDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
                <img class="map-img" src="../../../../../../assets/page/icon-map.png" @click="toMap('home')">
              </el-form-item>
            </el-col>

          </div>
        </div>
      </div>
      <div class="base-information">
        <h4>学历信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="学历" prop="djEducationSaveDTO.education.key">
          		<el-select
                  v-model="djMemberSaveDTO.djEducationSaveDTO.education.key"
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
          		<el-input v-model="djMemberSaveDTO.djEducationSaveDTO.graduateSchool" placeholder="请输入" maxlength="100"  clearable></el-input>
          	</el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item label="学位" prop="djEducationSaveDTO.degree.key">
          		<el-select
                  v-model="djMemberSaveDTO.djEducationSaveDTO.degree.key"
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
          		<el-input v-model="djMemberSaveDTO.djEducationSaveDTO.major" placeholder="请输入" maxlength="100"  clearable></el-input>
          	</el-form-item>
          </el-col>
        </div>
      </div>
      <div class="base-information">
        <h4>入党信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="所属党组织" prop="orgId.data">
          		<el-input v-model="djMemberSaveDTO.orgId.data" v-if="!curOrgPer('1001')" placeholder="请选择" readonly @click.native="getTree"/>
              <el-input v-model="djMemberSaveDTO.orgId.data" v-if="curOrgPer('1001')" placeholder="请选择" disabled/>
          	</el-form-item>
          </el-col>
          <el-col :span="8" class='text'>
          	<el-form-item label="入党时所在党支部" prop="joinPartySaveDTO.branch">
          		<el-input v-model="djMemberSaveDTO.joinPartySaveDTO.branch" placeholder="请输入" maxlength="100"  clearable/>
          	</el-form-item>
          </el-col>
          <el-col :span="8" v-if="isEdittype==1 || isEdittype==2">
            <el-form-item class="is-required" label="人员类型" prop="joinPartySaveDTO.type.data">
              <el-input v-model="djMemberSaveDTO.joinPartySaveDTO.type.data" maxlength="100" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="isEdittype==0">
          	<el-form-item class="is-required" label="人员类型" prop="joinPartySaveDTO.type.key">
          		<el-select
                  v-model="djMemberSaveDTO.joinPartySaveDTO.type.key"
          		    value-key="id"
          		    filterable
                  :disabled="isAbled"
          		    placeholder="请选择"
          		    style="width:100%;"
          		    @change="selectHide"
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
          <el-col :span="8">
          	<el-form-item label="申请入党日期" prop="joinPartySaveDTO.applyJoinDate">
          		<el-date-picker
                v-model="djMemberSaveDTO.joinPartySaveDTO.applyJoinDate"
          		  type="date"
          		  placeholder="请选择"
                :picker-options="pickerOptions"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" class='select-list'>
          	<el-form-item label="入党介绍人" prop="reference1">
          		<el-input v-model="reference1" placeholder="请输入介绍人1" maxlength="100"  clearable></el-input>
              <el-input v-model="reference2" placeholder="请输入介绍人2" maxlength="100"  clearable></el-input>
          	</el-form-item>
          </el-col>
          <!-- <el-col :span="8">
          	<el-form-item label="申请入党日期" prop="applyJoinDate">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate"
          		  type="date"
          		  placeholder="请选择"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col> -->
          <el-col :span="8" class="text">
          	<el-form-item label="确定为入党积极分子日期" prop="joinPartySaveDTO.confirmActivistDate">
          		<el-date-picker
                v-model="djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate"
          		  type="date"
          		  placeholder="请选择"
                :picker-options="pickerOptions"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" class="text">
          	<el-form-item label="确定为发展对象日期" prop="joinPartySaveDTO.confirmDevelopDate">
          		<el-date-picker
                v-model="djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate"
          		  type="date"
          		  placeholder="请选择"
                :picker-options="pickerOptions"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item class="is-required" label="入党日期" prop="joinPartySaveDTO.joinDate">
          		<el-date-picker
                v-model="djMemberSaveDTO.joinPartySaveDTO.joinDate"
          		  type="date"
          		  placeholder="请选择"
          		  value-format="yyyy-MM-dd"
                @change="selectjoin"
                :picker-options="pickerOptions">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" v-if="isHide">
          	<el-form-item class="is-required" label="转正日期" prop="joinPartySaveDTO.positiveDate" :rules="{required: true,validator:checkPositiveDate,trigger: 'blur'}">
          		<el-date-picker
                v-if="isHide"
                v-model="djMemberSaveDTO.joinPartySaveDTO.positiveDate"
          		  type="date"
          		  placeholder="请选择"
                :picker-options="pickerOptions"
                @change="pickerChange"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" v-if="isHide">
          	<el-form-item label="党龄" prop="joinPartySaveDTO.partyAge">
          		<el-input v-model="djMemberSaveDTO.joinPartySaveDTO.partyAge"  disabled placeholder="请输入数字" v-if="isHide">
          		  <template slot="append">年</template>
          		</el-input>
          	</el-form-item>
          </el-col>
        </div>
      </div>
      <div class="base-information">
        <h4>单位信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="工作单位" prop="djUnitSaveDTO.company">
              <el-input placeholder="请输入工作单位" v-model="djMemberSaveDTO.djUnitSaveDTO.company" maxlength="100" clearable></el-input>
<!--          		<el-select-->
<!--                  v-model="djMemberSaveDTO.djUnitSaveDTO.company.key"-->
<!--          		    value-key="id"-->
<!--          		    filterable-->
<!--          		    placeholder="请选择"-->
<!--          		    style="width:100%;"-->
<!--          		    clearable>-->
<!--          		    <el-option-->
<!--          		        v-for="item in unitList"-->
<!--          		        :key="item.id"-->
<!--          		        :label="item.name"-->
<!--          		        :value="item.id">-->
<!--          		    </el-option>-->
<!--          		</el-select>-->
          	</el-form-item>
          </el-col>
          <el-col :span="8" class='select-list text'>
          	<el-form-item label="从事专业技术职务" prop="djUnitSaveDTO.duty">
          		<el-input v-model="djMemberSaveDTO.djUnitSaveDTO.duty" placeholder="请输入" maxlength="100"  clearable></el-input>
          	  <img @click="openPdf()" class="map-img" src="../../../../../../assets/page/icon-wh.png">
            </el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item label="企业类型" prop="djUnitSaveDTO.entType.key">
          		<el-select
                  v-model="djMemberSaveDTO.djUnitSaveDTO.entType.key"
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
                  v-model="djMemberSaveDTO.djUnitSaveDTO.jobs.key"
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
              <el-input v-model="djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
              <img class="map-img" src="../../../../../../assets/page/icon-map.png" @click="toMap('work')">
            </el-form-item>
          </el-col>
        </div>
      </div>

      <el-col :span="24" class="tac">
        <el-button v-if="isShow && !permision(djMemberSaveDTO)" @click="open()">移至历史人员库</el-button>
        <el-button class="js-button" @click="goBtn()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </el-col>

    </el-form>
    <!--移至历史人员库弹窗-->
    <move-historical-library ref="refHistory" @refresh="getEdit"/>
    <!--所属组织弹窗-->
<!--    <tree-dialog ref="refTree" @refresh="getOrg"/>-->
    <base-org-tree ref="refTree" @refresh="getOrg"/>


    <!-- 地图弹出框-->
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import db from "@/utils/localstorage"
    import {Base64} from 'js-base64'
    import MoveHistoricalLibrary from '../components/move-historical-library'//移至历史人员库弹窗
    // import TreeDialog from '../components/tree-dialog'//组织树弹窗
    import commonReq  from "@/api/public/commonReq.js"
    import VDistpicker from 'v-distpicker'
    import {checkIdCodeBool} from "@/utils/my-validate";
    import {getManageAdd,getManageDetail,getManageEdit} from "@/api/backstage/party/basic/manage/manage.js"
    import BMap from '@/components/BMap/BMap'

    export default {
        name: "ManageAdd",
        components: {
          MoveHistoricalLibrary,
          VDistpicker,
          BMap

        },
        props: {
          params: {
            type: Object,
            default: {}
          }
        },
        data() {
          return {
            loading:false,//加载遮罩
            pickerOptions: {
              disabledDate(time) {
                return time.getTime() > Date.now()
              }
            },
            // provinceList:[],//省下拉框
            // cityList:[],//市下拉框
            // areaList:[],//区下拉框
            // province:'',//省
            // city:'',//市
            // area:'',//区
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
            reference1:'',//介绍人1
            reference2:'',//介绍人2
            unitList:[],//工作单位
            djMemberUpdateDTO:'',//编辑保存参数
            // djMemberFlowSaveDTO: {//党员管理
              // branchPerson:'',//党支部联系人
              // contact:'',//手机号码
            djMemberSaveDTO:{//党员信息
                id:'',
                name:'',//姓名
                addressCoordinates:'',//家庭地址坐标
                // developNature:{//发展性质
                //   data:'',
                //   key:''
                // },
                idCode:'',//身份证号
                birthday:'',//出身日期
                natives:'',//籍贯
                homeAddress:'',//家庭地址(省市区'-'拼接)
                homeDetailAddress:'',//家庭详细地址
                isDelete:'',//是否删除
                djEducationSaveDTO:{//学历信息
                  degree:{//学位
                    data:'',
                    key:''
                  },
                  education:{//学历
                    data:'',
                    key:'1254245289284337664'
                  },
                  major:'',//专业
                  graduateSchool:'',//毕业院校
                  memberId:'',//党员id
                },
                djUnitSaveDTO:{//单位信息
                  addressCoordinates:'',//单位地址经纬度
                  company: '', // 企业
                  duty:'',//从事专业技术职务
                  entType:{//企业类型
                    data:'',
                    key:''
                  },
                  jobs:{//工作岗位
                    data:'',
                    key:''
                  },
                  memberId:'',//党员id
                  unitAddress:'',//单位地址(省市区'-'拼接)
                  unitDetailAddress:'',//单位详细地址
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
                joinPartySaveDTO:{//入党信息
                  applyJoinDate:'',//申请入党日期
                  branch:'',//入党时所在党支部
                  confirmActivistDate:'',//确定积极分子日期
                  confirmDevelopDate:'',//确定发展对象日期
                  joinDate:'',//入党日期
                  memberId:'',//党员id
                  orgId:'',//所属党组织id
                  partyAge:'',//党龄
                  positiveDate:'',//转正日期
                  reference:'',//入党介绍人(逗号拼接)
                  type:{//人员类型
                    data:'',
                    key:''
                  }
                },
                nation:{//民族
                  data:'',
                  key:''
                },

                marriageCondition:{//婚姻状态
                  data:'',
                  key:'1248612723663568896'
                },
                nativesTaiwan:{//台湾籍
                  data:'否',
                  key:'1249242903696375808'
                },
                developNature:{
                  data:'内部发展',
                  key:'2272058126461460531'
                },
                state:{//状态
                  data:'',
                  key:'1248614030063435776'
                },
                orgId:{//所属组织
                  data:'',
                  key:''
                },
                phone:'',//手机号码
                sex:{//性别
                  data:'',
                  key:''
                },
                type:{//人员类型
                  data:'',
                  key:''
                }
              },
            fileList:[],//图片附件
            imageUrl:'',//头像图片地址
            isEdit:1,//新增：1，编辑：2
            editId:'',//党员id，验证身份证号和手机号
            dicts: {//字典
              NATION: {},//民族
              IS_MARRY:{},//婚姻状态
              LDLX: {},//状态
              XW:{},//学位
              EDUCATION:{},//学历
              WORK_POST:{},//工作岗位
              FLOW_REASON:{},//原因
              WORK_UNIT:{},//企业类型
              MENBER_MTYP:{},//人员类型
              ty_is:{},//是否
              SEX:{},//性别

            },
            isShow:false,//移至历史库按钮是否出现
            isPhone:false,//验证手机号标识
            isCode:false,//验证身份证标识
            isHide:false,//转正日期是否出现
            node: { // 必填项判断
              'name':[{
                required: true,
                message: '请输入姓名',
                trigger: 'blur'
              }],
              'phone':[{
                  required: true,
                  pattern:/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/,
                  message: '请输入正确的电话号码或座机号码',
                  trigger: 'blur'
              }],
              // 'idCode':[{
              //   required: true,
              //   message: '请输入身份证号码',
              //   trigger: 'blur'
              // }],
              'state.key':[{
                required: true,
                message: '请选择状态',
                trigger: 'change'
              }],
              'djEducationSaveDTO.education.key':[{
                required: true,
                message: '请选择学历',
                trigger: 'change'
              }],
              'orgId.data':[{
                required: true,
                message: '请选择所属组织',
                trigger: 'blur'
              }],
              'joinPartySaveDTO.type.key':[{
                required: true,
                message: '请选择人员类型',
                trigger: 'change'
              }],
              // 'joinPartySaveDTO.joinDate':[{
              //   required: true,
              //   message: '请选择入党日期',
              //   trigger: 'change'
              // }],
              // 'joinPartySaveDTO.positiveDate':[{
              //   required: true,
              //   message: '请选择转正日期',
              //   trigger: 'change'
              // }],
              'djUnitSaveDTO.company':[{
                required: true,
                message: '请输入工作单位',
                trigger: 'blur'
              }],
              'joinPartySaveDTO.applyJoinDate':[{//申请入党时间
                required: false,
                validator: this.checkApplyJoinDate,
                trigger: 'blur'
              }],
              'joinPartySaveDTO.confirmActivistDate':[{//确定为入党积极分子日期
                required: false,
                validator: this.checkConfirmActivistDate,
                trigger: 'blur'
              }],
              'joinPartySaveDTO.confirmDevelopDate':[{//确定为发展对象日期
                required: false,
                validator: this.checkConfirmDevelopDate,
                trigger: 'blur'
              }],
              'joinPartySaveDTO.joinDate':[{//入党日期
                required: false,
                validator: this.checkJoinDate,
                trigger: 'blur'
              }],
            },
            otherData:{//额外参数
              id: '',
              bizId: "",
              bizType: "manage",
              isSingle: false
            },
            action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
            fileids:[],//附件id
            isEdittype:0,//党小组组长：1;任职干部：2；0是可修改判断
            isAbled:true,//人员类型是否修改
            mapVisible: false, // 是否打开地图
            isMapType: 'home',//home: 点击的是家庭地址；work: 点击的是单位地址
          }
        },
        activated(){
          this.$nextTick(function(){
            this.$refs['ruleForm'].resetFields()


         // 籍贯
            this.placeholdersjg = {
              province: '安徽省',
              city: '合肥市',
              area:'蜀山区' ,
            }
            this.djMemberSaveDTO.natives = ''

            // 家庭地址
            this.placeholders = {
              province: '安徽省',
              city: '合肥市',
              area:'蜀山区' ,
            }
            this.djMemberSaveDTO.homeDetailAddress = ''

            this.reference1 = '',//介绍人1
            this.reference2 = '',//介绍人2

            // 单位地址
            this.placeholdersdw = {
              province: '安徽省',
                city: '合肥市',
                area:'蜀山区' ,
            }
            this.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress = ''

            this.djMemberSaveDTO.joinPartySaveDTO.positiveDate = ''

            this.djMemberSaveDTO.joinPartySaveDTO.partyAge = ''

            this.isPhone = false//验证手机号标识
            this.isCode = false//验证身份证标识
            this.isHide = false//转正日期是否出现

            this.imageUrl = ''
          })

          this.getUser();
          this.isEdit=1;
          this.isShow=false;
          this.isAbled=false;
          this.getCommDict();
          this.getDict();
          // this.getCompany();
          this.partyUid();
          this.getNowTime();
          console.log("this.params:",this.params)

          //判断是编辑页面
          if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
            console.log(34658798078856456)
            this.loading =true;
            this.isShow=true;
            this.isEdit=2;
            this.isAbled=true;
            this.getEdit();
          }else{
            console.log("this.djMemberSaveDTO.joinPartySaveDTO.positiveDate:",this.djMemberSaveDTO.joinPartySaveDTO.positiveDate)
          }
        },
        mounted(){
          this.getUser();
          this.isEdit=1;
          this.isShow=false;
          this.isAbled=false;
          this.getCommDict();
          this.getDict();
          // this.getCompany();
          this.partyUid();
          this.getNowTime();
          //判断是编辑页面
          if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
            this.loading =true;
            this.isShow=true;
            this.isEdit=2;
            this.isAbled=true;
            this.getEdit();
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
        methods: {
          // 关闭地图事件
          mapClose(data) {
            this.mapVisible = false
            if(data){
              if(this.isMapType === 'home'){
                this.djMemberSaveDTO.homeDetailAddress = data.address
                this.djMemberSaveDTO.addressCoordinates = data.coordinates

                this.placeholders = {
                  province: data.province,
                  city: data.city,
                  area: data.district ,
                }
              }else if(this.isMapType === 'work'){
                this.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress = data.address
                this.djMemberSaveDTO.djUnitSaveDTO.addressCoordinates = data.coordinates

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
          //获取当前组织
          getUser(){
            let params = {
              userId:db.get('USER').id,
            }
            commonReq.getUserinformation(params).then(response => {
              const res = response;
              this.djMemberSaveDTO.orgId={
                data:res.data.orgName,
                key:res.data.orgId
              };
              this.djMemberSaveDTO.joinPartySaveDTO.orgId=res.data.orgId;


            }).finally(() => {

            });
          },
          //隐藏转正时间
          selectHide(value){
            if(value=='1248616761813630976'){
              this.isHide=true
            }else{
              this.isHide=false;
              // this.djMemberSaveDTO.joinPartySaveDTO.positiveDate='';
              // this.djMemberSaveDTO.joinPartySaveDTO.partyAge='';
            }
          },

          //时间事件
          pickerChange(value){
              // 处理党龄
              if(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=undefined && this.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=null && this.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=''){
                  var date = new Date(this.getNowTime())
                  var time1 = date.getTime();
                  var date1 = new Date(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate)
                  var time2 = date1.getTime();
                  var total = (time1 - time2)/1000;
                  this.djMemberSaveDTO.joinPartySaveDTO.partyAge =parseInt((total / (24*60*60))/365);
              }
              else {
                  this.djMemberSaveDTO.joinPartySaveDTO.partyAge = 0
              }
          },
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
            let j = this.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
            if(!value){
              callback();
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('确定为入党积极分子日期需大于申请入党日期'));
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.confirmDevelopDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.joinDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.joinDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.positiveDate");
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
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.confirmActivistDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.confirmDevelopDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.joinDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.joinDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.positiveDate");
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
            let f = this.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
            let j = this.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;
            if(!value){
              callback();
            }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
              return callback(new Error('确定为发展对象日期需大于申请入党日期'));
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('确定为发展对象日期需大于入党积极分子日期'));
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.joinDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.joinDate");
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.positiveDate");
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
            let f = this.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
            let m = this.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
            let j = this.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
            let h = this.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
            // let p = this.djMemberSaveDTO.joinPartySaveDTO.positiveDate;//转正日期
            if(!value){
              return callback(new Error('请选择转正日期'));
            }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
              return callback(new Error('转正日期需大于申请入党日期'));
            }else if(m && !this.checkDateGreaterThanByNowDate(value,m)){
              return callback(new Error('转正日期需大于确定为入党积极分子日期'));
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('转正日期需大于确定为发展对象日期'));
            }else if(h && this.getDaysBetween(h,value)<365){
              this.djMemberSaveDTO.joinPartySaveDTO.positiveDate = '';
              return callback(new Error('转正日期和入党日期需大于一年'));
            }else{
              callback();
            }
          },
          /**
           * @deprecated 入党日期校验
           * @method checkJoinDate
           * @param {string} value 日期
           */
          checkJoinDate(rule,value,callback){
            let f = this.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
            let m = this.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
            let j = this.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
            // let h = this.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
            // let p = this.djMemberSaveDTO.joinPartySaveDTO.positiveDate;//转正日期
            if(!value){
              return callback(new Error('请选择入党日期'));
            }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
              return callback(new Error('入党日期需大于申请入党日期'));
            }else if(m && !this.checkDateGreaterThanByNowDate(value,m)){
              return callback(new Error('入党日期需大于确定为入党积极分子日期'));
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('入党日期需大于确定为发展对象日期'));
            }else if(this.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("joinPartySaveDTO.positiveDate");
            }else {
              callback();
            }
            callback();
          },
          //入党时党员要大于等于18岁
          selectjoin(val){
            if(this.djMemberSaveDTO.birthday!='' && this.djMemberSaveDTO.birthday!=undefined && this.djMemberSaveDTO.birthday!=null && this.djMemberSaveDTO.birthday!='null'){
              let yearbrith=Number(this.djMemberSaveDTO.birthday.substring(0,4));
              let monthbrith=Number(this.djMemberSaveDTO.birthday.substring(5,7));
              let datebrith=Number(this.djMemberSaveDTO.birthday.substring(8,10));
              let yearjoin=Number(val.substring(0,4));
              let monthjoin=Number(val.substring(5,7));
              let datejoin=Number(val.substring(8,10));

              let yearcha=yearjoin-yearbrith;
              if(yearcha<18){
                this.$message.warning("入党时党员要大于等于18岁");
                this.djMemberSaveDTO.joinPartySaveDTO.joinDate=''

              }else if(yearcha===18){
                if(monthjoin<monthbrith){
                  this.$message.warning("入党时党员要大于等于18岁");
                  this.djMemberSaveDTO.joinPartySaveDTO.joinDate=''
                }else if(monthjoin===monthbrith){
                  if(datejoin<datebrith){
                    this.$message.warning("入党时党员要大于等于18岁");
                    this.djMemberSaveDTO.joinPartySaveDTO.joinDate=''
                  }
                }
              }
            }
          },

          //新增时获取UID
          partyUid(){
            commonReq.getNewUid({}).then(response =>{

              const res = response
              this.djMemberSaveDTO.id = res;
              this.otherData.bizId = res;

            })

          },
          //覆盖上传
          handleChange(files, fileList){
            // this.djMemberFlowSaveDTO.fileList = []
            // this.djMemberFlowSaveDTO.fileList.push(files);
            this.$refs['ruleForm'].clearValidate(['fileList']);
          },
          // 附件上传失败
          handleError(err, file, fileList) {
            this.$message.error("附件上传失败，请重试");
          },
          //文件上传成功时的钩子
          successFile(response, file, fileList){
            this.fileids=[];
            const res = file;
            if(res.response.code=='0'){
              this.imageUrl=file.response.data.url;
              let _this = this
              setTimeout(function(){
                _this.$message(_this.successTip())
              },2000);  //2000毫秒后执行函数，只执行一次。
              this.fileids.push(file.response.data.id);

            }else{
              this.imageUrl='';
              this.fileids=[];
              this.$message.error(res.response.msg)
            }
            this.$refs.commitment.clearFiles();
          },
          //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
          beforeUpload(file) {
            // const isLtSize = file.size / 1024 / 1024 < this.acceptSize;
            // if (!isLtSize) {
            //   this.$message.error('上传附件大小不能超过 20MB!');
            // }
            // return isLtSize;
            return true
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
              this.djMemberSaveDTO.birthday = '';
              this.djMemberSaveDTO.sex.data = '';
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
            this.djMemberSaveDTO.birthday = idCode.substring(6, 10) + "-" + idCode.substring(10, 12) + "-" + idCode.substring(12, 14);
            this.djMemberSaveDTO.sex.data = parseInt(idCode.substr(16, 1)) % 2 === 1?'男':'女';
            if(this.djMemberSaveDTO.joinPartySaveDTO.joinDate!='' && this.djMemberSaveDTO.joinPartySaveDTO.joinDate!=undefined && this.djMemberSaveDTO.joinPartySaveDTO.joinDate!=null && this.djMemberSaveDTO.joinPartySaveDTO.joinDate!='null'){
              let yearbrith=Number(this.djMemberSaveDTO.birthday.substring(0,4));
              let monthbrith=Number(this.djMemberSaveDTO.birthday.substring(5,7));
              let datebrith=Number(this.djMemberSaveDTO.birthday.substring(8,10));
              let yearjoin=Number(this.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(0,4));
              let monthjoin=Number(this.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(5,7));
              let datejoin=Number(this.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(8,10));

              let yearcha=yearjoin-yearbrith;
              if(yearcha<18){
                this.$message.warning("入党时党员要大于等于18岁");
                this.djMemberSaveDTO.idCode=''
                this.djMemberSaveDTO.birthday=''
              }else if(yearcha===18){
                if(monthjoin<monthbrith){
                  this.$message.warning("入党时党员要大于等于18岁");
                  this.djMemberSaveDTO.idCode=''
                  this.djMemberSaveDTO.birthday=''
                }else if(monthjoin===monthbrith){
                  if(datejoin<datebrith){
                    this.$message.warning("入党时党员要大于等于18岁");
                    this.djMemberSaveDTO.idCode=''
                    this.djMemberSaveDTO.birthday=''
                  }
                }
              }
            }
          },


          //家庭地址-省
          onChangeProvince(province){
            this.placeholders.province =  province.value;
            // this.$refs['refForm'].clearValidate(['address']);
          },
          //家庭地址-市
          onChangeCity(city){
            this.placeholders.city =  city.value
            // this.$refs['refForm'].clearValidate(['address']);
          },
          //家庭地址-区
          onChangeArea(area){
            this.placeholders.area =  area.value
            // this.$refs['refForm'].clearValidate(['address']);
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

          //单位地址-省
          onChangeProvincedw(province){
            this.placeholdersdw.province =  province.value;
            // this.$refs['refForm'].clearValidate(['address']);
          },
          //单位地址-市
          onChangeCitydw(city){
            this.placeholdersdw.city =  city.value
            // this.$refs['refForm'].clearValidate(['address']);
          },
          //单位地址-区
          onChangeAreadw(area){
            this.placeholdersdw.area =  area.value
            // this.$refs['refForm'].clearValidate(['address']);
          },
          //调用字典接口
          getCommDict(){
            let params = {
              types:['NATION','IS_MARRY','XW','EDUCATION','WORK_POST','FLOW_REASON','WORK_UNIT','ty_is','SEX']
            }
            commonReq.getHistoryDict(params).then(response =>{
              const res = response;
              // this.dicts.LDLX = res.PERSON_STATUS;
              this.dicts.NATION = res.NATION;
              this.dicts.IS_MARRY = res.IS_MARRY;
              this.dicts.XW = res.XW;
              this.dicts.EDUCATION = res.EDUCATION;
              this.dicts.WORK_POST = res.WORK_POST;
              this.dicts.FLOW_REASON = res.FLOW_REASON;
              this.dicts.WORK_UNIT = res.WORK_UNIT;
              // this.dicts.MENBER_MTYP=res.MENBER_MTYP;
              this.dicts.ty_is=res.ty_is
              this.dicts.SEX=res.SEX

            })

          },
           //自定义字典接口  PERSON_STATUS人员状态   MENBER_MTYP 人员类型
            getDict(){
                let params = {
                    type:'memberAddType'
                }
                commonReq.getCustomDict(params).then(response =>{
                    const res = response;
                    this.dicts.MENBER_MTYP = res;
                })
                let param = {
                    type:'memberAddState'
                }
                commonReq.getCustomDict(param).then(response =>{
                    const res = response;
                    this.dicts.LDLX = res;
                })
            },
          //获取工作单位
          getCompany(){
            let params = {

            }
            commonReq.getCompanyname(params).then(response =>{
              const res = response;
              this.unitList=res;

            })
          },
          //头像上传
          handleChange(){


          },
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
          },
          //所属党组织弹窗
          getTree(){
            this.$refs['refTree'].show()

          },
          // 返回党组织的值
          getOrg(row){
            this.djMemberSaveDTO.orgId=row
            this.djMemberSaveDTO.joinPartySaveDTO.orgId=row.key

            this.$refs['ruleForm'].clearValidate(['orgId.data']);
          },
          //取消
          goBtn () {
            this.$refs['ruleForm'].resetFields()
            this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
          },
          //身份证号和手机号失去焦点时，验证唯一性
          onInputBlurphone(){
            if(this.djMemberSaveDTO.phone!='' && this.djMemberSaveDTO.phone!=undefined && this.djMemberSaveDTO.phone!=null && this.djMemberSaveDTO.phone!='null'){
              let params = {
                memberId:this.editId,
                memberInfo:this.djMemberSaveDTO.phone
              }
              commonReq.getVerification(params).then(response =>{
                const res = response;
                if(res==true){
                  this.isPhone=true//验证手机号标识

                  // if(this.$refs.ruleForm){
                  //   this.$refs.ruleForm.validateField("phone");//添加附件验证
                  // }


                }else{
                  this.isPhone=false//验证手机号标识
                }

              }).finally(() => {

              });
            }
          },
          onInputBluridCode(){
            if(this.djMemberSaveDTO.idCode!='' && this.djMemberSaveDTO.idCode!=undefined && this.djMemberSaveDTO.idCode!=null && this.djMemberSaveDTO.idCode!='null'){
              let data = {
                memberId:this.editId,
                memberInfo:this.djMemberSaveDTO.idCode
              }
              commonReq.getVerification(data).then(response =>{
                const res = response;
                if(res==true){
                  // this.$message.warning("该身份证号已存在，请重新填写")
                  this.isCode=true//验证身份证标识
                }else{
                  this.isCode=false//验证身份证标识
                }
              }).finally(() => {

              });
            }
          },
          //保存
          save(){
            this.$refs['ruleForm'].validate(valid => { // 表单验证
              if (!valid) {
                setTimeout(()=>{
                  const isError= document.getElementsByClassName('is-error')
                  isError.length && isError[0].querySelector('input').focus()
                },100)

                return // 表单必填项判断
              }
              if(this.djMemberSaveDTO.orgId.data=='' || this.djMemberSaveDTO.orgId.data==undefined || this.djMemberSaveDTO.orgId.data==null || this.djMemberSaveDTO.orgId.data=='null'){
                this.$message.warning("请选择所属党组织")
                return
              }

              if(this.isPhone==true){
                this.$message.warning("该手机号已存在，请重新填写");
                return
              }
              if(this.isCode==true){
                this.$message.warning("该身份证号已存在，请重新填写");
                return
              }



              this.djMemberSaveDTO.homeAddress='';
              this.djMemberSaveDTO.homeAddress=this.placeholders.province   + '-' + this.placeholders.city + "-" +this.placeholders.area
              this.djMemberSaveDTO.natives='';
              this.djMemberSaveDTO.natives=this.placeholdersjg.province   + '-' + this.placeholdersjg.city + "-" +this.placeholdersjg.area
              this.djMemberSaveDTO.djUnitSaveDTO.unitAddress='';
              this.djMemberSaveDTO.djUnitSaveDTO.unitAddress=this.placeholdersdw.province   + '-' + this.placeholdersdw.city + "-" +this.placeholdersdw.area
              if((this.reference1=='' || this.reference1==undefined || this.reference1==null || this.reference1=='null') && (this.reference2=='' || this.reference2==undefined || this.reference2==null || this.reference2=='null')){
                this.djMemberSaveDTO.joinPartySaveDTO.reference=''
              }else{
                this.djMemberSaveDTO.joinPartySaveDTO.reference=this.reference1+','+this.reference2
              }

              //单选框
              for(let i=0;i<this.dicts.SEX.length;i++){
                if(this.djMemberSaveDTO.sex.data==this.dicts.SEX[i].name){
                  this.djMemberSaveDTO.sex.key=this.dicts.SEX[i].id;
                }
              }
              for(let i=0;i<this.dicts.ty_is.length;i++){
                if(this.djMemberSaveDTO.nativesTaiwan.data==this.dicts.ty_is[i].name){
                  this.djMemberSaveDTO.nativesTaiwan.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberSaveDTO.isFarmerWork.data==this.dicts.ty_is[i].name){
                  this.djMemberSaveDTO.isFarmerWork.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberSaveDTO.isPoor.data==this.dicts.ty_is[i].name){
                  this.djMemberSaveDTO.isPoor.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberSaveDTO.isVeteran.data==this.dicts.ty_is[i].name){
                  this.djMemberSaveDTO.isVeteran.key=this.dicts.ty_is[i].id;
                }
              }
              for(let i=0;i<this.dicts.LDLX.length;i++){
                if(this.djMemberSaveDTO.state.key==this.dicts.LDLX[i].id){
                  this.djMemberSaveDTO.state.data=this.dicts.LDLX[i].name
                }
              }

              if(this.fileids!='' && this.fileids!=undefined && this.fileids!=null && this.fileids!='null' && this.fileids.length>0){//上传头像关联
                let params = {
                  "bizId": this.otherData.bizId,
                  "bizType": this.otherData.bizType,
                  "ids": this.fileids
                }

                commonReq.relationFile(params).then(response =>{
                  //死亡和失联人员，新增和编辑点击保存打开移至历史人员库弹窗
                  let type='';
                  if(this.djMemberSaveDTO.state.key!='1248614282589896704' && this.djMemberSaveDTO.state.key!='1248614438517342208'){
                    type=3;
                    if(this.isEdit==1){
                      getManageAdd(this.djMemberSaveDTO).then(response => {
                        const res = response;
                        // this.$message.success("保存成功")
                        this.$message(this.successTip())
                        this.$refs['ruleForm'].resetFields()
                        this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                      })
                    }else if(this.isEdit==2){
                      this.djMemberUpdateDTO=this.djMemberSaveDTO;
                      getManageEdit(this.djMemberUpdateDTO).then(response => {
                        const res = response;
                        // this.$message.success("保存成功")
                        this.$message(this.successTip())
                        this.$refs['ruleForm'].resetFields()
                        this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                      })
                    }

                  }else{
                    type=4;
                    if(this.isEdit==1){
                      this.$refs['refHistory'].show(type, '', this.djMemberSaveDTO, this.isEdit)
                    }else if(this.isEdit==2){
                      this.$refs['refHistory'].show(type, this.params.id, this.djMemberSaveDTO, this.isEdit)
                    }

                  }
                })
              }else{//没上传头像直接保存
                //死亡和失联人员，新增和编辑点击保存打开移至历史人员库弹窗
                let type='';
                if(this.djMemberSaveDTO.state.key!='1248614282589896704' && this.djMemberSaveDTO.state.key!='1248614438517342208'){
                  type=3;
                  if(this.isEdit==1){
                    getManageAdd(this.djMemberSaveDTO).then(response => {
                      const res = response;
                      // this.$message.success("保存成功")
                      this.$message(this.successTip())
                      this.$refs['ruleForm'].resetFields()
                      this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                    })
                  }else if(this.isEdit==2){
                    this.djMemberUpdateDTO=this.djMemberSaveDTO;
                    getManageEdit(this.djMemberUpdateDTO).then(response => {
                      const res = response;
                      // this.$message.success("保存成功")
                      this.$message(this.successTip())
                      this.$refs['ruleForm'].resetFields()
                      this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                    })
                  }

                }else{
                  type=4;
                  if(this.isEdit==1){
                    this.$refs['refHistory'].show(type, '', this.djMemberSaveDTO, this.isEdit)
                  }else if(this.isEdit==2){
                    this.$refs['refHistory'].show(type, this.params.id, this.djMemberSaveDTO, this.isEdit)
                  }

                }
              }


            })
          },
          //打开移至历史库弹窗
          open(){
            let type='';
            if(this.djMemberSaveDTO.state.key!='1248614282589896704' && this.djMemberSaveDTO.state.key!='1248614438517342208'){
              type=1;
            }else{
              type=2;
            }
            for(var i=0;i<this.dicts.LDLX.length;i++){
              if(this.djMemberSaveDTO.state.key==this.dicts.LDLX[i].id){
                this.djMemberSaveDTO.state.data=this.dicts.LDLX[i].name
              }
            }
            this.$refs['refHistory'].show(type,this.params.id,this.djMemberSaveDTO)
          },
          //获取编辑数据
          getEdit(val){
            if(val){
              this.$refs['ruleForm'].resetFields()
              this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
              return
            }
            let params={
              id:this.params.id
            }
            getManageDetail(params).then(response => {
              const res = response;
              this.getFile(this.params.id);
              this.isEdittype=res.isEditType;
              this.editId=res.id;
              this.otherData.bizId=res.id;
              this.djMemberSaveDTO.id=res.id;
              this.djMemberSaveDTO.name=res.name;
              this.djMemberSaveDTO.developNature=res.developNature;
              this.djMemberSaveDTO.orgId=res.orgId;
              this.djMemberSaveDTO.phone=res.phone;
              this.djMemberSaveDTO.idCode=res.idCode;
              this.djMemberSaveDTO.nation=res.nation;
              this.djMemberSaveDTO.sex=res.sex;
              this.djMemberSaveDTO.birthday=res.birthday;
              this.djMemberSaveDTO.marriageCondition=res.marriageCondition;
              this.djMemberSaveDTO.natives=res.natives;
              this.djMemberSaveDTO.isVeteran=res.isVeteran;
              this.djMemberSaveDTO.isPoor=res.isPoor;
              this.djMemberSaveDTO.isFarmerWork=res.isFarmerWork;
              this.djMemberSaveDTO.nativesTaiwan=res.nativesTaiwan;
              this.djMemberSaveDTO.developNature=res.developNature;
              this.djMemberSaveDTO.state=res.state;
              this.djMemberSaveDTO.homeAddress=res.homeAddress;
              this.djMemberSaveDTO.homeDetailAddress=res.homeDetailAddress;
              this.djMemberSaveDTO.addressCoordinates=res.addressCoordinates;
              this.djMemberSaveDTO.djEducationSaveDTO.education=res.education;
              this.djMemberSaveDTO.djEducationSaveDTO.degree=res.degree;
              this.djMemberSaveDTO.djEducationSaveDTO.graduateSchool=res.graduateSchool;
              this.djMemberSaveDTO.djEducationSaveDTO.major=res.major;
              this.djMemberSaveDTO.djEducationSaveDTO.memberId=res.id;
              this.djMemberSaveDTO.djUnitSaveDTO.addressCoordinates=res.addressCoordinates;
              this.djMemberSaveDTO.djUnitSaveDTO.company=res.company;
              this.djMemberSaveDTO.djUnitSaveDTO.duty=res.duty;
              this.djMemberSaveDTO.djUnitSaveDTO.entType=res.entType;
              this.djMemberSaveDTO.djUnitSaveDTO.jobs=res.jobs;
              this.djMemberSaveDTO.djUnitSaveDTO.memberId=res.id;
              this.djMemberSaveDTO.djUnitSaveDTO.unitAddress=res.unitAddress;
              this.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress=res.unitDetailAddress;
              // this.djMemberSaveDTO.djUnitSaveDTO.memberId=res.id;
              this.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate=res.applyJoinDate;
              this.djMemberSaveDTO.joinPartySaveDTO.branch=res.branch;
              this.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate=res.confirmActivistDate;
              this.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate=res.confirmDevelopDate;
              this.djMemberSaveDTO.joinPartySaveDTO.joinDate=res.joinDate;
              this.djMemberSaveDTO.joinPartySaveDTO.memberId=res.id;
              this.djMemberSaveDTO.joinPartySaveDTO.orgId=res.orgId.key;
              if(res.partyAge!='' && res.partyAge!=null && res.partyAge!=undefined && res.partyAge!='null'){
                this.djMemberSaveDTO.joinPartySaveDTO.partyAge=res.partyAge;
              }else{
                this.djMemberSaveDTO.joinPartySaveDTO.partyAge=0
              }



              this.djMemberSaveDTO.joinPartySaveDTO.positiveDate=res.positiveDate;
              this.djMemberSaveDTO.joinPartySaveDTO.reference=res.reference;
              this.djMemberSaveDTO.joinPartySaveDTO.positiveDate=res.positiveDate;
              this.djMemberSaveDTO.joinPartySaveDTO.type=res.type;
              //判断转正时间和党龄是否出现
              if(this.djMemberSaveDTO.joinPartySaveDTO.type.key=='1248616761813630976'){
                this.isHide=true
              }else{
                this.isHide=false;
              }
              //介绍人
              if(this.djMemberSaveDTO.joinPartySaveDTO.reference!='' && this.djMemberSaveDTO.joinPartySaveDTO.reference!=undefined && this.djMemberSaveDTO.joinPartySaveDTO.reference!=null && this.djMemberSaveDTO.joinPartySaveDTO.reference!='null' && this.djMemberSaveDTO.joinPartySaveDTO.reference.length>0){
                let arr=this.djMemberSaveDTO.joinPartySaveDTO.reference.split(',');
                this.reference1=arr[0];
                this.reference2=arr[1]
              }else{
                this.reference1='';
                this.reference2='';
              }

              //家庭地址
              if(this.djMemberSaveDTO.homeAddress!='' && this.djMemberSaveDTO.homeAddress!=undefined && this.djMemberSaveDTO.homeAddress!=null && this.djMemberSaveDTO.homeAddress!='null'){
                let values =  this.djMemberSaveDTO.homeAddress.split('-')
                this.placeholders = {
                  province :values[0],
                  city:values[1],
                  area:values[2],
                }
              }

              //籍贯
              if(this.djMemberSaveDTO.natives!='' && this.djMemberSaveDTO.natives!=undefined && this.djMemberSaveDTO.natives!=null && this.djMemberSaveDTO.natives!='null'){
                let valuesjg =  this.djMemberSaveDTO.natives.split('-')
                this.placeholdersjg = {
                  province: valuesjg[0],
                  city: valuesjg[1],
                  area: valuesjg[2],
                }
              }

              //单位地址

              if(this.djMemberSaveDTO.djUnitSaveDTO.unitAddress!='' && this.djMemberSaveDTO.djUnitSaveDTO.unitAddress!=undefined && this.djMemberSaveDTO.djUnitSaveDTO.unitAddress!=null && this.djMemberSaveDTO.djUnitSaveDTO.unitAddress!='null') {
                let valuesdw = this.djMemberSaveDTO.djUnitSaveDTO.unitAddress.split('-')
                this.placeholdersdw = {
                  province: valuesdw[0],
                  city: valuesdw[1],
                  area: valuesdw[2],
                }
              }

            }).finally(() => {
              this.loading = false;
            });

          },
          //获取头像
          getFile(id){
            let params={
              bizIds: id,
            }
            commonReq.getAttachment(params).then(response => {
              const res = response;
              if(res.length > 0 && res[0].list.length > 0){
                if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
                  this.imageUrl = res[0].list[0].url
                }
              }
            })
          },
          //默认当前日期
          getNowTime() {
              var now = new Date();
              var year = now.getFullYear(); //得到年份
              var month = now.getMonth(); //得到月份
              var date = now.getDate(); //得到日期
              month = month + 1;
              month = month.toString().padStart(2, "0");
              date = date.toString().padStart(2, "0");
              var defaultDate = `${year}-${month}-${date}`;
              return defaultDate;
          },
          //专业从事技术pdf打开
          openPdf(){
            // window.open("http://192.168.0.39:10000/file/template/party/member/001.pdf")
            window.open(`${process.env.VUE_APP_IP_URL_PORT}/file/template/party/member/position.pdf`)
          },
          permision(row){
              if(db.get('USER').djOrg.code === '1001'){
                  return false;
              }

              return this.curOrgPerid(row.orgId.key);
          }

        }

    }
</script>

<style scoped>
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

.text /deep/ .el-form-item__label{
  line-height:20px;
}
/*头像上传样式*/
.person /deep/ .el-form-item__content{
  display:flex;
  flex-flow: nowrap;
  justify-content:flex-start;
  align-items:flex-end;
  margin-left:92px!important;
}
.person-img{
  margin: 0 0;
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
