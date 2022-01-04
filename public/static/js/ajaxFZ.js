var pv = {
	//输出语句
	log:function (msg) {
		//console.log(msg)
	}
}

/**
 * 公共配置
 * @author 张仁荣
 * @date 2019-05-29
 * @param {string} url 接口地址(必填)，{object} params 接口请求参数,{string} type 请求类型, {function} success 接口请求成功处理逻辑
 *{function} beforeSend 向服务器发送请求之前处理逻辑 ，{function} complete 向服务器发送请求成功之后处理逻辑,{string} error 该接口作用
 */
var pAjax = {
	rootPath:'',
	//默认请求头
	myAjax_Token:function (rootPath,url, params,success, beforeSend, complete, error) {
		$.ajax(rootPath + url, {
			data: params,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为10秒；
			beforeSend: beforeSend,
			success: success,
			complete: complete,
			error: function(xhr, type, errorThrown) {
				pv.log(error + " " + xhr.status + " " + JSON.stringify(errorThrown) + " " + type);
			}
		});
	},
	// json请求头
	jsonAjax_Token:function (rootPath,url, params,success, beforeSend, complete, error) {
		$.ajax(rootPath + url, {
			data: params,
			headers:{'Content-Type': 'application/json;charset=UTF-8'},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 30000, //超时时间设置为10秒；
			beforeSend: beforeSend,
			success: success,
			complete: complete,
			error: function(xhr, type, errorThrown) {
				pv.log(error + " " + xhr.status + " " + JSON.stringify(errorThrown) + " " + type);
			}
		});
	},
	getAjax_Token:function (url,params,success, beforeSend, complete, error) {
		$.ajax(url, {
			data: params,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 30000, //超时时间设置为10秒；
			beforeSend: beforeSend,
			success: success,
			complete: complete,
			error: function(xhr, type, errorThrown) {
				pv.log(error + " " + xhr.status + " " + JSON.stringify(errorThrown) + " " + type);
			}
		});
	}
}

function postAjax(url,data,beforeSend,success,complete,error){ //$.post
	$.post({url:url,
		data:data,
		beforeSend:beforeSend,
		success:success,
		complete:complete,
		error:function(xhr, type, errorThrown){
			console.log(xhr +" "+type + " " + errorThrown +" "+ error);
		}
	})
}

function postAjaxJson(url,data,beforeSend,success,complete,error){ //$.post
	$.post({url:url,
		data:data,
		headers:{'Content-Type': 'application/json;charset=UTF-8'},
		beforeSend:beforeSend,
		success:success,
		complete:complete,
		error:function(xhr, type, errorThrown){
			console.log(xhr +" "+type + " " + errorThrown +" "+ error);
		}
	})
}

function ajaxPost(url,data,beforeSend,success,complete,error){//$.ajax
	$.ajax({
		method: 'POST',//请求方法
		dataType: "json",
		url:url,
		data:data,
		beforeSend:beforeSend,
		success:success,
		complete:complete,
		error:function(xhr, type, errorThrown){
			console.log(xhr +" "+type + " " + errorThrown +" "+ error);
		}
	})
}
function ajaxGet(url,data,beforeSend,success,complete,error){//$.ajax
	$.ajax({
		method: 'GET',//请求方法
		dataType: "json",
		url:url,
		data:data,
		beforeSend:beforeSend,
		success:success,
		complete:complete,
		error:function(xhr, type, errorThrown){
			console.log(xhr +" "+type + " " + errorThrown +" "+ error);
		}
	})
}

function removeBlank(field){
    field = field.replace(/\s*/g,"");
	return field;
}
/**
 * 时间戳转换
 * @author 张仁荣
 * @date 2019-05-29
 * @param {string} msesInt：要转换的时间戳，{string} format：要转换的时间戳格式
 */
var changeInfoDate = function(msesInt, format) {
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"H+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	var dt = new Date(msesInt); // 初始化Date对象
	var ndt = dt.Format(format);
	return ndt;
};
/**
 * 时间戳转换
 * @author 张仁荣
 * @date 2019-05-29
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
 * 数据判空
 * @author 张仁荣
 * @date 2020.05.30
 * @param {Object|Array} obj：对象或数组,{string|number}:返回的值
 */
function isEmptyObject(obj,tips) {
	if(obj instanceof Object){//当前数据是对象
		Object.keys(obj).forEach(function (key){
			if(obj[key] instanceof Array){//数组
				isEmptyObject(obj[key],tips)
			}else if(obj[key] instanceof Object){//对象
				isEmptyObject(obj[key],tips)
			}else {
				if(!filterEmpty(obj[key],'','',1)){
					if(tips !== undefined){
						obj[key] = tips;
					}else{
						obj[key] = '--'
					}
				}
			}
		})
	}else if(obj instanceof Array){//当前数据是数组
		obj.map(function (value) {
			isEmptyObject(value,tips)
		})
	}else {
		if(!filterEmpty(obj,'','',1)){
			if(tips !== undefined){
				obj = tips;
			}else{
				obj = '--'
			}
		}
	}
	return obj
}

/**
 * 数据判空
 * @author 张仁荣
 * @date 2019-05-29
 * @param {string} value：要过滤的字符串，{fun} success:要处理的方法逻辑，{} tips:
 */
function filterEmpty(value,success,tips,type){//用于过滤 undefined,空字符串,null,'null',type:1,返回true,false
	if(value === undefined || value === '' || value === null || value === 'null' || value === " "){
		if(tips === undefined){
			if(type == 1){
				return  false;
			}else{
				return "--";
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
 * 身份证号码正则验证
 * @author 张仁荣
 * @date 2020-06-15
 * @param {string} value：要验证的身份证号码
 */

function idNoFormatCheck(value) {
	var num = value.toUpperCase();
// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
	if (!reg.test(num)) {
		return false;
	}
// 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
// 下面分别分析出生日期和校验位
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(
			/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] +
			'/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
			((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			return false;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		// 检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" +
			arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
			((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) &&
			(dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			return false;
		} else {
		// 检验18位身份证的校验码是否正确。
		// 校验位按照ISO 7064:1983.MOD
		// 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4,
				2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9',
				'8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0,
				i;
			for (var i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				return false;
			}
		}
	}
	return true;
}
/**
 * 把json数据转化成树形数据
 * @author 张仁荣
 * @date 2020-07-07
 * @param {object} data：要转化的数据 ,{object} attributes:转化后的格式
 */
function formatTreeData(data, attributes) {
	if(attributes == undefined || attributes == null){
		var attributes = {    //定义数据属性名称
			id: 'id',
			parentId: 'parentId',
			name: 'name',
			rootId: 0
		}
	}
	var resData = deepClone(data);
	var tree = [];
	for(var i = 0; i < resData.length; i++) {
		if(resData[i][attributes.parentId] === attributes.rootId) {
			var obj = {
				value: resData[i][attributes.id],
                pid:resData[i][attributes.parentId],
				label: resData[i][attributes.name],
				// children: []
			};
			tree.push(obj);
			resData.splice(i, 1);
			i--;
		}
	}
	run(tree);

	function run(chiArr) {
		// console.log(chiArr)
		if(resData.length !== 0) {
			if(Array.isArray(chiArr) && chiArr.length>0){
			for(var i = 0; i < chiArr.length; i++) {
				for(var j = 0; j < resData.length; j++) {
					if(chiArr[i].value == resData[j][attributes.parentId]) {
						var obj = {
							value: resData[j][attributes.id],
                            pid:resData[j][attributes.parentId],
							label: resData[j][attributes.name],
							// children: []
						};
						if(chiArr[i].children == undefined){
							chiArr[i].children = []
						}
						chiArr[i].children.push(obj);
						resData.splice(j, 1);
						j--;
					}
				}
				run(chiArr[i].children);
			}
			}
		}
	}
	return tree;
}
/**
 * object深拷贝
 * @author 张仁荣
 * @date 2020-07-07
 * @param {object} 要拷贝的数据
 */
function deepClone(obj) {
	var objClone = Array.isArray(obj) ? [] : {}
	if (obj && typeof obj === 'object') {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				// 判断obj子元素是否为对象，如果是，递归复制
				if (obj[key] && typeof obj[key] === 'object') {
					objClone[key] = deepClone(obj[key])
				} else {
					objClone[key] = obj[key]
				}
			}
		}
	}
	return objClone
}
/**
 * element清除表单部分校验
 * @author 张仁荣
 * @date 2020-07-09
 * @param {string} form绑定ref值，key：要清除的表单数据
 */
function resetKeyField(form,key,$this) {
	var fields = $this.$refs[form].fields;
	fields.forEach(function (value) {
		if(value.prop == key){
			value.resetField()
		}
	})
}

/**
 * 表单验证不通过，滚动到页面上第一个验证失败的输入框位置
 * @author 张仁荣
 * @date 2020-07-09
 * @param {object} 表单验证返回的object
 */
function scrollView(object,$this) {
    for (var i in object) {
        var dom = $this.$refs[i]
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
}
//获取字典表数据
function getPidFun(id,success,complete) {
	$.ajax({
		type:'get',
		url:'/select/part/next/pid',
		data:{id:id},
		success:success,
		complete:complete
	})
}
/**
 * 计算两个月之前的月数
 * @author 张仁荣
 * @date 2020-07-20
 * @param {YYYY-MM} start开始时间,{YYYY-MM} end结束时间{string|number} type 1:返回各自的月份
 */
function getMonthBetween (start, end,type) {//传入的格式YYYY-MM
	var result = [];
	var s = start.split("-");
	var e = end.split("-");
	var min = new Date();
	var max = new Date();
	min.setFullYear(s[0], s[1] * 1 - 1, 1);//开始日期
	max.setFullYear(e[0], e[1] * 1 - 1, 1);//结束日期
	var curr = min;
	while (curr <= max) {
		var month = curr.getMonth();
		//var str = curr.getFullYear() + "-" + (month);
		//var s = curr.getFullYear() + "-0";
		//if (str == s) {
		//str = curr.getFullYear() + "-1";
		// }
		result.push(month + 1);
		curr.setMonth(month + 1);
	}
	// console.log(result)
	if(Array.isArray(result) && result.length>0){
		if(type == 1){
			return result
		}else{
			return result.length;
		}
	}else{
		return 0
	}
}

var validateObj = {
	//是否为正整数
	isPositiveInteger:function(num){
		var reg = /^\d+(?=\.{0,1}\d+$|$)/
		if(reg.test(num)) return true;
		return false ;
	},
	//只包含数字，英文，汉字
	isNYC:function(obj ,tipValue,$this){
		var specialCharacters = /^[a-z0-9A-Z\u4e00-\u9fa5]+$/gi;
		if(!specialCharacters.test(obj)){
			return false;
		}else{
			return true;
		}
		// var specialCharacters = /[\\ud83c\\udc00-\\ud83c\\udfff]|[\\ud83d\\udc00-\\ud83d\\udfff]|[\\u2600-\\u27ff]/g;
		// if(/[^a-zA-Z0-9\u4E00-\u9FA5]/.test(obj) && specialCharacters.test(obj)){
		// 	var tip;
		// 	if(tipValue !== undefined && tipValue !== '' && tipValue !== null && tipValue !== '' && tipValue !== " "){
		// 		tip = tipValue;
		// 	}else {
		// 		tip = '名称不能包含特殊字符';
		// 	}
		// 	// $this.$vux.toast.text(tip,'middle');
		// 	return false;
		// }
		// return true;
	},
	//是否是统一社会信用代码
	isCeditCode:function (value) {
		var reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
		if(reg.test(value)) return true;
		return false ;
	},
	//验证组织机构代码
	isOrgcodevalidate:function(num){
		var reg = /^\d{8}-?\d{1}$/;
		if(reg.test(num)){
			return true;
		}else{
			return false;
		}
	}
}
//Vue input限制输入 整数 一位小数 两位小数
function inputLimit(){
	Vue.directive("input-limit", {
		bind:function(el, binding) {
		var wins_0 = /[^\d]/g //整数判断
		var wins_1 = /[^\d^\.]/g //小数判断
		var flag = true;
		var points = 0;
		var lengths = 0
		var remainder = 0
		var no_int = 0
		var target = el instanceof HTMLInputElement ? el : el.querySelector("input");
		target.addEventListener("compositionstart", function (e) {
			flag = false;
		});
		target.addEventListener("compositionend", function (e){
			flag = true;
		});
		target.addEventListener("input", function (e){
			setTimeout(function() {
				if (flag) {
					if (binding && binding.value == 0) {
						if (wins_0.test(e.target.value)) {
							e.target.value = e.target.value.replace(wins_0, "");
							e.target.dispatchEvent(new Event("input")) //手动更新v-model值
						}
					}
					if (binding && binding.value == 1) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split(".")[1] != undefined) {
							if (e.target.value.toString().split(".")[1].length > 1) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf(".") != -1) {
							no_int = false
						} else {
							no_int = true
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
									'$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
									".") + 2)
							} else {
								e.target.value = e.target.value.replace(wins_0, "")
							}
							e.target.dispatchEvent(new Event("input"))
						}
					}
					if (binding && binding.value == 2) {
						if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
							remainder = true
						}
						if ((e.target.value.split('.')).length - 1 > 1) {
							points = true
						}
						if (e.target.value.toString().split(".")[1] != undefined) {
							if (e.target.value.toString().split(".")[1].length > 2) {
								lengths = true
							}
						}
						if (e.target.value.toString().indexOf(".") != -1) {
							no_int = false
						} else {
							no_int = true
						}
						if (wins_1.test(e.target.value) || lengths || points || remainder) {
							if (!no_int) {
								e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
									'$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
									".") + 3)
							} else {
								e.target.value = e.target.value.replace(wins_0, "")
							}
							e.target.dispatchEvent(new Event("input"))
						}
					}
				}
			}, 0)
		})
	}
})
}

/**
 * @author 张仁荣
 * @date 2020-11-06
 * @param {YYYYMMDD}startdate 开始时间，格式,{string|number} nextYear 为间隔年月，如1表示一年后，2表示两年后
 * 计算N年后,YYYYMMDD
 */
function getAfterNYear(startdate,nextYear,isNext) {
    if(isNext){
        var expriedYear = parseInt(startdate.substring(0, 4)) + nextYear;
    }else {
        var expriedYear = parseInt(startdate.substring(0, 4)) - nextYear;
    }
	var expriedMonth = startdate.substring(4, 6);
	var expriedDay = startdate.substring(6);
	//考虑二月份场景，若N年后的二月份日期大于该年的二月份的最后一天，则取该年二月份最后一天
	if (expriedMonth == '02' || expriedMonth == 2) {
		var monthEndDate = new Date(expriedYear, expriedMonth, 0).getDate();
		if (parseInt(expriedDay) > monthEndDate) {//为月底时间
			//取两年后的二月份最后一天
			expriedDay = monthEndDate;
		}
	}
	return expriedYear + expriedMonth + expriedDay;
}
