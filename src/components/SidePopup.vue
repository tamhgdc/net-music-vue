<template>
  <div>
    <!-- 显示侧边栏 -->
    <van-icon
      class="iconfont"
      class-prefix="icon"
      size="24"
      :badge="newMsgCount > 0 ? newMsgCount : null"
      @click="showPopup"
      name="gengduo"
    />
    <!-- 侧边栏 -->
    <van-popup v-model="show" position="left">
      <div class="popup-login wrap">
        <router-link
          :to="{
            name: isLogin ? '/' : 'Login',
          }"
        >
          <van-image
            cover
            round
            width="10vw"
            height="10vw"
            :src="
              isLogin
                ? profile.avatarUrl
                : 'https://img01.yzcdn.cn/vant/cat.jpeg'
            "
          >
            <template v-slot:error>加载失败</template>
          </van-image>

          <span>
            {{ title }}
            <van-icon :v-show="isLogin" name="arrow" />
          </span>
        </router-link>
      </div>
      <van-cell-group inset>
        <van-cell icon="envelop-o" title="我的消息" is-link />
        <van-cell
          icon="cashier-o"
          title="云贝中心"
          is-link
          value="做任务赚云贝"
        />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell class="cell-title" value="音乐服务" />
        <van-cell icon="after-sale" title="云村有惠" is-link />
        <van-cell icon="cart-o" title="商城" is-link />
        <van-cell icon="shop-collect-o" title="网易严选" is-link />
        <van-cell icon="music-o" title="口袋彩铃" is-link />
      </van-cell-group>
      <div class="wrap">
        <van-button
          @click="logout"
          :disabled="!isLogin"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
          >退出登录</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      newMsgCount: 0,
      title: "立即登录",
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    logout() {
      this.logoutAction().then(() => {
        Toast.success("退出成功");
        this.title = "立即登录";
      });
    },
    ...mapActions("user", { logoutAction: "logout" }),
  },
  updated() {
    this.title = this.isLogin ? this.profile.nickname : "立即登录";
    this.newMsgCount = this.isLogin ? this.privateMsg.newMsgCount : 0;
  },
  computed: {
    ...mapState("user", ["profile", "privateMsg", "isLogin"]),
  },
};
</script>

<style lang="less">
/* 侧边栏 */
.van-popup--left {
  background-color: #f5f5f5 !important;
  width: 80vw;
  height: 100vh;
  .wrap {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 16px;
    .van-button {
      border-radius: 0.7rem;
    }
  }
  .popup-login {
    a {
      display: flex;
      align-items: center;
      span {
        padding-left: 1rem;
      }
    }
  }
  .cell-title {
    color: #999999 !important;
  }
  .van-cell-group {
    margin-top: 1rem !important;
    background-color: white;
  }
  .van-cell__value {
    font-size: 0.6rem;
  }
}
</style>
