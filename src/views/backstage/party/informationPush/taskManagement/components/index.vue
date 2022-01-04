<!--发布任务管理-->
<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <!--        <base-label-box label="发布组织" class="title">-->
        <!--          <el-input v-model="groupName" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>-->
        <!--        </base-label-box>-->
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
              v-for="(item,index) in completeList"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
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
          style="width:100%;margin: 0 auto"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接收组织" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgList')}}</span>
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
            <template slot-scope="{row}">
              <span>{{row | finishOrgCo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="260" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a  type="edit" v-if="(row.finishOrgCount!==0&&row.allOrgCount!==0)||(row.finishOrgCount!==row.allOrgCount)" @click="editBtn(4,row)">编辑
              </base-table-a>
              <base-table-a  @click="editBtn(5,row)">详情</base-table-a>
              <base-table-a  type="backout2" v-if="(row.finishOrgCount!==0&&row.allOrgCount!==0)||(row.finishOrgCount!==row.allOrgCount)" @click="editBtn(6,row)">撤销</base-table-a>

            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>


    <!--新增-->
    <taskmanagement-add ref="refAdd" @refresh="pageChange"/>
    <!--详情-->
    <taskmanagement-detail ref="refDetail" @refresh="pageChange"/>
  </div>
</template>

<script>
    import TaskmanagementAdd from "./taskmanagement-add"
    import TaskmanagementDetail from "./taskmanagement-detail"
    import {getTaskmanagementList,getTaskmanagementDetele} from "@/api/backstage/party/informationPush/taskManagement/taskManagement.js"

    export default {
        name: "index",
        components: {
            TaskmanagementAdd,
            TaskmanagementDetail
        },
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData:[],//列表数据
                orgId:'',//党组织id
                groupName:'',//发布组织
                isFinish:'',//是否完成
                completeList: [{//是否完成下拉列表
                    value: '1',
                    label: '全部完成'
                }, {
                    value: '0',
                    label: '部分完成'
                }, {
                    value: '2',
                    label: '已撤回'
                }],

            }
        },
        mounted() {
            this.pageChange ();
        },
        filters:{
            finishOrgCo(val){
                let finish =  val.finishOrgCount
                let all =  val.allOrgCount
                if(finish === all &&finish!==0&&all!==0){
                    return  "已完成"
                }else if(finish===0 && all===0){
                    return  "已撤回"
                } else{
                    return  finish + "/" + all
                }

            }
        },
        methods: {
            //分页调取接口数据
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        orgId:{data:this.groupName},
                        orgCode:this.orgId,
                        completeStatus:this.isFinish,
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getTaskmanagementList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;

                }).finally(() => {
                    this.loading = false;
                });

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
            editBtn (t, row) {
                switch (t) {
                    case 1:
                    case 4:
                        this.$refs['refAdd'].show(t, row)
                        break

                    case 2://查询
                        this.pageNum = 1;
                        this.pageChange()
                        break

                    case 3://重置
                      this.orgId='';
                      this.groupName='';
                      this.isFinish='';
                      this.pageNum = 1;
                      // this.pageChange ();
                      this.$refs.refTree.getTree("clear")
                      break

                    case 5://详情
                        this.$refs['refDetail'].show(t, row)
                        break

                    case 6://撤销
                        this.$confirm('是否撤销该条信息？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
                        }).then(() => { //确认删除
                            let params = {
                                id:row.id
                            }
                            getTaskmanagementDetele(params).then(response => {
                                // this.$message.success("删除成功")
                                this.$message(this.successTip())
                                const res = response;
                                this.pageChange ();
                            }).finally(() => {
                            });
                        }).catch(() => {

                        })
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
