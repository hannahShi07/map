<template>
  <div class="collection-alert">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="close"
      v-if="visible"
      v-cloak>
      <div class="alert-left">
        <img src="../../../../../../assets/page/icon-warning.png" />
      </div>
      <div class="alert-right">
        {{tableData.collectionDate}}年{{tableData.collectionQuarter | collectionQuarter}}，共{{tableData.list.length}}名党员，未缴清{{state}}名。缴纳总额{{tableData.totalAmount}}元，是否确认保存？
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:right">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "CollectionAlert",
    components: {
      
    },
    data() {
      return {
        title:"提示",
        visible:false,
        state:0,
        tableData:{}
      }
    },
    mounted() {
      
    },
    computed: {
      
    },
    methods: {
      show(data,state){
        this.tableData = data;
        this.state = state;
        this.visible = true;
      },
      close(){
        this.visible = false;
      },
      save(){
        this.$emit('saveAdd')
        this.visible = false;
      }
    },
    filters :{
      collectionQuarter(val){
        switch(val){
          case "2246476837383406026":
            return "第一季度";
            break;
          
          case "2246476837383406029":
            return "第二季度";
            break;

          case "2246476837383406032":
            return "第三季度";
            break;

          case "2246476837383406035":
            return "第四季度";
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .collection-alert >>> .el-dialog{
    margin-top: 30vh !important;
    width: 400px !important;
  }
  .alert-left{
    float: left;
    height: 66px;
    width:66px;
    padding: 10px;
  }
  .alert-left img{
    height: 46px;
    width:46px;
  }
  .alert-right{
    width: calc(100% - 66px);
    font-size: 16px;
    line-height: 30px;
    float: left;
  }
</style>
