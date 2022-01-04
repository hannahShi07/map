<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
    @close="close">

    <div class="heigh-cla">
      <base-label-box>
        <el-input class="inputSearch" placeholder="请输入人员姓名/手机号检索" clearable v-model="info" @keyup.enter.native="selectName()" v-if="isInstructor"></el-input>
        <el-input class="inputSearch" placeholder="请输入指导企业检索" clearable v-model="info" @keyup.enter.native="selectName()" v-else></el-input>
        <el-button class="buttonSearch el-icon-search" type="primary" @click="selectName()">查询</el-button>
      </base-label-box>
      <base-label-box class="over">
        <!--单选-->
        <el-table
          v-loading="loading"
          ref="multipleTable"
          class="table"
          :data="selectTable"
          style="width:447px;margin: 0 auto"
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
          <el-table-column v-if="isInstructor" label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectTable[scope.$index],'name')}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="isInstructor" label="手机号码" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectTable[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="!isInstructor" label="指导企业" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectTable[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
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
  import {guidancePage,recordList} from "@/api/backstage/consulting/enterprise/record/record.js"
  export default {
    name: "select-member",
    data(){
      return{
        visible: false,
        loading: false,
        name: "",
        info: '',               // 搜素条件
        multipleSelection: [],  // 多选框选中数据
        tableData: [],          // 人员列表数据
        selectTable:[],
        orgId: "",              // 党组织id
        id: "",                 // 当前数据的id
        radioId: "",
        memberIds: [], //已选人员
        isInstructor:true,//是否为指导员
        title:"",
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
      show(type, list, id, name){
        if(type == 1){
          this.title = "选择指导员"
          this.isInstructor=true;
        }else{
          this.title = name
          this.isInstructor=false;
        }
        this.selectPersons(list,id)
        this.visible = true
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
      selectPersons(list,id){
        if(this.isInstructor){
          let params = {
            current: 1,
            model: {
              name: "",
              phone: ""
            },
            size: 9999999
          }
          this.loading = true
          guidancePage(params).then(response => {
            const res = response;
            this.tableData=res;
            this.selectTable=this.tableData;
            if(list != ''){
              if(list.length > 0){
                this.multipleSelection = list
                this.radioId = list[0].id
              }else{
                this.radioId = ""
              }
            }

          }).finally(()=>{
            this.loading = false
          })
        }else{
          let params = {
            id:id
          }
          this.loading = true
          recordList(params).then(response => {
            const res = response;
            this.tableData=res;
            this.selectTable=this.tableData;
            if(list != ''){
              if(list.length > 0){
                this.multipleSelection = list
                this.radioId = list[0].id
              }else{
                this.radioId = ""
              }
            }

          }).finally(()=>{
            this.loading = false
          })
        }
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
      },
      // 确定
      save(){
        this.$emit('refresh',{data:this.multipleSelection,type:this.isInstructor})
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
    padding-bottom: 0;
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
    height: 48vh;
    overflow-y: auto;
  }
  .buttonSearch{
    margin-right: 0;
    height: 36px;
    float: right;
  }
</style>

