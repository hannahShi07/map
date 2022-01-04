<template>
  <div class="base-page-tree">
    <div class="base-page-tree__left">
      <el-input
        class="base-page-tree__left-input"
        placeholder="请输入党组织名称"
        @keyup.enter.native="search()"
        v-model="filterText">
        <span slot="suffix" @click="search()" class="el-input__icon el-icon-search rel font-16">
          <span class="border"></span>
        </span>
      </el-input>

      <el-tree
        v-loading="loading"
        :expand-on-click-node="false"
        class="base-page-tree__tree"
        :data="treeData"
        :props="defaultProps"
        :indent="0"
        default-expand-all
        node-key="id"
        @node-click="nodeClick"
        :filter-node-method="filterNode"
        highlight-current
        ref="tree">
        <div slot-scope="{ node, data }" class="slot-tree-node">
          <!--<img v-if="node.childNodes.length === 0" src="@/assets/page/icon-file.png" alt="">-->
          <span>{{ node.label }}</span>
        </div>
      </el-tree>
    </div>

    <div class="base-page-tree__right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {getPartyTree, getOtherTree} from "@/api/backstage/party/basic/party/party.js";

  export default {
    name: 'BasePageTree',
    watch: {
      filterText (val) {
        // this.$refs.tree.filter(val);
        this.getTree();
      }
    },
    data () {
      return {
        // 加载遮罩控制条件
        loading: true,
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData: [],
        choose: null,//选中的组织树
      }
    },
    props: {
      type: {
        type: String,
        default: ""
      }
    },
    mounted () {
      this.getTree();
    },
    methods: {
      //会返回过滤节点的子节点
      filterNode (value, data) {
        // if (!value) return true;
        // return data.label.indexOf(value) !== -1;

        if (!value) {
          return true;
        }
        let level = node.level;
        let _array = [];//这里使用数组存储 只是为了存储值。
        this.getReturnNode(node, _array, value);
        let result = false;
        _array.forEach((item) => {
          result = result || item;
        });
        return result;
      },
      //树的点击事件
      nodeClick (row, node) {
        this.choose = row
        this.$emit('handleTreeClick', row)
      },
      //点击搜索按钮
      search () {
        this.getTree();
      },
      // 调用数据接口
      getTree (val) {
        if (val === "clearFilterText") {
            this.filterText = ""
            this.choose = null
            return;
        }
        if (val === "clear") {
          this.filterText = ""
          this.choose = null
          this.$emit('handleTreeClick', {id: "", code: ''})
        }
        let params = {
          name: this.filterText
        }
        this.loading = true;
        if (this.type === "party") {
          this.partyType(params)
        } else {
          this.otherType(params)
        }

      },
      otherType (params) {
        getOtherTree(params).then(response => {
          const res = response;
          this.treeData = res;
          if (res && res[0] && res[0].id) {
            if (!this.choose) {
              this.choose = res[0].id
            }
            this.$nextTick(function () {
              this.$refs.tree.setCurrentKey(this.choose);
            })
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      partyType (params) {
        getPartyTree(params).then(response => {
          const res = response;
          this.treeData = res;
          if (res && res[0] && res[0].id) {
            if (!this.choose) {
              this.choose = res[0].id
            }
            this.$nextTick(function () {
              this.$refs.tree.setCurrentKey(this.choose);
            })
          }
        }).finally(() => {
          this.loading = false;
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  .base-page-tree__left-input /deep/ .el-input__inner {
    height: 40px;
    line-height: 40px;
    padding-right: 40px;
  }

  .base-page-tree__tree {
    margin-top: 30px;
  }

  .base-page-tree__tree /deep/ {
    .el-tree-node {
      position: relative;
      padding-left: 16px;
      caret-color: transparent;

      .el-tree-node::before {
        content: '';
        height: calc(100% + 17px);
        width: 1px;
        position: absolute;
        left: 3px;
        top: -23px;
        border-width: 1px;
        border-left: 1px dashed #999999;
        z-index: 1;
      }
    }

    > .el-tree-node {
      padding-left: 0;
    }

    .el-tree-node__content {
      margin-top: 6px;
      font-size: 14px;
      color: #666666;
      padding-left: 0;
      height: inherit;
      padding-right: 20px;
      display: flex !important;
      align-items: flex-start !important;
    }

    .el-tree-node__children {
      padding-left: 6px;
    }

    .el-tree-node::before {
      content: '';
      height: calc(100% + 17px);
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
      /*border-top: 1px dashed #52627C;*/
      border-top: 1px dashed #999999;
    }

    & > .el-tree-node::after {
      border-top: none;
    }

    & > .el-tree-node::before {
      border-left: none;
    }

    .el-tree-node__expand-icon {
      position: relative;
      left: 2px;
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
