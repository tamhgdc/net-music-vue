<template>
  <div
    :class="playState ? 'img-wrap start' : 'img-wrap stop'"
    :style="{
      height: size,
      width: size,
    }"
  >
    <img />
    <van-image class="s-img" :src="imgSrc + '?param=200y200'" alt="">
      <template v-slot:loading>
        <div class="loading"></div>
      </template>
      <template v-slot:error>
        <div class="loading"></div>
      </template>
    </van-image>
    <div
      class="wrap"
      :style="{
        height: size,
        width: size,
        'border-radius': size,
      }"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["state", "imgSrc", "size"],
  computed: {
    ...mapState("player", ["playState"]),
  },
};
</script>

<style lang="less" scoped>
.start {
  .s-img {
    animation-play-state: running;
  }
}
.stop {
  .s-img {
    animation-play-state: paused;
  }
}

.img-wrap {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .s-img {
    width: 68%;
    height: 68%;
    border-radius: 68%;
    animation-name: rotateImg;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .wrap {
    position: absolute;
    left: 0;
    top: 0;
    background: url("../../assets/disc.png") center;
    background-size: contain;
  }

  .loading {
    width: 100%;
    height: 100%;
    background: url("../../assets/disc_default.png");
    background-size: contain;
  }
  @keyframes rotateImg {
    from {
      transform: rotateZ(0);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
</style>
