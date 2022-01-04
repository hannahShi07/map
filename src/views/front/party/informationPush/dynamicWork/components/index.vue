<!--工作动态前台-->
<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px"  >
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

    <!--<div class="mr-20 ml-20 pd-20">-->
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="rowClick" header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="发布组织" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动主题" min-width="200px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="开展日期" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'wageDate')}}</span>
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
    import commonReq  from "@/api/public/commonReq.js"
    import {getDynamicworkpage} from "@/api/front/party/informationPush/dynamicwork/dynamicwork.js"

    export default {
        components: {

        },
        data () {
            return {
                loading:true,//加载遮罩控制条件
                list:[],//党组织下拉框
                orgName:'',//组织名称
                orgCode:'',//组织编码
                pageNum: 1,//当前页
                pageSize: 10,//每页大小
                total: 0,//总条数
                tableData: [],//列表数据

            }
        },
        mounted(){
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
                    this.pageChange ();

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
            // 调用数据接口
            pageChange () {
                this.loading = true;
                let params = {
                    current: this.pageNum,
                    model: {orgCode: this.orgCode},
                    size: this.pageSize
                }
                getDynamicworkpage(params).then(response => {
                    const res = response;
                    this.tableData = res.records;
                    this.total = res.total;
                }).finally(() => {
                    this.loading = false;
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
                    this.pageChange ();
                }
            },
            //点击行获取该行数据
            rowClick(row){
                this.$emit('handleSwitch', {name: 'DynamicWorkDetail', params: row})
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
  .base-table /deep/ tr td:nth-of-type(2){
    text-align:left;
  }
  .base-table /deep/ tr td:nth-of-type(3){
    text-align:left;
  }
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
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
    height: 122px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    margin-right:20px;
    /*margin-bottom:12px;*/
    background:#fff;
    border-top-left-radius:14px;
    border-bottom-left-radius:14px;
  }
  .list-left{
    width:49%;
  }
  .list-right{
    width:calc(100% - 49% - 20px);
  }
  .list-contentul li:last-of-type{
    margin-right:0;
  }
  .ul-left{
    border-top-left-radius:14px;
    border-bottom-left-radius:14px;
  }
  .ul-left img{
    width:122px;
    height:122px;
  }
  .ul-right img{
    width:144px;
    height:122px;
  }
  .ul-center{
    width:calc(100% - 266px);
    height:122px;
    padding:25px 25px;
    text-align:left;
    display:flex;
    flex-flow:wrap;
    align-items:center;
  }
  .num{
    display:block;
    width:100%;
    font-size: 26px;
    font-weight: bold;
    color: #FF5044;
  }
  .num i{
    font-style: normal;
  }
  .title{
    display:block;
    width:100%;
    font-size: 16px;
    font-weight: 400;
    color: #646464;
  }

</style>
