<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="组织名称">
          <el-input v-model="orgName" placeholder="请输入" style="width: 280px" clearable @keyup.enter.native="pageChange()"/>
        </base-label-box>
        <base-label-box label="奖惩类型">
          <el-select
            v-model="rewardsType"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width: 280px"
            @change="pageChange()"
            clearable>
            <el-option
              v-for="(item, index) in dicts.prize"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
        <base-label-box label="批准日期">
          <el-date-picker
            v-model="approvalDate"
            type="date"
            placeholder="请选择"
            @change="pageChange()"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
        </div>
      </div>
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="multipleTable1"
          :row-key="bindRowKeys"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织名称" min-width="120px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="书记" min-width="200px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'secretaryName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党员人数" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'memberCnt')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织类型" width="180px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'category')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="奖励类型" width="180px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'rewardType.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="批准日期" width="100" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'rewardTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <base-table-a type="edit" @click="editBtn(7,row)">编辑</base-table-a>
              <base-table-a @click="editBtn(6,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(8,row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>

    </base-page-tree>

    <base-org-import ref="refImport" @refresh="pageChange" :title="title" :action="action" :templateUrl='templateUrl'
                     :templateName='templateName' :otherData="otherData" :isHaveOrg="false"/>
    <demonstration-add ref="refEdit" @refresh="pageChange"/>
    <demonstration-detail ref="refDetail" @refresh="pageChange"/>

  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import commonReq  from "@/api/public/commonReq.js"
    import demonstrationAdd from './demonstration-add'
    import {getDemonstrationList,getDemonstrationExport,getDemonstrationDelete} from
            "@/api/backstage/party/priority/demonstration/demonstration.js"
    import DemonstrationDetail from  './demonstration-detail'
    export default {
        name: "index",
        components: {DemonstrationDetail, demonstrationAdd},
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                dicts: {//字典状态
                    prize: {},
                },
                orgId:'',//点击组织树id
                code:"",//组织树code
                orgName:'',//组织名称
                rewardsType:'',//奖惩类型
                approvalDate:'', //批准日期
                name:'',//所属组织
                tableData:[],//列表数据
                multipleSelection:[],//多选框选中数据
                action:`${process.env.VUE_APP_BASE_API}/partycloud/excellenceCultivate/importECExcel`,//导入地址
                templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/sfkdr.xlsx`,

                templateName:"示范库导入模板.xlsx",
                title:'示范库导入',
                otherData:{//额外参数
                    headRows:'1',
                    titleRows:'2',
                    type:'2279477819906842952'
                },
            }
        },
        mounted() {
            this.pageChange ();
            this.getDict();

        },
        methods: {
            //调用字典接口
            getDict(){
                let params = {
                    types:['prize']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.prize = res.prize.slice(0,4);
                })
            },
            //分页调取接口数据
            pageChange () {
                // 调用数据接口
                let params = {
                    current: this.pageNum,
                    model: {
                        rewardTime:this.approvalDate,
                        rewardType:{key:this.rewardsType},
                        orgId:{data:this.orgName},
                        orgCode:this.code,
                        type: {
                            key: '2279477819906842952',
                            data:""
                        },//培育库
                        size: this.pageSize
                    },
                }
                this.loading = true;
                getDemonstrationList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;

                }).finally(() => {
                    this.loading = false;
                });
            },
            //多选框
            bindRowKeys(row){
                return row.id;
            },
            //主页组织树点击事件
            handleTreeClick (row) {
                this.name=row.label;
                this.orgId=row.id;
                this.code = row.code
                this.pageChange ();
                this.$refs.multipleTable1.clearSelection();//清空选中的
            },
            //跳转
            editBtn (t, row) {
                switch (t) {
                    case 1: //新增
                        this.$refs['refEdit'].show(t, row)
                        break

                    case 2://导入
                        this.$refs['refImport'].show(t, row)
                        break

                    case 3://导出
                        let params = {
                            model: {
                                type: {
                                    key: '2279477819906842952',
                                    data:""
                                },//示范库
                                orgId:{data:this.orgName},
                                orgCode:this.code,
                                rewardTime:this.approvalDate,
                                rewardType:{key:this.rewardsType}
                            }
                        }
                        getDemonstrationExport(params);
                        break

                    case 4:
                      this.pageNum=1;
                      this.pageChange ();
                      break

                    case 5:
                      this.orgName='';
                      this.rewardsType='',//奖惩类型
                      this.approvalDate='', //批准日期
                      this.orgId='';
                      this.code = '';
                      this.pageNum = 1;
                      // this.pageChange ();
                      this.$refs.multipleTable1.clearSelection();//清空选中的
                      this.$refs.refTree.getTree("clear")
                      break
                    //详情
                    case 6:
                        this.$refs['refDetail'].show(row)
                        break
                    //编辑
                    case 7:
                        this.$refs['refEdit'].show(t, row)
                        break
                    //删除
                    case 8:
                        this.$confirm('是否删除该条信息？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
                        }).then(() => { //确认删除
                            let params = {
                                id:row.id
                            }
                            getDemonstrationDelete(params).then(response => {
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
</style>
