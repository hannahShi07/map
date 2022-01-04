<template>
  <div class="return">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="指导员姓名">
        <el-input placeholder="请输入指导员姓名" v-model="name" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="联系方式">
        <el-input placeholder="请输入联系方式" v-model="phone" clearable maxlength="100" @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="驻派等级">
        <el-select v-model="station" placeholder="请选择" :editable="false" clearable @change="pageChange()">
          <el-option
            v-for="item in stationList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
      <base-label-box label="状态">
        <el-select v-model="isDelete" placeholder="请选择" :editable="false" clearable @change="pageChange()">
          <el-option
            v-for="item in option"
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
          <el-table-column label="指导员姓名" min-width="120px" align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" min-width="120px"  align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="驻派等级" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{stationGrade(isEmpty(tableData[scope.$index],'stationGrade'))}}</span>
            </template>
          </el-table-column>
          <el-table-column label="专职/兼职" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isFullTime(isEmpty(tableData[scope.$index],'isFullTime'))}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'isDelete') | isDelete}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime') | processingDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="320px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="editBtn(4,row)" :class="selfCode=='1001'?'':'color-grad'">详情</base-table-a>
              <base-table-a type="detail" @click="editBtn(5,row)">指导员记录</base-table-a>
              <base-table-a type="edit" @click="editBtn(6,row)">编辑</base-table-a>
              <base-table-a type="stop" @click="editBtn(7,row)" v-if="row.isDelete == 0">停用</base-table-a>
              <base-table-a type="start" @click="editBtn(7,row)" v-else>启用</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <!-- 新增/编辑 -->
      <instructor-add ref="refEdit" @refresh="pageChange" />
      <instructor-info ref="refInfo" />
      <instructor-record ref="refRecord" />
  </div>
</template>

<script>
import {guidancePage,updateGuidance} from "@/api/backstage/consulting/enterprise/instructor/instructor.js"
import InstructorAdd from './instructor-add'
import InstructorInfo from './instructor-info'
import InstructorRecord from './instructor-record'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
import Vue from "vue"
export default {
  name: "index",
  components: {
    InstructorAdd,
    InstructorInfo,
    InstructorRecord
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
      phone:"",
      station:"",
      isDelete:"",
      tableData:[
        {
          "company": "",//	所属企业
          "createTime": "",//	创建时间
          "createUser": 0,//	创建人ID
          "enterpriseId": "",//	指导企业id(多选企业)
          "frequency": 0,//走访频率<字典表>
          "frequencyTime": "",//走访频次
          "id": 0,//	主键
          "idCode": "",//	身份证号码
          "isDelete": 0,//	是否删除
          "isFullTime": "",//专职/兼职(字典表)
          "name": "",//指导员姓名
          "orgCode": "",//	所属组织
          "phone": 0,//	联系电话
          "position": "",//担任职务
          "remarks": "",//备注
          "stationGrade": 0,//	驻派等级<县级党建指导员/区级联络员>
          "updateTime": "",//	最后修改时间
          "updateUser": 0//	最后修改人ID
        },
      ],//党费返还表格数据
      title:"",
      stationList:[],//驻派等级
      positionList:[],//职务类型
      option:[{
        id:"0",
        name:"启用"
      },{
        id:"1",
        name:"停用"
      }]
    }
  },
  mounted() {
    this.getTerm();
    this.getUser();
  },
  methods: {
    getTerm(){
      let params = {
        types:['station_grade','position_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.stationList=response.station_grade;
        this.positionList=response.position_type;
      })
    },
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          name: this.name,
          phone: this.phone,
          isDelete: this.isDelete,
          stationGrade:this.station
        },
        size: this.pageSize
      }
      this.loading = true;
      guidancePage(params).then(response => {
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
          this.phone='';
          this.name='';
          this.isDelete='';
          this.station='';
          this.pageNum = 1;
          this.pageChange();
          break

        case 4://详情
          this.$refs['refInfo'].show(t, row)
          break

        case 5:
          this.$refs['refRecord'].show(t, row)
          break

        case 6: //编辑
          this.$refs['refEdit'].show(t, row)
          break

        case 7://删除
          // this.$confirm('是否删除该条信息？', '提示', {
          //     confirmButtonText: '确定',
          //     cancelButtonText: '取消',
          //     type: 'warning',
          //     dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          // }).then(() => { //确认删除
            let param = {
              id:row.id
            }
            this.loading = true;
            updateGuidance(param).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          // }).catch(() => {

          // })
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
        }
      }
      return "--"
    },
    //驻派等级
    stationGrade(val){
      for(let i=0;i<this.stationList.length;i++){
        if(val.key == this.stationList[i].id){
          return this.stationList[i].name;
        }
      }
      return "--"
    }
  },
  filters :{
    processingDate(val){
      let date=val.split(" ")[0]
      return date
    },
    isDelete(val){
      if(val == 0){
        return "启用"
      }else{
        return "停用"
      }
    }
  }
}
</script>

<style scoped>
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .return >>> .base-label-box .base-label-box__label{
    width: 100px;
  }
  .fl >>> .page-btn{
    float: left;
  }
  .table >>> .base-table-a{
    margin-right: 10px;
  }
</style>
