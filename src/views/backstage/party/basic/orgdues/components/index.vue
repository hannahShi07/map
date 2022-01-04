<!--组织党费-->
<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="组织名称">
        <el-input v-model="orgName" placeholder="请输入组织名称" style="width: 280px"   @keyup.enter.native="pageChange" clearable />
      </base-label-box>
<!--      <base-label-box label="年份">-->
<!--        <el-select-->
<!--          v-model="branchYear"-->
<!--          placeholder="请选择"-->
<!--          style="width: 280px"-->
<!--          @change="pageChange"-->
<!--          clearable >-->
<!--          <el-option-->
<!--            v-for="(item, index) in dicts.MENBER_MTYP"-->
<!--            :key="index"-->
<!--            :label="item.name"-->
<!--            :value="item.id"-->
<!--          />-->

<!--        </el-select>-->
<!--      </base-label-box>-->
      <base-label-box label="年份">
        <el-date-picker
          v-model="branchYear"
          type="month"
          placeholder="选择日期"
          @change="pageChange"
          clearable>
        </el-date-picker>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button imgType="export" title="导出"  @click="editBtn(1,row)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="searchList"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column label="组织名称" width="280" align="left"  fixed> </el-table-column>
        <el-table-column label="2020年党费缴纳汇总表">
        <el-table-column label="1月" width="120" prop="name" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="2月" width="120" prop="phone" align="center" show-overflow-tooltip ></el-table-column>
        <el-table-column label="3月" width="120" prop="idCode" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="4月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="5月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="6月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="7月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="8月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="9月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="10月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="11月" width="120" prop="education" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="12月" width="120" prop="education" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isEmpty(tableData[scope.$index],'djEducationSaveDTO.education.data')}}
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120"  fixed="right">
          <template slot-scope="{row}">
            <base-table-a type="detail" @click="editBtn(2,row)">明细</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

    </div>
    <orgdues-detail ref="refDetail"  @refresh="pageChange"/>
  </div>
</template>

<script>
  import {getHistoryPersonByPage,getHistoryDelet} from "@/api/backstage/party/basic/history/history.js"
  import commonReq  from "@/api/public/commonReq.js"
  import db from "@/utils/localstorage";
  import orgduesDetail from "./orgdues-detail"

  export default {
    components: {orgduesDetail},
    data () {
      return {
        loading:true,//加载遮罩控制条件
        id:'',//此条历史记录的id
        branchYear: '',//当前选中的年份
        orgName:"",//原组织名称
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        dicts: {//字典
          MENBER_MTYP: {},
        },
        orgCode: db.get('USER').djOrg.code
      }
    },
    created(){
      this.pageChange ();
      this.getDict();
    },
    methods: {
      //调用字典接口
      getDict(){
        let params = {
          types:['MENBER_MTYP']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.MENBER_MTYP = res.MENBER_MTYP;
        })
      },
      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.branchYear = ''
        this.orgName = ''
        this.pageChange();
      },
      searchList(){
        this.pageNum = 1;
        this.pageChange();
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "branchYear": this.branchYear,
            "orgName": this.orgName,
          },
        }
        this.loading = true;
        getHistoryPersonByPage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      editBtn (t, row) {
        switch (t) {
          case 1://导出
            this.$refs['refAdd'].show(t, row)
            break

          case 2://明细
            this.$refs['refDetail'].show(t,row)
            break

        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .gray{
    pointer-events: none;
    cursor: default;
    color: #cccccc;
  }
</style>

