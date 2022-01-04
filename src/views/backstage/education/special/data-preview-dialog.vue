<template>
  <el-dialog
    title="预览学习资料"
    :visible.sync="visible"
    width="1130px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
    append-to-body
  >
    <div class="p1">{{data.themeName}}</div>

    <el-row class="box">
      <el-col :span="3">
        <span class="label">起止时间</span>
      </el-col>
      <el-col :span="7">
        <span class="value">{{data.startDate | tableEmptyText}} 至 {{data.endDate | tableEmptyText}}</span>
      </el-col>
      <el-col :span="3" :push="1">
        <span class="label">学习范围</span>
      </el-col>
      <el-col :span="9" :push="1">
        <span class="value">{{data.learnType === "2279477819906843021" ? '所有人' : '指定组织'}}</span>
      </el-col>
    </el-row>
    <el-row class="box">
      <el-col :span="3">
        <span class="label">学习组织</span>
      </el-col>
      <el-col :span="21">
        <span class="value">{{data.orgStr.map(item => item.name).join('、')}}</span>
      </el-col>
    </el-row>
    <div style="height: 10px;background: #EEEEEE;"></div>

    <div class="p2">学习资料</div>

    <div class="data-box">
      <div class="data-box-title">书籍</div>

      <div class="book">
        <div class="book-box" v-for="item in bookData" :key="item.fileId">
          <div class="book-box-left">
            <img :src="item.thumbUrl" alt="">
          </div>
          <div class="book-box-right">
            {{item.fileTitle}}
          </div>

          <img v-if="item.requiredRead" class="required" src="@/assets/page/icon-required.png" alt="">
        </div>
      </div>
    </div>

    <div class="data-box">
      <div class="data-box-title">音频</div>

      <div class="book">
        <div class="book-box2" v-for="item in voiceData" :key="item.fileId">
          <div class="book-box-left2">
            <img :src="item.thumbUrl" alt="">
          </div>
          <div class="book-box-right2">
            {{item.fileTitle}}
          </div>

          <img v-if="item.requiredRead" class="required" src="@/assets/page/icon-required.png" alt="">
        </div>
      </div>
    </div>

    <div class="data-box">
      <div class="data-box-title">视频</div>

      <div class="book">
        <div class="book-box3" v-for="item in videoData" :key="item.fileId">
          <div class="book-box-left3">
            <img :src="item.thumbUrl" alt="">
          </div>
          <div class="book-box-right3">
            {{item.fileTitle}}
          </div>

          <span class="time">
            <img src="@/assets/page/icon-play2.png" style="vertical-align: middle;" height="11" width="11" alt="">
            {{item.duration| tableEmptyText}}
          </span>
          <img v-if="item.requiredRead" class="required" src="@/assets/page/icon-required.png" alt="">
        </div>
      </div>
    </div>

    <div class="data-box">
      <div class="data-box-title">其他</div>

      <div class="book">
        <div class="book-box4" v-for="item in otherData" :key="item.fileId">
          <div class="book-box-right4">
            <img v-if="item.requiredRead" class="required1" src="@/assets/page/icon-required.png" alt="">
            {{item.fileTitle}}
          </div>
          <!--<img v-if="item.requiredRead" class="required" src="@/assets/page/icon-required.png" alt="">-->
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        data: {
          orgStr: []
        },
        bookData: [],
        videoData: [],
        voiceData: [],
        otherData: [],
      }
    },
    methods: {
      show (data) {
        this.visible = true
        this.data = data

        this.bookData = []
        this.videoData = []
        this.voiceData = []
        this.otherData = []

        data.fileStr.forEach(item => {
          switch (item.fileType) {
            // 书籍
            case '1295281197470973952':
              this.bookData.push(item)
              break

            // 其他
            case '1295281394175442944':
              this.otherData.push(item)
              break

            // 视频音频
            case '1295281048032116736':
              item.addType === '2297065814069249126' && this.videoData.push(item)
              item.addType === '2297065814069250336' && this.voiceData.push(item)
              break
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .p1 {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
  }

  .p2 {
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    padding: 20px 0 0 20px;
  }

  .box {
    padding: 16px 0;
    border-bottom: 1px solid #F3F3F3;
  }

  .label {
    padding-left: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .value {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
  }

  /deep/ .el-dialog__body {
    padding: 0;
    padding-bottom: 20px;
  }


  .data-box {
    margin-top: 20px;
    border-top: 1px solid #EEEEEE;

    .data-box-title {
      padding: 16px 0 0 20px;
    }
  }

  .book {
    display: flex;
    flex-wrap: wrap;
  }

  .book-box {
    position: relative;
    display: flex;
    width: 257px;
    height: 159px;
    border: 1px solid #EEEEEE;
    background: #fff;
    padding: 16px;
    margin-left: 20px;
    margin-top: 10px;

    .book-box-left {
      width: 90px;
      height: 127px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .book-box-right {
      margin-left: 10px;
      flex: 1;
      font-size: 16px;
      line-height: 27px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .book-box2 {
    position: relative;
    display: flex;
    width: 257px;
    height: 90px;
    border: 1px solid #EEEEEE;
    background: #fff;
    padding: 16px;
    margin-left: 20px;
    margin-top: 10px;

    .book-box-left2 {
      width: 57px;
      height: 57px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .book-box-right2 {
      margin-left: 10px;
      flex: 1;
      font-size: 16px;
      line-height: 27px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .book-box3 {
    position: relative;
    width: 257px;
    height: 185px;
    border: 1px solid #EEEEEE;
    background: #fff;
    margin-left: 20px;
    margin-top: 10px;

    .book-box-left3 {
      width: 257px;
      height: 144px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .book-box-right3 {
      padding: 0 10px;
      font-size: 16px;
      line-height: 40px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .book-box4 {
    position: relative;
    width: 257px;
    height: 79px;
    border: 1px solid #EEEEEE;
    background: #fff;
    margin-left: 20px;
    margin-top: 10px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

    .book-box-right4 {
      height: 100%;
      padding: 0 10px;
      font-size: 16px;
      line-height: 40px;
      color: #333333;
      //overflow: hidden;
      //text-overflow: ellipsis;
    }
  }

  .required1 {
    /*position: absolute;*/
    top: 0;
    left: 12px;
    width: 28px;
    height: 33px;
  }

  .required {
    position: absolute;
    top: 0;
    left: 12px;
    width: 28px;
    height: 33px;
  }

  .time {
    position: absolute;
    right: 10px;
    top: 10px;
    background: rgba(0, 0, 0, 0.6);
    padding: 5px 10px;
    font-size: 12px;
    color: #fff;
    border-radius: 11px;
  }
</style>
