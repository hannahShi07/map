<template>
  <el-button class="page-btn" :type="type" :loading="loading" :disabled="disabled" @click="handleClick">
    <div class="page-btn-wrap">
      <!--<img v-if="imgUrl" :src="imgUrl" alt="">-->
      <i v-if="imgUrl" :class="imgUrl" alt=""/>
      <span>{{title}}</span>
    </div>
  </el-button>
</template>

<script>
    export default {
        name: 'BasePageButton',
        props: {
            // el-button的type
            type: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            // add:新增  import:导入 export:导出 search:查询 reset:重置 flow:流入 outflow:流出  statistics:导出统计表
            // download:报到模板下载  process:查看流程  delete:批量删除  read:已读 reserve:预约会议 putin:投放 revoke:撤销
            imgType: {
                type: String,
                default: ''
            },
            loading: Boolean,
            disabled: Boolean,
        },
        computed: {
            imgUrl () {
                let url = ''

                switch (this.imgType) {
                    case 'add':
                        // url = require(`@/assets/page/icon-plus2.png`)
                        url = 'iconfont icon-xinzeng'
                        break

                    case 'import':
                        // TODO 图标未找到 后面替换
                        // url = require(`@/assets/page/icon-import.png`)
                        url = 'iconfont icon-daoru'
                        break

                    case 'export':
                        // url = require(`@/assets/page/icon-export.png`)
                        url = 'iconfont icon-daochu'
                        break

                    case 'search':
                        // url = require(`@/assets/page/icon-serach.png`)
                        url = 'iconfont icon-chaxun'
                        break

                    case 'reset':
                        // url = require(`@/assets/page/icon-reset.png`)
                        url = 'iconfont icon-zhongzhi'
                        break

                    case 'flow':
                        // url = require(`@/assets/page/icon-flow.png`)
                        url = 'iconfont icon-xinzengliuru'
                        break

                    case 'outflow':
                        // url = require(`@/assets/page/icon-outflow.png`)
                        url = 'iconfont icon-xinzengliuchu'
                        break

                    case 'statistics':
                        // url = require(`@/assets/page/icon-statistics.png`)
                        url = 'iconfont icon-daochutongjibiao'
                        break

                    case 'download':
                        // url = require(`@/assets/page/icon-download.png`)
                        url = 'iconfont icon-baodaomobanxiazai'
                        break

                    case 'process':
                        url = 'iconfont icon-lujing287'
                        break

                    case 'delete':
                        url = 'iconfont icon-shanchu'
                        break

                    case 'read':
                        url = 'iconfont icon-yidu'
                        break

                    case 'reserve':
                        url = 'iconfont icon-yuyuehuiyi'
                        break

                    case 'putin':
                        url = 'iconfont icon-toufang'
                    break

                    case 'revoke':
                        url = 'iconfont icon-chexiao1'
                    break


                }

                return url
            }
        },
        created () {
        },
        methods: {
            handleClick (e) {
                this.$emit('click', e)
            }
        }
    }
</script>

<style lang="scss" scoped>
  .page-btn {
    min-width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    font-size: 16px;
    padding: 0 20px;
  }

  .page-btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .page-btn img {
    width: 17px;
    height: 17px;
  }

  .page-btn span {
    padding-left: 3px;
  }
</style>
