<template>
  <el-dialog class="dialog-inner" width="522px" :title="title" :visible.sync="visible"  append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
    <el-form label-width="70px">
      <div class="search-box">
        <el-form-item label="组织名称">
          <el-input v-model="searchName" placeholder="请输入组织名称"></el-input>
        </el-form-item>
        <base-page-button title="查询" imgType="search" type="primary" @click="search()"/>
      </div>
      <el-tree
        :expand-on-click-node="false"
        class="base-page-tree__tree"
        :data="treeData"
        :props="defaultProps"
        :indent="0"
        default-expand-all
        highlight-current
        :filter-node-method="filterNode"
        @node-click="handleTreeClick"
        ref="tree">
        <p slot-scope="{ node, data }" class="slot-tree-node">
          <img v-if="node.childNodes.length === 0" src="@/assets/page/icon-file.png" alt="">
          <span>{{ node.label }}</span>
        </p>
      </el-tree>
      <el-col :span="24" class="tac">
        <el-button class="js-button" @click="goBtn()">取消</el-button>
        <el-button type="primary" @click="save()">保存</el-button>
      </el-col>
    </el-form>
  </el-dialog>

</template>

<script>
  import {getAllOrgTree} from "@/api/backstage/party/basic/org/org.js"
  export default{
    props:{
    },
    data(){
      return{
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
      this.getTreeList();

    },
    watch: {
      // searchName (val) {
      //   this.$refs.tree.filter(val);
      //   this.getTreeList();
      // }
    },
    methods:{
      filterNode (value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //点击搜索按钮
      search(){
        this.getTreeList();
      },
      //打开
      show () {
        this.visible = true;
        this.getTreeList();

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
        this.$emit('refresh', this.orgId)
      },
      //点击组织树
      handleTreeClick(row){
        this.orgId.key=row.id;
        this.orgId.data=row.name;

      },
      //获去所属党组织
      getTreeList(){
        let params={
          name:this.searchName
        }
        getAllOrgTree(params).then(response => {
          const res = response;
          this.treeData=res;

        })
      }
    },
  }


</script>

<style lang="scss" scoped>
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
  .base-page-tree__tree{
    max-height: 40vh;
    overflow-y: auto;
  }
  .base-page-tree__tree /deep/ {
    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }

    > .el-tree-node {
      padding-left: 0;
    }

    .el-tree-node__content {
      margin-top: 20px;
      font-size: 14px;
      color: #666666;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node::before {
      content: '';
      height: calc(100% + 12px);
      width: 1px;
      position: absolute;
      left: -3px;
      top: -26px;
      border-width: 1px;
      border-left: 1px dashed #52627C;
      z-index: 1;
    }

    .el-tree-node:last-child::before {
      height: 38px;
    }

    .el-tree-node::after {
      content: '';
      width: 24px;
      height: 20px;
      position: absolute;
      left: -3px;
      top: 16px;
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
      top: 2px;
      font-size: 0px;
      width: 14px;
      height: 14px;
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
        background: url('~@/assets/page/icon-sub.png');
      }
    }

    .slot-tree-node {

      > img {
        width: 14px;
        height: 16px;
        vertical-align: sub;
        margin-right: 3px;
      }
    }
  }
  .tac{
    text-align:center;
    margin-top:28px;
  }
</style>
