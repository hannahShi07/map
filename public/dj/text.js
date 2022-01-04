/**
 * 工作动态
 * @author by zhangrenrong
 * @datetime 2019/6/22
 */
var suiXi = new Vue({
    el: '.container',
    data: {
        indexTab: null,
        title:'',//标题
        time:'',//发布时间
        content: '', //详情
        heightLight:0,//tab栏高亮 从地址栏获取
        columnId:'',//栏目 从地址栏获取
        informationManagementList: [], //栏目数据
        noDate: false,//缺省页显隐
        infoid:'',//具体详情页数据
        loading:true,//正在加载,
        imgList:[],
        type:"",
        pv:0,
    },
    mounted: function() {
        var $this = this;
        var id = $this.getUrlParam('id');
        this.type = $this.getUrlParam('type');
        $this.indexTab = $this.getUrlParam('index');
        // if ($this.getUrlParam('orgId')!='undefined'&&$this.getUrlParam('orgId')!=null&&$this.getUrlParam('orgId')!=null&&$this.getUrlParam('orgId')!=undefined) {
        if ($this.getUrlParam('infoid')!='undefined'&&$this.getUrlParam('infoid')!=null&&$this.getUrlParam('infoid')!=null&&$this.getUrlParam('infoid')!=undefined) {
          if($this.getUrlParam('type')!='undefined'&&$this.getUrlParam('type')!=null&&$this.getUrlParam('type')!=null&&$this.getUrlParam('type')!=undefined){
            let params = JSON.stringify({
                id:$this.getUrlParam('infoid')
            })
            pAjax.myAjax_Token(rootPath,"djapi/partycloud/webprotal/excellentDetail",params,function(data){
                suiXi.loading = false;
                $this.heightLight = $this.indexTab
                if (data.code === 0 && data.data) {
                    suiXi.title = data.data.companyName
                    suiXi.content = data.data.introduction
                    suiXi.time = data.data.createTime;
                    // suiXi.imgList= data.data.picList
                }
            },function(){//beforeSend
            },function(xhr, xhrStatus) {//complete
                if (xhrStatus !== 'success') {
                    // suiXi.content = {};
                    // suiXi.noDate = true;
                }
            },function(xhr, type, errorThrown){//error
            },'获取正文');
            $this.loading = false;
          }else{
            saveBrowse($this.getUrlParam('infoid'));//添加浏览数
              // this.getRecord($this.getUrlParam('infoid'))
            // pAjax.myAjax_Token(rootPath,"party/excellent/front/detail",{
            //     orgId:$this.getUrlParam('orgId')
            // },function(data){//success
            pAjax.myAjax_Form_Token(rootPath,"djapi/cms/columnInfo/info",{
                infoId:$this.getUrlParam('infoid')
            },function(data){//success
                suiXi.loading = false;
                $this.heightLight = $this.indexTab
                if (data.code === 0 && data.data) {
                    suiXi.title = data.data.title
                    suiXi.content = data.data.content
                    suiXi.time = data.data.publishDate;
                    // suiXi.imgList= data.data.picList
                }else{
                  suiXi.content = '';
                  suiXi.noDate = true;
                }
            },function(){//beforeSend
            },function(xhr, xhrStatus) {//complete
                if (xhrStatus !== 'success') {
                    suiXi.content = '';
                    suiXi.noDate = true;
                }
            },function(xhr, type, errorThrown){//error
            },'获取正文');
            $this.loading = false;
          }
        }else {
            if( $this.getUrlParam('id') && $this.getUrlParam('infoid')) {
                $this.heightLight = $this.getUrlParam('index');
                $this.columnId = $this.getUrlParam('id');
                $this.infoid = $this.getUrlParam('infoid');
                $this.getContent(id,$this.columnId,$this.infoid);
            } else {
                var type = $this.getUrlParam('type');

                if(type==11 || type==7 || type==4){//园区风采详情、招商政策详情、主要企业详情
                  var params={
                    id:$this.getUrlParam('id')
                  }
                  if(type == 4){
                    pAjax.myAjax_Token(rootPath,'/djapi/partycloud/parkprofile/incNum',JSON.stringify(params),function (data) {

                    },function () {

                    },function (xhr,xhrStatus) {

                    })
                  }

                  pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/getDeatilById',JSON.stringify(params),function (data) {
                    if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                      $this.info = data.data;
                      if($this.info){
                        $this.content = $this.info.content;
                        $this.title = $this.info.name;
                        $this.time = $this.info.pubdate;
                        $this.pv = $this.info.pv;
                        if($this.indexTab == 1){
                          $this.heightLight = 1
                        }else{
                          $this.heightLight = 3
                        }
                      }else{
                        $this.noDate = true;
                      }

                    }else{
                      $this.noDate = true;
                    }

                  },function () {
                    $this.loading = true;
                  },function (xhr,xhrStatus) {
                    $this.loading = false;
                    if(xhrStatus !== 'success'){
                      $this.noDate = true;
                    }
                  })

                }else{
                  var info= sessionStorage.getItem('bsTxt');
                  info = JSON.parse(info);

                  if(info){
                    $this.content = info.content;
                    $this.title = info.name;
                    $this.time = info.pubdate;
                    if($this.indexTab == 1){
                      $this.heightLight = 1
                    }else{
                      $this.heightLight = 3
                    }
                    // if(type == 4){//主要企业
                    //     $this.saveBrowse(info.id);//添加浏览数
                    // }
                  }else{
                    $this.noDate = true;
                  }
                  $this.loading = false;
                }


            }
        }
    },
    methods: {
        // 浏览次数记录
        // getRecord(infoId){
        //   let params = {
        //     infoId:infoId
        //   }
        //   pAjax.myAjax_Form_Token(rootPath,"djapi/cms/columnInfo/addInfoViews",params,function(data){// success
        //   },function(){// beforeSend
        //   },function(xhr, xhrStatus) {// complete
        //   },function(xhr, type, errorThrown){// error
        //   },'浏览次数记录');
        // },
        //获取正文
        getContent: function(id, columnId,infoid) {
            var filter = 'T.DJ_SYSTEM_ID=' + id;
            pAjax.myAjax_Token(rootPath,"party/info/list",{
                page: 0,
                limit: 0,
                nodeid: columnId,
                infoid:infoid
            },function(data){//success
                // console.log('data=' + JSON.stringify(data))
                suiXi.loading = false;
                if (data.code === 200 && data.data.length > 0) {
                    suiXi.content = data.data[0].context;
                    suiXi.title = data.data[0].title;
                    suiXi.time = data.data[0].publishdate.substr(0,10);
                    suiXi.noDate = false;
                } else {
                    suiXi.content = {};
                    suiXi.noDate = true;
                }
            },function(){//beforeSend
            },function(xhr, xhrStatus) {//complete
                if (xhrStatus !== 'success') {
                    suiXi.content = {};
                    suiXi.noDate = true;
                }
            },function(xhr, type, errorThrown){//error
            },'获取正文');
        },
        //查看模块数据
        lookDetail:function(url,id,index,infoid){
            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid;
        },
        //获取地址栏参数
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        lookInfoDetail: function(index, value) {
            var url = '';
            // if(index == 0){
            //     url = 'tzgg.html';
            // }else if(index == 1){
            //
            // }
            var data = {
                id: value.DjSystemTypeId,
                name: value.Name
            }
            window.location.href = 'characteristic.html?data=' + index;
            // window.location.href = 'characteristic.html?data='+JSON.stringify(data);
        },}
})
