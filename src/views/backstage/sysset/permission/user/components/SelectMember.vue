<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    title="选择党员"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="520px"
    @close="close">

    <div class="heigh-cla">
      <base-label-box>
        <el-input v-model="name" placeholder="组织名称" clearable disabled style="width: 455px;height: 34px"/>
      </base-label-box>
      <base-label-box>
        <el-input class="inputSearch" placeholder="请输入人员姓名/手机号检索" clearable v-model="info" @keyup.enter.native="selectPersons('')"></el-input>
        <el-button class="buttonSearch el-icon-search" type="primary" @click="selectPersons('')">查询</el-button>
      </base-label-box>
      <base-label-box class="over">
        <!--多选-->
        <el-table
          v-if="!isSingle"
          v-loading="loading"
          ref="multipleTable"
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width:447px; margin: 0 auto;bottom: 42px;"
          :row-key="bindRowKeys"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            reserve-selection
            width="45"
            align="center">
          </el-table-column>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <!--单选-->
        <el-table
          v-if="isSingle"
          v-loading="loading"
          ref="multipleTable"
          class="table"
          :data="tableData"
          style="width:447px;margin: 0 auto;bottom: 42px;"
          highlight-current-row
          @current-change="rowClick"
        >
          <el-table-column align="center" width="55" label="" >
            <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="radioId">&nbsp</el-radio>
            </template>
          </el-table-column>

          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

      </base-label-box>

    </div>

    <div :span="30" class="tac">
      <el-button @click="clear">清除</el-button>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import authUserApi from '@/api/backstage/sysset/permission/user/AuthUser'
  export default {
    name: "SelectMember",
    data(){
      return{
        visible: false,
        loading: false,
        name: "",
        info: '',               // 搜素条件
        multipleSelection: [],  // 多选框选中数据
        tableData: [],          // 人员列表数据
        orgId: "",              // 党组织id
        id: "",                 // 当前数据的id
        radioId: ""
      }
    },
    props:{
      isSingle : { // 单选还是多选
        type: Boolean,
        required: false
      },
      isParty:{ // 是否是党组架构模块调用的
        type: Boolean,
        required: false
      }
    },
    methods:{
      rowClick(row){
        this.radioId=row.id;
        let array = []
        array.push(row)
        this.multipleSelection = array
      },
      // 展示弹窗
      show(id, org, rows){
        this.id = id
        this.name = org.data
        this.orgId = org.key
        this.selectPersons(rows)
        this.visible = true
      },
      // 多选框
      bindRowKeys(row){
        return row.id;
      },
      //多选框-改变选中状态
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 默认选中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          // this.$refs.multipleTable.clearSelection();
        }
      },
      // 查询人员
      selectPersons(rows){
        let params = {
          userId: this.id,
          info: this.info,
          djOrg:{
            key: this.orgId
          },
          member:{
            key: ''
          },
        }
        if(rows && rows.length > 0){
            params.member.key = rows[0].id;
            let array = []
            array.push(rows[0])
            this.multipleSelection = array
        }
        this.loading = true
        authUserApi.selectMemberList(params).then(response => {
            if(response.data){
                this.tableData = response.data.data;
                if(rows && rows.length > 0){
                    this.radioId = rows[0].id
                    this.$refs.multipleTable.toggleRowSelection(rows[0]);
                }
            }
        }).finally(()=>{
          this.loading = false
        })
      },
      // 确定
      save(){
        this.$emit('refresh',this.multipleSelection)
        this.close()
      },
      // 关闭
      close(){
        this.visible = false
        this.info = ''
        this.tableData = []
        this.multipleSelection = []
        this.radioId = ""
      },


      // 清除
      clear(){
        this.id = ''
        this.info = ''
        this.tableData = []
        this.multipleSelection = []
        this.radioId = ""
        this.name = ""
        this.orgId = ""
        this.visible = false
        this.$emit('refresh', [])
      },

    }
  }
</script>

<style scoped>
  .inputSearch{
    width: 340px!important;
  }

  .tac {
    text-align: center;
    position: absolute;
    bottom: 20px !important;
    margin-left: 22%;
    margin-right: 20%;
    padding-bottom: 0;
    z-index: 1999;
  }
  .heigh-cla{
    height: 66vh;
  }

  .el-dialog .el-dialog__body{
    max-height: 70vh;
  }

  .over {
    height: 48vh;
    overflow-y: scroll;
  }
</style>

