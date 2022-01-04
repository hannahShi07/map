<template>
  <div class="party">
    <!-- 按钮区 -->
    <div class="pd-20 clearfix mt">
      <div class="fl">
        <base-label-box label="培训主题" class="title1">
          <el-input v-model="theme" @keyup.enter.native="editBtn(1)" placeholder="请输入" style="width: 280px" clearable/>
        </base-label-box>
        <base-label-box label="培训时间" class="title1">
          <el-date-picker v-model="trainStart"  @change="selectstartdate" type="date" placeholder="请选择开始时间" style="width: 220px" clearable value-format="yyyy-MM-dd"/>
          <span style="color:#C0C4CC;">-</span>
          <el-date-picker v-model="trainEnd"  @change="selectenddate" type="date" placeholder="请选择结束时间" style="width: 220px" clearable value-format="yyyy-MM-dd"/>
        </base-label-box>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
      </div>
    </div>

    <div class="line"></div>

    <div class="pd-20 list" v-cloak>
      <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
      <el-table class="base-table mt" border :data="tableData"
                header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"
                v-loading="loading" ref="multipleTable1">
<!--        <el-table-column type="selection" reserve-selection width="45" align="center">-->
<!--        </el-table-column>-->
        <el-table-column label="" width="30" align="center">
          <template slot-scope="scope">
            <el-radio :label="tableData[scope.$index].id" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"/>
        <el-table-column label="培训主题" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'theme')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开展部门" width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'department')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训地点" width="180px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="培训开始时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'trainStart')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{getStatus(tableData[scope.$index].startStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
<!--            <base-table-a type="add" @click="editBtn(4,row)">心得上传</base-table-a>-->
<!--            <base-table-a type="edit" @click="editBtn(5,row)">编辑</base-table-a>-->
            <base-table-a type="add" v-if="row.applyStatus==1 && (row.experience=='' || row.experience==undefined || row.experience==null || row.experience=='null')" @click="editBtn(4,row)" :class="{'color-grad': row.startStatus!=3}">心得上传</base-table-a>
            <base-table-a type="edit" v-if="row.applyStatus==1 && row.experience!='' && row.experience!=undefined && row.experience!=null && row.experience!='null'" @click="editBtn(5,row)" :class="{'color-grad': row.startStatus!=3}">编辑</base-table-a>
            <base-table-a type="add" v-if="row.applyStatus==0" @click="editBtn(4,row)" :class="{'color-grad': row.applyStatus==0}">心得上传</base-table-a>

          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <!--新增-->
    <experience-add ref="refAdd" @refresh="pageChange"/>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import ExperienceAdd from "./experience-add"
  import {getTrainList,getTrainExport} from "@/api/front/personnel/educationtrain/trainexperience/trainexperience.js"


  export default {
    components: {
      ExperienceAdd
    },
    data () {
      return {
        loading:false,//加载遮罩控制条件
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码

        theme:'',//培训主题
        trainStart:'',//培训开始时间
        trainEnd:'',//培训结束时间
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [{}],//列表数据
        // multipleSelection:[],//多选
        templateRadio:false,//导出单选
        list:'',//选中的数据

      }
    },
    mounted(){
      this.getUser();
      // this.getOrg();
    },
    methods: {
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.orgName=res.data.orgName;
          this.orgId=res.data.orgId;
          this.orgCode=res.data.orgCode;
          this.pageChange ();

        })
      },
      //选择党组织
      // getOrg(){
      //   let params={
      //
      //   }
      //   commonReq.getOrglist(params).then(response => {
      //     const res = response;
      //     this.list=res;
      //
      //   })
      // },
      // 调用数据接口
      pageChange () {
        let params = {
          current:this.pageNum,
          size: this.pageSize,
          model: {
            theme:this.theme,
            trainStart: this.trainStart,
            trainEnd:this.trainEnd
          },
        }
        this.loading = false;
        getTrainList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              if(this.tableData[i].trainStart!='' && this.tableData[i].trainStart!=undefined && this.tableData[i].trainStart!=null && this.tableData[i].trainStart!='null'){
                this.tableData[i].trainStart=this.tableData[i].trainStart.substring(0,16)
              }
            }

          }


        }).finally(() => {
          this.loading = false;
        });
      },
      //单选框
      getTemplateRow(index,row){
        this.list=row;

      },
      // //多选框
      // bindRowKeys(row){
      //   return row.id;
      // },
      // //多选框-改变选中状态
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // },
      selectstartdate(){
          if(this.trainStart!='' && this.trainStart!=undefined && this.trainStart!=null && this.trainStart!='null'){
              this.trainStart=this.trainStart+' '+'00:00:00'
          }
        this.editBtn(1);

      },
      selectenddate(){
          if(this.trainEnd!='' && this.trainEnd!=undefined && this.trainEnd!=null && this.trainEnd!='null'){
              this.trainEnd=this.trainEnd+' '+'00:00:00'
          }
        this.editBtn(1);

      },

      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1://查询
            this.pageNum=1;
            this.pageChange()
            break
          case 2://重置
            this.theme='';
            this.trainStart='';
            this.trainEnd='';
            this.templateRadio=false;//取消选中
            this.pageNum=1;
            this.total=0;
            this.$refs.multipleTable1.clearSelection();//清空选中的
            this.pageChange();
            break

          case 3://导出
            if(this.templateRadio==false){
              this.$message.warning('请选择培训主题');
              return
            }else{
              let params = {
                trainId:this.list.id
              }
              getTrainExport(params);

            }
            break

          case 4://心得上传
          case 5://编辑
            this.$refs['refAdd'].show(t, row)
            break
        }
      },
      //处理列表状态
      getStatus(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          if(val==1){
            return '未开始'
          }else if(val==2){
            return '进行中'
          }else if(val==3){
            return '已结束'
          }
        }else{
          return '--'
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  .pd-20{
    padding-bottom:0;
  }
  .list{
    min-height:650px;
  }
  .base-table /deep/ tr th{
    box-sizing:border-box;
  }
  .base-table /deep/  tr td{
    box-sizing:border-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ tr th:first-of-type{
    border-right:none;
  }
  .base-table /deep/ tr td:first-of-type{
    border-right:none;
  }

  .base-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }

</style>
