<!--搜索结果-->
<template>
  <div class="result" v-loading="loading">
    <div class="wise-seach">
      <div class="wise-top">
<!--        <div class="wise-select">-->
<!--          <el-select v-model="inputtype" slot="prepend" placeholder="请选择" @change="selectTab" :disabled="true">-->
<!--            <el-option label="区外11" value="1"></el-option>-->
<!--            <el-option label="区内" value="2"></el-option>-->
<!--          </el-select>-->
<!--        </div>-->
        <el-input v-model="inputtxt" placeholder="请输入政策关键词查询">
          <i @click="search" slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer"></i>
        </el-input>
        <div class="preciseMatch" v-if="buttonShow" style="padding-left: 20px;"  @click="editBtn(1)">
          <img src="@/assets/page/precise.png" width="19" height="16" style="position: absolute;margin-top: 43px;margin-left: 22px;">
          <el-button>高级匹配</el-button>
        </div>
      </div>
    </div>
    <div class="s-result">
      <img src="@/assets/page/search.png" width="22" height="22"/>
      共为您查到<span style="color: #ED3C3C">{{total}}</span>条<span v-if="input!='' && input!=undefined && input!=null && input!='null'">与<span style="color: #ED3C3C">“{{input}}”</span></span>相关的政策
    </div>
    <div v-if="t!=4">
      <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.labs.data+' '+item.sizes" :key="index+''" :name="index+''" v-for="(item,index) in lefttype">
          <div class="result-content" v-loading="loading">
            <div class="result-item" v-for="(items,index1) in inlist" v-if="(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" @click="editBtn(2,items)">
              <div class="result-item-top">
                <span>{{items.title}}</span>
                <p>{{items.releaseTime | filterTime}}</p>
              </div>
<!--              <div v-if="type=='2'" class="result-item-bot" v-html="getActive(items.straightMatter)"></div>-->
<!--              <div class="result-item-bot">-->
<!--                <span title="外交部发言人赵立坚4日在例行记者会上说场">-->
<!--                  外交部发言人赵立坚4日在例行记者会上说-->
<!--                  ，中方对国际上各方理解支持中方涉港有关立场和行动表示赞赏，敦促个别国家摒弃意识形态偏见，摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务-->
<!--                </span>>-->
<!--              </div>-->
            </div>

            <!-- 空数据样式 -->
            <base-table-empty v-if="!(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" slot="empty"/>

          </div>

          <base-pagination v-if="total>pageSize" :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

        </el-tab-pane>

      </el-tabs>
    </div>
    <!-- 热点解读 -->
    <div v-if="t==4">
      <div class="result-content" v-loading="loading">
        <div class="result-item" v-for="(items,index1) in inlist" v-if="(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" @click="editBtn(5,items)">
          <div class="result-item-top">
            <span>{{items.title}}111</span>
            <p>{{items.releaseTime | filterTime}}</p>
          </div>
<!--          <div class="result-item-bot" v-html="getActive(items.content)"></div>-->
          <!--              <div class="result-item-bot">-->
          <!--                <span title="外交部发言人赵立坚4日在例行记者会上说场">-->
          <!--                  外交部发言人赵立坚4日在例行记者会上说-->
          <!--                  ，中方对国际上各方理解支持中方涉港有关立场和行动表示赞赏，敦促个别国家摒弃意识形态偏见，摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务-->
          <!--                </span>>-->
          <!--              </div>-->
        </div>

        <!-- 空数据样式 -->
        <base-table-empty v-if="!(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" slot="empty"/>

      </div>

      <base-pagination v-if="total>pageSize" :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pagepolicyHot"/>
    </div>
  </div>
</template>

<script>
import {
  outpolicyList,outpolicyHot
} from "@/api/backstage/consulting/policyservice/wisepolicy/wisepolicy.js"


  export default {
    name: 'search-results',
    props: {
      // params: {
      //   type: Object,
      //   default: {}
      // },
      t: {//4：是热点解读
        type: Number,
        default: 0
      },
      tabName: {//首页推荐政策进来对应切换项
        type: String,
        default: ''
      },
      // type: {//区外或者区内
      //   type: String,
      //   default: ''
      // },
      input: {//普通搜索的搜索框关键字
        type: String,
        default: ''
      },
      tabindex: {//普通搜索的政策类型
        type: String,
        default: ''
      },
      buttonShow: {//高级筛选按钮是否出现
        type: Boolean,
        default: true
      },


    },
    data(){
      return{
        activeName:'0',
        loading:true,// 加载遮罩控制条件
        // inputtype:'',
        inputtxt:'',
        bigLabel:'',//标签
        tabPosition: 'left',
        lefttype:[],//左侧政策栏统计
        inlist:[],//区内数据
        outlist:'',//区外数据
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//最新政策总条数
        policyListData: [],//区外智慧政策列表数据
        policyTypetxt:'',
        policyType:[//区外政策类型
          {
            "labs":{
              "key":"1",
              "data":"最新政策"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"2",
              "data":"市场监督"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"3",
              "data":"科技创新"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"4",
              "data":"金融政策"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"5",
              "data":"资金扶持"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"6",
              "data":"税收慧免"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"7",
              "data":"人才扶持"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"8",
              "data":"资质认证"
            },
            "sizes":0
          }

        ],

      }
    },
    mounted(){
      // if(this.type!='' && this.type!=undefined && this.type!=null && this.type!='null'){
      //   this.inputtype=this.type;
      // }

      if(this.input!='' && this.input!=undefined && this.input!=null && this.input!='null'){
        this.inputtxt=this.input;
      }

      // if(this.type=='1'){//区外
        if(this.t==4){//区外热点解读
          this.pagepolicyHot ()
        }else{//区外政策查询
          this.lefttype=[];
          this.policyListData=[];
          this.outpagepolicyList0();
          this.outpagepolicyList1();
          this.outpagepolicyList2();
          this.outpagepolicyList3();
          this.outpagepolicyList4();
          this.outpagepolicyList5();
          this.outpagepolicyList6();
          this.outpagepolicyList7();

          this.lefttype=this.policyType;

          if(this.tabindex!='' && this.tabindex!=undefined && this.tabindex!=null && this.tabindex!='null'){
            this.activeName=this.tabindex;
          }else{
            if(this.tabName!='' && this.tabName!=undefined && this.tabName!=null && this.tabName!='null'){
              for(let i=0;i<this.lefttype.length;i++){
                if(this.lefttype[i].labs.data==this.tabName){
                  this.activeName=i.toString();
                }
              }
            }
          }

          this.outpagepolicyList(this.activeName);
        }
      // }else if(this.type=='2'){//区内
      //   this.pagepolicyLeft();//左侧政策类型
      //
      //
      // }

    },
    methods:{
      //tab切换点击
      handleClick(tab) {
        this.pageNum=1;
        // if(this.type=='1'){//区外
          if(this.t==4){
            this.pagepolicyHot ()
          }else{
            this.outpagepolicyList(tab.name);
          }


        // }else if(this.type=='2'){//区内
        //   this.bigLabel=this.lefttype[tab.name].labs.key
        //   if(this.lefttype[tab.name].labs.key=='2430837861936128060'){
        //     this.bigLabel=''
        //   }
        //   this.pagepolicyList();
        // }

      },
      //选择区外、区内
      // selectTab(val){
      //   if(val=='1'){//区外
      //     this.type='1';
      //     this.pageNum=1;
      //     // this.activeName='0'
      //     if(this.t==4){
      //       this.pagepolicyHot ()
      //     }else{
      //       this.outpagepolicyList(this.activeName);
      //     }
      //
      //
      //   }else if(val=='2'){//区内
      //     this.type='2';
      //     this.pageNum=1;
      //     this.pagepolicyLeft();//左侧政策类型
      //     this.pagepolicyList();//最新政策
      //   }
      // },
      //点击搜索
      search() {
        this.pageNum = 1;
        // if(this.type=='1'){
          if(this.t==4){
            this.pagepolicyHot ()
          }else{
            this.outpagepolicyList(this.activeName);
          }

        // }else if(this.type=='2'){
        //   this.pagepolicyLeft();
        //   // this.pagepolicyList();//最新政策
        // }

      },
      //区内左侧政策栏统计
      // pagepolicyLeft(){
      //   this.lefttype=[]
      //   let params = {
      //     bigLabel:this.bigLabel,
      //     inBody:this.inputtxt,
      //     area:'',
      //     outBody:'',
      //     pubTimeIn:'',
      //     pubTimeOut:''
      //   }
      //   this.loading = true;
      //   inpolicyListtype(params).then(response => {
      //     const res = response;
      //     for(let i=0;i<res.length;i++){
      //       if(res[i].labs.key=='2430837861936128060'){//最新政策
      //         this.lefttype.unshift(res[i])
      //       }
      //       if(res[i].labs.key=='2430837861936128095'){//科技创新
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2430837861936128084'){//市场监督
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085599'){//金融政策
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085600'){//资金扶持
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085601'){//税收慧免
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085602'){//人才扶持
      //         this.lefttype.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085603'){//资质认证
      //         this.lefttype.push(res[i])
      //       }
      //
      //     }
      //
      //
      //     if(this.tabindex!='' && this.tabindex!=undefined && this.tabindex!=null && this.tabindex!='null'){
      //       this.bigLabel=this.lefttype[this.tabindex].labs.key
      //       if(this.bigLabel=='2430837861936128060'){
      //           this.bigLabel=''
      //       }
      //       this.activeName=this.tabindex;
      //     }else{
      //       if(this.tabName!='' && this.tabName!=undefined && this.tabName!=null && this.tabName!='null'){
      //         for(let i=0;i<this.lefttype.length;i++){
      //           if(this.lefttype[i].labs.data==this.tabName){
      //             this.activeName=i.toString();
      //           }
      //         }
      //
      //       }
      //       this.bigLabel=this.lefttype[this.activeName].labs.key
      //       if(this.bigLabel=='2430837861936128060'){
      //         this.bigLabel=''
      //       }
      //     }
      //
      //     this.pagepolicyList();//最新政策
      //
      //   }).finally(() => {
      //     this.loading = false;
      //   });
      // },
      //区内查询
      // pagepolicyList(){
      //   let params = {
      //     current:this.pageNum,
      //     model:{
      //       bigLabel:this.bigLabel,
      //       inBody:this.inputtxt,
      //       area:'',
      //       outBody:'',
      //       pubTimeIn:'',
      //       pubTimeOut:''
      //     },
      //     size:this.pageSize
      //
      //   }
      //   this.loading = true;
      //   inpolicyList(params).then(response => {
      //     const res = response;
      //     this.inlist=res.records;
      //     this.total=res.total
      //
      //   }).finally(() => {
      //     this.loading = false;
      //   });
      // },
      // 区外根据类型查询智慧政策
      outpagepolicyList0(){
        this.outpagepolicyList (0)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList1(){

        this.outpagepolicyList (1)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList2(){

        this.outpagepolicyList (2)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList3(){

        this.outpagepolicyList (3)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList4(){

        this.outpagepolicyList (4)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList5(){

        this.outpagepolicyList (5)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList6(){

        this.outpagepolicyList (6)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList7(){

        this.outpagepolicyList (7)
        this.policyListData.push(this.outlist);
      },

      //区外查询
      outpagepolicyList(t){
        this.policyTypetxt=this.policyType[t].labs.data
        if(this.inputtxt=='' || this.inputtxt==undefined){
          this.inputtxt=null
        }
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:this.inputtxt,
          highLevelPolicyLabels:[this.policyTypetxt],
          matchFields:null,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null
        }
        if(t==0){
          params.highLevelPolicyLabels=[]
        }
        this.loading = true;
        outpolicyList(params).then(response => {
          console.log('普通最新政策查询： '+JSON.stringify(response))
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null' && res.data.code=='200'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              if(res.data.data.list!='' && res.data.data.list!=undefined && res.data.data.list!=null && res.data.data.list!='null' && res.data.data.list.length>0){
                this.outlist=res;
                this.inlist = res.data.data.list;
                this.total = res.data.data.total;
                this.policyType[t].sizes=res.data.data.total
              }else{
                this.outlist='';
                this.inlist = [];
                this.total = 0;
                this.policyType[t].sizes=0
              }
            }else{
              this.outlist='';
              this.inlist = [];
              this.total = 0;
              this.policyType[t].sizes=0
            }
          }else{
            this.outlist='';
            this.inlist = [];
            this.total = 0;
            this.policyType[t].sizes=0
          }


        }).finally(() => {
          this.loading = false;
        });
      },
      //热点解读查询
      pagepolicyHot () {
        if(this.inputtxt=='' || this.inputtxt==undefined){
          this.inputtxt=null
        }
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:this.inputtxt,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null

        }
        this.loading= true;
        outpolicyHot(params).then(response => {
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null' && res.data.code=='200'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              if(res.data.data.list!='' && res.data.data.list!=undefined && res.data.data.list!=null && res.data.data.list!='null' && res.data.data.list.length>0){
                this.inlist = res.data.data.list;
                this.total = res.data.data.total;
              }else{
                this.inlist = [];
                this.total = 0;
              }
            }else{
              this.inlist = [];
              this.total = 0;
            }
          }else{
            this.inlist = [];
            this.total = 0;
          }

        }).finally(() => {
          this.loading = false;
        });
      },
      //分页
      pageChange(){
        this.outpagepolicyList(this.activeName)
        // if(this.type=='1'){
        //   this.outpagepolicyList(this.activeName)
        // }else if(this.type=='2'){
        //   this.pagepolicyList()
        // }
      },
      //跳转页面
      editBtn(t,item){
        switch (t) {
          case 1:
            console.log("t:",t)
            this.$emit('handleSwitch', {name: 'advancedScreening',t:this.t,input:this.inputtxt,tabindex:this.activeName})
            break

          case 2:
            console.log("t:",item)
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
            break

          case 5:
            console.log("t:",t)
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
            break

          // case 3:
          //   this.$emit('handleSwitch', {name: 'relatedDetail',type:this.type,params:item})
          //   break
        }

      },
      //输入字体高亮
      getActive(txt){
        if(this.inputtxt && txt){
          if(txt.indexOf(this.inputtxt)>-1) {
            // 结果transformString为进行处理后的要用来进行匹配的关键词
            let transformString = this.inputtxt.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&');
            let pattern = (new RegExp(transformString, 'gmi')); // 生成正则表达式
            let str = txt.replace(pattern, '<i style="color: #e1261c;font-style: normal;">$&</i>');

            return str;
          }
          else{
            return txt;
          }
        }else{
          return txt;
        }
      }

    },
    filters:{
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
  /deep/.app-main {
    background:#eee !important;
  }
  .wise-seach{
    width: 100%;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background: #FFFFFF;
  }
  .wise-top {
    display: flex;
    justify-content: center;
    /*position: absolute;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  }
  .wise-top /deep/ .el-input{
    width: 65%;
    border-radius: 28px;
  }
  .wise-top /deep/ .el-input__inner{
    width: 100%;
    height: 44px;
    border-radius: 28px !important;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;

  }
  .wise-select /deep/ .el-input {
    width: 100%;
  }
  .wise-select /deep/ .el-input__inner {
    padding-left: 0;
    border: none;
    height: 35px;
    border-right: 1px solid #eee;
    border-radius: 0 !important;
  }
  .wise-select {
    height: 35px;
    line-height: 35px;
    position: relative;
    width: 94px;
    top: 33px;
    left: 110px;
    z-index: 999;
  }
  /deep/.el-select .el-input.is-focus .el-input__inner{
    /*border-color:#fff;*/
  }
  .preciseMatch /deep/ .el-button:not(.is-circle):not(.is-round), .el-input__inner {
    width: 125px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #ED3C3C;
    padding-left: 48px;
    border-radius: 24px !important;
  }
  .s-result{
    padding: 20px;
  }
  .s-result img{
    position: relative;
    top: 5px;
  }
  .result-content{
    background-color: #fff;

    .result-item{
      border-bottom: 1px solid #eee;
      padding: 20px 20px;
      cursor: pointer;
    }
    .result-item .result-item-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;
    }
    .result-item .result-item-top span{
      font-size: 16px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #444;
    }
    .result-item .result-item-top p{
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #999999;
    }
    .result-item .result-item-bot {
      width: 100%;
      max-height:18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #999999;
    }
  }
  /deep/.el-tabs--left .el-tabs__active-bar.is-left{
    right: -20px;
    top: 64px;
    left: auto;
    height: 2px !important;
    /* transform: translateY(0px); */
    width: 205px !important;
  }

  //.policyBox /deep/ .base-table-empty{
  //  height:100%;
  //}
</style>
