<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="search-box">
      <base-label-box label="党组织选择">
        <el-select
          filterable
          v-model='orgCode'
          @change="selectparty"
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
      <base-page-button title="会议统计" @click="editBtn()"/>
    </div>


    <div class="bc-width pb-30">
      <div class="title-box">
        <span class="title-logo">
          <i class="iconfont icon-fenxi"></i>
          会议统计
        </span>
        <div class="year">
          <i class="el-icon-arrow-left lt" @click="reduceYear"></i>
          <el-date-picker
            v-model="year"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="selectYear"
            :clearable="false">
          </el-date-picker>
          <div class="year-text">年</div>
          <i class="el-icon-arrow-right gt" @click="addYear"></i>
        </div>

      </div>

      <div class="mr-20 ml-20 mp-20" v-cloak>
        <el-table
          v-loading="loading"
          border
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="会议类型" min-width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'meetingType.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="一月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'january')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="二月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'february')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="三月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'march')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="四月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'april')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="五月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'may')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="六月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'june')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="七月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'july')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="八月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'august')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="九月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'september')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="十月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'october')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="十一月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'november')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="十二月" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'december')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

<!--        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>-->
      </div>

    </div>

  </div>
</template>

<script>

  import db from "@/utils/localstorage";
  import commonReq from "@/api/public/commonReq";
  import {getMeetinglist} from "@/api/backstage/statistical/analysis/meetingstatistical/meetingstatistical.js"

  export default {
    name: "index",
    components: {

    },
    data() {
      return {
        loading:false,//加载遮罩控制条件
        // pageNum: 1,
        // pageSize: 10,
        // total: 0,
        tableData:[],
        year:(new Date().getFullYear()).toString(),//选择年份

        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码

      }
    },
    mounted() {
      this.getOrg();
      this.pageChange ();
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
            this.orgCode="";
            this.orgName="";
            this.orgId="";
          }else{
            this.list=res;
            this.getUser();
          }

        })
      },
      //分页调取接口数据
      pageChange () {
        let params = {
          orgCode:this.orgCode,
          year:this.year
        }
        this.loading = true;
        getMeetinglist(params).then(response => {
          const res = response;
          this.tableData = res;
          // this.total = res.total;

        }).finally(() => {
          this.loading = false;
        });

      },

      selectparty(val){
        this.pageChange()
      },
      //选择年份
      selectYear(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.pageChange()
        }
      },
      addYear(){
        this.year = parseInt(this.year)+1+"";
        this.pageChange()

      },
      reduceYear(){
        this.year = parseInt(this.year)-1+"";
        this.pageChange()
      },

      //查询
      editBtn () {
        // this.pageNum=1;
        this.pageChange()
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
  /deep/ .el-table tr td:first-of-type{
    font-weight: bold;
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


  .year{
    display:flex;
    justify-content:flex-end;
    align-items:center;
    margin-top:0;
  }
  .lt,.gt{
    height: 36px;
    width: 15px;
    padding:10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
    font-size: 14px;
    color:#666;
  }
  .year >>> .el-input__inner{
    border:none;
    outline: none;
    padding:0;
    cursor:pointer;
    width: 38px;
    display: inline-block;
    font-size: 14px;
    color:#666;
    line-height: 4;
  }
  .year >>> .el-icon-date::before{
    content: "";
  }
  .year >>> .el-date-editor--year{
    width: 38px;
    float: left;
    margin-left:7px;
  }
  .year-text{
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
    color:#666;
  }

</style>
