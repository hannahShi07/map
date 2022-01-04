<template>
  <div class="party" v-show="visible">
    <el-tabs v-model="activeName">
      <el-tab-pane label="奖项申报" name="1" v-cloak >
        <div class="mr-20 ml-20">
          <div class="list-content" @click="provinceDouAdd">
            <img src="../../../../../../assets/page/awards_1.png">
            <div class="list-title">
              省级“双强六好”非公企业党组织
            </div>
          </div>
          <div class="list-content" @click="cityDouAdd">
            <img src="../../../../../../assets/page/awards_2.png">
            <div class="list-title">
              市级“双强六好”非公企业党组织
            </div>
          </div>
          <div class="list-content" @click="prosocialAdd">
            <img src="../../../../../../assets/page/awards_3.png">
            <div class="list-title">
              全省社会组织党建工作示范点
            </div>
          </div>
          <div class="list-content" @click="socialOrgAdd">
            <img src="../../../../../../assets/page/awards_4.png">
            <div class="list-title">
              全市社会组织党建工作示范点
            </div>
          </div>
          <div class="list-content" @click="socialNonAdd">
            <img src="../../../../../../assets/page/awards_5.png">
            <div class="list-title">
              全市非公企业党建工作示范点
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import '@/styles/party-common.scss' //  内容公告样式 css
    import {getNonSubmit,getDelete} from "@/api/backstage/party/priority/awards/awards.js"
    export default {
        name: "Index",
        props:{
         type:{
             type: String,
             default: ''
         }
        },
        data() {
            return {
                activeName: '1',//tab切换
                submitId:'',//继续未提交的表单id
                visible:false,
            }
        },
        mounted(){
            if(this.type != 1){
                this.getSubmit();
            }else {
                this.visible = true
            }
        },
        methods: {
            //省级“双强六好”非公企业党组织跳转
            provinceDouAdd () {
                this.$emit('handleSwitch', {name: 'ProDouAdd',type:"1257876784100147200"})  //新增
            },
            //市级“双强六好”非公企业党组织跳转
            cityDouAdd () {
                this.$emit('handleSwitch', {name: 'ProDouAdd',type:"1257876894578114560"})  //新增
            },
            // 全省社会组织党建工作示范点跳转
            prosocialAdd(){
                this.$emit('handleSwitch', {name: 'prosocialAdd',type:"2279092149023375366"})  //新增
            },
            // 全市社会组织党建工作示范点跳转
            socialOrgAdd(){
                this.$emit('handleSwitch', {name: 'socialOrgAdd',type:"2279092149023375369"})  //新增
            },
            // 全市非公企业党建工作示范点跳转
            socialNonAdd(){
                this.$emit('handleSwitch', {name: 'socialNonAdd',type:"2279092149023375372"})  //新增
            },
            //判断是否有未提交申请
            async getSubmit() {
                let params = {}
                await getNonSubmit(params).then(response => {
                    const res = response;
                    if (res === null) {
                        // this.$emit('refresh')
                        this.visible = true
                    } else {
                        this.visible = false
                        if (res.isSubmit == '否') {
                            this.$confirm('您有未填写完成的【' + res.declareAwards.data + '】申请选择继续填写还是重置表单。', '提示', {
                                confirmButtonText: '继续',
                                cancelButtonText: '重置',
                                closeOnClickModal: false,
                                closeOnPressEscape:false,
                                type: 'warning'
                            }).then(() => {
                                //省级“双强六好”非公企业党组织
                                if (res.declareAwards.key == '1257876784100147200') {
                                    this.$emit('handleSwitch', {name: 'proDouAdd', params: res, type: "1257876784100147200"
                                    }) //编辑
                                }
                                //市级“双强六好”非公企业党组织跳转
                                if (res.declareAwards.key == '1257876894578114560') {
                                    this.$emit('handleSwitch', {name: 'proDouAdd', params: res, type: "1257876894578114560"
                                    })  //编辑
                                }
                                // 全省社会组织党建工作示范点
                                if (res.declareAwards.key == '2279092149023375366') {
                                    this.$emit('handleSwitch', {name: 'prosocialAdd', params: res, type: "2279092149023375366"
                                    })  //编辑
                                }
                                // 全市社会组织党建工作示范点
                                if (res.declareAwards.key == '2279092149023375369') {
                                    this.$emit('handleSwitch', {name: 'socialOrgAdd', params: res, type: "2279092149023375369"
                                    })  //编辑
                                }
                                // 全市非公企业党建工作示范点
                                if (res.declareAwards.key == '2279092149023375372') {
                                    this.$emit('handleSwitch', {name: 'socialNonAdd', params: res, type: "2279092149023375372"
                                    })  //编辑
                                }
                            }).catch(() => {
                                let params = {}
                                getDelete(params).then(response => {
                                    // const res = response;
                                    // this.$emit('refresh')

                                  //省级“双强六好”非公企业党组织
                                  if (res.declareAwards.key == '1257876784100147200') {
                                    this.$emit('handleSwitch', {name: 'proDouAdd',  type: "1257876784100147200"})
                                  }
                                  //市级“双强六好”非公企业党组织跳转
                                  if (res.declareAwards.key == '1257876894578114560') {
                                    this.$emit('handleSwitch', {name: 'proDouAdd',  type: "1257876894578114560"
                                    })  //编辑
                                  }
                                  // 全省社会组织党建工作示范点
                                  if (res.declareAwards.key == '2279092149023375366') {
                                    this.$emit('handleSwitch', {name: 'prosocialAdd', type: "2279092149023375366"})
                                  }
                                  // 全市社会组织党建工作示范点
                                  if (res.declareAwards.key == '2279092149023375369') {
                                    this.$emit('handleSwitch', {name: 'socialOrgAdd', type: "2279092149023375369"})
                                  }
                                  // 全市非公企业党建工作示范点
                                  if (res.declareAwards.key == '2279092149023375372') {
                                    this.$emit('handleSwitch', {name: 'socialNonAdd', type: "2279092149023375372"})
                                  }
                                    this.$message(this.successTip())
                                })
                            });
                        }
                        else {
                            //省级“双强六好”非公企业党组织
                            if (res.declareAwards.key == '1257876784100147200') {
                                this.$emit('handleSwitch', {name: 'ProDouDetail', params: res, type: "1257876784100147200"})  //详情
                            }
                            //市级“双强六好”非公企业党组织跳转
                           else if (res.declareAwards.key == '1257876894578114560') {
                                this.$emit('handleSwitch', {name: 'ProDouDetail', params: res, type: "1257876894578114560"})  //详情
                            }
                            // 全省社会组织党建工作示范点
                            else if (res.declareAwards.key == '2279092149023375366') {
                                this.$emit('handleSwitch', {name: 'prosocialDetail', params: res, type: "2279092149023375366"})  //详情
                            }
                            // 全市社会组织党建工作示范点
                            else if (res.declareAwards.key == '2279092149023375369') {
                                this.$emit('handleSwitch', {name: 'socialOrgDetail', params: res, type: "2279092149023375369"})  //详情
                            }
                            // 全市非公企业党建工作示范点
                            else if(res.declareAwards.key == '2279092149023375372') {
                                this.$emit('handleSwitch', {name: 'socialNonDetail', params: res, type: "2279092149023375372"})  //详情
                            }
                        }
                    }
                })
            },
        }
    }
</script>

<style scoped>
  .party {
    height: 100%;
    background: #fff;
  }
  .list-content {
    position: relative;
    /*width: 33%;*/
    margin-right: 20px;
    margin-bottom: 20px;
    display: inline-block;
  }
  .list-title {
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 30px;
    left: 30px;
  }
</style>
