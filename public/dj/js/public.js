/**
 * 公共配置
 * @author 张仁荣
 * @date 2019-05-29
 */
var pv = {
    //输出语句
    log:function (msg) {
        //console.log(msg)
    },
    tenant: sessionStorage.getItem('tenant')
}
// var rootPath = 'http://60.166.20.131:9096/';
// var rootPath =  'http://127.0.0.1:8080/'
//var rootPath = 'http://192.168.1.169:8080/';

    var ishttps = 'https:' == document.location.protocol ? true : false;
    if(ishttps){
        var rootPath ='https://'+ window.location.hostname+":"+window.location.port+'/';
    }else{
        var rootPath ='http://'+ window.location.hostname+":"+window.location.port+'/';
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
        if(getUrlParam('tenant')){
          pv.tenant = getUrlParam('tenant')
        }
        $.ajax(rootPath + url, {
            data: params,
            headers:{
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=',
              'tenant': pv.tenant,
              'token': 'Bearer test'
            },
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
    //默认请求头 - 表单请求
    myAjax_Form_Token:function (rootPath,url, params,success, beforeSend, complete, error) {
      if(getUrlParam('tenant')){
        pv.tenant = getUrlParam('tenant')
      }

      $.ajax(rootPath + url, {
        data: params,
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=',
          'tenant':  pv.tenant,
          'token': 'Bearer test'
        },
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
      if(getUrlParam('tenant')){
        pv.tenant = getUrlParam('tenant')
      }

        $.ajax(rootPath + url, {
            data: params,
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=',
              'tenant':  pv.tenant,
              'token': 'Bearer test'
            },
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
}
/**
 * 获取地址栏参数
 * @author wudawei
 * @date 2018-07-25
 * @param {Object} name 参数名称
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
/**
 * 打开url,传参
 * @author 张仁荣
 * @date 2019-05-29
 * @param {string} url：页面地址，{string} extrasName：传参名称；{string} extras ：传参数值
 */
function openPage(url,extrasName,extras){
    window.location.href = url+"?"+extrasName+"="+encodeURI(extras);
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
        if(typeof(date) === "number" || (typeof (date) === "string" && (date.length >= 10 && date.length <= 13) && date.indexOf("-") === -1 && date.indexOf("年") === -1 && date.indexOf(".") === -1)){//为时间戳
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
 * @author 张仁荣
 * @date 2019-05-29
 * @param {string} value：要过滤的字符串，{fun} success:要处理的方法逻辑，{} tips:
 */
function filterEmpty(value,success,tips){//用于过滤 undefined,空字符串,null,'null'
    if(value === undefined || value === '' || value === null || value === 'null' || value === " "){
        if(tips === undefined){
            return "-";
        }else{
            return tips
        }
    }else{
        if(typeof(success) === "function"){//如果是一个方法则调用方法
            return success();
        }else{//否则直接返回第一个参数
            return value;
        }
    }
}
/**
 * 正则验证
 * @author 张仁荣
 * @date 2019-05-29
 */
var validate = {
    //只包含数字，英文，汉字
    isNYC:function(obj){
        if(/[^a-zA-Z0-9\u4E00-\u9FA5]/.test(obj)){
            showtoast('名称不能包含特殊字符');
            // mui.alert('名称不能包含特殊字符');
            return false;
        }
        return true;
    },
    // 汉字
    isChinese: function(obj) {
        var reg = /^[\u0391-\uFFE5]+$/;
        if(obj != "" && !reg.test(obj)) {
            mui.alert('必须输入中文！');
            return false;
        }
        return true;
    },
    // 字母
    checkChar: function(obj) {
        var zmReg = /^[a-zA-Z]*$/;
        if(obj != "" && !zmReg.test(obj)) {
            mui.alert("只能是英文字母！");
            return false;
        }
        return true;
    },
    // 数字
    checkNumber: function(obj) {
        var reg = /^[0-9]+$/;
        if(obj != "" && !reg.test(obj)) {
            mui.alert('只能输入数字！');
            return false;
        }
        return true;
    },
    // 英文字母和数字
    checkStrOrNum: function(obj) {
        var zmnumReg = /^[0-9a-zA-Z]*$/;
        if(obj != "" && !zmnumReg.test(obj)) {
            mui.alert("只能输入是字母或者数字,请重新输入");
            return false;
        }
        return true;
    },
    // 邮箱
    email: function(obj) {
        //对电子邮件的验证
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!myreg.test(obj)) {
            mui.alert('请输入有效的邮箱！');
            return false;
        }
        return true;
    },
    // 手机号
    phone: function(obj) {
        if(obj.length == 0) {
            mui.alert('手机号码不能为空！');
            return false;
        }
        if(obj.length != 11) {
            mui.alert('请输入有效的手机号码，需是11位！');
            return false;
        }
        var myreg = /^(((13[0-9]{1})|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))+\d{8})$/;
        if(!myreg.test(obj)) {
            mui.alert('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
};
/**
 * 存列表页的session值
 * @author 张仁荣
 * @date 2019-05-30
 * @param {string} sessionName 存列表页的session名称,{object|string} data 存列表页的session值
 */
function setSession(sessionName,data) {//存列表页的session值
    if(!window.localStorage){
        return false;
    }else{
        if(data.constructor === Object){
            var data=JSON.stringify(data);
        }
        localStorage.setItem(sessionName,data);
        //删除缓存 localStorage.removeItem('sessions');
        //获取缓存 localStorage.getItem("sessions");
    }
}
/**
 * 获取列表页的session值
 * @author 张仁荣
 * @date 2019-05-30
 * @param {object|string} key 存列表页的session名称
 */
function getSession(key) {//获取seesion值
    var sessionDta;
    if(localStorage.getItem(key)){
        sessionDta = localStorage.getItem(key);
   }else {
        // sessionDta = localStorage.getItem('SESSIONS');
    }
    try {
        return JSON.parse(sessionDta);
    }catch (e) {

    }
}
/**
 * 删除列表页的缓存值
 * @author 张仁荣
 * @date 2019-05-30
 * @param {object|string} key 存列表页的session名称
 */
function removeSession(key) {//获取seesion值
    var sessionDta;
    localStorage.removeItem(key);
}

/**
 * 门户网站门户名称，备案号数据
 * @author 张仁荣
 * @date 2020-07-08
 */
function selectDictionaries(){
    $('.logo_name').html('');//门户网站--标题
    $('.foot .w1100').html('')
    pAjax.myAjax_Token(rootPath,'/djapi/partycloud/webprotal/findDetail',{},function(data){
        if(data !== null && data.code == 0){
            $('.logo_name').html(data.data.openName);//门户网站--标题
            $('.foot .w1100').html('<span>'+data.data.copyright+'</span>'+'<span>'+data.data.reference+'</span>')
        }
    },function(){

    },function(){

    },function(xhr, type, errorThrown){
      //接口未调通，门户网站--标题为空
    })
}

//添加浏览数
function saveBrowse(id){
    pAjax.myAjax_Form_Token(rootPath,'djapi/cms/columnInfo/addInfoViews',{infoId:id})
}
Vue.component("header-nav",{
    props:["actived"],
    template :"<div class=\"nav-box\">\n" +
        "        <div class=\"logo\" @click=\"lookDetail('index.html','',0,0)\">\n" +
        "            <img src=\"images/logo-suixi.png\">\n" +
        "            <div class=\"logo_name\">经济开发区智慧党建平台</div>\n" +
        "        </div>\n" +
        "        <div class=\"menubox\">\n" +
        "            <ul>\n" +
        "                <li v-for=\"(value,index) in navList\" @click=\"lookDetail(value.url,value.id,value.indexTab,value.infoid,value.nodeCode)\" :class=\"{actived:(index==actived)}\">{{value.name}}</li>\n" +
        "            </ul>\n" +
        "            <a href=\"/djsaas#/backstage/index\" class=\"serviceplatef organizeico\" >\n" +
        "                <img src=\"images/organize-sui.png\" alt=\"\">\n" +
        "                <p class=\"txt\">后台管理系统</p>\n" +
        "            </a>\n" +
        "        </div>\n" +
        "    </div>",
    data(){
        return{
            navList:[
                {name:'网站首页',url:'index.html',id:'',indexTab:'0',infoid:'0',nodeCode:''},
                {name:'园区介绍',url:'bsTxt.html',id:'',indexTab:'1',infoid:'0',nodeCode:''},
                // {name:'党建特色',url:'tzgg.html',id:'113',indexTab:'2',infoid:'0'},
                {name:'园区党建',url:'tzgg.html',id:'27',indexTab:'2',infoid:'0',nodeCode:'yqdj'},
                {name:'营商服务',url:'bsTxt.html',id:'',indexTab:'3',infoid:'0',nodeCode:''},
                {name:'党建动态',url:'tzgg.html',id:'64',indexTab:'4',infoid:'0',nodeCode:'djdt'},
                {name:'通知公告',url:'tzgg.html',id:'23',indexTab:'5',infoid:'0',nodeCode:'tzgg'},
                // {name:'他山之石',url:'tzgg.html',id:'63',indexTab:'6',infoid:'0'}
            ],
        }
    },
    mounted(){
        this.$nextTick(function () {
            selectDictionaries()
        })
    },
    methods:{
        //查看模块数据
        lookDetail:function(url,id,index,infoid,nodeCode){
            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid+'&nodeCode='+nodeCode;
        },
    }
});
