<template>
  <div style="background: #EFEFEF; padding-bottom: 2px;">
    <div style="background: #fff;">
      <!-- 条件盒子 -->
      <div class="page-search-box" style="padding-top: 0;">
        <base-label-box label="发布组织">
          <el-input placeholder="请输入" v-model="orgName" @keyup.enter.native="editBtn(1)" clearable maxlength="100"/>
        </base-label-box>
        <base-label-box label="标题">
          <el-input placeholder="请输入" v-model="title" @keyup.enter.native="editBtn(1)" clearable maxlength="100"/>
        </base-label-box>
        <base-label-box label="发布日期">
          <el-date-picker v-model="date" type="date" placeholder="请选择" value-format="yyyy-MM-dd" @change="editBtn(1)"/>
        </base-label-box>
      </div>

      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(3)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
        </div>
      </div>
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
            <div class="box-right-p3">{{item.publishTime}}</div>
            <div class="box-right-p4">{{item.orgName}}</div>

            <div class="box-right-edit" v-if="!curOrgPerid(item.orgId)">
              <div class="right-edit-wrap" @click="editBtn(4, item)">
                <img src="@/assets/page/icon-edit.png" alt="">
              </div>
              <div class="right-edit-wrap" @click="editBtn(6, item)">
                <img src="@/assets/page/icon-delete.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空数据样式 -->
    <base-table-empty v-if="!tableData.length && !loading"/>

    <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" style="text-align: center"
                     @pageChange="getEducationDataByPageFn" :layout="'prev, pager, next, jumper, total'"/>

    <!-- 编辑新增模态 -->
    <book-edit-dialog ref="refEdit" @refresh="editBtn(1)"/>
  </div>
</template>

<script>
  import BookEditDialog from './book-edit-dialog'
  import {
    getEducationDataByPage,
    delEducationData,
    addEducationDataSum
  } from '@/api/backstage/education/data'

  export default {
    components: {BookEditDialog},
    data () {
      return {
        orgName: '',
        title: '',
        date: '',
        // 列表数据
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

          // 重置
          case 2:
            this.getEducationDataByPageFn(true)
            break

          // 3新增 4编辑
          case 3:
          case 4:
            this.$refs['refEdit'].show(t === 3, row)
            break

          // 详情
          case 5:
            // 增加点击量
            addEducationDataSum({id: row.fileId})
            window.open(row.url)
            break

          // 删除
          case 6:
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              delEducationData({id: row.fileId}).then(response => {
                this.$message(this.successTip())
                this.editBtn(1)
              })
            }).catch(() => {
            })
            break
        }
      },
      getEducationDataByPageFn (refresh) {
        if (refresh === true) {
          this.title = ''
          this.orgName = ''
          this.date = ''
          this.pageNum = 1
        }

        this.loading = true
        getEducationDataByPage({
          fileType: '1295281197470973952',
          fileTitle: this.title,
          orgName: this.orgName,
          startTime: this.date,
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
  @media all and(min-width: 1881px) {
    .book-box {
      max-width: calc(24.9% - 10px);

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  @media all and(max-width: 1880px) {
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
    margin-top: 5px;
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
        width: 170px;
        height: 50px;
        line-height: 27px;
        color: #333333;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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

  .box-right-edit {
    position: absolute;
    right: -16px;
    top: -16px;
    border-bottom: 1px solid #E8E8E8;
    border-left: 1px solid #E8E8E8;
    border-bottom-left-radius: 4px;

    .right-edit-wrap {
      display: inline-block;
      padding: 9px 8px 6px 8px;
      cursor: pointer;

      &:not(:first-child) {
        border-left: 1px solid #E8E8E8;
      }

      img {
        height: 16px;
        width: 16px;
      }
    }
  }
</style>
