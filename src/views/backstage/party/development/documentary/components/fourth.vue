<template>
  <div class="bg-fff mt-20 pt-20 pb-20">
    <div class="text">
      <div class="title">12.支部委员会审查</div>
      <div class="content">
        要求：征求党员和群众意见；对发展对象进行严格审查；集体讨论是否合格。
      </div>
      <div @click="download('12.1.doc','关于拟接收×××同志为预备党员的公示.doc')">
        <div class="content-file">
          <i class="iconfont  icon-wenjianbiaoshi"/>
          <span>12.1 关于拟接收×××同志为预备党员的公示(网友提供)</span>
          <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
        </div>
      </div>
      <div @click="download('12.2.doc','关于发展对象×××的综合审查报告_党支部撰写.doc')">
        <div class="content-file">
          <i class="iconfont  icon-wenjianbiaoshi"/>
          <span>12.2 关于发展对象×××的综合审查报告_党支部撰写(网友提供)</span>
          <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">13.上级党委预审</div>
      <div class="content">
        方式：发展对象的条件、培养教育情况等；根据需要听取执纪执法等相关部门的意见。
      </div>
      <div class="content">
        要求：审查结果以书面形式通知党支部，并向审查合格的发展对象发放《中国共产党入党志愿书》。
      </div>
      <div class="content">
        注意：发展对象未来三个月内将离开工作、学习单位的，一般不办理接收预备党员的手续。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('13.1.doc','关于对×××同志进行预审的请示_党支部填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>13.1 关于对×××同志进行预审的请示_党支部填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('13.2.doc','关于对×××同志的预审意见_党委填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>13.2 关于对×××同志的预审意见_党委填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">14.填写入党志愿书</div>
      <div class="content">
        要求：在入党介绍人指导下，由本人按照要求如实填写
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('14.1.doc','中国共产党入党志愿书_个人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>14.1 中国共产党入党志愿书_个人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">15.支部大会讨论</div>
      <div class="content">
        程序：发展对象汇报对党的认识、入党动机、本人履历、家庭和主要社会关系情况，
        以及需向党组织说明的问题；入党介绍人介绍发展对象有关情况，并对其能否入党表明意见；支部委员会报告对发展对象的审查情况；与会党员对发展对象能否入党进行充分讨论，
        并采取无记名投票方式进行表决。
      </div>
      <div class="content">
        注意：有表决权的到会人数必须超过应到会有表决权人数的半数，才能开会；赞成人数超过应到会有表决权的正式党员的半数，才能通过接收预备党员的决议。
        因故不能到会的有表决权的正式党员，在支部大会召开前正式向党支部提出书面意见的，应当统计在票数
        内。支部大会讨论两个以上的发展对象入党时，必须逐个讨论和表决。
      </div>
      <div class="content">
        要求：政治审查必须严肃认真、实事求是，注重本人的一贯表现。审查情况应当形成结论性材料。
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
      <div class="title">16.上级党委派人谈话</div>
      <div class="content">
        时间：党委审批前。
      </div>
      <div class="content">
        人员：党委委员或组织员。
      </div>
      <div class="content">
        目的：作进一步的了解，并帮助发展对象提高对党的认识。
      </div>
      <div class="content">
        要求：谈话人应当将谈话情况和自己对发展对象能否入党的意见，如实填写在《中国共产党入党志愿书》上，并向党委汇报。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('16.1.doc','上级党组织派专人进行谈话情况和对申请人入党的意见_谈话人填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>16.1 上级党组织派专人进行谈话情况和对申请人入党的意见_谈话人填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">17.上级党委审批</div>
      <div class="content">
        内容：是否具备党员条件、入党手续是否完备。
      </div>
      <div class="content">
        要求：集体讨论和表决。两个以上的发展对象，应当逐个审议和表决。
      </div>
      <div class="content">
        时间：对党支部上报的接收预备党员的决议，应当三个月内审批，并报上级党委组织部门备案。特殊情况可适当延长，不得超过六个月。
      </div>
      <div class="content">
        注意：党总支、乡镇（街道）所属的基层党委以及党组不能审批预备党员。除另有规定外，临时党组织不能接收、审批预备党员。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('17.1.doc','基层党委审批意见参考模板_党委填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>17.1 基层党委审批意见参考模板_党委填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
        <div @click="download('17.2.doc','批准入党通知书参考模板_党委填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>17.2 批准入党通知书参考模板_党委填写(网友提供)</span>
            <i class="iconfont  icon-xiangxiaxiazaijiantou down"/>
          </div>
        </div>
      </div>
    </div>

    <div class="text">
      <div class="title">18.再上一级党委组织部门备案</div>
      <div class="content">
        目的：掌握预备党员结构、分布、质量等情况，发现问题，及时解决。
      </div>
      <div>
        <div>材料填写及模板下载</div>
        <div @click="download('18.1.doc','关于将×××同志进行预备党员备案的报告参考模板_党支部填写.doc')">
          <div class="content-file">
            <i class="iconfont  icon-wenjianbiaoshi"/>
            <span>18.1 关于将×××同志进行预备党员备案的报告参考模板_党支部填写(网友提供)</span>
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
    name: "fourth",
    data(){
      return {
        //第 15 个
        list:[
          {
            key:"",
            data:"15.1 发展预备党员公示_组织填写(网友提供)",
            name:"15.1.docx",
            fileName:'发展预备党员公示_组织填写.docx'
          },
          {
            key:"",
            data:"15.2 讨论接收预备党员支部大会主持词(网友提供)",
            name:"15.2.doc",
            fileName:'讨论接收预备党员支部大会主持词.doc'
          },
          {
            key:"",
            data:"15.3 接收新党员表决票参考模板(网友提供)",
            name:"15.3.docx",
            fileName:'接收新党员表决票参考模板.docx'
          },
          {
            key:"",
            data:"15.4 未到会的正式党员提交的书面表决意见_未到会党员填写(网友提供)",
            name:"15.4.docx",
            fileName:'未到会的正式党员提交的书面表决意见_未到会党员填写.docx'
          },
          {
            key:"",
            data:"15.5 接收新党员表决汇总情况参考样式1_党支部填写(网友提供)",
            name:"15.5.docx",
            fileName:'接收新党员表决汇总情况参考样式1_党支部填写.docx'
          },
          {
            key:"",
            data:"15.6 接收新党员表决汇总情况参考样式2_党支部填写(网友提供)",
            name:"15.6.docx",
            fileName:'接收新党员表决汇总情况参考样式2_党支部填写.docx'
          },
          {
            key:"",
            data:"15.7 支部大会讨论接收预备党员记录_记录人填写(网友提供)",
            name:"15.7.docx",
            fileName:'支部大会讨论接收预备党员记录_记录人填写.docx'
          },
          {
            key:"",
            data:"15.8 支部大会通过接收申请人为预备党员的决议_党支部填写(网友提供)",
            name:"15.8.doc",
            fileName:'支部大会通过接收申请人为预备党员的决议_党支部填写.doc'
          },
          {
            key:"",
            data:"15.9 总支部审查（审批）意见参考模板_总支部填写(网友提供)",
            name:"15.9.doc",
            fileName:'总支部审查（审批）意见参考模板_总支部填写.doc'
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
