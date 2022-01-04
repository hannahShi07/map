<template>
  <el-dialog
    :title="title"
    width = '900px'
    :visible.sync="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="close"
    v-if="visible"
    v-cloak>
    <el-form ref="refForm" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item class="information-content" label="内容展示" prop="">
            <div v-html="isEmpty(formData.parkContent)"></div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="close">知道了</el-button>
    </div>
  </el-dialog>
</template>

<script>
import commonReq  from "@/api/public/commonReq.js"
import {getpageDetail} from "@/api/backstage/sysset/bigscreen/homepage/introduction/introduction.js"
export default {
  name: "instroduction-detail",
  data() {
    return {
      visible: false,
      loading: false,
      title: "详情",
      formData: {}
    }
  },
  methods: {
    close() {
      this.$emit('refresh')
      this.visible = false;
    },
    show(row) {
      this.visible = true;
      this.getDetail(row.id);
    },
    //获取详情
    getDetail(id) {
      let params = {
        id: id
      }
      getpageDetail(params).then(response => {
        this.formData = response
      })
    },
  }
}
</script>

<style scoped>
.information-content div{
  height:400px;
  overflow:auto;
  border:1px solid #ccc;
  padding:0px 15px;
}
</style>
