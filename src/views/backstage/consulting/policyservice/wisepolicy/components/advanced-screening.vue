<!--搜索结果-->
<template>
  <div class="result">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="高级筛选" name="first">
        <div class="advanced">
          <el-form v-model="formDate">
            <el-row>
              <el-col :span="12">
                <el-form-item label="关键词">
                  <span style="color: #888">包含</span>
                  <el-input v-model="formDate.containWords" placeholder="请输入关键词多个关键词用空格隔开" clearable style="width: 60%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="关键词">
                  <span style="color: #888">不包含</span>
                  <el-input v-model="formDate.notContainWords" placeholder="请输入关键词多个关键词用空格隔开" clearable style="width: 60%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="适用省份地区">
                  <v-distpicker  :province="placeholders.province" :city="placeholders.city" :area="placeholders.area" style="display:flex;justify-content:flex-start"  @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
<!--                  <el-cascader-->
<!--                    :options="options"-->
<!--                    :props="{ checkStrictly: true }"-->
<!--                    clearable></el-cascader>-->
                </el-form-item>

              </el-col>
<!--              <el-col :span="12">-->
<!--                <el-form-item label="政策范围">-->
<!--                  <el-radio-group v-model="radio" disabled>-->
<!--                    <el-radio :label="1">区外</el-radio>-->
<!--                    <el-radio :label="2">区内</el-radio>-->
<!--                  </el-radio-group>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--              <el-col :span="12">-->
<!--                <el-form-item label="适用行业分类">-->
<!--                  <el-cascader-->
<!--                    :options="options"-->
<!--                    :props="{ checkStrictly: true }"-->
<!--                    clearable></el-cascader>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="政策形式">
                  <el-checkbox-group v-model="checkboxGroup1" @change="select">
                    <el-checkbox-button v-for="(item,index) in typelist" :label="item" :key="index">{{item.labs.data}}</el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="公示日期">
                  <div class="block">
                    <span class="mouns" v-on:click="jump(1,$event)" :class="{ actived:1== current}">近一月</span>
                    <span class="mouns" v-on:click="jump(3,$event)" :class="{ actived:3==current}">近三月</span>
                    <span class="mouns" v-on:click="jump(12,$event)" :class="{ actived:12==current}">近一年</span>
                    <span class="mouns" v-on:click="jump('自定义',$event)" :class="{ actived:'自定义'==current}">自定义</span>
                    <el-form-item label-width="15px"   v-show='timeload' style="display: inline-block;float: right">
                      <el-form-item label="开始时间:" label-width="74px" style="float: left;margin-right: 1px;display: inline">
                        <el-date-picker v-model="startDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="结束时间:" label-width="74px" style="float: right;margin-right: 0;display: inline">
                        <el-date-picker v-model="closeDate" type="date" placeholder="选择日期" size="medium" value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </el-form-item>
                    </el-form-item>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div style="margin: 20px auto;text-align: center">
                <base-page-button title="查询" imgType="search" type="primary" @click="search"/>
            </div>
          </el-form>
        </div>
        <div class="s-result" v-loading="loading">
          <img src="@/assets/page/search.png" width="22" height="22"/>
          共为您查到<span style="color: #ED3C3C">{{total}}</span>条<span v-if="formDate.containWords!='' && formDate.containWords!=undefined && formDate.containWords!=null && formDate.containWords!='null'">与<span style="color: #ED3C3C">“{{formDate.containWords}}”</span></span>相关的政策
        </div>
        <div v-if="t!=4">
          <el-tabs :tab-position="tabPosition" v-model="leftactiveName" @tab-click="lefthandleClick">
            <el-tab-pane :label="item.labs.data+' '+item.sizes" :key="index+''" :name="index+''" v-for="(item,index) in lefttype">
              <div class="result-content">
                <div class="result-item" v-for="(items,index1) in inlist" v-if="(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" @click="editBtn(2,items)">
                  <div class="result-item-top">
                    <span>{{items.title}}</span>   <p>{{items.releaseTime | filterTime}}</p>
                  </div>
<!--                  <div v-if="type=='2'" class="result-item-bot" v-html="getActive(items.straightMatter)"></div>-->
                  <!--              <div class="result-item-bot">-->
                  <!--                <span title="外交部发言人赵立坚4日在例行记者会上说场">-->
                  <!--                  外交部发言人赵立坚4日在例行记者会上说-->
                  <!--                  ，中方对国际上各方理解支持中方涉港有关立场和行动表示赞赏，敦促个别国家摒弃意识形态偏见，摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务-->
                  <!--                </span>>-->
                  <!--              </div>-->
                </div>

                <!-- 空数据样式 -->
                <base-table-empty v-if="!(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" slot="empty"/>

              </div>

              <base-pagination v-if="total>pageSize" :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pageChange"/>

            </el-tab-pane>

          </el-tabs>
        </div>
        <!-- 热点解读 -->
        <div v-if="t==4">
          <div class="result-content" v-loading="loading">
            <div class="result-item" v-for="(items,index1) in inlist" v-if="(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" @click="editBtn(5,items)">
              <div class="result-item-top">
                <span>{{items.title}}</span>
                <p>{{items.releaseTime | filterTime}}</p>
              </div>
<!--              <div class="result-item-bot" v-html="getActive(items.content)"></div>-->
              <!--              <div class="result-item-bot">-->
              <!--                <span title="外交部发言人赵立坚4日在例行记者会上说场">-->
              <!--                  外交部发言人赵立坚4日在例行记者会上说-->
              <!--                  ，中方对国际上各方理解支持中方涉港有关立场和行动表示赞赏，敦促个别国家摒弃意识形态偏见，摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务摘掉有色眼镜，客观、公正看待中方有关决定及立法，不以任何方式插手干预香港事务-->
              <!--                </span>>-->
              <!--              </div>-->
            </div>

            <!-- 空数据样式 -->
            <base-table-empty v-if="!(inlist!='' && inlist!=undefined && inlist!=null && inlist!='null' && inlist.length>0)" slot="empty"/>

          </div>

          <base-pagination v-if="total>pageSize" :total="total" :pageNum.sync="pageNum" :pageSize.sync="pageSize" @pageChange="pagepolicyHot"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="普通筛选" name="second">
        <search-results v-if="show" @handleSwitch="handleSwitch" :t="t" :input="input" :tabindex="tabindex" :buttonShow="buttonShow"/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import SearchResults from './search-results'
  import {
    outpolicyList,
    outpolicyHot
  } from "@/api/backstage/consulting/policyservice/wisepolicy/wisepolicy.js"
  import VDistpicker from 'v-distpicker'


  export default {
    name: 'advanced-screening',
    components: {
      SearchResults,
      VDistpicker

    },
    props: {
      t: {//4：是热点解读
        type: Number,
        default: 0
      },
      // type: {
      //   type: String,
      //   default: ''
      // },
      input: {
        type: String,
        default: ''
      },
      tabindex: {//普通搜索的政策类型
        type: String,
        default: ''
      },
    },
    data(){
      return{
        tabPosition: 'left',
        activeName: 'first',
        leftactiveName:'0',
        loading:true,
        current: '',
        formDate:{
          highLevelPolicyLabels:[],//标签
          containWords:null,//关键词包含
          notContainWords:null,//关键词不包含
          area:null,//地区
          releaseStartTime:null,//公示时间开始
          releaseEndTime:null//公示时间结束
        },
        placeholders: {//省份地区
          province: '',
          city: '',
          area:'' ,
        },
        checkboxGroup1: [],
        typelist:[],//政策形势
        // radio:1,
        options:[{
          value: 'jiaohu',
          label: '组件交互文档'
        }],
        timeload:false,
        startDate:'',
        closeDate:'',
        show:false,//是否显示普通查询内容
        newsType:[],//最新政策类型
        lefttype:[],//左侧政策栏统计

        pageNum: 1,//当前页
        pageSize: 10,//每页大小
        total: 0,//最新政策总条数
        inlist:[],//数据
        buttonShow:false,
        policyListData: [],//区外智慧政策列表数据
        policyType:[//区外政策类型
          {
            "labs":{
              "key":"1",
              "data":"最新政策"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"2",
              "data":"市场监督"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"3",
              "data":"科技创新"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"4",
              "data":"金融政策"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"5",
              "data":"资金扶持"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"6",
              "data":"税收慧免"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"7",
              "data":"人才扶持"
            },
            "sizes":0
          },
          {
            "labs":{
              "key":"8",
              "data":"资质认证"
            },
            "sizes":0
          }

        ],

      }
    },
    mounted(){
      // if(this.type!='' && this.type!=undefined && this.type!=null && this.type!='null'){
      //   if(this.type=='1'){//区外
      //     this.radio=1;
          this.typelist=[];
          if(this.t!=4){
            this.policyListData=[];

            this.outpagepolicyList0();
            this.outpagepolicyList1();
            this.outpagepolicyList2();
            this.outpagepolicyList3();
            this.outpagepolicyList4();
            this.outpagepolicyList5();
            this.outpagepolicyList6();
            this.outpagepolicyList7();

            this.outpagepolicyList(this.leftactiveName);
            console.log('this.policyType； '+JSON.stringify(this.policyType))
            this.newsType.push(this.policyType[0]);
            this.lefttype=this.newsType

            this.typelist=this.policyType
            this.typelist=this.policyType.slice(1,this.policyType.length)
          }else{
            this.typelist=this.policyType
            this.typelist=this.policyType.slice(1,this.policyType.length)
            this.pagepolicyHot ()
          }



        // }else if(this.type=='2'){//区内
        //   this.radio=2
        //   this.pagepolicyLeft();
        //   this.formDate.bigLabel=''
        //   this.pagepolicyList();
        // }
      // }

    },
    methods:{
      //跳转页面
      handleSwitch(val){
        this.$emit('handleSwitch', {name: val.name,t:val.t,params:val.params})
      },
      //选择省
      onChangeProvince(province){
        this.placeholders.province =  province.value;
        if(province.value=='省'){
          this.placeholders.province =''
        }
        // this.$refs['refForm'].clearValidate(['address']);
      },
      //选择市
      onChangeCity(city){
        this.placeholders.city =  city.value
        if(city.value=='市'){
          this.placeholders.city =''
        }
        // this.$refs['refForm'].clearValidate(['address']);
      },
      //选择区
      onChangeArea(area){
        this.placeholders.area =  area.value
        if(area.value=='区'){
          this.placeholders.area =''
        }
        // this.$refs['refForm'].clearValidate(['address']);
      },
      //返回普通筛选
      handleClick(tab){
        if(tab.name=='second'){
          this.show=true
        }

      },
      //左侧tab切换点击
      lefthandleClick(tab) {
        this.pageNum=1;
        // if(this.type=='1'){//区外
        // if(tab.name!=0){
        //   this.formDate.highLevelPolicyLabels=[this.lefttype[tab.name].labs.data]
        // }
          this.outpagepolicyList(tab.name);
        // }else if(this.type=='2'){//区内
        //   this.formDate.bigLabel=this.lefttype[tab.name].labs.key
        //   this.pagepolicyList();
        // }


      },
      //筛选政策形势
      select(val){
        console.log('val'+JSON.stringify(val))
      },
      jump(val) {
        this.current = val;
        this.index = val
        this.startDate = ''
        this.closeDate = ''
        if(val == '自定义'){
          if(this.timeload == true){
            this.timeload = false
            this.current = '';
          }else{
            this.timeload = true
          }
        }else{
          this.timeload = false
          if(val==1){//近七天
            let oneweekdate=new Date();
            let milliseconds=new Date().getTime()-7*24*3600*1000;
            oneweekdate.setTime(milliseconds);
            let year1=oneweekdate.getFullYear();
            let month1=oneweekdate.getMonth()+1>10 ? oneweekdate.getMonth()+1:'0'+(oneweekdate.getMonth()+1);
            let day1=oneweekdate.getDate()>10 ? oneweekdate.getDate():'0'+oneweekdate.getDate();
            let date1=year1+"-"+month1+"-"+day1

            this.startDate = date1//近七天之前的日期

          }else if(val==3){//近三个月
            let nowdatestr=this.getNowFormatDate();//当前日期
            this.startDate = this.getPreMonthDay(nowdatestr,3)

          }else if(val==12){//近一年
            let date = new Date();
            let seperator1 = "-";
            let seperator2 = ":";
            let year = date.getFullYear()-1;
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            let currentdate = year + seperator1 + month + seperator1 + strDate;

            this.startDate =currentdate
          }

          this.closeDate = this.getNowFormatDate();//当前日期

        }
        //获取点击对象
        let el = event.currentTarget;
      },

      getNowFormatDate() {//当前时间
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //获取当前日期前N个月的日期
      getPreMonthDay(date,monthNum)
      {
        let dateArr = date.split('-');
        let year = dateArr[0]; //获取当前日期的年份
        let month = dateArr[1]; //获取当前日期的月份
        let day = dateArr[2]; //获取当前日期的日
        let days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        let year2 = year;
        let month2 = parseInt(month) - monthNum;
        if (month2 <=0) {
          year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : parseInt(month2) / 12);
          month2 = 12 - (Math.abs(month2) % 12);
        }
        let day2 = day;
        let days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
          day2 = days2;
        }
        if (month2 < 10) {
          month2 = '0' + month2;
        }
        let t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
      },
      //政策形势
      // pagepolicyLeft(){
      //   this.typelist=[]
      //   let params = {
      //
      //   }
      //   this.loading = true;
      //   inpolicyListtype().then(response => {
      //     const res = response;
      //     for(let i=0;i<res.length;i++){
      //       if(res[i].labs.key=='2430837861936128060'){//最新政策
      //         this.lefttype[0]=res[i];
      //         this.newsType[0]=res[i];
      //       }
      //       if(res[i].labs.key=='2430837861936128095'){//科技创新
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2430837861936128084'){//市场监督
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085599'){//金融政策
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085600'){//资金扶持
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085601'){//税收慧免
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085602'){//人才扶持
      //         this.typelist.push(res[i])
      //       }
      //       if(res[i].labs.key=='2473768138831085603'){//资质认证
      //         this.typelist.push(res[i])
      //       }
      //
      //     }
      //
      //   }).finally(() => {
      //     this.loading = false;
      //   });
      // },
      //左侧政策类型
      // pagepolicyLefttype(){
      //   // this.lefttype=[]
      //   // this.newsType=[]
      //   inpolicyListtype(this.formDate).then(response => {
      //     const res = response;
      //     for(let i=0;i<res.length;i++){
      //       if(res[i].labs.key=='2430837861936128060'){//最新政策
      //         // this.lefttype[0]=res[i];
      //         this.newsType[0]=res[i];
      //
      //       }
      //
      //     }
      //     this.lefttype=this.newsType.concat(this.checkboxGroup1);
      //
      //   }).finally(() => {
      //     this.loading = false;
      //   });
      // },
      //区内查询
      // pagepolicyList(){
      //   let params = {
      //     current:this.pageNum,
      //     model:this.formDate,
      //     size:this.pageSize
      //
      //   }
      //   this.loading = true;
      //   inpolicyList(params).then(response => {
      //     const res = response;
      //     this.inlist=res.records;
      //     this.total=res.total
      //   }).finally(() => {
      //     this.loading = false;
      //   });
      // },
      // 区外根据类型查询智慧政策
      outpagepolicyList0(){
        this.outpagepolicyList (0)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList1(){

        this.outpagepolicyList (1)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList2(){

        this.outpagepolicyList (2)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList3(){

        this.outpagepolicyList (3)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList4(){

        this.outpagepolicyList (4)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList5(){

        this.outpagepolicyList (5)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList6(){

        this.outpagepolicyList (6)
        this.policyListData.push(this.outlist);
      },
      outpagepolicyList7(){

        this.outpagepolicyList (7)
        this.policyListData.push(this.outlist);
      },

      //区外查询
      outpagepolicyList(t){
        let policyTypetxt=[];
        if(t==0){
          policyTypetxt=this.formDate.highLevelPolicyLabels
        }else{
           policyTypetxt=[this.policyType[t].labs.data]
        }

        if(this.formDate.containWords=='' ||this.formDate.containWords==undefined){
          this.formDate.containWords=null
        }
        if(this.formDate.notContainWords=='' ||this.formDate.notContainWords==undefined){
          this.formDate.notContainWords=null
        }
        if(this.formDate.area=='' ||this.formDate.area==undefined){
          this.formDate.area=null
        }
        if(this.formDate.releaseStartTime=='' ||this.formDate.releaseStartTime==undefined){
          this.formDate.releaseStartTime=null
        }
        if(this.formDate.releaseEndTime=='' ||this.formDate.releaseEndTime==undefined){
          this.formDate.releaseEndTime=null
        }
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          areaIdentifier:'',
          matchFields:null,
          highLevelPolicyLabels:policyTypetxt,
          containWords:this.formDate.containWords,
          notContainWords:this.formDate.notContainWords,
          area:this.formDate.area,
          releaseStartTime:this.formDate.releaseStartTime,
          releaseEndTime:this.formDate.releaseEndTime
        }

        this.loading = true;
        outpolicyList(params).then(response => {
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null' && res.data.code=='200'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              if(res.data.data.list!='' && res.data.data.list!=undefined && res.data.data.list!=null && res.data.data.list!='null' && res.data.data.list.length>0){
                this.outlist=res;
                this.inlist = res.data.data.list;
                this.total = res.data.data.total;
                this.policyType[t].sizes=res.data.data.total
              }else{
                this.outlist='';
                this.inlist = [];
                this.total = 0;
                this.policyType[t].sizes=0
              }
            }else{
              this.outlist='';
              this.inlist = [];
              this.total = 0;
              this.policyType[t].sizes=0
            }
          }else{
            this.outlist='';
            this.inlist = [];
            this.total = 0;
            this.policyType[t].sizes=0
          }


        }).finally(() => {
          this.loading = false;
        });
      },
      //热点解读查询
      pagepolicyHot () {
        if(this.formDate.containWords=='' ||this.formDate.containWords==undefined){
          this.formDate.containWords=null
        }
        if(this.formDate.notContainWords=='' ||this.formDate.notContainWords==undefined){
          this.formDate.notContainWords=null
        }
        if(this.formDate.area=='' ||this.formDate.area==undefined){
          this.formDate.area=null
        }
        if(this.formDate.releaseStartTime=='' ||this.formDate.releaseStartTime==undefined){
          this.formDate.releaseStartTime=null
        }
        if(this.formDate.releaseEndTime=='' ||this.formDate.releaseEndTime==undefined){
          this.formDate.releaseEndTime=null
        }
        let params = {
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          area:this.formDate.area,
          areaIdentifier:'',
          containWords:this.formDate.containWords,
          notContainWords:this.formDate.notContainWords,
          releaseStartTime:this.formDate.releaseStartTime,
          releaseEndTime:this.formDate.releaseEndTime

        }
        this.loading= true;
        outpolicyHot(params).then(response => {
          const res = response;
          if(res.data!='' && res.data!=undefined && res.data!=null && res.data!='null' && res.data.code=='200'){
            if(res.data.data!='' && res.data.data!=undefined && res.data.data!=null && res.data.data!='null'){
              if(res.data.data.list!='' && res.data.data.list!=undefined && res.data.data.list!=null && res.data.data.list!='null' && res.data.data.list.length>0){
                this.inlist = res.data.data.list;
                this.total = res.data.data.total;
              }else{
                this.inlist = [];
                this.total = 0;
              }
            }else{
              this.inlist = [];
              this.total = 0;
            }
          }else{
            this.inlist = [];
            this.total = 0;
          }
        }).finally(() => {
          this.loading = false;
        });
      },
      //分页
      pageChange(){
        // if(this.type=='1'){
          this.outpagepolicyList(this.leftactiveName)
        // }else if(this.type=='2'){
        //   this.pagepolicyList()
        // }
      },
      //查询
      search(){
        this.pageNum=1;
        this.lefttype=[];
        this.formDate.highLevelPolicyLabels=[]
        this.leftactiveName='0';

        //选择公示日期
        this.formDate.releaseStartTime=this.startDate;
        this.formDate.releaseEndTime=this.closeDate;
        //选择省市区
        if(this.placeholders.province=='' && this.placeholders.city=='' && this.placeholders.area==''){
          this.formDate.area=''
        }else{
          this.formDate.area=this.placeholders.province+','+this.placeholders.city+','+this.placeholders.area
        }
        // if(this.type=="1"){
        console.log('this.checkboxGroup1: '+JSON.stringify(this.checkboxGroup1))
          this.lefttype=this.newsType.concat(this.checkboxGroup1);
          if(this.leftactiveName=='0'){
            this.formDate.highLevelPolicyLabels=[]
            if(this.checkboxGroup1!='' && this.checkboxGroup1!=undefined && this.checkboxGroup1!=null && this.checkboxGroup1!='null' && this.checkboxGroup1.length>0){
              for(let i=0;i<this.checkboxGroup1.length;i++){
                this.formDate.highLevelPolicyLabels.push(this.checkboxGroup1[i].labs.data)
              }
            }

          }
          if(this.t==4){//热点解读
            this.pagepolicyHot()
          }else{
            this.outpagepolicyList(this.leftactiveName);
          }

        // }else if(this.type=='2'){
        //   this.pagepolicyLefttype()
        //
        //   if(this.leftactiveName=='0'){
        //     this.formDate.bigLabel=''
        //     if(this.checkboxGroup1!='' && this.checkboxGroup1!=undefined && this.checkboxGroup1!=null && this.checkboxGroup1!='null' && this.checkboxGroup1.length>0){
        //       for(let i=0;i<this.checkboxGroup1.length;i++){
        //         this.formDate.bigLabel+=this.checkboxGroup1[i].labs.key+' '
        //       }
        //       //去掉前后空格
        //       this.formDate.bigLabel=this.formDate.bigLabel.trim(' ')
        //
        //     }
        //
        //   }
        //
        //   this.pagepolicyList();
        //
        // }


      },
      // 详情页面
      editBtn(t,item){
        switch (t) {
          case 1:
            this.$emit('handleSwitch', {name: 'advancedScreening'})
            break
          case 2:
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
            break

          case 5:
            this.$emit('handleSwitch', {name: 'wiseDetail',t:t,params:item})
            break
        }

      },
      //输入字体高亮
      getActive(txt) {
        if (this.inputtxt && txt) {
          if (txt.indexOf(this.inputtxt) > -1) {
            // 结果transformString为进行处理后的要用来进行匹配的关键词
            let transformString = this.inputtxt.replace(/[.[*?+^$|()/]|\]|\\/g, '\\$&');
            let pattern = (new RegExp(transformString, 'gmi')); // 生成正则表达式
            let str = txt.replace(pattern, '<i style="color: #e1261c;font-style: normal;">$&</i>');

            return str;
          } else {
            return txt;
          }
        } else {
          return txt;
        }
      }
    },
    filters:{
      filterTime(val){
        if(val == undefined || val == null || val == '' || val == 'null'){
          return '-'
        }else {
          if(val.length>10){
            val=val.substring(0,10)
          }
          return val
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  /deep/.app-main {
    background:#eee !important;
  }
  /deep/ .distpicker-address-wrapper select{
    width: 170px;
    padding: 0 .75rem;
  }
  /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner{
    box-shadow: 0 0 0 0 #f48a8a;
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner{
    background-color: #fff;
    border-color: #ED3C3C;
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
    background-color: #ED3C3C;
  }
  .block{
    text-align: left;
    margin-top: 0;
    display: flex;
  }
  .mouns {
    color: #666666;
    font-size: 16px;
    margin-right: 30px;
  }
  .actived {
    color: #ED3C3C;
    width: 54px;
    /*height: 26px;*/
    background: #FFEEEE;
    display: inline-block;
    /*line-height: 26px;*/
    text-align: center;
    border-radius: 3px;
  }

  .time {
    width:64px;
    height:21px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:21px;
    color:rgba(51,51,51,1);
    opacity:1;
  }
  .mouns:hover {
    cursor:pointer;
    color: #F6931E;
  }
  .wise-seach{
    width: 100%;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background: #FFFFFF;
  }
  .wise-top {
    display: flex;
    justify-content: center;
    /*position: absolute;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  }
  .wise-top /deep/ .el-input{
    width: 65%;
    border-radius: 28px;
  }
  .wise-top /deep/ .el-input__inner{
    width: 100%;
    height: 44px;
    border-radius: 28px !important;
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    padding-left: 127px;
  }
  .wise-select /deep/ .el-input {
    width: 100%;
  }
  .wise-select /deep/ .el-input__inner {
    padding-left: 0;
    border: none;
    height: 35px;
    border-right: 1px solid #eee;
    border-radius: 0 !important;
  }
  .wise-select {
    height: 35px;
    line-height: 35px;
    position: relative;
    width: 94px;
    top: 33px;
    left: 110px;
    z-index: 999;
  }
  /*/deep/.el-select .el-input.is-focus .el-input__inner{*/
  /*  border-color:#fff;*/
  /*}*/
  .preciseMatch /deep/ .el-button:not(.is-circle):not(.is-round), .el-input__inner {
    width: 125px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #ED3C3C;
    padding-left: 48px;
    border-radius: 24px !important;
  }
  .advanced {
    padding: 20px 20px ;
    /deep/.el-form-item__label {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #333333;
    }
  }
  .s-result{
    padding: 20px;
  }
  .s-result img{
    position: relative;
    top: 5px;
  }
  .result-content{
    background-color: #fff;

    .result-item{
      border-bottom: 1px solid #eee;
      padding: 20px 10px;
      cursor: pointer;
    }
    .result-item .result-item-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 17px;
    }
    .result-item .result-item-top span{
      font-size: 16px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #444;
    }
    .result-item .result-item-top p{
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #999999;
    }
    .result-item .result-item-bot {
      width: 100%;
      max-height:18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      line-height: 18px;
      color: #999999;
    }
  }
  /deep/.el-tabs--left .el-tabs__active-bar.is-left{
    right: -20px;
    top: 64px;
    left: auto;
    height: 2px !important;
    /* transform: translateY(0px); */
    width: 205px !important;
  }
  /deep/.el-checkbox-button{
    margin-right: 30px;
  }
  /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner{
    border-left-color:#fff;
  }
  /deep/ .el-checkbox-button.is-checked .el-checkbox-button__inner {
    width: 97px;
    height: 40px;
    background: #FFEEEE;
    border-color: #FFEEEE;
    border-radius: 3px;
    color: #ED3C3C;
    line-height: 11px;
  }
  /deep/.el-checkbox-button.is-focus .el-checkbox-button__inner{
    border-color: #fff;
  }
  /deep/.el-checkbox-button .el-checkbox-button__inner {
    border-color: #fff;
  }
</style>
