<template>
  <div class="publicity">
    <base-page-tree @handleTreeClick="handleTreeClick" ref="refTree">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="标题">
          <el-input v-model="title" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
        </base-label-box>
        <base-label-box label="上传组织">
          <el-input v-model="organization" placeholder="请输入" maxlength="100" clearable @keyup.enter.native="pageChange()"/>
        </base-label-box>
        <base-label-box label="公示年份">
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择日期"
            format="yyyy"
            value-format="yyyy"
            clearable
            :picker-options="pickerOptions"
            @change="pageChange()"
            :editable="false">
          </el-date-picker>
        </base-label-box>
      </div>

      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(3)" />
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(4)"/>
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
          ref="returnTable"
          :data="records"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="标题" min-width="240px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="!records[scope.$index].orgId.data&&!records[scope.$index].noticeDate">--</span>
              <span v-else>{{isEmpty(records[scope.$index],'orgId.data')}}关于{{isEmpty(records[scope.$index],'noticeDate')}}年党费公示</span>
            </template>
          </el-table-column>

          <el-table-column label="上传组织" min-width="240px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="公示时间" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'noticeDate')+isEmpty(records[scope.$index],"noticeQuarter.data")}}</span>
            </template>
          </el-table-column>
          <el-table-column label="上传日期" width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'submitTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(6,row)" :class="selfCode==row.orgCode?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="detail" @click="editBtn(7,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(8,row)" :class="selfCode==row.orgCode?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-show="!loading"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <!-- 新增/编辑 -->
    <publicity-add ref="refEdit" @refresh="pageChange" />
    <!-- 详情 -->
    <publicity-info ref="refInfo" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" :action="action" :otherData='{}' :templateUrl="templateUrl" :templateName="templateName" title="导入党费公示信息"/>
  </div>
</template>

<script>
import {getPublicityList,getHistoryExport,deletePublicityList} from "@/api/backstage/party/dues/publicity/publicity.js"
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
import PublicityAdd from './publicity-add'
import PublicityInfo from './publicity-info'
export default {
  name: "index",
  components: {PublicityAdd,PublicityInfo},
  data () {
    return {
      title:"",//标题
      organization:"",//上传组织
      year:"",//公示年份
      pageNum:1,
      pageSize:10,
      total:0,
      code:0,
      loading:true,
      selfCode:"",//登录人党组织编码
      records: [],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/duesNotice/importDuesNotice`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dfgs.xls`,//党费公示附件模板
      templateName:"党费公示导入模板.xls",
      pickerOptions:{
        disabledDate(time) {
          if (new Date().getFullYear()+1 <= time.getFullYear()) {
            return true
          }
          return false
        }
      }
    }
  },
  mounted(){
    this.year=new Date().getFullYear()+"";
    this.getUser();
  },
  methods: {
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfCode=res.data.orgCode;
        this.code=response.data.orgCode;
        this.orgId=response.data.orgId;
        // this.listData.orgId=response.data.orgId;
        this.pageChange();
      })
    },
    // 列表请求
    pageChange () {
      let params = {
        current: this.pageNum,
        model: {
          noticeDate: this.year,
          orgCode: this.code,
          orgName: this.organization,
          title: this.title
        },
        size: this.pageSize
      }
      this.loading = true;
      getPublicityList(params).then(response => {
        this.records = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      });
    },
    bindRowKeys(row){
      return row.id;
    },
    //左侧树的点击事件
    handleTreeClick (row) {
      this.orgId=row.id
      this.code = row.code
      this.pageChange()//列表数据
    },
    // 清除按钮
    resetData (){
      this.pageChange();
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          this.$refs['refEdit'].show(t)
          break

        case 2://导入
          this.$refs['refImport'].show(t, row)
          break

        case 3://导出
          this.exportExc()
          break

        case 4://查询
          this.pageChange();
          break

        case 5://重置
          this.year = new Date().getFullYear()+"";
          this.organization = "";
          this.title = "";
          this.$refs.refTree.getTree("clear")
          break

        case 6://编辑
          this.$refs['refEdit'].show(t,row)
          break

        case 7://详情
          this.$refs['refInfo'].show(row)
          break

        case 8://删除
          this.$confirm('是否删除该条信息？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
              let params={
              id:row.id
            }
            deletePublicityList(params).then(response => {
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break
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
  }
}
</script>

<style scoped>
.publicity{
  height: 100%;
  background-color: #eee;
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
.publicity >>> .base-label-box .base-label-box__label{
  width: auto;
}
.publicity >>> .base-page-tree__right{
  min-width: 1140px;
}
.publicity >>> .base-page-tree__left{
  min-width: 320px;
}
.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999;
}
</style>
