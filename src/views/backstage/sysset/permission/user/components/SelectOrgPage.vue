<template>
  <el-dialog class="dialog-inner" width="1400px" :title="title" :visible.sync="visible"  append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="party">
      <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick"  :type="party">

        <!-- 条件盒子 -->
        <div class="page-search-box">
          <!--<base-label-box label="组织名称">-->
          <!--<el-input v-model="name" placeholder="请输入组织名称" style="width: 280px"/>-->
          <!--</base-label-box>-->
          <base-label-box label="组织类别">
            <el-select
              class="width-cla"
              value-key="id"
              filterable
              v-model="categoryId"
              placeholder="请选择"
              style="width:100%;"
              @change="editBtn(4)"
              clearable>
              <el-option
                v-for="item in dicts.category"
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
            <base-page-button title="确定" imgType="add" type="primary" @click="editBtn(1)"/>
          </div>

          <div class="fr">
            <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
            <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
          </div>
        </div>

        <div class="mr-20 ml-20" v-cloak>
          <el-table :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}"  v-loading="loading">

            <el-table-column type="index" label="序号" width="60" align="center" />

            <el-table-column label="组织名称" prop="name" align="left" min-width="200" show-overflow-tooltip>
              <template slot-scope="scope">
              <span>
                {{isEmpty(scope,'row.name')}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="党员人数" width="80" prop="memberCnt" align="center">
              <template slot-scope="scope">
              <span>
                {{isEmpty(scope,'row.memberCnt')}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="预备党员" width="80" prop="prepareMemberCnt" align="center">
              <template slot-scope="scope">
              <span>
                {{isEmpty(scope,'row.prepareMemberCnt')}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="组织类别" min-width="120" prop="category" align="center">
              <template slot-scope="scope">
              <span>
                {{isEmpty(scope,'row.category')}}
              </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="460">
              <template slot-scope="{row}">
                <base-table-a @click="editBtn(6, row)">详情</base-table-a>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange()"/>
        </div>
      </base-page-tree>


      <base-org-import ref="refImport" @refresh="pageChange" :action="action" :templateUrl="templateUrl" :templateName="templateName" title="导入党组织" :otherData="otherData" :examin="examin"/>


    </div>
  </el-dialog>

</template>

<script>
    //  内容公告样式 css
    import '@/styles/party-common.scss'
    import {getPartyList,getPartyExport,getPartyRevoke} from "@/api/backstage/party/basic/party/party.js"
    import commonReq from "@/api/public/commonReq"

    export default {
        components: {},
        data () {
            return {
                // 加载遮罩控制条件
                loading:true,
                // 组织名称
                // name:'',
                // 组织类别id
                categoryId:'',
                pageNum: 1,
                pageSize: 10,
                total: 0,
                // 点击组织树id
                orgId:'',
                tableData: [],
                // 组织编码
                code:"",
                // 组织类别下拉框
                dicts:{
                    category:[]
                },
                // 导入接口
                action:`${process.env.VUE_APP_BASE_API}/partycloud/djOrg/importOrgExcel`,
                // 党组组织架构附件模板
                templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dzhjg.xlsx`,
                // 下载模板地址名称
                templateName:'党组织架构导入模板.xlsx',
                // 党组织架构标识
                party:'party',

                // 导入额外参数
                otherData: {
                    parentOrgName:'',
                    headRows:'1',
                    titleRows:'1'
                },

                // 不是考试模块
                examin: false,

                // 模态
                visible: false,
                title:'选择组织',
                searchName:'',
                treeData:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                orgId:{
                    data:'',
                    key:''
                }
            }
        },
        mounted(){
            // 列表数据
            this.pageChange();
            this.getOrgType();
        },
        methods: {
            // 撤销
            revoke(id){
                this.$confirm('此操作会移除党组织，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        orgId:id
                    }
                    getPartyRevoke(params).then(response =>{
                        this.pageChange();
                        this.$refs.refTree.getTree()
                        this.$message(this.successTip())
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消撤销'
                    });
                });
            },
            // 组织类别
            getOrgType(){
                let params = {
                    types:['category']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.category = res.category;
                })
            },
            // 导出
            exportExc(){
                let params = {
                    "model": {
                        "categoryId":this.categoryId,
                        "code": this.code,
                    }

                }
                getPartyExport(params)
            },

            // 重置
            resetData(){
                // this.name='';
                this.categoryId='';
                this.orgId='';
                this.code='';
                this.pageNum=1,
                this.total=0,
                // this.pageChange();
                this.$refs.refTree.getTree("clear")
            },

            // 左侧树的点击事件
            handleTreeClick (row) {
                this.orgId=row.id
                this.code = row.code
                // 列表数据
                this.pageChange()
            },

            // 调用数据接口
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        categoryId:this.categoryId,
                        code: this.code,
                        // name: this.name
                    },
                    size: this.pageSize
                }
                this.loading = true;
                this.$refs.refTree.getTree()
                getPartyList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;
                }).finally(() => {
                    this.loading = false;
                });
            },
            // 按钮点击事件
            editBtn (t, row) {
                switch (t) {
                    // 新增
                    case 1:
                        this.$refs['refEdit'].show(t, row)
                        break

                    // 编辑
                    case 8:
                        if(row.code != '1001'){
                            this.$refs['refEdit'].show(t, row)
                        }
                        break

                    // 新增下级
                    case 7:
                        if(row.category != '党小组'){
                            this.$refs['refEdit'].show(t, row)
                        }
                        break

                    // 导入
                    case 2:
                        this.$refs['refImport'].show(t, row)
                        break

                    // 导出
                    case 3:
                        this.exportExc()
                        break

                    // 查询
                    case 4:
                        this.pageChange();
                        break

                    // 重置
                    case 5:
                        this.resetData()
                        break

                    // 详情
                    case 6:
                        if(row.category != '党小组'){
                            this.$emit('handleSwitch', {name: 'PartyDetailed', params: row})
                        }else{
                            this.$refs['refGroup'].show(t, row)
                        }

                        break

                    // 党员迁移
                    case 9:
                        if(row.category != '党小组') {
                            this.$refs['refEmigration'].show(t, row)
                        }
                        break

                    // 撤销
                    case 10:
                        if(row.code != '1001'){
                            this.revoke(row.id)
                        }
                        break
                }
            },

            show () {
                this.visible = true;
                this.getTreeList();

            }
        }
    }
</script>

<style lang="scss" scoped>
  .party {
    height: 800px;
    background: #eee;
  }
  .gray{
    pointer-events: none;
    cursor: default;
    color: #cccccc;
  }
  .width-cla {
    width: 280px !important;
  }
</style>
