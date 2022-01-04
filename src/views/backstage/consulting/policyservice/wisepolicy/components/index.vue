<!--智慧政策-->
<template>
  <div class="wisePolicy">
    <div class="wise-seach">
      <div class="wise-top">
<!--        <div class="wise-select">-->
<!--          <el-select v-model="inputtype" slot="prepend" placeholder="请选择" @change="select">-->
<!--            <el-option label="区外" value="1"></el-option>-->
<!--            <el-option label="区内" value="2"></el-option>-->
<!--          </el-select>-->
<!--        </div>-->
        <el-input placeholder="请输入政策关键词查询" @focus="onInputFocus" >
          <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;font-size:18px;font-weight:600;margin-right:10px;" @click="editBtn(3)"></i>
        </el-input>
        <div class="preciseMatch" style="padding-left: 20px;">
          <img src="@/assets/page/precise.png" width="19" height="16" style="position: absolute;margin-top: 91px;margin-left: 22px;">
          <el-button @click="editBtn(1)">精准匹配</el-button>
        </div>
      </div>
    </div>
    <div class="list-content">
      <ul class='list-contentul'>
        <li>
          <div class="ul-left">
            <span class="num">{{policyStatisticsData.recentDayPolicyNum | filtering}}<span style="font-size: 14px;color: #7D7D7D;">条</span></span>
            <span class="title">近七日发布政策</span>
          </div>
          <div class="ul-right" style="background: #FDB03B;">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{policyStatisticsData.recentMonthPolicyNum | filtering}}<span style="font-size: 14px;color: #7D7D7D;">条</span></span>
            <span class="title">近三十日发布政策</span>
          </div>
          <div class="ul-right" style="background: #A1A7A4;">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{policyStatisticsData.recentHalfYearPolicyNum | filtering}}<span style="font-size: 14px;color: #7D7D7D;">条</span></span>
            <span class="title">近半年内发布政策</span>
          </div>
          <div class="ul-right" style="background: #5E99F1;">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{policyStatisticsData.recentYearPolicyNum | filtering}}<span style="font-size: 14px;color: #7D7D7D;">条</span></span>
            <span class="title">近一年发布政策</span>
          </div>
          <div class="ul-right" style="background: #A56B98;">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{policyStatisticsData.totalPolicyNum | filtering}}<span style="font-size: 14px;color: #7D7D7D;">条</span></span>
            <span class="title">累计政策总数</span>
          </div>
          <div class="ul-right" style="background: #EC3C3D;">
          </div>
        </li>
      </ul>
    </div>
    <div class="thirdBox">
      <div class="indrucontent" style="position:relative">
        <i class="relatedicon el-icon-right" @click="editBtn(3)"></i>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新政策" name="first">
            <div class="infotxt" v-loading="loading1">
              <li v-if="newpolicylatestData!='' && newpolicylatestData!=undefined && newpolicylatestData!=null && newpolicylatestData!='null' && newpolicylatestData.length>0" @click="editBtn(2,item)" v-for="(item,index) in newpolicylatestData">
                <span>
                  <div class="infobox" v-if="item.is_top">置顶</div>
                  {{item.title}}
                </span>
                <p style="color: #999;min-width: 85px;text-align: left">{{item.releaseTime | filterTime}}</p>
              </li>

              <!-- 空数据样式 -->
              <base-table-empty v-if="!(newpolicylatestData!='' && newpolicylatestData!=undefined && newpolicylatestData!=null && newpolicylatestData!='null' && newpolicylatestData.length>0)" slot="empty"/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="推荐政策" name="second">
            <div class="infotxt" v-loading="loading1">
              <li v-if="policylatestData!='' && policylatestData!=undefined && policylatestData!=null && policylatestData!='null' && policylatestData.length>0" @click="editBtn(2,item)" v-for="(item,index) in policylatestData">
                <span>
                  <div class="infobox" v-if="item.is_top">置顶</div>
                  {{item.title}}
                </span>
                <p style="color: #999;min-width: 85px;text-align: left">{{item.releaseTime | filterTime}}</p>
              </li>

              <!-- 空数据样式 -->
               <base-table-empty v-if="!(policylatestData!='' && policylatestData!=undefined && policylatestData!=null && policylatestData!='null' && policylatestData.length>0)" slot="empty"/>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>
      <div class="lifecontent" style="position:relative">
        <img class="iconImage" src="@/assets/page/icon-hot.png">
        <i class="relatedicon el-icon-right" @click="editBtn(4)"></i>
        <el-tabs v-model="hotName">
          <el-tab-pane label="热点解读" name="first">
            <div class="rigthLife" v-loading="loading2">
              <div class="hotSpot" v-if="policyHotData!='' && policyHotData!=undefined && policyHotData!=null && policyHotData!='null' && policyHotData.length>0" @click="editBtn(5,item)" v-for="(item,index1) in policyHotData">
                <div class="hotSpot-tit">{{item.title}}</div>
                <div class="hotSpot-time">
                  <span>公告时间  {{item.releaseTime | filterTime}}</span>
<!--                  <span>来源  {{item.releaseOrg | filterEmty}}</span>-->
                </div>
              </div>
              <!-- 空数据样式 -->
              <base-table-empty v-if="!(policyHotData!='' && policyHotData!=undefined && policyHotData!=null && policyHotData!='null' && policyHotData.length>0)" slot="empty"/>
            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
    <!--政策专栏-->
    <div class="thirdBox">
      <div class="policycontent" style="position:relative">
        <i class="relatedicon el-icon-right" @click="editBtn(3)"></i>
        <el-tabs v-model="policyName" @tab-click="handleClick">
          <el-tab-pane label="政策专栏" name="first">
            <div class="policyOne policyOne1">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">科技创新</span>
                  <i class="el-icon-right" @click="editBtn(3,'','科技创新')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList1!='' && policyListData.policyList1!=undefined && policyListData.policyList1!=null && policyListData.policyList1!='null' && policyListData.policyList1.length>0)" @click="editBtn(2,item)" v-for="(item,index2) in policyListData.policyList1">
                    <span class="policy-text">
                     {{item.title}}
                    </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>
                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList1!='' && policyListData.policyList1!=undefined && policyListData.policyList1!=null && policyListData.policyList1!='null' && policyListData.policyList1.length>0)" slot="empty"/>
                </div>

              </div>
            </div>
            <div class="policyOne policyOne1">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">市场监督</span>
                  <i class="el-icon-right" @click="editBtn(3,'','市场监督')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList2!='' && policyListData.policyList2!=undefined && policyListData.policyList2!=null && policyListData.policyList2!='null' && policyListData.policyList2.length>0)" @click="editBtn(2,item)" v-for="(item,index3) in policyListData.policyList2">
                  <span class="policy-text">
                   {{item.title}}
                  </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>

                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList2!='' && policyListData.policyList2!=undefined && policyListData.policyList2!=null && policyListData.policyList2!='null' && policyListData.policyList2.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
            <div class="policyOne policyOne1">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">金融政策</span>
                  <i class="el-icon-right" @click="editBtn(3,'','金融政策')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList3!='' && policyListData.policyList3!=undefined && policyListData.policyList3!=null && policyListData.policyList3!='null' && policyListData.policyList3.length>0)" @click="editBtn(2,item)" v-for="(item,index4) in policyListData.policyList3">
                    <span class="policy-text">
                     {{item.title}}
                    </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>
                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList3!='' && policyListData.policyList3!=undefined && policyListData.policyList3!=null && policyListData.policyList3!='null' && policyListData.policyList3.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
            <div class="policyOne">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">资金扶持</span>
                  <i class="el-icon-right" @click="editBtn(3,'','资金扶持')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList4!='' && policyListData.policyList4!=undefined && policyListData.policyList4!=null && policyListData.policyList4!='null' && policyListData.policyList4.length>0)" @click="editBtn(2,item)" v-for="(item,index5) in policyListData.policyList4">
                  <span class="policy-text">
                   {{item.title}}
                  </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>
                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList4!='' && policyListData.policyList4!=undefined && policyListData.policyList4!=null && policyListData.policyList4!='null' && policyListData.policyList4.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
            <div class="policyOne">
              <div class="policyTitle" >
                <div class="titlebox">
                  <span class="lefttitle">税收慧免</span>
                  <i class="el-icon-right" @click="editBtn(3,'','税收慧免')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList5!='' && policyListData.policyList5!=undefined && policyListData.policyList5!=null && policyListData.policyList5!='null' && policyListData.policyList5.length>0)" @click="editBtn(2,item)" v-for="(item,index6) in policyListData.policyList5">
                  <span class="policy-text">
                   {{item.title}}
                  </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>
                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList5!='' && policyListData.policyList5!=undefined && policyListData.policyList5!=null && policyListData.policyList5!='null' && policyListData.policyList5.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
            <div class="policyOne">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">人才扶持</span>
                  <i class="el-icon-right" @click="editBtn(3,'','人才扶持')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList6!='' && policyListData.policyList6!=undefined && policyListData.policyList6!=null && policyListData.policyList6!='null' && policyListData.policyList6.length>0)" @click="editBtn(2,item)" v-for="(item,index7) in policyListData.policyList6">
                  <span class="policy-text">
                   {{item.title}}
                  </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>


                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList6!='' && policyListData.policyList6!=undefined && policyListData.policyList6!=null && policyListData.policyList6!='null' && policyListData.policyList6.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
            <div class="policyOne">
              <div class="policyTitle">
                <div class="titlebox">
                  <span class="lefttitle">资质认证</span>
                  <i class="el-icon-right" @click="editBtn(3,'','资质认证')"></i>
                </div>
                <div class="policyBox"  v-loading="loading">
                  <li v-if="(policyListData.policyList7!='' && policyListData.policyList7!=undefined && policyListData.policyList7!=null && policyListData.policyList7!='null' && policyListData.policyList7.length>0)" @click="editBtn(2,item)" v-for="(item,index8) in policyListData.policyList7">
                  <span class="policy-text">
                   {{item.title}}
                  </span>
                    <span style="color: #999">{{item.releaseTime | filterTime}}</span>
                  </li>

                  <!-- 空数据样式 -->
                  <base-table-empty v-if="!(policyListData.policyList7!='' && policyListData.policyList7!=undefined && policyListData.policyList7!=null && policyListData.policyList7!='null' && policyListData.policyList7.length>0)" slot="empty"/>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
<!--    精准匹配-->
   <wise-prematch ref="refPrematch"  @refresh="refresh"></wise-prematch>

  </div>

</template>

<script>
  import WisePrematch from './wise-prematch'
  import {newpolicyList,outpolicyList,outpolicyHot,outpolicyStatistics} from "@/api/backstage/consulting/policyservice/wisepolicy/wisepolicy.js"

  export default {
    name: 'index',
    components: { WisePrematch },
    data() {
      return {
        loading:true,// 加载遮罩控制条件
        loading1:true,
        loading2:true,
        // inputtype: '1',
        input:'',
        activeName: 'first',
        policyName:'first',
        hotName:'first',

        policyType:['科技创新','市场监督','金融政策','资金扶持','税收慧免','人才扶持','资质认证'],//政策类型
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        // total: 0,//总条数
        policyListData: {
          policyList1:[],
          policyList2:[],
          policyList3:[],
          policyList4:[],
          policyList5:[],
          policyList6:[],
          policyList7:[]
        },//智慧政策列表数据
        newpolicylatestData: [],//最新政策列表数据
        policylatestData: [],//推荐政策列表数据
        policyHotData: [],//热点解读列表数据
        policyStatisticsData:[],//智慧政策统计
        // isShow:true,
      }
    },
    created(){
      this.newpagepolicylatest ()
      this.pagepolicylatest();
      this.pagepolicyHot();
      this.pagepolicyStatistics();
      this.pagepolicyList1();
      this.pagepolicyList2();
      this.pagepolicyList3();
      this.pagepolicyList4();
      this.pagepolicyList5();
      this.pagepolicyList6();
      this.pagepolicyList7();
    },
    methods:{
      //精准匹配刷新页面
      refresh(){
        this.newpagepolicylatest ()
        this.pagepolicylatest();
        this.pagepolicyHot();
        this.pagepolicyStatistics();
        this.pagepolicyList1();
        this.pagepolicyList2();
        this.pagepolicyList3();
        this.pagepolicyList4();
        this.pagepolicyList5();
        this.pagepolicyList6();
        this.pagepolicyList7();
      },
      // 根据类型查询智慧政策
      pagepolicyList1(){

        this.pagepolicyList (1)
      },
      pagepolicyList2(){

        this.pagepolicyList (2)
      },
      pagepolicyList3(){

        this.pagepolicyList (3)
      },
      pagepolicyList4(){

        this.pagepolicyList (4)
      },
      pagepolicyList5(){

        this.pagepolicyList (5)
      },
      pagepolicyList6(){

        this.pagepolicyList (6)
      },
      pagepolicyList7(){

        this.pagepolicyList (7)
      },
      pagepolicyList (t) {
        let type='';
        if(t==1){
          type=this.policyType[0]
        }else if(t==2){
          type=this.policyType[1]
        }else if(t==3){
          type=this.policyType[2]
        }else if(t==4){
          type=this.policyType[3]
        }else if(t==5){
          type=this.policyType[4]
        }else if(t==6){
          type=this.policyType[5]
        }else if(t==7){
          type=this.policyType[6]
        }
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:null,
          highLevelPolicyLabels:[type],
          matchFields:null,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null

        }
        this.loading = true;
        outpolicyList(params).then(response => {
          const res = response;
          if(t==1){
            this.policyListData.policyList1=res.data.data.list;
          }else if(t==2){
            this.policyListData.policyList2= res.data.data.list;
          }else if(t==3){
            this.policyListData.policyList3= res.data.data.list;
          }else if(t==4){
            this.policyListData.policyList4= res.data.data.list;
          }else if(t==5){
            this.policyListData.policyList5= res.data.data.list;
          }else if(t==6){
            this.policyListData.policyList6= res.data.data.list;
          }else if(t==7){
            this.policyListData.policyList7= res.data.data.list;
          }


        }).finally(() => {
          this.loading = false;
        });
      },
      //最新政策
      newpagepolicylatest () {
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:null,
          highLevelPolicyLabels:[],
          matchFields:null,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null

        }
        this.loading1 = true;
        newpolicyList(params).then(response => {
          const res = response;
          this.newpolicylatestData = res.data.data.list;

        }).finally(() => {
          this.loading1 = false;
        });
      },

      //推荐政策
      pagepolicylatest () {
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:null,
          highLevelPolicyLabels:[],
          matchFields:null,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null

        }
        this.loading1 = true;
        outpolicyList(params).then(response => {
          const res = response;
          this.policylatestData = res.data.data.list;

        }).finally(() => {
          this.loading1 = false;
        });
      },

      //热点解读
      pagepolicyHot () {
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:null,
          areaIdentifier:'',
          containWords:null,
          notContainWords:null,
          releaseEndTime:null,
          releaseStartTime:null

        }
        this.loading2 = true;
        outpolicyHot(params).then(response => {
          const res = response;
          this.policyHotData = res.data.data.list;
          this.total = res.data.data.total;

        }).finally(() => {
          this.loading2 = false;
        });
      },
      //智慧政策统计
      pagepolicyStatistics () {
        let params = {
          areaIdentifier:''
        }
        // this.loading = true;
        outpolicyStatistics(params).then(response => {
          const res = response;
          this.policyStatisticsData = res.data.data;

        }).finally(() => {
          // this.loading = false;
        });
      },
      // select(val){
      //   if(val=='1'){
      //     this.pagepolicylatest();
      //     this.pagepolicyHot();
      //     this.pagepolicyStatistics();
      //     this.pagepolicyList1();
      //     this.pagepolicyList2();
      //     this.pagepolicyList3();
      //     this.pagepolicyList4();
      //     this.pagepolicyList5();
      //     this.pagepolicyList6();
      //     this.pagepolicyList7();
      //   }else if(val=='2'){
      //
      //   }
      // },

      handleClick(tab, event) {
        console.log('tab: ',tab);
        if(tab.name=='first'){
          this.newpagepolicylatest ()
        }else if(tab.name=='second'){
          this.pagepolicylatest();
        }
      },
      //输入框聚焦事件
      onInputFocus(){
        this.editBtn(3)
      },
      //详情页面
      editBtn(t,item,tabName){
        switch (t) {
          case 1:
            this.$refs['refPrematch'].show(t)
          break

          case 2:
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
          break

          case 3:
            this.$emit('handleSwitch', {name: 'searchResult',tabName:tabName})
            break

          case 4:
            this.$emit('handleSwitch', {name: 'searchResult',t:t})
            break

          case 5:
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
            break
        }

      },
    },
    filters:{
      filtering(val){
        if(val == 0 || val == undefined || val == null || val == '' || val == 'null'){
          return 0
        }else {
          return val
        }
      },
      filterEmty(val){
        if( val == '' || val == undefined || val == null || val == 'null'){
          return '-'
        }else {
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
  /deep/.app-main-wrap{
    padding: 0 !important;
  }
  /deep/ .app-main {
    background:#eee !important;
  }
  .wisePolicy{
    background: #eee;
  }
  .wise-seach{
    width: 100%;
    height: 198px;
    text-align: center;
    line-height: 198px;
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
    top: 80px;
    left: 110px;
    z-index: 999;
  }
  /deep/.el-select .el-input.is-focus .el-input__inner{
    border-color:#fff;
  }
  .preciseMatch /deep/ .el-button:not(.is-circle):not(.is-round), .el-input__inner {
    width: 125px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #ED3C3C;
    padding-left: 48px;
    border-radius: 24px !important;
  }
  /*/deep/ .el-button:hover, .el-button:focus{*/
  /*  background: #FFFFFF;*/
  /*  border: 1px solid #ED3C3C;*/
  /*}*/
  .list-content{
    margin-top: -50px;
  }
  .list-contentul{
    /*background:#eee;*/
    width:100%;
    list-style: none;    /*清除列表默认样式*/
    padding: 0;      /*清除padding*/
    margin: 0;
    display:flex;
    flex-flow: wrap;
    justify-content: flex-start;
    align-items:center;
  }
  .list-contentul li{
    width:calc((100% - 80px)/5);
    min-width:200px;
    padding:32px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-right:20px;
    background:#fff;
    position: relative;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
  }
  .list-contentul li:last-of-type{
    /*width:calc(100% - 80% - 20px);*/
    margin-right:0;
  }
  .num{
    display:block;
    font-size: 40px;
    color: #333;
  }
  .title{
    display:block;
    font-size: 16px;
    color: #666666;
  }
  .ul-right{
    position: absolute;
    right: 0;
    width: 6px;
    height: 100%;
    opacity: 1;
    border-radius: 0px 4px 4px 0px;
  }
  .thirdBox{
    margin-top:20px;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .indrucontent{
    width:59.5%;
    height:440px;
    background:#fff;
    margin-right:20px;
  }
  .indrucontent .titlebox{
    padding:20px 20px;
  }
  .infotxt{
    padding:0px 20px;
    height:351px;
    overflow:hidden;
  }
  .infotxt li{
    cursor: pointer;
    display: flex;
    height: 35px;
  }
  .infotxt span{
    font-size: 16px;
    font-family: MicrosoftYaHei;
    line-height: 18px;
    color: #444444;
    display: inline-block;
    margin-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .infotxt .infobox {
    display: inline-block;
    text-align: center;
    width: 35px;
    height: 19px;
    background: #FFB03A;
    border-radius: 2px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #FFFFFF;
  }
  .infotxt /deep/ .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #fff;
    color: #666666;
    cursor:default;
    padding:0 0;
  }
  .infotxt /deep/ .base-table-empty{
    height:100%;
  }
  .rigthLife /deep/ .base-table-empty {
    height: 100%;
  }
  /deep/.el-tabs__item {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
  }
  .lifecontent{
    /*padding:20px 0;*/
    width:calc(40.5% - 20px);
    background:#fff;
    height:440px;
  }
  .lifecontent .titlebox{
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: 2px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .lifecontent .titlebox i{
    height: 50px;
    line-height: 50px;
    padding-right: 20px;
  }
  .lifecontent .titlebox span {
    height: 26px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 26px;
    color: #ED3C3C;
    border-bottom: 2px solid #ed3c3c;
  }
  .rigthLife {
    height: 351px;
    overflow-y:auto;
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
  .policycontent{
    width:100%;
    height:1079px;
    background:#fff;
  }
  .policyOne{
    width:calc((100% - 100px)/4);
    margin: 0 0 20px 20px;
    border: 1px solid #eee;
    float: left;

    .policyTitle .policyBox{
      height:400px;
      overflow:hidden;

      li{
        height: 40px;
        line-height: 40px;
        padding-left: 10px;

        .policy-text{
          height: 21px;
          line-height: 21px;
          vertical-align: middle;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          line-height: 18px;
          color: #444;
          display: inline-block;
          max-width: calc(100% - 110px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

    }

    .titlebox {
      height: 50px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 50px;
      padding-left: 20px;
      color: #666666;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      i{
        height: 50px;
        line-height: 50px;
        padding-right: 20px;
      }
    }
  }
  .policyOne1{
    width:calc((100% - 80px)/3);
  }
  .policyBox /deep/ .base-table-empty{
    height:100%;
  }
  .relatedicon{
    position:absolute;
    right:20px;
    top:0;
    height:70px;
    line-height:70px;
    color:#666;
    font-size:18px;
    z-index:2;
  }
  .iconImage{
    position:absolute;
    left:100px;
    top:23px;
    z-index:2;
    width:24px;
    height:24px;
    overflow:hidden;
  }
</style>
