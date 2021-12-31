<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view />
    <!-- 底部导航 -->
    <van-tabbar
      class="nav"
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      v-show="$route.meta.isNavShow"
    >
      <van-tabbar-item v-for="(v, k) in icons" :key="k">
        <van-icon
          class="iconfont"
          slot="icon"
          class-prefix="icon"
          :name="v"
        ></van-icon>
        <span>{{ k }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icons: {
        发现: "wyy",
        播客: "guangbo",
        我的: "yinleyinpin",
        关注: "yonghubangding-copy",
        云村: "luntan",
      },
    };
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
  div:nth-of-type(1) {
    height: 90%;
  }
}
.nav {
  height: 10%;
  i {
    font-size: 2rem;
  }
}
</style>
