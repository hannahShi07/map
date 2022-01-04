<template>
  <div class="sociology-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" :model="formData" label-width="100px">
        <div class="information">
          <el-row>
            <el-col :span="12">
              <el-form-item label="党员姓名" prop="">
                {{isEmpty(formData.memberName)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="">
                {{formData.sex?isEmpty(formData.sex.data):'--'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="收费组织" prop="">
                {{isEmpty(formData.orgName)}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="">
                {{isEmpty(formData.idCard)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="党费性质" prop="">
                {{formData.moneyType?isEmpty(formData.moneyType.data):'--'}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="月实缴金额" prop="">
                {{isEmpty(formData.amount)}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缴费月份" prop="">
                {{isMonth(isEmpty(formData.startTime))}}~{{isMonth(isEmpty(formData.endTime))}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="photo">
          <el-form-item label="附件" prop="">
            <div class="img-content" v-for="list in imageUrls">
              <img class="iconperson" v-if="list.src==''" src="../../../../../../assets/page/icon-person.png">
              <img class="personimg"  v-else :src="list.src">
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="dues-examine">
        <el-row>
          <el-col :span="24">
            <base-label-box label="审核">
              <el-radio label="1249229126229819392" v-model="duesType">通过</el-radio>
              <el-radio label="1249229086480400384" v-model="duesType">驳回</el-radio>
            </base-label-box>
          </el-col>
        </el-row>
        <el-col :span="24">
            <base-label-box label="备注" :class="duesType=='1249229086480400384'?'import':''">
              <el-input type="textarea" v-model="comment" show-overflow-tooltip show-word-limit resize="none" :autosize='{ minRows: 5, maxRows: 5 }' maxlength="500" />
            </base-label-box>
          </el-col>
        </el-row>
        <div class="dialog-footer" style="text-align:center">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </div>
      <div class="examine-record">
        <div class="title">审核记录</div>
        <el-table
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          ref="duesTable"
          :data="duesTable"
          :header-cell-style="{'text-align':'center'}"
        >
          <el-table-column label="审核人" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'createUserName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="审核结果" min-width="100px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'stateName')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="审核意见" min-width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'comment')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="审核时间" min-width="160px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(duesTable[scope.$index],'updateTime')}}</span>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty slot="empty" :size="700"/>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {examineInfo,examineSave} from "@/api/backstage/party/partymember/dues/dues.js"
import commonReq  from "@/api/public/commonReq.js"
export default {
  name: "InstructorInfo",
  components: {

  },
  data() {
    return {
      visible:false,
      title:"指导员详情",//标题
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
      duesType:"1249229126229819392",//通过:1249229126229819392 驳回:1249229086480400384
      formData:{},
      comment:"",//备注
      commitId:"",
      duesTable:[],
      imageUrls:[],
    }
  },
  mounted() {
    
  },
  computed: {

  },
  methods: {
    close(){
      this.formData={}
      this.duesType="1249229126229819392"
      this.comment=""
      this.imageUrls=[]
      this.commitId=""
      this.visible=false;
    },
    save(){
      if(this.duesType!=='1249229086480400384'){
        let params = {
          comment:this.comment,
          commitId:this.commitId,
          status:this.duesType
        };
        examineSave(params).then(response => {
          this.$emit('refresh')
          this.$message(this.successTip())
          this.close();
        }).finally(() => {

        });
      }else{
        if(this.comment.trim()){
          let params = {
            comment:this.comment,
            commitId:this.commitId,
            status:this.duesType
          };
          examineSave(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          }).finally(() => {

          });
        }else{
          this.$message('请输入备注')
        }
      }
    },
    show(t,row){
      this.visible=true;
      this.formData={}
      this.duesType="1249229126229819392"
      this.comment=""
      this.commitId=""
      this.imageUrls=[]
      this.getInfo(row.commitId)
    },
    getInfo(id){
      this.commitId=id
      let params = {
        commitId:id
      }
      this.loading = true;
      examineInfo(params).then(response => {
        this.formData = response;
        this.duesTable = response.list;
        this.loading = false;
        this.getFile(id)
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
        this.imageUrls = []
        if(res.length > 0 && res[0].list.length > 0){
          for(let i=0;i<res[0].list.length;i++){
            this.imageUrls.push({src:res[0].list[i].url})
          }
        }
      }).finally(() =>{
        this.loading = false
      })
    },
    isMonth(val){
      val = val.split("-")[0]+"-"+val.split("-")[1]
      return val;
    }
  }
}
</script>

<style scoped>
  .sociology-add >>> .el-dialog{
    width: 778px;
  }
  .sociology-add >>> .el-dialog__body{
    padding:0;
    background-color: #EEE;
  }
  .sociology-add >>> .el-form-item{
    margin-bottom: 20px;
  }
  .sociology-add >>> .el-input__inner{
    height: 34px;
  }
  .el-form{
    background-color: white;
    padding: 0 20px;
  }
  .information{
    width: 100%;
    float: left;
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
  .information >>> .el-form-item__content{
    font-weight: bold;
    color: #333;
  }
  .photo{
    float: left;
    min-height: 112px;
    width: 100%;
  }
  .photo >>> .el-form-item__label{
    text-align: left;
  }
  .photo >>> .el-form-item{
    height: 100%;
    margin: 0;
  }
  .photo >>> .el-form-item__content{
    height: 100%;
    padding-top: 10px;
  }
  .photo >>> .img-content{
    margin: 5px;
    height: 100%;
    width: auto;
    display: inline-block;
    -webkit-box-pack:unset;
    justify-content:unset;
    -webkit-box-align:unset;
    align-items:unset;
  }
  .photo >>> .img-content img{
    height: 100%;
  }
  .photo >>> .img-content{
    height: 100%;
  }
  .dues-examine{
    margin-top: 10px;
    background-color: white;
    width: 100%;
    height: 250px;
    padding: 20px;
  }
  .dues-examine >>> .base-label-box__label{
    float: left;
    text-align: left;
    width: 40px;
    color: #555;
    font-weight: 400;
  }
  .dues-examine >>> .el-textarea__inner{
    width: 685px;
  }
  .examine-record{
    margin-top: 10px;
    background-color: white;
    width: 100%;
    padding: 20px;
  }
  .examine-record >>> .title{
    font-size: 16px;
    font-weight: bold;
    color: #666;
    text-align: left;
    margin-bottom: 14px;
  }
  .import >>> .base-label-box__label::before{
    content: '*';
    color: #ff4949;
    position: absolute;
    margin-top: 3px;
    margin-left: -8px;
  }
</style>
