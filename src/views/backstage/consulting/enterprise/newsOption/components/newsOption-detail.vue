<template>
  <div class="history-detail">
    <div class="news-detail" v-loading="loading" v-cloak style="margin-bottom:80px">
      <div class="news-detail-title">
        <h2>{{list.title}}</h2>
        <div class="news-detail-footer">
          <div class="news-detail-footer-left">
            <span>
             发文日期：{{isEmpty(list,'publishTime')}}
            </span>
            <span>
               来源： {{isEmpty(list,'webName')}}
            </span>
            <span>
              作者：{{isEmpty(list,'author')}}
            </span>

          </div>

          <span class="news-detail-right" @click="doCopy(list.url)">
            <i class="iconfont icon-fenxiang"></i>分享
          </span>
        </div>
      </div>
      <div class="news-detail-content" v-if="list.contentHtml!='' && list.contentHtml!=undefined && list.contentHtml!=null && list.contentHtml!='null'" v-html="list.contentHtml">

      </div>
      <div class="news-detail-contentsy" v-else>
        暂无内容
      </div>

    </div>

    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div>
  </div>
</template>

<script>
import db from '@/utils/localstorage'//  获取用户登录id
import commonReq  from "@/api/public/commonReq.js"
import {} from "@/api/backstage/consulting/enterprise/newsOption/newsOption.js"

export default {
  name: "newsOption-detail",
  components: {},
  props: {
    params: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      loading:true,//加载遮罩控制条件
      list:'',//详情内容

    }
  },
  mounted() {
    this.loading=false;
    this.list=this.params

  },
  methods: {
    //分享
    doCopy(url) {
      let oInput = document.createElement('input');
      oInput.value = url;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value)
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message(this.successTip())
      oInput.remove()
    },
    //返回
    goBtn () {
      this.$emit('handleSwitch', {name: 'Index'})
    }


  }
}
</script>

<style lang="scss" scoped>
.fexid-clas {
  text-align: center;
  z-index: 6;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
  opacity: 1;
  margin-left: -20px;
}

.news-detail-title{
  padding:30px 20px 24px 20px;
  border-bottom:1px solid #EEEEEE;
}
.news-detail-title h2{
  width:1130px;
  margin:0 auto;
  padding:0 0;
  text-align:center;
  font-size: 24px;
  line-height: 35px;
  color: #444444;
  word-break: break-all;
  word-wrap:break-word;
}
.news-detail-footer{
  margin-top:30px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.news-detail-footer-left{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.news-detail-footer-left span{
  font-size: 14px;
  line-height: 18px;
  color: #999999;
}
.news-detail-footer-left span:first-of-type{
  margin-right:56px;
}
.news-detail-footer-left span:nth-of-type(2){
  margin-right:157px;
}
.news-detail-right{
  display:block;
  background: #F1F7FF;
  border-radius: 14px;
  padding:6px 12px;
  font-size: 14px;
  color: #53A0FF;
  cursor:pointer;
}
.news-detail-content{
  padding:20px 20px;


}
.news-detail-contentsy{
  padding:20px 20px;
  font-size: 16px;
  line-height: 18px;
  color: #999999;
}
.fxUrl{
  display:none;
}
</style>
