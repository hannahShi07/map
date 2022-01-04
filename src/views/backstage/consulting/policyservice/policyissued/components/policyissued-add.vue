<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1131px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    v-if="visible">
    <el-form ref="refForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入1~50字的政策解读标题" v-model="formData.title" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="来源" >
            <el-input v-model="formData.source" placeholder="请输入政策来源" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源地址" prop="sourceUrl">
            <el-input v-model="formData.sourceUrl" placeholder="请输入来源地址" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公示日期" prop="releaseTime">
            <el-date-picker
              v-model="formData.releaseTime"
              type="date"
              placeholder="请选择公示日期"
              :picker-options="startDatePicker"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="失效时间" >
            <el-date-picker
              v-model="formData.invalidTime"
              type="date"
              placeholder="请选择政策失效时间"
              :picker-options="endDatePicker"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="正文" prop="richContent">
            <base-tinymce-editor v-model="formData.richContent" placeholder="20000个字符以内"></base-tinymce-editor>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传附件" class="rel">
            <base-file-upload
              :limit='1'
              list-type="text"
              :acceptSize="20"
              :accept='accept1'
              :autoUpload="true"
              :otherData="otherData1"
              :action="action"
              ref="fileRef"
              @associationCallback="associationCallback"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否置顶" >
            <el-radio-group v-model="formData.isTop">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公开范围" >
            <el-radio-group v-model="formData.openRange">
              <el-radio :label="1">公开</el-radio>
              <el-radio :label="2">组织内部</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-row>-->
<!--        <el-col :span="24">-->
<!--          <el-button size="medium" type="primary" @click="clickLabel">点击检测标签</el-button>-->
<!--          <div class="wiseLabel">-->
<!--            <li v-for="(item,index) in labelList">{{item.data}}-->
<!--&lt;!&ndash;              <img src="@/assets/page/icon-del.png" width="14" height="14" alt="" >&ndash;&gt;-->
<!--              <span class="close el-icon-close" @click="del(index,item)"/>-->
<!--            </li>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="sure(true)">保存</el-button>
      <el-button size="medium" type="primary" @click="sure(false)">发布</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {policySave,policyEdit,getpolicyInfo} from "@/api/backstage/consulting/policyservice/policyissued/policyissued.js"
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: 'policyissued-add',
    data(){
      return{
        visible: false,
        title: '',//标题
        loading:false,//加载遮罩
        isEdit:1,//新增：1，编辑：2
        // labelList:[],//标签
        startDatePicker: '',
        endDatePicker: this.processDate(),
        formData:{//新增数据
          id:'',
          title:'',
          source:'', //来源
          sourceUrl: '', //	链接地址
          releaseTime:'',//公示日期
          invalidTime:"",//失效时间
          richContent:"",//正文
          isTop: 1,
          // label:'',//标签
          // bigLabel:'',//父标签
          openRange:1,
          // orgId:{// 发文组织
          //   "data": '',
          //   "key": ''
          // },
          state:{ // 状态（已发布：1305775154508333056 草稿：2455656502258606080 未发布：1305775206073106432）
            "data": '',
            "key": ''
          }
        },
        node:{
          'title':{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          richContent:{
            required: true,
            message: "请输入",
            trigger: "change"
          },
          releaseTime:{
            required: true,
            message: "请选择",
            trigger: "blur"
          },
          sourceUrl:[{
            required: false,
            message: "请输入来源地址",
            trigger: "blur"
          },{
            pattern: /(^([0-9a-z-]{1,}.)?[0-9a-z-]{2,}.([0-9a-z-]{2,}.)?[a-z]{2,}$)|(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: '请输入正确的来源地址'
          }],
        },
        //附件上传
        action:`${process.env.VUE_APP_BASE_API}/file/attachment/uploadFile`,//附件上传地址
        otherData1:{
          id: '',
          bizId: "",
          bizType: "policyissued",
          isSingle: false
        },
        accept1:'.doc,.docx,.pdf,.xlsx,.txt',
        isFalg: true,// true: 保存；false: 发布
      }
    },
    methods:{
      //公示日期和失效日期的比较
      processDate () {
        const self = this;
        return {
          disabledDate (time) {
            // 如果开始时间不为空，则结束时间大于开始时间
            if (self.formData.releaseTime) {
              return new Date(self.formData.releaseTime).getTime() > time.getTime();
            } else {
              // 开始时间不选时，结束时间最大值小于等于当天日期
              return time.getTime() > Date.now();
            }
          }
        };
      },
      getNowFormatDate() {//当前时间
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData1.bizId = res;
        })
      },
      // 成功回调
      associationCallback(val){
        if(val){
         if(this.isFalg){
           this.toSave()
         }else{
           this.toPush()
         }
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },
      // t:  1-新增
      show (t, row) {
        this.visible = true
        // this.labelList = []
        if(t === 1){
          this.isEdit = 1
          this.title = '新增政策'
          this.partyUid()
          this.formData.invalidTime = '', //失效时间
            this.formData.isTop = 1,  //是否顶置
            this.formData.label = '',  //标签
            this.formData.openRange = 1,  //公开范围
            this.formData.releaseTime = this.getNowFormatDate(),  //发文日期
            this.formData.source = '',  //来源
            this.formData.sourceUrl = '',  //来源地址
            this.formData.richContent = '',  //正文
            this.formData.title = '' //标题
            // this.formData.orgId = {// 发文组织
            //   "data": '',
            //   "key": ''
            // }
            this.formData.state =  {// 状态
              "data": '',
              "key": ''
            }
        }else if(t === 2){
          this.isEdit =2
          this.title = '编辑'
          this.loading =true
          this.otherData1.bizId = row.id
          this.$nextTick(function(){// 编辑时，附件自动回显
            this.$refs.fileRef.init()
          })
          this.getDetail(row.id)
          this.loading = false
        }
      },
      getDetail(id){
        let params = {
          id: id,
        }
        getpolicyInfo(params).then(response => {
          const res = response;
          this.formData = res;
          this.formData.openRange = res.openRange
          // this.labelList = []
          // if(res.labels && res.labels.length){
          //   for(let i=0;i<res.labels.length;i++){
          //     this.labelList.push({data:res.labels[i].data.data,key:res.labels[i].data.key})
          //   }
          // }
        }).finally(() => {
        });
      },
      //点击检测标签
      // clickLabel(){
      //   if(!this.formData.richContent){
      //     this.$message.error('请输入正文')
      //   }else {
      //     let params = {
      //       "policyText": this.formData.richContent,
      //     }
      //     policyLable(params).then(response => {
      //       const res = response;
      //       if(res.labList && res.labList.length){
      //         this.labelList = res.labList;
      //         this.formData.bigLabel = res.bigLabs
      //       }else{
      //         this.$message("未检测到标签")
      //       }
      //
      //     }).finally(() => {
      //     });
      //   }
      // },
      //删除组织
      // del(data,currData){
      //   this.labelList.splice(data,1)
      // },

      // 保存参数
      getParams(state){
        // this.formData.label = [];
        // for(let i=0;i<this.labelList.length;i++){
        //   this.formData.label.push(this.labelList[i].key)
        // }
        // let labels = ""
        // if(this.formData.label.length === 1){
        //   labels = this.formData.label[0]
        // }else if(this.formData.label.length > 1){
        //   labels = this.formData.label.join(',')
        // }
        if(this.formData.releaseTime!='' && this.formData.releaseTime!=undefined && this.formData.releaseTime!=null && this.formData.releaseTime!='null'){
          if(this.formData.releaseTime.length<=10){
            this.formData.releaseTime=this.formData.releaseTime+' '+'00:00:00'
          }
        }
        if(this.formData.invalidTime!='' && this.formData.invalidTime!=undefined && this.formData.invalidTime!=null && this.formData.invalidTime!='null'){
          if(this.formData.invalidTime.length<=10){
            this.formData.invalidTime=this.formData.invalidTime+' '+'00:00:00'
          }
        }


        let params = {
          id:this.formData.id,
          invalidTime:this.formData.invalidTime, //失效时间
          isTop:this.formData.isTop,  //是否顶置
          openRange:this.formData.openRange,  //公开范围
          releaseTime:this.formData.releaseTime,  //发文日期
          source:this.formData.source,  //来源
          sourceUrl:this.formData.sourceUrl,  //来源地址
          richContent:this.formData.richContent,  //正文
          title:this.formData.title,  //标题
          // label:labels,
          // bigLabel:this.formData.bigLabel,
          // orgId:{// 发文组织
          //   "data": '',
          //   "key": ''
          // },
          state:{ // 状态
            "data": '',
            "key": state
          }
        }

        return params
      },
      //发布数据
      toPush(){
        this.$refs['refForm'].validate((valid) => {
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          } else {
            let params = this.getParams('1305775206073106432')
            if(this.formData.releaseTime){
              params.state.key = '1305775154508333056'
              this.$confirm('您已选择公示时间，请确认是否在公示时间发布该政策？', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {
                params.state.key = '1305775206073106432'
                if(this.isEdit==1){
                  policySave(params).then(response => {
                    const res = response
                    this.tip()

                  })
                }else if(this.isEdit==2){

                  policyEdit(params).then(response => {
                    const res = response
                    this.tip()

                  })
                }
              }).catch(action => {
                if(action === 'cancel'){
                  params.state.key = '1305775154508333056'
                  if(this.isEdit==1){
                    policySave(params).then(response => {
                      const res = response
                      this.$message.success("政策发布成功")
                      this.$emit('refresh')
                      this.close()
                    })
                  }else if(this.isEdit==2){
                    policyEdit(params).then(response => {
                      const res = response
                      this.$message.success("政策发布成功")
                      this.$emit('refresh')
                      this.close()
                    })
                  }
                }
              })
            }
          }
        })
      },
      //保存政策
      toSave(){
        this.$refs['refForm'].validate((valid) => {
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          } else {
            let params = this.getParams('2455656502258606080')
            if(this.isEdit==1){
              policySave(params).then(response => {
                const res = response
                this.$message(this.successTip())
                this.$emit('refresh')
                this.close()
              })
            }else if(this.isEdit==2){
              policyEdit(params).then(response => {
                const res = response
                this.$message(this.successTip())
                this.$emit('refresh')
                this.close()
              })
            }
          }
        })
      },
      //取消
      close(){
        // this.$refs['ruleForm'].resetFields();
        this.visible = false;
        this.formData= {
          id: '',
          title: '',
          source: '', //来源
          sourceUrl: '', //	链接地址
          releaseTime: '',//公示日期
          invalidTime: "",//失效时间
          richContent: "",//正文
          isTop: 1,
          label: '',//标签
          bigLabel: '',//父标签
          openRange: 1,
          // orgId: {// 发文组织
          //   "data": '',
          //   "key": ''
          // },
          state: { // 状态（已发布：1305775154508333056 草稿：2455656502258606080 未发布：1305775206073106432）
            "data": '',
            "key": ''
          }
        }
      },

      // 获取当前时间
      formatDate () {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth()
        var date = now.getDate()
        month = month + 1
        if (month < 10){
          month = "0" + month
        }
        if (date < 10) {
          date = "0" + date
        }
        var time = year + "-" + month + "-" + date
          return time;
      },

      // 发布提示语句
      tip(){
        let today_time =  this.formatDate();
        if(this.formData.releaseTime < today_time){
          this.$message.success("政策已发布")
        }else if(this.formData.releaseTime == today_time){
          this.$message.success("政策发布成功")
        }else {
          this.$message.success("政策将在公示时间发布")
        }
        this.close()
        this.$emit('refresh')
      },

      // 确定
      sure(val){
        this.isFalg = val
        this.$refs.fileRef.submitFile()
      }
    }
  }
</script>

<style scoped>
  .text-center{
    text-align:center;
  }
  .wiseLabel{
    display: inline-block;
    padding: 0 20px 20px 20px;
  }
  .wiseLabel li{
    display:inline-block;
    list-style-type:none;
    height: 26px;
    line-height: 26px;
    background: #F2F2F2;
    border-radius: 4px;
    margin-right: 20px;
  }
</style>
