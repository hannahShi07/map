<template>
  <div class="audio-aplayer" v-if="visible">
    <aplayer autoplay :music="music"/>

    <div class="audio-close" @click="hide"><i class="el-icon-close"></i></div>
  </div>
</template>

<script>
  import Aplayer from 'vue-aplayer'

  export default {
    components: {
      Aplayer
    },
    data () {
      return {
        visible: false,
        music: {
          title: '音频标题',
          artist: '音频人',
          src: 'https://audio04.dmhmusic.com/71_53_T10054987956_128_4_1_0_sdk-cpm/cn/0207/M00/D1/B9/ChR47F7ofAuAWtZVAC_YVWgFgQE608.mp3?xcode=a289f1d80ccb17d877b32a7735cc188604e8d16',
          pic: ''
        }
      }
    },
    methods: {
      show (music) {
        this.music = music
        this.visible = true
      },
      hide () {
        this.visible = false
      }
    }
  }
</script>

<style scoped>
  .audio-aplayer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 200px;
    height: 74px;
    background: #fff;
    text-align: center;
    box-shadow: 3px -2px 4px rgba(0, 0, 0, 0.11);
    animation: audioFade ease 0.6s;
  }

  .audio-close {
    position: absolute;
    right: 50%;
    top: -30px;
    background: #fff;
    padding: 5px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
  }

  @keyframes audioFade {
    from {
      bottom: -50px;
    }

    to {
      bottom: 0;
    }
  }
</style>
