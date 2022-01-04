<template>
  <div class="navbar">
    <div class="left-main">
      <!--<img src="@/assets/head/icon-01.png" alt="">-->
      <i class="iconfont icon-danghui font-size"/>
      <span>智慧党建云平台</span>
    </div>

    <div class="left-menu">
      <div class="left-item">
        <router-link
          v-for="(item, index) in routers"
          v-if="(item.name != '设置') && (item.name != '权限管理')  && (item.name != '大屏数据') "
          :to="{path:item.path}"
          @click.native="routerClick(item)"
          class="left-menu-item"
          active-class="actived">
          <i :class="addClass(item)" class="color-white"/>
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>

    <div class="right-menu color-white">
      <div class="inlineBlock">
        {{orgName}}  {{datetime}}
      </div>
      <div class="inlineBlock menu-back">
        <!--<router-link to="/front/index">-->
          <!--&lt;!&ndash;<img src="@/assets/head/icon-02.png" alt="" style="vertical-align: sub">&ndash;&gt;-->
          <!--<i class="iconfont icon-computer font-size" style="vertical-align: sub"/>-->
          <!--<span>返回前台</span>-->
        <!--</router-link>-->

        <!--切换到后台 start-->
        <!--<router-link class="spacing-back spacing-right"   :to="defFrontPath" v-if="defFrontPath !== ''">
          <el-popover
            popper-class="poppver-back-class"
            placement="bottom-end"
            trigger="hover"
            :visible-arrow="false"
            content="返回前台">
            <i class="iconfont icon-computer font-size" style="vertical-align: sub" slot="reference"/>
          </el-popover>
        </router-link>-->
        <!--切换到后台 end-->
        <!--<router-link target="_blank" to="/portal-site/gateway/index">-->
        <!--<router-link target="_blank" to="../src/views/dj/index.html">-->
          <!--<a class="spacing-left spacing-right" onclick="window.open('./dj/index.html?siteId=1&tenant='+tenant, '_blank')">-->
        <a class="spacing-left spacing-right" @click="jumpTo(1)">
          <!--<router-link target="_blank" to="../../../test.html">-->
          <el-popover
            popper-class="poppver-class"
            placement="bottom-end"
            trigger="hover"
            :visible-arrow="false"
            content="大屏数据">
            <i class="iconfont icon-computer font-size" slot="reference"/>
          </el-popover>
          <!--</router-link>-->
        </a>

        <a class="spacing-left spacing-right" @click="jumpTo(2)">
        <!--<router-link target="_blank" to="../../../test.html">-->
          <el-popover
            popper-class="poppver-class"
            placement="bottom-end"
            trigger="hover"
            :visible-arrow="false"
            content="门户网站">
            <i class="iconfont icon-pioneer font-size" slot="reference"/>
          </el-popover>
        <!--</router-link>-->
          </a>

        <el-popover
          popper-class="poppver-class"
          placement="bottom-end"
          trigger="hover"
          :visible-arrow="false"
          content="消息和通知">
            <span class="iconfont icon-bell font-size news"  @click="newshow" slot="reference">
              <i class="newsNum" v-if="readnews>99 && readnews!=0">99+</i>
              <i class="newsNum" v-if="readnews<=99 && readnews!=0">{{readnews}}</i>
            </span>
        </el-popover>
        <!--消息通知 end-->

      </div>

      <el-dropdown
        class="right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" alt=""/>
          <!--<span>{{ name }}</span>-->
          <!--<img src="@/assets/head/icon-03.png" class="user-icon" alt="">-->
          <i class="iconfont icon-arrow_down_full "/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link
            v-for="(item, index) in routers"
            v-if="(item.name === '设置')|| (item.name === '权限管理')"
            :to="{path:item.path}"
            @click.native="routerClick(item)"
          >
            <el-dropdown-item>{{item.name}}</el-dropdown-item>
          </router-link>
          <router-link
            v-for="(item, index) in routers"
            v-if="item.name === '大屏数据'"
            :to="{path:item.path}"
            @click.native="routerClick(item)"
          >
            <el-dropdown-item>{{item.name}}</el-dropdown-item>
          </router-link>


          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span class="inlineBlock" @click="logout">
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <!--消息和通知-->
    <el-drawer
      class="drawer"
      size="300px"
      :append-to-body="false"
      :visible.sync="drawer"
      :with-header="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="通知" name="first">
          <div class="newscontent" v-loading="loading">
            <ul class="newsul" v-if="noticetableData!='' && noticetableData!=undefined && noticetableData!=null && noticetableData!='null' && noticetableData.length>0">
              <li v-for="(items,index) in noticetableData" @click="opennoticeDetail(items)">
                <div class="newtitle">
                  <h2>{{items.title}}</h2>
                </div>
                <div class="newtxt" v-html="items.content" style="font-size: 12px">
                  <!--                  {{items.content}}-->
                </div>
                <div class="newdetail">
                  <span class="newtime el-icon-time"> {{items.createTime}}</span>
                  <span class="newarrow">详情 <i class="el-icon-arrow-right"></i></span>
                </div>
              </li>

            </ul>
            <!-- 空数据样式 -->
            <base-table-empty v-else slot="empty"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息" name="second">
          <div class="newscontent" v-loading="loading">
            <ul class="newsul" v-if="newstableData!='' && newstableData!=undefined && newstableData!=null && newstableData!='null' && newstableData.length>0">
              <li v-for="(item,index) in newstableData" :class="{'gradColor':item.isRead==true}" @click="openDetail(item)">
                <div class="newtitle">
                  <h2 :class="{'gradColor':item.isRead==true}">{{item.title}}</h2>
                </div>
                <div class="newtxt" :class="{'gradColor':item.isRead==true}">
                  {{item.content}}
                </div>
                <div class="newdetail">
                  <span class="newtime el-icon-time"> {{item.releaseTime}}</span>
                  <span class="newarrow">详情 <i class="el-icon-arrow-right"></i></span>
                </div>
              </li>

            </ul>
            <!-- 空数据样式 -->
            <base-table-empty v-else slot="empty"/>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="newsfooter" v-if="activeName=='first' && noticetableData!='' && noticetableData!=undefined && noticetableData!=null && noticetableData!='null' && noticetableData.length>0" @click="close('/backstage/sysset/basic/notification/index')">
        <!--<router-link to="/backstage/sysset/basic/notification/index">-->
          <img src="../../../assets/page/icon-notice.png">
          <span class="txt">全部通知</span>
          <span class="righticon el-icon-arrow-right"></span>
        <!--</router-link>-->
      </div>
      <div class="newsfooter" v-if="activeName=='second' && newstableData!='' && newstableData!=undefined && newstableData!=null && newstableData!='null' && newstableData.length>0" @click="close('/backstage/sysset/basic/sitemsg/index')">
        <!--<router-link to="/backstage/sysset/basic/sitemsg/index">-->
          <img src="../../../assets/page/icon-news.png">
          <span class="txt">全部消息</span>
          <span class="righticon el-icon-arrow-right"></span>
        <!--</router-link>-->
      </div>
    </el-drawer>

    <!--详情弹窗-->
    <div class="bc" v-if="newsvisible || noticevisible"></div>
    <!--消息详情-->
    <div class="newstcContent" v-if="newsvisible">
      <div class="Contenttitle">
        <span class="tctitle">详情</span>
        <span class="close el-icon-close" @click="newscancel()"></span>
      </div>
      <div class="txtContent">
        <base-card-box header="">
          <div class="detail-box">
            <div class="card-box-title">
              {{isEmpty(viewData,'title')}}
            </div>
            <span>发布时间：{{isEmpty(viewData,'releaseTime')}}</span>
          </div>
          <el-divider></el-divider>
          <div class="detail-contant">
            {{isEmpty(viewData,'content')}}
          </div>
        </base-card-box>
      </div>

      <div slot="footer" class="dialog-footer" style="position:absolute;left:46%;bottom:20px;text-align:center">
        <el-button size="medium" type="primary" @click="newscancel()">知道了</el-button>
      </div>
    </div>

    <!--通知详情-->
    <div class="newstcContent" v-if="noticevisible">
      <div class="Contenttitle">
        <span class="tctitle">详情</span>
        <span class="close el-icon-close" @click="noticecancel()"></span>
      </div>
      <div class="txtContent">
        <base-card-box header="">
          <div class="detail-box">
            <div class="card-box-title">
              {{isEmpty(noticeData,'title')}}
            </div>
            <span>发布时间：{{isEmpty(noticeData,'createTime')}}</span>
          </div>
          <el-divider></el-divider>
          <div class="detail-contant" v-if="noticeData.content!='' && noticeData.content!=undefined && noticeData.content!=null && noticeData.content!='null'" v-html="noticeData.content">
            <!--              {{isEmpty(noticeData,'content')}}-->
          </div>
          <div class="detail-contant" v-else>
            --
          </div>
        </base-card-box>
      </div>

      <div slot="footer" class="dialog-footer" style="position:absolute;left:46%;bottom:20px;text-align:center">
        <el-button size="medium" type="primary" @click="noticecancel()">知道了</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'
  import {getNowDateObjQString} from '@/utils/index'
  import {getFrontnotice,getFrontnews,getFrontreaded,getNewsnum}  from "@/api/front/index.js"

  export default {
    mounted () {
    },
    data () {
      return {
        orgName: db.get("USER").djOrg && db.get("USER").djOrg.name ? db.get("USER").djOrg.name + ' 您好~ ' : '',
        datetime: '000年00月00日 星期一 00:00:00',
        dateTimer: null,

        currentIndex:0,
        drawer: false,//关闭右侧消息
        activeName: 'first',//消息tab切换
        newspageNum: 1,
        newspageSize: 10,
        newstotal: 0,
        newstableData:[],
        noticepageNum: 1,
        noticepageSize: 10,
        noticetotal: 0,
        noticetableData:[],
        newsvisible:false,
        noticevisible:false,
        viewData:'',//消息详情
        noticeData:'',//通知详情
        readnews:0,//未读消息
        defFrontPath: db.get('DEF_FRONT_PATH', ''),
        routers: this.$store.state.account.routes,
        ws_url: `${process.env.VUE_APP_DEV_REQUEST_WEBSOCKET}/api/partycloud/ws/sitemsg/`, //websocket连接地址
        tenant: db.get('TENANT', '')
      }
    },
    computed: {
      avatar () {
        const user = this.$store.state.account.user;
        if (!user["avatar"]) {
          return require(`@/assets/avatar/default.jpg`);
        } else {
          if (
            user["avatar"].startsWith("http://") ||
            user["avatar"].startsWith("https://")
          ) {
            return user["avatar"];
          } else {
            return require(`@/assets/avatar/${user.avatar}`);
          }
        }
      },
      name () {
        return this.$store.state.account.user.name;
      },
      userId () {
        return this.$store.state.account.user.id;
      }
    },
    created () {
      // 监听已读消息
      let _this = this
      eventBus.$on('eventBusName',function(data){
        //消息和通知
        _this.getNewspage();
        _this.getNoticepage();
        //未读消息
        _this.getReadnews();
      });

      this.datetime = getNowDateObjQString('string')
      this.dateInterval()

      //消息和通知
      this.getNewspage();
      this.getNoticepage();
      //未读消息
      this.getReadnews();

      // 初始化WebSocket
      this.initWebSocket();
      this.getWidth()
      // console.log(document.body.clientWidth)
    },
    destroyed () {
      if (this.dateTimer) {
        clearInterval(this.dateTimer)
      }

      // 销毁WebSocket监听
      this.socket.close();
    },
    methods: {
      // 门户跳转
      jumpTo(type){
        if(type === 1){
          const  {href} = this.$router.resolve({path:'/screenLogin'})
          window.open(href, '_blank')
        }else if(type === 2){
          let url =  './dj/index.html?siteId=1&tenant='+ this.tenant
          window.open(url, '_blank')
        }
      },
      //关闭消息
      close(path){
        this.$emit('navclick', this.$store.state.account.routes[5])
        this.$router.replace({path: path})
        this.drawer = false
      },

      //未读消息统计
      getReadnews(){
        let params = {

        }
        getNewsnum(params).then(response => {
          const res = response;
          this.readnews=res.num;
          // if(this.readnews && this.readnews!=0){
          //   this.drawer=true;
          // }

        }).finally(() => {

        });
      },
      //消息和通知弹出
      newshow(){
        this.drawer=true;
      },
      //消息和通知tab切换
      handleClick(tab, e) {
        if(tab.name=='first'){
          this.getNoticepage();

        }else if(tab.name=='second'){
          this.getNewspage();

        }
      },
      //消息分页查询
      getNewspage(){
        let params = {
          current: this.newspageNum,
          model: {

          },
          size: this.newspageSize
        }
        this.loading = true;
        getFrontnews(params).then(response => {
          // console.log('消息数据： '+JSON.stringify(response))
          const res = response;
          this.newstableData=res.records;
          this.newstotal=res.total;


        }).finally(() => {
          this.loading = false;
        });

      },
      //通知分页查询
      getNoticepage(){
        let params = {
          current: this.noticepageNum,
          model: {

          },
          size: this.noticepageSize
        }
        this.loading = true;
        getFrontnotice(params).then(response => {
          // console.log('通知数据： '+JSON.stringify(response))
          const res = response;
          this.noticetableData=res.records;
          this.noticetotal=res.total;


        }).finally(() => {
          this.loading = false;

        });

      },
      //消息已读
      openDetail(list){
        let ids=[];
        ids.push(list.receiveId);
        let params = {
          receiveIds:ids
        }
        getFrontreaded(params).then(response => {
          const res = response;
          this.newsvisible = true;
          this.viewData=list;
          this.getReadnews();
        }).finally(() => {

        });
      },
      // 关闭消息详情弹窗
      newscancel() {
        this.newsvisible = false;
        this.viewData='';
        this.getNewspage();
      },
      // 通知详情
      opennoticeDetail(list){
        this.noticevisible = true;
        this.noticeData=list;


      },
      // 关闭通知详情弹窗
      noticecancel() {
        this.noticevisible = false;
        this.noticeData='';
        this.getNoticepage();
      },


      // 时间定时刷新
      dateInterval () {
        this.dateTimer = setInterval(() => {
          this.datetime = getNowDateObjQString('string')
        }, 1000)
      },
      logout () {
        this.clean();
      },
      clean () {
        db.clear();
        location.reload();
      },

      // 初始化socket
      initWebSocket: function () {
          if (typeof (WebSocket) === "undefined") {
              console.log("您的浏览器不支持socket")
          } else {
              // 实例化socket
              if(db.get("USER").djOrg && db.get("USER").djOrg.id){
                  this.ws_url += db.get("USER").djOrg.id;
              }
              if(db.get("USER").id){
                  this.ws_url += ("-" + db.get("USER").id);
              }
              this.socket = new WebSocket(this.ws_url)
              // 监听socket连接
              this.socket.onopen = this.open
              // 监听socket错误信息
              this.socket.onerror = this.error
              // 监听socket消息
              this.socket.onmessage = this.getMessage
              // 断开监听socket消息
              this.socket.onclose = this.closeWs
          }
      },
      open: function () {
          //console.log("ws连接成功")
      },
      error: function () {
          //console.log("连接错误")
      },
      getMessage: function (msg) {
          this.newspageNum = 1;
          this.newspageSize = 10;
          this.getReadnews();
          this.getNewspage();
      },
      send: function () {
          this.socket.send()
      },
      closeWs: function () {
          //console.log("ws成功关闭")
      },

      // 设置菜单图片class
      addClass(item){
        if(item && item.meta){
          return 'iconfont ' + item.meta.icon;
        }
        return 'iconfont ';
      },

      // 一级菜单点击事件
      routerClick(item){
        this.$emit('navclick', item);
      },
      getWidth() {
        var winWidth;
        if(window.innerWidth) {
          winWidth = window.innerWidth;
        } else if((document.body) && (document.body.clientWidth)) {
          winWidth = document.body.clientWidth;
        }
        // console.log(winWidth);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 68px;
    line-height: 68px;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ED3C3C;
    color: #ffffff;
    z-index: 2000;
    min-width: 1360px;
  }

  .left-main {
    display: flex;
    float: left;
    align-items: center;
    margin-left: 24px;

    > i {
      width: 36px;
      height: 36px;
      margin-right: 18px;
      line-height: 36px;
      color:#FFDE00
    }

    > span {
      font-weight: bold;
      font-size: 20px;
    }
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 68px;
    font-size: 14px;
    color: #F9E1E1;
    padding-right: 30px;
    width: calc(100% - 950px);
    max-width: 690px;

    &:focus {
      outline: none;
    }

    .menu-back {
      cursor: pointer;
      margin: 0 31px;
      display: flex;
      align-items: center;

      > img {
        width: 22px;
        height: 19px;
        margin-right: 6px;
      }
    }
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #fff;

    .user-avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
      border-radius: 50%;
    }

    .user-icon {
      margin-left: 4px;
      width: 14px;
      height: 14px;
    }
  }

  .right-menu-item {
    display: inline-block;
    float: right;
    height: 100%;
    font-size: 18px;
    color: #ffffff;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .color-white {
    color: white;
  }
  .font-size {
    font-size: 30px;
  }



  /*消息*/
  .news{
    position:relative;
  }

  .newsNum{
    display:block;
    position:absolute;
    left:18px;
    top:-5px;
    min-width:16px;
    height:16px;
    padding:0 2px;
    background: #FFB03A;
    border-radius: 16px;
    font-style: normal;
    font-size: 12px;
    font-weight: 400;
    color:#fff;
    text-align:center;
    line-height:18px;
  }

  /*右侧消息样式*/
  /deep/ .v-modal{
    top:68px;
  }
  /deep/ .el-dialog__wrapper{
    top:68px;
  }
  /deep/ .el-drawer{
    background: #F2F2F2;

  }
  /deep/ .el-drawer__container{
    height:100%;
  }
  .drawer /deep/ .el-drawer__header{
    display:none;
  }
  .drawer /deep/ .el-drawer__body{
    position:relative;
  }
  .drawer /deep/ .el-tabs__header{
    padding:0 0;
    position:absolute;
    top:0;
    left:0;
    width:100%;

  }
  .drawer /deep/ .el-tabs__header .el-tabs__nav{
    height:54px;
  }
  .drawer /deep/ .el-tabs__header .el-tabs__item{
    height:54px;
    line-height:54px;
    font-size: 20px;
    font-weight: bold;
  }
  .drawer /deep/ .el-tabs__content{
    margin-top:54px;
    margin-bottom:40px;
  }
  .newscontent{
    height:calc(100vh - 94px);
    overflow: auto;
    padding-bottom: 70px;
  }
  .newsul{
    padding:0;
    margin:0;
    list-style:none;
    padding:10px 10px;
    padding-bottom:0;
  }
  .newsul li{
    list-style:none;
    background:#fff;
    border-radius:2px;
    margin-bottom:10px;
    padding:14px 0;
  }
  .newsul li:hover{
    cursor: pointer;
  }
  .newsul li .newtitle{
    border-bottom:1px solid #F2F2F2;
    padding:0 16px 10px 16px;
  }
  .newsul li .newtitle h2{
    padding:0;
    margin:0;
    font-size: 16px;
    line-height: 21px;
    font-weight: 400;
    color: #333333;
    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

  }
  /*.newsul li .newtxt{*/
  /*  font-size: 12px;*/
  /*  font-weight: 400;*/
  /*  line-height: 20px;*/
  /*  color: #666666;*/
  /*  word-break: break-all;*/
  /*  padding:10px 16px 0 16px;*/
  /*  text-overflow: -o-ellipsis-lastline;*/
  /*  overflow: hidden;*/
  /*  text-overflow: ellipsis;*/
  /*  display: -webkit-box;*/
  /*  -webkit-line-clamp: 4;*/
  /*  line-clamp: 4;*/
  /*  -webkit-box-orient: vertical;*/
  /*}*/
  .newsul li .newtxt{
    font-size: 12px ;
    font-weight: 400;
    color: #666666;
    word-break: break-all;
    padding:10px 16px 0 16px;
    overflow:hidden; /*超出的部分隐藏起来。*/
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    line-height: 20px;
    height: 90px;
  /*white-space:nowrap;*//*不显示的地方用省略号...代替*/
    padding-right:7px; /*文字距离右侧7像素。*/
    text-overflow:ellipsis;/* 支持 IE */
    -o-text-overflow: ellipsis;    /* 支持 Opera */
  }
  .newsul li .newtxt /deep/ span {
    font-size: 12px !important;
    font-weight: 400;
    color: #666666;
    line-height: 20px;
  }
  /*.newsul li .newtxt a:after{*/
  /*  content:"...";*/
  /*  position: absolute;*/
  /*  right: 3px;*/
  /*  top: 30px;*/
  /*}!* 支持 Firefox *!*/
  .newsul li .newdetail{
    padding:12px 16px 0 16px;
    display:flex;
    justify-content: space-between;
    align-items:center;

  }
  .newsul li .newdetail .newtime{
    font-size: 12px;
    color: #999999;
  }

  .newsul li .newdetail .newarrow{
    font-size: 12px;
    color: #BBBBBB;
    line-height:1.5;
  }
  .newsul li .newdetail .newarrow i{
    font-style: normal;
    /*margin-left:5px;*/
  }

  .newsfooter{
    position:absolute;
    bottom:68px;
    left:0;
    width:100%;
    padding:12px 10px;
    line-height:15px;
    background:#f2f2f2;
  }
  .newsfooter img{
    display:inline-block;
    vertical-align: middle;
  }
  .newsfooter .txt{
    width:calc(100% - 40px);
    display:inline-block;
    vertical-align: middle;
    font-size: 12px;
    font-weight: 400;
    color: #3D9EFF;

  }
  .newsfooter .righticon{
    display:inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #3D9EFF;
  }

  .newsfooter:hover {
    cursor: pointer;
  }

  /*已读消息置灰*/
  .gradColor{
    color:#999!important;
  }

  .bc{
    position: fixed;
    z-index:2050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000;
  }

  .newstcContent{
    width:1000px;
    line-height:1;
    height:auto;
    position:fixed;
    top:0;
    left:0;
    right:0;
    margin:0 auto;
    z-index:2051;
    margin-top:15vh;
    background:#fff;
    padding-bottom:66px;
  }
  .txtContent{
    max-height:70vh;
    overflow-y:auto;
  }
  .Contenttitle{
    padding:12px 20px;
    background:#F3F3F3;
    line-height:1;
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .tctitle{
    font-size: 20px;
    color: #333333;
  }
  .close{
    font-size: 20px;
    color: #666666;

  }

  .detail-box{
    margin: 10px 20px;
  }
  .detail-box span {
    font-size: 16px;
    color: #999999;
  }
  .card-box-title{
    text-align: left;
    font-weight: bold;
    font-size: 22px;
    color: #333;
    padding: 16px 0 16px 0;
  }
  .detail-contant{
    margin: -14px 20px 20px 20px;
    font-size: 20px;
    font-weight: 400;
    line-height: 46px;
    color: #555555;
    word-break: break-all;
  }

  .inlineBlock {
    display: inline-block;
    line-height: 20px;
  }

  .spacing-right {
    margin-right: 20px;
  }

  .spacing-back{
    padding: 7px;
  }
  .spacing-back:hover {
    background-color: #ef5c5c;
    border-radius: 10%;
  }



  .actived {
    background-color: #C22121;
    //opacity: 0.2;
    border-bottom: 3px solid #FFDE00;
    text-align: center;
  }

  .left-menu{
    display: flex;
    align-items: center;
    float: left;
    height: 100%;
    line-height: 68px;
    font-size: 16px;
    color: #F9E1E1;
    padding-right: 30px;
    cursor: pointer;
    /*width: calc(100% - 853px);*/
    /*width: calc(100% - 930px);*/
    width: 870px;

    &:focus {
      outline: none;
    }
    @media screen and (max-width: 1850px){
      width:690px;
      padding-right: 10px;
    }
    .left-item {
      display: flex;
      margin: 0 auto;
      overflow: hidden;
      height: 100%;
      text-align: center
    }
  }

  .left-menu-item {
    height: 100%;
    font-size: 16px;
    line-height: 30px;
    color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    vertical-align: text-bottom;
    position: relative;

    &:hover {
      background-color: #C22121;
      //opacity: 0.2;
      border-bottom: 3px solid #FFDE00;
    }
    @media screen and (max-width: 1850px){
      padding-left: 8px;
      padding-right: 8px;
    }
    img {
      position: absolute;
      left: 50%;
      margin-left: -7px;
      top: 50%;
      margin-top: -17px;
    }
    span {
      height: 30px;
      position: relative;
      height: 100%;
      display:-webkit-box;
      　　-webkit-box-orient:vertical;
      　　-webkit-box-clamp:1;
      　　overflow:hidden;
    }
  }

</style>
