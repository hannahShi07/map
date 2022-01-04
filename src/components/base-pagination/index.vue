<template>
  <div class="text-right mt-20"  v-show="total > 0">
    <el-pagination background :layout="layout"
                   :total="total" :page-sizes="pageSizes" :page-size="size" :current-page="pageNum"
                   @current-change="currentChange" @size-change="sizeChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'BasePagination',
    props: {
      total: {
        type: Number,
        default: 0
      },
      pageNum: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 10
      },
      pageSizes: {
        type: Array,
        default: () => [10, 20, 50, 100]
      },
      layout: {
        type: String,
        default: 'prev, pager, next, jumper, total, sizes'
      },
    },
    computed: {
      num: {
        get () {
          return this.pageNum
        },
        set (val) {
          this.$emit('update:pageNum', val)
        }
      },
      size: {
        get () {
          return this.pageSize
        },
        set (val) {
          this.$emit('update:pageSize', val)
        }
      }
    },
    methods: {
      sizeChange (size) {
        this.num = 1
        this.size = size

        this.$emit('pageChange', {pageNum: this.num, pageSize: this.size})
      },
      currentChange (current) {
        this.num = current

        this.$emit('pageChange', {pageNum: this.num, pageSize: this.size})
      }
    }
  }
</script>

<style scoped>
  .text-right >>> .el-pagination__sizes{
    margin: 0;
  }
  .text-right >>> .el-pagination{
    padding-right:0;
    padding-bottom: 20px;
  }
</style>
