/**
 * 营商服务
 * @author 张仁荣
 * @date 2020.04.07
 */
var suiXi = new Vue({
    el: '.container',
    data:{
        heightLight:'',
        info:[{}],
        type:1,//默认1：园区介绍 ；2：发展平台 3：主导展业；4：主要企业；5：推荐项目；6：生产要素；7：招商政策；8：投资服务；9：投资程序;10：生活配套;11:园区风采；12：宣传片
        load:true,
        limit:10,
        noDate:false,
        industry:[],//行业类型字典表
    },
    mounted:function () {

    },
    methods:{
        //转换类型
        checkType:function(type){
            this.type = type;
            if(this.type == 3|| this.type == 4){
                this.getContant( this.type,this,1,this.limit)//获取详情
            }else{
                this.getContant( this.type,this)//获取详情
            }
        },
        //获取详情
        getContant:function (type,$this,page,limit) {
            var params = {
                type:type,
                page:page,
                limit:limit,
            }
            JSON.stringify(params);
            $this.noDate = false;
            pAjax.myAjax_Token(rootPath,'back/parkprofile/list',params,function (data) {
                // console.log(JSON.stringify(data));
                if(data !== null && data.code == 0 && data.data.length>0){
                    $this.info = data.data;
                    if(type == 3 || type == 4 || type == 7){
                        $this.pageInit(data.count)
                    }
                }else{
                    $this.noDate = true;
                }
            },function () {
                $this.load = true;
            },function (xhr,xhrStatus) {
                $this.load = false;
                if(xhrStatus !== 'success'){
                    $this.noDate = true;
                }
            })
        },
        //打开详情页
        //id:导航栏ID
        //page:页数
        //limit：每页多少条数据
        //index：控制高亮
        lookDetail:function(url,id,index,infoid){
            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid;
        }

    }
})