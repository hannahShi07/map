<template>
  <el-dialog :visible.sync="visible" append-to-body title="发起转接" @close="cancel"
             :close-on-click-modal="false" :close-on-press-escape="false" width="888px" v-if="visible">
    <el-form :rules="node" ref="refForm" :model="formData" label-width="120px" v-cloak v-loading="loading">
      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="转接类型" prop="type.key">
            <el-select
                class="wp-100"
                v-model="formData.type.key"
                value-key="id"
                filterable
                @change="selectkey"
                placeholder="请选择"
                style="width:190px;"
                clearable>
                <el-option
                    v-for="(item,index) in dicts.transfer_type"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <a class="pointer" style="color: #3D9EFF;" @click="showTree">查看园区内组织</a>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="当前组织">
            <el-input v-model="currentOrg.data" disabled/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item class="is-required" label="转接人员"  prop="memberId.key">
            <el-input v-if="disableName" v-model="formData.djMemberSaveDTO.name" disabled/>
            <el-select
                v-if="!disableName"
                class="wp-100"
                v-model="formData.memberId.key"
                value-key="id"
                filterable
                placeholder="请选择"
                style="width:100%;"
                @change="selectTrigger"
                clearable>
                <el-option
                    v-for="(item,index) in nameList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="党费缴纳年月">
            <el-date-picker v-model="timeMonth" type="month" placeholder="请选择" value-format="yyyy-MM"/>
            <!-- <el-input v-model="timeMonth" disabled/> -->
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="isShow || disableName">
        <el-col :span="12">
          <el-form-item label="性别" prop="djMemberSaveDTO.sex.data">
            <el-input v-model="formData.djMemberSaveDTO.sex.data" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证号" prop="djMemberSaveDTO.idCode">
            <el-input v-model="formData.djMemberSaveDTO.idCode" disabled/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item v-if="formData.type.key=='1303258629775818752'" class="is-required" label="接收组织" prop="acceptOrg.data">
            <el-input v-model="formData.acceptOrg.data" placeholder="请输入" class="wp-100"/>
<!--            <el-input v-else v-model="formData.acceptOrg.data" placeholder="请选择" @click.native="getlistTree" class="wp-100"/>-->
          </el-form-item>
          <el-form-item v-else class="is-required" label="接收组织" prop="acceptOrg.key" >
<!--            <el-input v-if="formData.type.key=='1303258629775818752'" v-model="formData.acceptOrg.data" placeholder="请输入" class="wp-100"/>-->
            <el-input v-model="formData.acceptOrg.data" placeholder="请选择" @click.native="getlistTree" class="wp-100"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="转接原因" prop="transferCause">
        <el-input v-model="formData.transferCause" type="textarea" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 11, maxRows: 11}"/>
      </el-form-item>

      <el-form-item class="file" label="上传介绍信">
        <base-file-upload
          :limit='9'
          list-type="text"
          :acceptSize="20"
          :accept='accept'
          :autoUpload="true"
          :otherData="otherData"
          :action="action"
          ref="fileRef"
          @associationCallback="associationCallback"/>
        <!-- <span class="upload-tip">格式要求：doc、docx、pdf、xlsx、txt要求：20M以内</span> -->
      </el-form-item>
    </el-form>

    <!-- 园区内组织 -->
    <el-dialog class="dialog-inner" width="522px" title="园区内组织" :visible.sync="innerVisible" append-to-body>
      <div  v-loading="loading">
      <el-tree
        :expand-on-click-node="false"
        class="base-page-tree__tree"
        :data="treeData"
        :props="{children: 'children', label: 'label'}"
        :indent="0"
        default-expand-all
        highlight-current
        ref="tree">
        <p slot-scope="{ node, data }" class="slot-tree-node">
          <img v-if="node.childNodes.length === 0" src="@/assets/page/icon-file.png" alt="">
          <span>{{ node.label }}</span>
        </p>
      </el-tree>
      </div>
    </el-dialog>

    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
    <!--接收组织弹窗-->
<!--    <tree-dialog ref="refTree" @refresh="getOrg"/>-->
    <base-org-tree ref="refTree" @refresh="getOrg" :labelName="labelName"/>
  </el-dialog>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  // import TreeDialog from './tree-dialog'//组织树弹窗
  import {getAllOrgTree,getUserinformation,getOrgName,getOrgAdd} from "@/api/backstage/party/basic/org/org.js"
  export default {
    components: {
      // TreeDialog

    },
    data () {
      let validAcceptOrg = (rule, value, callback) =>{
          if(value==''){
            callback(new Error('请选择接收组织'));
          }else{
            if(value === this.currentOrg.key){
              callback(new Error('接收组织不能为本组织'));
            }
          }
          // if (!value && this.formData.type.key === '1303258340012326912') {
          //     callback(new Error('请选择接收组织'));
          // }
          callback();
      };
      return {
        loading:true,//加载遮罩
        // 自己的
        visible: false,
        isShow:false,
        treeData: [],//园区内党组织
        // 组织的
        innerVisible: false,
        currentOrg:{//当前组织
          data:'',
          key:''
        },
        nameList:[],//转接人员信息
        timeMonth:'',//缴纳年费至年月，截取年月
        formData: {
          isAdd:'1',//新增：1;重新发起：2
          id:'',
          acceptOrg: {//接收组织(园区内/转入园区内接收必填，转出园区外不用传)
            data: '',
            key: ''
          },
          acceptOrgWrite:'',//接收组织(转出园区外必填，其他不用传)
          djMemberSaveDTO:{//党员信息
            addressCoordinates:'',//家庭地址坐标
            birthday:'',//出生日期
            developNature: {//发展性质
              data: '',
              key: ''
            },
            djEducationSaveDTO: {//
              degree: {
                data: '',
                key: ''
              },
              education: {
                data: '',
                key: ''
              },
              graduateSchool: '',
              major: '',
              memberId: '',
            },
            djUnitSaveDTO: {
              addressCoordinates: '',
              company: '',
              duty: '',
              entType: {
                data: '',
                key: ''
              },
              jobs: {
                data: '',
                key: ''
              },
              memberId: '',
              unitAddress: '',
              unitDetailAddress: '',
            },
            homeAddress: '',
            homeDetailAddress: '',
            idCode: '',
            isDelete: '',
            isFarmerWork: {
              data: '',
              key: ''
            },
            isPoor: {
              data: '',
              key: ''
            },
            isVeteran: {
              data: '',
              key: ''
            },
            joinPartySaveDTO: {
              applyJoinDate: '',
              branch: '',
              confirmActivistDate: '',
              confirmDevelopDate: '',
              joinDate: '',
              memberId: '',
              orgId: '',
              partyAge: '',
              positiveDate: '',
              reference: '',
              type: {
                data: '',
                key: ''
              }
            },
            marriageCondition: {
              data: '',
              key: ''
            },
            name: '',
            nation: {
              data: '',
              key: ''
            },
            natives: '',
            nativesTaiwan: {
              data: '',
              key: ''
            },
            orgId: {
              data: '',
              key: ''
            },
            phone: '',
            sex: {
              data: '',
              key: ''
            },
            state: {
              data: '',
              key: ''
            },
            type: {
              data: '',
              key: ''
            }
          },
          duesPayEnddate: '',
          introletterUrl: '',
          memberId: {
            data: {},
            key:''
          },
          orgId: {
            data: '',
            key: ''
          },
          orgIdWrite: '',
          transferCause: '',
          transferState: {
            data: '',
            key: ''
          },
          type: {//转接类型
            data: '',
            key: ''
          }
        },
        dicts: {//字典
          transfer_type:{},//转接类型
        },
        disableName:false,
        isCode:false,//验证身份证标识
        node: { // 必填项判断
          'type.key':[{
            required: true,
            message: '请选择转接类型',
            trigger: 'change'
          }],
          'memberId.key':[{
            required: true,
            message: '请选择转接人员',
            trigger: 'change'
          }],
          'acceptOrg.key':[{
            required: true,
            validator: validAcceptOrg,
            trigger: 'change'
          }],
          'acceptOrg.data':[{
            required: true,
            message: '请输入接收组织',
            trigger: 'change'
          }],
        },
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData:{
          id: '',
          bizId: "",
          bizType: "orglc",
          isSingle: false
        },
        accept:'.png,.jpg,.jpeg,.pdf',
        labelName:'组织关系转接'



      }

    },
    mounted(){
      this.getUser();
      this.getOrgnamelist();
      this.getTree();
      this.getDict();

    },
    methods: {
      //接收组织
      selectkey(val){
        if(val == '1303258531859791872'){//选择组织
          this.formData.acceptOrg.data='';
        }else if(val == '1303258629775818752'){//输入组织
          this.formData.acceptOrg.data='';
          this.formData.acceptOrg.key='';
        }

      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;

        })

      },
      //获取当前组织
      getUser(){
        let params = {
          userId:db.get('USER').id,
        }
        getUserinformation(params).then(response => {
          const res = response;
          this.currentOrg.data=res.data.orgName;
          this.currentOrg.key=res.data.orgId;

        }).finally(() => {

        });
      },
      //获取党员姓名
      getOrgnamelist(){
        let params = {
          orgId:{
            key:this.currentOrg.key
          }
        }
        getOrgName(params).then(response => {
          const res = response;
          this.nameList=res;
        }).finally(() => {

        });

      },
      //选中人员获取信息
      selectTrigger(value){
        this.isShow=true;
        for(var i=0;i<this.nameList.length;i++){
          if(value==this.nameList[i].id){
            this.formData.djMemberSaveDTO.sex=this.nameList[i].sex;
            this.formData.djMemberSaveDTO.idCode=this.nameList[i].idCode;
            this.formData.djMemberSaveDTO.duesPayEnddate=this.nameList[i].duesPayToDate;
            this.formData.memberId={
              data:{},
              key:this.nameList[i].id
            };

          }
        }

        this.timeMonth='';
        //党费缴纳至年月，截取年月
        if(this.formData.djMemberSaveDTO.duesPayEnddate!='' && this.formData.djMemberSaveDTO.duesPayEnddate!=undefined && this.formData.djMemberSaveDTO.duesPayEnddate!=null && this.formData.djMemberSaveDTO.duesPayEnddate!='null'){
          this.timeMonth=this.formData.djMemberSaveDTO.duesPayEnddate.slice(0,7)
        }
        // if(this.formData.djMemberSaveDTO.idCode!='' && this.formData.djMemberSaveDTO.idCode!=undefined && this.formData.djMemberSaveDTO.idCode!=null && this.formData.djMemberSaveDTO.idCode!='null'){
        //   // let data = {
        //   //   memberId:'',
        //   //   memberInfo:this.formData.djMemberSaveDTO.idCode
        //   // }
        //   /*commonReq.getVerification(data).then(response =>{
        //     const res = response;
        //     if(res==true){
        //       this.$message.warning("该身份证号已存在，请重新选择");
        //       this.isCode=true;
        //     }
        //   }).finally(() => {
        //
        //   });*/
        // }
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['transfer_type']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.transfer_type = res.transfer_type;
          for(var i=0;i<this.dicts.transfer_type.length;i++){
            if(this.dicts.transfer_type[i].id=='1303258822889963520'){
              this.dicts.transfer_type.splice(i,i)
            }
          }
        })
      },

      show (t,row) {
        this.visible = true;
        this.getUser();
        this.getOrgnamelist();
        this.getTree();
        this.getDict();

        if(t==5){
          this.loading=false;
          this.partyUid();
          this.formData.isAdd='1';
        }
        if(t==8){
          this.disableName=true;
          this.formData.isAdd='2'
          this.otherData.bizId = row.memberTransfer.id
          this.formData.id=row.memberTransfer.id
          this.formData.type=row.memberTransfer.type
          this.formData.orgId=row.memberTransfer.orgId
          this.formData.orgIdWrite=row.memberTransfer.orgIdWrite
          this.formData.acceptOrg=row.memberTransfer.acceptOrg
          this.formData.acceptOrgWrite=row.memberTransfer.acceptOrgWrite
          this.formData.duesPayEnddate=row.memberTransfer.duesPayEnddate
          this.formData.introletterUrl=row.memberTransfer.introletterUrl
          this.formData.memberId=row.memberTransfer.memberId
          this.formData.transferCause=row.memberTransfer.transferCause
          this.formData.transferState=row.memberTransfer.transferState
          // this.formData.type=row.memberTransfer.type
          this.formData.djMemberSaveDTO.id=row.djMemberPubVO.id
          this.formData.djMemberSaveDTO.birthday=row.djMemberPubVO.birthday
          this.formData.djMemberSaveDTO.name=row.djMemberPubVO.name
          this.formData.djMemberSaveDTO.djEducationSaveDTO.education=row.djMemberPubVO.education
          this.formData.djMemberSaveDTO.idCode=row.djMemberPubVO.idCode
          this.formData.djMemberSaveDTO.isDelete=row.memberTransfer.isDelete
          this.formData.djMemberSaveDTO.joinPartySaveDTO.applyJoinDate=row.djMemberPubVO.applyJoinDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.joinDate=row.djMemberPubVO.joinDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.positiveDate=row.djMemberPubVO.positiveDate
          this.formData.djMemberSaveDTO.joinPartySaveDTO.type=row.djMemberPubVO.type
          this.formData.djMemberSaveDTO.joinPartySaveDTO.memberId=row.djMemberPubVO.id
          this.formData.djMemberSaveDTO.nation=row.djMemberPubVO.nation
          this.formData.djMemberSaveDTO.sex=row.djMemberPubVO.sex
          this.formData.djMemberSaveDTO.phone=row.djMemberPubVO.phone
          this.formData.djMemberSaveDTO.natives=row.djMemberPubVO.natives
          this.formData.djMemberSaveDTO.type=row.djMemberPubVO.type
          this.formData.djMemberSaveDTO.nativesTaiwan=row.djMemberPubVO.nativesTaiwan
          this.formData.djMemberSaveDTO.duesPayEnddate=row.memberTransfer.duesPayEnddate
          this.formData.duesPayEnddate=row.memberTransfer.duesPayEnddate
          //党费缴纳至年月，截取年月
          this.timeMonth='';
          if(this.formData.djMemberSaveDTO.duesPayEnddate!='' && this.formData.djMemberSaveDTO.duesPayEnddate!=undefined && this.formData.djMemberSaveDTO.duesPayEnddate!=null && this.formData.djMemberSaveDTO.duesPayEnddate!='null'){
            this.timeMonth=this.formData.djMemberSaveDTO.duesPayEnddate.slice(0,7)
          }
          this.$nextTick(function(){
            this.$refs.fileRef.init()
          })
          this.loading=false;
        }



      },
      showTree () {
        this.innerVisible = true
        this.getTree();
      },
      //园区内党组织数据
      getTree(){
        let params={
          name:''
        }
        this.loading=true;
        getAllOrgTree(params).then(response => {
          const res = response;
          this.treeData=res

        }).finally(() => {
          this.loading=false;
        });

      },
      //接收党组织弹窗
      getlistTree(){
        let params={
          org:this.formData.acceptOrg.data,
          orgId:this.formData.acceptOrg.key
        }
        this.$refs['refTree'].show(2,params)
      },
      //返回党组织的值
      getOrg(row){
        this.formData.acceptOrg=row
      },
      //取消
      cancel(){
        this.$refs['refForm'].resetFields();
        this.visible = false
        this.isShow=false;
        this.timeMonth='';
        this.formData.djMemberSaveDTO.duesPayEnddate='';
        this.formData.duesPayEnddate='';
        // this.formData.type.data='';
        // this.formData.type.key='';
        this.formData.type = {
          data: '',
          key: ''
        }
        // this.formData.memberId.key='';
        // this.formData.memberId.data={};
        this.formData.memberId={
          data:{},
          key:''
        }
        // this.formData.djMemberSaveDTO.sex.data='';
        // this.formData.djMemberSaveDTO.sex.key='';
        this.formData.djMemberSaveDTO.sex={
          data:'',
          key:''
        }
        this.formData.duesPayEnddate='';
        this.formData.djMemberSaveDTO.idCode='';
        // this.formData.acceptOrg.data='';
        // this.formData.acceptOrg.key='';
        this.formData.acceptOrg={
          data:'',
          key:''
        }
        this.formData.transferCause='';
        // this.$emit('refresh')
      },
      // 成功回调
      associationCallback(val){
        if(val){
          getOrgAdd(this.formData).then(response => {
            const res = response;
            this.$message(this.successTip());
            this.cancel();
            this.$emit('refresh',1)
          }).finally(() => {

          });
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      saveBtn () {
        this.$refs['refForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          // if(this.formData.acceptOrg.data=='' || this.formData.acceptOrg.data==undefined || this.formData.acceptOrg.data==null || this.formData.acceptOrg.data=='null'){
          //   this.$message.warning("请选输入接收组织")
          //   return
          // }
          if(this.isCode==true){
            this.$message.warning("该身份证号已存在，请重新选择");
            return
          }
          this.formData.djMemberSaveDTO.duesPayEnddate='';
          this.formData.duesPayEnddate='';
          if(this.timeMonth!='' && this.timeMonth!=undefined && this.timeMonth!=null && this.timeMonth!='null'){
            this.timeMonth=this.timeMonth+'-'+'01';
          }else{
            this.timeMonth='';
          }
          this.formData.djMemberSaveDTO.duesPayEnddate=this.timeMonth
          this.formData.duesPayEnddate=this.timeMonth;


          this.$refs.fileRef.submitFile();
          // getOrgAdd(this.formData).then(response => {
          //   const res = response;
          //   this.$message.success("保存成功")
          //   this.cancel();
          //   this.$emit('refresh')
          // }).finally(() => {
          //
          // });
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-tip {
    color: #cccccc;
    font-size: 14px;
    vertical-align: text-top;
  }

  .dialog-inner /deep/ .el-dialog__body {
    padding: 15px 34px;
  }
  .base-page-tree__tree /deep/ {
    max-height: 60vh;
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
      caret-color: transparent;
    }

    > .el-tree-node {
      padding-left: 0;
    }

    .el-tree-node__content {
      margin-top: 20px;
      font-size: 14px;
      color: #666666;
      padding-left: 0;
      height: inherit;
      padding-right: 20px;
      display: flex !important;
      align-items: flex-start !important;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node::before {
      content: '';
      height: calc(100% + 7px);
      width: 1px;
      position: absolute;
      left: 3px;
      top: -23px;
      border-width: 1px;
      border-left: 1px dashed #52627C;
      z-index: 1;
    }

    .el-tree-node:last-child::before {
      height: 38px;
    }

    .el-tree-node::after {
      content: '';
      width: 21px;
      height: 20px;
      position: absolute;
      left: 3px;
      top: 13px;
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
      top: 3px;
      font-size: 0px;
      width: 22px;
      height: 17px;
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
        background: url('~@/assets/page/icon-sub.png') no-repeat 100% 100%;
      }
    }

    .slot-tree-node {
      padding: 0 0;
      margin: 5px 0;
      > img {
        width: 14px;
        height: 16px;
        vertical-align: sub;
        margin-right: 3px;
      }

      > span {
        white-space: pre-wrap;
        word-break: break-all;
        display: inline-block;
        vertical-align: top;
      }
    }
  }

  .base-page-tree {
    display: flex;
    /*height: 100%;*/
    max-height: calc(100vh - 152px);
  }

  .base-page-tree__left {
    width: 320px;
    padding: 20px;
    margin-right: 20px;
    background: #FFFFFF;
    border-radius: 4px;
    max-height: 100%;
    overflow: auto;
  }

  .base-page-tree__right {
    flex: 1;
    max-height: 100%;
    overflow: auto;
    background: #fff;
  }

  .el-input__icon .border {
    position: absolute;
    left: -5px;
    top: 10px;
    width: 1px;
    height: 20px;
    background: #E5E5E5;
  }

</style>
