<template>
  <div class="collection" v-cloak>
    <div class="logo-top clearfix">
      <div class="fr">
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
          <el-date-picker
            v-model="queryMonth"
            :editable="false"
            type="month"
            format="yyyy-MM"
            value-format="yyyy-MM"
            @change="getList()"
            :picker-options="pickerOptions"
            :clearable="false">
          </el-date-picker>
          <i class="iconfont icon-xingzhuang1357 gt" @click="addYear"></i>
        </div>
      </div>
    </div>
    <div class="teble-line"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" :header-cell-style="{'text-align':'center'}" @row-click="goLink"  header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="发布组织" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'createTime') | processingDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐播放时间" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'playDate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="链接地址" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'link')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="播放内容" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'content')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
  </div>
</template>

<script>
import {getWeekList} from "@/api/front/education/week/week.js"
export default {
  name: "index",
  components: {},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:10,
      queryMonth:"",
      tableData:[],
      loading:false,
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted(){
    let month="";
    if(new Date().getMonth()+1 <10 ){
      month = "0"+(new Date().getMonth()+1)
    }else{
      month = ""+(new Date().getMonth()+1)
    }
    this.queryMonth=new Date().getFullYear()-1+"-"+month;
    this.getList();
  },
  activated() {

  },
  methods: {
    getList(){
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{
          queryMonth:this.queryMonth,
        },
        size:this.pageSize
      }
      getWeekList(params).then(response => {
        this.total = response.total;
        this.tableData = response.records;
        this.loading=false;
      }).finally(() => {
        this.loading=false;
      });
    },
    pageChange(){
      this.getList();
    },
    addYear(){
      let month=this.queryMonth.split("-")[1];
      let year=this.queryMonth.split("-")[0];
      if(parseInt(month)+1>12){
        this.queryMonth = parseInt(year)+1+"-01";
      }else{
        if(parseInt(month)<9){
          this.queryMonth = year+"-0"+(parseInt(month)+1);
        }else{
          this.queryMonth = year+"-"+(parseInt(month)+1);
        }
      }
      this.getList();
    },
    reduceYear(){
      let month=this.queryMonth.split("-")[1];
      let year=this.queryMonth.split("-")[0];
      if(parseInt(month)-1<1){
        this.queryMonth = parseInt(year)-1+"-12";
      }else{
        if(parseInt(month)>10){
          this.queryMonth = year+"-"+(parseInt(month)-1);
        }else{
          this.queryMonth = year+"-0"+(parseInt(month)-1);
        }
      }
      this.getList();
    },
    goLink(row){
      let p = window.location.protocol;
      let a = document.createElement("a");
      if(row.link.indexOf("http://")!=-1||row.link.indexOf("https://")!=-1){
        a.setAttribute("href", row.link);
      }else{
        a.setAttribute("href", `${p}//`+row.link);
      }
      a.setAttribute("target", "_blank");
      a.click();
      document.getElementsByTagName("body")[0].appendChild(a);
    }
  },
  filters:{
    processingDate(val){
      let date=val.split(" ")[0]
      return date
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:boder-box
  }
  .base-table /deep/ tr td{
    box-sizing:boder-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
  }
  .teble-line{
    width:100%;
    height:10px;
    background:#eee;
  }
  .collection{
    min-width: 1318px;
    position: relative;
  }
  .collection >>> .el-tooltip{
    width: 100% !important;
  }
  .collection >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
  .year{
    width: 115px;
    display: inline-block;
    background-color: #fff;
    z-index: 999;
    float: left;
  }
  .year >>> .el-date-editor{
    width: 65px;
    float: left;
    margin:0 10px;
  }
  .year >>> .el-date-editor .el-input__inner{
    width: 100%;
  }
  .lt,.gt{
    height: 36px;
    width: 15px;
    padding:10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
  }
  .year >>> .el-input__inner{
    border:none;
    outline: none;
    padding:0;
    cursor:pointer;
    width: 38px;
    display: inline-block;
    font-size: 16px;
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
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
  }
</style>
