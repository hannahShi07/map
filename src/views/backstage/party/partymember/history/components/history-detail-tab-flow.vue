<template>
  <div class="flow">
    <div class="flow-tip">
      <div class="flow-tip-item" @click="changeProcess(0)">
        <div class="tip-item-top" :class="{'color-top1' : this.listTime.length>=1}">
          <span>1</span>
          <span>申请入党阶段</span>
        </div>
        <div class="tip-item-content">
          <p>1、递交入党申请书</p>
          <p>2、党组织派人谈话</p>
        </div>

        <div class="tip-item-round" :class="{'color-bottom1' : this.listTime.length>=1}"></div>
        <div class="time" v-if="this.listTime.length>=1">{{listTime[0]}}</div>
      </div>

      <div class="flow-tip-item" @click="changeProcess(1)">
        <div class="tip-item-top" :class="{'color-top2' : this.listTime.length>=2}">
          <span>2</span>
          <span>积极分子阶段</span>
        </div>
        <div class="tip-item-content">
          <p>3、推荐和确定入党积极分子</p>
          <p>4、上级党委备案</p>
          <p>5、指定培养联系人</p>
          <p>6、培养考察教育</p>
        </div>

        <div class="tip-item-round" :class="{'color-bottom2' : this.listTime.length>=2}"></div>
        <div class="time" v-if="this.listTime.length>=2">{{listTime[1]}}</div>
      </div>

      <div class="flow-tip-item" @click="changeProcess(2)">
        <div class="tip-item-top" :class="{'color-top3' : this.listTime.length>=3}">
          <span>3</span>
          <span>发展对象阶段</span>
        </div>
        <div class="tip-item-content">
          <p>7、确定发展对象</p>
          <p>8、报上级党组织备案</p>
          <p>9、确定入党介绍人</p>
          <p>10、进行政治审查</p>
          <p>11、开展集中培训</p>
        </div>

        <div class="tip-item-round" :class="{'color-bottom3' : this.listTime.length>=3}"></div>
        <div class="time" v-if="this.listTime.length>=3">{{listTime[2]}}</div>
      </div>

      <div class="flow-tip-item" @click="changeProcess(3)">
        <div class="tip-item-top" :class="{'color-top4' : this.listTime.length>=4}">
          <span>4</span>
          <span>预备党员阶段</span>
        </div>
        <div class="tip-item-content">
          <p>12、支部委员会审查</p>
          <p>13、上级党委预审</p>
          <p>14、填写入党志愿书</p>
          <p>15、支部大会讨论</p>
          <p>16、上级党委派人谈话</p>
          <p>17、上级党委审批</p>
          <p>18、再上一级党委组织部门备案</p>
        </div>

        <div class="tip-item-round" :class="{'color-bottom4' : this.listTime.length>=4}"></div>
        <div class="time" v-if="this.listTime.length>=4">{{listTime[3]}}</div>
      </div>

      <div class="flow-tip-item" @click="changeProcess(4)">
        <div class="tip-item-top" :class="{'color-top5' : this.listTime.length>=5}">
          <span>5</span>
          <span>转正阶段</span>
        </div>
        <div class="tip-item-content">
          <p>19、编入党支部和党小组</p>
          <p>20、入党宣誓</p>
          <p>21、继续教育考察</p>
          <p>22、提出转正申请</p>
          <p>23、支部大会讨论</p>
          <p>24、上级党委审批</p>
          <p>25、材料归档</p>
        </div>

        <div class="tip-item-round" :class="{'color-bottom5' : this.listTime.length>=5}"></div>
        <div class="time" v-if="this.listTime.length>=5">{{listTime[4]}}</div>
      </div>

    </div>
    <div class="flow-line"></div>
  </div>
</template>

<script>
  import {getDetailProcess} from "@/api/backstage/party/basic/history/history.js";
  export default {
    name: 'HistoryDetailTabFlow',
    components:{

    },
    props: {
      params: {
        type: Object,
        default: {}
      },
      id:{
        type: String,
        default: ''
      }
    },
    data () {
      return {
        memberId:'',//党员id
        listTime:[],//时间数组
      }
    },
    created () {
      //this.memberId=this.params.memberId;//党员id-流动党员id
      // this.memberId=this.params.id//党员id-历史人员库和党员管理
      if (this.id != null && this.id != '' && this.id != undefined) {
        this.memberId = this.id
        this.getBaseProcess();
      }else{
        this.listTime.length = 5
      }
    },
    watch:{
      // params:{
      //   handler(newV) {
      //   	if (newV != null && newV != '' && newV != undefined) {
      //   		// this.memberId = newV.memberId;//党员id-流动党员id
      //       this.memberId = newV.id;//党员id-历史人员库和党员管理
      //       this.getBaseProcess();
      //   	}
      //   },
      //   deep: true
      // },
      id:{
        handler(newV) {
          if (newV != null && newV != '' && newV != undefined) {
            // this.memberId = newV.memberId;//党员id-流动党员id
            this.memberId = newV;//党员id-历史人员库和党员管理
            this.getBaseProcess();
          }else{
            this.listTime.length = 5
          }
        },
        deep: true
      }
    },
    methods: {
      // 点击事件
      changeProcess(val){
        this.$emit("changePro",val)
      },
      //发展流程接口
      getBaseProcess(){
        let data = {
          id:this.memberId//流动党员id
        }
        //党员发展过程
        getDetailProcess(data).then(respone => {
          //console.log('过程： '+JSON.stringify(respone))
          const res = respone
          this.listTime=res

        }).finally(() =>{

        })

      },
    }

  }
</script>

<style lang="scss" scoped>
  .color-top1{
    background: linear-gradient(180deg, #FAC14E 0%, #FFAD03 100%)!important;
  }
  .color-bottom1{
    background: linear-gradient(180deg, #FAC14E 0%, #FFAD03 100%)!important;
  }
  .color-top2{
    background: linear-gradient(180deg, #FAAA4E 0%, #FF9216 100%)!important;
  }
  .color-bottom2{
    background: linear-gradient(180deg, #FAAA4E 0%, #FF9216 100%)!important;
  }
  .color-top3{
    background: linear-gradient(180deg, #FA994E 0%, #FF8626 100%)!important;
  }
  .color-bottom3{
    background: linear-gradient(180deg, #FA994E 0%, #FF8626 100%)!important;
  }
  .color-top4{
    background: linear-gradient(180deg, #FA824E 0%, #FF7033 100%)!important;
  }
  .color-bottom4{
    background: linear-gradient(180deg, #FA824E 0%, #FF7033 100%)!important;
  }
  .color-top5{
    background: linear-gradient(180deg, #FA6B4E 0%, #FF4D27 100%)!important;
  }
  .color-bottom5{
    background: linear-gradient(180deg, #FA6B4E 0%, #FF4D27 100%)!important;
  }
  .time{
    position: absolute;
    bottom: -98px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .flow {
    background: #fff;
    /*padding: 50px 110px 85px;*/
    padding:0px 32px 60px;
  }

  .flow-tip {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flow-tip-item {
    position: relative;
    width: 246px;
    height: 457px;
    background: #fff;
    box-shadow: 0 16px 14px rgba(0, 0, 0, 0.08);

    &:before {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-right: 20px solid transparent;
      border-left: 20px solid transparent;
      border-top: 20px solid #fff;
    }
  }

  .tip-item-round {
    position: absolute;
    bottom: -74px;
    left: 50%;
    transform: translateX(-50%);
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background:#ccc;

    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      background: #FFFFFF;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .tip-item-top {
    padding-left: 20px;
    height: 89px;
    border-radius: 10px 10px 0 0;
    background:#ccc;

    span:first-child {
      font-size: 58px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 89px;
    }

    span:last-child {
      font-size: 22px;
      font-weight: bold;
      line-height: 80px;
      color: #FFFFFF;
      vertical-align: super;

    }
  }

  .tip-item-content {
    font-size: 16px;
    color: #555555;
    padding: 0 26px;
    height: 368px;
    overflow: hidden;
    overflow-y: auto;

    p {
      line-height: 30px;
    }
  }

  .flow-line {
    margin: 53px 43px 0;
    height: 14px;
    background: #EEEEEE;
    border-radius: 235px;
  }
</style>
