<template>
  <div class="party">
      <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
        <!-- 条件盒子 -->
        <div class="page-search-box">
          <!-- <base-label-box label="所属组织">
            <el-input v-model="name" placeholder="请输入组织名称" style="width: 280px" clearable/>
          </base-label-box> -->
          <base-label-box label="党员信息">
            <el-input v-model="memberInfo" placeholder="请输入姓名/身份证号/联系方式" style="width: 280px" clearable @keyup.enter.native="editBtn(4)"/>
          </base-label-box>
          <base-label-box label="状态">
            <el-select
                v-model="type"
                value-key="id"
                filterable
                @change="selecttype"
                placeholder="请选择"
                style="width: 280px"
                clearable>
                <el-option
                    v-for="(item, index) in dicts.PERSON_STATUS"
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
            <el-table-column label="姓名" min-width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'name')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="所属组织" min-width="200px"  align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'org.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="学历" width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'education.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类型" width="180px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="160px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'state.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" show-overflow-tooltip>
              <template slot-scope="{row}">
                <!--表格操作按钮组件 -->
                <base-table-a type="edit" :class="{'color-grad':getGray(row)}" @click="editBtn(8,row)">编辑</base-table-a>
                <base-table-a @click="editBtn(10,row)">详情</base-table-a>

              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>

      </base-page-tree>

      <base-org-import ref="refImport" @refresh="editBtn(4)" :otherData="otherData" :isHaveOrg="true" :title="title" :action="action" :fixed="true" :templateUrl='templateUrl' :templateName="templateName"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import db from "@/utils/localstorage"
    import commonReq  from "@/api/public/commonReq.js"
    import {getManageList,getManageExport} from "@/api/backstage/party/basic/manage/manage.js"
    export default {
        name: "index",
        props: {
          pageCurrent: {
            type: Number,
            default: null
          }
        },
        data() {
          return {
            loading:true,//加载遮罩控制条件
            pageNum: 1,
            pageSize: 10,
            total: 0,
            dicts: {//字典状态
              PERSON_STATUS: {},
            },
            orgId:'',//点击组织树id
            code:"",//组织树code
            type:'',//状态id
            memberInfo:'',//人员信息
            name:'',//所属组织
            tableData:[],//列表数据
            multipleSelection:[],//多选框选中数据
            ids:[],//选中多选框id数组
            action:`${process.env.VUE_APP_BASE_API}/partycloud/djMember/importMemberExcel`,//附件上传地址
            templateUrl:`${process.env.VUE_APP_IP_URL_PORT}/file/template/import/dygl.xlsx`,//下载模板地址
            title:'党员信息导入',
            templateName:'党员信息导入模板.xlsx',//模板下载的文件名
            isEdit:'',//编辑按钮
            otherData: {
              orgId: ''
            }

          }
        },
        activated(){
          if(this.pageCurrent){
            this.pageNum = this.pageCurrent
          }
          this.pageChange ();
          this.getDict();
          this.getUser();

        },
        mounted() {
          this.pageChange ();
          this.getDict();
          this.getUser();

        },
        methods: {
          //获取当前组织
          getUser(){
            let params = {
              userId:db.get('USER').id,
            }
            commonReq.getUserinformation(params).then(response => {
              const res = response;
              this.otherData={
                orgId:res.data.orgId
              }

              // this.djMemberSaveDTO.orgId={
              //   data:res.data.orgName,
              //   key:res.data.orgId
              // };
              // this.djMemberSaveDTO.joinPartySaveDTO.orgId=res.data.orgId;


            }).finally(() => {

            });
          },
          //自定义调用字典接口
          getDict(){
            let params = {
              type:'memberSearchState'
            }
            commonReq.getCustomDict(params).then(response =>{
              const res = response;
              this.dicts.PERSON_STATUS = res;
            })
          },
          //分页调取接口数据
          pageChange () {
            // 调用数据接口
            let params = {
              current: this.pageNum,
              model: {
                  memberInfo:this.memberInfo,
                  // orgId:this.orgId,
                  // orgName:this.name,
                  state:this.type,
                  orgCode:this.code
              },
              size: this.pageSize
            }
            this.loading = true;
            getManageList(params).then(response => {
              const res = response;
              this.tableData=res.records;
              this.total=res.total;


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
            }
          },
          //主页组织树点击事件
          handleTreeClick (row) {
           this.name=row.label;
           this.orgId=row.id;
           this.code = row.code
           this.pageChange ();
           this.$refs.multipleTable1.clearSelection();//清空选中的
          },
          selecttype(val){
            this.editBtn(4)
          },
          //跳转
          editBtn (t, row) {
            switch (t) {
              case 1:
                this.$emit('handleSwitch', {name: 'ManageAdd',params: null})
                break
              case 8:
                this.$emit('handleSwitch', {name: 'ManageAdd', params: row})
                break

              case 2://导入
                this.$refs['refImport'].show(t, row)
                break

              case 3://导出
                let params = {
                  model: {
                    memberInfo:this.memberInfo,
                    orgCode:this.code,
                    type:this.type,
                    ids:this.ids
                  }
                }
                getManageExport(params);
                break

              case 4:
                this.pageNum=1;
                this.pageChange ();
                break

              case 5:
                this.memberInfo='';
                this.name='';
                this.orgId='';
                this.type='';
                this.code = '';
                this.pageNum=1;
                this.total=0;
                // this.pageChange ();
                this.$refs.refTree.getTree("clear")//重置左侧组织树
                this.$refs.multipleTable1.clearSelection();//清空选中的
                break

              case 6:
                break

              case 7:
                break

              case 9:
                break

              case 10:
                this.$emit('handleSwitch', {name: 'HistoryDetail', params: row})
                break

              case 11:
                break
            }
          },
          //判断编辑按钮是否置灰
          getGray(row){
            if(this.curOrgPer('1001')){
              return this.curOrgPerid(row.org.key);
            }
            return false;
          }

        }
    }
</script>

<style scoped>
.party {
  height: 100%;
  background: #eee;
}

.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999
}
</style>
