<template>
  <div class="wiseDetail" v-loading="loading">
    <div class="wiseContent wiseContent1">
      <div class="artContent pd-20">
        <h2 class="title">{{list.title}}</h2>
        <div class="contentDiv">
          <div class="dateRouter">
            <span>发文日期：{{list.releaseTime | filterEmty}}</span>
          </div>
          <div class="dateRouter">
            <span>发文机关：{{list.source | filterEmty}}</span>
          </div>
          <div class="dateRouter dateRouter1">
<!--            <span class="dateRoutertxt">专题专栏：{{list.policyType | filtertype}}</span>-->
            <span class="share" @click="share(list.sourceUrl)" v-if="list.sourceUrl!='' && list.sourceUrl!=undefined && list.sourceUrl!=null && list.sourceUrl!='null'">分享</span>
          </div>
        </div>

        <div class="core1" v-html="list.richContent" v-if="list.richContent!='' && list.richContent!=undefined && list.richContent!=null && list.richContent!='null'">

        </div>
        <div class="core" v-else>
          暂无内容
        </div>

      </div>
      <!-- 空数据样式 -->
      <base-table-empty v-if="!(list!='' && list!=undefined && list!=null && list!='null')" slot="empty"/>
    </div>

    <div slot="footer" class="text-center">
      <el-button size="medium"  @click="cancel">返回</el-button>
    </div>
  </div>

</template>

<script>
  import {outpolicyHotdetail} from "@/api/backstage/consulting/policyservice/wisepolicy/wisepolicy.js"
  export default {
    name: 'related-detail',
    props: {
      // type: {
      //   type: String,
      //   default: ''
      // },
      params: {
        type: Object,
        default: {}
      }
    },
    data(){
      return{
        loading:false,
        list:'',//相关解读
      }
    },
    mounted(){
      this.outpagepolicyHotdetail();

    },
    methods:{
      //获取解读详情
      outpagepolicyHotdetail(){
        let params = {
          pid:this.params.pid
        }
        this.loading = true;
        outpolicyHotdetail(params).then(response => {
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null' && res.data.code=='200'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              this.list=res.data.data;
            }else{
              this.list='';
            }
          }else{
            this.list='';
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      //分享
      share(url){
        let textArea = document.createElement("textarea");
        document.body.appendChild(textArea);
        textArea.value = url;
        textArea.select();
        document.execCommand("copy"); // 执行浏览器复制命令
        document.body.removeChild(textArea);
        this.$message(this.successTip());


      },
      //返回
      cancel() {
        this.$emit('handleSwitch', {name: 'Index'})
      },
    },
    filters:{
      filterEmty(val){
        if( val == '' || val == undefined || val == null || val == 'null'){
          return '-'
        }else {
          return val
        }
      },
      filtertype(val){
        if( val == '' || val == undefined || val == null || val == 'null'){
          return '-'
        }else {
          if(val.indexOf('|')>-1){
            val=val.substr(1);
            val=val.substring(0,val.length-1);
            val=val.replace(/\|/g,"、")
          }
          return val
        }
      },
      filterTime(val){
        if(val == undefined || val == null || val == '' || val == 'null'){
          return '-'
        }else {
          if(val.length>10){
            val=val.substring(0,10)
          }
          return val
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .wiseDetail{
    background: #eee;
    display: flex;
    justify-content: space-between;

    .wiseContent{
      width: 70%;
    }
    .wiseContent1{
      width: 100%;
    }
    .wiseRight{
      width:calc(100% - 20px - 70%);
      .policyone{
        background: #fff;
        margin-bottom: 20px;
      }
      .wiseLabel{
        padding: 0 20px 20px 20px;
      }
      .wiseLabel li{
        display:inline-block;
        list-style-type:none;
        height: 26px;
        line-height: 26px;
        color:#666666;
        padding:2px 8px;
        font-size:14px;
        background: #F2F2F2;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 10px;

      }
    }

  }
  .artContent{
    height:auto;
    min-height:100vh;
  }
  .title{
    text-align:center;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    line-height: 35px;
    color: #444;
  }
  .contentDiv{
    border-bottom:1px solid #DDDDDD;
    padding-bottom:30px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-top:20px;
    color: #999999;
  }
  .dateRouter{
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }
  .dateRouter1{
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .dateRouter span{
    display:block;
    word-break: break-all;
    word-wrap: break-word;
  }
  .dateRouter span{
    padding-right:40px;
  }
  .dateRoutertxt{
    padding-right:40px;
  }
  .share{
    min-width:65px;
    padding-right:0!important;
  }
  .printer{
    font-size: 16px;
    font-weight: 400;
    color: #999999;

  }
  .contentDiv /deep/ .el-icon-printer:before{
    margin-right:6px;
  }
  .core{
    padding-top:10px;
    font-size: 16px;
    line-height: 50px;
    color: #999;
    margin-bottom: 50px;
    overflow:hidden;
  }
  .core1{
    padding-top:10px;
    margin-bottom: 50px;
    overflow:hidden;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    line-height: 18px;
    color: #999999;
  }
  .text-center {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 20px 0;
    background: #fff;
    left:200px;
    z-index:999;
    overflow:visible;
    box-shadow: 3px -2px 4px rgba(0, 0, 0, 0.11);
  }
  .rigthLife {
    height: 351px;
    overflow-y: auto;
  }
  .rigthLife /deep/ .base-table-empty{
    height:100%;
  }
  .hotSpot{
    height: 80px;
    border-bottom: 1px solid #eee;
  }
  .hotSpot-tit {
    height: 30px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    line-height: 40px;
    color: #444;
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hotSpot-time {
    height: 25px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    line-height: 35px;
    color: #999;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

  }
  .hotSpot-time span:first-of-type{
    min-width:140px;
  }
  .hotSpot-time span:last-of-type{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .share{
    color:#53A0FF;
    cursor: pointer;
  }
  .dateRoutertxt{
    display:inline-block;
    max-width:400px;
  }
</style>
