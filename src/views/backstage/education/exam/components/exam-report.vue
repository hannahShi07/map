<template>
    <el-form :model="formData" ref="refForm" label-width="90px" :loading='loading' style="height:1px;overflow:hidden;">
      <div class="examInfo">
        <p style="font-size:24px;color:#555;padding:20px;">{{formData.examName}}</p>
        <div style="padding:0 20px 20px;border-bottom:1px solid #eee;text-align:right">
          <span >起止时间 {{formData.beginTime}} - {{formData.endTime}}</span>
        </div>

        <!-- 选择题 -->
        <div style="padding:20px;padding-bottom:0;margin-bottom:1px;border-bottom:1px solid #eee;" v-if='formData.singleChoice.length'>
          <p style="font-size:18px;color:#555;margin-bottom:20px;">{{dxX}}、选择题（本大题共{{formData.singleChoice.length}}小题，每小题{{formData.singleChoice[0].score}}分，共{{formData.singleChoice.length * formData.singleChoice[0].score}}分)</p>
          <div class="titleContent" v-for="(item,index) in formData.singleChoice" :key="index" :style="hasBorder(formData.singleChoice.length-1,index)">
            <p style="font-size:16px;color:#555;margin:0;margin-bottom:10px;margin-top:20px;">{{index+1}}.{{item.title}}</p>
            <p style="font-size:12px;color:#FC7121;margin:10px 0;" v-if="flag"><span style="color:#fff;">空</span>正确答案: {{item.answer}}</p>
            <p v-for='(item,idx) in item.choose' :key='idx' style="margin-top:10px;">
              <span style="color:#fff;">空</span><span style="display:inline-block;width:16px;height:16px;border:1px solid #ccc;border-radius:50%;margin-right:10px;vertical-align: bottom;"></span>{{item}}
            </p>
          </div>
        </div>

        <!-- 多选题 -->
        <div style="padding:20px;padding-bottom:0;margin-bottom:1px;border-bottom:1px solid #eee;" v-if='formData.multipleChoice.length'>
          <p style="font-size:18px;color:#555;margin-bottom:20px;">{{duoxX}}、多选题（本大题共{{formData.multipleChoice.length}}小题，每小题{{formData.multipleChoice[0].score}}分，共{{formData.multipleChoice.length * formData.multipleChoice[0].score}}分)</p>
          <div class="titleContent" v-for="(item,index) in formData.multipleChoice" :style="hasBorder(formData.multipleChoice.length-1,index)">
            <p style="font-size:16px;color:#555;margin:0;margin-bottom:10px;margin-top:20px;">{{formData.singleChoice.length + index +1}}.{{item.title}}</p>
            <p style="font-size:12px;color:#FC7121;margin:10px 0;" v-if="flag"><span style="color:#fff;">空</span>正确答案: {{item.answer}}</p>
            <p v-for='(item,idx) in item.choose' :key='idx' style="margin-top:10px;">
              <span style="color:#fff;">空</span><span style="display:inline-block;width:16px;height:16px;border:1px solid #ccc;margin-right:10px;vertical-align: bottom;"></span>{{item}}
            </p>
          </div>
        </div>

        <!-- 填空题 -->
        <div style="padding:20px;padding-bottom:0;margin-bottom:1px;border-bottom:1px solid #eee;" v-if='formData.fillBlank.length'>
          <p style="font-size:18px;color:#555;margin-bottom:20px;">{{tkX}}、填空题（本大题共{{formData.fillBlank.length}}小题，每小题{{formData.fillBlank[0].score}}分，共{{formData.fillBlank.length * formData.fillBlank[0].score}}分)</p>
          <div class="titleContent" v-for="(item,index) in formData.fillBlank" :key="index" :style="hasBorder(formData.fillBlank.length-1,index)">
            <p style="font-size:16px;color:#555;margin:0;margin-bottom:10px;margin-top:20px;">{{formData.singleChoice.length + formData.multipleChoice.length + index +1}}.{{item.title}}</p>
            <p style="font-size:12px;color:#FC7121;margin:10px 0;" v-if="flag"><span style="color:#fff;">空</span>正确答案: {{item.answer.join(',')}}</p>
          </div>
        </div>

        <!-- 判断题 -->
        <div style="padding:20px;padding-bottom:0;margin-bottom:1px;border-bottom:1px solid #eee;" v-if='formData.judgment.length'>
          <p style="font-size:18px;color:#555;margin-bottom:20px;">{{pdX}}、判断题（本大题共{{formData.judgment.length}}小题，每小题{{formData.judgment[0].score}}分，共{{formData.judgment.length * formData.judgment[0].score}}分)</p>
          <div class="titleContent" v-for="(item,index) in formData.judgment" :key="index" :style="hasBorder(formData.judgment.length-1,index)">
            <p style="font-size:16px;color:#555;margin:0;margin-bottom:10px;margin-top:20px;">{{formData.singleChoice.length + formData.multipleChoice.length + formData.fillBlank.length + index +1}}.{{item.title}}</p>
            <p style="font-size:12px;color:#FC7121;margin:10px 0;" v-if="flag"><span style="color:#fff;">空</span>正确答案: {{item.answer}}</p>
          </div>
        </div>

        <!-- 简答题 -->
        <div style="padding:20px;padding-bottom:0;margin-bottom:1px;border-bottom:1px solid #eee;" v-if='formData.shortAnswer.length'>
          <p style="font-size:18px;color:#555;margin-bottom:20px;">{{jdX}}、填空题（本大题共{{formData.shortAnswer.length}}小题，每小题{{formData.shortAnswer[0].score}}分，共{{formData.shortAnswer.length * formData.shortAnswer[0].score}}分)</p>
          <div class="titleContent" v-for="(item,index) in formData.shortAnswer" :key="index" :style="hasBorder(formData.shortAnswer.length-1,index)">
            <p style="font-size:16px;color:#555;margin:0;margin-bottom:10px;margin-top:20px;">{{formData.singleChoice.length + formData.multipleChoice.length + formData.fillBlank.length  + formData.judgment.length + index +1}}.{{item.title}}</p>
            <p style="font-size:12px;color:#FC7121;margin:10px 0;" v-if="flag"><span style="color:#fff;">空</span>正确答案: {{item.answer.join(',')}}</p>
          </div>
        </div>

      </div>

    </el-form>
</template>

<script>

  import commonReq from '@/api/public/commonReq'
  import { previewPaper ,exportpaper,exportAnswer} from '@/api/backstage/education/exam'
  import { siteSave } from '@/api/backstage/education/site/site.js';
  import treeDialogVue from '../../../party/basic/org/components/tree-dialog.vue';
  export default {
    components:{

    },

    data () {

      return {
        // false编辑  true添加
        addStatus: true,
        title: '预览试卷',
        visible: false,
        loading: false,
        examObject:[],
        formData:{
          singleChoice:[],
          multipleChoice:[],
          fillBlank:[],
          judgment:[],
          shortAnswer:[]
        },
        bxh:'1',//大题型序号，一二三四五
        sxh:0, //题型小序号 ，1234567
        dxX:null,
        duoxX:null,
        tkX:null,
        pdX:null,
        jdX:null,
        flag:false,//是否显示答案
      }
    },
    created() {
    },
    methods: {

      show (data,flag) {
        this.loading = true
        this.flag = flag
        this.visible = treeDialogVue
        previewPaper(data).then(res => {
          this.loading=false
          this.formData = res
          if(res.singleChoice.length){
            this.dxX = '一'
          } else {
            this.dxX = null
          }
          if(res.multipleChoice.length){
            if(this.dxX){
              this.duoxX = '二'
            } else {
              this.duoxX = '一'
            }
          } else {
            this.duoxX=null
          }

          if(res.fillBlank.length){
            if(this.dxX && this.duoxX){
              this.tkX = '三'
            } else if(this.dxX || this.duoxX){
              this.tkX = '二'
            } else {
              this.tkX = '一'
            }
          } else {
            this.tkX = null
          }

          if(res.judgment.length){
            if(this.dxX && this.duoxX && this.tkX){
              this.pdX = '四'
            } else {
              if((this.dxX && this.duoxX) || (this.dxX && this.tkX) || (this.duoxX && this.tkX)){
                this.pdX = '三'
              } else if (this.dxX || this.duoxX || this.tkX){
                this.pdX = '二'
              } else {
                this.pdX = '一'
              }
            }
          } else {
            this.pdX = null
          }
          if(res.shortAnswer.length){
            if(this.dxX && this.duoxX && this.tkX && this.pdX){
              this.jdX = '五'
            } else {
              if((this.dxX && this.duoxX && this.pdx) || (this.dxX && this.duoxX || this.tkX) || (this.dxX && this.pdX && this.tkX) || (this.duoxX && this.pdX && this.tkX)){
                this.jdX = '四'
              }else if((this.dxX && this.duoxX) || (this.dxX && this.tkX) || (this.dxX && this.pdX) || (this.duoxX && this.tkX) || (this.duoxX && this.pdX) || (this.pdX && this.tkX)){
                this.jdX = '三'
              } else if (this.dxX || this.duoxX || this.tkX || this.pdX){
                this.jdX = '二'
              } else {
                this.jdX = '一'
              }
            }
          } else {
            this.jdX = null
          }
          this.$nextTick(()=>{
            var html = document.getElementsByClassName('examInfo')[0].innerHTML;
            let content = `<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body> ${html} </body></html>`;
            let datas = {examExport:content,examId:data.examId}
            if(flag){
              exportAnswer(datas)
            } else {
              exportpaper(datas)
            }

          })

        }).finally(()=>{
          this.$emit('cloasLoad')
        })

      },
      close () {
        this.visible = false
      },

    },
    computed:{
      hasBorder(){
        return function(leng,index){
          let obj={
            paddingBottom:'20px',
          }
          if(leng!=index){
            obj['borderBottom']='1px solid #eee'
          }
          return obj
        }
      }
    },

    filters:{
    }
  }
</script>

<style lang="scss" scoped>
  .examInfo{
    // padding:0 20px;
    .examTitle{
      color:#555;
      font-size: 24px;
      margin:20px 0;
    }
  }

  p{margin:0;}



.ht{
  color:#FC7121;
}
/deep/ .el-dialog__body{
  padding:0;
  .el-form-item__label{
    color:#555;
  }
  .el-form-item{
    margin:0;
    border-bottom: 1px solid #f3f3f3;
  }
}
</style>
