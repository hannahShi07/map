<!--干部选任首页-->
<template>
  <div class="party" v-cloak>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="机关干部选任" name="first">
        <div class="contain" v-loading="loading">
          <div class="containlist" v-if="tableData!='' && tableData!=undefined && tableData!=null && tableData!='null' && tableData.length>0">
            <div class="list" @click="open(item,1)" v-for="(item,index) in tableData" :class="((index+1)%5)==0 ? 'borderBottom':''">
              <i></i>
              <div class="listTxt">{{item.djOfficerTitle}}</div>
              <span class="listTime">{{item.djOfficerDate}}</span>
            </div>
          </div>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" v-else/>
          <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

        </div>
      </el-tab-pane>
      <el-tab-pane label="考察信息" name="second">
        <div class="contain" v-loading="loading">
        <div class="containlist" v-if="informationData!='' && informationData!=undefined && informationData!=null &&
        informationData!='null' && informationData.length>0">
          <div class="list" @click="open(item,2)" v-for="(item,index) in informationData" :class="((index+1)%5)==0 ? 'borderBottom':''">
            <i></i>
            <div class="listTxt">{{item.djInspectMessageTitle}}</div>
            <span class="listTime">{{item.djInspectMessageDate}}</span>
          </div>
        </div>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty" v-else/>
        <base-pagination :total="informationTotal" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

      </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getOfficerChangeList,getInspectMessageList} from "@/api/front/personnel/cadre/selection/selection.js"
  export default {
    name: "index",
    components: {

    },
    data () {
      return {
        loading:true,
        activeName: 'first',
        orgName:'',//组织名称
        orgCode:'',//组织编码
        pageNum: 1,//当前页
        pageSize: 20,//每页大小
        total: 0,//总条数
        tableData: [{}],//列表数据
        informationData: [{}],//考察信息列表数据
        informationTotal:0,//考察信息总条数

      }
    },
    mounted(){
      this.getUser();
      this.pageChange();
      this.informationChange();

    },
    created(){
     if(sessionStorage.getItem('actIndx'))
     {
         this.activeName = sessionStorage.getItem('actIndx')
     }
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
      // 机关干部选任调用数据接口
      pageChange () {
        let params = {
          current: this.pageNum,
          size: this.pageSize
        }
        this.loading = true;
        getOfficerChangeList(params).then(response => {
          const res = response;
          this.tableData = res.records;
          this.total = res.total;
        }).finally(() => {
          this.loading = false;
        });
      },
      //考察信息列表接口
      informationChange () {
          let params = {
              current: this.pageNum,
              size: this.pageSize
          }
          this.loading = true;
          getInspectMessageList(params).then(response => {
              const res = response;
              this.informationData = res.records;
              this.informationTotal = res.total;
          }).finally(() => {
              this.loading = false;
          });
      },
      //打开详情页
      open(row,type){
        this.$emit('handleSwitch', {name: 'SelectionDetail', params: row,type:type})
      },
        //Tabs 标签页点击事件
      handleClick(tab) {
          sessionStorage.setItem('actIndx',this.activeName)
      }
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
