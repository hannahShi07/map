/**
 *  @author zhuyalun
 *  @email 1835094945@qq.com
 *  @description 企业筛选器API
 *  @data {{object} data 接口请求参数
 **/
import request from "../../../../AxiosRequest.js";
import commonReq from "../../../../public/commonReq";

//企业详情
export const companyInfo = data =>
  request({
    url: '/partycloud/enterpriseFilter/enterpriseFilterInfo',
    method: 'post',
    data: data
  })

// 企业信息筛选数据
export const selectInfo = data =>
  request({
    url: '/partycloud/enterpriseFilter/selectinfo',
    method: 'post',
    data: data
  })

/* 导出*/
export const exportEnt = data =>{
  let url = '/partycloud/enterpriseFilter/exportEnterpriseFilter'
  commonReq.getHistoryExport(data,url)
  // request({
  //   url: '/partycloud/enterpriseFilter/exportEnterpriseFilter',
  //   method: 'post',
  //   data: data
  // })
}
/**
 * 时间戳转换
 * @author 朱雅伦
 * @date 2021-03-17
 * @param {string} value：要过滤的字符串，{fun} success:要处理的方法逻辑，{} tips:
 */
function filterEmpty(value,success,tips,type){//用于过滤 undefined,空字符串,null,'null',type:1,返回true,false
  if(value === undefined || value === '' || value === null || value === 'null' || value === " " || value === 0){
    if(tips === undefined){
      if(type == 1){
        return  false;
      }else{
        return "-";
      }
    }else{
      if(type == 1){
        return  false;
      }else {
        return tips
      }
    }
  }else{
    if(typeof(success) === "function"){//如果是一个方法则调用方法
      return success();
    }else{//否则直接返回第一个参数
      if(type == 1){
        return  true;
      }else {
        return value;
      }
    }
  }
}

/**
 * 时间戳转换
 * @author 朱雅伦
 * @date 2021-03-17
 * @param {string} msesInt：要过滤的时间戳，{fun} success:要处理的方法逻辑
 */
function filterDate(date,success) {//用于过滤时间戳
  if(date === undefined || date === '' || date === null || date === 'null' || date == 0 || date === ' ' || date === " "){//判空处理
    return "-";
  }else{
    if(typeof(date) === "number" || (typeof (date) === "string" && (date.length >= 10 && date.length <= 13) && date.indexOf("/") === -1 && date.indexOf("-") === -1 && date.indexOf("年") === -1 && date.indexOf(".") === -1)){//为时间戳
      if(typeof(date) === "string"){
        date = parseInt(date);
      }
      return changeInfoDate(date, 'yyyy-MM-dd');
    } else{
      if(typeof(success) === "function"){//如果是一个方法则调用方法
        return success();
      }else{//否则直接返回第一个参数
        return date;
      }
    }
  }
}

/**
 * 时间戳转换
 * @author 朱雅伦
 * @date 2021-03-17
 * @param {string} msesInt：要转换的时间戳，{string} format：要转换的时间戳格式
 */
let changeInfoDate = function(msesInt, format) {
  Date.prototype.Format = function(fmt) {
    let o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(let k in o)
      if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  let dt = new Date(msesInt); // 初始化Date对象
  let ndt = dt.Format(format);
  return ndt;
};

/**
 * 正则验证
 * @author 朱雅伦
 * @date 2021-03-17
 */
var validate = {
  //整数
  integer:function(obj,tipValue,$this){
    let tip;
    if(tipValue !== undefined && tipValue !== '' && tipValue !== null && tipValue !== '' && tipValue !== " "){
      tip = tipValue;
    }else {
      tip = '只能输入整数';
    }
    let reg = /^\d+$/;
    if(!reg.test(obj)){
      $this.$message({
        type: 'warning',
        message: tip,
        offset:102,
      });
      // $this.$vux.toast.text('只能输入是字母或者数字,请重新输入','middle');
      return false;
    }
    return true;
  },
  //只包含数字，英文，汉字
  isNYC:function(obj ,tipValue,$this){
    if(/[^a-zA-Z0-9\u4E00-\u9FA5]/.test(obj)){
      let tip;
      if(tipValue !== undefined && tipValue !== '' && tipValue !== null && tipValue !== '' && tipValue !== " "){
        tip = tipValue;
      }else {
        tip = '名称不能包含特殊字符';
      }
      $this.$vux.toast.text(tip,'middle');
      return false;
    }
    return true;
  },
  // 汉字
  isChinese: function(obj,$this) {
    let reg = /^[\u0391-\uFFE5]+$/;
    if(obj != "" && !reg.test(obj)) {
      $this.$vux.toast.text('必须输入中文','middle');
      return false;
    }
    return true;
  },
  // 字母
  checkChar: function(obj,$this) {
    let zmReg = /^[a-zA-Z]*$/;
    if(obj != "" && !zmReg.test(obj)) {
      $this.$vux.toast.text('只能是英文字母','middle');
      return false;
    }
    return true;
  },
  // 数字
  checkNumber: function(obj,$this) {
    let reg = /^[0-9]+$/;
    if(obj != "" && !reg.test(obj)) {
      $this.$vux.toast.text('只能输入数字','middle');
      return false;
    }
    return true;
  },
  // 英文字母和数字
  checkStrOrNum: function(obj,$this) {
    let zmnumReg = /^[0-9a-zA-Z]*$/;
    if(obj != "" && !zmnumReg.test(obj)) {
      $this.$vux.toast.text('只能输入是字母或者数字,请重新输入','middle');
      return false;
    }
    return true;
  },
  // 邮箱
  email: function(obj,$this) {
    //对电子邮件的验证
    let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(!myreg.test(obj)) {
      $this.$vux.toast.text('请输入有效的邮箱','middle');
      return false;
    }
    return true;
  },
  // 手机号
  phone: function(obj,$this) {
    if(obj.length == 0) {
      $this.$vux.toast.text('手机号码不能为空！','middle');
      return false;
    }
    if(obj.length != 11) {
      $this.$vux.toast.text('请输入有效的手机号码，需是11位！','middle');
      return false;
    }
    let myreg = /^(((13[0-9]{1})|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))+\d{8})$/;
    if(!myreg.test(obj)) {
      $this.$vux.toast.text('请输入有效的手机号码！','middle');
      return false;
    }
    return true;
  },
  phoneWrong: function(obj,$this) {
    if(obj.length != 11) {
      $this.$vux.toast.text('请输入正确的手机号码！','middle');
      return false;
    }
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if(!myreg.test(obj)) {
      $this.$vux.toast.text('请输入正确的手机号码！','middle');
      return false;
    }
    return true;
  }
};

/**
 * 转换经营状态
 * @author 朱雅伦
 * @date 2021-03-17
 * @param {string} type 企业状态码,{string} info 企业状态,{string} statusOrColor 0:转换状态；1：转换颜色
 * 如果企业状态码为空，则选择企业状态解析，若企业状态为空取企业状态
 *
 */
function changeBusinessStatus(type,info,statusOrColor) {
  if(type!== undefined && type !==null && type!== 'null' && type !=='' && type!==' '){
    if(type == 1 || type==11 || type==12 || type==13 || type==14){//在业，开业，在营，经营
      if(statusOrColor == 0){
        return '在业';
      }else{
        return 'txtgreen';//绿色
      }
    }else if(type == 2){
      if(statusOrColor == 0){
        return '存续';
      }else{
        return 'txtgreen';//绿色
      }
    }else if(type == 3){
      if(statusOrColor == 0){
        return '筹建';
      }else if(statusOrColor == 1){
        return 'txtyellow';//黄色
      }else if(statusOrColor == 2){
        return 'yellow';//黄色
      }
    }else if(type == 4){
      if(statusOrColor == 0){
        return '清算';
      }else if(statusOrColor == 1){
        return 'txtred';//红色
      }else if(statusOrColor == 2){
        return 'yellow';//红色
      }
    }else if(type == 5){
      if(statusOrColor == 0){
        return '迁入';
      }else if(statusOrColor == 1){
        return 'txtyellow';//黄色
      }else if(statusOrColor == 2){
        return 'yellow';//黄色
      }
    }else if(type == 6){
      if(statusOrColor == 0){
        return '迁出';
      }else if(statusOrColor == 1){
        return 'txtyellow';//黄色
      }else if(statusOrColor == 2){
        return 'yellow';//黄色
      }
    }else if(type == 7){
      if(statusOrColor == 0){
        return '停业';
      }else if(statusOrColor == 1){
        return 'txtred';//红色
      }else if(statusOrColor == 2){
        return 'red';//红色
      }
    }else if(type == 8){
      if(statusOrColor == 0) {
        return '撤销';
      }else if(statusOrColor == 1){
        return 'txtred';//红色
      }else if(statusOrColor == 2){
        return 'red';//红色
      }
    }else if(type == 9){
      if(statusOrColor == 0) {
        return '吊销';
      }else if(statusOrColor == 1){
        return 'txtred';//红色
      }else if(statusOrColor == 2){
        return 'red';//红色
      }
    }else if(type ==10){
      if(statusOrColor == 0) {
        return '注销';
      }else if(statusOrColor == 1){
        return 'txtred';//红色
      }else if(statusOrColor == 2){
        return 'red';//红色
      }
    }else{
      if(statusOrColor == 0) {
        return '暂无'
      }else{
        return '';//
      }
    }
  }else{
    if(info!== undefined && info !==null && info!== 'null' && info !=='' && info!==' '){
      if(statusOrColor == 0) {
        return info.substring(0.2);
      }else if(statusOrColor == 1){//区分颜色//公司详情页
        if(/在业|开业|在营|经营|存续/.test(info)){
          return '';//默认绿色
        }else if(/清算|停业|停产|撤销|吊销|注销/.test(info)){
          return 'txtred';//红色
        }else if(/迁入|迁出|筹建/.test(info)){
          return 'txtyellow';//黄色
        }
      }else if(statusOrColor == 2){//区分颜色//公司搜索页面
        if(/在业|开业|在营|经营|存续/.test(info)){
          return '';//默认绿色
        }else if(/清算|停业|停产|撤销|吊销|注销/.test(info)){
          return 'zx';//红色
        }else if(/迁入|迁出|筹建/.test(info)){
          return 'qc';//黄色
        }
      }
    }else{
      return '-'
    }
  }
}
export {
  filterDate,
  filterEmpty,
  changeBusinessStatus,
  validate
}
