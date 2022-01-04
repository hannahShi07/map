<template>
  <div>
    <div class="logo-top">
      <div class="logotxt">
        <img src="@/assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div>
        <base-label-box label="选择党组织" style="margin-bottom: 0;">
          <el-select v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px">
            <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.code"/>
          </el-select>
        </base-label-box>
        <!-- 选择年份 -->
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="yearEdit(1)"/>
          <el-date-picker
            v-model="year"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="pageChange"
            :picker-options="pickerOptions"
            :clearable="false">
          </el-date-picker>
          <div class="year-text">年</div>
          <i class="iconfont icon-xingzhuang1357 gt" @click="yearEdit(2)"/>
        </div>
      </div>
    </div>

    <div class="view">
      <div class="title">参与人数</div>
      <span style="position: absolute;right: 30px;bottom: 50px;font-size: 12px;color: #666666;">时间</span>

      <div id="readNum" style="width:100%;height:400px;"/>
    </div>

    <div class="pd-20 mt-20">
      <el-table border :data="tableData" header-row-class-name="page-table-header" @row-click='clickRow' :highlight-current-row='true' v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>

        <el-table-column label="考试名称" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.examName | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布组织" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{(row.orgId && row.orgId.data) | tableEmptyText}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.beginTime | tableEmptyText}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="180px" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <span>{{row.endTime | tableEmptyText}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                       @pageChange="getExamInfo"/>
    </div>
     <exam-result ref="refResult" :id='eid'></exam-result>
    <!-- 学习结果 -->
    <!-- <special-study-dialog ref="refStudy"/> -->
  </div>
</template>

<script>
  // import SpecialStudyDialog from './special-study-dialog'
  import ExamResult from '@/views/backstage/education/exam/components/exam-result'
  import commonReq from '@/api/public/commonReq'
  import {
    examInfo
  } from '@/api/backstage/education/exam'


  const echarts = require('echarts/lib/echarts')

  export default {
    components: {ExamResult},
    data () {
      return {
        loading: false,//加载遮罩控制条件
        list: [],//党组织下拉框
        orgName: '',//组织名称
        orgCode: '',//组织编码
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        divide: 0,//可使用金额与本年度党费使用占比
        totalAmount: 0,//本年度使用
        balance: 0,//本年度结余
        year: '',
        tableData: [],//列表数据
        pickerOptions: {
          disabledDate (time) {
            if (new Date().getFullYear() + 1 <= time.getFullYear()) {
              return true
            }
            return false
          }
        },
        eid:'',//考试id
        // 别打扰echarts柱形图
        chart: null,
        chartColorList: ['#FAC14E', '#FAB84E', '#FAAD4E', '#FAA14E', '#FA994E', '#FA904E', '#FA874E', '#FA7F4E', '#FA764E', '#FA6E4E', '#FA654E', '#FA5C4E']
      }
    },
    mounted () {
      this.year = new Date().getFullYear() + ''
      commonReq.getOrglist().then(res => {
        this.list = res
        this.orgCode = res[0].code
        this.orgName = res[0].name

        this.pageChange()
        // this.getExamInfo()
      })

      this.chart = echarts.init(document.querySelector('#readNum'))

      window.addEventListener('resize', this.chartResize)
    },
    destroyed () {
      this.chart && this.chart.dispose()
      window.removeEventListener('resize', this.chartResize)
    },
    methods: {
      clickRow(sele){
        // console.log(sele)
        this.eid = sele.examId
        let type = 'org'
        if(sele.examScope == '0'){
          type = 'org'
        } else {
          type = 'person'
        }
        this.$refs['refResult'].show(sele.examId,type,sele.examName,sele.orgId['data'])
      },
      chartResize () {
        this.chart && this.chart.resize()
      },
      chartInit (data) {
        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '2%',
            right: '3%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            },
            offset: 5,
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#999999'
              }
            },
            axisTick: {
              inside: true
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              },
              show: true
            },
            minInterval: 1
          },
          series: [
            {
              name: '参与人数',
              type: 'bar',
              barWidth: '30px',
              data: data.map(item => item.examCnt),
              itemStyle: {
                normal: {
                  color: (params) => this.chartColorList[params.dataIndex]
                }
              }
            }
          ]
        })
        this.chart.hideLoading()
      },
      // 调用数据接口
      pageChange () {
        this.getExamInfo()
      },
      // 获取表格数据
      getExamInfo () {
        this.loading = true
        this.chart.showLoading()
        examInfo({
          model: {
            examYear: this.year,
            orgCode: this.orgCode
          },
          current: this.pageNum,
          size: this.pageSize
        }).then(res => {
          this.tableData = res.examReceptionPage.records
          this.total = res.examReceptionPage.total
          this.$nextTick(() => {
            this.chartInit(res.cntVOS)
          })
        }).finally(() => {
          this.loading = false
        })
      },
      //选择党组织
      selectChange (value) {
        if (value) {
          this.list.forEach(item => {
            if (item.code === value) {
              this.orgName = item.name
              this.orgCode = item.code
            }
          })
        }
        this.pageChange()
      },
      yearEdit (t) {
        if (t === 1) {
          this.year = parseInt(this.year) - 1 + ''
        } else {
          this.year = parseInt(this.year) + 1 + ''
        }
        this.pageChange()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logotxt {
    display: flex;
    align-items: center;
    line-height: 36px;
    font-size: 16px;
    color: #7D7D7D;
  }

  .logotxt img {
    width: 21px;
    height: 17px;
    margin-right: 8px;
  }
  .el-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .title {
    display: block;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #646464;
  }

  .year {
    width: 100px;
    float: right;
    background-color: #fff;
  }

  .lt, .gt {
    height: 36px;
    width: 15px;
    padding: 10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
  }

  .year > > > .el-input__inner {
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    width: 38px;
    display: inline-block;
    font-size: 16px;
  }

  .year > > > .el-icon-date::before {
    content: "";
  }

  .year > > > .el-date-editor--year {
    width: 38px;
    float: left;
    margin-left: 7px;
  }

  .year-text {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
    cursor: pointer;
  }

  .view {
    position: relative;
    margin-top: 20px;
    background: #fff;
    padding: 24px;

    .title {
      font-size: 20px;
      color: #333333;
    }
  }
</style>
