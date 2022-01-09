<template>
  <div class="home">
    <Top />
    <!-- 轮播图 -->
    <HomeSwiper :banners="banners" :delay="2000"></HomeSwiper>
    <!-- 滚动导航 -->
    <HomeDragBar />
    <!-- 推荐歌单 -->
    <!-- <HomeRemdList /> -->
    <HomeBasicList :key="options[0].title" :opt="options[0]" />

    <!-- 雷达歌单 -->
    <HomeBasicList :key="options[1].title" :opt="options[1]" />
    <!-- <HomeRadarList /> -->
    <!-- 热门话题 -->
    <template v-if="isLogin">
      <HomeHotTopic />
    </template>

    <!-- 场景歌单 -->
    <!-- <HomeScenesList /> -->
    <HomeBasicList :key="options[2].title" :opt="options[2]" />

    <!-- 为你推荐 -->
    <!-- 精选音乐视频 -->

    <!-- 排行榜 -->

    <!-- 云村ktv -->

    <component v-for="code in blockCodes" :key="code" :is="code"></component>
  </div>
</template>

<script>
// @ is an alias to /src
import Top from "../components/Top.vue";
import HomeSwiper from "../components/home/HomeSwiper.vue";
import HomeDragBar from "../components/home/HomeDragBar.vue";
// import HomeRemdList from "../components/home/HomeRemdList.vue";
// import HomeRadarList from "../components/home/HomeRadarList.vue";
// import HomeScenesList from "../components/home/HomeScenesList.vue";
import HomeBasicList from "../components/home/HomeBasicList.vue";
import HomeHotTopic from "../components/home/HomeHotTopic.vue";
import { loadHomePageAPI } from "../service/homepage.js";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      hpData: {},
      blocks: [],
      blockCodes: [],
      banners: [],
      options: [
        {
          title: "推荐歌单",
          route: {
            name: "PlaylistPlaza",
            params: { act: 0 },
          },
        },
        {
          title: "你的专属雷达歌单",
          id: 1287293193,
          route: {
            name: "PlaylistPlaza",
            params: { act: 1 },
          },
        },
        {
          title: "专属场景歌单",
          id: 1463586082,
          route: {
            name: "PlaylistPlaza",
            params: { act: 1 },
          },
        },
      ],
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
    Top,
    HomeDragBar,
    // HomeRemdList,
    // HomeRadarList,
    // HomeScenesList,
    HomeSwiper,
    HomeBasicList,
    HomeHotTopic,
  },
  computed: {
    ...mapState("user", ["profile", "isLogin"]),
  },
};
</script>
