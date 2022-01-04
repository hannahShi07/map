/*---地区三级联动--*/
$("body").on("mouseenter","#citySelect",function () {
    if($(this).find("#area1 option").length <2){
        for (var index = 0; index < province.length; index++) {
            $("body").find("#area1").append("<option value='"+province[index].name+"'>" + province[index].name + "</option>");
        }
        for (var i = 0; i < province[0].sub.length; i++) {
            $("body").find("#area2").append("<option value='"+province[0].sub[i].name+"'>" + province[0].sub[i].name + "</option>");
        }

        /*    for (var j = 0; j < province[0].sub[0].sub.length; j++) {
                $("body").find("#area3").append("<option>" + province[0].sub[0].sub[j].name + "</option>");
            }*/
    }

})
$("body").on("change","#area2",function () {
    var one_index = $("#area1 option:selected").index();
    var two_index = $("#area2 option:selected").index();
    var three = $("#area3");
    three.empty();
    // three.empty().append("<option>请选择区域</option>");

    if (two_index >= 0) {
        var area = province[one_index-1].sub[two_index].sub;
        if(area){
            for (var index = 0; index < area.length; index++) {
                three.append("<option value='"+ area[index].name+"'>" + area[index].name + "</option>");
            }
        }

    }
});
$("body").on("change","#area1",function () {
    var one_index = $("#area1 option:selected").index();
    var two = $("#area2");
    var three = $("#area3");
    two.empty();
    three.empty();
    // two.empty().append("<option>请选择城市</option>");
    // $("#area3").empty().append("<option>请选择区域</option>");
    if (one_index > 0) {
        var city = province[one_index-1].sub;
        for (var index = 0; index < city.length; index++) {
            two.append("<option value='"+city[index].name+"'>" + city[index].name + "</option>");
        }
        if(city[0].sub !== undefined){
            for (var i = 0; i < city[0].sub.length; i++) {
                three.append("<option value='"+city[0].sub[i].name+"'>" + city[0].sub[i].name + "</option>");
            }
        }
    }
});