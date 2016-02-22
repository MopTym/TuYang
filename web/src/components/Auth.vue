<template lang="jade">
.auth-box(v-show="isShow")
  form.auth(@submit.prevent="submit" novalidate)
    .tab-box
      .tab(@click="isSignUp=false", :class="{active:!isSignUp}") 登录
      .tab(@click="isSignUp=true", :class="{active:isSignUp}") 注册
    .sign-in-box(v-show="!isSignUp")
      .input-box
        input.email(name="email" type="email" v-model="signIn.email" placeholder="邮箱")
        input.password(name="password" type="password" v-model="signIn.password" placeholder="密码")
      input.submit(type="submit" value="登录")
    .sign-up-box(v-show="isSignUp")
      .input-box
        input.email(name="email" type="email" v-model="signUp.email" placeholder="邮箱")
        input.password(name="password" type="password" v-model="signUp.password" placeholder="密码")
      input.submit(type="submit" value="注册")
  .mask(@click="isShow=false")
</template>

<style lang="scss">
.auth-box {
  display: flex;
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.1);
    z-index: -1;
  }
}

form.auth {
  display: flex;
  flex-direction: column;
  width: 28rem;
  height: 18rem;
  max-width: 100%;
  background-color: #fff;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.1);

  .tab-box {
    display: flex;

    .tab {
      flex: 1;
      height: 4rem;
      font-size: 1.2rem;
      line-height: 4rem;
      letter-spacing: 0.2em;
      text-align: center;
      color: #999;
      background-color: #f6f6f6;
      cursor: pointer;

      &.active {
        color: #333;
        background-color: #fff;
      }
    }
  }

  .sign-in-box, .sign-up-box {
    display: flex;
    flex-direction: column;
    flex: 1;

    .input-box {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 2rem 2rem 1rem 2rem;

      .email, .password {
        flex: 1;
        padding: 0.4em 1em;
        border: solid 1px #dfdfdf;
      }
      .password {
        margin-top: -1px;
      }
    }
    .submit {
      flex: 1;
      margin: 0 2rem 2rem 2rem;
      letter-spacing: 0.5em;
      color: #fff;
      background-color: rgb(21,174,103);
      border: none;
    }
  }
}
</style>

<script>
import authService from '../services/auth'

export default {
  data: () => ({
    isShow: false,
    isSignUp: false,
    signIn: {
      email: '',
      password: ''
    },
    signUp: {
      email: '',
      password: ''
    }
  }),
  events: {
    'check-auth': checkAuth
  },
  methods: {
    submit
  }
}

function checkAuth () {
  this.isShow = !authService.hasSignedIn()
}

function submit () {
  console.log('submit:', this.isSignUp ? this.signUp : this.signIn)
}

</script>
