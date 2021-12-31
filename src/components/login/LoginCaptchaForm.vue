<template>
  <van-form class="login-captcha">
    <van-field
      v-model="phone"
      name="phone"
      type="tel"
      placeholder="手机号"
      label="手机号"
      maxlength="11"
      :rules="[{ required: true, message: '请输入手机号' }]"
    />
    <van-tag @click="sendCaptcha" type="danger">发送验证码</van-tag>
    <van-field
      v-model="captcha"
      type="number"
      name="captcha"
      label="验证码"
      placeholder="验证码"
      maxlength="4"
      :rules="[{ required: true, message: '请输入验证码' }]"
    />
    <div style="margin: 16px">
      <van-button @click="login" round block type="info" native-type="submit"
        >登录</van-button
      >
    </div>
  </van-form>
</template>

<script>
import { sendCaptchaAPI, loginByPhoneAPI } from "../../service/login.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      captcha: "",
    };
  },
  methods: {
    sendCaptcha() {
      sendCaptchaAPI(this.phone).then((res) => {
        if (res.code == 200) {
          Toast.success("验证码已发送");
        } else {
          if (res.message) {
            Toast.fail(res.message);
          } else {
            Toast.fail("发送失败，请切换登录方式");
          }
        }
      });
    },
    login() {
      loginByPhoneAPI({
        phone: this.phone,
        captcha: this.captcha,
      }).then((res) => {
        if (res.code == 200) {
          Toast.success("登录成功");
          this.$store.commit("setProfile", res.profile);
          this.$store.dispatch("loadPrivateMsg");
          this.$router.go(-1);
        } else {
          Toast.fail("登录失败");
        }
        this.username = "";
        this.password = "";
      });
    },
  },
};
</script>

<style lang="less">
.login-captcha {
  .van-tag {
    float: right;
    margin-right: 3vw;
    position: relative;
    top: -8vw;
    left: 2vw;
  }
  .van-field__label {
    width: 14vw !important;
  }
}
</style>
