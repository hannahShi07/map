<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="姓名">
        <el-input v-model="name" placeholder="请输入姓名" style="width: 280px" clearable  @keyup.enter.native="pageChange"/>
      </base-label-box>
      <base-label-box label="身份证号码">
        <el-input v-model="idcard" placeholder="请输入身份证号码" style="width: 280px" clearable @keyup.enter.native="pageChange"/>
      </base-label-box>
      <base-label-box label="审核状态">
        <el-select v-model="auditType" placeholder="请选择" style="width: 280px" clearable @change="pageChange">
          <el-option
            v-for="(item, index) in dicts.audit_state"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="学历">
        <el-select v-model="education" placeholder="请选择" style="width: 280px" clearable @change="pageChange">
          <el-option
            v-for="(item, index) in dicts.EDUCATION"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="pageChange"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="120" align="center"/>
        <el-table-column label="姓名" width="180" prop="name" align="center" show-overflow-tooltip/>
        <el-table-column label="身份证号码"  prop="idcard" align="center" show-overflow-tooltip/>
        <el-table-column label="手机号码" width="200" prop="phone" align="center" show-overflow-tooltip />
        <el-table-column label="审核状态" width="200" prop="auditStatus" align="center" show-overflow-tooltip >
          <template slot-scope="scope">
            {{isEmpty(tableData[scope.$index],'auditStatus.data')}}
          </template>
        </el-table-column>
        <el-table-column label="学历" width="120" prop="education" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isEmpty(tableData[scope.$index],'education.data')}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{row}">
            <base-table-a @click="editBtn(1, row)" v-if="isStatu(row.auditStatus.key && row.auditStatus.key !== '1303517778761744384')">详情</base-table-a>
            <base-table-a @click="editBtn(2, row)" v-else>审核</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <examine-audit ref="refAudit" @refresh="pageChange"/>
    <examine-detail ref="refDetail" />
  </div>
</template>

<script>
  import ExamineAudit from './components/examine-audit'
  import ExamineDetail from './components/examine-detail'
  import commonReq  from "@/api/public/commonReq.js"
  import  {getDevelopSqioPage } from "@/api/backstage/party/development/documentary/documentary.js"

  export default {
    components:{
      ExamineAudit,
      ExamineDetail
    },
    data () {
      return {
        loading:true,// 加载遮罩控制条件
        id:'',// 此条历史记录的id
        auditType: '',// 审核状态
        idcard:'',// 身份证号码
        name:"",// 姓名
        education:'',// 学历
        pageNum: 1,// 当前页
        pageSize: 10,// 每页大小
        total: 0,// 总条数
        tableData: [],// 列表数据
        dicts: {// 字典
          audit_state: {},// 审核状态
          EDUCATION:{},// 学历
 }
      }
    },
    created(){
      this.pageChange ();
      this.getDict();
    },
    methods: {
      // 判断审核状态
      isStatu(val){
        if(val != undefined && val != null && val != "" && val != "null"){
            return true
        }else{
          return false
        }
      },
      // 调用字典接口
      getDict(){
        let params = {
          types:['audit_state','EDUCATION']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response
          // this.dicts.audit_state = res.audit_state
          this.dicts.EDUCATION = res.EDUCATION
        })

        let para = {
          type: 'sqioAuditState'
        }
        commonReq.getCustomDict(para).then(response =>{
          const res = response
          this.dicts.audit_state = res
        })
      },
      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.idcard = ''
        this.auditType = ''
        this.name = ''
        this.education = ''
        this.pageChange();
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            auditStatus:{
              key:this.auditType
            },
            education:{
              key:this.education
            },
            idcard:this.idcard,
            name:this.name,
          },
        }
        this.loading = true;
        getDevelopSqioPage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      editBtn (t, row) {
        switch (t) {
          case 1://详情
            this.$refs['refDetail'].show(row)
            break

          case 2:// 审核
            this.$refs['refAudit'].show(row)
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
