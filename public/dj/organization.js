/**
 * 工作动态
 * @author by zhangrenrong
 * @datetime 2019/6/22
 */
var suiXi = new Vue({
    el:'.container',
    data:{
        indexTab:0,
        content:{},//详情
        informationManagementList:[],//栏目数据
    },
    mounted:function () {
        var $this = this;
        var id=  $this.getUrlParam('id');
        $this.indexTab = $this.getUrlParam('index');
        $this.getContent(id);
        $this.getInformationManagement();
    },
    methods:{
        getContent:function (id) {
            var filter = 'T.DJ_SYSTEM_ID='+id;
            $.ajax({
                type:"post",
                url:"https://wx.yifarj.com/zax/yifa.asmx/PhoneSingleSystem",
                async:true,
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded;charset=gb2312'
                },
                data:{
                    token:'www.yifarj.com',
                    produre:'PKG_WX.EXESELECT',
                    operate:'PHONE_SYSTEM_FILE0000000',
                    modelName:'IFrame.Client.ZiLaiShui.EPhoneSystemFile,IFrame.Client.ZiLaiShui',
                    filter:filter,// DjSystemId
                    orderBy:''
                },
                success:function(data){
                    if(JSON.parse(data).ErrorCode == 0){
                        suiXi.content = JSON.parse(data).Value;
                    }else{
                        suiXi.content = {};
                    }
                },
                complete:function(xhr,xhrStatus){
                    if(xhrStatus !== 'success'){
                        suiXi.content = {};
                    }
                },
                error:function(xhr){
                    //					console.log(JSON.stringify(xhr))
                }
            });
        },
        //获取栏目
        getInformationManagement:function(){
            $.ajax({
                type:"post",
                url:"https://wx.yifarj.com/zax/yifa.asmx/PhoneFetchList",
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded;charset=gb2312'
                },
                data:{
                    token:'www.yifarj.com',
                    produre:'PKG_WX.EXESELECT',
                    operate:'PHONE_SYSTEM_TYPE',
                    modelName:'IFrame.Client.ZiLaiShui.XPhoneSystemType,IFrame.Client.ZiLaiShui',
                    filter:"T.SYSTEM_TYPE=11",
                    orderBy:'T.SEQ'
                },
                success:function(data){
                    if(JSON.parse(data).ErrorCode == 0){
                        suiXi.informationManagementList = JSON.parse(data).Value;
                    }else{
                        suiXi.informationManagementList = [];
                    }
                },
                complete:function(xhr,xhrStatus){
                    if(xhrStatus !== 'success'){
                        suiXi.workDynamicsList = [];
                    }
                },
                error:function(xhr){
                    // console.log(JSON.stringify(xhr))
                }
            });
        },
        //获取地址栏参数
       getUrlParam:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        //查看模块数据
        lookDetail:function(url,id,page,limit,index,infoid){
            window.location.href = url+'?id='+id+'&page='+page+'&limit='+limit+'&index='+index+'&infoid='+infoid;
        },
        lookInfoDetail:function(index,value){
            var url = '';
            // if(index == 0){
            //     url = 'tzgg.html';
            // }else if(index == 1){
            //
            // }
            var data ={
                id:value.DjSystemTypeId,
                name:value.Name
            }
            window.location.href = 'characteristic.html?data='+index;
            // window.location.href = 'characteristic.html?data='+JSON.stringify(data);
        },
    }
})