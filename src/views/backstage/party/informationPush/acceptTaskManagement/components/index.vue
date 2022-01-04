<!--发布任务管理-->
<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <!--        <base-label-box label="发布组织" class="title">-->
        <!--          <el-input v-model="completeTime" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>-->
        <!--        </base-label-box>-->
        <base-label-box label="完成时间" class="title">
          <el-date-picker v-model="completeTime" type="date" @change="selectstage" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>
        </base-label-box>
        <base-label-box label="是否完成" class="title">
          <el-select
            v-model="isFinish"
            value-key="id"
            filterable
            placeholder="请选择"
            @change="selectstage"
            style="width:280px;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.task_perform"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
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
          style="width:100%;margin: 0 auto"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下发组织" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'issueOrgName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="任务名称" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'taskName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="需完成时间" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'taskBeginTime')}}~{{isEmpty(tableData[scope.$index],
                'taskEndTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务情况" width="140px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'taskState.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务文件" width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <base-table-a  type="down" @click="editBtn(4,row)">下载</base-table-a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a  @click="editBtn(5,row,row.taskId)">详情</base-table-a>
              <base-table-a type="finish" v-if="row.taskState.data === '未完成'"  @click="editBtn(6,row,row.taskId)">完成</base-table-a>

            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>


    <!--完成-->
    <accept-taskmanagement-finish ref="refFinish" @refresh="pageChange"/>
    <!--详情-->
    <accept-taskmanagement-detail ref="refDetail" @refresh="pageChange"/>
  </div>
</template>

<script>
    import acceptTaskmanagementDetail from "./acceptTaskManagement-detail"
    import acceptTaskmanagementFinish from "./acceptTaskManagement-finish"
    import commonReq  from "@/api/public/commonReq.js"
    import {getacceptTaskList,getacceptTaskDetail} from "@/api/backstage/party/informationPush/acceptTaskManagement/acceptTaskManagement.js"

    export default {
        name: "index",
        components: {
            acceptTaskmanagementDetail,
            acceptTaskmanagementFinish
        },
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData:[],//列表数据
                orgId:'',//党组织id
                completeTime:'',//完成时间
                isFinish:'',//是否完成
                dicts: {//字典
                    task_perform: {},//接收任务管理
                },
                fileList:[],//附件
            }
        },
        mounted() {
            this.pageChange();
            this.getCommDict();
        },
        methods: {
            //调用字典接口
            getCommDict(){
                let params = {
                    types:['task_perform']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.task_perform = res.task_perform;
                })
            },
            //分页调取接口数据
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        orgCode:this.orgId,
                        completeDate:this.completeTime,  //完成时间
                        taskState:{key:this.isFinish},  //是否完成
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getacceptTaskList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total = res.total;
                    for(let i=0;i<res.records.length;i++){
                        let map =res.records
                        let id = map[i].taskId
                        this.getFile(id)
                    }

                }).finally(() => {
                    this.loading = false;
                });

            },
            //获取附件
            getFile(id){
                let params={
                    bizIds: id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                        if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
                            this.fileList = res[0].list
                        }
                    }
                })
            },
            //组织树点击事件
            handleTreeClick (row) {
                this.orgId=row.id;
                this.pageChange ();

            },
            selectstage(val){
                this.pageChange()
            },
            //跳转
            editBtn (t, row,type) {
                switch (t) {
                    case 1:
                    //下载
                    case 4:
                        let map = this.fileList
                        for(let i =0;i<map.length;i++){
                            let url = map[i].url
                            let fileName = map[i].submittedFileName
                            commonReq.downloadFile(url,fileName)
                        }
                        break

                    case 2://查询
                        this.pageNum = 1;
                        this.pageChange()
                        break

                    case 3://重置
                      this.orgId='';
                      this.completeTime='';
                      this.isFinish='';
                      this.pageNum = 1;
                      // this.pageChange ();
                      this.$refs.refTree.getTree("clear")
                      break

                    case 5://详情
                        this.$refs['refDetail'].show(t, row,type)
                        break

                    case 6://完成
                        this.$refs['refFinish'].show(t, row,type)
                        break
                }
            },
        }
    }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #eee;
  }
  .table /deep/ tr td:nth-of-type(2) .cell.el-tooltip{
    text-align:left;
  }
  .table /deep/ tr td:nth-of-type(3) .cell.el-tooltip{
    text-align:left;
  }
</style>
