<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1130px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="80px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item class="is-required" label="培训主题" prop="theme">
          <el-input v-model="messages.theme" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="开展部门" prop="department">
          <el-input v-model="messages.department" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item class="is-required" label="限制人数" prop="number">
          <el-input v-model="messages.number" placeholder="请输入" maxlength="100" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="报名时间">
          <el-form-item prop="applyStart" style="width:auto;display:inline-block;">
            <el-date-picker
              style="width:213px"
              v-model="messages.applyStart"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="changeapplyStart"
              :picker-options="applyStartOptions">
            </el-date-picker>
          </el-form-item>
          -
          <el-form-item prop="applyEnd" style="width:auto;display:inline-block;">
            <el-date-picker
              style="width:213px"
              v-model="messages.applyEnd"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="changeapplyEnd"
              :picker-options="applyEndOptions">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item  class="is-required" label="培训时间">
          <el-form-item prop="trainStart" style="width:auto;display:inline-block;">
            <el-date-picker
              style="width:213px"
              v-model="messages.trainStart"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="changetrainStart"
              :picker-options="trainStartOptions">
            </el-date-picker>
          </el-form-item>
          -
          <el-form-item prop="trainEnd" style="width:auto;display:inline-block;">
            <el-date-picker
              style="width:213px"
              v-model="messages.trainEnd"
              type="datetime"
              placeholder="请选择"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="changetrainEnd"
              :picker-options="trainEndOptions">
            </el-date-picker>
          </el-form-item>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="培训地点" prop="address">
          <el-input v-model="messages.address" placeholder="请输入" maxlength="200" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="培训内容" prop="content">
          <base-tinymce-editor  v-model="messages.content" />
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"

  import {getTrainAdd,getTrainEdit,getTrainDetail} from "@/api/backstage/personnel/educationtrain/trainmanage/trainmanage.js"



  export default {
    name: "training-add",
    components:{},
    data () {
      let checkNum = (rule, value, callback) => {
        if (this.messages.number == '') {
          callback(new Error('请输入限制人数'));
        } else if(!(/(^[1-9]\d*$)/.test(this.messages.number))){
          callback(new Error('限制人数应为正整数'));
        } else if(this.messages.number.length>4){
          callback(new Error('限制人数在四位数以内'));
        }else{
          callback();
        }
      }

      return {
        loading:false,
        // 自己的
        visible: false,
        title:'新增',
        messages:{
          id:'',
          theme:'',//培训主题
          department:'',//开展部门
          number:'',//限制人数
          applyStart:'',//报名开始时间
          applyEnd:'',//报名结束时间
          trainStart:'',//培训开始时间
          trainEnd:'',//培训结束时间
          address:'',//培训地点
          content:'',//培训内容

        },
        node: { // 必填项判断
          'theme':[{
            required: true,
            message: '请输入培训主题',
            trigger: 'blur'
          }],
          'department':[{
            required: true,
            message: '请输入开展部门',
            trigger: 'blur'
          }],
          'content':[{
            required: true,
            message: '请输入培训内容',
            trigger: 'blur'
          }],
          'address':[{
            required: true,
            message: '请输入培训地点',
            trigger: 'blur'
          }],
          'number':[{
            required: true,
            validator:checkNum
            // message: '请输入限制人数',
            // trigger: 'blur'
          }],
          'applyStart':[{
            required: true,
            message: '请选择报名开始时间',
            trigger: 'change'
          }],
          'applyEnd':[{
            required: true,
            message: '请选择报名结束时间',
            trigger: 'change'
          }],
          'trainStart':[{
            required: true,
            message: '请选择培训开始时间',
            trigger: 'change'
          }],
          'trainEnd':[{
            required: true,
            message: '请选择培训结束时间',
            trigger: 'change'
          }],

        },
        isEdit:'',//判断是新增还是编辑
        trainStartOptions:{
          disabledDate(time) {
            let nowdate=new Date();
            return time.getTime() < nowdate.getTime()-24*3600*1000;
          },
        },
        trainEndOptions:{
          disabledDate(time) {
            let nowdate=new Date();
            return time.getTime() < nowdate.getTime()-24*3600*1000;
          },
        },
        applyStartOptions:{
          disabledDate(time) {
            let nowdate=new Date();
            return time.getTime() < nowdate.getTime()-24*3600*1000;
          },
        },
        applyEndOptions:{
          disabledDate(time) {
            let nowdate=new Date();
            return time.getTime() < nowdate.getTime()-24*3600*1000;
          },
        },

      }
    },
    mounted(){

    },
    watch:{
      'messages.content':{
        handler(newval){
          if(newval!='' && newval!=undefined && newval!=null && newval!='null'){
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.clearValidate('content');//清除附件验证
            }
          }else{
            if(this.$refs.ruleForm){
              this.$refs.ruleForm.validateField("content");//添加附件验证
            }
          }
        },
        deep:true
      }
    },
    methods: {
      //设置报名时间
      changeapplyStart(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          let date1=Date.parse(new Date(value));
          if(this.messages.applyEnd!='' && this.messages.applyEnd!=undefined && this.messages.applyEnd!=null && this.messages.applyEnd!='null'){
            let date2=Date.parse(new Date(this.messages.applyEnd))
            if(date1>=date2){
              this.$message.warning('报名开始时间要小于报名结束时间')
              this.messages.applyStart = ''
            }
          }

        }
      },
      changeapplyEnd(value){
        if(value!='' && value!=undefined && value!=null && value!='null') {
          let date1=Date.parse(new Date(value));
          if(this.messages.applyStart!='' && this.messages.applyStart!=undefined && this.messages.applyStart!=null && this.messages.applyStart!='null'){
            let date2=Date.parse(new Date(this.messages.applyStart))
            if(date1<=date2){
              this.$message.warning('报名结束时间要大于报名开始时间')
              this.messages.applyEnd = ''
            }

          }
          if(this.messages.trainStart!='' && this.messages.trainStart!=undefined && this.messages.trainStart!=null && this.messages.trainStart!='null'){
            let date3=Date.parse(new Date(this.messages.trainStart))
            if(date1>=date3){
              this.$message.warning('报名结束时间要小于培训开始时间')
              this.messages.applyEnd= ''
            }
          }

        }
      },
      //设置培训时间
      changetrainStart(value){
        if(value!='' && value!=undefined && value!=null && value!='null'){
          let date1=Date.parse(new Date(value));//培训开始时间
          if(this.messages.trainEnd!='' && this.messages.trainEnd!=undefined && this.messages.trainEnd!=null && this.messages.trainEnd!='null'){
            let date2=Date.parse(new Date(this.messages.trainEnd))//培训结束时间
            if(date1>=date2){
              this.$message.warning('培训开始时间要小于培训结束时间')
              this.messages.trainStart = ''
            }
          }
          if(this.messages.applyEnd!='' && this.messages.applyEnd!=undefined && this.messages.applyEnd!=null && this.messages.applyEnd!='null'){
            let date3=Date.parse(new Date(this.messages.applyEnd))//报名结束时间
            if(date1<=date3){
              this.$message.warning('培训开始时间要大于报名结束时间')
              this.messages.trainStart = ''
            }
          }

        }
      },
      changetrainEnd(value){
        if(value!='' && value!=undefined && value!=null && value!='null') {
          let date1=Date.parse(new Date(value));//培训结束时间
          if(this.messages.trainEnd!='' && this.messages.trainEnd!=undefined && this.messages.trainEnd!=null && this.messages.trainEnd!='null'){
            let date2=Date.parse(new Date(this.messages.trainStart))//培训开始时间
            if(date1<=date2){
              this.$message.warning('培训结束时间大于培训开始时间')
              this.messages.trainEnd = ''
            }
          }

        }
      },



      //新增时获取UID
      // partyUid(){
      //   commonReq.getNewUid({}).then(response =>{
      //     const res = response
      //     this.messages.id = res;
      //
      //   })
      //
      // },
      //打开页面
      show (t,row) {
        this.visible = true;
        if(t==1){//新增
          this.isEdit=1;
          this.title='新增';
          this.messages = {
            id:'',
            theme:'',//培训主题
            department:'',//开展部门
            number:'',//限制人数
            applyStart:'',//报名开始时间
            applyEnd:'',//报名结束时间
            trainStart:'',//培训开始时间
            trainEnd:'',//培训结束时间
            address:'',//培训地点
            content:'',//培训内容
          }
        }else if(t==4){//编辑
          this.loading=true;
          this.isEdit=2;
          this.title='编辑';
          this.getDetail(row.id);
        }

      },
      //获取编辑详情
      getDetail(id){
        let params={
          id:id
        }
        getTrainDetail(params).then(response => {
          const res = response;
          this.messages={
            id:res.id,
            theme:res.theme,//培训主题
            department:res.department,//开展部门
            number:res.number,//限制人数
            applyStart:res.applyStart,//报名开始时间
            applyEnd:res.applyEnd,//报名结束时间
            trainStart:res.trainStart,//培训开始时间
            trainEnd:res.trainEnd,//培训结束时间
            address:res.address,//培训地点
            content:res.content,//培训内容
          }

          //报名时间培训时间
          if(this.messages.applyStart!='' && this.messages.applyStart!=undefined && this.messages.applyStart!=null && this.messages.applyStart!='null'){
            this.messages.applyStart=this.messages.applyStart.substring(0,16)
          }
          if(this.messages.applyEnd!='' && this.messages.applyEnd!=undefined && this.messages.applyEnd!=null && this.messages.applyEnd!='null'){
            this.messages.applyEnd=this.messages.applyEnd.substring(0,16)
          }
          if(this.messages.trainStart!='' && this.messages.trainStart!=undefined && this.messages.trainStart!=null && this.messages.trainStart!='null'){
            this.messages.trainStart=this.messages.trainStart.substring(0,16)
          }
          if(this.messages.trainEnd!='' && this.messages.trainEnd!=undefined && this.messages.trainEnd!=null && this.messages.trainEnd!='null'){
            this.messages.trainEnd=this.messages.trainEnd.substring(0,16)
          }

        }).finally(() => {
          this.loading = false;
        });
      },

      //取消
      cancel() {
        this.visible = false;
        this.messages={
          id:'',
          theme:'',//培训主题
          department:'',//开展部门
          number:'',//限制人数
          applyStart:'',//报名开始时间
          applyEnd:'',//报名结束时间
          trainStart:'',//培训开始时间
          trainEnd:'',//培训结束时间
          address:'',//培训地点
          content:'',//培训内容
        }
      },

      //保存
      saveBtn () {
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }

          //报名时间和培训时间处理
          if(this.messages.applyStart!='' && this.messages.applyStart!=undefined && this.messages.applyStart!=null && this.messages.applyStart!='null'){
            if(this.messages.applyStart.length==16){
              this.messages.applyStart=this.messages.applyStart+':00'
            }else if(this.messages.applyStart.length>19){
              this.messages.applyStart=this.messages.applyStart.substring(0,19)
            }

          }else{
            this.messages.applyStart=''
          }

          if(this.messages.applyEnd!='' && this.messages.applyEnd!=undefined && this.messages.applyEnd!=null && this.messages.applyEnd!='null'){
            if(this.messages.applyEnd.length==16){
              this.messages.applyEnd=this.messages.applyEnd+':00'
            }else if(this.messages.applyEnd.length>19){
              this.messages.applyEnd=this.messages.applyEnd.substring(0,19)
            }

          }else{
            this.messages.applyEnd=''
          }

          if(this.messages.trainStart!='' && this.messages.trainStart!=undefined && this.messages.trainStart!=null && this.messages.trainStart!='null'){
            if(this.messages.trainStart.length==16){
              this.messages.trainStart=this.messages.trainStart+':00'
            }else if(this.messages.trainStart.length>19){
              this.messages.trainStart=this.messages.trainStart.substring(0,19)
            }

          }else{
            this.messages.trainStart=''
          }

          if(this.messages.trainEnd!='' && this.messages.trainEnd!=undefined && this.messages.trainEnd!=null && this.messages.trainEnd!='null'){
            if(this.messages.trainEnd.length==16){
              this.messages.trainEnd=this.messages.trainEnd+':00'
            }else if(this.messages.trainEnd.length>19){
              this.messages.trainEnd=this.messages.trainEnd.substring(0,19)
            }

          }else{
            this.messages.trainEnd=''
          }


          if(this.isEdit==1){//新增保存
            delete this.messages.id;
            getTrainAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })

          }else if(this.isEdit==2){//编辑保存
            getTrainEdit(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel()
              this.$emit('refresh')
            })
          }


        })
      }

    },
  }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 15px 40px;
  }
</style>
