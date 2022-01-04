<template>
  <div class="add-content">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">
      <el-form ref="refForm" label-width="100px" v-loading="loading" :model="listData" :rules="node">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传组织" prop="orgName">
              <el-input disabled show-overflow-tooltip v-model="orgName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="noticeDate">
            <el-form-item label="公示时间" prop="noticeDate" style="width:calc(100% - 208px);display: inline-block; ">
              <el-date-picker
                v-model="listData.noticeDate"
                align="right"
                type="year"
                placeholder="请选择"
                :editable="false"
                @change="changeName()"
                clearable
                :picker-options="pickerOptions"
                value-format="yyyy">
              </el-date-picker>
            </el-form-item>
            <el-select v-model="listData.noticeQuarter" placeholder="请选择" :editable="false" :clearable="false" @change="searchCol()">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题" prop="title" show-word-limit>
              <el-tooltip :content="listData.title" placement="top" :disabled="(listData.title != undefined && listData.title != null && listData.title.trim()!= '') ?false:true">
                <el-input v-model="listData.title" disabled placeholder="" maxlength="100" clearable>
                </el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="缴费总额" show-word-limit>
              <el-input v-model="totalAmount" disabled placeholder="" maxlength="100" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="缴费人员">
              <el-input readonly placeholder="请选择" @click.native="choosePersn">
                <i slot="suffix" class="el-select__caret el-input__icon el-icon-arrow-right"></i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公示详情" prop="list">
              <el-table
                class="table"
                tooltip-effect="dark"
                style="width:100%;margin: 0 auto"
                ref="publicityTable"
                :data="listData.list">
                <el-table-column label="人员姓名" min-width="120px" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span>{{isEmpty(listData.list[scope.$index],'memberName')}}</span>
                  </template>
                </el-table-column>

                <el-table-column label="党费" min-width="200px"  align="center" show-overflow-tooltip >
                  <template slot-scope="scope">
                    <el-form-item :prop="'list.' + scope.$index + '.dues'" :rules="{required: true, message: '请输入',trigger: 'blur'}">
                      <el-input v-model="listData.list[scope.$index].dues" clearable oninput="value=value.replace(/[^\d.]/g,'');if(isNaN(value)) { value =value.slice(0,value.length-1) } if(value.indexOf('.')<0){ if(value.length>9){ value =value.slice(0,value.length-1) } } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3);}"/>
                    </el-form-item>
                  </template>
                </el-table-column>
                <!-- 空数据样式 -->
                <base-table-empty slot="empty" :size="560"/>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save" v-if="title=='新增'">保 存</el-button>
        <el-button type="primary" @click="edit" v-if="title=='编辑'">保 存</el-button>
      </div>

    </el-dialog>
    <!--党小组选中人员-->
    <collection-search ref="refChoose" @refresh="getPerson"/>
  </div>
</template>

<script>
  import {getPartyMember,savePublicity,editPublicity,publicityInfo,searchCollection} from "@/api/backstage/party/dues/publicity/publicity.js"
  import commonReq  from "@/api/public/commonReq.js"
  import db from '@/utils/localstorage'//  获取用户登录id
  import CollectionSearch from '../../collection/components/collection-search'
  export default {
    name: "PublicityAdd",
    components: {
      CollectionSearch
    },
    data() {
      return {
        visible:false,
        loading:true,
        title:"",//标题
        orgName:"",//组织名称
        id:0,
        totalAmount:"",// 缴费信息
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
        listData:{
          title:"",//标题
          orgId:0,//组织id
          noticeQuarter:"2246476837383406026",//公示季度
          noticeDate:"",//公示时间
          list:[]
        },
        saveList:[],//保存公示人员金额
        ids:[],//保存人员
        node:{
          noticeDate:{
            required: true,
            message: "请选择",
            trigger: "blur"
          },
          list:{
            required: true,
            message: "请选择缴纳人员",
            trigger: "change"
          }
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

    },
    computed: {

    },
    methods: {
      //取消
      close(){
        this.visible = false;
        this.listData={
          title:"",//标题
          orgId:0,//组织id
          noticeQuarter:"2246476837383406026",//公示季度
          noticeDate:"",//公示时间
          list:[]
        }
        this.saveList=[]
        this.isd=[]
      },
      //保存
      save(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            return ;// 表单必填项判断
          }else{
            let params = this.listData
            savePublicity(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {

            });
          }
        })
      },
      //编辑
      edit(){
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            // this.$message.warning("您有必填项未填")
            return ;// 表单必填项判断
          }else{
            let params = this.listData
            editPublicity(params).then(response => {
              this.$message(this.successTip())
              this.$emit('refresh')
              this.close();
            }).finally(() => {

            });
          }
        })
      },
      //展示
      show(t,row){
        this.loading = true;
        this.saveList=[];
        this.ids=[];
        if(t==1){
          this.title="新增";
          this.listData.noticeDate=new Date().getFullYear()+"";
          this.getUser();
        }else{
          this.title="编辑"
          this.id = row.id;
          this.getInfo()
        }
        this.visible=true;
      },
      //获取用户信息
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        commonReq.getUserinformation(params).then(response => {
          this.orgName=response.data.orgName;
          this.listData.orgId=response.data.orgId;
          // this.getMember();
          this.loading=false;
          this.changeName();
        })
      },
      // 获取详情
      getInfo(){
        let params = {
          id:this.id
        }
        publicityInfo(params).then(response => {
          this.loading=false;
          this.orgName=response.orgId.data;
          this.listData=response;
          this.listData.noticeQuarter=response.noticeQuarter.key;
          this.listData.orgId=response.orgId.key;
          this.changeName();
          for(let i=0;i<response.list.length;i++){
            let list=response.list[i].memberId;
            this.listData.list[i].memberId = list.key;
            this.listData.list[i].memberName = list.data;
          }
        }).finally(() => {
          this.loading=false;
        });
      },
      // 自动生成标题
      changeName(){
        this.searchCol()
        if(this.listData.noticeDate){
          this.listData.title=this.orgName+"关于"+this.listData.noticeDate+"年党费公示"
        }else{
          this.listData.title=""
        }
      },
      // 获取缴费信息
      searchCol(){
        if(this.listData.noticeDate){
          let params = {
            collectionDate:this.listData.noticeDate,
            collectionQuarter:this.listData.noticeQuarter,
            orgId:this.listData.orgId
          }
          searchCollection(params).then(response => {
            if(response.flag == 0){
              this.totalAmount="未缴"
            }else{
              this.totalAmount=response.totalAmount;
            }
          }).finally(() => {

          });
        }
      },
      //党小组 - 选择人员
      choosePersn(){
        let list=[];
        let _this=this;
        _this.ids=[];
        _this.saveList=[];
        for(let i=0;i<this.listData.list.length;i++){
          // 保存人员公示信息及id防止新增成员后公示信息清空
          _this.ids.push(_this.listData.list[i].memberId);
          _this.saveList.push(_this.listData.list[i]);
          let data={
            id:this.listData.list[i].memberId,
            name:this.listData.list[i].memberName,
          }
          list.push(data)
        }
        this.$refs.refChoose.show(this.orgName,this.listData.noticeDate,this.listData.noticeQuarter,this.listData.orgId,list);
      },
      //党小组人员
      getPerson(list){
        let _this=this;
        this.listData.list=[];
        for(let i=0;i<list.length;i++){
          let data;
          if(_this.ids.indexOf(list[i].id) != -1){
            data=_this.saveList[_this.ids.indexOf(list[i].id)]
          }else{
            data={
              memberId:list[i].id,//党员id
              dues:0,//党费金额
              id:"",
              memberName:list[i].name
            }
          }
          _this.listData.list.push(data)
        }
      },
    }
  }
</script>

<style scoped>
  .add-content >>> .el-dialog{
    width: 560px;
  }
  .add-content .noticeDate >>> .el-input{
    width: 203px;
  }
  .add-content >>> .el-form-item__content{
    line-height: 25px;
  }
  .add-content >>> .el-dialog__body{
    max-height: 65vh;
  }
  .add-content .table >>> .is-error{
    height: 55px;
  }
</style>
