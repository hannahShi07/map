<!--任免文件管理首页-->
<template>
  <div class="party">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="反馈人姓名" >
        <el-input v-model="userName" @keyup.enter.native="editBtn(2)" placeholder="请输入"  clearable/>
      </base-label-box>
      <base-label-box label="联系方式" >
        <el-input v-model="contact" @keyup.enter.native="editBtn(2)" placeholder="请输入"  clearable/>
      </base-label-box>
      <base-label-box label="处理状态" >
        <el-select
          v-model="processingState.key"
          filterable
          placeholder="请选择"
          @change="selectdate"
          clearable>
          <el-option
            v-for="(item,index) in dicts.processing_state"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
    </div>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="导出" imgType="export"  @click="editBtn(1)"/>
        <base-page-button title="删除" imgType="delete" @click="editDelete" />
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(2)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(3)"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table
        v-loading="loading"
        class="table"
        :data="tableData"
        tooltip-effect="dark"
        :row-key="getRowKeys"
        ref="table"
        @selection-change="handleSelectionChange"
        :select-on-indeterminate='false'
        style="width:100%;margin: 0 auto"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center">
        </el-table-column>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="反馈人姓名" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'userName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" width="180px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'contact')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="反馈内容" min-width="140px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'content')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理状态" width="140px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'processingState.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="反馈时间" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="处理时间" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'processingTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" v-if="row.processingState.data == '待处理'" @click="editBtn(4,row)">处理
              </base-table-a>
              <base-table-a v-if="row.processingState.data == '已处理'" @click="editBtn(5,row)">详情</base-table-a>

            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <!--新增-->
        <feedback-edit ref="refEdit" @refresh="pageChange"/>
    <!--详情-->
        <feedback-detail ref="refDetail" @refresh="pageChange"/>
  </div>
</template>

<script>
    import {getFeedbackList,getFeedbackDetele,getFeedbackExp} from "@/api/backstage/sysset/basic/feedback/feedback.js"
    import FeedbackEdit from "./feedback-edit";
    import FeedbackDetail from "./feedback-detail";
    import commonReq  from "@/api/public/commonReq.js"

    export default {
        name: "index",
        components: {FeedbackDetail,FeedbackEdit},
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                feedIds:[],  //删除主键
                tableData:[],//列表数据
                userName:'',//反馈人
                contact:'',//联系方式
                processingState:{key:'',data:''},//状态
                dicts: {//字典
                    processing_state: {},//状态
                },
                tableChecked:[]
            }
        },
        mounted() {
            this.pageChange ();
            this.getCommDict ();
        },
        methods: {
            getRowKeys(row) {
                return row.id;
            },
            //调用字典接口
            getCommDict(){
                let params = {
                    types:['processing_state']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.processing_state = res.processing_state;
                })
            },
            //分页调取接口数据
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        userName:this.userName,
                        contact:this.contact,
                        processingState:{key:this.processingState.key}
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getFeedbackList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;

                }).finally(() => {
                    this.loading = false;
                });

            },
            selectdate(val){
                this.editBtn(2)
            },

            //跳转
            editBtn (t, row) {
                switch (t) {
                    case 1:
                        this.exportExc();
                        break
                    case 4:
                        this.$refs['refEdit'].show(row)
                        break

                    case 2://查询
                        this.pageNum=1;
                        this.pageChange()
                        break

                    case 3://重置
                        this.userName='';
                        this.contact='';
                        this.processingState.key='';
                        this.pageNum=1;
                        this.pageChange ();
                        break

                    case 5://详情
                        this.$refs['refDetail'].show(row)
                        break
                }
            },
            //多选框选中事件
            handleSelectionChange(val) {
                this.feedIds = [];
                this.multipleSelection = val;
                if(this.multipleSelection !== '' && this.multipleSelection !== undefined && this.multipleSelection!=null && this.multipleSelection !=='null' && this.multipleSelection.length > 0){
                    for(let i = 0; i < this.multipleSelection.length; i++){
                        this.feedIds.push(this.multipleSelection[i].id)
                    }
                }
            },
            //删除
            editDelete(){
                if (this.feedIds.length <= 0) {
                    this.$message.warning("请选择数据");
                    return;
                }
                let params ={
                    ids:this.feedIds
                }
                this.$confirm('是否确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    getFeedbackDetele(params).then(response => {
                        const res = response;
                        this.$message(this.successTip())
                        this.pageChange();
                        this.feedIds = []
                    })
                }).catch(() => {
                })
            },
            // 导出
            exportExc(){
                if (this.feedIds.length <= 0) {
                    this.$message.warning("请选择数据");
                    return;
                }
                let params ={
                    model:{
                      ids:this.feedIds
                    }
                }
                getFeedbackExp(params);
            },
        }
    }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #fff;
  }
  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  .title /deep/ .base-label-box__label{
    width:40px;
  }
</style>
