<template>
  <div class="collection">
    <base-page-tree @handleTreeClick="handleTreeClick" ref="refTree">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="收缴时间">
          <el-date-picker
            v-model="year"
            type="year"
            placeholder="选择时间"
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
          <base-page-button title="导入" v-if="selfCode=='1001'" imgType="import" @click="editBtn(2)"/>
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
          header-row-class-name="page-table-header"
          ref="returnTable"
          :header-cell-style="{'text-align':'center'}"
          :data="records"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="党组织名称" min-width="280px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'org.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="年份" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'collectionDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="第一季度" min-width="100px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="records[scope.$index].stateOne.data=='已缴'?'':'red'">{{isEmpty(records[scope.$index],'stateOne.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="第二季度" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="records[scope.$index].stateSec.data=='已缴'?'':'red'">{{isEmpty(records[scope.$index],'stateSec.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="第三季度" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="records[scope.$index].stateTh.data=='已缴'?'':'red'">{{isEmpty(records[scope.$index],'stateTh.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="第四季度" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="records[scope.$index].stateFou.data=='已缴'?'':'red'">{{isEmpty(records[scope.$index],'stateFou.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(7,row)" :class="selfCode==row.orgCode?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="detail" @click="editBtn(6,row)">详情</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-show="!loading"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <!-- 新增/编辑 -->
    <collection-add ref="refEdit" @refresh="pageChange" />
    <!-- 详情 -->
    <collection-info ref="refInfo" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" :action="action" :otherData='{}' :templateUrl="templateUrl" :templateName="templateName" title="导入党费缴纳信息"/>
  </div>
</template>

<script>
import {getCollectionList,getHistoryExport} from "@/api/backstage/party/dues/collection/collection.js"
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
import CollectionAdd from './collection-add'
import CollectionInfo from './collection-info'
export default {
  name: "index",
  components: {CollectionAdd,CollectionInfo},
  data () {
    return {
      title:"",//标题
      organization:"",//上传组织
      year:"",//公示年份
      pageNum:1,
      pageSize:10,
      total:0,
      loading:true,
      orgId:'',
      code:'',
      selfCode:"",//登录人党组织编码
      selfName:"",//登录人党组织名称
      selfId:"",//登录人党组织id
      records: [],
      options:[{
        value:"2246476837383406026",
        label:"第一季度"
      },{
        value:"2246476837383406029",
        label:"第二季度"
      },{
        value:"2246476837383406032",
        label:"第三季度"
      },{
        value:"2246476837383406035",
        label:"第四季度"
      }],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/duesCollection/importDuesCollection`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dfjn.xls`,//党组组织架构附件模板
      templateName:'党费收缴导入模块.xls',
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
    this.getUser ();
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
        this.selfName=res.data.orgName;
        this.selfId=res.data.orgId;
        this.code=response.data.orgCode;
        this.orgId=response.data.orgId;
        this.orgName=response.data.orgName;
        this.year=new Date().getFullYear()+"";
        // this.listData.orgId=response.data.orgId;
        this.pageChange();
      })
    },
    // 列表请求
    pageChange () {
      let params = {
        current: this.pageNum,
        model: {
          collectionDate: this.year,
          orgCode: this.code,
        },
        size: this.pageSize
      }
      this.loading = true;
      getCollectionList(params).then(response => {
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
      this.orgName = row.label
      this.pageChange()//列表数据
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          let data = {
            orgName:this.selfName,
            orgId:this.selfId
          }
          this.$refs['refEdit'].show(t,data)
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
          this.$refs.refTree.getTree("clear")
          break

        case 6://详情
          this.$refs['refInfo'].show(t,row)
          break

        case 7://编辑
          this.$refs['refEdit'].show(t,row)
          break

      }
    },
    exportExc(){
      let params = {
        collectionDate:this.year,//缴纳年份(必填)
        orgCode:this.code,//组织编码
      }
      getHistoryExport(params);
    },
  }
}
</script>

<style scoped>
.collection{
  height: 100%;
  background-color: #eee;
}
.collection >>> .base-page-tree__right{
  /* min-width: 1120px; */
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
.red{
  color: #FC5921;
}
.collection >>> .base-label-box .base-label-box__label{
  width: auto;
}

.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999;
}
.mr-20{
  margin-bottom: 10px;
}
</style>
