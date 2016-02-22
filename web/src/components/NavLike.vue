<template lang="jade">
a(v-link="{ path: '/likes' }")
  .nav-like(title="我喜欢的")
    i.ion-android-favorite-outline
</template>

<style lang="scss">
.nav-like {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  line-height: 1;
  text-align: center;
  color: rgb(191,27,15);
  cursor: pointer;
}
</style>

<script>
export default {
  components: {}
}
</script>
