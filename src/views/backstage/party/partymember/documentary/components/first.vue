<template>
  <div class="bg-fff mt-20 pt-20 pb-20">
    <div class="text">
      <div class="title">1、递交入党申请书</div>
      <div class="content">
        条件：年满十八岁的中国工人、农民、军人、知识分子和其他社会阶层的先进分子，
        承认党的纲领和章程，愿意参加党的一个组织并在其中积极工作、执行党的决议和按期交纳党费。
      </div>
      <div class="content">
        要求：向工作、学习所在单位党组织提出入党申请；没有工作、学习单位或工作、学习单位未建立党组织的，
        向居住地党组织提出入党申请；流动人员还可以向单位所在地党组织或单位主管部门党组织、流动党员党组织提出入党申请。
      </div>
      <div class="content warn">
        注意：本人提出；书面申请。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('1.1.doc','入党申请书模板.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>1.1 入党申请书模板</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>

        <div @click="download('1.2.doc','入党申请书撰写说明.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>1.2 入党申请书撰写说明</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>

      </div>
    </div>

    <div class="text">
      <div class="title">2.党组织派人谈话</div>
      <div class="content">
        时间：收到入党申请书1个月内。
      </div>
      <div class="content">
        主体：党支部书记、副书记或组织委员。
      </div>
      <div class="content ">
        内容：了解入党申请人基本情况；介绍入党条件和程序；加强教育引导。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('2.1.doc','同入党申请人XX同志的谈话记录模板1_谈话人填写.doc')">
          <div class="content-file" >
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>2.1 同入党申请人XX同志的谈话记录模板1_谈话人填写</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: "First",
    methods:{
      download(fileName,name){
        let url = `${process.env.VUE_APP_IP_URL_PORT}/file/template/party/devmemberfile/` + fileName
        // let url = 'http://192.168.0.39:10000/file/template/party/devmemberfile/' + fileName
        commonReq.downloadFile(url,name)
      }
    }
  }
</script>

<style scoped>
  .text {
    margin: 0 24px 24px 24px;
  }
  .title{
    width: 100%;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 21px;
    color: #666666;
    opacity: 1;
    margin-bottom: 12px;
  }
  .content {
    width: 100%;
    background-color: #FFFFFF;
    color: #666666;
    opacity: 1;
    margin-bottom: 12px;
  }
  .warn{
    color: #ED3C3C;
  }
  .color-sure {
    color: #333333;
  }
  .content-file {
    width:auto;
    display:inline-block !important;
    display:inline;
    height: 32px;
    line-height: 18px;
    background-color: #F9F9F9;
    border-radius: 4px;
    color: #999999;
    font-size: 14px;
    margin-top: 10px;
    padding: 7px 11px;
    cursor: pointer;
  }
  .down {
    color: #3D9EFF;
  }

</style>
