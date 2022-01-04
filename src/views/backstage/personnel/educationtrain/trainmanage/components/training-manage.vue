<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '880px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="姓名" class="title1">
        <el-input v-model="userName" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="手机号" class="title1">
        <el-input v-model="phone" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
    </div>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
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
        <el-table-column label="姓名" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'userName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号" width="160"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="报名时间" width="180px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
          </template>
        </el-table-column>
        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

  </el-dialog>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import {getTrainManage} from "@/api/backstage/personnel/educationtrain/trainmanage/trainmanage.js"

  export default {
    name: "training-manage",
    components:{},
    data () {
      return {
        visible: false,
        title:'管理',
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],//列表数据
        userName:'',
        phone:'',
        id:''
      }
    },
    mounted(){

    },
    methods: {
      show (t,row) {
        this.visible = true;
        this.id = row.id
        this.pageChange (row.id);
      },
      //取消
      cancel() {
        this.visible = false;
        this.userName='';
        this.phone='';
        this.tableData=[];
      },
      //分页调取接口数据
      pageChange (id) {
        let params = {
          current: this.pageNum,
          model: {
            // trainId:id,
            trainId:this.id,
            userName:this.userName,
            phone:this.phone,

          },
          size: this.pageSize
        }
        this.loading = true;
        getTrainManage(params).then(response => {
          console.log('管理列表： '+JSON.stringify(response))
          const res = response;
          this.tableData=res.records;
          this.total=res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].createTime!='' && this.tableData[i].createTime!=undefined && this.tableData[i].createTime!=null && this.tableData[i].createTime!='null'){
                this.tableData[i].createTime=this.tableData[i].createTime.substring(0,16)
              }

            }
          }

        }).finally(() => {
          this.loading = false;
        });

      },
      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 4:
            // this.$refs['refAdd'].show(t, row)
            break

          case 2://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 3://重置
            this.userName = '';
            this.phone = '';
            this.pageNum=1;
            this.total=0;
            this.pageChange();
            break
        }
      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 0 0;
  }
  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
</style>
