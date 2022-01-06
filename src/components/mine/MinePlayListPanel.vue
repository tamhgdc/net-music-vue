<template>
  <div class="playlist-panel">
    <van-tabs v-model="activeName">
      <van-tab title="创建歌单" name="a">
        <MinePlayList :playlist="playlist" />
      </van-tab>
      <van-tab title="收藏的歌单" name="b">
        <MinePlayList :playlist="favoritePlaylist" />
      </van-tab>
      <van-tab title="为你推荐" name="c">
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
      activeName: "a",
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
