<template>
  <div class="container">
    <h2 class="text-center mt-4">Home</h2>

    <div class="text-center">
      <app-input placeholder="placeholder" v-model="input"/>
      <div class="mt-2">input: {{input}}</div>

      <mu-button color="secondary" class="mt-4" @click="input = ''">
        <mu-icon left value="android"></mu-icon>
        reset
      </mu-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./styles/index.scss";
</style>