<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="活动主题">
          <el-input v-model="theme" @keyup.enter.native="editBtn(4)" placeholder="请输入" style="width: 280px" clearable/>
        </base-label-box>

        <base-label-box label="开始时间" class="meetingTime">
          <el-date-picker
            v-model="startTime"
            style="width: 280px"
            type="datetime"
            placeholder="请选择"
            @change="selectTime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
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
          <el-table-column label="组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="活动主题" width="200"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'theme')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="开始时间" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'startTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动地点" width="140"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'address')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动人数" width="120"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'participantsNum')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a @click="editBtn(8,row)">详情</base-table-a>
              <base-table-a type="edit" @click="editBtn(7,row)" :class="{'color-grad': (currentOrg.key!=row.orgId)}">编辑</base-table-a>
              <base-table-a type="delete" @click="editBtn(9,row)" :class="{'color-grad': (currentOrg.key!=row.orgId)}">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>



    <!--新增-->
    <doubletraining-add ref="refAdd" @refresh="pageChange"/>

  </div>
</template>

<script>
  import DoubletrainingAdd from "./doubletraining-add"
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getProjectList,getProjectDetele,getAuthority} from "@/api/backstage/party/regionalparty/doubletraining/doubletraining.js"



  export default {
    name: "index",
    components: {
      DoubletrainingAdd
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],
        orgCode:'',//党组织编码
        orgName:'',//党组织名称
        orgId:'',//党组织id

        theme:'',//活动主题
        startTime:'',//开始时间
        buildType:{//共建类型
          data:'双培三帮带',
          key:'2256847413879211858'
        },
        // isAuthority:'',//新增、编辑和删除权限
        currentOrg:{//登录人信息
          key: '',
          data: '',
          code: ''
        }

      }
    },
    mounted() {
      this.pageChange ();
      // this.getAddauthority();
      this.getUser()
    },
    methods: {
      /*获取当前登陆人信息*/
      getUser(){
        commonReq.getUserinformation({userId: db.get('USER').id}).then(response => {
          const data = response.data;
          this.currentOrg.data = data.orgName;
          this.currentOrg.key = data.orgId;
          this.currentOrg.code = data.orgCode;
        });
      },
      //分页调取接口数据
      pageChange (num) {
        if((typeof num) === 'number'){
          this.pageNum = num
        }

        if(this.startTime!='' && this.startTime!=undefined && this.startTime!=null && this.startTime!='null'){
          if(this.startTime.length==16){
            this.startTime=this.startTime+':00'
          }else if(this.startTime.length>19){
            this.startTime=this.startTime.substring(0,19)
          }
        }else{
          this.startTime=''
        }
        let params = {
          current: this.pageNum,
          model: {
            constructionType:this.buildType.key,//类型
            orgCode:this.orgCode,//党组织编码
            orgName:this.orgName,//党组织名称
            theme:this.theme,//活动主题
            startTime:this.startTime,//开始时间
          },
          size: this.pageSize
        }
        this.loading = true;
        getProjectList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;

        }).finally(() => {
          this.loading = false;

        });

      },
      //组织树点击事件
      handleTreeClick (row) {
        this.orgId=row.id;
        this.orgCode=row.code;
        this.orgName=row.name;
        this.pageChange ();

      },
      selectTime(val){
        this.editBtn(4)
      },
      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 7:
            this.$refs['refAdd'].show(t, row)
            break

          case 4://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 5://重置
            this.orgId='';//党组织id
            this.orgCode='';//党组织编码
            this.orgName='';//党组织名称
            this.theme='';//活动主题
            this.startTime='';//开始时间
            this.pageNum=1;
            this.total=0;
            // this.pageChange ();
            this.$refs.refTree.getTree("clear")//重置左侧组织树
            break
          case 8://详情
            this.$emit('handleSwitch', {name: 'DoubletrainingDetail', params: row})
            break

          case 9://删除
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                ids:[row.id]
              }

              getProjectDetele(params).then(response => {

                // this.$message.success("删除成功")
                this.$message(this.successTip())
                const res = response;
                this.pageChange ();
              }).finally(() => {

              });
            }).catch(() => {

            })
            break

        }
      },
      //新增、编辑和删除权限
      // getAddauthority(){
      //   let params={}
      //   getAuthority(params).then(response => {
      //     const res = response;
      //     this.isAuthority=res;
      //   }).finally(() => {
      //
      //   });
      // },

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

