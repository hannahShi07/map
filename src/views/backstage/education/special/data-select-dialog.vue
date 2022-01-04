<template>
  <el-dialog
    title="学习资料选择"
    :visible.sync="visible"
    width="1130px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    append-to-body
  >
    <el-row class="row-big-row">
      <el-col :span="12" style="height: 600px; overflow: auto;padding-bottom: 2px;">
        <div style="border-bottom: 1px solid #EEEEEE;">
          <base-label-box label="待选资料">
            <el-input placeholder="请输入" style="width: 310px;" v-model="keyValue" @keyup.enter.native="editBtn(2)"
                      clearable maxlength="100"/>
          </base-label-box>
          <el-button @click="editBtn(2)" type="primary" size="medium" icon="el-icon-search">
            查询
          </el-button>
        </div>

        <el-tabs v-model="leftActive" @tab-click="tabChange">
          <el-tab-pane label="书籍" name="1295281197470973952"/>
          <el-tab-pane label="视频" name="video"/>
          <el-tab-pane label="音频" name="voice"/>
          <el-tab-pane label="其他" name="1295281394175442944"/>
        </el-tabs>

        <div style="margin-right: 10px;">
          <template v-if="leftData.length">
            <el-checkbox style="display: block;padding: 15px 0 15px 20px;background: #F3F3F3;" v-model="checkAll"
                         @change="handleCheckAllChange">
              <span style="padding-left: 10px;">全选</span>
            </el-checkbox>

            <el-checkbox-group v-model="selectedIds" style="padding-left: 20px;">
              <el-checkbox style="display: block;padding: 15px 0; border-bottom: 1px solid #E8E8E8;"
                           v-for="item in leftData" :label="item.fileId" @change="handleCheckChange($event, item)">
                <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding-left: 10px;">{{item.fileTitle}}</span>
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <base-table-empty v-else/>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                           layout="prev, pager, next, jumper, total"
                           @pageChange="getEducationDataByPageFn"/>
        </div>
      </el-col>

      <el-col :span="12" style="height: 600px; overflow: auto;padding-left: 25px;">
        <div style="color: #333333;font-size: 16px;font-weight: bold;">
          已选资料 <span style="color: #FC8F21;">{{rightData.length}}</span> 个
        </div>

        <base-table-empty style="height: 500px" v-if="!rightData.length"/>

        <div v-else style="height: 560px; overflow: auto;margin-top: 20px;">
          <div class="right-list" v-for="(item, index) in rightData" :key="item.fileId">
            <el-switch :width="60" v-model="item.requiredRead" inactive-text="选学" active-text="必学"/>

            <span class="right-list-p2">【{{typeNameFn(item)}}】</span>

            <span class="right-list-p3" :title="item.fileTitle">
              {{item.fileTitle}}
            </span>

            <span class="right-list-p4" @click="delRight(index, item)">
              <img src="@/assets/page/icon-close2.png" alt="">
            </span>
          </div>
        </div>
      </el-col>
    </el-row>

    <div slot="footer" style="text-align: center">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="editBtn(1)">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getEducationDataByPage} from '@/api/backstage/education/data'

  export default {
    data () {
      return {
        visible: false,
        keyValue: '',
        leftActive: '0',
        tableLoading: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,

        leftData: [],
        rightData: [],
        selectedIds: [],
        checkAll: false
      }
    },
    watch: {
      selectedIds (nVal) {
        if (nVal.length >= this.leftData.length) {
          this.checkAll = this.leftData.map(item => item.fileId).every(item => nVal.includes(item))
        } else {
          this.checkAll = false
        }
      }
    },
    methods: {
      // 去重
      uniqueArrObject (arr = []) {
        let result = []
        let obj = {}
        arr.forEach(item => {
          if (!obj[item.fileId]) {
            result.push(item)
            obj[item.fileId] = true
          }
        })
        return Array.from(result)
      },
      handleCheckAllChange (val) {
        if (val) {
          this.selectedIds.push(...this.leftData.map(item2 => item2.fileId))
          this.selectedIds = Array.from(new Set(this.selectedIds))

          this.rightData.push(...this.leftData.map(item => item))
          this.rightData = this.uniqueArrObject(this.rightData)
        } else {
          this.selectedIds = this.selectedIds.filter(item => !this.leftData.map(item2 => item2.fileId).includes(item))

          this.rightData = this.rightData.filter(item => !this.leftData.map(item2 => item2.fileId).includes(item.fileId))
        }
      },
      handleCheckChange (val, row) {
        let rightIndex = this.rightData.findIndex(item => row.fileId === item.fileId)
        if (val) {
          if (rightIndex === -1) {
            this.rightData.push({...this.leftData.find(item => item.fileId === row.fileId), requiredRead: false})
          }
        } else {
          if (rightIndex !== -1) {
            this.rightData.splice(rightIndex, 1)
          }
        }
      },
      show (data) {
        this.visible = true
        this.leftActive = '1295281197470973952'
        this.pageNum = 1
        this.rightData = Array.from(data)
        this.selectedIds = data.map(item => item.fileId)
        this.getEducationDataByPageFn()
      },
      editBtn (t) {
        switch (t) {
          // 确定
          case 1:
            this.$emit('event', Array.from(this.rightData))
            this.visible = false
            break

          // 查询
          case 2:
            this.pageNum = 1
            this.getEducationDataByPageFn()
            break
        }
      },
      // 右侧删除事件
      delRight (index, row) {
        this.rightData.splice(index, 1)
        this.selectedIds.splice(this.selectedIds.findIndex(item => item === row.fileId), 1)
      },
      // table事件
      tabChange () {
        this.pageNum = 1
        this.getEducationDataByPageFn()
      },
      getEducationDataByPageFn () {
        let addType = ''
        let fileType = ''
        this.leftActive === 'video' && (addType = '2297065814069249126')
        this.leftActive === 'voice' && (addType = '2297065814069250336')

        if (this.leftActive === 'video' || this.leftActive === 'voice') {
          fileType = '1295281048032116736'
        } else {
          fileType = this.leftActive
        }

        this.tableLoading = true
        getEducationDataByPage({
          fileType,
          addType,
          fileTitle: this.keyValue,
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        }).then(res => {
          this.leftData = res.records
          this.total = res.total

          this.$nextTick(() => {
            if (this.selectedIds.length >= this.leftData.length) {
              this.checkAll = this.leftData.map(item => item.fileId).every(item => this.selectedIds.includes(item))
            } else {
              this.checkAll = false
            }
          })
        }).finally(() => {
          this.tableLoading = false
        })
      },
      // 类型名
      typeNameFn (row) {
        let text = '其他'
        switch (row.fileType) {
          // 书籍
          case '1295281197470973952':
            text = '书籍'
            break

          // 其他资料
          case '1295281394175442944':
            text = '其他'
            break

          // 音频视频
          case '1295281048032116736':
            row.addType === '2297065814069249126' ? text = '视频' : text = '音频'
            break
        }
        return text
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row-big-row {
    position: relative;
    height: 100%;

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      margin-left: 0;
      width: 10px;
      height: 100%;
      background: #F3F3F3;
    }
  }

  .right-list {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    overflow: hidden;

    &:hover {
      border-radius: 21px;
      background: #F6F6F6;
    }

    .right-list-p2 {
      font-size: 14px;
      color: #666666;
    }

    .right-list-p3 {
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right-list-p4 {
      width: 19px;
      height: 19px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right-list /deep/ {
    font-size: 12px !important;

    .el-switch__label * {
      font-size: 12px;
    }

    .el-switch__label--left {
      position: absolute;
      left: 25px;
      color: #fff;
      z-index: -1111;
    }

    .el-switch__label--right {
      position: absolute;
      right: 25px;
      color: #fff;
      z-index: -1111;
    }

    .el-switch__label--right.is-active {
      z-index: 1111;
      white-space: nowrap;
      color: #fff !important;
    }

    .el-switch__label--left.is-active {
      z-index: 1111;
      white-space: nowrap;
      color: #9c9c9c !important;
    }
  }
</style>
