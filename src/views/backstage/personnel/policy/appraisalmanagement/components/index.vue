<!--人才政策首页-->
<template>
  <div class="party">
    <div class="base-table-empty">
      <img src="@/assets/page/icon-develop.png" alt="">
        <span style="font-size: 22px;line-height: 17px;color: #999999;text-align: center">页面正在开发，待续...</span>
      </div>

    <!--    <base-page-tree @handleTreeClick="handleTreeClick">-->
    <!--      &lt;!&ndash; 条件盒子 &ndash;&gt;-->
    <!--      <div class="page-search-box">-->
    <!--        <base-label-box label="信息标题" class="title1">-->
    <!--          <el-input v-model="djHumanPolicyTitle" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>-->
    <!--        </base-label-box>-->
    <!--        <base-label-box label="发布单位" class="title1">-->
    <!--          <el-input v-model="djHumanPolicyOrg" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>-->
    <!--        </base-label-box>-->
    <!--        <base-label-box label="发布日期" class="title1">-->
    <!--          <el-date-picker v-model="djHumanPolicyDate"  @change="selectdate" type="date" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>-->
    <!--        </base-label-box>-->
    <!--      </div>-->
    <!--      &lt;!&ndash; 按钮区 &ndash;&gt;-->
    <!--      <div class="pd-20 clearfix">-->
    <!--        <div class="fl">-->
    <!--          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>-->
    <!--        </div>-->

    <!--        <div class="fr">-->
    <!--          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(2)"/>-->
    <!--          <base-page-button title="重置" imgType="reset" @click="editBtn(3)"/>-->
    <!--        </div>-->
    <!--      </div>-->

    <!--      <div class="mr-20 ml-20" v-cloak>-->
    <!--        <el-table-->
    <!--          v-loading="loading"-->
    <!--          class="table"-->
    <!--          :data="tableData"-->
    <!--          tooltip-effect="dark"-->
    <!--          style="width:100%;margin: 0 auto"-->
    <!--        >-->
    <!--          <el-table-column label="序号" width="50px" align="center">-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{scope.$index+1}}</span>-->
    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="信息标题" min-width="200px" align="center" show-overflow-tooltip>-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{isEmpty(tableData[scope.$index],'djHumanPolicyTitle')}}</span>-->
    <!--            </template>-->
    <!--          </el-table-column>-->

    <!--          <el-table-column label="开展组织" min-width="180px"  align="center" show-overflow-tooltip>-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{isEmpty(tableData[scope.$index],'djHumanPolicyOrg')}}</span>-->
    <!--            </template>-->
    <!--          </el-table-column>-->

    <!--          <el-table-column label="发布日期" width="140px" align="center" show-overflow-tooltip>-->
    <!--            <template slot-scope="scope">-->
    <!--              <span>{{isEmpty(tableData[scope.$index],'djHumanPolicyDate')}}</span>-->
    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>-->
    <!--            <template slot-scope="{row}">-->
    <!--              &lt;!&ndash;表格操作按钮组件&ndash;&gt;-->
    <!--              <base-table-a type="edit" @click="editBtn(4,row)">编辑</base-table-a>-->
    <!--              <base-table-a @click="editBtn(5,row)">详情</base-table-a>-->
    <!--              <base-table-a type="delete" @click="editBtn(6,row)">删除</base-table-a>-->
    <!--            </template>-->
    <!--          </el-table-column>-->

    <!--          &lt;!&ndash; 空数据样式 &ndash;&gt;-->
    <!--          <base-table-empty slot="empty"/>-->
    <!--        </el-table>-->

    <!--        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>-->
    <!--      </div>-->
    <!--    </base-page-tree>-->


    <!--新增-->
    <appraisal-add ref="refAdd" @refresh="pageChange"/>
  </div>
</template>

<script>
    import AppraisalAdd from "./appraisal-add"
    import {getTalentpolicyList,getTalentpolicyDetele} from
            "@/api/backstage/personnel/policy/talentPolicy/talentPolicy.js"
    export default {
        name: "index",
        components: {
            AppraisalAdd
        },
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                orgId:'',//党组织id
                tableData:[],//列表数据
                djHumanPolicyTitle:'',//信息标题
                djHumanPolicyOrg:'',//开展组织
                djHumanPolicyDate:'',//发布日期

            }
        },
        mounted() {
            this.pageChange ();
        },
        methods: {
            //分页调取接口数据
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        cleanCode:this.orgId,
                        djHumanPolicyTitle:this.djHumanPolicyTitle,
                        djHumanPolicyDate:this.djHumanPolicyDate,
                        djHumanPolicyOrg:this.djHumanPolicyOrg
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getTalentpolicyList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;

                }).finally(() => {
                    this.loading = false;
                });

            },
            //组织树点击事件
            handleTreeClick (row) {
                //console.log('点击了左侧树', row)
                this.orgId=row.code;
                this.pageChange ();

            },
            selectdate(val){
                this.editBtn(2)
            },

            //跳转
            editBtn (t, row) {
                switch (t) {
                    case 1:
                    case 4:
                        this.$refs['refAdd'].show(t, row)
                        break

                    case 2://查询
                        this.pageChange()
                        break

                    case 3://重置
                        this.djHumanPolicyTitle='';
                        this.djHumanPolicyDate='';
                        this.djHumanPolicyOrg='';
                        this.orgId='';
                        this.pageChange ();
                        this.$refs.refTree.getTree("clear")//重置左侧组织树
                        break

                    case 5://详情
                        this.$emit('handleSwitch', {name: 'TalentpolicyDetail',params:row})
                        break

                    case 6://删除
                        this.$confirm('是否删除该条信息？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
                        }).then(() => { //确认删除
                            let params = {
                                id:row.id,
                                isDelete:1
                            }

                            getTalentpolicyDetele(params).then(response => {
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

<style lang="scss" scoped>
  .party {
    height: 100%;
    background: #fff;
  }
  .table /deep/ tr td:nth-of-type(2) .cell.el-tooltip{
    text-align:left;
  }
  .table /deep/ tr td:nth-of-type(3) .cell.el-tooltip{
    text-align:left;
  }
  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  .title /deep/ .base-label-box__label{
    width:40px;
  }
  .base-table-empty {
    height: 530px;
    position: relative;

  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 210px;
  }
    >span{
      position: absolute;
      top: 75%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
</style>
