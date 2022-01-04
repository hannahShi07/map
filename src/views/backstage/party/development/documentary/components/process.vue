<template>
  <div class="history-detail">
    <el-tabs v-model="activeName" style="margin-bottom: 80px;">
      <el-tab-pane label="发展流程" name="1" style="background-color: #EEEEEE">
        <history-detail-tab-flow :params="params"  @changePro="changePro"/>

        <first v-if="code === 0" />
        <second v-if="code === 1"/>
        <third v-if="code === 2" />
        <fourth v-if="code === 3" />
        <fifth v-if="code === 4"/>
      </el-tab-pane>
    </el-tabs>
    <div class="text-center bg-fff mt-20 pt-20 pb-20 fexid-clas">
      <el-button @click="goBtn" class="page-btn page-btn-hollow">返回</el-button>
    </div>
  </div>
</template>

<script>
  import HistoryDetailTabFlow from '../../../basic/history/components/history-detail-tab-flow'
  import First from './first'
  import Second from './second'
  import Third from "./third";
  import Fourth from './fourth'
  import Fifth from './fifth'

  export default {
    name: "Process",
    components:{
      HistoryDetailTabFlow,
      First,
      Second,
      Third,
      Fourth,
      Fifth
    },
    data(){
      return{
        activeName:'1',
        params:{

        },
        code:0
      }
    },
    methods:{
      //点击事件回调
      changePro(val){
        this.code = val
      },
      //返回
      goBtn () {
        this.$emit('handleSwitch', {name: 'Index'})
      }
    }
  }
</script>

<style scoped>
  .fexid-clas {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 0;
    background: #fff;
    left:200px;
    z-index:6;
    overflow:visible;
  }
</style>
