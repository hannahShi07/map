<template>
  <div class="history">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="宣传栏名称">
          <el-input v-model="name" @keyup.enter.native="editBtn(4)" placeholder="请输入" style="width: 280px" clearable/>
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

      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="投放" imgType="putin" @click="editBtn(2)"/>
          <base-page-button title="撤销" imgType="revoke" @click="editBtn(3)"/>

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
          <el-table-column label="宣传栏名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="简介" width="180"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'brief')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="链接地址" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'linkAddress')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="状态" width="140px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'state.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="最后操作时间" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'updateTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a @click="editBtn(6,row)">详情</base-table-a>
              <base-table-a type="edit" @click="editBtn(7,row)">编辑</base-table-a>


            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>


    <!--新增-->
    <propaganda-add ref="refAdd" @refresh="pageChange"/>
    <!--详情-->
    <propaganda-detail ref="refDetail" @refresh=""/>
  </div>
</template>

<script>
  import PropagandaAdd from "./propaganda-add"
  import PropagandaDetail from "./propaganda-detail"
  import db from "@/utils/localstorage";
  import commonReq  from "@/api/public/commonReq.js"
  import {getPropagandalist,getPropagandaput,getPropagandarevoke} from "@/api/backstage/sysset/administrationIndex/propaganda/propaganda.js"

  export default {
    name: "index",
    components: {
      PropagandaAdd,
      PropagandaDetail

    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],//列表数据

        name:'',//宣传栏名称
        state:{//状态
          data:'',
          key:''
        },
        ids:[],//id数组
        multipleSelection:[],//多选框选中数据
        dicts: {//字典
          post_state:{},//状态
        },
        userOrgcode:'',//登录人组织编码

      }
    },
    mounted() {
      this.getUser();
      this.getDict();
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
            name:this.name,
            state:this.state,
          },
          size: this.pageSize
        }
        this.loading = true;
        getPropagandalist(params).then(response => {
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
          this.ids=[];
        }

      },

      selectstage(val){
        this.editBtn(4)
      },

      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 7:
            this.$refs['refAdd'].show(t, row)
            break

          case 2://投放
            if(this.ids!='' && this.ids!=undefined && this.ids!=null && this.ids!='null' && this.ids.length>0){
              let params = {
                ids:this.ids
              }
              getPropagandaput(params).then(response => {
                const res = response;
                if(res==true){
                  this.$message(this.successTip())
                  this.pageChange ();
                  this.$refs.multipleTable1.clearSelection();//清空选中的
                }else{
                  this.$message.error('操作失败！')
                }

              }).finally(() => {

              });
            }else{
              this.$message.warning('请选择广告进行投放！')
            }
            break

          case 3://撤销
            if(this.ids!='' && this.ids!=undefined && this.ids!=null && this.ids!='null' && this.ids.length>0){
              let params = {
                ids:this.ids
              }
              getPropagandarevoke(params).then(response => {
                const res = response;
                if(res==true){
                  this.$message(this.successTip())
                  this.pageChange ();
                  this.$refs.multipleTable1.clearSelection();//清空选中的
                }else{
                  this.$message.error('操作失败！')
                }

              }).finally(() => {

              });
            }else{
              this.$message.warning('请选择广告进行撤销！')
            }

            break

          case 4://查询
            this.pageNum = 1;
            this.pageChange()
            break

          case 5://重置
            this.name='';
            this.state={
              data:'',
              key:''
            };
            this.$refs.multipleTable1.clearSelection();//清空选中的
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

  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999
  }
</style>
