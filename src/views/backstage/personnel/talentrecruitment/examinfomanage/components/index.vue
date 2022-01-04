<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="信息标题" class="title1">
        <el-input v-model="title" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="发布单位" class="title1">
        <el-input v-model="publishOrg" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="发布日期" class="title1">
        <el-date-picker v-model="publishDate"  @change="selectdate" type="date" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>
      </base-label-box>
    </div>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(2)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(3)"/>
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
        <el-table-column label="信息标题" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布单位" min-width="200"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'publishOrg')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'publishDate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件:class="{'color-grad': curOrgPer('1001')}"-->
            <base-table-a @click="editBtn(5,row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(4,row)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(6,row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>


    <!--新增-->
    <exam-add ref="refAdd" @refresh="pageChange"/>

  </div>
</template>

<script>
  import ExamAdd from "./exam-add"
  import commonReq  from "@/api/public/commonReq.js"
  import {getExamList,getExamDelete} from "@/api/backstage/personnel/talentrecruitment/examinfomanage/examinfomanage.js"
  export default {
    name: "index",
    components: {
      ExamAdd
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],//列表数据
        title:'',//信息标题
        publishOrg:'',//发布单位
        publishDate:'',//发布时间

      }
    },
    mounted() {
      this.pageChange ();
    },
    methods: {
      //分页调取接口数据
      pageChange (num) {
        if((typeof num) === 'number'){
          this.pageNum = num
        }

        let params = {
          current: this.pageNum,
          model: {
            title:this.title,
            publishOrg:this.publishOrg,
            publishDate:this.publishDate
          },
          size: this.pageSize
        }
        this.loading = true;
        getExamList(params).then(response => {
          //console.log('列表： '+JSON.stringify(response))
          const res = response;
          this.tableData=res.records;
          this.total=res.total;

        }).finally(() => {
          this.loading = false;
        });

      },

      selectdate(val){
        this.editBtn(2)
      },

      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 4:
            this.$refs['refAdd'].show(t, row)
            break

          case 2://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 3://重置
            this.title='';
            this.publishOrg='';
            this.publishDate='';
            this.pageNum=1;
            this.total=0;
            this.pageChange ();
            break

          case 5://详情
            this.$emit('handleSwitch', {name: 'ExamDetail', params: row})
            break

          case 6://删除
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                id:row.id
              }

              getExamDelete(params).then(response => {
                //console.log('删除数据： '+JSON.stringify(response))
                // this.$message.success("删除成功")
                this.$message(this.successTip())
                const res = response;
                this.pageChange ();

              }).finally(() => {

              });
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

  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  .title /deep/ .base-label-box__label{
    width:40px;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999
  }
</style>
