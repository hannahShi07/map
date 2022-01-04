<!--当涂党建联盟-党建联盟-->
<template>
  <com-background-box :index="1">
    <!--页面内容-->
    <div class="party-box">
      <div class="party-top">
        <div class="party-top-left">
          <div class="party-top-left-title">
            <img src="@/assets/image/partyalliance/icon-title-1.png">
            <span>联盟问题明细</span>
          </div>
          <div class="party-top-left-table" v-cloak>
            <el-table
              v-loading="loading"
              ref="table1"
              :data="tableData1"
              class="table"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','background':'rgba(0, 43, 91, 0.65)','color':'#6CABF1','font-weight':'400'}"
            >
              <el-table-column label="序号" min-width="60" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="提出人" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData1[scope.$index],'userName')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="提出人时间" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData1[scope.$index],'createTime')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="问题类型" align="center">
                <template slot-scope="scope">
<!--                  <span>{{isEmpty(tableData1[scope.$index],'-')}}</span>-->
                  <span>--</span>
                </template>
              </el-table-column>
              <el-table-column label="问题描述" min-width="120" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData1[scope.$index],'content')}}</span>
                </template>
              </el-table-column>
              <el-table-column label="解决手段" min-width="120" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData1[scope.$index],'replyContent')}}</span>
                </template>
              </el-table-column>

              <!-- 空数据样式 -->
              <base-dp-table-empty slot="empty"/>
            </el-table>
          </div>
        </div>
        <div class="party-top-right">
          <div class="party-top-right-title">
            <img src="@/assets/image/partyalliance/icon-title-3.png">
            <span>当涂经济开发区点对点智库的名单</span>
          </div>
          <div class="party-top-right-table" v-cloak>
            <el-table
              v-loading="loading"
              :data="tableData2"
              class="table"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','background':'rgba(0, 43, 91, 0.65)','color':'#6CABF1','font-weight':'400'}"
            >
              <el-table-column label="序号" min-width="60" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData2[scope.$index],'name')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="所在单位" min-width="140" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData2[scope.$index],'company')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="职务" min-width="100" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData2[scope.$index],'post')}}</span>
                </template>
              </el-table-column>
              <el-table-column label="人才类型" min-width="140" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData2[scope.$index],'talentType')}}</span>
                </template>
              </el-table-column>

              <!-- 空数据样式 -->
              <base-dp-table-empty slot="empty"/>
            </el-table>
          </div>

        </div>

      </div>
      <div class="party-bottom">
        <div class="party-bottom-left">
          <div class="party-bottom-left-title">
            <img src="@/assets/image/partyalliance/icon-title-2.png">
            <span>职能部门服务企业工作清单</span>
          </div>
          <div class="party-bottom-left-table" v-cloak>
            <el-table
              v-loading="loading"
              :data="tableData3"
              class="table"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','background':'rgba(0, 43, 91, 0.65)','color':'#6CABF1','font-weight':'400'}"
            >
              <el-table-column label="序号" min-width="60" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位"  align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData3[scope.$index],'orgName')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="服务职能" min-width="200" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData3[scope.$index],'serviceFunction')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="类型" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData3[scope.$index],'type.data')}}</span>
                </template>
              </el-table-column>

              <!-- 空数据样式 -->
              <base-dp-table-empty slot="empty"/>
            </el-table>
          </div>
        </div>
        <div class="party-bottom-right">
          <div class="party-bottom-right-title">
            <img src="@/assets/image/partyalliance/icon-title-4.png">
            <span>产业链集群活动清单</span>
          </div>
          <div class="party-bottom-right-table" v-cloak>
            <el-table
              v-loading="loading"
              :data="tableData4"
              class="table"
              style="width: 100%;"
              :header-cell-style="{'text-align':'center','background':'rgba(0, 43, 91, 0.65)','color':'#6CABF1','font-weight':'400'}"
            >
              <el-table-column label="序号" min-width="60" align="center">
                <template slot-scope="scope">
                  <span>{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="月份" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData4[scope.$index],'month')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="活动内容" min-width="180" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData4[scope.$index],'content')}}</span>
                </template>
              </el-table-column>

              <el-table-column label="承办主体" min-width="100" align="center">
                <template slot-scope="scope">
                  <span>{{isEmpty(tableData4[scope.$index],'undertaker')}}</span>
                </template>
              </el-table-column>

              <!-- 空数据样式 -->
              <base-dp-table-empty slot="empty"/>
            </el-table>

          </div>
        </div>
      </div>

    </div>
  </com-background-box>
</template>

<script>
import ComBackgroundBox from '@/components/com-background-box'
import {issueList,thinkTank,serviceWork,industryActivities} from '@/api/screen/partyalliance.js'
export default {
  name: "partyalliance",
  components: {
    ComBackgroundBox
  },
  data() {
    return {
      loading:false,
      total1:0,
      pageNum1:1,
      pageSize1:10,
      tableData1:[],
      tableData2:[],
      tableData3:[],
      tableData4:[],
      dom:'',
      hasNext:true


    }
  },
  mounted(){
    this.pageNum1=1
    this.getissueList()
    this.getthinkTank()
    this.getserviceWork()
    this.getindustryActivities()

    // 获取需要绑定的table
    this.dom = this.$refs.table1.bodyWrapper
    this.dom.addEventListener('scroll', () => {
      // 滚动距离
      let scrollTop = this.dom.scrollTop
      // 变量windowHeight是可视区的高度
      let windowHeight = this.dom.clientHeight || this.dom.clientHeight
      // 变量scrollHeight是滚动条的总高度
      let scrollHeight = this.dom.scrollHeight || this.dom.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        // 获取到的不是全部数据 当滚动到底部 继续获取新的数据
        if (this.hasNext) {
          this.getMoreLog(scrollTop)
          this.pageNum1++
          this.getissueList()
        }
      }
    })

  },
  methods:{
    // 获取到新的数据后，调整滚动条的位置
    getMoreLog(scrollTop){
      scrollTop = scrollTop - 400
    },
    // 获取联盟问题明细
    getissueList(){
      let params = {
        current: this.pageNum1,
        model: {
          userName: "",
          contact: "",
          processingState: {
            data:"",
            key: ""
          }
        },
        size: this.pageSize1
      }
      this.loading = true;
      issueList(params).then(response => {
        this.total1=this.total
        if(this.pageNum1==1) {
          this.tableData1 = []
        }
        this.tableData1 = this.tableData1.concat(response.records)
        this.tableData1.forEach((item,index)=>{
          item.createTime=item.createTime.substring(0,10)
        })
        this.hasNext = true
        if(this.pageNum1*this.pageSize1 >= response.total) {
          this.hasNext = false
        }

        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    // 获取点对点智库数据
    getthinkTank(){
      let params = {

      }
      this.loading = true;
      thinkTank(params).then(response => {
        this.tableData2 = response;
        this.loading = false;
      }).finally(() => {
        this.loading = false;

      });
    },
    // 服务企业工作清单
    getserviceWork(){
      let params = {

      }
      this.loading = true;
      serviceWork(params).then(response => {
        this.tableData3 = response;
        this.loading = false;
      }).finally(() => {
        this.loading = false;

      });
    },
    // 产业链集群活动清单
    getindustryActivities(){
      let params = {

      }
      this.loading = true;
      industryActivities(params).then(response => {
        this.tableData4 = response;
        this.loading = false;
      }).finally(() => {
        this.loading = false;

      });
    }

  }
}
</script>

<style lang="scss" scoped>
.party-top{
  display:flex;
  justify-content: space-between;
  margin-bottom:2.78vh;

}
.party-top-left{
  width:47.13vw;
  height:49.07vh;
  background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
}
.party-top-left-title{
  width:100%;
  height:5.92vh;
  background:url('../assets/image/partyalliance/icon-bg-1.png') no-repeat;
  background-size:23.125vw 100%;
  font-size: 0.9375vw;
  color: #FFFFFF;
  padding-left:1.16vw;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.party-top-left-title img{
  width:1.05vw;
  height:1.05vw;
  margin-right:0.57vw;
}
.party-top-left-table{
  padding:1.62vh 1.04vw 2.32vh 1.04vw;
}

.party-top-right{
  width:47.13vw;
  height:49.07vh;
  background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
}

.party-top-right-title{
  width:100%;
  height:5.92vh;
  background:url('../assets/image/partyalliance/icon-bg-1.png') no-repeat;
  background-size:23.125vw 100%;
  font-size: 0.9375vw;
  color: #FFFFFF;
  padding-left:1.16vw;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.party-top-right-title img{
  width:1.05vw;
  height:1.05vw;
  margin-right:0.57vw;
}
.party-top-right-table{
  padding:1.62vh 1.04vw 2.32vh 1.04vw;
}

.party-bottom{
  display:flex;
  justify-content: space-between;
}
.party-bottom-left{
  width: 47.13vw;
  height: 33.33vh;
  background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
}
.party-bottom-left-title{
  width:100%;
  height:5.92vh;
  background:url('../assets/image/partyalliance/icon-bg-2.png') no-repeat;
  background-size:23.125vw 100%;
  font-size: 0.9375vw;
  color: #FFFFFF;
  padding-left:1.16vw;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.party-bottom-left-title img{
  width:1.05vw;
  height:1.05vw;
  margin-right:0.57vw;
}
.party-bottom-left-table{
  padding:1.62vh 1.04vw 2.32vh 1.04vw;
}


.party-bottom-right{
  width: 47.13vw;
  height: 33.33vh;
  background: linear-gradient(180deg, rgba(0, 132, 255, 0.4), rgba(0, 132, 255, 0.08));
}
.party-bottom-right-title{
  width:100%;
  height:5.92vh;
  background:url('../assets/image/partyalliance/icon-bg-2.png') no-repeat;
  background-size:23.125vw 100%;
  font-size: 0.9375vw;
  color: #FFFFFF;
  padding-left:1.16vw;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.party-bottom-right-title img{
  width:1.05vw;
  height:1.05vw;
  margin-right:0.57vw;
}
.party-bottom-right-table{
  padding:1.62vh 1.04vw 2.32vh 1.04vw;
}


/*图表样式*/
::v-deep .el-table{
  background:rgba(0,0,0,0);
  border: 0;
}
::v-deep .el-loading-mask{
  background:rgba(0,0,0,0);
}
::v-deep .el-table tr{
  background:none;
}
::v-deep .el-table tr th{
  padding:1.0vh 0;
  border-bottom: 0;
  word-break: break-all;
  font-size: 0.78vw;
  font-weight: 400;
  color: #00BAFF;
}
.party-bottom-left-table ::v-deep .el-table tr td{
  background:rgba(0, 34, 72, 0.35);
}
.party-bottom-right-table ::v-deep .el-table tr td{
  background:rgba(0, 34, 72, 0.35);

}

::v-deep .el-table tr td{
  border-bottom:0;
  color: #FFFFFF;
  font-size:0.78vw;
  opacity: 0.8;
  padding:1.15vh 0;
}
::v-deep .el-table .el-table__header-wrapper th{
  height:auto;
}
::v-deep .el-table .cell{
  white-space: pre-wrap;
  word-break: break-all;

}
::v-deep .el-table tr th .cell{
  line-height:1.5;
}
::v-deep .el-table tr td .cell{
  line-height:1.5;
}
::v-deep .el-table tr{
  border-bottom:none;
}
::v-deep .el-table td{
  border-bottom:none;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover td {
  background-color: rgba(0, 132, 255, 0.4);
}
::v-deep .el-table::before{
  height:0;
}
.party-top-left-table ::v-deep .el-table .el-table__body-wrapper{
  height: 33.5vh;
  overflow-y:auto;
}
.party-top-right-table ::v-deep .el-table .el-table__body-wrapper{
  height: 33.5vh;
  overflow-y:auto;
}
.party-bottom-left-table ::v-deep .el-table .el-table__body-wrapper{
  height: 18vh;
  overflow-y:auto;
}
.party-bottom-right-table ::v-deep .el-table .el-table__body-wrapper{
  height: 18vh;
  overflow-y:auto;
}
/* 设置滚动条的样式 */
::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar {
  width:0.42vw;
  border:none;
}
/* 滚动槽 */
::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar-track {
  width: 0.42vw;
  height: 45.74vh;
  background: rgba(68, 123, 187, 0.34);
  border-radius: 0.21vw;
  border:none;
}
/* 滚动条滑块 */
::v-deep .el-table .el-table__body-wrapper::-webkit-scrollbar-thumb {
  width: 0.42vw;
  background: rgba(145, 177, 215, 0.34);
  border-radius: 0.42vw;
  border:none;
}
</style>
