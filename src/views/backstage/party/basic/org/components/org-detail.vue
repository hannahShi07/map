<template>
  <div class="org-detail" v-cloak v-loading="loading">
    <el-form label-width="">
    <base-card-box header="党员信息">
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              姓名
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'name')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              联系方式
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'phone')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              身份证号
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'idCode')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              性别
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'sex.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              出生日期
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'birthday')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              台湾籍
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'nativesTaiwan.data')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              学历
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'education.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              民族
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'nation.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              籍贯
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'natives')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              党费缴纳年月
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'duesPayEnddate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              人员类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              申请入党时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'applyJoinDate')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="card-row">
        <el-col :span="8"  v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              入党时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'joinDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="24" v-if="!isShow">
          <div class="card-box">
            <div class="card-box-title">
              入党时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'joinDate')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16" v-if="isShow">
          <div class="card-box">
            <div class="card-box-title">
              转正时间
            </div>
            <div class="card-box-content">
              {{isEmpty(list.djMemberPubVO,'positiveDate')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <!-- 根据条件显示 -->
      <!-- <div class="text-center mt-20" v-if="params.transferState.data=='通过'">
        <el-button type="primary" @click="editBtn(3,list)">新增转接</el-button>
      </div> -->
    </base-card-box>

    <!-- 待处理转出 转入 header根据类型变更-->
    <base-card-box header="转接信息" :margin="{top: true}" >
      <el-row class="card-row">
        <el-col :span="8">
          <div class="card-box">
            <div class="card-box-title">
              转接类型
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'type.data')}}
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="card-box">
            <div class="card-box-title">
              转出日期
            </div>
            <div class="card-box-content">
              {{isEmpty(list.memberTransfer,'createTime')}}
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="card-box">
        <div class="card-box-title">
          当前组织
        </div>
        <div class="card-box-content">
          {{isEmpty(list.memberTransfer,'orgId.data')}}
        </div>
      </div>
      <div class="card-box">
        <div class="card-box-title">
          接收组织
        </div>
        <div class="card-box-content"  v-if="list.memberTransfer!='' && list.memberTransfer!=null && list.memberTransfer!=undefined && list.memberTransfer!='null' && list.memberTransfer.type.key == '1303258629775818752'">
          {{isEmpty(list.memberTransfer,'acceptOrgWrite')}}
        </div>
        <div class="card-box-content"  v-if="list.memberTransfer!='' && list.memberTransfer!=null && list.memberTransfer!=undefined && list.memberTransfer!='null' && list.memberTransfer.type.key != '1303258629775818752'">
          {{isEmpty(list.memberTransfer,'acceptOrg.data')}}
        </div>
        <div class="card-box-content"  v-if="!(list.memberTransfer!='' && list.memberTransfer!=null && list.memberTransfer!=undefined && list.memberTransfer!='null')">
          --
        </div>
      </div>

      <div class="card-box">
        <div class="card-box-title">
          转接原因
        </div>
        <div class="card-box-content">
          {{isEmpty(list.memberTransfer,'transferCause')}}
        </div>
      </div>

      <div class="card-box">
        <div class="card-box-title">
          介绍信
        </div>
        <div class="card-box-content card-box-content1">
          <div v-if="fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0" class="card-filebox" v-for="(item,index) in fileList"  @click="download(item.url,item.submittedFileName)">
            <div class="card-file">
              <img src="@/assets/page/file-icon1.png">
              <span>{{item.submittedFileName}}</span>
              <img src="@/assets/page/file-icon2.png">
            </div>
          </div>
          <span v-if="!(fileList!='' && fileList!=undefined && fileList!=null && fileList!='null' && fileList.length>0)">--</span>

        </div>
      </div>

      <div class="card-box">
        <div class="card-box-title">
          <i v-if="type=='2'" class="c-f00">*</i>
          审核结果
        </div>
        <div v-if="type === '1'">
          <div class="card-box-content">
            {{params.transferState.data}}
          </div>
        </div>
        <div v-else-if="type === '2'">
          <div class="card-box-content mr-20" style="flex:1" v-if="params.acceptOrg.key === currentOrg.key">
            <el-form-item label="" prop="">
              <el-radio-group v-model='rejectPast.data'>
                <el-radio label="驳回"></el-radio>
                <el-radio label="通过"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="card-box-content" v-if="params.createOrgId === currentOrg.key">
            {{params.transferState.data}}
          </div>
        </div>
      </div>

      <div class="card-box" v-if="params.transferState.data=='待审核' && params.acceptOrg.key === currentOrg.key && type === '2'">
        <div class="card-box-title">
          <i class="c-f00">*</i>
          审核备注
        </div>
        <div class="card-box-content mr-20" style="flex:1">
          <el-input v-model="auditResult" type="textarea" maxlength="500" placeholder="请输入需求内容" show-word-limit :autosize="{ minRows: 5, maxRows: 5}"/>
        </div>
      </div>

      <!-- 根据类型显示 -->
      <div class="text-center mt-20">
        <el-button v-if="params.transferState.key == '1303517778761744384' && params.createOrgId == currentOrg.key" @click="editBtn(4)">撤销</el-button>
        <el-button v-if="params.transferState.key != '1303517778761744384' && params.transferState.key != '1303517902271414272' && params.createOrgId == currentOrg.key" type="primary" @click="editBtn(8,list)">重新发起</el-button>
        <!-- <el-button v-if="params.transferState.key === '1303517778761744384'" @click="editBtn(6)">驳回</el-button> -->
        <el-button v-if="params.transferState.key == '1303517778761744384' && type == '2'" type="primary" @click="editBtn(7)">确定</el-button>
      </div>
    </base-card-box>

    <base-card-box header="转接历史" :margin="{top: true}" :headerBottomBorder="false" style="margin-bottom:80px;">
      <div style="margin: 0 20px;">
        <el-table v-loading="loading" class="table" :data="tableData" header-row-class-name="page-table-header" :header-cell-style="{'text-align':'center'}">
          <el-table-column label="申请转接时间" align="center" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'createTime')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="转接类型" align="center" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'type.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="转接状态" align="center" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'transferState.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="原组织" align="left" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'orgIdWrite')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="接收组织" align="left" width="300" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'acceptOrg.data')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核备注" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
                <span>{{isEmpty(tableData[scope.$index],'auditResult')}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="{row}">
              <base-table-a @click="editBtn(2, row)">转接详情</base-table-a>
            </template>
          </el-table-column>
        </el-table>

        <base-pagination :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>
      </div>
    </base-card-box>

    <div class="text-center fexid-clas bg-fff mt-20 pd-20">
      <el-button @click="editBtn(1)">返回</el-button>
    </div>

    <!-- 详情模态 -->
    <org-detail-dialog ref="refDetail" @refresh=""/>
    <org-out-dialog ref="refOut" @refresh="refreshfun"/>
    <org-in-dialog ref="refIn" @refresh="refreshfun"/>
    </el-form>
  </div>

</template>

<script>
  import OrgDetailDialog from './org-detail-dialog'
  import OrgOutDialog from './org-out-dialog'
  import OrgInDialog from './org-in-dialog'
  import commonReq  from "@/api/public/commonReq.js"
  import {getOrgDetail,getOrgDetaillist,getOrgDetele,getAttachment} from "@/api/backstage/party/basic/org/org.js"

  export default {
    name: 'OrgDetail',
    components: {OrgDetailDialog, OrgOutDialog,OrgInDialog},
    props: {
      type: {
        type:String,
        default: ''
      },
      params: {
        type: Object,
        default: {}
      },
      currentOrg:{
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        loading:true,//加载遮罩控制条件
        activeName: '1',
        imgUrl: require('@/assets/head/user-head.png'),
        list:'',//详情数据
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total:0,
        auditResult:'',//审核备注
        // headTitle:'',
        //isShow:true,//判断待审核部分是否出现
        pending:{//待审核标识
          data:'待审核',
          key:'1303517778761744384'
        },
        rejectPast:{
          data:'',
          key:''
        },
        // past:{//通过按钮标识
        //   data:'通过',
        //   key:'1303517902271414272'
        // },
        // reject:{//驳回按钮标识
        //   data:'驳回',
        //   key:'1303517844142555136'
        // },
        revoke:{//撤销按钮标识
          data:'撤销',
          key:'1303517961343991808'
        },
        bizTypes:'',
        fileList:[],//附件
        isShow:'',//判断转正党员能否显示
      }
    },
    activated(){
      this.rejectPast = {
        data:'',
        key:''
      }
      this.auditResult = ''

      this.getDetail();
      this.pageChange();
      if(this.params.type.data=='园区内接转' || this.params.type.data=='转出园区外'){
        this.bizTypes='orglc'
      }else if(this.params.type.data=='园区外转入'){
        this.bizTypes='orglr'
      }
      this.getFile();
    },
    mounted () {
      this.getDetail();
      this.pageChange();
      if(this.params.type.data=='园区内接转' || this.params.type.data=='转出园区外'){
        this.bizTypes='orglc'
      }else if(this.params.type.data=='园区外转入'){
        this.bizTypes='orglr'
      }
      this.getFile();

    },
    methods: {
      //详情数据
      getDetail(){
        let params = {
          id:this.params.id,
        }
        getOrgDetail(params).then(response => {

          const res = response;
          this.list=res;
          //党费缴纳至年月，截取年月
          if(this.list.memberTransfer.duesPayEnddate!='' && this.list.memberTransfer.duesPayEnddate!=undefined && this.list.memberTransfer.duesPayEnddate!=null && this.list.memberTransfer.duesPayEnddate!='null'){
            this.list.memberTransfer.duesPayEnddate=this.list.memberTransfer.duesPayEnddate.slice(0,7)
          }
          if(this.list.djMemberPubVO.type.data=='正式党员'){
            this.isShow=true;
          }else if(this.list.djMemberPubVO.type.data=='预备党员'){
            this.isShow=false;
          }

        }).finally(() => {
          this.loading=false;

        });
      },
      //历史记录
      pageChange () {
        let params = {
          current: this.pageNum,
          model: {
            memberId:{
              key:this.params.memberId.key
            }
          },
          size: this.pageSize
        }
        this.loading = true;
        getOrgDetaillist(params).then(response => {
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
      //附件
      getFile(){
        let params={
          bizIds: this.params.id,
          bizTypes: this.bizTypes
        }
        commonReq.getAttachment(params).then(response => {
          const res = response;
          if(res[0]!='' && res[0]!=undefined && res[0]!=null && res[0]!='null'){
            this.fileList = res[0].list;
          }

        }).finally(() => {

        });
      },
      //下载附件
      download(url,name){
        commonReq.downloadFile(url,name)


      },
      //弹窗返回刷新数据
      refreshfun(){
        this.$emit('refresh')
        this.getDetail();
        this.pageChange();
        this.getFile();
        this.params.transferState=this.pending
      },
      editBtn (t, row) {
        switch (t) {
          case 1:
            this.$emit('handleSwitch', {name: 'Index'})
            break

          case 2:
            this.$refs['refDetail'].show(row)
            break

          case 3:
            break

          case 4://撤销
            this.$confirm('是否撤销该条信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                dangerouslyUseHTMLString: true //将dangerouslyUseHTMLString属性设置为 true，message 就会被当作 HTML 片段处理。
            }).then(() => { //确认
                let params = {
                  id:this.params.id,
                  transferState:this.revoke
                }
                getOrgDetele(params).then(response => {
                  this.$message.success("撤销成功")
                  const res = response;
                  this.getDetail();
                  this.pageChange();
                  this.$emit('handleSwitch', {name: 'Index'})

                }).finally(() => {

                });
            }).catch(() => {

            })
          break

          case 5:
          break


          case 7://确定
            if(this.rejectPast.data=='' || this.rejectPast.data==undefined || this.rejectPast.data==null || this.rejectPast.data=='null'){
              this.$message.warning('请选择审核结果');
              return
            }
            if(this.auditResult=='' || this.auditResult==undefined || this.auditResult==null || this.auditResult=='null'){
              this.$message.warning('请填写审核备注');
              return
            }
            if(this.rejectPast.data=='通过'){
              this.rejectPast.key='1303517902271414272'
            }else if(this.rejectPast.data=='驳回'){
              this.rejectPast.key='1303517844142555136'
            }
            let params3 = {
              auditResult:this.auditResult,
              id:this.params.id,
              transferState:{
                data:this.rejectPast.data,
                key:this.rejectPast.key
              }
            }

            getOrgDetele(params3).then(response => {
              const res = response;
              if(res==true){
                if(this.rejectPast.data=='通过'){
                  this.$message.success("审核通过");
                }else if(this.rejectPast.data=='驳回'){
                  this.$message.success("审核驳回");
                }
                this.getDetail();
                this.pageChange();
                // this.isShow=false;
                this.$emit('handleSwitch', {name: 'Index',pageCurrent: 1})
              }


            }).finally(() => {

            });
            break

          case 8://重新发起
            if(this.list.memberTransfer.type.data=='转出园区外' || this.list.memberTransfer.type.data=='园区内接转'){
              this.$refs['refOut'].show(t,row)
            }else if(this.list.memberTransfer.type.data=='园区外转入'){
              this.$refs['refIn'].show(t,row)
            }
          break
        }
      },

      setAuditPermission(row){
          // 管委会
          let manageCommitteOpt = row.transferState.key === '1303517778761744384' && row.type.key === '1303258629775818752' && this.currentOrg.code === '1001';
          // 接收组织
          let acceptOrgOpt = row.transferState.key === '1303517778761744384' && (row.type.key === '1303258531859791872' || row.type.key === '1303258822889963520')
              && this.currentOrg.key === row.acceptOrg.key;
          if(manageCommitteOpt || acceptOrgOpt){
              return true;
          }
          return false;
      }

    }
  }
</script>

<style lang="scss" scoped>
  .org-detail {
    background: #eee;
  }

  .card-box {
    display: flex;
    border-bottom: 1px solid #EEEEEE;

    .card-box-title {
      width: 120px;
      text-align: left;
      font-size: 14px;
      color: #555555;
      padding: 16px 0 16px 20px;
    }

    .card-box-content {
      // flex: 1;
      padding: 16px 0;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .card-box-content1{
    cursor: pointer;
    width:auto!important;
  }
  .card-filebox{
    display:block;
  }
  .card-file{
    padding:8px 12px;
    background: #F9F9F9;
    border-radius:5px;
    display:inline-flex;
    flex-flow:wrap;
    align-items:center;
  }
  .card-file{
    width:auto;
    margin-bottom:8px;
  }
  .card-file img:first-of-type{
    width:12px;
    height:16px;
  }
  .card-file img:last-of-type{
    width:17px;
    height:17px;
  }
  .card-file span{
    padding-left:10px;
    padding-right:30px;
    font-size:14px;
    color:#999;
  }
  .card-box-content /deep/ .el-form-item {
    margin-bottom: 0px;
  }
  .card-box-content /deep/ .el-form-item__content{
    line-height:16px;
  }
  .card-box-content /deep/ .el-radio{
    color:#000;
    font-weight:bold;
  }

  .fexid-clas {
    text-align: center;
    z-index: 6;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #FFFFFF;
    opacity: 1;
    margin-left: -20px;
  }
</style>
