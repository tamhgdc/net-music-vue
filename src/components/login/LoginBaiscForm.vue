<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="账号"
      placeholder="手机号/邮箱"
      :rules="[{ required: true, message: '请输入账号' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
</template>

<script>
import md5 from "crypto-js/md5";
import { Toast } from "vant";
import { loginByPhoneAPI, loginByEmailAPI } from "../../service/login.js";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.login((res) => {
        if (res.code == 200) {
          Toast.success("登录成功");
          // 设置用户信息
          this.setProfile(res.profile);
          // 加载用户数据
          this.loadUserData();
          localStorage.setItem(
            "userData",
            JSON.stringify({
              account: this.username,
              psw: md5(this.password).toString(),
            })
          );
          // 返回上一级页面
          this.$router.go(-1);
        } else {
          Toast.fail(res.msg);
        }
        this.username = "";
        this.password = "";
      });
    },
    login(callback) {
      if (this.username.includes("@")) {
        loginByEmailAPI({
          email: this.username,
          md5_password: md5(this.password).toString(),
        }).then((res) => callback(res));
      } else {
        loginByPhoneAPI({
          phone: this.username,
          md5_password: md5(this.password).toString(),
        }).then((res) => callback(res));
      }
    },
    ...mapActions("user", ["loadUserData"]),
    ...mapMutations("user", ["setProfile"]),
  },
};
</script>

<style>
.van-field__label {
  width: 14vw !important;
}
</style>
