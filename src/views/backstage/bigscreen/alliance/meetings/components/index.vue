<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="会议类型">
        <el-select v-model="meetingType.key" placeholder="请选择" :editable="false" clearable @change="checkHandle()">
          <el-option
            v-for="item in meetingList"
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
        <!--<base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>-->
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
        <el-table-column label="会议类型" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'meetingType.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="联盟党建联席会内容" min-width="200px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'content')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260px" align="center" show-overflow-tooltip>
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
    <meetings-add ref="refEdit" @refresh="pageChange" />
    <meetings-info ref="refInfo" @refresh="pageChange"/>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import meetingsAdd from './meetings-add'
  import meetingsInfo from './meetings-info'
  import {getMeetingsList,getMeetingsDetele} from "@/api/backstage/sysset/bigscreen/alliance/meetings/meetings.js"
  export default {
    name: "index",
    components: {
      meetingsAdd,
      meetingsInfo,
    },
    data () {
      return {
        loading:false,
        tableData:[],
        meetingList:[],//会议类型
        total:0,
        pageNum:1,
        pageSize:10,
        meetingType:{key:'',data:''},  //会议类型(字典值)
      }
    },
    mounted () {
      this.pageChange()
      this.getTerm()
    },
    methods: {
      getTerm(){
        let params = {
          types:['meeting_type']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.meetingList = response.meeting_type;
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
            this.meetingType = {key:'',data:''},  //会议类型(字典值)
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
                id:row.id,
                isDelete:1
              }
              getMeetingsDetele(params).then(response => {
                this.$message(this.successTip())
                const res = response;
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
      pageChange(){
        let params = {
          current: this.pageNum,
          model: {
            meetingType:this.meetingType,
          },
          size: this.pageSize
        }
        this.loading = true;
        getMeetingsList(params).then(response => {
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
