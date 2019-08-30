<template>
  <div class="input-wrap" :class="{'input-focus': focus}">
    <input 
      v-model="scopeValue" 
      :placeholder="placeholder" 
      @focus="focus = true" 
      @blur="focus = false" 
      @keyup.enter="$emit('enter')" 
      class="input"
    />
    <span class="focus-border">
      <i></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'app-input',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      scopeValue: this.value,
      focus: false
    }
  },

  watch: {
    scopeValue(val) {
      this.$emit('change', val)
    },

    value(val) {
      this.scopeValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './styles/index.scss';
</style>