var Sentiment = {
    layerIndex: -1,
    isEmpty: false      //是否有数据
};
var layer,laydate;
layui.use(['layer','laydate'],function () {
    layer = layui.layer;
    laydate = layui.laydate;
});
/**
 * 获取内容上方参数
 */
function getTopParam() {
    SearchParam.keyword = $('#keyword').val();//必选值
    SearchParam.keywordOp = $('#optional').val();//可选值
    SearchParam.keywordEx = $('#filter').val();//排除值
    SearchParam.sourceType = getMultiValues('#mediaType');//媒体类型
    SearchParam.orientaion = getMultiValues('#orientaion');//倾向性
    SearchParam.publishTime = convertPublishTime($('#timeRange').find('li.actived > .sel-txt').text());//发布时间
    SearchParam.type = getMultiValues('#keywordField');//（输入框）关键词匹配对象
    SearchParam.sortOrder = getSingleValues('#sortOrder');
    SearchParam.orderAd = getSingleValues('#sortBy');
    SearchParam.p2=getSingleValues('#sameRemave');//是否去重
}
let listArr = [];
/**
 * 上拉加载的回调函数
 * @param page 分页参数
 */
function upCallback(page) {
    // $("#newsLoading").show();//打开遮罩div，防止重新搜索时看不到遮罩
    myNews.showLoading();
    //第一次或者重新搜索时内容清空
    if (page.num === 1) {
        $('#newsList').text('')
    }
    // 页码, 默认从1开始
    SearchParam.pageNo = page.num;
    // 页长, 默认每页10条
    SearchParam.pageSize = page.size;

    SearchParam.scrollId = window.sessionStorage.getItem('scrollId');
    // var fastsearchUrl = 'http://112.30.98.118:9045'
    var fastsearchUrl = 'selectPopularFeelings';

    $.ajax({
        type: "post",
        async: true,
        url: fastsearchUrl,
        headers:{'Content-Type':'application/json;charset=utf8','token':'630f94566f0b4d79b2e3850900bd96d9'},
        data: JSON.stringify(SearchParam),  //参数
        dataType: "json",
        success: function (res) {
            if (res.code === 200) {
                $("#newsLoading").hide();//隐藏遮罩div
                const data = res.data;
                const list = data.list;
                const size = list.length;
                const total = data.total;
                if(SearchParam.pageNo == 1){
                    listArr = data.list
                }else{
                    listArr = listArr.concat(data.list);
                }
                //数字每三位加逗号
                var str = total.toString();
                var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
                var num = str.replace(reg, "$1,");
                let took = data.took / 1000;
                $('#total').text(num);
                $('#took').text(took.toFixed(2));
                window.sessionStorage.setItem('scrollId', data.scrollId);
                if (res.data.total > 0) {
                    $("#newsNodata").hide();
                    for (let i = 0; i < size; i++) {
                        let news = list[i];
                        let obj = {};
                       for(let key in list[i]){
                           obj[key] = list[i][key];
                       }
                        let ico = '';
                        if (news.sourceType === '04') {
                            ico = '<img src="/static/img/ico-weibo.png" alt="微博" class="sourceico"/>'
                        } else if (news.sourceType === '06') {
                            ico = '<img src="/static/img/ico-weixin.png" alt="微信" class="sourceico"/>'
                        }
                        let orientation = '';
                        if (news.orientaion === '1') {
                            orientation = 'positive'
                        } else if (news.orientaion === '2') {
                            orientation = 'nagative'
                        } else {
                            orientation = 'neutral'
                        }
                        let share = '';
                        if (news.p2 === '0') {
                            share = '<span class="innertxt txtblue"><img src="/static/img/ico-edit.png" alt=""><i class="txt">原创</i></span>'
                        } else {
                            share = '<span class="innertxt shareico"><img src="/static/img/ico-share.png" alt=""><i class="txt">转发</i></span>'
                        }
                        let emptyJudge = '';
                        //地址和作者均不为空时，都显示
                        if (news.sourcePlace.trim() !== "" && news.author.trim() !== "") {
                            emptyJudge = ' <span class="separate">|</span>' +
                                '<span class="innertxt"><img src="/static/img/ico-user.png" alt=""><i class="txt">' + news.author + '</i></span>' +
                                '<span class="separate">|</span>' +
                                '<span class="innertxt"><i class="txt">' + news.sourcePlace + '</i></span>';
                        } else//地址为空、作者不为空时
                        if (news.sourcePlace.trim() === "" && news.author.trim() !== "") {
                            emptyJudge = ' <span class="separate">|</span>' +
                                '<span class="innertxt"><img src="/static/img/ico-user.png" alt=""><i class="txt">' + news.author + '</i></span>';
                        }//作者为空、地址不为空时
                        if (news.sourcePlace.trim() !== "" && news.author.trim() === "") {
                            emptyJudge = ' <span class="separate">|</span>' +
                                '<span class="innertxt"><i class="txt">' + news.sourcePlace + '</i></span>';
                        } //地址和作者均为空时，都不显示
                        /*为空*/
                        $('#newsList').append(`<li class="newscell">
                                        <div class="leftimg"></div>
                                        <div class="rightcell">
                                            <div class="news-tit">
                                                ${ico}
                                                <span class="newstype ${orientation}"></span>
                                                <a class="J_menuItem" href="javascript:;" onclick="menuItem(this)"><span class="tit-txt">${news.title}</span></a>                                              
                                            </div>
                                            <div class="newcon">
                                                <span class="toogletxt-btn"><i class="txt"></i> <i class="iconfont icon_arrowdown"></i></span>
                                                <p class="innertxt">${news.content}</p>
                                            </div>
                                            <div class="bottom-info clearfix">
                                                <div class="leftpart">
                                                   <span class="innertxt"><img src="/static/img/ico-clock.png" alt=""><i class="txt">${moment(news.publishTime).format('YYYY-MM-DD HH:mm:ss')}</i></span>
                                                 ${emptyJudge}
                                                    <span class="separate">|</span>
                                                    ${share}
                                                </div>
                                                <div class="rightpart">
                                                    <span class="innertxt"><img src="/static/img/ico-click.png" alt=""><i class="txt">${news.visit < 0 ? 0 : news.visit}</i></span>
                                                    <span class="innertxt"><img src="/static/img/ico-comment.png" alt=""><i class="txt">${news.reply}</i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>`)

                        // 在页面渲染完列表数据时执行
                        textHeightFlex()
                    }
                    mescroll.endBySize(size, total);
                } else {
                    if (page.num === 1) {
                        $("#newsNodata").show();
                    }
                    mescroll.endBySize(size, total);
                }
                // myNews.hideLoading();
            } else if (res.code === 601) {
                $("#newsLoading").hide();//隐藏遮罩div
                $('#newsList').text('');
                $("#newsNodata").show();
                $('#total').text(0);
                $('#took').text("0.00");
                Feng.error(res.msg);
                mescroll.endErr();
            } else {
                /*$("#newsLoading").hide();//隐藏遮罩div
                $('#newsList').text('');
                $("#newsNodata").show();
                $('#total').text(0);
                $('#took').text("0.00");*/
                Feng.error(res.msg);
                mescroll.endErr();
            }
           /* $('.J_menuItem').on('click', menuItem);*/
            myNews.hideLoading();
        },
        error: function (e) {
            console.log('hahahhaha----->',e)
            Feng.error(e.statusText);
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态
            mescroll.endErr();
            myNews.hideLoading();
        }
    });
}

function menuItem(obj) {
    var index = $("#newsList").find(".J_menuItem").index(obj);
    $("#txt").addClass("showtxt");
    vm.newsinfo = listArr[index];
}

//图表遮罩
// var myChart = echarts.init(document.getElementById('timeDistribute'));
//图表无数据时，添加遮罩
// var noData=echarts.init(document.getElementById('chartNodata'));
//借用图表的Loading给舆情用
var myNews = echarts.init(document.getElementById('newsLoading'));
var option = {
    toolbox: {
        show: true,
        feature: {
            dataView: {show: false, readOnly: false},
            magicType: {show: false, type: ['line']}
        }
    },
    tooltip: {
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        top: 25,
        bottom: 50,
        left: 80,
        right: 40
    },
    xAxis: {
        type: 'category',
        data: [''],
        /*  axisLine: {
              show: true,
              lineStyle: {
                  type: 'solid',
                  color: '#999'
              }
          },*/
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        /*  splitLine: {
              show: true,
              lineStyle: {
                  type: 'solid',
                  color: '#e9e9e9'
              }
          },
          axisLine: {
              show: true,
              lineStyle: {
                  type: 'solid',
                  color: '#999'
              }
          }*/
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        },
        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                type: 'dashed' //虚线
            }
        }
    },
    series: [{
        data: [],
        type: 'bar',
        // barWidth: '15',
        large: true,
        itemStyle: {
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 0, color: '#a3ccff'},
                    {offset: 0.5, color: '#5ba5ff'},
                    {offset: 1, color: '#1e82ff'}
                ]
            )
        },
    }],
    dataZoom: [
        {
            type: 'inside'
        }
    ]
};
// myChart.setOption(option);

/*增加改变页面宽度时chart resize 功能 by shib*/
/*(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;

            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }

            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };

    function g() {
        i = h[k](function () {
                a.each(function () {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);*/
/*$(".sst-chart").resize(function () {
    myChart.resize();
});*/

$(function () {
    Sentiment.search();
});

function intervalChange() {
    SearchParam.interval = $('#interval').val();
    Chart();
}

function Chart() {
    // myChart.showLoading();
    //无数据遮罩
    // noData.showLoading();
    /*$.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: "/search/queryAggregation",  //请求发送到TestServlet处
        data: SearchParam,  //参数
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            if (result.code === 200) {
                $("#chartNodata").hide();
                $("#timeDistribute").show();
                const data = result.data;
                option.xAxis.data = data.dateList;
                option.series[0].data = data.timesList;
                myChart.setOption(option);
                myChart.hideLoading();
            } else if (result.code === 100) {
                //查询成功，无数据
                option.xAxis.data = 0;
                option.series[0].data = 0;
                myChart.setOption(option);
                Sentiment.isEmpty = true;
                $("#chartNodata").show();
                noData.hideLoading();//无数据遮罩隐藏
                $("#timeDistribute").hide();
                // Feng.info("暂无数据");
            } else {
                Feng.error(result.msg);
            }
            myChart.hideLoading();
        },
        error: function (res) {
            Feng.error("获取图表数据失败!");
            myChart.hideLoading();
        }
    })*/
}

/**
 * 保存搜索方案
 */
function savePlan() {
    //带参数
    let text = $('#timeRange').find('li.actived > .sel-txt').text();
    PlanParam.keyword = $('#keyword').val();//必选值
    PlanParam.sourceType = getMultiValues('#mediaType');//媒体类型
    PlanParam.publishTime = convertPublishTime(text);//发布时间
    PlanParam.keywordField = getMultiValues('#keywordField');//（输入框）关键词匹配对象
    PlanParam.sortOrder = getSingleValues('#sortOrder');
    PlanParam.orderAd = getSingleValues('#sortBy');
    PlanParam.orientaion = getMultiValues('#orientaion');//倾向性
    PlanParam.optional = $('#optional').val();//可选值
    PlanParam.filter = $('#filter').val();//排除值
    PlanParam.intervalCycle = $('#interval').val();//统计周期
    PlanParam.p2 = getSingleValues('#sameRemave');//是否原创

    //可选值或排除值有值时，必选值为必填
   /* if (PlanParam.optional.trim() != "" || PlanParam.filter.trim() != "") {
        if (PlanParam.keyword.trim() == "") {
            Feng.alert("可选值或排除值有值时，必选值为必填");
            return;
        }
    }*/
    //弹框两个输入框  方案名  标签
    layer.open({
        type: 1,
        title: '保存搜索方案',
        area: ['350px', '250px'],
        btn: ['确定'],
        content: '<div class="form-group">' +
            '<div class="col-sm-9"><br>' +
            '<input type="text"  autocomplete="off" class="form-control" lay-verify="required" placeholder="请输入方案名" /><br>' +
            '<input type="text"  autocomplete="off" class="form-control" lay-verify="required" placeholder="请输入标签" />' +
            '</div>' +
            '</div>',//这里content是一个普通的String

        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var name = layero.find('input')[0].value;// 获取输入的方案名
            var tag = layero.find('input')[1].value;// 获取输入的方案标签
            if (name.trim() === '') {
                Feng.alert("方案名称不能为空！");
                return;
            }
            PlanParam.name = name;
            PlanParam.tag = tag;
            layer.close(index); //再执行关闭

            //数据保存到后台
        /*    $.ajax({
                type: "post",
                async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
                url: "/plan/save",  //请求发送到TestServlet处
                data: PlanParam,  //参数
                dataType: "json",        //返回数据形式为json
                success: function (result) {
                    if (result.code === 200) {
                        Feng.success('保存成功！');
                    } else {
                        Feng.error(result.msg);
                    }
                },
                error: function (err) {
                    Feng.error('保存失败！');
                }
            })*/
        }
    });
}

let PlanParam = {
    'name': null,//方案名
    'tag': null,//标签
    'keyword': null,//关键词
    'optional': null,//可选值
    'filter': null,//排除值
    'publishTime': null,//发布时间
    'keywordField': null,//（输入框）关键词匹配对象
    'sortOrder': null,//("排序方式[visit:回复数 publishTime:发布时间 visit:点击数 ")
    'orderAd': null,//排序方式[1:升序 2:降序]
    'sourceType': null,//文章类型
    'orientaion': null,//倾向性
    'title': null,//标题
    /* 'content':null,//正文*/
    'author': null,//作者
    'url': null,//地址
    'reply': null,//回复数
    'visit': null,//点击数
    'webName': null,//网站名称
    'sourceName': null,//信息来源
    'orienTation': null,//倾向性
    'sourcePlace': null,//地域
    'sourceMedia': null,//信息源媒体
    /*  'dataType':null,//数据来源*/
    'firstweb': null,//首发网站
    /* 'retweetedSource': null,//原发帖人*/
    'retpulishTime': null,//原发帖时间
    /* 'source': null,//发帖人*/
    'channel': null,//频道名称
    'channelUrl': null,//频道url
    'gatherTime': null,//采集时间
    'simhash': null,    //simhash值
    'createaTime': null,    //添加时间
    'intervalCycle': null,    //统计周期
    'p2': null,    //是否原创  p2=0是原创
    'uuid': null
}
let SearchParam = {
    'uuid': null,   //文章id
    'keyword': null,//关键词
    'keywordOp': null,//可选值
    'keywordEx': null,//排除值
    'publishTime': null,//发布时间
    'type': null,//（输入框）关键词匹配对象
    'sortOrder': null,//("排序方式[visit:回复数 publishTime:发布时间 visit:点击数 ")
    'orderAd': null,//排序方式[1:升序 2:降序]
    'sourceType': null,//文章类型
    'orientaion': null,//倾向性
    'title': null,//标题
    /* 'content':null,//正文*/
    'author': null,//作者
    'url': null,//地址
    'reply': null,//回复数
    'visit': null,//点击数
    'webName': null,//网站名称
    'sourceName': null,//信息来源
    'orienTation': null,//倾向性
    'sourcePlace': null,//地域
    'sourceMedia': null,//信息源媒体
    'dataType': null,//数据来源
    'firstweb': null,//首发网站
    /* 'retweetedSource': null,//原发帖人*/
    'retpulishTime': null,//原发帖时间
    /*  'source': null,//发帖人*/
    'channel': null,//频道名称
    'channelUrl': null,//频道url
    'gatherTime': null,//采集时间
    'interval': null,    //统计周期
    'simhash': null,    //simhash值
    'createaTime': null,    //添加时间
    'pageNo': 1,    //当前页（默认1）
    'pageSize': 10,  //每页条数（默认10）
    'scrollId': null,
    'p2':null  //是否原创  p2=0是原创
};

/**
 * 根据选择器获取多选的值
 * @param selector
 */
function getMultiValues(selector) {
    let values = '';
    $(selector).find('li.normal.actived').each(function () {
        values = values + $(this).find('.sel-txt').attr('value') + ' ';
    });
    return values.trim();
}

/**
 * 根据选择器获取单选的值
 * @param selector
 */
function getSingleValues(selector) {
    return $(selector).find('li.actived > .sel-txt').attr('value');
}


$("ul#timeRange").on("click", "li", function () {
    let text = $(this).find('.sel-txt').text();
    if (text === '当天') {
        SearchParam.publishTime = moment().format('YYYY-MM-DD 00:00:00~YYYY-MM-DD HH:mm:ss');
    }
});

/**
 * 转换发布时间
 * @param value
 * @returns {string|null|*}
 */
function convertPublishTime(value) {
    let date = moment();
    let now = date.format('YYYY-MM-DD HH:mm:ss');
    switch (value) {
        case '当天':
            return date.format('YYYY-MM-DD 00:00:00~YYYY-MM-DD HH:mm:ss');
        case '最近24小时':
            return date.subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        case '最近2天':
            return date.subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        case '最近7天':
            return date.subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        case '最近30天':
            return date.subtract(30, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        case '最近60天':
            return date.subtract(60, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        case '最近90天':
            return date.subtract(90, 'days').format('YYYY-MM-DD HH:mm:ss') + '~' + now;
        default:
            return SearchParam.publishTime;
    }
}

Sentiment.search = function () {
    console.log('load')
    //获取内容上方参数
    getTopParam();
    //可选值或排除值有值时，必选值为必填
  /*  if (SearchParam.keywordOp.trim() !== "" || SearchParam.keywordEx.trim() !== "") {
        if (SearchParam.keyword.trim() === "") {
            Feng.alert("可选值或排除值有值时，必选值为必填");
            return;
        }
    }
    Chart();*/
    // 上拉加载重置
    mescroll.resetUpScroll();
};


/**
 * 点击频道url字段时
 */
$('#channelUrl').on('click', function () {
    if (document.getElementById('channelUrlRemove')) {
        $("#channelUrlRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入频道URL',
        area: ['500px', '252px'],
        skin: 'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var channelUrl = layero.find('textarea')[0].value;// 获取输入的作者名称
            channelUrl = channelUrl.trim();
            if (channelUrl == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.channelUrl = channelUrl;//赋值给参数SearchParam
            PlanParam.channelUrl = channelUrl;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="channelUrlRemove">频道URL：
                ${channelUrl}<i class="close iconfont icon-del" id="channelUrl_close"></i></li>
                <script type="text/javascript">
                    $("#channelUrl_close").click(function(){
                        SearchParam.channelUrl=null;
                        PlanParam.channelUrl=null;
                        $("#channelUrlRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击频道名称字段时
 */
$('#channel').on('click', function () {
    if (document.getElementById('channelRemove')) {
        $("#channelRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入频道名称',
        area: ['500px', '252px'],
        skin: 'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var channel = layero.find('textarea')[0].value;// 获取输入的作者名称
            channel = channel.trim();
            if (channel == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.channel = channel;//赋值给参数SearchParam
            PlanParam.channel = channel;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="channelRemove">频道名称：
                ${channel}<i class="close iconfont icon-del" id="channel_close"></i></li>
                <script type="text/javascript">
                  $("#channel_close").click(function(){
                      SearchParam.channel=null;
                      PlanParam.channel=null;
                      $("#channelRemove").remove();
                      Sentiment.search();
                  });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击原发帖时间字段时
 */
$('#retpulishTime').on('click', function () {
    if (document.getElementById('retpulishTimeRemove')) {
        $("#retpulishTimeRemove").remove();
    }
    layer.open({
        title: '请选择原发帖时间'
        , area: ['500px', '252px']
        , skin: 'ks-pop'
        , offset:'100px'
        , btn: ['确定']
        , content: '<div class="ks-input-wrap">' +
            '<input type="text" class="form-control layer-date inner-inp" id="retpulishtimeInp" autocomplete="off"" ></input>' +
            '</div>'
        , success: function () {
            laydate.render({
                elem: '#retpulishtimeInp',
                position: 'fixed',
                btns: ['confirm'],
                type: 'datetime',
                range: '~',
                trigger: 'click',
                format: 'yyyy-MM-dd HH:mm:ss'
            });
        }
        ,
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            var retpulishTime = layero.find('input')[0].value;
            retpulishTime = retpulishTime.trim();
            if (retpulishTime == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.retpulishTime = retpulishTime;//赋值给参数SearchParam
            PlanParam.retpulishTime = retpulishTime;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="retpulishTimeRemove">原发帖时间：
                ${retpulishTime}<i class="close iconfont icon-del" id="retpulishTime_close"></i></li>
                <script type="text/javascript">
                    $("#retpulishTime_close").click(function(){
                        SearchParam.retpulishTime=null;
                        PlanParam.retpulishTime=null;
                        $("#retpulishTimeRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    })
});


/**
 * 点击首发网站字段时
 */
$('#firstweb').on('click', function () {
    if (document.getElementById('firstwebRemove')) {
        $("#firstwebRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入首发网站',
        area: ['500px', '252px'],
        skin: 'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var firstweb = layero.find('textarea')[0].value;//
            firstweb = firstweb.trim();
            if (firstweb == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.firstweb = firstweb;//赋值给参数SearchParam
            PlanParam.firstweb = firstweb;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="firstwebRemove">首发网站：
                ${firstweb}<i class="close iconfont icon-del" id="firstweb_close"></i></li>
                <script type="text/javascript">
                    $("#firstweb_close").click(function(){
                        SearchParam.firstweb=null;
                        PlanParam.firstweb=null;
                        $("#firstwebRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击地域字段时
 */
$('#sourcePlace').on('click', function () {
    if (document.getElementById('sourcePlaceRemove')) {
        $("#sourcePlaceRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入地域信息',
        area: ['540px', '252px'],
        skin: 'ks-pop areaselect-pop',
        btn: ['确定'],
        // content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        content: '<div class="ks-input-wrap" id="citySelect">\n' +
            '    <label class="layui-form-label" id="citySelect">地区选择：</label>\n' +
            '    <div class="layui-input-block">\n' +
            '        <select name="city" id="area1" class="ks-selectbox" lay-filter="city">\n' +
            '            <option value="" style="display: none">请选择省份</option>\n' +
            '        </select>\n' +
            '        <select name="city" id="area2" class="ks-selectbox" lay-filter="city">\n' +
            '            <option value="" style="display: none">请选择城市</option>\n' +
            '        </select>\n' +
            '        <select name="city" id="area3" class="ks-selectbox" lay-filter="city">\n' +
            '            <option value="" style="display: none">请选择区域</option>\n' +
            '        </select>\n' +
            '    </div>\n' +
            '</div>',
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            const province = layero.find('select')[0].value;
            if (!province) {
                Feng.error('省份不能为空');
                return;
            } else {
                const city = layero.find('select')[1].value;
                if (city === '无') {
                    SearchParam.sourcePlace = province;
                    PlanParam.sourcePlace = province;
                } else {
                    const area = layero.find('select')[2].value;
                    if (area === '无') {
                        SearchParam.sourcePlace = city;
                        PlanParam.sourcePlace = city;
                    } else {
                        SearchParam.sourcePlace = area;
                        PlanParam.sourcePlace = area;
                    }
                }
            }
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="sourcePlaceRemove">地域：
                ${SearchParam.sourcePlace}<i class="close iconfont icon-del" id="sourcePlace_close"></i></li>
                <script type="text/javascript">
                    $("#sourcePlace_close").click(function(){
                        SearchParam.sourcePlace=null;
                        PlanParam.sourcePlace=null;
                        $("#sourcePlaceRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });

});

/**
 * 点击信息来源字段时
 */
$('#sourceName').on('click', function () {
    if (document.getElementById('sourceNameRemove')) {
        $("#sourceNameRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入信息来源',
        area: ['500px', '252px'],
        skin: 'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var sourceName = layero.find('textarea')[0].value;
            sourceName = sourceName.trim();
            if (sourceName == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.sourceName = sourceName;//赋值给参数SearchParam
            PlanParam.sourceName = sourceName;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="sourceNameRemove">信息来源：
                ${sourceName}<i class="close iconfont icon_clsoe" id="sourceName_close"></i></li>
                <script type="text/javascript">
                    $("#sourceName_close").click(function(){
                        SearchParam.sourceName=null;
                        PlanParam.sourceName=null;
                        $("#sourceNameRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击作者名称字段时
 */
$('#author').on('click', function () {

    if (document.getElementById('authorRemove')) {
        $("#authorRemove").remove();
    }

    layer.open({
        type: 1,
        title: '请输入作者名称',
        skin: 'ks-pop',
        area: ['500px', '252px'],
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><input type="text"  autocomplete="off" class="layui-input inner-inp" lay-verify="required" placeholder="请输入作者名称"></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var author = layero.find('input')[0].value;// 获取输入的作者名称
            author = author.trim();
            if (author == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.author = author;//赋值给参数SearchParam
            PlanParam.author = author;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="authorRemove">作者名称：${author}<i class="close iconfont icon-del" id="_closeAuthor"></i></li>
                <script type="text/javascript">
                    $("#_closeAuthor").click(function(){
                        SearchParam.author=null;
                        PlanParam.author=null;
                        $("#authorRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});
/**
 * 点击url字段时
 */
$('#url').on('click', function () {
    if (document.getElementById('urlRemove')) {
        $("#urlRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入URL',
        skin: 'ks-pop',
        area: ['500px', '252px'],
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required" placeholder="请输入url"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var url = layero.find('textarea')[0].value;// 获取输入的url名称
            url = url.trim();
            if (url == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.url = url;//赋值给参数SearchParam
            PlanParam.url = url;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="urlRemove">URL：${url}<i class="close iconfont icon-del" id="_closeUrl"></i></li>
                <script type="text/javascript">
                    $("#_closeUrl").click(function(){
                        SearchParam.url=null;
                        PlanParam.url=null;
                        $("#urlRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭

        }
    });
});
/**
 * 点击网站名称字段时
 */
$('#webName').on('click', function () {
    if (document.getElementById('webNameRemove')) {
        $("#webNameRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入网站名称',
        area: ['500px', '252px'],
        skin: 'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><textarea type="text"  autocomplete="off" class="layui-textarea inner-inp" lay-verify="required"></textarea></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var webName = layero.find('textarea')[0].value;// 获取输入的url名称
            webName = webName.trim();
            if (webName == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.webName = webName;//赋值给参数SearchParam
            PlanParam.webName = webName;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="webNameRemove">网站名称：${webName}<i class="close iconfont icon-del" id="webName_close"></i></li>
                <script type="text/javascript">
                    $("#webName_close").click(function(){
                        SearchParam.webName=null;
                        PlanParam.webName=null;
                        $("#webNameRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击回复数字段时
 */
$('#reply').on('click', function () {
    if (document.getElementById('replyRemove')) {
        $("#replyRemove").remove();
    }
    layer.open({
        title: '请选择回复数区间'
        , area: ['500px', '252px']
        , btn: ['确定']
        , skin: 'ks-pop'
        , content: '<div class="ks-input-wrap area-select-wrap">' +
            '<label class="layui-form-label">区间选择</label>' +
            '<div class="layui-input-block" id="among">' +
            '<select name="range" id="range" class="ks-selectbox" lay-filter="range">' +
            '<option value="" style="display: none">请选择</option>' +
            '<option value="=">等于</option>' +
            '<option value="& gt;=">大于等于</option>' +
            '<option value="& lt;=">小于等于</option>' +
            '<option  value="between">两者之间</option>' +
            '</select>' +
            ' <input class="join-reply inner-inp" type="number" placeholder="请输入最小值">' +
            '</div>' +
            '</div>'
        , success: function () {
            /*下拉框的onchange事件*/
            document.getElementById("range").onchange = function () {
                if (this.selectedIndex === 4) {
                    $(".join-reply").remove();
                    $("#among").append('<input class="join-reply inner-inp" type="number" placeholder="请输入最小值">' +
                        '<input class="join-reply inner-inp" type="number" placeholder="请输入最大值">')
                } else {
                    $(".join-reply").remove();
                    $("#among").append('<input class="join-reply inner-inp" type="number" placeholder="请输入最小值">')
                }
            }
            /* 增加css修改下拉框样式*/
            $("select").css("width", "178.4px");
            $("select").css("height", "28px");
            $("select").css("line-height", "40px");
        },
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var options = $('#range option:selected'); //获取选中的项
            var reply1 = options.val();
            if (reply1 === "") {
                Feng.alert("请选择一个区间")
                return;
            }
            var reply2 = layero.find('input')[0].value;
            if (reply1 === "between") {
                var reply3 = layero.find('input')[1].value;
                if (!(/(^[1-9]\d*$)/.test(reply3)) || !(/(^[1-9]\d*$)/.test(reply2))) {
                    Feng.alert("请输入正整数");
                    return;
                }
                if (parseInt(reply3) < parseInt(reply2) || reply3 === reply2) {
                    Feng.alert("请按要求正确填写区间");
                    return;
                }
                var reply = "& gt;=" + reply2 + "& lt;=" + reply3;
                SearchParam.reply = reply;//赋值给参数SearchParam
                PlanParam.reply = reply;
                $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="replyRemove">回复数：
                    ${reply2}-${reply3}<i class="close iconfont icon-del" id="reply_close"></i></li>
                    <script type="text/javascript">
                        $("#reply_close").click(function(){
                            SearchParam.reply=null;
                            PlanParam.reply=null;
                            $("#replyRemove").remove();
                            Sentiment.search();
                        });
                    </script>`);
            } else {
                if (!(/(^[1-9]\d*$)/.test(reply2))) {
                    Feng.alert("请输入正整数");
                    return;
                }
                var reply = reply1 + reply2;
                SearchParam.reply = reply;//赋值给参数SearchParam
                PlanParam.reply = reply;
                $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="replyRemove">回复数：
                    ${reply}<i class="close iconfont icon-del" id="reply_close"></i></li>
                    <script type="text/javascript">
                        $("#reply_close").click(function(){
                        SearchParam.reply=null;
                        PlanParam.reply=null;
                        $("#replyRemove").remove();
                        Sentiment.search();
                    });
                    </script>`);
            }
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    })
});
/**
 * 点击点击数字段时
 */
$('#visit').on('click', function () {
    if (document.getElementById('visitRemove')) {
        $("#visitRemove").remove();
    }
    layer.open({
        title: '请选择点击数区间'
        , area: ['500px', '252px']
        , btn: ['确定']
        , skin: 'ks-pop'
        , content: '<div class="ks-input-wrap area-select-wrap">' +
            '<label class="layui-form-label">区间选择：</label>' +
            '<div class="layui-input-block" id="among">' +
            '<select name="range" id="range" class="ks-selectbox" lay-filter="range">' +
            '<option value="" style="display: none">请选择</option>' +
            '<option value="=">等于</option>' +
            '<option value="& gt;=">大于等于</option>' +
            '<option value="& lt;=">小于等于</option>' +
            '<option  value="between">两者之间</option>' +
            '</select>' +
            ' <input class="join-visit inner-inp" type="number" placeholder="请输入最小值">' +
            '</div>' +
            '</div>'
        , success: function () {
            /*下拉框的onchange事件*/
            document.getElementById("range").onchange = function () {
                if (this.selectedIndex === 4) {
                    $(".join-visit").remove();
                    $("#among").append('<input class="join-visit inner-inp" type="number" placeholder="请输入最小值"><input class="join-visit inner-inp" type="number" placeholder="请输入最大值">')
                } else {
                    $(".join-visit").remove();
                    $("#among").append('<input class="join-visit inner-inp" type="number" placeholder="请输入最小值">')
                }
            }
            /* 增加css修改下拉框样式*/
            $("select").css("width", "178.4px");
            $("select").css("height", "28px");
            $("select").css("line-height", "40px")
        },
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var options = $('#range option:selected'); //获取选中的项
            var visit1 = options.val();
            if (visit1 === "") {
                Feng.alert("请选择一个区间")
                return;
            }
            var visit2 = layero.find('input')[0].value;
            if (visit1 === "between") {//存在visit3
                var visit3 = layero.find('input')[1].value;
                if (!(/(^[1-9]\d*$)/.test(visit3)) || !(/(^[1-9]\d*$)/.test(visit2))) {
                    Feng.alert("请输入正整数");
                    return;
                }
                if (parseInt(visit2) > parseInt(visit3) || visit3 === visit2) {
                    Feng.alert("请按要求正确填写区间");
                    return;
                }
                var visit = "& gt;=" + visit2 + "& lt;=" + visit3;
                SearchParam.visit = visit;//赋值给参数SearchParam
                PlanParam.visit = visit;
                $("#append").append('<li class="label-cell" lay-event="getCheckData" id="visitRemove">' + "点击数：" +
                    visit2 + "-" + visit3 + '<i class="close iconfont icon-del" id="visit_close"></i></li>' +
                    `<script type="text/javascript">
                        $("#visit_close").click(function(){
                            SearchParam.visit=null;
                            PlanParam.visit=null;
                            $("#visitRemove").remove();
                            Sentiment.search();
                        });
                    </script>`);
            } else//不存在visit3
            {
                if (!(/(^[1-9]\d*$)/.test(visit2))) {
                    Feng.alert("请输入正整数");
                    return;
                }
                var visit = visit1 + visit2;
                SearchParam.visit = visit;//赋值给参数SearchParam
                PlanParam.visit = visit;
                $("#append").append('<li class="label-cell" lay-event="getCheckData" id="visitRemove">' + "点击数：" +
                    visit + '<i class="close iconfont icon-del" id="visit_close"></i></li>' +
                    `<script type="text/javascript">
                        $("#visit_close").click(function(){
                        SearchParam.visit=null;
                        PlanParam.visit=null;
                        $("#visitRemove").remove();
                        Sentiment.search();
                    });
                    </script>`);
            }
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    })
});
/**
 * 点击采集时间字段时
 */
$('#gatherTime').on('click', function () {
    if (document.getElementById('gathertimeRemove')) {
        $("#gathertimeRemove").remove();
    }
    layer.open({
        title: '请选择采集时间'
        , area: ['500px', '252px']
        , skin: 'ks-pop'
        , offset:'100px'
        , btn: ['确定']
        , content: '<div class="ks-input-wrap">' +
            '<input type="text" class="form-control layer-date inner-inp" id="gathertimeInp" autocomplete="off"" ></input>' +
            '</div>'
        , success: function () {
            laydate.render({
                elem: '#gathertimeInp',
                position: 'fixed',
                btns: ['confirm'],
                type: 'datetime',
                range: '~',
                trigger: 'click',
                format: 'yyyy-MM-dd HH:mm:ss'
            });
        },
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            var gathertime = layero.find('input')[0].value;
            gathertime = gathertime.trim();
            if (gathertime == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.gatherTime = gathertime;//赋值给参数SearchParam
            PlanParam.gatherTime = gathertime;

            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="gathertimeRemove">采集时间：
                ${gathertime}<i class="close iconfont icon-del" id="gathertime_close"></i></li>
                <script type="text/javascript">
                    $("#gathertime_close").click(function(){
                        SearchParam.gatherTime=null;
                        PlanParam.gatherTime=null;
                        $("#gathertimeRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    })
});
/**
 * 点击添加时间字段时
 */
$('#createTime').on('click', function () {
    if (document.getElementById('createtimeRemove')) {
        $("#createtimeRemove").remove();
    }
    layer.open({
        title: '请选择添加时间'
        , area: ['500px', '252px']
        , skin: 'ks-pop'
        , offset:'100px'
        , btn: ['确定']
        , content: '<div class="ks-input-wrap">' +
            '<input type="text" class="form-control layer-date inner-inp" id="createtimeInp" autocomplete="off"" ></input>' +
            '</div>'
        , success: function () {
            laydate.render({
                elem: '#createtimeInp',
                position: 'fixed',
                btns: ['confirm'],
                type: 'datetime',
                range: '~',
                trigger: 'click',
                format: 'yyyy-MM-dd HH:mm:ss'
            });
        },
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            var createtime = layero.find('input')[0].value;
            createtime = createtime.trim();
            if (createtime == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.createTime = createtime;//赋值给参数SearchParam
            PlanParam.createTime = createtime;

            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="createtimeRemove">添加时间：
                ${createtime}<i class="close iconfont icon-del" id="createtime_close"></i></li>
                <script type="text/javascript">
                    $("#createtime_close").click(function(){
                        SearchParam.createTime=null;
                        PlanParam.createTime=null;
                        $("#createtimeRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});
/**
 * 点击simHash字段时
 */
$('#simhash').on('click', function () {
    if (document.getElementById('simhashRemove')) {
        $("#simhashRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入simHash值',
        area: ['500px', '252px'],
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><input type="text"  autocomplete="off" class="layui-input inner-inp" lay-verify="required" placeholder="请输入simHash值"></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var simhash = layero.find('input')[0].value;
            simhash = simhash.trim();
            if (simhash == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.simhash = simhash;//赋值给参数simhash
            PlanParam.simhash = simhash;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="simhashRemove">simHash值：
                ${simhash}<i class="close iconfont icon-del" id="simhash_close"></i></li>
                <script type="text/javascript">
                    $("#simhash_close").click(function(){
                        SearchParam.simhash=null;
                        PlanParam.simhash=null;
                        $("#simhashRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});
/**
 * 点击数据来源类型字段时
 *  /**
 * 数据来源类型(1=综合，2=行业，3=境外，4=属地，5=话题挖掘，6=热点新闻，7=新浪微博评论，
 * 8=搜索，9=金融，10=汽车，11=旅游，12=头条首页，13=政策法规，14=招标，15=问答，
 * 16=藏维蒙文，17=外文，18=全站，19=电视)
 */
$('#dataType').on('click', function () {
    if (document.getElementById('dataTypeRemove')) {
        $("#dataTypeRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请选择数据来源类型',
        area: ['500px', '300px'],
        btn: ['确定'],
        skin: 'ks-pop sourcetype-pop',
        content: '<form action="" method="get""> \n' +
            '<br /><br /> \n' +
            '<label><input name="Type" type="checkbox" value="1" /> 综合 </label> \n' +
            '<label><input name="Type" type="checkbox" value="2" /> 行业 </label> \n' +
            '<label><input name="Type" type="checkbox" value="3" /> 境外 </label> \n' +
            '<label><input name="Type" type="checkbox" value="4" /> 属地 </label> \n' +
            '<label><input name="Type" type="checkbox" value="5" /> 话题挖掘 </label> \n' +
            '<label><input name="Type" type="checkbox" value="6" /> 热点新闻 </label> \n' +
            '<label><input name="Type" type="checkbox" value="7" /> 新浪微博评论 </label> \n' +
            '<label><input name="Type" type="checkbox" value="8" /> 搜索 </label> \n' +
            '<label><input name="Type" type="checkbox" value="9" /> 金融 </label> \n' +
            '<label><input name="Type" type="checkbox" value="10" /> 汽车 </label> \n' +
            '<label><input name="Type" type="checkbox" value="11" /> 旅游 </label> \n' +
            '<label><input name="Type" type="checkbox" value="12" /> 头条首页 </label> \n' +
            '<label><input name="Type" type="checkbox" value="13" /> 政策法规 </label> \n' +
            '<label><input name="Type" type="checkbox" value="14" /> 招标 </label> \n' +
            '<label><input name="Type" type="checkbox" value="15" /> 问答 </label> \n' +
            '<label><input name="Type" type="checkbox" value="16" /> 藏维蒙文 </label> \n' +
            '<label><input name="Type" type="checkbox" value="17" /> 外文 </label> \n' +
            '<label><input name="Type" type="checkbox" value="18" /> 全站 </label> \n' +
            '<label><input name="Type" type="checkbox" value="19" /> 电视 </label> \n' +
            '</form> '
        ,
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            let dataType = '';
            let dataTypeStr = '';
            layero.find('input[name="Type"]:checked').each(function () {
                dataType = dataType + $(this).val() + ' ';
                dataTypeStr = dataTypeStr + $(this).parent().text().trim() + ' ';
            });
            dataType = dataType.trim();
            if (dataType === '') {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.dataType = dataType;//赋值给参数dataType
            PlanParam.dataType = dataType;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="dataTypeRemove">数据来源类型值：
                ${dataTypeStr.trim()}<i class="close iconfont icon-del" id="dataType_close"></i></li>
                <script type="text/javascript">
                    $("#dataType_close").click(function(){
                        SearchParam.dataType=null;
                        PlanParam.dataType=null;
                        $("#dataTypeRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击文章id时
 */
$('#contentId').on('click', function () {
    if (document.getElementById('contentIdRemove')) {
        $("#contentIdRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请输入文章Id',
        area: ['500px', '252px'],
        skin:'ks-pop',
        btn: ['确定'],
        content: '<div class="ks-input-wrap"><input type="text"  autocomplete="off" class="layui-input inner-inp" lay-verify="required" placeholder="请输入文章Id"></div>',//这里content是一个普通的String
        yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            //按钮【按钮一】的回调
            var contentId = layero.find('input')[0].value;
            contentId = contentId.trim();
            if (contentId == "") {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.uuid = contentId;//赋值给参数
            PlanParam.uuid = contentId;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="contentIdRemove">文章Id：
                ${contentId}<i class="close iconfont icon-del" id="contentId_close"></i></li>
                <script type="text/javascript">
                    $("#contentId_close").click(function(){
                        SearchParam.uuid=null;
                        PlanParam.uuid=null;
                        $("#contentIdRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

/**
 * 点击媒体等级时
 */
$('#sourceMedia').on('click', function () {
    if (document.getElementById('sourceMediaRemove')) {
        $("#sourceMediaRemove").remove();
    }
    layer.open({
        type: 1,
        title: '请选择媒体等级',
        area: ['500px', '200px'],
        btn: ['确定'],
        skin: 'ks-pop sourcetype-pop',
        content: '<div style="width:100%;text-align:center;"><form action="" method="get"> \n' +
            '<br /><br /> \n' +
            '<label style="padding-right:60px;"><input name="sourceMedia" type="checkbox" value="A" /> A </label> \n' +
            '<label style="padding-right:60px;"><input name="sourceMedia" type="checkbox" value="B" /> B </label> \n' +
            '<label><input name="sourceMedia" type="checkbox" value="C" /> C </label> \n' +
            '</form></div> '
        , yes: function (index, layero) {//index 为当前页面索引，layero 为当前页面的DOM，
            let sourceMedia = '';
            layero.find('input[name="sourceMedia"]:checked').each(function () {
                sourceMedia = sourceMedia + $(this).val() + ' ';
            });
            sourceMedia = sourceMedia.trim();
            if (sourceMedia === '') {
                Feng.alert("内容不能为空")
                return;
            }
            SearchParam.sourceMedia = sourceMedia;
            PlanParam.sourceMedia = sourceMedia;
            $("#append").append(`<li class="label-cell" lay-event="getCheckData" id="sourceMediaRemove">媒体等级：
                ${sourceMedia}<i class="close iconfont icon-del" id="sourceMedia_close"></i></li>
                <script type="text/javascript">
                    $("#sourceMedia_close").click(function(){
                        SearchParam.sourceMedia=null;
                        PlanParam.sourceMedia=null;
                        $("#sourceMediaRemove").remove();
                        Sentiment.search();
                    });
                </script>`);
            Sentiment.search();
            layer.close(index); //再执行关闭
        }
    });
});

