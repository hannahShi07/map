<template>
  <div class="members">
    <base-page-tree @handleTreeClick="handleTreeClick" ref="refTree">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="姓名">
          <el-input clearable v-model="name" placeholder="请输入姓名" />
        </base-label-box>
        <base-label-box label="党内职务">
          <!-- <el-input clearable v-model="" placeholder="请输入党内职务" /> -->
          <el-select v-model="position" placeholder="请选择" :editable="false" clearable @change="pageChange()">
            <el-option
              v-for="item in positionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>
        <base-label-box label="任职日期">
          <el-date-picker
            v-model="officeDate"
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
          <base-page-button title="成员管理" imgType="process" type="primary" @click="editBtn(1)"/>
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
          <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党内职务" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'position.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属组织" width="240px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="任职日期" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'officeDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="editBtn(6,row)">详情</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <members-first ref="refEdit" @refresh="pageChange" />
    <members-info ref="refInfo" />
  </div>
</template>

<script>
  import {getMembersList} from "@/api/backstage/party/class/members/members.js"
  import MembersFirst from './members-first'
  import MembersInfo from './members-info'
  import commonReq  from "@/api/public/commonReq.js"
  import db from '@/utils/localstorage'//  获取用户登录id
  export default {
    name: "index",
    components: {MembersFirst,MembersInfo},
    data () {
      return {
        orgId:0,
        orgName:"",
        code:0,
        name:"",//姓名
        officeDate:"",//任职日期
        position:"",
        selfCode:"",//登录人党组织编码
        selfId:0,
        selfName:"",
        records:[],
        pageNum:1,
        pageSize:10,
        total:0,
        loading:true,
        positionList:[]
      }
    },
    mounted(){
      this.getUser();
      this.getTerm();
    },
    methods: {
      //党内职务
      getTerm(){
        let params = {
          types:['party_posts']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.positionList=response.party_posts;
        })
      },
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
          this.pageChange();//列表数据
        })
      },
      handleTreeClick (row) {
        this.orgId=row.id
        this.code = row.code
        this.orgName = row.label
        this.pageChange()//列表数据
      },
      pageChange(){
        let position="";
        for(let i=0;i<this.positionList.length;i++){
          if(this.positionList[i].id == this.position){
            position = this.positionList[i].name
          }
        }
        let params = {
          "current": this.pageNum,
          "model": {
            "memberId": {
              "data": this.name,
              "key": 0
            },
            "position": {
              "data": position,
              "key":this.position
            },
            "officeDate": this.officeDate,
            "orgId": {
              "data": this.orgName,
              "key": this.orgId
            }
          },
          "size": this.pageSize,
        }
        this.loading = true;
        getMembersList(params).then(response => {
          this.records = response.records;
          this.total = response.total;
          this.loading = false
        }).finally(() => {
          this.loading = false;
        });
      },
      //按钮点击事件
      editBtn (t, row) {
        switch (t) {
          case 1://新增
            this.$refs['refEdit'].show(this.selfName,this.selfId)
            break

          case 4://查询
            this.pageChange();
            break

          case 5://重置
            this.name = "";
            this.officeDate = "";
            this.position = ""
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
  .members{
    height: 100%;
    background-color: #eee;
  }
  .members >>> .base-label-box .base-label-box__label{
    width: auto;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
