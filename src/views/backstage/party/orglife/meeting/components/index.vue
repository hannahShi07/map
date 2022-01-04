<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="会议名称">
          <el-input v-model="meetingName" @keyup.enter.native="editBtn(4)" placeholder="请输入会议名称" style="width: 280px" clearable/>
        </base-label-box>
        <base-label-box label="会议类型">
          <el-select
            v-model="meetingType"
            value-key="id"
            @change="selectmt"
            filterable
            placeholder="请选择"
            style="width:280px;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.life_type"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
        <base-label-box label="会议状态">
          <el-select
            v-model="state"
            @change="selectstage"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:280px;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.life_state"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
        <base-label-box label="会议时间" class="meetingTime">
          <el-date-picker
            v-model="beginTime"
            style="width: 280px"
            type="datetime"
            placeholder="请选择"
            @change="selectTime"
            :picker-options="pickerOptionsstart"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker> 至
          <el-date-picker
            v-model="endTime"
            style="width: 280px"
            type="datetime"
            placeholder="请选择"
            @change="selectendTime"
            :picker-options="pickerOptionsend"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <!--          <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>-->
          <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>

        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
        </div>
      </div>

      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="multipleTable1"
          :row-key="bindRowKeys"
          @selection-change="handleSelectionChange"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column
            type="selection"
            reserve-selection
            width="45"
            align="center">
          </el-table-column>
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议名称" min-width="180px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'meetingName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="会议类型" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'meetingType.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议状态" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'state.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="340" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="summary" @click="editBtn(6,row)" :class="{'color-grad':(userOrgcode!=row.orgCode || row.state.data=='未开始' || row.state.data=='未发布')}">纪要</base-table-a>
              <base-table-a type="edit" @click="editBtn(7,row)" :class="{'color-grad':(userOrgcode!=row.orgCode || row.state.data=='进行中' || row.state.data=='已结束')}">编辑</base-table-a>
              <base-table-a @click="editBtn(8,row)" :class="{'color-grad':row.orgCode.indexOf(userOrgcode)<0}">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(9,row)" :class="{'color-grad':(userOrgcode!=row.orgCode || row.state.data=='进行中'  || row.state.data=='已结束')}">删除</base-table-a>

            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>


    <!--纪要-->
    <meeting-summary ref="refSummary" @refresh="pageChange"/>
    <!--详情-->
    <meeting-detail ref="refDetail" @refresh="pageChange"/>
    <!--详情-->
    <!--    <add-person ref="refPerson" @refresh=""/>-->
  </div>
</template>

<script>
  import MeetingSummary from "./meeting-summary"
  import MeetingDetail from "./meeting-detail"
  // import AddPerson from "./add-person"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getMeetingList,getMeetingDetele,getMeetingExport,getMeetingType,getIsadd} from "@/api/backstage/party/orglife/meeting/meeting.js"

  export default {
    name: "index",
    components: {
      MeetingSummary,
      MeetingDetail
      // AddPerson

    },
    data() {
      return {
        selfMeetingtype:{
          data:'三会一课',
          key:'1249946782658461696'
        },
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        dicts: {//字典
          // life_type:{},//会议类型
          life_state:{},//会议状态
        },
        ids:null,//id数组
        orgCode:'',//党组织编码
        orgName:'',//党组织名称
        orgId:'',//党组织id
        meetingType:'',//会议类型
        meetingName:'',//会议名称
        state:'',//会议状态
        endTime:'',//结束时间
        beginTime:'',//开始时间
        // timelist:[],//会议时间数组
        tableData:[],
        multipleSelection:[],//多选框选中数据
        userOrgcode:'',//登录人组织编码
        isShow:true,//判断新增按钮是否出现
        startTimestr0:'',//开始时间的日期
        startTimestr1:'',//开始时间的小时
        startTimestr2:'',//开始时间的分钟
        endTimestr0:'',//结束时间的日期
        endTimestr1:'',//结束时间的小时
        endTimestr2:'',//结束时间的分钟
        pickerOptionsstart: {//时间限制

        },
        pickerOptionsend: {//时间限制

        }


      }
    },
    mounted() {
      this.getUser();
      this.getDict();
      this.getType();
      this.isMeetingtype();
      this.pageChange ();
    },
    methods: {
      //获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.userOrgcode=res.data.orgCode


        })
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['life_state']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.life_state = res.life_state;

        })
      },
      //获取会议类型
      getType(){
        let params = {

        }
        this.loading = true;
        getMeetingType(params).then(response => {
          const res = response;
          this.dicts.life_type = res;

        })
      },
      //判断是否能新增会议
      isMeetingtype(){
        let params = {
          meetingType:this.selfMeetingtype
        }
        getIsadd(params).then(response => {
          const res = response;
          if(res.flag==0){
            this.isShow=false
          }else if(res.flag==1){
            this.isShow=true
          }


        })
      },
      //分页调取接口数据
      pageChange () {
        if(this.beginTime!='' && this.beginTime!=undefined && this.beginTime!=null && this.beginTime!='null'){
           if(this.beginTime.length==16){
             this.beginTime=this.beginTime+':00'
           }else if(this.beginTime.length>19){
             this.beginTime=this.beginTime.substring(0,19)
           }
        }else{
          this.beginTime=''
        }
        if(this.endTime!='' && this.endTime!=undefined && this.endTime!=null && this.endTime!='null'){
          if(this.endTime.length==16){
            this.endTime=this.endTime+':00'
          }else if(this.endTime.length>19){
            this.endTime=this.endTime.substring(0,19)
          }
        }else{
          this.endTime=''
        }



        let params = {
          current: this.pageNum,
          model: {
            id:null,
            orgCode:this.orgCode,//党组织编码
            // orgName:this.orgName,//党组织名称
            meetingType:this.meetingType,//会议类型
            meetingName:this.meetingName,//会议名称
            state:this.state,//会议状态
            endTime:this.endTime,//结束时间
            beginTime:this.beginTime,//开始时间
          },
          size: this.pageSize
        }
        this.loading = true;
        getMeetingList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].orgCode.indexOf('-')>-1){
              this.tableData[i].orgCode1=this.tableData[i].orgCode.split('-')
            }
            if(this.tableData[i].createTime!='' && this.tableData[i].createTime!=undefined && this.tableData[i].createTime!=null && this.tableData[i].createTime!='null'){
              this.tableData[i].createTime=this.tableData[i].createTime.substring(0,16)
            }
          }
          this.total = res.total;


        }).finally(() => {
          this.loading = false;
        });

      },
      //多选框
      bindRowKeys(row){
        return row.id;
      },
      //多选框-改变选中状态
      handleSelectionChange(val) {
        this.ids=[];
        this.multipleSelection = val;
        if(this.multipleSelection!='' && this.multipleSelection!=undefined && this.multipleSelection!=null && this.multipleSelection!='null' && this.multipleSelection.length>0){
          for(let i=0;i<this.multipleSelection.length;i++){
            this.ids.push(this.multipleSelection[i].id)
          }
        }else{
          this.ids=null;
        }

      },
      //组织树点击事件
      handleTreeClick (row) {
        this.orgId=row.id;
        this.orgCode=row.code;
        this.orgName=row.name;
        this.pageChange ();
        this.$refs.multipleTable1.clearSelection();//清空选中的

      },

      //限制结束时间
      selectTime(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          this.startTimestr0=value.substring(0,10);
          this.startTimestr1=value.substring(11,13);
          this.startTimestr2=value.substring(14,16);
          this.startTimestr1=Number(this.startTimestr1)
          this.startTimestr2=Number(this.startTimestr2)
          let date1=new Date(this.startTimestr0).getTime();//时间戳
          let date2=new Date(this.endTimestr0).getTime();//时间戳

          if(date2==date1){
            if(this.endTimestr1<this.startTimestr1){
              this.$message.warning('开始时间要小于结束时间')
              this.beginTime=''
            }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2==this.startTimestr2){
              this.$message.warning('开始时间要小于结束时间')
              this.beginTime=''
            }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2<this.startTimestr2){
              this.$message.warning('开始时间要小于结束时间')
              this.beginTime=''
            }
          }
          // let date=new Date(this.startTimestr0);
          let preDate=date1-3600 * 1000 * 24;
          if(this.startTimestr1==23 && this.startTimestr2==59){
            preDate=preDate + 3600 * 1000 * 24
            // this.startTimestr1='00';
            // this.startTimestr1='00';
          }

          this.pickerOptionsend={//时间限制
            disabledDate(time) {
              // let preDate = str1.getTime()+str2*60*60*1000+str3*60*1000; //前一天
              return time.getTime() < preDate
            },
            // selectableRange: str1+':'+str2+':00'+'-23:59:59'
          }
          this.editBtn(4)
        }

      },
      selectendTime(value){
        if(value!='' && value!=undefined && value!=null && value!='null') {
          this.endTimestr0 = value.substring(0, 10);
          this.endTimestr1 = value.substring(11, 13);
          this.endTimestr2 = value.substring(14, 16);
          this.endTimestr1=Number(this.endTimestr1)
          this.endTimestr2=Number(this.endTimestr2)
          let date1=new Date(this.startTimestr0).getTime();
          let date2=new Date(this.endTimestr0).getTime();
          if(date2==date1){
            if(this.endTimestr1<this.startTimestr1){
              this.$message.warning('结束时间要大于开始时间')
              this.endTime=''
            }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2==this.startTimestr2){
              this.$message.warning('结束时间要大于开始时间')
              this.endTime=''
            }else if(this.endTimestr1==this.startTimestr1 && this.endTimestr2<this.startTimestr2){
              this.$message.warning('结束时间要大于开始时间')
              this.endTime=''
            }
          }
          // let date=new Date(this.startTimestr0);
          let preDate=date2;
          if(this.endTimestr1==0 && this.endTimestr2==0){
            preDate=preDate - 3600 * 1000 * 24
            // this.endTimestr1='00';
            // this.endTimestr1='00';
          }
          this.pickerOptionsstart={//时间限制
            disabledDate(time) {
              // let preDate = str1.getTime()+str2*60*60*1000+str3*60*1000; //前一天
                    return time.getTime() > preDate

            },
            // selectableRange: str1+':'+str2+':00'+'-23:59:59'
          }
          this.editBtn(4)

        }
      },
      selectmt(val){
        this.editBtn(4)
      },
      selectstage(val){
        this.editBtn(4)
      },


      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 7:
            this.$emit('handleSwitch', {name: 'MeetingAdd', params: row})
            break

          // case 2://导入
          //   this.$refs['refPerson'].show(t, row)
          //   break

          case 3://导出
            let params = {
              current: this.pageNum,
              model: {
                ids:this.ids,//id数组
                orgId:this.orgId,//党组织id
                orgCode:this.orgCode,//党组织编码
                orgName:this.orgName,//党组织名称
                meetingType:this.meetingType,//会议类型
                meetingName:this.meetingName,//会议名称
                state:this.state,//会议状态
                endTime:this.endTime,//结束时间
                beginTime:this.beginTime,//开始时间
              },
              size: this.pageSize
            }

            getMeetingExport(params);
            break

          case 4://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 5://重置
            this.ids=null;//id数组
            this.orgId='';//党组织id
            this.orgCode='';//党组织编码
            this.orgName='';//党组织名称
            this.meetingType='';//会议类型
            this.meetingName='';//会议名称
            this.state='';//会议状态
            this.endTime='';//结束时间
            this.beginTime='';//开始时间
            this.pageNum=1;
            this.total=0;
            // this.timelist=[];
            // this.pageChange ();
            this.$refs.refTree.getTree("clear")//重置左侧组织树
            this.$refs.multipleTable1.clearSelection();//清空选中的
            this.pickerOptionsend={//时间限制
                disabledDate(time) {
                    return false
                },
            };
            this.pickerOptionsstart={//时间限制
                disabledDate(time) {
                    return false
                },
            }
            break

          case 6://纪要

            this.$refs['refSummary'].show(t, row)
            break

          case 8://详情

            this.$refs['refDetail'].show(t, row)
            break

          case 9://删除
            // if(row.state.data=='已结束'){
            //   this.$message.warning("当前会议已结束,不能取消会议")
            //   return
            // }
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                meetingId:row.id
              }

              getMeetingDetele(params).then(response => {
                // this.$message.success("删除成功")
                this.$message(this.successTip())
                const res = response;
                this.pageChange ();
              })
            }).catch(() => {

            })
            break

        }
      },
    }
  }
</script>

<style>
  .party {
    height: 100%;
    background: #eee;
  }

  /* 按钮禁用*/
  .color-grad{
    pointer-events: none!important;
    cursor: default!important;
    color:#999!important;
  }

</style>
