<template>
  <div class="party" v-cloak>
    <div class="logo-top clearfix">
      <div class="logotxt fl">
        <img src="../../../../../../assets/page/icon-logo.png">
        <span>{{orgName}}</span>
      </div>
      <div class="fr">
        <base-label-box label="选择党组织">
          <el-select filterable v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px" clearable >
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
    <!--图表-->
    <div class="echarts-content clearfix">
      <div class="echarts-left fl">
        <div id="addPartynumber" style="width:100%;height:400px;"/>
      </div>
      <div class="echarts-right fl">
        <div id="partyNumber" style="width:100%;height:400px;"/>
      </div>
    </div>
    <div class="line"></div>

    <!--<div class="mr-20 ml-20 pd-20">-->
    <div class="pd-20">
      <el-table class="base-table" border :data="tableData"  @row-click="rowClick" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="姓名" width="320px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="组织名称" min-width="200px"  align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'org.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="学历" width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'education.data')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="人员类型" width="160px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import {getManagepage,getManagestatistics} from "@/api/front/party/basic/manage/manage.js"
  import commonReq  from "@/api/public/commonReq.js"

  //页面引入eacharts基础模版
  let echarts = require('echarts/lib/echarts')

  export default {
    // mixins: [resize],
    components: {

    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        list:[],//党组织下拉框
        orgName:'',//组织名称
        orgId:'',//组织id
        orgCode:'',//组织编码
        yearList:[],//年份数组
        addPartyperson:[],//新增党员人数数组
        formalParty:[],//正式党员数组
        prepParty:[],//预备党员数组
        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//总条数
        tableData: [],//列表数据
      }
    },
    mounted(){
      // this.getUser();
      this.getOrg();
      //图表自适应
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
        this.$echarts.init(document.getElementById("partyNumber")).resize();
      };
      window.addEventListener("resize", this.resizefun);
    },
    activated() {
      this.resizefun = () => {
        this.$echarts.init(document.getElementById("addPartynumber")).resize();
        this.$echarts.init(document.getElementById("partyNumber")).resize();
      };
      window.addEventListener("resize", this.resizefun);
    },
    //移除事件监听，避免内存泄漏
    deactivated() {
      window.removeEventListener("resize", this.resizefun);
      this.resizefun = null;
    },
    //移除事件监听，避免内存泄漏
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
          this.getStatistics();
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
      //数据统计
      getStatistics(){
        this.yearList=[];
        this.addPartyperson=[];
        this.formalParty=[];
        this.prepParty=[];
        let params = {
           orgCode: this.orgCode
        }
        getManagestatistics(params).then(response => {
          const res = response;
          for(var i=0;i<res.length;i++){
            this.yearList.push(res[i].year)//年份数组
            this.addPartyperson.push(res[i].memberNumber)//新增党员人数数组
            this.formalParty.push(res[i].formalMemberNumber)//正式党员数组
            this.prepParty.push(res[i].prepareMemberNumber)//预备党员数组
          }
          this.getEchart();//新增党员人数图表
          this.getPartyEchart();//正式、预备党员人数

        }).finally(() => {

        });

      },
      // 调用数据接口
      pageChange () {
        let params = {
          "current":this.pageNum,
          "size": this.pageSize,
          "model": {
            "orgCode": this.orgCode,
          },
        }
        this.loading = true;
        getManagepage(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //选择党组织
      selectChange(value){
        if(this.list!='' && this.list!=undefined && this.list!=null && this.list!='null' && this.list.length>0){
          for(var i=0;i<this.list.length;i++){
            if(value==this.list[i].code){
              this.orgName=this.list[i].name;
            }
          }
          this.getStatistics();
          this.pageChange ();
        }
      },
      //点击行获取该行数据
      rowClick(row){
        this.$emit('handleSwitch', {name: 'ManageDetail', params: row})
      },
      //新增单元人数图表
      getEchart(){
        var chart1 = echarts.init(document.getElementById('addPartynumber'))
        var option = {
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['新增党员数'],
              x:'center',
              y:'top',
          },
          color: ["#FA874E"],
          grid: {
              left: '5%',
              right: '4%',
              bottom: '5%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.yearList
          },
          yAxis: {
            name: '新增党员数',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 35, //与y轴距离
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            type: 'value',
            splitLine :{    //网格线
                lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
                show:true //隐藏或显示
            }

          },
          series: [{
              name: '新增党员数',
              data: this.addPartyperson,
              type: 'line',
				      areaStyle : {
                color:'rgba(252, 143, 33, 0.3)'
              },
          }]
        }
        chart1.setOption(option,true)
      },
      //正式、预备党员人数图表
      getPartyEchart(){
        var chart2 = echarts.init(document.getElementById('partyNumber'))
        var option2 = {
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['正式党员数','预备党员数'],
              x:'center',
              y:'top',
          },
          color: ["#FAC14E","#FC8F21"],
          grid: {
              left: '4%',
              right: '4%',
              bottom: '5%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              // boundaryGap: false,
              data: this.yearList
          },
          yAxis: {
            name: '党员数量',
            nameTextStyle: {
              fontSize: 12
            },
            position: 'left',//位置靠左
            nameGap: 35, //与y轴距离
            minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数
            type: 'value',
            splitLine :{    //网格线
                lineStyle:{
                    type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
                show:true //隐藏或显示
            }

          },
          series: [
            {
              name: '正式党员数',
              data: this.formalParty,
              type: 'bar',
              barWidth : 30,//柱图宽度
              stack: 'product',//堆叠
            },
            {
              name: '预备党员数',
              data: this.prepParty,
              type: 'bar',
              barWidth : 30,//柱图宽度
              stack: 'product',//堆叠
              itemStyle: {
                  //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                  emphasis: {
                      barBorderRadius: 30
                  },

                  normal: {
                      //柱形图圆角，初始化效果
                      barBorderRadius:[15, 15, 0, 0],
                  }
              },
            }
          ]
        }
        chart2.setOption(option2,true)
      }
    }
  }
</script>

<style lang="scss" scoped>
.base-table /deep/ tr th{
  box-sizing:border-box;
}
.base-table /deep/  tr td{
  box-sizing:border-box;
  color:#7D7D7D;
  font-weight: 400;
}

.base-table /deep/ tr td:hover{
  cursor: pointer;
}

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

/*图表*/
.echarts-content{
  width:100%;
  background:#eee;
}
.echarts-left{
  background:#fff;
  width:49%;
  /*margin-right:2%;*/
  margin-right:20px;
  /*margin-bottom:10px;*/
  // min-width:580px;
  // overflow-x:auto;
  padding-top:25px;
  // padding:12px 12px;
}
.echarts-right{
  background:#fff;
  width:calc(100% - 49% - 20px);
  // min-width:580px;
  // overflow-x:auto;
  padding-top:25px;
  // padding:12px 12px;
}
</style>
