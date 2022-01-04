<template>
  <el-dialog
  class="bc-heard"
  :title="title"
  :visible.sync="visible"
  width = '520px'
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
    <el-form :model="messages" :rules="node" ref="ruleForm" label-width="100px">
      <el-form-item class="is-required" label="迁入组织" prop="">
        <!--<el-input placeholder="请输入" disabled v-model="orgName"></el-input>-->
        <text-tooltip
          :content="orgName"
          class="wid190"
          refName="name"
        />
      </el-form-item>
      <el-form-item class="is-required" label="迁入党员" prop="" style="    margin-bottom: 0px">
        <el-button class="js-button" @click="addPerson()">+ 添加人员</el-button>
      </el-form-item>
      <!--展示添加人员-->
      <div class="show-person">
        <el-collapse v-model="activeNames" @change="handleChange">
          <!--<el-collapse-item :title="item.data" :name="index" v-for="(item,index) in orgs">-->
          <el-collapse-item :name="index" v-for="(item,index) in orgs">
            <template slot="title">
              <div class="title-hidden">{{item.data}}</div>
            </template>

            <ul class="name-ul">
              <li v-for="(ite,inde) in personList" v-if="ite.orgId.key === item.key">
                <span>{{ite.name}}</span>
                <img src="@/assets/page/icon-close.png" @click="delet(ite,(index+1))">
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>

      <el-col :span="24" class="tac">
        <el-button  @click="close">取消</el-button>
        <el-button type="primary" @click="getMigration">确定</el-button>
      </el-col>
    </el-form>
    <!--添加人员-->
    <choose-org-person ref="refAddperson" @refresh="selectPerson"/>

  </el-dialog>

</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import ChooseOrgPerson from '@/components/individual/choose-org-person/index'
    import { getPartyMigration } from "@/api/backstage/party/basic/party/party.js";

    export default{
      name:'index',
      components:{
        ChooseOrgPerson
      },
      data(){
        return{
          // 模态
          visible: false,
          title:'批量迁移党员',
          node: {},// 必填项判断
          orgName:'',//上级党的组织
          orgId:'',//上级党组织id
          activeNames: ['1'],
          personList:[],//选中的人员
          orgs:[],//所选人员所属组织
          personIds:[],//所选人员id
          messages:{}
        }
      },
      methods:{
        // t:  9-党员迁移
        show (t, row) {
          // t===9
          this.personList = []//选中的人员
          this.orgs = []//所选人员所属组织
          this.personIds = []//所选人员id
          this.visible = true
          this.orgName = row.name
          this.orgId = row.id
        },
        //打开添加人员
        addPerson(){
          this.$refs['refAddperson'].show(JSON.stringify(this.orgs),JSON.stringify(this.personList),JSON.stringify(this.personIds))
        },
        //展示添加人员
        handleChange(val) {
        },
        //确定
        getMigration(){
          if(this.personIds.length == 0){
            this.$message({
              showClose: true,
              message: '请先选择迁入党员！',
              type: 'error'
            })
            return false;
          }

          let params = {
            membeids:this.personIds,
            memberMoveOrgId:this.orgId
          }
          getPartyMigration(params).then(response => {
            this.$emit('refresh')
            this.$message(this.successTip())
            this.close();
          })
        },
        //选择的人员
        selectPerson(valOrg,val,ids){
          this.orgs = JSON.parse(valOrg);
          this.personList = JSON.parse(val)
          this.personIds = JSON.parse(ids)
        },
        //删除
        delet(val,inde){
          let perNum = 0
          for(let i = 0;i < this.personList.length; i++){
            if(val.id === this.personList[i].id){ // 对象里的唯一标识id
              this.personList.splice(i,1);
            }
            if(this.personList[i]){
              if(this.personList[i].orgId.key === val.orgId.key){
                perNum ++
              }
            }
          }
          this.personIds.forEach((item,index)=>{
            if(val.id ===item){ // 对象里的唯一标识id
              this.personIds.splice(index,1);
            }
          })

          if(perNum === 0){
            this.orgs.forEach((item,index)=>{
              if(val.orgId.key === item.key){ // 对象里的唯一标识id
                this.orgs.splice(index,1);
              }
            })
          }
        },
        //取消
        close(){
          this.visible = false
          this.orgName = ''//上级党的组织
          this.orgId = ''//上级党组织id
          this.personList = []//选中的人员
          this.personIds = []
          this.orgs = []//所选人员所属组织
          this.$refs.refAddperson.clear();
        }

      }
    }
</script>

<style scoped>
  .title-hidden {
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
