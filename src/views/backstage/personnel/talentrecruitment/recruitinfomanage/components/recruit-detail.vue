<template>
  <div class="org-detail" v-cloak v-loading="loading">
    <div class="artContent pd-20" style="margin-bottom:80px;">
      <h2 class="title">{{list.title}}</h2>
      <div class="contentDiv">
        <div class="dateRouter">
          <span  :title="list.publishOrg">发布单位： {{list.publishOrg}}</span>
        </div>
        <span class="printer">发布日期：{{list.publishDate}}</span>
      </div>
      <div class="core" v-if="list.content!='' && list.content!=undefined && list.content!=null && list.content!='null'" v-html="list.content">

      </div>
      <div class="core" v-else>
        暂无内容
      </div>
      <div class="address-box">
        <div class="address-box-title">
          报名地址：
        </div>
        <div class="address-box-content" @click="open(list.address)">
          {{list.address}}
        </div>
      </div>

    </div>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="back()">返回</el-button>
    </div>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getRecruitDetail} from "@/api/backstage/personnel/talentrecruitment/recruitinfomanage/recruitinfomanage.js"

  export default {
    name: "recruit-detail",
    components: {

    },
    props: {
      params: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        loading:true,
        // list:'',//详情数据
        list:{},//详情数据
        // fileList:[],//附件
      }
    },
    activated(){
      this.list = {}
      this.getDetail();
    },
    mounted(){
      this.getDetail();
      // this.getFile();
    },
    methods: {
      //获取详情
      getDetail() {
        let params = {
          id: this.params.id
        }
        getRecruitDetail(params).then(response => {
          const res = response;
          this.list = res;
        }).finally(() => {
          this.loading = false;
        });
      },

      //返回
      back() {
        this.$emit('handleSwitch', {name: 'Index'})
      },
      //打开网址
      open(url) {
        window.open(url)
      }
    }
  }
</script>

<style scoped>
  .artContent{
    height:auto;
    min-height: calc(100vh - 152px);
    position:relative;
  }
  .title{
    font-size: 37px;
    font-weight: bold;
    color: #333333;
    text-align:center;
    word-break: break-word;
    white-space: pre-wrap;
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
    display:block;
    width:calc(100% - 350px);
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
  }

  .printer{
    display:block;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    width: 350px;
    text-align: right;

  }
  .core{
    padding-top:10px;
    /*font-size: 20px;*/
    /*font-weight: 400;*/
    /*line-height: 50px;*/
    /*color: #555555;*/
    word-break: break-all;
    overflow:hidden;
  }
  .address-box{
    /*position:absolute;*/
    /*bottom:0px;*/
    margin-top:40px;
    cursor: pointer;
  }
  .address-box-title{
    font-size: 20px;
    font-weight: 400;
    color: #999999;
  }
  .address-box-content{
    font-size: 20px;
    font-weight: 400;
    line-height:50px;
    color: #3D9EFF;
  }
  .fexid-clas{
    text-align: center;
    z-index: 6;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 1;
    margin-left: -20px;
  }
</style>
