<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="项目名称">
        <el-input placeholder="请输入项目名称" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="行业分类">
        <el-select v-model="industryCategory" placeholder="请选择" :editable="false" clearable @change="pageChange()">
          <el-option
            v-for="item in industryCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
      <base-label-box label="项目载体">
        <el-select v-model="carrier" placeholder="请选择" :editable="false" clearable @change="pageChange()">
          <el-option
            v-for="item in carrierList"
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
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
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
          <el-table-column label="项目名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="投资总额(万元)" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'investment')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="行业分类" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'industryCategory.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="合作方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'cooperationType.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目联系人" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'contacts')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'contact')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="项目载体" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'carrier.data')}}</span>
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

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <!-- 新增/编辑 -->
      <recommend-add ref="refEdit" @refresh="pageChange" />
      <recommend-info ref="refInfo" @refresh="pageChange"/>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import RecommendAdd from './recommend-add'
import RecommendInfo from './recommend-info'
import {gatewayList,gatewayDelete} from "@/api/backstage/sysset/administration/gateway/gateway.js"
export default {
  name: "index",
  components: {
    RecommendAdd,
    RecommendInfo,
  },
  data () {
    return {
      loading:false,
      industryCategory:"",
      carrier:"",
      tableData:[],
      industryCategoryList:[],//行业分类
      cooperationTypeList:[],//合作方式
      carrierList:[],//项目载体
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      type:"2412585934552456725"//推荐项目
    }
  },
  created () {
    this.pageChange()
    this.getTerm()
  },
  methods: {
    getTerm(){
      let params = {
        types:['dj_industry','cooperation_ways','project_carrier']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.industryCategoryList=response.dj_industry;
        this.cooperationTypeList=response.cooperation_ways;
        this.carrierList=response.project_carrier;
      })
    },
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
          this.carrier = "";
          this.industryCategory = "";
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
          carrier:this.carrier,
          industryCategory:this.industryCategory,
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
    },
    industryCategoryChange(val){
      for(let i=0;i<this.industryCategoryList.length;i++){
        if(val == this.industryCategoryList[i].id){
          return this.industryCategoryList[i].name;
        }
      }
      return "--"
    },
    cooperationTypeChange(val){
      for(let i=0;i<this.cooperationTypeList.length;i++){
        if(val == this.cooperationTypeList[i].id){
          return this.cooperationTypeList[i].name;
        }
      }
      return "--"
    },
    carrierChange(val){
      for(let i=0;i<this.carrierList.length;i++){
        if(val == this.carrierList[i].id){
          return this.carrierList[i].name;
        }
      }
      return "--"
    }
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
