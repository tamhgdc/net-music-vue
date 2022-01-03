<template>
  <div class="player-op-panel">
    <van-icon :name="fav ? 'like' : 'like-o'" />
    <van-icon name="down" />
    <van-icon name="fire-o" />
    <van-icon name="chat-o" />
    <van-icon name="ellipsis" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapState("player", ["playlist"]),
    //TODO： 歌曲喜欢功能
    fav() {
      console.log(this.playlist);
      return false;
      // return this.playlist
      //   ? this.playlist.find((x) => x.id == this.id).isFav
      //   : false;
    },
  },
};
</script>

<style lang="less" scoped>
.player-op-panel {
  width: 80vw;
  height: 10vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  margin: 0 auto;
  font-size: 5vw;
}
</style>
