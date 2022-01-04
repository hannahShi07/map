<template>
  <div>
    <!-- 查询条件 -->
    <div class="page-search-box">
      <base-label-box label="编码">
        <el-input v-model="queryParams.model.type" placeholder="请输入编码" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="名称">
        <el-input v-model="queryParams.model.name" placeholder="请输入名称" style="width: 280px" clearable />
      </base-label-box>
      <base-label-box label="状态">
        <el-select v-model="queryParams.model.status" @change="page" placeholder="请选择状态" style="width: 280px" clearable >
          <el-option
            v-for="(item, index) in enums.status"
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
        <base-page-button :title="addTitle" imgType="add" type="primary" @click="add()"/>
        <base-page-button v-if="opt === 'dict'" title="返回" @click="goBack"/>
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
        <el-table-column label="编码" width="200" prop="type" align="center" show-overflow-tooltip/>
        <el-table-column label="名称" width="300" prop="name" align="center" show-overflow-tooltip />
        <el-table-column label="描述" prop="describe" align="center" show-overflow-tooltip />
        <el-table-column label="状态" width="150" prop="status" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.status ? $t("common.status.valid") : $t("common.status.invalid")}}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="{row}">
            <base-table-a type="edit" @click="edit(row)">编辑</base-table-a>
            <base-table-a v-if="opt === 'dictType'" @click="setDicts(row)">设置字典项</base-table-a>
            <base-table-a type="delete" @click="del(row)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="tableData.total" :pageNum.sync="pageParam.current" :pageSize.sync="pageParam.size" @pageChange="page"/>
    </div>

    <dict-type :dialog-visible="dialog.isVisible" ref="dictType" :type="dialog.type" :typeId="typeId" @refresh="page" @close="formClose"/>
  </div>
</template>

<script>
  import dictApi from '@/api/backstage/sysset/basic/dict/Dict'
  import constant from '@/utils/constant'
  import {initQueryParams, initPartyDicts} from '@/utils/commons'
  import DictType from './form'
  import roleApi from "@/api/Role.js";

  export default {
    components: {DictType},
    filters: {
        statusFilter(status) {
            const map = {
                false: "danger",
                true: "success"
            };
            return map[status] || "success";
        }
    },
    computed: {
        addTitle() {
            return this.opt === "dictType" ? '新增字典' : '新增字典项';
        },
        pageParamCurrent(){
            return this.pageParam.current;
        },
        pageParamSize(){
            return this.pageParam.size;
        }
    },
    watch:{
        pageParamCurrent(newVal, oldVal){
            if(this.opt === 'dictType'){
                this.queryParams.current = newVal;
            }else if(this.opt === 'dict'){
                this.dictQueryParams.current = newVal;
            }
        },
        pageParamSize(newVal, oldVal){
            if(this.opt === 'dictType'){
                this.queryParams.size = newVal;
            }else if(this.opt === 'dict'){
                this.dictQueryParams.size = newVal;
            }
        }
    },
    data () {
      return {
        opt: 'dictType',
        dialog:{              // add:新增,edit:修改
          type: 'add',
          isVisible: false,
        },
        id: '',               // 主键
        typeId: '',           // 类型主键
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
            status: constant.status
        },
        roleList: [],         // 角色列表
        queryParams: initQueryParams({    // 查询参数
            model: {
                type: '',
                name: '',
                status: '',
            }
        }),
        dictQueryParams: initQueryParams({    // 查询参数
            model: {
                typeId: '',
                name: '',
                code: '',
                status: '',
            }
        }),
        pageParam: {
            current: 1,
            size: 10,
        }
      }
    },
    created(){
      this.page();
      initPartyDicts(['account_state'], this.dicts);
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
                model: {
                    type: '',
                    name: '',
                    status: '',
                }
            }
        });
        this.pageParam = {
            current: 1,
            size: 10,
        };
        this.$refs.multipleTable.clearSelection();

        this.page();
      },
    
      searchList(){
          this.pageParam.current = 1;
          this.page()
      },

      goBack(){
        this.opt = 'dictType';
        this.typeId = '';
        this.queryParams = initQueryParams({
            model: {
                model: {
                    type: '',
                    name: '',
                    status: '',
                }
            }
        });
        this.dictQueryParams = initQueryParams({
            model: {
                typeId: '',
                name: '',
                code: '',
                status: '',
            }
        }),
        this.pageParam = {
            current: 1,
            size: 10,
        };

        this.page();
      },

      /**
       * 查询列表
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      page () {
        this.loading = true;
        if(this.opt === 'dictType'){
            //this.queryParams.current = this.pageParam.current
            //this.queryParams.size = this.pageParam.size

            dictApi.page(this.queryParams).then(response => {
                const res = response.data;
                if (res.isSuccess) {
                    this.tableData = res.data;
                }
            }).finally(() => this.loading = false);
        }else if(this.opt === 'dict'){
            //this.dictQueryParams.current = this.pageParam.current
            //this.dictQueryParams.size = this.pageParam.size
            this.dictQueryParams.model.name = this.queryParams.model.name;
            this.dictQueryParams.model.code = this.queryParams.model.type;
            this.dictQueryParams.model.status = this.queryParams.model.status;

            dictApi.dictPage(this.dictQueryParams).then(response => {
                const res = response.data;
                if (res.isSuccess) {
                    this.tableData = res.data;
                }
            }).finally(() => this.loading = false);
        }

      },


     /**
      * 删除
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
          if(this.opt === 'dictType'){
              dictApi.delete(params).then(response => {
                  const res = response.data;
                  if (res.isSuccess) {
                      this.page ();
                      this.$message.success("操作成功");
                  }else{
                      this.$message.error("操作失败");
                  }
              })
          }else if(this.opt === 'dict'){
              dictApi.delDict(params).then(response => {
                  const res = response.data;
                  if (res.isSuccess) {
                      this.page ();
                      this.$message.success("操作成功");
                  }else{
                      this.$message.error("操作失败");
                  }
              })
          }

        });
      },


      /**
       * 新增
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      add(){
          this.dialog.type = "add";
          this.dialog.isVisible = true;
          this.$refs['dictType'].show()
      },


      /**
       * 修改
       * @Author: dfzhu
       * @Date: 2020/12/8
       */
      edit(row){
          this.dialog.type = "edit";
          this.dialog.isVisible = true;
          this.$refs['dictType'].show(row)
      },


      /**
       * 关闭表单
       * @Author: dfzhu
       * @Date: 2020/12/16
       */
      formClose() {
          this.dialog.isVisible = false;
      },


      /**
       * 设置字典项
       * @param row
       */
      setDicts(row){
          let vm = this;
          vm.opt = 'dict';
          vm.typeId = row.id;
          vm.queryParams = initQueryParams({
              model: {
                  type: '',
                  name: '',
                  status: '',
              }
          })
          vm.dictQueryParams = initQueryParams({
              model: {
                  typeId: '',
                  name: '',
                  code: '',
                  status: '',
              }
          }),
          vm.pageParam = {
              current: 1,
              size: 10,
          };
          vm.dictQueryParams.model.typeId = row.id;

          vm.page();
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
