<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '560px'
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    v-if="visible"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="100px" v-cloak v-loading="loading">
      <el-col :span="24">
        <el-form-item label="上传题库">
          <!--<el-input v-model="messages.name" readonly disabled>-->
          <!--</el-input>-->
          <div>
          <text-tooltip
            :content="messages.name"
            class="wid190"
            refName="name"
          >
          </text-tooltip>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="题目名称" prop="title">
          <el-input v-model="messages.title" type="textarea" placeholder="请输入" maxlength="500" :autosize='{ minRows: 5, maxRows: 5}' resize="none"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item class="is-required" label="试题类型" prop="type.key">
          <el-select
            v-model="messages.type.key"
            value-key="id"
            :disabled="isEdit==2"
            filterable
            placeholder="请选择"
            style="width:100%;"
            clearable>
            <el-option
              v-for="(item,index) in dicts.learn_quest"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="答案解析" prop="resultAnalysis">
          <el-input v-model="messages.resultAnalysis" type="textarea" placeholder="请输入" maxlength="500" :autosize='{ minRows: 5, maxRows: 5}' resize="none"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="keyCol" :span="24" v-if="messages.type.key!='' && messages.type.key!=undefined && messages.type.key!=null && messages.type.key!='null'">
        <el-form-item class="is-required" label="答案关键词">
         <div class="keyContent">
           <span class="keyspan" v-if="messages.type.key=='2309718804909785285' || messages.type.key=='2290018013252871053' || messages.type.key=='2290018013252871056'"><i>*</i>请填写答案关键词，系统会根据答案关键字进行试题评分；为保证评分准确性，关键字内请不要添加标点符号</span>
           <!--判断题-->
           <div class="keycontain" v-if="messages.type.key=='2290018013252871050'">
             <div class="keylist">
               <el-radio-group v-model="pdresult">
                 <el-radio :label="0">正确</el-radio>
                 <el-radio :label="1">错误</el-radio>
               </el-radio-group>
             </div>
           </div>
           <!--单选题-->
           <div class="keycontain" v-if="messages.type.key=='2290018013252871042'">
             <div class="keylist" v-for="(list,index) in data" :key="index">
               <span class="keyindex">{{getselect(index)}}</span>
               <el-radio-group v-model="dxradio">
                 <el-radio name="type" :label="index">正确</el-radio>
               </el-radio-group>
               <el-input v-model="list.dxtxt" placeholder="请输入" clearable></el-input>
               <span class="keyadd txt el-icon-circle-plus-outline" @click="add(index)" v-if="index == 0"></span>
               <span class="keyreduce txt el-icon-remove-outline" @click="reduce(index)" v-else></span>
             </div>
           </div>
           <!--多选题-->
           <div class="keycontain" v-if="messages.type.key=='2290018013252871045'">
             <div class="keylist" v-for="(list,index) in datadx" :key="index">
               <span class="keyindex">{{getselect(index)}}</span>
               <el-checkbox v-model="list.dxradio">正确</el-checkbox>
               <el-input v-model="list.dxtxt" placeholder="请输入" clearable ></el-input>
               <span class="keyadd txt el-icon-circle-plus-outline" @click="adddx(index)" v-if="index == 0"></span>
               <span class="keyreduce txt el-icon-remove-outline" @click="reducedx(index)" v-else></span>
             </div>

           </div>
           <!--填空题-->
           <div class="keycontain" v-if="messages.type.key=='2309718804909785285' || messages.type.key=='2290018013252871053'">
             <div class="keylist keylist1" v-for="(list,index) in datatk" :key="index">
               <el-input v-model="list.dxtxt" placeholder="请输入" clearable @blur="onInputBlurtk(list.dxtxt,index)"></el-input>
               <span class="keyadd txt el-icon-circle-plus-outline" @click="addtk(index)" v-if="index == 0"></span>
               <span class="keyreduce txt el-icon-remove-outline" @click="reducetk(index)" v-else></span>
             </div>
           </div>
           <!--简答题-->
           <div class="keycontain" v-if="messages.type.key=='2290018013252871056'">
             <div class="keylist keylist1" v-for="(list,index) in datajd" :key="index">
               <el-input v-model="list.dxtxt" placeholder="请输入" clearable @blur="onInputBlurjd(list.dxtxt,index)"></el-input>
               <span class="keyadd txt el-icon-circle-plus-outline" @click="addjd(index)" v-if="index == 0"></span>
               <span class="keyreduce txt el-icon-remove-outline" @click="reducejd(index)" v-else></span>
             </div>
           </div>

         </div>
        </el-form-item>
      </el-col>

    </el-form>
    <div slot="footer" class="text-center1">
      <el-button size="medium" @click="cancel">取消</el-button>
      <el-button size="medium" type="primary" @click="saveBtn">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import db from '@/utils/localstorage'//  获取用户登录id
  import commonReq  from "@/api/public/commonReq.js"
  import {getQuestonAdd,getQuestonEdit,getQuestonDetail} from "@/api/backstage/education/questionbank/questionbank.js"
  export default {
    name: "question-add",
    components:{},
    data () {
      return {
        loading:false,
        visible: false,
        title: '新增题目',
        list:'',//题库信息
        dicts:{//题目类型
          learn_quest: {},
        },
        pdresult:'',//判断题答案
        messages:{
          id:'',
          name:'',//题库名称
          orgId:{//组织
            data:'',
            key:''
          },
          repoId:'',//题库id
          // isSort:'',//排序：1，不排序：2
          result:[],//问题答案
          resultAnalysis:'',//答案解析
          title:'',//题目名称
          type:{//题目类型
            data:'',
            key:''
          },
        },
        node:{
          'title': [{
            required: true,
            message: '请输入题目名称',
            trigger: 'blur'
          }],
          'type.key': [{
            required: true,
            message: '请输入题目类型',
            trigger: 'change'
          }],
        },
        isEdit:1,//新增：1，编辑：2
        dxradio:'',//单选题绑定值
        data:[{//单选题
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        }],
        datadx:[{//多选题
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        }],
        datatk:[{//填空
          dxtxt:''
        },{
          dxtxt:''
        }],
        datajd:[{//简答
          dxtxt:''
        },{
          dxtxt:''
        }],
      }
    },
    mounted(){

    },
    methods: {
      //增加单选答案
      add(index){
        if(this.data.length>9){
          this.$message.warning('答案不能超过10个')
          return
        }
        let listData={
          dxradio:'',
          dxtxt:''
        }
        this.data.push(listData)
      },
      //删除单选答案
      reduce(index){
        this.data.splice(index,1)
      },
      //增加多选答案
      adddx(index){
        if(this.datadx.length>9){
          this.$message.warning('答案不能超过10个')
          return
        }
        let listData={
          dxradio:'',
          dxtxt:''
        }
        this.datadx.push(listData)
      },
      //删除多选答案
      reducedx(index){
        this.datadx.splice(index,1)
      },
      //增加填空简答答案
      addtk(index){
        if(this.datatk.length>9){
          this.$message.warning('答案不能超过10个')
          return
        }
        let listData={
          dxradio:'',
          dxtxt:''
        }
        this.datatk.push(listData)
      },
      //删除填空简答答案
      reducetk(index){
        this.datatk.splice(index,1)
      },
      //增加简答答案
      addjd(index){
        if(this.datajd.length>9){
          this.$message.warning('答案不能超过10个')
          return
        }
        let listData={
          dxradio:'',
          dxtxt:''
        }
        this.datajd.push(listData)
      },
      //删除填空简答答案
      reducejd(index){
        this.datajd.splice(index,1)
      },
      //过滤对应选项
      getselect(val){
        switch (val) {
          case 0:
            return 'A'
            break
          case 1:
            return 'B'
            break
          case 2:
            return 'C'
            break
          case 3:
            return 'D'
            break
          case 4:
            return 'E'
            break
          case 5:
            return 'F'
            break
          case 6:
            return 'G'
            break
          case 7:
            return 'H'
            break
          case 8:
            return 'I'
            break
          case 9:
            return 'J'
            break
        }


      },
      //调用字典接口
      getDict(){
        let params = {
          types:['learn_quest']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.learn_quest = res.learn_quest;

        })
      },
      //关键词不能添加标点符号
      onInputBlurtk(txt,index){
        //匹配中文标点符号
        let reg =/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        //匹配英文标点符号
        let reg1 =/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/;
        if(reg.test(txt) || reg1.test(txt)){
          this.$message.warning('关键字内请不要添加标点符号')
          this.datatk[index].dxtxt=''
        }
      },
      onInputBlurjd(txt,index){
        //匹配中文标点符号
        let reg =/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
        //匹配英文标点符号
        let reg1 =/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/;
        if(reg.test(txt) || reg1.test(txt)){
          this.$message.warning('关键字内请不要添加标点符号')
          this.datajd[index].dxtxt=''
        }
      },
      //打开页面
      show(t,row,list) {
        this.visible = true;
        this.getDict();
        this.isEdit=1;
        this.title='新增题目';
        this.messages.name=row.title;//题库名称
        this.messages.repoId=row.id;//题库id
        this.messages.orgId=row.orgId;//组织
        if(t==7){
          this.loading=true;
          this.isEdit=2;
          this.title='编辑题目';
          let params={
            id:row.id,

          }
          getQuestonDetail(params).then(response => {
            const res = response;
            this.messages={
              id:res.data.id,
              repoId:res.data.repoId,//题库id
              isSort:res.data.isSort,//排序：1，不排序：2
              result:res.data.result,//问题答案
              resultAnalysis:res.data.resultAnalysis,//答案解析
              title:res.data.title,//题目名称
              type:res.data.type,
              name:list.title,//题库名称
              repoId:list.id,//题库id
              orgId:list.orgId,//组织
            }
            this.messages.result=JSON.parse(this.messages.result);


            //判断题
            if(this.messages.type.key=='2290018013252871050'){
              let that = this
              for(let i=0;i<this.messages.result.length;i++){
                Object.keys(that.messages.result[i]).forEach(item=>{
                  // this.pdresult=that.messages.result[i][item]
                  if(item!='R'){

                    this.pdresult=that.messages.result[i][item]
                  }
                })
              }

            }
            //单选题
            this.data=[];
            if(this.messages.type.key=='2290018013252871042'){
              let that = this
              for(let i=0;i<this.messages.result.length;i++){
                let obj ={}
                Object.keys(that.messages.result[i]).forEach(item=>{
                  if(item!='R'){

                    obj.dxtxt=that.messages.result[i][item]
                    obj.dxradio=this.messages.result[i].R
                    this.data.push(obj)
                  }
                })
              }
              for(let i=0;i<this.data.length;i++){
                if(this.data[i].dxradio=='0'){
                  this.dxradio=i;
                }
              }

            }
            //多选题
            this.datadx=[];
            if(this.messages.type.key=='2290018013252871045'){
              let that = this
              for(let i=0;i<this.messages.result.length;i++){
                let obj ={}
                Object.keys(that.messages.result[i]).forEach(item=>{
                  if(item!='R'){
                    obj.dxtxt=that.messages.result[i][item]
                    obj.dxradio=this.messages.result[i].R
                    this.datadx.push(obj)
                  }
                })
              }
              for(let i=0;i<this.datadx.length;i++){
                if(this.datadx[i].dxradio=='1'){
                  this.datadx[i].dxradio='';
                }else if(this.datadx[i].dxradio=='0'){
                  this.datadx[i].dxradio=true;
                }
              }
            }
            //填空题
            this.datatk=[];
            if(this.messages.type.key=='2309718804909785285' || this.messages.type.key=='2290018013252871053'){
              let that = this
              for(let i=0;i<this.messages.result.length;i++){
                let obj ={}
                Object.keys(that.messages.result[i]).forEach(item=>{
                  if(item!='R'){

                    obj.dxtxt=that.messages.result[i][item]
                    // obj.dxradio=this.messages.result[i].R
                    this.datatk.push(obj)
                  }
                })
              }
            }
            //简答题
            this.datajd=[];
            if(this.messages.type.key=='2290018013252871056'){
              let that = this
              for(let i=0;i<this.messages.result.length;i++){
                let obj ={}
                Object.keys(that.messages.result[i]).forEach(item=>{
                  if(item!='R'){
                    obj.dxtxt=that.messages.result[i][item]
                    // obj.dxradio=this.messages.result[i].R
                    this.datajd.push(obj)
                  }
                })
              }
            }

          }).finally(() => {
            this.loading=false;

          });
        }
      },
      //取消
      cancel() {
        this.visible = false;
        this.messages={
          id:'',
          repoId:'',//题库id
          // isSort:'',//排序：1，不排序：2
          result:'',//问题答案
          resultAnalysis:'',//答案解析
          title:'',//题目名称
          type:{
            data:'',
            key:''
          },
          name:'',//题库名称
          repoId:'',//题库id
          orgId:'',//组织
        }
        this.pdresult='';
        this.data=[{//单选题
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        }];
        this.datadx=[{//多选题
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        },{
          dxradio:'',
          dxtxt:''
        }];
        this.datatk=[{//填空
          dxtxt:''
        },{
          dxtxt:''
        }];
        this.datajd=[{//简答
          dxtxt:''
        },{
          dxtxt:''
        }]
      },
      //保存
      saveBtn(){
        this.$refs['ruleForm'].validate(valid => { // 表单验证
          if (!valid) {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            return // 表单必填项判断
          }
          //判断题
          if(this.messages.type.key=='2290018013252871050'){
            if(typeof(this.pdresult) == "string"){
              if(this.pdresult =='' || this.pdresult==undefined || this.pdresult==null || this.pdresult=='null'){
                this.$message.warning('请选择判断题答案')
                return
              }
            }
          }
          //单选题
          if(this.messages.type.key=='2290018013252871042'){
            if(!this.dxradio && (typeof  this.dxradio != 'number')){
              this.$message.warning('请选择单选题选项')
              return
            }
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].dxtxt =='' || this.data[i].dxtxt ==undefined || this.data[i].dxtxt ==null || this.data[i].dxtxt =='null'){
                this.$message.warning('请填写单选题选项内容')
                return
              }
            }
          }

          //多选题
          if(this.messages.type.key=='2290018013252871045'){
            let flag = false
            for(let i=0;i<this.datadx.length;i++){
              if(this.datadx[i].dxradio =='' || this.datadx[i].dxradio ==undefined || this.datadx[i].dxradio ==null || this.datadx[i].dxradio =='null'){
                // this.$message.warning('请选择多选题选项')
                // return
              }else{
                flag = true
              }
              if(this.datadx[i].dxtxt =='' || this.datadx[i].dxtxt ==undefined || this.datadx[i].dxtxt ==null || this.datadx[i].dxtxt =='null'){
                this.$message.warning('请填写多选题选项内容')
                return
              }
            }
            if(!flag){
              this.$message.warning('请选择多选题选项')
              return
            }
          }
          //填空题
          if(this.messages.type.key=='2309718804909785285' || this.messages.type.key=='2290018013252871053'){
            for(let i=0;i<this.datatk.length;i++){
              if(this.datatk[i].dxtxt =='' || this.datatk[i].dxtxt ==undefined || this.datatk[i].dxtxt ==null || this.datatk[i].dxtxt =='null'){
                this.$message.warning('请填写填空题关键词')
                return
              }
            }

          }
          //简答题
          if(this.messages.type.key=='2290018013252871056'){
            for(let i=0;i<this.datajd.length;i++){
              if(this.datajd[i].dxtxt =='' || this.datajd[i].dxtxt ==undefined || this.datajd[i].dxtxt ==null || this.datajd[i].dxtxt =='null'){
                this.$message.warning('请填写简答题关键词')
                return
              }
            }

          }



          this.messages.result=[];
          //判断题
          if(this.messages.type.key=='2290018013252871050'){
            let paramsdata={};
            paramsdata.A = this.pdresult
            this.messages.result.push(paramsdata)
          }
          //单选题
          if(this.messages.type.key=='2290018013252871042'){
            for(let i=0;i<this.data.length;i++){
              if(!this.dxradio && (typeof  this.dxradio != 'number')){
                this.data[i].dxradio="1"
              }else{
                this.data[i].dxradio="1"
                this.data[this.dxradio].dxradio="0"
              }

              let num = this.getselect(i).toString();
              let paramsdata={}
              paramsdata[num] = this.data[i].dxtxt
              paramsdata.R = this.data[i].dxradio
              this.messages.result.push(paramsdata)
            }
          }
          //多选题
          if(this.messages.type.key=='2290018013252871045'){
            for(let i=0;i<this.datadx.length;i++){
              if(this.datadx[i].dxradio=='' || this.datadx[i].dxradio==undefined || this.datadx[i].dxradio==null || this.datadx[i].dxradio=='null'){
                this.datadx[i].dxradio="1"
              }else if(this.datadx[i].dxradio==true){
                this.datadx[i].dxradio='0'
              }
              let num = this.getselect(i).toString();
              let paramsdata={}
              paramsdata[num] = this.datadx[i].dxtxt
              paramsdata.R = this.datadx[i].dxradio
              this.messages.result.push(paramsdata)
            }
          }
          //填空题
          if(this.messages.type.key=='2309718804909785285' || this.messages.type.key=='2290018013252871053'){
            for(let i=0;i<this.datatk.length;i++){
              let num = this.getselect(i).toString();
              let paramsdata={}
              paramsdata[num] = this.datatk[i].dxtxt
              this.messages.result.push(paramsdata)
            }
          }
          //简答题
          if(this.messages.type.key=='2290018013252871056'){
            for(let i=0;i<this.datajd.length;i++){
              let num = this.getselect(i).toString();
              let paramsdata={}
              paramsdata[num] = this.datajd[i].dxtxt
              this.messages.result.push(paramsdata)
            }
          }

          this.messages.result= JSON.stringify(this.messages.result);
          delete this.messages.name;

          if(this.isEdit==1){
            delete this.messages.id;
            getQuestonAdd(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel();
              this.$emit('refresh',1);
            }).finally(() => {

            });

          }else if(this.isEdit==2){

            getQuestonEdit(this.messages).then(response => {
              const res = response;
              this.$message(this.successTip());
              this.cancel();
              this.$emit('refresh');
            }).finally(() => {

            });

          }
        })

      },

    },
  }
</script>

<style scoped>
  .text-center1{
    text-align:center;
  }
  .bc-heard /deep/ .el-dialog__header {
    background: #f3f3f3!important;
    padding:12px 20px!important;
  }
  /*答案关键词*/
  .keyContent{
    border-top:1px solid #ccc;
    padding-top:10px;
  }
  .keyspan{
    display:block;
    font-size: 14px;
    line-height: 20px;
    color: #888888;
    white-space:pre-wrap;
    word-break:break-all;
  }
  .keyspan i{
    font-style: normal;
    color:#ED3C3C;
  }
  .keylist{
    display:flex;
    justify-content: flex-start;
    align-items:center;
    margin-top:20px;
  }
  .keyindex{
    font-size: 14px;
    color: #333333;
    padding-right:8px;
  }
  .keylist .txt{
    font-size: 24px;
    margin-left:5px;
  }
  .keyadd{
    color: #3D9EFF;
  }
  .keyreduce{
    color: #ED3C3C;
  }
  .keylist /deep/ .el-radio{
    margin-right:20px;
  }
  .keylist /deep/ .el-checkbox{
    margin-right:20px;
  }
  .keyCol /deep/ .el-form-item__content{
    margin-top:20px;
  }
  .keylist /deep/ .el-input--suffix .el-input__inner {
    width:295px;
  }
  .keylist1 /deep/ .el-input--suffix .el-input__inner {
    width:385px;
  }

</style>
