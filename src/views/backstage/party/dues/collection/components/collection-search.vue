<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    title="添加人员"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
    @close="close">

    <div class="heigh-cla">
      <base-label-box>
        <el-input v-model="name" placeholder="组织名称" clearable disabled style="width: 100%;height: 34px"/>
      </base-label-box>
      <base-label-box>
        <el-input class="inputSearch" placeholder="请输入人员姓名/手机号检索" clearable v-model="info" @keyup.enter.native="selectName()"></el-input>
        <el-button class="buttonSearch el-icon-search" type="primary" @click="selectName()">查询</el-button>
      </base-label-box>
      <base-label-box class="over">
        <!--多选-->
        <el-table
          v-loading="loading"
          ref="multipleTable"
          class="table"
          :data="selectTable"
          tooltip-effect="dark"
          style="width:100%;margin: 0"
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
              <span>{{isEmpty(selectTable[scope.$index],'name')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号码" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectTable[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" :size="500"/>
        </el-table>

      </base-label-box>

    </div>

    <div :span="24" class="tac" slot='footer'>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import { getMembers  } from "@/api/backstage/party/dues/collection/collection.js";
  export default {
    name: "CollectionSearch",
    data(){
      return{
        visible:false,
        loading:false,
        name:"",
        info:'',// 搜素条件
        multipleSelection:[],// 多选框选中数据
        tableData:[],
        selectTable:[],
        radioId:""
      }
    },
    props:{

    },
    methods:{
      rowClick(row){
        this.radioId=row.id;
        let array = []
        array.push(row)
        this.multipleSelection = array
      },
      // 展示弹窗
      show(name,collectionDate,collectionQuarter,orgId,list){
        this.name = name
        this.selectPersons(collectionDate,collectionQuarter,orgId,list)
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
      selectPersons(collectionDate,collectionQuarter,orgId,list){
        let params = {
          collectionDate:collectionDate,
          collectionQuarter:collectionQuarter,
          orgId:orgId,
        }
        this.loading = true
        getMembers(params).then(response => {
          const res = response;
          this.tableData=res;
          this.selectTable=this.tableData
          if(list != ''){
            this.toggleSelection(list)
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
        this.multipleSelection = []
        this.tableData = []
        this.selectTable = []
        this.radioId = ""
      },
      // 搜索人员
      selectName(){
        let _this=this;
        this.selectTable = [];
        for(let i=0;i<this.tableData.length;i++){
          if(_this.tableData[i].name && _this.tableData[i].phone){
            if(_this.tableData[i].name.indexOf(_this.info) != -1 || _this.tableData[i].phone.indexOf(_this.info) != -1){
              _this.selectTable.push(_this.tableData[i])
            }
          }else if(_this.tableData[i].name){
            if(_this.tableData[i].name.indexOf(_this.info) != -1){
              _this.selectTable.push(_this.tableData[i])
            }
          }else if(_this.tableData[i].phone){
            if(_this.tableData[i].phone.indexOf(_this.info) != -1){
              _this.selectTable.push(_this.tableData[i])
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .inputSearch{
    width: 370px;
  }

  .tac {
    text-align: center;
    position: absolute;
    bottom: 20px !important;
    margin-left: 32%;
    margin-right: 30%;
    padding: 0;
  }
  .heigh-cla{
    max-height: 66vh;
  }

  .heigh-cla >>> .base-label-box{
    width: 100%;
  }
  .heigh-cla >>> .base-label-box__content{
    width: 100%;
  }

  .el-dialog .el-dialog__body{
    max-height: 70vh;
  }

  .over {
    max-height: 48vh;
    padding-bottom: 40px;
    overflow-y: auto;
  }

  .heigh-cla >>> .el-table{
    margin:0;
  }

  .buttonSearch{
    margin-right: 0;
    height: 36px;
    float: right;
  }
</style>

