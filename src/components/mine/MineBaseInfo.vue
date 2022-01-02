<template>
  <div class="info-wrap">
    <van-image
      round
      width="22vw"
      height="22vw"
      fit="cover"
      :src="
        isLogin ? profile.avatarUrl : 'https://img01.yzcdn.cn/vant/cat.jpeg'
      "
    >
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <router-link
      :to="isLogin ? '/' : { name: 'Login' }"
      v-text="isLogin ? profile.nickname : '立即登录'"
    >
    </router-link>
    <ul v-show="isLogin">
      <li><span v-text="isLogin ? profile.follows : 0"></span>关注</li>
      |
      <li><span v-text="isLogin ? profile.followeds : 0"></span>粉丝</li>
      |
      <li>Lv.<span v-text="isLogin ? level.level : 0"></span></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["profile", "privateMsg", "isLogin", "level"]),
  },
};
</script>

<style lang="less" scoped>
.info-wrap {
  background-color: white;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 12vw !important;
  padding-top: 12vw !important;
  .van-image {
    position: absolute;
    top: -10vw;
  }
  a {
    font-weight: 900;
    font-size: 7vw;
    color: #333;
  }
  ul {
    display: flex;
    li {
      padding: 0 2vw;
      color: #808080;
    }
  }
}
</style>
