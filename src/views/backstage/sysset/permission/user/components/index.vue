<template>
  <div class="history">
    <!-- 查询条件 -->
    <div class="page-search-box">
      <base-label-box label="所属组织">
        <el-input v-model="queryParams.model.djOrg.data" @keyup.enter.native="page" placeholder="请输入所属组织" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="用户姓名">
        <el-input v-model="queryParams.model.name" @keyup.enter.native="page" placeholder="请输入用户姓名" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="手机号码">
        <el-input v-model="queryParams.model.mobile" @keyup.enter.native="page" placeholder="请输入手机号码" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="账号角色">
        <el-select v-model="queryParams.model.userRole" @change="page" placeholder="请选择账号角色" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="账号状态">
        <el-select v-model="queryParams.model.status" @change="page" placeholder="请选择账号状态" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in enums.accountState"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="组织类别">
        <el-select v-model="queryParams.model.orgCategory.key" @change="page" placeholder="请选择组织类别" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in dicts.category"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
      <base-label-box label="组织类型">
        <el-select v-model="queryParams.model.orgType.key" @change="page" placeholder="请选择组织类型" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in dicts.ORG_TYPE"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增账号" imgType="add" type="primary" @click="add()"/>
        <base-page-button title="批量停用" @click="disEnable(0)"/>
        <base-page-button title="批量启用" @click="disEnable(1)"/>
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
        <el-table-column label="所属组织" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.djOrg.data}}
          </template>
        </el-table-column>
        <el-table-column label="用户姓名" width="200" prop="name" align="center" show-overflow-tooltip/>
        <el-table-column label="手机号码" width="300" prop="mobile" align="center" show-overflow-tooltip />
        <el-table-column label="账号角色" width="150" prop="roles" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ isEmpty(tableData.records[scope.$index],'roles') }}
          </template>
        </el-table-column>

        <el-table-column label="账号状态" width="150" prop="education" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.status ? $t("common.accountState.valid") : $t("common.accountState.invalid")}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="400">
          <template slot-scope="{row}">
            <base-table-a type="edit" @click="edit(row)">编辑</base-table-a>
            <base-table-a type="summary" :class="row.status ? 'cla_red' : ''" @click="disEnable(row.status ? 0 : 1, row)">{{row.status ? '停用' : '启用'}}</base-table-a>
            <base-table-a type="backout2" @click="resetPassword(row)">重置密码</base-table-a>
            <base-table-a type="delete" @click="del(row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="tableData.total" :pageNum.sync="queryParams.current" :pageSize.sync="queryParams.size" @pageChange="page"/>
    </div>

    <add-auth-user :dialog-visible="dialog.isVisible" ref="addAuthUser" :type="dialog.type" @refresh="reset" @close="formClose"/>
  </div>
</template>

<script>
  import authUserApi from '@/api/backstage/sysset/permission/user/AuthUser'
  import constant from '@/utils/constant'
  import {initQueryParams, initPartyDicts} from '@/utils/commons'
  import AddAuthUser from './form'
  import roleApi from "@/api/Role.js";

  export default {
    components: {AddAuthUser},
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
        dialog:{              // add:新增,edit:修改
          type: 'add',
          isVisible: false
        },
        id: '',               // 主键
        ids: [],              // 主键数组
        multipleSelection:[], // 多选框选中数据
        loading: true,        // 加载遮罩控制条件
        tableData: {          // 列表数据
            total: 0
        },
        dicts: {              // 字典
          account_state: {},
          ORG_TYPE: {},
          category: {},
        },
        enums: {              // 枚举
            accountState: constant.accountState
        },
        roleList: [],         // 角色列表
        queryParams: initQueryParams({    // 查询参数
            model: {
                djOrg:{
                    data: '',
                    key: ''
                },
                orgType: {
                    data: '',
                    key: ''
                },
                orgCategory: {
                    data: '',
                    key: ''
                },
                name: '',
                mobile: '',
                status: '',
                userRole: '',
            }
        }),
      }
    },
    created(){
      this.page();
      initPartyDicts(['account_state', 'ORG_TYPE', 'category'], this.dicts);
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


      /**
       * 列表多选框绑定key
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      bindRowKeys(row){
          return row.id;
      },


      /**
       * 多选框Change事件
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      handleSelectionChange(val) {
          this.ids = [];
          this.multipleSelection = val;
          if(this.multipleSelection !== '' && this.multipleSelection !== undefined && this.multipleSelection!=null && this.multipleSelection !=='null' && this.multipleSelection.length > 0){
              for(let i = 0; i < this.multipleSelection.length; i++){
                  this.ids.push(this.multipleSelection[i].id)
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
                djOrg:{
                    data: '',
                    key: ''
                },
                orgType: {
                    data: '',
                    key: ''
                },
                orgCategory: {
                    data: '',
                    key: ''
                },
                name: '',
                mobile: '',
                status: '',
                userRole: '',
            }
        });
        this.$refs.multipleTable.clearSelection();
        this.page();
      },

      searchList(){
        this.queryParams.current = 1
        this.page()
      },

      /**
       * 查询账户列表
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      page () {
        this.loading = true;
        authUserApi.page(this.queryParams).then(response => {
            const res = response.data;
            if (res.isSuccess) {
                this.tableData = res.data;
            }
        }).finally(() => this.loading = false);
      },


     /**
      * 删除账户
      * @Author: dfzhu
      * @Date: 2020/12/8
      */
     del(row){
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            ids : [row.id]
          }
          authUserApi.delete(params).then(response => {
            const res = response.data;
            if (res.isSuccess) {
                this.page ();
                this.$message.success("操作成功");
            }else{
                this.$message.error("操作失败");
            }
          })
        });
      },


      /**
       * 新增账户
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      add(){
          this.dialog.type = "add";
          this.dialog.isVisible = true;
          this.$refs['addAuthUser'].show()
      },


      /**
       * 修改账户
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      edit(row){
          this.dialog.type = "edit";
          this.dialog.isVisible = true;
          this.$refs['addAuthUser'].show(row)
      },


      /**
       * 禁用/启用账户
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      disEnable(opt, row){
        let vm = this;
        if(!row) {
            if (vm.ids.length <= 0) {
                vm.$message.warning("请选择数据");
                return;
            }
        }
        let title = '确定停用?';
        if(opt === 1){
            title = '确定启用?';
        }
        this.$confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {
                status: opt
            }
            if(row){
                params.ids = [row.id];
            }else{
                params.ids = vm.ids;
            }
            authUserApi.disEnable(params).then(response => {
                const res = response.data;
                if (res.isSuccess) {
                    vm.page();
                    vm.$message.success("操作成功");
                }else{
                    vm.$message.error("操作失败");
                }
            })
        });
      },


      /**
       * 重置密码
       * @param row
       */
      resetPassword(row){
          let vm = this;
          vm.$confirm('确定重置密码?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              authUserApi.resetPassword({id: row.id}).then(response => {
                  const res = response.data;
                  if (res.isSuccess) {
                      vm.page();
                      //vm.$message.success("操作成功");
                      vm.$confirm("该账号密码已重置为：" + res.data, '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                      })
                  }else{
                      vm.$message.error("操作失败");
                  }
              })
          });
      },


      /**
       * 关闭表单
       * @Author: dfzhu
       * @Date: 2020/12/16
       */
      formClose() {
          this.dialog.isVisible = false;
      }

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

  .cla_red {
    color: #ED3C3C;
  }
</style>
