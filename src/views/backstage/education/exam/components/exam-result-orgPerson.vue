<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="860px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    :append-to-body='true'>
    <div class="">
      <p class="grid">
        <span class="gk">发布组织</span>
        <span class="gv">{{orgName}}</span>
      </p>
      <div class="orgPanel">
        <p class="grid">
          <el-row>
            <el-col :span="12">
              <span class="gk">应参与人员</span><span class="gv">{{shouldJoin}}个</span>
            </el-col>
            <el-col :span="12">
              <span class="gk">未参与人员</span><span class="gv">{{unJoin}}个</span>
            </el-col>
          </el-row>
        </p>
        <div class="search">
          <el-select v-model="orgId" placeholder="请选择组织名称" clearable @change="getResult">
            <el-option v-for='(item,index) in list' :key="index" :label="item.label" :value='item.id'></el-option>
          </el-select>
          <el-select v-model="isParticipate" placeholder="请选择参与情况" clearable @change="getResult">
            <el-option label="已参与" value="1"></el-option>
            <el-option label="未参与" value="0">
            </el-option>
          </el-select>
          <base-page-button title="导出" imgType="export" @click="exportRes('person')"/>
        </div>
        <el-table ref="personTable" :data="personTableData" tooltip-effect="dark" row-key="fileId" v-loading="loading" :header-cell-style="{'text-align':'center'}">
          <el-table-column type="index" label="排名" width="60px"  align="center"></el-table-column>
          <el-table-column label="人员名称" align="center"  show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.name | tableEmptyText}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织名称"  align="center"  show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.orgId['data'] | tableEmptyText}}</span>
            </template>
          </el-table-column>
          <el-table-column label="参与情况" width="90" align="center"  show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.isParticipate == '0'?'未参与':'已参与'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="考试得分" align="center" width="90px" show-overflow-tooltip>
            <template slot-scope="{row}">
              <span>{{row.isParticipate == '0'?'--':row.score}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" style="text-align: center">
      <el-button @click="close">知道了</el-button>
    </div>
  </el-dialog>

</template>
<script>
import {examResultPerson,examResultOrg,exportExamResultPerson,exportExamResultOrg} from '@/api/backstage/education/exam'
import commonReq from '@/api/public/commonReq'
export default{
  components:{
  },
  data(){
    return {
      visible:false,
      saveLoading:false,
      formData:{
        checkedQues:[

        ],//已选题目
      },
      title:'党课结业考试结果',
      isParticipate:'',
      rules:{},
      loading:false,
      examId:'',
      detas:null,
      orgId:'',
      shouldJoin:0,
      unJoin:0,
      personTableData:[],
      orgName:'',
      list:[]
    }
  },
  methods:{
    getResult(){
      this.loading = true
      let para = {
          current:1,
          size:9999,
          model:{
            examId:this.examId,
            isParticipate:this.isParticipate,
            orgId:{
              data: "",
              key: this.orgId
            }
          }
      }
      examResultPerson(para).then(res=>{
          // console.log(res)
          this.personTableData=res.records
          if(res.records.length){
            this.shouldJoin = res.records[0].involvedNum
            this.unJoin = res.records[0].uninvolvedNum
          }

      }).finally(()=>{
          this.loading =false
      })


    },
    // handleClick(tab, event) {
    //   this.isParticipate = ''
    //   this.orgId = ''
    //   this.getResult()
    //     // console.log(tab, event);
    // },
    show(examId,title,orgName,data){
      // this.examInfo = obj
      this.visible = true
      this.examId = examId
      this.title = title+'考试结果'
      this.orgName = orgName
      // this.getResult()
      this.personTableData=data.records
      if(data.records.length){
        this.shouldJoin = data.records[0].involvedNum
        this.unJoin = data.records[0].uninvolvedNum
      }
    },
    close(){
      this.visible = false
    },
    exportRes(type){
      let para = {
        current:1,
        model:{
          examId:this.examId,
          isParticipate:this.isParticipate,
          orgId:{
            key:this.orgId
          }
        },
        size:9999
      }
      exportExamResultPerson(para)

    }
  },
  mounted(){
    commonReq.getOrglist().then(res => {
      this.list = res
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 20px 0 4px;
}
/deep/ .el-dialog .el-dialog__body{
  overflow-x: hidden;
  padding:0;
  padding-bottom: 15px;
  .el-divider--horizontal{
    width: calc(100% + 20px);
  }
  .el-tabs__header{
    padding:0;
  }
  .page-btn{
    height: 35px;
    line-height: 35px;
    float: right;
  }
}
.ht{
  color:#FC7121;
}
.rp{
  color: #ED3C3C;
}
.grid{
  height: 50px;
  line-height: 50px;
  border-bottom:1px solid #eee;
  padding:0 20px;
  .gk{
    font-size:14px;
    color:#555;
    display: inline-block;
    width:70px;
    margin-right:20px;
  }
  .gv{
    font-size:14px;
    color: #333;
    font-weight: bold;
  }
}
.search{
  margin:20px
}
</style>


