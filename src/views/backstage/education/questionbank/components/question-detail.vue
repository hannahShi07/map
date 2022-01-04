<template>
  <div class="history" v-cloak v-loading="loading">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="题目名称" class="title1">
        <el-input v-model="questTitle" @keyup.enter.native="editBtn(1)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="题目类型"  class="title1">
        <el-select
          v-model="type"
          value-key="id"
          filterable
          placeholder="请选择"
          @change="selectType"
          style="width: 280px"
          clearable>
          <el-option
            v-for="(item, index) in dicts.learn_quest"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
      <base-label-box label="发布时间" class="title1 meetingTime">
        <el-date-picker
          v-model="startDate"
          style="width: 170px"
          type="date"
          placeholder="请选择"
          @change="selectTime"
          :picker-options="pickerOptionsstart"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
          v-model="endDate"
          style="width: 170px"
          type="date"
          placeholder="请选择"
          @change="selectendTime"
          :picker-options="pickerOptionsend"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </base-label-box>
      <div class="pb-20 clearfix">
        <div class="fl radiofl">
          <base-label-box label="排序" class="title1">
            <el-radio  v-model="sortCreateDate" :label="1" @change="handleRoleCheckedChange($event)">发布时间由近及远</el-radio>
            <el-radio  v-model="sortCreateDate" :label="2" @change="handleRoleCheckedChange($event)">发布时间由远及近</el-radio>
          </base-label-box>
        </div>
        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <!--题库详情-->
    <div class="questionBox">
      <div class="questionlist">
        <span class="questiontitle">题库名称</span>
        <span class="questioncontent">{{isEmpty(list,'title')}}</span>
      </div>
      <div class="questionlist">
        <span class="questiontitle">题库状态</span>
        <span class="questioncontent">{{getStatus(list.status)}}</span>
      </div>
      <div class="questionlist">
        <span class="questiontitle">题库统计</span>
        <span class="questioncontent">共{{list.questCnt}}道题，单选{{list.type0Cnt}}题，多选{{list.type1Cnt}}题，判断{{list.type2Cnt}}题，填空{{list.type3Cnt}}题，简答{{list.type4Cnt}}题</span>
      </div>
      <base-table-a type="edit" @click="editBtn(9,list)">编辑</base-table-a>

    </div>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix bt-line">
      <div class="fl">
        <base-page-button title="新增题目" v-if="!isShow" imgType="add" type="primary" @click="editBtn(3,list)"/>
        <base-page-button title="导入题目" v-if="!isShow" imgType="export" @click="editBtn(4,list)"/>
      </div>
      <div class="fr grap">
        <base-page-button title="批量删除" v-if="!isShow" :class="{'grapColor':isColor}" imgType="delete" @click="editBtn(5)"/>
        <base-page-button title="导出" imgType="import" @click="editBtn(6)"/>
      </div>

    </div>

    <div class="mr-20 ml-20" style="margin-bottom:80px;">
      <el-table
        v-loading="loading"
        class="table"
        :data="tableData"
        tooltip-effect="dark"
        style="width:100%;margin: 0 auto"
        ref="multipleTable1"
        :row-key="bindRowKeys"
        @selection-change="handleSelectionChange"
        :header-cell-style="{'text-align':'center'}"
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
        <el-table-column label="题目名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="题目类型" width="180"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" show-overflow-tooltip v-if="!isShow">
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="edit" @click="editBtn(7,row,list)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(8,row,list)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <div slot="footer" class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button size="medium"  @click="goBack">返回</el-button>
    </div>




    <!--导入题目-->
    <base-org-import ref="refImport" @refresh="refresh" :accept="accept" :otherData="otherData" :title="exporttitle" :action="action" :templateUrl='templateUrl' :templateName="templateName" :isHaveOrg="isHaveOrg" :fixed="fixed" :labelName="labelName" :examin="examin"/>

    <!--新增-->
    <question-add ref="refQuestion" @refresh="refresh"/>
    <!--编辑题库-->
    <question-edit ref="refEdit" @refresh="refresh"/>

  </div>
</template>

<script>
  import QuestionAdd from "./question-add"
  import QuestionEdit from "./question-edit"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getDetaillist,getQuestonlistDetail,getDetaildetele,getDetailexport,getQuestonlistEdit} from "@/api/backstage/education/questionbank/questionbank.js"



  export default {
    name: "question-detail",
    components: {
      QuestionAdd,
      QuestionEdit
    },
    props: {
      params: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],

        dicts:{//题目类型
          learn_quest: {},
        },

        repoId:'',//题库id
        questTitle:'',//题目名称
        startDate:'',//开始时间
        endDate:'',//结束时间
        sortCreateDate:1,//排序 1：由远及近 2：由近及远
        type:'',//题目类型

        list:'',//题库详情
        ids:'',//选中的id
        isColor:true,//批量删除按钮样式
        pickerOptionsstart: {//时间限制

        },
        pickerOptionsend: {//时间限制

        },

        exporttitle:'导入题目',//导入题目弹窗标题
        action:`${process.env.VUE_APP_BASE_API}/partycloud/djLearnRepo/importQuestExcel`,//导入地址
        templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/tk.xlsx`,//导入模版下载地址
        templateName:'题目导入模板.xlsx',//模板下载的文件名
        isHaveOrg:true,//导入弹窗是否展示上级党组织
        fixed:true,//导入弹窗输入框是否能编辑
        labelName:'上传题库',//导入弹窗是党务工作模块还是题库模块
        examin:true,//导入弹窗是否是题库模块
        otherData:{//导入额外参数
          repoId:'',
          headRows:'1',
          titleRows:'1'
        },
        isShow:true,
        accept: '.xls,.xlsx'
      }
    },
    activated(){
      this.$refs.multipleTable1.clearSelection();
      this.getQestiondetail();
      this.pageChange ();
      this.getDict();
    },
    mounted() {
      this.getQestiondetail();
      this.pageChange ();
      this.getDict();
    },
    methods: {
      //调用字典接口
      getDict(){
        let params = {
          types:['learn_quest']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.learn_quest = res.learn_quest;

        })
      },
      //单选排序
      handleRoleCheckedChange(val){
        this.editBtn(1)
      },
      //多选框
      bindRowKeys(row){
        return row.id;
      },
      //多选框-改变选中状态
      handleSelectionChange(val) {
        this.ids=[];
        this.multipleSelection = val;
        let arr=[];
        if(this.multipleSelection!='' && this.multipleSelection!=undefined && this.multipleSelection!=null && this.multipleSelection!='null' && this.multipleSelection.length>0){
          this.isColor=false;
          for(let i=0;i<this.multipleSelection.length;i++){
            arr.push(this.multipleSelection[i].id);
          }
          this.ids=arr.join(',')
        }else{
          this.ids='';
          this.isColor=true;
        }

      },
      //查询题库信息
      getQestiondetail(){
        let params = {
          id:this.params.id
        }
        getQuestonlistDetail(params).then(response => {
          const res = response;
          this.list=res;
          if(this.list.orgId.key!='' && this.list.orgId.key!=undefined && this.list.orgId.key!=null && this.list.orgId.key!='null'){
            this.isShow=this.curOrgPerid(this.list.orgId.key);
          }

          if(this.list.typeCnt=='' || this.list.typeCnt==undefined || this.list.typeCnt==null || this.list.typeCnt=='null'){
            this.list.typeCnt=0;
          }
          if(this.list.type0Cnt=='' || this.list.type0Cnt==undefined || this.list.type0Cnt==null || this.list.type0Cnt=='null'){
            this.list.typeCnt=0;
          }
          if(this.list.type1Cnt=='' || this.list.type1Cnt==undefined || this.list.type1Cnt==null || this.list.type1Cnt=='null'){
            this.list.typeCnt=0;
          }
          if(this.list.type2Cnt=='' || this.list.type2Cnt==undefined || this.list.type2Cnt==null || this.list.type2Cnt=='null'){
            this.list.typeCnt=0;
          }
          if(this.list.type3Cnt=='' || this.list.type3Cnt==undefined || this.list.type3Cnt==null || this.list.type3Cnt=='null'){
            this.list.typeCnt=0;
          }
          if(this.list.type4Cnt=='' || this.list.type4Cnt==undefined || this.list.type4Cnt==null || this.list.type4Cnt=='null'){
            this.list.typeCnt=0;
          }

        }).finally(() => {
          this.loading=false;

        });
      },
      //分页调取接口数据
      pageChange (num) {
        if(((typeof num) === 'number') && (this.sortCreateDate == 1)){
          this.pageNum = num
        }

        let params = {
          current: this.pageNum,
          model: {
            sortCreateDate:this.sortCreateDate,
            questTitle:this.questTitle,
            repoId:this.params.id,
            startDate:this.startDate,
            endDate:this.endDate,
            type:{
              data:'',
              key:this.type
            }
          },
          size: this.pageSize
        }
        this.loading = true;
        getDetaillist(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].createTime=this.tableData[i].createTime.substring(0,16)
            }
          }else{
            this.isColor=true;
          }

        }).finally(() => {
          this.loading = false;

        });

      },
      selectType(val){
        this.editBtn(1)
      },
      selectTime(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate = new Date(val).getTime();
          this.pickerOptionsend={//时间限制
            disabledDate(time) {
              return time.getTime() < preDate
            },
          }

        }
        this.editBtn(1)
      },
      selectendTime(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate =  new Date(val).getTime()-24*60*60*1000;
          this.pickerOptionsstart={//时间限制
            disabledDate(time) {
              return time.getTime() > preDate
            },
          }
        }
        this.editBtn(1)
      },
      //处理题库状态
      getStatus(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          if(val=='1'){
            return  '已停用'
          }else if(val=='0'){
            return  '已启用'
          }
        }else{
          return  '--'

        }

      },
      //编辑题库返回
      refresh(num){
        this.getQestiondetail();
        this.pageChange (num);
      },
      //跳转
      editBtn (t, row,list) {
        switch (t) {
          case 1://查询
            this.pageNum=1;
            this.pageChange()
            break
          case 2://重置
            this.sortCreateDate=1;
            this.questTitle='';
            this.startDate='';
            this.endDate='';
            this.type='';
            this.ids='';
            this.pageNum=1;
            this.total=0;
            this.$refs.multipleTable1.clearSelection();//清空选中的
            this.getQestiondetail();
            this.pageChange ();
            break

          case 3://新增题目
            this.$refs['refQuestion'].show(t,row,list)
            break

          case 4://导入题目
            this.$refs['refImport'].show(t,row);
            break

          case 5://批量删除
            if(this.multipleSelection=='' || this.multipleSelection==undefined || this.multipleSelection==null || this.multipleSelection=='null' || this.multipleSelection.length<=0){
              this.$message.warning('请选择要删除的题目')
              return
            }
            this.$confirm('您确认要删除该题目吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                ids:this.ids,
                repoId:this.params.id

              }

              getDetaildetele(params).then(response => {
                const res = response;
                if(res!='' && res!=undefined && res!=null && res!='null'){
                  this.$message(this.successTip());
                  this.getQestiondetail();
                  this.pageChange ();
                }else{
                  this.$message.error('操作失败')
                }
                // if((res.data && res.data.isSuccess) || !res.data){
                //   this.$message.success(res)
                //   this.getQestiondetail();
                //   this.pageChange ();
                // }
              }).finally(() => {

              });
            }).catch(() => {

            })

            break
          case 6://导出
            if(this.multipleSelection=='' || this.multipleSelection==undefined || this.multipleSelection==null || this.multipleSelection=='null' || this.multipleSelection.length<=0){
              this.$message.warning('请选择要导出的题目')
              return
            }
            let params = {
              ids:this.ids,
              sortCreateDate:this.sortCreateDate
            }
            getDetailexport(params);

            break
          case 7://编辑题目
            this.$refs['refQuestion'].show(t,row,list)
            break

          case 8://删除
            this.$confirm('您确认要删除该题目吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                ids:row.id,
                repoId:this.params.id

              }
              getDetaildetele(params).then(response => {
                const res = response;
                if(res!='' && res!=undefined && res!=null && res!='null'){
                  this.$message(this.successTip());
                  this.getQestiondetail();
                  this.pageChange ();
                }else{
                  this.$message.error('操作失败')
                }
                // if((res.data && res.data.isSuccess) || !res.data){
                //   this.$message.success(res)
                //   this.getQestiondetail();
                //   this.pageChange ();
                // }


              }).finally(() => {

              });
            }).catch(() => {

            })
            break

          case 9://编辑题库详情
            this.$refs['refEdit'].show(t,row)
            break

        }
      },
      //返回
      goBack(){
        this.$emit('handleSwitch', {name: 'Index'})
      }

    }
  }
</script>

<style>
  .radiofl /deep/ .base-label-box{
    margin-bottom:0;
    line-height:40px;
  }
  .grapColor {
    color: #999999;
    border: 1px solid #999999;
  }
  .grapColor:hover {
    color: #999999;
    border: 1px solid #999999;
    background:#fff;
  }

  .grap /deep/ .el-button:first-of-type .iconfont{
    font-size:18px;
  }


  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  /* 按钮禁用*/
  .color-grad{
    pointer-events: none!important;
    cursor: default!important;
    color:#999!important;
  }
  .bt-line{
    border-top:1px solid #EEEEEE;
  }
  .mp-20{
    padding:20px 0;
  }
  /*题库详情*/
  .questionBox{
    margin:20px 20px;
    padding:6px 16px;
    padding-right:70px;
    background:#f8f8f8;
    border-radius: 7px;
    position:relative;
  }
  .questionlist{
    padding:10px 0px;
    display:flex;
  }
  .questiontitle{
    display:block;
    font-size: 14px;
    font-weight: 400;
    color: #555555;
    padding-right:20px;
  }
  .questioncontent{
    flex:1;
    display:block;
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    word-wrap:break-word;
    word-break:break-all;
    white-space:pre-wrap;
  }
  .questionBox /deep/ .base-table-a{
    position:absolute;
    right:0;
    top:0;
    padding:10px 8px;
    border: 1px solid #F8F8F8;
    background:#fff;
    border-radius: 0px 7px 0px 7px;
    box-sizing:border-box;
  }
  .fexid-clas{
    text-align: center;
    z-index: 6;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 1;
    margin-left: -20px;
  }

</style>
