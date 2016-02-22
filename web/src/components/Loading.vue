<template lang="jade">
.loading(v-show="isShow")
</template>

<style lang="scss">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 1000;
}
</style>

<script>
export default {
  props: {
    isShow: {
      default: false
    }
  }
}
</script>
