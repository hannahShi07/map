<template>
  <div class="history">
      <div class="page-search-box">
        <base-label-box label="会议名称">
          <el-input v-model="model.meetName" placeholder="请输入会议名称" style="width: 280px" clearable/>
        </base-label-box>
        <base-label-box label="开始时间" class="meetingTime">
          <el-date-picker
            v-model="model.beginTime"
            style="width: 280px"
            type="datetime"
            placeholder="请选择"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </base-label-box>
        <!--<base-label-box label="会议号">-->
          <!--<el-input  v-model="model.roomNum" placeholder="请输入会议号" style="width: 280px" clearable/>-->
        <!--</base-label-box>-->
        <base-label-box label="会议状态">
          <el-select
            v-model="model.meetingState"
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

      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(1)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(2)"/>
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
          :header-cell-style="{'text-align':'center'}"
        >

          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议名称" min-width="220px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'meetName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="会议开始时间" width="180"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'beginTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="会议状态" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'meetingStateName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发起人" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'userName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="400" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件  -->
              <base-table-a type="add" @click="editBtn(3,row)" v-if=" row.meetingState != '1249947603085295616'">进入会议</base-table-a>
              <base-table-a type="delete" @click="editBtn(4,row)" v-if="(row.privilege == '255') && ( row.meetingState == '1249947448751685632')">取消会议</base-table-a>
              <base-table-a type="delete" @click="editBtn(4,row)" v-if="(row.privilege == '255') &&  row.meetingState == '1249947603085295616'">删除会议</base-table-a>

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
  import db from '@/utils/localstorage';
  import { getMeetIngList, delet } from '@/api/backstage/onlineMeeting/onlineMeeting.js'

  export default {
    name: "index",
    components: {


    },
    data() {
      return {
        token: 'Bearer ' + db.get('TOKEN', ''),// token值
        tenant: db.get('TENANT', ''),// 租户
        loading:true,//加载遮罩控制条件
        pageNum:1,
        pageSize:10,
        total:0,
        // 获取信息列表参数
        model: {
          // 会议名称
          meetName: '',
          // 会议状态(字典控制 1.待开始  2.进行中  3.已结束)
          meetingState: '',
          // 开始时间
          beginTime: '',
          // 会议号
          // roomNum: '',
        },

        meetingType:'',//会议状态
        dicts:{
          life_state:[{
            id:'1249947448751685632',
            name:'未开始',
          },{
            id:'1249947551948341248',
            name:'进行中',
          },{
            id:'1249947603085295616',
            name:'已结束',
          }]
        },
        tableData:[]

      }
    },
    mounted() {
      this.pageChange()

    },
    methods: {
      // 删除会议
      delet(meetingId){
        delet({ meetId: meetingId}).then(res => {
          if(res){
            this.$message.success("操作成功")
          }else{
            this.$message.success("操作失败")
          }
        }).finally(() => {
          this.pageChange()
        })
      },
      //获取列表数据
      pageChange(){
        getMeetIngList({
          current: this.pageNum,
          size: this.pageSize,
          model: this.model
        }).then(res => {
          if(res){
            this.tableData = res.records
            this.total = res.total
          }
        }).finally(() => {
          this.loading=false;
        })

      },
      // 重置
      resert() {
        this.pageNum = 1,
        this.pageSize = 10,
        this.total = 0,
        // 获取信息列表参数
        this.model = {
          // 会议名称
          meetName: '',
          // 会议状态(字典控制 1.待开始  2.进行中  3.已结束)
          meetingState: '',
          // 开始时间
          beginTime: '',
          // 会议号
          roomNum: '',
        }
        this.pageChange()
      },
      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1://查询
            this.pageChange()
            break
          case 2://重置
            this.resert()
            break

          case 3://进入会议
            let url =  './video/test.html?token='+ this.token + '&tenant='+ this.tenant + '&userId='+ row.userName + '&roomId=' + row.roomNum + '&privilege=' + row.privilege + '&meetName=' + row.meetName
            if(row.meetingState=='1249947448751685632'){
              //获取当前时间戳
              let nowtime=new Date().getTime()
              let begintime=new Date(row.beginTime).getTime()
              let time=begintime-nowtime
              if(time<=10*60*1000){
                window.open(url)
              }else{
                this.$message.warning("会议还未开始！")
              }
            }else if(row.meetingState=='1249947551948341248'){
              window.open(url)
            }
            break

          case 4:////取消、删除会议
            this.delet(row.meetingId)
            break
        }
      },
    }
  }
</script>

<style scoped>
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
  .meetingTime /deep/ .el-date-picker .el-button {
     color: #DCDFE6!important;
     border: 1px solid #DCDFE6!important;
  }
  .meetingTime /deep/ .el-date-picker .el-button--text{
     color: #DCDFE6!important;
  }
  .moretable /deep/ .el-dropdown-link{
    cursor: pointer;
    color: #53A0FF;
  }
  .el-dropdown-menu{
    width:auto;
    min-width:240px;
    display:flex;
    justify-content: space-between;
  }

</style>
