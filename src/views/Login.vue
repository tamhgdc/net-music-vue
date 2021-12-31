<template>
  <div class="login-wrap">
    <van-nav-bar
      color="#fe3a3b"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form-wrap">
      <component :is="active"></component>
      <van-tabbar fixed v-model="active" active-color="#fe3a3b">
        <van-tabbar-item name="LoginCaptchaForm">
          <span>手机登录</span>
          <van-icon
            class="iconfont"
            slot="icon"
            class-prefix="icon"
            name="tel"
          ></van-icon>
        </van-tabbar-item>

        <van-tabbar-item name="LoginBaiscForm">
          <span>账号登录</span>
          <van-icon
            class="iconfont"
            slot="icon"
            class-prefix="icon"
            name="wangyi"
          ></van-icon>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import LoginBaiscForm from "../components/login/LoginBaiscForm.vue";
import LoginCaptchaForm from "../components/login/LoginCaptchaForm.vue";
export default {
  data() {
    return {
      title: "验证码登录",
      username: "",
      password: "",
      active: "LoginCaptchaForm",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(values) {
      console.log("submit", values);
    },
  },
  watch: {
    active(v) {
      this.title = v === "LoginCaptchaForm" ? "验证码登录" : "账号登录";
    },
  },
  components: {
    LoginBaiscForm,
    LoginCaptchaForm,
  },
};
</script>

<style lang="less">
.login-wrap {
  .van-icon,
  .van-nav-bar__text {
    color: #fe3a3b !important;
  }
  button {
    background: linear-gradient(to right, #ff6034, #ee0a24);
    border: 0;
  }
  position: relative;
}
.form-wrap {
  width: 80vw;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  padding: 2vw 0;
  margin: 0 auto;
  margin-top: 25%;
  .van-tabbar {
    position: static;
  }
  .iconfont {
    font-size: 2rem;
  }
}
</style>
