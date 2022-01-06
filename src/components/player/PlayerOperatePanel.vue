<template>
  <div v-if="curr.detail != undefined" class="player-op-panel">
    <van-icon size="6vw" :name="fav ? 'like' : 'like-o'" />
    <van-icon size="6vw" name="down" />
    <van-icon size="6vw" name="fire-o" />
    <van-badge
      :content="curr.detail.dt | commentCountFormat"
      color="transparent"
    >
      <van-icon
        size="6vw"
        name="chat-o"
        @click="
          $router.push({
            name: 'Comment',
            params: {
              id: curr.id,
              type: 0,
            },
          })
        "
      />
    </van-badge>
    <van-icon size="6vw" name="ellipsis" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed: {
    ...mapState("player", ["playlist", "curr"]),
    //TODO： 歌曲喜欢功能
    fav() {
      console.log(this.playlist);
      return false;
      // return this.playlist
      //   ? this.playlist.find((x) => x.id == this.id).isFav
      //   : false;
    },
  },
  filters: {
    commentCountFormat(v) {
      return v > 1000 ? 999 + "+" : v > 10000 ? 1 + "万+" : v;
    },
  },
};
</script>

<style lang="less">
.player-op-panel {
  .van-badge {
    border: 0;
    top: 0;
    right: -2vw;
  }
}
</style>
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
