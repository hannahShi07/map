<template>
  <div class="party">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="双强六好企业党组织" name="1" v-cloak>
        <!-- 条件盒子 -->
        <div class="page-search-box">
          <base-label-box label="组织名称">
            <el-input v-model="orgName" placeholder="请输入" style="width: 280px" @keyup.enter.native="pageChange()" clearable/>
          </base-label-box>
          <base-label-box label="上传日期">
            <el-date-picker
              v-model="uploadDate"
              type="date"
              placeholder="请选择"
              @change="pageChange()"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </base-label-box>
          <base-label-box label="状态">
            <el-select
              v-model="station"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width: 280px"
              @change="pageChange()"
              clearable>
              <el-option
                v-for="(item, index) in dicts.doublesix_state"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </base-label-box>
        </div>
        <!-- 按钮区 -->
        <div class="pd-20 clearfix">
          <div class="fr">
            <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(5)"/>
            <base-page-button title="重置" imgType="reset" @click="editBtn(6)"/>
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
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="组织名称" min-width="120px" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="申报类型" min-width="200px"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'declareAwards.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="联系方式" width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'contact')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上传日期" width="180px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'submitTime')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'checkState.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="查看日期" width="200" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'viewTime')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" show-overflow-tooltip>
              <template slot-scope="{row}">
                <base-table-a type="add" @click="editBtn(1, row)" v-if="row.checkState.data == '待审核'">审核</base-table-a>
                <base-table-a @click="editBtn(2, row)" v-if="row.checkState.data != '待审核'">详情</base-table-a>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="非公党建示范点" name="2" >
        <!-- 条件盒子 -->
        <div class="page-search-box">
          <base-label-box label="组织名称">
            <el-input v-model="orgName" placeholder="请输入" style="width: 280px"  @keyup.enter.native="pageNonChange()" clearable/>
          </base-label-box>
          <base-label-box label="上传日期">
            <el-date-picker
              v-model="uploadDate"
              type="date"
              placeholder="请选择"
              @change="pageNonChange()"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </base-label-box>
          <base-label-box label="状态">
            <el-select
              v-model="station"
              value-key="id"
              filterable
              placeholder="请选择"
              style="width: 280px"
              @change="pageNonChange()"
              clearable>
              <el-option
                v-for="(item, index) in dicts.doublesix_state"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </base-label-box>
        </div>
        <!-- 按钮区 -->
        <div class="pd-20 clearfix">
          <div class="fr">
            <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(5)"/>
            <base-page-button title="重置" imgType="reset" @click="editBtn(6)"/>
          </div>
        </div>
        <div class="mr-20 ml-20" v-cloak>
          <el-table
            v-loading="loading"
            class="table"
            :data="nonTableData"
            tooltip-effect="dark"
            style="width:100%;margin: 0 auto"
            ref="multipleTable1"
            :row-key="bindRowKeys"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column label="序号" width="50px" align="center">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="组织名称" min-width="120px" align="left" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'orgId.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="申报类型" min-width="200px"  align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'declareAwards.data')}}</span>
              </template>
            </el-table-column>

            <el-table-column label="联系方式" width="120px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'contact')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="上传日期" width="180px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'submitTime')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="180px" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'checkState.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="查看日期" width="200" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(nonTableData[scope.$index],'viewTime')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center" show-overflow-tooltip>
              <template slot-scope="{row}">
                <base-table-a type="add" @click="editBtn(3, row)" v-if="row.checkState.data == '待审核'">审核</base-table-a>
                <base-table-a @click="editBtn(4, row)" v-if="row.checkState.data != '待审核'">详情</base-table-a>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>

          <base-pagination :total="nontotal" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageNonChange"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import commonReq  from "@/api/public/commonReq.js"
    import {getDeclareList,getDeclareNonList} from "@/api/backstage/party/priority/declare/declare.js"
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
                activeName: '1',//tab切换
                pageNum: 1,
                pageSize: 10,
                total: 0,
                dicts: {//字典状态
                    doublesix_state: {},
                },
                orgId:'',//点击组织树id
                code:"",//组织树code
                orgName:'',//组织名称
                uploadDate:'',//上传日期
                station:'', //状态
                tableData:[],//双强六好列表数据
                nonTableData:[],//非公党建列表数据
                nontotal:0, //非公党建列表数据总数
                multipleSelection:[],//多选框选中数据
            }
        },
        activated(){
            if(this.pageCurrent){
                this.pageNum = this.pageCurrent
            }
            this.pageChange ();
            this.pageNonChange ();
            this.getDict();

        },
        mounted() {
            this.pageChange ();
            this.pageNonChange ();
            this.getDict();
        },
        created(){
            if(sessionStorage.getItem('actIndx')){
                this.activeName = sessionStorage.getItem('actIndx')
            }
        },
        methods: {
            //Tabs 标签页点击事件
            handleClick(tab) {
                sessionStorage.setItem('actIndx',this.activeName)
            },
            //调用字典接口
            getDict(){
                let params = {
                    types:['doublesix_state']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.doublesix_state = res.doublesix_state;
                })
            },
            //双强六好分页调取接口数据
            pageChange () {
                // 调用数据接口
                let params = {
                    current: this.pageNum,
                    model: {
                        checkState:{key:this.station},
                        orgId:{data:this.orgName},
                        submitTime:this.uploadDate,
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getDeclareList(params).then(response => {
                    const res = response;
                    this.tableData=res.records;
                    this.total=res.total;

                }).finally(() => {
                    this.loading = false;
                });
            },
            //非公党建分页调取接口数据
            pageNonChange () {
                // 调用数据接口
                let params = {
                    current: this.pageNum,
                    model: {
                        checkState:{key:this.station},
                        orgId:{data:this.orgName},
                        submitTime:this.uploadDate,
                    },
                    size: this.pageSize
                }
                this.loading = true;
                getDeclareNonList(params).then(response => {
                    const res = response;
                    this.nonTableData=res.records;
                    this.nontotal=res.total;

                }).finally(() => {
                    this.loading = false;
                });
            },
            //多选框
            bindRowKeys(row){
                return row.id;
            },
            //跳转
            editBtn (t, row) {
                switch (t) {
                    case 1: //审核
                        this.$emit('handleSwitch', {name: 'DeclareAdd', params: row})
                        break
                    case 2: //详情
                        this.$emit('handleSwitch', {name: 'DeclareDetail', params: row})
                        break
                    case 3: //审核
                        this.$emit('handleSwitch', {name: 'DeclareNonAdd', params: row})
                        break
                    case 4: //详情
                        this.$emit('handleSwitch', {name: 'DeclareNonDetail', params: row})
                        break
                    case 5:
                        this.pageNum=1;
                        this.pageChange ();
                        this.pageNonChange ();
                        break
                    case 6:
                        this.orgName='';//组织名称
                        this.uploadDate='',//上传日期
                            this.station='', //状态
                            this.orgId='';
                        this.code = '';
                        this.pageNum=1;
                        this.pageChange ();
                        this.pageNonChange ();
                        this.$refs.multipleTable1.clearSelection();//清空选中的
                        break
                }
            },


        },

    }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #fff;
  }
</style>
