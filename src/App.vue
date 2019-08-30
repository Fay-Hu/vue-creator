<template>
  <div id="app" class="app">
    <!-- 返回顶部 -->
    <back-to-top>
      <mu-button fab small color="teal">
        <mu-icon value="arrow_upward"></mu-icon>
      </mu-button>
    </back-to-top>

    <!-- 可缓存路由 -->
    <keep-alive>
      <router-view v-if="keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!keepAlive"></router-view>
  </div>
</template>

<script>
  import BackToTop from 'vue-backtotop'

  export default {
    name: 'app',
    components: {
      BackToTop
    },

    computed: {
      keepAlive() {
        return this.$route.meta.keepAlive
      }
    }
  }
</script>
