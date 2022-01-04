<!--优秀支部-->
<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="组织名称">
        <el-input v-model="orgName" placeholder="请输入组织名称" style="width: 280px"   @keyup.enter.native="pageChange" clearable />
      </base-label-box>
      <base-label-box label="年份">
        <el-date-picker
          v-model="year"
          value-format="yyyy"
          type="year"
          placeholder="选择日期"
          @change="pageChange"
          clearable>
        </el-date-picker>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="searchList"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"
                :default-sort = "{prop: 'rank', order: 'ascending'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="党组织名称" min-width="120" prop="orgName" align="left" show-overflow-tooltip/>
        <el-table-column label="党组织排名" width="180" prop="rank" align="center" show-overflow-tooltip >
          <template slot-scope="scope">
            <img src="@/assets/page/icon-rank1.png" width="24" height="20" alt="" v-if="scope.row.rank== 1">
            <img src="@/assets/page/icon-rank2.png" width="24" height="20" alt="" v-if="scope.row.rank== 2">
            <img src="@/assets/page/icon-rank3.png" width="24" height="20" alt="" v-if="scope.row.rank== 3">
            <span v-if="scope.row.rank != 1 && scope.row.rank != 2 && scope.row.rank != 3">
              {{scope.row.rank}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="年份" width="220" prop="year" align="center" show-overflow-tooltip/>
        <el-table-column label="上传时间" width="200" prop="createTime" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.createTime | fitertime}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="{row}">
            <base-table-a type="edit"  @click="editBtn(2,row)">编辑</base-table-a>
            <base-table-a @click="editBtn(3,row)">详情</base-table-a>
            <base-table-a type="delete" @click="editBtn(4,row)">删除
            </base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      <excellent-add ref="refAdd" @refresh="pageChange"/>
      <excellent-detail ref="refDetail" @refresh="pageChange"/>
    </div>

  </div>
</template>

<script>
  import {getExcellentList,getExcellentDetele} from "@/api/backstage/party/basic/excellent/excellent.js"
  import commonReq  from "@/api/public/commonReq.js"
  import db from "@/utils/localstorage";
  import ExcellentAdd from './excellent-add'
  import ExcellentDetail from './excellent-detail'

  export default {
    components: { ExcellentAdd,ExcellentDetail },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        id:'',//此条历史记录的id
        year: '',//当前选中的年份
        orgName:"",//原组织名称
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        orgCode: db.get('USER').djOrg.code
      }
    },
    created(){
      this.pageChange ();
    },
    methods: {
      // 查询
      searchList(){
        this.pageNum = 1;
        this.pageChange()
      },
      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.year = ''
        this.orgName = ''
        this.pageChange();
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "year": this.year,
            "orgName": this.orgName,
          },
        }
        this.loading = true;
        getExcellentList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      editBtn (t, row) {
        switch (t) {
          case 1://新增
            this.$refs['refAdd'].show(t)
            break

          case 2://编辑
            this.$refs['refAdd'].show(t, row)
            break

          case 3://详情
            this.$refs['refDetail'].show(t, row)
            break
          case 4:
            this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let params = {
                id : row.id
              }
              getExcellentDetele(params).then(response => {
                this.pageChange ();
                this.$message(this.successTip())
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            break
        }
      },
    },
    filters:{
      fitertime(val){
        let timearr = val.replace(" ", ":").replace(/\:/g, "-").split("-");
        return  timearr[0]+"-"+ Number(timearr[1])+ "-" + timearr[2];
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

