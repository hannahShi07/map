<template>
  <div class="use">
    <base-page-tree @handleTreeClick="handleTreeClick" ref="refTree">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="使用日期">
          <el-date-picker
            v-model="useDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            @change="pageChange()"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </base-label-box>
        <base-label-box label="类型">
          <el-select
              filterable
              v-model="categoryId"
              placeholder="请选择"
              style="width:100%;"
              clearable
              @change="pageChange()">
              <el-option
                  v-for="item in options"
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
          :data="tableData"
           :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="使用日期" min-width="120px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'useDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总金额" width="180px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'totalAmount')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(6,row)" :class="selfCode==row.orgCode?'':'color-grad'">编辑</base-table-a>
              <base-table-a type="delete"@click="editBtn(7,row)" :class="selfCode==row.orgCode?'':'color-grad'">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-show="!loading"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>
    <!-- 新增/编辑 -->
    <use-add ref="refEdit" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" :action="action" :otherData='{}' :templateUrl="templateUrl" :templateName="templateName" title="导入党费使用信息"/>
  </div>
</template>

<script>
import {getUseList,getUseExport,deleteUse} from "@/api/backstage/party/dues/use/use.js"
import commonReq from "@/api/public/commonReq";
import db from '@/utils/localstorage'//  获取用户登录id
import UseAdd from './use-add'
export default {
  name: "index",
  components: {UseAdd},
  data () {
    return {
      loading: true,
      orgName:"",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      name:"",//组织名称
      useDate:"",//时间
      categoryId:"",//类型
      orgId:"",
      code:"",
      selfCode:"",
      selfName:"",
      selfId:"",
      options: [],
      ids:[],
      multipleSelection:[],
      tableData:[],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/duesUse/importMemberDuesUse`,//导入地址
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dfsy.xls`,//党费使用附件模板
      templateName:"党费使用导入模板.xls",
    }
  },
  mounted(){
    this.getUser()
    this.getOrgType()
  },
  methods: {
    //左侧树的点击事件
    handleTreeClick (row) {
      this.orgName=row.label
      this.orgId=row.id
      this.code = row.code
      this.pageChange()//列表数据
    },
    //多选框-改变选中状态
    handleSelectionChange(val) {
      this.ids=[];
      this.multipleSelection = val;
      if(this.multipleSelection!='' && this.multipleSelection!=undefined && this.multipleSelection!=null && this.multipleSelection!='null' && this.multipleSelection.length>0){
        for(var i=0;i<this.multipleSelection.length;i++){
          this.ids.push(this.multipleSelection[i].id)
        }
      }
    },
    //按钮点击事件
    editBtn (t, row) {
      switch (t) {
        case 1://新增
          this.$refs['refEdit'].show(1)
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
          this.useDate="";
          this.categoryId="";
          this.$refs.refTree.getTree("clear")
          break

        case 6://详情
          this.$refs['refEdit'].show(2,row)
          break

        case 7://删除
          this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params = {
              id:row.id
            }
            deleteUse(params).then(response => {
              this.pageChange();
            }).finally(() => {
              this.loading = false;
            });
          }).catch(() => {

          })
          break

      }
    },
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          orgCode: this.code,
          type: this.categoryId,
          useDate: this.useDate
        },
        size: this.pageSize
      }
      this.loading = true;
      getUseList(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    exportExc(){
      let params = {
        orgCode: this.code,//组织名称
        type:this.categoryId,//类型
        useDate:this.useDate//使用日期
      }
      getUseExport(params);
    },
    //组织类别
    getOrgType(){
      let params = {
        types:['dues_use_type']
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.options=response.dues_use_type;
      })
    },
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
        this.orgName=response.data.orgName;
        this.orgId=response.data.orgId;
        this.code = response.data.orgCode;
        this.pageChange()
      })
    },
  }
}
</script>

<style scoped>
.use{
  height: 100%;
  background-color: #eee;
}
.use >>> .base-page-tree__left{
  min-width: 320px;
}
.use >>> .base-page-tree__right{
  min-width: 900px;
}
.page-search-box >>> .el-input__inner{
  width: 280px;
}
.use >>> .base-label-box .base-label-box__label{
  width: auto;
}
.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999;
}
</style>
