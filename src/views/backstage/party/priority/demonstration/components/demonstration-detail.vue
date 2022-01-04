<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="900px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="visible">
        <el-row>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                组织名称
              </div>
              <div class="card-box-content">
                {{isEmpty(listDetail,'orgId.data')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                书记名称
              </div>
              <div class="card-box-content">
                {{isEmpty(listDetail,'secretaryName')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
              <div class="card-box">
                <div class="card-box-title">
                  奖励类型
                </div>
                <div class="card-box-content">
                  {{isEmpty(listDetail,'rewardType.data')}}
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="card-box">
                <div class="card-box-title">
                  组织人数
                </div>
                <div class="card-box-content">
                  {{isEmpty(listDetail,'memberCnt')}}
                </div>
              </div>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                地址
              </div>
              <div class="card-box-content">
                {{isEmpty(listDetail,'orgAddress')}}
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                批准机关
              </div>
              <div class="card-box-content">
                {{isEmpty(listDetail,'approvalOffice')}}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                奖励名称
              </div>
              <div class="card-box-content">
<!--                <el-tooltip class="item" effect  placement="top-start">-->
                  {{isEmpty(listDetail,'rewardName')}}
<!--                </el-tooltip>-->
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="card-box">
              <div class="card-box-title">
                奖励日期
              </div>
              <div class="card-box-content">
                {{isEmpty(listDetail,'rewardTime')}}
              </div>
            </div>
          </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              奖励说明
            </div>
            <div class="card-box-content" style="flex:1" v-html="isEmpty(listDetail,'explains')">
<!--              {{isEmpty(listDetail,'explains')}}-->
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="card-box">
            <div class="card-box-title">
              附件
            </div>
            <div class="card-box-content" style="flex:1;padding-right:20px;" v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0">
              <div  class="card-file" v-for="(item,index) in fileList">
                <span>{{item.submittedFileName}}</span>
                <img src="@/assets/page/file-icon2.png" @click="download(item.url,item.submittedFileName)">
              </div>
              <!--              <a style="color: #3D9EFF" @click="downLoad">{{isEmpty(listDetail,'fileUrl')}}</a>-->
            </div>
            <div class="card-box-content" style="flex:1"  v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">
              --
            </div>
          </div>
        </el-col>
      </el-row>
       <div slot="footer" class="text-center">
        <el-button size="medium" type="primary" @click="visible = false">知道了</el-button>
       </div>
    </el-dialog>

  </div>
</template>

<script>
    import {getDemonstrationDetail} from  "@/api/backstage/party/priority/demonstration/demonstration.js"
    import commonReq  from "@/api/public/commonReq.js"
    export default {
        data () {
            return {
                // 模态
                visible: false,
                // 是否为添加
                title: '',//标题
                detailId:'', //列表传的id
                loading:false,//加载遮罩
                listDetail:{}, //详情
                bizTypes:'demonstration',
                fileList:[],//附件
            }
        },
        created(){
            // this.getOrgName();
        },
        methods: {
            //详情
            show (row) {
                this.title = '详情'
                this.detailId = row.id;
                this.getDetail()
                this.getFile()
                this.visible = true
            },

            //详情回显接口
            getDetail(){
                let params ={
                    id:this.detailId
                }
                getDemonstrationDetail(params).then(response => {
                    const  res = response
                    this.listDetail = res
                })
            },
            //返回
            goBtn () {
                this.$emit('handleSwitch', {name: 'Index'})
            },
            //附件
            getFile(){
                let params={
                    bizIds: this.detailId,
                    bizTypes: this.bizTypes
                }
                commonReq.getAttachment(params).then(response => {
                    const res = response;
                    if(res[0]!='' && res[0]!=undefined && res[0]!=null && res[0]!='null'){
                        this.fileList = res[0].list;
                    }

                })
            },
            //下载附件
            download(url,name){
                window.location.href=url
            },
        }
    }
</script>

<style scoped lang="scss">
  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

  .card-box-title {
    width: 120px;
    text-align: left;
    font-size: 14px;
    color: #555555;
    padding: 20px 0 16px 20px;
  }

  .card-box-content {
    width: calc(100% - 75px);
    padding: 16px 0;
    font-weight: bold;
    font-size: 14px;
    color:#333;
    line-height: 25px;
  }
  }
  /*/deep/.el-button:hover {*/
  /*  background: #ED3C3C;*/
  /*  color: #fff;*/
  /*  border: #ED3C3C;*/
  /*}*/
  element.style {
    display: inline-block;
    height: 35px;
  }


  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  user agent stylesheet
  div {
    display: block;
  }
  /deep/.el-form-item__content {
    line-height: 36px!important;
    position: relative;
    font-size: 14px;
  }
  /deep/.distpicker-address-wrapper select {
    /* padding: .5rem .75rem; */
    padding: 0;
    height: 36px!important;
    width: 152px!important;
    padding: -108px 0 0 0;
    font-size: 1rem;
    line-height: 36px!important;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
</style>
