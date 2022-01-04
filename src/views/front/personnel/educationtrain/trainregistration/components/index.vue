<template>
  <div class="party" v-cloak>
    <div class="contain" v-loading="loading">
      <div class="containlist" v-if="tableData!='' && tableData!=undefined && tableData!=null && tableData!='null' && tableData.length>0">
        <div class="list" v-for="(item,index) in tableData">
          <div class="list-title">
            <h2 class="title">{{item.theme}}</h2>
            <!--报名和取消报名按钮-->
            <div class="buttonbox">
              <base-page-button v-if="(Date.parse(new Date(item.applyStart)) <= Date.parse(new Date()) && Date.parse(new Date()) <= Date.parse(new Date(item.applyEnd)) ) && item.applyStatus==0 && item.startStatus==1" title="报名" type="primary" @click="getSave(1,item)"/>
              <base-page-button v-if="(Date.parse(new Date(item.applyStart)) <= Date.parse(new Date()) && Date.parse(new Date()) <= Date.parse(new Date(item.applyEnd)) ) && item.applyStatus==1 && item.startStatus==1" title="取消报名" @click="getSave(2,item)"/>
            </div>
          </div>
          <div class="listsecond">
            <div class="cli">
              <span class="clititle">培训时间</span>
              <span class="clinr">{{isEmpty(item,'trainStart')}} ~ {{isEmpty(item,'trainEnd')}}</span>
            </div>
            <div class="cli">
              <span class="clititle">开展部门</span>
              <span class="clinr">{{isEmpty(item,'department')}}</span>
            </div>
            <div class="cli">
              <span class="clititle">已报名</span>
              <span class="clinr">{{isEmpty(item,'applyed')}}人 限额{{isEmpty(item,'number')}}人</span>
            </div>
            <div class="cli">
              <span class="clititle">培训地点</span>
              <span class="clinr">{{isEmpty(item,'address')}}</span>
            </div>
          </div>
          <div class="listthree">
            <span class="clititle">培训内容</span>
            <span class="clinr" v-if="item.content!='' && item.content!=undefined && item.content!=null && item.content!='null'" v-html="item.content"></span>
            <span class="clinr" v-else>--</span>
          </div>

          <!--报名和取消报名按钮(不要)-->
<!--          <div class="buttonbox">-->
<!--            <base-page-button v-if="(Date.parse(new Date(item.applyStart)) <= Date.parse(new Date()) && Date.parse(new Date()) <= Date.parse(new Date(item.applyEnd)) ) && item.applyStatus==0 && item.startStatus==1" title="报名" type="primary" @click="getSave(1,item)"/>-->
<!--            <base-page-button v-if="(Date.parse(new Date(item.applyStart)) <= Date.parse(new Date()) && Date.parse(new Date()) <= Date.parse(new Date(item.applyEnd)) ) && item.applyStatus==1 && item.startStatus==1" title="取消报名" @click="getSave(2,item)"/>-->
<!--          </div>-->
          <!--已报名标识-->
          <div class="bsbox" v-if="item.applyStatus==1">
            <img src="../../../../../../assets/page/icon-bs.png">
          </div>
        </div>



      </div>

      <!-- 空数据样式 -->
      <base-table-empty slot="empty" v-else/>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

    </div>
    <!--报名/取消报名弹窗-->
    <registration-tc ref="refRegistration" @refresh="pageChange"/>
  </div>
</template>

<script>
  import RegistrationTc from "./registration-tc";

  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainList} from "@/api/front/personnel/educationtrain/trainregistration/trainregistration.js"


  export default {
    name: "index",
    components: {
      RegistrationTc

    },
    data () {
      return {
        loading:true,
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [{}],//列表数据
        isButton:false,//报名按钮是否出现
      }
    },
    mounted(){
      // this.getUser();
      this.pageChange();

    },
    methods: {
      //获取用户信息
      // getUser() {
      //   let params = {
      //     userId: db.get('USER').id,
      //   }
      //   commonReq.getUserinformation(params).then(response => {
      //     const res = response;
      //     this.orgName = res.data.orgName;
      //     this.orgCode = res.data.orgCode;
      //
      //   }).finally(() => {
      //   });
      // },
      // 调用数据接口
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {

          },
          size: this.pageSize
        }
        this.loading = true;
        getTrainList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].trainStart!='' && this.tableData[i].trainStart!=undefined && this.tableData[i].trainStart!=null && this.tableData[i].trainStart!='null'){
                this.tableData[i].trainStart=this.tableData[i].trainStart.substring(0,16)
              }
              if(this.tableData[i].trainEnd!='' && this.tableData[i].trainEnd!=undefined && this.tableData[i].trainEnd!=null && this.tableData[i].trainEnd!='null'){
                this.tableData[i].trainEnd=this.tableData[i].trainEnd.substring(0,16)
              }
            }

          }


        }).finally(() => {
          this.loading = false;
        });
      },
      //跳转
      getSave (t, row) {
        switch (t) {
          case 1:
          case 2:
            this.$refs['refRegistration'].show(t, row)
            break
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .party{
    background: #fff;
    padding: 0 0;
    margin-top: 20px;
    /*overflow:auto;*/
  }
  .contain{
    background: #EEE;
    width:100%;
  }
  .containlist{
    background: #EEE;
    width:100%;
  }
  .list{
    position:relative;
    padding:20px 20px;
    padding-bottom:65px;
    background:#fff;
    margin-bottom:10px;
    border-radius:4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
  .list-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .title{
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    color: #666666;
    margin:0 0;
    margin-bottom:6px;
  }
  .listsecond{
    display:flex;
    justify-content: flex-start;
    flex-flow: wrap;
  }
  .cli{
    display:flex;
    justify-content: flex-start;
    margin-top:14px;
  }
  .cli:nth-of-type(2n+1){
    width:40%;
  }
  .cli:nth-of-type(2n){
    width:60%;
  }
  .cli .clititle{
    display:block;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    width:60px;
    margin-right:14px;
  }
  .cli .clinr{
    display:block;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    white-space: pre-wrap;
    word-break: break-all;
    line-height:20px;
    width:calc(100% - 74px);
  }
  .listthree{
    display: flex;
    justify-content: flex-start;
    margin-top:14px;
  }
  .listthree .clititle{
    display:block;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    width:60px;
    margin-right:14px;
  }
  .listthree .clinr{
    display:block;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    white-space: pre-wrap;
    word-break: break-all;
    line-height:20px;
    width:calc(100% - 74px);
  }
  .buttonbox{
    /*position:absolute;*/
    /*right:10px;*/
    /*top:20px;*/
  }
  .bsbox{
    position:absolute;
    left:0;
    bottom:0;
    width:55px;
    height:55px;
    overflow:hidden;
  }
  .bsbox img{
    width:100%;
    height:100%;
  }
  .page-btn:first-of-type{
    min-width:auto;

  }
  .text-right{
    text-align:center;
  }

</style>
