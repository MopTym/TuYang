<template lang="jade">
#app
  navigation
  list
  auth
  copyright
  loading(:is-show="isLoading")
</template>

<style lang="scss">
@import "~normalize.css";

body {
  font-family: "Lucida Grande", "Hiragino Sans GB", "WenQuanYi Micro Hei", "Microsoft YaHei", Verdana, Aril, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background-color: #f7f8fa;
}

*, :after, :before {
  box-sizing: border-box;
}

input:focus, button:focus {
  outline: none;
}
</style>

<script>
import Navigation from './components/Navigation'
import Copyright from './components/Copyright'
import List from './components/List'
import Auth from './components/Auth'
import Loading from './components/Loading'

export default {
  components: {
    Navigation,
    List,
    Auth,
    Copyright,
    Loading
  },
  data: () => ({
    isLoading: true
  }),
  methods: {
    checkAuth () {
      this.$broadcast('check-auth')
    }
  },
  events: {
    'loading-complete': function () {
      this.isLoading = false
    }
  }
}
</script>
