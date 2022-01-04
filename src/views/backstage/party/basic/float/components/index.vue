<template>
  <div class="party">
      <base-page-tree ref="refTree" @handleTreeClick="handleTreeClick">
        <!-- 条件盒子 -->
        <div class="page-search-box">
          <!-- <base-label-box label="所属组织">
            <el-input v-model="name" placeholder="请输入组织名称" style="width: 280px" clearable/>
          </base-label-box> -->
          <base-label-box label="党员信息">
            <el-input v-model="memberInfo" placeholder="请输入姓名/身份证号/手机号" style="width: 280px" clearable @keyup.enter.native="editBtn(4)"/>
          </base-label-box>
          <base-label-box label="状态">
            <el-select
                v-model="type"
                value-key="id"
                filterable
                placeholder="请选择"
                @change="selecttype"
                style="width: 280px"
                clearable>
                <el-option
                    v-for="(item, index) in dicts.LDLX"
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
            <base-page-button title="新增流入" imgType="flow" type="primary" @click="editBtn(1)"/>
            <base-page-button title="新增流出" imgType="outflow" @click="editBtn(2)"/>
            <!-- <base-page-button title="导出" imgType="export" @click="editBtn(3)"/> -->
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
                <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="流动类型" width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" width="160px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'phone')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240" align="center" show-overflow-tooltip>
              <template slot-scope="{row}">
                <!--表格操作按钮组件-->
                <base-table-a type="edit" :class="{'color-grad': curOrgPer(row.orgCode)}" @click="editBtn(8,row)">编辑</base-table-a>
                <base-table-a @click="editBtn(9,row)">详情</base-table-a>
                <base-table-a type="delete" :class="{'color-grad': curOrgPer(row.orgCode)}" @click="editBtn(10,row)">删除</base-table-a>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </base-page-tree>


      <!--新增流出-->
      <float-out ref="refOut" @refresh="pageChange"/>

      <!--新增流出详情-->
      <floatout-detail ref="refOutdetail" @refresh="pageChange"/>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import FloatOut from './float-out'//新建流出党员
    import FloatoutDetail from './floatout-detail'//流出详情
    import commonReq  from "@/api/public/commonReq.js"
    import {getFloatList,getFloatDetele} from "@/api/backstage/party/basic/float/float.js"
    export default {
        name: "index",
        components: {
          FloatOut,
          FloatoutDetail

        },
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
            orgId:'',//点击组织树id
            code:"",//组织树code
            type:'',//状态id
            typeName:'',//状态名称
            dicts: {//字典状态
              LDLX: {},
            },
            memberInfo:'',//人员信息
            name:'',//所属组织
            tableData:[],//列表数据
            multipleSelection:[],//多选框选中数据


          }
        },
        activated(){
          if(this.pageCurrent){
            this.pageNum = this.pageCurrent
          }
          this.pageChange ();
          this.getDict();

        },
        mounted() {
          this.pageChange ();
          this.getDict();

        },
        methods: {
          //自定义调用字典接口
          getDict(){
            let params = {
              type:'memberFlowAddState'
            }
            commonReq.getCustomDict(params).then(response =>{
              //console.log('字典表： '+JSON.stringify(response))
              const res = response;
              this.dicts.LDLX = res;
            })
          },
          //分页调取接口数据
          pageChange (num) {
            // 调用数据接口
            if((typeof num) === 'number'){
              this.pageNum = num
            }

            let params = {
              current: this.pageNum,
              model: {
                  memberInfo:this.memberInfo,
                  // orgId: {
                  //   data: this.name,
                  //   key: this.orgId
                  // },
                  type: {
                    "data": this.typeName,
                    "key": this.type
                  },
                orgCode:this.code
              },
              size: this.pageSize
            }
            this.loading = true;
            getFloatList(params).then(response => {
              // console.log('流动数据: '+JSON.stringify(response))
              const res = response;
              this.tableData=res.records;
              this.total=res.total;

            }).finally(() => {
              this.loading = false;
              //console.log("finally");
            });
          },
          //多选框
          bindRowKeys(row){
            return row.id;
          },
          //多选框-改变选中状态
          handleSelectionChange(val) {
            this.multipleSelection = val;
          },
          //组织树点击事件
          handleTreeClick (row) {
            // console.log('点击了左侧树', row)
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
                this.$emit('handleSwitch', {name: 'FloatAdd', params: row})
                break
              case 8:
                if(row.type.data=='流出'){
                  this.$refs['refOut'].show(t, row)
                }else if(row.type.data=='流入'){
                  this.$emit('handleSwitch', {name: 'FloatAdd', params: row})
                }
                break

              case 2:
                this.$refs['refOut'].show(t, row)
                break

              case 3:
                break

              case 4:
                if(this.dicts.LDLX!='' && this.dicts.LDLX!=undefined && this.dicts.LDLX!=null && this.dicts.LDLX!='null' && this.dicts.LDLX.length>0){
                  for(var i=0;i<this.dicts.LDLX.length;i++){
                    if(this.type==this.dicts.LDLX[i].id){
                      this.typeName=this.dicts.LDLX[i].name;
                    }
                  }
                }else{
                  this.type='';
                  this.typeName='';
                }
                this.pageNum=1;
                this.pageChange ();
                break

              case 5:
                this.memberInfo='';
                this.name='';
                this.orgId='';
                this.type='';
                this.code='';
                this.typeName='';
                this.pageNum=1;
                this.total=0;
                // this.pageChange ();
                this.$refs.multipleTable1.clearSelection();//清空选中的
                this.$refs.refTree.getTree("clear")//重置左侧组织树
                break

              case 6:
                break

              case 7:
                break

              case 9:
                // this.$emit('handleSwitch', {name: 'HistoryDetail', params: row,type:"float"})
                if(row.type.data=='流出'){
                  this.$refs['refOutdetail'].show(t, row)
                }else if(row.type.data=='流入'){
                  this.$emit('handleSwitch', {name: 'FloatinDetail', params: row})
                }
                break

              case 10:
                this.$confirm('是否删除该条信息？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
                }).then(() => { //确认删除
                    let params = {
                      memberIds:[row.id]
                    }
                    getFloatDetele(params).then(response => {
                      //console.log('删除数据： '+JSON.stringify(response))
                      // this.$message.success("删除成功")
                      this.$message(this.successTip())
                      const res = response;
                      this.pageChange ();

                    }).finally(() => {
                      //console.log("finally");
                    });
                }).catch(() => {

                })
                break

              case 11:
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


.color-grad{
  pointer-events: none;
  cursor: default;
  color:#999
}
</style>
