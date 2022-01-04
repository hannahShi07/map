<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '562px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="110px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="宣传栏名称" prop="name">
          <el-input v-model="messages.name" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="链接地址" prop="linkAddress">
          <el-input v-model="messages.linkAddress" @blur="onInputBlur" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="宣传栏位置" prop="radio">
          <el-radio-group v-model="messages.radio">
            <el-radio v-for="(item,index) in dicts.advertise_where" :label=item.id>{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required file rel" label="宣传图" prop="fileListExist">
          <base-file-upload
            :folio='true'
            list-type="picture-card"
            :acceptSize="20"
            :autoUpload="true"
            :otherData="otherData"
            :action="action"
            :fileListExist.sync="messages.fileListExist"
            ref="fileRef"
            @associationCallback="associationCallback"/>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="简介" prop="brief">
          <el-input v-model="messages.brief" type="textarea" maxlength="500" placeholder="请输入" show-word-limit :autosize="{ minRows: 11, maxRows: 11}"/>
        </el-form-item>
      </el-col>


    </el-form>
    <div slot="footer" class="text-center">
<!--      <el-button size="medium" @click="cancel">取消</el-button>-->
      <el-button size="medium" @click="saveBtn(0)">保存</el-button>
      <el-button size="medium" type="primary" @click="saveBtn(1)">发布广告</el-button>
    </div>
  </el-dialog>

</template>

<script>
    import db from '@/utils/localstorage'//  获取用户登录id
    import commonReq  from "@/api/public/commonReq.js"
    import {getPropagandaadd,getPropagandadetail,getPropagandaedit} from "@/api/backstage/sysset/administrationIndex/propaganda/propaganda.js"

    export default {
      name: "propaganda-add",
      components:{},
      data () {
        return {
          loading:false,//加载遮罩
          // 自己的
          visible: false,
          title:'新增广告',
          dicts: {//字典
            advertise_where:[]// 宣传栏位置
          },
          messages:{
            id:'',
            name:'',//宣传栏名称
            linkAddress:'',//链接地址
            isPut:'',//是否投放(1:是,0:否)
            brief:'',//简介
            type:{//宣传栏位置
              data:'',
              key:''
            },
            radio:'',//宣传栏位置
            fileListExist:'',//是否已上传附件

          },
          node: { // 必填项判断
            'name':[{
              required: true,
              message: '请输入宣传栏名称',
              trigger: 'blur'
            }],
            'radio':[{
              required: true,
              message: '请选择宣传栏位置',
              trigger: 'change'
            }],
            'fileListExist':[{
              required: true,
              message: '请上传宣传图',
              trigger: 'blur'
            }],

          },
          action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
          otherData:{
            id: '',
            bizId: "",
            bizType: "propagandaadd",
            isSingle: false
          },
          accept:'.png,.jpg,.jpeg',
          isEdit:'',//判断是新增还是编辑

        }
      },
      mounted(){

      },
      watch:{
        'messages.fileListExist':{
          handler(newval){
            if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
              this.$refs.ruleForm.clearValidate('fileListExist');//清除附件验证
            }else{

            }
          },
          deep:true
        },

      },
      methods: {
        //新增时获取UID
        partyUid(){
          commonReq.getNewUid({}).then(response =>{
            const res = response
            this.messages.id = res;
            this.otherData.bizId = res;
          })

        },
        //调用字典接口-获取宣传片位置
        getDict(){
          let params = {
            types:['advertise_where']
          }
          commonReq.getHistoryDict(params).then(response =>{

            const res = response;
            this.dicts.advertise_where = res.advertise_where;

          })
        },
        //打开页面
        show (t,row) {
          this.visible = true;
          this.getDict();
          if(t==1){//新增
            this.resetData()
            this.isEdit=1;
            this.title='新增广告';
            this.partyUid();
          }else if(t==7){//编辑
            this.loading=true;
            this.isEdit=2;
            this.title='编辑广告';
            this.getDetail(row.id);
            this.otherData.bizId = row.id// 编辑时，附件自动回显
            this.$nextTick(function(){// 编辑时，附件自动回显
              this.$refs.fileRef.init()
            })
          }

        },
        //失去焦点事件-验证链接地址格式
        onInputBlur(){
          if(this.messages.linkAddress!='' && this.messages.linkAddress!=undefined && this.messages.linkAddress!=null && this.messages.linkAddress!='null') {
            let expression=/^((((https|http)(:\/\/))(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
            let reg = new RegExp(expression);
            if (!reg.test(this.messages.linkAddress)) {
              this.$message.warning('请输入正确的链接地址')
              this.messages.linkAddress=''
            }
          }
        },
        //获取编辑详情
        getDetail(id){
          let params={
            id:id
          }
          getPropagandadetail(params).then(response => {
            const res = response;
            this.messages.id = res.id
            this.messages.name = res.name
            this.messages.linkAddress = res.linkAddress
            this.messages.brief = res.brief
            this.messages.type= res.type
            this.messages.radio = res.type.key
            this.messages.isPut = res.isPut

          }).finally(() =>{
            this.loading = false;
          })
        },

        //取消
        cancel() {
          this.visible = false;
          this.resetData()
        },
        // 重置数据
        resetData(){
          this.$nextTick(function(){
            this.messages={
              id:'',
              name:'',//宣传栏名称
              linkAddress:'',//链接地址
              brief:'',//简介
              isPut:'',//是否发布
              radio:'',//宣传栏位置
              type:{//宣传栏位置
                data:'',
                key:''
              }
              // fileListExist:'',//是否已上传附件
            }
            // this.$refs['ruleForm'].resetFields();//清除附件
          })
        },

        // 成功回调
        associationCallback(val){
          if(val){
            this.messages.type={
              data:'',
              key:this.messages.radio
            }
            delete this.messages.radio

            if(this.isEdit==1){//新增
              getPropagandaadd(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip());
                this.cancel()
                this.$emit('refresh')
              })
            }else if(this.isEdit==2){//编辑
              getPropagandaedit(this.messages).then(response => {
                const res = response;
                this.$message(this.successTip());
                this.cancel()
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

        //保存
        saveBtn (num) {
          this.$refs['ruleForm'].validate(valid => { // 表单验证
            if (!valid) {
              setTimeout(()=>{
                const isError= document.getElementsByClassName('is-error')
                isError.length && isError[0].querySelector('input').focus()
              },100)
              return // 表单必填项判断
            }
            if(num==0){//保存
              this.messages.isPut=0
            }else if(num==1){//发布广告
              this.messages.isPut=1
            }
            this.$refs.fileRef.submitFile();

          })
        },


      },
    }
</script>

<style scoped>

</style>
