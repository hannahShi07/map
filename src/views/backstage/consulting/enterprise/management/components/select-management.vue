<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    :visible.sync="visible"
    width = '1130px'
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="ruleForm" label-width="100px" v-loading="loading">
      <div class="personContainer">
        <div class="contentLeft">
          <el-form-item label="组织名称" prop="personSelect">
            <el-input class="inputSearch" placeholder="请输入组织名称" clearable v-model="orgName" style="width: 340px;"></el-input>
            <el-button class="buttonSearch el-icon-search" type="primary" @click="getTree">查询</el-button>
          </el-form-item>
          <div class="center">
            <span class="titleSpan">请选择组织</span>
            <div class="treeDiv">
                <!-- <base-page-tree @handleTreeClick="handleTreeClick"/> -->
                <el-tree
                  v-if="visible"
                  ref='orgTree'
                  :check-on-click-node='true'
                  :expand-on-click-node="false"
                  :data="treeList"
                  :props="defaultProps"
                  :default-checked-keys='orgIds'
                  :check-strictly = 'checkParent'
                  default-expand-all
                  highlight-current
                  show-checkbox
                  node-key="id"
                  @check='currChange'>
                </el-tree>
            </div>
          </div>
        </div>
      </div>

      <el-col :span="24" class="tac">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </el-col>
    </el-form>

  </el-dialog>

</template>

<script>
  import '@/styles/party-common.scss' //  内容公告样式 css
  import { getPartyTree, getPartyMemberList } from "@/api/backstage/party/basic/party/party.js";
  export default{
    name:'index',
    components:{
    },
    props:{
      title:String,
      checkParent:{
        type:Boolean,
        default:false
      },
        getChild:{
          type:Boolean,
            default:true,
        }
    },
    data(){
      return{
        // 模态
        visible: false,
        // title:'添加人员',
        loading:true,//加载遮罩
        orgIds:[],//默认勾选的节点的 key 的数组,数据回显使用
        treeList: [],//左侧组织树
        info:'',//人员姓名或手机号
        orgId:'',//党组织id
        orgs:[],//所选人员的组织
        orgName:'',
        personSelect:'',
        checkedOrg:[
        ],//已选中企业列表
        defaultProps: {
          children: 'children',
          label: 'label'
        },


      }
    },
    mounted(){
      this.getTree()
    },
    methods: {
      // 调用数据接口
      getTree(){
        let params = {
          name:this.orgName
        }
        this.loading = true;
        getPartyTree(params).then(response => {
          const res = response;
          this.treeList=res;

        }).finally(() => {
          this.loading = false;
        });
      },
      //打开
      show (checkedOrgs) {  //checkedOrg：数据回显 格式为[{name:'xxxx',id:'xxx'}...]
        this.orgIds=[]
        if(checkedOrgs){
          this.checkedOrg = checkedOrgs
          checkedOrgs.forEach(item=>{
            this.orgIds.push(item.id)
          })
        }
        this.visible = true
      },
      //复选框点击事件
      currChange(curr,allObj){
        let arr = this.$refs.orgTree.getCheckedNodes(this.getChild);
        this.checkedOrg = []
        arr.forEach(item=>{
          let obj = {
            id:item.id,
            name:item.name
          }
          this.checkedOrg.push(obj)
        })
      },
      //删除已选组织
      delOrg(index,id){
        this.checkedOrg.splice(index,1)
        this.$refs.orgTree.setChecked(id,false)
      },

      //确定
      save(){
        this.$emit('refresh',JSON.stringify(this.checkedOrg))
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
  width: 560px;
    padding-right: 10px;
}
.contentRight {
  width: 528px;
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
</style>
