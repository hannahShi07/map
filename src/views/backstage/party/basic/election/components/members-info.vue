<template>
  <div class="members-info">
    <el-dialog
      :title="title"
      :visible.sync="visibleInfo"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visibleInfo"
      v-cloak>
      <el-form class="information" v-loading="loading">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名">
              <div>{{isEmpty(tableData,'memberId.data')}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="党内职务">
              <div>{{isEmpty(tableData,'position.data')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="所属组织">
              <div>{{isEmpty(tableData,'orgId.data')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系方式">
              <div>{{isEmpty(tableData,'phone')}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任职日期">
              <div>{{isEmpty(tableData,'officeDate')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="职务描述">
              <div>{{isEmpty(tableData,'positionDescribe')}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {membersInfo} from "@/api/backstage/party/class/members/members.js"
  export default {
    name: "MembersInfo",
    components: {},
    data() {
      return {
        visibleInfo:false,
        title:"详情",
        loading:true,
        tableData:{
          electionId: 0,//换届选举id
          id: 0,
          memberId:"", //	党员
          officeDate: "",//	任职日期
          orgId: {//	所属党组织
            data: "",
            key: 0
          },
          phone: "",//	联系电话
          position:"",	//党内职务
          positionDescribe: ""//	职务描述
        }
      }
    },
    mounted() {

    },
    computed: {

    },
    watch: {

    },
    methods: {
      close(){
        this.tableData={
          electionId: 0,//换届选举id
          id: 0,
          memberId:"", //	党员
          officeDate: "",//	任职日期
          orgId: {//	所属党组织
            data: "",
            key: 0
          },
          phone: "",//	联系电话
          position:"",	//党内职务
          positionDescribe: ""//	职务描述
        }
        this.visibleInfo = false;
      },
      show(type,row){
        if(type == 1){
          this.tableData = row;
          this.loading=false;
        }else{
          this.getInfo(row.id)
        }
        this.visibleInfo = true;
      },
      getInfo(id){
        let params = {
          id:id
        }
        membersInfo(params).then(response => {
          this.tableData = response;
          this.loading=false;
        }).finally(() => {
          this.loading=false;
        });
      }
    }
  }
</script>

<style scoped>
  .members-info >>> .el-dialog{
    width: 887px;
  }
  .members-info >>> .el-form-item{
    margin: 0;
    padding: 10px 0;
  }
  .members-info >>> .el-form-item__label{
    width: 80px;
    text-align: left;
  }
  .members-info >>> .el-row{
    border-bottom: 1px solid #F3F3F3;
  }
</style>
