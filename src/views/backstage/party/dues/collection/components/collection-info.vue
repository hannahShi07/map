<template>
  <div class="collection-info">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <base-label-box label="缴纳时间">
        <el-date-picker
          v-model="tableData.collectionDate"
          type="year"
          placeholder="选择年份"
          format="yyyy"
          value-format="yyyy"
          clearable
          :editable="false"
          :picker-options="pickerOptions"
          @change="getInfo()">
        </el-date-picker>
        <el-select filterable placeholder="请选择季度" v-model='tableData.collectionQuarter' @change="getInfo()" value-key="id" clearable >
          <el-option
            v-for="(item, index) in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="收费组织">
        <el-input v-model="orgName" disabled />
      </base-label-box>
      <div class="title"><img src="../../../../../../assets/page/icon-warning.png" />共{{tableData.list.length}}人，未缴清{{tableData.state}}人&nbsp;&nbsp;缴费总额&nbsp;{{tableData.totalAmount}}</div>
      <el-table class="base-table" border :data="tableData.list"  header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="党员姓名" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor:pointer">{{isEmpty(tableData.list[scope.$index],'memberName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否缴清" min-width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor:pointer" :class="tableData.list[scope.$index].isClear == '1249242903696375808'?'red':''">{{isEmpty(tableData.list[scope.$index],'isClear') | isClear}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty" :size="502"/>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
  import {infoCollectionList} from "@/api/backstage/party/dues/collection/collection.js"
  export default {
    name: "CollectionAdd",
    components: {

    },
    data() {
      return {
        visible:false,
        loading:true,
        title:"收缴明细",//标题
        orgName:"",
        orgId:"",
        tableData:{
          collectionDate: "",//缴纳时间
          collectionQuarter: "2246476837383406026",//缴纳季度
          list: [{
            isClear: "",
            memberId: "",
            memberName: ""
          }],
          orgId: 0,//组织ID
        },
        options:[{
          value:"2246476837383406026",
          label:"第一季度"
        },{
          value:"2246476837383406029",
          label:"第二季度"
        },{
          value:"2246476837383406032",
          label:"第三季度"
        },{
          value:"2246476837383406035",
          label:"第四季度"
        }],
        pickerOptions:{
          disabledDate(time) {
            if (new Date().getFullYear()+1 <= time.getFullYear()) {
              return true
            }
            return false
          }
        }
      }
    },
    mounted() {

    },
    computed: {

    },
    filters: {
      isClear(val){
        switch(val){
          case "1249242853247287296" :
            return "是";
            break;
          case "1249242903696375808" :
            return "否";
            break;
        }
      }
    },
    methods: {
      //取消
      close(){
        this.tableData={
          collectionDate: "",//缴纳时间
          collectionQuarter: "2246476837383406026",//缴纳季度
          list: [{
            isClear: "",
            memberId: "",
            memberName: ""
          }],
          orgId: 0,//组织ID
          state: 0,//缴费状态
          totalAmount: 0//缴纳总额
        }
        this.visible = false;
      },
      //展示
      show(t,row){
        this.visible=true;
        this.loading=false;
        this.orgId=row.org.key;
        this.orgName=row.org.data;
        this.tableData.orgId=row.org.key;
        this.tableData.collectionDate=row.collectionDate;
        this.getInfo();
      },
      getInfo(){
        let params = {
          orgId:this.orgId,
          collectionDate:this.tableData.collectionDate,
          collectionQuarter:this.tableData.collectionQuarter
        }
        this.loading = true;
        infoCollectionList(params).then(response => {
          if(response){
            this.tableData.list=response.list;
            this.tableData.totalAmount=response.totalAmount;
          }else{
            this.tableData.list=[];
            this.tableData.totalAmount=0;
          }
          this.loading=false;
          this.radioChange();
        }).finally(() => {
          this.loading=false;
        });
      },
      // 选择按钮
      radioChange(){
        let num=0;
        let _this=this;
        for(let i=0;i<_this.tableData.list.length;i++){
          if(_this.tableData.list[i].isClear == "1249242903696375808"){
            num++;
          }
        }
        this.tableData.state=num;
      },
    }
  }
</script>

<style scoped>
  .collection-info >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .collection-info >>> .el-dialog{
    width: 502px;
  }
  .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #3D9EFF;
    background-color: rgba(61, 158, 255, 0.1);
    margin-bottom: 20px;
  }
  .title img{
    height: 16px;
    width: 16px;
    margin:12px;
    float: left;
  }
  .collection-info >>> .cell{
    width: 100%;
    font-weight: 400;
  }
  .collection-info >>> .base-label-box{
    width: 100%;
  }
  .collection-info >>> .base-label-box__content{
    width: calc(100% - 73px);
  }
  .collection-info >>> .el-date-editor--year{
    width: calc(50% - 3px);
  }
  .collection-info >>> .el-select{
    width: calc(50% - 3px);
  }
  .collection-info >>> .el-dialog__body{
    max-height: 65vh;
  }
  .collection-info >>> .base-table-empty{
    height: 340px;
  }
  .red{
    color: #FC5921;
  }
</style>
