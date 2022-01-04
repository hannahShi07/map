<template>
  <div class="demeanor">
    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <el-input v-model="name" clearable maxlength="100" placeholder="请输入名称" @keyup.enter.native="pageChange()" />
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
          <el-table-column label="标题" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建人" min-width="160px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createUser')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="发布日期" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'pubdate')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="editBtn(7,row)">详情</base-table-a>
              <base-table-a type="edit" @click="editBtn(6,row)">编辑</base-table-a>
              <base-table-a type="delete" @click="editBtn(8,row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-show="!loading"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <demeanor-add ref="refEdit" @refresh="pageChange" />
      <demeanor-info ref="refInfo" @refresh="pageChange" />
  </div>
</template>

<script>
import DemeanorAdd from './demeanor-add'
import DemeanorInfo from './demeanor-info'
import {gatewayList,gatewayDelete} from "@/api/backstage/sysset/administration/gateway/gateway.js"
export default {
  components: {DemeanorAdd,DemeanorInfo},
  data () {
    return {
      loading:false,
      tableData:[],
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      type:"2412585934552439824"//园区风采
    }
  },
  created () {
    this.pageChange()
  },
  methods: {
    editBtn(t,row){
      switch (t) {
        case 1://新增
          this.$refs['refEdit'].show(t)
          break

        case 4://查询
          this.pageNum = 1;
          this.pageChange();
          break

        case 5://重置
          this.pageNum = 1;
          this.name = "";
          this.pageChange();
          break

        case 6://编辑
          this.$refs['refEdit'].show(t,row)
          break

        case 7://详情
          this.$refs['refInfo'].show(row)
          break

        case 8://删除
          this.$confirm('是否删除该条信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params={
              id:row.id
            }
            gatewayDelete(params).then(response => {
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break
      }
    },
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          name: this.name,
          type: this.type
        },
        size: this.pageSize
      }
      this.loading = true;
      gatewayList(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>
.demeanor{
  width: 100%;
  height: calc(100vh - 155px);
  background-color: #fff;
  overflow: auto;
}
.date >>> .el-input__inner{
  width: 280px
}
.fr{
  width: 560px;
  position: relative;
}
.fr >>> .el-input{
  float: left;
  width: 280px;
  height: 40px;
}
.fr >>> .el-input__inner{
  width: 280px;
  height: 40px;
}
.fr >>> .page-btn{
  margin: 0;
}
.fr >>> .el-button--primary{
  position: relative;
  margin-right: 15px;
  left: -5px;
}
.mr-20 >>> .el-table::before{
  height: 0;
}
</style>
