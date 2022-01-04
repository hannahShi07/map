<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px" clearable >
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

    <div class="pd-20 list">
      <el-table class="base-table" border :data="tableData"  @row-click="rowClick" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="组织名称" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动主题" width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'theme')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'startTime')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动地点" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="参与人员" width="160px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'participants')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动人数" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'participantsNum')}}</span>
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
  import {getProjectList} from "@/api/front/party/regionalparty/jointactivities/jointactivities.js"
  import commonReq  from "@/api/public/commonReq.js"

  export default {
    components: {

    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        buildType:{//共建类型
          data:'党建联席活动',
          key:'2256847413879211853'
        }
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
          this.orgId=res.data.orgId;
          this.orgCode=res.data.orgCode;
          this.pageChange ();

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
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "constructionType":this.buildType.key,
            "orgCode": this.orgCode,
          },
        }
        this.loading = true;
        getProjectList(params).then(response => {
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
              this.orgId=this.list[i].id;
              this.orgCode=this.list[i].code;
            }
          }
          this.pageChange ();
        }
      },
      //点击行获取该行数据
      rowClick(row){
        this.$emit('handleSwitch', {name: 'JointactivitiesDetail', params: row})
      },
    }
  }
</script>

<style lang="scss" scoped>
  .list{
    min-height:650px;
  }
  .base-table /deep/ tr th{
    box-sizing:border-box;
  }
  .base-table /deep/  tr td{
    box-sizing:border-box;
    color:#7D7D7D;
    font-weight: 400;
  }

  .base-table /deep/ tr td:hover{
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


</style>
