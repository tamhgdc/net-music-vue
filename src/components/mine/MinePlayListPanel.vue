<template>
  <div class="playlist-panel">
    <van-tabs v-model="activeName">
      <van-tab title="创建歌单" name="a">
        <MinePlayList :playlist="playlist" />
      </van-tab>
      <van-tab title="收藏的歌单" name="b">
        <MinePlayList :playlist="favoritePlaylist" />
      </van-tab>
      <van-tab title="标签 3" name="c"> </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MinePlayList from "./MinePlayList.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "a",
    };
  },
  computed: {
    ...mapState("user", ["playlist", "favoritePlaylist"]),
  },
  components: {
    MinePlayList,
  },
};
</script>

<style lang="less" scoped></style>
