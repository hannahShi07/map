<template>
  <div style="background: #EFEFEF; padding-bottom: 2px;">
    <div style="font-size: 16px;color: #666666;margin-top: 15px">
      <i class="el-icon-warning-outline"/> 该模块下共有 <span style="color: #ED3C3C;">{{total}}条</span>
    </div>

    <div v-loading="loading">
      <div class="book">
        <div class="book-box" v-for="item in tableData" :key="item.fileId">
          <div class="book-box-left" @click="editBtn(5, item)">
            <img :src="item.thumbUrl" alt="">
          </div>
          <div class="book-box-right">
            <div class="box-right-p1">{{item.fileTitle}}</div>
            <div class="box-right-p2">{{item.description}}</div>
            <div class="box-right-p3">{{item.startTime}}</div>
            <div class="box-right-p4">{{item.orgName}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空数据样式 -->
    <base-table-empty v-if="!tableData.length && !loading"/>

    <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" style="text-align: center"
                     @pageChange="getEducationDataByPageFn" :layout="'prev, pager, next, jumper, total'"/>
  </div>
</template>

<script>
  import {
    getEducationDataByPage,
    delEducationData,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    data () {
      return {
        tableData: [],
        loading: false,
        total: 0,
        pageNum: 1,
        pageSize: 12
      }
    },
    created () {
      this.getEducationDataByPageFn()
    },
    methods: {
      editBtn (t, row) {
        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getEducationDataByPageFn()
            break

          // 详情
          case 5:
            // 增加点击量
            addEducationDataSum({id: row.fileId})
            window.open(row.url)
            break
        }
      },
      getEducationDataByPageFn (refresh) {
        this.loading = true
        getEducationDataByPage({
          fileType: '1295281197470973952',
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.tableData = res.records
          this.total = res.total
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media (min-width: 1881px) {
    .book-box {
      max-width: calc(24.9% - 10px);

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 1880px) {
    .book-box {
      max-width: calc(33.33% - 10px);

      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .book {
    display: flex;
    flex-wrap: wrap;
  }

  .book-box {
    flex: 1;
    display: flex;
    height: 202px;
    background: #fff;
    padding: 16px;
    margin-top: 15px;
    margin-right: 15px;
    border-radius: 4px;

    .book-box-left {
      width: 120px;
      height: 170px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .book-box-right {
      position: relative;
      margin-left: 20px;
      flex: 1;

      > div {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .box-right-p1 {
        font-size: 16px;
        height: 50px;
        line-height: 27px;
        color: #333333;
        word-break: break-all;
      }

      .box-right-p2 {
        margin-top: 8px;
        font-size: 12px;
        line-height: 19px;
        color: #999999;
        height: 56px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .box-right-p3 {
        margin-top: 13px;
        font-size: 14px;
        line-height: 14px;
        color: #999999;
        white-space: nowrap;
      }

      .box-right-p4 {
        width: 228px;
        margin-top: 12px;
        font-size: 14px;
        line-height: 14px;
        color: #666666;
        white-space: nowrap;
      }
    }
  }
</style>
