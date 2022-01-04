<template>
  <div style="height: 100%;background:#eee">
    <div class="logo-top">
      <div class="logotxt">
        <!--        <img src="@/assets/page/icon-logo.png">-->
        <span>{{orgName}}</span>
      </div>
      <div>
        <base-label-box label="选择党组织" style="margin-bottom: 0;">
          <el-select v-model='orgCode' @change="selectChange" placeholder="请输入或选择" style="width: 360px">
            <el-option v-for="(item, index) in list" :key="index" :label="item.name" :value="item.code"/>
          </el-select>
        </base-label-box>
        <!-- 选择年份 -->
        <div class="year">
          <i class="iconfont icon-xingzhuang1357kaobei lt" @click="yearEdit(1)"/>
          <el-date-picker
            v-model="year"
            :editable="false"
            type="year"
            format="yyyy"
            value-format="yyyy"
            @change="pageChange"
            :picker-options="pickerOptions"
            :clearable="false">
          </el-date-picker>
          <div class="year-text">年</div>
          <i class="iconfont icon-xingzhuang1357 gt" @click="yearEdit(2)"/>
        </div>
      </div>
    </div>

    <div class="view">
      <div class="view-box" v-loading="leftLoading">
        <div class="view-box-top">
          <p class="p1">{{year}}年度党员政治体检</p>
          <p class="p2">{{orgName}}</p>
          <div class="p3">
            <el-rate :value="leftData.score" disabled text-color="#ff9900"/>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-01.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">组织生活</p>
            <p class="p5">
              <span class="view-blue">{{leftData.shyk && leftData.shyk.num}}</span>
              名党员按期参加“三会一课”，
              <span class="view-red">{{leftData.shyk && (leftData.shyk.totalNum - leftData.shyk.num)}}</span>
              名党员未按期参加“三会一课”
            </p>
            <p class="p5">
              <span class="view-blue">{{leftData.zzshh && leftData.zzshh.num}}</span>
              名党员按期参加组织生活会，
              <span class="view-red">{{leftData.zzshh && (leftData.zzshh.totalNum -leftData.zzshh.num)}}</span>
              名党员未按期参加组织生活会
            </p>
            <p class="p5">
              <span class="view-blue">{{leftData.mzshh && leftData.mzshh.num}}</span>
              名党员按期参加民主生活会，
              <span class="view-red">{{leftData.mzshh && (leftData.mzshh.totalNum -leftData.mzshh.num)}}</span>
              名党员未按期参加民主生活会
            </p>
            <p class="p5">
              <span class="view-blue">{{leftData.ztdr && leftData.ztdr.num}}</span>
              名党员按期参加主题党日，
              <span class="view-red">{{leftData.ztdr && (leftData.ztdr.totalNum -leftData.ztdr.num)}}</span>
              名党员未按期参加主题党日
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-02.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">党费缴纳</p>
            <p class="p5">
              按期缴费
              <span class="view-blue">{{leftData.payNum}}</span>
              个，未按期缴费
              <span class="view-red">{{leftData.memberNum}}</span>
              个
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-03.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">奖励记录</p>
            <p class="p5">
              记录
              <span class="view-blue">{{leftData.memberPrizeList ? leftData.memberPrizeList.length : 0}}</span>
              条
            </p>
            <p class="p5" v-for="(item, index) in leftData.instructions" :key="index">
              {{item.instructions}}
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-04.png" width="53" height="53" alt="">
          <div class="view-item-right" style="border-bottom: none;">
            <p class="p4">违法违纪记录</p>
            <p class="p5">
              记录
              <span class="view-red">{{leftData.memberPunishList ? leftData.memberPunishList.length : 0}}</span>
              条
            </p>
          </div>
        </div>
      </div>

      <div class="view-box ml-20" v-loading="rightLoading">
        <div class="view-box-top">
          <p class="p1">{{year}}年度党组织政治体检</p>
          <p class="p2">{{orgName}}</p>
          <div class="p3">
            <el-rate :value="rightData.score" disabled text-color="#ff9900"/>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-05.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">组织生活</p>
            <p class="p5">
              三会一课：在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，未能按期的有
              <span class="view-red">{{rightData.orgNum - rightData.mettingNum}}</span>
              个
            </p>
            <p class="p5">
              组织生活会：在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，未能按期的有
              <span class="view-red">{{rightData.orgNum - rightData.orgLifeNum}}</span>
              个
            </p>
            <p class="p5">
              民主评议党员：在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，未能按期的有
              <span class="view-red">{{rightData.orgNum - rightData.democraticAppraisalNum}}</span>
              个
            </p>
            <p class="p5">
              主题党日：在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，未能按期的有
              <span class="view-red">{{rightData.orgNum - rightData.themeParkNum}}</span>
              个
            </p>
            <p class="p5">
              民主生活会：在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织 中，未能按期的有
              <span class="view-red">{{rightData.orgNum - rightData.democraticLifeNum}}</span>
              个
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-06.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">组织设置</p>
            <p class="p5">
              本级组织设置合理在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，组织设置合理的有
              <span class="view-blue">{{rightData.reaNum}}</span>
              个
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-07.png" width="53" height="53" alt="">
          <div class="view-item-right">
            <p class="p4">队伍建设</p>
            <p class="p5">
              <!--本级队伍建设健全-->
              本级队伍建设健全在所属党组织中，队伍健全的有
              <span class="view-blue">{{rightData.saneNum}}</span>
              <!--在所属党组织中，队伍健全的有-->
              个，不健全的有
              <span class="view-red">{{rightData.orgNum - rightData.saneNum}}</span>
              个
            </p>
          </div>
        </div>

        <div class="view-item">
          <img src="@/assets/page/icon-special-08.png" width="53" height="53" alt="">
          <div class="view-item-right" style="border-bottom: none;">
            <p class="p4">党费管理</p>
            <p class="p5">
              在所属的
              <span class="view-blue">{{rightData.orgNum}}</span>
              个党组织中，能够按期缴纳党费的党组织有
              <span class="view-blue">{{rightData.payNum}}</span>
              个
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonReq from '@/api/public/commonReq'
  import {getComprehensiveParty, getComprehensiveOrg} from '@/api/backstage/statistical/analysis/comprehensive/index.js'

  export default {
    data () {
      return {
        list: [],//党组织下拉框
        orgName: '',//组织名称
        orgCode: '',//组织编码
        year: '',
        pickerOptions: {
          disabledDate (time) {
            if (new Date().getFullYear() + 1 <= time.getFullYear()) {
              return true
            }
            return false
          }
        },
        leftLoading: false,
        rightLoading: false,
        leftData: {},
        rightData: {},
      }
    },
    mounted () {
      this.year = new Date().getFullYear() + ''
      commonReq.getOrglist().then(res => {
        this.list = res
        this.orgCode = res[0].code
        this.orgName = res[0].name
        this.pageChange()
      })
    },
    methods: {
      // 计算星级展示
      getScore(resScore){
        let score = Number(resScore)
        if(score < 10){
          score = 0
        }else if(score < 20){
          score = 0.5
        }else if(score === 20){
          score = 1
        }else if(score > 20 && (score < 40)){
          score = 1.5
        }else if(score === 40){
          score = 2
        }else if(score > 40 && score < 60){
          score = 2.5
        }else if(score === 60){
          score = 3
        }else if(score > 60 && score < 80){
          score = 3.5
        }else if(score === 80){
          score = 4
        }else if(score > 80 && score < 100){
          score = 4.5
        }else if(score === 100 || score > 100 ){
          score = 5
        }
        return score > 5 ? 5 : score
      },

      // 调用数据接口
      pageChange () {
        this.leftLoading = true
        getComprehensiveParty({
          year: this.year,
          orgCode: this.orgCode
        }).then(res => {
          this.leftData = res
          // let score = Number(res.score) / 20
          //
          // score = score.toFixed(1)
          // let decimal = parseInt(score.toString().split('.')[1])
          // let integer = parseInt(score)
          // if(decimal === 0){
          //   score = integer
          // }else if((decimal > 0 && decimal < 5) || (decimal === 5)){
          //   score = integer + 0.5
          // }else if( decimal > 5){
          //   if(integer < 5){
          //     score = integer + 1
          //   }else{
          //     score = 5
          //   }
          // }

          // this.leftData.score = score < 10 ? 0 : score
          this.leftData.score = this.getScore(res.score)


          let totalNumTemp = 0
          let numTemp = 0
          res.list.forEach(item => {
            switch (item.meetingType) {
              case '1294085523039584256':
                this.leftData.zzshh = item
                break

              case '1294086001332846592':
                this.leftData.mzshh = item
                break

              case '1294086064859774976':
                this.leftData.ztdr = item
                break

              case '1294085700764827648':
                totalNumTemp += item.totalNum
                numTemp += item.num
                break

              case '1249946782658461696':
                totalNumTemp += item.totalNum
                numTemp += item.num
                break

              case '1249946834005131264':
                totalNumTemp += item.totalNum
                numTemp += item.num
                break

              case '1294085454810841088':
                totalNumTemp += item.totalNum
                numTemp += item.num
                break
            }
          })
          this.leftData.shyk = {totalNum: totalNumTemp, num: numTemp}

          this.leftData.instructions = res.memberPrizeList.filter((v, i) => (i < 3))
        }).finally(() => {
          this.leftLoading = false
        })

        this.rightLoading = true
        getComprehensiveOrg({
          year: this.year,
          orgCode: this.orgCode
        }).then(res => {
          this.rightData = res
          // let score = Number(res.score) / 20
          // // this.rightData.score = score < 10 ? 0 : score
          // score = score.toFixed(1)
          // let decimal = parseInt(score.toString().split('.')[1])
          // let integer = parseInt(score)
          // if(decimal === 0){
          //   score = integer
          // }else if((decimal > 0 && decimal < 5) || (decimal === 5)){
          //   score = integer + 0.5
          // }else if( decimal > 5){
          //   if(integer < 5){
          //     score = integer + 1
          //   }else{
          //     score = 5
          //   }
          // }

          this.rightData.score = this.getScore(res.score)
        }).finally(() => {
          this.rightLoading = false
        })
      },
      //选择党组织
      selectChange (value) {
        if (value) {
          this.list.forEach(item => {
            if (item.code === value) {
              this.orgName = item.name
              this.orgCode = item.code
            }
          })
        }
        this.pageChange()
      },
      yearEdit (t) {
        if (t === 1) {
          this.year = parseInt(this.year) - 1 + ''
        } else {
          this.year = parseInt(this.year) + 1 + ''
        }
        this.pageChange()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main{
    background:#eee!important;
  }
  .logo-top {
    width:100%;
    margin-left:0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logotxt {
    display: flex;
    align-items: center;
    line-height: 36px;
    font-size: 16px;
    color: #7D7D7D;
  }

  .logotxt img {
    width: 21px;
    height: 17px;
    margin-right: 8px;
  }

  .title {
    display: block;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #646464;
  }

  .year {
    width: 100px;
    float: right;
    background-color: #fff;
  }

  .lt, .gt {
    height: 36px;
    width: 15px;
    padding: 10px 0;
    display: inline-block;
    cursor: pointer;
    float: left;
  }

  .year /deep/ .el-input__inner {
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    width: 38px;
    display: inline-block;
    font-size: 16px;
  }

  .year /deep/ .el-icon-date::before {
    content: "";
  }

  .year /deep/ .el-date-editor--year {
    width: 38px;
    float: left;
    margin-left: 7px;
  }

  .year-text {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    width: 16px;
    float: left;
    margin-right: 7px;
    cursor: pointer;
  }

  .view {
    min-height: calc(100vh - 169px);
    margin-top: 20px;
    display: flex;

    .view-box {
      flex: 1;
      background: #fff;
      border-radius: 2px;
    }

    .view-box-top {
      padding: 0 20px 40px 20px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;

      .p1 {
        margin-top: 80px;
        font-size: 30px;
        font-weight: bold;
        color: #555555;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .p2 {
        margin-top: 20px;
        font-size: 18px;
        color: #666666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .p3 {
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }

    .view-item {
      padding-top: 30px;
      padding-left: 40px;
      display: flex;

      .view-item-right {
        flex: 1;
        margin-left: 20px;
        border-bottom: 1px solid #EEEEEE;
      }

      .p4 {
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #666666;
      }

      .p5 {
        margin-bottom: 20px;
        font-size: 14px;
        color: #666666;
      }
    }

    .view-blue {
      color: #3D9EFF;
      font-weight: bold;
    }

    .view-red {
      color: #FC5921;
      font-weight: bold;
    }
  }

  /deep/ .el-rate__icon {
    font-size: 50px;
  }
</style>
