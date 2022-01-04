<template>
  <el-dialog
    class="dialog-inner"
    width="530px"
    :title="title"
    :visible.sync="visible"
    style="z-index: 2100;"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape = "false"
    append-to-body
  >
    <el-form label-width="70px" v-loading="loading">
      <div class="search-box">
        <el-form-item label="组织名称">
          <el-input v-model="searchName" placeholder="请输入组织名称" clearable @keyup.enter.native="search()"/>
          <base-page-button title="查询" imgType="search" type="primary" @click="search()"/>
        </el-form-item>

      </div>
      <el-tree
        :expand-on-click-node="false"
        class="base-page-tree__tree"
        :data="treeData"
        :props="defaultProps"
        :indent="0"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        highlight-current
        :show-checkbox="checkVisible"
        :check-strictly ="true"
        ref="tree">
        <p slot-scope="{ node, data }" class="slot-tree-node">
          <img v-if="node.childNodes.length === 0" src="@/assets/page/icon-file.png" alt="">
          <span>{{ node.label }}</span>
        </p>
      </el-tree>
      <el-col :span="24" class="tac">
        <el-button class="js-button" @click="goBtn()">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
    import {getManageTree,getAllOrgTree} from "@/api/backstage/party/basic/manage/manage.js"
    export default{
        name: "BaseOrgTree",
        props:{
          //是组织关系转接还是其他模块
          labelName:{
            type:String,
            default:'其他模块'
          },
        },
        data(){
            return{
                // 模态
                visible: false,
                title:'选择组织',
                searchName:'',
                treeData:[],

              // 是否显示多选框
                checkVisible:false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                orgId:{
                    data:'',
                    key:'',
                    code:''
                },

                // 加载条件
                loading:true,
            }
        },
        mounted(){
            // this.getTreeList();

        },
        // watch: {
        //     searchName (val) {
        //         this.$refs.tree.filter(val);
        //         this.getTreeList();
        //     }
        // },
        methods:{
            filterNode (value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            //点击搜索按钮
            search(){
                this.getTreeList();
            },

            //打开 type为1时是多选，默认单选
            show (type,list) {
                if(list!='' && list!=undefined && list!=null && list!='null'){
                  this.orgId={
                    data:list.org,
                    key:list.orgId
                  }
                }

                this.visible = true;
                if(type === "1"){
                    this.checkVisible = true
                    this.$nextTick(() => {
                        this.$refs.tree.setCheckedKeys(list);
                    });
                }
                this.getTreeList(list);

            },

            //取消
            goBtn () {
                this.searchName='';
                this.visible = false;
            },

            //确定
            save(){
                this.visible = false;
                this.searchName='';
                if(this.checkVisible){
                    this.$emit('refresh', this.$refs.tree.getCheckedNodes(),this.$refs.tree.getCheckedKeys())
                }else {
                  let row = this.$refs.tree.getCurrentNode()
                  if(row){
                    this.orgId.key = row.id;
                    this.orgId.data = row.name;
                    this.orgId.code=row.code;
                    this.$emit('refresh', this.orgId)
                  }
                }
            },

            //获取所属党组织
            getTreeList(list){
               if(this.labelName=='组织关系转接'){
                 let params={
                   name:this.searchName
                 }
                 this.loading=true;
                 getAllOrgTree(params).then(response => {
                   const res = response;
                   this.treeData=res
                   // 回显选中组织
                   this.$nextTick(() => {
                     this.$refs.tree.setCurrentKey(this.orgId.key);
                   });
                 }).finally(() => {
                   this.loading=false;
                 });

               }else{
                 let params={
                   name:this.searchName
                 }
                 this.loading = true;
                 getManageTree(params).then(response => {
                   const res = response;
                   this.treeData=res;
                   // 回显选中组织
                   this.$nextTick(() => {
                     this.$refs.tree.setCurrentKey(this.orgId.key);
                   });
                 }).finally(() => {
                   this.loading = false;
                 });
               }

            }
        },
    }
</script>

<style scoped lang="scss">
  .el-dialog__body{
    height: 610px;
  }

  .search-box{
    display:flex;
    justify-content:space-between;
  }
  .search-box /deep/ .el-input{
    width:260px;
  }
  .page-btn{
    min-width:80px;
  }
  .dialog-inner /deep/ .el-dialog__body {
    padding: 15px 34px;
  }
  .base-page-tree__tree /deep/ {
    max-height: 40vh;
    overflow-y: auto;
  }
  .el-dialog .el-dialog__body /deep/ {
    max-height: 0;
    overflow-y: 0;
  }
  .base-page-tree__tree /deep/ {
    .el-tree-node {
      position: relative;
      padding-left: 16px;
      caret-color: transparent;
    }

    > .el-tree-node {
      padding-left: 0;
    }

    .el-tree-node__content {
      margin-top: 20px;
      font-size: 14px;
      color: #666666;
      padding-left: 0;
      height: inherit;
      padding-right: 20px;
      display: flex !important;
      align-items: flex-start !important;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node::before {
      content: '';
      height: calc(100% + 7px);
      width: 1px;
      position: absolute;
      left: 3px;
      top: -23px;
      border-width: 1px;
      border-left: 1px dashed #52627C;
      z-index: 1;
    }

    .el-tree-node:last-child::before {
      height: 38px;
    }

    .el-tree-node::after {
      content: '';
      width: 21px;
      height: 20px;
      position: absolute;
      left: 3px;
      top: 13px;
      border-width: 1px;
      border-top: 1px dashed #52627C;
    }

    & > .el-tree-node::after {
      border-top: none;
    }

    & > .el-tree-node::before {
      border-left: none;
    }

    .el-tree-node__expand-icon {
      position: relative;
      left: 5px;
      top: 3px;
      font-size: 0px;
      width: 22px;
      height: 17px;
      background: url('~@/assets/page/icon-plus.png') no-repeat 100% 100%;
      margin-right: 10px;

      &.is-leaf {
        margin-right: 0;
        width: 0;
        height: 0;
        background: none;
      }

      &.expanded {
        transform: none;
        background: url('~@/assets/page/icon-sub.png') no-repeat 100% 100%;
      }
    }

    .slot-tree-node {
      padding: 0 0;
      margin: 5px 0;
      > img {
        width: 14px;
        height: 16px;
        vertical-align: sub;
        margin-right: 3px;
      }

      > span {
        white-space: pre-wrap;
        word-break: break-all;
        display: inline-block;
        vertical-align: top;
      }
    }
  }

  .base-page-tree {
    display: flex;
    /*height: 100%;*/
    max-height: calc(100vh - 152px);
  }

  .base-page-tree__left {
    width: 320px;
    padding: 20px;
    margin-right: 20px;
    background: #FFFFFF;
    border-radius: 4px;
    max-height: 100%;
    overflow: auto;
  }

  .base-page-tree__right {
    flex: 1;
    max-height: 100%;
    overflow: auto;
    background: #fff;
  }

  .el-input__icon .border {
    position: absolute;
    left: -5px;
    top: 10px;
    width: 1px;
    height: 20px;
    background: #E5E5E5;
  }
</style>
