<template>
  <div>
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="发布组织">
        <el-input placeholder="请输入" v-model="orgId" @keyup.enter.native="editBtn(1)" @clear='editBtn(1)' clearable maxlength="100"/>
      </base-label-box>
      <base-label-box label="考试状态">
        <el-select v-model="examStatus" class="wp-100" placeholder="请选择" @change="editBtn(1)">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
      </base-label-box>
      <base-label-box label="考试名称">
        <el-input placeholder="请输入" v-model="examName" @clear='editBtn(1)' @keyup.enter.native="editBtn(1)" clearable maxlength="100"/>
      </base-label-box>
      <base-label-box label="考试时间">
        <el-date-picker style="width:140px" v-model="beginTime" :picker-options="pickerOptionsDisabled('start','endTime')" type="date" placeholder="请选择" value-format="yyyy-MM-dd" @change="editBtn(1)"/>
        <el-date-picker style="width:140px" v-model="endTime" :picker-options="pickerOptionsDisabled('end','beginTime')" type="date" placeholder="请选择" value-format="yyyy-MM-dd" @change="editBtn(1)"/>
      </base-label-box>
      <base-label-box label="">
        <el-checkbox v-model="isCurrent" @change='editBtn(1)'>仅显示需本组织考试</el-checkbox>
      </base-label-box>
    </div>


    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(3)"/>
        <base-page-button title="导出试卷" imgType="export" @click="exportPaper(false)"/>
        <base-page-button title="导出答案" imgType="export" @click="exportPaper(true)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table :data="tableData" tooltip-effect="dark" row-key="fileId" v-loading="loading" ref='table'
                :header-cell-style="{'text-align':'center'}" @selection-change='currChange' :select-on-indeterminate='false'>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" fixed label="序号" width="50px" align="center"/>
        <el-table-column label="考试名称" fixed align="center" width="480px" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.examName | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="考试状态" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span :class="{fcFont:row.examStatus['key'] == '2309718804909785262'}">{{row.examStatus['key'] | showStatus}}</span>
          </template>
        </el-table-column>

        <el-table-column label="需本组织考试" width="130px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <p class='posiRe'>
              {{row.isCurrent=='1'?'是':'否'}}
              <el-tooltip class="item" effect="dark" content="您需至考试详情页选择【发布考试】后，该考试才能生效" placement="bottom">
                <i class="iconfont icon-wenhao" v-if="row.status==1"></i>
              </el-tooltip>
            </p>

          </template>
        </el-table-column>

        <el-table-column label="是否线上考试" width="130px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.isOnline==0?'是':'否'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布组织" width="260px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.orgId.data | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="开始时间" width="170px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.beginTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间" width="170px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.endTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280" align="center" fixed='right' show-overflow-tooltip>
          <template slot-scope="{row}">
            <base-table-a type="detail" @click="editBtn(5, row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(4, row)" :disabled="(row.examStatus['key'] == '2309718804909785270') || (row.examStatus['key'] == '2309718804909785273') || curOrgPerid(row.orgId.key)">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(6, row)" :disabled="(row.examStatus['key'] != '2309718804909785262') || curOrgPerid(row.orgId.key)">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                       @pageChange="getExamByPageFn"/>
    </div>

    <!-- 编辑新增模态 -->
    <exam-add ref="refEdit"  @refresh="editBtn(1)"/>
    <!-- 详情 -->
    <exam-detail ref='refDetail'></exam-detail>
    <exam-report ref="refReport" @cloasLoad='cloasLoad'></exam-report>
  </div>
</template>

<script>
  import ExamAdd from './components/exam-add'
  import commonReq from '@/api/public/commonReq'
  import ExamDetail from './components/exam-detail'
  import ExamReport from './components/exam-report'
  import {
    getExamList,delExam,exportpaper,previewPaper
  } from '@/api/backstage/education/exam'

  export default {
    components: {ExamAdd,ExamDetail,ExamReport},
    data () {
      return {
        orgId: '',
        examStatus: '',
        examName: '',
        beginTime:'',
        endTime:'',
        isCurrent:false,
        statusList:[
        ],
        // 列表数据
        tableData: [
        ],
        loading: false,
        total: 4,
        pageNum: 1,
        pageSize: 10,
        selectRow:null
      }
    },
    created () {
      this.getCondition();
      this.getExamByPageFn()
    },
    methods: {
      editBtn (t, row) {

        switch (t) {
          // 条件查询
          case 1:
            this.pageNum = 1
            this.getExamByPageFn()
            break

          // 重置
          case 2:
            this.getExamByPageFn(true)
            break

          // 3新增 4编辑
          case 3:
          case 4:
            this.$refs['refEdit'].show(t === 3, row)
            break

          // 5详情
          case 5:
            let flag = false
            if(row.isOnline == '1' && row.examStatus.key=='2309718804909785273'){
              flag= true
            } else {
              flag = false
            }
            this.$refs['refDetail'].show(row.id,flag)
            break

          // 删除
          case 6:
            this.$confirm('是否删除此次考试？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              delExam({id: row.id}).then(response => {
                this.$message(this.successTip())
                this.editBtn(1)
              })
            }).catch(() => {
            })
            break
        }
      },
      currChange(sele){
        if(sele.length && sele.length > 1){
          let index = this.tableData.indexOf(sele[sele.length-1])
          this.$refs['table'].clearSelection();
          this.$refs['table'].toggleRowSelection(this.tableData[index],true)
          this.selectRow = this.tableData[index]
        } else if(sele.length == 1){
          this.selectRow = sele[0]
        } else {
          this.selectRow = null
        }
      },
      cloasLoad(){
        this.loading = false
      },
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['exam_status']}).then(res => {
          this.statusList = res.exam_status
        })
      },
      //获取考试列表
      getExamByPageFn (refresh) {
        if (refresh === true) {
          this.orgId = ''
          this.examStatus = ''
          this.examName = ''
          this.beginTime = ''
          this.endTime = ''
          this.isCurrent = false
          this.pageNum = 1
        }

        this.loading = true
        getExamList({
          model:{
            orgId: {data:this.orgId},
            examStatus: {key:this.examStatus},
            examName: this.examName,
            beginDate: this.beginTime,
            endDate: this.endTime,
            isCurrent:this.isCurrent?1:0,
          },

          current: this.pageNum,
          size: this.pageSize
        }).then(res => {
          this.tableData = res.records
          this.total = res.total
        }).finally(() => {
          this.loading = false
        })
      },
      pickerOptionsDisabled (type, name) {
        return {
          disabledDate: (time) => {
            if (type === 'start') {
              if (this[name]) {
                return time.getTime() > new Date(this[name]).getTime()
              }
            } else {
              if (this[name]) {
                return time.getTime() < new Date(this[name]).getTime() - 86400000
              }
            }
          }
        }
      },
      exportPaper(flag){
        if(this.selectRow){
          let para = {
            beginTime:this.selectRow.beginTime,
            endTime:this.selectRow.endTime,
            examName:this.selectRow.examName,
            questIds:this.selectRow.questIds,
            questScores:this.selectRow.questScores,
            examId:this.selectRow.id
          }
          this.loading = true
          this.$refs['refReport'].show(para,flag)
        } else {
          this.$message.error('请先选择要导出的数据')
        }
      }
    },
    filters:{
      showStatus:function(status){
        if(status == '2309718804909785262'){
          return '未发布'
        } else if(status == '2309718804909785265'){
          return '待考试'
        } else if(status == '2309718804909785270'){
          return '考试中'
        } else {
          return '已结束'
        }
      }
    }
  }
</script>

<style scoped lang='scss'>
/deep/.el-checkbox__label{
  color:#888;
}
.fcFont{
  color:#FC7121;
}
.posiRe{
  position: relative;
  margin: 0;
  .item{
    margin-left:6px;
    position: absolute;
  }
}
</style>
