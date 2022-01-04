<template>
  <div class="week">
    <!-- 条件搜索 -->
    <div class="page-search-box">
      <base-label-box label="创建组织">
        <el-input placeholder="请输入创建组织" v-model="orgName" @keyup.enter.native="pageChange()" clearable maxlength="100"/>
      </base-label-box>
      <base-label-box label="推荐播放时间">
        <el-date-picker
          v-model="playDate"
          type="date"
          placeholder="选择推荐播放时间"
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
        <base-page-button title="导入" imgType="import" @click="editBtn(2)"/>
        <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
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
        <el-table-column label="创建组织" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="推荐播放时间" min-width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'playDate')}}</span>
          </template>
        </el-table-column>

        <el-table-column label="链接地址" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'link')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="播放内容" min-width="240px" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],'content')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
          <template slot-scope="{row}">
            <!--表格操作按钮组件-->
            <base-table-a type="detail" @click="editBtn(8,row)">详情</base-table-a>
            <base-table-a type="edit" @click="editBtn(6,row)" :class="selfOrgId==row.orgId?'':'color-grad'">编辑</base-table-a>
            <base-table-a type="delete" @click="editBtn(7,row)" :class="selfOrgId==row.orgId?'':'color-grad'">删除</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>
    <!-- 新增/编辑 -->
    <week-add ref="refEdit" @refresh="pageChange" />
    <!-- 导入 -->
    <base-org-import ref="refImport" @refresh="pageChange" :isHaveOrg="false" title="导入周推荐播放内容信息" :otherData='{}' :action="action" :templateUrl='templateUrl' :templateName='templateName'/>
  </div>
</template>

<script>
import {weekPage,deleteWeek,getHistoryExport} from "@/api/backstage/education/week/week.js"
import WeekAdd from './week-add'
import commonReq  from "@/api/public/commonReq.js"
import db from '@/utils/localstorage'//  获取用户登录id
export default {
  name: "index",
  components: {
    WeekAdd
  },
  data() {
    return {
      loading:false,//加载
      pageNum: 1,
      pageSize: 10,
      total: 0,
      playDate:"",//建立时间
      orgName:"",
      selfOrgId:"",
      tableData:[
        {
          "content": "",// 	播放内容
          "id": 0,
          "link": "",// 	播放地址
          "orgId": 0,// 	组织id
          "orgName": "",// 组织名称
          "playDate": "",// 	推荐播放日期
          "queryMonth": ""// 查询月份
        }
      ],
      action:`${process.env.VUE_APP_BASE_API}/partycloud/broadcast/week/importExcel`,//导入接口
      templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/ztjbfnr.xlsx`,//周推荐播放模板
      templateName:"周推荐播放导入模板.xlsx"
    }
  },
  mounted() {
    this.getUser()
    this.pageChange()
  },
  methods: {
    //分页
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          orgName: this.orgName,
          playDate: this.playDate,
        },
        size: this.pageSize
      }
      this.loading = true;
      weekPage(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    // 按钮点击事件
    editBtn(t,row){
      switch(t){
        case 1:
          this.$refs['refEdit'].show(1);
          break;
        case 2://导入
          this.$refs['refImport'].show(t, row)
          break
        case 3:
          this.exportExc();
          break
        case 4:
          this.pageNum = 1;
          this.pageChange();
          break;
        case 5:
          this.pageNum = 1;
          this.orgName="";
          this.playDate="";
          this.pageChange();
          break;
        case 6:
          this.$refs['refEdit'].show(t,row);
          break;
        case 7:
           this.$confirm('是否删除该条信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
          }).then(() => { //确认删除
            let params = {
              ids:[row.id]
            }
            deleteWeek(params).then(response => {
              this.$message(this.successTip())
              this.pageChange();
            }).finally(() => {

            });
          }).catch(() => {

          })
          break;
        case 8:
          let p = window.location.protocol;
          let a = document.createElement("a");
          if(row.link.indexOf("http://")!=-1||row.link.indexOf("https://")!=-1){
            a.setAttribute("href", row.link);
          }else{
            a.setAttribute("href", `${p}//`+row.link);
          }
          a.setAttribute("target", "_blank");
          a.click();
          document.getElementsByTagName("body")[0].appendChild(a);
          break;
      }
    },
    //获取用户信息
    getUser(){
      let params = {
        userId:db.get('USER').id,
      }
      commonReq.getUserinformation(params).then(response => {
        const res = response;
        this.selfOrgId=res.data.orgId;
      })
    },
    // 导出
    exportExc(){
      let params = {
        orgName: this.orgName,
        playDate: this.playDate
      }
      getHistoryExport(params);
    },
  }
}
</script>

<style scoped>
  .week{
    height: 100%;
  }
  .page-search-box >>> .el-input__inner{
    width: 280px;
  }
  .week >>> .base-label-box__label{
    width: auto;
  }
  .color-grad{
    pointer-events: none;
    cursor: default;
    color:#999;
  }
</style>
