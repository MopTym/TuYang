<template lang="jade">
nav.nav
  a(v-link="{ path: '/' }")
    .logo
  nav-like
</template>

<style lang="scss">
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  z-index: 1;

  .logo {
    display: inline-block;
    width: 4rem;
    height: 2rem;
    margin: 0.5rem 0 0 0.5rem;
    background: url("../assets/images/logo.png") center center / contain no-repeat;
  }
}
</style>

<script>
import NavLike from './NavLike'
export default {
  components: {
    NavLike
  }
}
</script>
