/**
 * tzgg页面
 * @author zhuyalun
 * @date 2019-06-23
 */
var suiXi = new Vue({
	el:".container",
	data:{
		loadText:true,//点击加载
		load:true,//页面加载
		noDate:false,//无数据
		id:0,//标题栏ID
		page:0,//页数
		num:2,//控制加载数量
		limit:10,//每页的列表数量
		indexTab:0,//标题栏的index值
		infoid:0,
		content:[],//数据
    loadNoMore:false,
		heightLight:0,
		currentIndex:1,
    infoTab:2,//当前类型应该再第几个高亮
    nodeCode:'yqdj'
	},
	mounted:function () {
      var $this = this;
      $this.id=  getUrlParam('id');//获取url地址里传来的id属性
      $this.nodeCode=  getUrlParam('nodeCode');
      if($this.id == 113){
          $this.currentIndex = 2;
      }else{
          $this.currentIndex = 1;
      }
      $this.indexTab = getUrlParam('index');//获取url地址里传来的index属性
      $this.heightLight =  $this.indexTab;
      $this.getContent();
      $this.highLight($this.indexTab);
      sessionStorage.removeItem('tableIndex');
    },
    methods:{
		checkType:function(type,id,nodeCode){
      suiXi.loadNoMore = false;
      this.currentIndex = type
			this.id= id
			// this.
			this.page = 0
      this.nodeCode = nodeCode
      if(type!=3){
          this.getContent()
      } else {
          this.getExcellent()
      }
		},
    //优秀支部
    getExcellent:function(){
        var $this = this;
        this.page++;
        pAjax.myAjax_Token(rootPath, "djapi/partycloud/webprotal/excellentList", JSON.stringify({
            // nodeid:this.id,
            current:$this.page,
            size:$this.limit,
            // infoid:$this.infoid
        }),function(data){
            if(data.code==0){
                if (data.data.records.length<=0){
                    suiXi.content = []
                    return
                }
                if(suiXi.page == 1){
                    suiXi.content=data.data.records;

                    if(data.data.total<=$this.limit){
                        suiXi.loadNoMore = true;
                    }
                }else{
                    data.data.records.map(function (value) {
                        suiXi.content.push(value)
                    })
                    if(suiXi.content.length < data.data.total){//数据库有数据
                        suiXi.loadNoMore = false;
                    }else{
                        suiXi.loadNoMore = true;
                    }
                }

            }else {
                if (suiXi.page == 1) {
                    suiXi.content = [];
                }
            }
        },function(){
            if ($this.page == 1) {
                $this.load = true;
            }
        }, function(xhr,xhrStatus){
            if (suiXi.page == 1) {
                $this.load = false;
            }
            if(xhrStatus !=='success'){
                if(suiXi.page == 1){
                    suiXi.content=[];
                }else{

                }
            }
        }, "通知公告")
    },
    //请求数据
    getContent:function(){
      var $this = this;
      this.page++;
      let para = {
        "current": $this.page,
        "nodeCode":  this.nodeCode,
        "siteId": sessionStorage.getItem('siteId'),
        "size": $this.limit,
      }
      // pAjax.myAjax_Token(rootPath, "party/info/list",
      pAjax.myAjax_Form_Token(rootPath, "djapi/cms/columnInfo/pageList",
        // {
        //     nodeid:this.id,
        //     page:$this.page,
        //     limit:$this.limit,
        //     infoid:$this.infoid
        //   }
        para
    ,function(data){
      if(data.code==0){
        if (data.data.records.length<=0){
          suiXi.content = []
          return
        }
        if(suiXi.page == 1){
          suiXi.content=data.data.records;
          if(data.data.total <= $this.limit){
            suiXi.loadNoMore = true;
         }else{
            suiXi.loadNoMore = false;
          }

          // if(data.data.total < $this.limit){
          //   suiXi.loadNoMore = false;
          // }else{
          //   suiXi.loadNoMore = true;
          // }
        }else{
          data.data.records.map(function (value) {
            suiXi.content.push(value)
          })
          if(suiXi.content.length < data.data.total){//数据库有数据
            suiXi.loadNoMore = false;
          }else{
            suiXi.loadNoMore = true;
          }
        }

      }else {
        if (suiXi.page == 1) {
          suiXi.content = [];
        }
      }
          },function(){
              if ($this.page == 1) {
                  $this.load = true;
              }
    }, function(xhr,xhrStatus){
      if (suiXi.page == 1) {
         $this.load = false;
      }
      if(xhrStatus !=='success'){
          if(suiXi.page == 1){
              suiXi.content=[];
          }else{

        }
      }
    }, "通知公告")
  },
  //打开详情页
  //id:导航栏ID
  //page:页数
  //limit：每页多少条数据
  //index：控制高亮
  lookDetail:function(url,id,index,infoid,orgId,type){
        window.location.href = url+'?id='+id+'&index='+index+'&infoid='+infoid+'&orgId='+orgId+'&type='+type;
    },
    //点击加载
    clickLoad:function (){
      if(!suiXi.loadText){
        return;
      }
      var pageSize=0;
      pageSize=suiXi.num*suiXi.limit;
        pv.log(pageSize)
        if (this.currentIndex!=3) {
            suiXi.getContent();
            if(pageSize>suiXi.content.count){
                suiXi.loadText=false;
            }
        } else {
            suiXi.getExcellent();
            // if(pageSize>suiXi.content.count){
            //     suiXi.loadText=false;
            // }
        }

      suiXi.num++;
    },
    //判断高亮
    highLight:function(index){
      // var sec_nav=document.getElementsByClassName("sev")[0].getElementsByTagName("dd");
      // sec_nav[index].getElementsByTagName("a")[0].className="on";
    }
},
  filters:{
        filterDateSub:function (time) {
            if(time !== undefined && time !== null && time !== ''){
                return time.substring(0,10)
            }
        },
    }
})
