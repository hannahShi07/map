<template>
  <div class="history">
    <!-- 查询条件 -->
    <div class="page-search-box">
      <!--<base-label-box label="角色编码">
        <el-input v-model="queryParams.model.code" placeholder="请输入角色编码" style="width: 280px" clearable />
      </base-label-box>-->
      <base-label-box label="角色名称">
        <el-input v-model="queryParams.model.name" @keyup.enter.native="page" placeholder="请输入角色名称" style="width: 280px" clearable />
      </base-label-box>

      <base-label-box label="角色状态">
        <el-select v-model="queryParams.model.status" @change="page" placeholder="请选择角色状态" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in enums.accountState"
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
        <base-page-button title="新增角色" imgType="add" type="primary" @click="add()"/>
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
        <!--<el-table-column label="角色编码" width="300" prop="code" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ isEmpty(tableData.records[scope.$index],'code') }}
          </template>
        </el-table-column>-->
        <el-table-column label="角色名称" width="300" prop="name" align="center" show-overflow-tooltip/>
        <el-table-column label="角色说明" prop="describe" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ isEmpty(tableData.records[scope.$index],'describe') }}
          </template>
        </el-table-column>
        <el-table-column label="角色状态" width="150" prop="status" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.status ? $t("common.accountState.valid") : $t("common.accountState.invalid")}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="520">
          <template slot-scope="{row}">
            <base-table-a type="edit" @click="edit(row)">编辑</base-table-a>
            <base-table-a @click="authUser(row)">授权用户</base-table-a>
            <base-table-a @click="authResource(row)">分配权限</base-table-a>
            <base-table-a type="summary" @click="disEnable(row.status ? 0 : 1, row)">{{row.status ? '停用' : '启用'}}</base-table-a>
            <base-table-a type="delete" @click="del(row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="tableData.total" :pageNum.sync="queryParams.current" :pageSize.sync="queryParams.size" @pageChange="page"/>
    </div>

    <add-auth-role :dialog-visible="dialog.isVisible" ref="addAuthRole" :type="dialog.type" @refresh="reset" @close="formClose"/>

    <user-role
      :dialog-visible="userRoleDialog.isVisible"
      @close="userRoleClose"
      @success="userRoleSuccess"
      ref="userRole"
    />

    <role-authority
      :dialog-visible="roleAuthorityDialog.isVisible"
      @close="roleAuthorityClose"
      @success="roleAuthoritySuccess"
      ref="roleAuthority"
    />

  </div>
</template>

<script>
  import roleApi from "@/api/Role.js";
  import authRoleApi from "@/api/backstage/sysset/permission/user/AuthRole";
  import constant from '@/utils/constant'
  import {initQueryParams, initPartyDicts} from '@/utils/commons'
  import AddAuthRole from './form'
  import UserRole from "./UserRole";
  import RoleAuthority from "./RoleAuthority";
  import db from '@/utils/localstorage'

  export default {
    components: {AddAuthRole, UserRole, RoleAuthority},
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
        userRoleDialog: {
            isVisible: false
        },
        roleAuthorityDialog: {
            isVisible: false
        },
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
        },
        enums: {              // 枚举
            accountState: constant.accountState
        },
        queryParams: initQueryParams({    // 查询参数
            model: {
                djOrg:{
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
      initPartyDicts(['account_state'], this.dicts);
    },
    methods: {
        userRoleClose() {
            this.userRoleDialog.isVisible = false;
        },
        roleAuthorityClose() {
            this.roleAuthorityDialog.isVisible = false;
        },
        userRoleSuccess() {
            this.page();
        },
        roleAuthoritySuccess() {
            this.page();
        },

        authResource(row) {
            this.roleAuthorityDialog.isVisible = true;
            this.$refs.roleAuthority.setRoleAuthority(row);
        },
        authUser(row) {
            this.userRoleDialog.isVisible = true;
            this.$refs.userRole.setUserRole(row);
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
        authRoleApi.page(this.queryParams).then(response => {
            const res = response.data;
            if (res.isSuccess) {
                this.tableData = res.data;
            }
        }).finally(() => this.loading = false);

        // console.log(db.get("USER"));
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
          roleApi.delete(params).then(response => {
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
          this.$refs['addAuthRole'].show()
      },


      /**
       * 修改账户
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      edit(row){
          this.dialog.type = "edit";
          this.dialog.isVisible = true;
          this.$refs['addAuthRole'].show(row)
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
            roleApi.disEnableRoles(params).then(response => {
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

</style>
