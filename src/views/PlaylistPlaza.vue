<template>
  <div class="playlist-plaza">
    <BaseTopNav>
      <template #title> 歌单广场 </template>
    </BaseTopNav>
    <div class="wrap">
      <div class="tags-link" @click="$router.push({ name: 'Tags' })">
        <van-icon name="apps-o" />
      </div>
      <van-tabs v-model="active" animated sticky offset-top="14vw" lazy-render>
        <van-tab title="精品">
          <PlazaHighQuality />
        </van-tab>

        <van-tab v-for="cat in cats" :key="cat" :title="cat">
          <div class="list-wrap"><TagsPlaylist :cat="cat" /></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import PlazaHighQuality from "../components/plaza/PlazaHighQuality.vue";
import TagsPlaylist from "../components/tags/TagPlaylist.vue";
export default {
  data() {
    return {
      active: 0,
      cats: ["华语", "流行", "民谣", "电子", "轻音乐"],
    };
  },
  components: {
    BaseTopNav,
    PlazaHighQuality,
    TagsPlaylist,
  },
};
</script>

<style lang="less">
.playlist-plaza {
  display: flex;
  flex-direction: column;
  .van-tabs {
    width: 100vw;
    height: 100vh;
  }
  .van-tabs__nav {
    width: 82vw;
  }
  .van-tabs__content {
    height: 85vh;
    overflow: auto;
    background-color: white;
  }
}
</style>
<style lang="less" scoped>
.playlist-plaza {
  width: 100vw;
  height: 100vh;

  .wrap {
    position: relative;
    .tags-link {
      position: fixed;
      top: 14vw;
      right: 0;
      z-index: 1000;
      height: 14vw;
      width: 14vw;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 6vw;
      box-shadow: -1vw 0 1vw #00000030;
    }
  }
  .list-wrap {
    height: 85vh;
    width: 100vw;
  }
  .van-tab__pane > div {
    overflow: auto;
  }
}
</style>
