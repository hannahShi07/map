<!--任免文件首页-->
<template>
  <div class="party" v-cloak>
    <div class="contain" v-loading="loading">
      <div class="containlist" v-if="tableData!='' && tableData!=undefined && tableData!=null && tableData!='null' && tableData.length>0">
        <div class="list" @click="open(item)" v-for="(item,index) in tableData" :class="((index+1)%5)==0 ? 'borderBottom':''">
          <i></i>
          <div class="listTxt">{{item.appointMessage}}</div>
          <span class="listTime">{{item.appointTime}}</span>
        </div>
      </div>

      <!-- 空数据样式 -->
      <base-table-empty slot="empty" v-else/>
      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

    </div>
  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getDocumentList} from "@/api/front/personnel/patronage/document/document.js"
  export default {
    name: "index",
    components: {

    },
    data () {
      return {
        loading:true,
        orgName:'',//组织名称
        orgCode:'',//组织编码
        pageNum: 1,//当前页
        pageSize: 20,//每页大小
        total: 0,//总条数
        tableData: [{}],//列表数据
      }
    },
    mounted(){
      this.getUser();
      this.pageChange();

    },
    methods: {
      //获取用户信息
      getUser() {
        let params = {
          userId: db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          const res = response;
          this.orgName = res.data.orgName;
          this.orgCode = res.data.orgCode;

        }).finally(() => {
        });
      },
      // 调用数据接口
      pageChange () {
        let params = {
          current: this.pageNum,
          size: this.pageSize
        }
        this.loading = true;
        getDocumentList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //打开详情页
      open(row){
        this.$emit('handleSwitch', {name: 'DocumentDetail', params: row})
      },
    }
  }
</script>

<style scoped>
.party{
  background:#fff;
  padding: 5px 0;
  margin-top: 20px;
  height:86vh;
  overflow:auto;
}
.contain{
  /*height:80vh;*/
  padding:0px 20px;
  padding-bottom:20px;
  margin:20px 20px;
  border: 1px solid #DDDDDD;
}
.containlist{
  padding:10px 0;

}
.borderBottom{
  border-bottom:1px solid #DDDDDD;
}
.list{
  display:flex;
  justify-content: flex-start;
  align-items:center;
  padding:10px 0;
  cursor: pointer;
}
.list i{
  font-style:normal;
  display:block;
  width:4px;
  height:4px;
  border-radius:50%;
  background:#333333;
}
.listTxt{
  padding-left:10px;
  padding-right:30px;
  font-size: 16px;
  color: #555555;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.listTime{
  font-size: 14px;
  color:#999999;
}
.list:hover{
  border-bottom:1px solid #FC5921;
}
.list:hover i{
   background:#FC5921;
 }
.list:hover .listTxt{
  color:#FC5921;
}
.list:hover .listTime{
  color:#FC5921;
}
</style>
