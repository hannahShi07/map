<!--任免文件管理首页-->
<template>
  <div class="party">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="标题" class="title1">
        <el-input v-model="title" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="发布人" class="title1">
        <el-input v-model="userOrg" @keyup.enter.native="editBtn(2)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="状态" class="title1">
        <el-select
          v-model="state.key"
          filterable
          placeholder="请选择"
          @change="selectdate"
          clearable>
          <el-option
            v-for="(item,index) in dicts.post_state"
            v-if="item.id != '1310766024873738240'"
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
        <el-table-column label="标题" min-width="200px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布人" min-width="180px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'publishUser.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="140px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'state.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="200px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.updateTime | filterTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="edit" v-if="row.state.data === '未发布'" @click="editBtn(4,row)">编辑</base-table-a>
            <base-table-a v-if="row.state.data !== '未发布'"  @click="editBtn(5,row)">详情</base-table-a>
            <base-table-a type="delete" :class="row.state.data=='未发布'?'':'color-grad'" @click="editBtn(6,row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <!--新增-->
    <announcements-add ref="refAdd" @refresh="pageChange"/>
     <!--详情-->
    <announcements-detail ref="AnnouncementsDetail" @refresh="pageChange"/>
  </div>
</template>

<script>
    import {getAnnouncementsList,getAnnouncementsDetele} from "@/api/backstage/sysset/basic/announcements/announcements.js"
    import AnnouncementsAdd from "./announcements-add";
    import AnnouncementsDetail from "./announcements-detail";
    import commonReq  from "@/api/public/commonReq.js"

    export default {
        name: "index",
        components: {AnnouncementsAdd,AnnouncementsDetail},
        data() {
            return {
                loading:true,//加载遮罩控制条件
                pageNum: 1,
                pageSize: 10,
                total: 0,
                tableData:[],//列表数据
                title:'',//标题
                userOrg:'',//发布人
                state:{key:'',data:''},//状态
                dicts: {//字典
                    post_state: {},//状态
                },

            }
        },
        mounted() {
            this.pageChange ();
            this.getCommDict ();
        },
        filters:{
          filterTime(val){
            if(val){
              let index = val.indexOf(':')
              if(index != -1){
                return  val.substring(0,index+3)
              }else{
                return  val
              }
            }else{
              return '--'
            }
          }
        },
        methods: {
            //调用字典接口
            getCommDict(){
                let params = {
                    types:['post_state']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.post_state = res.post_state;
                })
            },
            //分页调取接口数据
            pageChange () {
                let params = {
                    current: this.pageNum,
                    model: {
                        title:this.title,
                        userOrg:this.userOrg,
                        state:{key:this.state.key}
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getAnnouncementsList(params).then(response => {
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
                    case 4:
                        this.$refs['refAdd'].show(t, row)
                        break

                    case 2://查询
                        this.pageNum=1;
                        this.pageChange()
                        break

                    case 3://重置
                        this.title='';
                        this.userOrg='';
                        this.state.key='';
                        this.pageNum=1;
                        this.pageChange ();
                        break

                    case 5://详情
                        this.$refs['AnnouncementsDetail'].show(t, row)
                        break

                    case 6://删除
                        this.$confirm('是否删除该条信息？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
                        }).then(() => { //确认删除
                            let params = {
                                id:row.id
                            }

                            getAnnouncementsDetele(params).then(response => {
                                // this.$message.success("删除成功")
                              this.$message(this.successTip())
                                const res = response;
                                this.pageChange ();

                            }).finally(() => {
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
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
    background: #fff;
  }
  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  .title /deep/ .base-label-box__label{
    width:40px;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
