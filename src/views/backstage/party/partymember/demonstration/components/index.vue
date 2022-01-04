<template>
  <div class="dues">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <base-label-box label="岗位名称">
        <el-input v-model="name" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="党员姓名">
        <el-input v-model="memberName" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
      </base-label-box>
      <base-label-box label="企业名称">
        <el-input v-model="companyName" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
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

      <!-- 表格 -->
      <div class="mr-20 ml-20" v-cloak>
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="demTable"
          :data="demTable"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="岗位名称" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党员姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="岗位标牌" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'sign')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="企业名称" min-width="240px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'companyName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="职位" min-width="140px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'position')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="新增时间" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(demTable[scope.$index],'addDate')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(2,row)" :class="(row.orgCode+'').indexOf(selfCode)!=-1?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="detail" @click="editBtn(3,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(6,row)" :class="(row.orgCode+'').indexOf(selfCode)!=-1?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        <demonstration-add ref="refAdd" @refresh="pageChange" />
        <demonstration-info ref="refInfo" @refresh="pageChange" />
      </div>
    </base-page-tree>
  </div>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
import DemonstrationAdd from './demonstration-add'
import DemonstrationInfo from './demonstration-info'
import {getDemonstrationList,deleteDemonstration} from "@/api/backstage/party/partymember/demonstration/demonstration.js"
export default {
  name: "index",
  components: {DemonstrationAdd,DemonstrationInfo},
  data () {
    return {
      name:"",//岗位名称
      memberName:"",//党员姓名
      companyName:"",//企业名称
      selfCode:"",//登录人所属组织
      total:0,
      pageNum:1,
      pageSize:10,
      demTable:[
        {
          "addDate": "",//	新增日期
          "companyName": "",//	企业名称
          "enDate": "",//	示范岗结束日期
          "id": 0,
          "jobContent": "",//	工作内容
          "memberId": {//	党员id
            "data": "",
            "key": 0
          },
          "name": "",//	岗位名称
          "position": "",//职位
          "sign": "",//	岗位标牌
          "stDate": ""//	示范岗开始日期
        }
      ]
    }
  },
  mounted(){
    this.getUser();
  },
  methods: {
    // 列表请求
    pageChange () {
      let params = {
        current: this.pageNum,
        model: {
          companyName: this.companyName,
          memberName: this.memberName,
          name: this.name,
        },
        size: this.pageSize
      }
      this.loading = true;
      getDemonstrationList(params).then(response => {
        this.demTable = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          this.$refs['refAdd'].show(t)
          break

        case 2://编辑
          this.$refs['refAdd'].show(t,row)
          break;

        case 3://详情
          this.$refs['refInfo'].show(t,row)
          break;

        case 4://查询
          this.pageNum = 1;
          this.pageChange();
          break;

        case 5://重置
          this.name = "";
          this.memberName = "";
          this.companyName = "";
          this.pageNum = 1;
          this.pageChange();
          break;

        case 6:
          this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params = {
              ids:[row.id]
            }
            deleteDemonstration(params).then(response => {
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break;
      }
    },
    exportExc(){
      let params = {
        noticeDate: this.year,
        orgCode: this.code,
        orgName: this.organization,
        title: this.title
      }
      getHistoryExport(params);
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfCode=res.data.orgCode;
        this.pageChange()
      })
    },
  }
}
</script>

<style scoped>
.dues{
  width: 100%;
  height: calc(100vh - 155px);
  background-color: #fff;
  overflow: auto;
}
.page-search-box{
  padding-left: 0;
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999;
}
</style>
