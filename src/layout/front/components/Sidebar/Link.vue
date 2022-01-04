<template>
  <component :is="type" v-bind="linkProps(to)" @click.native="backCurHome">
    <slot/>
  </component>
</template>

<script>
import {isExternal} from '@/utils/my-validate'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(to) {
      if (this.isExternal) {
        return {
          // is: 'a',
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        // is: 'router-link',
        to: to
      }
    },
    backCurHome(){
      window.location.href = "#" + this.to + "?''"
    }
  }
}
</script>
