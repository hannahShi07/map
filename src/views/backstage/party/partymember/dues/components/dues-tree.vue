<template>
  <el-dialog
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    title="选择党员"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="500px"
    @close="close">

    <div class="heigh-cla">
      <base-label-box>
        <el-input class="inputSearch" placeholder="请输入党员姓名" clearable v-model="name" @keyup.enter.native="selectName()"></el-input>
        <el-button class="buttonSearch el-icon-search" type="primary" @click="selectName()">查询</el-button>
      </base-label-box>
      <base-label-box class="over">
        <!--单选-->
        <el-table
          v-loading="loading"
          ref="multipleTable"
          class="table"
          :data="selectData"
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
          <el-table-column label="党员姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(selectData[scope.$index],'name')}}</span>
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
  import {searchMember} from "@/api/backstage/party/partymember/dues/dues.js"
  export default {
    name: "select-member",
    data(){
      return{
        visible: false,
        loading: false,
        code: "",
        categoryId: "",
        name: "",
        info: '',           // 搜素条件
        multipleSelection: [],  // 多选框选中数据
        tableData: [],          // 人员列表数据
        selectData: [],          // 人员列表数据
        orgId: "",              // 党组织id
        id: "",                 // 当前数据的id
        radioId: "",
        memberIds: [] //已选人员
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
      show(list,id){
        this.code = id;
        this.selectPersons(list)
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
      // 查询非公党组织
      selectPersons(list){
        let params = {
          orgCode:this.code,
          name:this.name
        }
        this.loading = true
        searchMember(params).then(response => {
          const res = response;
          // console.log(res)
          this.tableData=res;
          this.selectData = this.tableData
          if(list){
            if(list.length > 0){
              this.multipleSelection = list
              this.radioId = list[0].id
            }else{
              this.radioId = 0;
            }
          }

        }).finally(()=>{
          this.loading = false
        })
      },
      // 搜索人员
      selectName(){
        let _this=this;
        this.selectData = [];
        for(let i=0;i<this.tableData.length;i++){
          if(_this.tableData[i].name){
            if(_this.tableData[i].name.indexOf(_this.name) != -1){
              _this.selectData.push(_this.tableData[i])
            }
          }
        }
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
        this.radioId = ""
        this.name = ""
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
    height: calc(70vh - 30px);
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
    height: calc(70vh - 150px);
    overflow-y: scroll;
  }

  .buttonSearch{
    margin-right: 0;
    height: 38px;
  }
</style>

