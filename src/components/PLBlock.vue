<template>
  <div class="play-list-block">
    <router-link :style="{ height: size, width: size }" :to="opt.route">
      <img :src="opt.pl.picUrl || opt.pl.coverImgUrl" alt="" />
      <div class="count">
        <slot name="title">
          <van-icon
            class="iconfont"
            slot="icon"
            class-prefix="icon"
            name="bofang"
          ></van-icon>
          <span> {{ opt.pl.playCount || opt.pl.playcount | countFormat }}</span>
        </slot>
      </div>
    </router-link>
    <img
      @click="playAll"
      class="play"
      v-show="mode"
      src="../assets/play.png"
      alt=""
    />
    <div class="van-multi-ellipsis--l2">{{ opt.pl.name }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    opt: {
      type: Object,
    },
    size: {
      type: String,
      default: "25vw",
    },
    mode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    playAll() {
      console.log("h");
      this.playAllByPlaylistId(this.opt.pl.id);

      this.$router.push({
        name: "Player",
      });
    },
    ...mapActions("player", ["playAllByPlaylistId"]),
  },
  filters: {
    countFormat(v) {
      return v < 10000
        ? v
        : v < 100000000
        ? parseInt(v / 10000) + "万"
        : parseInt(v / 100000000) + "亿";
    },
  },
};
</script>

<style lang="less" scoped>
.play-list-block {
  position: relative;
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    img:nth-of-type(1) {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 2vw;
    }
  }
  .count {
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000070;
    color: white;
    position: absolute;
    top: 0.5vw;
    right: -0.5vw;
    font-size: 4vw;
    padding: 0 1.5vw;
    border-radius: 5vw;
    span {
      white-space: nowrap;
      font-weight: 200;
    }
    transform: scale(0.8);
  }
  .play {
    position: absolute;
    width: 5vw;
    height: 5vw;
    bottom: 11vw;
    right: 1vw;
    opacity: 0.5;
  }
  > div {
    width: 25vw;
    height: 10vw;
    line-height: 5vw;
    font-size: 3vw;
    text-overflow: clip !important;
  }
}
</style>
