<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="700px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      v-if="visible">
      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
        <el-row>
          <el-col :span="24">
            <el-form-item  label="组织名称" prop="orgName.data">
              <el-input v-model="formData.orgName.data" placeholder="请输入"   @click.native="getTree"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="24">
              <el-form-item label="奖励类型" prop="rewardType">
                <el-select v-model="formData.rewardType" placeholder="请选择" class="wp-100" clearable  @change="changeDisposeType">
                  <el-option
                    v-for="item in dicts.prize"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="奖励日期" prop="rewardDate">
                <el-date-picker
                  v-model="formData.rewardDate"
                  type="date"
                  placeholder="请选择"
                  @change="changeDisposeType"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="奖励名称" prop="rewardName">
              <el-input placeholder="请输入"   clearable v-model.number="formData.rewardName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="奖励说明" class="rel" prop="rewardInstructions">
              <el-input
                placeholder="请输入"
                v-model="formData.rewardInstructions"
                type="textarea"
                :autosize='{ minRows: 5, maxRows:5}'
                resize="none"
                maxlength="500"
                show-word-limit/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="批准机关" prop="approval">
              <el-input placeholder="请输入"   clearable v-model="formData.approval"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="file" label="上传附件">
              <base-file-upload
                :limit='1'
                list-type="text"
                :acceptSize="20"
                :accept='accept'
                :autoUpload="true"
                :otherData="otherData"
                :action="action"
                ref="fileRef"
                @associationCallback="associationCallback"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
      <!--所属党组织弹窗-->
      <base-org-tree ref="orgTree" @refresh="getParentId"/>
    </el-dialog>

  </div>
</template>

<script>
    import commonReq from "@/api/public/commonReq";
    import {getDemonstrationAdd,getDemonstrationName,getDemonstrationEdit,getDemonstrationDetail} from
            "@/api/backstage/party/priority/demonstration/demonstration.js"

    export default {
        data () {
            return {
                // 模态
                visible: false,
                // 是否为添加
                title: '',//标题
                loading:false,//加载遮罩
                isEdit:1,//新增：1，编辑：2
                dicts:{//字典表数据
                    prize:[],//奖励类型
                },
                organizationName:[], //组织名称
                placeholders: {
                    province: '安徽省',
                    city: '合肥市',
                    area:'蜀山区' ,
                },
                formData:{//新增数据
                    id:'',
                    orgName:{
                        data:"",
                        key:""
                    },//组织名称（必填）
                    rewardType:"",//奖励类型（必填）
                    rewardDate:"",//奖励日期（必填）
                    rewardName:"",//奖励名称（必填）
                    rewardInstructions:"",//奖励说明
                    approval:"",  //批准机关（必填）
                },
                node:{
                    "orgName.data":{
                        required: true,
                        message: "请选择组织名称",
                        trigger: "blur"
                    },
                    rewardType:{
                        required: true,
                        message: "请选择奖励类型",
                        trigger: "blur"
                    },
                    rewardDate:{
                        required: true,
                        message: "请选择奖励日期",
                        trigger: "blur"
                    },
                    rewardName:{
                        required: true,
                        message: "请输入奖励名称",
                        trigger: "blur"
                    },
                    approval:{
                        required: true,
                        message: "请输入批准机关 ",
                        trigger: "blur"
                    },

                },
                action:`${process.env.VUE_APP_BASE_API}/file/attachment/upload`,//附件上传地址
                otherData:{
                    id: '',
                    bizId: "",
                    bizType: "demonstration",
                    isSingle: false
                },
                accept:'.doc,.docx,.pdf',
                fileUrl:'', //上传附件的路径
            }
        },
        created(){
            this.getOrgName();
            this.getDict();
        },
        methods: {
            // 成功回调
            associationCallback(val){
                if(val){
                    let params ={
                        type: {
                            key: '2279477819906842952',
                            data:""
                        },//示范库
                        id:this.otherData.bizId,
                        orgId:{key:this.formData.orgName.key},
                        rewardType:{key:this.formData.rewardType},
                        rewardTime:this.formData.rewardDate,
                        name:this.formData.rewardName,
                        explains:this.formData.rewardInstructions,
                        approvalOffice:this.formData.approval,
                    }
                    if(this.isEdit==1){
                        getDemonstrationAdd(params).then(response => {
                            const res = response
                            this.$message(this.successTip())
                            this.close()
                            this.$emit('refresh')
                        })
                    }else if(this.isEdit==2){
                        getDemonstrationEdit(params).then(response => {
                            const res = response
                            this.$message(this.successTip())
                            this.close()
                            this.$emit('refresh')
                        })
                    }
                }else{
                    this.$message({
                        showClose: true,
                        message: '请再试一次 !!!',
                        type: 'error'
                    });
                }
            },
            //新增时获取UID
            cultivateUid(){
                commonReq.getNewUid({}).then(response =>{
                    const res = response
                    this.formData.id = res;
                    this.otherData.bizId = res;
                })
            },
            //调用字典接口
            getDict(){
                let params = {
                    types:['prize']
                }
                commonReq.getHistoryDict(params).then(response =>{
                    const res = response;
                    this.dicts.prize = res.prize.slice(0,4);
                })
            },
            //组织名称
            getOrgName(){
                let params = {}
                getDemonstrationName(params).then(respone =>{
                    const res = respone
                    this.organizationName = res
                })
            },
            //奖惩名称获取方法
            changeDisposeType() {
                if (this.formData.rewardDate == '' || this.formData.rewardDate == null){
                    this.formData.rewardDate = ''
                }else {
                    this.formData.rewardDate = this.formatDateTime(this.formData.rewardDate)
                }
                //判断选项里选的名称是否和数组里相同，有相同的输出相应的名称
                for(let i=0;i<this.dicts.prize.length;i++){
                    if(this.formData.rewardType == this.dicts.prize[i].id){
                        this.formData.rewardName = this.formData.rewardDate.substring(0,4) + this.dicts.prize[i].name
                    }
                }
            },
            //时间转化年月日
            formatDateTime(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m > 9 ? m : '0' + m;
                d = d > 9 ? d : '0' + d;
                return y + '-' + m + '-' + d;
            },
            //新增
            show (t, row) {
                this.visible = true
                if(t === 1){
                    this.title = '新增'
                    this.dicts.category = []
                    this.cultivateUid()
                    this.isEdit = 1;
                    this.formData.orgName.key = '',
                        this.formData.orgName.data = '',
                        this.formData.rewardType = '',
                        this.formData.rewardDate = '',
                        this.formData.rewardName = '',
                        this.formData.rewardInstructions = '',
                        this.formData.approval = ''
                }
                if(t === 7){
                    this.title = '编辑'
                    this.editEcho(row.id)
                    this.isEdit = 2;
                    this.otherData.bizId = row.id// 编辑时，附件自动回显
                    this.$nextTick(function(){// 编辑时，附件自动回显
                        this.$refs.fileRef.init()
                    })
                }
            },

            //编辑回显数据
            editEcho(id){
                let params = {
                    id:id
                }
                getDemonstrationDetail(params).then(respone =>{
                    const res = respone
                    this.otherData.bizId = res.id;
                    this.formData.orgName.key = res.orgId.key,  //组织名称
                        this.formData.orgName.data=res.orgId.data ,  //组织名称
                        this.formData.rewardType=res.rewardType.key , //奖励类型
                        this.formData.rewardDate=res.rewardTime ,  //奖励日期
                        this.formData.rewardName=res.rewardName  ,//奖励名称
                        this.formData.rewardInstructions= res.explains , //奖励说明
                        this.formData.approval= res.approvalOffice  //批准机关
                    // this.fileUrl:,res  //附件
                })
            },
            //新增保存接口
            save(){
                this.$refs['refForm'].validate((valid) => {
                    if (!valid) {
                        setTimeout(()=>{
                            const isError= document.getElementsByClassName('is-error')
                            isError.length && isError[0].querySelector('input').focus()
                        },100)
                        return // 表单必填项判断
                    } else {
                        this.$refs.fileRef.submitFile()
                    }
                })
            },
            //选择的上级党组织回调
            getParentId(val){
                this.formData.orgName.key = ""
                this.formData.orgName.data = ""
                if(val != ""){
                    this.formData.orgName.data = val.data
                    this.formData.orgName.key = val.key
                    this.$refs['refForm'].clearValidate(['orgName.data']);
                }
            },
            //打开上级党组织弹窗
            getTree(){
                this.$refs['orgTree'].show()
            },
            //取消
            close(){
                this.$refs['refForm'].resetFields();
                this.visible = false
            },
        }
    }
</script>

<style scoped>
  .form-big-label {
    padding-left: 10px;
    line-height: 20px;
  }
  .el-select-dropdown__item.selected{
    color: black;
  }
  .wp-100 /deep/ .el-form-item__label{
    line-height: 20px;
  }
  .btn{
    margin-bottom: 12px;
  }


  element.style {
    display: inline-block;
    height: 35px;
  }

  .distpicker-address-wrapper {
    color: #9caebf;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  user agent stylesheet
  div {
    display: block;
  }
  /deep/.el-form-item__content {
    line-height: 36px!important;
    position: relative;
    font-size: 14px;
  }
  /deep/.distpicker-address-wrapper select {
    /* padding: .5rem .75rem; */
    padding: 0;
    height: 36px!important;
    width: 152px!important;
    padding: -108px 0 0 0;
    font-size: 1rem;
    line-height: 36px!important;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
  /deep/ .el-upload{
    font-size: 14px;
    font-family: MicrosoftYaHei;
    line-height: 19px;
    color: #CCCCCC;
  }
</style>
