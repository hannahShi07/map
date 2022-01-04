<template>
  <div class="bg-fff mt-20 pt-20 pb-20">
    <div class="text">
      <div class="title">7.确定发展对象</div>
      <div class="content">
        条件：经过一年以上培养教育和考察、基本具备党员条件的入党积极分子。
      </div>
      <div class="content">
        要求：听取党小组、培养联系人、党员和群众意见。
      </div>
      <div class="content ">
        确定：支部委员会（不设支部委员会的由支部大会）讨论同意并报上级党委备案后可列为发展对象。
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
      <div class="title">8.报上级党委备案</div>
        <div class="content">
          要求：认真审查；提出意见。
        </div>
        <div class="content">
          注意：同意后列为发展对象。
        </div>
        <div>
          <div>材料填写及模板下载</div>
          <div @click="download('8.1.doc','关于同意（不同意）XX同志为发展对象的批复_党支部撰写.doc')">
            <div class="content-file">
              <i class="iconfont  icon-wenjianbiaoshi"/>
              <span>8.1 关于同意（不同意）XX同志为发展对象的批复_党支部撰写(网友提供)</span>
              <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
            </div>
          </div>
        </div>
    </div>

    <div class="text">
      <div class="title">9.确定入党介绍人</div>
        <div class="content">
          数量：两名正式党员。
        </div>
        <div class="content">
          方式：入党介绍人一般由培养联系人担任，也可由党组织指定。
        </div>
        <div class="content">
          要求：入党介绍人认真完成培养教育任务。
        </div>
        <div class="content">
          注意：受留党察看处分、尚未恢复党员权利的党员，不能作入党介绍人。
        </div>
        <div>
          <div>材料填写及模板下载</div>
          <div @click="download('9.1.doc','入党介绍人资格审查表_党支部填写.doc')">
            <div class="content-file">
              <i class="iconfont  icon-wenjianbiaoshi"/>
              <span>9.1 入党介绍人资格审查表_党支部填写(网友提供)</span>
              <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
            </div>
          </div>
        </div>
      </div>

    <div class="text">
      <div class="title">10.进行政治审查</div>
      <div class="content">
        内容：对党的理论和路线、方针、政策的态度；政治历史和在重大政治斗争中的表现；遵纪守法和遵守社会公德情况；直系亲属和与本人关系密切的主要社会关系的政治情况。
      </div>
      <div class="content">
        方法：同本人谈话、查阅有关档案材料、找有关单位和人员了解情况以及必要的函调或外调。对流动人员中的发展对象进行政治审查时，还应当征求其户籍所在地和居住地基层党组织的意见。
      </div>
      <div class="content">
        要求：政治审查必须严肃认真、实事求是，注重本人的一贯表现。审查情况应当形成结论性材料。
      </div>
      <div class="content">
        注意：未经政治审查或政治审查不合格的，不能发展入党。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div v-for="(item ,index) in listTen" @click="download(item.name,item.fileName)">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>{{item.data}}</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">11.开展集中培训</div>
      <div class="content">
        主体：基层党委或县级党委组织部门。
      </div>
      <div class="content">
        时间：不少于三天（或不少于二十四个学时）。
      </div>
      <div class="content">
        注意：未经培训的，除个别特殊情况外，不能发展入党。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('11.1.doc','结业证书_培训单位颁发.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>11.1 结业证书_培训单位颁发(网友提供)</span>
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
    name: "third",
    data(){
      return {
        // 第 1 个
        list:[
          {
            key:"",
            data:"7.1 党内外群众意见座谈会记录_记录人填写(网友提供)",
            name:'7.1.doc',
            fileName:'党内外群众意见座谈会记录_记录人填写.doc'
          },
          {
            key:"",
            data:"7.2 确定发展对象表决票参考样式(网友提供)",
            name:'7.2.docx',
            fileName:'确定发展对象表决票参考样式.docx'
          },
          {
            key:"",
            data:"7.3 关于拟将XX同志确定为发展对象的公示_党支部撰写(网友提供)",
            name:'7.3.docx',
            fileName:'关于拟将XX同志确定为发展对象的公示_党支部撰写.docx'
          },
          {
            key:"",
            data:"7.4 发展对象公示情况登记表_党支部填写(网友提供)",
            name:'7.4.doc',
            fileName:'发展对象公示情况登记表_党支部填写.doc'
          },
        ],
        //第 10 个
        listTen:[
          {
            key:"",
            data:"10.1 自传_个人填写(网友提供)",
            name:'10.1.doc',
            fileName:'自传_个人填写.doc'
          },
          {
            key:"",
            data:"10.2 自传的撰写说明_个人参考(网友提供)",
            name:'10.2.doc',
            fileName:'自传的撰写说明_个人参考.doc'
          },
          {
            key:"",
            data:"10.3 外调证明材料 入党政审专用函 函调回信_组织准备(网友提供)",
            name:'10.3.docx',
            fileName:'外调证明材料 入党政审专用函 函调回信_组织准备.docx'
          },
          {
            key:"",
            data:"10.4 关于王××同志母亲××同志的证明材料参考(网友提供)",
            name:'10.4.doc',
            fileName:'关于王××同志母亲××同志的证明材料参考.doc'
          },
          {
            key:"",
            data:"10.5 关于×××同志政治审查情况的报告_党支部撰写(网友提供)",
            name:'10.5.doc',
            fileName:'关于×××同志政治审查情况的报告_党支部撰写.doc'
          },
          {
            key:"",
            data:"10.6 政治审查材料_审查人填写(网友提供)",
            name:'10.6.docx',
            fileName:'政治审查材料_审查人填写.docx'
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
