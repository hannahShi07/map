<template>
  <div class="week">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="创建组织">
        <el-input placeholder="请输入创建组织" v-model="orgName" @keyup.enter.native="pageChange()" clearable maxlength="100"/>
      </base-label-box>
      <base-label-box label="计划播放时间">
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="选择计划播放年份"
          format="yyyy"
          value-format="yyyy"
          :picker-options="pickerOptions"
          style="width:280px;"
          @change="changeYear()">
        </el-date-picker>
        <el-date-picker
          v-model="playDate"
          type="month"
          placeholder="选择计划播放月份"
          format="yyyy-MM"
          value-format="yyyy-MM"
          :disabled="!year"
          :default-value="new Date(year).getTime()"
          :picker-options="monthOptions"
          style="width:280px;"
          @change="pageChange()">
        </el-date-picker>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
        <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
        <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
      </div>
    </div>

    <!-- 表格 -->
    <div class="mr-20 ml-20" v-cloak>
      <el-table
        v-loading="loading"
        class="table"
        tooltip-effect="dark"
        style="width:100%;margin: 0 auto"
        ref="returnTable"
        :data="tableData"
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column label="序号" width="50px" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建组织" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="计划播放时间" min-width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'playDate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="播放内容" min-width="300px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'content')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="edit" @click="editBtn(6,row)" :class="selfOrgId==row.orgId?'':'color-grad'">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(7,row)" :class="selfOrgId==row.orgId?'':'color-grad'">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <!-- 新增/编辑 -->
    <year-add ref="refEdit" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" title="导入年度播放计划信息" :action="action" :otherData='{}' :templateUrl='templateUrl' :templateName='templateName'/>
  </div>
</template>

<script>
import {yearPage,deleteYear,getHistoryExport} from "@/api/backstage/education/year/year.js"
import YearAdd from './year-add'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    YearAdd
  },
  data() {
    return {
      loading:false,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      playDate:"",//建立时间
      year:"",
      orgName:"",
      selfOrgId:"",
      tableData:[
        {
          "content": "",// 	播放内容
          "id": 0,
          "orgCode": "",
          "orgId": 0,// 	组织id
          "orgName": "",// 组织名称
          "playDate": "",// 	计划播放日期
        }
      ],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/broadcast/year/importExcel`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/ndbfjh.xlsx`,//年播放计划导入模板
      templateName:"年播放计划导入模板.xlsx",
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      },
      monthOptions:{}
    }
  },
  mounted() {
    this.getUser()
    this.pageChange()
  },
  methods: {
    //分页
    pageChange(){
      let playDate=""
      if(!this.year){
        this.playDate=""
      }
      if(!this.playDate){
        if(this.year){
          playDate=this.year+"-01-01";
        }else{
          playDate=""
        }
      }else{
        playDate=this.playDate+"-01";
      }
      let params = {
        current: this.pageNum,
        model: {
          orgName: this.orgName,
          playDate: playDate,
        },
        size: this.pageSize
      }
      this.loading = true;
      yearPage(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    // 按钮点击事件
    editBtn(t,row){
      switch(t){
        case 1:
          this.$refs['refEdit'].show(1);
          break;
        case 2://导入
          this.$refs['refImport'].show(t, row)
          break
        case 3:
          this.exportExc();
          break
        case 4:
          this.pageNum = 1;
          this.pageChange();
          break;
        case 5:
          this.pageNum = 1;
          this.playDate="";
          this.orgName="";
          this.year="";
          this.pageChange();
          break;
        case 6:
          this.$refs['refEdit'].show(t,row);
          break;
        case 7:
           this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params = {
              ids:[row.id]
            }
            deleteYear(params).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {

            });
          }).catch(() => {

          })
          break;
      }
    },
    // 导出
    exportExc(){
      let playDate=""
      if(!this.playDate){
        if(this.year){
          playDate=this.year+"-01-01";
        }else{
          playDate=""
        }
      }else{
        playDate=this.playDate+"-01";
      }
      let params = {
        orgName: this.orgName,
        playDate: playDate
      }
      getHistoryExport(params);
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfOrgId=res.data.orgId;
      })
    },
    changeYear(){
      let _this = this;
      this.playDate = "";
      this.monthOptions={
        disabledDate(time) {
          if (_this.year != time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  }
}
</script>

<style scoped>
  .week{
    height: 100%;
  }
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .week >>> .base-label-box__label{
    width: auto;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
