var imgResource = '';
var srcValue = document.getElementById('imgjs').src;
var srcs = srcValue.split("?");
if (srcs.length > 1 && srcs[1] != '') {
    var srcss = srcs[1].split("=");
    imgResource = srcss[1];
}
//console.log("imgResource:"+imgResource);
var slideNum = document.getElementById("slide");
var slideImgNum = slideNum.getElementsByTagName("img");
for (var i = 0, val = slideImgNum.length; i < val; i++) {
    id = 'slideImg' + i;
    var aImg = document.getElementById(id);
    //console.log("aImg"+aImg);
    if (aImg != null && aImg != '') {
        var altSrc = document.getElementById(id).getAttribute('alt');
        //console.log("altSrc:"+altSrc);
        var newSrc = imgResource + altSrc + '!530!350';
        //console.log("newSrc"+newSrc);
        $("#" + id).attr("src", newSrc);
    }


}


for (var i = 0; i < 12; i++) {
    id = 'articleImg' + i;
    var aImg = document.getElementById(id);
    if (aImg != null && aImg != '') {
        var altSrc = document.getElementById(id).getAttribute('alt');
        //console.log(oldSrc);
        var newSrc = imgResource + altSrc + '!140!100';
        //console.log(newSrc);
        $("#" + id).attr("src", newSrc);
    }
}

for (var i = 0; i < 6; i++) {
    for(var j=0;j<3;j++){
        id = 'articleImg'+i+j;
        var aImg = document.getElementById(id);
        if (aImg != null && aImg != '') {
            var altSrc = document.getElementById(id).getAttribute('alt');
            //console.log(oldSrc);
            var newSrc = imgResource + altSrc + '!140!100';
            //console.log(newSrc);
            $("#" + id).attr("src", newSrc);
        }
    }
}

var dwImg = document.getElementById('articleImgDW');
if (dwImg != null && dwImg != '') {
    var dwSrc = document.getElementById('articleImgDW').getAttribute('alt');
    //console.log(oldSrc);
    var newDWSrc = imgResource + dwSrc + '!140!100';
    //console.log(newSrc);
    $("#articleImgDW").attr("src", newDWSrc);
}




