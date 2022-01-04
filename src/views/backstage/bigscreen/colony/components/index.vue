<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="产业链类型">
        <el-select
          v-model="industryType"
          placeholder="请选择"
          :editable="false"
          clearable
          @change="checkHandle()">
          <el-option
            v-for="item in industryCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
    </div>

    <!-- 按钮 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button
          title="新增"
          imgType="add"
          type="primary"
          @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <base-page-button
          title="查询"
          imgType="search"
          type="primary"
          @click="editBtn(4)"/>
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

        <el-table-column label="产业链类型" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'industryTypeName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产值(亿元)" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'outputValue')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="产值同期增长(%)" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'growthRate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="重点项目(个)" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'projectNum')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="项目总投资(亿)" min-width="200px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'investment')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="detail" @click="editBtn(7,row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(6,row)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(8,row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination
        :total="total"
        :pageNum.sync="pageNum"
        :pageSize.sync="pageSize"
        @pageChange="pageChange"/>
    </div>
    <!-- 新增/编辑 -->
    <colony-add ref="refEdit" @refresh="pageChange" />
    <colony-info ref="refInfo" @refresh="pageChange"/>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import colonyAdd from './colony-add'
  import colonyInfo from './colony-info'
  import {gatColonyList,gatColonyDelete} from "@/api/backstage/sysset/bigscreen/colony/colony.js"
  export default {
    name: "index",
    components: {
      colonyAdd,
      colonyInfo,
    },
    data () {
      return {
        // 遮罩标识
        loading:false,
        // 列表数据
        tableData:[
          {
            // 产业链类型
            industryType: '智能电器产业链',
            // 产值
            outputValue: 18.05,
            // 产值同期增长
            growthRate: 18.21,
            // 重点项目数
            projectNum: 12,
            // 项目总投资
            investment: 288.01
          }
        ],
        // 产业链类型 - 当前类型
        industryType:'',
        // 产业链类型 - 当前类型
        industryCategoryList:[],
        // 总条数
        total:0,
        // 当天页数
        pageNum:1,
        // 每页条数
        pageSize:10,
      }
    },
    created () {
      this.pageChange()
      this.getTerm()
    },
    methods: {
      // 获取字典表数据
      getTerm(){
        let params = {
          types:['INDUSTRY_TYPE']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.industryCategoryList=response.INDUSTRY_TYPE;
        })
      },
      // 点击事件
      editBtn(t,row){
        switch (t) {
          // 新增
          case 1:
            this.$refs['refEdit'].show(t)
            break

          // 查询
          case 4:
            this.pageNum = 1;
            this.pageChange();
            break

          // 重置
          case 5:
            this.pageNum = 1;
            this.industryType = "";
            this.pageChange();
            break

          // 编辑
          case 6:
            this.$refs['refEdit'].show(t,row)
            break

          // 详情
          case 7:
            this.$refs['refInfo'].show(row)
            break

          // 删除
          case 8:
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              // 将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
              dangerouslyUseHTMLString: true
            }).then(() => {
              // 确认删除
              let params={
                id:row.id
              }
              gatColonyDelete(params).then(response => {
                this.pageChange();
              }).finally(() => {
                this.loading = false;
              });
            }).catch(() => {

            })
            break
        }
      },
      // 筛选
      checkHandle(){
        this.pageNum = 1
        this.pageChange()
      },
      // 获取列表数据
      pageChange(){
        let params = {
          current: this.pageNum,
          model: {
            industryType:this.industryType,
          },
          size: this.pageSize
        }
        this.loading = true;
        gatColonyList(params).then(response => {
          this.tableData = response.records;
          this.total = response.total;
          this.loading = false;
        }).finally(() => {
          this.loading = false;
        });
      },
    },
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
  .mr-20 >>> .el-table::before{
    height: 0;
  }
</style>
