<template>
  <div class="sociology-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="24">
              <el-form-item label="指导员姓名" prop="">
                {{isEmpty(formData.name)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="专职/兼职" prop="">
                {{isEmpty(formData.isFullTime.data)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="联系方式" prop="">
                {{isEmpty(formData.phone)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="">
                {{isEmpty(formData.idCode)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驻派等级" prop="">
                {{isEmpty(formData.stationGrade.data)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="所属企业" prop="">
                {{isEmpty(formData.company)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="担任职务" prop="">
                {{isEmpty(formData.position)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="走访频率" prop="">
                {{isEmpty(frequency(formData.frequency.key))}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="company" :span="24">
              <el-form-item label="指导企业" prop="">
                <div class="company-list" v-for="(list,index) in formData.companyList" :key="index">{{isEmpty(list.companyName)}}</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="">
                {{isEmpty(formData.remarks)}}
              </el-form-item>
            </el-col>
          </el-row>
          <div class="photo">
            <div class="img-content">
              <img class="iconperson" v-if="imageUrl==''" src="../../../../../../assets/page/icon-person.png">
              <img class="personimg"  v-else :src="imageUrl">
            </div>
          </div>
        </div>
      </el-form>
      <div class="guidance-record">
        <div class="guidance-title">指导记录</div>
        <el-table
          v-loading="loading"
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="returnTable"
          :data="tableData"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导企业" min-width="120px" align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'enterpriseName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="组织名称" min-width="120px"  align="content" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="指导方式" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'manner.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指导时间" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'guidanceTime')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty"/>
        </el-table>
        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="close">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getGuidanceInfo,recordList} from "@/api/front/corporate/care/instructor/instructor.js"
import commonReq  from "@/api/public/commonReq.js"
export default {
  name: "InstructorInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"指导员详情",//标题
      pageNum:1,
      pageSize:10,
      total:0,
      tableData:[],
      loading:true,
      options:[
        {
          label:"是",
          value:0
        },
        {
          label:"否",
          value:1
        }
      ],
      photo:"",
      formData:{
        "company": "",//所属企业
        "enterpriseId": "",//指导企业id(多选企业)
        "frequency": "",//走访频率<字典表>
        "frequencyTime": "",//走访频次
        "idCode": "",//	身份证号码
        "isDelete": "",//	是否删除
        "isFullTime": "",//专职/兼职(字典表)
        "name": "",//	指导员姓名
        "orgCode": "",//	所属组织
        "phone": "",//	联系电话
        "position": "",//	担任职务
        "remarks": "",//备注
        "stationGrade": ""//	驻派等级<县级党建指导员/区级联络员>
      },
      node:{},
      imageUrl:'',
      interviewList:[]
    }
  },
  mounted() {
    this.getGrade();
  },
  computed: {

  },
  methods: {
    close(){
      this.formData={
        "company": "",//所属企业
        "enterpriseId": "",//指导企业id(多选企业)
        "frequency": "",//走访频率<字典表>
        "frequencyTime": "",//走访频次
        "idCode": "",//	身份证号码
        "isDelete": "",//	是否删除
        "isFullTime": "",//专职/兼职(字典表)
        "name": "",//	指导员姓名
        "orgCode": "",//	所属组织
        "phone": "",//	联系电话
        "position": "",//	担任职务
        "remarks": "",//备注
        "stationGrade": ""//	驻派等级<县级党建指导员/区级联络员>
      }
      this.imageUrl=''
      this.visible=false;
    },
    show(row){
      this.visible=true;
      this.getInfo(row.id)
    },
    getInfo(id){
      let params = {
        id:id
      }
      this.loading = true;
      getGuidanceInfo(params).then(response => {
        this.formData = response;
        this.loading = false;
        this.pageChange();
        this.getFile(id)
      }).finally(() => {

      });
    },
    pageChange(){
      let params = {
        current: this.pageNum,
        model: {
          guidanceId:this.formData.id
        },
        size: this.pageSize,

      }
      this.loading = true;
      recordList(params).then(response => {
        this.tableData = response.records;
        this.total = response.total;
        this.loading = false;
      }).finally(() => {

      });
    },
    //获取头像
    getFile(id){
      let params={
        bizIds: id,
      }
      commonReq.getAttachment(params).then(response => {
        const res = response;
        if(res.length > 0 && res[0].list.length > 0){
          if(res[0].list[0].url != undefined && res[0].list[0].url != null && res[0].list[0].url != ""){
            this.imageUrl = res[0].list[0].url
          }
        }
      }).finally(() =>{
        this.loading = false
      })
    },
    getGrade(){
      let params = {
        types:["interview_frequency"]
      }
      commonReq.getHistoryDict(params).then(response =>{
        this.interviewList=response.interview_frequency;
      })
    },
    frequency(val){
      for(let i=0;i<this.interviewList.length;i++){
        if(val == this.interviewList[i].id){
          if(this.formData.frequencyTime){
            return this.interviewList[i].name+this.formData.frequencyTime+"次";
          }else{
            return "";
          }
        }
      }
      return "";
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 902px;
    max-height: 850px;
    overflow: auto;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .information{
    width: 100%;
    float: left;
    position: relative;
  }
  .information >>> .el-form-item__content{
    font-weight: 600;
  }
  .information >>> .el-form-item__label{
    text-align: left;
  }
  .information >>> .el-form-item{
    height: 50px;
    padding: 5px 0;
    margin:0;
    border-bottom: 1px solid #EEEEEE;
  }
  .photo{
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: #fff;
    padding-left: 20px;
    height: 133px;
    width: 115px;
  }
  .company >>> .el-form-item{
    height: auto;
  }
  .company-list{
    height: 26px;
    border-radius: 4px;
    background-color: #F2F2F2;
    line-height: 26px;
    margin-top: 8px;
    padding-left: 10px;
    padding-right: 10px;
    font-weight: 400;
  }
  .img-content{
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100%;
    overflow:hidden;
    border:none;
  }
  .img-content .personimg{
    width:100%;
  }
  .guidance-record{
    width: 100%;
    max-height: 620px;
    margin-top: 20px;
  }
  .guidance-title{
    padding: 10px 0;
    font-size: 16px;
    color: #666;
    line-height: 21px;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-weight: Bold;
    margin-bottom: 20px;
  }
</style>
