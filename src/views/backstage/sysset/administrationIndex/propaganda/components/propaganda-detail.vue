<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '778px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="history-detail" v-cloak v-loading="loading">
    <base-card-box header="">
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              宣传栏名称
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'name')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              链接地址
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'linkAddress')}}
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card-box">
            <div class="card-box-title">
              宣传栏位置
            </div>
            <div class="card-box-content">
              {{isEmpty(list,'type.data')}}
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              宣传图
            </div>
            <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0">
              <div class="card-img" v-for="(item,index) in fileListimg">
                <img :src="item.url">
              </div>
            </div>
            <div class="card-box-content" style="flex:1"  v-if="!(fileListimg!='' && fileListimg!=undefined && fileListimg!=null && fileListimg!='null' && fileListimg.length>0)">
              --
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              简介
            </div>
            <div class="card-box-content" style="flex:1">
              {{isEmpty(list,'brief')}}
            </div>
          </div>
        </el-col>
      </el-row>

    </base-card-box>
    </div>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="cancel()">知道了</el-button>
    </div>


  </el-dialog>

</template>

<script>
    import commonReq  from "@/api/public/commonReq.js"
    import {getPropagandadetail} from "@/api/backstage/sysset/administrationIndex/propaganda/propaganda.js"
    export default {
      name: "propaganda-detail",
      data () {
        return {
          loading:true,//加载遮罩条件
          // 自己的
          visible: false,
          title: '详情',
          list:'',
          fileListimg:[],//附件
        }
      },
      mounted(){

      },
      methods: {
        show(t, row) {
          this.visible = true;
          this.getDetail(row.id);
          this.getFile(row.id)
        },
        //获取详情
        getDetail(id){
          let params={
            id:id
          }
          this.loading = true;
          getPropagandadetail(params).then(response => {
            const res = response;
            this.list=res;

          }).finally(() => {
            this.loading = false;
          })
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
                this.fileListimg = res[0].list
              }
            }
          })
        },

        //取消
        cancel() {
          this.visible = false;
          this.list='';
          this.fileListimg=[];//附件
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
    .card-box-contentys {
      width: calc(100% - 120px);
      padding: 16px 0;
      padding-right: 20px;
      overflow: hidden;

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



</style>
