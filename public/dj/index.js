/**
 * 首页渲染
 * @author 张仁荣
 * @date 2019-06-25
 */
var suiXi = new Vue({
    el:'.container',
    data:{
        imgList:[],
        imgInfo:[[],[],[]],
        tabInfo:[[],[],[],[],[],[],[],],
        times:0,
        imgShowList:[],//图片展示
        newsImgList:[],// 园区党建左侧banner
        topBannerList:[],//顶部banner
        linkImgList:[],// 底部友情链接图片
        info:{},//园区介绍
        // fenlanIndex:0,
        // basicBuliding:[],//基础党建
        // workDynamics:[],//工作动态
        // parkIntroduction:[],//园区介绍
        // leadershipRanks:[],//领导班子
        // currentAffairs:[],//时政要闻
        // policyDocument:[],//政策文件
        // bulletinBoard:[],//公告栏目
        // highLevelDynamics:[],//高层动态

    },
    mounted:function(){
        var $this = this;
        if(getUrlParam('siteId')){
          sessionStorage.setItem('siteId',getUrlParam('siteId'))// 获取url地址里传来的siteId属性 并换成起来
        }
        if(getUrlParam('tenant')){
          sessionStorage.setItem('tenant',getUrlParam('tenant'))// 获取url地址里传来的siteId属性 并换成起来
        }

        $this.getData();

        // $this.getData(27,0);//基层党建

        // $this.getData(113,1);//园区党建
        // $this.getData(64,6);//党建动态
        // $this.getData(14,5);//党建要闻（取高层动态的数据）
        // $this.getData(113,4);//党建特色

        // $this.getData(14,5);//时政要闻（取高层动态的数据）

        // $this.getData(3,6);//政策文件
        // $this.getData(63,6);//他山之石
        // $this.getData(23,8);//党务知识

        $this.getImgList(13,88,0);//第一张图
        $this.getImgList(14,220,1);//第二张图
        $this.getImgList(14,163,2);//第三张图
        $this.imgShow(2);//顶部Banner
        $this.imgShow(3);//友情链接
        $this.imgShow(5);//图片展示
        $this.imgShow(6);//左侧新闻轮播图
        $this.getContant(1,$this,1,10)//园区介绍
        //
        sessionStorage.removeItem('tableIndex');
    },
    methods:{
        //打开友情链接
        openlink(linkurl){
          window.open(linkurl);
        },
        //园区介绍
        getContant:function (type,$this,page,limit) {
            // var params = {
            //     type:type,
            //     page:page,
            //     limit:limit,
            // }
          let params = {
            type: '2412585934552437155'
          }
            // JSON.stringify(params);
            $this.noDate = false;
            // pAjax.myAjax_Token(rootPath,'back/parkprofile/list',params,function (data) {
          pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                // console.log(JSON.stringify(data));
                if(data !== null && data.code == 0 && data.data){
                    $this.info = data.data;
                }else{
                    // $this.noDate = true;
                }
            },function () {

            },function (xhr,xhrStatus) {
                // $this.load = false;
                // if(xhrStatus !== 'success'){
                //     $this.noDate = true;
                // }
            })
        },
        lookInfo:function(value){
            sessionStorage.setItem('bsTxt',JSON.stringify(value));
            window.location.href = 'text.html?index=1'
        },
        imgShow:function(type){
            if(type == 5 || type == 6){
              let params = {
                siteId: sessionStorage.getItem('siteId')
              }
                // pAjax.myAjax_Token(rootPath,"party/info/findBannerInfo",
                //     {attributeId:type},
              pAjax.myAjax_Form_Token(rootPath,"djapi/cms/hpage/infoImgList",
                  params,
                function (res) {
                    // if(res.code == 0 && Array.isArray(res.data) && res.data.length>0){
                  if(res.code == 0 ){
                        if(type == 6){//图片展示 --- 图片焦点
                            // console.log(JSON.stringify(res.data))
                            suiXi.imgShowList = res.data.tpzs;
                            suiXi.initSwiper('#imgDisplay');//初始化swiper
                        }else {//新闻左侧--- 新闻焦点
                            suiXi.newsImgList = res.data.xwtp;
                            Vue.nextTick().then(function () {
                                var mySwiper  = new Swiper('#swiperBox', {
                                    pagination: {
                                        el: '.swiper-pagination',
                                        clickable :true,
                                    },
                                    autoplay: {
                                        delay: 3000,
                                        stopOnLastSlide: false,
                                        disableOnInteraction: true,
                                    },
                                    loop: true,    //循环
                                    // // //加上这三句话即可
                                    paginationClickable: true,
                                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                                  preventLinksPropagation: false,
                                  on: {
                                    click: function (e) {
                                      // 这里有坑
                                      // 需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
                                      // console.log(this); // -> Swiper
                                      // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                                      let index = e.target.dataset.index;
                                      let currentData = suiXi.newsImgList[index];
                                      if(currentData){
                                        suiXi.lookDetail('text.html',0,0,currentData.infoId,currentData.nodeCode);
                                      }
                                    }
                                  },
                                });
                            })
                        }
                    }else{

                    }
                }
              )
            }else if(type == 2 || type == 3){
              let params = {
                current: 1,
                model: {
                  name:'',
                  state:{data: "", key: '1310765959610368000'},
                  type:{data: "", key: '2430837861936128122'}
                },
                size: 10,
              }

              if(type == 2){ // 顶部
                params.model.type.key = '2430837861936128122'
              }else if(type == 3){ // 友情链接
                params.model.type.key = '2430837861936128125'
              }
              // pAjax.myAjax_Token(rootPath,"banner/findByType",
              pAjax.myAjax_Token(rootPath,"djapi/partycloud/advertising/findAdvertisingPage",
                // {imageType:type},
                JSON.stringify(params),
                function (res) {

                  if(res.code == 0){
                    if(type == 2){
                      suiXi.topBannerList = res.data.records;
                      Vue.nextTick().then(function () {
                        $(".fullSlide").slide({
                          titCell: ".hd ul",
                          mainCell: ".bd ul",
                          effect: "fold",
                          autoPlay: true,
                          autoPage: true,
                          trigger: "click"
                        });
                      })
                    }else if (type == 3){//友情链接
                      // if(res.data.length){}
                      // console.log(JSON.stringify(res.data))
                      // 判断轮播图大于四张时，轮播
                      suiXi.linkImgList = res.data.records;
                      suiXi.initSwiper('#link_slider');//初始化swiper
                      console.log("type == 3:",JSON.stringify(suiXi.linkImgList))
                    }
                  }else{

                  }
                }
              )

              // let params = {
              //   current: 1,
              //   model: {
              //     name:'',
              //     state:{data: "", key: ""},
              //   },
              //   size: 10,
              //   type:'1314371979012210688'
              // }
              //   // pAjax.myAjax_Token(rootPath,"banner/findByType",
              // pAjax.myAjax_Token(rootPath,"djapi/partycloud/advertising/findAdvertisingPage",
              //       // {imageType:type},
              //       JSON.stringify(params),
              //       function (res) {
              //           console.log("res:",JSON.stringify(res))
              //           if(res.code == 0){
              //               if(type == 2){
              //                   suiXi.topBannerList = res.data;
              //                   Vue.nextTick().then(function () {
              //                       $(".fullSlide").slide({
              //                           titCell: ".hd ul",
              //                           mainCell: ".bd ul",
              //                           effect: "fold",
              //                           autoPlay: true,
              //                           autoPage: true,
              //                           trigger: "click"
              //                       });
              //                   })
              //               }else if (type == 3){//友情链接
              //                   // if(res.data.length){}
              //                   // console.log(JSON.stringify(res.data))
              //                   // 判断轮播图大于四张时，轮播
              //                   suiXi.linkImgList = res.data;
              //                   suiXi.initSwiper('#link_slider');//初始化swiper
              //               }
              //           }else{
              //
              //           }
              //       }
              //   )
            }

        },
        //初始化swiper
        initSwiper:function(id){
            Vue.nextTick().then(function () {
                var mySwiper = new Swiper(id,{
                    normalizeSlideIndex:false,
                    slidesPerView: 4,
                    slidesPerGroup : 4,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop: true,    //循环
                    //加上这三句话即可
                    paginationClickable: true,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    preventLinksPropagation: false,
                    on: {
                      click: function (e) {
                        // 这里有坑
                        // 需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
                        // console.log(this); // -> Swiper
                        // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                        let index = e.target.dataset.index
                        let currentData = suiXi.imgShowList[index];
                        if(currentData){
                          suiXi.lookDetail('text.html',0,0,currentData.infoId,currentData.nodeCode);
                        }

                      }
                    },
                })
            })
        },
          getData:function () {
          let params = {
            siteId: sessionStorage.getItem('siteId')
          }
            // pAjax.myAjax_Token(rootPath,"party/info/list", {
            pAjax.myAjax_Form_Token(rootPath,"djapi/cms/hpage/infoList", params,function(data){
                  if(data.code ==0){
                    Vue.set(suiXi.tabInfo,0,data.data.yqdj);// 园区党建：tabInfo[0]
                    Vue.set(suiXi.tabInfo,6,data.data.djdt);// 党建动态：tabInfo[6]
                    Vue.set(suiXi.tabInfo,5,data.data.djyw); // 党建要闻：tabInfo[5]
                    Vue.set(suiXi.tabInfo,4,data.data.djts);// 党建特色：tabInfo[4]
                    Vue.set(suiXi.tabInfo,8,data.data.djts); // 通知公告：tabInfo[8]
                  }else{
                      suiXi.tabInfo = [[],[],[],[],[],[],[],];
                  }
              },function(){}, function(xhr,xhrStatus){
                  if(xhrStatus !== 'success'){
                    suiXi.tabInfo = [[],[],[],[],[],[],[],];
                  }
              },"基础党建")
          },
          getImgList:function (nodeid,infoid,tab) {
              // alert(tab)djapi/cms/hpage/infoList
            let params = {
              "current": 1,
              "model": {
              "name": "",
              "type": {
                "data": "",
                  "key": 0
              }
            },
              "size": 10,
            }
            pAjax.myAjax_Token(rootPath,"/djapi/partycloud/advertising/findAdvertisingPage",
              //   pAjax.myAjax_Token(rootPath,"party/info/ list",
                //   {
                //     page:1,
                //     limit:1,
                //     nodeid:nodeid,
                //     infoid:infoid
                // }
              JSON.stringify(params)
                ,function(data){
                    pv.log(JSON.stringify(suiXi.imgInfo[tab]));
                    if(data.code == 200 && data.data.length>0){
                        Vue.set(suiXi.imgInfo,tab,data.data);
                    }else{
                        suiXi.imgInfo[tab] = [];
                    }
                },function(){}, function(xhr,xhrStatus){
                    suiXi.times++;
                    if(xhrStatus !== 'success'){
                        suiXi.imgInfo[tab] = [];
                    }
                },"图片循环")
        },
        //查看模块数据
        lookDetail:function(url,id,index,infoid,nodeCode){
          if(nodeCode === 'yqdj'){
            id = '27'
            index = '2'
          }else if(nodeCode === 'djdt'){
            id = '64'
            index = '4'
          }else if(nodeCode === 'djyw'){
            id = ''
            index = ''
          }else if(nodeCode === 'djts'){
            id = '113'
            index = '2'
          }else if(nodeCode === 'tzgg'){
            id = '23'
            index = '5'
          }

            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid+'&nodeCode='+nodeCode;
         },
        changeTab:function(infoId,tab){
              suiXi.getData(infoId,tab);//基层党建
        },
        ToText:function(HTML) {
            if(HTML){
                var input = HTML;
                return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
            }
        },
        //图片地址判空
        changeImgSrc:function(value){
            if(value !== undefined && value !== null){
                var url = value.image
                if(url !== undefined && url !== null && url !== ''){
                    return url
                }else {
                    return  '';
                }
            }

        }
    },
    filters:{
        filterDate:function (time) {
            if(time !== undefined && time !== null && time !== ''){
                return time.substring(5,10)
            }
        },
        filterDateSub:function (time) {
            if(time !== undefined && time !== null && time !== ''){
                return time.substring(0,10)
            }
        },
        filterLength:function (value,num) {
            if(num !==undefined && value.length>num){
                return value.substring(0,num)+'...';
            }else if(num ==undefined && value.length>30){
                return value.substring(0,29)+'...';
            }else{
                return value
            }
        }
    },
    watch:{
        times:function (newV) {
            if(newV == 3){
                this.imgList = [];
                suiXi.imgList =  suiXi.imgList.concat(suiXi.imgInfo[0]);
                suiXi.imgList =  suiXi.imgList.concat(suiXi.imgInfo[1]);
                suiXi.imgList =  suiXi.imgList.concat(suiXi.imgInfo[2]);
                Vue.nextTick().then(function () {
                    $(function () {
                        $("#slide").player({
                            width: '530px',
                            height: '350px',
                            time: '3000',
                            transition: 1,
                            duration: 800,
                            //method:'4',
                            animate: {
                                'direction': 'fix'
                            },
                            divCSS: {
                                'border': 'none'
                            },
                            ulCSS: {
                                'bottom': '5px',
                                'right': '10px',
                                'line-height': '15px'
                            },
                            titleCSS: {
                                'background': '#434343',
                                'text-indent': '2em',
                                'line-height': '40px',
                                'height': '40px',
                                'font-weight': 'normal',
                                'color': '#fff',
                                'font-size': '16px'
                            }
                        }).play();
                        $("#slide img").css("height", "350px").css("width", "530px");
                    });
                })
            }
        }
    }
})

