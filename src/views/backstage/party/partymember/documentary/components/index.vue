<template>
  <div class="party">
    <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
      <!-- 条件盒子 -->
      <div class="page-search-box">
        <base-label-box label="人员姓名">
          <el-input v-model="name" placeholder="请输入人员姓名" style="width: 280px" clearable @keyup.enter.native="editBtn(4)"/>
        </base-label-box>

        <base-label-box label="人员类型">
          <el-select
            v-model="type"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width: 280px"
            @change="editBtn(4)"
            clearable>
            <el-option
              v-for="(item, index) in dicts.MENBER_MTYP"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </base-label-box>

        <base-label-box label="所处阶段">
          <el-select
            v-model="developNature"
            value-key="id"
            filterable
            placeholder="请选择"
            style="width: 280px"
            @change="editBtn(4)"
            clearable>
            <el-option
            v-for="(item, index) in dicts.devmember_nature"
            :key="index"
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
          <base-page-button title="导出" imgType="export" @click="editBtn(3)"/>
          <base-page-button title="查看流程" imgType="process" @click="editBtn(6)"/>
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
        >
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--reserve-selection-->
            <!--width="45"-->
            <!--align="center">-->
          <!--</el-table-column>-->
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="学历" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'education.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属组织" min-width="220px"  align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'org.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所处阶段" width="150px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'developNature.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="类型" width="150px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="edit" @click="editBtn(8,row)" :class=" curOrgPerid(row.org.key) ?  'gray': '' ">编辑</base-table-a>
              <base-table-a @click="editBtn(10,row)">详情</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="editBtn(4)"/>
      </div>

    </base-page-tree>

    <base-org-import ref="refImport" @refresh="editBtn(4)" :title="title" :action="action" :templateUrl='templateUrl' :otherData="otherData" :isHaveOrg="false" :templateName="templateName"/>
  </div>
</template>

<script>
  import commonReq  from "@/api/public/commonReq.js"
  import  {getDevelopPersonByPage,getDevelopExport } from "@/api/backstage/party/development/documentary/documentary.js"

  export default {
    name: "Index",
    props: {
      pageCurrent: {
        type: Number,
        default: null
      }
    },
    data(){
      return {
        loading:true,
        // 列表数据
        tableData:[],
        // 总数
        total:0,
        // 当前页数
        pageNum:1,
        // 每页页数
        pageSize:10,
        // 导入标题
        title:"导入发展党员",
        // 导入接口
        action:`${process.env.VUE_APP_BASE_API}/partycloud/djMemberDevelop/importMemberDevelop`,
        // 导入模板地址
        templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/fzdyjs.xlsx`,
        // 下载模板地址名称
        templateName:'发展党员纪实导入模板.xlsx',
        // 导入额外参数
        otherData:{
          "orgId":"1"
        },
        dicts:{
          // 人员类型
          MENBER_MTYP:[],
          // 发展性质
          devmember_nature:[],
        },
        // 人员姓名
        name:"",
        // 人员类型
        type:"",
        // 发展性质
        developNature:"",
        // 组织编码
        orgCode: "",
        // 选择需要导出的数据
        ids:[],
        // 选择的数据
        multipleSelection:[],

      }
    },
    activated(){
      if(this.pageCurrent){
        this.pageNum = this.pageCurrent
      }
      this.getCondition()
      this.getDevelopList()
    },
    mounted(){
      this.getCondition()
      this.getDevelopList()
    },
    methods:{
      // 左侧树的点击事件
      handleTreeClick (row) {
        this.orgCode =  row.code
        //列表数据
        this.getDevelopList()
      },
      // 字典表数据
      getCondition(){
        let params = {
          types:['MENBER_MTYP','devmember_nature']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.MENBER_MTYP = res.MENBER_MTYP
          this.dicts.devmember_nature = res.devmember_nature;
        })
      },
      // 获取列表数据
      getDevelopList(){
        let params = {
          "current": this.pageNum,
          "model": {
            "developNature": {
              "key": this.developNature
            },
            "memberName": this.name,
            "orgCode": this.orgCode,
            "type": this.type
          },
          "size": this.pageSize,
        }
        this.loading = true
        getDevelopPersonByPage(params).then(response => {
          const res = response
          this.tableData = res.records
          this.total = res.total
        }).finally(()=>{
          this.loading = false
        })
      },
      // 多选框
      bindRowKeys(row){
        return row.id;
      },
      // 多选框-改变选中状态
      handleSelectionChange(val) {
        this.ids=[];
        this.multipleSelection = val;
        if(this.multipleSelection!='' && this.multipleSelection!=undefined && this.multipleSelection!=null && this.multipleSelection!='null' && this.multipleSelection.length>0){
          for(let i=0;i<this.multipleSelection.length;i++){
            this.ids.push(this.multipleSelection[i].id)
          }
        }
      },
      editBtn(t,row){
        switch (t) {
          case 1:
            this.$emit('handleSwitch', {name: 'DocumentaryAdd', params: {}})
            break

          // 导入
          case 2:
            this.$refs['refImport'].show()
            break

          // 导出
          case 3:
            let params = {
              "model": {
                "developNature": {
                  "key": this.developNature
                },
                "memberName": this.name,
                "orgCode": this.orgCode,
                "type": this.type,
                "ids": this.ids,
              },
            }
            getDevelopExport(params);
            break

          // 查询
          case 4:
            this.getDevelopList()
            break

          // 重置
          case 5:
            this.reset()
            break

          // 查看流程
          case 6:
            this.$emit('handleSwitch', {name: 'Process'})
            break

          case 7:
            break

          case 8:
            this.$emit('handleSwitch', {name: 'DocumentaryAdd', params: {},type:row.id})
            break

          case 9:
            break

          case 10:
            this.$emit('handleSwitch', {name: 'HistoryDetail', params: row ,type:'dev'})
            break

          case 11:
            break
        }
      },
      // 重置搜索条件
      reset(){
        // 人员姓名
        this.name = ""
        // 人员类型
        this.type = ""
        // 发展性质
        this.developNature = ""
        // 组织编码
        this.orgCode =  ""
        // this.getDevelopList()
        this.$refs.refTree.getTree("clear")
      }
    }
  }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #eee;
  }

  .gray{
    pointer-events: none;
    cursor: default;
    color: #cccccc;
  }
</style>
