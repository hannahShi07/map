<template>
  <div class="history">
      <!-- 条件盒子 -->
      <div :class="show ? 'page-search-box-bc1':'page-search-box-bc'">
        <div class="page-search-box">
          <base-label-box label="媒体类型">
            <el-select
              v-model="sourceType"
              multiple
              collapse-tags
              style="width: 350px"
              @change="sourceTypeselect"
              placeholder="请选择">
              <el-option
                v-for="item in sourceTypelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </base-label-box>

          <base-label-box label="倾向性">
            <el-select
              v-model="orientaion"
              multiple
              collapse-tags
              style="width: 350px"
              @change="orienTationselect"
              placeholder="请选择">
              <el-option
                v-for="item in orienTationlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </base-label-box>

          <base-label-box label="字段选择">
            <el-select
              v-model="type"
              multiple
              collapse-tags
              style="width: 350px"
              @change="typeselect"
              placeholder="请选择">
              <el-option
                v-for="item in typelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </base-label-box>

          <base-label-box  class='publishbox' label="发布时间">
            <el-select
              v-model="publishTime"
              style="width: 350px"
              @change="publishTimeselect"
              placeholder="请选择">
              <el-option
                v-for="item in publishTimelist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              v-if="show"
              v-model="timelist"
              style="width: 475px"
              type="datetimerange"
              range-separator=" ~ "
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="selectRange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </base-label-box>

          <base-label-box label="排序">
<!--            <el-select-->
<!--              v-model="value2"-->
<!--              multiple-->
<!--              collapse-tags-->
<!--              style="width: 350px"-->
<!--              placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-cascader
              style="width:350px"
              v-model="order"
              :options="orderlist"
              placeholder="请选择"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange">
            </el-cascader>
          </base-label-box>

          <base-label-box label="是否去重">
            <el-select
              v-model="p2"
              style="width: 350px"
              @change="repeatselect"
              placeholder="请选择">
              <el-option
                v-for="item in repeatlist"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </base-label-box>

      </div>

      <div class="search-box">
        <el-input placeholder="请输入政策关键词查询,多个空格隔开" v-model="keyword" @keyup.enter.native="editBtn(1)" >
          <i slot="suffix" class="el-input__icon el-icon-search" @click="editBtn(1)"></i>
        </el-input>
      </div>

      </div>


      <div class="mr-20 ml-20 mp-70" v-cloak>
        <span class="news-warn">已为您找到 <i>{{total}}</i> 条数据</span>
        <ul class="news-ul" v-loading="loading" v-if="tableData!='' && tableData!=undefined && tableData!=null && tableData!='null' && tableData.length>0">
          <li class="news-ul-li"  v-for="(item,index) in tableData" @click="editBtn(2,item)">
            <div class="news-title">
              <span class="news-title-logo" :class="item.orientaion == 1 ? 'color1':(item.orientaion != 2 ? '':'color2')">{{getOrient(item.orientaion)}}</span>
              <h2 class="news-title-txt">{{item.title}}</h2>
            </div>
            <div class="news-content">
              {{item.content}}
            </div>
            <div class="news-footer">
              <span class="news-footer-txt">
                <i class="iconfont icon-shijian"></i> {{isEmpty(item,'publishTime')}}
              </span>
              <span class="news-footer-txt">
                <i class="iconfont icon-laiyuan"></i> {{isEmpty(item,'webName')}}
              </span>
              <span class="news-footer-txt">
                {{item.sourcePlace}}
              </span>
              <span class="news-footer-txt">
                <i class="iconfont icon-yuanchuang"></i> {{getp2(item.p2)}}
              </span>
            </div>
          </li>

        </ul>
        <!-- 空数据样式 -->
        <base-table-empty v-else slot="empty"/>


        <base-pagination :total="total" :pageNum.sync="pageNo" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>

  </div>
</template>

<script>
  import NewsOptionDetail from "./newsOption-detail"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {newsPage} from "@/api/backstage/consulting/enterprise/newsOption/newsOption.js"

  export default {
    name: "index",
    components: {
      NewsOptionDetail

    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNo: 1,
        pageSize: 10,
        total: 0,
        tableData:[{}],
        userOrgcode:'',//登录人信息

        timelist:[],//自定义时间
        nowdatetime:new Date(),
        scrollId: "",
        sourceTypelist:[//所有的媒体类型
          {
            label:'新闻',
            value:'01'
          },
          {
            label:'论坛',
            value:'02'
          },
          {
            label:'博客',
            value:'03'
          },
          {
            label:'微博',
            value:'04'
          },
          {
            label:'平媒',
            value:'05'
          },
          {
            label:'微信',
            value:'06'
          },
          {
            label:'视频',
            value:'07'
          },
          {
            label:'长微博',
            value:'08'
          },
          {
            label:'APP',
            value:'09'
          },
          {
            label:'评论',
            value:'10'
          },
          {
            label:'其他',
            value:'99'
          }

        ],
        orienTationlist:[//所有倾向性1:正面 2:负面 3:中性 4:争议
          {
            label:'正面',
            value:'1'
          },
          {
            label:'负面',
            value:'2'
          },
          {
            label:'中性',
            value:'3'
          },
          {
            label:'争议',
            value:'4'
          }
        ],
        typelist:[
          {
            label:'内容',
            value:'content'
          },
          {
            label:'标题',
            value:'title'
          }
        ],
        orderlist:[
          {
            value: 'publishTime',
            label: '发布时间',
            children: [
              {
                value: 'desc',
                label: '降序'
              },
              {
                value: 'asc',
                label: '升序'
              },
            ]
          },
          {
            value: 'visit',
            label: '点击数',
            children: [
              {
                value: 'desc',
                label: '降序'
              },
              {
                value: 'asc',
                label: '升序'
              },
            ]
          },
          {
            value: 'reply',
            label: '回复数',
            children: [
              {
                value: 'desc',
                label: '降序'
              },
              {
                value: 'asc',
                label: '升序'
              },
            ]
          },

        ],
        repeatlist:[
          {
            value: 'repeat',
            label: '不去重'
          },
          {
            value: '0',
            label: '去重'
          },
        ],
        publishTimelist:[
          {
            value: '1',
            label: '当天'
          },
          {
            value: '2',
            label: '最近24小时'
          },
          {
            value: '3',
            label: '最近两天'
          },
          {
            value: '4',
            label: '最近7天'
          },
          {
            value: '5',
            label: '最近30天'
          },
          {
            value: '6',
            label: '最近60天'
          },
          {
            value: '7',
            label: '最近90天'
          },
          {
            value: '8',
            label: '自定义'
          }
        ],
        keyword:'',//关键词
        sourceType:["01","02","03","04","05","06","07","08","09","10","99"],//媒体类型
        orientaion:["1","2","3","4"],//倾向性
        publishTime:'7',//发布时间
        type:["content","title"],//字段选择
        order:["publishTime","desc"],//排序
        sortOrder:'',//单选,排序方式（1:回复数 2:发布时间 3:点击数）
        orderAd:'',//单选,排序方式（1:升序 2:降序）
        p2:"0",//是否去重
        show:false,//自定义时间是否出现



      }
    },
    mounted() {
      this.getUser();
      this.pageChange ();

    },
    methods: {

      //获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.userOrgcode=res.data.orgCode

        })
      },
      //时间格式补零
      zeroFill(i){
        if (i >= 0 && i <= 9) {
          return "0" + i;
        } else {
          return i;
        }
      },
      //获取当前时间 格式：yyyy-MM-dd HH:MM:SS
      getCurrentTime(datetime) {
        let date =datetime ;//当前时间
        let month = this.zeroFill(date.getMonth() + 1);//月
        let day = this.zeroFill(date.getDate());//日
        let hour = this.zeroFill(date.getHours());//时
        let minute = this.zeroFill(date.getMinutes());//分
        let second = this.zeroFill(date.getSeconds());//秒

        //当前时间
        let curTime = date.getFullYear() + "-" + month + "-" + day
          + " " + hour + ":" + minute + ":" + second;

        return curTime;
      },
      //时间戳转化成时间
      timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
        let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
        let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
        let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
        let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
        return Y+M+D+h+m+s;
      },
      //分页调取接口数据
      pageChange () {
        //参数数组转化成字符串
        let sourceTypestr='';
        let orienTationstr='';
        let typestr='';
        let pushtimestr='';

        if(this.sourceType!='' && this.sourceType!=undefined && this.sourceType!=null && this.sourceType!='null' && this.sourceType.length>0){
          sourceTypestr=this.sourceType.join(' ');
        }else{

        }
        if(this.orientaion!='' && this.orientaion!=undefined && this.orientaion!=null && this.orientaion!='null' && this.orientaion.length>0){
          orienTationstr=this.orientaion.join(' ');
        }else{

        }
        if(this.type!='' && this.type!=undefined && this.type!=null && this.type!='null' && this.type.length>0){
          typestr=this.type.join(' ');
        }else{

        }
        if(this.order!='' && this.order!=undefined && this.order!=null && this.order!='null' && this.order.length>0){
          this.sortOrder=this.order[0];
          this.orderAd=this.order[1];
        }else{

        }

        //处理发布时间
        if(this.publishTime=='1'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let nowdate1=nowdate.substring(0,10)
          nowdate1=nowdate1+' '+'00:00:00'
          pushtimestr=nowdate1+" ~ "+nowdate;

        }else if(this.publishTime=='2'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 24;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='3'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 48;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='4'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 24*7;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='5'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 24*30;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='6'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 24*60;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='7'){
          let nowdate=this.getCurrentTime(this.nowdatetime);
          let str1=new Date(nowdate).getTime();
          let str2=str1-3600 * 1000 * 24*90;
          let str3=this.timestampToTime(str2);

          pushtimestr=str3+" ~ "+nowdate;
        }else if(this.publishTime=='8'){
          pushtimestr=this.timelist[0]+" ~ "+this.timelist[1];

        }

        let params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          sourceType:sourceTypestr,
          orientaion:orienTationstr,
          publishTime:pushtimestr,
          type:typestr,
          sortOrder:this.sortOrder,
          orderAd:this.orderAd,
          p2:this.p2,
          keyword:this.keyword,
          scrollId:this.scrollId
        }

        this.loading = true;
        newsPage(params).then(response => {
          //console.log('shuju; '+JSON.stringify(response))
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              this.scrollId=res.data.data.scrollId
              if(res.data.data.list!='' && res.data.data.list!=undefined && res.data.data.list!=null && res.data.data.list!='null' && res.data.data.list.length>0){
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                for(let i=0;i<this.tableData.length;i++){
                  this.tableData[i].publishTime=this.getCurrentTime(new Date(this.tableData[i].publishTime));
                }
              }else{
                this.tableData = [];
                this.total = 0;

              }
            }else{
              this.scrollId=''
              this.tableData = [];
              this.total = 0;

            }
          }else{
            this.scrollId=''
            this.tableData = [];
            this.total = 0;
          }


        }).finally(() => {
          this.loading = false;
        });

      },


      sourceTypeselect(val){
        this.editBtn(1)
      },
      orienTationselect(val){
        this.editBtn(1)
      },
      publishTimeselect(val){
        let time=this.getCurrentTime(this.nowdatetime)
        if(val=='8'){
          this.show=true;
          this.timelist=[time,time]
        }else{
          this.show=false;
          this.timelist=[time,time]
        }
        this.editBtn(1)
      },
      selectRange(val){
        this.editBtn(1)
      },
      typeselect(val){
        this.editBtn(1)
      },
      handleChange(val){
        console.log('val: '+JSON.stringify(val))
        this.editBtn(1)
      },
      repeatselect(val){
        this.editBtn(1)
      },



      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1://查询
            this.pageNo=1;
            this.pageChange()
            break
          case 2://详情

            this.$emit('handleSwitch', {name: 'NewsOptionDetail', params: row})
            break

        }
      },
      getOrient(val){
        if(val==1){
          return '正面'
        }else if(val==2){
          return '负面'
        }else if(val==3){
          return '中性'
        }else if(val==4){
          return '争议'
        }
      },
      getp2(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          if(val==0){
            return '原创'
          }else if(val==1){
            return '转发'
          }
        }else{
          return '--'
        }

      },

    },

  }
</script>

<style lang="scss" scoped>
  .party {
    height: 100%;
    background: #eee;
  }
  .page-search-box-bc{
    width:100%;
    height:auto;
    background:url('../../../../../../assets/page/icon-bc.png') top left/100% auto no-repeat;
  }
  .page-search-box-bc1{
    width:100%;
    height:auto;
    background:url('../../../../../../assets/page/icon-bc1.png') top left/100% auto no-repeat;
  }

  .page-search-box{
    width:100%;
    height:auto;
    border-bottom:none;
    padding-top:25px;
    padding-bottom:45px;

  }
  .mp-70{
    margin-top:70px;
  }
  /* 按钮禁用*/
   .color-grad{
     pointer-events: none!important;
     cursor: default!important;
     color:#999!important;
   }
   .search-box{
     margin-top:-35px;
     display:flex;
     justify-content: center;
   }
  .search-box /deep/ .el-input{
    width:65%;
  }
  .search-box /deep/ .el-input__inner {
    border-radius: 28px !important;
    background: #FFFFFF;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.13);
  }
  //.el-select /deep/ .el-input__inner::placeholder {
  //  color:#666;
  //}
  .news-warn{
    display:block;
    font-size: 12px;
    color: #666666;
    padding-left:20px;
  }
  .news-warn i{
    font-style:normal;
    font-size: 16px;
    font-weight: bold;
    color: #ED3C3C;
  }
  .news-ul{
    margin-top:15px;
    list-style: none;
    padding:0 0;

  }
  .news-ul li{
    padding:15px 20px;
    background:#FBFBFB;
    margin-bottom:30px;
    cursor: pointer;
  }
  .news-title{
    margin-bottom:13px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .news-title-logo{
    padding:1px 7px;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    background: #9E9E9E;
    border-radius: 8px;
    margin-right:10px;
  }
  .news-title h2{
    width:calc(100% - 50px);
    margin:0 0;
    padding:0 0;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
    color: #333333;
    word-break: break-all;
    word-wrap:break-word;

  }
  .news-content{
    text-indent:2em;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap:break-word;
  }
  .news-footer{
    margin-top:15px;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .news-footer-txt{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    color: #999999;
    margin-right:30px;
  }
  .news-footer-txt i{
    font-style:normal;
    font-size:12px;
    margin-right:8px;
  }
  .color1{
    background:#92CB1F;
  }
  .color2{
    background:#ED3C3C;
  }


</style>
