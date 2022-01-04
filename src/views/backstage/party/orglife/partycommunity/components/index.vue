<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="党员姓名">
          <el-input v-model="name" @keyup.enter.native="editBtn(6)" placeholder="请输入" style="width: 280px" clearable/>
        </base-label-box>
<!--        <base-label-box label="党组织名称">-->
<!--          <el-input placeholder="请输入" style="width: 280px" clearable/>-->
<!--        </base-label-box>-->
        <base-label-box label="报到地点">
          <el-select
            v-model="addressId"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width:100%;"
            @change="selectaddress"
            clearable>
            <el-option
              v-for="(item,index) in dicts.REPORT_SITE"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
<!--          <el-input v-model="livingCommunity" @keyup.enter.native="editBtn(6)" placeholder="请输入" style="width: 280px" clearable/>-->
        </base-label-box>
        <base-label-box label="报到日期">
          <el-date-picker v-model="reportDate" @change="selectdate" type="date" placeholder="请选择" style="width: 280px" clearable value-format="yyyy-MM-dd"/>
        </base-label-box>
      </div>
      <!-- 按钮区 -->
      <div class="pd-20 clearfix">
        <div class="fl">
          <base-page-button title="新增" imgType="add" type="primary" @click="editBtn(1)"/>
          <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
          <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
          <base-page-button v-if="currentOrg.code == '1001'" title="导出统计表" imgType="statistics" @click="editBtn(4)"/>
          <base-page-button title="报到模版下载" imgType="download" @click="editBtn(5)"/>
        </div>

        <div class="fr">
          <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(6)"/>
          <base-page-button title="重置" imgType="reset" @click="editBtn(7)"/>
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
          <el-table-column label="党员姓名" width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'memberName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" width="160"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党组织名称" min-width="200px" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报到地点" width="160"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'reportSiteName')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="报到日期" width="160"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'reportDate')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(8,row)">编辑</base-table-a>
              <base-table-a @click="editBtn(9,row)">详情</base-table-a>
              <base-table-a type="delete" @click="editBtn(10,row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-page-tree>

    <!--导入-->
    <base-org-import ref="refImport" @refresh="pageChange" :title="title" :action="action" :templateUrl='templateUrl' :templateName="templateName"/>


    <!--新增-->
    <partycommunity-add ref="refAdd" @refresh="pageChange"/>
    <!--详情-->
    <partycommunity-detail ref="refDetail" @refresh=""/>
  </div>
</template>

<script>
  import db from '@/utils/localstorage'
  import PartycommunityAdd from "./partycommunity-add"
  import PartycommunityDetail from "./partycommunity-detail"
  import commonReq  from "@/api/public/commonReq.js"
  import {getCommunityList,getCommunityDetele,getCommunityExport,getCommunityTable} from "@/api/backstage/party/orglife/partycommunity/partycommunity.js"

  export default {
    name: "index",
    components: {
      PartycommunityAdd,
      PartycommunityDetail

    },
    data() {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData:[],
        orgId:'',//组织树id
        orgName:'',//组织名称
        orgCode:'',//组织编码
        name:'',//党员姓名
        addressId:'',//报到地点
        reportDate:'',//报到时间
        dicts: {//字典
          REPORT_SITE:{},//报到地点
        },
        action:`${process.env.VUE_APP_BASE_API}/partycloud/memberPlot/importExcel`,//导入地址
        templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dyjxq.xlsx`,//下载模板地址
        url:`${process.env.VUE_APP_IP_URL_PORT}/file/template/export/dyjxqbd.docx`,//报到模版下载地址
        title:'党员进小区信息导入',
        templateName:'党员进小区信息导入模板.xlsx',//模板下载的文件名
        urlName:'党员进小区报到模板.docx',//报到模版下载文件名
        currentOrg:{//登录人信息
          key: '',
          data: '',
          code: ''
        }
      }
    },
    mounted() {
      this.pageChange ();
      this.getUser()
      this.getDict();
    },
    methods: {
      //调用字典接口
      getDict(){
        let params = {
          types:['REPORT_SITE']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.REPORT_SITE = res.REPORT_SITE;

        })
      },
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
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {
            orgName:this.orgName,
            orgCode:this.orgCode,
            name: this.name,
            reportDate: this.reportDate,
            addressId: this.addressId
          },
          size: this.pageSize
        }
        this.loading = true;
        getCommunityList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;

        }).finally(() => {
          this.loading = false;
        });
      },

      //组织树点击事件
      handleTreeClick (row){
        this.orgId=row.id;
        this.orgName=row.name;
        this.orgCode=row.code;
        this.pageChange ();

      },
      selectaddress(val){
        this.editBtn(6)
      },
      selectdate(val){
        this.editBtn(6)
      },


      //跳转
      editBtn (t, row) {
        switch (t) {
          case 1:
          case 8:
            this.$refs['refAdd'].show(t, row)
            break

          case 2://导入
            this.$refs['refImport'].show(t, row)
            break

          case 3://导出
            let params = {
              current: this.pageNum,
              model: {
                id:'',
                orgName:this.orgName,
                orgCode:this.orgCode,
                name: this.name,
                reportDate: this.reportDate,
                addressId: this.addressId
              },
              size: this.pageSize
            }
            getCommunityExport(params);
            break

          case 4://导出统计表
            let params1 = {

            }
            getCommunityTable(params1);
            break

          case 5://报到模版下载
            // window.location.href=this.url
            commonReq.downloadFile(this.url,this.urlName)
            break

          case 6://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 7://重置
            this.orgId='';
            this.orgName='';
            this.orgCode='';
            this.name='';
            this.addressId='';
            this.reportDate='';
            this.pageNum=1;
            this.total=0;
            // this.pageChange ();
            this.$refs.refTree.getTree("clear")//重置左侧组织树
            break

          case 9://详情
            this.$refs['refDetail'].show(t, row)
            break

          case 10://删除
            this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认删除
              let params = {
                ids:[row.id]
              }

              getCommunityDetele(params).then(response => {
                // this.$message.success("删除成功")
                this.$message(this.successTip())
                const res = response;
                this.pageChange ();

              })
            }).catch(() => {

            })
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
  }


</style>
