<template>
  <div id="app">
    <!-- 路由视图 -->
    <keep-alive>
      <router-view
        v-if="$route.meta.keepAlive"
        :style="{
          paddingBottom,
        }"
      />
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      :style="{
        paddingBottom,
      }"
    />
    <!-- 底部导航 -->
    <MiniPlayer v-show="$route.meta.isMiniPlayerShow" />
    <div class="nav">
      <van-tabbar
        v-model="active"
        active-color="#ee0a24"
        inactive-color="#000"
        v-show="$route.meta.isNavShow"
        route
      >
        <van-tabbar-item
          v-for="link in links"
          :key="link.title"
          :to="{ name: link.name }"
        >
          <van-icon
            class="iconfont"
            slot="icon"
            class-prefix="icon"
            :name="link.icon"
          ></van-icon>
          <span>{{ link.title }}</span>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import MiniPlayer from "./components/MiniPlayer.vue";
import { loginByPhoneAPI, loginByEmailAPI } from "./service/login.js";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
      links: [
        { name: "Home", title: "发现", icon: "wyy" },
        { name: "", title: "播客", icon: "guangbo" },
        { name: "Mine", title: "我的", icon: "yinleyinpin" },
        { name: "Follow", title: "关注", icon: "yonghubangding-copy" },
        { name: "", title: "云村", icon: "luntan" },
      ],
    };
  },
  components: {
    MiniPlayer,
  },
  created() {
    if (localStorage.getItem("userData")) {
      this.login(JSON.parse(localStorage.getItem("userData")), (res) => {
        if (res.code == 200) {
          // 设置用户信息
          this.setProfile(res.profile);
          // 加载用户数据
          this.loadUserData();
        }
      });
    }
  },
  methods: {
    login({ account, psw }, callback) {
      if (account.includes("@")) {
        loginByEmailAPI({
          email: account,
          md5_password: psw,
        }).then((res) => callback(res));
      } else {
        loginByPhoneAPI({
          phone: account,
          md5_password: psw,
        }).then((res) => callback(res));
      }
    },
    ...mapActions("user", ["loadUserData"]),
    ...mapMutations("user", ["setProfile"]),
  },
  computed: {
    ...mapState("player", ["playState"]),
    paddingBottom() {
      if (
        this.$route.meta.isNavShow ||
        (this.$route.meta.isMiniPlayerShow && this.playState)
      )
        return "10vh";
      else if (
        this.$route.meta.isNavShow &&
        this.$route.meta.isMiniPlayerShow &&
        this.playState
      )
        return "20vh";
      else return 0;
    },
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100vw;
  height: 100vh;
  font-size: 4vw;
  color: #505050;
  cursor: pointer;
}
li {
  list-style: none;
}
input {
  outline: 0;
  border: 0;
}
a {
  color: #505050;
  text-decoration: none;
}
.iconfont {
  position: relative;
}
.van-tabs__nav {
  .van-tab {
    color: #6c6c6c;
    z-index: 5;
    font-size: 4vw;
  }
  .van-tab--active {
    color: #323232;
    font-weight: 600;
    font-size: 5vw;
  }
  .van-tabs__line {
    bottom: 8.8vw;
    z-index: 1;
    height: 1.5vw;
    width: 14%;
  }
}
#app {
  .van-tabbar {
    height: 10vh;
    z-index: 10;
  }
}
</style>

<style lang="less" scoped>
#app {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > div:nth-of-type(1) {
    flex: 1;

    overflow: auto;
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
.nav {
  i {
    font-size: 2rem;
  }
}
</style>
