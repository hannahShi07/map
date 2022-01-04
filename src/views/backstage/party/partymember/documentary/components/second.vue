<template>
  <div class="bg-fff mt-20 pt-20 pb-20">
    <div class="text">
      <div class="title">3.推荐和确定入党积极分子</div>
      <div class="content">
        范围：已递交入党志愿书且党组织已派人谈话的人员。
      </div>
      <div class="content">
        方式：采取党员推荐、群团组织推优等方式产生人选。
      </div>
      <div class="content ">
        决定：支部委员会（不设支部委员会的由支部大会）研究决定。
      </div>
      <div class="content ">
        注意：综合运用推荐结果，防止简单以票取人。
      </div>

      <div>
        <div>材料填写及模板下载</div>
        <div v-for="(item ,index) in list" @click="download(item.name,item.fileName)">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>{{item.data}}</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">4.上级党委备案</div>
      <div class="content">
        材料：入党申请人基本情况；推荐和推优情况；支部委员会意见等。
      </div>
      <div class="content">
        要求：了解入党积极分子是否具备条件；手续是否齐全。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('4.1.doc','关于将×××同志进行入党积极分子备案的报告_党支部填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>4.1 关于将×××同志进行入党积极分子备案的报告_党支部填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('4.2.doc','入党积极分子备案表_党支部填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>4.2 入党积极分子备案表_党支部填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">5.指定培养联系人</div>
      <div class="content">
        数量：一至两名正式党员。
      </div>
      <div class="content">
        任务：向入党积极分子介绍党的基本知识；了解入党积极分子的政治觉悟、道德品质、
        现实表现和家庭情况等，做好培养教育工作，引导入党积极分子端正入党动机；及时向
        党支部汇报入党积极分子情况；向党支部提出能否将入党积极分子列为发展对象的意见。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('5.1.doc','培养联系人资格审查表_党支部填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>5.1 培养联系人资格审查表_党支部填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">6.培养考察教育</div>
      <div class="content">
        方法：吸收入党积极分子听党课、参加党内有关活动、分配一定的社会工作以及集中培训等。
      </div>
      <div class="content">
        目的：使入党积极分子懂得党的性质、纲领、宗旨、组织原则和纪律，懂得党员的义务和权利，帮助他们端正入党动机，确立为共产主义事业奋斗终身的信念。
      </div>
      <div class="content">
        要求：党支部每半年对入党积极分子进行1次考察；基层党委每年对入党积极分子队伍状况作1次分析。
      </div>
      <div class="content">
        注意：入党积极分子工作、学习所在单位（居住地）变动，应及时报告原单位（居住地）党组织；原单位（居住地）党组织应及时将培养教育等有关材料转交现单位
        （居住地）党组织；现单位（居住地）党组织应对有关材料进行认真审查，并接续做好培养教育工作。培养教育时间可连续计算。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('6.1.doc','入党积极分子培养考察登记表_个人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>6.1 入党积极分子培养考察登记表_个人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('6.2.doc','每季度思想汇报撰写要求.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>6.2 每季度思想汇报撰写要求(网友提供)</span>
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
    name: "second",
    data(){
      return {
        list:[
          {
            key:"",
            data:"3.1 入党申请人基本情况模板_支委会填写(网友提供)",
            name:'3.1.doc',
            fileName:'入党申请人基本情况模板_支委会填写.doc'
          },
          {
            key:"",
            data:"3.2 入党积极分子人选推荐",
            name:'3.2.doc',
            fileName:'入党积极分子人选推荐.doc'
          },
          {
            key:"",
            data:"3.3 入党积极分子人选推荐",
            name:'3.3.doc',
            fileName:'入党积极分子人选推荐.doc'
          },
          {
            key:"",
            data:"3.4 确定入党积极分子票决",
            name:'3.4.doc',
            fileName:'确定入党积极分子票决.doc'
          },
          {
            key:"",
            data:"3.5 关于吸收×××为入党积极分子的决议_党支部填写(网友提供)",
            name:'3.5.doc',
            fileName:'关于吸收×××为入党积极分子的决议_党支部填写.doc'
          },
          {
            key:"",
            data:"3.6 关于确定为入党积极分子的公示参考格式_党支部填写(网友提供)",
            name:'3.6.doc',
            fileName:'关于确定为入党积极分子的公示参考格式_党支部填写.doc'
          },
        ]
      }
    },
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
