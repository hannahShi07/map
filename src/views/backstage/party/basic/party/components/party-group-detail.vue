<template>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="887"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
    <div v-cloak v-loading="loading">
      <base-card-box isImg :imgUrl="imgUrl" imgSquare class="content-top"  >
        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                上级党组织
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'parentId')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="24">
            <div class="card-box">
              <div class="card-box-title">
                党小组名称
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'name')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                组织类别
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'category')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                党小组组长
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'leaderId')}}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row class="card-row">
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                联系方式
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'phone')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                建立党小组日期
              </div>
              <div class="card-box-content">
                {{isEmpty(formData,'approvalDate')}}
              </div>
            </div>
          </el-col>
        </el-row>
      </base-card-box>

      <base-card-box header="党小组成员" :margin="{top: true}" class="content-bottom">
        <el-table
          :data="groupList"
          height="200"
          header-row-class-name="page-table-header"
          :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="序号" width="60" align="center"/>
          <el-table-column label="姓名" prop="name" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{isEmpty(row,'name')}}
            </template>
          </el-table-column>

          <el-table-column label="联系方式" prop="phone" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{isEmpty(row,'phone')}}
            </template>
          </el-table-column>

          <el-table-column label="身份证号码" prop="idCode" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{isEmpty(row,'idCode')}}
            </template>
          </el-table-column>

          <el-table-column label="学历" width="200" prop="education.data" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{isEmpty(row,'education.data')}}
            </template>
          </el-table-column>

          <el-table-column label="人员类型" width="200" prop="type.data" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              {{isEmpty(row,'type.data')}}
            </template>
          </el-table-column>

        </el-table>

        <div class="text-center bg-fff pt-20">
          <el-button  size="medium" type="primary"  @click="close" class="page-btn page-btn-hollow">知道了</el-button>
        </div>

      </base-card-box>

    </div>

    </el-dialog>
</template>

<script>
  import {getPartydetail,getPartygroupMember} from "@/api/backstage/party/basic/party/party.js"
  import commonReq  from "@/api/public/commonReq.js"

  export default {
    data () {
      return {
        // 模态
        visible: false,
        // 标题
        title: '详情',
        // 加载遮罩
        loading:true,
        // 党小组头像
        imgUrl : require('@/assets/temp/temp-head.png'),
        formData:{
          // 组织名称/党小组名称（必填）
          name:'',
          // 组织类别（必填）
          category:'',
          // 建立党小组日期（必填）
          approvalDate:"",
          // 党小组组长
          leaderId:'',
          // 上级党组织
          parentId:'',
          // 联系方式
          phone:''
        },
        // 党小组成员
        groupList:[]
      }
    },
    methods: {
      // 打开党小组详情弹窗
      show(t,row){
        this.loading = true
        this.visible = true

        this.imgUrl = ''
        this.formData = {
          // 组织名称/党小组名称（必填）
          name:'',
          // 组织类别（必填）
          category:'',
          // 建立党小组日期（必填）
          approvalDate:"",
          // 党小组组长
          leaderId:'',
          // 上级党组织
          parentId:'',
          // 联系方式
          phone:''
        }
        // 党小组成员
        this.groupList = []

        this.getDetail(row)
      },

      //获取当小组成员接口
      getPartyMember(row){
        let params = {
          org:{
            key:row.id,
          },
        }
        getPartygroupMember(params).then(response => {
          const res = response;
          this.groupList = res;
        })
      },

      // 获取详情信息
      getDetail(row){
        let params = {
          id:row.id
        }
        this.getPartyMember(row)
        this.getFile(row)
        getPartydetail(params).then(respone => {
          const res = respone
          this.formData ={
            name:res. name,
            category:res.category.data,
            approvalDate:res.approvalDate,
            leaderId:res.leaderId.data,
            parentId:res.parentId.data,
            phone:res.phone
          }
        }).finally(() =>{
          this.$nextTick(function(){
            this.loading = false;
          })

        })
      },

      //获取头像
      getFile(row){
        let params={
          bizIds: row.id,
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res.length > 0 && res[0].list.length > 0){
            if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
              this.imgUrl = res[0].list[0].url
            }else{
              this.imgUrl = require('@/assets/temp/temp-head.png')
            }
          }else{
            this.imgUrl = require('@/assets/temp/temp-head.png')
          }
        })
      },

      // 关闭事件
      close (){
        this.visible = false
        this.imgUrl = require('@/assets/temp/temp-head.png')
      }
    }
  }
</script>

<style scoped>
  /*
    隐藏table底部横线
   */
  .el-table--group::after, .el-table--border::after, .el-table::before {
    content: '';
    position: absolute;
    background-color: #ffffff;
    z-index: 1;
  }

  /deep/ .el-loading-mask {
    margin: 0 -20px;
  }

  .card-box-content {
    padding-right: 0px !important;
    padding-left: 20px !important;
  }

  .content-bottom{
    padding: 0px 20px;
    margin: 10px -20px -15px -20px;
  }

  .content-top {
    margin: 0 -20px;
    padding: 0 20px
  }


  /deep/ .base-card-box.margin-top {
    margin-top: 10px;
  }

  /deep/ .el-dialog__body {
    padding-top: 0;
    background-color: #EEEEEE;
  }
  .card-row {
    height: 100%;
    line-height: 50px;
  }

  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 150px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding-left: 20px;
    }

    .card-box-content {
      flex: 1;
      margin-left: 20px;
      font-weight: bold;
      font-size: 14px;
      padding-left: 20px !important;
    }
    .overContent {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

</style>
