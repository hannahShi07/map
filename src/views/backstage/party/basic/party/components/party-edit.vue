<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="887"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible">

      <el-form ref="refForm" :model="formData" :rules="node" label-width="100px" v-cloak v-loading="loading">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级党组织" prop="parentId.data">
              <el-input placeholder="上级党组织" v-model="formData.parentId.data" maxlength="100" disabled  readonly v-if="subordinate || (artyGroup && (title === '编辑党组织'))"/>
              <el-input placeholder="请选择" v-model="formData.parentId.data" maxlength="100"  readonly @click.native="getTree" v-else/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织类别" prop="category.key">
              <el-select v-model="formData.category.key" placeholder="请选择" class="wp-100" clearable @change="changeCate">
                <el-option
                  v-for="item in dicts.category"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item :label="artyGroup ?  '党小组名称':'组织名称'" prop="name">
          <el-input placeholder="请输入" v-model="formData.name" maxlength="50" clearable/>
        </el-form-item>

       <div v-if="!artyGroup">
        <el-row>
          <el-col :span="12">
            <el-form-item label="组织编码" prop="orgNum">
              <el-input placeholder="请输入" maxlength="100" clearable v-model="formData.orgNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织类型" prop="type.key">
              <el-select v-model="formData.type.key" placeholder="请选择" class="wp-100" clearable>
                <el-option
                  v-for="item in dicts.ORG_TYPE"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true"  @blurInput="onInputBlurphone"/>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织分类" prop="classification.key">
              <el-select v-model="formData.classification.key" placeholder="请选择" class="wp-100" clearable>
                <el-option
                  v-for="item in dicts.classification"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="组织地址" class="rel" prop="address">
              <v-distpicker :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display: inline-block;"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
              <el-input placeholder="请输入" style="width: 530px" maxlength="200" clearable v-model="formData.address" @input="changeAddress"/>
              <img class="ml-10 pointer" src="@/assets/page/icon-map.png" width="23" height="21" alt="" @click="toMap">
            </el-form-item>
          </el-col>
        </el-row>

         <el-row>
           <el-col :span="12">
             <el-form-item label="批准建立党组织日期" prop="approvalDate" class="wp-100">
               <el-date-picker
                 v-model="formData.approvalDate"
                 value-format="yyyy-MM-dd"
                 type="date"
                 placeholder="选择日期"
                 :picker-options="pickerOptions"
                 clearable>
               </el-date-picker>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="批准建立党组织文号" class="wp-100" prop="approNum">
               <el-input placeholder="请输入" v-model="formData.approNum" maxlength="100" clearable/>
             </el-form-item>
           </el-col>
         </el-row>


         <el-row>
           <el-col :span="24">
             <el-form-item label="统一代码" prop="unifyCode">
               <el-input placeholder="请输入" maxlength="100" clearable v-model="formData.unifyCode"/>
             </el-form-item>
           </el-col>
         </el-row>

       </div>

        <!--党小组-->
        <div v-else>

          <el-row>
            <el-col :span="12">
              <el-form-item label="党小组组长" prop="leaderId.key">
                <el-select v-model="formData.leaderId.key" placeholder="请选择" class="wp-100" clearable @change="changePerson">
                <el-option
                  v-for="item in personList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <base-telephone v-model="formData.phone" :phone="'phone'" :isImport="true" @blurInput="onInputBlurphone"/>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="建立党小组日期" prop="approvalDate" class="wp-100">
                <el-date-picker
                  v-model="formData.approvalDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  clearable>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item label="组织图片" class="rel">
            <base-file-upload
              :folio='true'
              list-type="picture-card"
              :acceptSize="20"
              :otherData="otherData"
              ref="fileRef"
            @associationCallback="associationCallback"/>
        </el-form-item>

        <el-form-item label="组织简介" class="rel" prop="brief"  v-if="!artyGroup">
          <el-input
            placeholder="请输入"
            v-model="formData.brief"
            type="textarea"
            :autosize='{ minRows: 5, maxRows:5}'
            resize="none"
            maxlength="500"
            show-word-limit/>
        </el-form-item>

        <el-form-item label="党小组成员" class="rel" prop="tableData" :rules="{ }" v-if="artyGroup">
          <el-button class="btn" @click="choosePersn"><i class="el-icon-plus pr-5"/>添加人员</el-button>
          <el-table :data="tableData" header-row-class-name="page-table-header" v-loading="loading">
            <el-table-column label="姓名" prop="a" align="center" width="80px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(scope.row,'name')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" min-width="180px" prop="b" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(scope.row,'phone')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="身份证号码" min-width="200px" prop="c" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(scope.row,'idCode')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="学历" min-width="80" prop="d" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(scope.row,'education.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类型" min-width="80" prop="d" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{isEmpty(scope.row,'type.data')}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="{row}">
                <base-table-a type="delete" @click="delet(row)">删除</base-table-a>
              </template>
            </el-table-column>

            <!-- 空数据样式 -->
            <base-table-empty slot="empty"/>
          </el-table>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>

    </el-dialog>
    <!--上级党组织弹窗-->
    <base-org-tree ref="orgTree" @refresh="getParentId"/>

    <!--党小组选中人员-->
    <choose-other-person ref="refChoose" @refresh="getPerson" :isSingle="false" :isParty="true"/>

    <!-- 地图弹出框-->
    <b-map :mapVisible="mapVisible" @mapClose="mapClose"  ref="refmap"/>
  </div>
</template>

<script>
  import commonReq from "@/api/public/commonReq";
  import VDistpicker from 'v-distpicker'
  import { getPartyCategory ,getPartySave,getPartydetail,getPartyUpdate,getPartydjGroupMembers,getPartygroupMember,getOrgPhoneIsRepeat,findOrgPageNum} from "@/api/backstage/party/basic/party/party.js"
  import fackClickOutSide from "../../../../../../utils/fackClickOutSide";
  import ChooseOtherPerson from '@/components/individual/choose-other-person/index'
  import BMap from '@/components/BMap/BMap'
  import BaseTelephone from "../../../../../../components/base-telephone/index";

  export default {
    components: {BaseTelephone, VDistpicker ,ChooseOtherPerson,BMap},
    mixins: [fackClickOutSide],
    data () {
      return {

        // 模态
        visible: false,
        // 是否为添加
        title: '新建党组织',//标题
        loading:false,//加载遮罩

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },

        dicts:{//字典表数据
          category:[],//组织类别下拉框
          classification:[],//组织分类
          ORG_TYPE: [],//组织类型
        },
        placeholders: {
          province: '安徽省',
          city: '合肥市',
          area:'蜀山区' ,
        },
        formData:{//新增数据
          id:'',
          unifyCode:"",// 统一信用代码
          address:"",//组织地址（必填）
          approNum:"",//党组织批准建立党组织文号（非必填）
          approvalDate:"",//党组织批准建立党组织日期（非必填）
          brief:"",//简介（非必填）
          category:{//组织类别（必填）
            data: "",
            key: null
          },
          classification:{//组织分类（非必填）
            data: "",
            key: null
          },
          coordinates:"",//坐标（必填）
          groupBuildDate:"",//建立党小组日期（必填）
          leaderId:{//党小组组长（必填）
            data: "",
            key: null
          },
          memberIds:[],//当小组成员
          name:"",//组织名称（必填）
          orgNum:"",//组织编码(非必填)
          parentId:{//上级党组织（必填）
            data: "",
            key: null
          },
          phone:"",//联系电话（必填）
          ssqId:"",//省市区（-分割）（必填）
          type:{//组织类型（必填）
            data: "",
            key: null
          },
        },
        node:{
          'unifyCode': {
            required: true,
            message: "请输入统一代码",
            trigger: "blur"
          },
          'parentId.data':{
            required: true,
            message: "请选择上级党组织",
            trigger: "blur"
          },
          'category.key':{
            required: true,
            message: "请选择组织类别",
            trigger: "blur"
          },
          name:{
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          'type.key':{
            required: true,
            message: "请选择组织类型",
            trigger: "blur"
          },
          address:{
            required: true,
            message: "请输入组织地址",
            trigger: "blur"
          },
          approvalDate:{
            required: true,
            message: "请选择日期",
            trigger: "blur"
          },
          'leaderId.key':{
            required: true,
            message: "请选择党小组组长",
            trigger: "blur"
          },
        },

        otherData:{
          id:'',
          bizId: '',
          bizType: "bizType",
          isSingle: false
        },
        artyGroup:false,//是否为党小组
        tableData:[],//党小组成员
        personList:[],//党小组组长
        oldperson:{},//上一个选中的党小组组长
        subordinate:false,//是否为新增下级党组织
        mapVisible: false,  //地图弹框标识

        phoneOnly:true ,// 手机号码是否唯一,true: 唯一；false: 不唯一
        isClickSave:false, // 是否点击了保存按钮
        pageSize: 10, // 列表页面分页大小
      }
    },
    created(){
      this.getType();
    },
    methods: {
      //手机号验证 唯一性
      onInputBlurphone(){
        this.phoneOnly = false
        if(this.formData.phone){
          let params = {
            orgId:this.formData.id,
            phone:this.formData.phone
          }
          getOrgPhoneIsRepeat(params).then(response =>{
            const res = response;
            if(res){
              this.formData.phone = ''
              this.$message.warning("该手机号已存在，请重新填写")
            }else{
              this.phoneOnly = true
              if(this.isClickSave){
                this.save()
              }
            }
          })
        }
      },

      // 成功回调
      associationCallback(val){
        if(val){
          if((this.title == '新建党组织') || (this.title == '新增下级')){
            this.partySave()
          }else if(this.title == '编辑党组织'){
            this.partyEdit();
          }
        }else{
          this.$message({
            showClose: true,
            message: '请再试一次 !!!',
            type: 'error'
          });
        }
      },

      //当小组成员
      changePerson(val){
        let value = {}
        if(val != ""){
          if(this.oldperson.id === val){
            return
          }else{
            if(this.oldperson.id  != undefined){
              this.tableData.forEach((item,index) =>{
                if(item.id == this.oldperson.id){
                  this.tableData.splice(index,1)
                }
              })
              this.oldperson = {};
            }
          }

          this.personList.forEach((item,index) =>{
            if(item.id == val){
              value = item;
            }
          })

          let existence = false
          this.tableData.forEach((item,index) =>{
            if(item.id == value.id){
              existence = true
            }
          })

          if(!existence){
            if(this.oldperson.id  != undefined){
              this.tableData.forEach((item,index) =>{
                if(item.id == this.oldperson.id){
                  this.tableData.splice(index,1)
                }
              })
            }
            this.tableData.push(value)
            this.oldperson = value
          }
        }else{
          if(this.oldperson.id  != undefined){
            this.tableData.forEach((item,index) =>{
              if(item.id == this.oldperson.id){
                this.tableData.splice(index,1)
              }
            })
            this.oldperson = {};
          }
        }
      },

      //查询党小组组长列表
      selectPersons(){
        let params = {
          id:this.formData.id,
          info:"",
          orgId:{
            key:this.formData.parentId.key,
          },
          memberTypeOpt:'1'//是否正式党员标识(1是0否)
        }
        getPartydjGroupMembers(params).then(response => {
          const res = response;
          this.personList = res;
          if(this.personList.length <= 0){
              this.formData.leaderId.key = "";
          }
        })
      },
      //党小组 - 选择人员
      choosePersn(){
        this.$refs.refChoose.show(this.formData.id,this.formData.parentId,this.tableData);
      },
      //党小组变更
      changeCate(val){
        if(val =="1248618115277783040"){
          this.selectPersons()
          this.artyGroup = true
          if(this.title === '编辑党组织'){
            let params = {
              org:{
                key:this.formData.id,
              },
            }
            getPartygroupMember(params).then(response => {
              const res = response;
              this.tableData = res;
              let that = this;
              this.tableData.forEach(obj =>{
                  that.formData.memberIds.push(obj.id)
              })
            })
          }

        }else{
          this.artyGroup = false
        }
      },
      //新增时获取UID
      partyUid(){
        commonReq.getNewUid({}).then(response =>{
          const res = response
          this.formData.id = res;
          this.otherData.bizId = res;
        })
      },

      //编辑数据回显
      getDetail(id,categoryId){
        let params = {
          id:id
        }
        getPartydetail(params).then(respone => {
          const res = respone
          let params = {
            "parentId": {
              "data": res.parentId.data,
              "key": res.parentId.key
            }
          }
          this.$refs.fileRef.init()
          getPartyCategory(params).then(response => {
            this.dicts.category = response;
          }).finally(() =>{
            this.loading = false;
          });

          this.formData ={
            id:res.id,
            unifyCode:res.unifyCode,// 统一信用代码
            address:res.address,//组织地址（必填）
            approNum:res.approNum,//党组织批准建立党组织文号（非必填）
            approvalDate:res.approvalDate,//党组织批准建立党组织日期（非必填）
            brief:res.brief,//简介（非必填）
            category:{//组织类别（必填）
              data: res.category.data,
              key: res.category.key
            },
            classification:{//组织分类（非必填）
              data: res.classification.data,
              key: res.classification.key
            },
            coordinates:res.coordinates,//坐标（必填）
            groupBuildDate:"",//建立党小组日期（必填）
            leaderId:{//党小组组长（必填）
              data: res.leaderId.data,
              key: res.leaderId.key
            },
            memberIds:[],//当小组成员
            name:res.name,//组织名称/党小组名称（必填）
            orgNum:res.orgNum,//组织编码(非必填)
            parentId:{//上级党组织（必填）
              data: res.parentId.data,
              key: res.parentId.key
            },
            phone:res.phone,//联系电话（必填）
            ssqId:res.ssqId,//省市区（-分割）（必填）
            type:{//组织类型（必填）
              data: res.type.data,
              key: res.type.key
            }
          }

          this.oldperson = {
            id: res.parentId.key
          }
          this.changeCate(categoryId)


          let values =  ['','','']
          if(res.ssqId){
            values =  res.ssqId.split('-')
          }
          this.placeholders = {
            province :values[0],
            city:values[1],
            area:values[2] ,
          }

          this.selectPersons()
        }).finally(() =>{
          this.loading = false;
        })
      },

      //判断省市区是否已填写
      changeAddress(val){
        if(this.placeholders.province == "" || this.placeholders.province == '省 '){
          this.formData.address = ""
          this.$message({
            showClose: true,
            message: '请先选择所在省份！',
            type: 'error'
          });
        }else if(this.placeholders.city== "" || this.placeholders.city == '市 ' ){
          this.formData.address = ""
          this.$message({
            showClose: true,
            message: '请先选择所在城市！',
            type: 'error'
          });

        }else if(this.placeholders.area == "" || this.placeholders.area == ' 区 ' ){
          this.formData.address = ""
          this.$message({
            showClose: true,
            message: '请先选择所在区域！',
            type: 'error'
          });
        }else{
          // this.$refs.userForm.validateField("address");
        }
      },

      //组织类别回显
      getCategory(val){
        let params = {
          "parentId": {
            "data": val.data,
            "key": val.key
          }
        }
        getPartyCategory(params).then(response => {
          const res = response;
          this.dicts.category = res;
        });
      },

      //选择的上级党组织回调
      getParentId(val){
        this.formData.category.key = ""
        this.formData.category.data = ""
        if(val != ""){
          this.dicts.category = []
          this.formData.parentId.data = val.data
          this.formData.parentId.key = val.key
          this.$refs['refForm'].clearValidate(['parentId.data']);
          this.getCategory(val)
        }
      },

      //打开上级党组织弹窗
      getTree(){
        this.$refs['orgTree'].show()
      },

      //省
      onChangeProvince(province){
        this.placeholders.province =  province.value;
      },
      //市
      onChangeCity(city){
        this.placeholders.city =  city.value
      },
      //区
      onChangeArea(area){
        this.placeholders.area =  area.value
      },

      // t:  1-新增
      show (t, row) {
        if(t === 1){
          this.title = '新建党组织'
          this.dicts.category = []
          this.partyUid()
          this.placeholders = {
            province: '安徽省',
            city: '合肥市',
            area:'蜀山区' ,
          }
          this.subordinate = false
          this.pageSize = row.pageSize
        }else if(t === 8){
          this.title = '编辑党组织'
          this.loading =true
          this.otherData.bizId = row.id
          this.getDetail(row.id,row.categoryId)
          // this.changeCate(row.categoryId)
          this.subordinate = false
        }else if(t === 7){
          this.title = '新增下级'
          this.partyUid()
          this.subordinate = true
          this.formData.parentId = {//上级党组织（必填）
            data: row.name,
            key: row.id
          }

          this.getCategory(this.formData.parentId)

          this.placeholders = {
            province: '安徽省',
              city: '合肥市',
              area:'蜀山区' ,
          }
          this.pageSize = row.pageSize
        }
        this.visible = true
      },

      //字典表数据
      getType(){
        let params = {
          types:['classification','ORG_TYPE']
        }
        commonReq.getHistoryDict(params).then(response =>{
          const res = response;
          this.dicts.classification = res.classification;
          this.dicts.ORG_TYPE = res.ORG_TYPE;
        })
      },
      //编辑保存
      partyEdit(){
        getPartyUpdate(this.formData).then(response =>{
          const  res = response
          // this.$refs.fileRef.deleteAttachment();
          this.close()
          this.$emit('refresh')
          this.$message(this.successTip())
        })
      },
      //新增保存接口
      partySave(){
        getPartySave(this.formData).then(response => {
          const  res = response
          this.$message(this.successTip())
          this.close()
          // 定位新增数据分页位置
          findOrgPageNum({orgId: res.id, size: this.pageSize}).then(response => {
              this.$emit('refresh', response, 1)
          }).catch(error => {
              this.$emit('refresh', 1)
          });
        })
      },
      //确定保存
      save(){
        if(this.tableData.length >= 3){
          this.$refs['refForm'].clearValidate(['tableData']);
        }

        this.$refs['refForm'].validate((valid) => {
          if (valid) {
            // this.formData.memberIds = []
            // this.formData.memberIds.push(this.formData.leaderId.key);
            let index = this.formData.memberIds.indexOf(this.formData.leaderId.key)
            if(index === -1){
              this.formData.memberIds.push(this.formData.leaderId.key)
            }
            this.formData.ssqId = ''
            this.formData.ssqId =  this.placeholders.province   + '-' + this.placeholders.city + "-" +this.placeholders.area ;

            if(this.artyGroup){
              this.formData.address = ''
              this.formData.ssqId = ''
            }


            if(!this.phoneOnly){
              this.isClickSave = true
              return
            }else{
              this.$refs.fileRef.submitFile()
            }
          } else {
            setTimeout(()=>{
              const isError= document.getElementsByClassName('is-error')
              isError.length && isError[0].querySelector('input').focus()
            },100)
            console.log('error submit!!');
            return false;
          }
        });
      },
      //取消
      close(){
        this.placeholders = {
          province: '安徽省 ',
            city: '合肥市 ',
            area:' 蜀山区 ' ,
        },
        this.$refs['refForm'].resetFields();
        this.dicts.category = []

        this.formData = {
          id:'',
          unifyCode:"",
          address:"",
          approNum:"",
          approvalDate:"",
          brief:"",
          category:{
            data: "",
            key: null
          },
          classification:{
            data: "",
            key: null
          },
          coordinates:"",
          groupBuildDate:"",
          leaderId:{
            data: "",
            key: null
          },
          memberIds:[],
          name:"",
          orgNum:"",
          parentId:{
            data: "",
            key: null
          },
          phone:"",
          ssqId:"",
          type:{
            data: "",
            key: null
          }
        }

        this.tableData = []//党小组成员
        this.personList = []//党小组组长
        this.oldperson = {}//上一个选中的党小组组长
        this.artyGroup = false

        this.visible = false
      },
      //党小组人员
      getPerson(list){
        let existence = false
        this.formData.memberIds = [];

        list.forEach((item,index) =>{

          this.formData.memberIds.push(item.id);
        })

        if(this.formData.memberIds.indexOf(this.formData.leaderId.key) >= 0){
            existence = true
        }else{
            existence = false
        }

        if(!existence){
         this.formData.leaderId = {
           key:'',
           data:''
         }
        }
        this.tableData = list

      },
      //党小组删除成员
      delet(val){
        let existence = false
        if(val.id == this.formData.leaderId.key){
          existence = true
        }

        this.formData.memberIds.splice(this.formData.memberIds.indexOf(val.id),1);

        let tip = ''
        if(existence){
          tip = '该成员为党小组组长，确定删除？'
        }else{
          tip = '此操作将删除该成员, 是否继续？'
        }

        this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.forEach((item,index) =>{
            if(item.id == val.id){
              this.tableData.splice(index,1)
              if(existence){
                this.formData.leaderId = {
                  key:'',
                  data:''
                }
              }

              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
              this.$message(this.successTip())
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      // 关闭地图事件
      mapClose(data) {
          this.mapVisible = false
          if(data){
              this.formData.address = data.address
              this.formData.coordinates = data.coordinates

              this.placeholders = {
                  province: data.province,
                  city: data.city,
                  area: data.district ,
              }

            this.$refs['refForm'].clearValidate('address');
          }
      },

      // 打开地图
      toMap(){
          this.mapVisible = true
          // this.$refs.refmap.setPosition(this.formData)
      },
    }
  }
</script>

<style scoped>
  .form-big-label {
    padding-left: 10px;
    line-height: 20px;
  }
  .el-select-dropdown__item.selected{
    color: black;
  }
  .wp-100 /deep/ .el-form-item__label{
        line-height: 20px;
    }
  .btn{
    margin-bottom: 12px;
  }


  element.style {
    display: inline-block;
    height: 35px;
  }

   .distpicker-address-wrapper {
     color: #9caebf;
   }

   *, *:before, *:after {
     -webkit-box-sizing: inherit;
     box-sizing: inherit;
   }
  user agent stylesheet
  div {
    display: block;
  }
  /deep/.el-form-item__content {
     line-height: 36px!important;
     position: relative;
     font-size: 14px;
   }
  /deep/.distpicker-address-wrapper select {
    /* padding: .5rem .75rem; */
    padding: 0;
    height: 36px!important;
    width: 152px!important;
    padding: -108px 0 0 0;
    font-size: 1rem;
    line-height: 36px!important;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
</style>
