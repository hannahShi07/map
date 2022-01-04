<template>
  <div class="members-first">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <el-form ref="refForm" :model="formData"  class="information" v-loading="loading" >
        <el-row>
          <el-col :span="12">
            <el-form-item label="单位名称">
              <el-input v-model="formData.id" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间" >
              <el-date-picker
                v-model="formData.id"
                type="date"
                :clearable = "false"
                :editable="false"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <el-date-picker
                v-model="formData.id"
                type="date"
                clearable
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="党员姓名" >
              <el-input v-model="formData.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="fr">
              <base-page-button title="重置" imgType="reset" />
              <base-page-button title="查询" imgType="search" type="primary" />
            </div>
          </el-col>
        </el-row>

      </el-form>
      <!-- 表格 -->
      <div>
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          header-row-class-name="page-table-header"
          ref="returnTable"
          :data="records"
          v-loading="loading"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="党员姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="身份证号" min-width="100px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'position.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="应交数额" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>


          <!-- 空数据样式 -->
          <base-table-empty v-show="!loading" slot="empty"/>
        </el-table>
       <div class="total">
         <span>合计</span>
         <span style="color: #ED3C3C">1210.81</span>
         <hr style="border-bottom:1px;border-bottom-color: #E8E8E8;opacity: 1; "/>
       </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {editElectionList} from "@/api/backstage/party/class/election/election.js"
  export default {
    name: "orgdues-detail",
    components: {},
    data() {
      return {
        visible:false,
        title:"明细",
        pageNum:1,
        pageSize:10,
        total:0,
        loading:true,
        records:[],
        formData:{
          id:'',
        },
      }
    },
    mounted() {
    },
    computed: {

    },
    watch: {

    },
    methods: {
      // 展示
      show(name,id){
        this.visible = true;
        this.loading = true;
        this.loading = false;
      },
      //关闭弹窗
      close(){
        this.records=[];
        this.visible = false;
      },
    }
  }
</script>

<style scoped>
  .members-first >>> .el-dialog{
    width: 887px;
  }
  .members-first >>> .el-input{
    width: 300px;
  }
  .members-first >>> .el-date-editor{
    width: 155px;
  }
  .information{
    padding-left:34px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F3F3;
  }
  .fl{
    padding: 20px 0;
  }
  .members-first >>> .el-form-item__label{
    width: 80px;
  }
  .total{
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-bottom:1px;
    border-bottom-color: #E8E8E8;
  }
</style>
