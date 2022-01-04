<template>
  <div class="history" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable  v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px" clearable >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.code"
            />

          </el-select>
        </base-label-box>
      </div>
    </div>


    <div class="line"></div>
    <div class="list-content">
      <ul class='list-contentul'>
        <li>
          <div class="ul-left">
            <span class="num">{{sqrd}}</span>
            <span class="title">申请入党阶段</span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/development/dev-sqrd.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{jjfz}}</span>
            <span class="title">积极分子阶段</span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/development/dev-jjfz.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{fzdx}}</span>
            <span class="title">发展对象阶段</span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/development/dev-fzdx.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{ybdy}}</span>
            <span class="title">预备党员阶段</span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/development/dev-ybdy.png">
          </div>
        </li>
        <li>
          <div class="ul-left">
            <span class="num">{{zz}}</span>
            <span class="title">转正阶段</span>
          </div>
          <div class="ul-right">
            <img src="../../../../../../assets/page/development/dev-zzjd.png">
          </div>
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <!--列表数据-->
    <!--<div class="mr-20 ml-20 pd-20" >-->
    <div class="pd-20" >
      <el-table class="base-table" border :data="tableData" @row-click="rowClick" header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="70" align="center"/>
        <el-table-column label="姓名" min-width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="学历" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'education.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="所属组织" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'org.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所处阶段" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
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
  import db from '@/utils/localstorage'//  获取用户登录id
  import {getDevelopPersonByPage,getDevelopCount} from "@/api/front/party/development/documentary/documentary.js"
  import commonReq  from "@/api/public/commonReq.js"

  export default {
    name:"index",
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgCode:'',//组织编码

        fzdx: '', // 发展对象阶段
        jjfz: '', //积极分子阶段
        sqrd: '', // 申请入党阶段
        ybdy: '', // 预备党员阶段
        zz: '', // 转正阶段

        id:'',//此条历史记录的id
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
      }
    },
    created(){
      this.pageChange ();
      // this.getUser();
      this.getOrg();
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
          this.getCount();
          this.pageChange();

        }).finally(() => {
        });
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
        }).finally(() => {
        });
      },
      //统计
      getCount(){
        let params = {
          orgCode: this.orgCode,

          // 内部发展
          developNature: {
            key: "2272058126461460531"
          }
        }
        getDevelopCount(params).then(response => {
          const res = response;
          this.sqrd = res.sqrd // 申请入党阶段
          this.jjfz = res.jjfz //积极分子阶段
          this.fzdx = res.fzdx // 发展对象阶段
          this.ybdy = res.ybdy // 预备党员阶段
          this.zz = res.zz // 转正阶段
        }).finally(() => {
        });
      },
      //选择党组织
      selectChange(value){
        if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
          for(var i=0;i<this.list.length;i++){
            if(value==this.list[i].code){
              this.orgName=this.list[i].name;
            }
          }
          this.getCount();
          this.pageChange();
        }
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            orgCode: this.orgCode,
            // 内部发展
            developNature: {
                key: "2272058126461460531"
            }
          },
        }
        this.loading = true;
        getDevelopPersonByPage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //点击行获取该行数据
      rowClick(row){
        this.$emit('handleSwitch', {name:'DevDetail', params: row})
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
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
  }
  .base-table /deep/ tr:hover{
    cursor: pointer;
  }

  .logotxt{
    display:flex;
    align-items:center;
    line-height:36px;
    font-size: 16px;
    color: #7D7D7D;
  }
  .logotxt img{
    width:21px;
    height:17px;
    margin-right:8px;
  }

  .list-contentul{
    background:#eee;
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
    /*width:18.8%;*/
    min-width:200px;
    padding:20px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-right:20px;
    /*margin-bottom:8px;*/
    background:#fff;
  }
  .list-contentul li:last-of-type{
    /*width:calc(100% - 80% - 20px);*/
    margin-right:0;
  }
  .num{
    display:block;
    font-size: 40px;
    color: #999999;
  }
  .title{
    display:block;
    font-size: 16px;
    color: #666666;
  }
  .ul-right img{
    height:60px;
  }
</style>
