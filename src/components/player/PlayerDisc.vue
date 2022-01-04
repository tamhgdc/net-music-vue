<template>
  <div
    class="img-wrap"
    :style="{
      height: size,
      width: size,
    }"
  >
    <img />
    <van-image
      :class="playState ? 's-img startRotate' : 's-img stop'"
      :src="imgSrc + '?param=200y200'"
      alt=""
    >
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
.img-wrap {
  position: absolute;
  animation-name: rotateImg;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    position: absolute;
    left: 0;
    top: 0;
    background: url("../../assets/disc.png") center;
    background-size: contain;
  }
  .s-img {
    width: 67%;
    height: 67%;
    border-radius: 67%;
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
