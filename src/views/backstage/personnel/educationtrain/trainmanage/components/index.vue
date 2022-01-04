<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="开展部门" class="title1">
        <el-input v-model="department" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="培训时间" class="title1">
        <el-date-picker v-model="trainStart"  @change="selectdate" type="date" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>
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
        <el-table-column label="培训主题" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'theme')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="开展部门" width="200"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'department')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="培训地点" width="160px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训开始时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'trainStart')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="报名人数" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'percent')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'startStatus')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="360" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件:class="{'color-grad': curOrgPer('1001')}"-->
            <base-table-a type="edit" :class="{'color-grad': row.startStatus!='未开始' && row.startStatus!='未下线'}" @click="editBtn(4,row)">编辑</base-table-a>
            <base-table-a type="manage" :class="{'color-grad': row.startStatus=='已下线'}" @click="editBtn(5,row)">管理</base-table-a>
            <base-table-a type="stop" :class="{'color-grad': row.startStatus!='未开始' }" @click="editBtn(6,row)">下线</base-table-a>
            <base-table-a type="summary" :class="{'color-grad': row.startStatus=='未开始' || row.startStatus=='已下线'}" @click="editBtn(7,row)" >培训记录</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>


    <!--新增-->
    <training-add ref="refAdd" @refresh="pageChange"/>
    <!--管理-->
    <training-manage ref="refManage" @refresh="pageChange"/>
    <!--培训记录-->
    <training-record ref="refRecord" @refresh="pageChange"/>
  </div>
</template>

<script>
  import TrainingAdd from "./training-add"
  import TrainingManage from "./training-manage"
  import TrainingRecord from "./training-record"
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainList,getTrainDown} from "@/api/backstage/personnel/educationtrain/trainmanage/trainmanage.js"

  export default {
    name: "index",
    components: {
      TrainingAdd,
      TrainingManage,
      TrainingRecord
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],//列表数据
        department:'',//部门
        trainStart:'',//培训时间
      }
    },
    mounted() {
      this.pageChange ();
    },
    methods: {
      //分页调取接口数据
      pageChange () {
        if(this.trainStart!='' && this.trainStart!=undefined && this.trainStart!=null && this.trainStart!='null'){
          this.trainStart=this.trainStart+' '+'00:00:00';
        }

        let params = {
          current: this.pageNum,
          model: {
            department:this.department,
            trainStart:this.trainStart,
          },
          size: this.pageSize
        }
        this.loading = true;
        getTrainList(params).then(response => {
          console.log('列表： '+JSON.stringify(response))
          const res = response;
          this.tableData=res.records;
          this.total=res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].trainStart!='' && this.tableData[i].trainStart!=undefined && this.tableData[i].trainStart!=null && this.tableData[i].trainStart!='null'){
                this.tableData[i].trainStart=this.tableData[i].trainStart.substring(0,16)
              }
            }
          }

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
          case 1://新增、编辑
          case 4:
            this.$refs['refAdd'].show(t, row)
            break

          case 2://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 3://重置
            this.department='';
            this.trainStart='';
            this.pageNum=1;
            this.total=0;
            this.pageChange ();
            break

          case 5://管理
            this.$refs['refManage'].show(t, row)
            break

          case 6://下线
            this.$confirm('是否确认下线？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                id:row.id
              }

              getTrainDown(params).then(response => {
                //console.log('下线数据： '+JSON.stringify(response))
                this.$message(this.successTip());
                const res = response;
                this.pageChange ();

              }).finally(() => {
                //console.log("finally");
              });
            }).catch(() => {

            })
            break

          case 7://培训记录
            this.$refs['refRecord'].show(t, row)
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
    pointer-events: none!important;
    cursor: default!important;
    color:#999!important;
  }
</style>
