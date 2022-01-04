<template>
  <el-dialog
    class="bc-heard"
    title="题目选择"
    :visible.sync="visible"
    width = '1130px'
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="ruleForm" label-width="100px" v-loading="loading">
      <div class="personContainer">
        <div class="contentLeft">
          <el-form-item label="待选题目" prop="titleState">
            <el-col :span='8'>
              <el-select v-model="titleState" class="wp-100" placeholder="请选择题库" @change="getChange" clearable="">
                <el-option v-for="item in stateList" :key="item.id" :label="item.title" :value="item.id"/>
              </el-select>
            </el-col>
            <el-col :span='8'>
              <el-select v-model="titleType" class="wp-100" placeholder="请选择题目类型" @change="getChange" clearable="">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"/>
              </el-select>
            </el-col>
            <el-col :span='8'>
              <el-input placeholder="请输入题目名称" clearable @keyup.enter.native="getChange" @clear='getChange' v-model="titleName"></el-input>
            </el-col>

            <el-button class="buttonSearch el-icon-search" type="primary" @click="getChange">查询</el-button>
          </el-form-item>
          <div class="center">
            <div style="padding: 0 10px;" v-cloak>
              <template v-if="tableData.length">
                <el-checkbox style="display: block;padding: 15px 0 15px 20px;background: #F3F3F3;" v-model="checkAll"
                            @change="handleCheckAllChange">
                  <span style="padding-left: 10px;">全选</span>
                </el-checkbox>

                <el-checkbox-group v-model="selectedIds" style="padding-left: 20px;">
                  <el-checkbox style="display: block;padding: 15px 0; border-bottom: 1px solid #E8E8E8;"
                              v-for="item in tableData" :label="item.id" @change="handleCheckChange($event, item)">
                    <span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding-left: 10px;">{{item.title}}</span>
                  </el-checkbox>
                </el-checkbox-group>
              </template>
              <base-table-empty v-else/>

              <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize"
                              @pageChange="getTitle"/>
            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="rightList">
            <div class="titleTop">
                <p class="titleSpan" style="color:#333;">已选题目 <span>{{checkedTitle.length}}</span> 个</p>
              </div>
              <div class="treeDiv1">
                <div class="orgList" v-for='(item,index) in checkedTitle' :key="item.id">
                  <el-tooltip class="item" :disabled='showTip(item.title)' effect="dark" :content="item.title" placement="top">
                    <p>【{{item.type.data?item.type.data:showType(item.type.key)}}】&nbsp;&nbsp;&nbsp;{{item.title}}</p>
                  </el-tooltip>
                  <img src="@/assets/page/icon-close2.png" width="19px" @click="delOrg(index,item)" alt="">
                </div>
              </div>
          </div>
        </div>
      </div>

      <!-- <el-col :span="24" class="tac">

      </el-col> -->
    </el-form>
    <div slot="footer" style="text-align: center" class="tac">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
   import commonReq from '@/api/public/commonReq'
  import {getQuestionList} from "@/api/backstage/education/questionbank/questionbank";
  import { getDetaillist } from "@/api/backstage/education/exam";
  export default{
    name:'index',
    components:{
    },
    props:{

    },
    data(){
      return{
        // 模态
        visible: false,
        // title:'添加人员',
        loading:false,//加载遮罩
        titleState:'',//题库
        titleType:'',//题目类型
        stateList:[],//题库数据列表
        typeList:[],//类型数据列表
        titleName:'',//题目名称
        checkedTitle:[
        ],//已选题目列表
        total:0,//题目总数
        pageNum:1,//分页
        pageSize:10,//分页条数
        tableData:[],//题目数据列表
        checkAll: false,
        selectedIds:[],
        oldData : [],//原始数据，用于用户取消操作还原数据
      }
    },
    mounted(){
      this.getChange();
      this.getTitle();
      this.getTitleState()
      this.getCondition();
    },
    watch: {
      selectedIds (nVal) {
        console.log('XXXX',nVal)
        if (nVal.length >= this.tableData.length) {
          this.checkAll = this.tableData.map(item => item.id).every(item => nVal.includes(item))
        } else {
          this.checkAll = false
        }
      }
    },
    computed:{
      showTip(){
        return function(txt){
          let length =txt.length
          return length < 22
        }
      }
    },
    methods:{
      // 去重
      uniqueArrObject (arr = []) {
        let result = []
        let obj = {}
        arr.forEach(item => {
          if (!obj[item.id]) {
            result.push(item)
            obj[item.id] = true
          }
        })
        return Array.from(result)
      },
      //字典表数据
      getCondition () {
        commonReq.getHistoryDict({types: ['learn_quest',]}).then(res => {
          this.typeList = res.learn_quest
        })
      },
      //获取题库
      getTitleState(){
        getQuestionList({model:{status:0},current:1,size:1000}).then(res=>{
          // console.log(res)
          this.stateList = res.records
        })
      },
      //题目筛选
      getChange(){
        this.pageNum = 1
        this.getTitle()
      },
      // 调用数据接口
      getTitle(){
        let params = {
          model:{
            questTitle:this.titleName,
            repoId:this.titleState,
            type:{key:this.titleType}
          },
          current:this.pageNum,
          size:this.pageSize
        }
        this.loading = true;
        getDetaillist(params).then(response => {
          const res = response;
          // this.treeList=res;
          // console.log(res)
          this.total = res.total;
          this.tableData = res.records;
          // console.log(this.checkedTitle)
          this.$nextTick(() => {
            if (this.selectedIds.length >= this.tableData.length) {
              this.checkAll = this.tableData.map(item => item.id).every(item => this.selectedIds.includes(item))
            } else {
              this.checkAll = false
            }
          })
        }).finally(() => {
          this.loading = false;
        });
      },

      //打开
      show (checkedTitles) {  //checkedTitle：数据回显 格式为[{name:'xxxx',id:'xxx'}...]
      // console.log(checkedTitles)
        this.selectedIds = []
        if(checkedTitles.length){
          this.checkedTitle = JSON.parse(JSON.stringify(checkedTitles))
          this.oldData = JSON.parse(JSON.stringify(checkedTitles))
          checkedTitles.forEach(item=>{
            this.selectedIds.push(item.id)
          })
        }
        this.visible = true
        this.getTitle()
      },
      showType(key){
        switch(key){
          case '2290018013252871042':
            return '单选'
            break
          case '2290018013252871045':
            return '多选'
            break
          case '2290018013252871050':
            return '判断题'
            break
          case '2290018013252871056':
            return '简答'
            break
          case '2309718804909785285':
            return '填空A类（无顺序）'
            break
          case '2290018013252871053':
            return '填空B类（有顺序）'
            break
        }
      },
      //复选框点击事件
      handleCheckAllChange (val) {
        if (val) {
          this.selectedIds.push(...this.tableData.map(item2 => item2.id))
          this.selectedIds = Array.from(new Set(this.selectedIds))

          this.checkedTitle.push(...this.tableData.map(item => item))
          this.checkedTitle = this.uniqueArrObject(this.checkedTitle)
        } else {
          this.selectedIds = this.selectedIds.filter(item => !this.tableData.map(item2 => item2.id).includes(item))

          this.checkedTitle = this.checkedTitle.filter(item => !this.tableData.map(item2 => item2.id).includes(item.id))
        }
      },
      handleCheckChange (val, row) {
        let rightIndex = this.checkedTitle.findIndex(item => row.id === item.id)
        if (val) {
          if (rightIndex === -1) {
            this.checkedTitle.push({...this.tableData.find(item => item.id === row.id), requiredRead: false})
          }
        } else {
          if (rightIndex !== -1) {
            this.checkedTitle.splice(rightIndex, 1)
          }
        }
      },
      //删除已选组织
      delOrg(index,row){
        this.checkedTitle.splice(index, 1)
        console.log(this.selectedIds.findIndex(item => item === row.id))
        this.selectedIds.splice(this.selectedIds.findIndex(item => item === row.id), 1)
        console.log(this.selectedIds)
        // this.$emit('refresh',this.checkedTitle)
      },

      //确定
      save(){
        this.$emit('refresh',this.checkedTitle)
        this.close()
      },
      cancel(){
        this.$emit('refresh',this.oldData)
        this.checkedTitle  = JSON.parse(JSON.stringify(this.oldData))
        this.close()
      },
      //关闭
      close(){
        this.visible = false
      },
      //数据清空
      clear(){
        this.orgName = ''
      }

    }
  }
</script>

<style scoped lang='scss'>
.contentLeft {
  width: 675px;
    padding-right: 10px;
}
.contentRight {
  width: 405px;
  padding-left: 20px;
  .treeDiv1{
    width:100%;
    .orgList{
      font-size:14px;
      color:#666;
      line-height: 25px;
      height: 25px;
      margin-bottom:10px;
      p{
        // margin-bottom: 10px;
        margin: 0;
        width: calc(100% - 20px);
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img{
        float: right;
        margin-top: 3px;
      }
    }
  }
}
.centerTree{
  padding-right: 0;
  border:0;
}
.titleSpan{
  color:#555;
  font-size: 16px;
  font-weight: 600;
  font-family: MicrosoftYaHei-Bold;
  span{
    color:#FC8F21;
  }
}
div.center{
  display: block;
  .treeDiv{
    width: unset;
  }
}

/deep/.el-checkbox{
  display: flex !important;
  align-items: center;
  .el-checkbox__label{
    span {
      white-space: pre-wrap !important;
      word-break: break-all;
      padding-left: 0 !important;
    }
  }
}
</style>
