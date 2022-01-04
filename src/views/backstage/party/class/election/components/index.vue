<template>
  <div class="election">
    <base-page-tree @handleTreeClick="handleTreeClick" ref="refTree">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="换届日期">
          <el-date-picker
            v-model="transitionDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            @change="pageChange()">
          </el-date-picker>
        </base-label-box>
      </div>
      <!-- 按钮 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="pageChange()"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(5)"/>
        </div>
      </div>

      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          v-loading="loading"
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          header-row-class-name="page-table-header"
          ref="returnTable"
          :data="records"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="换届日期" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'transitionDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="届满日期" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'endDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="本届任期" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'term.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="选举方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'electionWay.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" min-width="200" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(2,row)" :class="row.orgId.key==selfId?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="detail" @click="editBtn(6,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(3,row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <election-first ref="refEdit" @refresh="pageChange" />
    <election-info ref="refInfo" />
  </div>
</template>

<script>
  import {getElectionList,deleteElection} from "@/api/backstage/party/class/election/election.js"
  import ElectionFirst from './election-first'
  import ElectionInfo from './election-info'
  import commonReq  from "@/api/public/commonReq.js"
  import db from '@/utils/localstorage'//  获取用户登录id
  export default {
    name: "index",
    components: {ElectionFirst,ElectionInfo},
    data () {
      return {
        orgId:0,
        orgName:"",
        selfId:0,
        selfName:"",
        code:0,
        name:"",//姓名
        transitionDate:"",//任职日期
        records:[],
        selfCode:"",//登录人党组织编码
        pageNum:1,
        pageSize:10,
        total:0,
        loading:true
      }
    },
    mounted(){
      this.getUser();
    },
    methods: {
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          this.selfCode=response.data.orgCode;
          this.selfName=response.data.orgName;
          this.selfId=response.data.orgId;
          this.orgName=response.data.orgName;
          this.orgId=response.data.orgId;
          this.code=response.data.orgCode;
          this.pageChange();//列表数据
        })
      },
      handleTreeClick (row) {
        this.orgId=row.id
        this.code = row.code
        this.orgName = row.label
        this.pageChange()//列表数据
      },
      // 获取列表
      pageChange(){
        let params = {
          "current": this.pageNum,
          "model": {
            "orgCode": this.code,
            "transitionDate": this.transitionDate
          },
          "size": this.pageSize,
        }
        this.loading = true;
        getElectionList(params).then(response => {
          this.records = response.records;
          this.total = response.total;
          this.loading = false
        }).finally(() => {
          this.loading = false;
        });
      },
      // 删除
      delElection(row){
        this.$confirm('是否删除该条信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
        }).then(() => { //确认删除
          let params = {
            ids:[row.id]
          }
          deleteElection(params).then(response => {
            this.pageChange();
          }).finally(() => {

          });
        }).catch(() => {

        })
      },
      //按钮点击事件
      editBtn (t, row) {
        switch (t) {
          case 1://新增
            this.$refs['refEdit'].show(1,this.selfName,this.selfId)
            break

          case 2://编辑
            this.$refs['refEdit'].show(2,this.orgName,this.orgId,row);
            break

          case 3://删除
            this.delElection(row);
            break

          case 4://查询
            this.pageChange();
            break

          case 5://重置
            this.transitionDate = "";
            this.$refs.refTree.getTree("clear")
            break

          case 6://详情
            this.$refs['refInfo'].show(t,row)
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .election{
    height: 100%;
    background-color: #eee;
  }
  .election >>> .base-label-box .base-label-box__label{
    width: auto;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
