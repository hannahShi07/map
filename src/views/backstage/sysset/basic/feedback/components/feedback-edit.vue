<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1000px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <base-card-box header="反馈内容">
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              反馈内容
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'content')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              反馈人姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'userName')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(viewData,'contact')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              提交时间
            </div>
            <div class="card-box-content" style="flex:1" v-html="isEmpty(viewData,'createTime')">
            </div>
          </div>
        </el-col>
      </el-row>

    </base-card-box>
    <div class="line"></div>
    <base-card-box header="处理情况">
      <el-form :model="messages" ref="ruleForm" label-width="90px">
      <el-row class="card-row" style="margin-top: 20px">
        <el-form-item label="处理操作" >
          <el-select
          v-model="messages.manage"
          filterable
          placeholder="请选择"
          clearable
          > <el-option
            v-for="(item,index) in dicts.processing_type"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
        <el-form-item  label="回复内容" style="margin-right: 20px">
          <el-input  type="textarea" v-model="messages.content" placeholder="请输入" maxlength="150"
                     :autosize="{ minRows: 5, maxRows: 5}" show-word-limit clearable></el-input>
        </el-form-item>
        </el-col>
      </el-row>
      </el-form>
    </base-card-box>
    <div slot="footer" class="text-center">
      <el-button size="medium"  @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="toSave">确定</el-button>
    </div>

  </el-dialog>

</template>

<script>
    import {getFeedbackDetail,getFeedbackEdit} from "@/api/backstage/sysset/basic/feedback/feedback.js"
    import commonReq  from "@/api/public/commonReq.js"

    export default {
        name: "feedback-edit",
        data () {
            return {
                visible: false,
                title: '处理',
                viewData: {},
                feedbackId:'',//详情的id
                messages:{
                    manage:'',//处理操作
                    content:'', //回复内容
                },
                dicts: {//处理
                    processing_type:[]
                },
                 //    process: [
                 //    {name:'回复',id:'1'},
                 //    {name:'忽略',id:'2'}
                 // ],
                node:[{

                }]
            }
        },
        mounted(){
            this.getCommDict()
        },
        methods: {
            show(row) {
                this.visible = true;
                this.getDetail(row.id)
                this.feedbackId = row.id
            },
            //调用字典接口
            getCommDict(){
                let params = {
                    types:['processing_type']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.processing_type = res.processing_type;
                })
            },
            // 获取详情
            getDetail(id){
                let params = {
                    id:id
                }
                this.loading = true;
                getFeedbackDetail(params).then(response => {
                    const res = response;
                    this.viewData=res;

                }).finally(() => {
                    this.loading = false;
                });
            },
            //确定保存数据
            toSave(){
                // if(this.messages.manage == '忽略'){
                //     this.messages.content = ''
                // }else {
                //     this.messages.content = this.messages.content
                // }
                let params = {
                    id:this.feedbackId,
                    processingType:{key:this.messages.manage},
                    replyContent:this.messages.content
                }
                this.loading = true;
                getFeedbackEdit(params).then(response => {
                    const res = response;
                    this.$message(this.successTip())
                    this.$emit('refresh')
                    this.$emit('handleSwitch', {name: 'index'})
                    this.visible = false
                }).finally(() => {
                    this.loading = false;
                });
            },
            // 取消
            cancel() {
                this.visible = false;
                this.messages.manage = ''
                this.messages.content = ''
            },
        },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;
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
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
  .line{
    height: 10px;
    background: #EEEEEE;
  }
</style>
