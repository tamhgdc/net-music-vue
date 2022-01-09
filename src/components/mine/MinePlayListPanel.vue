<template>
  <div v-if="playlist.length > 0" class="playlist-panel">
    <van-tabs v-model="active" scrollspy animated>
      <van-tab title="创建歌单">
        <MinePlayList :playlist="playlist" />
      </van-tab>
      <van-tab title="收藏的歌单">
        <MinePlayList :playlist="favoritePlaylist" />
      </van-tab>
      <van-tab title="为你推荐">
        <MineRemdList :playlist="recommendPlaylist" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import MinePlayList from "./MinePlayList.vue";
import MineRemdList from "./MineRemdList.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: "0",
    };
  },
  computed: {
    ...mapState("user", ["playlist", "favoritePlaylist", "recommendPlaylist"]),
  },
  components: {
    MinePlayList,
    MineRemdList,
  },
};
</script>

<style lang="less" scoped></style>
