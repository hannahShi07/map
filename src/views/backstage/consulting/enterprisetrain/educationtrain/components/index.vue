<template>
  <div style="height:100%;">
    <iframe src="https://www.zhikefang.com/publicity/#/publicity" id="mobsf" scrolling="no" frameborder="0" />
  </div>

</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
      }
    },
    mounted(){
      /**
       * iframe-宽高自适应显示
       */
      function changeMobsfIframe(){
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        // console.log(document.getElementsByClassName('app-main-wrap')[0].scrollHeight)
        mobsf.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = document.getElementsByClassName('app-main-wrap')[0].scrollHeight-40 + 'px'; //数字是页面布局高度差
      }

      changeMobsfIframe()

      window.onresize = function(){
        changeMobsfIframe()
      }
    }
  }
</script>

<style scoped>

</style>
