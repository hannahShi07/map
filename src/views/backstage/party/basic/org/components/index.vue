<template>
  <div class="history">
    <!-- 条件盒子 -->
    <div class="page-search-box">
      <!--<base-label-box label="发起组织">
        <el-input v-model="orgId.data" placeholder="请输入组织名称" style="width: 280px" clearable @keyup.enter.native="editBtn(6)"/>
      </base-label-box>-->
      <base-label-box label="党员信息">
        <el-input v-model="info" placeholder="请输入姓名/身份证号码/手机号" style="width: 280px" clearable @keyup.enter.native="editBtn(6)"/>
      </base-label-box>
      <base-label-box label="状态">
        <el-select
        v-model="transferState.key"
        value-key="id"
        filterable
        placeholder="请选择"
        @change="selectstate"
        style="width: 280px"
        clearable>
          <el-option
              v-for="(item, index) in dicts.audit_state"
              :key="index"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
      <base-label-box label="原组织">
        <el-input v-model="orgIdWrite" placeholder="请输入原组织" style="width: 280px" clearable @keyup.enter.native="editBtn(6)"/>
      </base-label-box>
      <base-label-box label="接收组织">
        <el-input v-model="acceptOrg.data" placeholder="请输入接收组织" style="width: 280px" clearable @keyup.enter.native="editBtn(6)"/>
      </base-label-box>
      <base-label-box label="接转类型">
        <el-select
        v-model="type.key"
        value-key="id"
        filterable
        placeholder="请选择"
        @change="selecttype"
        style="width: 280px"
        clearable>
          <el-option
              v-for="(item, index) in dicts.transfer_type"
              :key="index"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </base-label-box>
    </div>

    <!-- 按钮区 -->
    <div class="pd-20 clearfix">
      <div class="fl">
        <base-page-button v-if="currentOrg.code == '1001'" title="组织关系转入" type="primary" imgType="flow" @click="editBtn(4)"/>
        <base-page-button title="组织关系转出" imgType="outflow" @click="editBtn(5)"/>
      </div>

      <div class="fr">
        <base-page-button title="查询" imgType="search" type="primary" @click="editBtn(6)"/>
        <base-page-button title="重置" imgType="reset" @click="editBtn(7)"/>
      </div>
    </div>

    <div class="mr-20 ml-20" v-cloak>
      <el-table v-loading="loading" class="table" :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
        <el-table-column type="index" label="序号" width="60" align="center"/>
        <el-table-column label="姓名" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index].memberId.data,'name')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index].memberId.data,'phone')}}</span>
            </template>
          </el-table-column>
        <el-table-column label="人员类型" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index].memberId.data,'type')}}</span>
            </template>
          </el-table-column>
        <el-table-column label="申请接转时间" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>
        <el-table-column label="发起组织" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'orgId.data')}}</span>
            </template>
          </el-table-column>
        <el-table-column label="接收组织" align="left" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{isEmpty(tableData[scope.$index],scope.row.type.key === '1303258629775818752' ? 'acceptOrgWrite' : 'acceptOrg.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="转接类型" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
            </template>
        </el-table-column>
        <el-table-column label="转接状态" width="120" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
              <span>{{isEmpty(tableData[scope.$index],'transferState.data')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="{row}">
            <base-table-a @click="editBtn(1, row)">详情</base-table-a>
            <base-table-a type="audit" :class="{'color-grad': setAuditPermission(row)}" @click="editBtn(2, row)">审核</base-table-a>
            <base-table-a type="backout2" :class="{'color-grad': row.transferState.key !== '1303517778761744384' || row.createOrgId !== currentOrg.key}"  @click="editBtn(3, row)">撤销</base-table-a>
          </template>
        </el-table-column>

        <!-- 空数据样式 -->
        <base-table-empty slot="empty"/>
      </el-table>

      <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
    </div>

    <!-- 组织关系转入 -->
    <org-in-dialog ref="refIn" @refresh="pageChange"/>
    <!-- 组织关系转出 -->
    <org-out-dialog ref="refOut" @refresh="pageChange"/>
  </div>
</template>

<script>
  import db from '@/utils/localstorage'
  import OrgInDialog from './org-in-dialog'
  import OrgOutDialog from './org-out-dialog'
  import commonReq  from "@/api/public/commonReq.js"
  import {getOrgPage,getOrgDetele,getUserinformation} from "@/api/backstage/party/basic/org/org.js"
  // import {getHistoryPersonByPage} from "@/api/backstage/party/basic/history/history.js";

  export default {
    components: {OrgInDialog, OrgOutDialog},
    props: {
      pageCurrent: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        pageNum: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        dicts: {//字典
          audit_state:{},//状态
          transfer_type:{},//转接类型
        },
        transferState:{//状态
          data:'',
          key:''
        },
        type:{//转接类型
          data:'',
          key:''
        },
        orgId:{//组织名称
          data:'',
          key:''
        },
        orgIdWrite:'',//原组织
        info:'',//党员信息
        acceptOrg:{//接收组织
          data:'',
          key:''
        },
        isShow:false,
        revoke:{//撤销按钮标识
          data:'撤销',
          key:'1303517961343991808'
        },
        currentOrg:{
          key: '',
          data: '',
          code: ''
        }
      }
    },
    activated(){
      if(this.pageCurrent){
        this.pageNum = this.pageCurrent
      }
      this.getDict();
      this.pageChange();
      this.getUser()
    },
    mounted(){
      this.getDict();
      this.pageChange();
      this.getUser()
    },

    methods: {
      /**
       * 获取当前登陆人信息
       * @Author: dfzhu
       * @Date: 2020/11/23
       */
      getUser(){
          getUserinformation({userId: db.get('USER').id}).then(response => {
              const data = response.data;
              this.currentOrg.data = data.orgName;
              this.currentOrg.key = data.orgId;
              this.currentOrg.code = data.orgCode;
          });
      },
      //调用字典接口
      getDict(){
        let params = {
          types:['audit_state','transfer_type']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.audit_state = res.audit_state;
          this.dicts.transfer_type = res.transfer_type;
        })
      },
      pageChange (num) {
        // 调用数据接口
        if((typeof num) === 'number'){
          this.pageNum = num
        }

        let params = {
          current: this.pageNum,
          model: {
              transferState:this.transferState,
              type:this.type,
              orgId:this.orgId,
              orgIdWrite:this.orgIdWrite,//原组织
              info:this.info,//党员信息
              acceptOrg:this.acceptOrg
          },
          size: this.pageSize
        }

        this.loading = true;
        getOrgPage(params).then(response => {
          const res = response;
          this.tableData=res.records;
          if(this.tableData!='' && this.tableData!=undefined || this.tableData!=null && this.tableData!='null' && this.tableData.length>0){
            for(let i=0;i<this.tableData.length;i++){
              this.tableData[i].createTime=this.tableData[i].createTime.substring(0,10)
            }
          }

          this.total=res.total;

        }).finally(() => {
          this.loading = false;

        });

      },
      selectstate(val){
        this.editBtn(6);
      },
      selecttype(val){
        this.editBtn(6);
      },
      editBtn (t, row) {
        switch (t) {
          case 1:
            this.$emit('handleSwitch', {type:'1',name: 'OrgDetail', params: row, currentOrg: this.currentOrg})
            break

          case 2:
            if(this.setAuditPermission(row)){
                break
            }
            this.$emit('handleSwitch', {type:'2',name: 'OrgDetail', params: row, currentOrg: this.currentOrg})
            break

          case 3:
              if(row.transferState.key !== '1303517778761744384' || row.createOrgId !== this.currentOrg.key){
                  break
              }
              this.$confirm('是否撤销该条信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认
                let params = {
                  id:row.id,
                  transferState:this.revoke
                }
                getOrgDetele(params).then(response => {
                  this.$message.success("撤销成功")
                  const res = response;
                  this.pageChange ();

                }).finally(() => {

                });
            }).catch(() => {

            })
            break

          case 4:
            this.$refs['refIn'].show(t)
            break

          case 5:
            this.$refs['refOut'].show(t)
            break

          case 6://查询
            this.pageNum=1;
            this.pageChange()
            break

          case 7:
            this.transferState.key='';
            this.type.key='';
            this.orgId.data='';
            this.orgIdWrite='',//原组织
            this.info='',//党员信息
            this.acceptOrg.data='';
            this.pageNum=1;
            this.total=0;
            this.pageChange()
            break

        }
      },

      /**
       * 判断审核权限
       * @Author: dfzhu
       * @Date: 2020/11/24
       * 顶级组织编码(管委会):1001  转出园区外:1303258629775818752   待审核:1303517778761744384
       * 园区内接转: 1303258531859791872   园区外转入：1303258822889963520
       */
      setAuditPermission(row){
          // 管委会
          let manageCommitteOpt = row.transferState.key === '1303517778761744384' && row.type.key === '1303258629775818752' && this.currentOrg.code === '1001';
          // 接收组织
          let acceptOrgOpt = row.transferState.key === '1303517778761744384' && (row.type.key === '1303258531859791872' || row.type.key === '1303258822889963520')
              && this.currentOrg.key === row.acceptOrg.key;
          if(manageCommitteOpt || acceptOrgOpt){
              return false;
          }
          return true;
      }

    }
  }
</script>

<style lang="scss" scoped>
.color-grad{
  color:#999
}

</style>
