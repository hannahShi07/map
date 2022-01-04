/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {integer} days cookie周期
 */
function setCookie(name, value, days){
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 删除cookie
function deleteCookie(name) {
    setCookie(name, "", -1);
}

function  signOut(cmsBasePath) {
    
    var params = {
        shareSession:getCookie("shareSession")
    };
    $.ajax({
            type: "post",
            url: cmsBasePath+"/web/dologinOut",
             
            data: params,
            success: function(data) {
                deleteCookie("shareSession");
                deleteCookie("JSESSIONID");
                deleteCookie("loginToken");
                location.reload();
            }
    })
    
}

function dealSessionErr(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown)
}

function dealAjaxData(data){
    if(data.code == "-400"){
        alert(data.msg);
        document.location.reload();
    }else{
        return data.datas
    }
}