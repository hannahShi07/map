<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="search-box">
      <base-label-box label="党组织选择">
        <el-select
          v-model='orgCode'
          @change="selectChange"
          placeholder="请选择"
          clearable>
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </base-label-box>
      <base-page-button title="积分统计" @click="editBtn()"/>
    </div>

    <div class="view" v-cloak>
      <div class="view-box" v-loading="leftLoading" >
        <div class="view-box-top">
          <p class="p1">
            <img src="@/assets/page/icon-orgintegral.png" width="25" height="24" alt="">
            党组织积分统计
          </p>
          <p class="p2">当前组织排名：<span style="color: red">{{organizationRanking}}</span></p>
        </div>
        <div v-if="leftData!='' && leftData!=undefined && leftData!=null &&leftData!='null'&&leftData.length>0">
          <div class="view-item" v-for="(item,index) in leftData">
            <p class="p4" :title="item.name" v-if="pageNum== 1">
              <img src="@/assets/page/icon-rank1.png" width="24" height="20" alt="" v-if="index+1== 1">
              <img src="@/assets/page/icon-rank2.png" width="24" height="20" alt="" v-if="index+1== 2">
              <img src="@/assets/page/icon-rank3.png" width="24" height="20" alt="" v-if="index+1== 3">
              <span class="view-rank" v-if="index+1 != 1 && index+1 != 2 && index+1 != 3 &&
              (index+1) != 10">{{10*(pageNum-1)+index+1}}</span>
              <span style="margin-left: 0;margin-right: 5px;color: #7D7D7D;" v-if="(index+1) == 10">{{10*(pageNum-1)+index+1}}</span>
              {{item.name}}
            </p>
            <p class="p4" :title="item.name" v-else>
              <span class="view-rank">{{10*(pageNum-1)+index+1}}</span>
              {{item.name}}
            </p>
            <p class="p5">
              <span>{{item.socre}}分</span>
            </p>
          </div>
        </div>
        <!-- 空数据样式 -->
        <base-table-empty slot="empty" v-if="leftData.length == 0"/>
        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>

      <div class="view-box ml-20" v-loading="rightLoading">
        <div class="view-box-top">
          <p class="p1"><img src="@/assets/page/icon-memberintegral.png" width="25" height="24" alt="">
            党员积分统计</p>
        </div>
        <div v-if="rightData!='' && rightData!=undefined && rightData!=null && rightData!='null' &&rightData.length>0">
          <div class="view-item" v-for="(item,index) in rightData" >
            <p class="p4" v-if="rightpageNum== 1">
              <img src="@/assets/page/icon-rank1.png" width="24" height="20" alt="" v-if="index+1 == 1">
              <img src="@/assets/page/icon-rank2.png" width="24" height="20" alt="" v-if="index+1 == 2">
              <img src="@/assets/page/icon-rank3.png" width="24" height="20" alt="" v-if="index+1 == 3">
              <span class="view-rank" v-if="index+1 != 1 && index+1 != 2 && index+1 != 3 &&
              (index+1) != 10">{{10*(rightpageNum-1)+index+1}}</span>
              <span style="margin-left: 0;margin-right: 5px;color: #7D7D7D;" v-if="(index+1) == 10">{{10*(rightpageNum-1)+index+1}}</span>
            <div class="view-item-right" v-if="rightpageNum== 1">
              <span class="view-name">{{item.memberName}}</span>
              <span class="view-organization">{{item.name}}</span>
            </div>
            </p>
            <p class="p4" v-if="rightpageNum != 1">
              <span class="view-rank" >{{10*(rightpageNum-1)+index+1}}</span>
            <div class="view-item-right" v-if="rightpageNum != 1">
              <span class="view-name">{{item.memberName}}</span>
              <span class="view-organization">{{item.name}}</span>
            </div>
            </p>
            <p class="p5">
              {{item.socre}}分
            </p>
          </div>
        </div>
        <!-- 空数据样式 -->
        <base-table-empty slot="empty" v-if="rightData.length == 0"/>
        <base-pagination :total="rightTotal" :pageNum.sync="rightpageNum" :pageSize.sync="rightpageSize" @pageChange="pageRightChange"/>
      </div>
    </div>

  </div>
</template>

<script>

  import db from "@/utils/localstorage";
  import commonReq from '@/api/public/commonReq'
  import {getOrgIntegral, getMemberIntegral,getOrgIntegralRanking} from "@/api/backstage/statistical/analysis/integralstatistical/integralstatistical.js"

  export default {
    name: "index",
    components: {

    },
    data() {
      return {
        list: [],//党组织下拉框
        orgName: '',//组织名称
        orgCode: '',//组织编码
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        rightpageNum: 1,//党员当前页
        rightpageSize: 10,//每页大小
        rightTotal: 0,//总条数
        loading:false, //排名加载
        organizationRanking:0, //当前组织排名
        leftLoading: false,
        rightLoading: false,
        leftData: {},
        rightData: {},

      }
    },
    mounted() {
      this.getOrg();
      this.getUser();
    },
    methods: {
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.orgName=res.data.orgName;
          this.orgCode=res.data.orgCode;
          this.orgId=res.data.orgId;

          this.pageChange()
          this.pageRightChange()
          this.getRanking()


        })
      },

      //选择党组织
      getOrg(){
        let params={

        }
        commonReq.getOrglist(params).then(response => {
          const res = response;
          if(res && res.length <= 0){
            this.list = []
            this.orgCode = ""
          }else{
            this.list=res;
            this.getUser();

          }

        })
      },
      // 党组织积分统计调用数据接口
      pageChange () {
        this.leftLoading = true
        let params = {
          model:{
            orgCode: this.orgCode
          },
          current:this.pageNum,
          size:this.pageSize
        }
        getOrgIntegral(params).then(response => {
          const res = response;
          this.leftData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.leftLoading = false;
        });
      },
      pageRightChange(){
        this.rightLoading = true
        let params = {
          model:{
            orgCode: this.orgCode
          },
          current:this.rightpageNum,
          size:this.rightpageSize
        }
        getMemberIntegral(params).then(response => {
          const res = response;
          this.rightData = res.records;
          this.rightTotal = res.total;
        }).finally(() => {
          this.rightLoading = false;
        });
      },
      //当前组织排名
      getRanking(){
        this.loading = true
        let params = {
          orgCode: this.orgCode
        }

        getOrgIntegralRanking(params).then(response => {
          const res = response;
          this.organizationRanking = res.ranking;
        }).finally(() => {
          this.loading = false;
        });
      },
      //选择党组织
      selectChange (value) {
        if (value) {
          this.list.forEach(item => {
            if (item.code === value) {
              this.orgName = item.name
              this.orgCode = item.code
            }
          })
        }
        this.pageNum = 1
        this.rightpageNum = 1
        this.pageChange()
        this.pageRightChange()
        this.getRanking()
      },

      //查询
      editBtn () {
        this.pageNum = 1
        this.rightpageNum = 1
        this.pageChange()
        this.pageRightChange()
        this.getRanking()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .history {
    height: 100%;
    background: #eee;
  }
  .bc-width{
    background:#fff;
  }
  .mp-20{
    margin-top:20px;
  }
  .pb-30{
    padding-bottom:30px;
  }

  /*党组织下拉框样式*/
  .search-box{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    margin-bottom:20px;
  }
  .search-box /deep/ .base-label-box{
    margin-bottom:0!important;
    background:#fff;
    width:calc(100% - 288px);
    padding:10px 0;


  }
  .search-box /deep/ .base-label-box .base-label-box__label {
    display: inline-block;
    padding:0 20px;
    font-size: 16px;
    line-height:1;
    color: #666666;
    font-weight:400;
    width:auto;

  }
  .search-box /deep/ .base-label-box .base-label-box__content{
    width:calc(100% - 125px);
  }
  .search-box /deep/ .el-select{
    width:100%;
  }

  .search-box /deep/ .el-input--suffix .el-input__inner{
    border-right:none;
    border-top:none;
    border-bottom:none;
    border-radius:0!important;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
  }
  .search-box /deep/ .page-btn{
    width:268px;
    height:56px;
    line-height:56px;
    font-size: 16px;
    font-weight: bold;
    color: #ED3C3C;
    background: #FFF2F2;
    border: 2px solid #ED3C3C;
    margin-right: 0;
  }
  .el-select-dropdown__item {
    //display:inline-block;
    //width:100%;
    max-width:1064px!important;
  }

  .title-box{
    padding:16px 20px;
    border-bottom:1px solid #E4E4E4;
    display:flex;
    justify-content: space-between;
    align-items:center;
  }
  .title-logo{
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    color: #666666;
  }
  .title-logo i{
    margin-right:0px;
    color: #E93F33;
  }


  /*积分统计样式*/
  .view {
    min-height: calc(100vh - 169px);
    margin-top: 20px;
    display: flex;

    .view-box {
      flex: 1;
      background: #fff;
      border-radius: 2px;
    }

    .view-box-top {
      padding:0 20px;
      height: 60px;
      line-height: 60px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;

      .p1 {
        font-size: 18px;
        font-weight: bold;
        color: #555555;
      }
      img {
        position: relative;
        top: 6px;
        right: 4px;
      }

      .p2 {
        float: right;
        font-size: 18px;
        color: #666666;
      }

      .p3 {
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }

    .view-item {
      padding:0 20px;
      display: flex;
      height: 60px;
      line-height: 60px;
      justify-content: space-between;
      border-bottom: 1px solid #EEEEEE;

      .view-item-right {
        flex: 1;
        margin-left: 10px;
      }
      img {
        position: relative;
        top: 6px;
        right: 3px;
      }
      .p4 {
        font-size: 16px;
        font-weight: bold;
        color: #666666;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .view-rank {
        margin-right: 9px;
        margin-left: 5px;
        color: #7D7D7D;
      }
      .view-name {
        font-size: 14px;
        color: #666666;
        display: block;
        height: 27px;
        line-height: 35px;
      }
      .view-organization {
        font-size: 12px;
        color: #999;
        display: block;
        height: 20px;
        line-height: 23px;

      }

      .p5 {
        font-size: 16px;
        color: #666666;
        width: 45px;
      }
    }

    .view-red {
      color: #FC5921;
      font-weight: bold;
    }
  }

  /deep/ .el-rate__icon {
    font-size: 50px;
  }

</style>
