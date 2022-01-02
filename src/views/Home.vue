<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeSwiper :banners="banners" :delay="2000"></HomeSwiper>
    <!-- 滚动导航 -->
    <SwipeNav></SwipeNav>
    <!-- 推荐歌单 -->
    <RemdList></RemdList>
    <!-- 为你推荐 -->
    <!-- 精选音乐视频 -->
    <!-- 雷达歌单 -->
    <!-- 排行榜 -->
    <!-- 云村ktv -->

    <component v-for="code in blockCodes" :key="code" :is="code"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import MySwiper from "../components/home/MySwipe.vue";
import HomeSwiper from "../components/home/HomeSwiper.vue";
import SwipeNav from "../components/home/SwipeNav.vue";
import RemdList from "../components/home/RemdList.vue";
import { loadHomePageAPI } from "../service/homepage.js";

export default {
  name: "Home",
  data() {
    return {
      hpData: {},
      blocks: [],
      blockCodes: [],
      banners: [],
    };
  },
  created() {
    // console.log(md5("lzt").toString());
    loadHomePageAPI().then((res) => {
      /* 主页数据 */
      this.hpData = res.data;
      /* 主页-模块 */
      this.blocks = this.hpData.blocks;
      /* 主页-模块-轮播图 */
      this.banners = this.blocks[0].extInfo.banners;
    });
  },
  components: {
    MySwiper,
    SwipeNav,
    RemdList,
    HomeSwiper,
  },
};
</script>
