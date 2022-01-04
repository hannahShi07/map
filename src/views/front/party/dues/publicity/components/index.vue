<template>
  <div class="publicity" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable placeholder="请输入或选择" v-model='orgCode' value-key="id" style="width: 360px" clearable @change="selectChange" >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </base-label-box>
      </div>
    </div>
    <div class="line"></div>
    <!-- 选择年份 -->
    <div class="year">
      <i class="iconfont icon-xingzhuang1357kaobei lt" @click="reduceYear"></i>
      <el-date-picker
        v-model="noticeDate"
        :editable="false"
        type="year"
        format="yyyy"
        value-format="yyyy"
        @change="getList()"
        :picker-options="pickerOptions"
        :clearable="false">
      </el-date-picker>
      <div class="year-text">年</div>
      <i class="iconfont icon-xingzhuang1357 gt" @click="addYear"></i>
    </div>
    <!-- 图表 -->
    <div id="chart" class="chart" ref="chart" style="width:100%">
      <div class="year"></div>
    </div>
    <div class="teble-line"></div>
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData" @row-click="publicityInfo" :header-cell-style="{'text-align':'center'}"  header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="上传组织" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="公示时间" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'noticeDate')+'年'+isEmpty(tableData[scope.$index],'noticeQuarter.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="上传日期" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'submitTime')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <publicity-info ref="refInit"></publicity-info>
  </div>
</template>

<script>
const echarts = require('echarts');
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import PublicityInfo from './publicity-info'
import {getDuesNotice, getPublicityList} from "@/api/front/party/dues/publicity/publicity.js"
export default {
  name: "index",
  components: {PublicityInfo},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:20,
      orgName:'',//组织名称
      orgCode:'',//组织编号
      noticeDate:'',//公示年份
      list:[],
      tableData:[{
				createTime: "",//创建时间
				createUser: 0,//	创建人ID
				id: 0,//	主键
				list: [//公示党员信息
					{
						createTime: "",//	创建时间
						createUser: 0,//创建人ID
						dues: 0,//党费金额
						duesNoticeId: 0,//公示id
						id: 0,//主键
						memberId: {//党员id
							data: "",
							key: 0
						},
						updateTime: "",//	最后修改时间
						updateUser: 0//	最后修改人ID
					}
				],
				noticeDate: "",//	公示日期
				noticeQuarter: {//	公示季度
					data: "",
					key: 0
				},
				noticeRate: "",//	公示率
				orgId: {//组织id
					data: "",
					key: 0
				},
				submitTime: "",//	提交时间
				title: "",//	标题
				updateTime: "",//最后修改时间
				updateUser: 0//	最后修改人ID
			}],
      loading:true,
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted(){
    this.noticeDate=new Date().getFullYear()-1+"";
    // this.getUser();
    this.getOrg();
    this.resizefun = () => {
      this.$echarts.init(document.getElementById("chart")).resize();
    };
    window.addEventListener("resize", this.resizefun);
  },
  activated() {
    this.resizefun = () => {
      this.$echarts.init(document.getElementById("chart")).resize();
    };
    window.addEventListener("resize", this.resizefun);
  },
  //移除事件监听，避免内存泄漏
  deactivated() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizefun);
    this.resizefun = null;
  },
  methods: {
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.orgName=res.data.orgName;
        this.orgCode=res.data.orgCode;
        // this.getStatistics();
        this.pageChange ();

      })
    },
    //选择党组织
    getOrg(){
      let params={

      }
      commonReq.getOrglist(params).then(response => {
        const res = response;
        if(res && res.length <= 0){
          this.list = []
          this.orgCode = ""
        }else{
          this.list=res;
          this.getUser();
        }
      })
    },
    //选择党组织
    selectChange(value){
      if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
        for(var i=0;i<this.list.length;i++){
          if(value==this.list[i].code){
            this.orgName=this.list[i].name;
          }
        }
        this.pageChange();
      }
    },
    // 获取柱状图信息
    getCharts() {
      let params = {
        "noticeDate":this.noticeDate,
        "orgCode": this.orgCode
      }
      getDuesNotice(params).then(response => {
        this.initCharts(response)
      }).finally(() => {

      });
    },
    // 图表
    initCharts (data) {
      let myChart = echarts.init(this.$refs.chart);
      let arry = [['amount', 'product']];
      // 设置柱状图数据
      for(let i=0;i<4;i++){
        if(data[i]){
          arry[i+1]=[data[i].noticeRate, data[i].noticeQuarter.data]
        }else{
          switch (i){
            case 0:
              arry[1]=['0', "第一季度"]
              break;
            case 1:
              arry[2]=['0', "第二季度"]
              break;
            case 2:
              arry[3]=['0', "第三季度"]
              break;
            case 3:
              arry[4]=['0', "第四季度"]
              break;
          }
        }
      }
      // 绘制图表
      myChart.setOption({
        dataset: {
          source: arry
        },
        grid: {
          containLabel: true,
          left:47,
          right:80
        },
        xAxis: {
          name: '完成率',
          type: 'value',
          min: 0,
          max: 100,
          interval: 5,
          axisLabel: {
            formatter: '{value} %',
            lineStyle: {
              show:false
            },
          },
          axisTick:{
            show:false,
          },
          splitLine: {
            show:false
          },
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            lineStyle: {
              show:false
            },
          },
          axisTick:{
            show:false,
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 20, // 设置柱的宽度
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            itemStyle: {
              normal: {
                color:function (params){
                  var colorList = ['#FA7459','#FA824E','#FAAA4E','#FAC14E'];
                  return colorList[params.dataIndex];
                },
                label: {
                    show: true,
                    position: 'right',
                    color: '#999999',
                    formatter: '{@amount} %'
                },
                //柱形图圆角，初始化效果
                barBorderRadius:[0, 10, 10, 0],
              },
              //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              emphasis: {
                barBorderRadius: 20
              },
            }
          },
        ]
      });
    },
    getList(){
      this.getCharts();
      this.loading=true;
      let params={
        current:this.pageNum,
        model:{
          noticeDate:this.noticeDate,//公示年份
          orgCode:this.orgCode,//组织编码，前台参数后台传空
          orgName:'',//组织名称，后台参数前台传空
          title:'',//标题
        },
        size:this.pageSize
      }
      getPublicityList(params).then(response => {
        this.total = response.total;
        this.tableData = response.records;
        this.loading=false;
      }).finally(() => {
        this.loading=false;
      });
    },
    pageChange(){
      this.getList();
    },
    publicityInfo(row){
      this.$refs['refInit'].show(row)
    },
    addYear(){
      this.noticeDate = parseInt(this.noticeDate)+1+"";
      this.getList();
    },
    reduceYear(){
      this.noticeDate = parseInt(this.noticeDate)-1+"";
      this.getList();
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-table /deep/ tr th{
    box-sizing:boder-box
  }
  .base-table /deep/ tr td{
    box-sizing:boder-box;
    color:#7D7D7D;
    font-weight: 400;
  }
  .base-table /deep/ tr td:hover{
    cursor: pointer;
  }
  .base-table /deep/ .cell.el-tooltip{
    width:auto!important;
  }
  .chart{
    width: 100%;
    height: 387px;
  }
  /*.logo-top{*/
    /*padding:14px 20px;*/
    /*padding-bottom:0;*/
  /*}*/
  .logotxt{
    display:flex;
    align-items:center;
    line-height:36px;
    font-size: 16px;
    color: #7D7D7D;
  }
  .logotxt img{
    width:21px;
    height:17px;
    margin-right:8px;
  }
  .line{
    width:100%;
    height:20px;
    background:#eee;
  }
  .teble-line{
    width:100%;
    height:10px;
    background:#eee;
  }
  .publicity{
    min-width: 1318px;
    position: relative;
  }
  .publicity >>> .el-tooltip{
    width: 100% !important;
  }
  .publicity >>> .base-table tr td:nth-of-type(2n){
    font-weight: 400;
  }
  #chart{
    padding-top: 20px;
    background-color: #fff;
  }
  .year{
    width: 100px;
    display: inline-block;
    background-color: #fff;
    position: absolute;
    right: 44px;
    z-index: 999;
    margin-top: 24px;
  }
  .lt,.gt{
    height: 36px;
    width: 15px;
    padding:10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
  }
  .year >>> .el-input__inner{
    border:none;
    outline: none;
    padding:0;
    cursor:pointer;
    width: 38px;
    display: inline-block;
    font-size: 16px;
  }
  .year >>> .el-icon-date::before{
    content: "";
  }
  .year >>> .el-date-editor--year{
    width: 38px;
    float: left;
    margin-left:7px;
  }
  .year-text{
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
  }
</style>
