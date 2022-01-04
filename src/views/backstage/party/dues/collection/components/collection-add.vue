<template>
  <div class="collection-add">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <div class="front">
        <base-label-box label="党员姓名">
          <el-input v-model="name" style="width:292px;" maxlength="100" clearable />
        </base-label-box>
        <base-label-box label="是否缴纳" class="select">
            <el-radio v-model="radio" label="">全部</el-radio>
            <el-radio v-model="radio" label="1249242853247287296">是</el-radio>
            <el-radio v-model="radio" label="1249242903696375808">否</el-radio>
          <base-page-button title="查询" imgType="search" type="primary" style="position:relative;left:30px;" @click="searchInfo()"/>
        </base-label-box>
      </div>
      <div class="title"><img src="../../../../../../assets/page/icon-warning.png" />共{{tableData.list.length}}人，未缴清{{state}}人</div>
      <el-form ref="refForm" :model="tableData" :rules="node" class="backstage">
        <el-row>
          <el-col :span="24">
            <el-form-item label="收费组织" prop="orgName">
              <el-tooltip :content="orgName" placement="top" :disabled="(orgName != undefined && orgName != null && orgName.trim()!= '') ?false:true">
                <el-input v-model="orgName" disabled style="width:calc(100% - 79px);margin-left:10px;" />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴纳时间" prop="collectionDate" style="width:calc(100% - 155px);display: inline-block; ">
              <el-date-picker
                v-model="tableData.collectionDate"
                type="year"
                placeholder="选择年份"
                format="yyyy"
                value-format="yyyy"
                clearable
                :editable="false"
                style="width:calc(100% - 79px);"
                :picker-options="pickerOptions"
                @change="getInfo()">
              </el-date-picker>
            </el-form-item>
            <el-select placeholder="请选择季度" v-model='tableData.collectionQuarter' style="width:140px" value-key="id" :editable="false" :clearable="false" @change="getInfo()" >
              <el-option
                v-for="(item, index) in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-form-item label="缴纳总额" prop="totalAmount">
              <el-input v-model="tableData.totalAmount" oninput="value=value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>9){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3);}" clearable style="width:calc(100% - 79px);" maxlength="100" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="缴费人员">
              <el-input readonly style="width: calc(100% - 89px);;margin-left:10px;" placeholder="请选择" @click.native="choosePersn">
                <i slot="suffix" class="el-select__caret el-input__icon el-icon-arrow-right"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table class="base-table" border :data="selectList"  header-row-class-name="page-table-header" v-loading="loading">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="党员姓名" min-width="120px" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="cursor:pointer">{{isEmpty(selectList[scope.$index],'memberName')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否缴清" min-width="120px"  align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-radio v-model="selectList[scope.$index].isClear" label="1249242853247287296" @change="radioChange">是</el-radio>
            <el-radio v-model="selectList[scope.$index].isClear" label="1249242903696375808" @change="radioChange">否</el-radio>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty" :size="831"/>
      </el-table>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
    <collection-alert ref="refAlert" @saveAdd="saveAdd"></collection-alert>
    <!--党小组选中人员-->
    <collection-search ref="refChoose" @refresh="getPerson"/>
  </div>
</template>

<script>
  import {getCollectionDetail,getPartyMember,getCollectionSave,getCollectionEdit,infoCollectionList} from "@/api/backstage/party/dues/collection/collection.js"
  import CollectionSearch from './collection-search'
  import CollectionAlert  from "./collection-alert"
  import commonReq  from "@/api/public/commonReq.js"
  import db from '@/utils/localstorage'//  获取用户登录id
  export default {
    name: "CollectionAdd",
    components: {
      CollectionAlert,
      CollectionSearch
    },
    data() {
      return {
        visible:false,
        loading:true,
        title:"",//标题
        name:"",
        orgName:"",
        orgId:"",
        radio:"",
        isadd:true,
        state:0,//未缴清人数
        membersList:[],// 缴费人员
        tableData:{
          collectionDate: "",//缴纳时间
          collectionQuarter: "2246476837383406026",//缴纳季度
          orgName:"",
          list: [],
          orgId: 0,//组织ID
          state: 0,//缴费状态
          totalAmount: 0//缴纳总额
        },
        selectList:[{//筛选列表
          isClear: "",
          memberId: "",
          memberName: ""
        }],
        isClearIds:[],
        saveList:[],
        options:[{
          value:"2246476837383406026",
          label:"第一季度"
        },{
          value:"2246476837383406029",
          label:"第二季度"
        },{
          value:"2246476837383406032",
          label:"第三季度"
        },{
          value:"2246476837383406035",
          label:"第四季度"
        }],
        node:{
          collectionDate:{
            required: true,
            message: "请选择缴纳时间",
            trigger: "blur"
          },
          totalAmount:{
            required: true,
            message: "请输入缴纳总额",
            trigger: "blur"
          },
        },
        pickerOptions:{
          disabledDate(time) {
            if (new Date().getFullYear()+1 <= time.getFullYear()) {
              return true
            }
            return false
          }
        }
      }
    },
    mounted() {
      this.getUser()
    },
    computed: {

    },
    watch: {

    },
    methods: {
      //取消
      close(){
        this.tableData={
          collectionDate: "",//缴纳时间
          collectionQuarter: "2246476837383406026",//缴纳季度
          orgName:"",
          list: [],
          orgId: 0,//组织ID
          state: 0,//缴费状态
          totalAmount: 0//缴纳总额
        }
        this.state=0;
        this.name="";
        this.radio="";
        this.selectList = [{
          isClear: "",
          memberId: "",
          memberName: ""
        }];
        this.visible = false;
      },
      //保存
      save(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            this.$refs['refAlert'].show(this.tableData,this.state)
          }
        })
      },
      //弹窗提交
      saveAdd(){
        if(this.tableData.list.length == this.state){
          this.tableData.state="2246476837383406703";
        }else if(this.tableData.list.length > this.state){
          if(this.state == 0){
            this.tableData.state="2246476837383406043";
          }else{
            this.tableData.state="2246476837383406046";
          }
        }
        let params = this.tableData
        if(this.isadd){
          getCollectionSave(params).then(response => {
            this.$message(this.successTip())
            this.$emit('refresh')
            this.close();
          }).finally(() => {

          });
        }else{
          getCollectionEdit(params).then(response => {
            this.$message(this.successTip())
            this.$emit('refresh')
            this.close();
          }).finally(() => {

          });
        }
      },
      //展示
      show(t,row){
        this.visible=true;
        this.isClearIds=[];
        this.saveList=[];
        if(t == 1){
          this.title="收缴新增";
          this.orgId=row.orgId;
          this.tableData.orgId=row.orgId;
          this.orgName=row.orgName;
          this.isadd=true;
          this.tableData.collectionDate=new Date().getFullYear()+"";
          let month=new Date().getMonth();
          switch(month){
            case 0,1,2:
              this.tableData.collectionQuarter="2246476837383406026";
              break;
            case 3,4,5:
              this.tableData.collectionQuarter="2246476837383406029";
              break;
            case 6,7,8:
              this.tableData.collectionQuarter="2246476837383406032";
              break;
            case 9,10,11:
              this.tableData.collectionQuarter="2246476837383406035";
              break;
          }
          this.selectList = [];
          this.loading=false
        }else{
          this.title="收缴编辑";
          this.isadd=false;
          this.orgId=row.org.key;
          this.orgName=row.org.data;
          this.tableData.orgId=row.org.key;
          this.tableData.collectionDate=row.collectionDate;
          this.getInfo()
        }
      },
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          this.orgId=response.data.orgId;
          this.orgName=response.data.orgName;
        })
      },
      // 选择按钮
      radioChange(){
        let num=0;
        let _this=this;
        for(let i=0;i<_this.tableData.list.length;i++){
          if(_this.tableData.list[i].isClear == "1249242903696375808"){
            num++;
          }
        }
        this.state=num;
      },
      // 获取编辑详情
      getInfo(){
        if(this.isadd){
          return;
        }else{
          let params = {
            orgId:this.orgId,
            collectionDate:this.tableData.collectionDate,
            collectionQuarter:this.tableData.collectionQuarter
          }
          infoCollectionList(params).then(response => {
            if(response){
              this.tableData.id=response.id;
              this.tableData.orgName=response.orgName;
              this.tableData.list=response.list;
              this.tableData.totalAmount=response.totalAmount;
              this.selectList=this.tableData.list;
            }else{
              this.tableData.list=[];
              this.tableData.id="";
              this.tableData.totalAmount=0;
              this.selectList=this.tableData.list;
            }
            this.loading=false;
            this.radioChange();
          }).finally(() => {
            this.loading=false;
          });
        }
      },
      // 前端查询
      searchInfo(){
        let list=[];
        for(let i=0;i<this.tableData.list.length;i++){
          if(this.tableData.list[i].isClear == this.radio && !this.name){
            list.push(this.tableData.list[i])
          }else if(this.tableData.list[i].memberName.indexOf(this.name) != -1 && !this.radio){
            list.push(this.tableData.list[i])
          }else if(this.name && this.radio && this.tableData.list[i].memberName.indexOf(this.name) != -1 && this.tableData.list[i].isClear == this.radio){
            list.push(this.tableData.list[i])
          }else if(this.radio == "" && this.name == ""){
            list.push(this.tableData.list[i])
          }
        }
        this.selectList=list;
      },
      //党小组 - 选择人员
      choosePersn(){
        let _this=this;
        let list=[];
        _this.isClearIds=[];
        _this.saveList=[];
        for(let i=0;i<this.tableData.list.length;i++){
          _this.isClearIds.push(_this.tableData.list[i].memberId);
          _this.saveList.push(_this.tableData.list[i])
          let data={
            id:this.tableData.list[i].memberId,
            name:this.tableData.list[i].memberName,
            isClear:this.tableData.list[i].isClear
          }
          list.push(data)
        }
        this.$refs.refChoose.show(this.orgName,this.tableData.collectionDate,this.tableData.collectionQuarter,this.orgId,list);
      },
      //党小组人员
      getPerson(list){
        let _this=this;
        this.tableData.list=[];
        for(let i=0;i<list.length;i++){
          let data;
          if(_this.isClearIds.indexOf(list[i].id) != -1){
            data=_this.saveList[_this.isClearIds.indexOf(list[i].id)]
          }else{
            data={
              isClear: "1249242853247287296",
              memberId: list[i].id,
              memberName: list[i].name
            }
          }
          _this.tableData.list.push(data)
        }
        this.selectList = this.tableData.list
        this.radioChange();
      },
    }
  }
</script>

<style scoped>
  .collection-add >>> .el-input__suffix-inner i{
    margin-right: 5px;
    font-style:unset;
  }
  .collection-add >>> .el-dialog{
    width: 831px;
  }
  .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #3D9EFF;
    background-color: rgba(61, 158, 255, 0.1);
    margin-bottom: 20px;
  }
  .title img{
    height: 16px;
    width: 16px;
    margin:12px;
    float: left;
  }
  .collection-add >>> .cell{
    width: 100%;
    font-weight: 400;
  }
  .collection-add >>>.base-label-box{
    width: 100%;
  }
  .collection-add >>>.base-label-box .base-label-box__content{
    width: calc(100% - 73px);
  }
  .backstage >>> .base-label-box{
    width: 50%;
    margin-right: 0;
    float: left;
  }
  .backstage >>> .base-label-box__content{
    width: calc(100% - 73px);
  }
  .front >>> .base-label-box{
    width: 50%;
    margin-right: 0;
    float: left;
  }
  .front >>> .base-label-box__content{
    width: calc(100% - 73px);
  }
  .collection-add >>> .el-dialog__body{
    max-height: 65vh;
  }
  .backstage,.front{
    width: 100%;
    display: inline-block;
  }
  .backstage{
    padding-top: 20px;
    border-top: 1px solid #F3F3F3;
  }
  .front{
    margin-top: 20px;
  }
  .front >>> .base-label-box label{
    font-weight: 400;
  }
  .collection-add >>> .page-btn{
    min-width: 80px;
    width: 100px;
    height: 36px;
    line-height: 36px;
    margin:0;
    left: 0 !important;
  }
  .front >>> .el-radio__label{
    padding: 0;
  }
  .select >>> label{
    vertical-align: super;
  }
  .collection-add >>> .el-dialog__body{
    padding:20px 30px;
  }
  .collection-add >>> .el-form-item__error{
    left:77px;
  }
</style>
