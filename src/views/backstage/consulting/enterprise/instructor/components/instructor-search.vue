<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    title="添加指导企业"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
    @close="close">

    <div class="heigh-cla">
      <base-label-box>
        <el-input class="inputSearch" placeholder="请输入企业名称" clearable v-model="info" @keyup.enter.native="selectName()"></el-input>
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
          style="width:447px;margin: 0 auto"
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
          <el-table-column label="企业名称" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectTable[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

      </base-label-box>

    </div>

    <div :span="24" class="tac">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import {enterprisePage} from "@/api/backstage/consulting/enterprise/management/management.js"
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
      show(list){
        this.name = name
        this.selectEnterprise(list)
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
      // 查询企业
      selectEnterprise(list){
        let params = {
          current: 1,
          model: {
            "adminName": "",
            "name": "",
            "nature": 1
          },
          size: 9999999
        }
        this.loading = true
        enterprisePage(params).then(response => {
          const res = response.records;
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
    height: 66vh;
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
    height: 48vh;
    overflow-y: scroll;
  }

  .buttonSearch{
    margin-right: 0;
    height: 36px;
    float: right;
  }
</style>

