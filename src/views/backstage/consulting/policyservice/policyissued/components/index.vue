<!--政策下发-->
<template>
  <div class="history">
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增政策" imgType="add" type="primary" @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <el-input v-model="orgName" placeholder="请输入政策/文件名称" style="width: 280px"   @keyup.enter.native="search" clearable />
        <base-page-button title="查询" imgType="search" type="primary" @click="search"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak v-loading="loading">
      <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"
                :default-sort = "{prop: 'rank', order: 'ascending'}" >
        <el-table-column  label="政策/文件名称" prop="title" min-width="120" align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
              <span >{{isEmpty(row,'title')
                }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来源" min-width="120" prop="source" align="left" show-overflow-tooltip>
          <template slot-scope="{row}">
              <span >{{isEmpty(row,'source')
                }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公开范围" width="180" prop="openRange" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
              <span >{{getOpenrange(row.openRange)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有效" width="180" prop="isValid" align="center" show-overflow-tooltip >
          <template slot-scope="scope">
            <span :class="tableData[scope.$index].isValid=='是'?'':'red'">{{isEmpty(tableData[scope.$index],'isValid')
              }}</span>
          </template>
        </el-table-column>
        <el-table-column label="公示日期" width="180" prop="releaseTime" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
              <span >{{isEmpty(row,'releaseTime')
                }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" prop="state" align="center" show-overflow-tooltip >
          <template slot-scope="{row}">
            <span >{{isEmpty(row,'state.data')
              }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="{row}">
            <base-table-a type="edit"  @click="editBtn(2,row)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(3,row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <policyissued-add ref="refAdd" @refresh="refresh" />
  </div>
</template>

<script>
  import {policyPage,policyDelet} from "@/api/backstage/consulting/policyservice/policyissued/policyissued.js"
  import commonReq  from "@/api/public/commonReq.js"
  import db from "@/utils/localstorage";
  import PolicyissuedAdd from './policyissued-add'

  export default {
    components: { PolicyissuedAdd },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        id:'',//此条历史记录的id
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
      // 刷新
      refresh(){
        this.pageNum = 1
        this.pageChange()
      },
      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.orgName = ''
        this.pageChange();
      },
      // 查询
      search(){
        this.pageNum = 1
        this.pageChange ()
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "title": this.orgName,
          },
        }
        this.loading = true;
        policyPage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      editBtn (t, row) {
        switch (t) {
          case 1:// 新增
            this.$refs['refAdd'].show(t)
            break

          case 2:// 编辑
            this.$refs['refAdd'].show(t, row)
            break

          case 3:// 删除
            this.deletFun(row)
            break
        }
      },
      // 删除
      deletFun(row){
        let params = [{
          id: row.id,
          areaIdentifier: row.areaIdentifier,
          pid: row.pid
        }]
        policyDelet(params).then(response => {
          this.$message(this.successTip())
          this.pageChange ()
        }).catch(() => {
          this.$message("操作失败")
        });
      },
      getOpenrange(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          if(val==1){
            return '公开'
          }else if(val==2){
            return '组织内部'
          }
        }else{
          return '--'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gray{
    pointer-events: none;
    cursor: default;
    color: #cccccc;
  }
  .red{
    color: #FF4E4E;
  }
</style>

