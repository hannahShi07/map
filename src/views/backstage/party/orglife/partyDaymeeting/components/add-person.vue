<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1145px'
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="ruleForm" label-width="70px" v-loading="loading">
      <div class="personContainer">
        <div class="contentLeft">
          <el-form-item label="待选人员" prop="personSelect">
            <el-select
              v-model="personSelect"
              filterable
              placeholder="请选择"
              style="width:180px;"
              clearable>
              <el-option
                v-for="(item,index) in dicts.MENBER_MTYP"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input class="inputSearch" placeholder="请输入人员姓名/手机号检索" clearable v-model="info"></el-input>
            <el-button class="buttonSearch el-icon-search" type="primary" @click="selectPersons">查询</el-button>
          </el-form-item>
          <div class="center">
            <div class="centerTree">
              <span class="titleSpan">请选择组织</span>
              <div class="treeDiv">
                <!-- <base-page-tree @handleTreeClick="handleTreeClick"/> -->
<!--                <el-tree-->
<!--                  :expand-on-click-node="false"-->
<!--                  :data="treeList"-->
<!--                  :props="defaultProps"-->
<!--                  default-expand-all-->
<!--                  highlight-current-->
<!--                  @node-click="handleNodeClick1">-->
<!--                </el-tree>-->
                <el-tree
                  :expand-on-click-node="false"
                  class="base-page-tree__tree"
                  :data="treeList"
                  :props="defaultProps"
                  :indent="0"
                  node-key="id"
                  default-expand-all
                  :filter-node-method="filterNode"
                  highlight-current
                  :show-checkbox="checkVisible"
                  :check-strictly ="true"
                  @node-click="handleNodeClick1"
                  ref="tree">
                  <p slot-scope="{ node, data }" class="slot-tree-node">
                    <img v-if="node.childNodes.length === 0" src="@/assets/page/icon-file.png" alt="">
                    <span>{{ node.label }}</span>
                  </p>
                </el-tree>
              </div>
            </div>
            <div class="centerRight">
              <div class="titleTop">
                <span class="titleSpan">请选择人员</span>
              </div>
              <div class="treeDiv1">
                <el-checkbox-group v-model="listId">
                  <el-checkbox v-for="(items,index) in personList" :label="items.id" :key="items.id" @change="handleRoleCheckedChange(items,$event)">
                    <span class="text">{{items.name}}</span>
                    <span class="text">{{items.phone}}</span>
                  </el-checkbox>
                </el-checkbox-group>
              </div>

            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="contentRightname">
            <el-form-item label="人员名单" prop="">
              <el-select
                v-model="nameSelect"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                @change="selectTrigger"
                clearable>
                <el-option
                  v-for="item in nameSelectlist"
                  :key="item.id"
                  :label="item.participantsName"
                  :value="item.id">
                  <span class="txt">{{item.participantsName}}</span>
                  <span class="clearButton el-icon-error" @click.stop="deleteName(item.id)"></span>
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="rightList">
            <span class="titleSpan">请选择人员</span>
            <div class="treeDiv1 treeDiv2">
              <ul class="rightUl" v-loading="loading">
                <li v-for="item in listLi">
                  <span class="text">{{item.name}}</span>
                  <span class="text">{{item.phone}}</span>
                  <i class="el-icon-error" @click="delet(item)"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <el-col :span="24" class="tac">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
        <el-button type="primary" @click="saveNamelist">保存名单并确定</el-button>
      </el-col>
    </el-form>

    <!--保存人员名单弹窗-->
    <el-dialog
      class="bc-heard"
      title="请输入名单名称"
      :visible.sync="namelistVisible"
      width = '520px'
      @close="cancel"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="">
        <el-col :span="24">
          <el-form-item label="" prop="participantsName">
            <el-input v-model="participantsName" placeholder="请输入名单名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="text-center">
        <el-button size="medium" @click="cancel">取消</el-button>
        <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
      </div>
    </el-dialog>

  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import commonReq  from "@/api/public/commonReq.js"
  import { getPartyTree,getPartyMemberList,getNameList,getNameDelete,getNameInfo,getNameAdd,getNameEdit} from "@/api/backstage/party/orglife/partydaymeeting/partydaymeeting.js";
  export default{
    name:'add-person',
    components:{
    },
    props:{

    },
    data(){
      return{
        // 模态
        visible: false,
        namelistVisible:false,//保存人员名单弹窗
        title:'添加人员',
        loading:true,//加载遮罩
        personList:[],//待选人员列表
        listId:[],//已选人员id
        listLi:[],//已选中人员集合
        treeList: [],//左侧组织树
        info:'',//人员姓名或手机号
        orgId:'',//党组织id
        orgCode:'',//党组织编码
        orgName:'',//党组织名称
        orgs:[],//所选人员的组织
        type:'',//会议类型

        personSelect:'',
        dicts: {//字典
          MENBER_MTYP:{},//党员类型
        },

        checkVisible:false,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        nameSelectlist:[],//人员名单下拉框
        nameSelect:'',//人员名单
        nameType:'nameType',//人员名单保存type值
        participantsId:'',//人员名单
        participantsName:'',//人员名称
        isEdit:1,//新增：1，编辑：2
        id:'',//编辑人员名单id


      }
    },
    watch:{

    },
    mounted(){

    },
    methods:{
      filterNode (value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['MENBER_MTYP']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.MENBER_MTYP = res.MENBER_MTYP;

        })
      },
      // 调用数据接口
      getTree(){
        let params = {
          name:''
        }
        this.loading = true;
        getPartyTree(params).then(response => {
          const res = response;
          this.treeList=res;
          this.orgId=res[0].id;
          this.orgCode=res[0].code;

        }).finally(() => {
          this.loading = false;
        });
      },
      //查询人员名单
      getName(){
        let params = {
          type:this.nameType
        }
        getNameList(params).then(response => {
          const res = response;
          this.nameSelectlist=res;
          if(this.participantsName!='' && this.participantsName!=undefined && this.participantsName!=null && this.participantsName!='null'){
            for(let i=0;i<this.nameSelectlist.length;i++){
              if(this.participantsName==this.nameSelectlist[i].participantsName){
                this.nameSelect=this.nameSelectlist[i].id

              }
            }
          }
        })
      },
      //删除人员名单
      deleteName(id){
        let params = {
          id:id
        }
        getNameDelete(params).then(response => {
          const res = response;
          this.$message(this.successTip())
          this.getName();
          this.nameSelect='';
          this.listId=[];
          this.listLi=[];
          this.orgs=[];

        })
      },
      //查询人员信息
      selectTrigger(id){
        this.listId=[];
        this.orgs=[];
        if(id!='' && id!=undefined && id!=null && id!='null'){
          this.id=id;
          if(this.nameSelectlist!='' && this.nameSelectlist!=undefined && this.nameSelectlist!=null && this.nameSelectlist!='null' && this.nameSelectlist.length>0){
            for(let i=0;i<this.nameSelectlist.length;i++){
              if(id==this.nameSelectlist[i].id){
                this.participantsName=this.nameSelectlist[i].participantsName
              }
            }
          }
          let params = {
            id:id
          }
          this.loading = true;
          getNameInfo(params).then(response => {
            const res = response;
            this.listLi=res
            if(this.orgs.length === 0){
              for(let j=0;j<this.listLi.length;j++){
                let jsonData = {
                  data:this.listLi[j].orgName,
                  key:this.listLi[j].orgId
                }
                this.orgs.push(jsonData);
              }

              //删除重复数据
              for(let i = 0; i < this.orgs.length; i++ ){
                for(let j = i + 1; j < this.orgs.length; j++){
                  if(this.orgs[i].key == this.orgs[j].key){
                    this.orgs.splice(j, 1);
                  }
                }
              }

            }else{
              let flag = true;
              for(let j=0;j<this.listLi.length>0;j++){
                for(let i=0;j<this.orgs.length>0;i++){
                  if(this.listLi[j].orgId ===this.orgs.key){ // 对象里的唯一标识id
                    flag = false;
                  }
                }
                if(flag){
                  let jsonData = {
                    data:this.listLi[j].orgName,
                    key:this.listLi[j].orgId
                  }
                  this.orgs.push(jsonData);
                }
              }
            }
            for(let i=0;i<this.personList.length>0;i++){
              for(let j=0;j<this.listLi.length>0;j++){
                if(this.personList[i].id==this.listLi[j].id){
                  this.listId.push(this.listLi[j].id)
                }
              }
            }
          }).finally(() => {
            this.loading = false;
          });
        }else{
          this.id=id;
          this.listLi=[];
          this.orgs=[];
          this.participantsName='';
        }
      },
      //打开添加人员
      show (orgs,listLi,listId,name) {
        this.orgs = orgs
        this.listLi = listLi
        this.listId = listId
        this.participantsName=name
        this.visible = true
        this.getTree()
        this.getDict()
        this.getName()
      },
      //组织树点击事件
      handleNodeClick1(data,indeterminate){
        this.orgId = data.id;
        this.orgName = data.name;
        this.orgCode=data.code;
        this.selectPersons()
      },
      //查询待选人员
      selectPersons(){
        let params = {
          info:this.info,
          orgCode:this.orgCode,
          // orgId:{
          //   key:this.orgId
          // },
          type:{
            key:this.personSelect
          }
        }
        getPartyMemberList(params).then(response => {
          const res = response;
          this.personList=res;
          for(let i=0;i<this.personList.length>0;i++){
            for(let j=0;j<this.listLi.length>0;j++){
              if(this.personList[i].id==this.listLi[j].id){
                this.listId.push(this.listLi[j].id)
              }

            }
          }
        })
      },
      //选中待选人员事件
      handleRoleCheckedChange(value,val){
        if(val){//选中
          this.listLi.push(value)
          if(this.orgs.length === 0){
            let jsonData = {
              data:value.orgId.data,
              key:value.orgId.key
            }
            this.orgs.push(jsonData);
          }else{
            let flag = true;
            this.orgs.forEach(item=>{
              if(value.orgId.key == item.key){ // 对象里的唯一标识id
                flag = false;
              }
            })
            if(flag){
              let jsonData = {
                data:value.orgId.data,
                key:value.orgId.key
              }
              this.orgs.push(jsonData);
            }
          }
        }else{//取消选中
          this.orgs = [];
          // this.orgs.forEach((item ,index) =>{
          //   if(value.orgId.key ===item.key){ // 对象里的唯一标识id
          //     this.orgs.splice(index,1)
          //   }
          // })

          this.listLi.forEach((item ,index) =>{
            if(value.id ===item.id){ // 对象里的唯一标识id
              this.listLi.splice(index,1)
            }
          })

          this.listLi.forEach((item, index) => {
            let params = {
              data: item.orgId.data,
              key: item.orgId.key
            }
            this.orgs.push(params)

          })
          //删除重复数据
          for(let i = 0; i < this.orgs.length; i++ ){
            for(let j = i + 1; j < this.orgs.length; j++){
              if(this.orgs[i].key == this.orgs[j].key){
                this.orgs.splice(j, 1);
              }
            }
          }
        }
      },
      delet(val){
        let index = this.listLi.indexOf(val);
        let ind = this.listId.indexOf(val.id)
        this.listLi.splice(index,1)
        this.listId.splice(ind,1)

        this.listLi.forEach((item, index) => {
          if(typeof item.orgId=='object'){
            this.orgs.push({
              data: item.orgId.data,
              key: item.orgId.key
            })
          }else if(typeof item.orgId=='string'){
            this.orgs.push({
              data: item.orgName,
              key: item.orgId
            })
          }

        })
        //删除重复数据
        for(let i = 0; i < this.orgs.length; i++ ){
          for(let j = i + 1; j < this.orgs.length; j++){
            if(this.orgs[i].key == this.orgs[j].key){
              this.orgs.splice(j, 1);
            }
          }
        }
      },
      //确定
      save(){
        //删除重复数据
        for(let i = 0; i < this.orgs.length; i++ ){
          for(let j = i + 1; j < this.orgs.length; j++){
            if(this.orgs[i].key == this.orgs[j].key){
              this.orgs.splice(j, 1);
            }
          }
        }
        this.$emit('refresh',this.orgs,this.listLi,this.listId,this.participantsName)
        this.close()
      },
      //关闭
      close(){
        this.visible = false;
        this.clear();
      },
      //数据清空
      clear(){
        this.personList = []//待选人员列表
        this.listLi = []//已选中人员
        this.info = ''//人员姓名或手机号
        this.orgId = ''//党组织id
        this.orgs = []//所选人员的组织
        this.nameSelect='';
      },
      //打开保存名单弹窗
      saveNamelist(){
        if(this.listLi=='' || this.listLi==undefined || this.listLi==null || this.listLi=='null' || this.listLi.length<=0){
          this.$message.warning("请选择人员")
          return
        }
        this.namelistVisible=true;


      },
      //关闭保存人员名单弹窗
      cancel(){
        this.namelistVisible=false

      },
      //保存保存人员名单
      saveBtn(){
        if(this.nameSelectlist.length>100){
          this.$message.warning("人员名单数超过100条，请删除部分名单")
          return
        }
        if(this.participantsName=='' || this.participantsName==undefined || this.participantsName==null || this.participantsName=='null'){
          this.$message.warning("请填写名单名称")
          return
        }
        if(this.listLi!='' && this.listLi!=undefined && this.listLi!=null && this.listLi!='null' && this.listLi.length>0){
          this.participantsId=[];
          for(let i=0;i<this.listLi.length;i++){
            this.participantsId.push(this.listLi[i].id)
          }
          this.participantsId=this.participantsId.join(',')
        }else{
          this.participantsId='';
        }
        if(this.id=='' || this.id==undefined || this.id==null || this.id=='null'){
          let params = {
            participantsId:this.participantsId,
            participantsName:this.participantsName,
            type:this.nameType
          }
          getNameAdd(params).then(response => {
            const res = response;
            this.$message(this.successTip())
            this.$emit('refresh',this.orgs,this.listLi,this.listId,this.participantsName)
            this.getName();
            this.cancel();
            this.close();
          })

        }else{
          let params = {
            id:this.id,
            participantsId:this.participantsId,
            participantsName:this.participantsName,
            type:this.nameType
          }
          getNameEdit(params).then(response => {
            const res = response;
            this.$message(this.successTip())
            this.$emit('refresh',this.orgs,this.listLi,this.listId,this.participantsName)
            this.getName();
            this.cancel();
            this.close();
          })

        }

      }

    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog .el-dialog__body{
    max-height:78vh;
  }

  /*添加人员 start*/
  .personContainer{
    display:flex;
  }
  .contentLeft{
    border-right:8px solid #EEEEEE;
    width:calc(100% - 275px)
  }
  .contentRight{
    width:275px;
    padding-left:25px;
  }

  .contentLeft /deep/ .el-form-item__content{
    display:flex;
    justify-content:flex-start;
    align-items:center;
  }
  .contentLeft /deep/ .inputSearch{
    width:265px;
  }
  .contentLeft /deep/ .el-button{
    margin-left:10px!important;
  }
  .contentLeft /deep/ .el-icon-search:before{
    margin-right:12px;
  }
  .contentLeft /deep/ .el-form-item__label{
    font-size:14px;
    color:#333;
  }
  .center{
    display:flex;
    justify-content:flex-start;
  }
  .centerTree{
    width:calc(100% - 245px);
    padding-right:10px;
    border-right:8px solid #F3F3F3;
  }
  .titleSpan{
    display:block;
    font-size: 16px;
    color: #333;
    margin-bottom:15px;
  }
  .centerRight{
    padding:0 20px;
    padding-right:10px;
  }
  .treeDiv{
    /*height:360px;*/
    width:100%;
    /*overflow:auto;*/
  }
  .treeDiv1{
    height:360px;
    width:245px;
    overflow:auto;
  }
  .treeDiv2{
    width:250px;
  }
  .rightUl{
    padding-left:0;
  }
  .rightUl li{
    display:flex;
    align-items:center;
    padding:10px 0;

  }
  .rightUl li .text{
    display:block;
    width:120px;
    margin-right:10px;
    text-align:left;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;

  }
  .rightUl li .text:first-of-type{
    width:60px;
  }
  /*.rightUl li .text:first-of-type{*/
  /*// margin-left:10px;*/
  /*}*/
  .rightUl li{
    position:relative;
  }
  .rightUl li i{
    position:absolute;
    right:5px;
    top:10px;
    display:block;
    font-size:18px;
    color:#DCDCDC;
  }
  .treeDiv /deep/ .el-tree-node__label{
    white-space: pre-wrap;
    word-break:break-all;
    word-wrap:break-word;
  }
  .treeDiv1 /deep/ .el-checkbox{
    width:100%;
    padding:10px 0;
    display:flex;
    justify-content: flex-start;
    align-items:center;
  }
  .treeDiv1 /deep/ .el-checkbox__label{
    display:flex;
    justify-content: flex-start;
    width:100%;
  }
  .treeDiv1 /deep/ .el-checkbox__label .text{
    display:block;
    width:120px;
    margin-right:10px;
    text-align:left;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;

  }
  .treeDiv1 /deep/ .el-checkbox__label .text:first-of-type{
    width:60px;
  }
  .treeDiv1 /deep/ .el-checkbox__input.is-checked+.el-checkbox__label .text{
    color:#606266;
  }
  .treeDiv2{
    height:400px;
  }
  .el-select-dropdown__item{
    width:100%;
    height:auto;
    line-height:18px;
    padding:10px 15px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .txt{
    width:80%;
    white-space: pre-wrap;
    word-break:break-all;
    word-wrap:break-word;
  }
  .clearButton{
    font-size:20px!important;
    color:#888!important;

  }
  /*添加人员 end*/

  /*左侧组织树样式*/
  .base-page-tree__tree /deep/ {
    max-height: 46vh;
    overflow-y: auto;
  }
  .el-dialog .el-dialog__body /deep/ {
    max-height: 0;
    overflow-y: 0;
  }
  .base-page-tree__tree /deep/ {

    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }

    > .el-tree-node {
      padding-left: 0;
    }

    .el-tree-node__content {
      margin-top: 20px;
      font-size: 14px;
      color: #666666;
      height:auto;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node::before {
      content: '';
      height: calc(100% + 12px);
      width: 1px;
      position: absolute;
      left: -3px;
      top: -26px;
      border-width: 1px;
      border-left: 1px dashed #52627C;
      z-index: 1;
    }

    .el-tree-node:last-child::before {
      height: 38px;
    }

    .el-tree-node::after {
      content: '';
      width: 24px;
      height: 20px;
      position: absolute;
      left: -3px;
      top: 16px;
      border-width: 1px;
      border-top: 1px dashed #52627C;
    }

    & > .el-tree-node::after {
      border-top: none;
    }

    & > .el-tree-node::before {
      border-left: none;
    }

    .el-tree-node__expand-icon {
      position: relative;
      left: 5px;
      top: 2px;
      font-size: 0px;
      width: 14px;
      height: 14px;
      background: url('~@/assets/page/icon-plus.png') no-repeat 100% 100%;
      margin-right: 10px;

      &.is-leaf {
        margin-right: 0;
        width: 0;
        height: 0;
        background: none;
      }

      &.expanded {
        transform: none;
        background: url('~@/assets/page/icon-sub.png');
      }

    }

    .slot-tree-node {

      > img {
        width: 14px;
        height: 16px;
        vertical-align: sub;
        margin-right: 3px;
      }
      > span{
        display:inline-block;
        white-space: pre-wrap;
        word-break: break-all;
        vertical-align:top;
        padding-right:25px;
      }

    }
  }



</style>

