

/**
 * 营商服务
 * @author 张仁荣
 * @date 2020.04.06
 */
var suiXi = new Vue({
    el:'.container',
    data:{
        id:'',
        heightLight:'',
        info:[{}],
        type:4,//默认1：园区介绍 ；2：发展平台 3：主导展业；4：主要企业；5：推荐项目；6：生产要素；7：招商政策；8：投资服务；9：投资程序;10：生活配套;11:园区风采；12：宣传片
        load:true,
        limit:10,
        noDate:false,
        industry:[],//行业类型字典表
        more:[],
        program:0,//当前投资程序选中类型
        num:0,//记录当前位置
        errorImg:"javascript:this.src='images/errorImg.png';this.onerror = null"
    },
    watch:{
        info:function (newV) {
            if(newV.length == 0){
                this.info = [{}]
            }
        }
    },
    mounted:function () {
        var $this = this;
        $this.id=  getUrlParam('id');//获取url地址里传来的id属性
        $this.heightLight = getUrlParam('index');//获取url地址里传来的index属性
        // console.log($this.heightLight)
        if($this.heightLight == 1){
            $this.type = 1;
        }else{
            $this.type = 4;
        }
        // $this.getIndustryType($this);//行业字典表
        // $this.getContant($this.type ,$this)//获取详情
        var tableIndex= sessionStorage.getItem('tableIndex');//是否存在下标
        // console.log(tableIndex)
        if(tableIndex != null){
            //运营商服务
            if($this.heightLight == 7 && (tableIndex == 1 || tableIndex == 11 || tableIndex == 12)){
                $this.type = 2;
                sessionStorage.removeItem('tableIndex');
            }else if($this.heightLight == 1 && ( 2<= tableIndex && tableIndex <=10 )){
                $this.type = 1;
                sessionStorage.removeItem('tableIndex');
            }else {
                $this.checkType(tableIndex);
            }
        }else{
            $this.getContant($this.type ,$this,1)//获取详情
        }


    },
    updated:function () {
      this.more=[];
      this.$nextTick(() => {
        let bzh=document.getElementsByClassName('itembottomblock');
        for(let i=0;i<bzh.length;i++){
          let h=bzh[i].getElementsByClassName('centerCon')[0];
          if(h.clientHeight>30){
            this.more[i]=true;
          }else{
            this.more[i]=false;
          }
        }

      });
    },
    methods:{

        //初始化分页
        pageInit:function(count){
            var $this = this;
            var dom = 'demo1';
            if($this.type == 7){
                dom = 'demo2';
            }
            var limit = 10;
            //主要企业展示12条数据
            if($this.type == 4){
                limit = 12;
            }
            // console.log(dom);
            layui.use(['laypage', 'layer'], function() {
                var laypage = layui.laypage
                    , layer = layui.layer;
                //总页数大于页码总数
                laypage.render({
                    limit:limit,
                    elem: dom
                    ,count: count //数据总数
                    ,jump: function(obj,first){
                        // console.log(obj.curr);
                        if(!first) {
                            $this.getContant($this.type, $this, obj.curr, $this.limit)
                        }
                    }
                });
            })
        },
        checkType:function(type){
            sessionStorage.setItem('tableIndex',type);
            this.type = type;
            //主导产业，主要企业,园区风光
            if(this.type == 3 || this.type == 7 || this.type == 11){
                this.getContant( this.type,this,1,this.limit)//获取详情
            }else{
                this.getContant( this.type,this,1)//获取详情
            }
        },
        //获取详情
        getContant:function (type,$this,page,limit) {
            let params = {}
            let  url=''
            if(type==1){//园区介绍
              params = {
                type:'2412585934552437155'
              }
              $this.noDate = false;
              pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                //console.log('园区介绍'+JSON.stringify(data));
                if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                  $this.info[0] = data.data;

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

            }else if(type==2){//发展平台
                params = {
                  type:"2412585934552523614"
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    $this.info[0] = data.data;

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

              }else if(type==3){//主导产业
                params = {
                  type:"2412585934552469751"
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                  //console.log('园区风采'+JSON.stringify(data))
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    $this.info[0] = data.data;

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

              }else if(type==4){//主要企业
                params = {
                  current:page,
                  size:limit,
                  model: {
                    type: "2412585934552452336"
                  },
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/list',JSON.stringify(params),function (data) {
                    $this.noDate = false;
                  //console.log('园区风采'+JSON.stringify(data));
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    if(data.data.records!='' && data.data.records!=undefined && data.data.records!=null && data.data.records!='null' && data.data.records.length>0){
                      $this.info = data.data.records;
                      if(type == 3 || type == 4 || type == 7 || type == 11){
                        if(page == 1 || page == null || page == undefined){
                          $this.pageInit(data.data.total)
                        }
                      }
                    }else{
                      $this.noDate = true;
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

              }else if(type==5){//推荐项目
                params = {
                  current:page,
                  size:limit
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/recommendList',JSON.stringify(params),function (data) {
                    $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    if(data.data.records!='' && data.data.records!=undefined && data.data.records!=null && data.data.records!='null' && data.data.records.length>0){
                      $this.info = data.data.records;
                      if(type == 3 || type == 4 || type == 7 || type == 11){
                        if(page == 1 || page == null || page == undefined){
                          $this.pageInit(data.data.total)
                        }
                      }

                    }else{
                      $this.noDate = true;
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

              }else if(type==6){//生产要素
                params = {
                  type:"2412585934552526429"
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    $this.info[0] = data.data;

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

            }else if(type==7){//招商政策
              params = {
                current:page,
                size:limit,
                model: {
                  type: "2412585934552466321"
                },
              }
              pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/list',JSON.stringify(params),function (data) {
                $this.noDate = false;
                if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                  if(data.data.records!='' && data.data.records!=undefined && data.data.records!=null && data.data.records!='null' && data.data.records.length>0){
                    $this.info = data.data.records;
                    if(type == 3 || type == 4 || type == 7 || type == 11){
                      if(page == 1 || page == null || page == undefined){
                        $this.pageInit(data.data.total)
                      }
                    }
                  }else{
                    $this.noDate = true;
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

            }else if(type==8){//投资服务
                params = {
                  type:"2412585934552533521"
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    $this.info[0] = data.data;

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

            }else if(type==9){//投资程序
              params = {
                current:page,
                size:limit,
                model: {
                  type: "2412585934552468963"
                },
              }
              pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/list',JSON.stringify(params),function (data) {
                $this.noDate = false;
                if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                  if(data.data.records!='' && data.data.records!=undefined && data.data.records!=null && data.data.records!='null' && data.data.records.length>0){
                    $this.info = data.data.records;

                  }else{
                    $this.noDate = true;
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

            }else if(type==10){//生活配套
                params = {
                  type:"2412585934552547663"
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/introducedDeatil',JSON.stringify(params),function (data) {
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    $this.info[0] = data.data;

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

              }else if(type==11){//园区风采
                params = {
                  current:page,
                  size:limit
                }
                pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/demeanourList',JSON.stringify(params),function (data) {
                  //console.log('园区风采'+JSON.stringify(data))
                  $this.noDate = false;
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                    if(data.data.records!='' && data.data.records!=undefined && data.data.records!=null && data.data.records!='null' && data.data.records.length>0){
                      $this.info = data.data.records;
                      if(type == 3 || type == 4 || type == 7 || type == 11){
                        if(page == 1 || page == null || page == undefined){
                          $this.pageInit(data.data.total)
                        }
                      }
                    }else{
                      $this.noDate = true;
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

              }else if(type==12){//宣传片
              params = {

              }
              pAjax.myAjax_Token(rootPath,'djapi/partycloud/webprotal/promotionalList',JSON.stringify(params),function (data) {
                //console.log('宣传片'+JSON.stringify(data));
                $this.noDate = false;
                if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                  $this.info[0] = data.data;
                  if(type == 3 || type == 4 || type == 7 || type == 11){
                    if(page == 1 || page == null || page == undefined){
                      $this.pageInit(data.count)
                    }
                  }
                  //浏览次数
                  let dataparms={
                    id:data.data.id
                  }
                  pAjax.myAjax_Token(rootPath,'djapi/partycloud/parkprofile/incNum',JSON.stringify(dataparms),function (data) {

                  },function () {

                  },function (xhr,xhrStatus) {

                  })

                  //获取视频DOM元素
                  // let myVideo = document.getElementById("myVideo");
                  //监听播放开始
                  // myVideo.addEventListener('play',function(){
                  //   let dataparms={
                  //     attachmentId:$this.info[0].id
                  //   }
                  //   pAjax.myAjax_Token(rootPath,'djapi/partycloud/playRecord/savePlayRecord',JSON.stringify(dataparms),function (data) {
                  //
                  //   },function () {
                  //
                  //   },function (xhr,xhrStatus) {
                  //
                  //   })
                  //
                  // });

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


            }else{
              url=''
              params = {
                type:type,
                page:page,
                limit:limit,
              }
              $this.noDate = false;
              if(type == 4){
                params.limit =12
              }
              pAjax.myAjax_Token(rootPath,url,JSON.stringify(params),function (data) {
                  console.log('宣传片：'+JSON.stringify(data));
                  if(data!='' && data!=undefined && data!=null && data!='null' && data.code == 0 && data.data!='' && data.data!=undefined && data.data!=null && data.data!='null'){
                      $this.info = data.data;
                      if(type == 3 || type == 4 || type == 7 || type == 11){
                          if(page == 1 || page == null || page == undefined){
                              $this.pageInit(data.count)
                          }
                      }
                  }else{
                      $this.noDate = true;
                  }
                  // console.log($this.noDate)
              },function () {
                  $this.load = true;
              },function (xhr,xhrStatus) {
                  $this.load = false;
                  if(xhrStatus !== 'success'){
                      $this.noDate = true;
                  }
              })
            }


        },
        //打开详情页
        //id:导航栏ID
        //page:页数
        //limit：每页多少条数据
        //index：控制高亮
        lookDetail:function(url,id,index,infoid){
            window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid;
        },
        //转换图片地址
        filterImg:function (src) {
          if(src){
            return src
          }else{
            return 'images/errorImg.png'
          }
        },
        //行业转换类型
        // getIndustryType:function ($this) {
        //     $.ajax({
        //         type:'get',
        //         url:'/select/part/next/pid',
        //         data:{id:1910},
        //         success:function(data){
        //            // console.log(JSON.stringify(data))
        //             if(data !== null && data.code == 0){
        //                 $this.industry = data.data.list;
        //             }
        //         }
        //     })
        //
        // },
        //项目简介是否展示更多
        filterContent:function (value,index) {
            if(value !== undefined && value != null && value != ''){
                if(value.length>54){
                    this.more[index] = true
                }else{
                    //value.test(/(\n\r)/g)
                    // console.log(value.split('</p>'))
                    var reg = new RegExp(/(\n\r)/g);
                    if(reg.test(value) || value.split('</p>').length>1){
                        this.more[index] = true;
                    }else{
                        this.more[index] = false
                    }

                }
                return value;
            }
        },
        //转换投资程序类型
        changeProgram:function(index){
            this.program = index;
        },
        //招商政策查看详情
        lookInfo:function(value,index){
            var type = index;
            if(index == 4){
                // saveBrowse(value.id)
                if(value.companyUrl != null &&  value.companyUrl != undefined && value.companyUrl != ''){
                    window.open(value.companyUrl);
                    return;
                }
            }
            if(index == 11){
                index = 1;
            }else{
                index = 7;

            }
            sessionStorage.setItem('bsTxt',JSON.stringify(value));
            window.location.href = 'text.html?index='+index +'&type='+type+'&id='+value.id
        },
        next(){
          if(!(this.$refs.programtabs.scrollLeft+this.$refs.programtabs.clientWidth>=this.$refs.proNav.clientWidth)){
            this.num++;
            this.$refs.programtabs.scrollLeft=this.$refs.prolist[this.num].offsetLeft
          }
        },
        previous(){
          if(this.num !== 0){
            this.num--;
            this.$refs.programtabs.scrollLeft=this.$refs.prolist[this.num].offsetLeft
          }
        }
    },
    filters:{
        filterType:function(value,type){
            if(value !== undefined && value != null && value != ''){
                var djValues = '';
                type.map(function (info) {
                    if(info.djKeys == value){
                        djValues = info.djValues;
                    }
                })
                return djValues;
            }else {
                return '-'
            }
        },
        filterEmpty:function(value){
            if(value !== undefined && value != null && value != ''){
                return value
            }else{
                return '-'
            }
        },
        filterDate:function (value) {
            if(value !== undefined && value != null && value != ''){
                return value.substring(0,10)
            }else{
                return '-'
            }
        }
    }
})
