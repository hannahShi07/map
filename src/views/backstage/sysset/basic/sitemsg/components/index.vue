<template>
  <div>
    <!-- 查询条件 -->
    <div class="page-search-box">
      <base-label-box label="标题">
        <el-input v-model="queryParams.model.title" placeholder="请输入标题" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="消息类型">
        <el-select v-model="queryParams.model.bizType.key" @change="page" placeholder="请选择消息类型" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in dicts.sitemsg_biz_type"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="消息状态">
        <el-select v-model="queryParams.model.isRead" @change="page" placeholder="请选择消息状态" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in enums.msgState"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>

      <base-label-box label="发布时间">
        <el-date-picker style="width: 165px;" v-model="queryParams.model.releaseTimeStart" type="date"
                        value-format="yyyy-MM-dd"  @change="page"
                        :picker-options="pickerOptionsDisabled('start', 'queryParams.model.releaseTimeEnd')" placeholder="请选择"/>
        <el-date-picker style="width: 165px;" v-model="queryParams.model.releaseTimeEnd" type="date"
                        value-format="yyyy-MM-dd" @change="page"
                        :picker-options="pickerOptionsDisabled('end', 'queryParams.model.releaseTimeStart')" placeholder="请选择"/>
      </base-label-box>

    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button imgType="read"  title="已读" @click="tagRead"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="searchList"/>
        <base-page-button title="重置" imgType="reset" @click="reset"/>
      </div>
    </div>

    <!-- 列表 -->
    <div class="mr-20 ml-20" v-cloak>
      <el-table
        :data="tableData.records"
        ref="multipleTable"
        header-row-class-name="page-table-header"
        :row-key="bindRowKeys"
        @selection-change="handleSelectionChange"
        v-loading="loading">

        <el-table-column
          type="selection"
          reserve-selection
          width="45"
          align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="标题" prop="title" align="center" show-overflow-tooltip/>
        <el-table-column label="消息类型" prop="bizType.data" align="center" show-overflow-tooltip />
        <el-table-column label="消息状态" width="150" prop="isRead" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.isRead ? $t("common.msgState.read") : $t("common.msgState.unRead")}}
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="300" prop="releaseTime" align="center" show-overflow-tooltip />

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="{row}">
            <base-table-a  @click="show(row)">详情</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="tableData.total" :pageNum.sync="queryParams.current" :pageSize.sync="queryParams.size" @pageChange="page"/>
    </div>

    <sitemsg-detail :dialog-visible="dialog.detailIsVisible" ref="sitemsgDetail"/>
  </div>
</template>

<script>
    import siteMsgApi from '@/api/backstage/sysset/basic/sitemsg/SiteMsg'
    import constant from '@/utils/constant'
    import {initQueryParams, initPartyDicts} from '@/utils/commons'
    import SitemsgDetail from './detail'
    import roleApi from "@/api/Role.js";

    export default {
        components: {SitemsgDetail},
        filters: {
            statusFilter(status) {
                const map = {
                    false: "danger",
                    true: "success"
                };
                return map[status] || "success";
            }
        },
        data () {
            return {
                dialog:{
                    detailIsVisible: false
                },
                id: '',               // 主键
                receiveIds: [],       // 接收主键数组
                multipleSelection:[], // 多选框选中数据
                loading: true,        // 加载遮罩控制条件
                tableData: {          // 列表数据
                    total: 0
                },
                dicts: {              // 字典
                    sitemsg_biz_type: {},
                },
                enums: {              // 枚举
                    msgState: constant.msgState
                },
                roleList: [],                     // 角色列表
                queryParams: initQueryParams({    // 查询参数
                    model: {
                        bizType:{
                            data: '',
                            key: ''
                        },
                        title: '',
                        isRead: '',
                        releaseTimeStart: '',
                        releaseTimeEnd: '',
                    }
                }),
            }
        },
        created(){
            this.page();
            initPartyDicts(['sitemsg_biz_type'], this.dicts);
            this.initRoleList();
        },
        methods: {
            // 初始化角色列表
            initRoleList(){
                roleApi.list().then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                        this.roleList = res.data;
                    }
                });
            },
            // 时间限制配置 type: start表示开始使用  end表示结束使用    name: 为限制的日期(与type反向)
            pickerOptionsDisabled (type, name) {
                return {
                    disabledDate: (time) => {
                        if (type === 'start') {
                            if (this[name]) {
                                return time.getTime() > new Date(this[name]).getTime()
                            }
                        } else {
                            if (this[name]) {
                                return time.getTime() < new Date(this[name]).getTime() - 86400000
                            }
                        }
                    }
                }
            },

            /**
             * 列表多选框绑定key
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            bindRowKeys(row){
                return row.receiveId;
            },


            /**
             * 多选框Change事件
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            handleSelectionChange(val) {
                this.receiveIds = [];
                this.multipleSelection = val;
                if(this.multipleSelection !== '' && this.multipleSelection !== undefined && this.multipleSelection!=null && this.multipleSelection !=='null' && this.multipleSelection.length > 0){
                    for(let i = 0; i < this.multipleSelection.length; i++){
                        this.receiveIds.push(this.multipleSelection[i].receiveId)
                    }
                }
            },


            /**
             * 重置
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            reset(){
                this.queryParams = initQueryParams({
                    model: {
                        bizType:{
                            data: '',
                            key: ''
                        },
                        title: '',
                        isRead: '',
                        releaseTimeStart: '',
                        releaseTimeEnd: '',
                    }
                });
                this.$refs.multipleTable.clearSelection();
                this.page();
            },

            searchList(){
                this.queryParams.current = 1;
                this.page()
            },
            
            /**
             * 查询账户列表
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            page () {
                this.loading = true;
                siteMsgApi.page(this.queryParams).then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                        this.tableData = res.data;
                    }
                }).finally(() => this.loading = false);
            },

            /**
             * 详情
             * @Author: dfzhu
             * @Date: 2020/12/30
             */
            show(row){
                this.dialog.detailIsVisible = true;
                this.$refs['sitemsgDetail'].show(row)
                console.log(row)
                if(!row.isRead){
                    siteMsgApi.tagRead({receiveIds: [row.receiveId]}).then(response => {
                        const res = response.data;
                        if (res.isSuccess) {
                            //this.page();
                            row.isRead = true;
                        }
                    })
                }
            },


            /**
             * 标记已读
             * @Author: dfzhu
             * @Date: 2020/12/8
             */
            tagRead(){
                let vm = this;
                if (vm.receiveIds.length <= 0) {
                    vm.$message.warning("请选择数据");
                    return;
                }

                siteMsgApi.tagRead({receiveIds: vm.receiveIds}).then(response => {
                    const res = response.data;
                    if (res.isSuccess) {
                      vm.page();
                      eventBus.$emit('eventBusName')
                      vm.$message.success("操作成功");
                    }else{
                      vm.$message.error("操作失败");
                    }
                })
            },

        }
    }
</script>

<style lang="scss" scoped>
  /*.color-grad{
    color:#999
  }*/
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999
  }
  .base-table-a__reset {
    color: #ED3C3C;
  }
</style>
