<template>
  <a class="base-table-a" :class="[`base-table-a__${type}`,{disabledBtn:disabled}]" @click="handleClick">
    <div class="base-table-a-wrap ">
      <!--<img class="base-table-a__icon" :src="imgUrl" alt="">-->
      <i class="base-table-a__icon" :class="imgUrl" />
      <span class="base-table-a__text">
        <slot>详情</slot>
      </span>
    </div>
  </a>
</template>

<script>
  export default {
    name: 'BaseTableA',
    props: {
      // remove:移出历史人员库 audit:审核  detail: 详情 delete:删除 backout:党员迁移 backout2:撤销 edit: 编辑 add:新增  summary:纪要    exp: 导出  down:下载
      //stop: 停用 start: 启用   finish：完成 manage:管理 copy:复制邀请
      type: {
        type: String,
        default: 'detail'
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      imgUrl () {
        let url = ''

        switch (this.type) {
          case 'detail':
            url = 'iconfont icon-xiangqing'
            break

          case 'summary':
            url = 'iconfont icon-jiyao'
            break

          case 'exp':
            url = 'iconfont icon-daochu'
            break

          case 'delete':
            url = 'iconfont icon-shanchu'
            break

          case 'audit':
            url = 'iconfont icon-shenhe'
            break

          case 'backout':
            url = 'iconfont icon-dangyuanqianyi'
            break

          case 'backout2':
            url = 'iconfont icon-chexiao'
            break

          case 'edit':
            url = 'iconfont icon-bianji'
            break

          case 'add':
            url = 'iconfont icon-xinzengxiaji'
            break

          case 'down':
            url = 'iconfont icon-xiazai'
            break

          case 'remove':
            url = 'iconfont icon-yichulishirenyuanku'
            break

          case 'stop':
            url = 'iconfont icon-tingyong'
            break

          case 'start':
            url = 'iconfont icon-qiyong'
            break

          case 'finish':
            url = 'iconfont icon-wancheng'
            break

          case 'manage':
            url = 'iconfont icon-guanli'
            break

          case 'copy':
            url = 'iconfont icon-fuzhiyaoqing'
            break
        }

        return url
      }
    },
    created () {
      // this.imgUrl = require(`@/assets/page/icon-${this.type}.png`)
    },
    methods: {
      handleClick (e) {
        if(this.disabled){
          return
        }
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-table-a {
    display: inline-block;
    cursor: pointer;
    margin-right: 30px;
    color: #53A0FF;

    &:last-child {
      margin-right: 0;
    }

    .base-table-a__icon {
      width: 14px;
      height: 14px;
      margin-right: 7px;
    }

    .base-table-a__text {
      font-size: 14px;
    }
  }

  .base-table-a-wrap {
    display: flex;
    align-items: center;
    line-height: 17px;
  }

  .base-table-a__detail {
    color: #53A0FF;
  }

  .base-table-a__exp {
    color: #53A0FF;
  }

  .base-table-a__delete {
    color: #ED3C3C;
  }

  .base-table-a__audit {
    color: #53A0FF;
  }
  .base-table-a__reset {
    color: #53A0FF;
  }
  .base-table-a__resetse {
    color: #53A0FF;
  }
  .base-table-a__summary {
    color: #53A0FF;
  }


  .base-table-a__backout {
    color: #53A0FF;
  }

  .base-table-a__edit {
    color: #53A0FF;
  }

  .base-table-a__add {
    color: #53A0FF;
  }
  .base-table-a__stop {
    color: #FC5921;
  }
  .base-table-a__manage {
    color: #53A0FF;
  }

  .base-table-a__copy {
    color: #53A0FF;
  }


  .disabledBtn {
    cursor: not-allowed;
    i.base-table-a__icon,.base-table-a__text{
      color:#999;
    }
  }
</style>
