<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="原组织">
        <el-input v-model="orgName" placeholder="请输入组织名称" style="width: 280px"   @keyup.enter.native="pageChange" clearable />
      </base-label-box>
      <base-label-box label="人员信息">
        <el-input v-model="memberInfo" placeholder="请输入姓名/身份证号码/手机号" style="width: 280px" @keyup.enter.native="pageChange" clearable />
      </base-label-box>
      <base-label-box label="人员类型">
        <el-select
          v-model="memberType"
          placeholder="请选择"
          style="width: 280px"
          @change="pageChange"
          clearable >
          <el-option
            v-for="(item, index) in dicts.MENBER_MTYP"
            :key="index"
            :label="item.name"
            :value="item.id"
          />

        </el-select>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="导出" imgType="export" @click="exportExc"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="searchList"/>
        <base-page-button title="重置" imgType="reset" @click="resetFun"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="姓名" width="120" prop="name" align="center" show-overflow-tooltip/>
        <el-table-column label="手机号码" width="180" prop="phone" align="center" show-overflow-tooltip />
        <el-table-column label="身份证号码" width="220" prop="idCode" align="center" show-overflow-tooltip/>
        <el-table-column label="学历" width="120" prop="education" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isEmpty(tableData[scope.$index],'djEducationSaveDTO.education.data')}}
          </template>
        </el-table-column>

        <el-table-column label="原组织" prop="orgId" align="left" show-overflow-tooltip>
          <template slot-scope="scope" align="left" >
            {{isEmpty(tableData[scope.$index],'orgId.data')}}
          </template>
        </el-table-column>

        <el-table-column label="人员类型" width="160" prop="type" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{isEmpty(tableData[scope.$index],'type.data')}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="{row}">
            <base-table-a @click="editBtn(1, row)">详情</base-table-a>
            <base-table-a type="exp" @click="editBtn(2, row)" :class="permision(row) ?  'gray': ''">移出历史库</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <history-move-dialog ref="refMove" @refresh="pageChange"/>
  </div>
</template>

<script>
  import HistoryMoveDialog from './history-move-dialog'
  import {getHistoryPersonByPage,getHistoryDelet,getHistoryExport} from "@/api/backstage/party/basic/history/history.js"
  import commonReq  from "@/api/public/commonReq.js"
  import db from "@/utils/localstorage";

  export default {
    components: {HistoryMoveDialog},
    data () {
      return {
        loading:true,//加载遮罩控制条件
        id:'',//此条历史记录的id
        memberType: '',//当前选中的人员类型
        memberInfo:'',//人员信息
        orgName:"",//原组织名称
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
        dicts: {//字典
          MENBER_MTYP: {},
        },
        orgCode: db.get('USER').djOrg.code
      }
    },
    created(){
      this.pageChange ();
      this.getDict();
    },
    methods: {
      searchList(){
        this.pageNum = 1;
        this.pageChange()
      },
      //导出
      exportExc(){
        let params = {
          "model": {
            "memberInfo":this.memberInfo,
            'orgName':this.orgName,
            'memberType':this.memberType
          }
        }
        getHistoryExport(params);
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['MENBER_MTYP']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.MENBER_MTYP = res.MENBER_MTYP;
        })
      },
      //重置
      resetFun(){
        this.pageNum = 1
        this.pageSize = 10
        this.memberInfo = ''
        this.memberType = ''
        this.orgName = ''
        this.pageChange();
      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "memberInfo": this.memberInfo,
            "memberType": this.memberType,
            "orgName": this.orgName,
          },
        }
        this.loading = true;
        getHistoryPersonByPage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //删除
      deletCur(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            memberIds : [row.id]
          }
          getHistoryDelet(params).then(response => {
            this.pageChange ();
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // });
            this.$message(this.successTip())
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editBtn (t, row) {
        switch (t) {
          case 1://详情
            this.$emit('handleSwitch', {name: 'HistoryDetail', params: row})
            break

          case 2://移出历史库
            this.$refs['refMove'].show(row)
            break
        }
      },
      permision(row){
          if(this.orgCode === '1001'){
              return false;
          }

          return this.curOrgPerid(row.orgId.key);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gray{
    pointer-events: none;
    cursor: default;
    color: #cccccc;
  }
</style>
