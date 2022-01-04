<template>
  <el-dialog
    title="新增题目"
    :visible.sync="visibles"
    width="650px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body='false' :append-to-body='true'
    :destroy-on-close="true">
    <el-form ref='titleForm' :model="formData" :rules="rules" label-width="90px">
      <el-form-item label="选择题目">
        <el-button size="medium" icon="el-icon-plus" @click="chooseTitle" style="margin-bottom: 10px;">选择题目</el-button>
        <div v-if="formData.checkedQues.length">
          <div v-for="(item,index) in formData.checkedQues" :key="item.index">
            <el-col :span="6">
              已选{{item.typeName}} <span class="ht">{{item.ids?item.ids.length:item.typeCnt}}</span> 题
            </el-col>
            <el-col :span="16" style="margin-bottom:20px;">
              <el-form-item label="每题分数"
                :prop="'checkedQues.' + index +'.typeScore'"
                :rules="[{
                  required: true, message: '分数不能为空', trigger: 'blur'
                }]">
                <el-input :ref="'checkedQues.' + index +'.typeScore'" v-model.number="item.typeScore" maxlength="2" @input="scoalChange($event,index)"></el-input>
              </el-form-item>
            </el-col>
          </div>

        </div>

      </el-form-item>
      <el-form-item label="总分数">
        <el-divider></el-divider>
        <span class="rp">*</span>本次考试共计 <span class="ht">{{totalScore}}</span> 分
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: center">
      <el-button @click="preview">试卷预览</el-button>
      <el-button type="primary" @click="saveBtn" :loading="saveLoading">保存</el-button>
    </div>
    <select-title ref="selectTitle" @refresh='showTitle'></select-title>
    <preview-paper ref="refPreview"></preview-paper>
  </el-dialog>

</template>

<script>
import SelectTitle from './select-title'
import PreviewPaper from './previewPaper'
export default{
  components:{
    SelectTitle,
    PreviewPaper
  },
  data(){
    return {
      visibles:false,
      saveLoading:false,
      totalScore:0,
      formData:{
        checkedQues:[

        ],//已选题目
      },
      questIds:'',//已选题目id字符串
      questScores:'',//分值字符串  题型:分值
      rules:{

      },
      examInfo:{},
      quesList:[],
      oldQuestScore:[],//设置的题型分数
    }
  },
  methods:{
    chooseTitle(){
      this.oldQuestScore=[]
      this.formData.checkedQues.forEach(item=>{
        let obj = {
          type:item.type,
          typeScore:item.typeScore
        }
        this.oldQuestScore.push(obj)
      })
      console.log('选择的题目',this.quesList)
      this.$refs.selectTitle.show(this.quesList)
    },
    saveBtn(){
      this.$refs['titleForm'].validate((valid,invalidatedata) => {
        if(valid){
          this.questScores = ''
          this.formData.checkedQues.forEach(item=>{
            this.questScores += item.type + ':' + item.typeScore + ','
          })
          this.$emit('refresh',this.questIds,this.questScores,this.formData.checkedQues,this.quesList)
          this.visibles = false
        } else {
            let ref=Object.keys(invalidatedata)[0]
            // console.log(this.$refs[ref])
            this.$refs[ref][0].focus()
        }
      })

    },
    scoalChange(val,index){
      this.formData.checkedQues[index].typeScore= val.replace(/[^\.\d]/g,'').replace('.','')
      // val= val.replace(/[^\.\d]/g,'').replace('.','')
      // console.log(this.formData.checkedQues)
      this.totalScore = 0;
      this.formData.checkedQues.forEach(item=>{
        if(item.typeScore!=''){
          this.totalScore += item.typeScore * item.ids.length;
        }
      })
    },
    showTitle(val){
      console.log('题目',val)
      this.quesList = val
      this.questIds = ''

      var vals = JSON.parse(JSON.stringify(val))
      this.formData.checkedQues=[]
      vals.forEach((item,idx)=>{
        if(this.formData.checkedQues.length){
          this.formData.checkedQues.forEach((obj,index)=>{
            if(item.type.key=='2309718804909785285' || item.type.key=='2290018013252871053'){
              if(!item.checked){
                let oi = this.formData.checkedQues.findIndex(i=>i.type== '2309718804909785285')
                if(oi>-1){
                  this.formData.checkedQues[oi].ids.push(item.id)
                } else {
                  let o ={
                    typeName:'填空题',
                    typeScore:'',
                    ids:[],
                    type:'2309718804909785285'
                  }
                  o.ids.push(item.id)
                  this.formData.checkedQues.push(o)
                }
                item.checked = true
              }
            } else {
              if(!item.checked){
                let oi = this.formData.checkedQues.findIndex(i=>i.type==item.type.key)
                if(oi>-1){
                  this.formData.checkedQues[oi].ids.push(item.id)
                } else {
                  let o ={
                    typeName:item.type.data,
                    typeScore:'',
                    ids:[],
                    type:item.type.key
                  }
                  o.ids.push(item.id)
                  this.formData.checkedQues.push(o)
                  // console.log('3,',index)
                }
                item.checked = true
                // console.log(item.type.key,obj.type)
              }

            }
          })
        } else {
          let o ={
              typeScore:'',
              ids:[],
          }
          if(item.type.key=='2309718804909785285' || item.type.key=='2290018013252871053'){
            o.type='2309718804909785285'
            o.typeName='填空题'
          } else {
            o.type=item.type.key
            o.typeName=item.type.data
          }
          o.ids.push(item.id)
          item.checked = true
          // console.log(item.type.key,'首次')

          this.formData.checkedQues.push(o)
        }

      })
      this.totalScore = 0
      this.formData.checkedQues.forEach(item=>{
        this.oldQuestScore.forEach(obj=>{
          if(item.type == obj.type){
            item.typeScore = obj.typeScore
          }
        })
        this.totalScore += (item.typeScore?item.typeScore:0) * item.ids.length;
      })

      val.forEach(item=>{
        this.questIds += (item.id + ',')
      })
      // console.log(this.formData.checkedQues)
    },
    preview(){

      this.$refs['titleForm'].validate((valid) => {
        if(valid){
          if(this.formData.checkedQues.length==0){
            this.$message.error('请添加题目')
            return false
          }
          if(!this.examInfo.examName){
            this.$message.error('请填写考试名称')
            return false
          }
          if(!this.examInfo.beginTime){
            this.$message.error('请选择开始时间')
            return false
          }
          if(!this.examInfo.endTime){
            this.$message.error('请选择结束时间')
            return false
          }

          this.examInfo.questIds = this.questIds
          let score = ''
          this.examInfo.questScores = ''
          this.formData.checkedQues.forEach(item=>{
            this.examInfo.questScores += item.type + ':' + item.typeScore + ','
          })
          this.$refs.refPreview.show(this.examInfo)
        }
      })
      // console.log(this.examInfo)
    },
    show(obj,data,quesList,ids){
      console.log('data',data,quesList)
      if(ids){
        this.questIds = ids
      }

      this.quesList = quesList
      this.examInfo = obj
      // console.log(data)
      if(data && data.length){
        this.formData.checkedQues = data
        this.totalScore = 0;
        data.forEach(item=>{
          this.totalScore += item.typeCnt * item.typeScore
        })
      }
      this.visibles = true
    }
  },

}
</script>

<style lang="scss" scoped>
/deep/ .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 20px 0 4px;
}
/deep/ .el-dialog .el-dialog__body{
  overflow-x: hidden;
  .el-divider--horizontal{
    width: calc(100% + 20px);
  }
}
.ht{
  color:#FC7121;
}
.rp{
  color: #ED3C3C;
}
</style>
