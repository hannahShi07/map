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
            <el-input placeholder="请输入" v-model="formData.title" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="公告内容" prop="details">
            <base-tinymce-editor v-model="formData.details" placeholder="20000个字符以内"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="text-center">
      <el-button size="medium" @click="sure(true)">保存</el-button>
      <el-button size="medium" type="primary" @click="sure(false)">发布</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {getNoticeAdd,getNoticeedit,getNoticeInfo} from "@/api/backstage/sysset/administrationIndex/notice/notice.js"
  import commonReq  from "@/api/public/commonReq.js"
  export default {
    name: 'policyissued-add',
    data(){
      return{
        visible: false,
        loading:true,
        title: '',//标题
        formData:{//新增数据
          id:'',
          title:'',
          details:"",//正文
          states:{ // 状态
            "data": '',
            "key": ''
          },
          openTime:'', // 固定传空，后台有用
          isDelete:0, // 固定传0，后台有用
        },
        node:{
          'title':{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          details:{
            required: true,
            message: "请输入",
            trigger: "blur"
          },
        },
      }
    },
    methods:{
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
        })
      },
      // t:  1-新增
      show (t, row) {
        this.visible = true
        this.labelList = []
        if(t === 1){
          this.isEdit = 1
          this.title = '新增公告'
          this.partyUid()
          this.formData.details = '',  //正文
          this.formData.title = '' //标题
          this.loading = false
        }else if(t === 2){
          this.isEdit =2
          this.title = '编辑'
          this.loading =true
          this.getDetail(row.id)
        }
      },
      getDetail(id){
        let params = {
          id: id,
        }
        getNoticeInfo(params).then(response => {
          const res = response.data;
          this.formData = res;
          this.formData = {//新增数据
            id: res.id,
            title: res.title,
            details: res.details,//正文
            states:{ // 状态
              "data": res.states.data,
              "key":   res.states.key
            },
            openTime:'', // 固定传空，后台有用
            isDelete:0, // 固定传0，后台有用
          }

        }).finally(() => {
          this.loading = false
        });
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
              this.$confirm('是否立即发布公告？', '提示', {
                distinguishCancelAndClose: true,
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {
                this.formData.states.key = '1310765959610368000'
                if(this.isEdit==1){
                  getNoticeAdd(this.formData).then(response => {
                    const res = response
                    this.tip()

                  })
                }else if(this.isEdit==2){
                  getNoticeedit(this.formData).then(response => {
                    const res = response
                    this.tip()

                  })
                }
              }).catch(action => {

              })
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
            this.formData.states.key = '1310765921983266816'
            if(this.isEdit==1){
              getNoticeAdd(this.formData).then(response => {
                const res = response
                this.$message(this.successTip())
                this.$emit('refresh')
                this.close()
              })
            }else if(this.isEdit==2){
              getNoticeedit(this.formData).then(response => {
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
        this.visible = false
      },

      // 发布提示语句
      tip(){
        this.$message.success("公告发布成功")
        this.close()
        this.$emit('refresh')
      },

      // 确定
      sure(val){
       if(val){
         this.toSave()
       }else{
         this.toPush()
       }
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
