//请求地址
var requestUrl = '';
//页面跳转‘page’,数据请求：‘drq’
var type = '';
//来源地址：初次请求
var ref = '';
//类型
var project = 'web';
//用户id
var userId = '';
//session
var sessionValue = '';
var shareSessionValue = '';
var oldSessionValue = '';
var webSessionValue = '';

var maxOrgCode = '';
var maxOrgName = '';

var firstUrl = 'https://es.71dj.org:8443/web/firstAccess';
var nextUrl = 'https://es.71dj.org:8443/web/nextAccess';
var webUrl = '';
var userUrl = '';

$(document).ready(function () {

    //得到用户Id
    var srcValue = document.getElementById('publicjs').src;
    //console.log(srcValue);
    var srcs = srcValue.split("?");
    if (srcs.length > 1 && srcs[1] != '') {
        var srcUrl = srcs[1].split("&");
        if (srcUrl.length > 0 && srcUrl[0] != '') {
            var srcss = srcUrl[0].split("=");
            userId = srcss[1];
        }
        if(srcUrl.length>1&&srcUrl[0] != ''){
            var srcssUrl = srcUrl[1].split("=");
            webUrl = srcssUrl[1];
            //console.log(webUrl);
            userUrl = webUrl + '/getUserOrg';
            //console.log(userUrl);
        }
    }
    if (typeof (userId) == "undefined") {
        userId = '';
    }
    //console.log(userId);

    //请求地址
    //requestUrl = window.location.href;
    requestUrl = window.document.location.pathname;
    //console.log('请求地址：' + requestUrl);

    //访问来源
    if (document.referrer.length > 0) {
        ref = document.referrer;
    }
    try {
        if (ref.length == 0 && opener.location.href.length > 0) {
            ref = opener.location.href;
        }
    } catch (e) {
    }
    //console.log('访问来源：' + ref);


    var cookieSession = document.cookie;
    if (cookieSession != '' || cookieSession != null) {
        shareSessionValue = getCookie('shareSession');
        oldSessionValue = getCookie('oldSession');
        webSessionValue = getCookie('webSession');
    }
    //console.log('oldSessionValue值：' + oldSessionValue);
    //console.log('shareSessionValue值：' + shareSessionValue);
    //console.log('webSessionValue值：' + webSessionValue);

    if (shareSessionValue == "" || shareSessionValue == null) {
        sessionValue = webSessionValue;
        if (oldSessionValue != webSessionValue) {
            //console.log("初次请求");
            setCookie("oldSession", webSessionValue);
            if (userId != '') {
                $.ajax({
                    type: 'POST',
                    url: userUrl,
                    dataType: 'json',
                    data: {
                        "userId": userId,
                    },
                    success: function (data) {
                        maxOrgCode = data.datas.maxOrgCode;
                        maxOrgName = data.datas.maxOrgName;
                    },
                    complete: function (XMLHttpRequest) {
                        if (XMLHttpRequest.readyState == 4) {
                            getFirstRequest(userId, requestUrl, ref, project, sessionValue, maxOrgCode, maxOrgName);
                        }
                    },
                    error: function (xhr, type) {
                        //console.log('ajax error!');
                    }

                })
            } else {
                getFirstRequest(userId, requestUrl, ref, project, sessionValue, null, null);
            }
            //getFirstRequest(userId, requestUrl, ref, project, sessionValue);
        }
    } else {
        setCookie("oldSession", shareSessionValue);
        sessionValue = shareSessionValue;
    }

    pageJump();


});

function pageJump() {
    if (requestUrl != ref) {
        //console.log("页面跳转");
        if (userId != '') {
            $.ajax({
                type: 'POST',
                url: userUrl,
                dataType: 'json',
                data: {
                    "userId": userId,
                },
                success: function (data) {
                    maxOrgCode = data.datas.maxOrgCode;
                    maxOrgName = data.datas.maxOrgName;
                },
                complete: function (XMLHttpRequest) {
                    if (XMLHttpRequest.readyState == 4) {
                        getOtherRequest(userId, requestUrl, "page", project, sessionValue, maxOrgCode, maxOrgName);
                    }
                },
                error: function (xhr, type) {
                    //console.log('ajax error!');
                }

            })
        } else {
            getOtherRequest(userId, requestUrl, "page", project, sessionValue, null, null);
        }

    }
}

function getCookie(name) {
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) {
            return arr[1];
        }
    }
    return "";
}

function setCookie(c_name, value) {
    document.cookie = c_name + "=" + value + ";path=/";
}


$(document).ajaxComplete(function (event, xhr, settings) {
    //console.log(settings.url);
    if (settings.url != firstUrl && settings.url != nextUrl && settings.url != userUrl ) {
        //console.log(settings.url);
        var urlSplit = settings.url.split("//");
        requestUrl = urlSplit[urlSplit.length - 1];
        //console.log("数据加载");
        if (userId != '') {
            $.ajax({
                type: 'POST',
                url: userUrl,
                dataType: 'json',
                data: {
                    "userId": userId,
                },
                success: function (data) {
                    //console.log(data.datas);
                    maxOrgCode = data.datas.maxOrgCode;
                    maxOrgName = data.datas.maxOrgName;
                    //console.log("maxOrgCode:" + maxOrgCode);
                    //console.log("maxOrgName:" + maxOrgName);

                },
                complete: function (XMLHttpRequest) {
                    if (XMLHttpRequest.readyState == 4) {
                        getOtherRequest(userId, requestUrl, "page", project, sessionValue, maxOrgCode, maxOrgName);
                    }
                },
                error: function (xhr, type) {
                    //console.log('ajax error!');
                }

            })
        } else {
            getOtherRequest(userId, requestUrl, "page", project, sessionValue, null, null);
        }
        //getOtherRequest(userId, requestUrl, "drq", project, sessionValue);

    }
});

function getFirstRequest(userId, requestUrl, accessSource, project, sessionId, maxOrgCode, maxOrgName) {
    $.ajax({
        type: 'POST',
        async: true,
        url: firstUrl,
        dataType: 'json',
        data: {
            "userId": userId,
            "requestUrl": requestUrl,
            "accessSource": accessSource,
            "project": project,
            "sessionId": sessionId,
            "maxOrgCode": maxOrgCode,
            "maxOrgName": maxOrgName

        },
        success: function (response) {
            //console.log("成功");
        },
        error: function (xhr, type) {
            //console.log('ajax!');
        }

    })
}


function getOtherRequest(userId, requestUrl, type, project, sessionId, maxOrgCode, maxOrgName) {
    $.ajax({
        type: 'POST',
        async: true,
        url: nextUrl,
        dataType: 'json',
        /*
        xhrFields: {
            withCredentials: true
        },
        */
        data: {
            "userId": userId,
            "requestUrl": requestUrl,
            "type": type,
            "project": project,
            "sessionId": sessionId,
            "maxOrgCode": maxOrgCode,
            "maxOrgName": maxOrgName
        },
        success: function (response) {
            //console.log("成功");
        },
        error: function (xhr, type) {
            //console.log('ajax!');
        }

    })
}










