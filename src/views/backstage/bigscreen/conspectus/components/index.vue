<!--园区概况-->
<template>
  <div class="party">
    <div class="conspectus-data">
      <el-form ref="refForm" :model="params" :rules="node" label-width="140px" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="园区共有企业数" prop="gardenCompanyNum">
              <el-input v-model="params.gardenCompanyNum" clearable type="text"
                        oninput="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="非公企业数" prop="gardenPrivateCompanyNum">
              <el-input v-model="params.gardenPrivateCompanyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="iconfont el-icon-warning-outline" title="请先输入联合成立党组织的企业数与单独成立党组织的企业数"></span>
            <el-form-item label="非公企业成立党组织数" prop="gardenPrivateOrgNum" class="multiple">
              <el-input v-model="params.gardenPrivateOrgNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="联合成立党组织的企业数" prop="gardenOrgNum" class="card_multiple">
              <el-input v-model="params.gardenOrgNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单独成立党组织的企业数" prop="gardenAloneOrgNum" class="card_multiple">
              <el-input v-model="params.gardenAloneOrgNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="园区共有党员数" prop="gardenMemberNum">
              <el-input v-model="params.gardenMemberNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <span class="iconfont el-icon-warning-outline" title="请先输入管理岗位、技术骨干、一线员工、企业出资人人数"></span>
            <el-form-item label="非公企业党员数" prop="gardenPrivateMemberNum">
              <el-input v-model="params.gardenPrivateMemberNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="管理岗位数" prop="gardenManagerialNum">
              <el-input v-model="params.gardenManagerialNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="技术骨干数" prop="gardenBackboneNum">
              <el-input v-model="params.gardenBackboneNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="一线员工" prop="gardenWorkerNum">
              <el-input v-model="params.gardenWorkerNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业出资人" prop="gardenCompanyMoneyNum">
              <el-input v-model="params.gardenCompanyMoneyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="党务工作者" prop="gardenPartyWorkerNum">
              <el-input v-model="params.gardenPartyWorkerNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="非公企业党组织书记"  prop="gardenPrivateSecretaryNum">
              <el-input v-model="params.gardenPrivateSecretaryNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专职党务工作者" prop="gardenFullPartyNum">
              <el-input v-model="params.gardenFullPartyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专职党组织书记(不担任公司其他职务)" prop="gardenOrgSecretaryNum" class="card_multiple">
              <el-input v-model="params.gardenOrgSecretaryNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="有专职党务工作者的非公企业" prop="gardenCompanyFullPartyNum" class="card_multiple">
              <el-input v-model="params.gardenCompanyFullPartyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="党建工作指导员(联络员)" prop="gardenGuideNum" class="card_multiple">
              <el-input v-model="params.gardenGuideNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="园区就业人数" prop="gardenJobNum">
              <el-input v-model="params.gardenJobNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="规上企业" prop="gardenBigCompanyNum">-->
<!--              <el-input v-model="params.gardenBigCompanyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum"/>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="签约项目" prop="gardenItemNum">-->
<!--              <el-input v-model="params.gardenItemNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="入驻企业" prop="gardenEnterCompanyNum">-->
<!--              <el-input v-model="params.gardenEnterCompanyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="税收收入" prop="gardenRevenue">-->
<!--              <el-input v-model="params.gardenRevenue" clearable type="text"-->
<!--                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?this.value.match(/\d+(\.\d{0,2})?/)[0] : ''" placeholder="请输入"  >-->
<!--                <i slot="suffix" style="font-style:normal;">亿元</i>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="产值同比增长" prop="gardenRise">-->
<!--              <el-input v-model="params.gardenRise" clearable type="text"-->
<!--                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?-->
<!--                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >-->
<!--                <i slot="suffix" style="font-style:normal;">%</i>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="一轻" prop="gardenLight">-->
<!--              <el-input v-model="params.gardenLight" clearable type="text"-->
<!--                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?-->
<!--                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >-->
<!--                <i slot="suffix" style="font-style:normal;">%</i>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="一新" prop="gardenNew">-->
<!--              <el-input v-model="params.gardenNew" clearable type="text"-->
<!--                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?-->
<!--                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''" placeholder="请输入" maxlength="6" >-->
<!--                <i slot="suffix" style="font-style:normal;">%</i>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="一重" prop="gardenVital">-->
<!--              <el-input v-model="params.gardenVital" clearable type="text"-->
<!--                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?-->
<!--                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >-->
<!--                <i slot="suffix" style="font-style:normal;">%</i>-->
<!--              </el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="最后一年党员数量" prop="gardenLastMemberNum">-->
<!--              <el-input v-model="params.gardenLastMemberNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--        </el-row>-->

        <el-row>
          <el-col :span="8">
            <el-form-item label="联合党支部" prop="gardenAllyPartyNum">
              <el-input v-model="params.gardenAllyPartyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="党支部" prop="gardenPartyNum">
              <el-input v-model="params.gardenPartyNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="企业行业党委" prop="gardenTradePoliticalNum">
              <el-input v-model="params.gardenTradePoliticalNum" clearable type="text" oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="智能家电" prop="appliancesType">
              <el-input v-model="params.appliancesType" clearable type="text" oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >
                <i slot="suffix" style="font-style:normal;">%</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="智慧物流" prop="logisticsType">
              <el-input v-model="params.logisticsType" clearable type="text"
                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?
                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >
                <i slot="suffix" style="font-style:normal;">%</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生命健康" prop="lifeType">
              <el-input v-model="params.lifeType" clearable type="text"
                        oninput="this.value=this.value.match(/\d+(\.\d{0,2})?/) ?
                        this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"  placeholder="请输入" maxlength="6" >
                <i slot="suffix" style="font-style:normal;">%</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
        <el-col :span="8">
          <el-form-item label="其他类型" >
            <el-input v-model="params.restType" clearable disabled type="text"
                      oninput="value=value.replace(/[^\d]/g,'')"  placeholder="请输入" :maxlength="maxnum" >
              <i slot="suffix" style="font-style:normal;">%</i>
            </el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <div class="conspectus-button">
          <el-button type="primary" @click="getReset">重置大屏</el-button>
          <el-button type="primary" @click="getUpdata">更新大屏</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {getConspectusDetail,getConspectusUpdata,getConspectusReset} from "@/api/backstage/sysset/bigscreen/conspectus/conspectus.js"

  export default {
    name: "index",
    data() {
      return {
        loading:true,//加载遮罩控制条件
        maxnum:5,
        params:{
          id:'',//编辑所需id
          gardenCompanyNum:0,//园区共有企业数
          gardenPrivateCompanyNum:0,//园区非公企业数
          gardenOrgNum:0,//联合成立党组织的企业数
          gardenAloneOrgNum:0,//单独成立党组织的企业数
          gardenPrivateMemberNum:0,//非公企业党员数
          gardenManagerialNum:0,//管理岗位
          gardenWorkerNum:0,//一线员工
          gardenCompanyMoneyNum:0, //企业出资人数
          gardenPrivateSecretaryNum:0, //非公企业党组织书记人数
          gardenFullPartyNum:0, //专职党务工作者人数
          gardenCompanyFullPartyNum:0, //有专职党务工作者的非公企业
          gardenGuideNum:0, //党建工作指导员（联络员）数
          gardenBigCompanyNum:0, //规模以上企业（规上企业）数
          gardenItemNum:0, //签约项目
          gardenRevenue:0, //税收收入（亿元）
          gardenRise:0, //产值同比增长（%）
          gardenNew:0, //一新
          gardenVital:0, //一重
          gardenAllyPartyNum:0, //联合党支部
          gardenPartyNum:0, //党支部
          gardenPrivateOrgNum:0, //非公企业成立党组织数
          gardenMemberNum:0, //园区共有党员数
          gardenBackboneNum:0, //技术骨干数
          gardenPartyWorkerNum:0, //党务工作者数
          gardenOrgSecretaryNum:0, //专职党组织书记（不担任公司其他职务）
          gardenJobNum:0, //园区就业人数
          gardenEnterCompanyNum:0, //入驻企业数
          gardenLight:0, //一轻
          gardenLastMemberNum:0, //最后一年党员数
          gardenTradePoliticalNum:0, //企业行业政委
          appliancesType:0, //智能家电
          logisticsType:0, //物流
          lifeType:0, //生命健康
          restType:"0", //其他类型
        },
        node:{
          gardenCompanyNum: [
            // {
            //   required: false,
            //   message: "请输入重点项目个数",
            //   trigger: "blur"
            // },
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPrivateCompanyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenOrgNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenAloneOrgNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPrivateMemberNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenManagerialNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenWorkerNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenCompanyMoneyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPrivateSecretaryNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenFullPartyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenCompanyFullPartyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenGuideNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          // gardenBigCompanyNum: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^([0-9]{1,5}|99999)$/,
          //     message: '请输入0 - 99999之间的整数'
          //   }
          // ],
          // gardenItemNum: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^([0-9]{1,5}|99999)$/,
          //     message: '请输入0 - 99999之间的整数'
          //   }
          // ],
          // gardenRevenue: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^(9999|((?!9999)[0-9][0-9]{0,3})(\.[0-9]{1,2})?)$/,
          //     message: "必须精确到两位小数，勿超过 9999"
          //   },
          // ],
          // gardenRise: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^(\-)*(\d+)\.(\d\d).*$/,
          //     message: "必须精确到2位小数"
          //   }
          // ],
          // gardenNew: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^(\-)*(\d+)\.(\d\d).*$/,
          //     message: "必须精确到2位小数"
          //   }
          // ],
          // gardenVital: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^(\-)*(\d+)\.(\d\d).*$/,
          //     message: "必须精确到2位小数"
          //   }
          // ],
          gardenAllyPartyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPartyNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPrivateOrgNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenMemberNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenBackboneNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenPartyWorkerNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenOrgSecretaryNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          gardenJobNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          // gardenEnterCompanyNum: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^([0-9]{1,5}|99999)$/,
          //     message: '请输入0 - 99999之间的整数'
          //   }
          // ],
          // gardenLight: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^(\-)*(\d+)\.(\d\d).*$/,
          //     message: "必须精确到2位小数"
          //   }
          // ],
          // gardenLastMemberNum: [
          //   {
          //     pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
          //     message: '请输入合法值'
          //   },
          //   {
          //     pattern: /^([0-9]{1,5}|99999)$/,
          //     message: '请输入0 - 99999之间的整数'
          //   }
          // ],
          gardenTradePoliticalNum: [
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^([0-9]{1,5}|99999)$/,
              message: '请输入0 - 99999之间的整数'
            }
          ],
          appliancesType: [
            {
              required: true,
              message: "请输入智能家电",
              trigger: "blur"
            },
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^(\-)*(\d+)\.(\d\d).*$/,
              message: "必须精确到2位小数"
            }
          ],
          logisticsType: [
            {
              required: true,
              message: "请输入智慧物流",
              trigger: "blur"
            },
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^(\-)*(\d+)\.(\d\d).*$/,
              message: "必须精确到2位小数"
            }
          ],
          lifeType: [
            {
              required: true,
              message: "请输入生命健康",
              trigger: "blur"
            },
            {
              pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
              message: '请输入合法值'
            },
            {
              pattern: /^(\-)*(\d+)\.(\d\d).*$/,
              message: "必须精确到2位小数"
            }
          ],

        }
      }
    },
    mounted() {
      this.getDate();
    },
    computed:{
      //设置 非公企业成立党组织数
      orgsum:function(){
        let num1=this.params.gardenOrgNum=='' ? 0:parseInt(this.params.gardenOrgNum)
        let num2=this.params.gardenAloneOrgNum=='' ? 0:parseInt(this.params.gardenAloneOrgNum)
        let num=num1+num2
        return num
      },
      // 设置 非公企业党员数
      personsum:function(){
        let num1=this.params.gardenBackboneNum=='' ? 0:parseInt(this.params.gardenBackboneNum)
        let num2=this.params.gardenManagerialNum=='' ? 0:parseInt(this.params.gardenManagerialNum)
        let num3=this.params.gardenWorkerNum=='' ? 0:parseInt(this.params.gardenWorkerNum)
        let num4=this.params.gardenCompanyMoneyNum=='' ? 0:parseInt(this.params.gardenCompanyMoneyNum)
        let num=num1+num2+num3+num4
        return num
      },
      // 设置 智能家电、智慧物流、生命健康和其他类型
      othertype:function(){
        let sum=parseFloat(this.params.appliancesType)+parseFloat(this.params.logisticsType)+parseFloat(this.params.lifeType)
        let num=parseFloat(100.00-sum).toFixed(2)
        return num
      },

    },
    watch: {
      //设置 非公企业成立党组织数
      orgsum: {
        handler(val, oldVal) {
          this.params.gardenPrivateOrgNum = val
        },
        deep: true
      },
      // 设置 非公企业党员数
      personsum: {
        handler(val, oldVal) {
          this.params.gardenPrivateMemberNum = val
        },
        deep: true
      },
      // 设置 智能家电、智慧物流、生命健康和其他类型
      othertype: {
        handler(val, oldVal) {
          this.params.restType = val
          console.log('this.params.restType: '+typeof this.params.restType+this.params.restType)
        },
        deep: true
      },
      // 设置 智能家电、智慧物流、生命健康三者之和不超过100
      "params.appliancesType": {
        handler(val, oldVal) {
          let sum=parseFloat(val)+parseFloat(this.params.logisticsType)+parseFloat(this.params.lifeType)
          if(sum>100){
            this.params.appliancesType=''
          }
          if(!this.params.appliancesType){
            this.params.restType=''
          }
        },
        deep: true
      },
      "params.logisticsType": {
        handler(val, oldVal) {
          let sum=parseFloat(val)+parseFloat(this.params.appliancesType)+parseFloat(this.params.lifeType)
          if(sum>100){
            this.params.logisticsType=''
          }
          if(!this.params.logisticsType){
            this.params.restType=''
          }
        },
        deep: true
      },
      "params.lifeType": {
        handler(val, oldVal) {
          let sum=parseFloat(val)+parseFloat(this.params.appliancesType)+parseFloat(this.params.logisticsType)
          if(sum>100){
            this.params.lifeType=''
          }
          if(!this.params.lifeType){
            this.params.restType=''
          }
        },
        deep: true
      }

      // params: {
      //   handler(val, oldVal){
      //     // val.gardenPrivateOrgNum = parseInt(val.gardenOrgNum) + parseInt(val.gardenAloneOrgNum) //设置 非公企业成立党组织数
      //     val.gardenPrivateMemberNum = parseInt(val.gardenBackboneNum) + parseInt(val.gardenManagerialNum) + parseInt(val.gardenWorkerNum) + parseInt(val.gardenCompanyMoneyNum);// 设置 非公企业党员数
      //     let allnum=parseFloat(val.appliancesType) + parseFloat(val.logisticsType) + parseFloat(val.lifeType)
      //     console.log('allnum: '+allnum)
      //     if(allnum>100.00){
      //       val.appliancesType=0.00
      //       val.logisticsType=0.00
      //       val.lifeType=0.00
      //     }else{
      //       let restType = (parseFloat(100.00) - (parseFloat(val.appliancesType) + parseFloat(val.logisticsType) +
      //         parseFloat(val.lifeType))).toString();// 设置其他类型数
      //       val.restType = parseFloat(restType).toFixed(2)
      //     }
      //   },
      //   deep:true
      // }
    },
    methods: {
      //点击导航调取接口数据
      getDate() {
        let params = {}
        this.loading = true;
        getConspectusDetail(params).then(response => {
          const res = response;
          this.params = res;
          this.params.gardenCompanyNum = res.gardenCompanyNum?res.gardenCompanyNum:0;
          this.params.gardenPrivateCompanyNum = res.gardenPrivateCompanyNum?res.gardenPrivateCompanyNum:0;
          this.params.gardenOrgNum = res.gardenOrgNum?res.gardenOrgNum:0;
          this.params.gardenAloneOrgNum = res.gardenAloneOrgNum?res.gardenAloneOrgNum:0;
          this.params.gardenPrivateMemberNum = res.gardenPrivateMemberNum?res.gardenPrivateMemberNum:0;
          this.params.gardenManagerialNum = res.gardenManagerialNum?res.gardenManagerialNum:0;
          this.params.gardenWorkerNum = res.gardenWorkerNum?res.gardenWorkerNum:0,//一线员工
            this.params.gardenCompanyMoneyNum = res.gardenCompanyMoneyNum?res.gardenCompanyMoneyNum:0, //企业出资人数
            this.params.gardenPrivateSecretaryNum = res.gardenPrivateSecretaryNum?res.gardenPrivateSecretaryNum:0, //非公企业党组织书记人数
            this.params.gardenFullPartyNum = res.gardenFullPartyNum?res.gardenFullPartyNum:0, //专职党务工作者人数
            this.params.gardenCompanyFullPartyNum = res.gardenCompanyFullPartyNum?res.gardenCompanyFullPartyNum:0, //有专职党务工作者的非公企业
            this.params.gardenGuideNum = res.gardenGuideNum?res.gardenGuideNum:0, //党建工作指导员（联络员）数
            // this.params.gardenBigCompanyNum = res.gardenBigCompanyNum?res.gardenBigCompanyNum:0, //规模以上企业（规上企业）数
            // this.params.gardenItemNum = res.gardenItemNum?res.gardenItemNum:0, //签约项目
            // this.params.gardenRevenue = res.gardenRevenue?res.gardenRevenue:0, //税收收入（亿元）
            // this.params.gardenRise = res.gardenRise?res.gardenRise:'0.00', //产值同比增长（%）
            // this.params.gardenNew = res.gardenNew?res.gardenNew:'0.00', //一新
            // this.params.gardenVital = res.gardenVital?res.gardenVital:'0.00', //一重
            this.params.gardenAllyPartyNum = res.gardenAllyPartyNum?res.gardenAllyPartyNum:0, //联合党支部
            this.params.gardenPartyNum = res.gardenPartyNum?res.gardenPartyNum:0, //党支部
            this.params.gardenPrivateOrgNum = res.gardenPrivateOrgNum?res.gardenPrivateOrgNum:0, //非公企业成立党组织数
            this.params.gardenMemberNum = res.gardenMemberNum?res.gardenMemberNum:0, //园区共有党员数
            this.params.gardenBackboneNum = res.gardenBackboneNum?res.gardenBackboneNum:0, //技术骨干数
            this.params.gardenPartyWorkerNum = res.gardenPartyWorkerNum?res.gardenPartyWorkerNum:0, //党务工作者数
            this.params.gardenOrgSecretaryNum = res.gardenOrgSecretaryNum?res.gardenOrgSecretaryNum:0, //专职党组织书记（不担任公司其他职务）
            this.params.gardenJobNum = res.gardenJobNum?res.gardenJobNum:0, //园区就业人数
            // this.params.gardenEnterCompanyNum = res.gardenEnterCompanyNum?res.gardenEnterCompanyNum:0, //入驻企业数
            // this.params.gardenLight = res.gardenLight?res.gardenLight:'0.00', //一轻
            // this.params.gardenLastMemberNum = res.gardenLastMemberNum?res.gardenLastMemberNum:0, //最后一年党员数
            this.params.gardenTradePoliticalNum = res.gardenTradePoliticalNum?res.gardenTradePoliticalNum:0, //企业行业政委
            this.params.appliancesType = res.appliancesType?res.appliancesType:'0.00', //智能家电
            this.params.logisticsType = res.logisticsType?res.logisticsType:'0.00', //物流
            this.params.lifeType = res.lifeType?res.lifeType:'0.00', //生命健康
            this.params.restType = res.restType?res.restType:'0.00'; //其他类型
        }).finally(() => {
          this.loading = false;
        });
      },
      //更新数据
      getUpdata () {
        this.loading = true;
        this.$refs['refForm'].validate(valid => {
          // 表单必填项判断
          if (!valid) {
            return ;
          }
        if(parseInt(this.params.gardenPrivateCompanyNum) > parseInt(this.params.gardenCompanyNum)){
          this.$message('非公企业数应小于园区共有企业数！')
          return
        }
        if(parseInt(this.params.gardenMemberNum) < parseInt(this.params.gardenPrivateMemberNum)){
          this.$message('非公企业党员数应小于园区共有党员数！')
          return
        }
        let sum =parseFloat(this.params.gardenNew) + parseFloat(this.params.gardenVital) + parseFloat(this.params.gardenLight)
        if(sum >100){
          this.$message('一新、一重、一轻的总和不能大于100.00！')
          return
        }
        let sum1 =parseFloat(this.params.appliancesType) + parseFloat(this.params.logisticsType) + parseFloat(this.params.lifeType) + parseFloat(this.params.restType)
        if(sum1 >100){
          this.$message('智能家电、智慧物流、生命健康、其他类型的总和不能大于100.00！')
          return
        }
        getConspectusUpdata(this.params).then(response => {
          const res = response;
          this.$emit('refresh')
          this.$message(this.successTip())
          this.getDate()
        }).finally(() => {
          this.loading = false;
        });
        })
      },
      //重置数据
      getReset(){
        let params = {}
        this.loading = true;
        getConspectusReset(params).then(response => {
          const res = response;
          this.params = res;
          this.params.gardenCompanyNum = res.gardenCompanyNum?res.gardenCompanyNum:0;
          this.params.gardenPrivateCompanyNum = res.gardenPrivateCompanyNum?res.gardenPrivateCompanyNum:0;
          this.params.gardenOrgNum = res.gardenOrgNum?res.gardenOrgNum:0;
          this.params.gardenAloneOrgNum = res.gardenAloneOrgNum?res.gardenAloneOrgNum:0;
          this.params.gardenPrivateMemberNum = res.gardenPrivateMemberNum?res.gardenPrivateMemberNum:0;
          this.params.gardenManagerialNum = res.gardenManagerialNum?res.gardenManagerialNum:0;
          this.params.gardenWorkerNum = res.gardenWorkerNum?res.gardenWorkerNum:0,//一线员工
            this.params.gardenCompanyMoneyNum = res.gardenCompanyMoneyNum?res.gardenCompanyMoneyNum:0, //企业出资人数
            this.params.gardenPrivateSecretaryNum = res.gardenPrivateSecretaryNum?res.gardenPrivateSecretaryNum:0, //非公企业党组织书记人数
            this.params.gardenFullPartyNum = res.gardenFullPartyNum?res.gardenFullPartyNum:0, //专职党务工作者人数
            this.params.gardenCompanyFullPartyNum = res.gardenCompanyFullPartyNum?res.gardenCompanyFullPartyNum:0, //有专职党务工作者的非公企业
            this.params.gardenGuideNum = res.gardenGuideNum?res.gardenGuideNum:0, //党建工作指导员（联络员）数
            // this.params.gardenBigCompanyNum = res.gardenBigCompanyNum?res.gardenBigCompanyNum:0, //规模以上企业（规上企业）数
            // this.params.gardenItemNum = res.gardenItemNum?res.gardenItemNum:0, //签约项目
            // this.params.gardenRevenue = res.gardenRevenue?res.gardenRevenue:0, //税收收入（亿元）
            // this.params.gardenRise = res.gardenRise?res.gardenRise:'0.00', //产值同比增长（%）
            // this.params.gardenNew = res.gardenNew?res.gardenNew:'0.00', //一新
            // this.params.gardenVital = res.gardenVital?res.gardenVital:'0.00', //一重
            this.params.gardenAllyPartyNum = res.gardenAllyPartyNum?res.gardenAllyPartyNum:0, //联合党支部
            this.params.gardenPartyNum = res.gardenPartyNum?res.gardenPartyNum:0, //党支部
            this.params.gardenPrivateOrgNum = res.gardenPrivateOrgNum?res.gardenPrivateOrgNum:0, //非公企业成立党组织数
            this.params.gardenMemberNum = res.gardenMemberNum?res.gardenMemberNum:0, //园区共有党员数
            this.params.gardenBackboneNum = res.gardenBackboneNum?res.gardenBackboneNum:0, //技术骨干数
            this.params.gardenPartyWorkerNum = res.gardenPartyWorkerNum?res.gardenPartyWorkerNum:0, //党务工作者数
            this.params.gardenOrgSecretaryNum = res.gardenOrgSecretaryNum?res.gardenOrgSecretaryNum:0, //专职党组织书记（不担任公司其他职务）
            this.params.gardenJobNum = res.gardenJobNum?res.gardenJobNum:0, //园区就业人数
            // this.params.gardenEnterCompanyNum = res.gardenEnterCompanyNum?res.gardenEnterCompanyNum:0, //入驻企业数
            // this.params.gardenLight = res.gardenLight?res.gardenLight:'0.00', //一轻
            this.params.gardenLastMemberNum = res.gardenLastMemberNum?res.gardenLastMemberNum:0, //最后一年党员数
            this.params.gardenTradePoliticalNum = res.gardenTradePoliticalNum?res.gardenTradePoliticalNum:0, //企业行业政委
          this.params.appliancesType = res.appliancesType?res.appliancesType:'0.00', //智能家电
            this.params.logisticsType = res.logisticsType?res.logisticsType:'0.00', //物流
            this.params.lifeType = res.lifeType?res.lifeType:'0.00', //生命健康
            this.params.restType = res.restType?res.restType:'0.00'; //其他类型
          this.$emit('refresh')
          this.$message(this.successTip())
        }).finally(() => {
          this.loading = false;
        });
      },
    }
  }
</script>

<style scoped>
  /deep/.el-col-8{
    position: relative;
  }
  .party {
    height: 100%;
    background: #fff;
  }
  .conspectus-data{
    padding: 20px;
  }
  .multiple /deep/.el-form-item__label{
    line-height: 20px;
    padding-left: 26px;
  }
  .card_multiple /deep/.el-form-item__label{
    line-height: 20px;
  }
  .iconfont {
    cursor: pointer;
    font-size: 16px;
    color: #e60012;
    position: absolute;
    left: 9px;
    top: 12px;
  }
  .conspectus-button{
    width: 100%;
    margin: 20px auto;
    text-align: center;
  }
</style>
