<!--金融产品-->
<template>
  <div class="history" v-cloak>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新建产品" imgType="add" type="primary" @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <el-input v-model="title" placeholder="请输入金融产品名称" style="width: 280px"   @keyup.enter.native="search" clearable />
        <base-page-button title="查询" imgType="search" type="primary" @click="search"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"
                :default-sort = "{prop: 'rank', order: 'ascending'}" v-loading="loading">
        <el-table-column  label="产品名称" prop="title" min-width="120" align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{isEmpty(row,'title')}}
          </template>
        </el-table-column>
        <el-table-column label="发文组织" min-width="120" prop="institution" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{isEmpty(row,'orgName')}}
          </template>
        </el-table-column>
        <el-table-column label="是否有效" width="180"  align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{isEmpty(row,'isEffect')}}
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="180" prop="issueTime" align="center" show-overflow-tooltip />
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="{row}">
            <base-table-a type="edit"  @click="editBtn(2,row)">编辑</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <financialservices-add ref="refAdd" @refresh="pageChange"/>
  </div>
</template>

<script>
  import {financialList} from "@/api/backstage/consulting/financial/financial.js"
  import FinancialservicesAdd from './financialservices-add'

  export default {
    components: { FinancialservicesAdd },
    data () {
      return {
        loading:true,// 加载遮罩控制条件
        title: '',// 标题
        pageNum: 1,// 当前页
        pageSize: 10,// 每页大小
        total: 0,// 总条数
        tableData: [],// 列表数据
      }
    },
    created(){
      this.pageChange ();
    },
    methods: {

      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.title = ''
        this.pageChange();
      },
      // 查询
      search(){
        this.pageNum = 1
        this.pageSize = 10
        this.pageChange ()
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "title": this.title
          },
        }
        this.loading = true;
        financialList(params).then(response => {
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

