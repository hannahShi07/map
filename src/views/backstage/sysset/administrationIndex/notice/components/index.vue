<template>
  <div class="history">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="标题">
          <el-input v-model="title" @keyup.enter.native="editBtn(4)" placeholder="请输入" style="width: 280px" clearable/>
        </base-label-box>
        <base-label-box label="状态">
          <el-select
            v-model="state.key"
            @change="selectstage"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:280px;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.post_state"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
        <base-label-box label="发布时间">
          <el-date-picker
            v-model="openTime"
            style="width: 170px"
            type="date"
            placeholder="请选择"
            @change="selectTime"
            :picker-options="pickerOptionsstart"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker
            v-model="openTimeEnd"
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
        <!--<el-table-->
          <!--v-loading="loading"-->
          <!--class="table"-->
          <!--:data="tableData"-->
          <!--tooltip-effect="dark"-->
          <!--style="width:100%;margin: 0 auto"-->
          <!--ref="multipleTable1"-->
          <!--:row-key="bindRowKeys"-->
          <!--@selection-change="handleSelectionChange"-->
          <!--:header-cell-style="{'text-align':'center'}"-->
        <!--&gt;-->
          <el-table
            v-loading="loading"
            class="table"
            tooltip-effect="dark"
            style="width:100%;margin: 0 auto"
            ref="returnTable"
            :data="tableData"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column label="序号" width="100px" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>

          <el-table-column label="标题" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'title')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="发布人" width="200"  align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'createUserName.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'states.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="发布时间" width="300px" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{isEmpty(row,'openTime')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="300" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(2,row)" :class="{'color-grad':(row.states.data=='已发布')}">编辑</base-table-a>
              <base-table-a type="backout2"  @click="editBtn(3,row)" :class="{'color-grad':(row.states.data=='已撤销')}">撤下</base-table-a>


            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>


    <!--新增-->
    <notice-add ref="refAdd" @refresh="pageChange"/>
  </div>
</template>

<script>
  import NoticeAdd from "./notice-add"
  import commonReq  from "@/api/public/commonReq.js"
  import {getNoticelist,getNoticeedit} from "@/api/backstage/sysset/administrationIndex/notice/notice.js"

  export default {
    name: "index",
    components: {
      NoticeAdd
    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],// 列表数据

        title:'',// 公告管理名称
        state:{// 状态（未发布：1310765921983266816 已发布：1310765959610368000 已撤销：1310766024873738240）
          data:'',
          key:''
        },
        openTime: '',// 起始发布时间
        openTimeEnd: '',// 总止发布时间
        dicts: {// 字典
          post_state:{},// 状态
        },
        pickerOptionsstart: {}, // 时间限制
        pickerOptionsend: {}, // 时间限制
      }
    },
    mounted() {
      this.getDict()
      this.pageChange ()
    },
    methods: {
      //调用字典接口
      getDict(){
        let params = {
          types:['post_state']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.post_state = res.post_state;

        })
      },
      //分页调取接口数据
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {
            title: this.title,
            states: this.state,
            openTime: this.openTime,
            openTimeEnd: this.openTimeEnd
          },
          size: this.pageSize
        }
        this.loading = true;
        getNoticelist(params).then(response => {
          const res = response;
          this.tableData=res.records;
          this.total=res.total;
          for(let i=0;i<this.tableData.length;i++){
            this.tableData[i].createTime=this.tableData[i].createTime.substring(0,16)
            this.tableData[i].updateTime=this.tableData[i].updateTime.substring(0,16)
          }

        }).finally(() => {
          this.loading = false;

        });

      },
      // 开始时间选择
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
      // 结束时间选择
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

      // 状态选择
      selectstage(val){
        this.editBtn(4)
      },

      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 2:
            this.$refs['refAdd'].show(t, row)
            break

          case 3://撤销
            row.isDelete = 0
            row.states={
              data:'已撤销',
              key:'1310766024873738240'
            }
            getNoticeedit(row).then(response => {
              const res = response;
              if(res.code === 0){
                this.$message(this.successTip())
                this.pageChange ();
                // this.$refs.multipleTable1.clearSelection();//清空选中的
              }else{
                this.$message.error('操作失败！')
              }

            })

            break

          case 4://查询
            this.pageNum = 1;
            this.pageChange()
            break

          case 5://重置
            this.title='';
            this.openTime = '',// 起始发布时间
            this.openTimeEnd = '',// 总止发布时间
            this.state={
              data:'',
              key:''
            };
            // this.$refs.multipleTable1.clearSelection();//清空选中的
            this.total=0;
            this.pageNum = 1;
            this.pageChange();
            break

          case 6://详情
            this.$refs['refDetail'].show(t, row)
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
    overflow: auto;
  }

  /* 按钮禁用*/
  .color-grad{
    pointer-events: none!important;
    cursor: default!important;
    color:#999!important;
  }
</style>
