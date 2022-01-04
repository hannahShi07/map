<!--企业筛选-->
<template>
  <div class="financialServices">
    <div class="fixfoot-wrap">
      <!-- 主体部分 -->
      <div class="content_box">
        <div class="partyBg"></div>
        <div class="financialCont">
          <div class="zhhy-container search-container">
            <div class="main-box">
              <!--筛选条件-->
              <div class="zh-filter-wrap zh-collapse actived">
                <div class="tit">
                  <div class="leftlabel fl"><span class="iconfont icon-filter"></span>
                    <span class="filtertype-select" :class="{'actived':isChecked==0}"  @click="filtertypeSelect(0)">普通筛选
                  </span>
                    <span class="iconfont icon-yqfqiehuan"></span>
                    <span class="filtertype-select" :class="{'actived':isChecked==1}" @click="filtertypeSelect(1)">高级筛选
                  </span>
                  </div>
                  <span class="zh-navgate-right" @click="shrink($event)"><i>收起</i></span>
                </div>
                <div class="zh-collapse-content">
                  <ul>
                    <!--普通筛选项-->
                    <li class="filtertype-con actived" v-show="currentindex ==0">
                      <!--企业名称-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">企业名称</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" class="cen-search" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedentName.mustName" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedentName.mustNotName" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--经营范围-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">经营范围</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedbusinessScope.mustBusinessScope" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedbusinessScope.mustNotBusinessScope" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--注册地址-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">注册地址</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedregLocation.mustRegLocation" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedregLocation.mustNotRegLocation" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="text-align: center">
                        <el-button type="primary" class="searchBtn" style="border-color: #ED3C3C" @click="getRegularSearchIofo()">查询</el-button>
                        <el-button type="primary" class="oranizeReset" style="background-color: #fff;border-color:#DCDFE6;color:#606266" @click="resetSearchIofo()">重置</el-button>

                      </div>
                    </li>
                    <!--高级筛选项-->
                    <li class="filtertype-con actived" v-show="currentindex ==1">
                      <!--企业名称-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">企业名称</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" class="cen-search" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedentName.mustName" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedentName.mustNotName" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--经营范围-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">经营范围</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedbusinessScope.mustBusinessScope" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedbusinessScope.mustNotBusinessScope" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--注册地址-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">注册地址</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <label>包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedregLocation.mustRegLocation" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <label>不包含</label>
                              <div class="zh-inline-block input-box">
                                <el-input type="text" placeholder="请输入关键词,多个关键词用空格隔开" v-model="advancedregLocation.mustNotRegLocation" clearable></el-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--省份地区&行业分类style="margin-left: -86px;"-->
                      <div class="zh-tb-item bgGray">
                        <div class="zh-left-label"><span class="label-block">省份地区</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl clearfix">
                              <div class="zh-inline-block fl">
                                <el-cascader v-model="filterText" :options="data" @change="handleChange"
                                             v-if="sonRefresh" placeholder="输入省份地区" ref='tree' :fetch-suggestions="querySearchOrganization"
                                             :props="{checkStrictly: true,expandTrigger:'hover' }" clearable >
                                </el-cascader>
                              </div>
                            </div>
                            <div class="zh-form-item fl clearfix" style="margin-left: -8px;">
                              <label class="fl" style="font-size: 14px;font-weight: bold;color: #8a8888;">行业门类</label>
                              <div class="zh-inline-block fl">
                                <el-cascader v-model="industryfilterText" :options="industrydata" @change="industryChange"
                                             v-if="sonRefresh" placeholder="输入行业门类" class="industrybox" ref="industrytree"
                                             :props="{checkStrictly: true}" clearable >
                                </el-cascader>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--法人姓名-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">法人姓名</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <div class="zh-inline-block">
                                <el-input style="width: 300px;margin-left: 45px" type="text"
                                          placeholder="请输入关键词,多个关键词用空格隔开"
                                           v-model="advancedlegalPersonName.personName" clearable></el-input>
                              </div>
                            </div>
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="checkList" >
                                  <el-checkbox label="0">非上市</el-checkbox>
                                  <el-checkbox label="1">上市</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--企业类型-->
                      <div class="zh-tb-item bgGray">
                        <div class="zh-left-label"><span class="label-block">企业类型</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="typeCheckList" >
                                  <el-checkbox label="有限责任公司">有限责任公司</el-checkbox>
                                  <el-checkbox label="股份有限公司">股份有限公司</el-checkbox>
                                  <el-checkbox label="集体所有制">集体所有制</el-checkbox>
                                  <el-checkbox label="国有企业">国有企业</el-checkbox>
                                  <el-checkbox label="个体工商户">个体工商户</el-checkbox>
                                  <el-checkbox label="私营独资企业">私营独资企业</el-checkbox>
<!--                                  <el-checkbox label="港澳台企业">港澳台企业</el-checkbox>-->
                                  <el-checkbox label="合伙制企业">合伙制企业</el-checkbox>
                                  <el-checkbox label="其他">其他</el-checkbox>
                                  <el-checkbox label="个人企业">个人企业</el-checkbox>
                                  <el-checkbox label="个人独资企业">个人独资企业</el-checkbox>
                                  <el-checkbox label="私营企业">私营企业</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--企业状态-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">企业状态</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="stateCheckList" >
                                  <el-checkbox label="1">在业</el-checkbox>
                                  <el-checkbox label="2">存续</el-checkbox>
                                  <el-checkbox label="3">筹建</el-checkbox>
                                  <el-checkbox label="4">清算</el-checkbox>
                                  <el-checkbox label="5">迁入</el-checkbox>
                                  <el-checkbox label="6">迁出</el-checkbox>
                                  <el-checkbox label="7">停业</el-checkbox>
                                  <el-checkbox label="8">撤销</el-checkbox>
                                  <el-checkbox label="9">吊销</el-checkbox>
                                  <el-checkbox label="10">注销</el-checkbox>
                                  <el-checkbox label="11">开业</el-checkbox>
                                  <el-checkbox label="12">在营</el-checkbox>
                                  <el-checkbox label="13">经营</el-checkbox>
                                  <el-checkbox label="14">正常</el-checkbox>
                                  <el-checkbox label="15">其他</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--注册资本-->
                      <div class="zh-tb-item bgGray">
                        <div class="zh-left-label"><span class="label-block">注册资本</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl" style="padding-top: 13px;">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="capitalCheckList" >
                                  <el-checkbox label="1">100万以内</el-checkbox>
                                  <el-checkbox label="2">100-500万</el-checkbox>
                                  <el-checkbox label="3">500-1000万</el-checkbox>
                                  <el-checkbox label="4">1000-3000万</el-checkbox>
                                  <el-checkbox label="5">3000-5000万</el-checkbox>
                                  <el-checkbox label="6">5000万以上</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                            <div class="zh-left-label"><span class="label-block">注册资本</span></div>
                            <div class="rihgt-block">
                              <div class="tb-cell-block clearfix">
                                <div class="zh-form-item fl">
                                  <div class="zh-inline-block">
                                    <el-input type="text" placeholder="请输入" style="width: 150px;" v-model="regCapitalMoneyS1" clearable></el-input>
                                  </div>
                                </div>
                                <div class="fl" style="line-height: 36px;margin-right: 15px;margin-left: -21px;">至</div>
                                <div class="zh-form-item fl">
                                  <div class="zh-inline-block">
                                    <el-input type="text" placeholder="请输入" style="width: 150px;" v-model="regCapitalMoneyS2" clearable></el-input>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--成立年限-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">成立年限</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl" style="padding-top: 13px;">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="yearCheckList" >
                                  <el-checkbox label="1">1年以内</el-checkbox>
                                  <el-checkbox label="2">1-3年</el-checkbox>
                                  <el-checkbox label="3">3-5年</el-checkbox>
                                  <el-checkbox label="4">5-10年</el-checkbox>
                                  <el-checkbox label="5">10年以上</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                            <div class="zh-left-label"><span class="label-block">成立日期</span></div>
                            <div class="rihgt-block">
                              <div class="tb-cell-block clearfix">
                                <div class="zh-form-item fl">
                                  <div class="zh-inline-block">
                                    <el-date-picker
                                      v-model="estiblishTimeS1"
                                      type="date"
                                      placeholder="选择日期">
                                    </el-date-picker>
                                  </div>
                                </div>
                                <div class="fl" style="line-height: 36px;margin-right: 15px;margin-left: -21px;">至</div>
                                <div class="zh-form-item fl">
                                  <div class="zh-inline-block">
                                    <el-date-picker
                                      v-model="estiblishTimeS2"
                                      type="date"
                                      placeholder="选择日期">
                                    </el-date-picker>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--参保人数-->
                      <div class="zh-tb-item bgGray">
                        <div class="zh-left-label"><span class="label-block">参保人数</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="personnelCheckList" >
                                  <el-checkbox label="1">小于50人</el-checkbox>
                                  <el-checkbox label="2">50-99人</el-checkbox>
                                  <el-checkbox label="3">100-499人</el-checkbox>
                                  <el-checkbox label="4">500-999人</el-checkbox>
                                  <el-checkbox label="5">1000-4999人</el-checkbox>
                                  <el-checkbox label="6">1000-9999人</el-checkbox>
                                  <el-checkbox label="7">10000人以上</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--人员规模-->
                      <div class="zh-tb-item">
                        <div class="zh-left-label"><span class="label-block">人员规模</span></div>
                        <div class="rihgt-block">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-checkbox-group v-model="staffCheckList" >
                                  <el-checkbox label="1">小于50人</el-checkbox>
                                  <el-checkbox label="2">50-99人</el-checkbox>
                                  <el-checkbox label="3">100-499人</el-checkbox>
                                  <el-checkbox label="4">500-999人</el-checkbox>
                                  <el-checkbox label="5">1000-4999人</el-checkbox>
                                  <el-checkbox label="6">1000-9999人</el-checkbox>
                                  <el-checkbox label="7">10000人以上</el-checkbox>
                                </el-checkbox-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--电话号码-->
                      <div class="zh-tb-item bgGray" style="padding-right: 10%;">
                        <div class="zh-left-label"><span class="label-block">电话号码</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="phoneRadio" @change="handelChange">
                                  <el-radio :label="1">有</el-radio>
                                  <el-radio :label="11">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">邮箱</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="emailRadio"  @change="handelChange">
                                  <el-radio :label="2">有</el-radio>
                                  <el-radio :label="22">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">软件著作权</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="copyrightRadio"  @change="handelChange">
                                  <el-radio :label="3">有</el-radio>
                                  <el-radio :label="33">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">作品著作</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="workRadio" @change="handelChange">
                                  <el-radio :label="4">有</el-radio>
                                  <el-radio :label="44">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">专利</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="patentRadio" @change="handelChange">
                                  <el-radio :label="5">有</el-radio>
                                  <el-radio :label="55">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--动产抵押-->
                      <div class="zh-tb-item" style="padding-right: 27%;">
                        <div class="zh-left-label"><span class="label-block">动产抵押</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="chattelRadio" @change="handelChange">
                                  <el-radio :label="6">有</el-radio>
                                  <el-radio :label="66">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">高新技术产业</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="industryRadio" @change="handelChange">
                                  <el-radio :label="7">有</el-radio>
                                  <el-radio :label="77">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">网站</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="siteRadio" @change="handelChange">
                                  <el-radio :label="8">有</el-radio>
                                  <el-radio :label="88">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="zh-left-label"><span class="label-block">商标</span></div>
                        <div class="rihgt-block active">
                          <div class="tb-cell-block clearfix">
                            <div class="zh-form-item fl">
                              <template v-if="sonRefresh">
                                <el-radio-group v-model="trademarkRadio" @change="handelChange">
                                  <el-radio :label="9">有</el-radio>
                                  <el-radio :label="99">无</el-radio>
                                </el-radio-group>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style="text-align: center">
                        <el-button type="primary"class="searchBtn" style="border-color: #ed3c3c" @click="getAdvancedSearchIofo(1)">查询</el-button>
                        <el-button type="primary" class="oranizeReset" style="background-color: #fff;border-color:#DCDFE6;color:#606266" @click="resetSearchIofo()">重置</el-button>

                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <!--筛选条件 end-->
              <!--注：存续、在业绿色，其它状态红色-->
              <div class="company-search-rs" v-loading="loading">
                <!-- 普通筛选 -->
                <div class="ordinaryfilter" v-if="filtertype == 0"  v-infinite-scroll="pageChange" infinite-scroll-disabled="noMoreData" infinite-scroll-distance="100" infinite-scroll-immediate="false">
                  <div class="search-rs-tit clearfix">
                    <div class="lefttxt fl">已为您找到 <em>{{page_total}}</em> 条符合条件的企业</div>
                  </div>
                  <ul class="lis clearfix">
                    <li class="companny-rs-cell" v-for="(info,index) in ordinaryFilterCompany" :key="index" @click="gotoCompany(info.name)">
                      <div class="innerlink">
                        <div class="left-img-wrap"><span class="txt">{{info.name | fourWord}}</span></div>
                        <div class="center-con">
                          <div class="flexbox" ><h5 class="txt-oneline"  v-html="getActive(1,info.name)" ></h5><span
                            class="right-state" :class="changeBusinessStatus('',info.regStatus,1)" v-show="info.regStatus !== null && info.regStatus !=='' && info.regStatus !== undefined">{{info.regStatus}}</span></div>
                          <div class="info-item">
                            <div class="inlineblock"><label>法定代表人：</label><span class="txt">{{info.legalPersonName |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>注册资本：</label><span class="txt">{{info.regCapital |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>成立日期：</label><span class="txt">{{info.estiblishTime |timeNdata}}</span></div>
                          </div>
                          <div class="info-item">
                            <div class="inlineblock"><label>邮箱：</label><span class="txt">{{info.email |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>电话：</label><span class="txt">{{info.phoneNumber |filterEmpty}}</span></div>
                          </div>
                          <div class="info-item">
                            <div class="inlineblock"><label>地址：</label><span class="txt">{{info.regLocation |filterEmpty}}</span></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="nodata-wrap" style="top: 0;bottom: 0;" v-show="!loading &&ordinaryFilterCompany.length <= 0">
                    <div>
                      <img src="@/assets/page/noData.png" alt="">
                      <p class="txt">暂无相关数据</p>
                    </div>
                  </div>
                  <p v-show="load&&ordinaryFilterCompany.length>0" class="UG_tips"><i class="W_loading"></i>正在加载中,请稍候...</p>
                  <p v-show="!load && noMoreData==true && ordinaryFilterCompany.length>0" class="UG_tips">没有更多数据了</p>
                  <!-- <page-nation :total="page_total" @pageChange="pageChange($event,1)" v-show="ordinaryFilterCompany.length > 0" v-if="sonRefresh"></page-nation> -->


                </div>
                <!--高级筛选-->
                <div class="advancedfilter"  v-show="filtertype == 1"  v-infinite-scroll="pageChangeTwo" infinite-scroll-disabled="noMoreDataTwo" infinite-scroll-distance="100" infinite-scroll-immediate="false">
                  <div class="search-rs-tit clearfix">
                    <div class="lefttxt fl">已为您找到 <em>{{advanced_page_total}}</em> 条符合条件的企业</div>
                    <div class="right-sort fr" v-show="filtertype === 1">
                      <div class="filter-cell drop-menu">
                        <!--                      <span class="rs dropdown-toggle"><i class="select_txt">默认排序</i> <i class="iconfont icon-triangle-down"></i></span>-->
                        <div class="dropdown-menu estdate-list">
                          <ul class="drop-scroll scrollbox">
                            <li class="opt-cell" @click="sortType(0,$event)"><i class="select_txt">默认排序</i></li>
                            <li class="opt-cell" @click="sortType(1,$event)"><i class="select_txt">按企业名称降序</i></li>
                            <li class="opt-cell" @click="sortType(2,$event)"><i class="select_txt">按企业名称升序</i></li>
                            <li class="opt-cell" @click="sortType(3,$event)"><i class="select_txt">注册资本降序</i></li>
                            <li class="opt-cell" @click="sortType(4,$event)"><i class="select_txt">注册资本升序</i></li>
                            <li class="opt-cell" @click="sortType(5,$event)"><i class="select_txt">成立日期降序</i></li>
                            <li class="opt-cell" @click="sortType(6,$event)"><i class="select_txt">成立日期升序</i></li>
                          </ul>
                        </div>
                      </div>
                      <div class="exportinput" v-if="filterCompany.length > 0">
                        <label>导出数据</label>
                        <input type="text" placeholder="请输入" v-model="exportTotal">
                        <span>条</span>
                      </div>
                      <div class="confirm-btn" @click="getAdvancedSearchIofo(2)" v-show="filterCompany.length > 0">立即导出</div>
                    </div>
                  </div>
                  <!--<div class="search-rs-tit">已为您找到 <em>{{page_total}}</em> 条符合条件的企业</div>-->
                  <ul class="lis clearfix">
                    <a class="companny-rs-cell" v-for="(info,index) in filterCompany" :key="index" @click="gotoCompany(info.name)">
                      <div class="innerlink">
                        <div class="left-img-wrap"><span class="txt">{{info.name | fourWord}}</span></div>
                        <!--                      <span class="right-state attention-opt" :class="{followed:(info.isAttention == 1)}" @click="isAttentionFun(info)"></span>&lt;!&ndash;未关注状态&ndash;&gt;-->
                        <!--                      <span class="right-state" :class="{isAttention:(info.isAttention === 1)}" @click="isAttentionFun(info)">{{info.isAttention | filterIsAttention}}</span>-->
                        <div class="center-con">
                          <div class="flexbox" ><h5 class="txt-oneline"  v-html="getActive(1,info.name)"></h5><span class="right-state" :class="changeBusinessStatus('',info.regStatus,1)" v-show="info.regStatus !== null && info.regStatus !=='' && info.regStatus !== undefined">{{info.regStatus}}</span></div>
                          <div class="c_labelblock">
                            <span class="label_item">{{info.companyOrgTypes | filterEmpty}}</span>
                          </div>
                          <div class="info-item">
                            <div class="inlineblock"><label>法定代表人：</label><span class="txt">{{info.legalPersonName |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>注册资本：</label><span class="txt">{{info.regCapital |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>成立日期：</label><span class="txt">{{info.estiblishTime | timeNdata}}</span></div>
                          </div>
                          <div class="info-item">
                            <div class="inlineblock"><label>邮箱：</label><span class="txt">{{info.email |filterEmpty}}</span></div>
                            <div class="inlineblock"><label>电话：</label><span class="txt">{{info.phoneNumber | filterEmpty}}</span></div>
                          </div>
                          <div class="info-item">
                            <div class="inlineblock"><label>地址：</label><span class="txt">{{info.regLocation}}</span></div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </ul>
                  <div class="nodata-wrap" style="top: 0;bottom: 0;" v-show="!loading && filterCompany.length <= 0">
                    <div>
                      <img src="@/assets/page/noData.png" alt="">
                      <p class="txt">暂无相关数据</p>
                    </div>
                  </div>
                  <p v-show="loadTwo && filterCompany.length > 0" class="UG_tips"><i class="W_loading"></i>正在加载中,请稍候...</p>
                  <p v-show="!loadTwo && noMoreDataTwo==true && filterCompany.length>0" class="UG_tips">没有更多数据了</p>
                  <!--                 <page-nation :total="advanced_page_total" :current-page="page" @pageChange="pageChangeTwo($event,2)" v-show="filterCompany.length > 0" v-if="advanced_Refresh"></page-nation>-->
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <el-backtop target=".fixfoot-wrap" :bottom="60"><i class="el-icon-caret-top"></i>
        <span class="top">回到顶部</span>
      </el-backtop>

    </div>
  </div>
</template>
<script>
    import {filterEmpty,filterDate,validate,changeBusinessStatus,companyInfo,selectInfo,exportEnt} from "@/api/backstage/consulting/service/enterprise/enterprise";
    import JsEncrypt from 'encryptlong'

    export default {
        components: {},
        data() {
            return {
                formInline: {
                    user: '',
                    region: ''
                },
                systemTime:"", // 系统时间
                pname: "", //省的名字
                cname: "", //市的名字
                arr : [],
                att : [],
                formdata:{},// 获取表单数据
                isChecked:0,
                currentindex:0, //默认选第一个
                value1: '',
                checkList:[],
                typeCheckList:[], //企业类型
                personnelCheckList:[], //参保人数
                stateCheckList:[],  //企业状态
                yearCheckList:[],  //成立年限
                capitalCheckList:[], //注册资本
                staffCheckList:[], //人员规模
                phoneRadio:[], //电话号码
                phoneRadio1:[], //电话号码
                phoneRadio2:[], //电话号码
                emailRadio:[],//邮箱
                emailRadio1:[],//邮箱
                emailRadio2:[],//邮箱
                copyrightRadio:[],//软件著作权
                copyrightRadio1:[],//软件著作权
                copyrightRadio2:[],//软件著作权
                workRadio:[], //作品著作
                workRadio1:[], //作品著作
                workRadio2:[], //作品著作
                patentRadio:[],//专利
                patentRadio1:[],//专利
                patentRadio2:[],//专利
                chattelRadio:[],//动产抵押
                chattelRadio1:[],//动产抵押
                chattelRadio2:[],//动产抵押
                industryRadio:[],//高新技术产业
                industryRadio1:[],//高新技术产业
                industryRadio2:[],//高新技术产业
                siteRadio:[],//网站
                siteRadio1:[],//网站
                siteRadio2:[],//网站
                trademarkRadio:[],//商标
                trademarkRadio1:[],//商标
                trademarkRadio2:[],//商标
                sonRefresh: true,
                advanced_Refresh:true,
                companyName:'',
                filtertype:0,//0：普通筛选，1:高级筛选
                defaultExpand:false,
                loading:true,
                data: [{
                    id: 1,
                    label: '全部',
                    children: [{
                        label:"安徽省",
                        value: '安徽省',
                        id:340000,
                        children: [
                            {
                                label:"安庆市",
                                value: '安庆市',
                                id:340800
                            },
                            {
                                label:"蚌埠市",
                                value: '蚌埠市',
                                id:340300
                            },
                            {
                                label:"巢湖市",
                                value: '巢湖市',
                                id:341400
                            },
                            {
                                label:"池州市",
                                value: '池州市',
                                id:341700
                            },
                            {
                                label:"滁州市",
                                value: '滁州市',
                                id:341100
                            },
                            {
                                label:"阜阳市",
                                value: '阜阳市',
                                id:341200
                            },
                            {
                                label:"合肥市",
                                value: '合肥市',
                                id:340100
                            },
                            {
                                label:"淮北市",
                                value: '淮北市',
                                id:"340600"
                            },
                            {
                                label:"淮南市",
                                value: '淮南市',
                                id:340400
                            },
                            {
                                label:"黄山市",
                                value: '黄山市',
                                id:341000
                            },
                            {
                                label:"六安市",
                                value: '六安市',
                                id:341500
                            },
                            {
                                label:"马鞍山市",
                                value: '马鞍山市',
                                id:340500
                            },
                            {
                                label:"宿州市",
                                value: '宿州市',
                                id:341300
                            },
                            {
                                label:"铜陵市",
                                value: '铜陵市',
                                id:340700
                            },
                            {
                                label:"芜湖市",
                                value: '芜湖市',
                                id:340200
                            },
                            {
                                label:"宣城市",
                                value: '宣城市',
                                id:341800
                            },
                            {
                                label:"亳州市",
                                value: '亳州市',
                                id:341600
                            }
                        ]
                    },
                        {
                            label:"北京",
                            value: '北京',
                            id:110000
                        },
                        {
                            label:"福建省",
                            value: '福建省',
                            id:350000,
                            children:[
                                {label:"福州市",value: '福州市', id:350100},{label:"龙岩市",value: '龙岩市', id:350800},{label:"南平市",
                                    value: '南平市',
                                    id:350700},{label:"宁德市", value: '宁德市',
                                    id:350900},{label:"莆田市",value: '莆田市', id:350300},{label:"泉州市",value: '泉州市', id:350500},{label:"三明市", value: '三明市',
                                    id:350400},{label:"厦门市",value: '厦门市', id:350200},{label:"漳州市",value: '漳州市', id:350600}
                            ]
                        },
                        {
                            label:"甘肃省",
                            value: '甘肃省',
                            id:620000,
                            children:[
                                {label:"白银市",value: '白银市', id:620400},{label:"定西市",value: '定西市', id:621100},{label:"甘南藏族自治州",value: '甘南藏族自治州',
                                    id:623000},{label:"嘉峪关市", value: '嘉峪关市',id:620200},{label:"金昌市",value: '金昌市',id:620300},{label:"酒泉市",value: '酒泉市',
                                    id:620900},{label:"兰州市", value: '兰州市',id:620100},{label:"临夏回族自治州",value: '临夏回族自治州',
                                    id:622900},{label:"陇南市",value: '陇南市',
                                    id:621200},{label:"平凉市",value: '平凉市', id:620800},{label:"庆阳市",value: '庆阳市',
                                    id:621000},{label:"天水市", value: '天水市',
                                    id:620500},{label:"武威市",value: '武威市', id:620600},{label:"张掖市",value: '张掖市', id:620700}
                            ]
                        },{
                            label:"广东省",
                            value: '广东省',
                            id:440000,
                            children:[
                                {label:"潮州市",value: '潮州市', id:445100},{label:"东莞市",value: '东莞市', id:441900},{label:"佛山市",value: '佛山市',
                                    id:440600},{label:"广州市",value: '广州市',
                                    id:440100},{label:"河源市",value: '河源市', id:441600},{label:"惠州市",value: '惠州市', id:441300},{label:"江门市", value: '江门市',
                                    id:440700},{label:"揭阳市",value: '揭阳市', id:445200},{label:"茂名市",value: '茂名市', id:440900},{label:"梅州市", value: '梅州市',
                                    id:441400},{label:"清远市",value: '清远市', id:441800},{label:"汕头市",value: '汕头市', id:440500},{label:"汕尾市", value: '汕尾市',
                                    id:441500},{label:"韶关市",value: '韶关市',id:440200},{label:"深圳市",value: '深圳市',
                                    id:440300},{label:"阳江市", value: '阳江市',
                                    id:441700},{label:"云浮市",value: '云浮市', id:445300},{label:"湛江市",value: '湛江市', id:440800},{label:"肇庆市", value: '肇庆市',
                                    id:441200},{label:"中山市",value: '中山市', id:442000},{label:"珠海市",value: '珠海市', id:440400}
                            ]
                        },
                        {
                            label:"广西壮族自治区",
                            value: '广西壮族自治区',
                            id:450000,
                            children:[
                                {label:"百色市",value: '百色市', id:451000},{label:"北海市", value: '北海市',id:450500},{label:"崇左市", value:
                                        '崇左市',
                                    id:451400},{label:"防城港市", value: '防城港市',
                                    id:450600},{label:"桂林市",value: '桂林市', id:450300},{label:"贵港市", value: '贵港市',id:450800},{label:"河池市", value: '河池市',
                                    id:451200},{label:"贺州市",value: '贺州市', id:451100},{label:"来宾市",value: '来宾市', id:451300},{label:"柳州市", value: '柳州市',
                                    id:450200},{label:"南宁市",value: '南宁市', id:450100},{label:"钦州市",value: '钦州市', id:450700},{label:"梧州市", value: '梧州市',
                                    id:450400},{label:"玉林市",value: '玉林市', id:450900}
                            ]
                        },
                        {
                            label:"贵州省",
                            value: '贵州省',
                            id:520000,
                            children:[
                                {label:"安顺市",value: '安顺市', id:520400},{label:"毕节地区",value: '毕节地区', id:522400},{label:"贵阳市",value:
                                        '贵阳市',
                                    id:520100},{label:"六盘水市",value: '六盘水市',
                                    id:520200},{label:"黔东南苗族侗族自治州", value: '黔东南苗族侗族自治州',id:522600},{label:"黔南布依族苗族自治州",value: '黔南布依族苗族自治州',
                                    id:522700},{label:"黔西南布依族苗族自治州",value: '黔西南布依族苗族自治州', id:522300},{label:"铜仁地区",
                                    value: '铜仁地区',id:522200},{label:"遵义市",value: '遵义市', id:520300}
                            ]
                        },
                        {
                            label:"海南省",
                            value: '海南省',
                            id:460000,
                            children:[
                                {label:"海口市",value: '海口市', id:460100},{label:"三亚市",value: '三亚市', id:460200},{label:"省直辖县级行政单位",value: '省直辖县级行政单位',
                                    id:469000}
                            ]
                        },
                        {
                            label:"河北省",
                            value: '河北省',
                            id:130000,
                            children:[
                                {label:"保定市",value: '保定市', id:130600},{label:"沧州市", value: '沧州市',id:130900},{label:"承德市",
                                    value: '承德市',
                                    id:130800},{label:"邯郸市", value: '邯郸市',
                                    id:130400},{label:"衡水市",value: '衡水市', id:131100},{label:"廊坊市",value: '廊坊市', id:131000},{label:"秦皇岛市",value: '秦皇岛市',
                                    id:130300},{label:"石家庄市",value: '石家庄市', id:130100},{label:"唐山市",value: '唐山市',
                                    id:130200},{label:"邢台市", value: '邢台市',
                                    id:130500},{label:"张家口市",value: '张家口市', id:130700}
                            ]
                        },
                        {
                            label:"河南省",
                            value: '河南省',
                            id:410000,
                            children:[
                                {label:"安阳市",value: '安阳市', id:410500},{label:"鹤壁市",value: '鹤壁市', id:410600},{label:"焦作市",value:
                                        '焦作市',
                                    id:410800},{label:"开封市",value: '开封市',
                                    id:410200},{label:"洛阳市", value: '洛阳市',id:410300},{label:"南阳市",value: '南阳市', id:411300},{label:"平顶山市", value: '平顶山市',
                                    id:410400},{label:"三门峡市",value: '三门峡市', id:411200},{label:"商丘市",value: '商丘市', id:411400},{label:"新乡市",value: '新乡市',
                                    id:410700},{label:"信阳市",value: '信阳市', id:411500},{label:"许昌市",value: '许昌市', id:411000},{label:"郑州市",value: '郑州市',
                                    id:410100},{label:"周口市",value: '周口市', id:411600},{label:"驻马店市",value: '驻马店市', id:411700},{label:"漯河市", value: '漯河市',
                                    id:411100},{label:"濮阳市",value: '濮阳市', id:410900}
                            ]
                        },
                        {
                            label:"黑龙江省",
                            value: '黑龙江省',
                            id:230000,
                            children:[
                                {label:"大庆市",value: '大庆市', id:230600},{label:"大兴安岭地区",value: '大兴安岭地区', id:232700},{label:"哈尔滨市",
                                    value: '哈尔滨市',
                                    id:230100},{label:"鹤岗市",value: '鹤岗市', id:230400},{label:"黑河市",value: '黑河市', id:231100},{label:"鸡西市", value: '鸡西市',
                                    id:230300},{label:"佳木斯市",value: '佳木斯市', id:230800},{label:"牡丹江市",value: '牡丹江市', id:231000},{label:"七台河市", value: '七台河市',
                                    id:230900},{label:"齐齐哈尔市",value: '齐齐哈尔市', id:230200},{label:"双鸭山市", value: '双鸭山市',
                                    id:230500},{label:"绥化市",value: '绥化市',
                                    id:231200},{label:"伊春市",value: '伊春市',  id:230700}
                            ]
                        },
                        {
                            label:"湖北省",
                            value: '湖北省',
                            id:420000,
                            children:[
                                {label:"鄂州市",value: '鄂州市',  id:420700},{label:"恩施土家族苗族自治州",value: '恩施土家族苗族自治州',  id:422800},{label:"黄冈市",value: '黄冈市',
                                    id:421100},{label:"黄石市",value: '黄石市',  id:420200},{label:"荆门市",value: '荆门市',
                                    id:420800},{label:"荆州市", value: '荆州市',
                                    id:421000},{label:"省直辖行政单位",value: '省直辖行政单位',  id:429000},{label:"十堰市",value: '十堰市',
                                    id:420300},{label:"随州市",value: '随州市',  id:421300},{label:"武汉市",value: '武汉市',  id:420100},{label:"咸宁市", value: '咸宁市',
                                    id:421200},{label:"襄樊市",value: '襄樊市',  id:420600},{label:"孝感市",value: '孝感市',
                                    id:420900},{label:"宜昌市", value: '宜昌市',
                                    id:420500}
                            ]
                        },
                        {
                            label:"湖南省",
                            value: '湖南省',
                            id:430000,
                            children:[
                                {label:"常德市",value: '常德市',  id:430700},{label:"长沙市",value: '长沙市',  id:430100},{label:"郴州市",
                                    value: '郴州市',
                                    id:431000},{label:"衡阳市",value: '衡阳市',
                                    id:430400},{label:"怀化市",value: '怀化市', id:431200},{label:"娄底市",value: '娄底市', id:431300},{label:"邵阳市", value: '邵阳市',
                                    id:430500},{label:"湘潭市",value: '湘潭市', id:430300},{label:"湘西土家族苗族自治州",value: '湘西土家族苗族自治州',
                                    id:433100},{label:"益阳市",value: '益阳市', id:430900},{label:"永州市",value: '永州市', id:431100},{label:"岳阳市", value: '岳阳市',
                                    id:430600},{label:"张家界市",value: '张家界市', id:430800},{label:"株洲市",value: '株洲市',
                                    id:430200}
                            ]
                        },
                        {
                            label:"吉林省",
                            value: '吉林省',
                            id:220000,
                            children:[
                                {label:"白城市",value: '白城市', id:220800},{label:"白山市",value: '白山市', id:220600},{label:"长春市",value: '长春市',
                                    id:220100},{label:"吉林市", value: '吉林市',
                                    id:220200},{label:"辽源市",value: '辽源市', id:220400},{label:"四平市",value: '四平市', id:220300},{label:"松原市", value: '松原市',
                                    id:220700},{label:"通化市",value: '通化市', id:220500},{label:"延边朝鲜族自治州",value: '延边朝鲜族自治州',
                                    id:222400}
                            ]
                        },
                        {
                            label:"江苏省",
                            value: '江苏省',
                            id:320000,
                            children:[
                                {label:"常州市",value: '常州市', id:320400},{label:"淮安市", value: '淮安市',id:320800},{label:"连云港市",value: '连云港市',
                                    id:320700},{label:"南京市", value: '南京市',
                                    id:320100},{label:"南通市",value: '南通市', id:320600},{label:"苏州市",value: '苏州市', id:320500},{label:"宿迁市",value: '宿迁市',
                                    id:321300},{label:"泰州市",value: '泰州市', id:321200},{label:"无锡市",value: '无锡市', id:320200},{label:"徐州市", value: '徐州市',
                                    id:320300},{label:"盐城市",value: '盐城市', id:320900},{label:"扬州市",value: '扬州市',
                                    id:321000},{label:"镇江市", value: '镇江市',
                                    id:321100}
                            ]
                        },
                        {
                            label:"江西省",
                            value: '江西省',
                            id:360000,
                            children:[
                                {label:"抚州市",value: '抚州市', id:361000},{label:"赣州市",value: '赣州市', id:360700},{label:"吉安市",
                                    value: '吉安市',
                                    id:360800},{label:"景德镇市", value: '景德镇市',
                                    id:360200},{label:"九江市",value: '九江市', id:360400},{label:"南昌市",value: '南昌市', id:360100},{label:"萍乡市", value: '萍乡市',
                                    id:360300},{label:"上饶市",value: '上饶市', id:361100},{label:"新余市",value: '新余市', id:360500},{label:"宜春市", value: '宜春市',
                                    id:360900},{label:"鹰潭市",value: '鹰潭市', id:360600}
                            ]
                        },
                        {
                            label:"辽宁省",
                            value: '辽宁省',
                            id:210000,
                            children:[
                                {label:"鞍山市",value: '鞍山市', id:210300},{label:"本溪市",value: '本溪市', id:210500},{label:"朝阳市", value:
                                        '朝阳市',
                                    id:211300},{label:"大连市", value: '大连市',
                                    id:210200},{label:"丹东市",value: '丹东市', id:210600},{label:"抚顺市",value: '抚顺市', id:210400},{label:"阜新市", value: '阜新市',
                                    id:210900},{label:"葫芦岛市",value: '葫芦岛市', id:211400},{label:"锦州市",value: '锦州市', id:210700},{label:"辽阳市", value: '辽阳市',
                                    id:211000},{label:"盘锦市", value: '盘锦市',id:211100},{label:"沈阳市",value: '沈阳市', id:210100},{label:"铁岭市",value: '铁岭市',
                                    id:211200},{label:"营口市",value: '营口市', id:210800}
                            ]
                        },
                        {
                            label:"内蒙古自治区",
                            value: '内蒙古自治区',
                            id:150000,
                            children:[
                                {label:"阿拉善盟",value: '阿拉善盟', id:152900},{label:"巴彦淖尔市",value: '巴彦淖尔市', id:150800},{label:"包头市", value: '包头市',
                                    id:150200},{label:"赤峰市",value: '赤峰市', id:150400},{label:"鄂尔多斯市",value: '鄂尔多斯市', id:150600},{label:"呼和浩特市",value: '呼和浩特市',
                                    id:150100},{label:"呼伦贝尔市",value: '呼伦贝尔市',  id:150700},{label:"通辽市",value: '通辽市',
                                    id:150500},{label:"乌海市", value: '乌海市',
                                    id:150300},{label:"乌兰察布市",value: '乌兰察布市',  id:150900},{label:"锡林郭勒盟", value: '锡林郭勒盟',
                                    id:152500},{label:"兴安盟", value: '兴安盟',
                                    id:152200}
                            ]
                        },
                        {
                            label:"宁夏回族自治区",
                            value: '宁夏回族自治区',
                            id:640000,
                            children:[
                                {label:"固原市",value: '固原市',  id:640400},{label:"石嘴山市",value: '石嘴山市',  id:640200},{label:"吴忠市",
                                    value: '吴忠市',
                                    id:640300},{label:"银川市",value: '银川市',  id:640100},{label:"中卫市",value: '中卫市',
                                    id:640500}
                            ]
                        },
                        {
                            label:"青海省",
                            value: '青海省',
                            id:630000,
                            children:[
                                {label:"果洛藏族自治州",value: '果洛藏族自治州',  id:632600},{label:"海北藏族自治州",value: '海北藏族自治州',  id:632200},{label:"海东地区",value: '海东地区',
                                    id:632100},{label:"海南藏族自治州",value: '海南藏族自治州',  id:632500},{label:"海西蒙古族藏族自治州",value: '海西蒙古族藏族自治州',
                                    id:632800},{label:"黄南藏族自治州",value: '黄南藏族自治州',  id:632300},{label:"西宁市",value: '西宁市',
                                    id:630100},{label:"玉树藏族自治州",value: '玉树藏族自治州',  id:632700}
                            ]
                        },
                        {
                            label:"山东省",
                            value: '山东省',
                            id:370000,
                            children:[
                                {label:"滨州市",value: '滨州市',  id:371600},{label:"德州市", value: '德州市', id:371400},{label:"东营市",
                                    value: '东营市',
                                    id:370500},{label:"菏泽市", value: '菏泽市',
                                    id:371700},{label:"济南市",value: '济南市',  id:370100},{label:"济宁市",value: '济宁市',  id:370800},{label:"莱芜市",value: '莱芜市',
                                    id:371200},{label:"聊城市",value: '聊城市',  id:371500},{label:"临沂市",value: '临沂市',
                                    id:371300},{label:"青岛市", value: '青岛市',
                                    id:370200},{label:"日照市",value: '日照市',  id:371100},{label:"泰安市",value: '泰安市',  id:370900},{label:"威海市", value: '威海市',
                                    id:371000},{label:"潍坊市", value: '潍坊市', id:370700},{label:"烟台市",value: '烟台市', id:370600},{label:"枣庄市",value: '枣庄市',
                                    id:370400},{label:"淄博市",value: '淄博市', id:370300}
                            ]
                        },
                        {
                            label:"山西省",
                            value: '山西省',
                            id:140000,
                            children:[
                                {label:"长治市",value: '长治市', id:140400},{label:"大同市",value: '大同市', id:140200},{label:"晋城市",
                                    value: '晋城市',
                                    id:140500},{label:"晋中市", value: '晋中市',
                                    id:140700},{label:"临汾市",value: '临汾市', id:141000},{label:"吕梁市",value: '吕梁市', id:141100},{label:"朔州市",value: '朔州市',
                                    id:140600},{label:"太原市",value: '太原市', id:140100},{label:"忻州市",value: '忻州市', id:140900},{label:"阳泉市",value: '阳泉市',
                                    id:140300},{label:"运城市",value: '运城市', id:140800}
                            ]
                        },
                        {
                            label:"陕西省",
                            value: '陕西省',
                            id:610000,
                            children:[
                                {label:"安康市",value: '安康市',id:610900},{label:"宝鸡市",value: '宝鸡市', id:610300},{label:"汉中市", value: '汉中市',
                                    id:610700},{label:"商洛市",value: '商洛市', id:611000},{label:"铜川市",value: '铜川市',
                                    id:610200},{label:"渭南市", value: '渭南市',
                                    id:610500},{label:"西安市",value: '西安市', id:610100},{label:"咸阳市",value: '咸阳市', id:610400},{label:"延安市", value: '延安市',
                                    id:610600},{label:"榆林市",value: '榆林市', id:610800}
                            ]
                        },
                        {
                            label:"上海",
                            value: '上海',
                            id:310000,
                            children:[]
                        },
                        {
                            label:"四川省",
                            value: '四川省',
                            id:510000,
                            children:[
                                {label:"阿坝藏族羌族自治州",value: '阿坝藏族羌族自治州', id:513200},{label:"巴中市",value: '巴中市', id:511900},{label:"成都市",
                                    value: '成都市',
                                    id:510100},{label:"达州市",value: '达州市', id:511700},{label:"德阳市",value: '德阳市', id:510600},{label:"甘孜藏族自治州", value: '甘孜藏族自治州',
                                    id:513300},{label:"广安市", value: '广安市',id:511600},{label:"广元市",value: '广元市', id:510800},{label:"乐山市",value: '乐山市',
                                    id:511100},{label:"凉山彝族自治州", value: '凉山彝族自治州',id:513400},{label:"眉山市",value: '眉山市',
                                    id:511400},{label:"绵阳市", value: '绵阳市',
                                    id:510700},{label:"南充市",value: '南充市', id:511300},{label:"内江市",value: '内江市',
                                    id:511000},{label:"攀枝花市",value: '攀枝花市',
                                    id:510400},{label:"遂宁市",value: '遂宁市', id:510900},{label:"雅安市",value: '雅安市', id:511800},{label:"宜宾市", value: '宜宾市',
                                    id:511500},{label:"资阳市",value: '资阳市', id:512000},{label:"自贡市",value: '自贡市', id:510300},{label:"泸州市",value: '泸州市',
                                    id:510500}
                            ]
                        },
                        {
                            label:"天津",
                            value: '天津',
                            id:120000,
                            children:[

                            ]
                        },
                        {
                            label:"西藏自治区",
                            value: '西藏自治区',
                            id:540000,
                            children:[
                                {label:"阿里地区", value: '阿里地区',id:542500},{label:"昌都地区", value: '昌都地区',id:542100},{label:"拉萨市",
                                    value: '拉萨市',
                                    id:540100},{label:"林芝地区",value: '林芝地区', id:542600},{label:"那曲地区",value: '那曲地区', id:542400},{label:"日喀则地区", value: '日喀则地区',
                                    id:542300},{label:"山南地区",value: '山南地区', id:542200}
                            ]
                        },
                        {
                            label:"新疆维吾尔自治区",
                            value: '新疆维吾尔自治区',
                            id:650000,
                            children:[
                                {label:"阿克苏地区",value: '阿克苏地区', id:652900},{label:"阿勒泰地区",value: '阿勒泰地区', id:654300},{label:"巴音郭楞蒙古自治州",value: '巴音郭楞蒙古自治州',
                                    id:652800},{label:"博尔塔拉蒙古自治州",value: '博尔塔拉蒙古自治州', id:652700},{label:"昌吉回族自治州",value: '昌吉回族自治州',
                                    id:652300},{label:"哈密地区",value: '哈密地区', id:652200},{label:"和田地区", value: '和田地区',id:653200},{label:"喀什地区", value: '喀什地区',
                                    id:653100},{label:"克拉玛依市",value: '克拉玛依市', id:650200},{label:"克孜勒苏柯尔克孜自治州",value: '克孜勒苏柯尔克孜自治州',
                                    id:653000},{label:"省直辖行政单位",value: '省直辖行政单位', id:659000},{label:"石河子市",value: '石河子市',
                                    id:650300},{label:"塔城地区",value: '塔城地区', id:654200},{label:"吐鲁番地区",value: '吐鲁番地区',
                                    id:652100},{label:"乌鲁木齐市", value: '乌鲁木齐市',
                                    id:650100},{label:"伊犁哈萨克自治州",value: '伊犁哈萨克自治州', id:654000}
                            ]
                        },
                        {
                            label:"云南省",
                            value: '云南省',
                            id:530000,
                            children:[
                                {label:"保山市",value: '保山市', id:530500},{label:"楚雄彝族自治州", value: '楚雄彝族自治州',id:532300},{label:"大理白族自治州",value: '大理白族自治州',
                                    id:532900},{label:"德宏傣族景颇族自治州",value: '德宏傣族景颇族自治州', id:533100},{label:"迪庆藏族自治州",value: '迪庆藏族自治州',
                                    id:533400},{label:"红河哈尼族彝族自治州", value: '红河哈尼族彝族自治州',id:532500},{label:"昆明市",value: '昆明市',
                                    id:530100},{label:"丽江市", value: '丽江市',
                                    id:530700},{label:"临沧市",value: '临沧市', id:530900},{label:"怒江傈僳族自治州",value: '怒江傈僳族自治州',
                                    id:533300},{label:"曲靖市",value: '曲靖市',
                                    id:530300},{label:"思茅市", value: '思茅市',id:530800},{label:"文山壮族苗族自治州",
                                    value: '文山壮族苗族自治州',id:532600},{label:"西双版纳傣族自治州", value: '西双版纳傣族自治州',id:532800},{label:"玉溪市",
                                    value: '玉溪市',
                                    id:530400},{label:"昭通市",value: '昭通市', id:530600}
                            ]
                        },
                        {
                            label:"浙江省",
                            value: '浙江省',
                            id:330000,
                            children:[
                                {label:"杭州市",value: '杭州市', id:330100},{label:"湖州市",value: '湖州市', id:330500},{label:"嘉兴市",
                                    value: '嘉兴市',
                                    id:330400},{label:"金华市",value: '金华市', id:330700},{label:"丽水市",value: '丽水市', id:331100},{label:"宁波市", value: '宁波市',
                                    id:330200},{label:"绍兴市",value: '绍兴市', id:330600},{label:"台州市",value: '台州市', id:331000},{label:"温州市", value: '温州市',
                                    id:330300},{label:"舟山市",value: '舟山市', id:330900},{label:"衢州市",value: '衢州市', id:330800}
                            ]
                        },
                        {label:"重庆",value: '重庆', id:500000}
                    ]
                }],
                industrydata:[{
                    id: 100000,
                    label: '全部',
                    children: [{
                        label:"农、林、牧、渔业",
                        value:"农、林、牧、渔业",
                        id:100000,
                        children: [
                            {
                                label:"农业",
                                value:"农业",
                                id:101000
                            },
                            {
                                label:"林业",
                                value:"林业",
                                id:102000
                            },
                            {
                                label:"畜牧业",
                                value:"畜牧业",
                                id:103000
                            },
                            {
                                label:"渔业",
                                value:"渔业",
                                id:104000
                            },
                            {
                                label:"农、林、牧、渔服务业",
                                value:"农、林、牧、渔服务业",
                                id:105000
                            }
                        ]
                    },
                        {
                            label:"采矿业",
                            value:"采矿业",
                            id:120000,
                            children:[
                                {label:"煤炭开采和洗选业",value:"煤炭开采和洗选业", id:121000},
                                {label:"石油和天然气开采业",value:"石油和天然气开采业", id:122000},
                                {label:"黑色金属矿采选业",value:"黑色金属矿采选业", id:123000},
                                {label:"有色金属矿采选业",value:"有色金属矿采选业", id:124000},
                                {label:"非金属矿采选业",value:"非金属矿采选业", id:125000},
                                {label:"开采辅助活动", value:"开采辅助活动",id:126000},
                                {label:"其他采矿业",value:"其他采矿业", id:127000}
                            ]
                        },
                        {
                            label:"制造业",
                            value:"制造业",
                            id:130000,
                            children:[
                                {label:"农副食品加工业",value:"农副食品加工业", id:131000},
                                {label:"食品制造业",value:"食品制造业", id:132000},
                                {label:"酒、饮料和精制茶制造业",value:"酒、饮料和精制茶制造业",  id:133000},
                                {label:"烟草制品业",value:"烟草制品业",  id:134000},
                                {label:"纺织业",value:"纺织业",  id:135000},
                                {label:"纺织服装、服饰业",value:"纺织服装、服饰业",  id:136000},
                                {label:"皮革、毛皮、羽毛及其制品和制鞋业",value:"皮革、毛皮、羽毛及其制品和制鞋业",  id:137000},
                                {label:"木材加工和木、竹、藤、棕、草制品业",value:"木材加工和木、竹、藤、棕、草制品业",  id:138000},
                                {label:"家具制造业",value:"家具制造业",  id:139000},
                                {label:"造纸和纸制品业",value:"造纸和纸制品业",  id:1310000},
                                {label:"印刷和记录媒介复制业",value:"印刷和记录媒介复制业",  id:1311000},
                                {label:"文教、工美、体育和娱乐用品制造业",value:"文教、工美、体育和娱乐用品制造业", id:1312000},
                                {label:"石油加工、炼焦和核燃料加工业",value:"石油加工、炼焦和核燃料加工业", id:1313000},
                                {label:"化学原料和化学制品制造业",value:"化学原料和化学制品制造业", id:1314000},
                                {label:"医药制造业",value:"医药制造业", id:1315000},
                                {label:"化学纤维制造业", value:"化学纤维制造业",id:1316000},
                                {label:"橡胶和塑料制品业",value:"橡胶和塑料制品业", id:1317000},
                                {label:"非金属矿物制品业",value:"非金属矿物制品业", id:1318000},
                                {label:"黑色金属冶炼和压延加工业",value:"黑色金属冶炼和压延加工业", id:1319000},
                                {label:"有色金属冶炼和压延加工业",value:"有色金属冶炼和压延加工业", id:1320000},
                                {label:"金属制品业",value:"金属制品业", id:1321000},
                                {label:"通用设备制造业",value:"通用设备制造业", id:1322000},
                                {label:"专用设备制造业",value:"专用设备制造业", id:1323000},
                                {label:"汽车制造业",value:"汽车制造业", id:1324000},
                                {label:"铁路、船舶、航空航天和其他运输设备制造业",value:"铁路、船舶、航空航天和其他运输设备制造", id:1325000},
                                {label:"电气机械和器材制造业",value:"电气机械和器材制造业", id:1326000},
                                {label:"计算机、通信和其他电子设备制造业",value:"计算机、通信和其他电子设备制造业", id:1327000},
                                {label:"仪器仪表制造业",value:"仪器仪表制造业", id:1328000},
                                {label:"其他制造业",value:"其他制造业", id:1329000},
                                {label:"废弃资源综合利用业", value:"废弃资源综合利用业",id:1330000},
                            ]
                        },
                        {
                            label:"电力、热力、燃气及水生产和供应业",
                            value:"电力、热力、燃气及水生产和供应业",
                            id:140000,
                            children:[
                                {label:"电力、热力生产和供应业",value:"电力、热力生产和供应业", id:141000},
                                {label:"燃气生产和供应业",value:"燃气生产和供应业", id:142000},
                                {label:"水的生产和供应业",value:"水的生产和供应业", id:143000},
                            ]
                        },
                        {
                            label:"建筑业",
                            value:"建筑业",
                            id:150000,
                            children:[
                                {label:"房屋建筑业",value:"房屋建筑业", id:151000},
                                {label:"土木工程建筑业", value:"土木工程建筑业",id:152000},
                                {label:"建筑安装业",value:"建筑安装业", id:153000},
                                {label:"建筑装饰和其他建筑业",value:"建筑装饰和其他建筑业", id:154000}
                            ]
                        },
                        {
                            label:"批发和零售业",
                            value:"批发和零售业",
                            id:160000,
                            children:[
                                {label:"批发业",value:"批发业", id:161000},{label:"零售业", value:"零售业",id:162000}
                            ]
                        },
                        {
                            label:"交通运输、仓储和邮政业",
                            value:"交通运输、仓储和邮政业",
                            id:170000,
                            children:[
                                {label:"铁路运输业",value:"铁路运输业", id:171000},
                                {label:"道路运输业",value:"道路运输业", id:172000},
                                {label:"水上运输业",value:"水上运输业", id:173000},
                                {label:"航空运输业", value:"航空运输业",id:174000},
                                {label:"管道运输业",value:"管道运输业", id:175000},
                                {label:"装卸搬运和运输代理业",value:"装卸搬运和运输代理业", id:176000},
                                {label:"仓储业",value:"仓储业", id:177000},
                                {label:"邮政业",value:"邮政业", id:178000},
                            ]
                        },
                        {
                            label:"住宿和餐饮业",
                            value:"住宿和餐饮业",
                            id:180000,
                            children:[
                                {label:"住宿业",value:"住宿业", id:181000},{label:"餐饮业",value:"餐饮业", id:182000}
                            ]
                        },
                        {
                            label:"信息传输、软件和信息技术服务业",
                            value:"信息传输、软件和信息技术服务业",
                            id:190000,
                            children:[
                                {label:"电信、广播电视和卫星传输服务",value:"电信、广播电视和卫星传输服务", id:191000},{label:"互联网和相关服务",value:"互联网和相关服务", id:192000},{label:"软件和信息技术服务业", value:"软件和信息技术服务业",id:193000}
                            ]
                        },
                        {
                            label:"金融业",
                            value:"金融业",
                            id:200000,
                            children:[
                                {label:"货币金融服务",value:"货币金融服务", id:201000},{label:"保险业",value:"保险业", id:202000},{label:"其他金融业",value:"其他金融业", id:203000}
                            ]
                        },
                        {
                            label:"房地产业",
                            value:"房地产业",
                            id:210000
                        },
                        {
                            label:"租赁和商务服务业",
                            value:"租赁和商务服务业",
                            id:220000,
                            children:[
                                {label:"租赁业", value:"租赁业",id:221000},{label:"商务服务业", value:"商务服务业",id:222000}
                            ]
                        },
                        {
                            label:"科学研究和技术服务业",
                            value:"科学研究和技术服务业",
                            id:230000,
                            children:[
                                {label:"研究和试验发展", value:"研究和试验发展",id:231000},{label:"专业技术服务业",value:"专业技术服务业", id:232000},{label:"科技推广和应用服务业",value:"科技推广和应用服务业", id:233000}
                            ]
                        },
                        {
                            label:"水利、环境和公共设施管理业",
                            value:"水利、环境和公共设施管理业",
                            id:240000,
                            children:[
                                {label:"水利管理业",value:"水利管理业", id:241000},{label:"生态保护和环境治理业",value:"生态保护和环境治理业", id:242000},{label:"公共设施管理业",value:"公共设施管理业", id:243000}
                            ]
                        },
                        {
                            label:"居民服务、修理和其他服务业",
                            value:"居民服务、修理和其他服务业",
                            id:250000,
                            children:[
                                {label:"居民服务业",value:"居民服务业", id:251000},{label:"机动车、电子产品和日用产品修理业",value:"机动车、电子产品和日用产品修理业", id:252000},{label:"其他服务业",value:"其他服务业", id:253000}
                            ]
                        },
                        {
                            label:"教育",
                            value:"教育",
                            id:260000
                        },
                        {
                            label:"卫生和社会工作",
                            value:"卫生和社会工作",
                            id:270000,
                            children:[
                                {label:"卫生",value:"卫生", id:271000},{label:"社会工作",value:"社会工作", id:272000}
                            ]
                        },
                        {
                            label:"文化、体育和娱乐业",
                            value:"文化、体育和娱乐",
                            id:280000,
                            children:[
                                {label:"新闻和出版业",value:"新闻和出版业", id:281000},{label:"广播、电视、电影和影视录音制作业",value:"广播、电视、电影和影视录音制作业", id:282000},{label:"文化艺术业",value:"文化艺术业", id:283000},{label:"体育", value:"体育",id:284000},{label:"娱乐业",value:"娱乐业", id:285000}
                            ]
                        },
                        {
                            label:"公共管理、社会保障和社会组织",
                            value:"公共管理、社会保障和社会组织",
                            id:290000,
                            children:[
                                {label:"中国共产党机关", value:"中国共产党机关",id:291000},
                                {label:"国家机构",value:"国家机构", id:292000},
                                {label:"人民政协、民主党派",value:"人民政协、民主党", id:293000},
                                {label:"社会保障",value:"社会保障", id:294000},
                                {label:"群众团体、社会团体和其他成员组织", value:"群众团体、社会团体和其他成员组织",id:295000},
                                {label:"基层群众自治组织",value:"基层群众自治组织", id:296000}
                            ]
                        },
                        {
                            label:"国际组织",
                            value:"国际组织",
                            id:301000,
                        }
                    ]
                }],
                Selected:[ //已选条件
                ],
                searchScope:[ //查找范围
                    {name:"企业名",type:1},{name:"法人",type:1},{name:"经营范围",type:1}
                ],
                province:[ //省份
                    {name:"河北",type:2,isSelected:false},{name:"辽宁",type:2,isSelected:false},{name:"黑龙江",type:2,isSelected:false},{name:"浙江",type:2,isSelected:false},{name:"福建",type:2,isSelected:false},{name:"山东",type:2,isSelected:false},{name:"广东",type:2,isSelected:false},{name:"湖北",type:2,isSelected:false},
                    {name:"四川",type:2,isSelected:false},{name:"云南",type:2,isSelected:false},{name:"甘肃",type:2,isSelected:false},{name:"台湾",type:2,isSelected:false},{name:"广西壮族自治区",type:2,isSelected:false},{name:"宁夏回族自治区",type:2,isSelected:false},{name:"山西",type:2,isSelected:false},
                    {name:"吉林",type:2,isSelected:false},{name:"江苏",type:2,isSelected:false},{name:"安徽",type:2,isSelected:false},{name:"江西",type:2,isSelected:false},{name:"河南",type:2,isSelected:false},{name:"湖南",type:2,isSelected:false},{name:"海南",type:2,isSelected:false},
                    {name:"贵州",type:2,isSelected:false},{name:"陕西",type:2,isSelected:false},{name:"青海",type:2,isSelected:false},{name:"内蒙古自治区",type:2,isSelected:false},{name:"西藏自治区",type:2,isSelected:false},{name:"新疆维吾尔自治区",type:2,isSelected:false},{name:"北京",type:2,isSelected:false},{name:"上海",type:2,isSelected:false},{name:"天津",type:2,isSelected:false},{name:"重庆",type:2,isSelected:false}
                ],
                industry:[ //行业
                    {name:"农、林、牧、渔业",type:3,isSelected:false},{name:"采矿业",type:3,isSelected:false},{name:"制造业",type:3,isSelected:false},{name:"电力、热力、燃气及水生产和供应业",type:3,isSelected:false},{name:"建筑业",type:3,isSelected:false},{name:"批发和零售业",type:3,isSelected:false},{name:"交通运输、仓储和邮政业",type:3,isSelected:false},{name:"住宿和餐饮业",type:3,isSelected:false},
                    {name:"信息传输、软件和信息技术服务业",type:3,isSelected:false},{name:"金融业",type:3,isSelected:false},{name:"房地产业",type:3,isSelected:false},{name:"租赁和商务服务业",type:3,isSelected:false},{name:"科学研究和技术服务业",type:3,isSelected:false},{name:"水利、环境和公共设施管理业",type:3,isSelected:false},{name:"居民服务、修理和其他服务业",type:3,isSelected:false},
                    {name:"教育",type:3,isSelected:false},{name:"卫生和社会工作",type:3,isSelected:false},{name:"文化、体育和娱乐业",type:3,isSelected:false},{name:"公共管理、社会保障和社会组织",type:3,isSelected:false},{name:"国际组织",type:3,isSelected:false}
                ],
                dateEstablishment:[ //成立日期

                ],
                enterpriseState:[//企业状态
                    {name:"在业/在营/开业/经营",type:5,code:"1"},{name:"存续",type:5,code:"2"},
                    {name:"筹建",type:5,code:"3"},{name:"清算",type:5,code:"4"},{name:"迁入",type:5,code:"5"},
                    {name:"迁出",type:5,code:"6"},{name:"停业",type:5,code:"7"},{name:"撤销",type:5,code:"8"},
                    {name:"吊销",type:5,code:"9"},{name:"注销",type:5,code:"10"},{name:"其他",type:5,code:"15"}
                ],
                registeredCapital:[//注册资本
                    {name:"500万以下",type:6,value:'-500'},{name:"500-1000万",type:6,value:'500-1000'},{name:"1000-5000万",type:6,value:'1000-5000'},{name:"5000万以上",type:6,value:'5000-'}
                ],
                dateEstablishmentStart:'',//成立开始日期
                dateEstablishmentEnd:'',//成立结束日期
                registeredCapitalStart:'',//注册资本开始
                registeredCapitalEnd:'',//注册资本结束
                entName:[],//企业名称
                legalPersonName:[],//法人
                businessScope:[],//经营范围
                provinces:[],//省份
                cate1:[],//行业门类
                estiblishTimes:[],//成立时间
                type:[],//企业状态
                regCapitalMoneys:[],//注册资本
                ordinaryFilterCompany:[], //普通搜索返回数据
                newordinaryFilterCompany:[],
                URL:'', //详情页地址
                load:true,//页面加载
                noMoreData:false,
                loadTwo:true,
                noMoreDataTwo:false,

                //高级搜索
                radio: '0',
                advancedenterpriseState:[//企业状态
                    {name:"在业/在营/开业/经营",type:0,code:"1"},{name:"存续",type:0,code:"2"},
                    {name:"筹建",type:0,code:"3"},{name:"清算",type:0,code:"4"},{name:"迁入",type:0,code:"5"},
                    {name:"迁出",type:0,code:"6"},{name:"停业",type:0,code:"7"},{name:"撤销",type:0,code:"8"},
                    {name:"吊销",type:0,code:"9"},{name:"注销",type:0,code:"10"},{name:"其他",type:0,code:"15"}
                ],

                advancedentName:{
                    mustName:'',//企业名称包含字段
                    mustNotName:'',//企业名称不包含字段
                    fieldName:1,//企业名称筛选类型 1：并且关系，2：或者关系
                },//高级筛选企业名称
                advancedlegalPersonName:{
                    personName:'',//法人包含字段
                },
                advancedcompanyOrgType:{
                    fieldType:1,//企业类型筛选类型 1：并且关系，2：或者关系
                    mustType:'',//企业类型包含字段
                    mustNotType:'',//企业类型不包含字段
                },
                advancedbusinessScope:{
                    fieldBusinessScope:1,//经营范围筛选类型 1：并且关系，2：或者关系
                    mustBusinessScope:'',//经营范围包含字段
                    mustNotBusinessScope:'',//经营范围不包含字段
                },
                advancedregLocation:{
                    fieldRegLocation:1,//注册地址筛选类型 1：并且关系，2：或者关系
                    mustRegLocation:'',//注册地址包含字段
                    mustNotRegLocation:'',//注册地址不包含字段
                },
                regStatusCode:[],//企业状态
                regCapitalMoney:'',//注册资本
                estiblishTime:'',//成立日期
                base:{
                    province:'',
                    city:''
                },//省份传参
                cate:{
                    cate1:'',
                    cate2:''
                },//行业分类传参
                filterText: '',//高级筛选省份
                industryfilterText:'',//高级筛选行业
                regCapitalMoneyS1:'',//注册资本下线
                regCapitalMoneyS2:'',//注册资本上线
                estiblishTimeS1:'',//成立日期开始日期
                estiblishTimeS2:'',//成立日期结束日期
                field:'',//排序种类
                order:'',//排序类型
                filterCompany:[],//高级搜索返回数据
                newfilterCompany:[],//
                page_index: 1, // 当前页
                // advanced_page_index: 1, // 当前页
                page_total: 0, // 总条数
                page_size: 10, //每页条数
                page: 1,
                pageNationType:0,//0:普通搜索，1：高级搜索
                advanced_page_index:1,//高级搜索当前页
                advanced_page_total: 0, // 高级搜索总条数
                exportTotal:'',//导出条数

                //关注
                attentionGroupList:[],//用户所有分组
                isAttention:true,//用户是否已关注:false:未关注，true:已关注
                showAttentionGroup:false,//显示用户关注群组
                groupName:'',//新增群组名称
                showgroupinput:true,//显示新建群组按钮或input
                pickedGroup:'',//选择群组名称
                isShowAttention:false,//添加关注弹框是否展示
                attentionValue:{},//要关注的公司数据
                changecolor:false,
                // 公钥
                rsaPubkey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDW99x5MOg7WAK8+6d4r/+uXtP9bsgC6oufiLLfh0PdIGd4kXEauH0UdpGTGOdBdrB+qEZ7I29qcIy1kQKXunOIE5FlDMgYDyFpdQ5neu4M2r3YpIimqoCZZwqxY4coKpdjLQkVeB4yu+hGhHlvZ/9J19Dt76ABbv8LwNhAgu7RPQIDAQAB'

            }
        },
        mounted() {
            this.companyName = this.$route.query.companyName;
            if(this.companyName !==undefined && this.companyName !== '' && this.companyName !== null&&this.entName.length==0){
                //普通筛选
                this.entName.push(this.companyName);
                this.legalPersonName.push(this.companyName);
                this.businessScope.push(this.companyName);

                // this.getSearchIofo()

                //高级筛选
                this.advancedentName.mustName = this.companyName; //高级筛选企业名称包含值
            } else {
                this.loading = false
            }
            //成立日期
            let myDate = new Date();
            let tYear = myDate.getFullYear();
            // let json = [];
            for (let i = tYear - 10; i <= tYear; i++) {
                this.dateEstablishment.push({
                    "type":4,
                    "name" : i + ""
                });
            }
            this.dateEstablishment.sort(function(a,b){
                return a.text < b.text ? 1 : -1
            });

            // 默认企业名选择
            //  this.$refs.keyrange.firstElementChild.classList.add("actived")
            this.getordinaryFilterCompany()
            this.getfilterCompany()
        },
        methods: {
            handelChange(value){
                let arr = [];
                let att = [];
                for(let i = 0;i < 9;i++){
                    if(value !==undefined){
                        let val = value.toString();
                        if(val.length == 1){
                            let val = value
                            if(this.arr.indexOf(val)>=0){   //防止重复值
                                return  false
                            }else {
                                this.arr.push(val)
                                for(let i = 0;i < this.arr.length;i++){
                                    if(val === this.arr[i]){
                                        this.att.splice(this.att.indexOf(val))
                                    }
                                }
                            }
                            return arr;
                        }else if(val.length == 2){
                            let val =parseInt(value/10)
                            if(this.att.indexOf(val)>=0){   //防止重复值
                                return  false
                            }else {
                                this.att.push(val)
                                for(let i = 0;i < this.arr.length;i++) {
                                    if (val === this.arr[i]) {
                                        this.arr.splice(this.arr.indexOf(val))
                                    }
                                }
                            }
                            return att;
                        }
                    }
                }
            },
            querySearchOrganization(queryString, cb) {
                var res = this.newArr(this.orgList);
                var results = queryString ? res.filter(this.createFilter(queryString)) : res;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //选择地址变动
            handleChange(value) {
              this.base.province = value[1];
              this.base.city = value[2];
            },
            //行业分类变动
            industryChange(value) {
                this.cate.cate1 = value[1];
                this.cate.cate2 = value[2];
            },

            clear(type) {
                if(type==1) {
                    this.base.province=""
                    this.base.city=""
                } else if(type==2) {
                    this.cate.cate1=""
                    this.cate.cate2=""
                }
            },
            showheader(data){
                // 刷新组件
                // this.$router.go(0)
                let NewPage = "_empty" + "?time=" + new Date().getTime() / 500;
                this.$router.push(NewPage);
                this.$router.go(-1);
            },
            //筛选类型判断，
            filtertypeSelect(val){
                this.isChecked = val
                this.filtertype = val;//高级筛选
                this.currentindex = val
            },
            //分页
            pageChange(){
                if(!this.load &&this.filtertype!=1){
                    this.page_index ++;
                    this.getordinaryFilterCompany();
                }
            },
            pageChangeTwo(){
                if(!this.loadTwo&&this.filtertype!=0){
                    this.advanced_page_index ++;
                    this.getfilterCompany();
                }
            },
            //进入企业详情
            gotoCompany(value){
              // 跳转信易知的页面
              let url = 'https://xyz-pubserver.keeprisk.com/#/company/detail?entName='+ encodeURIComponent(this.getRsa(value)) + '&from=ZHDJ'
              window.open(url)
              // let formDate = {
              //     "legalPersonName": value,
              // }
              // JSON.stringify(formDate);
              // companyInfo(formDate)
              //     .then(res => {
              //       this.URL = res
              //       window.open(this.URL)
              //     })
            },
            // RSA加密
            getRsa(val){
              let RSA = new JSEncrypt();
              RSA.setPublicKey(this.rsaPubkey);
              return RSA.encryptLong(val);
            },
            getReturnNode(node,_array,value){
                let isPass = node.data &&  node.data.label && node.data.label.indexOf(value) !== -1;
                isPass?_array.push(isPass):'';
                this.index++;
                if(!isPass && node.level!=1 && node.parent){
                    this.getReturnNode(node.parent,_array,value);
                }
            },
            //
            filterNode(value, data ,node) {
                if(!value){
                    return true;
                }
                let level = node.level;
                let _array = [];//这里使用数组存储 只是为了存储值。
                this.getReturnNode(node,_array,value);
                let result = false;
                _array.forEach((item)=>{
                    result = result || item;
                });
                return result;
            },
            industryfilterNode(value, data,node) {
                /* if (!value) return true;
                return data.label.indexOf(value) !== -1 */
                // return data.label.indexOf(value)
                if(!value){
                    return true;
                }
                let level = node.level;
                let _array = [];//这里使用数组存储 只是为了存储值。
                this.getReturnNode(node,_array,value);
                let result = false;
                _array.forEach((item)=>{
                    result = result || item;
                });
                return result;
            },

            //注册资本
            sureRegisteredCapita(){
                this.traversalKey()
                if((this.registeredCapitalStart === '' || this.registeredCapitalStart == null || this.registeredCapitalStart == undefined || this.registeredCapitalStart === " ")&&(this.registeredCapitalEnd === '' || this.registeredCapitalEnd == null || this.registeredCapitalEnd == undefined || this.registeredCapitalEnd === " ")){
                    this.$message({
                        showClose: true,
                        message: '注册资本不能为空',
                        type: 'warning',
                        center: true,
                        offset:105,
                    });
                    return
                }
                let json = {
                    "type":6,
                    "value" : this.registeredCapitalStart + "-" + this.registeredCapitalEnd,
                    "name":this.registeredCapitalStart+"万" + "-" + this.registeredCapitalEnd + "万",
                };
                if(JSON.stringify(this.Selected).indexOf(JSON.stringify(json))==-1) {
                    this.Selected.forEach((item,index)=>{
                        if (item.type==6) {
                            this.Selected.splice(index,index+1)
                        }
                    })
                    this.Selected.push(json);
                }
                this.defaultkey()
            },
            shrink(e){
                this.$nextTick(()=>{
                    let warp = e.currentTarget.parentNode.parentNode;
                    if(warp.classList.contains('actived')){
                        warp.classList.remove('actived');
                        let tipwrap = e.currentTarget.getElementsByTagName("i")[0];
                        tipwrap.innerHTML = '更多';
                    }else {
                        warp.classList.add('actived');
                        let tipwrap = e.currentTarget.getElementsByTagName("i")[0];
                        tipwrap.innerHTML = '收起';
                    }
                })
            },
            //选项展开收缩
            more(e){
                this.$nextTick(()=>{
                    let warp = e.currentTarget.parentNode;
                    if(warp.classList.contains('actived')){
                        warp.classList.remove('actived');
                        let tipwrap = e.currentTarget.getElementsByTagName("i")[0];
                        tipwrap.innerHTML = '更多';
                    }else {
                        warp.classList.add('actived');
                        let tipwrap = e.currentTarget.getElementsByTagName("i")[0];
                        tipwrap.innerHTML = '收起';
                    }
                })

            },
            // 普通筛选关键字范围遍历封装  监测关键字范围是否被选中
            traversalKey(){
                this.searchScope.forEach((item,index)=>{
                    if (item.name==='企业名') {
                        if(item.isSelected){
                            this.entName=[]
                            this.entName.push(this.companyName)
                        }else {
                            this.entName=[]
                        }
                    }
                    if (item.name==='法人') {
                        if(item.isSelected){
                            this.legalPersonName=[]
                            this.legalPersonName.push(this.companyName)
                        }else {
                            this.legalPersonName=[]
                        }
                    }
                    if (item.name==='经营范围') {
                        if(item.isSelected){
                            this.businessScope=[]
                            this.businessScope.push(this.companyName)
                        }else {
                            this.businessScope=[]
                        }
                    }
                })
            },
            // 默认关键字查找
            defaultkey(){
                if (this.entName.length==0&& this.legalPersonName.length==0&& this.legalPersonName.length==0&&this.Selected.length==0) {
                    this.entName.push(this.companyName);
                    this.legalPersonName.push(this.companyName);
                    this.businessScope.push(this.companyName);
                }
                // this.getSearchIofo()
            },
            //添加选择
            addSelected(value,index,e){
                if(value.type === 1){ //查找范围
                    if(this.searchScope[index].isSelected){
                        this.searchScope[index].isSelected = false
                    }else {
                        this.searchScope[index].isSelected = true
                    }
                    this.traversalKey()//监测关键字范围是否被选中
                    let midArray = []
                    midArray =  JSON.parse(JSON.stringify(this.Selected))
                    this.searchScope.forEach((item,index)=>{
                        if (item.isSelected) {
                            midArray.push(item)
                        } else {
                            for(let j = 0; j<midArray.length; j++ ){
                                if(midArray[j].name === item.name){
                                    midArray.splice(j,1)
                                    break
                                }
                            }
                        }
                    })
                    for(var q=0; q<midArray.length; q++){
                        for(var w=q+1; w<midArray.length; w++){
                            if(midArray[q].name==midArray[w].name){//第一个等同于第二个，splice方法删除第二个
                                midArray.splice(w,1);
                                w--;
                            }
                        }
                    }
                    this.Selected =  JSON.parse(JSON.stringify(midArray))

                }else if(value.type === 2){ //省份地址

                    this.traversalKey()//监测关键字范围是否被选中
                    if(this.province[index].isSelected){
                        this.province[index].isSelected = false
                    }else {
                        this.province[index].isSelected = true
                    }
                    let midArray = []
                    midArray =  JSON.parse(JSON.stringify(this.Selected))

                    for(let i = 0;i<this.province.length;i++){
                        if (this.province[i].isSelected) {
                            midArray.push(this.province[i])
                        } else {
                            for(let j = 0; j<midArray.length; j++ ){

                                if(midArray[j].name === this.province[i].name){
                                    midArray.splice(j,1)
                                    break
                                }
                            }
                        }
                    }
                    for(var q=0; q<midArray.length; q++){
                        for(var w=q+1; w<midArray.length; w++){
                            if(midArray[q].name==midArray[w].name){         //第一个等同于第二个，splice方法删除第二个
                                midArray.splice(w,1);
                                w--;
                            }
                        }
                    }
                    this.Selected =  JSON.parse(JSON.stringify(midArray))
                }else if(value.type === 3){//行业分类
                    this.traversalKey()
                    if(this.industry[index].isSelected){
                        this.industry[index].isSelected = false
                    }else {
                        this.industry[index].isSelected = true
                    }
                    let midArray = []
                    midArray =  JSON.parse(JSON.stringify(this.Selected))
                    for(let i = 0;i<this.industry.length;i++){
                        if (this.industry[i].isSelected) {
                            midArray.push(this.industry[i])
                        } else {
                            for(let j = 0; j<midArray.length; j++ ){

                                if(midArray[j].name === this.industry[i].name){
                                    midArray.splice(j,1)
                                    break
                                }
                            }
                        }
                    }
                    for(var q=0; q<midArray.length; q++){
                        for(var w=q+1; w<midArray.length; w++){
                            if(midArray[q].name==midArray[w].name){         //第一个等同于第二个，splice方法删除第二个
                                midArray.splice(w,1);
                                w--;
                            }
                        }
                    }
                    this.Selected =  JSON.parse(JSON.stringify(midArray))
                }else if(value.type === 4){//成立日期
                    this.traversalKey()
                    let setType  = false;
                    if(Array.isArray(this.Selected) && this.Selected.length>0){
                        for (let i=0;i<this.Selected.length;i++) {
                            if(value.type === this.Selected[i].type){ //如果是成立时间
                                let setType = true;
                                Vue.set(this.Selected,i,value);
                                // return;
                            }else {
                                if(this.Selected.length - 1 == i){ //所有循环结束
                                    this.Selected.push(value);
                                }
                            }
                        }
                    }else if(Array.isArray(this.Selected) && this.Selected.length == 0){
                        this.Selected.push(value);
                    }
                }else if(value.type === 5){//企业状态
                    this.traversalKey()
                    this.Selected.forEach((item,index)=>{
                        if (item.type==5) {
                            this.Selected.splice(index,index+1)
                        }
                    })
                    if(this.Selected.indexOf(value)==-1){
                        this.Selected.push(value);
                    }

                }else if(value.type === 6){//
                    this.traversalKey()
                    this.Selected.forEach((item,index)=>{
                        if (item.type==6) {
                            this.Selected.splice(index,index+1)
                        }
                    })
                    if(this.Selected.indexOf(value)==-1){
                        this.Selected.push(value);
                    }
                }

                this.defaultkey()
            },
            //普通筛选点击确定
            getRegularSearchIofo(){
                this.page_index = 1
                this.loading = true;
                this.getordinaryFilterCompany();
            },
            //企业信息筛选数据
            getordinaryFilterCompany(){
              if(this.page_index==1) {
                this.loading = true;
              }
              this.load = true;
              let formDate = {
                entName:{
                  eq:this.advancedentName.mustName,
                  no_eq:this.advancedentName.mustNotName,
                  type:this.advancedentName.fieldName
                },
                pageNo:this.page_index,
                pageSize:this.pageSize,
                regAddr:{
                  eq:this.advancedregLocation.mustRegLocation,
                  no_eq:this.advancedregLocation.mustNotRegLocation,
                  type:this.advancedregLocation.fieldName
                },
                businessScope:{
                  eq:this.advancedbusinessScope.mustBusinessScope,
                  no_eq:this.advancedbusinessScope.mustNotBusinessScope,
                  type:this.advancedbusinessScope.fieldBusinessScope
                }
              };
              JSON.stringify(formDate);
              this.noMoreData=false
              selectInfo(formDate).then(res => {
                if(res !==null && res.code === "100"){
                  this.page_total = res.data.total;
                  if(this.page_index == 1) {
                    this.ordinaryFilterCompany = res.data.list
                  } else {
                    this.ordinaryFilterCompany =this.ordinaryFilterCompany.concat(res.data.list);
                  }

                  this.loading = true;
                  this.$nextTick(()=> {
                    this.load = false;
                  })
                  if(this.page_total <= this.ordinaryFilterCompany.length){
                    this.noMoreData=true
                  }
                }else {
                  this.noMoreData=true
                  this.loading = false;
                  if(this.page_index ===1){
                    this.page_total =0;
                    this.ordinaryFilterCompany = [];
                    this.load = false;
                  }else {
                    this.ordinaryFilterCompany = [];
                    this.load = false;
                  }

                }
                this.loading = false;
                this.load = false;
              })
              .catch(err =>{
                this.noMoreData=true
                this.loading = false;
                if(this.page_index ===1){
                  this.page_total =0;
                  this.ordinaryFilterCompany = [];
                }else {
                  this.ordinaryFilterCompany = [];
                  this.load = false;
                }
              })
            },
            //高级筛选，企业状态
            selectAdvance(val,index){
                if(val.type===1){ //已选
                    this.advancedenterpriseState[index].type =0;
                    this.regStatusCode.forEach((item,indexone)=>{
                        if (item==this.advancedenterpriseState[index].code) {
                            this.regStatusCode.splice(indexone,1)
                        }
                    })
                }else {
                    this.advancedenterpriseState[index].type =1;
                    this.regStatusCode.push(this.advancedenterpriseState[index].code)
                }
            },
            //获取筛选类型
            fieldTypes(val){
                if(val === 1){ //企业名称且
                    this.advancedentName.fieldName = 1;
                }else if(val === 2){//企业名称或
                    this.advancedentName.fieldName = 2;
                }else if(val === 3){//企业类型且
                    this.advancedcompanyOrgType.fieldType = 1;
                }else if(val === 4){//企业类型或
                    this.advancedcompanyOrgType.fieldType =2;
                }else if(val === 5){//经营范围且
                    this.advancedbusinessScope.fieldBusinessScope =1;
                }else if(val === 6){//经营范围或
                    this.advancedbusinessScope.fieldBusinessScope =2;
                }else if(val === 7){//注册地址且
                    this.advancedregLocation.fieldRegLocation =1;
                }else if(val === 8){//注册地址或
                    this.advancedregLocation.fieldRegLocation = 2
                }
            },
            //导出类型
            sortType(val,e){
                if(val === 0){//默认排序
                    this.field = '';
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '默认排序';
                }else if(val === 1){//企业名称降序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '企业名称降序';
                    this.field = '1';
                    this.order ='DESC';
                }else if(val === 2){//企业名称升序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '企业名称升序';
                    this.field = '1';
                    this.order ='ASC';
                }else if(val === 3){//注册资本降序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '注册资本降序';
                    this.field = '2';
                    this.order ='DESC';
                }else if(val === 4){//注册资本升序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '注册资本升序';
                    this.field = '2';
                    this.order ='ASC';
                }else if(val === 5){//成立日期降序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '成立日期降序';
                    this.field = '3';
                    this.order ='DESC';
                }else if(val === 6){//成立日期升序
                    e.currentTarget.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML = '成立日期升序';
                    this.field = '3';
                    this.order ='ASC';
                }
                this.advanced_page_index = 1; //重置分页
                this.advanced_Refresh= false;  //重置分页组件
                this.$nextTick(() => {  // //重置分页组件
                    this.advanced_Refresh= true;
                });
                this.getAdvancedSearchIofo(1);//获取高级筛选排序数据
            },
            //高级筛选点击确定
            getAdvancedSearchIofo(val){ //1:高级搜索 2：导出
              this.advanced_page_index = 1
              this.loading = true;
              if(val === 1){
                  this.getfilterCompany();
                  // this.regStatusCode =[];
              }else if(val === 2){
                  if(this.exportTotal >0){
                      if(this.exportTotal > 1000){
                          this.$message({
                              showClose: true,
                              message: '导出条数不能大于1000条，请重新调整导出条数',
                              type: 'warning',
                              center: true,
                              offset:102
                          });
                          this.loading = false
                          return;
                      }else {
                          if(this.exportTotal > this.advanced_page_total){
                              this.$message({
                                  showClose: true,
                                  message: '导出条数大于总条数，请重新调整导出条数',
                                  type: 'warning',
                                  center: true
                              });
                              this.loading = false
                              return;
                          }
                          this.downOrder();
                          this.regStatusCode =[];
                      }

                  }else {
                      this.$message({
                          showClose: true,
                          message: '请输入导出条数',
                          type: 'warning',
                          center: true,
                          offset:102
                      });
                      this.loading = false
                      return;
                  }
              }
            },
            //获取高级筛选信息
            getfilterCompany(){
                this.loadTwo = true
                if(this.advanced_page_index==1) {
                    this.loading = true;
                }
                if(this.checkList.length ==1 && this.checkList[0]==0){
                    this.radio = this.checkList[0]
                } else if (this.checkList.length ==1 && this.checkList[0]==1){
                    this.radio = this.checkList[0]
                } else{
                    this.radio = ''
                }
                if((this.advancedentName.mustName!=this.$route.query.companyName)&&(this.advancedentName.mustName!="")) {
                    this.advancedentName.mustName = this.advancedentName.mustName
                } else {
                    this.advancedentName.mustName =  this.advancedentName.mustName
                }
                let formDate = {
                    entName:{
                        eq:this.advancedentName.mustName,
                        no_eq:this.advancedentName.mustNotName,
                        type:this.advancedentName.fieldName
                    },
                    pageNo:this.advanced_page_index,
                    pageSize:this.page_size,
                    regAddr:{
                        eq:this.advancedregLocation.mustRegLocation,
                        no_eq:this.advancedregLocation.mustNotRegLocation,
                        type:this.advancedregLocation.fieldName
                    },
                    businessScope:{
                        eq:this.advancedbusinessScope.mustBusinessScope,
                        no_eq:this.advancedbusinessScope.mustNotBusinessScope,
                        type:this.advancedbusinessScope.fieldBusinessScope
                    },
                    legalPersonName:this.advancedlegalPersonName.personName,
                    region:{
                        province:this.base.province,
                        city:this.base.city,
                    },
                    industry:{
                        oneLevel:this.cate.cate1,
                        twoLevel:this.cate.cate2,
                    },
                    companyState:this.stateCheckList, //企业状态
                    listCompany:this.radio,  //上市情况
                    companyType:this.typeCheckList, //企业类型
                    insuredNum:this.personnelCheckList ,    //参保人数
                    staffSize:this.staffCheckList,//人员规模
                    establishTime:{'type':this.yearCheckList,'from':this.estiblishTimeS1,'to':this.estiblishTimeS2},  //成立年限
                    existType:this.arr,
                    noExistType:this.att,
                    regCapital:{'type':this.capitalCheckList,'from':this.regCapitalMoneyS1,'to':this.regCapitalMoneyS2},  //注册资本
                    // regStatusCode:this.regStatusCode,
                    sort:{
                        fieldSort:this.field||"regCapitalMoney",
                        sortOrder:this.order||"DESC",
                    },
                };
                JSON.stringify(formDate);
                this.noMoreDataTwo = false
                selectInfo(formDate)
                    .then(res => {
                        if(res !==null && res.code === "100"){
                            this.advanced_page_total = res.data.total;
                            if (this.advanced_page_index == 1) {
                                this.filterCompany = res.data.list
                            } else {
                                this.filterCompany = this.filterCompany.concat(res.data.list);
                            }
                            this.loading = true;
                            this.$nextTick(()=>{
                                this.loadTwo = false
                            })
                            if (this.advanced_page_total <= this.filterCompany.length) {
                                this.noMoreDataTwo = true
                            }
                        }else {
                            this.noMoreDataTwo=true
                            if(this.advanced_page_index ===1){
                                this.advanced_page_total =0;
                                this.filterCompany = [];
                                this.loading = true;
                                this.loadTwo = false;
                            }else {
                                this.filterCompany = [];
                                this.loading = true;
                                this.loadTwo = false;
                            }
                            this.advanced_page_total = 0
                        }
                        this.loading = false;
                    })
                    .catch(err =>{
                        this.loadTwo = false;
                        this.noMoreDataTwo=true
                        this.loading = false;
                        if(this.advanced_page_index ===1){
                            this.advanced_page_total =0;
                            this.filterCompany = [];
                        }else {
                            this.filterCompany = [];
                            this.loading = false;
                        }
                    })
            },
            //导出数据
            downOrder(){
                if(this.checkList.length ==1 && this.checkList[0]==0){
                    this.radio = this.checkList[0]
                } else if (this.checkList.length ==1 && this.checkList[0]==1){
                    this.radio = this.checkList[0]
                } else if(this.checkList.length == 2){
                    this.radio = ''
                }
                if(validate.integer(this.exportTotal,'请输入正确的导出条数',this)){
                    let vDate = new Date();
                    let myDate =vDate.getFullYear() + '' + (vDate.getMonth() + 1) + '' + vDate.getDate();
                    let fileNameTimeStamp = myDate;  //系统时间
                    let form = {
                        entName:{
                            eq:this.advancedentName.mustName,
                            no_eq:this.advancedentName.mustNotName,
                            type:this.advancedentName.fieldName
                        },
                        regAddr:{
                            eq:this.advancedregLocation.mustRegLocation,
                            no_eq:this.advancedregLocation.mustNotRegLocation,
                            type:this.advancedregLocation.fieldName
                        },
                        businessScope:{
                            eq:this.advancedbusinessScope.mustBusinessScope,
                            no_eq:this.advancedbusinessScope.mustNotBusinessScope,
                            type:this.advancedbusinessScope.fieldBusinessScope
                        },
                        legalPersonName:this.advancedlegalPersonName.personName,
                        region:{
                            province:this.base.province,
                            city:this.base.city,
                        },
                        industry:{
                            oneLevel:this.cate.cate1,
                            twoLevel:this.cate.cate2,
                        },
                        companyState:this.stateCheckList, //企业状态
                        listCompany:this.radio,  //上市情况
                        companyType:this.typeCheckList, //企业类型
                        insuredNum:this.personnelCheckList ,    //参保人数
                        staffSize:this.staffCheckList,//人员规模
                        establishTime:{'type':this.yearCheckList,'from':this.estiblishTimeS1,'to':this.estiblishTimeS2},  //成立年限
                        existType:this.arr,
                        noExistType:this.att,
                        regCapital:{'type':this.capitalCheckList,'from':this.regCapitalMoneyS1,'to':this.regCapitalMoneyS2},  //注册资本
                        // regStatusCode:this.regStatusCode,
                        sort:{
                            fieldSort:this.field||"regCapitalMoney",
                            sortOrder:this.order||"DESC",
                        },
                        pageSize:this.exportTotal,
                    };
                    exportEnt(form)
                    this.loading = false;
                    // .then(response=>{
                    //   console.log(response,"response")
                    //     // const content = response.data //返回的内容
                    //     // const fileName ='企业列表_'  +fileNameTimeStamp+ '.xls'//下载文件名
                    //     // download(content,fileName)
                    //     // this.loading = false;
                    // }).catch(err=>{
                    //     this.$message({
                    //         type: 'error',
                    //         message: '导出失败',
                    //         offset:102,
                    //     });
                    //     this.loading = false;
                    // });
                    // //处理下载流
                    // function download(content,fileName){
                    //     const blob = new Blob([content]) //创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
                    //     const url = window.URL.createObjectURL(blob)//URL.createObjectURL(object)表示生成一个File对象或Blob对象
                    //     let dom = document.createElement('a')//设置一个隐藏的a标签，href为输出流，设置download
                    //     dom.style.display = 'none'
                    //     dom.href = url;
                    //     dom.setAttribute('download',fileName)//指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
                    //     document.body.appendChild(dom)
                    //     dom.click()

                    // }
                }

            },
            //输入字体高亮
            getActive: function (type,companyname) {
                let reg;
                if(type === 1){
                    this.companyName =this.advancedentName.mustName
                    // this.companyName = $('.cen-search').val()
                    reg = this.companyName;
                }else if(type === 2){
                    reg = this.advancedentName.mustName;
                }
                let str = companyname;
                let isMark = str.match(/[style|STYLE|color|COLOR]/g);
                if (isMark !== null && isMark.length > 0) {//存在不可匹配字符
                    isMark = false;
                } else {
                    isMark = true;
                }
                if (companyname.indexOf('i') === -1 && companyname.indexOf('I') === -1 && isMark && !(/[0-9]/g.test(companyname))) {//防止用户输入拼音导致匹配结果错误
                    // if(companyname.indexOf('i')==-1){//防止用户输入拼音导致匹配结果错误
                    for (let i = 0; i < reg.length; i++) {
                        if (companyname.indexOf(reg[i]) !== -1 && reg[i] !== '(' && reg[i] !== ')') {
                            str = str.replace(new RegExp([reg[i]], 'gmi'),
                                '<i style="color: #e1261c;font-style: normal;">' +
                                reg[i] +
                                '</i>');
                        }
                    }
                    if (reg.indexOf('(') !== -1 && reg.indexOf(')') == -1) {
                        str = str.replace(/\(/g, '<i style="color: #e1261c;font-style: normal;">' + '(' + '</i>');
                    } else if (reg.indexOf('(') == -1 && reg.indexOf(')') !== -1) {
                        str = str.replace(/\)/g, '<i style="color: #e1261c;font-style: normal;">' + ')' + '</i>');
                    } else if (reg.indexOf('(') !== -1 && reg.indexOf(')') !== -1) {
                        str = str.replace(/\(/g, '<i style="color: #e1261c;font-style: normal;">' + '(' + '</i>').replace(/\)/g, '<i style="color: #e1261c;font-style: normal;">' + ')' + '</i>')
                    }
                } else {
                    let regNew = reg.replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\*/g, '');//针对搜索关键词中有括号的情况，先将括号转换成正则能识别的字符串
                    let searchCompany = reg.replace(/\*/g, '');
                    return companyname.replace(new RegExp(regNew, 'g'), '<i style="color: #e1261c;font-style: normal;">' + searchCompany + '</i>');
                }
                return str;

            },
            //企业状态转换
            changeBusinessStatus(type,info,statusOrColor) {
                return changeBusinessStatus(type,info,statusOrColor);
            },
            //高级筛选重置
            resetSearchIofo(){
                this.advancedentName.mustName ='';  //企业名称包含
                this.advancedentName.mustNotName ='';  //企业名称不包含
                this.advancedentName.fieldName =1;
                this.advancedlegalPersonName.personName = '';  //法人姓名
                this.advancedcompanyOrgType.mustType ='';  //企业类型
                this.advancedcompanyOrgType.mustNotType ='';   //企业类型
                this.advancedcompanyOrgType.fieldType =1;
                this.advancedbusinessScope.mustBusinessScope ='';  //经营范围
                this.advancedbusinessScope.mustNotBusinessScope ='';
                this.advancedbusinessScope.fieldBusinessScope =1;
                this.advancedregLocation.mustRegLocation ='';  //注册地址
                this.advancedregLocation.mustNotRegLocation ='';
                this.advancedregLocation.fieldRegLocation = 1;
                this.regStatusCode =[];  //企业状态
                this.base.province = '';   //省
                this.base.city ='';   //市
                this.advanced_page_index = 1;
                this.page_index = 1;
                this.cate.cate1 ='';
                this.cate.cate2 ='';
                this.regCapitalMoneyS1 = '';  //注册资本
                this.regCapitalMoneyS2 ='';
                this.estiblishTimeS1 ='';   //注册时间
                this.estiblishTimeS2 ='';
                this.radio = '';
                this.field = '';//排序种类
                this.order ='';//排序类型
                this.advanced_page_index = 1;
                this.industryfilterText ='';
                this.filterText='';
                this.checkList=[];
                this.value1 = "";
                this.typeCheckList=[], //企业类型
                    this.personnelCheckList=[], //参保人数
                    this.stateCheckList=[],  //企业状态
                    this.yearCheckList=[],  //成立年限
                    this.capitalCheckList=[], //注册资本
                    this.staffCheckList=[], //人员规模
                    this.phoneRadio=[], //电话号码
                    this.emailRadio=[],//邮箱
                    this.copyrightRadio=[],//软件著作权
                    this.workRadio=[], //作品著作
                    this.patentRadio=[],//专利
                    this.chattelRadio=[],//动产抵押
                    this.industryRadio=[],//高新技术产业
                    this.siteRadio=[],//网站
                    this.trademarkRadio=[],//商标
                    this.arr=[],  //有
                    this.att= [] //无

                for (let i=0;i<this.advancedenterpriseState.length;i++){
                    this.advancedenterpriseState[i].type =0;
                }
                this.sonRefresh= false;
                this.$nextTick(() => {
                    this.sonRefresh= true;
                    this.getfilterCompany()
                    this.getordinaryFilterCompany()
                });

            }
        },
        watch: {
            // 监听高级筛选成立日期
            value1(val) {
                if (val) {
                    this.estiblishTimeS1 = val[0]
                    this.estiblishTimeS2 = val[1]
                } else {
                    this.estiblishTimeS1 = ""
                    this.estiblishTimeS2 = ""
                }
            },
            filterText(){
                if (this.$refs.tree) {
                    this.$refs.tree.dropDownVisible = false; //监听值发生变化就关闭它
                }
            },
            filtertype(val) {
                if(val==1) {
                    this.pageChange()
                }

            },
        },
        filters:{
            selectedType(type){
                if(type !== undefined && type !== " " && type !== '' && type !== null){
                    if(type === 1){ //查找范围
                        return '查找范围'
                    }else if(type === 2){
                        return '省份地址'
                    }else if(type === 3){
                        return '行业门类'
                    }else if(type === 4){
                        return '成立日期'
                    }else if(type === 5){
                        return '企业状态'
                    }else if(type === 6){
                        return '注册资本'
                    }
                }else {

                }
            },
            //切割第一个字符串
            fourWord:function(name){
                return filterEmpty(name,function () {
                    return name.substring(0,4);
                })
            },
            //处理时间戳，只展示10位
            timeNdata(time) {
                return filterDate(time, function () {
                    return time.substring(0, 10)
                })
            },
            //数据判空
            filterEmpty(value) {
                return filterEmpty(value)
            },
        }
    }
</script>
<style scoped>
  /* @import url("../../assets/iconfont/iconfont.css"); */
  .content_box{
    margin-left: 0 !important;
  }
  .fixfoot-wrap {
    width: 100%;
    height: 100%;
  }
  .top {
    display: none;
    position: fixed;
    bottom: 109px;
    right: 28px;
    font-size: 16px;
  }
  .el-backtop:hover .top {
    display: block;
  }
  .UG_tips{
    text-align: center;
    font-size: 14px;
    vertical-align: center;
    /*padding: 20px;*/
    height: 36px;
    line-height: 36px;
    color: #ed7350;
    background-color: #f6f6f6;
    border-radius: 3px;
    cursor: pointer;
  }
  .financialServices {
    width: 100%;
    height: calc(100vh - 155px);
    overflow-y: auto;
    overflow-x: hidden;
    display: inline-block;
  }
  .content_box {
    opacity:1;
  }
  .financialCont {
    padding:20px;
  }
  .el-button--primary {
    background:#ED3C3C;
    border-color:#ED3C3C;
    opacity:1;
    border-radius:4px;
  }
  /*企业筛选*/
  @charset "UTF-8";
  *{
    box-sizing: border-box;
  }

  body {
    background: #f6f6f6;
  }
  i, strong, b, em {
    font-style:normal;
  }
  ol, ul {
    list-style-type:none;
    list-style-image:none;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .scrollbox {
    overflow-y: scroll;
    margin-top: 5px;
  }
  .scrollbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  .block-tab-con .searchbox {
    box-sizing: border-box;
    width: 824px;
    height: 62px;
    margin:0 auto;
    padding-left: 43px;
    padding-right: 150px;
    position: relative;
    /*background: url("../images/search-bg.png") no-repeat;*/
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    z-index: 1001;
  }
  .block-tab-con .searchbox .search-input {
    height: 100%;
    width: 100%;
    font-size: 18px;
    margin: 0;
    padding: 0;
    border: 0;
    /*background-color: transparent;*/
  }
  input:focus {
    outline:none;
  }

  .fixfoot-wrap {
    padding-bottom: 60px;
  }
  .main-box {
    width: 100%;
    margin:0 auto;
  }
  .zhhy-container {
    /*padding-top: 156px;*/
    /*padding-top: 105px;*/
    padding-bottom: 52px;
  }

  /*******  搜索个人  ******/
  .zh-filter-wrap {
    /*margin-top: 18px;*/
  }
  .zh-collapse {
    position: relative;
    border:1px solid #e8e8e8;
    border-bottom: 0;
    background-color: #fff;
    margin-bottom: 18px;
  }
  .zh-collapse .tit {
    position: relative;
    padding:0 24px;
    border-bottom:1px solid #e8e8e8;
    height: 54px;
    line-height: 54px;
    color: #b29c86;
    font-size: 14px;
  }
  .zh-collapse .tit .iconfont {
    font-size: 18px;
    margin-right: 10px;
  }
  .zh-navgate-right {
    font-size:inherit;
    float: right;
    height: 100%;
    line-height:inherit;
    position: relative;
    padding-right: 28px;
    text-align: right;
    cursor: pointer;
    user-select: none;
  }
  .zh-navgate-right:after {
    content: "\e64e";
    font-family: "iconfont" !important;
    font-size: 12px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #b29c86;
    position: absolute;
    width: 28px;
    height: 53px;
    text-align: center;
    line-height: 53px;
  }
  .zh-collapse.actived .zh-navgate-right:after {
    content: "\e64d";
  }
  .zh-collapse-content {
    display: none;
    padding: 23px 0;
    padding-right: 24px;
    border-bottom: 1px solid #e8e8e8;
  }
  .zh-collapse.actived .zh-collapse-content {
    display: block;
  }
  .zh-tb-item {
    display: table;
    width: 100%;
    /*line-height: 49px;*/
  }
  .bgGray {
    background: #f8f8f8;
  }
  .zh-collapse-content .zh-tb-item {
    /*margin-bottom: 15px;*/
  }
  .zh-collapse-content .zh-tb-item:last-child {
    margin-bottom: 12px;
  }
  .zh-tb-item .zh-left-label, .zh-tb-item .rihgt-block {
    display: table-cell;
    vertical-align: middle;
  }

  .zh-tb-item .rihgt-block {
    width: 100%;
  }
  .zh-tb-item .active {
    width: 262px;
  }
  .zh-tb-item .label-block {
    display: block;
    width: 127px;
    padding-right: 10px;
    padding-left: 30px;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    color: #8a8888;
    line-height: 40px;
    height: 40px;
  }
  .tb-cell-block {
    display: block;
    width:auto;
    padding: 15px 0;
  }
  .zh-form-item label {
    font-size: 14px;
    color: #999999;
    display: inline-block;
    line-height: 40px;
    margin-right: 14px;
    vertical-align: top;
  }
  .zh-inline-block {
    display: inline-block;
    margin-right: 32px;
  }
  .input-box {
    width: 300px;
  }
  .zh-inline-block input {
    display: block;
    height: 40px;
    line-height: 40px;
    width: 215px;
    border-radius:4px;
    /*background-color: #f8f8f8;*/
    border: 1px solid #cdcdcd;
    border: 0;
    padding: 0;
    margin: 0;
    padding-left: 10px;
    font-size: 14px;
    color: #333;
  }
  .zh-form-item .btn {
    display: inline-block;
    margin-top: 3px;
    padding: 0 12px;
    height: 27px;
    line-height: 27px;
    background-color: #ff564e;
    font-size: 12px;
    color: #fff;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin-left: -17px;
  }
  .zh-form-item .btn:active {
    opacity: .8;
  }
  .tb-cell-block .filter-cell {
    float: left;
    line-height: 34px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    padding:0 9px;
  }
  .tb-cell-block .filter-cell:hover, .tb-cell-block .filter-cell.actived {
    color: #ff1800;
  }
  /*.human-search-rs {*/
  /*  background-color: #fff;*/
  /*  padding-bottom: 62px;*/
  /*}*/
  .search-rs-tit {
    border-bottom:1px solid #eeeeee;
    height: 60px;
    line-height: 59px;
    padding-left: 26px;
    font-size: 14px;
    color: #666;
  }
  .search-rs-tit em {
    color: #ff1800;
  }
  .human-search-rs .lis {
    padding: 14px 19px;
  }
  .left-hd-img .txt {
    color: #fff;
    font-size: 30px;
  }
  .human-rs-cell:nth-of-type(4n+1) .left-hd-img {
    background-color: #fd5942;
  }
  .human-rs-cell:nth-of-type(4n+2) .left-hd-img {
    background-color: #f9b649;
  }
  .human-rs-cell:nth-of-type(4n+3) .left-hd-img {
    background-color: #b1bb95;
  }
  .human-rs-cell:nth-of-type(4n+4) .left-hd-img {
    background-color: #84a6e5;
  }
  .human-rs-cell .right-name {
    padding-top: 12px;
  }
  .human-rs-cell h5 {
    font-size: 20px;
    line-height: 1;
    color: #444444;
    margin-bottom: 13px;
  }
  .human-rs-cell .c-num {
    font-size: 14px;
    line-height: 1;
    color: #999999;
  }
  .human-rs-cell .c-num em {
    color: #ff564e;
  }
  .loca-item {
    height: 32px;
    line-height: 32px;
  }
  .loca-item .iconfont {
    font-size: 15px;
    line-height:inherit;
    color: #dcdcdc;
    margin-right: 8px;
  }
  .loca-txt {display: inline-block;}
  .loca-txt i {
    font-size: 16px;
    color: #555;
    line-height:inherit;
  }
  .loca-item .company-name {
    float: right;
    text-align: right;
    font-size: 16px;
    color: #555;
    line-height:inherit;
    max-width: 334px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .loca-item .company-name:hover {
    color: #cc6017;
  }
  .cen-pagination {
    text-align: center;
  }
  .cen-pagination .zh-pagination {
    display: inline-block;
  }
  .one-line-wrap {
    padding-right: 60px;
    position: relative;
    height: 32px;
    overflow: hidden;
  }
  .two-line-wrap {
    height: 64px;
  }
  .one-line-wrap.actived {
    height:auto;
  }
  .one-line-wrap .ck-more {
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    padding-left: 5px;
    text-align: left;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
    user-select: none;
  }
  .one-line-wrap .ck-more:before {
    content: "\e64e";
    font-family: "iconfont" !important;
    font-size: 10px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #999999;
    position: absolute;
    top: 0;
    right: 4px;
    width: 18px;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }
  .one-line-wrap.actived .ck-more:before {
    content: "\e64d";
  }
  .filter-cell em {
    color: #999999;
  }
  .drop-menu {
    position: relative;
  }
  .dropdown-menu {
    display: block;
    visibility:hidden;
    position: absolute;
    top: 52px;
    left: 0;
    background-color: #fff;
    min-width: 120px;
    transition:all 0.2s ease;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-shadow: 0 2px 6px #ed3c3c;
    box-shadow: 0 2px 6px #ed3c3c;
    border: 1px solid #ed3c3c;
    font-size: 13px;
    padding: 5px 0;
    opacity: 0;
    z-index: 100;
  }
  .drop-menu:hover>.dropdown-menu {
    visibility: visible;
    top: 32px;
    opacity: 1;
  }
  .estdate-list {
    width: 155px;
  }
  .c-state {
    width: 120px;
  }
  .estdate-list .drop-scroll {
    max-height: 196px;
  }
  .filter-cell.drop-menu .opt-cell{
    color: #333;
  }
  .estdate-list .opt-cell {
    padding-left: 10px;
  }
  .estdate-list .opt-cell:hover {
    background-color: #f22424;
    color: #fff;
  }
  .estdate-list .opt-cell:hover em {
    color: #fff;
  }
  .estdate-list .dropdown-toggle {
    display: block;
    padding-left: 10px;
    border-top: 1px solid #e8e8e8;
    background-color: #fff;
    color: #333;
  }
  .dropdown-toggle .iconfont {
    display: inline-block;
    font-size: 16px;
    transition: all .2s ease-in-out;
  }
  .drop-menu:hover>.dropdown-toggle .iconfont {
    transform: rotate(180deg);
  }
  .estdate-list .dropdown-toggle:hover {
    background-color: #f22424;
    color: #fff;
  }
  .estdate-list .dropdown-menu {
    width: 160px;
    margin-left: 145px;
    margin-top: -50px;
    color: #333;
    padding: 15px;
    font-size: 13px;
  }

  .del_conditions {
    font-size: 14px;
    color: #ff1800;
    line-height: 28px;
    position: absolute;
    right: 0;
    top: 4px;
    vertical-align: middle;
    cursor: pointer;
  }
  .del_conditions .iconfont {
    display: inline;
    vertical-align: middle;
    font-size: 22px;
    padding: 0;
    position: relative;
    top: -1px;
  }
  .sc-cell {
    float: left;
    border:1px solid #ff1800;
    border-radius: 2px;
    font-size: 12px;
    height: 28px;
    line-height: 26px;
    color: #ff1800;
    padding:0 8px;
    padding-right: 5px;
    margin-right: 15px;
    margin-top: 4px;
    margin-bottom: 6px;
  }
  .sc-cell .icondelete {
    font-size: 12px;
    padding:0 3px;
    cursor: pointer;
  }
  .company-search-rs {
    background-color: #fff;
    padding-bottom: 0px;
  }
  .companny-rs-cell{
    cursor:pointer;
  }
  .companny-rs-cell .innerlink {
    display: block;
    position: relative;
    padding-left: 156px;
    padding-right: 140px;
  }
  .companny-rs-cell .innerlink:after {
    content: '';
    position: absolute;
    left: 30px;
    right: 30px;
    bottom: 0;
    height: 1px;
    background-color: #eeeeee;
  }
  .companny-rs-cell .left-img-wrap {
    width: 88px;
    height: 88px;
    border-radius: 7px;
    text-align: center;
    overflow: hidden;
    position: absolute;
    left: 34px;
    top: 34px;
  }
  .companny-rs-cell:nth-of-type(4n+1) .left-img-wrap {
    background-color: #fd5942;
  }
  .companny-rs-cell:nth-of-type(4n+2) .left-img-wrap {
    background-color: #f9b649;
  }
  .companny-rs-cell:nth-of-type(4n+3) .left-img-wrap{
    background-color: #b1bb95;
  }
  .companny-rs-cell:nth-of-type(4n+4) .left-img-wrap{
    background-color: #84a6e5;
  }
  .companny-rs-cell .left-img-wrap img {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .companny-rs-cell .left-img-wrap .txt {
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding:14px;
  }
  .companny-rs-cell .right-state {
    height: 26px;
    line-height: 24px;
    font-size: 12px;
    color: #00a54c;
    border:1px solid #00a54c;
    border-radius: 2px;
    padding:0 11px;
    position: absolute;
    right: 48px;
    top: 50%;
    margin-top: -13px;
  }
  .companny-rs-cell .right-state.graytxt {
    color: #898a8e;
    border-color: #898a8e;
  }
  .companny-rs-cell .right-state.yellowtxt {
    color: #f3af0c;
    border-color: #f3af0c;
  }
  .companny-rs-cell .center-con {
    padding: 28px 0;
  }
  .companny-rs-cell h5 {
    font-size: 20px;
    /*color: #d5282b;*/
    font-weight:bold;
    line-height: 1;
    margin-bottom: 18px;
  }
  .companny-rs-cell .c_labelblock {
    text-align: left;
  }
  .companny-rs-cell .c_labelblock .label_item {
    display: inline-block;
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #3399ff;
    background-color: #eaf5ff;
    border-radius: 4px;
    margin-right: 10px;
    margin-bottom: 4px;
  }
  .companny-rs-cell h5 em {
    color: #ff564e;
  }
  .companny-rs-cell .info-item {
    overflow: hidden;
  }
  .companny-rs-cell .inlineblock {
    font-size: 14px;
    color: #666666;
    line-height: 26px;
    float: left;
    position: relative;
    padding-right: 34px;
    margin-right: 34px;
  }
  .companny-rs-cell .inlineblock:after {
    content:'';
    position: absolute;
    width: 1px;
    height: 16px;
    right: 0;
    top: 50%;
    margin-top: -8px;
    background-color: #dddddd;
  }
  .companny-rs-cell .info-item .inlineblock:last-child:after {
    display: none;
  }
  .nodata-wrap {
    min-height: 440px;
    text-align: center;
    padding-top: 80px;
    font-size: 14px;
  }
  .nodata-wrap img {
    display: block;
    width: 222px;
    margin:0 auto;
  }
  .nodata-wrap .txt {
    width: 100%;
    font-size:inherit;
    color: #666666;
    text-align: center;
    line-height: 1;
  }

  /*!*新闻舆情*!*/
  /*.xwyq {*/
  /*  background-color: #99cc66;*/
  /*}*/
  /*!*招投标*!*/
  /*.ztb {*/
  /*  background-color: #7483d8;*/
  /*}*/
  /*!*工商变更*!*/
  /*.gsbg {*/
  /*  background-color: #f9b649;*/
  /*}*/
  /*!*法院公告*!*/
  /*.fygg {*/
  /*  background-color: #e67371;*/
  /*}*/

  /*.attentioin-info-lis .center-block {*/
  /*  padding-top: 20px;*/
  /*  padding-bottom: 30px;*/
  /*}*/
  /*.attentioin-info-lis .c-name {*/
  /*  display: block;*/
  /*  font-size: 18px;*/
  /*  color: #888888;*/
  /*  line-height: 38px;*/
  /*  margin-bottom: 15px;*/
  /*}*/
  /*.attentioin-info-lis .tit-txt {*/
  /*  font-size: 18px;*/
  /*  color: #333333;*/
  /*  line-height: 26px;*/
  /*  flex: 1;*/
  /*}*/
  .c-name:hover, .c-info-link:hover .tit-txt, .c-info-link:hover .info-desc {
    color: #ff564e;
  }
  .attentioin-info-lis .info-tit {
    margin-bottom: 9px;
  }
  .attentioin-info-lis .info-state {
    display: inline-block;
    width: 54px;
    height: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    margin-right: 10px;
    position: relative;
    top: 4px;
  }
  .attentioin-info-lis .info-state:before {
    position: absolute;
    left: 3px;
    top: 0;
    height: 20px;
    line-height: 20px;
    font-size:15px;
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .attentioin-info-lis .info-state:after {
    position: absolute;
    height: 20px;
    line-height: 20px;
    right: 9px;
    top: 0;
    font-size: 10px;
  }

  /*!*负面*!*/
  /*.info-state.nagative:before {*/
  /*  content: "\e60c";*/
  /*  color: #ff8874;*/
  /*}*/
  /*.info-state.nagative:after {*/
  /*  content:'负面';*/
  /*  color: #ff8874;*/
  /*}*/
  /*!*正面*!*/
  /*.info-state.positive:before {*/
  /*  content: "\e60d";*/
  /*  color: #92c65c;*/
  /*}*/
  /*.info-state.positive:after {*/
  /*  content:'正面';*/
  /*  color: #92c65c;*/
  /*}*/
  /*!*中性*!*/
  /*.info-state.neutral:before {*/
  /*  content: "\e60e";*/
  /*  color: #98999b;*/
  /*}*/
  /*.info-state.neutral:after {*/
  /*  content:'中性';*/
  /*  color: #98999b;*/
  /*}*/

  .attentioin-info-lis .info-desc {
    margin-bottom: 15px;
    font-size: 14px;
    color: #666666;
    line-height: 24px;
  }
  .attentioin-info-lis .source-time {
    font-size: 12px;
    color: #999999;
    line-height: 1;
  }
  .attentioin-info-lis .source-time .info-source {
    height: 28px;
    display: inline-block;
    background-color: #f0f0f0;
    color: #666;
    padding: 0 15px;
    line-height: 28px;
    border-radius: 14px;
    position: relative;
    top: 9px;
  }
  .attentioin-info-lis .info-time .iconfont {
    margin-left: 34px;
    font-size: 11px;
    margin-right: 4px;
  }
  .infotype2 {
    line-height: 24px;
    font-size: 14px;
    color: #555555;
    margin-bottom: 25px;
  }
  .c-info-link:hover .infotype2 {
    color: #ff564e;
  }
  .infotype2 .changetxt {
    margin-right: 20px;
  }
  .c-name-opt {
    margin-bottom: 15px;
  }
  .c-name-opt .c-name {
    display: inline;
  }

  /*筛选改*/
  .leftlabel .filtertype-select {
    cursor: pointer;
    display: inline-block;
    color: #333;
  }
  .leftlabel .filtertype-select.actived {
    color: #cc6017;
    font-weight:700;
    font-size: 16px;
  }
  .leftlabel .filtertype-select:hover {
    color: #cc6017;
  }
  .zh-collapse .leftlabel .iconqiehuan1 {
    font-size: 16px;
    margin:0 5px;
    color: #999;
  }
  .filtertype-con {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -100;
    opacity: 0;
  }
  .filtertype-con.actived {
    position: relative;
    z-index: auto;
    opacity: 1;
  }
  .selectwrap {
    position: relative;
    cursor: pointer;
  }
  .selectwrap .rs {
    display: block;
    height: 32px;
    line-height: 32px;
    padding-right:20px;
    position: relative;
  }
  .selectwrap .rs:after {
    content: "\e615";
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    right: 0;
    top: 50%;
    line-height: 20px;
    margin-top: -10px;
    color: #333;
  }
  .selectwrap .opt-block {
    display: block;
    visibility:hidden;
    position: absolute;
    top: 52px;
    left: 0;
    background-color: #fff;
    min-width: 120px;
    transition:all 0.2s ease;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-shadow: 0 2px 6px #ed3c3c;
    box-shadow: 0 2px 6px #ed3c3c;
    border: 1px solid #ed3c3c;
    font-size: 13px;
    padding: 5px 0;
    opacity: 0;
    z-index: 100;
  }
  .selectwrap.open .opt-block {
    visibility: visible;
    top: 32px;
    opacity: 1;
  }
  .selectwrap .opt-block .opt-cell {
    padding-left: 10px;
    cursor: pointer;
    line-height: 34px;
  }
  .selectwrap .opt-block .opt-cell:hover,.selectwrap .opt-block .opt-cell.actived {
    color: #f22424;
    font-weight: 700;
  }
  .filtertype-con .zh-inline-block input {
    width: 275px;
    border: 1px solid #DCDFE6;
  }
  .filtertype-con .zh-inline-block .cen-search input {
    width: 275px;
  }
  .filtertype-con .zh-inline-block .keyword-search input,.tb-cell-block .zh-form-item:nth-of-type(2) .zh-inline-block .keyword-search input {
    width: 100%;
  }
  /*筛选改 end*/


  .company-search-rs .filter-cell, .company-search-rs .exportinput, .company-search-rs .confirm-btn {
    display: inline-block;
    margin-right: 16px;
  }
  .company-search-rs .filter-cell{
    margin-right: 89px;
  }
  .company-search-rs .exportinput input {
    height: 24px;
    width: 70px;
    border:1px solid #ddd;
    font-size: 12px;
    border-radius: 3px;
  }
  .company-search-rs .confirm-btn {
    height: 30px;
    line-height: 30px;
    width: 80px;
    border-radius: 3px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    background-color: #ed3c3c;
    cursor: pointer;
  }
  .company-search-rs .confirm-btn:hover {
    background-color: #ed3c3c;
  }
  .company-search-rs .filter-cell.drop-menu .opt-cell {
    height: 34px;
    line-height: 34px;
    cursor: pointer;
  }
  .company-search-rs .drop-menu:hover>.dropdown-menu {
    top: 45px;
  }
  .el-pager li{
    height: 40px;
    line-height: 40px;
    min-width: 40px;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    height: 40px;
    line-height: 40px;
    min-width: 40px;
    color: #999999;
    background: #ffffff;
    border: 1px solid #cccccc;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #f22424;
    color: #fff;
    border-color: #f22424;
  }
  /*.zh-inline-block input:focus {  输入框点中后的样式*/
  /*  border-color:#bd0000;*/
  /*}*/
  .center-con .flexbox{display: flex;}
  .center-con .flexbox h5{cursor: pointer;}
  /* .center-con .right-state {
    width: 70px;
  } */
  .center-con .flexbox .right-state{
    height: 26px;
    line-height: 24px;
    font-size: 12px;
    color: #00a54c;
    border: 1px solid #00a54c;
    border-radius: 2px;
    padding: 0 11px;
    margin-top: -4px;
    margin-left: 20px;
    position: inherit;
    cursor: initial;
    white-space: nowrap;
  }
  .showSureTime{
    display: block;
    padding-left: 10px;
    border-top: 1px solid #e8e8e8;
    background-color: #fff;
    color: #333;
  }
  .sureTimeBox{
    display: block;
    position: absolute;
    background-color: #fff;
    min-width: 120px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    border-radius: 2px;
    -webkit-box-shadow: 0 2px 6px #ed3c3c;
    box-shadow: 0 2px 6px #ed3c3c;
    border: 1px solid #ed3c3c;
    font-size: 13px;
    padding: 5px 0;
    z-index: 100;
    /*top: 0;*/
    /*left: 100%;*/
    top: 52px;
    left: 0;
  }
  .dropdown-menu {
    z-index: 2001
  }
  .drop-menu .sureTimeBox{
    width: 160px;
    margin-left: 145px;
    margin-top: -50px;
    color: #333;
    padding: 15px;
    font-size: 13px;
  }
  .companny-rs-cell .isAttention{
    color: #999999;
    border: 1px solid #999999;
  }
  .zh-form-item label /deep/ .el-radio__input.is-checked .el-radio__inner{
    /*border-color: #f22424;*/
    /*background: #f22424;*/
  }
  .zh-form-item label /deep/ .el-radio__input.is-checked+.el-radio__label{
    /*color:#f22424*/
  }
  .estdate-list .opt-cell{
    line-height: 16px;
    padding: 5px;
    padding-left: 10px;
  }
  .companny-rs-cell .right-state {
    cursor: pointer;
    padding: 0;
    border: 1px solid #fe6f00;
    color: #fe6f00;
  }
  .center-con .flexbox .txtred{
    color:#f32836;
    border: 1px solid #f32836;
  }
  .center-con .flexbox .txtyellow{
    color: #f3af0c;
    border: 1px solid #f3af0c;
  }
  .zh-tb-item .lebel-line:after{
    content: '';
    position: absolute;
    left: 96%;
    right: 0;
    bottom: 0;
    width: 2px;
    height: 20px;
    top: 7px;
    background-color: #eeeeee;
  }
  .zh-tb-item .zh-left-label{position: relative;}
  .filter-tree {
    max-height: 400px;
    overflow-y: auto;
    /* position: absolute; */
    top: 0;

  }
  .filter-tree::-webkit-scrollbar {/*滚动条整体样式*/
    width: 3px;     /*高宽分别对应横竖滚动条的尺寸*/
    /* height: 1px; */
  }
  .right-state.attention-opt.followed{
    border-color: #b8b8b8;
    color: #b8b8b8;
  }
  .rihgt-block /deep/ .el-range-separator{
    width: 8%;
  }
  /*企业筛选end*/
  .el-button--primary:hover{
    background: #fff;
    border: 1px solid #fff;
    color: #ED3C3C;
  }
  .el-icon-close:before{
    font-size: 16px !important;
  }
  .txt-oneline{
    margin-top: 0;
  }
  .searchBtn{
    background-color: #ED3C3C;
  }
</style>

