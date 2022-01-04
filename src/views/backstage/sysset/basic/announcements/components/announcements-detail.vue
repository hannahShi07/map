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
    <base-card-box header="">
      <div class="detail-box">
        <div class="card-box-title">
          {{isEmpty(messages,'title')}}
        </div>
        <span>发布时间：{{isEmpty(messages,'time')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="detail-contant" v-if="messages.content!='' && messages.content!=undefined && messages.content!=null && messages.content!='null'" v-html="messages.content">
      </div>
      <div class="detail-contant" v-else>
        暂无内容
      </div>
    </base-card-box>
    <div slot="footer" class="text-center">
      <el-button size="medium" type="primary" @click="visible = false">知道了</el-button>
    </div>

  </el-dialog>

</template>

<script>
    import {getAnnouncementsDetail} from "@/api/backstage/sysset/basic/announcements/announcements.js"
    export default {
        name: "announcements-detail",
        data () {
            return {
                visible: false,
                title: '详情',
                viewData: {
                    title: '',
                    releaseTime: '',
                    content: '',
                },
                messages:{
                    id:'',
                    title:'',//标题
                    content:'',//内容
                },
            }
        },
        mounted(){

        },
        methods: {
            show(t,row) {
                this.visible = true;
                // this.viewData = row;
                this.getDetail(row.id);
            },
            //获取编辑详情
            getDetail(id){
                let params={
                    id:id
                }
                getAnnouncementsDetail(params).then(response => {
                    const res = response;
                    this.messages=res;
                })
            },
            // 取消
            cancel() {
                this.visible = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
  .bc-heard /deep/ .el-dialog__body{
    padding:0 0;

  }
  .detail-box{
    margin: 10px 20px;
  }
  .detail-box span {
    font-size: 16px;
    color: #999999;
  }
  .card-box-title{
    text-align: left;
    font-weight: bold;
    font-size: 22px;
    color: #333;
    padding: 16px 0 16px 0;
  }
  .detail-contant{
    margin: 20px;
    font-size: 20px;
    font-weight: 400;
    line-height: 46px;
    color: #555555;
  }
</style>
