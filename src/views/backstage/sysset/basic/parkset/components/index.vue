<!--任免文件管理首页-->
<template>
  <div class="party">
<!--    <base-card-box header="园区统计设置">-->

<!--    </base-card-box>-->

<!--    <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--      <el-tab-pane label="园区统计设置" name="first">-->
<!--        <div>-->
<!--          <el-form :model="list"  ref="ruleForm" label-width="100px" style="padding: 20px">-->
<!--            <el-row v-for="item in itemList">-->
<!--              <el-col :span="8"  v-for="(info,key) in item">-->
<!--                <el-form-item :label=info.name class="title1">-->
<!--                  <el-input v-model="list[info.prop]" placeholder="请输入" maxlength="5" @blur="list[info.prop] = $event.target.value" onkeyup='this.value=this.value.replace(/\D/gi,"")'-->
<!--                            clearable></el-input>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--              <el-col :span="24">-->
<!--                <el-form-item  label="园区简介" >-->
<!--                  <el-input type="textarea" v-model="list.yqjj" maxlength="500"show-word-limit :autosize="{minRows: 5,maxRows: 15}" placeholder="请输入"-->
<!--                            clearable/>-->
<!--                </el-form-item>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </el-form>-->
<!--          <div slot="footer" class="text-center" style="padding: 20px 0">-->
<!--            <el-button size="medium" type="primary" @click="autoGet">自动获取</el-button>-->
<!--            <el-button size="medium" type="primary" @click="save">保存</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="其他" name="second">-->
        <div class="partybox">
          <el-form :model="otherlist"  ref="ruleForm" label-width="300px" style="padding: 20px">
            <el-row v-for="item in restList">
              <el-col :span="8"  v-for="(info,key) in item">
                <el-form-item :label=info.name class="title1">
                  <el-input v-model="otherlist[info.prop]" placeholder="请输入"  maxlength="5"
                            @blur="otherlist[info.prop] = $event.target.value"
                            onkeyup='this.value=this.value.replace(/\D/gi,"")'
                            clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="text-center" style="padding: 20px 0">
            <el-button size="medium" type="primary" @click="updateSave">修改数据</el-button>
          </div>
        </div>
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
  </div>
</template>

<script>
    import {
        getPacksetAuto,
        getPacksetList,
        getPacksetListOther,
        getPacksetSave,
        getPacksetSaveOther,
    } from "@/api/backstage/sysset/basic/parkset/parkset.js"

    export default {
        name: "index",
        data() {
            return {
                loading:true,//加载遮罩控制条件
                activeName: 'first',
                list:{
                    id:'',//数据主键
                    sqcdw:"",  //社区/村党委
                    jgdzz:"",  //机关党总支
                    gkdzz:"",  //高科党总支
                    dzb:"",   //党支部
                    fbhds:"",//发布活动数
                    cyrs:"",//参与人数
                    shyk:"",//三会一课
                    mzpydy:"",//民主评议党员
                    zhshh:"",//组织生活会
                    mzshh:"",//民主生活会
                    ztdr:"",//主题党日
                    qthd:"",//其他活动
                    yqjj:"",//园区简介

                },
                //其他数据
                otherlist:{

                },
                //遍历数组对象
                // itemList:[
                //     [{name:'社区/村党委',prop:'sqcdw'}, {name:'机关党总支',prop:'jgdzz'}, {name:'高科党总支',prop:'gkdzz'}],
                //     [{name:'党支部',prop:'dzb'}, {name:'发布活动数',prop:'fbhds'}, {name:'参与人数',prop:'cyrs'}],
                //     [{name:'三会一课',prop:'shyk'}, {name:'民主评议党员',prop:'mzpydy'}, {name:'组织生活会',prop:'zhshh'}],
                //     [{name:'民主生活会',prop:'mzshh'}, {name:'主题党日',prop:'ztdr'}, {name:'其他活动',prop:'qthd'}],
                // ],
                //其他遍历数组
                restList:[
                    [{name:"园区共有企业数",prop:'gyqys'},{name:'非公企业数',prop:'fgqys'}],
                    [{name:'非公企业成立党组织数',prop:'fgqycldzzs'},{name:'单独组建组织数',prop:'ddjldzzs'}],
                    [{name:'已成立联合党组织',prop:'ycllhdzzs'},{name:'园区共有党员数',prop:'gydys'}],
                    [{name:'非公企业党员数',prop:'fgqydys'},{name:'管理岗位数',prop:'glgws'}],
                    [{name:'技术骨干数',prop:'jsggs'},{name:'一线员工',prop:'yxyg'}],
                    [{name:'企业出资人',prop:'qyczr'},{name:'党务工作者',prop:'dwgzz'}],
                    [{name:'非公企业党组织书记',prop:'fgqydzzsj'},{name:'专职党务工作者',prop:'zzdwgzz'}],
                    [{name:'专职党组织书记（不担任公司其他职位）',prop:'zzdzzsj'},{name:'有专职党务工作者的非公企业',prop:'yzzdwgzzdfgqy'}],
                    [{name:'党建指导员',prop:'djgzzdy'},{name:'规上企业',prop:'gsqy'}],
                    [{name:'全省园区就业人数',prop:'yqjyrs'}],
                ]

            }
        },
        mounted() {
            // this.pageDetail ();
            this.otherDetail();
        },
        methods: {
            // handleClick(tab, event) {
            // },
            //园区统计数据接口
            // pageDetail () {
            //     let params = {}
            //     this.loading = true;
            //     getPacksetList(params).then(response => {
            //         const res = response;
            //         this.list.id = res.id
            //         this.list.sqcdw = res.sqcdw,  //社区/村党委
            //             this.list.jgdzz = res.jgdzz,  //机关党总支
            //             this.list.gkdzz = res.gkdzz,  //高科党总支
            //             this.list.dzb = res.dzb,   //党支部
            //             this.list.fbhds = res.fbhds,//发布活动数
            //             this.list.cyrs = res.cyrs,//参与人数
            //             this.list.shyk = res.shyk,//三会一课
            //             this.list.mzpydy = res.mzpydy,//民主评议党员
            //             this.list.zhshh = res.zhshh,//组织生活会
            //             this.list.mzshh = res.mzshh,//民主生活会
            //             this.list.ztdr = res.ztdr,//主题党日
            //             this.list.qthd = res.qthd,//其他活动
            //             this.list.yqjj = res.yqjj  //园区简介
            //     }).finally(() => {
            //         this.loading = false;
            //     });
            // },
            //自动获取数据
            // autoGet(){
            //     this.$confirm('是否自动获取数据?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         let params = {}
            //         this.loading = true;
            //         getPacksetAuto(params).then(response => {
            //             const res = response;
            //             this.list=res
            //
            //         }).finally(() => {
            //             this.loading = false;
            //         });
            //     }).catch(() => {
            //
            //     });
            // },
            //保存数据
            // save(){
            //     let params={
            //         id : this.list.id,
            //         sqcdw : this.list.sqcdw ,  //社区/村党委
            //         jgdzz : this.list.jgdzz,  //机关党总支
            //         gkdzz : this.list.gkdzz,  //高科党总支
            //         dzb : this.list.dzb,   //党支部
            //         fbhds : this.list.fbhds,//发布活动数
            //         cyrs : this.list.cyrs,//参与人数
            //         shyk : this.list.shyk,//三会一课
            //         mzpydy : this.list.mzpydy,//民主评议党员
            //         zhshh : this.list.zhshh,//组织生活会
            //         mzshh : this.list.mzshh,//民主生活会
            //         ztdr : this.list.ztdr,//主题党日
            //         qthd :this.list.qthd,//其他活动
            //         yqjj:this.list.yqjj //园区简介
            //     }
            //
            //     getPacksetSave(params).then(response => {
            //         const res = response;
            //         this.$message(this.successTip())
            //         this.$emit('refresh')
            //         this.$emit('handleSwitch', {name: 'index'})
            //     })
            // },
            //其他数据接口(接口更换)
            otherDetail () {
                let params = {}
                this.loading = true;
                getPacksetListOther(params).then(response => {
                    this.otherlist = response;
                }).finally(() => {
                    this.loading = false;
                });
            },
            //其他修改数据
            updateSave(){
                getPacksetSaveOther(this.otherlist).then(response => {
                    this.$message(this.successTip())
                    this.$emit('refresh')
                    this.$emit('handleSwitch', {name: 'index'})
                })
            }
        }
    }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #fff;
  }
  .partybox{
    padding-top:40px;
  }
  .title1 /deep/ .base-label-box__label{
    width:100px!important;
    margin: 20px;
  }
  .title /deep/ .base-label-box__label{
    width:40px;
  }
</style>
