<template>
  <div id="app">
    <Top v-show="$route.meta.isTopShow"></Top>
    <!-- 路由视图 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- 底部导航 -->
    <MiniPlayer v-show="$route.meta.isMiniPlayerShow" />
    <van-tabbar
      class="nav"
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
</template>
<script>
import Top from "./components/Top.vue";
import MiniPlayer from "./components/MiniPlayer.vue";
export default {
  data() {
    return {
      active: 0,
      links: [
        { name: "Home", title: "发现", icon: "wyy" },
        { name: "", title: "播客", icon: "guangbo" },
        { name: "Mine", title: "我的", icon: "yinleyinpin" },
        { name: "", title: "关注", icon: "yonghubangding-copy" },
        { name: "", title: "云村", icon: "luntan" },
      ],
    };
  },
  components: {
    Top,
    MiniPlayer,
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
</style>

<style lang="less" scoped>
#app {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  div:nth-of-type(2) {
    flex: 1;
    overflow: auto;
  }
}
.nav {
  position: static !important;
  height: 10%;
  i {
    font-size: 2rem;
  }
}
</style>
