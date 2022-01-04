<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
<!--        <base-label-box label="组织名称">-->
<!--          <el-input placeholder="请输入" style="width: 280px" clearable/>-->
<!--        </base-label-box>-->
        <base-label-box label="活动主题">
          <el-input v-model="theme" placeholder="请输入" @keyup.enter.native="editBtn(3)" style="width: 280px" clearable/>
        </base-label-box>
        <base-label-box label="开始时间">
          <el-date-picker v-model="startDate" type="date" @change="selectdate" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(2)"/>

        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(3)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(4)"/>
        </div>
      </div>

      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="党组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动主题" width="200"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'theme')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" width="160"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'startTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动地点" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="参与人员" width="160"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'participantsName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(5,row)">编辑</base-table-a>
              <base-table-a @click="editBtn(6,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(7,row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>


    <!--新增-->
    <activedcommunity-add ref="refAdd" @refresh="pageChange"/>
    <!--详情-->
    <activedcommunity-detail ref="refDetail" @refresh=""/>
  </div>
</template>

<script>
  import ActivedcommunityAdd from "./activedcommunity-add"
  import ActivedcommunityDetail from "./activedcommunity-detail"
  // import commonReq  from "@/api/public/commonReq.js"
  import {getActivedList,getActivedDetele,getActivedExport} from "@/api/backstage/party/orglife/activedcommunity/activedcommunity.js"

  export default {
    name: "index",
    components: {
      ActivedcommunityAdd,
      ActivedcommunityDetail

    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],
        orgId:'',//党组织id
        orgName:'',//党组织名称
        orgCode:'',//组织编码
        theme:'',//活动主题
        startDate:'',//开始时间

      }
    },
    mounted() {
      this.pageChange ();
    },
    methods: {
      //分页调取接口数据
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {
            orgId: this.orgId,
            orgCode:this.orgCode,
            startDate: this.startDate,
            theme: this.theme
          },
          size: this.pageSize
        }
        this.loading = true;
        getActivedList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].participantsName=this.tableData[i].participantsName.replace(/^,+/,"").replace(/,+$/,"");
          }

        }).finally(() => {
          this.loading = false;
        });

      },
      //组织树点击事件
      handleTreeClick (row) {
        this.orgId=row.id;
        this.orgName=row.name;
        this.orgCode=row.code;
        this.pageChange ();

      },
      selectdate(val){
        this.editBtn(3)
      },

      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 5:
            this.$refs['refAdd'].show(t, row)
            break

          case 2://导出
            let params = {
              current: this.pageNum,
              model: {
                // orgId: this.orgId,
                // orgName: this.orgName,
                orgCode:this.orgCode,
                startDate: this.startDate,
                theme: this.theme
              },
              size: this.pageSize
            }
            getActivedExport(params);

            break

          case 3://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 4://重置
            this.orgId='';
            this.orgName='';
            this.orgCode='';
            this.startDate='';
            this.theme='';
            this.pageNum=1;
            this.total=0;
            // this.pageChange ();
            this.$refs.refTree.getTree("clear")//重置左侧组织树
            break

          case 6://详情
            this.$refs['refDetail'].show(t, row)
            break

          case 7://删除
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                ids:[row.id]
              }

              getActivedDetele(params).then(response => {
                // this.$message.success("删除成功")
                this.$message(this.successTip())
                const res = response;
                this.pageChange ();
              })
            }).catch(() => {

            })
            break

        }
      },
    }
  }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #eee;
  }


</style>
