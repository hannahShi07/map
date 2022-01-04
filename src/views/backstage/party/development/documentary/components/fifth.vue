<template>
  <div class="bg-fff mt-20 pt-20 pb-20">
    <div class="text">
      <div class="title">19.编入党支部和党小组</div>
      <div class="content">
        要求：及时将上级党委批准的预备党员编入党支部和党小组，对预备党员继续进行教育和考察。
      </div>
    </div>

    <div class="text">
      <div class="title">20.入党宣誓</div>
      <div class="content">
        组织：基层党委或党支部（党总支）组织。
      </div>
      <div class="content">
        程序：奏《国际歌》；党组织负责同志致辞；预备党员宣誓；参加宣誓的预备党员发言；党组织负责同志讲话、提出要求。
      </div>
      <div class="content">
        要求：在正式场合举行；严肃认真；庄重简朴；严密紧凑。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('20.1.doc','入党宣誓主持词参考.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>20.1 入党宣誓主持词参考(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">21.继续教育考察</div>
      <div class="content">
        方式：参加党的组织生活、听个人汇报、个别谈心、集中培训、实践锻炼等。
      </div>
      <div class="content">
        时间：预备期为一年。预备期从支部大会通过其为预备党员之日算起。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('21.1.doc','预备党员考察表参考_个人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>21.1 预备党员考察表参考_个人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">22.提出转正申请</div>
      <div class="content">
        要求：预备期满，书面提出转正申请。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('22.1.doc','转正申请书参考1_个人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>22.1 转正申请书参考1_个人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('22.2.doc','转正申请书参考2_个人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>22.2 转正申请书参考2_个人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">23.支部大会讨论</div>
      <div class="content">
        准备：党小组提出意见；党支部征求党员和群众的意见；支部委员会审查。
      </div>
      <div class="content">
        程序：参照接收预备党员程序。
      </div>
      <div class="content">
        结果：认真履行党员义务、具备党员条件的，应当按期转为正式党员；需要继续考察和教育的，
        可以延长一次预备期，延长时间不能少于半年，最长不超过一年；不履行党员义务、不具备党员条件的，应当取消其预备党员资格。
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
      <div class="title">24.上级党委审批</div>
      <div class="content">
        时间：党支部上报的预备党员转正的决议，应当在三个月内审批。
      </div>
      <div class="content">
        要求：审批结果应及时通知党支部。党支部书记应当同本人谈话，并将审批结果在党员大会上宣布。
      </div>
      <div class="content">
        注意：党龄从预备期满转为正式党员之日算起。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('24.1.doc','预备党员转正通知书_党委填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>24.1 预备党员转正通知书_党委填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('24.2.doc','谈话记录_谈话人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>24.2 谈话记录_谈话人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">25.材料归档</div>
      <div class="content">
        内容：《中国共产党入党志愿书》、入党志愿书、政治审查材料、转正申请书和培养教育考察材料。
      </div>
      <div class="content">
        要求：有人事档案的，交党委存入本人人事档案；无人事档案的，建立党员档案，由所在党委或县级党委组织部门保存。
      </div>
    </div>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: "fifth",
    data(){
      return {
        //第 15 个
        list:[
          {
            key:"",
            data:"23.1 关于拟将×××同志转为中共正式党员的公示模板1(网友提供)",
            name:"23.1.doc",
            fileName:'关于拟将×××同志转为中共正式党员的公示模板1.doc'
          },
          {
            key:"",
            data:"23.2 关于拟将×××同志转为中共正式党员的公示模板2(网友提供)",
            name:"23.2.docx",
            fileName:'关于拟将×××同志转为中共正式党员的公示模板2.docx'
          },
          {
            key:"",
            data:"23.3 ××党支部××党小组关于预备党员×××同志申请转正的意见_党小组长准备(网友提供)",
            name:"23.3.doc",
            fileName:'××党支部××党小组关于预备党员×××同志申请转正的意见_党小组长准备.doc'
          },
          {
            key:"",
            data:"23.4 支委会关于预备党员×××转正的审查报告_党支部撰写(网友提供)",
            name:"23.4.doc",
            fileName:'支委会关于预备党员×××转正的审查报告_党支部撰写.doc'
          },
          {
            key:"",
            data:"23.5 讨论预备党员转正支部大会主持词_党支部准备(网友提供)",
            name:"23.5.doc",
            fileName:'讨论预备党员转正支部大会主持词_党支部准备.doc'
          },
          {
            key:"",
            data:"23.6 预备党员转正表决票参考样式(网友提供)",
            name:"23.6.docx",
            fileName:'预备党员转正表决票参考样式.docx'
          },
          {
            key:"",
            data:"23.7 未到会的正式党员提交的书面表决意见_未到会党员填写(网友提供)",
            name:"23.7.docx",
            fileName:'未到会的正式党员提交的书面表决意见_未到会党员填写.docx'
          },
          {
            key:"",
            data:"23.8 预备党员转正表决汇总情况模板_党支部填写(网友提供)",
            name:"23.8.docx",
            fileName:'预备党员转正表决汇总情况模板_党支部填写.docx'
          },
          {
            key:"",
            data:"23.9 支部大会讨论预备党员转正的记录_党支部撰写(网友提供)",
            name:"23.9.doc",
            fileName:'支部大会讨论预备党员转正的记录_党支部撰写.doc'
          },
          {
            key:"",
            data:"23.10 关于延长预备党员预备期的情况报告_党支部撰写(网友提供)",
            name:"23.10.docx",
            fileName:'关于延长预备党员预备期的情况报告_党支部撰写.docx'
          },
          {
            key:"",
            data:"23.11 取消预备党员资格的谈话记录_谈话人填写(网友提供)",
            name:"23.11.docx",
            fileName:'取消预备党员资格的谈话记录_谈话人填写.docx'
          },
          {
            key:"",
            data:"23.12 取消预备党员资格的综合报告_党支部填写(网友提供)",
            name:"23.12.docx",
            fileName:'取消预备党员资格的综合报告_党支部填写.docx'
          },
          {
            key:"",
            data:"23.13 关于×××同志转为中共正式党员的决议_党支部填写(网友提供)",
            name:"23.13.doc",
            fileName:'关于×××同志转为中共正式党员的决议_党支部填写.doc'
          },
          {
            key:"",
            data:"23.14 关于审批×××同志为中共正式党员的请示_党支部填写(网友提供)",
            name:"23.14.doc",
            fileName:'关于审批×××同志为中共正式党员的请示_党支部填写.doc'
          },
        ]
      }
    },
    methods: {
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
