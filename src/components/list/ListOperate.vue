<template>
  <div class="list-operate">
    <van-sticky v-if="detail != undefined" offset-top="14vw">
      <div @click="playAll">
        <van-icon size="7vw" class="play" name="play-circle" />
        <span class="title">播放全部</span>
        <span class="count">({{ detail.trackCount }})</span>
      </div>
      <div>
        <van-icon size="5vw" name="down" />
        <van-icon size="5vw" name="passed" />
      </div>
    </van-sticky>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["detail"],
  methods: {
    playAll() {
      this.playAllByPlaylistId(this.detail.id);
      this.$router.push({
        name: "Player",
      });
    },
    ...mapActions("player", ["playAllByPlaylistId", "playById"]),
  },
};
</script>
<style lang="less">
.list-operate {
  .van-sticky {
    height: 12vw;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    div:nth-of-type(1) {
      .van-icon {
        padding: 0 4vw;
      }
      .title {
        font-size: 5vw;
      }
      .count {
        padding-left: 1vw;
        font-size: 4vw;
        color: #999;
      }
      .play {
        color: #fe3c30;
      }
    }
    div:nth-of-type(2) {
      .van-icon {
        padding: 0 2vw;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.list-operate {
  width: 100vw;
  height: 14vw;
}
</style>
