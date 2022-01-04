<!--当涂党建联盟-组织架构-->
<template>
  <com-background-box :index="1">
    <div class="orgstructure-top">
      <div class="orgstructure-left">
        <div class="orgstructure-left-top">
          <div class="top-bg">
            <img src="@/assets/image/orgstructure/orgstructure-iocn1.png">
            联盟理事会
          </div>
          <div class="top-content">
            <div class="top-item" v-if="councilList && councilList.length>0" v-for="(val,index) in councilList">
<!--              <img :src="val.attachmentURL">-->
              <img :src="val.attachmentURL" v-if="val.attachmentURL">
              <div class="no-data" v-else>
                <img src="@/assets/image/orgstructure/orgstructure-person.png">
              </div>
              <div class="top-content-bottom"><span>{{isEmpty(val,'post.data')}}：</span>{{isEmpty(val,'name')}}</div>
            </div>
            <div class="no-data1" v-if="!councilList || councilList.length<1">
              <img src="@/assets/image/noData/noData.png">
              <div>暂无数据</div>
            </div>
          </div>
        </div>
        <div class="orgstructure-left-bottom">
          <div class="top-bg">
            <img src="@/assets/image/orgstructure/orgstructure-iocn3.png">
            常设机构
          </div>
          <div class="stand-content">
            <div class="stand-left-box">
              <div class="stand-img" v-for="(item,i) in standList">
                <div v-if="standList.length">
                <img :src="item.attachmentURL"  v-if="itemIndex == i">
                </div>
                <div class="no-data" v-else>
                  <img src="@/assets/image/noData/noData.png">
                  <div>暂无数据</div>
                </div>
              </div>
              <div class="stand-right">
                <ul class="right-ul">
                  <li v-for="(item,i) in standList" @click="standChange(i)" :class="{'active':itemIndex == i}">
                    <span class="right-li">{{isEmpty(item,'orgName')}}</span>
                    <div :class="{'line':itemIndex == i}"></div>
                  </li>
                </ul>
                <div class="stand-right-cont" v-for="(item,i) in standList">
                  <el-tooltip v-if="itemIndex == i && item.orgIntro && item.orgIntro.length>90" :content="item.orgIntro" placement="top" effect="light">
                     <span class="stand-right-cont-txt">{{isEmpty(item,'orgIntro')}}</span>
                  </el-tooltip>
                  <span class="stand-right-cont-txt" v-if="itemIndex == i && item.orgIntro && item.orgIntro.length<90 ">{{isEmpty(item,'orgIntro')}}</span>
                  <span class="stand-right-cont-txt" v-if="itemIndex == i && !item.orgIntro">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="orgstructure-right">
        <div class="top-bg">
          <img src="@/assets/image/orgstructure/orgstructure-iocn2.png">
          联盟成员
        </div>
        <div class="content">
          <div class="content-box">
            <el-table
              v-loading="loading"
              :data="tableData"
              :span-method="objectSpanMethod"
              class="table"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','background':'rgba(0, 43, 91, 0.65)','color':'#00BAFF','font-weight':'400'}"
            >
              <el-table-column label="序号" min-width="60" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData[scope.$index],'orderNumber')}}</span>
                </template>
              </el-table-column>
              <el-table-column label="产业分类"  align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData[scope.$index],'industryType.data')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="产业名称" min-width="160" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData[scope.$index],'industryName')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="联系人" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData[scope.$index],'contacts')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="联系方式" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData[scope.$index],'contactWay')}}</span>
                </template>
              </el-table-column>

              <!-- 空数据样式 -->
              <base-dp-table-empty slot="empty"/>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="orgstructure-bottom" >
      <div class="orgstructure-bottom-top">
        <div class="top-bg">
          <img src="@/assets/image/orgstructure/orgstructure-iocn4.png">
          联盟党建联席会
        </div>
        <div class="btn">
          <img :src="currentIndex > 1 ? previousAct : previousDis " class="previous" @click="previous()" />
          <img :src="isNext() ? nextAct : nextDis " class="next" @click="next()" />
        </div>
      </div>
      <div class="orgstructure-bottom-list">
        <div class="new-list" v-for="(item,index) in guideList" v-if="guideList && guideList.length">
          <div class="new-left">
            <div class="news-img">
              <el-carousel trigger="click" class="img-center1" arrow="always"  v-if="item.photoURL && item.photoURL.length">
                <el-carousel-item v-for="(ite,index) in item.photoURL" :key="index">
                  <img class="img-center" :src="ite">
                </el-carousel-item>
              </el-carousel>

              <div class="no-data" v-else>
                <img src="@/assets/image/noData/noData.png">
                <div>暂无数据</div>
              </div>

            </div>

          </div>
          <div class="news-right">
            <!--            <div class="news-item">{{item.cont}}</div>-->
            <div class="news-intro" v-html="item.content"></div>
            <div class="news-time">{{item.createTime | timeDateFormat}}&nbsp;&nbsp;&nbsp;记录人：{{item.userName}}</div>
          </div>
        </div>

        <div class="no-data" v-if="!guideList || !guideList.length">
          <img src="@/assets/image/noData/noData.png">
          <div>暂无数据</div>
        </div>

      </div>
    </div>
  </com-background-box>
</template>

<script>
  import ComBackgroundBox from '@/components/com-background-box'
  import {getUnionData,getInquireData} from '@/api/screen/orgstructure.js'
  import { getMeetingPage, JOINTMEETING } from '@/api/screen/electric.js'
  import BaseDpTableEmpty from '../components/base-dptable-empty/index'
  var num = 0;
  export default {
    name: "orgstructure",
    components: {
      BaseDpTableEmpty,
      ComBackgroundBox
    },

    data(){
      return {
        loading:false,
        show:false,
        tableData: [],
        getNum:new Map(),
        guideList:[],
        standList:[],
        // 每页数据条数
        size: 3,
        // 当前页数
        currentIndex: 1,
        itemIndex:0,//常设机构默认显示第一个
        recoredListlen: 0,
        councilList:[], //联盟理事会
        photoURL:'', //联盟理事会tup
        //  上一页图标 禁用标签
        previousDis: require('@/assets/image/orgstructure/previous-disable.png'),
        //  上一页图标 可用标签
        previousAct: require('@/assets/image/orgstructure/previous-active.png'),
        //  下一页图标 禁用标签
        nextDis: require('@/assets/image/orgstructure/next-disable.png'),
        //  下一页图标 可用标签
        nextAct: require('@/assets/image/orgstructure/next-active.png'),
        colnum:[],// 合并的单元格数组
        pos:0, // 合并的单元格数组下标
        isHeight:false

      }
    },
    mounted(){
      this.toAlliance()
      this.toCouncil()
      this.toTableList()
    },
    methods:{
      // 判断有无下一页
      isNext(){
        if(this.currentIndex < 2){
          return true
        }else {
          return false
        }
      },
      //联盟党建联席会
      toAlliance(){
        let params = {
          size: this.size,
          current: this.currentIndex,
          model: {
            meetingType: {
              key: JOINTMEETING,
              data: ""
            }
          }
        }
        getMeetingPage(params).then(res =>{
          if(res && res.records){
              this.guideList = []
              this.guideList = res.records
          }
        })
      },
      //联盟理事会
      toCouncil(){
        this.loading = true
        let params = {}
        getInquireData(params).then(respone =>{
          const res = respone
          this.councilList = res.council
          this.standList = res.org

        }).finally(() => {
          this.loading = false;

        })
      },
      //联盟会员列表
      toTableList(){
        this.loading = true
        let params = {}
        getUnionData(params).then(respone =>{
          this.tableData = respone
          this.colnum = respone
          this.getSpanArr(this.colnum)

        }).finally(() => {
          this.loading = false;

        })
      },
      // 获取合并的单元格
      getSpanArr(data){
        this.colnum=[]
        if(data == '' || data == undefined || data == null || data == 'null' || data.length<=0){
          return
        }
        for(let i = 0;i < data.length; i++){
          if(i === 0){
            this.colnum.push(1)
            this.pos = 0
          }else{
            if(data[i].industryType.key == data[i-1].industryType.key){
              this.colnum[this.pos] += 1
              this.colnum.push(0)
            }else{
              this.colnum.push(1)
              this.pos = i
            }
          }
        }
      },
      // 合并列表
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 1) {
          const _row = this.colnum[rowIndex]; // 从处理完的数组里获取
          const _col=_row > 0 ? 1 : 0
            return {
              rowspan: _row,// rowspan:单元格可横跨的行数
              colspan: _col // colspan:单元格可横跨的列数
            }
        }
      },
      // 前一页
      previous(){
        if(this.currentIndex > 1){
          this.size = 3
          this.currentIndex--
          this.toAlliance()
        }else {
          this.$message.info("已经在最前方了")
        }
      },
      // 下一页
      next(){
        if(this.currentIndex  < 2){
          this.size = 2
          this.currentIndex++
          this.toAlliance()
        }else {
          this.$message.info("后面没有数据了")
        }
      },
      //常设机构切换点击事件
      standChange(i){
        this.itemIndex = i
      },
      //多行文字超出点击显示
      // toClick(){
      //   this.show = true
      // },
    },
    filters:{
      timeDateFormat : function (msg) {
        //讲字符串转为Date格式
        var mt = new Date(msg);
        //获取年份
        var year = mt.getFullYear();
        //从0开始，获取月份
        var month = (mt.getMonth() + 1).toString().padStart(2,'0');
        //获取天数
        var day = mt.getDay().toString().padStart(2,'0');
        /* if (con === 'yyyy/mm/dd'){
             return year + "/" + month + "/" + day;
         }*/
        //获取小时
        var hh = mt.getHours().toString().padStart(2,'0');
        //获取分钟
        var mm = mt.getMinutes().toString().padStart(2,'0');
        //获取秒
        var ss = mt.getSeconds().toString().padStart(2,'0');

        return year + "年" + month + "月" + day + "日";

      }
    }
  }
</script>

<style scoped lang="scss">
  /* 轮播图样式-底部 */
  .orgstructure-bottom-list ::v-deep .el-carousel__container{
    height: 14.68vh;
    width: 14.66vw;
  }
  /* 轮播图样式-底部 图片横杠长短 */
  .orgstructure-bottom-list ::v-deep .el-carousel__button {
    width: 1.5vh;
    background-color: #1687ff;
  }
  /* 轮播图样式-底部 左右箭头大小 */
  .orgstructure-bottom-list ::v-deep .el-carousel__arrow {
    width: 2vh;
    height: 2vh;
    font-size: 0.625vw;
  }

  /* 轮播图样式-中间轮播图 start */
  .et-center ::v-deep .el-carousel__container{
    height: 49.444444444444vh;
    width: 30.5vw;
  }
  /* 轮播图样式-底部 图片横杠长短 */
  .et-center ::v-deep .el-carousel__button {
    background-color: #1687ff;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /*  轮播图样式 end */
  li{
    list-style:none;
  }
  .active{
    color: #02FFFF;
  }
  .line{
    width: 1.56vw;
    margin: 0 auto;
    height: 0.1vw;
    background: #02FFFF;
  }
  .orgstructure-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.72vw;
    height: 55.46vh;
  }
  .orgstructure-left{

  }
  .orgstructure-left-top {
    width: 39.38vw;
    height: 31.34vh;
    left: 0;
    margin: 0 1.72vw 1.30vw 0;
    /*background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));*/
    background: url("../assets/image/orgstructure/orgstructure-left-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/orgstructure/orgstructure-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }
    .top-content{
      position:relative;
      display: flex;
      justify-content: center;
      align-items: center;
      //margin:1.17vw auto;
      padding-left: 1.5vw;
      width: 100%;
      height:25.34vh;
      overflow-x: auto;
      .top-item{
        width: 7.47vw;
        /*height: 21.39vh;*/
        margin-right:1.17vw;
        img{
          width: 7.24vw;
          height: 16.9vh;
        }
        .top-content-bottom{
          width: 7.24vw;
          height: 4.45vh;
          text-align: center;
          font-size:  0.81vw;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #fff;
          background: rgba(1, 115, 250, 0.2);
          display:table-cell;
          vertical-align:middle;
        }
        .top-content-bottom span{
          font-size: 0.81vw;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #00BAFF;
        }
      }

      .no-data1 {
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate(-50%,-50%);
        text-align: center;
        color:#fff;

        img {
          width: 6vw!important;
          height: 10vh!important;
          margin-bottom: 10px;
          margin-right: 0!important;
        }
        div{
          font-size: 0.78vw;
          color: #fff;
          line-height:0.8;
        }
      }


    }
  }
  .orgstructure-left-bottom{
    width: 39.38vw;
    height:21.94vh;
    left: 0;
    background: url("../assets/image/orgstructure/orgstructure-left-bottombg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/orgstructure/orgstructure-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }
    .stand-content {
      /*display: flex;*/
      /*justify-content: center;*/
      /*align-items: center;*/
      margin: 1.17vw auto;
      .stand-left-box{
        width: 33.15vw;
        height: 12.22vh;
        margin: 0 auto;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        background: linear-gradient(-90deg, rgba(0, 132, 255, 0.11), rgba(0, 132, 255, 0.05));
        .stand-img{
          position: absolute;

          /*暂无数据样式*/
          .no-data {
            position: absolute;
            top:50%;
            left: 50%;
            transform:translate(-50%,-50%);
            text-align: center;
            color:#fff;

            img {
              width: 5vw!important;
              height: 8vh!important;
              margin-bottom: 10px;
              margin-right: 0!important;
            }
            div{
              font-size: 0.78vw;
              color: #fff;
              line-height:0.8;
            }
          }
        }
        .stand-img img{
          width: 11.82vw;
          height: 11.85vh;
          margin-right: 1.06vw;
        }
      }
      .stand-right{
        /*width: calc(100% - 11.82vw);*/
        .right-ul{
          width: 25.65vw;
          height: 4.45vh;
          line-height: 4.45vh;
          margin-left: 7.5vw;
          display: flex;
          /*justify-content: flex-end;*/
          justify-content: center;
          /*padding-right: 4vw;*/
          background: linear-gradient(-90deg, rgba(0, 132, 255, 0.16), rgba(0, 132, 255, 0.05));
          font-size: 0.78vw;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #FFFFFF;
          .right-li{
            padding: 1.5vw;
          }
        }
        .stand-right-cont{
          font-size: 0.62vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 0.94vw;
          width: calc(100% - 12.82vw);
          //height:5vh;
          text-indent: 1rem;
          float: right;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          cursor: pointer;
        }
        .stand-right-cont span{
          display:block;
          height:auto;
        }
      }
    }
  }
  .orgstructure-right {
    width: 54.95vw;
    height: 55.46vh;
    right: 0;
    background: url('../assets/image/orgstructure/orgstructure-right-bg.png') no-repeat;
    background-size: 100% 100%;

    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/orgstructure/orgstructure-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;
      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }
    .content {
      flex-direction: column;
      justify-content: center;
      height: 45.74vh;
      margin: 1vw 3.31vw;
      width:48.33vw;
      background:rgba(0,0,0,0);
      .content-box {
        height: 45.74vh;
        width:100%;
        position: relative;
      }
    }

  }

  .orgstructure-bottom {
    position: relative;
    height: 26.8vh;
    width: 95.92vw;
    right: 0;
    background: url('../assets/image/orgstructure/orgstructure-right-bg.png') no-repeat;
    background-size: 100% 100%;
    .orgstructure-bottom-top {
      display: flex;
      justify-content: space-between;
    }
    .top-bg {
      height: 6vh;
      line-height: 6vh;
      width: 23.15vw;
      background: url('../assets/image/orgstructure/orgstructure-bg.png') no-repeat;
      background-size: 100% 100%;
      font-size: 0.9375vw;
      font-family: Microsoft YaHei;
      color: #FFFFFF;

      img {
        height: 2.12vh;
        margin-left: 1.15vw;
        margin-right: 0.525vw;
        vertical-align: middle;
      }
    }
    .btn {
      height: 3.75vh;
      line-height: 3.75vh;
      padding-right:3.15vw ;
      margin-top: 1.2vh;

      .previous{
        width: 1.85vw;
        height: 3.75vh;
        cursor: pointer;
      }
      .next{
        width: 1.85vw;
        height: 3.75vh;
        margin-left: 22px;
        cursor: pointer;
      }
    }
    /* 轮播图样式 start */
    ::v-deep .el-carousel__container{
      height: 14.68vh;
      width: 14.66vw;
    }
    .orgstructure-bottom-list {
      display: flex;
      justify-content: left;
      margin:1.04vw 2.08vw;
      overflow: hidden;
      .new-list{
        width: 39.63vw;
        height: 17.04vh;
        background: linear-gradient(-90deg, rgba(0, 132, 255, 0.11), rgba(0, 132, 255, 0.05));
        display: flex;
        justify-content: space-between;
        margin-right: 1.07vw;
        padding: 0.65vw 1.30vw 0.65vw 0.65vw;

        .new-left img{
          width: 14.66vw;
          height: 14.68vh;
          margin-right:1.41vw;
        }
        .img-center {
          margin-right:1.41vw;
          width: 14.66vw;
          height: 14.68vh;
          vertical-align: middle;
        }
        .news-right{
          width: 21.54vw;
          font-size: 0.63vw;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 1.09vw;
          margin-left:1.41vw;
          word-wrap: break-word;
          .news-intro{
            text-indent: 1rem;
            min-height: 12vh;
          }
          .news-time{
            text-align: right;
          }
        }
      }

      /*暂无数据样式*/
      .no-data {
        position: absolute;
        top:50%;
        left: 50%;
        transform:translate(-50%,-50%);
        text-align: center;
        color:#fff;

        img {
          width: 6vw!important;
          height: 10vh!important;
          margin-bottom: 10px;
          margin-right: 0!important;
        }
        div{
          font-size: 0.78vw;
          color: #fff;
          line-height:0.8;
        }
      }

    }
  }

  .news-img {
    position: relative;
    width: 14.66vw;
    height: 14.68vh;
    font-size: 0.78125vw;

    .no-data {
      position: absolute;
      top:50%;
      left: 50%;
      transform:translate(-50%,-50%);
      text-align: center;

      img {
        width: 8vw!important;
        height: 12vh!important;
        margin-bottom: 1vh;
        margin-right: 0!important;
      }
    }
  }

  /*图表样式*/
  ::v-deep .el-table{
    background:rgba(0,0,0,0);
    border: 0;
  }
  ::v-deep .el-loading-mask{
    background:rgba(0,0,0,0);
  }
  ::v-deep .el-table tr{
    background:none;
  }
  ::v-deep .el-table tr th{
    padding:1.0vh 0;
    border-bottom: 0;
    word-break: break-all;
    font-size: 0.78vw;
    font-weight: 400;
    color: #00BAFF;
  }
  //.party-bottom-left-table ::v-deep .el-table tr td{
  //  background:rgba(0, 34, 72, 0.35);
  //}
  //.party-bottom-right-table ::v-deep .el-table tr td{
  //  background:rgba(0, 34, 72, 0.35);
  //
  //}

  ::v-deep .el-table tr td{
    border-bottom:0;
    color: #FFFFFF;
    font-size:0.78vw;
    opacity: 0.8;
    padding:1.15vh 0;
  }
  ::v-deep .el-table .el-table__header-wrapper th{
    height:auto;
  }
  //::v-deep .el-table .cell{
  //  white-space: pre-wrap;
  //  word-break: break-all;
  //
  //}
  ::v-deep .el-table tr th .cell{
    line-height:1.5;
  }
  ::v-deep .el-table tr td .cell{
    line-height:1.5;
  }
  ::v-deep .el-table tr{
    border-bottom:none;
  }
  ::v-deep .el-table td{
    border-bottom:none;
  }
  ::v-deep .el-table--enable-row-hover .el-table__body tr:hover td {
    background-color: rgba(0, 0, 0, 0);
  }
  ::v-deep .el-table::before{
    height:0;
  }
  .content-box ::v-deep .el-table .el-table__body-wrapper{
    height: 40vh;
    overflow-y:auto;
  }

  /* 设置滚动条的样式 */
  ::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar {
    width:0.32vw;
    border:none;
  }
  /* 滚动槽 */
  ::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar-track {
    width: 0.32vw;
    height: 45.74vh;
    background: rgba(68, 123, 187, 0.34);
    border-radius: 0.21vw;
    border:none;
  }
  /* 滚动条滑块 */
  ::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
    width: 0.32vw;
    background: rgba(145, 177, 215, 0.34);
    border-radius: 0.32vw;
    border:none;
  }
</style>

