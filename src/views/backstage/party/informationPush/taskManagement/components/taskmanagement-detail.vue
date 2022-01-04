<!--发布任务详情页-->
<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '888px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >

    <div class="history-detail" v-cloak v-loading="loading">
      <base-card-box header="">
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                任务名称
              </div>
              <div class="card-box-content">
                {{isEmpty(messages,'taskName')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                任务要求
              </div>
              <div class="card-box-content">
                {{isEmpty(messages,'taskDemands')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                任务时间
              </div>
              <div class="card-box-content">
                {{isEmpty(messages,'taskBeginTime')}}~{{isEmpty(messages,'taskEndTime')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                任务文件
              </div>
              <div class="card-box-content card-box-content1">
                <div v-if="taskfileList!='' && taskfileList!=undefined && taskfileList!=null && taskfileList!='null' &&
            taskfileList.length>0" class="card-file" v-for="(item,index) in taskfileList"  @click="download(item.submittedFileName,item.url)">
                  <img src="@/assets/page/file-icon1.png">
                  <span>{{item.submittedFileName}}</span>
                  <img src="@/assets/page/file-icon2.png">
                </div>
                <span v-if="!(taskfileList!='' && taskfileList!=undefined && taskfileList!=null && taskfileList!='null' && taskfileList.length>0)">--</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              已完成组织
            </div>
            <!-- 表格 -->
              <el-table
                v-loading="loading"
                class="table"
                tooltip-effect="dark"
                style="width:100%;margin: 0 auto"
                header-row-class-name="page-table-header"
                ref="returnTable"
                :data="finishOrgPerforms"
              >
                <el-table-column label="组织名称" min-width="200px" align="center" show-overflow-tooltip>
                  <template slot-scope="{row}">
                    <span>{{isEmpty(row,'orgId.data')}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="200px" align="center" show-overflow-tooltip>
                  <template slot-scope="{row}">
                    <!--表格操作按钮组件-->
                    <base-table-a  @click="orgDetail(1,row)">详情</base-table-a>
                    <!--组织详情-->
                    <el-dialog
                      class="bc-heard"
                      title="详情"
                      :visible.sync="finishDetailVisible"
                      width = '888px'
                      @close="finishDetailVisible = false"
                      :close-on-click-modal="false"
                      :close-on-press-escape="false"
                      append-to-body
                    >
                      <el-form label-width="">
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="组织名称" label-width="100px">
                              {{isEmpty(row,'orgId.data')}}
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="任务完成情况" label-width="100px">
                              {{isEmpty(row,'taskPerformance')}}
                            </el-form-item>
                          </el-col>

                        </el-row>
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="完成任务文件" label-width="100px">
                              <div class="card-box-content card-box-content1">
                                <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-file" v-for="(item,index) in fileList"  @click="download(item.submittedFileName,item.url)">
                                  <img src="@/assets/page/file-icon1.png">
                                  <span>{{item.submittedFileName}}</span>
                                  <img src="@/assets/page/file-icon2.png">
                                </div>
                                <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <div  class="text-center">
                          <el-button size="medium"  type="primary"  @click="finishDetailVisible = false">知道了</el-button>
                        </div>
                      </el-form>
                    </el-dialog>
                  </template>
                </el-table-column>

                <!-- 空数据样式 -->
                <base-table-empty slot="empty"/>
              </el-table>
          </div>
        </el-col>
        </el-row>
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                未完成组织
              </div>
              <!-- 表格 -->
                <el-table
                  v-loading="loading"
                  class="table"
                  tooltip-effect="dark"
                  style="width:100%;margin: 0 auto"
                  header-row-class-name="page-table-header"
                  ref="returnTable"
                  :data="unFinishOrgPerforms"
                >
                  <el-table-column label="组织名称" min-width="200px" align="center" show-overflow-tooltip>
                    <template slot-scope="{row}">
                      <span>{{isEmpty(row,'orgId.data')}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200px" align="center" show-overflow-tooltip>
                    <template slot-scope="{row}">
                      <!--表格操作按钮组件-->
                      <base-table-a class="color-grad"  @click="orgDetail(2,row)">详情</base-table-a>
                      <!--组织详情-->
                      <el-dialog
                        class="bc-heard"
                        title="详情"
                        :visible.sync="unDetailVisible"
                        width = '888px'
                        @close="unDetailVisible = false"
                        :close-on-click-modal="false"
                        :close-on-press-escape="false"
                        append-to-body
                      >
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="组织名称" label-width="100px">
                              {{isEmpty(row,'orgId.data')}}
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="任务完成情况" label-width="100px">
                              {{isEmpty(row,'taskPerformance')}}
                            </el-form-item>
                          </el-col>

                        </el-row>
                        <el-row class="card-row">
                          <el-col :span="24">
                            <el-form-item  label="完成任务文件" label-width="100px">
                              <div class="card-box-content card-box-content1">
                                <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-file" v-for="(item,index) in fileList"  @click="download(item.submittedFileName,item.url)">
                                  <img src="@/assets/page/file-icon1.png">
                                  <span>{{item.submittedFileName}}</span>
                                  <img src="@/assets/page/file-icon2.png">
                                </div>
                                <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>
                              </div>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <div class="text-center">
                          <el-button size="medium"  type="primary"  @click="unDetailVisible = false">知道了</el-button>
                        </div>
                      </el-dialog>
                    </template>
                  </el-table-column>

                  <!-- 空数据样式 -->
                  <base-table-empty slot="empty"/>
                </el-table>
            </div>
          </el-col>
        </el-row>
      </base-card-box>
    </div>

    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="visible = false">知道了</el-button>
    </div>

  </el-dialog>
</template>

<script>
    import {getTaskmanagementDetail,getTaskcompleteDetail} from "@/api/backstage/party/informationPush/taskManagement/taskManagement.js"
    import commonReq  from "@/api/public/commonReq.js"
    import { VueEditor } from "vue2-editor";//引入富文本
    export default {
        name: "taskmanagement-add",
        components:{ VueEditor },
        data () {
            return {
                visible: false,
                finishDetailVisible: false, //已完成组织显示
                unDetailVisible: false, //未完成组织显示
                loading:false,
                title:'',
                messages:{
                    // id:'',
                    // taskBeginTime:'',//开始时间
                    // taskEndTime:'',//结束时间
                    // taskName:'',//任务名称
                    // taskDemands:'', //任务要求
                    // orgId:{key:"",data:""},//发布组织
                    // file:[],//附件
                },
                //已完成的情况
                finishOrgPerforms:[],
                //未完成的情况
                unFinishOrgPerforms:[],
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "taskmanagement",
                    isSingle: false
                },
                accept:'格式要求：doc、docx、pdf、xlsx、txt要求：20M以内',
                isEdit:'',//判断是新增还是详情
                defaultDate:'',//当前时间
                list:'',//详情数据
                fileList:[],//附件
                taskfileList:[]//任务文件
            }
        },
        mounted(){

        },
        methods: {
            //打开页面
            show (t,row) {
                this.fileList = [],// 清空附件
                this.taskfileList = []// 清空任务文件
                this.visible = true;if(t==5){//详情
                    this.title = '任务完成情况'
                    this.getDetail(row.id);
                    this.getfinishDetail(row.id);
                    // this.getFile(row.id)
                    this.getTaskFile(row.id)
                    // this.otherData.bizId = row.id// 详情时，附件自动回显
                    // this.$nextTick(function(){// 详情时，附件自动回显
                    //     this.$refs.fileRef.init()
                    // })
                }
            },

            //组织详情
            orgDetail(t,row){
                if(t===1){
                    this.finishDetailVisible= true
                    this.getFile(row.id)
                }else if(t===2){
                    this.unDetailVisible =true
                    this.getFile('22222',row.id)
                }

            },
            //获取附件
            getFile(id){
                let params={
                    bizIds: id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                        if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
                            this.fileList = res[0].list
                        }else{
                          this.fileList = []
                        }
                    }else{
                      this.fileList = []
                    }
                })
            },
            //任务文件
            getTaskFile(id){
                let params={
                    bizIds: id,
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res.length > 0 && res[0].list.length > 0){
                        if(res[0].list!= undefined && res[0].list != null && res[0].list != ""){
                            this.taskfileList = res[0].list
                        }else{
                          this.taskfileList = []
                        }
                    }else{
                      this.taskfileList = []
                    }
                })
            },
            //获取详情详情
            getDetail(id){
                let params={
                    id:id
                }
                this.loading = true
                getTaskmanagementDetail(params).then(response => {
                    const res = response;
                    this.messages=res;
                }).finally(() => {
                  this.loading = false
                });
            },
            //获取完成情况组织详情
            getfinishDetail(id){
                let params={
                    id:id
                }
              this.loading = true
                getTaskcompleteDetail(params).then(response => {
                    const res = response;
                    this.finishOrgPerforms = res.finishOrgPerforms;
                    this.unFinishOrgPerforms = res.unFinishOrgPerforms;
                }).finally(() => {
                  this.loading = false
                });
            },
            //下载附件
            download(url,fileName){
                commonReq.downloadFile(fileName,url)
            },
            //取消
            cancel() {
                this.visible = false;
            },
        },
    }
</script>

<style scoped lang="scss">
.color-grad {
  color: #999;
  border-color: #e6ebf5;
}
.card-box {
  display: flex;
  border-bottom: 1px solid #EEEEEE;

.card-box-title {
  width: 120px;
  text-align: left;
  font-size: 14px;
  color: #555555;
  padding: 16px 0 16px 20px;
}

.card-box-content {
// flex: 1;
  width: calc(100% - 120px);
  padding: 16px 0;
  font-weight: bold;
  font-size: 14px;
  color:#333;
  padding-right:20px;
}
}
.card-box-content1{
  cursor: pointer;
  width:auto!important;
}
.card-filebox{
  display:block;
}

.card-file{
  padding:8px 12px;
  background: #F9F9F9;
  border-radius:5px;
  display:inline-flex;
  flex-flow:wrap;
  align-items:center;
}
.card-file{
  width:auto;
  margin-bottom:8px;
}
.card-file img:first-of-type{
  width:12px;
  height:16px;
}
.card-file img:last-of-type{
  width:17px;
  height:17px;
}
.card-file span{
  padding-left:10px;
  padding-right:30px;
  font-size:14px;
  color:#999;
}
.card-img{
  width:100%;
  margin-bottom:10px;
}
.card-img img{
  width:100%
}
</style>
