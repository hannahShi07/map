<template>
  <el-dialog
    class="bc-heard"
    :title="title"
    v-if="visible"
    :visible.sync="visible"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width = '1145px'
    @close="close"

  >
    <el-form ref="ruleForm" label-width="100px" v-loading="loading">
      <div class="personContainer">
        <div class="contentLeft">
          <el-form-item label="待选人员" prop="personSelect">
            <el-select
              v-model="personSelect"
              filterable
              placeholder="请选择"
              style="width: 151px;margin-right: 20px;"
              clearable>
              <el-option
                v-for="item in personSelectlist"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-input class="inputSearch" placeholder="请输入人员姓名/手机号检索" clearable v-model="info" style="width: 340px;"  @keyup.enter.native="selectPersons"></el-input>
            <el-button class="buttonSearch el-icon-search" type="primary" @click="selectPersons">查询</el-button>
          </el-form-item>
          <div class="center">
            <div class="centerTree">
              <span class="titleSpan">请选择组织</span>
              <div class="treeDiv mytree">
                <!-- <base-page-tree @handleTreeClick="handleTreeClick"/> -->
                <el-tree
                  :expand-on-click-node="false"
                  :data="treeList"
                  :props="defaultProps"
                  :indent="0"
                  default-expand-all
                  highlight-current
                  @node-click="handleNodeClick1">
                  <div slot-scope="{ node, data }" class="slot-tree-node">
                    <img v-if="node.childNodes.length == 0" src="@/assets/page/icon-file.png" class="treeimg" alt="">
                    <span style="white-space: pre-wrap;word-break: break-all;">{{ node.label }}</span>
                  </div>
                </el-tree>
              </div>
            </div>
            <div class="centerRight">
              <div class="titleTop">
                <span class="titleSpan">请选择人员</span>
              </div>
              <div class="treeDiv1">
                <el-checkbox-group v-model="listId" v-if="personList.length">
                  <el-checkbox v-for="(items,index) in personList" :label="items.id" :key="items.id" @change="handleRoleCheckedChange(items,$event)">
                    <span class="text">{{items.name}}</span>
                    <span class="text">{{items.phone}}</span>
                  </el-checkbox>
                </el-checkbox-group>
                <div v-else>
                  <img style="margin:40px;" width="160px" src="@/assets/page/icon-empty.png" alt="">
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="contentRight">
          <div class="rightList">
            <span class="titleSpan">请选择人员</span>
            <div class="treeDiv1 treeDiv2">
              <ul class="rightUl">
                <li v-for="item in listLi">
                  <span class="text">{{item.name}}</span>
                  <span class="text">{{item.phone}}</span>
                  <i class="el-icon-error" @click="delet(item)"></i>
                </li>
              </ul>
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

    },
    data(){
      return{
        // 模态
        visible: false,
        title:'添加人员',
        loading:true,//加载遮罩
        personList:[],//待选人员列表
        listId:[],//已选人员id
        listLi:[],//已选中人员集合
        treeList: [],//左侧组织树
        info:'',//人员姓名或手机号
        orgId:'',//党组织id
        orgs:[],//所选人员的组织

        personSelect:'',
        personSelectlist:[
          {
            "id":"1248616691630342144",
            "createTime":"2020-04-10 22:19:52",
            "createUser":"1245953428400635904",
            "updateTime":"2020-04-12 15:19:22",
            "updateUser":"1245953428400635904",
            "name":"预备党员",
            "type":"MENBER_MTYP",
            "typeId":"1248615801867468800",
            "status":true,
            "sort":"5"
          },
          {
            "id":"1248616761813630976",
            "createTime":"2020-04-10 22:20:09",
            "createUser":"1245953428400635904",
            "updateTime":"2020-04-12 15:19:08",
            "updateUser":"1245953428400635904",
            "name":"正式党员",
            "type":"MENBER_MTYP",
            "typeId":"1248615801867468800",
            "status":true,
            "sort":"6"
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        isString: false,// show方法接收的值是否为string类型

      }
    },
    mounted(){
      this.getTree()
    },
    methods:{
      // 调用数据接口
      getTree(){
        let params = {
          name:this.filterText
        }
        this.loading = true;
        getPartyTree(params).then(response => {
          const res = response;
          this.treeList=res;

        }).finally(() => {
          this.loading = false;
        });
      },
      //打开添加人员
      show (orgs,listLi,listId) {
        console.log('orgs: '+JSON.stringify(orgs))
        console.log('listLi: '+JSON.stringify(listLi))
        console.log('listId: '+JSON.stringify(listId))
        if((typeof listId) === 'string'){
          this.isString  = true
          this.orgs = JSON.parse(orgs)
          this.listLi = JSON.parse(listLi)
          this.listId = JSON.parse(listId)
        }else{
          this.isString  = false
          this.orgs = orgs
          this.listLi = listLi
          this.listId = listId
        }
        this.visible = true
      },
      //组织树点击事件
      handleNodeClick1(data,indeterminate){
        this.orgId = data.id
        this.selectPersons()
      },
      //查询待选人员
      selectPersons(){
        let params = {
          info:this.info,
          orgId:{
            key:this.orgId
          },
          type:{
            key:this.personSelect
          }
        }
        getPartyMemberList(params).then(response => {
          const res = response;
          this.personList=res;
        })
      },
      //选中待选人员事件
      handleRoleCheckedChange(value,val){
        if(val){//选中
          this.listLi.push(value)
          if(this.orgs.length === 0){
            let jsonData = {
              data:value.orgId.data,
              key:value.orgId.key
            }
            this.orgs.push(jsonData);
          }else{
            let flag = true;
            this.orgs.forEach(item=>{
              if(value.orgId.key ===item.key){ // 对象里的唯一标识id
                flag = false;
              }
            })
            if(flag){
              let jsonData = {
                data:value.orgId.data,
                key:value.orgId.key
              }
              this.orgs.push(jsonData);
            }
          }
        }else{//取消选中
          this.orgs.forEach((item ,index) =>{
            if(value.orgId.key ===item.key){ // 对象里的唯一标识id
              this.orgs.splice(index,1)
            }
          })

          this.listLi.forEach((item ,index) =>{
            if(value.id ===item.id){ // 对象里的唯一标识id
              this.listLi.splice(index,1)
            }
          })
        }
      },
      delet(val){
        let index = this.listLi.indexOf(val);
        let ind = this.listId.indexOf(val.id)
        this.listLi.splice(index,1)
        this.listId.splice(ind,1)
      },
      //确定
      save(){
        let arr = this.listLi.map(item=>item.orgId.key)
        this.orgs = this.orgs.filter(item=>arr.includes(item.key))

        if(this.isString){
          this.$emit('refresh',JSON.stringify(this.orgs),JSON.stringify(this.listLi),JSON.stringify(this.listId))
        }else{
          this.$emit('refresh',this.orgs,this.listLi,this.listId)
        }
        this.visible = false
        this.clear()
      },
      //关闭
      close(){
        this.visible = false
        this.clear()
        this.$emit('refresh',this.orgs,this.listLi,this.listId)
      },
      //数据清空
      clear(){
        this.personList = []//待选人员列表
        this.listLi = []//已选中人员
        this.listId = []
        this.info = ''//人员姓名或手机号
        this.orgId = ''//党组织id
        this.orgs = []//所选人员的组织
      }

    }
  }
</script>

<style scoped lang='scss'>
  .centerTree {
    width: calc(100% - 245px);
    max-height: 450px;
    overflow-y: scroll;
    padding-right: 10px;
    border-right: 8px solid #F3F3F3;
  }
  .treeDiv1 {
    height: 417px;
    width: 245px;
    overflow: initial;
  }

  .centerRight {
    padding: 0 20px;
    padding-right: 10px;
    max-height: 450px;
    overflow-y: scroll;
    width: 290px;
  }
  .contentLeft {
    border-right: 0;
    width: calc(100% - 275px);
  }

  .contentRight {
    width: 282px;
    padding-left: 25px;
    max-height: 512px;
    overflow-y: scroll;
  }

.mytree /deep/{
     .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content {
      .treeimg{
        display: none;
      }
    }
    .el-tree >  .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__children{
      .treeimg{
        display: inline-block;
      }
    }
    .el-tree-node {
      position: relative;
      padding-left: 16px;


      .el-tree-node__content{
        margin-top:20px;
        // height: inherit;
      }
    }

    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf{
      display: none;
    }
    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree > .el-tree-node:before {
      border-left: none;
    }

    .el-tree > .el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px dashed #C0C4CC;
      bottom: 0px;
      // height: 100%;
      top: -26px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px dashed #C0C4CC;
      height: 20px;
      top: 12px;
      width: 24px;
    }

    .el-tree-node__expand-icon {
      position: relative;
      left: 5px;
      top: 0px;
      font-size: 0px;
      width: 14px;
      height: 14px;
      background: url('~@/assets/page/icon-plus.png') no-repeat 100% 100%;
      margin-right: 10px;

      &.is-leaf {
        margin-right: 0;
        width: 0;
        height: 0;
        background: none;
      }

      &.expanded {
        transform: none;
        background: url('~@/assets/page/icon-sub.png') no-repeat 100% 100%;
      }
    }
}
</style>
