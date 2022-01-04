<template>
  <div class="add-content" v-cloak v-loading="loading">
    <el-form :model="djMemberFlowSaveDTO" :rules="node" ref="ruleForm" label-width="120px">
      <div class="base-information">
        <h4>个人基本信息</h4>
        <div class="base-content">
          <div class="base-content-per">
            <div class="base-left">
              <el-col :span="12">
              	<el-form-item class="is-required" label="姓名" prop="djMemberSaveDTO.name">
              		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.name" placeholder="请输入" maxlength="100"  clearable></el-input>
              	</el-form-item>
              </el-col>
              <el-col :span="12">
                <base-telephone v-model="djMemberFlowSaveDTO.djMemberSaveDTO.phone" :phone="'djMemberSaveDTO.phone'" :isImport="true" @blurInput="onInputBlurphone"/>
<!--              	<el-form-item class="is-required" label="联系方式" prop="djMemberSaveDTO.phone">-->
<!--              		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.phone" @blur="onInputBlurphone" placeholder="请输入手机号码或者座机号码" maxlength="13"  clearable></el-input>-->
<!--              	</el-form-item>-->
              </el-col>
              <el-col :span="12">

                <el-form-item  class="is-required" label="身份证号码" prop="djMemberSaveDTO.idCode" :rules="{required: true,validator: checkIdCode,trigger: 'blur'}">
                  <el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.idCode" @blur="onInputBluridCode" placeholder="请输入" maxlength="18"  clearable></el-input>
                </el-form-item>

              </el-col>
              <el-col :span="12">
                <el-form-item label="民族" prop="djMemberSaveDTO.nation.key">
                  <el-select
                    v-model="djMemberFlowSaveDTO.djMemberSaveDTO.nation.key"
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
              	<el-form-item label="出生日期" prop="djMemberSaveDTO.birthday">
              		<el-date-picker
                    v-model="djMemberFlowSaveDTO.djMemberSaveDTO.birthday"
                    type="date"
                    disabled
                    placeholder="请选择"
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
              	<el-form-item label="婚姻状况" prop="djMemberSaveDTO.marriageCondition.key">
                  <el-select
                      v-model="djMemberFlowSaveDTO.djMemberSaveDTO.marriageCondition.key"
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
              	<el-form-item class="is-required" label="状态" prop="djMemberSaveDTO.state.key">
                  <el-select
                      v-model="djMemberFlowSaveDTO.djMemberSaveDTO.state.key"
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
              <el-form-item label="性别" prop="djMemberSaveDTO.sex.data">
                <el-radio-group v-model="djMemberFlowSaveDTO.djMemberSaveDTO.sex.data">
                  <el-radio label="男"  disabled></el-radio>
                  <el-radio label="女"  disabled></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贫困户" prop="djMemberSaveDTO.isPoor.data">
                <el-radio-group v-model="djMemberFlowSaveDTO.djMemberSaveDTO.isPoor.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8"  class="marl-20">
              <el-form-item label="农民工" prop="djMemberSaveDTO.isFarmerWork.data">
                <el-radio-group v-model="djMemberFlowSaveDTO.djMemberSaveDTO.isFarmerWork.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退役军人" prop="djMemberSaveDTO.isVeteran.data">
                <el-radio-group v-model="djMemberFlowSaveDTO.djMemberSaveDTO.isVeteran.data">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="台湾籍" prop="djMemberSaveDTO.nativesTaiwan.data">
                <el-radio-group v-model="djMemberFlowSaveDTO.djMemberSaveDTO.nativesTaiwan.data">
                  <el-radio  label="是"></el-radio>
                  <el-radio  label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="24" class="select-list home-address">
              <el-form-item label="家庭地址" prop="province">
                <v-distpicker :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display: flex;"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                <el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.homeDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
                <img class="map-img" src="../../../../../../assets/page/icon-map.png" @click="toMap('home')">
              </el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item label="流动类型" prop="type.data">
            		<el-input v-model="djMemberFlowSaveDTO.type.data" disabled></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item label="党支部联系人" prop="branchPerson">
            		<el-input v-model="djMemberFlowSaveDTO.branchPerson" placeholder="请输入" maxlength="100"  clearable></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item  class="is-required" label="流出组织" prop="orgRelationAddress">
            		<el-input v-model="djMemberFlowSaveDTO.orgRelationAddress" placeholder="请输入党组织名称" maxlength="100"  clearable></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="8" class="text">
            	<el-form-item label="党支部联系人联系方式" prop="contact">
            		<el-input v-model="djMemberFlowSaveDTO.contact" @blur="onInputBlurcontact" placeholder="请输入" maxlength="11"  clearable></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item class="is-required" label="流入日期" prop="flowDate">
            		<el-date-picker
                  v-model="djMemberFlowSaveDTO.flowDate"
            		  type="date"
            		  placeholder="请选择"
            		  value-format="yyyy-MM-dd"
                  @change="selectlr"
                  :picker-options="pickerOptionslr"
                >
            		</el-date-picker>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item label="流动党员证编号" prop="flowMemberNum">
            		<el-input v-model="djMemberFlowSaveDTO.flowMemberNum" placeholder="请输入" maxlength="100"  clearable></el-input>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item label="流回日期" prop="returnflowDate" >
            		<el-date-picker
                  v-model="djMemberFlowSaveDTO.returnflowDate"
            		  type="date"
            		  placeholder="请选择"
                  @change="selectlh"
                  :picker-options="pickerOptionslh"
            		  value-format="yyyy-MM-dd">
            		</el-date-picker>
            	</el-form-item>
            </el-col>
            <el-col :span="8">
            	<el-form-item class="is-required" label="原因" prop="flowReasons.key">
                <el-select
                    v-model="djMemberFlowSaveDTO.flowReasons.key"
                    value-key="id"
                    filterable
                    placeholder="请选择"
                    style="width:100%;"
                    clearable>
                    <el-option
                        v-for="(item, index) in dicts.FLOW_REASON"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
            	<el-form-item label="备注" prop="remark">
                <el-input
                  v-model="djMemberFlowSaveDTO.remark"
                  type="textarea"
                  maxlength="500"

                  :autosize='{ minRows: 5, maxRows: 5}'
                  resize="none"
                  placeholder="请输入">
                </el-input>
              </el-form-item>
            </el-col>
          </div>
        </div>
      </div>
      <div class="base-information">
        <h4>学历信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="学历" prop="djMemberSaveDTO.djEducationSaveDTO.education.key">
          		<el-select
                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.education.key"
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
          	<el-form-item label="毕业院校" prop="djMemberSaveDTO.djEducationSaveDTO.graduateSchool">
          		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.graduateSchool" placeholder="请输入" maxlength="100"  clearable></el-input>
          	</el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item label="学位" prop="djMemberSaveDTO.djEducationSaveDTO.degree.key">
          		<el-select
                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.degree.key"
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
          	<el-form-item label="专业" prop="djMemberSaveDTO.djEducationSaveDTO.major">
          		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.major" placeholder="请输入" maxlength="100"  clearable></el-input>
          	</el-form-item>
          </el-col>
        </div>
      </div>
      <div class="base-information">
        <h4>单位信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="工作单位" prop="djMemberSaveDTO.djUnitSaveDTO.company">
              <el-input placeholder="请输入工作单位" v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.company" maxlength="100" clearable></el-input>
<!--          		<el-select-->
<!--                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.company.key"-->
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
          	<el-form-item label="从事专业技术职务" prop="djMemberSaveDTO.djUnitSaveDTO.duty">
          		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.duty" placeholder="请输入" maxlength="100"  clearable></el-input>
          	  <img @click="openPdf()" class="map-img" src="../../../../../../assets/page/icon-wh.png">
            </el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item label="企业类型" prop="djMemberSaveDTO.djUnitSaveDTO.entType.key">
          		<el-select
                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.entType.key"
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
          	<el-form-item label="工作岗位" prop="djMemberSaveDTO.djUnitSaveDTO.jobs.key">
          		<el-select
                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.jobs.key"
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
              <v-distpicker :province="placeholdersdw.province" :city="placeholdersdw.city" :area="placeholdersdw.area" style="display:flex;justify-content:space-between"  @province="onChangeProvincedw" @city="onChangeCitydw" @area="onChangeAreadw"></v-distpicker>
              <el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress" placeholder="请输入详细地址" maxlength="200"  clearable></el-input>
              <img class="map-img" src="../../../../../../assets/page/icon-map.png" @click="toMap('work')">
            </el-form-item>
          </el-col>
        </div>
      </div>
      <div class="base-information">
        <h4>入党信息</h4>
        <div class="base-content">
          <el-col :span="8">
          	<el-form-item class="is-required" label="人员类型" prop="djMemberSaveDTO.joinPartySaveDTO.type.key">
          		<el-select
                  v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.type.key"
          		    value-key="id"
          		    filterable
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
          <el-col :span="8" class='text'>
          	<el-form-item label="入党时所在党支部" prop="djMemberSaveDTO.joinPartySaveDTO.branch">
          		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.branch" placeholder="请输入" maxlength="100"  clearable/>
          	</el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item label="申请入党日期" prop="djMemberSaveDTO.joinPartySaveDTO.applyJoinDate" :rules="{required: false,validator: checkApplyJoinDate,trigger: 'blur'}">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate"
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
          	<el-form-item label="确定为入党积极分子日期" prop="djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate" :rules="{required: false,validator: checkConfirmActivistDate,trigger: 'blur'}">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate"
          		  type="date"
                :picker-options="pickerOptions"
          		  placeholder="请选择"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" class="text">
          	<el-form-item label="确定为发展对象日期" prop="djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate" :rules="{required: false,validator: checkConfirmDevelopDate,trigger: 'blur'}">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate"
          		  type="date"
                :picker-options="pickerOptions"
          		  placeholder="请选择"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8">
          	<el-form-item class="is-required" label="入党日期" prop="djMemberSaveDTO.joinPartySaveDTO.joinDate" :rules="{required: true,validator: checkJoinDate,trigger: 'blur'}">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate"
          		  type="date"
          		  placeholder="请选择"
                @change="selectjoin"
                :picker-options="pickerOptions"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" v-if="isHide" >
          	<el-form-item class="is-required" label="转正日期" prop="djMemberSaveDTO.joinPartySaveDTO.positiveDate" :rules="{required: true,validator:checkPositiveDate,trigger: 'blur'}">
          		<el-date-picker
                v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate"
          		  type="date"
          		  placeholder="请选择"
                :picker-options="pickerOptions"
                @change="pickerChange"
          		  value-format="yyyy-MM-dd">
          		</el-date-picker>
          	</el-form-item>
          </el-col>
          <el-col :span="8" v-if="isHide">
          	<el-form-item label="党龄" prop="djMemberSaveDTO.joinPartySaveDTO.partyAge">
          		<el-input v-model="djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge" disabled placeholder="请输入数字">
          		  <template slot="append">年</template>
          		</el-input>
          	</el-form-item>
          </el-col>
        </div>
      </div>
      <el-col :span="24" class="tac">
        <!-- <el-button v-if="isShow" @click="open()">移至历史人员库</el-button> -->
        <el-button class="js-button" @click="goBtn()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </el-col>

    </el-form>
    <!--移至历史人员库弹窗-->
    <!-- <move-historical-library ref="refHistory" @refresh="getEdit"/> -->

    <!-- 地图弹出框-->
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import VDistpicker from 'v-distpicker'
    import db from "@/utils/localstorage"
    import {Base64} from 'js-base64'
    import {checkIdCodeBool} from "@/utils/my-validate";
    // import MoveHistoricalLibrary from '../components/move-historical-library'//移至历史人员库弹窗
    import commonReq  from "@/api/public/commonReq.js"
    import {getFloatAdd,getFloatDetail,getFloatEdit} from "@/api/backstage/party/basic/float/float.js"
    import BMap from '@/components/BMap/BMap'

    export default {
        name: "FloatAdd",
        components: {
          VDistpicker,
          BMap

          // MoveHistoricalLibrary

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
            djMemberFlowSaveDTO: {//党员流动
              branchPerson:'',//党支部联系人
              contact:'',//手机号码
              djMemberSaveDTO:{//党员信息
                name:'',//姓名
                developNature:{//发展性质
                  data:'',
                  key:''
                },
                addressCoordinates:'',//家庭地址坐标
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
                  company: '',//单位
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
              flowDate:'',//流入/流出日期
              flowMemberNum:'',//流动党员证编号
              flowReasons:{//流动原因
                data:'',
                key:''
              },
              memberId:{//流动党员id
                data:'',
                key:''
              },
              orgId:{//所属组织(流出)
                data:'',
                key:''
              },
              orgRelationAddress:'',//流出地点(流入)
              remark:'',//备注
              returnflowDate:'',//流回日期
              type:{//流动类型-流入
                data:'流入',
                key:'1264044474489634816'
              },
            },
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
            // isShow:false,//移至历史库按钮是否出现
            isPhone:false,//验证手机号标识
            isCode:false,//验证身份证标识
            isHide:false,
            node: { // 必填项判断
              'djMemberSaveDTO.name':[{
                required: true,
                message: '请输入姓名',
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
              'djMemberSaveDTO.state.key':[{
                required: true,
                message: '请选择状态',
                trigger: 'change'
              }],
              'orgRelationAddress':[{
                required: true,
                message: '请输入流出地址',
                trigger: 'blur'
              }],
              'flowDate':[{
                required: true,
                message: '请选择流入日期',
                trigger: 'change'
              }],
              'flowReasons.key':[{
                required: true,
                message: '请选择原因',
                trigger: 'change'
              }],
              'djMemberSaveDTO.djEducationSaveDTO.education.key':[{
                required: true,
                message: '请选择学历',
                trigger: 'change'
              }],
              'djMemberSaveDTO.djUnitSaveDTO.company':[{
                required: true,
                message: '请输入工作单位',
                trigger: 'blur'
              }],
              'djMemberSaveDTO.joinPartySaveDTO.type.key':[{
                required: true,
                message: '请选择人员类型',
                trigger: 'change'
              }],
              // 'djMemberSaveDTO.joinPartySaveDTO.joinDate':[{
              //   required: true,
              //   message: '请选择入党日期',
              //   trigger: 'change'
              // }],
              // 'djMemberSaveDTO.joinPartySaveDTO.positiveDate':[{
              //   required: true,
              //   message: '请选择转正日期',
              //   trigger: 'change'
              // }],
            },
            otherData:{//额外参数
              id: '',
              bizId: "",
              bizType: "float",
              isSingle: false
            },
            action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
            fileids:[],//附件id
            pickerOptionslh: {//流回日期限制

            },
            pickerOptionslr: {//流入日期限制

            },
            mapVisible: false, // 是否打开地图
            isMapType: 'home',//home: 点击的是家庭地址；work: 点击的是单位地址
          }
        },
        activated(){
          this.$nextTick(function(){
            this.$refs['ruleForm'].resetFields()


            this.placeholders = {//家庭地址
              province: '安徽省',
                city: '合肥市',
                area:'蜀山区' ,
            }
            this.djMemberFlowSaveDTO.djMemberSaveDTO.homeDetailAddress = ''

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
            this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress = ''
            this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate = ''
            this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge = ''

            this.reference1 = '',//介绍人1
            this.reference2 = '',//介绍人2

            this.imageUrl = ''

            this.isPhone = false
            this.isCode = false
            this.isHide = false
          })

          this.getDict();
          this.partyUid();
          //判断是编辑页面
          if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
            this.loading =true;
            this.isEdit=2;
            this.getEdit();
          }
        },
        mounted() {
          this.getDict();
          // this.getCompany();
          this.partyUid();
          //console.log('this.params: '+JSON.stringify(this.params))
          //判断是编辑页面
          if(this.params!='' && JSON.stringify(this.params)!='{}' && this.params!=undefined && this.params!=null && this.params!='null'){
            // this.isShow=true;
            this.loading =true;
            this.isEdit=2;
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
                this.djMemberFlowSaveDTO.djMemberSaveDTO.homeDetailAddress = data.address
                this.djMemberFlowSaveDTO.djMemberSaveDTO.addressCoordinates = data.coordinates

                this.placeholders = {
                  province: data.province,
                  city: data.city,
                  area: data.district ,
                }
              }else if(this.isMapType === 'work'){
                this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress = data.address
                this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.addressCoordinates = data.coordinates

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
          //流回日期和流入日期限制
          selectlr(val){
            if(val!='' && val!=undefined && val!=null && val!='null') {
              let preDate = new Date(val).getTime();
              this.pickerOptionslh={//时间限制
                disabledDate(time) {
                  return time.getTime() < preDate
                },
              }

            }

          },
          selectlh(val){
            if(val!='' && val!=undefined && val!=null && val!='null') {
              let preDate =  new Date(val).getTime()-24*60*60*1000;
              this.pickerOptionslr={//时间限制
                disabledDate(time) {
                  return time.getTime() > preDate
                },
              }
            }
          },
          //验证党支部联系人联系方式
          onInputBlurcontact(){
            if(this.djMemberFlowSaveDTO.contact!='' && this.djMemberFlowSaveDTO.contact!=undefined && this.djMemberFlowSaveDTO.contact!=null && this.djMemberFlowSaveDTO.contact!='null'){
              let rex=/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
              if(!(rex.test(this.djMemberFlowSaveDTO.contact))){
                this.$message.warning("请输入正确的党支部联系人联系方式")
              }
            }
          },
          //隐藏转正时间
          selectHide(value){
            if(value=='1248616761813630976'){
              this.isHide=true
            }else{
              this.isHide=false;
              // this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate='';
              // this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge='';
            }
          },
            //时间事件
            pickerChange(value){
                // 处理党龄
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate !=''){
                    var date = new Date(this.getNowTime())
                    var time1 = date.getTime();
                    var date1 = new Date(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate)
                    var time2 = date1.getTime();
                    var total = (time1 - time2)/1000;
                    this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge =parseInt((total / (24*60*60))/365);
                }
                else {
                    this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge = 0
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
            let j = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
            if(!value){
              callback();
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('确定为入党积极分子日期需大于申请入党日期'));
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
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
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
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
            let f = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;
            let j = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;
            if(!value){
              callback();
            }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
              return callback(new Error('确定为发展对象日期需大于申请入党日期'));
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('确定为发展对象日期需大于入党积极分子日期'));
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.joinDate");
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
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
            let f = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
            let m = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
            let j = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
            let h = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
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
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate = '';
              return callback(new Error('转正日期和入党日期需大于一年'));
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
            let f = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate;//申请入党日期
            let m = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate;//确定为入党积极分子日期
            let j = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate;//确定为发展对象日期
            // let h = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate;//入党日期
            // let p = this.djMemberSaveDTO.joinPartySaveDTO.positiveDate;//转正日期
            if(!value){
              return callback(new Error('请选择入党日期'));
            }else if(f && !this.checkDateGreaterThanByNowDate(value,f)){
              return callback(new Error('入党日期需大于申请入党日期'));
            }else if(m && !this.checkDateGreaterThanByNowDate(value,m)){
              return callback(new Error('入党日期需大于确定为入党积极分子日期'));
            }else if(j && !this.checkDateGreaterThanByNowDate(value,j)){
              return callback(new Error('入党日期需大于确定为发展对象日期'));
            }else if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate){
              this.$refs.ruleForm.validateField("djMemberSaveDTO.joinPartySaveDTO.positiveDate");
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
              this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday = '';
              this.djMemberFlowSaveDTO.djMemberSaveDTO.sex.data = '';
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
            this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday = idCode.substring(6, 10) + "-" + idCode.substring(10, 12) + "-" + idCode.substring(12, 14);
            this.djMemberFlowSaveDTO.djMemberSaveDTO.sex.data = parseInt(idCode.substr(16, 1)) % 2 === 1?'男':'女';
            if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!='null'){
              let yearbrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(0,4));
              let monthbrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(5,7));
              let datebrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(8,10));
              let yearjoin=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(0,4));
              let monthjoin=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(5,7));
              let datejoin=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate.substring(8,10));

              let yearcha=yearjoin-yearbrith;
              if(yearcha<18){
                this.$message.warning("党员要大于等于18岁");
                this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode=''
                this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday=''
              }else if(yearcha===18){
                if(monthjoin<monthbrith){
                  this.$message.warning("党员要大于等于18岁");
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode=''
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday=''
                }else if(monthjoin===monthbrith){
                  if(datejoin<datebrith){
                    this.$message.warning("党员要大于等于18岁");
                    this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode=''
                    this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday=''
                  }
                }
              }
            }
          },
          //党员要大于等于18岁
          selectjoin(val){
            if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate!='null'){
              let yearbrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(0,4));
              let monthbrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(5,7));
              let datebrith=Number(this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday.substring(8,10));
              let yearjoin=Number(val.substring(0,4));
              let monthjoin=Number(val.substring(5,7));
              let datejoin=Number(val.substring(8,10));

              let yearcha=yearjoin-yearbrith;
              if(yearcha<18){
                this.$message.warning("党员要大于等于18岁");
                this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate=''
              }else if(yearcha===18){
                if(monthjoin<monthbrith){
                  this.$message.warning("党员要大于等于18岁");
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate=''
                }else if(monthjoin===monthbrith){
                  if(datejoin<datebrith) {
                    this.$message.warning("党员要大于等于18岁");
                    this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate = ''
                  }
                }
              }
            }
          },


          //新增时获取UID
          partyUid(){
            commonReq.getNewUid({}).then(response =>{
              const res = response
              this.djMemberFlowSaveDTO.id = res;
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
            const res = file
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
          getDict(){
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
              this.dicts.ty_is=res.ty_is;
              this.dicts.SEX=res.SEX;

            })
            let params1 = {
              type:'memberFlowAddState'
            }
            commonReq.getCustomDict(params1).then(response =>{
              const res = response;
              this.dicts.LDLX = res;
            })
            let params2 = {
              type:'memberAddType'
            }
            commonReq.getCustomDict(params2).then(response =>{
              const res = response;
              this.dicts.MENBER_MTYP = res;
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
          // handleChange(){
          //
          //
          // },
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            //console.log(file)
          },
          //取消
          goBtn () {
            this.$refs['ruleForm'].resetFields()
            this.$emit('handleSwitch', {name: 'Index'})
          },
          //身份证号和手机号失去焦点时，验证唯一性
          onInputBlurphone(){
            if(this.djMemberFlowSaveDTO.djMemberSaveDTO.phone!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.phone!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.phone!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.phone!='null'){
              let params = {
                memberId:this.editId,
                memberInfo:this.djMemberFlowSaveDTO.djMemberSaveDTO.phone
              }
              commonReq.getVerification(params).then(response =>{
                const res = response;
                if(res==true){
                  // this.$message.warning("该手机号码已存在，请重新填写")
                  this.isPhone=true//验证手机号标识
                }else{
                  this.isPhone=false//验证手机号标识
                }
              }).finally(() => {

              });
            }
          },
          onInputBluridCode(){
            if(this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode!='null'){
              let data = {
                memberId:this.editId,
                memberInfo:this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode
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
              // if(!(/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/.test(this.djMemberFlowSaveDTO.djMemberSaveDTO.phone))){
              //   this.$message.warning("请输入正确的电话号码或座机号码")
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
              if(this.djMemberFlowSaveDTO.contact!='' && this.djMemberFlowSaveDTO.contact!=undefined && this.djMemberFlowSaveDTO.contact!=null && this.djMemberFlowSaveDTO.contact!='null'){
                let rex=/^((0\d{2,3}-\d{7,8})|(1\d{10}))$/;
                if(!(rex.test(this.djMemberFlowSaveDTO.contact))){
                  this.$message.warning("请输入正确的党支部联系人联系方式")
                  return
                }
              }
              this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress='';
              this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress=this.placeholders.province   + '-' + this.placeholders.city + "-" +this.placeholders.area
              this.djMemberFlowSaveDTO.djMemberSaveDTO.natives='';
              this.djMemberFlowSaveDTO.djMemberSaveDTO.natives=this.placeholdersjg.province   + '-' + this.placeholdersjg.city + "-" +this.placeholdersjg.area
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress='';
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress=this.placeholdersdw.province   + '-' + this.placeholdersdw.city + "-" +this.placeholdersdw.area

              if((this.reference1=='' || this.reference1==undefined || this.reference1==null || this.reference1=='null') && (this.reference2=='' || this.reference2==undefined || this.reference2==null || this.reference2=='null')){
                this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference=''
              }else{
                this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference=this.reference1+','+this.reference2
              }

              //单选框
              for(let i=0;i<this.dicts.SEX.length;i++){
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.sex.data==this.dicts.SEX[i].name){
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.sex.key=this.dicts.SEX[i].id;
                }
              }
              for(var i=0;i<this.dicts.ty_is.length;i++){
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.nativesTaiwan.data==this.dicts.ty_is[i].name){
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.nativesTaiwan.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.isFarmerWork.data==this.dicts.ty_is[i].name){
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.isFarmerWork.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.isPoor.data==this.dicts.ty_is[i].name){
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.isPoor.key=this.dicts.ty_is[i].id;
                }
                if(this.djMemberFlowSaveDTO.djMemberSaveDTO.isVeteran.data==this.dicts.ty_is[i].name){
                  this.djMemberFlowSaveDTO.djMemberSaveDTO.isVeteran.key=this.dicts.ty_is[i].id;
                }
              }


              if(this.fileids!='' && this.fileids!=undefined && this.fileids!=null && this.fileids!='null' && this.fileids.length>0){//上传头像关联
                let params = {
                  "bizId": this.otherData.bizId,
                  "bizType": this.otherData.bizType,
                  "ids": this.fileids
                }

                commonReq.relationFile(params).then(response =>{
                  if(this.isEdit==1){
                    getFloatAdd(this.djMemberFlowSaveDTO).then(response => {
                      const res = response;
                      // this.$message.success("保存成功")
                      this.$message(this.successTip())
                      this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                    }).finally(() => {

                    });
                  }else if(this.isEdit==2){
                    this.djMemberFlowSaveDTO.djMemberUpdateDTO=this.djMemberFlowSaveDTO.djMemberSaveDTO;
                    getFloatEdit(this.djMemberFlowSaveDTO).then(response => {
                      const res = response;
                      // this.$message.success("保存成功")
                      this.$message(this.successTip())
                      this.$refs['ruleForm'].resetFields()
                      this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                    }).finally(() => {
                      //console.log("finally");
                    });
                  }

                }).catch(() =>{

                })
              }else{//没上传头像直接保存
                if(this.isEdit==1){
                  getFloatAdd(this.djMemberFlowSaveDTO).then(response => {
                    const res = response;
                    // this.$message.success("保存成功")
                    this.$message(this.successTip())
                    this.$refs['ruleForm'].resetFields()
                    this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                  }).finally(() => {

                  });
                }else if(this.isEdit==2){
                  this.djMemberFlowSaveDTO.djMemberUpdateDTO=this.djMemberFlowSaveDTO.djMemberSaveDTO;
                  getFloatEdit(this.djMemberFlowSaveDTO).then(response => {
                    const res = response;
                    // this.$message.success("保存成功")
                    this.$message(this.successTip())
                    this.$refs['ruleForm'].resetFields()
                    this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
                  }).finally(() => {
                    //console.log("finally");
                  });
                }
              }

            })
          },
          //打开移至历史库弹窗
          // open(){
          //   let type='';
          //   if(this.djMemberFlowSaveDTO.djMemberSaveDTO.state.key!='1248614282589896704' && this.djMemberFlowSaveDTO.djMemberSaveDTO.state.key!='1248614438517342208'){
          //     type=1;
          //   }else{
          //     type=2;
          //   }
          //   this.$refs['refHistory'].show(type,this.djMemberFlowSaveDTO.memberId.key,this.djMemberFlowSaveDTO.djMemberSaveDTO.state)
          // },
          //获取编辑数据
          getEdit(){
            let params={
              id:this.params.id
            }
            getFloatDetail(params).then(response => {
              //console.log('编辑数据： '+JSON.stringify(response))
              const res = response;
              this.getFile(res.member.id);
              // this.djMemberFlowSaveDTO={};
              this.editId=res.member.id;
              this.otherData.bizId = res.member.id;
              this.djMemberFlowSaveDTO.memberId=res.memberId;
              this.djMemberFlowSaveDTO.type=res.type;
              // this.djMemberFlowSaveDTO.orgId=res.orgId;
              this.djMemberFlowSaveDTO.flowDate=res.flowDate;
              this.djMemberFlowSaveDTO.returnflowDate=res.returnflowDate;
              this.djMemberFlowSaveDTO.flowReasons=res.flowReasons;
              this.djMemberFlowSaveDTO.remark=res.remark;
              this.djMemberFlowSaveDTO.branchPerson=res.branchPerson;
              this.djMemberFlowSaveDTO.contact=res.contact;
              this.djMemberFlowSaveDTO.orgRelationAddress=res.orgRelationAddress;
              this.djMemberFlowSaveDTO.flowMemberNum=res.flowMemberNum;
              this.djMemberFlowSaveDTO.id=this.params.id;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.id=res.member.id;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.name=res.member.name;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.phone=res.member.phone;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.idCode=res.member.idCode;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.nation=res.member.nation;
              // this.djMemberFlowSaveDTO.djMemberSaveDTO.isEditType=res.member.isEditType;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.sex=res.member.sex;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.birthday=res.member.birthday;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.marriageCondition=res.member.marriageCondition;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.natives=res.member.natives;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.isVeteran=res.member.isVeteran;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.isPoor=res.member.isPoor;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.isFarmerWork=res.member.isFarmerWork;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.nativesTaiwan=res.member.nativesTaiwan;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.state=res.member.state;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress=res.member.homeAddress;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.homeDetailAddress=res.member.homeDetailAddress;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.addressCoordinates=res.member.addressCoordinates;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.education=res.member.education;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.degree=res.member.degree;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.graduateSchool=res.member.graduateSchool;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djEducationSaveDTO.major=res.member.major;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.addressCoordinates=res.member.addressCoordinates;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.company=res.member.company;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.duty=res.member.duty;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.entType=res.member.entType;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.jobs=res.member.jobs;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.memberId=res.member.memberId;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress=res.member.unitAddress;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitDetailAddress=res.member.unitDetailAddress;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.memberId=res.member.id;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate=res.member.applyJoinDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.branch=res.member.branch;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmActivistDate=res.member.confirmActivistDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.confirmDevelopDate=res.member.confirmDevelopDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.joinDate=res.member.joinDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.memberId=res.member.id;
              // this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.orgId=res.member.orgId;

              //限制流回、流入时间
              if(this.djMemberFlowSaveDTO.flowDate!='' && this.djMemberFlowSaveDTO.flowDate!=undefined && this.djMemberFlowSaveDTO.flowDate!=null && this.djMemberFlowSaveDTO.flowDate!='null') {
                let preDate = new Date(this.djMemberFlowSaveDTO.flowDate).getTime();
                this.pickerOptionslh={//时间限制
                  disabledDate(time) {
                    return time.getTime() < preDate
                  },
                }

              }
              if(this.djMemberFlowSaveDTO.returnflowDate!='' && this.djMemberFlowSaveDTO.returnflowDate!=undefined && this.djMemberFlowSaveDTO.returnflowDate!=null && this.djMemberFlowSaveDTO.returnflowDate!='null') {
                let preDate = new Date(this.djMemberFlowSaveDTO.flowDate).getTime();
                this.pickerOptionslr={//时间限制
                  disabledDate(time) {
                    return time.getTime() > preDate
                  },
                }

              }



              if(res.member.partyAge!='' && res.member.partyAge!=null && res.member.partyAge!=undefined && res.member.partyAge!='null'){
                this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge=res.member.partyAge;
              }else{
                this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.partyAge=0;
              }


              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate=res.member.positiveDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference=res.member.reference;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.positiveDate=res.member.positiveDate;
              this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.type=res.member.type;
              //判断转正时间和党龄是否出现
              if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.type.key=='1248616761813630976'){
                this.isHide=true
              }else{
                this.isHide=false;
              }
              //介绍人
              if(this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference!='null') {
                let arr = this.djMemberFlowSaveDTO.djMemberSaveDTO.joinPartySaveDTO.reference.split(',');
                this.reference1 = arr[0];
                this.reference2 = arr[1]
              }

              //家庭地址
              if(this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress!='null') {
                let values = this.djMemberFlowSaveDTO.djMemberSaveDTO.homeAddress.split('-')
                this.placeholders = {
                  province: values[0],
                  city: values[1],
                  area: values[2],
                }
              }
              //籍贯
              if(this.djMemberFlowSaveDTO.djMemberSaveDTO.natives!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.natives!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.natives!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.natives!='null') {
                let valuesjg = this.djMemberFlowSaveDTO.djMemberSaveDTO.natives.split('-')
                this.placeholdersjg = {
                  province: valuesjg[0],
                  city: valuesjg[1],
                  area: valuesjg[2],
                }
              }
              //单位地址
              if(this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress!='' && this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress!=undefined && this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress!=null && this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress!='null') {
                let valuesdw =  this.djMemberFlowSaveDTO.djMemberSaveDTO.djUnitSaveDTO.unitAddress.split('-')
                this.placeholdersdw = {
                  province :valuesdw[0],
                  city:valuesdw[1],
                  area:valuesdw[2] ,
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
              //console.log('头像： '+JSON.stringify(response))
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
          }

        }

    }
</script>

<style scoped>
  /deep/ .el-form-item__content {
    line-height: 36px;
  }
  .marl-20 /deep/ .el-form-item{
    margin-left:30px;
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
.img-content .personimg{
  width:100%;
}

.add-content /deep/ .el-input__suffix{
  top: 0px;
}
.home-address /deep/ .distpicker-address-wrapper{
  margin-right: 0px;
}
.home-address /deep/ .distpicker-address-wrapper label{
  width: 130px;
  margin-left: 10px;
}
.home-address /deep/ .distpicker-address-wrapper label select{
  width: 100%;
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
