<template>
  <div class="election-first">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <el-form ref="refForm" :model="formData" :rules="node" class="information" v-loading="loading">
        <el-row>
          <el-col :span="12">
            <el-form-item label="组织名称" prop="orgName">
              <el-input v-model="formData.orgId.data" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="本届任期" prop="term.key">
              <el-radio v-for="list in term" v-model="formData.term.key" :label="list.id" @change="changeEndDate">{{list.name}}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="换届日期" prop="transitionDate">
              <el-date-picker
                v-model="formData.transitionDate"
                type="date"
                :clearable = "false"
                :editable="false"
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                 @change="changeEndDate">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="届满日期" prop="endDate">
              <el-date-picker
                v-model="formData.endDate"
                type="date"
                clearable
                placeholder="请选择"
                value-format="yyyy-MM-dd"
                disabled>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="选举方式" prop="electionWay.key">
              <el-select v-model="formData.electionWay.key" placeholder="请选择" clearable @change="getElection">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="title == '新增'">
            <el-form-item label="沿用上届班子成员" class="old-members">
              <el-radio v-model="formData.continue" label="0" @change="continueMembers">是</el-radio>
              <el-radio v-model="formData.continue" label="1" @change="continueMembers">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="fl">
        <base-page-button title="新增" imgType="add" type="primary" @click="openadd()"/>
      </div>
      <!-- 表格 -->
      <div>
        <el-table
          v-loading="loading"
          class="table"
          tooltip-effect="dark"
          style="width:100%;margin: 0 auto"
          header-row-class-name="page-table-header"
          ref="returnTable"
          :data="records"
        >
          <el-table-column label="序号" width="50px" align="center">
            <template slot-scope="scope">
              <span>{{scope.$index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" min-width="80px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'memberId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="党内职务" min-width="100px"  align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'position.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="联系方式" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'phone')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属组织" width="200px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="任职日期" width="120px" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{isEmpty(records[scope.$index],'officeDate')}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="160" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <!--表格操作按钮组件-->
              <base-table-a type="detail" @click="gotoInfo(1,row)">详情</base-table-a>
              <base-table-a type="delete" @click="del(row)">删除</base-table-a>
            </template>
          </el-table-column>

          <!-- 空数据样式 -->
          <base-table-empty v-show="!loading" slot="empty"/>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
    <election-second ref="refAdd" @refresh="getList" />
    <members-info ref="refInfo" />
  </div>
</template>

<script>
  import {addCollectionList,addElectionList,electionInfo,editElectionList,deleteMembersList,getNewElection} from "@/api/backstage/party/class/election/election.js"
  import ElectionSecond from './election-second'
  import MembersInfo from './members-info'
  import commonReq from "@/api/public/commonReq";
  export default {
    name: "ElectionFirst",
    components: {
      ElectionSecond,
      MembersInfo
    },
    data() {
      return {
        visible:false,
        title:"",
        pageNum:1,
        pageSize:10,
        total:0,
        loading:true,
        formData:{
          continue:1,
          id: '',
          orgId:{
            data:"",
            key:""
          },
          term:{// 本届任期
            data:"",
            key:""
          },
          transitionDate:"",// 换届日期
          endDate:"",// 届满日期
          electionWay:{// 选举方式
            data:"",
            key:""
          },
          leadershipIds:[],//班子成员ID
          leaderships:[]//班子成员ID
        },
        node:{
          "term.key":{
            required: true,
            message: "请选择换届日期",
            trigger: "blur"
          },
          transitionDate:{
            required: true,
            message: "请选择换届日期",
            trigger: "blur"
          },
          "electionWay.key":{
            required: true,
            message: "请选择选举方式",
            trigger: "blur"
          }
        },
        options:[],
        term:[],
        records:[{}]
      }
    },
    mounted() {
      this.getTerm();
    },
    computed: {

    },
    watch: {

    },
    methods: {
      //本届任期、选举方式
      getTerm(){
        let params = {
          types:['term_type','election_way']
        }
        commonReq.getHistoryDict(params).then(response =>{
          this.term=response.term_type;
          this.options=response.election_way;
        })
      },
      //关闭弹窗
      close(){
        this.records=[{}];
        this.formData = {
          continue:1,
          id:0,
          orgId:{
            data:"",
            key:""
          },
          term:{
            data:"",
            key:""
          },
          transitionDate:"",
          endDate:"",
          electionWay:{
            data:"",
            key:""
          },
          leadershipIds:[],//班子成员ID
          leaderships:[]//班子成员ID
        }
        this.visible = false;
      },
      // 保存
      save(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            if(this.title == "新增"){
              let params = this.formData
              addElectionList(params).then(response => {
                this.$message(this.successTip())
                this.$emit('refresh')
                this.close();
              }).finally(() => {

              });
            }else{
              let params = this.formData
              editElectionList(params).then(response => {
                this.$message(this.successTip())
                this.$emit('refresh')
                this.close();
              }).finally(() => {

              });
            }
          }
        })
      },
      // 展示
      show(type,name,id,row){
        if(type == 1){
          this.loading = true;
          this.title="新增";
          let year = new Date().getFullYear();
          let month = new Date().getMonth()+1<10?"0"+(new Date().getMonth()+1):new Date().getMonth()+1;
          let day = new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate();
          this.formData.transitionDate = year+"-"+month+"-"+day;
          this.partyUid()
          this.formData.orgId.data = name;
          this.formData.orgId.key = id;
          this.records=[];
          this.formData.term.key=this.term[0].id;
          this.formData.continue="1"
          this.changeEndDate()
          this.continueMembers()
        }else{
          this.loading = true;
          this.title="编辑";
          this.getInfo(row)
        }
        this.visible = true;
      },
      // 添加班子成员
      openadd(){
        this.$refs['refAdd'].show(this.formData.id,this.formData.orgId.key,this.formData.orgId.data,this.records)
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
        })
      },
      // 班子成员信息
      getList(data){
        this.formData.leaderships.unshift({
          id:data.id,
          officeDate:data.officeDate
        })
        this.records.unshift(data);
      },
      // 计算届满日期
      changeEndDate(){
        for(let i=0;i<this.records.length;i++){
          if(this.formData.leaderships.indexOf({id:this.records[i].id})!=-1){
            this.records[i].officeDate = this.formData.transitionDate
          }
          this.formData.leaderships[i].officeDate = this.records[i].officeDate;
        }
        for(let i=0;i<this.term.length;i++){
          if(this.formData.term.key == this.term[i].id){
            this.formData.term.data = this.term[i].name
            let year = Number(this.formData.transitionDate.split("-")[0])+parseInt(this.term[i].name);
            let month = this.formData.transitionDate.split("-")[1];
            let date = this.formData.transitionDate.split("-")[2];
            this.formData.endDate = year+"-"+month+"-"+date
          }
        }
        this.continueMembers();
      },
      // 选举方式赋值
      getElection(){
        for(let i=0;i<this.options.length;i++){
          if(this.formData.electionWay.key == this.options[i].id){
            this.formData.electionWay.data = this.options[i].name
          }
        }
      },
      // 删除
      del(data){
        if(this.formData.leaderships.indexOf({id:data.id}) != -1){
          this.formData.leaderships.splice(this.formData.leaderships.indexOf(data.id),1)
        }
        for(let i=0;i<this.formData.leaderships.length;i++){
          if(data.id == this.formData.leaderships[i].id){
            this.formData.leaderships.splice(i,1)
          }
        }
        this.records.splice(this.records.indexOf(data),1)
        let params = {
          ids:[data.memberIds]
        }
        deleteMembersList(params).then(response => {

        }).finally(() => {

        });
      },
      // 获取编辑信息
      getInfo(row){
        let params={
          id:row.id
        }
        electionInfo(params).then(response => {
          this.formData=response;
          this.formData.leaderships=[];
          this.records=response.leadershipList;
          for(let i=0;i<response.leadershipList.length;i++){
            this.formData.leaderships.push({
              id:response.leadershipList[i].id,
              officeDate:response.leadershipList[i].officeDate
            })
          }
          this.loading = false;
        }).finally(() => {
          this.loading = false;
        });

      },
      // 是否沿用上届班子成员
      continueMembers(){
        this.loading = true;
        if(this.formData.continue == 0){
          let params={
            orgId:this.formData.orgId.key,
            transitionDate:this.formData.transitionDate
          }
          let vm = this;
          getNewElection(params).then(response => {
            vm.loading = false;
            this.formData.leadershipIds = [];
            this.formData.leaderships = [];
            vm.records = [];
            if(response){
              if(response.leadershipList && response.leadershipList.length > 0){
                vm.records = response.leadershipList;
                for(let i=0;i<vm.records.length;i++){
                  vm.records[i].officeDate = vm.formData.transitionDate;
                }
                vm.records.forEach(obj => {
                  vm.formData.leadershipIds.push(obj.id);
                  vm.formData.leaderships.push({
                    id:obj.id,
                    officeDate:obj.officeDate
                  });
                })
              }
            }
          }).finally(() => {
            vm.loading = false;
          });
        }else{
          this.loading = false;
          this.records = [];
          this.formData.leaderships=[];
        }
      },
      gotoInfo(type,row){
        this.$refs['refInfo'].show(type,row)
      }
    }
  }
</script>

<style scoped>
  .election-first >>> .el-dialog{
    width: 887px;
  }
  .election-first >>> .el-input{
    width: 300px;
  }
  .information{
    padding-left:34px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F3F3;
  }
  .fl{
    padding: 20px 0;
  }
  .election-first >>> .el-form-item__label{
    width: 80px;
  }
  .election-first >>> .el-form-item__error{
    left: 80px;
  }
  .old-members >>> .el-form-item__label{
    line-height: 20px;
  }
</style>
