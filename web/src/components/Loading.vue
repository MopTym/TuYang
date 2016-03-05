<template lang="jade">
.loading(v-if="isShow" transition="loading")
  sync-loader.spinner(color="#15ae67", size="15px")
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

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

.loading-transition {
  transition: all 0.3s ease;
}

.loading-leave {
  opacity: 0;
}
</style>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

export default {
  props: {
    isShow: {
      default: false
    }
  },
  components: {
    SyncLoader
  }
}
</script>
