<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="指导企业">
        <el-input placeholder="请输入指导企业" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="指导员姓名">
        <el-input placeholder="请输入指导员姓名" v-model="guidanceName" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="指导方式">
        <el-select v-model="manner" placeholder="请选择" :editable="false" clearable @change="pageChange()">
          <el-option
            v-for="item in guidanceList"
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
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(2)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(3)"/>
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
          <el-table-column label="指导对象" min-width="240px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'enterpriseName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="指导员姓名" min-width="120px"  align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'guidanceName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="组织名称" min-width="240px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'manner.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导时间" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'guidanceTime') | processingDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="320px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="editBtn(4,row)">详情</base-table-a>
              <base-table-a type="edit" @click="editBtn(6,row)" :class="row.isNot=='1'?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="delete" @click="editBtn(7,row)" :class="row.isNot=='1'?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <!-- 新增/编辑 -->
      <record-add ref="refEdit" @refresh="pageChange" />
      <record-info ref="refInfo" />
      <!-- <instructor-record ref="refRecord" /> -->
  </div>
</template>

<script>
import {recordPage,recordDelete} from "@/api/backstage/consulting/enterprise/record/record.js"
import RecordAdd from './record-add'
import RecordInfo from '../../instructor/components/record-info'
// import InstructorRecord from './instructor-record'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    RecordAdd,
    RecordInfo,
    // InstructorRecord
  },
  data() {
    return {
      loading:false,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orgName:"",
      selfCode:"",//登录人党组织编码
      name:"",
      guidanceName:"",
      manner:"",
      tableData:[
        {
          createTime: "",//	创建时间
          createUser: '',//	创建人ID
          enterpriseId: '',//	指导对象(企业id)
          enterpriseName: "",//	企业姓名
          guidanceId: "",//	指导员id
          guidanceName: "",//	指导员姓名
          guidanceTime: "",//指导时间
          id: "",
          isNot: '',//	是否编辑(1可以2不行)
          manner: '',//	指导方式<字典表>
          orgCode: '',//组织编码
          orgName: '',//组织名称
          updateTime: '',//	最后修改时间
          updateUser: '',//最后修改人ID
        },
      ],//党费返还表格数据
      title:"",
      guidanceList:[]//
    }
  },
  mounted() {
    this.getTerm();
    this.getUser();
  },
  methods: {
    getTerm(){
      let params = {
        types:['guidance_way']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.guidanceList=response.guidance_way;
      })
    },
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          enterpriseName: this.name,
          guidanceName: this.guidanceName,
          manner: this.manner
        },
        size: this.pageSize
      }
      this.loading = true;
      recordPage(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    //跳转
    editBtn (t, row) {
      switch (t) {
        case 1: //新增
          this.$refs['refEdit'].show(t, row)
          break

        case 2://搜索
          this.pageNum = 1;
          this.pageChange()
          break

        case 3://重置
          this.pageNum = 1;
          this.guidanceName='';
          this.manner='';
          this.name='';
          this.pageChange();
          break

        case 4://详情
          this.$refs['refInfo'].show(row)
          break

        case 5:
          // this.$refs['refRecord'].show(t, row)
          break

        case 6: //编辑
          this.$refs['refEdit'].show(t, row)
          break

        case 7://删除
          this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let param = {
              id:row.id
            }
            this.loading = true;
            recordDelete(param).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break
      }
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfCode=res.data.orgCode;
        this.orgName=response.data.orgName;
        this.pageChange()
      })
    },
    // 专职/兼职
    isFullTime(val){
      for(let i=0;i<this.positionList.length;i++){
        if(val.key == this.positionList[i].id){
          return this.positionList[i].name;
        }else{
          return "--"
        }
      }
    },
    //驻派等级
    stationGrade(val){
      for(let i=0;i<this.stationList.length;i++){
        if(val.key == this.stationList[i].id){
          return this.stationList[i].name;
        }else{
          return "--"
        }
      }
    }
  },
  filters :{
    processingDate(val){
      let date=val.split(" ")[0]
      return date
    },
  }
}
</script>

<style scoped>
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .return >>> .base-label-box .base-label-box__label{
    width: auto;
  }
  .fl >>> .page-btn{
    float: left;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
