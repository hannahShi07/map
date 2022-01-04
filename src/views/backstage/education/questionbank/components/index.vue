<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="发布组织">
        <el-input v-model="orgId.data" @keyup.enter.native="editBtn(4)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="题库名称">
        <el-input v-model="title" @keyup.enter.native="editBtn(4)" placeholder="请输入" style="width: 280px" clearable/>
      </base-label-box>
      <base-label-box label="题库状态">
        <el-select
          v-model="status"
          value-key="id"
          filterable
          placeholder="请选择"
          @change="selectType"
          style="width: 280px"
          clearable>
          <el-option
            v-for="(item, index) in questionType"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
      <base-label-box label="按时间筛选">
        <el-select
          v-model="sortCreateDate"
          value-key="id"
          filterable
          placeholder="请选择"
          @change="selectxz"
          style="width: 280px"
          clearable>
          <el-option
            v-for="(item, index) in sortlist"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>


      <base-label-box label="发布时间" class="meetingTime">
        <el-date-picker
          v-model="startDate"
          style="width: 170px"
          type="date"
          placeholder="请选择"
          @change="selectTime"
          :picker-options="pickerOptionsstart"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
          v-model="endDate"
          style="width: 170px"
          type="date"
          placeholder="请选择"
          @change="selectendTime"
          :picker-options="pickerOptionsend"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </base-label-box>
    </div>
    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
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
        :header-cell-style="{'text-align':'center'}"
      >
        <el-table-column label="序号" width="50px" align="center">
          <template slot-scope="scope">
            <span>{{scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="题库名称" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'title')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="题库状态" width="140"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{getStatus(tableData[scope.$index].status)}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发布组织" min-width="200px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="160"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a @click="editBtn(8,row)">详情</base-table-a>
            <base-table-a type="add" @click="editBtn(7,row)" :class="curOrgPerid(row.orgId.key) ?  'color-grad': ''">新增题目</base-table-a>
            <base-table-a v-if="row.status=='0'" type="stop" @click="editBtn(9,row)" :class="curOrgPerid(row.orgId.key) ?  'color-grad': ''">停用</base-table-a>
            <base-table-a v-if="row.status=='1'" type="start" @click="editBtn(10,row)" :class="curOrgPerid(row.orgId.key) ?  'color-grad': ''">启用</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>


    <!--创建题库-->
    <question-edit ref="refEdit" @refresh="pageChange"/>
    <!--选择添加题目的方法-->
    <question-addmethod ref="refMethod" @refresh="pageChange"/>
    <!--是否停用或者启用-->
<!--    <question-stop ref="refStop" @refresh="pageChange"/>-->

  </div>
</template>

<script>
  import QuestionEdit from "./question-edit"
  import QuestionAddmethod from "./question-addmethod"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getQuestionList,getQuestionStart} from "@/api/backstage/education/questionbank/questionbank.js"



  export default {
    name: "index",
    components: {
      QuestionEdit,
      QuestionAddmethod,
      // QuestionStop
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],
        questionType:[//题库状态
          {
            id:0,
            name:'已启用'
          },{
            id:1,
            name:'已停用'
          }
        ],
        sortlist:[//排序
          {
            id:1,
            name:'由远及近'
          },{
            id:2,
            name:'由近及远'
          }
        ],
        org:{//本级组织的id和名称
          data:'',
          key:''
        },
        orgId:{//发布组织id
          data:'',
          key:''
        },
        sortCreateDate:'',//排序
        startDate:'',//开始时间
        endDate:'',//结束时间
        status:'',//题库状态
        title:'',//题库名称
        pickerOptionsstart: {//时间限制

        },
        pickerOptionsend: {//时间限制

        }

      }
    },
    mounted() {
      this.pageChange ();
      this.getUser();
    },

    methods: {
      //获取登录人信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.org={
            data:res.data.orgName,
            key:res.data.orgId
          }

        })
      },
      //分页调取接口数据
      pageChange (num) {
        if(((typeof num) === 'number') && (this.sortCreateDate == 2)){
          this.pageNum = num
        }

        let params = {
          current: this.pageNum,
          model: {
            orgId:this.orgId,
            sortCreateDate:this.sortCreateDate,
            startDate:this.startDate,
            endDate:this.endDate,
            title:this.title,
            status:this.status,

          },
          size: this.pageSize
        }
        this.loading = true;
        getQuestionList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
          if(this.tableData!='' && this.tableData!=undefined && this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].createTime=this.tableData[i].createTime.substring(0,16)
            }
          }


        }).finally(() => {
          this.loading = false;

        });

      },
      //处理题库状态
      getStatus(val){
        if(val!='' && val!=undefined && val!=null && val!='null'){
          if(val=='1'){
            return  '已停用'
          }else if(val=='0'){
            return  '已启用'
          }
        }else{
          return  '--'

        }

      },
      selectType(val){
        this.editBtn(4)
      },
      selectxz(val){
        this.editBtn(4)
      },
      selectTime(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate = new Date(val).getTime();
          this.pickerOptionsend={//时间限制
            disabledDate(time) {
              return time.getTime() < preDate
            },
          }

        }
        this.editBtn(4)
      },
      selectendTime(val){
        if(val!='' && val!=undefined && val!=null && val!='null') {
          let preDate =  new Date(val).getTime()-24*60*60*1000;
          this.pickerOptionsstart={//时间限制
            disabledDate(time) {
              return time.getTime() > preDate
            },
          }
        }
        this.editBtn(4)
      },
      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1://新增题库
            this.$refs['refEdit'].show(t, row)
            break

          case 4://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 5://重置
            this.orgId={
                data:'',
                key:''
            };
            this.org={
              data:'',
              key:''
            };
            this.sortCreateDate='';
            this.startDate='';
            this.endDate='';
            this.title='';
            this.status='';
            this.pageNum=1;
            this.total=0;
            this.pageChange ();
            break
          case 7://新增题目
            this.$refs['refMethod'].show(t, row)
            break

          case 8://详情
            this.$emit('handleSwitch', {name: 'QuestionDetail', params: row})
            break

          case 9://停用
            this.$confirm('是否停用该题库？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                id:row.id,
                status:1
              }
              getQuestionStart(params).then(response => {
                const res = response;
                if(res.isSuccess==true){
                  this.$message.success(res.msg)
                }else{
                  this.$message.error(res.msg)
                }
                this.pageChange ();
              })
            }).catch(() => {

            })

            break
          case 10://启用
            let params = {
              id:row.id,
              status:0
            }
            getQuestionStart(params).then(response => {
              const res = response;
              if(res.isSuccess==true){
                this.$message.success(res.msg)
              }else{
                this.$message.error(res.msg)
              }
              this.pageChange ();
            })
            break

        }
      },

    }
  }
</script>

<style>


  .title1 /deep/ .base-label-box__label{
    width:70px!important;
  }
  /* 按钮禁用*/
  .color-grad{
    pointer-events: none!important;
    cursor: default!important;
    color:#999!important;
  }

</style>
